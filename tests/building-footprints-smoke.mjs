import assert from 'node:assert/strict';
import { once } from 'node:events';
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { buildingFootprint, checkBuildPlacement } from '../public/placement.js';

process.env.PORT = '0';
const { server, rooms, sessions } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const errors = [], report = {};
async function watch(page) {
  page.setDefaultTimeout(20000);page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const Socket = WebSocket;
    window.WebSocket = class extends Socket {
      constructor(...args) {
        super(...args);this.addEventListener('message', event => { const m = JSON.parse(event.data);if (m.type === 'state') window.reviewState = m.state; });
      }
      send(raw) { const m = JSON.parse(raw);if (m.type === 'action') (window.reviewActions ||= []).push(m.action);return super.send(raw); }
    };
  });
}
async function project(page, x, y) {
  return page.evaluate(async ({ x, y }) => {
    const T = await import('/vendor/three.module.js'), C = await import('/coordinates.js');
    const view = window.__originalVisualDebug().camera, canvas = document.querySelector('#battle'), rect = canvas.getBoundingClientRect();
    const camera = new T.PerspectiveCamera(C.cameraVerticalFov(), canvas.width / canvas.height, .1, view.far);
    camera.position.fromArray(view.position);camera.lookAt(new T.Vector3().fromArray(view.focus));camera.updateMatrixWorld(true);
    const [wx, wz] = C.sourceToWorld(x, y), point = new T.Vector3(wx, .03, wz).project(camera);
    return getComputedStyle(document.querySelector('#app')).transform === 'none' ? { x: rect.left + (point.x + 1) / 2 * rect.width, y: rect.top + (1 - point.y) / 2 * rect.height } : { x: rect.left + (point.y + 1) / 2 * rect.width, y: rect.top + (point.x + 1) / 2 * rect.height };
  }, { x, y });
}
async function preview(page, x, y, valid) {
  const point = await project(page, x, y);await page.mouse.move(point.x, point.y);
  await page.waitForFunction(({ x, y, valid }) => {
    const p = window.__buildPlacementDebug?.();return p?.x === x && p?.y === y && p.check.valid === valid;
  }, { x, y, valid });
  const actual = await page.evaluate(() => window.__buildPlacementDebug());
  const expected = buildingFootprint(actual.type, x, y);
  assert.equal(actual.polygon.length, expected.length);
  for (let i = 0; i < expected.length; i++) assert.ok(Math.hypot(...actual.polygon[i].map((v, j) => v - expected[i][j])) < .005, 'drawn preview and server polygon agree');
  return actual;
}
try {
  const page = await browser.newPage({ viewport: { width: 1366, height: 820 } });await watch(page);
  await page.goto(`http://localhost:${server.address().port}`);
  await page.locator('#nickname').fill('Footprints');await page.locator('#room-code').fill('BASES');await page.locator('.join-button').click();
  for (let attempt = 0; attempt < 25; attempt++) {
    if (await page.evaluate(() => window.reviewState?.units.some(unit => unit.owner === 0 && unit.type === 'h003'))) break;
    await page.waitForTimeout(300);
    if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
      const buttons = page.locator('#dialog-options button'), ranger = buttons.filter({ hasText: '游侠' });
      if (await ranger.count()) await ranger.click();else await buttons.first().click();
    }
  }
  await page.waitForFunction(() => window.reviewState?.time >= 11 && window.reviewState.units.some(unit => unit.owner === 0 && unit.type === 'h003'));
  const room = rooms.get('BASES'), game = room.game, worker = [...game.units.values()].find(unit => unit.owner.id === 0 && unit.raw === 'h003');
  game.tasks = [];game.timers = [];const tick = game.tick.bind(game);game.tick = () => {};
  for (const unit of [...game.units.values()]) if (unit !== worker) game.removeUnit(unit);
  worker.owner.gold = 100000;worker.owner.lumber = 1000;worker.owner.cap = 65;
  game.moveUnit(worker, 4224, -6400);
  game.effect('camera', { x: 4224, y: -6336 }, null, { operation: 'pan', player: 0, duration: 60 });
  const item = game.createItem('I001', worker);assert.equal(game.pickup(worker, item), true);sessions.publish(room);
  await page.waitForFunction(id => window.reviewState.units.find(unit => unit.id === id)?.items.length === 1, worker.hid);
  await page.waitForFunction(() => { const view = window.__originalVisualDebug().camera;return Math.hypot(...view.focus.map((value, index) => value - view.target[index])) < .005; });
  const begin = async (item, mobile = false, target = page) => {
    const tap = locator => mobile ? locator.tap() : locator.click();
    await tap(target.locator('#select-worker'));await tap(target.locator(`[data-item="${item.hid}"]`));
  };
  const click = async (x, y) => { const point = await project(page, x, y);await page.mouse.click(point.x, point.y); };
  await begin(item);
  report.cliff = await preview(page, 4096, -6400, false);
  assert.match(report.cliff.check.reason, /底座跨越/);
  await click(4096, -6400);assert.equal(item.charges, 1);assert.equal(item.carrier, worker);
  assert.equal(await page.evaluate(() => (window.reviewActions || []).filter(action => action.type === 'item').length), 0);
  await page.screenshot({ path: 'artifacts/building-base-cliff-preview.png' });
  report.inland = await preview(page, 4160, -6400, true);
  await click(4160, -6400);
  await page.waitForFunction(() => window.reviewState.units.some(unit => unit.type === 'h007'));
  const first = [...game.units.values()].find(unit => unit.raw === 'h007');
  assert.deepEqual([first.x, first.y, first.facing], [4160, -6400, 270]);
  tick(5.1);sessions.publish(room);

  const secondItem = game.createItem('I002', worker);game.pickup(worker, secondItem);sessions.publish(room);
  await page.waitForFunction(id => window.reviewState.units.some(unit => unit.items.some(item => item.id === id)), secondItem.hid);
  await begin(secondItem);report.neighbour = await preview(page, 4160, -6272, false);
  assert.match(report.neighbour.check.reason, /底座重叠/);
  await click(4160, -6272);assert.equal(secondItem.charges, 1);
  game.moveUnit(worker, 4224, -6208);sessions.publish(room);
  report.second = await preview(page, 4160, -6208, true);await click(4160, -6208);
  await page.waitForFunction(() => window.reviewState.units.some(unit => unit.type === 'h055'));
  tick(5.1);assert.equal(game.action(0, { type: 'upgrade', unit: first.hid, to: 'h052' }), true);tick(10.1);

  const magicItem = game.createItem(game.equipment[5].pieces[0].item, worker);game.pickup(worker, magicItem);
  game.moveUnit(worker, 4416, -6400);sessions.publish(room);
  await page.waitForFunction(id => window.reviewState.units.some(unit => unit.items.some(item => item.id === id)), magicItem.hid);
  await begin(magicItem);report.magic = await preview(page, 4352, -6400, true);
  assert.equal(report.magic.scale, .8);await click(4352, -6400);
  await page.waitForFunction(() => window.reviewState.units.some(unit => unit.type === 'h078'));
  tick(5.1);const magicTower = [...game.units.values()].find(unit => unit.raw === 'h078');
  assert.equal(game.action(0, { type: 'upgrade', unit: magicTower.hid, to: 'h07D' }), true);tick(10.1);sessions.publish(room);
  await page.waitForFunction(() => ['h052', 'h055', 'h07D'].every(type => window.__originalVisualDebug().units.some(unit => unit.type === type && unit.drawCount > 0)));
  await page.screenshot({ path: 'artifacts/building-bases-desktop.png' });

  const phoneItem = game.createItem('I003', worker);game.pickup(worker, phoneItem);game.moveUnit(worker, 4416, -6208);sessions.publish(room);
  const storageState = await page.context().storageState();await page.close();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, storageState });
  const phone = await context.newPage();await watch(phone);await phone.goto(`http://localhost:${server.address().port}`);
  await phone.locator('.connection.on').waitFor();await phone.waitForFunction(id => window.reviewState?.units.some(unit => unit.items.some(item => item.id === id)), phoneItem.hid);
  await begin(phoneItem, true, phone);
  const blocked = await project(phone, 4096, -6400);await phone.touchscreen.tap(blocked.x, blocked.y);
  await phone.waitForFunction(() => window.__buildPlacementDebug?.()?.check.valid === false);
  report.mobile = await phone.evaluate(() => window.__buildPlacementDebug());
  assert.equal(phoneItem.charges, 1);assert.match(report.mobile.check.reason, /底座跨越/);
  await phone.screenshot({ path: 'artifacts/building-base-mobile-preview.png' });
  const valid = await project(phone, 4352, -6208);await phone.touchscreen.tap(valid.x, valid.y);
  await phone.waitForFunction(() => window.reviewState.units.some(unit => unit.type === 'h057'));
  const last = [...game.units.values()].find(unit => unit.raw === 'h057');
  assert.deepEqual([last.x, last.y, last.facing], [4352, -6208, 270]);
  assert.equal(checkBuildPlacement(game.terrain, [...game.units.values()], last.x, last.y, { type: 'h054', facing: last.facing, exclude: last.hid, snap: false }).valid, true);
  report.failedAssets = await phone.evaluate(() => window.__originalVisualDebug().assets.failed);
  assert.deepEqual(report.failedAssets, []);assert.deepEqual(errors, []);assert.deepEqual(game.errors, []);
  await writeFile('artifacts/building-footprint-browser.json', JSON.stringify({ ...report, errors }, null, 2));
  console.log(JSON.stringify({ passed: true, desktop: ['cliff', 'inland', 'neighbour', 'second', 'magic'], mobile: true, towers: [first.raw, magicTower.raw, last.raw], errors }));
} catch (error) {
  await writeFile('artifacts/building-footprint-browser-failure.json', JSON.stringify({ message: error.message, errors, report }, null, 2));
  throw error;
} finally {
  await browser.close();for (const room of rooms.values()) clearInterval(room.timer);await new Promise(resolve => server.close(resolve));
}
