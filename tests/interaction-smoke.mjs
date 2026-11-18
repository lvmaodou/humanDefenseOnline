import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } :
    process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {})
});
const results = {};
async function start(name, viewport, mobile, heroType, heroIndex) {
  const context = await browser.newContext({ viewport, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
  const page = await context.newPage(), errors = [];
  page.setDefaultTimeout(20000);
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
  await page.goto(process.env.GAME_URL || 'http://localhost:8081');
  await page.locator('#nickname').fill(name);
  await page.locator('.join-button').click();
  await page.locator('.connection.on').waitFor();
  for (let i = 0; i < 6; i++) {
    await page.waitForTimeout(1200);
    if (await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) break;
    const title = await page.locator('#dialog-title').textContent();
    await page.locator('#dialog-options button').nth(title.includes('职业') ? heroIndex : 0).evaluate(button => button.click());
  }
  await page.waitForFunction(type => window.reviewState?.units.some(unit => unit.owner === window.reviewSlot && unit.type === type), heroType);
  await page.waitForFunction(() => window.__originalVisualDebug?.().terrainTexture && window.__originalVisualDebug().assets.loadedModels > 20);
  await page.waitForTimeout(2000);
  return { context, page, errors };
}
async function project(page, x, y, lift = .4) {
  return page.evaluate(async ({ x, y, lift }) => {
    const T = await import('/vendor/three.module.js'), coordinates = await import('/coordinates.js');
    const debug = window.__originalVisualDebug().camera, canvas = document.querySelector('#battle'), rect = canvas.getBoundingClientRect();
    const camera = new T.PerspectiveCamera(coordinates.cameraVerticalFov(), canvas.width / canvas.height, .1, debug.far);
    camera.position.fromArray(debug.position);camera.lookAt(new T.Vector3().fromArray(debug.focus));camera.updateMatrixWorld(true);
    const [wx, wz] = coordinates.sourceToWorld(x, y), point = new T.Vector3(wx, lift, wz).project(camera);
    return { x: rect.left + (point.x + 1) / 2 * rect.width, y: rect.top + (1 - point.y) / 2 * rect.height };
  }, { x, y, lift });
}
async function pixels(page) {
  return page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => {
    const canvas = document.querySelector('#battle'), gl = canvas.getContext('webgl2'), data = new Uint8Array(4), values = [];
    for (const [x, y] of [[.25, .25], [.5, .5], [.75, .75], [.5, .3], [.25, .7]]) {
      gl.readPixels(Math.floor(gl.drawingBufferWidth * x), Math.floor(gl.drawingBufferHeight * y), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
      values.push([...data]);
    }
    resolve(values);
  })));
}
async function scrollBuildList(context, page, touch) {
  const list = page.locator('#build-list'), before = await list.evaluate(element => element.scrollTop);
  const rotated = await page.locator('#app').evaluate(element => getComputedStyle(element).transform !== 'none');
  if (touch) {
    const session = await context.newCDPSession(page);
    for (let swipe = 0; swipe < 5; swipe++) {
      const rect = await list.boundingBox(), x = rect.x + rect.width * (rotated ? .2 : .5), y = rect.y + rect.height * (rotated ? .5 : .8);
      await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (let step = 1; step <= 7; step++) {
        await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + (rotated ? rect.width * .6 * step / 7 : 0), y: y - (rotated ? 0 : rect.height * .6 * step / 7) }] });
        await page.waitForTimeout(25);
      }
      await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await page.waitForTimeout(250);
      if (await list.evaluate(element => element.scrollTop >= element.scrollHeight - element.clientHeight - 2)) break;
    }
    await session.detach();
  } else {
    const rect = await list.boundingBox();
    await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);await page.mouse.wheel(0, 1600);await page.waitForTimeout(300);
  }
  const after = await list.evaluate(element => ({ scroll: element.scrollTop, maximum: element.scrollHeight - element.clientHeight }));
  assert.ok(after.scroll > before, 'a real wheel/swipe moves the building list');
  assert.ok(after.scroll >= after.maximum - 2, 'the real gesture reaches the last building');
  const last = list.locator('.tower').last(), id = await last.getAttribute('data-unit');
  if (touch) await last.tap();else await last.click();
  assert.equal(await last.getAttribute('class'), 'tower active', 'the eleventh building can be selected');
  assert.ok(Math.abs(await list.evaluate(element => element.scrollTop) - after.scroll) <= 2, 'choosing a building preserves scroll position');
  await page.locator('#cancel-build').click();
  return { rotated, selectedLast: id, ...after };
}
async function desktop() {
  const { context, page, errors } = await start('HunterReview', { width: 1280, height: 720 }, false, 'h002', 1);
  try {
    for (let i = 0; i < 7; i++) await page.locator('#zoom-out').click();
    await page.waitForTimeout(1200);
    const hero = await page.evaluate(() => window.reviewState.units.find(unit => unit.owner === window.reviewSlot && unit.type === 'h002'));
    const zoom = await page.evaluate(() => window.__originalVisualDebug().camera.zoom);
    const ground = await project(page, hero.x, hero.y + 384, .03);
    await page.mouse.click(ground.x, ground.y);await page.waitForTimeout(300);
    assert.equal(await page.locator('#build-list .tower').count(), 11);
    assert.equal(await page.locator('#context-title').textContent(), '建造建筑');
    assert.equal(await page.evaluate(() => window.__originalVisualDebug().camera.zoom), zoom);
    assert.equal(await page.locator('#rotate-unit,#rotate-build,#turn-unit').count(), 0);
    const scrolling = await scrollBuildList(context, page, false);
    await page.locator('[data-unit="h00L"]').click();
    await page.mouse.move(ground.x, ground.y);await page.waitForTimeout(200);
    const preview = await page.locator('#placement-status').textContent();
    assert.match(preview, /绿色位置可以建造/);
    await page.mouse.click(ground.x, ground.y);
    await page.waitForFunction(() => window.reviewState.units.some(unit => unit.owner === window.reviewSlot && unit.type === 'h00L'));
    await page.waitForFunction(() => document.querySelector('#placement-status').classList.contains('invalid'));
    const tower = await page.evaluate(() => window.reviewState.units.find(unit => unit.owner === window.reviewSlot && unit.type === 'h00L'));
    const towerPoint = await project(page, tower.x, tower.y, .6);
    await page.mouse.click(towerPoint.x, towerPoint.y);await page.waitForTimeout(400);
    assert.equal(await page.locator('#unit-inspector').isVisible(), true);
    assert.equal(await page.locator('#unit-move').isVisible(), false);
    await page.locator('[data-spell="A096"]').click();
    await page.waitForFunction(id => window.reviewState.units.some(unit => unit.owner === window.reviewSlot && unit.type === 'h00L' && unit.id !== id), tower.id);
    assert.equal(await page.locator('#unit-inspector').isVisible(), true, 'original turn replacement keeps the building inspector selected');
    const facing = await page.evaluate(() => window.reviewState.units.find(unit => unit.owner === window.reviewSlot && unit.type === 'h00L').facing);
    assert.ok(Math.abs(facing % 360) < 1e-6);
    const heroPoint = await project(page, hero.x, hero.y);
    await page.mouse.click(heroPoint.x, heroPoint.y);await page.locator('#center').click();await page.waitForTimeout(2200);
    const destination = await project(page, hero.x + 512, hero.y, .03);
    await page.mouse.click(destination.x, destination.y, { button: 'right' });
    const direction = await page.evaluate(() => new Promise(resolve => {
      const rows = [];
      function sample() {
        const camera = window.__originalVisualDebug().camera, delta = camera.position.map((value, i) => value - camera.focus[i]), length = Math.hypot(...delta);
        rows.push(delta.map(value => value / length));
        if (rows.length < 30) requestAnimationFrame(sample);else resolve(rows);
      }
      requestAnimationFrame(sample);
    }));
    const drift = Math.max(...direction.map(row => Math.hypot(...row.map((value, i) => value - direction[0][i]))));
    const moved = await page.evaluate(({ x, y }) => { const unit = window.reviewState.units.find(unit => unit.owner === window.reviewSlot && unit.type === 'h002');return Math.hypot(unit.x - x, unit.y - y); }, hero);
    assert.ok(moved > 10, `right-click movement: ${moved}`);
    assert.ok(drift < .002, `camera direction drift while moving: ${drift}`);
    for (let i = 0; i < 6; i++) await page.locator('#zoom-out').click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: join(tmpdir(), 'human-defense-fixed-desktop.png') });
    const debug = await page.evaluate(() => window.__originalVisualDebug()), samples = await pixels(page);
    assert.ok(new Set(samples.map(pixel => pixel.slice(0, 3).join(','))).size > 1, 'desktop canvas contains rendered terrain');
    assert.equal(debug.originalDoodads, 266);assert.deepEqual(debug.assets.failed, []);assert.deepEqual(errors, []);
    results.desktop = { scrolling, preview, facing, moved, cameraDirectionDrift: drift, pixels: samples, assets: debug.assets, errors };
  } finally { await context.close(); }
}
async function mobile() {
  const { context, page, errors } = await start('RogueReview', { width: 844, height: 390 }, true, 'h000', 2);
  try {
    const gold = await page.locator('#gold').textContent();await page.waitForTimeout(1100);
    assert.equal(await page.locator('#gold').textContent(), gold, 'idle gold stays unchanged');
    const hero = await page.evaluate(() => window.reviewState.units.find(unit => unit.owner === window.reviewSlot && unit.type === 'h000'));
    const heroPoint = await project(page, hero.x, hero.y);
    await page.touchscreen.tap(heroPoint.x, heroPoint.y);await page.waitForTimeout(400);
    await page.locator('[data-spell="A098"]').scrollIntoViewIfNeeded();await page.locator('[data-spell="A098"]').tap();await page.waitForTimeout(750);
    assert.equal(await page.locator('#gold-label').textContent(), '金币 · 败家已开');
    const activeGold = Number(await page.locator('#gold').textContent());assert.ok(activeGold < Number(gold));
    const ground = await project(page, hero.x + 512, hero.y + 128, .03);
    await page.touchscreen.tap(ground.x, ground.y);await page.waitForTimeout(350);
    assert.equal(await page.locator('#context-title').textContent(), '建造建筑');
    assert.equal(await page.locator('#build-list .tower').count(), 11);
    const scrolling = await scrollBuildList(context, page, true);
    await page.locator('#build-list').evaluate(element => { window.reviewFirstBuilding = element.firstElementChild; });
    const scrollBeforeGold = await page.locator('#build-list').evaluate(element => element.scrollTop);
    await page.waitForTimeout(1200);
    assert.equal(await page.locator('#build-list').evaluate(element => window.reviewFirstBuilding === element.firstElementChild), true, 'changing gold does not recreate the list');
    assert.equal(await page.locator('#build-list').evaluate(element => element.scrollTop), scrollBeforeGold, 'gold updates keep the list scrolled');
    const layout = await page.evaluate(() => {
      const panel = document.querySelector('#context-panel').getBoundingClientRect(), list = document.querySelector('#build-list');
      return { panel: panel.toJSON(), list: [list.clientHeight, list.scrollHeight], viewport: [innerWidth, innerHeight], document: [document.documentElement.scrollWidth, document.documentElement.scrollHeight] };
    });
    assert.ok(layout.panel.x >= 0 && layout.panel.y >= 0 && layout.panel.right <= layout.viewport[0] && layout.panel.bottom <= layout.viewport[1]);
    assert.deepEqual(layout.document, layout.viewport);assert.ok(layout.list[1] > layout.list[0]);
    await page.screenshot({ path: join(tmpdir(), 'human-defense-fixed-mobile.png') });
    const samples = await pixels(page);assert.ok(new Set(samples.map(pixel => pixel.slice(0, 3).join(','))).size > 1, 'mobile canvas contains rendered terrain');
    assert.deepEqual(errors, []);results.mobile = { scrolling, gold, activeGold, layout, pixels: samples, errors };
  } finally { await context.close(); }
}
async function portrait() {
  const { context, page, errors } = await start('PortraitReview', { width: 390, height: 844 }, true, 'h002', 1);
  try {
    const point = await page.locator('#battle').evaluate(element => {
      const rect = element.getBoundingClientRect();return { x: rect.left + rect.width * .65, y: rect.top + rect.height * .65 };
    });
    await page.touchscreen.tap(point.x, point.y);await page.waitForTimeout(350);
    assert.equal(await page.locator('#context-title').textContent(), '建造建筑');
    const scrolling = await scrollBuildList(context, page, true);
    await page.screenshot({ path: join(tmpdir(), 'human-defense-fixed-portrait.png') });
    assert.deepEqual(errors, []);results.portrait = { scrolling, errors };
  } finally { await context.close(); }
}
async function terrain() {
  const page = await browser.newPage();
  try {
    await page.goto(process.env.GAME_URL || 'http://localhost:8081');
    const result = await page.evaluate(async () => {
      const { createTerrainAtlas, terrainCellLayers, terrainTileSource } = await import('/terrain-textures.js');
      const [data, visuals, manifest] = await Promise.all(['/map/terrain.json', '/map/visuals.json', '/warcraft/manifest.json'].map(url => fetch(url).then(response => response.json())));
      const used = new Set(data.textures), images = await Promise.all(data.tiles.map((id, index) => {
        if (!used.has(index)) return null;
        const row = visuals.terrainTileData[id], key = `${row.dir}/${row.file}.blp`.replaceAll('\\', '/').toLowerCase();
        return new Promise((resolve, reject) => {
          const image = new Image();image.onload = () => resolve(image);image.onerror = reject;image.src = manifest.resources[key].url;
        });
      }));
      const atlas = createTerrainAtlas(data, images), context = atlas.canvas.getContext('2d');
      const sources = images.map(image => {
        if (!image) return null;
        const canvas = document.createElement('canvas');canvas.width = image.width;canvas.height = image.height;
        const context = canvas.getContext('2d');context.drawImage(image, 0, 0);return context;
      });
      const checked = { low: 0, high: 0 }, mismatches = [];
      for (let y = 0; y < data.height - 1; y++) for (let x = 0; x < data.width - 1; x++) {
        const indices = [y * data.width + x, y * data.width + x + 1, (y + 1) * data.width + x, (y + 1) * data.width + x + 1], heights = indices.map(index => data.heights[index]);
        if (Math.min(...heights) !== -128 || Math.max(...heights) !== 0) continue;
        for (const height of [-128, 0]) {
          const layers = terrainCellLayers(data, x, y, height);if (layers.length !== 1) continue;
          const layer = layers[0], rect = terrainTileSource(images[layer.texture].width, layer.variation, layer.mask), uv = atlas.uvForCell(x, y, height);
          const px = Math.round((uv[0][0] + uv[1][0]) / 2 * atlas.canvas.width), py = Math.round((1 - (uv[0][1] + uv[2][1]) / 2) * atlas.canvas.height);
          const actual = [...context.getImageData(px, py, 1, 1).data], expected = [...sources[layer.texture].getImageData(rect.x + 32, rect.y + 32, 1, 1).data];
          if (actual.join(',') !== expected.join(',')) mismatches.push({ x, y, height, actual, expected });
          checked[height < 0 ? 'low' : 'high']++;
        }
      }
      return { entries: atlas.entries, checked, mismatches };
    });
    assert.ok(result.checked.low > 1000 && result.checked.high > 1000);
    assert.deepEqual(result.mismatches, [], 'ravine surfaces sample their own original opaque ground variant');
    results.terrain = result;
  } finally { await page.close(); }
}
try {
  const cases = { desktop, mobile, portrait, terrain };
  for (const name of process.argv.length > 2 ? process.argv.slice(2) : Object.keys(cases)) await cases[name]();
  await writeFile(join(tmpdir(), 'human-defense-issue-review.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results));
} finally { await browser.close(); }
