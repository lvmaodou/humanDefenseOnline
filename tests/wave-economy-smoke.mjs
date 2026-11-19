import assert from 'node:assert/strict';
import { once } from 'node:events';
import { chromium } from 'playwright';

process.env.PORT = '0';
const { server, rooms, sessions } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const url = `http://localhost:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const errors = [];

async function client(name, mobile) {
  const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 720 }, isMobile: mobile, hasTouch: mobile });
  const page = await context.newPage();page.setDefaultTimeout(20000);
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const Original = WebSocket;
    window.WebSocket = class extends Original {
      constructor(...args) {
        super(...args);
        this.addEventListener('message', event => {
          const message = JSON.parse(event.data);
          if (message.type === 'state') window.reviewState = message.state;
          if (message.type === 'joined') window.reviewSlot = message.slot;
        });
      }
    };
  });
  await page.goto(url);await page.locator('#nickname').fill(name);await page.locator('#room-code').fill('GOLDTEST');await page.locator('.join-button').click();
  await page.waitForFunction(() => Number.isInteger(window.reviewSlot));
  return page;
}

async function choose(page, profession, worker) {
  for (let attempt = 0; attempt < 10; attempt++) {
    if (await page.evaluate(type => window.reviewState?.units.some(unit => unit.owner === window.reviewSlot && unit.type === type), worker)) return;
    await page.waitForTimeout(600);
    if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
      const title = await page.locator('#dialog-title').textContent();
      await page.locator('#dialog-options button').nth(title.includes('职业') ? profession : 0).evaluate(button => button.click());
    }
  }
  throw new Error('Profession selection did not finish');
}

try {
  const desktop = await client('Gold host', false), portrait = await client('Gold guest', true);
  await choose(desktop, 0, 'h001');await choose(portrait, 1, 'h002');
  const room = rooms.get('GOLDTEST'), game = room.game;
  clearInterval(room.timer);room.timer = null;
  const players = game.players.slice(0, 2), balances = () => players.map(player => player.gold);
  const workers = players.map(player => [...game.units.values()].find(unit => unit.owner === player && ['h001', 'h002'].includes(unit.raw)));
  const waveUnits = new Set(game.data.waveUnits), kills = [0, 0];
  const step = dt => {
    assert.equal(game.status, 'playing', `simulation stopped at ${game.time}, wave ${game.globals.udg_waves}, lives ${game.globals.udg_lives}`);
    game.tick(dt);
    for (const enemy of [...game.units.values()]) {
      if (!waveUnits.has(enemy.raw) || enemy.removed || enemy.death || enemy.owner.id < 8 || enemy.owner.id > 11) continue;
      const slot = enemy.owner.id - 8;
      // Resolve unoccupied lanes too, so this economy fixture cannot end by leaks.
      game.kill(enemy, workers[slot] || null);
      if (workers[slot]) kills[slot]++;
    }
  };
  const advanceTo = time => { while (game.time < time - 1e-7) step(Math.min(.1, time - game.time)); };
  const checkHud = async () => {
    sessions.broadcast(room);
    await Promise.all([desktop, portrait].map(page => page.waitForFunction(expected => window.reviewState.players[window.reviewSlot].gold === expected[window.reviewSlot] && document.querySelector('#gold').textContent === String(expected[window.reviewSlot]), balances())));
  };

  advanceTo(80);assert.deepEqual(kills, [40, 40]);assert.deepEqual(balances(), [940, 940]);await checkHud();
  const firstWave = balances();
  while (game.globals.udg_waves < 2 && game.time < 120) step(.1);
  assert.equal(game.globals.udg_waves, 2);assert.deepEqual(balances(), firstWave.map(gold => gold + 62));await checkHud();
  advanceTo(119.9);const beforeTimer = balances();advanceTo(120.1);
  assert.ok(balances().every((gold, slot) => gold >= beforeTimer[slot]), 'neither online player loses gold at 120 seconds');await checkHud();
  advanceTo(375);await checkHud();
  assert.equal(game.globals.udg_waves, 6);assert.deepEqual(kills, [240, 240]);
  assert.ok(balances().every(gold => gold > 900 + 370));
  assert.ok(game.messages.every(message => !message.text.includes('瓜分')));
  assert.deepEqual(game.errors, []);assert.deepEqual(errors, []);
  console.log(JSON.stringify({ passed: true, clients: ['desktop', 'portrait'], wave: game.globals.udg_waves, gold: balances(), kills, browserErrors: errors }));
} finally {
  await browser.close();for (const room of rooms.values()) clearInterval(room.timer);
  await new Promise(resolve => server.close(resolve));
}
