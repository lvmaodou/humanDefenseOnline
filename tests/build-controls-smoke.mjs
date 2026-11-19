import assert from 'node:assert/strict';
import { once } from 'node:events';
import { chromium } from 'playwright';
import { cameraOffset } from '../public/coordinates.js';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const url = `http://localhost:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });

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

try {
  for (const device of ['desktop', 'mobile', 'portrait']) {
    const touch = device !== 'desktop', roomId = `BUILD${device === 'desktop' ? 'PC' : device === 'mobile' ? 'MB' : 'PT'}`;
    const context = await browser.newContext({ viewport: device === 'portrait' ? { width: 390, height: 844 } : device === 'mobile' ? { width: 844, height: 390 } : { width: 1280, height: 720 }, isMobile: touch, hasTouch: touch });
    const page = await context.newPage(), errors = [];page.setDefaultTimeout(15000);page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      const Original = WebSocket;
      window.WebSocket = class extends Original {
        constructor(...args) {
          super(...args);this.addEventListener('message', event => { const m = JSON.parse(event.data);if (m.type === 'state') window.reviewState = m.state; });
        }
        send(raw) { const m = JSON.parse(raw);if (m.type === 'action') (window.reviewActions ||= []).push(m.action);return super.send(raw); }
      };
    });
    await page.goto(url);await page.locator('#nickname').fill(`Build ${device}`);await page.locator('#room-code').fill(roomId);await page.locator('.join-button').click();
    for (let attempt = 0; attempt < 10; attempt++) {
      if (await page.evaluate(() => window.reviewState?.units.some(u => u.owner === 0 && u.type === 'h002'))) break;
      await page.waitForTimeout(600);
      if (!await page.locator('#dialog').evaluate(el => el.classList.contains('hidden'))) {
        const title = await page.locator('#dialog-title').textContent();await page.locator('#dialog-options button').nth(title.includes('职业') ? 1 : 0).click();
      }
    }
    await page.waitForFunction(() => window.__originalVisualDebug?.().terrainTexture && window.reviewState?.units.some(u => u.owner === 0 && u.type === 'h002'));
    await page.waitForFunction(offset => {
      const view = window.__originalVisualDebug().camera;
      return Math.hypot(...view.focus.map((n, i) => n - view.target[i])) < .002 && Math.hypot(...view.position.map((n, i) => n - view.target[i] - offset[i] * view.zoom)) < .002;
    }, cameraOffset());
    const game = rooms.get(roomId).game, worker = [...game.units.values()].find(u => u.owner.id === 0 && u.raw === 'h002');
    const thirdSite = { x: worker.x, y: worker.y + 512 };
    game.tasks = [];game.timers = [];
    const tap = async locator => touch ? locator.tap() : locator.click();
    const ground = async (x, y) => { const p = await project(page, x, y);if (touch) await page.touchscreen.tap(p.x, p.y);else await page.mouse.click(p.x, p.y); };
    const checkTower = async count => page.waitForFunction(count => window.reviewState.units.filter(u => u.owner === 0 && u.type === 'h00L').length === count, count);
    try {
      await ground(worker.x, worker.y + 384);
      await page.locator('#build-list').waitFor();
      assert.equal(await page.locator('#build-list .tower').count(), 11);
      assert.equal(await page.locator('#build-list .tower').first().getAttribute('data-unit'), 'h00L');
      await tap(page.locator('#build-list .tower').first());
      await ground(worker.x, worker.y + 384);await checkTower(1);
      await page.waitForFunction(() => document.querySelector('#placement-controls').hidden && document.querySelector('#context-panel').hidden);

      await tap(page.locator('#select-worker'));await page.locator('#unit-build').waitFor();
      await tap(page.locator('#unit-build'));await page.locator('#build-list').waitFor();
      assert.match(await page.locator('[data-unit="h018"] .build-requirement').textContent(), /需要/);
      await tap(page.locator('[data-unit="h018"]'));
      await page.waitForFunction(() => document.querySelector('#placement-status').classList.contains('invalid'));
      await ground(worker.x + 256, worker.y + 384);
      assert.equal(game.players[0].gold, 800, 'an unavailable tower cannot consume resources or move the farmer');
      await tap(page.locator('#build-list .tower').first());
      await ground(worker.x + 256, worker.y + 384);await checkTower(2);
      await page.waitForFunction(() => document.querySelector('#placement-controls').hidden && document.querySelector('#context-panel').hidden);
      await ground(thirdSite.x, thirdSite.y);await page.locator('#build-list').waitFor();
      assert.equal(await page.locator('#build-list .active').count(), 0);
      await tap(page.locator('#context-close'));await tap(page.locator('#select-worker'));
      await ground(worker.x + 256, worker.y);
      assert.ok(await page.evaluate(() => window.reviewActions.some(action => action.type === 'move')), 'a selected farmer retains normal ground movement');
      await tap(page.locator('#target-mode'));
      await tap(page.locator('#open-build'));await page.locator('#build-list').waitFor();
      await tap(page.locator('#build-list .tower').first());
      await ground(thirdSite.x, thirdSite.y);await checkTower(3);
      if (!touch) {
        await tap(page.locator('#select-worker'));await page.keyboard.press('b');
        await page.locator('#build-list').waitFor();assert.equal(await page.locator('#unit-inspector').isVisible(), false);
        await page.keyboard.press('Escape');await page.keyboard.press('Escape');
      }
      assert.deepEqual(errors, []);assert.deepEqual(game.errors, []);
      console.log(JSON.stringify({ device, passed: true, gold: game.players[0].gold, buildings: 3 }));
    } catch (error) {
      console.log(JSON.stringify({ device, diagnostic: await page.evaluate(() => ({ status: window.reviewState?.status, title: document.querySelector('#context-title').textContent, panelHidden: document.querySelector('#context-panel').hidden, buildingButtons: document.querySelectorAll('#build-list .active').length, placement: document.querySelector('#placement-status').textContent, toast: document.querySelector('#toast').textContent, actions: window.reviewActions, errors: window.reviewState?.errors })) }));
      throw error;
    } finally { await context.close(); }
  }
} finally { await browser.close();for (const room of rooms.values()) clearInterval(room.timer);await new Promise(resolve => server.close(resolve)); }
