import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime } from '../engine/runtime.js';

const data = JSON.parse(await readFile(new URL('../content/original-3.0/data.json', import.meta.url), 'utf8'));
const rules = JSON.parse(await readFile(new URL('../content/original-3.0/gameplay.json', import.meta.url), 'utf8')).rules;
const map = flags => ({ offset: [0, 0], pathing: { width: 7, height: 7, cell: 32, flags } });
const make = terrain => new Runtime(data, [{ slot: 0, name: '甲' }, { slot: 1, name: '乙' }], 7, terrain || map(new Uint8Array(49)), rules);
function advance(game, seconds) { for (let time = 0; time < seconds; time += .05) { game.time += .05;game.updateCombat(.05); } }

test('original water elementals, treants, wolves, bears, lava spawns and infernals accept player movement and retain summon lifetime', () => {
  for (const [ability, type] of [['A008', 'hwat'], ['A01R', 'efon'], ['A02R', 'osw1'], ['A03J', 'n004'], ['A017', 'nlv2'], ['A03U', 'n002']]) {
    const game = make(), caster = game.createUnit(game.players[0], game.fourCC('h004'), 48, 48);
    assert.equal(game.cast(caster, game.fourCC(ability), null, { x: 48, y: 112 }, true), true);
    if(data.abilityData[ability].code==='AUin')advance(game,Number(data.abilityData[ability].DataC1));
    const summon = [...game.units.values()].find(unit => unit.summoner === caster && unit.raw === type);
    assert.ok(summon, type);const expires = summon.expires;
    assert.equal(game.snapshot().units.find(unit => unit.id === summon.hid).canMove, true);
    assert.equal(game.action(0, { type: 'move', unit: summon.hid, x: 176, y: 112 }), true);
    assert.equal(summon.order, 851986);
    advance(game, .5);assert.deepEqual([summon.x, summon.y], [176, 112], type);
    assert.equal(summon.expires, expires);assert.equal(summon.owner, caster.owner);
  }
});

test('summoned melee and ranged units acquire targets before weapon range and attack automatically', () => {
  const wide = () => new Runtime(data, [{ slot: 0, name: 'a' }, { slot: 1, name: 'b' }], 64, { offset: [0, 0], pathing: { width: 64, height: 64, cell: 32, flags: new Uint8Array(64 * 64) } }, rules);
  const game = wide(), caster = game.createUnit(game.players[0], game.fourCC('h004'), 16, 16);
  const treant = game.createUnit(game.players[0], game.fourCC('efon'), 16, 16);
  treant.summoner = caster; treant.ai = true;
  const meleeTarget = game.createUnit(game.players[8], game.fourCC('hfoo'), 500, 16);
  meleeTarget.move = null; meleeTarget.hp = meleeTarget.maxHp = 1e9;
  game.time += .05; game.updateCombat(.05);
  assert.equal(treant.target, meleeTarget, 'acquisition uses the source 1500 range');
  assert.ok(treant.move, 'a mobile melee summon approaches a target outside weapon range');
  advance(game, 1);
  assert.ok(meleeTarget.hp < 1e9, 'the melee summon attacks after reaching its 100 range');

  const rangedGame = wide(), rangedCaster = rangedGame.createUnit(rangedGame.players[0], rangedGame.fourCC('h004'), 16, 300);
  const water = rangedGame.createUnit(rangedGame.players[0], rangedGame.fourCC('hwat'), 16, 300);
  water.summoner = rangedCaster; water.ai = true;
  const rangedTarget = rangedGame.createUnit(rangedGame.players[8], rangedGame.fourCC('hfoo'), 1200, 300);
  rangedTarget.move = null; rangedTarget.hp = rangedTarget.maxHp = 1e9;
  rangedGame.time += .05; rangedGame.updateCombat(.05);
  assert.equal(water.target, rangedTarget, 'the ranged summon notices targets inside acquisition range');
  assert.ok(water.move, 'the ranged summon closes distance until its weapon can fire');
  advance(rangedGame, 2);
  assert.ok(rangedTarget.hp < 1e9, 'the ranged summon fires after reaching its 800 range');
});

test('ground summons obey walkability, flying summons cross ground obstacles and ground units, and no-fly barriers stay blocked', () => {
  const flags = new Uint8Array(49);for (let row = 0; row < 7; row++) flags[row * 7 + 3] = 2;
  const game = make(map(flags)), ground = game.createUnit(game.players[0], game.fourCC('ndr1'), 48, 112);
  assert.equal(game.action(0, { type: 'move', unit: ground.hid, x: 176, y: 112 }), false);
  const flying = game.createUnit(game.players[0], game.fourCC('hwat'), 48, 112);
  const obstacle = game.createUnit(game.players[0], game.fourCC('h01M'), 112, 112);
  assert.equal(game.action(0, { type: 'move', unit: flying.hid, x: 176, y: 112 }), true);
  advance(game, .5);assert.deepEqual([flying.x, flying.y], [176, 112]);assert.equal(obstacle.x, 112);
  const noFly = new Uint8Array(49);for (let row = 0; row < 7; row++) noFly[row * 7 + 3] = 4;
  const restricted = make(map(noFly)), blocked = restricted.createUnit(restricted.players[0], restricted.fourCC('hwat'), 48, 112);
  assert.equal(restricted.action(0, { type: 'move', unit: blocked.hid, x: 176, y: 112 }), false);
  assert.equal(blocked.move, undefined);
});

test('fixed summoned factories and towers cannot move, and other players cannot command summons', () => {
  const game = make(), caster = game.createUnit(game.players[0], game.fourCC('h004'), 48, 48);
  game.cast(caster, game.fourCC('A07L'), null, { x: 80, y: 112 }, true);
  const factory = [...game.units.values()].find(unit => unit.summoner === caster && unit.raw === 'nfac');
  assert.ok(factory);assert.equal(game.snapshot().units.find(unit => unit.id === factory.hid).canMove, false);
  assert.throws(() => game.action(0, { type: 'move', unit: factory.hid, x: 176, y: 112 }), /不能移动/);
  const tower = game.createUnit(game.players[0], game.fourCC('h01M'), 48, 176);
  assert.throws(() => game.action(0, { type: 'move', unit: tower.hid, x: 176, y: 112 }), /建筑不能移动/);
  const summon = game.createUnit(game.players[0], game.fourCC('hwat'), 48, 112);
  assert.throws(() => game.action(1, { type: 'move', unit: summon.hid, x: 176, y: 112 }), /自己的单位/);
  const enemy = game.createUnit(game.players[8], game.fourCC('hfoo'), 176, 176);
  summon.manualTarget = enemy;summon.target = enemy;
  assert.equal(game.action(0, { type: 'move', unit: summon.hid, x: 176, y: 112 }), true);
  assert.equal(summon.manualTarget, null);assert.equal(summon.target, null);
  summon.buffs.push({ kind: 'root', until: game.time + 1 });advance(game, .5);
  assert.equal(summon.x, 48, 'movement waits for a root to end');
  advance(game, 1);assert.deepEqual([summon.x, summon.y], [176, 112]);
  game.kill(summon);assert.equal(game.canMove(summon), false);
  assert.throws(() => game.action(0, { type: 'move', unit: summon.hid, x: 48, y: 112 }), /无法操作/);
});
