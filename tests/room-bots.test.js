import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime } from '../engine/runtime.js';
import { RoomBotDirector } from '../engine/room-bots.js';
import { RoomSessions } from '../engine/room-sessions.js';
import { originalBuildBlockers } from '../public/placement.js';

const source = new URL('../content/original-3.0/', import.meta.url);
const data = JSON.parse(await readFile(new URL('data.json', source), 'utf8'));
const terrain = JSON.parse(await readFile(new URL('terrain.json', source), 'utf8'));
const world = JSON.parse(await readFile(new URL('../public/map/visuals.json', import.meta.url), 'utf8'));
terrain.buildBlockers = originalBuildBlockers(world.doodads);
terrain.buildableTiles = terrain.tiles.map(id => Number(world.terrainTileData[id]?.buildable) === 1);
const rules = JSON.parse(await readFile(new URL('gameplay.json', source), 'utf8')).rules;
const classes = ['h001', 'h002', 'h000', 'h004', 'h003', 'h06C'];
const makeGame = members => new Runtime(data, members, 7, terrain, rules);

test('wave start fills vacant seats through the original class selection triggers', () => {
  const game = makeGame([{ slot: 0, name: 'Host' }]);
  game.start();
  game.globals.udg_waves = 1;
  const room = {
    game,
    players: new Map([['host', { slot: 0 }]]),
    pendingBotSlots: new Set([1, 2, 3]),
    botState: new Map()
  };
  const director = new RoomBotDirector();

  director.step(room);

  assert.deepEqual(game.snapshot().botSlots, [1, 2, 3]);
  for (const slot of [1, 2, 3]) {
    const player = game.players[slot], classId = game.globals.udg_playerzz[slot];
    assert.equal(player.active, true);
    assert.equal(player.connected, false);
    assert.equal(player.bot, true);
    assert.ok(classId >= 1 && classId <= classes.length);
    assert.ok([...game.units.values()].some(unit => unit.owner === player && unit.raw === classes[classId - 1]), `bot ${slot} receives its profession worker`);
  }
  assert.equal(room.pendingBotSlots.size, 0);
});

test('first-wave countdown fills vacant seats and lets bots build before enemies arrive', () => {
  const game = makeGame([{ slot: 0, name: 'Host' }]);
  game.start();
  const room = {
    game,
    players: new Map([['host', { slot: 0 }]]),
    pendingBotSlots: new Set([1, 2, 3]),
    botState: new Map()
  };
  const director = new RoomBotDirector();
  director.step(room);
  assert.deepEqual(game.snapshot().botSlots, [], 'bots wait while the lobby choices are open');

  let dialog = [...game.dialogs.values()].find(candidate => candidate.visible.has(0));
  game.choose(0, dialog.hid, dialog.buttons[0].hid);
  for (let i = 0; i < 12; i++) game.tick(.05);
  dialog = [...game.dialogs.values()].find(candidate => candidate.visible.has(0));
  game.choose(0, dialog.hid, dialog.buttons[0].hid);
  for (let i = 0; i < 12; i++) game.tick(.05);

  assert.equal(game.globals.udg_waves, 0);
  assert.ok(game.timers.some(timer => !timer.dead && timer.callback === 'fun_FirstRound_Actions'));
  const startingGold = new Map([1, 2, 3].map(slot => [slot, game.players[slot].gold]));

  director.step(room);

  assert.deepEqual(game.snapshot().botSlots, [1, 2, 3]);
  for (const slot of [1, 2, 3]) {
    assert.ok(Number(game.globals.udg_playerzz[slot]) > 0, `bot ${slot} chooses a profession during countdown`);
    assert.ok([...game.units.values()].some(unit => unit.owner === game.players[slot] && unit.raw === classes[game.globals.udg_playerzz[slot] - 1]), `bot ${slot} receives its profession worker`);
    assert.ok([...game.units.values()].some(unit => unit.owner === game.players[slot] && unit.building), `bot ${slot} starts a tower before wave one`);
    assert.ok(game.players[slot].gold < startingGold.get(slot), `bot ${slot} pays for its tower with original starting gold`);
  }
});

test('offline seat is taken over at 60 seconds and the saved token returns control', () => {
  let now = 10_000;
  const director = { takeover() {}, resume() {}, step() {} };
  const sessions = new RoomSessions({
    now: () => now,
    botDirector: director,
    createGame: members => ({
      players: Array.from({ length: 4 }, (_, id) => ({ id, active: members.some(member => member.slot === id), connected: id === 0, bot: false })),
      globals: { udg_waves: 1 },
      status: 'playing',
      time: 0,
      start() {}, tick() {}, message() {}
    }),
    broadcast() {}
  });
  const socket = () => ({ readyState: 1, close() { this.readyState = 3; } });

  try {
    const firstSocket = socket(), { room, player } = sessions.join(firstSocket, { room: 'BOT60', name: 'Host' });
    sessions.detach(room, player, firstSocket);
    now += 59_999;
    sessions.sweep();
    assert.equal(room.game.players[0].bot, false);
    assert.equal(room.timer, null);

    now += 1;
    sessions.sweep();
    assert.equal(room.game.players[0].bot, true);
    assert.equal(room.game.players[0].connected, false);
    assert.notEqual(room.timer, null, 'the bot keeps a fully disconnected room running');

    const returned = sessions.join(socket(), { room: 'BOT60', resumeToken: player.token });
    assert.equal(returned.player.slot, 0);
    assert.equal(room.game.players[0].bot, false);
    assert.equal(room.game.players[0].connected, true);
    assert.equal(room.game.players[0].active, true);
  } finally {
    sessions.dispose();
  }
});

test('bot construction spends resources through normal placement and upgrade actions', () => {
  const game = makeGame([{ slot: 0, name: 'Computer', bot: true }]);
  game.start();
  game.tasks = [];
  game.timers = [];
  const player = game.players[0];
  player.gold = 100_000;
  player.lumber = 10_000;
  player.cap = 65;
  player.startX = -3008;
  player.startY = 2816;
  game.globals.udg_waves = 1;
  game.globals.udg_playerzz[0] = 2;
  game.createUnit(player, game.fourCC('h002'), player.startX, player.startY);
  const room = { game, players: new Map(), pendingBotSlots: new Set(), botState: new Map() };
  const director = new RoomBotDirector();
  const startingGold = player.gold;

  director.step(room);

  const tower = [...game.units.values()].find(unit => unit.owner === player && unit.building);
  assert.ok(tower, 'the bot places an attack building');
  assert.ok(player.gold < startingGold, 'the normal build action charges the building cost');
  assert.equal(tower.constructed, false, 'the original construction timer still applies');
});

test('bot towers spread around all four edges of their original route junction before duplicating a tower', () => {
  const game = makeGame([{ slot: 0, name: 'Computer', bot: true }]);
  game.start();
  game.tasks = [];
  game.timers = [];
  const player = game.players[0];
  player.gold = 100_000;
  player.lumber = 10_000;
  player.cap = 65;
  game.globals.udg_waves = 1;
  game.globals.udg_playerzz[0] = 2;
  game.createUnit(player, game.fourCC('h002'), player.startX, player.startY);
  const center = game.natives.GetRectCenter(game.globals.gg_rct_a4);
  const director = new RoomBotDirector();
  const built = [];

  for (let index = 0; index < 4; index++) {
    assert.equal(director.build({ game }, 0), true);
    const tower = [...game.units.values()].filter(unit => unit.owner === player && unit.building).at(-1);
    assert.ok(tower);
    assert.equal(tower.constructed, false);
    tower.constructed = true;
    built.push(tower);
  }

  assert.equal(new Set(built.map(tower => tower.raw)).size, 4, 'each affordable tower in the starter roster gets a turn before duplication');
  const quadrants = new Set(built.map(tower => `${Math.sign(tower.x - center.x)},${Math.sign(tower.y - center.y)}`));
  assert.equal(quadrants.size, 4, 'the first four towers cover all four sides instead of clustering in the player lane');
  for (const tower of built) {
    const distance = Math.hypot(tower.x - center.x, tower.y - center.y);
    assert.ok(distance >= 700 && distance <= 900, `tower stays on the outer junction edge at ${distance.toFixed(0)} units`);
  }
});

test('bots save remaining gold instead of repeating a cheap tower while filling their initial mix', () => {
  const game = makeGame([{ slot: 0, name: 'Computer', bot: true }]);
  game.start();
  game.tasks = [];
  game.timers = [];
  const player = game.players[0];
  player.gold = 150;
  player.lumber = 10_000;
  player.cap = 65;
  game.globals.udg_waves = 1;
  game.globals.udg_playerzz[0] = 2;
  game.createUnit(player, game.fourCC('h002'), player.startX, player.startY);
  const room = { game, players: new Map(), pendingBotSlots: new Set(), botState: new Map() };
  const director = new RoomBotDirector();

  director.step(room);
  assert.equal([...game.units.values()].filter(unit => unit.owner === player && unit.building).length, 1);
  assert.equal(player.gold, 50);

  game.time = 3;
  director.step(room);
  assert.equal([...game.units.values()].filter(unit => unit.owner === player && unit.building).length, 1);
  assert.equal(player.gold, 50, 'the bot keeps its balance for another tower type');
});

test('each player lane assigns bots a separate road junction from the original map', () => {
  const starts = [[-3008, 2432], [-3008, -2880], [2496, -3008], [2496, 2368]];
  const workers = ['h001', 'h002', 'h000', 'h004'];
  const routeRects = ['a4', 'b4', 'c4', 'd4'];

  for (let slot = 0; slot < 4; slot++) {
    const game = makeGame([{ slot, name: 'Computer', bot: true }]);
    game.start();
    game.tasks = [];
    game.timers = [];
    const player = game.players[slot];
    player.gold = 100_000;
    player.lumber = 10_000;
    player.cap = 65;
    game.createUnit(player, game.fourCC(workers[slot]), ...starts[slot]);
    const rect = game.globals[`gg_rct_${routeRects[slot]}`];
    const center = game.natives.GetRectCenter(rect);

    assert.equal(new RoomBotDirector().build({ game }, slot), true, `lane ${slot} can place a tower`);
    const tower = [...game.units.values()].find(unit => unit.owner === player && unit.building);
    assert.ok(tower);
    const dx = Math.abs(tower.x - center.x), dy = Math.abs(tower.y - center.y), distance = Math.hypot(dx, dy);
    assert.ok(dx > 300 && dy > 300, `lane ${slot} tower uses a corner plot around its junction`);
    assert.ok(distance >= 700 && distance <= 900, `lane ${slot} tower stays near the outer junction edge`);
  }
});

test('all six profession builders expose a valid automated attack-tower choice', () => {
  for (const [index, classId] of classes.entries()) {
    const game = makeGame([{ slot: 0, name: 'Computer', bot: true }]);
    game.start();
    game.tasks = [];
    game.timers = [];
    const player = game.players[0];
    player.gold = 100_000;
    player.lumber = 10_000;
    player.cap = 65;
    player.startX = -3008;
    player.startY = 2816;
    game.globals.udg_waves = 1;
    game.globals.udg_playerzz[0] = index + 1;
    game.createUnit(player, game.fourCC(classId), player.startX, player.startY);
    const room = { game, players: new Map(), pendingBotSlots: new Set(), botState: new Map() };

    assert.equal(new RoomBotDirector().build(room, 0), true, `${classId} places an attack tower`);
    assert.ok([...game.units.values()].some(unit => unit.owner === player && unit.building));
  }
});

test('bot upgrades a constructed building through the normal upgrade action', () => {
  const flatTerrain = {
    width: 9, height: 9, offset: [-512, -512], tileSize: 128,
    heights: Array(81).fill(0),
    pathing: { width: 32, height: 32, cell: 32, flags: new Array(1024).fill(64) }
  };
  const game = new Runtime(data, [{ slot: 0, name: 'Computer', bot: true }], 7, flatTerrain, rules);
  game.start();
  game.tasks = [];
  game.timers = [];
  const player = game.players[0];
  player.gold = 100_000;
  player.lumber = 10_000;
  player.cap = 65;
  game.globals.udg_waves = 1;
  game.globals.udg_playerzz[0] = 2;
  const tower = game.createUnit(player, game.fourCC('h007'), 200, 20);
  const room = { game, players: new Map(), pendingBotSlots: new Set(), botState: new Map() };
  const director = new RoomBotDirector();
  const startingGold = player.gold;

  director.step(room);

  assert.equal(tower.upgradeTo, 'h052', 'the bot starts an available building upgrade');
  assert.ok(player.gold < startingGold, 'the normal upgrade action charges the upgrade cost');
});
