import assert from 'node:assert/strict';
import { once } from 'node:events';
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

process.env.PORT = '0';
const { server, rooms, sessions } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const data = JSON.parse(await readFile(new URL('../content/original-3.0/data.json', import.meta.url), 'utf8'));
const current = await readFile(new URL('../public/warcraft.js', import.meta.url), 'utf8');
// Reproduce the two previous selection paths without changing workspace files.
const legacySelect = `export function selectSequence(sequences, requested, properties = '') {
  const tags = (requested+' '+properties).toLowerCase().replaceAll(',', ' ').split(/\\s+/).filter(Boolean);
  const scored = sequences.map((sequence, index) => {
    const words = sequence.Name.toLowerCase().split(/\\s+/);
    return { index, score: tags.reduce((score, tag, i) => score + (words.includes(tag) ? i === 0 ? 100 : 10 : i === 0 ? -100 : -2), 0) - (sequence.Rarity || 0) / 100 };
  });
  const best = scored.sort((a,b) => b.score-a.score)[0];
  return best?.score >= 0 ? best.index : sequences.findIndex(sequence => /^stand(?:\\s|$)/i.test(sequence.Name));
}
`;
const legacy = current.replace(/const animationTags[\s\S]*?\/\/ MDX owns/, `${legacySelect}\n// MDX owns`)
  .replace(/    const requested = animationTags\(animationNames\)[\s\S]*?    const sequence = this.play\(requested, properties, true\);/,
    `    const requested = animationNames ? animationNames.replaceAll(',', ' ').split(/\\s+/)[0] : action;
    const properties = animationNames || this.definition.Animprops || '';
    const sequence = this.play(requested, properties, true);`);
assert.notEqual(legacy, current);
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const errors = [], report = {};
const ids = ['h007','h055','h057','h052','h053','h054','h03C','h05M','h05J'];
async function watch(page) {
  page.setDefaultTimeout(25000);page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const Socket = WebSocket;
    window.WebSocket = class extends Socket {
      constructor(...args) { super(...args);this.addEventListener('message', event => { const m = JSON.parse(event.data);if (m.type === 'state') window.reviewState = m.state; }); }
    };
  });
}
async function snapshot(page) {
  return page.evaluate(() => window.__originalVisualDebug().units.filter(unit => ['h007','h055','h057','h052','h053','h054','h03C','h05M','h05J'].includes(unit.type)));
}
try {
  const page = await browser.newPage({ viewport: { width: 1366, height: 820 } });await watch(page);
  await page.route('**/warcraft.js', route => route.fulfill({ status: 200, contentType: 'text/javascript', body: legacy }));
  await page.goto(`http://localhost:${server.address().port}`);
  await page.locator('#nickname').fill('Tower Audit');await page.locator('#room-code').fill('TOWERS');await page.locator('.join-button').click();
  for (let i = 0; i < 25; i++) {
    if (await page.evaluate(() => window.reviewState?.units.some(unit => unit.owner === 0 && unit.type === 'h003'))) break;
    await page.waitForTimeout(300);
    if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
      const buttons = page.locator('#dialog-options button'), ranger = buttons.filter({ hasText: '游侠' });
      if (await ranger.count()) await ranger.click();else await buttons.first().click();
    }
  }
  await page.waitForFunction(() => window.reviewState?.time >= 11 && window.reviewState.units.some(unit => unit.owner === 0 && unit.type === 'h003'));
  const room = rooms.get('TOWERS'), game = room.game, worker = [...game.units.values()].find(unit => unit.owner.id === 0 && unit.raw === 'h003');
  game.tasks = [];game.timers = [];game.tick = () => {};
  for (const unit of [...game.units.values()]) if (unit !== worker) game.removeUnit(unit);
  const towers = ids.map((type, index) => game.createUnit(worker.owner, game.fourCC(type), worker.x + (index % 3 - 1) * 256, worker.y + (3 - Math.floor(index / 3)) * 256));
  game.effect('camera', { x: worker.x, y: worker.y + 384 }, null, { operation: 'pan', player: 0, duration: 60 });
  const enemy = game.createUnit(game.players[8], game.fourCC('hfoo'), worker.x + 512, worker.y + 512);enemy.hp = enemy.maxHp = 1e9;
  const trigger = () => {
    for (const [id, ability] of [['h052','A09F'],['h053','A00U'],['h054','A09B']]) {
      const tower = towers.find(unit => unit.raw === id);assert.equal(game.cast(tower, game.fourCC(ability), enemy, null, true), true);
    }
    sessions.publish(room);
  };
  sessions.publish(room);
  await page.waitForFunction(count => window.__originalVisualDebug?.().units.filter(unit => ['h007','h055','h057','h052','h053','h054','h03C','h05M','h05J'].includes(unit.type) && unit.drawCount > 0).length === count, ids.length);
  await page.waitForFunction(() => { const view = window.__originalVisualDebug().camera;return Math.hypot(...view.focus.map((value, index) => value - view.target[index])) < .01; });
  trigger();
  await page.waitForFunction(() => window.__originalVisualDebug().units.filter(unit => ['h052','h054'].includes(unit.type)).every(unit => unit.animation?.name === 'Stand Ready Attack'));
  report.before = await snapshot(page);await page.screenshot({ path: 'artifacts/ranger-towers-before.png' });
  await page.unroute('**/warcraft.js');await page.reload();
  await page.locator('.connection.on').waitFor();
  await page.waitForFunction(() => window.__originalVisualDebug?.().units.filter(unit => ['h052','h053','h054'].includes(unit.type) && unit.drawCount > 0).length === 3);
  for (let i = 0; i < 4; i++) {
    trigger();await page.waitForTimeout(250);
    for (const unit of await snapshot(page)) {
      assert.equal(unit.scale, Number(data.units[unit.type].modelScale || 1));
      if (['h052','h053','h054'].includes(unit.type)) assert.match(unit.animation.name, /Upgrade First/, `${unit.type} keeps its guard-tower form`);
      if (['h007','h055','h057'].includes(unit.type)) assert.doesNotMatch(unit.animation.name, /Upgrade/);
    }
  }
  report.after = await snapshot(page);await page.screenshot({ path: 'artifacts/ranger-towers-after.png' });
  report.failedAssets = await page.evaluate(() => window.__originalVisualDebug().assets.failed);
  const storageState = await page.context().storageState();await page.close();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, storageState });
  const phone = await context.newPage();await watch(phone);await phone.goto(`http://localhost:${server.address().port}`);
  await phone.locator('.connection.on').waitFor();
  await phone.waitForFunction(() => window.__originalVisualDebug?.().units.filter(unit => ['h052','h053','h054'].includes(unit.type) && unit.drawCount > 0).length === 3);
  trigger();await phone.waitForTimeout(300);report.mobile = await snapshot(phone);
  for (const unit of report.mobile.filter(unit => ['h052','h053','h054'].includes(unit.type))) assert.match(unit.animation.name, /Upgrade First/);
  await phone.screenshot({ path: 'artifacts/ranger-towers-mobile.png' });
  assert.deepEqual(game.errors, []);assert.deepEqual(errors, []);assert.deepEqual(report.failedAssets, []);
  await writeFile('artifacts/ranger-tower-animations.json', JSON.stringify({ ...report, errors }, null, 2));
  console.log(JSON.stringify({ before: report.before.filter(unit => ['h052','h054'].includes(unit.type)).map(unit => ({ type: unit.type, animation: unit.animation.name })), after: report.after.map(unit => ({ type: unit.type, scale: unit.scale, animation: unit.animation.name })), mobileModels: report.mobile.length, errors }));
} finally {
  await browser.close();for (const room of rooms.values()) clearInterval(room.timer);await new Promise(resolve => server.close(resolve));
}
