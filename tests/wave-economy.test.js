import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime } from '../engine/runtime.js';

const root = new URL('../content/original-3.0/', import.meta.url);
const data = JSON.parse(await readFile(new URL('data.json', root), 'utf8'));
const reference = JSON.parse(await readFile(new URL('gameplay.json', root), 'utf8'));
const waveUnits = new Set(data.waveUnits);
const makeGame = members => new Runtime(data, members, 7, null, reference.rules);

test('all six professions retain bounty and wave rewards across the leave-player timer intervals', () => {
  for (let profession = 0; profession < 6; profession++) {
    const members = Array.from({ length: 4 }, (_, slot) => ({ slot, name: `Player ${slot + 1}` }));
    const game = makeGame(members);
    game.start();
    // Keep the real wave, bounty and death scripts; resolve the enemies explicitly.
    game.updateCombat = () => {};
    game.tick(1.1);
    for (let step = 0; step < 2; step++) {
      const dialog = [...game.dialogs.values()].find(dialog => dialog.visible.has(0));
      assert.ok(game.choose(0, dialog.hid, dialog.buttons[0].hid));
      game.tick(.6);
    }
    for (const member of members) {
      const dialog = [...game.dialogs.values()].find(dialog => dialog.visible.has(member.slot));
      assert.ok(game.choose(member.slot, dialog.hid, dialog.buttons[profession].hid));
    }
    const players = game.players.slice(0, 4);
    const workers = players.map(player => [...game.units.values()].find(unit => unit.owner === player && unit.abilities.has(game.fourCC('AInv'))));
    assert.ok(workers.every(Boolean));
    const kills = players.map(() => 0);
    while (game.time < 375) {
      const before = players.map(player => player.gold), wave = game.globals.udg_waves;
      game.tick(.5);
      const next = game.globals.udg_waves;
      const reward = next !== wave && next > 1 ? next * 6 + 50 : 0;
      assert.deepEqual(players.map(player => player.gold), before.map(gold => gold + reward), `profession ${profession + 1}, time ${game.time}, wave ${next}`);
      for (const enemy of [...game.units.values()]) {
        if (enemy.owner.id < 8 || enemy.owner.id > 11 || !waveUnits.has(enemy.raw) || enemy.death || enemy.removed) continue;
        const slot = enemy.owner.id - 8, gold = players[slot].gold;
        game.kill(enemy, workers[slot]);
        assert.ok(players[slot].gold > gold, 'each original early-wave kill grants a positive bounty');
        kills[slot]++;
      }
    }
    assert.equal(game.globals.udg_waves, 6);
    assert.deepEqual(kills, [240, 240, 240, 240]);
    assert.ok(players.every(player => player.gold > 900 + 370));
    assert.ok(game.messages.every(message => !message.text.includes('瓜分')));
    assert.equal(game.errors.length, 0);
  }
});

test('disabled periodic events are skipped and enabling resumes the existing timer schedule', () => {
  const game = makeGame([]);
  const trigger = game.natives.CreateTrigger();
  let calls = 0;
  game.functions.recordTimer = function* () { calls++; };
  game.natives.TriggerAddAction(trigger, 'recordTimer');
  game.natives.TriggerRegisterTimerEventPeriodic(trigger, .5);
  game.natives.DisableTrigger(trigger);
  game.tick(1.25);
  assert.equal(calls, 0);

  // Explicit map-script calls still execute a disabled trigger.
  game.natives.TriggerExecute(trigger);
  assert.equal(calls, 1);
  game.natives.EnableTrigger(trigger);
  game.tick(.25);
  assert.equal(calls, 2);
  game.natives.DisableTrigger(trigger);
  game.tick(.5);
  assert.equal(calls, 2);
  game.natives.EnableTrigger(trigger);
  game.tick(.5);
  assert.equal(calls, 3);
  game.natives.DestroyTrigger(trigger);
  game.tick(1);
  assert.equal(calls, 3);
});

test('a disabled one-shot event expires without being replayed after enabling', () => {
  const game = makeGame([]);
  const trigger = game.natives.CreateTrigger();
  let calls = 0;
  game.functions.recordTimer = function* () { calls++; };
  game.natives.TriggerAddAction(trigger, 'recordTimer');
  game.natives.TriggerRegisterTimerEventSingle(trigger, .5);
  game.natives.DisableTrigger(trigger);
  game.tick(.5);
  game.natives.EnableTrigger(trigger);
  game.tick(1);
  assert.equal(calls, 0);
});
