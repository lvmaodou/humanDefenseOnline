import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime } from '../engine/runtime.js';

const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const data = await read('../content/original-3.0/data.json');
const terrain = await read('../content/original-3.0/terrain.json');
const rules = (await read('../content/original-3.0/gameplay.json')).rules;
function advance(game, seconds) { for (let elapsed = 0; elapsed < seconds - .001; elapsed += .05) game.tick(.05); }

test('overlapping original wave spawns can separate and advance without any control buffs', () => {
  for (const type of ['nanc', 'ugar']) {
    const game = new Runtime(data, [], 7, terrain, rules);
    const units = game.natives.CreateNUnitsAtLoc(4, game.fourCC(type), game.players[8], { x: -4352, y: 6912 }, 270);
    for (const unit of units) assert.equal(game.setMove(unit, { x: -4352, y: 5800 }), true);
    advance(game, 3);
    for (const unit of units) {
      assert.ok(unit.y < 6300, `${type} ${unit.hid} leaves the overlapping spawn`);
      assert.deepEqual(unit.buffs, []);
      assert.equal(game.pathingFor(unit).isWalkable(unit.x, unit.y), true);
    }
    assert.deepEqual(game.errors, []);
  }
});

test('a temporary crowd keeps its move order and does not repeatedly search the unchanged terrain', () => {
  const game = new Runtime(data, [], 7);
  const unit = game.createUnit(game.players[8], game.fourCC('nanc'), 0, 0);
  const crowd = [[16, 0], [-16, 0], [0, 16], [0, -16]].map(([x, y]) => game.createUnit(game.players[8], game.fourCC('nanc'), x, y));
  assert.equal(game.setMove(unit, { x: 600, y: 0 }), true);
  advance(game, 1);
  assert.ok(unit.move, 'a blocked move order survives the previous half-second timeout');
  assert.deepEqual([unit.x, unit.y], [0, 0]);
  for (const other of crowd) game.removeUnit(other);
  advance(game, 2.1);
  assert.ok(Math.hypot(unit.x - 600, unit.y) < 1);
});

test('entering a region at the final waypoint preserves the next route order issued by the map trigger', () => {
  const game = new Runtime(data, [], 7), unit = game.createUnit(game.players[8], game.fourCC('nanc'), 0, 0);
  const trigger = game.natives.CreateTrigger(), rect = game.handle({ x1: 59.99, y1: -1, x2: 60.01, y2: 1 });
  game.functions.nextRoute = function* () { game.setMove(unit, { x: 600, y: 0 }); };
  trigger.actions.push('nextRoute');game.register(trigger, 'enter', { rect });
  assert.equal(game.setMove(unit, { x: 60, y: 0 }), true);
  game.tick(.2);
  assert.equal(unit.move?.x, 600);
  advance(game, 2);
  assert.deepEqual([unit.x, unit.y], [600, 0]);
});

test('a terrain path waits for temporary blockers instead of rerunning the same A star path every half second', () => {
  const game = new Runtime(data, [], 7, terrain, rules), start = { x: -4352, y: 6912 };
  const unit = game.createUnit(game.players[8], game.fourCC('nanc'), start.x, start.y);
  for (const [x, y] of [[16, 0], [-16, 0], [0, 16], [0, -16]]) game.createUnit(game.players[8], game.fourCC('nanc'), start.x + x, start.y + y);
  assert.equal(game.setMove(unit, { x: start.x, y: 5800 }), true);
  let searches = 0;const find = game.pathfinder.findPath.bind(game.pathfinder);
  game.pathfinder.findPath = (...args) => { searches++;return find(...args); };
  advance(game, 2);
  assert.ok(unit.move);assert.equal(searches, 0);
});

test('slow and root snapshots report real movement while a nearby swordsman tower keeps attacking', () => {
  const game = new Runtime(data, [{ slot: 0, name: 'Sword' }], 7, null, rules);
  const tower = game.createUnit(game.players[0], game.fourCC('h06E'), 0, 0);
  const enemy = game.createUnit(game.players[8], game.fourCC('ugar'), 400, 0);
  enemy.hp = enemy.maxHp = 1e7;
  game.setMove(enemy, { x: 400, y: 500 });
  enemy.buffs.push({ kind: 'slow', factor: .5, until: game.time + 5 });
  const before = enemy.y;game.tick(.05);
  assert.equal(enemy.y - before, 350 * .5 * .05);
  let snapshot = game.snapshot().units.find(unit => unit.id === enemy.hid);
  assert.equal(snapshot.moveSpeed, 175);assert.equal(snapshot.moving, true);
  enemy.buffs.push({ kind: 'root', until: game.time + 2 });
  const stopped = enemy.y;advance(game, 1.5);
  snapshot = game.snapshot().units.find(unit => unit.id === enemy.hid);
  assert.equal(enemy.y, stopped);assert.equal(snapshot.moving, false);assert.equal(snapshot.moveSpeed, 0);
  assert.ok(game.effects.filter(effect => effect.kind === 'projectile' && effect.sourceId === tower.hid).length >= 3, 'control of the monster does not pause tower attacks');
  advance(game, .6);assert.ok(enemy.y > stopped, 'the original move order resumes when root expires');
});
