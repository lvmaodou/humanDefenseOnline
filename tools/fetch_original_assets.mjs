import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import { parseMDX, decodeBLP, getBLPImageData } from 'war3-model';
import { parseSlk } from './slk.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'content/original-3.0');
const output = resolve(root, 'public/warcraft');
const cache = resolve(root, '.cache/original-client');
const data = JSON.parse(await readFile(resolve(source, 'data.json'), 'utf8'));
const script = await readFile(resolve(source, 'script.j'), 'utf8');
const normalize = value => String(value || '').replaceAll('\\', '/').toLowerCase().replace(/^\/+/, '');
const modelPath = value => {
  const path = normalize(value);
  return !path || path === '_' ? null : /\.(mdl|mdx)$/.test(path) ? path.replace(/\.mdl$/, '.mdx') : `${path}.mdx`;
};
const revision = 'bce1f9d87ab7d71e208624dbbdce208db5690d4f';
const base = `https://cdn.jsdelivr.net/gh/WarRaft/War3.mpq@${revision}/lowercase/`;
let archiveNames = new Map();
try {
  const response = await fetch(`https://cdn.jsdelivr.net/gh/WarRaft/War3.mpq@${revision}/listfile.txt`, { signal: AbortSignal.timeout(20000) });
  if (response.ok) archiveNames = new Map((await response.text()).split(/\r?\n/).map(path => [normalize(path), path]));
} catch {}
const assets = new Map(), failed = new Map(), models = new Set(), images = new Set();
let completed = 0;
async function retrieve(path) {
  const local = resolve(cache, path);
  try { return await readFile(local); } catch {}
  const embedded = resolve(source, 'extracted', path);
  try { return await readFile(embedded); } catch {}
  const candidates = [base + path];
  const archivePath = archiveNames.get(path);
  if (archivePath) candidates.push(`https://cdn.jsdelivr.net/gh/WarRaft/War3.mpq@${revision}/extract/${archivePath}`);
  candidates.push(`https://raw.githubusercontent.com/WarRaft/War3.mpq/${revision}/lowercase/${path}`);
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      let last;
      for (const candidate of candidates) {
        const response = await fetch(candidate, { signal: AbortSignal.timeout(25000) });
        if (response.status === 404) { last = Object.assign(new Error('not present in client archive'), { missing: true }); continue; }
        if (!response.ok) { last = new Error(`HTTP ${response.status}`); continue; }
        const bytes = Buffer.from(await response.arrayBuffer());
        await mkdir(dirname(local), { recursive: true }); await writeFile(local, bytes);
        return bytes;
      }
      throw last || new Error('resource unavailable');
    } catch (error) { if (error.missing || attempt === 2) throw error; }
  }
}
async function pool(values, callback, concurrency = 3) {
  let next = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (next < values.length) { const value = values[next++]; await callback(value); }
  }));
}
function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) { crc ^= byte; for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, bytes) {
  const result = Buffer.alloc(bytes.length + 12); result.writeUInt32BE(bytes.length); result.write(type, 4); bytes.copy(result, 8);
  result.writeUInt32BE(crc32(result.subarray(4, -4)), result.length - 4); return result;
}
function png(image) {
  const header = Buffer.alloc(13); header.writeUInt32BE(image.width); header.writeUInt32BE(image.height, 4); header[8] = 8; header[9] = 6;
  const rows = Buffer.alloc(image.height * (image.width * 4 + 1));
  for (let y = 0; y < image.height; y++) Buffer.from(image.data.buffer, image.data.byteOffset + y * image.width * 4, image.width * 4).copy(rows, y * (image.width * 4 + 1) + 1);
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', header), chunk('IDAT', deflateSync(rows)), chunk('IEND', Buffer.alloc(0))]);
}
function referencedImages(value) {
  for (const path of String(value || '').split(',')) if (/\.(blp|tga)$/i.test(path.trim())) images.add(normalize(path.trim()));
}
const ids = new Set([...script.matchAll(/'([A-Za-z0-9]{4})'/g)].map(match => match[1]).filter(id => data.units[id]));
const unitIds = new Set([...ids, ...data.waveUnits, ...data.bossUnits, 'H05V']);
const abilityIds = new Set();
for (const id of unitIds) {
  const unit = data.units[id]; if (!unit) continue;
  const path = modelPath(unit.file); if (path) models.add(path);
  for (const ability of String(unit.abilList || '').split(',')) if (ability && ability !== '_') abilityIds.add(ability);
  for (const [key, value] of Object.entries(unit)) {
    if (/art$/i.test(key)) { referencedImages(value); if (/\.(mdl|mdx)$/i.test(value)) models.add(modelPath(value)); }
  }
}
for (const id of [...script.matchAll(/'([A-Za-z0-9]{4})'/g)].map(match => match[1])) if (data.abilityData[id]) abilityIds.add(id);
for (const id of abilityIds) {
  const definition = { ...data.abilityStrings[data.abilityData[id]?.code], ...data.abilityStrings[id] };
  for (const [key, value] of Object.entries(definition)) if (/art$/i.test(key)) {
    referencedImages(value);
    for (const path of String(value).split(',')) if (/\.(mdl|mdx)$/i.test(path.trim())) models.add(modelPath(path.trim()));
  }
}
for (const match of script.matchAll(/"((?:[^"\\]|\\.)*\.(?:mdl|mdx))"/gi)) models.add(modelPath(match[1].replaceAll('\\\\', '\\')));
for (let i = 0; i < 16; i++) {
  images.add(`replaceabletextures/teamcolor/teamcolor${String(i).padStart(2, '0')}.blp`);
  images.add(`replaceabletextures/teamglow/teamglow${String(i).padStart(2, '0')}.blp`);
}
images.add('replaceabletextures/lordaerontree/lordaeronsummertree.blp');
const supplemental = [
  'doodads/doodads.slk', 'units/destructabledata.slk', 'terrainart/terrain.slk', 'terrainart/clifftypes.slk', 'terrainart/water.slk',
  'ui/console/human/humanuitile01.blp', 'ui/console/human/humanuitile02.blp', 'ui/console/human/humanuitile03.blp', 'ui/console/human/humanuitile04.blp'
];
await mkdir(output, { recursive: true });
async function download(path, isModel = false) {
  if (assets.has(path) || failed.has(path)) return;
  try {
    const bytes = await retrieve(path), digest = createHash('sha256').update(bytes).digest('hex');
    let target = path, parsed = null, saved = bytes;
    if (isModel) {
      if (bytes.toString('ascii', 0, 4) !== 'MDLX') throw new Error('not an MDX model');
      parsed = parseMDX(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
      for (const texture of parsed.Textures) if (texture.Image) images.add(normalize(texture.Image));
      for (const emitter of parsed.ParticleEmitters || []) if (emitter.Path) models.add(modelPath(emitter.Path));
    } else if (path.endsWith('.blp')) {
      const blp = decodeBLP(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
      saved = png(getBLPImageData(blp, 0)); target = path.replace(/\.blp$/, '.png');
    }
    const destination = resolve(output, target); await mkdir(dirname(destination), { recursive: true }); await writeFile(destination, saved);
    assets.set(path, {
      url: `/warcraft/${target}`, bytes: bytes.length, sha256: digest,
      ...(parsed ? { name: parsed.Info.Name, version: parsed.Version, sequences: parsed.Sequences.map(sequence => ({ name: sequence.Name, interval: [...sequence.Interval], moveSpeed: sequence.MoveSpeed, nonLooping: sequence.NonLooping })), geosets: parsed.Geosets.length, textures: parsed.Textures, particleEmitters: parsed.ParticleEmitters2.length, ribbonEmitters: parsed.RibbonEmitters.length, extent: { min: [...parsed.Info.MinimumExtent], max: [...parsed.Info.MaximumExtent] } } : {})
    });
  } catch (error) { failed.set(path, error.message); }
  if (++completed % 30 === 0) console.log(`Processed ${completed} resources; available ${assets.size}, missing ${failed.size}`);
}
await pool(supplemental, path => download(path));
for (const path of supplemental.filter(path => path.endsWith('.slk'))) {
  const asset = assets.get(path); if (!asset) continue;
  const text = await readFile(resolve(output, asset.url.slice('/warcraft/'.length)), 'utf8');
  if (path.includes('doodads') || path.includes('destructable')) {
    const placementBytes = await readFile(resolve(source, 'extracted/war3map.doo'));
    const ids = new Set();
    // The parser in the reference builder validates all placement records.
    let offset = 16;
    for (let i = 0; i < placementBytes.readInt32LE(12); i++) {
      const id = placementBytes.toString('ascii', offset, offset + 4), variation = placementBytes.readInt32LE(offset + 4);
      ids.add(`${id}:${variation}`); offset += 42;
      const sets = placementBytes.readInt32LE(offset); offset += 4;
      for (let j = 0; j < sets; j++) { const count = placementBytes.readInt32LE(offset); offset += 4 + count * 8; }
      offset += 4;
    }
    const rows = parseSlk(text);
    for (const entry of ids) {
      const [id, variation] = entry.split(':'), row = rows[id]; if (!row?.file || row.file === '_') continue;
      const basePath = modelPath(row.file);
      models.add(Number(row.numVar) > 1 ? basePath.replace(/\.mdx$/, `${variation}.mdx`) : basePath);
      if (row.texFile && row.texFile !== '_') referencedImages(`${row.texFile}.blp`);
    }
  }
  if (path === 'terrainart/terrain.slk' || path === 'terrainart/clifftypes.slk') {
    const rows = parseSlk(text), ids = new Set();
    const mapTerrain = JSON.parse(await readFile(resolve(source, 'terrain.json'), 'utf8'));
    if (path === 'terrainart/terrain.slk') mapTerrain.tiles.forEach(id => ids.add(id));
    else mapTerrain.cliffs.forEach(id => ids.add(id));
    for (const id of ids) {
      const row = rows[id] || {};
      const folder = path === 'terrainart/terrain.slk' ? row.dir : row.texDir, name = path === 'terrainart/terrain.slk' ? row.file : row.texFile;
      if (folder && name && name !== '_') images.add(normalize(`${folder}\\${name}.blp`));
    }
  }
}
let pending = [...models];
while (pending.length) { await pool(pending, path => download(path, true)); pending = [...models].filter(path => !assets.has(path) && !failed.has(path)); }
await pool([...images], path => download(path));
await mkdir(resolve(root, 'public/vendor'), { recursive: true });
await copyFile(resolve(root, 'node_modules/war3-model/dist/es/war3-model.mjs'), resolve(root, 'public/vendor/war3-model.mjs'));
await copyFile(resolve(root, 'node_modules/war3-model/LICENSE'), resolve(root, 'public/vendor/war3-model.LICENSE')).catch(() => {});
const result = { repository: 'https://github.com/WarRaft/War3.mpq', revision, parser: 'war3-model@4.0.1', sourceMapSha256: data.source.sha256, models: Object.fromEntries([...assets].filter(([path]) => path.endsWith('.mdx'))), resources: Object.fromEntries(assets), missing: Object.fromEntries(failed) };
await writeFile(resolve(output, 'manifest.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ models: Object.keys(result.models).length, resources: assets.size, missing: failed.size, revision }, null, 2));
