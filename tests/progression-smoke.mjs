import assert from 'node:assert/strict';
import { once } from 'node:events';
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

process.env.PORT = '0';
const { server, rooms, sessions } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const errors = [], report = {};
async function captureState(page) {
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const Socket = WebSocket;
    window.WebSocket = class extends Socket {
      constructor(...args) {
        super(...args);
        this.addEventListener('message', event => {
          const message = JSON.parse(event.data);
          if (message.type === 'state') window.reviewState = message.state;
        });
      }
    };
  });
}
async function select(page, unit, touch = false) {
  await page.waitForFunction(id => window.reviewState?.units.some(unit => unit.id === id), unit.hid);
  const point = await page.evaluate(async ({ x, y }) => {
    const T = await import('/vendor/three.module.js'), c = await import('/coordinates.js');
    const view = window.__originalVisualDebug().camera, canvas = document.querySelector('#battle'), rect = canvas.getBoundingClientRect();
    const camera = new T.PerspectiveCamera(c.cameraVerticalFov(), canvas.width / canvas.height, .1, view.far);
    camera.position.fromArray(view.position);camera.lookAt(new T.Vector3().fromArray(view.focus));camera.updateMatrixWorld(true);
    const [wx, wz] = c.sourceToWorld(x, y), point = new T.Vector3(wx, .2, wz).project(camera);
    return getComputedStyle(document.querySelector('#app')).transform !== 'none'
      ? { x: rect.left + (point.y + 1) / 2 * rect.width, y: rect.top + (point.x + 1) / 2 * rect.height }
      : { x: rect.left + (point.x + 1) / 2 * rect.width, y: rect.top + (1 - point.y) / 2 * rect.height };
  }, { x: unit.x, y: unit.y });
  if (touch) await page.touchscreen.tap(point.x, point.y);else await page.mouse.click(point.x, point.y);
}
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });page.setDefaultTimeout(25000);
  await captureState(page);await page.goto(`http://localhost:${server.address().port}`);
  await page.locator('#nickname').fill('Progression Audit');await page.locator('#room-code').fill('PROGRESS');await page.locator('.join-button').click();
  for (let attempt = 0; attempt < 30; attempt++) {
    if (await page.evaluate(() => window.reviewState?.units.some(unit => unit.owner === 0 && unit.type === 'h004'))) break;
    await page.waitForTimeout(300);
    if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
      const buttons = page.locator('#dialog-options button'), warlock = buttons.filter({ hasText: '术士' });
      if (await warlock.count()) await warlock.click();else await buttons.first().click();
    }
  }
  await page.waitForFunction(() => window.__originalVisualDebug?.().terrainTexture && window.reviewState?.units.some(unit => unit.owner === 0 && unit.type === 'h004'));
  await page.waitForFunction(() => window.reviewState.time >= 11);
  const room = rooms.get('PROGRESS'), game = room.game, worker = [...game.units.values()].find(unit => unit.owner.id === 0 && unit.raw === 'h004');
  game.tasks = [];game.timers = [];game.tick = () => {};game.globals.udg_waves = 11;game.globals.udg_nokuaisumode = true;game.run('OpenTrigger', [4]);
  for (const unit of [...game.units.values()]) if (unit !== worker) game.removeUnit(unit);
  const building = game.createUnit(worker.owner, game.fourCC('h02O'), worker.x + 256, worker.y + 128);building.data = 91;building.cooldown = 1000;
  const target = game.createUnit(game.players[8], game.fourCC('hfoo'), building.x + 128, building.y + 128);
  game.cast(building, game.fourCC('A05C'), target, null, true);
  const water = [...game.units.values()].find(unit => unit.raw === 'hwat' && unit.summoner === building);assert.ok(water);
  game.moveUnit(water, worker.x - 256, worker.y + 128);water.cooldown = 1000;
  sessions.publish(room);
  await page.waitForFunction(() => window.__originalVisualDebug().assets.loadedModels > 20);
  await select(page, building);await page.locator('#growth-row').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#unit-growth-text').textContent(), '91 / 150');assert.equal(await page.locator('#health-row').isVisible(), false);
  assert.match(await page.locator('#unit-growth-next').textContent(), /召唤师\(Lv2\)/);
  game.kill(target, water);sessions.publish(room);
  await page.waitForFunction(() => document.querySelector('#unit-growth-text').textContent === '104 / 150');
  report.beforePromotion = await page.locator('#growth-row').innerText();
  await page.screenshot({ path: 'artifacts/building-progression-desktop.png' });
  building.data = 149;
  const enemy = game.createUnit(game.players[8], game.fourCC('hfoo'), building.x + 128, building.y + 128);game.kill(enemy, water);sessions.publish(room);
  const promoted = building.replacement;assert.equal(promoted?.raw, 'h02N');
  await page.waitForFunction(() => document.querySelector('#unit-name').textContent.includes('召唤师(Lv2)') && document.querySelector('#unit-growth-text').textContent === '0 / 250');
  const another = game.createUnit(game.players[8], game.fourCC('hfoo'), promoted.x + 128, promoted.y + 128);game.kill(another, water);sessions.publish(room);
  await page.waitForFunction(() => document.querySelector('#unit-growth-text').textContent === '13 / 250');
  report.afterPromotion = await page.locator('#growth-row').innerText();
  await select(page, worker);await page.locator('#health-row').waitFor({ state: 'visible' });assert.equal(await page.locator('#growth-row').isVisible(), false);
  await select(page, water);await page.locator('#health-row').waitFor({ state: 'visible' });assert.equal(await page.locator('#growth-row').isVisible(), false);
  const paid = game.createUnit(worker.owner, game.fourCC('h027'), worker.x + 256, worker.y - 128);sessions.publish(room);
  await select(page, paid);await page.locator('#growth-row').waitFor({ state: 'visible' });
  assert.equal(await page.locator('#unit-growth-text').textContent(), '0');assert.equal(await page.locator('#unit-growth-track').isVisible(), false);
  assert.match(await page.locator('#unit-growth-next').textContent(), /花费资源升级/);assert.equal(await page.locator('#unit-upgrade').isVisible(), true);
  await select(page, promoted);
  const storageState = await page.context().storageState();await page.close();
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, storageState }), phone = await mobile.newPage();
  phone.setDefaultTimeout(25000);await captureState(phone);await phone.goto(`http://localhost:${server.address().port}`);
  await phone.locator('.connection.on').waitFor();await phone.waitForFunction(() => window.__originalVisualDebug?.().assets.loadedModels > 20);
  await select(phone, promoted, true);await phone.locator('#growth-row').waitFor({ state: 'visible' });
  assert.equal(await phone.locator('#unit-growth-text').textContent(), '13 / 250');assert.equal(await phone.locator('#health-row').isVisible(), false);
  report.mobile = await phone.locator('#growth-row').innerText();
  report.mobileFits = await phone.locator('#unit-growth-text').evaluate(element => element.scrollWidth <= element.clientWidth);
  assert.equal(report.mobileFits, true);await phone.screenshot({ path: 'artifacts/building-progression-mobile.png' });
  assert.deepEqual(errors, []);assert.deepEqual(game.errors, []);
  await writeFile('artifacts/building-progression-browser.json', JSON.stringify({ ...report, errors }, null, 2));
  console.log(JSON.stringify({ ...report, errors }));
} finally {
  await browser.close();await new Promise(resolve => server.close(resolve));
}
