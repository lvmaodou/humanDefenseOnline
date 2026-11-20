import test from 'node:test';
import assert from 'node:assert/strict';
import { compactNetworkState } from '../engine/network-state.js';
import { RoomSessions } from '../engine/room-sessions.js';

test('network snapshots keep player controls while trimming unused neutral unit details', () => {
  const state = {
    botSlots: [2],
    units: [
      { owner: 0, id: 1, abilities: [{ id: 'A001' }], items: [{ id: 2 }], target: 3, merit: 4, hp: 100, moving: true, moveSpeed: 220, facing: 90, dead: false },
      { owner: 8, id: 2, abilities: [{ id: 'A002' }], items: [{ id: 5 }], target: 1, merit: 9, mana: 4, maxMana: 8, armor: 2, attackRange: 600, canMove: true, construct: 0, upgrade: null, itemBuild: null, hp: 200, maxHp: 300, moving: true, moveSpeed: 220, facing: 90, dead: false }
    ]
  };
  const rawEnemyBytes = JSON.stringify(state.units[1]).length;

  assert.equal(compactNetworkState(state), state);
  assert.deepEqual(state.botSlots, [2]);
  assert.deepEqual(state.units[0].abilities, [{ id: 'A001' }]);
  assert.deepEqual(state.units[0].items, [{ id: 2 }]);
  assert.equal(state.units[0].target, 3);
  for (const key of ['abilities', 'items', 'target', 'merit', 'mana', 'maxMana', 'armor', 'attackRange', 'canMove', 'construct', 'upgrade', 'itemBuild']) {
    assert.equal(key in state.units[1], false, `${key} is omitted for neutral units`);
  }
  assert.equal(state.units[1].hp, 200);
  assert.equal(state.units[1].maxHp, 300);
  assert.deepEqual({ moving: state.units[1].moving, moveSpeed: state.units[1].moveSpeed, facing: state.units[1].facing, dead: state.units[1].dead }, { moving: true, moveSpeed: 220, facing: 90, dead: false });
  assert.ok(JSON.stringify(state.units[1]).length < rawEnemyBytes * .7, 'neutral unit records should shrink by at least 30 percent');
});

test('room simulation stays at 20 Hz while state broadcasts run at 10 Hz', () => {
  let ticks = 0, broadcasts = 0;
  const sessions = new RoomSessions({
    tickMs: 50,
    broadcastMs: 100,
    createGame: () => ({}),
    broadcast: () => broadcasts++
  });
  const room = {
    id: 'PERF',
    players: new Map([['player', { ws: { readyState: 1 } }]]),
    game: { tick() { ticks++; } },
    broadcastElapsed: 0,
    timer: null
  };

  try {
    for (let i = 0; i < 5; i++) sessions.step(room);
    assert.equal(ticks, 5);
    assert.equal(broadcasts, 2);
    assert.equal(room.broadcastElapsed, 50);
    sessions.publish(room);
    assert.equal(broadcasts, 3, 'explicit publishes remain immediate for joins and actions');
    assert.equal(room.broadcastElapsed, 0);
  } finally { sessions.dispose(); }
});
