import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime, fourCC } from '../engine/runtime.js';
import { compactNetworkState } from '../engine/network-state.js';

const read = async file => JSON.parse(await readFile(new URL(`../content/original-3.0/${file}`, import.meta.url), 'utf8'));
const data = await read('data.json'), rules = (await read('gameplay.json')).rules;
function make() {
  const game = new Runtime(data, [{ slot: 0, name: '甲' }, { slot: 1, name: '乙' }], 7, null, rules);
  game.start();
  // Let the original leaderboard and player setup finish before real death events.
  for (let i = 0; i < 220; i++) game.tick(.05);
  game.tasks = [];game.timers = [];
  game.globals.udg_nokuaisumode = true;game.globals.udg_waves = 11;
  return game;
}
const create = (game, id, owner = 0, x = 0, y = 0) => game.createUnit(game.players[owner], fourCC(id), x, y);
const kill = (game, source) => { const enemy = create(game, 'hfoo', 8, 128, 128);game.kill(enemy, source);return enemy; };
function waterFromOriginalSpell(game, building) {
  game.run('OpenTrigger', [4]);
  const enemy = create(game, 'hfoo', 8, 128, 128);enemy.hp = enemy.maxHp = 1e9;
  assert.equal(game.cast(building, fourCC('A05C'), enemy, null, true), true);
  const water = [...game.units.values()].find(unit => unit.raw === 'hwat' && unit.summoner === building);
  assert.ok(water, 'the original summoner spell creates its water elemental');
  return water;
}

test('the original warlock summon spell credits its building and counts gold and player kills once', () => {
  const game = make(), building = create(game, 'h02O'), water = waterFromOriginalSpell(game, building);
  game.random = () => 0;
  const gold = game.players[0].gold, kills = game.globals.udg_Kills[1];
  const enemy = kill(game, water), bounty = Number(data.units.hfoo.bountyplus) + Number(data.units.hfoo.bountydice);
  assert.equal(building.data, 13);assert.equal(water.data, 0);
  assert.equal(enemy.killer, water, 'other original death callbacks retain the actual killing unit');
  assert.equal(game.globals.udg_Kills[1], kills + 1);
  assert.equal(game.players[0].gold - gold, bounty);
  assert.deepEqual(game.errors, []);
});

test('summons retain their specific building through multiple merit promotions', () => {
  const game = make(), building = create(game, 'h02O'), water = waterFromOriginalSpell(game, building);
  const neighbour = create(game, 'h02O', 0, 32, 0);
  building.data = 149;kill(game, water);
  const second = building.replacement;
  assert.equal(second.raw, 'h02N');assert.equal(second.data, 0);
  assert.deepEqual(second.replaces, [building.hid]);
  kill(game, water);assert.equal(second.data, 13);
  second.data = 249;kill(game, water);
  const third = second.replacement;
  assert.equal(third.raw, 'h02M');kill(game, water);
  assert.equal(third.data, 13);assert.equal(neighbour.data, 0);
  assert.deepEqual(third.replaces, [second.hid, building.hid]);
  const snapshot = game.snapshot().units.find(unit => unit.id === third.hid);
  assert.deepEqual(snapshot.replaces, third.replaces);assert.equal(snapshot.growth.current, 13);
  assert.deepEqual(game.errors, []);
});

test('native summons and summons created by another summon return merit to their root building', () => {
  for (const [ability, type] of [['A008','hwat'], ['A01R','efon'], ['A02R','osw1'], ['A03J','n004'], ['A017','nlv2'], ['A07L','nfac']]) {
    const game = make(), building = create(game, 'h02O');
    assert.equal(game.cast(building, fourCC(ability), null, { x: 32, y: 0 }, true), true);
    const summon = [...game.units.values()].find(unit => unit.summoner === building && unit.raw === type);
    assert.ok(summon, type);kill(game, summon);assert.equal(building.data, 13, type);
    const [child] = game.summon(summon, 'hwat', { x: 64, y: 0 }, 1, 60);
    kill(game, child);assert.equal(building.data, 26, `${type} child`);
    assert.equal(summon.data, 0);assert.equal(child.data, 0);
    assert.equal(game.buildingProgression(summon), null);
    assert.deepEqual(game.errors, []);
  }
});

test('original JASS helper units carry their caster ownership through a delayed trigger', () => {
  const game = make(), building = create(game, 'h02O');
  game.functions.progressionProbe = function* () {
    yield { wait: .1 };
    const helper = game.natives.CreateUnit(building.owner, fourCC('e009'), 64, 0, 270);
    kill(game, helper);
  };
  game.run('progressionProbe', [], { caster: building });
  const task = game.tasks.shift();game.time += .1;game.resume(task);
  assert.equal(building.data, 13);assert.deepEqual(game.errors, []);
});

test('dead, sold, transferred, unrelated and hostile sources cannot give a nearby building merit', () => {
  for (const mode of ['sold', 'dead', 'transferred']) {
    const game = make(), building = create(game, 'h02O'), neighbour = create(game, 'h02O', 0, 32, 0);
    const [summon] = game.summon(building, 'hwat', { x: 64, y: 0 }, 1, 60);
    if (mode === 'sold') game.removeUnit(building);
    if (mode === 'dead') game.kill(building);
    if (mode === 'transferred') building.owner = game.players[1];
    kill(game, summon);assert.equal(building.data, 0, mode);assert.equal(neighbour.data, 0, mode);
    assert.deepEqual(game.errors, []);
  }
  const game = make(), building = create(game, 'h02O'), unrelated = create(game, 'hwat', 0, 32, 0);
  kill(game, unrelated);assert.equal(building.data, 0);
  const [summon] = game.summon(building, 'hwat', { x: 64, y: 0 }, 1, 60);
  const allied = create(game, 'hfoo', 1, 128, 0);game.kill(allied, summon);
  assert.equal(building.data, 0, 'allied deaths do not run the original enemy merit trigger');
});

test('building upgrades preserve pending summon merit and each kill keeps its original wave value', () => {
  const game = make(), building = create(game, 'h026');
  game.players[0].gold = 1e6;game.players[0].lumber = 1e6;game.players[0].cap = 65;
  for (const required of String(data.units.h027.Requires || '').split(',').filter(Boolean)) game.players[0].tech[required] = 1;
  const [summon] = game.summon(building, 'hwat', { x: 32, y: 0 }, 1, 60);
  building.data = 20;game.upgradeBuilding(building, 'h027');
  kill(game, summon);assert.equal(building.data, 20);
  game.globals.udg_waves = 12;kill(game, summon);
  const growth = game.buildingProgression(building);
  assert.equal(growth.current, 47);assert.equal(growth.pending, 27);
  const playerKills = game.globals.udg_Kills[1], gold = game.players[0].gold;
  game.time = building.upgradeEnd;game.updateCombat(.05);
  assert.equal(building.raw, 'h027');assert.equal(building.data, 47);
  assert.equal(game.globals.udg_waves, 12);assert.equal(game.buildingProgression(building).pending, 0);
  assert.equal(game.globals.udg_Kills[1], playerKills);assert.equal(game.players[0].gold, gold);
  game.flushMerit(building);assert.equal(building.data, 47, 'flushing twice cannot award duplicate merit');
  assert.deepEqual(game.errors, []);
});

test('construction queues merit and flushes it when the building completes', () => {
  const game = make(), building = create(game, 'h02O');
  const [summon] = game.summon(building, 'hwat', { x: 32, y: 0 }, 1, 60);
  game.startConstruction(building, 2);kill(game, summon);
  assert.equal(building.data, 0);assert.equal(game.buildingProgression(building).pending, 13);
  const control = create(game, 'h02O', 0, 256, 0);
  game.fire('EVENT_PLAYER_UNIT_CONSTRUCT_FINISH', { unit: control, player: control.owner });
  game.time = building.constructEnd;game.updateCombat(.05);
  assert.equal(building.data, control.data + 13, 'the original construction merit bonus is preserved');assert.equal(game.buildingProgression(building).pending, 0);
});

test('visible merit thresholds agree with actual original promotions across all six professions', () => {
  for (const [from, to, first, last] of [[1,2,1,24], [2,3,1,48], [3,4,25,72], [4,5,49,72]]) {
    const game = make();game.globals.udg_waves = 0;
    for (let index = first; index <= last; index++) {
      if (!data.arrays[`level${from}`][index] || !data.arrays[`level${to}`][index]) continue;
      const building = create(game, data.arrays[`level${from}`][index], 0, index * 128, 0);
      const growth = game.buildingProgression(building);
      assert.equal(growth.kind, 'promotion');assert.equal(growth.current, 0);
      if (growth.source === 'cast') continue;
      building.data = growth.required - 3;kill(game, building);
      assert.equal(building.removed, undefined, `${building.raw} before threshold`);
      kill(game, building);
      assert.equal(building.replacement?.raw, data.arrays[`level${to}`][index], `${building.raw} at displayed threshold`);
      assert.equal(building.replacement.data, 0);
    }
    assert.deepEqual(game.errors, []);
  }
});

test('set-building progress advances through both original skill milestones', () => {
  const game = make();game.globals.udg_waves = 0;
  for (const [index, type] of Object.entries(data.arrays.levelT1)) {
    const building = create(game, type), first = game.buildingProgression(building);
    assert.equal(first.kind, 'ability');assert.equal(first.required, 150);
    building.data = first.required - 2;kill(game, building);
    assert.ok(building.abilities.has(fourCC(data.arrays.jinengT2[index])));
    const second = game.buildingProgression(building);assert.equal(second.required, 400);
    building.data = second.required - 2;kill(game, building);
    assert.ok(building.abilities.has(fourCC(data.arrays.jinengT3[index])));
    assert.equal(game.buildingProgression(building).required, null);
  }
  assert.deepEqual(game.errors, []);
});

test('learned skills, paid upgrades, training and attack-triggered growth display their own requirements', () => {
  const game = make();game.globals.udg_waves = 0;
  const veteran = create(game, 'h043');
  assert.equal(game.buildingProgression(veteran).required, 5000);
  veteran.data = 4998;kill(game, veteran);
  assert.ok(veteran.abilities.has(fourCC('A07C')));assert.equal(game.buildingProgression(veteran).required, 10000);
  veteran.data = 9998;kill(game, veteran);
  assert.ok(veteran.abilities.has(fourCC('A097')));assert.equal(game.buildingProgression(veteran).required, null);
  const paid = create(game, 'h027');assert.equal(game.buildingProgression(paid).kind, 'manual');assert.equal(game.buildingProgression(paid).required, null);
  const trainee = create(game, 'h04R');game.natives.UnitAddAbility(trainee, fourCC('A08P'));trainee.data = -3000;
  assert.equal(game.buildingProgression(trainee).current, 0);kill(game, trainee);
  assert.equal(game.buildingProgression(trainee).current, 2);assert.equal(game.buildingProgression(trainee).required, 3000);
  for (const [type, required] of [['h073',250], ['h072',400]]) {
    const building = create(game, type), [summon] = game.summon(building, 'hwat', { x: 32, y: 0 }, 1, 60);
    const growth = game.buildingProgression(building);assert.equal(growth.source, 'cast');assert.equal(growth.required, required);
    kill(game, summon);assert.equal(building.data, 0, 'attack-triggered growth is not awarded again on kill');
    game.globals.udg_nokuaisumode = false;assert.equal(game.buildingProgression(building).required, required);
    game.run('OpenTrigger', [6]);building.data = required - 2;building.mana = building.maxMana;
    game.fire('EVENT_PLAYER_UNIT_ATTACKED', { attacker: building, unit: create(game, 'hfoo', 8, 128, 0) });
    assert.ok(building.replacement, 'the displayed skill merit threshold triggers its original promotion');
  }
});

test('fast mode advertises the next single-kill promotion and does not use normal merit thresholds', () => {
  const game = make(), building = create(game, 'h02O');game.globals.udg_nokuaisumode = false;
  const water = waterFromOriginalSpell(game, building), growth = game.buildingProgression(building);
  assert.equal(growth.fast, true);assert.equal(growth.required - growth.current, 13);
  kill(game, water);assert.equal(building.replacement?.raw, 'h02N');
  kill(game, water);assert.equal(building.replacement.replacement?.raw, 'h02M');
  assert.deepEqual(game.errors, []);
});

test('network state keeps allied growth while compacting enemy-only inspector fields', () => {
  const game = make(), building = create(game, 'h02O'), worker = create(game, 'h004'), enemy = create(game, 'h02O', 8);
  const state = compactNetworkState(game.snapshot());
  assert.equal(state.units.find(unit => unit.id === building.hid).growth.required, 150);
  assert.equal(state.units.find(unit => unit.id === worker.hid).growth, null);
  assert.equal('growth' in state.units.find(unit => unit.id === enemy.hid), false);
});
