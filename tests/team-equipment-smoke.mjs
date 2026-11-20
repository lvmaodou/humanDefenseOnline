import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const url = `http://localhost:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const errors = [];
async function client(name, mobile = false) {
  const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 720 }, isMobile: mobile, hasTouch: mobile });
  const page = await context.newPage();page.setDefaultTimeout(20000);page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const Original = WebSocket;
    window.WebSocket = class extends Original {
      constructor(...args) {
        super(...args);this.addEventListener('message', event => {
          const message = JSON.parse(event.data);
          if (message.type === 'state') window.reviewState = message.state;
          if (message.type === 'joined') window.reviewSlot = message.slot;
        });
      }
    };
  });
  await page.goto(url);await page.locator('#nickname').fill(name);await page.locator('#room-code').fill('TEAMTEST');await page.locator('.join-button').click();
  await page.waitForFunction(() => Number.isInteger(window.reviewSlot));return { context, page };
}
async function choose(page, index, type) {
  for (let step = 0; step < 9; step++) {
    if (await page.evaluate(type => window.reviewState?.units.some(unit => unit.owner === window.reviewSlot && unit.type === type), type)) return;
    await page.waitForTimeout(600);
    if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
      const title = await page.locator('#dialog-title').textContent();
      await page.locator('#dialog-options button').nth(title.includes('职业') ? index : 0).evaluate(button => button.click());
    }
  }
  await page.waitForFunction(type => window.reviewState?.units.some(unit => unit.owner === window.reviewSlot && unit.type === type), type);
}
async function project(page, x, y, lift = .03) {
  return page.evaluate(async ({ x, y, lift }) => {
    const T = await import('/vendor/three.module.js'), C = await import('/coordinates.js'), view = window.__originalVisualDebug().camera;
    const canvas = document.querySelector('#battle'), rect = canvas.getBoundingClientRect(), camera = new T.PerspectiveCamera(C.cameraVerticalFov(), canvas.width / canvas.height, .1, view.far);
    camera.position.fromArray(view.position);camera.lookAt(new T.Vector3().fromArray(view.focus));camera.updateMatrixWorld(true);
    const [wx, wz] = C.sourceToWorld(x, y), point = new T.Vector3(wx, lift, wz).project(camera);
    return getComputedStyle(document.querySelector('#app')).transform === 'none' ? { x: rect.left + (point.x + 1) / 2 * rect.width, y: rect.top + (1 - point.y) / 2 * rect.height } : { x: rect.left + (point.y + 1) / 2 * rect.width, y: rect.top + (point.x + 1) / 2 * rect.height };
  }, { x, y, lift });
}
async function selectWorker(page) {
  const worker = await page.evaluate(() => window.reviewState.units.find(unit => unit.owner === window.reviewSlot && ['h001', 'h002', 'h000', 'h004', 'h003', 'h06C'].includes(unit.type)));
  if(await page.evaluate(()=>matchMedia('(pointer:coarse)').matches))await page.locator('#select-worker').tap();else await page.locator('#select-worker').click();
  await page.locator('#player-controls').waitFor();return worker;
}
async function openDetails(page, id) { await page.locator(id).evaluate(element => { element.open = true; }); }
async function gift(page, target, gold, lumber) {
  await openDetails(page, '#resource-sharing');await page.locator('#gift-player').selectOption(String(target));
  await page.locator('#gift-gold').fill(String(gold));await page.locator('#gift-lumber').fill(String(lumber));await page.locator('#gift-submit').click();
  await page.waitForFunction(() => document.querySelector('#gift-status').textContent === '赠送成功');
}

try {
  const host = await client('资源甲'), guest = await client('资源乙', true);
  await choose(host.page, 1, 'h002');await choose(guest.page, 3, 'h004');
  await Promise.all([host.page, guest.page].map(page => page.waitForFunction(() => window.__originalVisualDebug?.().terrainTexture && window.__originalVisualDebug().assets.loadedModels > 20)));
  const game = rooms.get('TEAMTEST').game;
  game.players[0].gold = 10000;game.players[0].lumber = 50;game.players[1].gold = 1000;game.players[1].lumber = 20;
  await host.page.waitForFunction(() => window.reviewState.players[0].gold === 10000);
  await selectWorker(host.page);await selectWorker(guest.page);
  await gift(host.page, 1, 125, 3);
  await guest.page.waitForFunction(() => window.reviewState.players[1].gold === 1125 && window.reviewState.players[1].lumber === 23);
  await gift(guest.page, 0, 0, 2);
  await host.page.waitForFunction(() => window.reviewState.players[0].gold === 9875 && window.reviewState.players[0].lumber === 49);
  console.log('PASS: desktop and portrait teammates receive the exact gold/lumber gift');

  const worker = [...game.units.values()].find(unit => unit.owner.id === 0 && unit.raw === 'h002'), set = game.equipment[1];
  const items = set.pieces.map((piece, index) => game.createItem(piece.item, { x: worker.x + 256, y: worker.y + 128 + index * 128 }));
  await host.page.waitForFunction(() => window.reviewState.items.length >= 3);await openDetails(host.page, '#ground-equipment');
  await host.page.waitForFunction(ids => window.__itemVisualDebug?.().filter(item => ids.includes(item.id) && item.loaded).length === ids.length, items.map(item => item.hid));
  assert.equal(await host.page.evaluate(() => window.__itemVisualDebug().every(item => item.path === 'objects/inventoryitems/treasurechest/treasurechest.mdx')), true);
  await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true });
  const dropPoint = await project(host.page, items[0].x, items[0].y, .25);
  const dropName = await host.page.locator(`[data-pickup="${items[0].hid}"]`).evaluate(button => button.parentElement.querySelector('span').textContent);
  const itemLabel=host.page.locator(`[data-ground-item-label="${items[0].hid}"]`);
  await host.page.waitForFunction(({id,name}) => { const label = document.querySelector(`[data-ground-item-label="${id}"]`);return label && !label.hidden && label.textContent === name; }, {id:items[0].hid,name:dropName});
  const label=await itemLabel.evaluate(element => ({ text: element.textContent, bounds: element.getBoundingClientRect().toJSON() }));
  assert.equal(label.text, dropName);assert.ok(label.bounds.left >= 0 && label.bounds.top >= 0 && label.bounds.right <= 1280 && label.bounds.bottom <= 720);
  await host.page.screenshot({ path: fileURLToPath(new URL('../artifacts/source-item-drops.png', import.meta.url)) });
  await host.page.mouse.move(20, 20);
  await host.page.waitForFunction(({id,name}) => { const element = document.querySelector(`[data-ground-item-label="${id}"]`);return element && !element.hidden && element.textContent === name; }, {id:items[0].hid,name:dropName});
  await host.page.mouse.click(dropPoint.x, dropPoint.y);
  await host.page.waitForFunction(id => window.reviewState.units.some(unit => unit.owner === window.reviewSlot && unit.items.some(item => item.id === id)), items[0].hid);
  await host.page.waitForFunction(id => !document.querySelector(`[data-ground-item-label="${id}"]`), items[0].hid);
  assert.equal(await host.page.evaluate(id => window.__itemVisualDebug().some(item => item.id === id), items[0].hid), false);
  for (const item of items.slice(1)) await host.page.locator(`[data-pickup="${item.hid}"]`).click();
  await host.page.waitForFunction(() => document.querySelectorAll('[data-held-item]').length === 3);
  assert.equal(await host.page.locator('#unit-items').isVisible(), true, 'desktop has a visible six-slot inventory');
  await host.page.locator(`[data-drop-item="${items[0].hid}"]`).click();
  await host.page.waitForFunction(id => window.__itemVisualDebug().some(item => item.id === id && item.loaded), items[0].hid);
  await guest.page.waitForFunction(id => window.reviewState.items.some(item => item.id === id), items[0].hid);await openDetails(guest.page, '#ground-equipment');
  await guest.page.locator(`[data-pickup="${items[0].hid}"]`).click();await guest.page.locator(`[data-drop-item="${items[0].hid}"]`).click();
  await host.page.locator(`[data-pickup="${items[0].hid}"]`).click();
  assert.equal(items[0].carrier, worker);assert.equal(items[0].charges, 1);
  console.log('PASS: source chest models render, accept a ground click, disappear on pickup, return on drop and pass between teammates without duplication');

  for (let step = 0; step < 4; step++) await host.page.locator('#zoom-out').click();await host.page.waitForTimeout(1000);
  const sites = [[-3008, 2816], [-2752, 2816], [-2880, 3072]];
  for (const [index, item] of items.entries()) {
    await selectWorker(host.page);await host.page.locator(`[data-item="${item.hid}"]`).click();
    await host.page.waitForFunction(() => !document.querySelector('#placement-controls').hidden);
    const point = await project(host.page, ...sites[index]);await host.page.mouse.move(point.x, point.y);
    await host.page.waitForFunction(() => document.querySelector('#placement-status').textContent === '绿色位置可以建造');await host.page.mouse.click(point.x, point.y);
    await host.page.waitForFunction(type => window.reviewState.units.some(unit => unit.owner === window.reviewSlot && unit.type === type), set.pieces[index].base);
    const tower = [...game.units.values()].find(unit => unit.owner.id === 0 && unit.raw === set.pieces[index].base);
    assert.equal(tower.expires, undefined);game.tick(5.1);
    await host.page.waitForFunction(id => window.reviewState.units.some(unit => unit.id === id && unit.construct === 0), tower.hid);
    // The worker can stand in front of this tiny floating model. Click the
    // exposed part of its occupied footprint to open the building itself.
    const towerPoint = await project(host.page, tower.x + 56, tower.y + 56);await host.page.mouse.click(towerPoint.x, towerPoint.y);
    await host.page.waitForTimeout(100);
    assert.equal(await host.page.locator('#unit-upgrade').isVisible(),true,'the placed item tower opens its upgrade panel');
    await host.page.locator('#unit-upgrade').click();await host.page.waitForFunction(id => window.reviewState.units.some(unit => unit.id === id && unit.upgrade), tower.hid);
  }
  game.tick(10.1);game.tick(.05);
  await host.page.waitForFunction(() => window.reviewState.players[0].sets.find(set => set.id === 'LR').active);
  await host.page.waitForFunction(() => window.__originalVisualDebug().effects.setLinks === 3);
  await host.page.waitForTimeout(600);assert.equal(await host.page.evaluate(() => window.__originalVisualDebug().effects.setLinks), 3);
  await host.page.locator('[data-passive="A0BI"]').waitFor();
  await selectWorker(host.page);await openDetails(host.page, '#equipment-progress');await host.page.locator('[data-set="LR"]').scrollIntoViewIfNeeded();
  assert.match(await host.page.locator('[data-set="LR"]').textContent(), /已激活/);
  await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true });
  await host.page.screenshot({ path: fileURLToPath(new URL('../artifacts/profession-set-verified.png', import.meta.url)) });
  assert.deepEqual(game.errors, []);assert.deepEqual(errors, []);
  console.log('PASS: three real item placements, source upgrades, profession ability, persistent links and farmer progress');
  console.log(JSON.stringify({ gifts: true, equipmentSharing: true, completeHunterSet: true, browserErrors: errors }));
} finally {
  await browser.close();for (const room of rooms.values()) clearInterval(room.timer);await new Promise(resolve => server.close(resolve));
}
