import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const json = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const data = json('content/original-3.0/data.json');
const presentation = json('content/original-3.0/presentation.json');
const visuals = json('public/map/visuals.json');
const manifest = json('public/warcraft/manifest.json');

const normalize = value => String(value ?? '').replaceAll('\\', '/').replace(/\/+/g, '/').replace(/^\/+/, '').toLowerCase();
const modelPath = value => {
  const p = normalize(value).trim().replace(/[),;]+$/g, '');
  if (!p || p === '_') return null;
  return /\.(mdl|mdx)$/i.test(p) ? p.replace(/\.mdl$/i, '.mdx') : `${p}.mdx`;
};
const modelToken = /[A-Za-z0-9_./\\-]+\.(?:mdl|mdx)\b/ig;
const modelsRoot = path.join(root, 'public/warcraft');
const localModels = new Set(Object.keys(manifest.models));
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.mdx$/i.test(entry.name)) localModels.add(normalize(path.relative(modelsRoot, full)));
  }
}
walk(modelsRoot);

function catalog(name) {
  return { name, refs: new Map() };
}
function add(cat, raw, source, field, kind = 'token') {
  const p = modelPath(raw);
  if (!p) return;
  const row = cat.refs.get(p) || { path: p, refs: [] };
  if (row.refs.length < 16) row.refs.push({ source, field, kind, raw: String(raw).slice(0, 240) });
  cat.refs.set(p, row);
}
function scan(cat, value, source, field) {
  if (value == null) return;
  for (const match of String(value).matchAll(modelToken)) add(cat, match[0], source, field, 'token');
}
function addFile(cat, record, source) { add(cat, record?.file, source, 'file', 'field'); }
function scanRecord(cat, record, source) { for (const [field, value] of Object.entries(record || {})) scan(cat, value, source, field); }
function rows(cat) {
  return [...cat.refs.values()].map(row => ({ ...row, present: localModels.has(row.path) }));
}
function summary(cat) {
  const r = rows(cat), missing = r.filter(x => !x.present);
  return { name: cat.name, total: r.length, present: r.length - missing.length, missing: missing.length };
}
function uniqueByPath(ids, source, getRecord) {
  const out = new Map();
  for (const id of ids) {
    const record = getRecord(id);
    const p = modelPath(record?.file);
    if (!p) continue;
    const row = out.get(p) || { path: p, ids: [], names: [], refs: [] };
    if (!row.ids.includes(id)) row.ids.push(id);
    const name = record?.Name || record?.name || id;
    if (name && !row.names.includes(name)) row.names.push(name);
    if (row.refs.length < 12) row.refs.push({ id, source, file: record.file });
    out.set(p, row);
  }
  return [...out.values()].map(row => ({ ...row, present: localModels.has(row.path) }));
}
function compactRows(rowsList) { return rowsList.map(({ path: p, ids, names, present, refs }) => ({ path: p, ids, names, present, refs })); }

const all = catalog('all-authored-model-references');
const allUnits = catalog('all-unit-models');
const allBuildings = catalog('all-building-models');
const allItems = catalog('all-item-models');
const allAbilities = catalog('all-ability-effect-models');
const allDoodads = catalog('all-doodad-models');
for (const [id, unit] of Object.entries(data.units || {})) {
  addFile(allUnits, unit, id);
  if (Number(unit.isbldg) === 1) addFile(allBuildings, unit, id);
  scanRecord(all, unit, id);
  scanRecord(allAbilities, unit, id);
}
for (const [id, item] of Object.entries(data.items || {})) { addFile(allItems, item, id); scanRecord(all, item, id); }
for (const [id, ability] of Object.entries(data.abilityData || {})) { scanRecord(all, ability, id); scanRecord(allAbilities, ability, id); }
for (const [id, ability] of Object.entries(data.abilityStrings || {})) { scanRecord(all, ability, id); scanRecord(allAbilities, ability, id); }
for (const [id, upgrade] of Object.entries(data.upgrades || {})) scan(all, upgrade, id, 'upgrade');
for (const [id, upgrade] of Object.entries(data.upgradeStrings || {})) scan(all, upgrade, id, 'upgradeStrings');
for (const [id, visual] of Object.entries(presentation.unitVisuals || {})) scan(all, visual.fields || visual, id, 'unitVisual');
for (const [id, visual] of Object.entries(presentation.abilityVisuals || {})) scan(all, visual.fields || visual, id, 'abilityVisual');
for (const [id, visual] of Object.entries(visuals.abilityVisuals || {})) scan(all, visual, id, 'builtAbilityVisual');
for (const model of presentation.embeddedModels || []) add(all, model, 'presentation', 'embeddedModels', 'field');
for (const placement of visuals.doodads || []) { add(allDoodads, placement.model, placement.id, 'model', 'field'); add(all, placement.model, placement.id, 'doodad', 'field'); }
for (const doodad of Object.values(data.doodads || {})) { scan(allDoodads, doodad, 'data.doodads', 'fields'); scan(all, doodad, 'data.doodads', 'fields'); }

const script = fs.readFileSync(path.join(root, 'content/original-3.0/script.j'), 'utf8');
const quoted = [...script.matchAll(/["']([A-Za-z0-9]{4})["']/g)].map(m => m[1]);
const mapUnitIds = new Set([...quoted.filter(id => data.units?.[id]), ...(data.waveUnits || []), ...(data.bossUnits || []), 'H05V']);
const mapAbilityIds = new Set();
for (const id of mapUnitIds) for (const ability of String(data.units?.[id]?.abilList || '').split(',')) if (ability && ability !== '_') mapAbilityIds.add(ability);
for (const id of quoted) if (data.abilityData?.[id]) mapAbilityIds.add(id);
const mapUnits = catalog('map-used-unit-models');
const mapBuildings = catalog('map-used-building-models');
const mapAbilities = catalog('map-used-ability-effect-models');
for (const id of mapUnitIds) {
  const unit = data.units?.[id]; if (!unit) continue;
  addFile(mapUnits, unit, id);
  if (Number(unit.isbldg) === 1) addFile(mapBuildings, unit, id);
  scanRecord(mapAbilities, unit, id);
}
for (const id of mapAbilityIds) {
  const ability = { ...(data.abilityStrings?.[data.abilityData?.[id]?.code] || {}), ...(data.abilityStrings?.[id] || {}) };
  scan(mapAbilities, ability, id, 'abilityVisual');
}
for (const match of script.matchAll(modelToken)) add(mapAbilities, match[0], 'script.j', 'model-literal', 'token');

const summonAllIds = new Set();
const summonMapIds = new Set();
const summonRefs = new Map();
function collectSummons(sourceAbilities, outputIds) {
  for (const id of sourceAbilities) {
    const ability = data.abilityData?.[id]; if (!ability) continue;
    for (const [field, value] of Object.entries(ability)) if (/unitid|summon|spawn|create/i.test(field)) {
      for (const raw of String(value).split(',')) {
        const unitId = raw.trim();
        if (!data.units?.[unitId]) continue;
        outputIds.add(unitId);
        const list = summonRefs.get(unitId) || [];
        if (list.length < 20) list.push(`${id}.${field}`);
        summonRefs.set(unitId, list);
      }
    }
  }
}
collectSummons(Object.keys(data.abilityData || {}), summonAllIds);
collectSummons(mapAbilityIds, summonMapIds);
const allSummons = uniqueByPath(summonAllIds, 'abilityData.UnitID', id => data.units[id]).map(row => ({ ...row, summonIds: row.ids, refs: row.ids.flatMap(id => summonRefs.get(id) || []).slice(0, 20) }));
const mapSummons = uniqueByPath(summonMapIds, 'map abilityData.UnitID', id => data.units[id]).map(row => ({ ...row, summonIds: row.ids, refs: row.ids.flatMap(id => summonRefs.get(id) || []).slice(0, 20) }));

const coreIds = new Set(['h001','h002','h000','h004','h003','h06C','H05V', ...(data.waveUnits || []), ...(data.bossUnits || [])]);
for (const id of ['h001','h002','h000','h004','h003','h06C']) for (const built of String(data.units?.[id]?.Builds || '').split(',')) if (data.units?.[built]) coreIds.add(built);
const coreUnits = uniqueByPath(coreIds, 'playable/waves/bosses', id => data.units[id]);
const allBuildingRows = uniqueByPath(Object.keys(data.units || {}).filter(id => Number(data.units[id].isbldg) === 1), 'data.units.isbldg', id => data.units[id]);
const mapBuildingRows = uniqueByPath([...mapUnitIds].filter(id => Number(data.units?.[id]?.isbldg) === 1), 'map used building', id => data.units[id]);
const allItemRows = uniqueByPath(Object.keys(data.items || {}), 'data.items.file', id => data.items[id]);
const mapItemIds = new Set(quoted.filter(id => data.items?.[id]));
const mapItemRows = uniqueByPath(mapItemIds, 'script item id', id => data.items[id]);
const doodadRows = rows(allDoodads);
const embeddedRows = (presentation.embeddedModels || []).map(raw => ({ path: modelPath(raw), raw, present: localModels.has(modelPath(raw)) }));

const sourceFiles = [];
function walkText(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkText(full);
    else if (/\.(txt|slk|j|wts|json)$/i.test(entry.name)) sourceFiles.push(full);
  }
}
walkText(path.join(root, 'content/original-3.0/extracted'));
const extracted = catalog('extracted-text-model-references');
for (const file of sourceFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(modelToken)) add(extracted, match[0], path.relative(root, file), 'text', 'token');
}

const result = {
  generatedAt: new Date().toISOString(),
  source: {
    map: data.source,
    units: Object.keys(data.units || {}).length,
    items: Object.keys(data.items || {}).length,
    abilityData: Object.keys(data.abilityData || {}).length,
    abilityStrings: Object.keys(data.abilityStrings || {}).length,
    waveUnits: (data.waveUnits || []).length,
    bossUnits: (data.bossUnits || []).length,
    mapUnitIds: mapUnitIds.size,
    mapAbilityIds: mapAbilityIds.size,
    mapItemIds: mapItemIds.size,
  },
  manifest: { models: Object.keys(manifest.models || {}).length, resources: Object.keys(manifest.resources || {}).length, failedDownloads: Object.keys(manifest.missing || {}).length, localModels: localModels.size },
  catalogs: [all, allUnits, allBuildings, allItems, allAbilities, allDoodads, mapUnits, mapBuildings, mapAbilities, extracted].map(summary),
  core: compactRows(coreUnits),
  buildings: { all: compactRows(allBuildingRows), mapUsed: compactRows(mapBuildingRows) },
  summons: { all: allSummons, mapUsed: mapSummons },
  items: { all: compactRows(allItemRows), mapUsed: compactRows(mapItemRows) },
  doodads: doodadRows,
  embedded: embeddedRows,
  missing: {
    all: rows(all).filter(x => !x.present),
    allUnits: rows(allUnits).filter(x => !x.present),
    allBuildings: rows(allBuildings).filter(x => !x.present),
    allItems: rows(allItems).filter(x => !x.present),
    allAbilities: rows(allAbilities).filter(x => !x.present),
    mapUnits: rows(mapUnits).filter(x => !x.present),
    mapBuildings: rows(mapBuildings).filter(x => !x.present),
    mapAbilities: rows(mapAbilities).filter(x => !x.present),
    summonsAll: allSummons.filter(x => !x.present),
    summonsMap: mapSummons.filter(x => !x.present),
    itemsAll: allItemRows.filter(x => !x.present),
    itemsMap: mapItemRows.filter(x => !x.present),
    doodads: doodadRows.filter(x => !x.present),
    embedded: embeddedRows.filter(x => !x.present),
    extracted: rows(extracted).filter(x => !x.present),
  },
};
fs.writeFileSync(path.join(root, 'artifacts/model-resource-audit.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({manifest:result.manifest, source:result.source, catalogs:result.catalogs, focus:{core:{total:result.core.length,missing:result.core.filter(x=>!x.present).length},buildings:{all:result.buildings.all.length,allMissing:result.missing.allBuildings.length,mapUsed:result.buildings.mapUsed.length,mapMissing:result.missing.mapBuildings.length},summons:{all:result.summons.all.length,allMissing:result.missing.summonsAll.length,mapUsed:result.summons.mapUsed.length,mapMissing:result.missing.summonsMap.length},items:{all:result.items.all.length,allMissing:result.missing.itemsAll.length,mapUsed:result.items.mapUsed.length,mapMissing:result.missing.itemsMap.length},doodads:{total:result.doodads.length,missing:result.missing.doodads.length},embedded:{total:result.embedded.length,missing:result.missing.embedded.length}}},null,2));
