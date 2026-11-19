import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildingRequirement, orderedBuildings } from '../public/building-options.js';

const data = JSON.parse(await readFile(new URL('../content/original-3.0/data.json', import.meta.url), 'utf8'));
const definitions = Object.fromEntries(Object.entries(data.units).map(([id, d]) => [id, { name: d.Name, cost: Number(d.goldcost) || 0, lumberCost: Number(d.lumbercost) || 0, food: Number(d.fused) || 0, requires: String(d.Requires || '').split(',').filter(Boolean) }]));
const player = () => ({ slot: 0, gold: 900, lumber: 12, food: 0, cap: 20, tech: {} });

test('all six profession menus start with an affordable original base tower', () => {
  for (const id of ['h001', 'h002', 'h000', 'h004', 'h003', 'h06C']) {
    const builds = orderedBuildings(data.units[id].Builds, definitions);
    assert.equal(builds.length, 11);
    assert.equal(buildingRequirement(definitions[builds[0]], player(), [], definitions, 'playing').valid, true);
    const originalFirst = data.units[id].Builds.split(',')[0];
    assert.equal(buildingRequirement(definitions[originalFirst], player(), [], definitions, 'playing').valid, false);
    assert.match(buildingRequirement(definitions[originalFirst], player(), [], definitions, 'playing').reason, /需要/);
  }
});

test('building choices explain missing prerequisites and only accept completed living owned towers', () => {
  const self = { ...player(), gold: 5000 }, definition = definitions.h018;
  const check = units => buildingRequirement(definition, self, units, definitions, 'playing');
  const prerequisite = { owner: 0, type: 'h00V', construct: 0 };
  assert.equal(check([prerequisite]).valid, true);
  for (const change of [{ owner: 1 }, { dead: true }, { removed: true }, { construct: 1 }]) assert.equal(check([{ ...prerequisite, ...change }]).valid, false);
  self.tech.h00V = 1;assert.equal(check([]).valid, true);
});

test('building choices report gold, lumber, population and ended battles before placement', () => {
  const definition = { cost: 1000, lumberCost: 13, food: 21 }, self = player();
  assert.match(buildingRequirement(definition, self, [], definitions, 'playing').reason, /金币不足/);
  self.gold = 1000;assert.match(buildingRequirement(definition, self, [], definitions, 'playing').reason, /木材不足/);
  self.lumber = 13;assert.match(buildingRequirement(definition, self, [], definitions, 'playing').reason, /人口不足/);
  self.cap = 30;assert.equal(buildingRequirement(definition, self, [], definitions, 'playing').valid, true);
  assert.match(buildingRequirement(definition, self, [], definitions, 'defeat').reason, /基地已失守/);
  assert.equal(buildingRequirement({ cost: 1000, food: 1 }, player(), [], definitions, 'playing', { item: true }).valid, true);
});
