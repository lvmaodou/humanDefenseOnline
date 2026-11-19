import assert from 'node:assert/strict';
import { once } from 'node:events';
import { writeFile, mkdir } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const errors = [];
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.setDefaultTimeout(20000);page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    window.reviewFrames = [];window.reviewPackets = [];
    const frame = requestAnimationFrame.bind(window);
    window.requestAnimationFrame = callback => frame(time => { window.reviewFrames.push(time);callback(time); });
    const Socket = WebSocket;
    window.WebSocket = class extends Socket {
      constructor(...args) {
        super(...args);this.addEventListener('message', event => {
          const message = JSON.parse(event.data);
          if (message.type === 'state') { window.reviewState = message.state;window.reviewPackets.push(performance.now()); }
        });
      }
    };
  });
  await page.goto(`http://localhost:${server.address().port}`);
  await page.locator('#nickname').fill('Sword11');await page.locator('#room-code').fill('SWORD11');await page.locator('.join-button').click();
  for (let step = 0; step < 10; step++) {
    if (await page.evaluate(() => window.reviewState?.units.some(unit => unit.owner === 0 && unit.type === 'h06C'))) break;
    await page.waitForTimeout(500);
    if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
      const title = await page.locator('#dialog-title').textContent();
      await page.locator('#dialog-options button').nth(title.includes('职业') ? 5 : 0).evaluate(button => button.click());
    }
  }
  await page.waitForFunction(() => window.reviewState?.units.some(unit => unit.type === 'h06C'));
  await page.waitForFunction(() => window.__originalVisualDebug?.().assets.loadedModels > 20);
  const game = rooms.get('SWORD11').game;
  game.tasks = [];game.timers = [];game.globals.udg_waves = 11;game.globals.udg_lives = 99999;
  const worker = [...game.units.values()].find(unit => unit.raw === 'h06C');
  game.moveUnit(worker, -3392, 5000);
  const towers = [];
  for (const [index, type] of ['h06E', 'h06E', 'h06E', 'h06E', 'h06N', 'h06N', 'h06T', 'h06H', 'h06K', 'h075', 'h06E', 'h06N'].entries()) {
    towers.push(game.createUnit(game.players[0], game.fourCC(type), -4032 + Math.floor(index / 4) * 128, 4608 + index % 4 * 256));
  }
  let attacks = 0;
  const effect = game.effect.bind(game);
  game.effect = (kind, source, target, extra) => { if (kind === 'projectile' && source?.owner.id === 0) attacks++;return effect(kind, source, target, extra); };
  const tickTimes = [], tick = game.tick.bind(game);
  game.tick = dt => { const start = performance.now();tick(dt);tickTimes.push(performance.now() - start); };
  const enemies = [];
  for (let index = 0; index < 72; index++) {
    const enemy = game.createUnit(game.players[8], game.fourCC('ugar'), -4352 + Math.floor(index / 24) * 48, 6200 - index % 24 * 64);
    enemy.hp = enemy.maxHp = 1e7;game.setMove(enemy, { x: -4352, y: 3840 });enemies.push({ unit: enemy, x: enemy.x, y: enemy.y });
  }
  for (let index = 0; index < 200; index++) {
    const enemy = game.createUnit(game.players[9], game.fourCC('nanc'), -7168 + index % 20 * 64, -4480 + Math.floor(index / 20) * 48);
    game.setMove(enemy, { x: -4352, y: -4480 });
  }
  await page.waitForFunction(() => window.reviewState?.wave === 11 && window.reviewState.units.filter(unit => unit.type === 'ugar').length >= 72);
  await page.waitForTimeout(2000);
  const attacksBefore = attacks;
  await page.evaluate(() => { window.reviewFrames = [];window.reviewPackets = []; });tickTimes.length = 0;
  await page.waitForTimeout(5000);
  const visual = await page.evaluate(() => {
    const frames = window.reviewFrames, deltas = frames.slice(1).map((time, index) => time - frames[index]).sort((a, b) => a - b);
    const packets = window.reviewPackets, packetGaps = packets.slice(1).map((time, index) => time - packets[index]).sort((a, b) => a - b);
    return { fps: Math.round(1000 / (deltas.reduce((sum, value) => sum + value, 0) / deltas.length)), p95FrameMs: Math.round(deltas[Math.floor(deltas.length * .95)] || 0), packets: packets.length, p95PacketGapMs: Math.round(packetGaps[Math.floor(packetGaps.length * .95)] || 0), calls: window.__originalVisualDebug().renderer.calls, modelFailures: window.__originalVisualDebug().assets.failed };
  });
  const sorted = tickTimes.toSorted((a, b) => a - b), advanced = enemies.filter(({ unit, x, y }) => Math.hypot(unit.x - x, unit.y - y) > 200).length;
  const report = { wave: 11, profession: 'swordsman', units: game.units.size, towers: towers.length, flyingEnemies: enemies.length, advanced, attacksInFiveSeconds: attacks - attacksBefore, tickP95Ms: Number((sorted[Math.floor(sorted.length * .95)] || 0).toFixed(2)), tickMaxMs: Number(Math.max(0, ...tickTimes).toFixed(2)), ...visual, errors: [...errors, ...game.errors] };
  await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true });
  await writeFile(new URL('../artifacts/wave11-performance.json', import.meta.url), JSON.stringify(report, null, 2));
  await page.screenshot({ path: fileURLToPath(new URL('../artifacts/wave11-performance.png', import.meta.url)) });
  console.log(JSON.stringify(report));
  assert.ok(advanced >= enemies.length * .9, 'the flying wave continues advancing');
  assert.ok(report.attacksInFiveSeconds >= 30, 'the swordsman buildings continue firing');
  assert.ok(report.packets >= 30, 'live battle updates continue during the crowded wave');
  assert.ok(report.tickP95Ms < 50, 'ordinary simulation steps fit the 50 ms tick budget');
  assert.deepEqual(report.errors, []);assert.deepEqual(report.modelFailures, []);
} finally {
  await browser.close();for (const room of rooms.values()) clearInterval(room.timer);await new Promise(resolve => server.close(resolve));
}
