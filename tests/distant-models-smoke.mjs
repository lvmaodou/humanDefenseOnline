import assert from 'node:assert/strict';
import { once } from 'node:events';
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const data = JSON.parse(await readFile(new URL('../content/original-3.0/data.json', import.meta.url), 'utf8'));
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const errors = [], results = [];
try {
  for (const device of ['desktop', 'portrait']) {
    const mobile = device === 'portrait', roomId = mobile ? 'FARPHONE' : 'FARMODEL';
    const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 800 }, isMobile: mobile, hasTouch: mobile });
    await context.addInitScript(() => {
      const Socket = WebSocket;
      window.WebSocket = class extends Socket {
        constructor(...args) {
          super(...args);this.addEventListener('message', event => { const message = JSON.parse(event.data);if (message.type === 'state') window.reviewState = message.state; });
        }
      };
    });
    const page = await context.newPage();page.setDefaultTimeout(30000);page.on('pageerror', error => errors.push(error.message));
    await page.goto(`http://localhost:${server.address().port}`);
    await page.locator('#nickname').fill('Far Models');await page.locator('#room-code').fill(roomId);await page.locator('.join-button').click();
    for (let attempt = 0; attempt < 15; attempt++) {
      if (await page.evaluate(() => window.reviewState?.units.some(unit => unit.owner === 0 && unit.type === 'h002'))) break;
      await page.waitForTimeout(400);
      if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
        const title = await page.locator('#dialog-title').textContent();await page.locator('#dialog-options button').nth(title.includes('职业') ? 1 : 0).click();
      }
    }
    await page.waitForFunction(() => window.__originalVisualDebug?.().terrainTexture && window.reviewState?.units.some(unit => unit.owner === 0 && unit.type === 'h002'));
    const game = rooms.get(roomId).game;game.tasks = [];game.timers = [];game.tick = () => {};
    await page.locator('#zoom-out').evaluate(button => { for (let count = 0; count < 20; count++) button.click(); });
    await page.waitForFunction(() => {
      const view = window.__originalVisualDebug().camera;
      return view.zoom > 2.5 && Math.hypot(...view.focus.map((value, index) => value - view.target[index])) < .01;
    });
    await page.waitForTimeout(1000);
    const points = await page.evaluate(async () => {
      const T = await import('/vendor/three.module.js'), C = await import('/coordinates.js'), { sampleTerrainHeight } = await import('/terrain-relief.js');
      const terrain = await (await fetch('/map/terrain.json')).json(), view = window.__originalVisualDebug().camera, canvas = document.querySelector('#battle');
      const camera = new T.PerspectiveCamera(C.cameraVerticalFov(), canvas.width / canvas.height, .1, view.far);
      camera.position.fromArray(view.position);camera.lookAt(new T.Vector3().fromArray(view.focus));camera.updateMatrixWorld(true);
      const sites = [];
      for (let y = -7424; y <= 7424; y += 256) for (let x = -7424; x <= 7424; x += 256) {
        const [wx, wz] = C.sourceToWorld(x, y), world = new T.Vector3(wx, sampleTerrainHeight(terrain, x, y) / 128 * 1.45, wz), distance = camera.position.distanceTo(world), screen = world.clone().project(camera);
        if (distance > 42 && Math.abs(screen.x) < .8 && Math.abs(screen.y) < .7 && screen.z < 1) sites.push({ x, y, distance });
      }
      return sites;
    });
    assert.ok(points.length >= 56, `enough far visible placements at ${device}: ${points.length}`);
    const monsters = data.waveUnits.map((type, index) => {
      const point = points[Math.floor(index * points.length / data.waveUnits.length)];
      return game.createUnit(game.players[8], game.fourCC(type), point.x, point.y);
    });
    const ids = monsters.map(unit => unit.hid);
    await page.waitForFunction(ids => {
      const units = window.__originalVisualDebug().units;
      return ids.every(id => units.some(unit => unit.id === id && unit.visible && unit.model === 'original-mdx' && unit.distance > 40 && unit.drawCount > 0));
    }, ids);
    const before = await page.evaluate(ids => window.__originalVisualDebug().units.filter(unit => ids.includes(unit.id)), ids);
    await page.waitForTimeout(350);
    const after = await page.evaluate(ids => window.__originalVisualDebug().units.filter(unit => ids.includes(unit.id)), ids);
    assert.equal(after.length, 56);
    assert.ok(after.every(unit => unit.visible && unit.drawCount > before.find(previous => previous.id === unit.id).drawCount), 'each distant native model continues rendering');
    assert.ok(after.some(unit => unit.animation.frame !== before.find(previous => previous.id === unit.id).animation.frame), 'distant animation continues');
    const failures = await page.evaluate(() => window.__originalVisualDebug().assets.failed);
    assert.deepEqual(failures, []);assert.deepEqual(game.errors, []);
    await page.screenshot({ path: `artifacts/distant-models-${device}.png` });
    results.push({ device, zoom: await page.evaluate(() => window.__originalVisualDebug().camera.zoom), originalModels: after.length, minimumDistance: Math.min(...after.map(unit => unit.distance)), maximumDistance: Math.max(...after.map(unit => unit.distance)), failedAssets: failures, models: after });
    await page.locator('#leave-room').evaluate(button => button.click());await context.close();
  }
  assert.deepEqual(errors, []);await writeFile('artifacts/distant-models.json', JSON.stringify({ results, errors }, null, 2));
  console.log(JSON.stringify({ results: results.map(({ models, ...result }) => result), errors }));
} finally {
  await browser.close();for (const room of rooms.values()) clearInterval(room.timer);await new Promise(resolve => server.close(resolve));
}
