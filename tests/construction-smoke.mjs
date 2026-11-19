import assert from 'node:assert/strict';
import { once } from 'node:events';
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { checkBuildPlacement } from '../public/placement.js';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const page = await browser.newPage({ viewport: { width: 1366, height: 820 } }), errors = [], report = {};
page.on('pageerror', error => errors.push(error.message));page.setDefaultTimeout(20000);
await page.addInitScript(() => {
  const Original = WebSocket;
  window.WebSocket = class extends Original {
    constructor(...args) { super(...args);this.addEventListener('message', event => { const m = JSON.parse(event.data);if (m.type === 'state') window.reviewState = m.state;if (m.type === 'joined') window.reviewJoined = m; }); }
  };
});
async function visual(id) {
  await page.waitForFunction(id => window.__originalVisualDebug?.().units.some(unit => unit.id === id && unit.animation), id);
  return page.evaluate(id => window.__originalVisualDebug().units.find(unit => unit.id === id), id);
}
async function select(unit) {
  const point = await page.evaluate(async ({ x, y }) => {
    const T = await import('/vendor/three.module.js'), C = await import('/coordinates.js');
    const view = window.__originalVisualDebug().camera, canvas = document.querySelector('#battle'), rect = canvas.getBoundingClientRect();
    const camera = new T.PerspectiveCamera(C.cameraVerticalFov(), canvas.width / canvas.height, .1, view.far);
    camera.position.fromArray(view.position);camera.lookAt(new T.Vector3().fromArray(view.focus));camera.updateMatrixWorld(true);
    const [wx, wz] = C.sourceToWorld(x, y), point = new T.Vector3(wx, .03, wz).project(camera);
    return { x: rect.left + (point.x + 1) / 2 * rect.width, y: rect.top + (1 - point.y) / 2 * rect.height };
  }, { x: unit.x, y: unit.y });
  await page.mouse.click(point.x, point.y);
}
try {
  await page.goto(`http://localhost:${server.address().port}`);
  await page.locator('#nickname').fill('Construction');await page.locator('#room-code').fill('BUILDANI');await page.locator('.join-button').click();
  for (let attempt = 0; attempt < 15; attempt++) {
    if (await page.evaluate(() => window.reviewState?.units.some(unit => unit.owner === 0 && unit.type === 'h003'))) break;
    await page.waitForTimeout(400);
    if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
      const title = await page.locator('#dialog-title').textContent();await page.locator('#dialog-options button').nth(title.includes('职业') ? 4 : 0).click();
    }
  }
  await page.waitForFunction(() => window.reviewState?.units.some(unit => unit.type === 'h003' && unit.owner === 0));
  const game = rooms.get('BUILDANI').game, worker = [...game.units.values()].find(unit => unit.raw === 'h003' && unit.owner.id === 0);
  game.tasks = [];game.timers = [];game.players[0].gold = 100000;
  const tick = game.tick.bind(game);game.tick = () => {};
  const sites = [];
  for (let dy = 256; dy <= 640; dy += 128) for (let dx = -256; dx <= 256; dx += 128) {
    const placement = checkBuildPlacement(game.terrain, [...game.units.values()], worker.x + dx, worker.y + dy, { type: 'h007' });
    if (placement.valid && sites.every(site => Math.hypot(site.x - placement.x, site.y - placement.y) >= 256)) sites.push(placement);
  }
  assert.ok(sites.length >= 2);
  const ordinary = game.build(0, 'h03J', sites[0].x, sites[0].y), site = sites[1];
  game.moveUnit(worker, site.x + 64, site.y);
  const item = game.createItem('I001', worker);assert.equal(game.pickup(worker, item), true);
  assert.equal(game.action(0, { type: 'item', unit: worker.hid, item: item.hid, x: site.x, y: site.y }), true);
  const tower = [...game.units.values()].find(unit => unit.raw === 'h007' && unit.owner.id === 0);
  tick(2.5);
  await page.waitForFunction(id => Math.abs((window.reviewState?.units.find(unit => unit.id === id)?.construction?.progress ?? -1) - .5) < 1e-8, tower.hid);
  report.build = await visual(tower.hid);report.ordinary = await visual(ordinary.hid);
  assert.match(report.build.animation.name, /^Birth$/i);assert.ok(Math.abs(report.build.animation.frame - 30000) < 2500);
  assert.match(report.ordinary.animation.name, /^Stand/);
  await select(tower);await page.waitForFunction(() => document.querySelector('#construction-row').hidden === false);
  assert.match(await page.locator('#unit-construction-text').textContent(), /50%/);
  assert.equal(await page.locator('#unit-upgrade').isDisabled(), true);assert.equal(await page.locator('#target-mode').isDisabled(), true);
  await page.screenshot({ path: 'artifacts/construction-progress.png' });

  await page.reload();await page.waitForFunction(() => window.reviewJoined?.resumed && window.reviewState?.units.some(unit => unit.type === 'h007'));
  report.reconnected = await visual(tower.hid);
  assert.ok(Math.abs(report.reconnected.construction.progress - .5) < 1e-8);assert.match(report.reconnected.animation.name, /^Birth$/i);
  assert.ok(Math.abs(report.reconnected.animation.frame - 30000) < 2500);

  tick(2.6);assert.equal(game.action(0, { type: 'upgrade', unit: tower.hid, to: 'h052' }), true);tick(4);
  await page.waitForFunction(id => window.reviewState?.units.find(unit => unit.id === id)?.construction?.kind === 'upgrade', tower.hid);
  report.upgrade = await visual(tower.hid);
  assert.match(report.upgrade.animation.name, /^Birth Upgrade/i);assert.ok(Math.abs(report.upgrade.construction.progress - .4) < 1e-6);
  tick(6.1);await page.waitForFunction(id => window.reviewState?.units.find(unit => unit.id === id)?.type === 'h052', tower.hid);
  report.finished = await visual(tower.hid);
  assert.equal(report.finished.construction, undefined);assert.match(report.finished.animation.name, /^Stand.*Upgrade First/i);
  await select(tower);await page.waitForFunction(() => document.querySelector('#construction-row').hidden === true);
  assert.equal(await page.locator('#target-mode').isDisabled(), false);
  report.worker = await visual(worker.hid);assert.doesNotMatch(report.worker.animation.name, /^Birth/);
  report.failedAssets = await page.evaluate(() => window.__originalVisualDebug().assets.failed);
  report.errors = errors;report.runtimeErrors = game.errors;
  assert.deepEqual(report.failedAssets, []);assert.deepEqual(errors, []);assert.deepEqual(game.errors, []);
  await writeFile('artifacts/construction-progress.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: true, build: report.build.animation, reconnected: report.reconnected.animation, upgrade: report.upgrade.animation, finished: report.finished.animation, errors }));
} catch (error) {
  console.log(JSON.stringify({ rooms: [...rooms.keys()], diagnostic: await page.evaluate(() => ({ status: window.reviewState?.status, units: window.reviewState?.units.map(unit => ({ id: unit.id, type: unit.type, construction: unit.construction })), title: document.querySelector('#context-title').textContent, error: document.querySelector('#toast').textContent })), errors }));
  throw error;
} finally {
  await browser.close();for (const room of rooms.values()) clearInterval(room.timer);await new Promise(resolve => server.close(resolve));
}
