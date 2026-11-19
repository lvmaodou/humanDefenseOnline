import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime } from '../engine/runtime.js';
import { originalBuildBlockers } from '../public/placement.js';

const read = async file => JSON.parse(await readFile(new URL(file, import.meta.url), 'utf8'));
const data = await read('../content/original-3.0/data.json'), terrain = await read('../content/original-3.0/terrain.json');
const rules = (await read('../content/original-3.0/gameplay.json')).rules, world = await read('../public/map/visuals.json');
terrain.buildBlockers = originalBuildBlockers(world.doodads);
terrain.buildableTiles = terrain.tiles.map(id => Number(world.terrainTileData[id]?.buildable) === 1);
function make() {
  const game = new Runtime(data, [{ slot: 0, name: '甲' }, { slot: 1, name: '乙' }], 7, terrain, rules);
  game.start();game.tasks = [];game.timers = [];
  for (const player of game.players.slice(0, 2)) { player.gold = 10000;player.lumber = 100;player.cap = 65; }
  return game;
}
const workers = ['h001', 'h002', 'h000', 'h004', 'h003', 'h06C'];

test('teammates transfer gold and lumber atomically and invalid or excessive gifts change neither balance', () => {
  const game = make(), a = game.players[0], b = game.players[1];
  assert.equal(game.action(0, { type: 'transfer', player: 1, gold: 250, lumber: 7 }), true);
  assert.deepEqual([a.gold, a.lumber, b.gold, b.lumber], [9750, 93, 10250, 107]);
  assert.equal(game.action(1, { type: 'transfer', player: 0, gold: 0, lumber: 2 }), true);
  const before = [a.gold, a.lumber, b.gold, b.lumber];
  for (const request of [
    { player: 1, gold: -1 }, { player: 1, gold: 1.5 }, { player: 1, gold: '100' }, { player: 1, gold: NaN },
    { player: 1, gold: 0, lumber: 0 }, { player: 0, gold: 1 }, { player: 2, gold: 1 }, { player: 8, gold: 1 },
    { player: 1, gold: 100000 }, { player: 1, gold: 1, lumber: 100000 }, { player: 1, gold: Infinity }
  ]) { assert.throws(() => game.action(0, { type: 'transfer', ...request }));assert.deepEqual([a.gold, a.lumber, b.gold, b.lumber], before); }
  b.active = false;assert.throws(() => game.action(0, { type: 'transfer', player: 1, gold: 1 }), /在线/);
  assert.deepEqual([a.gold, a.lumber, b.gold, b.lumber], before);
});

test('a farmer can pick up, drop and hand equipment to a teammate without duplicating or losing charges', () => {
  const game = make(), a = game.createUnit(game.players[0], game.fourCC('h001'), -3008, 2560), b = game.createUnit(game.players[1], game.fourCC('h002'), -2880, 2560);
  const item = game.createItem('I004', a);
  assert.equal(game.action(0, { type: 'pickup', unit: a.hid, item: item.hid }), true);
  assert.equal(game.action(1, { type: 'pickup', unit: b.hid, item: item.hid }), false);
  assert.throws(() => game.action(1, { type: 'drop', unit: a.hid, item: item.hid }), /自己/);
  assert.equal(game.action(0, { type: 'drop', unit: a.hid, item: item.hid }), true);
  assert.deepEqual([item.x, item.y, item.charges], [a.x, a.y, 1]);
  assert.equal(game.snapshot().items.filter(entry => entry.id === item.hid).length, 1);
  assert.equal(game.action(1, { type: 'pickup', unit: b.hid, item: item.hid }), true);
  assert.deepEqual([a.inventory.length, b.inventory.length, item.carrier], [0, 1, b]);
  assert.throws(() => game.action(0, { type: 'drop', unit: a.hid, item: item.hid }), /不在/);
  for (let index = 0; index < 5; index++) assert.equal(game.pickup(b, game.createItem('I005', b)), true);
  assert.equal(game.pickup(b, game.createItem('I006', b)), false);
});

test('all six professions build three permanent item towers, upgrade them and trigger the original set ability and links', () => {
  for (let index = 0; index < 6; index++) {
    const game = make(), set = game.equipment[index], worker = game.createUnit(game.players[0], game.fourCC(workers[index]), -2944, 2816);
    game.globals.udg_playerzz[0] = index + 1;
    assert.equal(set.pieces.length, 3);
    const towers = [];
    for (const [position, piece] of set.pieces.entries()) {
      const point = { x: -3008, y: 2816 + position * 128 };game.moveUnit(worker, point.x + 64, point.y);
      const item = game.createItem(piece.item, worker);assert.equal(game.pickup(worker, item), true);
      assert.equal(game.dropItem(worker, item), true);assert.equal(item.charges, 1);
      assert.equal(game.snapshot().items.some(drop => drop.id === item.hid), true);
      assert.equal(game.pickup(worker, item), true);
      assert.equal(game.action(0, { type: 'item', unit: worker.hid, item: item.hid, ...point }), true);
      const tower = [...game.units.values()].find(unit => unit.raw === piece.base && unit.owner.id === 0);towers.push(tower);
      assert.ok(tower);assert.equal(item.removed, true);assert.equal(tower.expires, undefined);
    }
    game.tick(5.1);
    for (const [position, tower] of towers.entries()) {
      assert.equal(tower.constructed, true);const gold = game.players[0].gold;
      assert.equal(game.action(0, { type: 'upgrade', unit: tower.hid, to: set.pieces[position].unit }), true);
      assert.equal(game.players[0].gold, gold - Number(data.units[set.pieces[position].unit].goldcost));
      assert.throws(() => game.action(0, { type: 'upgrade', unit: tower.hid, to: set.pieces[position].unit }), /不能/);
    }
    game.tick(10.1);game.tick(.05);
    assert.ok(towers.every(tower => tower.abilities.has(game.fourCC(set.ability))), `${set.name} grants its source set ability to every piece`);
    assert.equal(game.effects.filter(effect => effect.kind === 'lightning' && effect.persistent && !effect.destroyed).length, 3);
    assert.ok(game.messages.some(message => message.text.includes(`集齐了${set.name}`)));
    assert.equal(game.equipmentState(0)[index].active, true);assert.equal(game.equipmentState(0)[index].count, 3);
    game.chat(0, '-guanbi');assert.equal(game.effects.filter(effect => effect.kind === 'lightning' && !effect.destroyed).length, 0);
    game.chat(0, '-kaiqi');assert.equal(game.effects.filter(effect => effect.kind === 'lightning' && !effect.destroyed).length, 3);
    assert.deepEqual(game.errors, []);
  }
});

test('pickup capacity comes from the original inventory ability and buildings without inventory cannot take drops', () => {
  const game = make();
  for (const type of workers) {
    const worker = game.createUnit(game.players[0], game.fourCC(type), -3008, 2560);
    assert.equal(game.inventoryCapacity(worker), 6);
    for (let index = 0; index < 6; index++) assert.equal(game.pickup(worker, game.createItem('I001', worker)), true);
    assert.equal(game.pickup(worker, game.createItem('I001', worker)), false);
  }
  const tower = game.createUnit(game.players[0], game.fourCC('h05G'), -2752, 2816), item = game.createItem('I00B', tower);
  assert.equal(game.inventoryCapacity(tower), 0);
  assert.equal(game.action(0, { type: 'pickup', unit: tower.hid, item: item.hid }), false);
  assert.equal(item.carrier, undefined);
  const footman = game.createUnit(game.players[0], game.fourCC('hfoo'), -3008, 2560);
  assert.equal(game.inventoryCapacity(footman), 2, 'stock transport inventories keep their source capacity');
});

test('set construction rejects blocked terrain without consuming equipment and approaches distant valid locations', () => {
  const game = make(), worker = game.createUnit(game.players[0], game.fourCC('h002'), -3008, 2560), item = game.createItem('I00B', worker);game.pickup(worker, item);
  const tree = terrain.buildBlockers[0];
  assert.throws(() => game.action(0, { type: 'item', unit: worker.hid, item: item.hid, x: tree.x, y: tree.y }));
  assert.equal(item.charges, 1);assert.equal(item.carrier, worker);
  assert.equal(game.action(0, { type: 'item', unit: worker.hid, item: item.hid, x: -3008, y: 2944 }), true);
  assert.ok(worker.pendingItemBuild);assert.equal(item.carrier, worker);
  for (let index = 0; index < 100 && !item.removed; index++) game.tick(.05);
  assert.equal(item.removed, true);assert.equal(worker.pendingItemBuild, null);
  assert.ok([...game.units.values()].some(unit => unit.raw === 'h05G' && unit.x === -3008 && unit.y === 2944));
});

function upgradeSet(game, setIndex, classId, spacing = 128) {
  const set = game.equipment[setIndex];game.globals.udg_playerzz[0] = classId;
  const towers = set.pieces.map((piece, index) => {
    const tower = game.createUnit(game.players[0], game.fourCC(piece.base), -3008, 2816 + index * spacing);
    game.action(0, { type: 'upgrade', unit: tower.hid, to: piece.unit });return tower;
  });
  game.tick(10.1);game.tick(.05);return towers;
}
test('set activation retains the original profession and pairwise distance limits and crazy mode exceptions', () => {
  const wrongClass = make();upgradeSet(wrongClass, 0, 2);assert.equal(wrongClass.equipmentState(0)[0].active, false);
  const far = make();upgradeSet(far, 1, 2, 704);assert.equal(far.equipmentState(0)[1].active, false);
  const crazy = make();crazy.globals.udg_yxmode = 2;upgradeSet(crazy, 5, 1, 2048);assert.equal(crazy.equipmentState(0)[5].active, true);
});

test('profession set auras affect armor, attack speed, mana recovery and enemy movement without stacking three copies', () => {
  const hunter = make();upgradeSet(hunter, 1, 2);const enemy = hunter.createUnit(hunter.players[8], hunter.fourCC('hfoo'), -2752, 2944);hunter.updateEquipmentAuras();assert.equal(enemy.auraArmor, -30);
  const ranger = make();const rangerTowers = upgradeSet(ranger, 4, 5);ranger.updateEquipmentAuras();assert.equal(rangerTowers[0].auraAttackSpeed, .3);
  const warlock = make();const warlocks = upgradeSet(warlock, 3, 4);warlock.updateEquipmentAuras();assert.equal(warlocks[0].auraMana, 3);
  warlocks[0].mana=100;warlock.tick(.2);assert.ok(Math.abs(warlocks[0].mana-102.6)<1e-6,'the native +3 mana/sec aura adds 30% to the source tower regeneration of 10/sec');
  const mage = warlock.createUnit(warlock.players[0], warlock.fourCC('h07D'), -2752, 2816);warlock.updateEquipmentAuras();assert.equal(mage.auraMana, 0);
  const sword = make();upgradeSet(sword, 5, 6);const victim = sword.createUnit(sword.players[8], sword.fourCC('hfoo'), -2752, 2944);sword.updateEquipmentAuras();assert.equal(victim.auraMove, -.25);assert.equal(sword.moveSpeed(victim), Number(data.units.hfoo.spd) * .75);
});

test('the completed barbarian set applies its source bash damage and permanent leg-breaking stun',()=>{
  const game=make(),towers=upgradeSet(game,0,1),attacker=towers.find(unit=>unit.raw==='h05J');
  for(const id of attacker.abilities.keys())if(!['Avul',game.equipment[0].ability].map(game.fourCC).includes(id))attacker.abilities.delete(id);
  const target=game.createUnit(game.players[8],game.fourCC('hfoo'),attacker.x+64,attacker.y);target.hp=target.maxHp=1e6;game.random=()=>0;
  game.tick(.05);game.tick(.1);const bonus=10000*game.attackVsArmor.spells[data.units.hfoo.defType];assert.ok(target.hp<=target.maxHp-bonus);assert.ok(target.buffs.some(buff=>buff.kind==='stun'&&buff.until>=game.time+600));
});

test('the completed rogue set increases source theft rewards by 50 percent', () => {
  const game = make(), towers = upgradeSet(game, 2, 3), robber = towers.find(unit => unit.raw === 'h05U'), before = game.players[0].gold;
  game.run('Trig_TZDZqiangjie_Actions', [], { unit: robber, caster: robber, ability: game.fourCC('A0BE'), trigger: game.globals.gg_trg_TZDZqiangjie });
  assert.equal(game.players[0].gold - before, 9);
});
