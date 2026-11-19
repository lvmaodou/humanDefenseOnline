import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import WebSocket from 'ws';
import { RoomSessions } from '../engine/room-sessions.js';
import { BattleConnection, readSession } from '../public/connection.js';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const url = `ws://localhost:${server.address().port}`;
const clients = [];

async function client(request) {
  const ws = new WebSocket(url), messages = [], waiters = [];
  clients.push(ws);
  ws.on('message', raw => {
    const message = JSON.parse(raw), index = waiters.findIndex(waiter => waiter.predicate(message));
    if (index >= 0) { const waiter = waiters.splice(index, 1)[0];clearTimeout(waiter.timeout);waiter.resolve(message); }
    else messages.push(message);
  });
  const next = predicate => {
    const index = messages.findIndex(predicate);
    if (index >= 0) return Promise.resolve(messages.splice(index, 1)[0]);
    return new Promise((resolve, reject) => {
      const waiter = { predicate, resolve, timeout: setTimeout(() => reject(new Error('Timed out waiting for server message')), 4000) };
      waiters.push(waiter);
    });
  };
  await once(ws, 'open');
  ws.send(JSON.stringify({ type: 'join', ...request }));
  const joined = await next(message => message.type === 'joined' || message.type === 'error');
  ws.playerToken = joined.resumeToken;
  return { ws, joined, next };
}
async function close(ws) {
  const closed = once(ws, 'close');ws.close();await closed;
  // The client's close event can precede the remote server's close callback.
  if (ws.playerToken) for (let attempt = 0; attempt < 200; attempt++) {
    const player = [...rooms.values()].flatMap(room => [...room.players.values()]).find(player => player.token === ws.playerToken);
    if (!player?.ws) return;
    await new Promise(resolve => setTimeout(resolve, 5));
  }
}
after(async () => {
  for (const ws of clients) ws.terminate();
  for (const room of rooms.values()) clearInterval(room.timer);
  await new Promise(resolve => server.close(resolve));
});

test('a disconnected participant resumes the running game with assets, inventory, class and cooldowns intact', async () => {
  const host = await client({ name: '甲', room: 'RESUME' }), guest = await client({ name: '乙', room: 'RESUME' });
  const room = rooms.get('RESUME'), game = room.game, player = game.players[0];
  game.tasks = [];game.timers = [];game.globals.udg_waves = 7;game.globals.udg_playerzz[0] = 2;
  player.gold = 8765;player.lumber = 42;player.tech.resumeCheck = 3;
  const worker = game.createUnit(player, game.fourCC('h002'), -3008, 2560);
  const item = game.createItem('I00B', worker);game.pickup(worker, item);
  const tower = game.createUnit(player, game.fourCC('h05G'), -3008, 2816);
  tower.castCooldown.set(game.fourCC('A001'), game.time + 20);
  const remainingTime = tower.castCooldown.get(game.fourCC('A001')), time = game.time;
  await close(host.ws);
  assert.equal(room.players.size, 2);assert.equal(player.active, true);assert.equal(player.connected, false);
  assert.equal(game.natives.GetPlayerSlotState(player), 'PLAYER_SLOT_STATE_PLAYING');
  assert.throws(() => game.action(1, { type: 'transfer', player: 0, gold: 1 }), /在线/);
  assert.equal(game.snapshot().players[0].connected, false);
  assert.notEqual(room.timer, null, 'online teammates keep playing');
  const resumed = await client({ name: '伪造昵称', room: 'RESUME', resumeToken: host.joined.resumeToken });
  assert.equal(resumed.joined.resumed, true);assert.equal(resumed.joined.id, host.joined.id);
  assert.equal(resumed.joined.slot, 0);assert.equal(resumed.joined.name, '甲');assert.equal(room.game, game);
  assert.ok(game.time >= time);assert.equal(game.globals.udg_waves, 7);assert.equal(game.globals.udg_playerzz[0], 2);
  assert.deepEqual([player.gold, player.lumber, player.tech.resumeCheck], [8765, 42, 3]);
  assert.equal(game.units.get(worker.hid), worker);assert.equal(item.carrier, worker);assert.equal(item.charges, 1);
  assert.equal(game.units.get(tower.hid), tower);assert.equal(tower.castCooldown.get(game.fourCC('A001')), remainingTime);
  assert.equal(player.connected, true);
  const snapshot = await resumed.next(message => message.type === 'state');
  assert.equal(snapshot.state.units.find(unit => unit.id === worker.hid).items[0].id, item.hid);
  assert.ok(!JSON.stringify(snapshot).includes(host.joined.resumeToken), 'credentials never appear in room snapshots');
  await close(resumed.ws);await close(guest.ws);
  assert.equal(room.timer, null);assert.equal(room.game, game);assert.ok(rooms.has(room.id));
  const pausedTime = game.time;
  await new Promise(resolve => setTimeout(resolve, 120));assert.equal(game.time, pausedTime);
  const returned = await client({ room: 'RESUME', resumeToken: guest.joined.resumeToken });
  assert.equal(returned.joined.slot, 1);assert.equal(room.game, game);assert.notEqual(room.timer, null);
  await close(returned.ws);
});

test('only a valid credential can reclaim a reserved seat after waves start; fresh joins and impostors are rejected', async () => {
  const host = await client({ name: '守卫', room: 'SECURE' });
  const room = rooms.get('SECURE');room.game.globals.udg_waves = 1;
  await close(host.ws);
  const stranger = await client({ name: '守卫', room: 'SECURE' });assert.equal(stranger.joined.code, 'GAME_STARTED');
  const invalid = await client({ room: 'SECURE', resumeToken: '0'.repeat(64) });assert.equal(invalid.joined.code, 'SESSION_INVALID');
  const expired = await client({ room: 'MISSING', resumeToken: host.joined.resumeToken });assert.equal(expired.joined.code, 'SESSION_EXPIRED');
  assert.equal(rooms.has('MISSING'), false);assert.equal(room.players.size, 1);
  const resumed = await client({ room: 'SECURE', resumeToken: host.joined.resumeToken });assert.equal(resumed.joined.slot, 0);
  await Promise.all([stranger, invalid, expired, resumed].map(member => close(member.ws)));
});

test('resuming in another page replaces the old socket and its delayed close does not disconnect the player', async () => {
  const old = await client({ name: '守卫', room: 'TAKEOVER' }), closed = once(old.ws, 'close');
  const resumed = await client({ room: 'TAKEOVER', resumeToken: old.joined.resumeToken });
  assert.equal((await closed)[0], 4001);
  const room = rooms.get('TAKEOVER'), player = room.game.players[0];
  assert.equal(player.connected, true);assert.equal(room.players.size, 1);assert.notEqual(room.timer, null);
  resumed.ws.send(JSON.stringify({ type: 'action', requestId: 9, action: { type: 'chat', text: 'ready' } }));
  const ack = await resumed.next(message => message.requestId === 9);assert.equal(ack.type, 'action-result');
  await close(resumed.ws);
});

test('all offline pauses and expires once, while a delayed old socket cannot detach the new owner', () => {
  let now = 1000;
  const sessions = new RoomSessions({ now: () => now, retentionMs: 100, createGame: () => ({ players: [{}, {}, {}, {}], globals: {}, time: 0, start() {}, tick(dt) { this.time += dt; }, message() {} }), broadcast() {} });
  const socket = () => ({ readyState: 1, close() { this.readyState = 3; } });
  try {
    const first = socket(), { room, player } = sessions.join(first, { room: 'IDLE', name: '甲' });
    const second = socket();sessions.join(second, { room: 'IDLE', resumeToken: player.token });
    sessions.detach(room, player, first);assert.equal(room.game.players[0].connected, true);
    second.readyState = 3;sessions.detach(room, player, second);
    assert.equal(room.timer, null);assert.equal(room.idleSince, now);
    now = 1099;sessions.sweep();assert.equal(sessions.rooms.has('IDLE'), true);
    const back = socket();const resumed = sessions.join(back, { room: 'IDLE', resumeToken: player.token });
    assert.equal(resumed.room, room);assert.equal(room.idleSince, null);
    now = 1200;sessions.sweep();assert.equal(sessions.rooms.has('IDLE'), true);
    back.readyState = 3;sessions.detach(room, player, back);
    now = 1300;sessions.sweep();assert.equal(sessions.rooms.has('IDLE'), false);
    assert.throws(() => sessions.join(socket(), { room: 'IDLE', resumeToken: player.token }), { code: 'SESSION_EXPIRED' });
    assert.equal(sessions.rooms.has('IDLE'), false);
  } finally { sessions.dispose(); }
});

test('the browser stores the credential, waits for authentication before sending and does not replay actions', () => {
  const data = new Map(), storage = { getItem: key => data.get(key), setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
  const sockets = [], statuses = [], messages = [];
  class Socket {
    constructor() { this.readyState = 1;this.sent = [];sockets.push(this); }
    send(raw) { this.sent.push(JSON.parse(raw)); }
    close() { this.readyState = 3; }
    receive(message) { this.onmessage({ data: JSON.stringify(message) }); }
  }
  const connection = new BattleConnection({ url, storage, WebSocketClass: Socket, onStatus: status => statuses.push(status), onMessage: message => messages.push(message) });
  try {
    connection.start({ name: '甲', room: 'BROWSER' });const first = sockets[0];first.onopen();
    assert.equal(connection.send({ type: 'action' }), false);
    first.receive({ type: 'joined', name: '甲', room: 'BROWSER', resumeToken: 'a'.repeat(64) });
    assert.equal(readSession(storage).resumeToken, 'a'.repeat(64));
    assert.equal(connection.send({ type: 'action', action: { type: 'build' } }), true);
    first.onclose({ code: 1006 });assert.equal(connection.send({ type: 'action' }), false);
    connection.retry();const second = sockets[1];second.onopen();
    assert.equal(second.sent[0].resumeToken, 'a'.repeat(64));assert.equal(second.sent.length, 1);
    first.receive({ type: 'joined', resumeToken: 'b'.repeat(64) });assert.equal(connection.joined, false, 'stale socket messages are ignored');
    second.receive({ type: 'joined', name: '甲', room: 'BROWSER', resumeToken: 'a'.repeat(64) });
    assert.equal(second.sent.length, 1, 'spending commands are never replayed after resuming');
    second.onclose({ code: 4001 });assert.equal(statuses.at(-1), 'replaced');assert.equal(connection.stopped, true);
    connection.retry();const third = sockets[2];third.onopen();
    third.receive({ type: 'error', code: 'SESSION_EXPIRED', message: 'expired' });
    assert.equal(statuses.at(-1), 'failed');assert.equal(readSession(storage), null);assert.equal(connection.stopped, true);
  } finally { connection.stop(); }
});

test('finished matches reject saved credentials and new joins, then release the room when everyone leaves', async () => {
  for (const status of ['victory', 'defeat']) {
    const roomId = status === 'victory' ? 'WINEND' : 'LOSEEND';
    const host = await client({ name: 'Host', room: roomId }), room = rooms.get(roomId);
    room.game.status = status;
    const resume = await client({ room: roomId, resumeToken: host.joined.resumeToken });
    assert.equal(resume.joined.code, 'GAME_FINISHED');
    const fresh = await client({ name: 'Guest', room: roomId });assert.equal(fresh.joined.code, 'GAME_FINISHED');
    host.ws.send(JSON.stringify({ type: 'leave' }));await host.next(message => message.type === 'left');
    assert.equal(rooms.has(roomId), false);assert.equal(room.timer, null);
    const restarted = await client({ name: 'Host', room: roomId });
    assert.equal(restarted.joined.resumed, false);assert.notEqual(rooms.get(roomId).game, room.game);
    assert.equal(rooms.get(roomId).game.status, 'playing');
    await Promise.all([host, resume, fresh, restarted].map(member => close(member.ws)));
  }
});

test('returning home invalidates only that player and disconnected teammates can still resume', async () => {
  const host = await client({ name: 'Host', room: 'LEAVE' }), guest = await client({ name: 'Guest', room: 'LEAVE' });
  const room = rooms.get('LEAVE');room.game.globals.udg_waves = 3;
  await close(guest.ws);
  host.ws.send(JSON.stringify({ type: 'leave' }));await host.next(message => message.type === 'left');
  assert.equal(room.players.size, 1);assert.equal(room.game.players[0].active, false);assert.equal(room.game.players[1].active, true);
  assert.equal(room.timer, null);
  const old = await client({ room: room.id, resumeToken: host.joined.resumeToken });assert.equal(old.joined.code, 'SESSION_INVALID');
  const returned = await client({ room: room.id, resumeToken: guest.joined.resumeToken });
  assert.equal(returned.joined.slot, 1);assert.equal(rooms.get(room.id), room);
  await Promise.all([host, old, returned].map(member => close(member.ws)));
});

test('a delayed close from a finished room cannot delete a new match using the same code', () => {
  const sessions = new RoomSessions({ createGame: () => ({ status: 'playing', players: [{}, {}, {}, {}], globals: {}, start() {}, message() {}, tick() {} }), broadcast() {} });
  const socket = () => ({ readyState: 1, close() { this.readyState = 3; } });
  try {
    const oldSocket = socket(), old = sessions.join(oldSocket, { room: 'AGAIN', name: 'Old' });
    old.room.game.status = 'defeat';oldSocket.readyState = 3;
    const current = sessions.join(socket(), { room: 'AGAIN', name: 'New' });
    assert.notEqual(current.room, old.room);
    sessions.detach(old.room, old.player, oldSocket);
    assert.equal(sessions.rooms.get('AGAIN'), current.room);
  } finally { sessions.dispose(); }
});

test('match results clear persisted resume credentials, and leaving cancels retries and ignores late messages', () => {
  const values = new Map(), storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
  const sockets = [], statuses = [], messages = [];
  class Socket {
    constructor() { this.readyState = 1;this.sent = [];sockets.push(this); }
    send(raw) { this.sent.push(JSON.parse(raw)); }
    close() { this.readyState = 3; }
    receive(message) { this.onmessage({ data: JSON.stringify(message) }); }
  }
  const connection = new BattleConnection({ url, storage, WebSocketClass: Socket, onStatus: value => statuses.push(value), onMessage: value => messages.push(value) });
  try {
    for (const status of ['victory', 'defeat']) {
      connection.start({ name: 'Host', room: 'END' });const socket = sockets.at(-1);socket.onopen();
      socket.receive({ type: 'joined', name: 'Host', room: 'END', resumeToken: 'a'.repeat(64) });assert.ok(readSession(storage));
      socket.receive({ type: 'state', state: { status } });assert.equal(readSession(storage), null);
      const count = sockets.length;socket.onclose({ code: 1006 });connection.retry();
      assert.equal(sockets.length, count);assert.equal(statuses.at(-1), 'finished');
    }
    connection.start({ name: 'Host', room: 'END' });const socket = sockets.at(-1);socket.onopen();
    socket.receive({ type: 'joined', name: 'Host', room: 'END', resumeToken: 'b'.repeat(64) });
    connection.leave();assert.equal(socket.sent.at(-1).type, 'leave');assert.equal(connection.session, null);assert.equal(readSession(storage), null);
    const count = messages.length;socket.receive({ type: 'state', state: { status: 'playing' } });assert.equal(messages.length, count);
    connection.retry();assert.equal(connection.stopped, true);assert.equal(statuses.at(-1), 'idle');
    connection.start({ name: 'Host', room: 'END', resumeToken: 'c'.repeat(64) });const stale = sockets.at(-1);stale.onopen();
    stale.receive({ type: 'error', code: 'GAME_FINISHED', message: 'Finished' });
    assert.equal(connection.session, null);assert.equal(readSession(storage), null);assert.equal(statuses.at(-1), 'failed');
  } finally { connection.stop(); }
});

test('an old result or exit in another page cannot erase the new match resume credential', () => {
  const values = new Map(), storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
  class Socket {
    constructor() { this.readyState = 1; }
    send() {}
    close() { this.readyState = 3; }
    receive(message) { this.onmessage({ data: JSON.stringify(message) }); }
  }
  const make = () => new BattleConnection({ url, storage, WebSocketClass: Socket, onStatus() {}, onMessage() {} });
  const old = make(), current = make();
  try {
    old.start({ name: 'Old', room: 'OLD' });const oldSocket = old.socket;oldSocket.onopen();
    oldSocket.receive({ type: 'joined', room: 'OLD', resumeToken: 'a'.repeat(64) });
    current.start({ name: 'Current', room: 'NEW' });current.socket.onopen();
    current.socket.receive({ type: 'joined', room: 'NEW', resumeToken: 'b'.repeat(64) });
    oldSocket.receive({ type: 'state', state: { status: 'defeat' } });
    assert.equal(readSession(storage).room, 'NEW');
    old.leave();assert.equal(readSession(storage).resumeToken, 'b'.repeat(64));
    current.leave();assert.equal(readSession(storage), null);
  } finally { old.stop();current.stop(); }
});
