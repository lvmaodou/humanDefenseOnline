import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import { parseMDX, decodeBLP, getBLPImageData } from 'war3-model';

const root = resolve('.');
const manifestPath = resolve(root, 'public/warcraft/manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const normalize = value => String(value ?? '').replaceAll('\\', '/').replace(/\/+/g, '/').replace(/^\/+/, '').toLowerCase();
const modelPath = value => {
  const p = normalize(value).trim().replace(/[),;]+$/g, '');
  if (!p || p === '_') return null;
  return /\.(mdl|mdx)$/i.test(p) ? p.replace(/\.mdl$/i, '.mdx') : `${p}.mdx`;
};
const base = `https://cdn.jsdelivr.net/gh/WarRaft/War3.mpq@${manifest.revision}/lowercase/`;
const cache = new Map();
const failed = {};
const targets = new Set([
  'units/undead/skeleton/skeleton.mdx',
  'units/nightelf/ent/ent.mdx',
  'units/orc/spiritwolf/spiritwolf.mdx',
  'units/creeps/grizzlybear/grizzlybear.mdx',
  'units/demon/doomguard/doomguard.mdx',
  'units/creeps/herotinkerfactory/herotinkerfactory.mdx',
  'units/undead/locust/locust.mdx',
  'units/creeps/lavaspawn/lavaspawn.mdx',
  'objects/inventoryitems/treasurechest/treasurechest.mdx',
  'objects/inventoryitems/tomebrown/tomebrown.mdx',
  // These are referenced by the original ability table.  They are not all
  // used by the current map, but keeping them available makes the original
  // summon/ward/unit data resolvable when an untrimmed ability is enabled.
  'units/nightelf/herodemonhunter/herodemonhunter.mdx',
  'units/nightelf/owlscout/owlscout.mdx',
  'units/orc/serpentward/serpentward.mdx',
  'units/undead/plaguecloud/plaguecloud.mdx',
  'units/undead/obsidianstatue/obsidianstatue.mdx',
  'units/orc/peon/peon.mdx',
  'units/undead/scarab/scarab.mdx',
  'units/nightelf/riddenhippogryph/riddenhippogryph.mdx',
  'buildings/nightelf/entangledgoldmine/entangledgoldmine.mdx',
  'units/orc/healingward/healingward.mdx',
  'units/nightelf/druidofthetalon/druidofthetalon.mdx',
  'units/orc/sentryward/sentryward.mdx',
  'units/orc/stasistotem/stasistotem.mdx',
  'units/human/warwagon/warwagon.mdx',
  'buildings/human/townhall/townhall.mdx',
  'buildings/orc/greathall/greathall.mdx',
  'buildings/undead/necropolis/necropolis.mdx',
  'buildings/nightelf/treeoflife/treeoflife.mdx',
  'units/critters/villagerkid/villagerkid.mdx',
  'doodads/lordaeronsummer/plants/wheat/wheat.mdx',
  'buildings/other/hornofcenarius/hornofcenarius.mdx',
  // Ent references this shared MDX through a particle emitter.  It is a
  // dependency of the source model rather than a direct unit data entry.
  'sharedmodels/leaves.mdx',
]);
const queue = [...targets];
const source = new Set();
const images = new Set();
const digest = bytes => createHash('sha256').update(bytes).digest('hex');

function png(image) {
  const chunk = (type, bytes) => {
    const result = Buffer.alloc(bytes.length + 12);
    result.writeUInt32BE(bytes.length, 0); result.write(type, 4); bytes.copy(result, 8);
    let crc = 0xffffffff;
    for (const byte of result.subarray(4, -4)) { crc ^= byte; for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); }
    result.writeUInt32BE((crc ^ 0xffffffff) >>> 0, result.length - 4);
    return result;
  };
  const header = Buffer.alloc(13); header.writeUInt32BE(image.width, 0); header.writeUInt32BE(image.height, 4); header[8] = 8; header[9] = 6;
  const rows = Buffer.alloc(image.height * (image.width * 4 + 1));
  for (let y = 0; y < image.height; y++) Buffer.from(image.data.buffer, image.data.byteOffset + y * image.width * 4, image.width * 4).copy(rows, y * (image.width * 4 + 1) + 1);
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', header), chunk('IDAT', deflateSync(rows)), chunk('IEND', Buffer.alloc(0))]);
}

async function retrieve(path) {
  const key = normalize(path);
  if (cache.has(key)) return cache.get(key);
  const promise = (async () => {
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(`${base + key}?cache=${attempt}`, { signal: AbortSignal.timeout(30000) });
        if (response.status === 404) throw Object.assign(new Error('not present in pinned War3.mpq archive'), { notFound: true });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return Buffer.from(await response.arrayBuffer());
      } catch (error) {
        if (error.notFound) throw error;
        lastError = error;
      }
    }
    // jsDelivr refuses a few large files from this repository because the
    // package exceeds its per-file delivery limit.  The GitHub Contents API
    // serves the exact pinned blob as base64, so it is a deterministic
    // fallback rather than a different asset source.
    try {
      const api = `https://api.github.com/repos/WarRaft/War3.mpq/contents/lowercase/${key}?ref=${manifest.revision}`;
      const response = await fetch(api, { headers: { 'User-Agent': 'human-defense-online' }, signal: AbortSignal.timeout(30000) });
      if (response.status === 404) throw Object.assign(new Error('not present in pinned War3.mpq archive'), { notFound: true });
      if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
      const payload = await response.json();
      if (!payload.content) throw new Error('GitHub API returned no file content');
      return Buffer.from(payload.content.replace(/\s/g, ''), 'base64');
    } catch (error) {
      if (error.notFound) throw error;
      throw lastError || error;
    }
  })();
  cache.set(key, promise);
  return promise;
}

async function saveResource(key, bytes, target = key) {
  const destination = resolve(root, 'public/warcraft', target);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, bytes);
  manifest.resources[key] = { url: `/warcraft/${target}`, bytes: bytes.length, sha256: digest(bytes) };
  delete manifest.missing[key];
}

async function addImage(raw) {
  const key = normalize(raw);
  if (!key || key === '_' || manifest.resources[key] || images.has(key)) return;
  images.add(key);
  if (!/\.(blp|tga)$/i.test(key)) return;
  try {
    const bytes = await retrieve(key);
    if (key.endsWith('.blp')) {
      const decoded = decodeBLP(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
      const target = key.replace(/\.blp$/i, '.png');
      await saveResource(key, png(getBLPImageData(decoded, 0)), target);
    } else {
      await saveResource(key, bytes, key);
    }
  } catch (error) {
    failed[key] = error.message;
  }
}

async function addModel(key) {
  key = modelPath(key);
  if (!key || source.has(key) || manifest.models[key]) return;
  source.add(key);
  try {
    const bytes = await retrieve(key);
    if (bytes.toString('ascii', 0, 4) !== 'MDLX') throw new Error('resource is not an MDX model');
    const parsed = parseMDX(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
    const metadata = {
      url: `/warcraft/${key}`,
      bytes: bytes.length,
      sha256: digest(bytes),
      name: parsed.Info.Name,
      version: parsed.Version,
      sequences: parsed.Sequences.map(sequence => ({ name: sequence.Name, interval: [...sequence.Interval], moveSpeed: sequence.MoveSpeed, nonLooping: sequence.NonLooping })),
      geosets: parsed.Geosets.length,
      textures: parsed.Textures,
      particleEmitters: parsed.ParticleEmitters2?.length || 0,
      ribbonEmitters: parsed.RibbonEmitters?.length || 0,
      extent: { min: [...parsed.Info.MinimumExtent], max: [...parsed.Info.MaximumExtent] },
    };
    await mkdir(dirname(resolve(root, 'public/warcraft', key)), { recursive: true });
    await writeFile(resolve(root, 'public/warcraft', key), bytes);
    manifest.models[key] = metadata;
    manifest.resources[key] = metadata;
    delete manifest.missing[key];
    for (const texture of parsed.Textures || []) if (texture.Image) await addImage(texture.Image);
    for (const emitter of [...(parsed.ParticleEmitters || []), ...(parsed.ParticleEmitters2 || [])]) if (emitter.Path) {
      const dependency = modelPath(emitter.Path);
      if (dependency) queue.push(dependency);
    }
  } catch (error) {
    failed[key] = error.message;
  }
}

while (queue.length) await addModel(queue.shift());
const retryImages = Object.keys(manifest.missing || {}).filter(key => /\.(blp|tga)$/i.test(key));
for (const key of retryImages) images.delete(key);
await Promise.all([...new Set([...images, ...retryImages])].filter(key => !manifest.resources[key]).map(addImage));
manifest.missing = { ...manifest.missing, ...failed };
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({targets: [...targets], modelsAdded: [...source].filter(key => manifest.models[key]), imagesAdded: [...images].filter(key => manifest.resources[key]), failed, totals: { models: Object.keys(manifest.models).length, resources: Object.keys(manifest.resources).length, missing: Object.keys(manifest.missing || {}).length }}, null, 2));
