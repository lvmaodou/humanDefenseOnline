import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function readSourcePresentation({ contentRoot, data, script, manifest, terrain }) {
  const [info, miscText, doodads] = await Promise.all([
    readFile(resolve(contentRoot, 'extracted/war3map.w3i')),
    readFile(resolve(contentRoot, 'extracted/war3mapmisc.txt'), 'utf8'),
    readFile(resolve(contentRoot, 'extracted/war3map.doo'))
  ]);
  let offset = 0;
  const integer = () => { const value = info.readInt32LE(offset); offset += 4; return value; };
  const real = () => { const value = info.readFloatLE(offset); offset += 4; return value; };
  const string = () => {
    const end = info.indexOf(0, offset);
    if (end < 0) throw new Error('Unterminated war3map.w3i string');
    const value = info.subarray(offset, end).toString('utf8'); offset = end + 1; return value;
  };
  const formatVersion = integer();
  if (formatVersion !== 25) throw new Error(`Unsupported map info version: ${formatVersion}`);
  const mapInfo = {
    formatVersion, saves: integer(), editorVersion: integer(), name: string(), author: string(),
    description: string(), recommendedPlayers: string(),
    cameraBounds: Array.from({ length: 8 }, real), cameraComplements: Array.from({ length: 4 }, integer),
    playableWidthTiles: integer(), playableHeightTiles: integer(), flags: integer(), tileset: String.fromCharCode(info[offset++])
  };
  const misc = {};
  let section = null;
  for (const line of miscText.split(/\r?\n/).map(value => value.trim())) {
    if (!line || line.startsWith('//') || line.startsWith(';')) continue;
    if (line.startsWith('[') && line.endsWith(']')) { section = line.slice(1, -1); misc[section] ??= {}; continue; }
    const index = line.indexOf('=');
    if (index < 0 || !section) continue;
    const key = line.slice(0, index).trim(), text = line.slice(index + 1).trim();
    const numbers = text.split(',').map(Number);
    misc[section][key] = text !== '' && numbers.every(Number.isFinite) ? (numbers.length === 1 ? numbers[0] : numbers) : text;
  }
  const cameras = [];
  for (const match of script.matchAll(/set (\w+)=CreateCameraSetup\(\)/g)) {
    const id = match[1], fields = {};
    const numeric = '(-?(?:\\d+(?:\\.\\d*)?|\\.\\d+))';
    for (const field of script.matchAll(new RegExp(`CameraSetupSetField\\(${id},(CAMERA_FIELD_\\w+),${numeric},${numeric}\\)`, 'g'))) {
      fields[field[1]] = { value: Number(field[2]), transitionSeconds: Number(field[3]) };
    }
    const dest = script.match(new RegExp(`CameraSetupSetDestPosition\\(${id},${numeric},${numeric},${numeric}\\)`));
    const uses = script.split(/\r?\n/).filter(line => line.includes(id) && !/^(?:camerasetup |set \w+=CreateCameraSetup|call CameraSetupSet)/.test(line));
    cameras.push({ id, fields, destination: dest ? { x: Number(dest[1]), y: Number(dest[2]), transitionSeconds: Number(dest[3]) } : null, applicationCalls: uses });
  }
  const visualFields = /file|modelScale|^scale|collision|movetp|moveheight|movefloor|^walk$|^run$|art$|anim|^missile|^launch|^impact|^red$|^green$|^blue$|teamcolor|shadow|elev|^occH$|blend|propwin|orient/i;
  const unitVisuals = Object.fromEntries(Object.entries(data.units).map(([id, unit]) => [id, {
    name: unit.Name || unit.name || id,
    fields: Object.fromEntries(Object.entries(unit).filter(([key]) => visualFields.test(key)))
  }]));
  const abilityVisuals = Object.fromEntries(Object.entries(data.abilityStrings).map(([id, entry]) => [id, {
    name: entry.Name || id, fields: Object.fromEntries(Object.entries(entry).filter(([key]) => /art|anim|attach|sound|missile/i.test(key)))
  }]).filter(([, entry]) => Object.keys(entry.fields).length));
  const embeddedModels = [...new Set(manifest.files.map(entry => entry.name.toLowerCase()).filter(name => /\.(mdx|mdl)$/.test(name)))];
  const placements = [];
  let position = 16;
  const doodadInteger = () => { const value = doodads.readInt32LE(position); position += 4; return value; };
  const doodadReal = () => { const value = doodads.readFloatLE(position); position += 4; return value; };
  for (let index = 0; index < doodads.readInt32LE(12); index++) {
    const id = doodads.toString('ascii', position, position + 4); position += 4;
    const variation = doodadInteger(), location = [doodadReal(), doodadReal(), doodadReal()], angle = doodadReal(), scale = [doodadReal(), doodadReal(), doodadReal()];
    const flags = doodads[position++], life = doodads[position++], itemTable = doodadInteger(), setCount = doodadInteger();
    const itemSets = [];
    for (let set = 0; set < setCount; set++) {
      const count = doodadInteger(), items = [];
      for (let item = 0; item < count; item++) { const chance = doodadInteger(); const type = doodads.toString('ascii', position, position + 4); position += 4; items.push({ chance, type }); }
      itemSets.push(items);
    }
    placements.push({ id, variation, position: location, angle, scale, flags, life, itemTable, itemSets, editorId: doodadInteger() });
  }
  if (position + 8 !== doodads.length) throw new Error('Unexpected doodad placement trailer');
  return {
    sourceSha256: manifest.sha256, sourceMapInfo: mapInfo,
    terrain: { vertices: [terrain.width, terrain.height], tileSize: terrain.tileSize, offset: terrain.offset, worldSize: [(terrain.width - 1) * terrain.tileSize, (terrain.height - 1) * terrain.tileSize] },
    gameplayConstants: { source: 'extracted/war3mapmisc.txt', sections: misc },
    cameras, scriptCameraBounds: script.match(/call SetCameraBounds\(([^\n]+)\)/)?.[1] || null,
    embeddedModels, unitVisuals, abilityVisuals,
    doodadPlacement: { source: 'extracted/war3map.doo', magic: doodads.toString('ascii', 0, 4), version: doodads.readInt32LE(4), count: placements.length, placements },
    limitations: [
      'Model and effect paths identify resources; most model geometry, textures and animation tracks are external Warcraft client resources.',
      'Stored camera presets are not proof they are applied in gameplay. Check applicationCalls.',
      'Screen pixel size depends on model geometry, modelScale, camera projection and viewport; collision and scale are separate source fields.',
      'This extraction does not assert runtime parity with Warcraft III.'
    ]
  };
}
