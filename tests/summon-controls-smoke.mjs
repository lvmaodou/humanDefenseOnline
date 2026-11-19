import assert from 'node:assert/strict';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { cameraOffset } from '../public/coordinates.js';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const url = `http://localhost:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const errors = [];
async function project(page, x, y, lift = 0) {
  return page.evaluate(async ({ x, y, lift }) => {
    const T = await import('/vendor/three.module.js'), C = await import('/coordinates.js'), debug = window.__originalVisualDebug().camera;
    const canvas = document.querySelector('#battle'), rect = canvas.getBoundingClientRect(), camera = new T.PerspectiveCamera(C.cameraVerticalFov(), canvas.width / canvas.height, .1, debug.far);
    camera.position.fromArray(debug.position);camera.lookAt(new T.Vector3().fromArray(debug.focus));camera.updateMatrixWorld(true);
    const [wx, wz] = C.sourceToWorld(x, y), point = new T.Vector3(wx, lift, wz).project(camera);
    const screen = getComputedStyle(document.querySelector('#app')).transform === 'none' ? { x: rect.left + (point.x + 1) / 2 * rect.width, y: rect.top + (1 - point.y) / 2 * rect.height } : { x: rect.left + (point.y + 1) / 2 * rect.width, y: rect.top + (point.x + 1) / 2 * rect.height };
    return { ...screen, projection: { position: debug.position, focus: debug.focus, source: [x, y, lift], ndc: point.toArray(), rect: rect.toJSON() } };
  }, { x, y, lift });
}
async function click(page, mobile, point) { if (mobile) await page.touchscreen.tap(point.x, point.y);else await page.mouse.click(point.x, point.y); }
async function settleCamera(page) {
  await page.waitForFunction(offset => {
    const view = window.__originalVisualDebug().camera;
    return Math.hypot(...view.focus.map((value, index) => value - view.target[index])) < .002 && Math.hypot(...view.position.map((value, index) => value - view.target[index] - offset[index] * view.zoom)) < .002;
  }, cameraOffset());
}

try {
  for (const mobile of process.argv.includes('portrait') ? [true] : [false, true]) {
    const roomId = mobile ? 'SUMPHONE' : 'SUMDESK', context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 720 }, isMobile: mobile, hasTouch: mobile });
    const page = await context.newPage();page.setDefaultTimeout(20000);page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      const Original = WebSocket;
      window.WebSocket = class extends Original {
        constructor(...args) {
          super(...args);this.addEventListener('message', event => {
            const message = JSON.parse(event.data);
            if (message.type === 'joined') window.reviewSlot = message.slot;
            if (message.type === 'state') window.reviewState = message.state;
          });
        }
        send(raw) { const message = JSON.parse(raw);if (message.type === 'action') (window.reviewActions ||= []).push(message.action);return super.send(raw); }
      };
    });
    await page.goto(url);await page.locator('#nickname').fill('召唤守卫');await page.locator('#room-code').fill(roomId);await page.locator('.join-button').click();
    await page.waitForFunction(() => Number.isInteger(window.reviewSlot));
    for (let step = 0; step < 10; step++) {
      if (await page.evaluate(() => window.reviewState?.units.some(unit => unit.owner === window.reviewSlot && unit.type === 'h004'))) break;
      await page.waitForTimeout(600);
      if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
        const title = await page.locator('#dialog-title').textContent();await page.locator('#dialog-options button').nth(title.includes('职业') ? 3 : 0).evaluate(button => button.click());
      }
    }
    await page.waitForFunction(() => window.reviewState?.units.some(unit => unit.owner === window.reviewSlot && unit.type === 'h004'));
    await page.waitForFunction(() => window.__originalVisualDebug?.().terrainTexture && window.__originalVisualDebug().assets.loadedModels > 20);
    await settleCamera(page);
    const game = rooms.get(roomId).game, worker = [...game.units.values()].find(unit => unit.raw === 'h004' && unit.owner.id === 0);
    game.tasks = [];game.timers = [];
    for (const [ability, type] of [['A008', 'hwat'], ['A02R', 'osw1'], ['A03J', 'n004']]) {
      game.cast(worker, game.fourCC(ability), null, { x: -3008, y: 2880 }, true);
      const summon = [...game.units.values()].find(unit => unit.summoner === worker && unit.raw === type && !unit.removed && !unit.death);
      assert.ok(summon);
      await page.waitForFunction(id => window.reviewState.units.some(unit => unit.id === id), summon.hid);
      const body = await project(page, summon.x, summon.y, .5);await click(page, mobile, body);
      try {
        await page.waitForFunction(name => document.querySelector('#context-title').textContent === name && !document.querySelector('#unit-inspector').hidden, game.data.units[type].Name, { timeout: 4000 });
      } catch (error) {
        console.log(JSON.stringify({ mobile, type, body, diagnostic: await page.evaluate(({ x, y }) => ({ title: document.querySelector('#context-title').textContent, hit: document.elementFromPoint(x, y)?.outerHTML.slice(0, 250), camera: window.__originalVisualDebug().camera, actions: window.reviewActions }), body) }));
        await page.screenshot({ path: fileURLToPath(new URL('../artifacts/summon-selection-failure.png', import.meta.url)) });throw error;
      }
      await settleCamera(page);
      const goal = { x: -2496, y: 2880 }, destination = await project(page, goal.x, goal.y);
      await click(page, mobile, destination);
      await page.waitForFunction(id => window.reviewActions.some(action => action.type === 'move' && action.unit === id), summon.hid);
      try {
        await page.waitForFunction(({ id, x, y }) => window.reviewState.units.some(unit => unit.id === id && Math.hypot(unit.x - x, unit.y - y) < 12), { id: summon.hid, ...goal }, { timeout: 4000 });
      } catch (error) {
        console.log(JSON.stringify({ mobile, type, destination, diagnostic: await page.evaluate(id => ({ unit: window.reviewState.units.find(unit => unit.id === id), actions: window.reviewActions, toast: document.querySelector('#toast').textContent, camera: window.__originalVisualDebug().camera, canvas: [document.querySelector('#battle').width, document.querySelector('#battle').height], app: [document.querySelector('#app').clientWidth, document.querySelector('#app').clientHeight] }), summon.hid) }));throw error;
      }
      assert.equal(await page.locator('#build-list').isVisible(), false, 'movement does not open construction');
      assert.equal(await page.locator('#unit-inspector').isVisible(), true, 'the summon remains selected');
      assert.equal(await page.locator('#goods').isVisible(), false, 'player equipment stays with the farmer');
      game.removeUnit(summon);
    }
    game.cast(worker, game.fourCC('A07L'), null, { x: -3008, y: 2880 }, true);
    const factory = [...game.units.values()].find(unit => unit.summoner === worker && unit.raw === 'nfac');
    await page.waitForFunction(id => window.reviewState.units.some(unit => unit.id === id), factory.hid);
    await click(page, mobile, await project(page, factory.x, factory.y, .5));
    await page.waitForFunction(() => document.querySelector('#context-title').textContent.includes('兵工厂'));
    await click(page, mobile, await project(page, -2496, 2880));
    assert.equal(await page.evaluate(id => window.reviewActions.some(action => action.type === 'move' && action.unit === id), factory.hid), false);
    assert.equal(await page.locator('#build-list').isVisible(), false);assert.equal(await page.locator('#unit-inspector').isVisible(), true);
    assert.deepEqual(game.errors, []);
    console.log(`PASS: ${mobile ? 'portrait touch' : 'desktop mouse'} selects and moves water elemental, wolf and bear; fixed factory stays selected`);
    await context.close();
  }
  assert.deepEqual(errors, []);console.log('PASS: no browser runtime errors');
} finally {
  await browser.close();for (const room of rooms.values()) clearInterval(room.timer);await new Promise(resolve => server.close(resolve));
}
