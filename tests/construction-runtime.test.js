import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime } from '../engine/runtime.js';
import { releaseTestAttack } from './support/attack.js';

const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const data = await read('../content/original-3.0/data.json'), terrain = await read('../content/original-3.0/terrain.json');
const rules = (await read('../content/original-3.0/gameplay.json')).rules;
function make(type) {
  const game = new Runtime(data, [{ slot: 0, name: 'Builder' }], 7, terrain, rules);
  game.start();game.tasks = [];game.timers = [];
  const player = game.players[0];player.gold = 100000;player.lumber = 1000;player.cap = 65;
  const worker = game.createUnit(player, game.fourCC(type), -2944, 2816);
  return { game, player, worker };
}
const snapshot = (game, unit) => game.snapshot().units.find(entry => entry.id === unit.hid);

test('all 66 profession buildings use their source duration, stay inactive until completion and finish exactly once', () => {
  const times = new Map();let count = 0;
  for (const type of ['h001', 'h002', 'h000', 'h004', 'h003', 'h06C']) for (const id of data.units[type].Builds.split(',')) {
    const { game, player } = make(type), definition = data.units[id], duration = Number(definition.bldtm), events = [];
    times.set(duration, (times.get(duration) || 0) + 1);count++;
    for (const required of String(definition.Requires || '').split(',').filter(Boolean)) player.tech[required] = 1;
    const fire = game.fire.bind(game);game.fire = (event, ctx) => { if (/CONSTRUCT_(?:START|FINISH)$/.test(event)) events.push({ event, unit: ctx.unit });return fire(event, ctx); };
    const tower = game.build(0, id, -3008, 2816);
    assert.deepEqual(snapshot(game, tower).construction, { kind: 'build', duration, remaining: duration, progress: 0 });
    assert.throws(() => game.action(0, { type: 'cast', unit: tower.hid, ability: 'A01H' }), /建造中/);
    assert.equal(game.cast(tower, game.fourCC('A01H')), false);
    assert.equal(tower.castCooldown.size, 0);
    game.tick(duration / 2);
    assert.equal(tower.constructed, false);assert.equal(snapshot(game, tower).construction.progress, .5);
    assert.equal(game.effects.some(effect => effect.kind === 'projectile' && effect.sourceId === tower.hid), false);
    game.tick(duration / 2 - .05);assert.equal(tower.constructed, false);
    game.tick(.1);assert.equal(tower.constructed, true);assert.equal(snapshot(game, tower).construction, undefined);
    game.tick(.1);
    assert.deepEqual(events.map(event => event.event), ['EVENT_PLAYER_UNIT_CONSTRUCT_START', 'EVENT_PLAYER_UNIT_CONSTRUCT_FINISH']);
    assert.ok(events.every(event => event.unit === tower));assert.deepEqual(game.errors, []);
  }
  assert.equal(count, 66);assert.deepEqual(Object.fromEntries(times), { 10: 27, 20: 18, 30: 19, 40: 2 });
});

test('all 18 item towers use the five-second ability duration and ten-second set upgrade, including reconnect snapshots', () => {
  for (const [index, type] of ['h001', 'h002', 'h000', 'h004', 'h003', 'h06C'].entries()) {
    const { game, worker } = make(type);game.globals.udg_playerzz[0] = index + 1;
    for (const [position, piece] of game.equipment[index].pieces.entries()) {
      const point = { x: -3008, y: 2816 + position * 192 };game.moveUnit(worker, point.x + 64, point.y);
      const item = game.createItem(piece.item, worker);assert.equal(game.pickup(worker, item), true);
      assert.equal(game.action(0, { type: 'item', unit: worker.hid, item: item.hid, ...point }), true);
      const tower = [...game.units.values()].find(unit => unit.raw === piece.base && !unit.upgradeTo);
      assert.equal(snapshot(game, worker).construction, undefined);
      assert.deepEqual(snapshot(game, tower).construction, { kind: 'build', duration: 5, remaining: 5, progress: 0 });
      game.tick(2.5);assert.equal(snapshot(game, tower).construction.progress, .5);
      game.tick(2.5);assert.equal(tower.constructed, true);
      assert.equal(game.action(0, { type: 'upgrade', unit: tower.hid, to: piece.unit }), true);
      assert.equal(tower.raw, piece.base);
      assert.throws(() => game.action(0, { type: 'target', unit: tower.hid, target: null }), /升级中/);
      game.tick(4);
      const reconnected = JSON.parse(JSON.stringify(game.snapshot())).units.find(unit => unit.id === tower.hid);
      assert.equal(reconnected.upgrade.type, piece.unit);
      assert.deepEqual(reconnected.construction, { kind: 'upgrade', duration: 10, remaining: 6, progress: .4 });
      game.tick(6);assert.equal(tower.raw, piece.unit);assert.equal(snapshot(game, tower).construction, undefined);
      assert.equal(snapshot(game, tower).upgrade, null);
    }
    assert.deepEqual(game.errors, []);
  }
});

test('construction suppresses attacks and aura sources; completion enables combat', () => {
  const { game } = make('h06C');
  const tower = game.build(0, 'h06E', -3008, 2816);
  const enemy = game.createUnit(game.players[8], game.fourCC('nanc'), tower.x + 200, tower.y);
  enemy.hp = enemy.maxHp = 1000000;
  const setAbility = game.equipment[5].ability;tower.abilities.set(game.fourCC(setAbility), 1);
  game.tick(9.9);
  assert.equal(enemy.equipmentAuras.size, 0);
  assert.equal(game.effects.some(effect => effect.kind === 'projectile' && effect.sourceId === tower.hid), false);
  assert.equal(game.constructionState(tower).kind, 'build');
  game.tick(.2);game.tick(.05);
  assert.ok(enemy.equipmentAuras.size > 0);
  releaseTestAttack(game,tower,enemy);
  assert.ok(game.effects.some(effect => effect.kind === 'projectile' && effect.sourceId === tower.hid));
  assert.deepEqual(game.errors, []);
});
