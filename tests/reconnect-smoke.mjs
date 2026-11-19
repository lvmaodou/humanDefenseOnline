import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdir } from 'node:fs/promises';
import WebSocket from 'ws';
import { chromium } from 'playwright';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const url = `http://localhost:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const errors = [], peers = [];
async function waitFor(predicate) {
  const deadline = Date.now() + 10000;
  while (!predicate()) { if (Date.now() > deadline) throw new Error('Server condition timed out');await new Promise(resolve => setTimeout(resolve, 25)); }
}
async function choose(page) {
  for (let step = 0; step < 10; step++) {
    if (await page.evaluate(() => window.reviewState?.units.some(unit => unit.owner === window.reviewJoined?.slot && unit.type === 'h002'))) return;
    await page.waitForTimeout(500);
    if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
      const title = await page.locator('#dialog-title').textContent();
      await page.locator('#dialog-options button').nth(title.includes('职业') ? 1 : 0).evaluate(button => button.click());
    }
  }
  await page.waitForFunction(() => window.reviewState?.units.some(unit => unit.owner === window.reviewJoined?.slot && unit.type === 'h002'));
}

try {
  for (const mobile of [false, true]) {
    const roomId = mobile ? 'REPHONE' : 'REDESK';
    const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 720 }, isMobile: mobile, hasTouch: mobile });
    await context.addInitScript(() => {
      const Original = WebSocket;
      window.WebSocket = class extends Original {
        constructor(...args) {
          super(...args);this.addEventListener('message', event => {
            const message = JSON.parse(event.data);
            if (message.type === 'joined') { window.reviewJoined = message;window.reviewJoinCount = (window.reviewJoinCount || 0) + 1; }
            if (message.type === 'state') window.reviewState = message.state;
          });
        }
        send(raw) {
          const message = JSON.parse(raw);
          if (message.type === 'action') (window.reviewActions ||= []).push(message.action);
          return super.send(raw);
        }
      };
    });
    let page = await context.newPage();page.setDefaultTimeout(20000);page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);await page.locator('#nickname').fill('重连守卫');await page.locator('#room-code').fill(roomId);await page.locator('.join-button').click();
    await page.waitForFunction(() => window.reviewJoined);
    const peer = new WebSocket(url.replace('http:', 'ws:'));peers.push(peer);await once(peer, 'open');
    const peerJoined = new Promise(resolve => peer.on('message', raw => { if (JSON.parse(raw).type === 'joined') resolve(); }));
    peer.send(JSON.stringify({ type: 'join', room: roomId, name: '在线队友' }));await peerJoined;
    await choose(page);
    await page.waitForFunction(() => window.__originalVisualDebug?.().terrainTexture && window.__originalVisualDebug().assets.loadedModels > 20);
    const room = rooms.get(roomId), game = room.game, player = game.players[0], member = [...room.players.values()].find(player => player.slot === 0);
    game.tasks = [];game.timers = [];game.globals.udg_waves = 3;player.gold = 8765;player.lumber = 42;
    const worker = [...game.units.values()].find(unit => unit.owner.id === 0 && unit.raw === 'h002');
    const item = game.createItem('I00B', worker);game.pickup(worker, item);
    const tower = game.createUnit(player, game.fourCC('h05G'), -3008, 2816);
    await page.waitForFunction(id => window.reviewState.units.some(unit => unit.items.some(item => item.id === id)), item.hid);
    const identity = await page.evaluate(() => ({ id: window.reviewJoined.id, slot: window.reviewJoined.slot, doodads: window.__originalVisualDebug().originalDoodads, actions: window.reviewActions.length }));

    await context.setOffline(true);member.ws.terminate();
    await waitFor(() => player.connected === false);
    await page.waitForFunction(() => document.querySelector('#link-text').textContent === '正在重连…');
    assert.equal(await page.locator('#network-status').isVisible(), true);assert.equal(await page.locator('#reconnect').isVisible(), true);
    assert.equal(player.active, true);assert.equal(room.game, game);assert.notEqual(room.timer, null);
    await context.setOffline(false);
    await page.waitForFunction(() => window.reviewJoinCount >= 2 && document.querySelector('#link-text').textContent === '联机正常');
    assert.equal(await page.evaluate(() => window.reviewJoined.id), identity.id);
    assert.equal(await page.evaluate(() => window.reviewJoined.resumed), true);
    assert.equal(await page.evaluate(() => window.__originalVisualDebug().originalDoodads), identity.doodads);
    assert.equal(await page.evaluate(() => window.reviewActions.length), identity.actions, 'no action is replayed');
    assert.deepEqual([player.gold, player.lumber, item.carrier, game.units.get(tower.hid)], [8765, 42, worker, tower]);
    console.log(`PASS: ${mobile ? 'portrait' : 'desktop'} reconnects after a network outage; identity, assets and equipment survive`);

    await page.reload();
    await page.waitForFunction(() => window.reviewJoined?.resumed && window.reviewState?.wave === 3 && document.querySelector('#lobby').classList.contains('hidden'));
    assert.equal(await page.evaluate(() => window.reviewJoined.id), identity.id);
    await page.waitForFunction(id => window.reviewState.units.some(unit => unit.id === id && unit.items.length === 1), worker.hid);
    await page.locator('#select-worker').evaluate(button => button.click());
    await page.locator('#player-controls').waitFor();
    assert.equal(await page.locator(`[data-held-item="${item.hid}"]`).count(), 1);
    console.log(`PASS: ${mobile ? 'portrait' : 'desktop'} refresh resumes the existing farmer and inventory without reselecting a profession`);

    await page.close();peer.close();await waitFor(() => room.timer === null);
    const pausedTime = game.time;await new Promise(resolve => setTimeout(resolve, 150));assert.equal(game.time, pausedTime);
    page = await context.newPage();page.setDefaultTimeout(20000);page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);await page.waitForFunction(() => window.reviewJoined?.resumed && window.reviewState?.wave === 3);
    assert.equal(await page.evaluate(() => window.reviewJoined.id), identity.id);assert.equal(room.game, game);assert.notEqual(room.timer, null);
    assert.deepEqual([player.gold, player.lumber, item.carrier], [8765, 42, worker]);
    console.log(`PASS: ${mobile ? 'portrait' : 'desktop'} closing every page pauses the match; reopening restores it`);

    // Another page may take over, but both pages must not repeatedly evict each other.
    const other = await context.newPage();other.setDefaultTimeout(20000);other.on('pageerror', error => errors.push(error.message));
    await other.goto(url);await other.waitForFunction(() => window.reviewJoined?.resumed);
    await page.waitForFunction(() => document.querySelector('#link-text').textContent === '其他页面已连接');
    await page.locator('#reconnect').evaluate(button => button.click());
    await page.waitForFunction(() => window.reviewJoinCount >= 2 && document.querySelector('#link-text').textContent === '联机正常');
    await other.waitForFunction(() => document.querySelector('#link-text').textContent === '其他页面已连接');
    assert.equal(room.players.size, 2);assert.equal(player.connected, true);
    console.log(`PASS: ${mobile ? 'portrait' : 'desktop'} session takeover stops old-page automatic retries and supports manual return`);
    if (!mobile) {
      await mkdir(new URL('../artifacts/', import.meta.url), { recursive: true });
      await page.screenshot({ path: new URL('../artifacts/reconnect-verified.png', import.meta.url).pathname.replace(/^\/([A-Z]:)/i, '$1') });
    }
    await context.close();
  }
  assert.deepEqual(errors, []);console.log('PASS: no browser runtime errors');
} finally {
  await browser.close();for (const peer of peers) peer.terminate();
  for (const room of rooms.values()) clearInterval(room.timer);
  await new Promise(resolve => server.close(resolve));
}
