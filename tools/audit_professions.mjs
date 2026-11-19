import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { originalEquipment } from '../engine/equipment.js';
import { resolveAbility, abilityControls } from '../engine/ability-data.js';
import { buildingFootprints } from '../public/building-footprints.js';
import { buildingFootprint } from '../public/placement.js';
import { polygonBounds } from '../public/footprint-geometry.js';

const professions = [
  ['YM', 'h001'], ['LR', 'h002'], ['DZ', 'h000'],
  ['SS', 'h004'], ['YX', 'h003'], ['MJS', 'h06C']
];
const ids = text => String(text || '').split(',').filter(id => id && id !== '_');
const references = text => [...String(text).matchAll(/'([A-Za-z0-9]{4})'/g)].map(match => match[1]);
export const modelPath = path => String(path || '').replaceAll('\\', '/').toLowerCase().replace(/\.mdl$/i, '.mdx');

export function professionRoster(data, functions = {}) {
  const equipment = originalEquipment(data);
  return professions.map(([prefix, worker], classIndex) => {
    const buildable = ids(data.units[worker].Builds), buildings = new Set(buildable);
    const set = equipment.find(set => set.classId === classIndex + 1);
    for (const piece of set.pieces) { buildings.add(piece.base);buildings.add(piece.unit); }
    let changed;
    do {
      changed = false;
      const add = id => { if (id && !buildings.has(id)) { buildings.add(id);changed = true; } };
      for (const table of ['level1', 'level2', 'level3', 'level4', 'level5']) {
        for (const [index, id] of Object.entries(data.arrays[table])) if (buildings.has(id)) {
          for (let level = 1;level <= 5;level++) add(data.arrays[`level${level}`][index]);
        }
      }
      for (const id of buildings) for (const next of ids(data.units[id]?.Upgrade)) add(next);
    } while (changed);
    const scriptedFunctions = Object.entries(functions).filter(([name]) => name.startsWith(`Trig_${prefix}`) || name.startsWith(`fun_${prefix}`));
    const refs = new Set(scriptedFunctions.flatMap(([, fn]) => references(fn.body)));
    const levelUp = functions.Trig_LevelUp_Actions?.body || '';
    for (const [name, fn] of Object.entries(functions).filter(([name]) => /^Trig_LevelUp_Func\d+C$/.test(name))) {
      if (!references(fn.body).some(id => buildings.has(id))) continue;
      const start = levelUp.indexOf(`if(${name}())then`), end = levelUp.indexOf('\nendif', start);
      if (start >= 0) for (const id of references(levelUp.slice(start, end))) refs.add(id);
    }
    const abilityIds = new Set([set.ability]);
    for (const id of refs) if (data.abilityData[id] || data.abilities[id]) abilityIds.add(id);
    for (const [index, id] of Object.entries(data.arrays.levelT1)) if (buildings.has(id)) {
      for (const table of ['jinengT1', 'jinengT2', 'jinengT3', 'jinengS1', 'jinengS2', 'jinengS3']) {
        const ability = data.arrays[table][index];if (ability) abilityIds.add(ability);
      }
    }
    const units = new Set([worker, ...buildings, ...[...refs].filter(id => data.units[id])]);
    const inspectUnit = id => { for (const ability of ids(data.units[id]?.abilList)) abilityIds.add(ability); };
    for (const id of units) inspectUnit(id);
    for (const id of abilityIds) {
      const ability = resolveAbility(data, id);
      for (let level = 1;level <= Math.max(1, Number(ability.levels) || 1);level++) {
        for (const type of [...ids(ability[`UnitID${level}`]), ...(ability.code === 'ANsy' ? ids(ability[`DataB${level}`]) : [])]) {
          if (data.units[type] && !units.has(type)) { units.add(type);inspectUnit(type); }
        }
      }
    }
    return { prefix, worker, name: data.units[worker].Name, buildable, buildings: [...buildings], equipment: set, units: [...units], abilities: [...abilityIds], scriptedFunctions: scriptedFunctions.map(([name]) => name) };
  });
}

export function professionAudit(data, functions, manifest) {
  return professionRoster(data, functions).map(roster => {
    const effects = new Set(), models = new Set(), visuals = [];
    for (const id of roster.units) {
      const unit=data.units[id],path = modelPath(unit?.file);if (path && path !== '_') models.add(path.endsWith('.mdx') ? path : `${path}.mdx`);
      if(Number(unit?.weapsOn)&1)for(const missile of String(unit.Missileart||'').split(','))if(/\.(mdl|mdx)$/i.test(missile.trim()))models.add(modelPath(missile.trim()));
    }
    for (const id of roster.abilities) {
      const ability = resolveAbility(data, id);
      visuals.push({ ...data.abilityStrings[ability.code], ...data.abilityStrings[id] });
      for (let level = 1;level <= Math.max(1, Number(ability.levels) || 1);level++) {
        for (const ref of [...ids(ability[`BuffID${level}`]), ...ids(ability[`EfctID${level}`])]) effects.add(ref);
      }
    }
    for (const id of effects) visuals.push(data.abilityStrings[id] || {});
    for (const visual of visuals) for (const [key, value] of Object.entries(visual)) {
      if (!/art$/i.test(key)) continue;
      for (const path of String(value).split(',')) if (/\.(mdl|mdx)$/i.test(path)) models.add(modelPath(path));
    }
    return {
      ...roster,
      unitDefinitions: Object.fromEntries(roster.units.map(id=>[id,data.units[id]])),
      abilityDefinitions: Object.fromEntries(roster.abilities.map(id=>{
        const definition=resolveAbility(data,id);
        return[id,{definition,visual:{...data.abilityStrings[definition.code],...data.abilityStrings[id]}}];
      })),
      buildings: roster.buildings.map(id => {
        const unit = data.units[id];
        return { id, name: unit.Name, buildable: roster.buildable.includes(id), upgradeTo: unit.Upgrade || null, requires: ids(unit.Requires), gold: Number(unit.goldcost) || 0, lumber: Number(unit.lumbercost) || 0, food: Number(unit.fused) || 0, buildTime: Number(unit.bldtm) || 0, hp: Number(unit.HP) || 1, mana: Number(unit.manaN ?? unit.realM) || 0, armor: Number(unit.def) || 0, attackEnabled: Boolean(Number(unit.weapsOn) & 1), attackType: unit.atkType1, weaponType: unit.weapTp1, range: Number(unit.rangeN1) || 0, cooldown: Number(unit.cool1) || 0, model: modelPath(unit.file), modelScale: Number(unit.modelScale) || 1, selectionScale: Number(unit.scale) || 1, animationProperties: unit.Animprops || '', pathingTexture: unit.pathTex || '', footprint: { ...buildingFootprints[id], facing: 270, bounds: polygonBounds(buildingFootprint(id)) }, abilities: ids(unit.abilList).map(ability => ({ id: ability, code: resolveAbility(data, ability).code, ...abilityControls(data, id, ability) })) };
      }),
      abilityCodes: [...new Set(roster.abilities.map(id => resolveAbility(data, id).code))].sort(),
      models: [...models].map(path => ({ path, available: Boolean(manifest.models[path]) })),
      missingModels: [...models].filter(path => !manifest.models[path])
    };
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
  const [data, functions, manifest] = await Promise.all([
    read('../content/original-3.0/data.json'), read('../content/original-3.0/functions.json'), read('../public/warcraft/manifest.json')
  ]);
  const sourceSha256=createHash('sha256').update(await readFile(new URL('../content/original-3.0/source/map.w3x',import.meta.url))).digest('hex');
  const report = { sourceSha256, professions: professionAudit(data, functions, manifest) };
  await writeFile(new URL('../artifacts/profession-parity-audit.json', import.meta.url), JSON.stringify(report, null, 2));
  for (const row of report.professions) console.log(JSON.stringify({ name: row.name, buildable: row.buildable.length, buildings: row.buildings.length, manualUpgrades: row.buildings.filter(unit => unit.upgradeTo).length, abilities: row.abilities.length, units: row.units.length, models: row.models.length, missingModels: row.missingModels, abilityCodes: row.abilityCodes }));
}
