import assert from 'node:assert/strict';
import { once } from 'node:events';
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import WebSocket from 'ws';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
if (!server.listening) await once(server, 'listening');
const url = `http://localhost:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {}) });
const peers = [], errors = [], results = [];
async function join(page, room) {
  await page.locator('#nickname').fill('Exit Test');await page.locator('#room-code').fill(room);await page.locator('.join-button').first().click();
  await page.waitForFunction(() => document.querySelector('#lobby').classList.contains('hidden') && window.reviewState);
}
async function choose(page) {
  for (let attempt = 0; attempt < 16; attempt++) {
    if (await page.evaluate(() => window.reviewState?.units.some(unit => unit.owner === 0 && unit.type === 'h002'))) return;
    await page.waitForTimeout(300);
    if (!await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) {
      const title = await page.locator('#dialog-title').textContent();await page.locator('#dialog-options button').nth(title.includes('职业') ? 1 : 0).click();
    }
  }
  throw new Error('Profession selection did not complete');
}
async function lobby(page) {
  await page.locator('#lobby').waitFor();assert.equal(await page.locator('#room-code').inputValue(), '');
  assert.equal(await page.evaluate(() => localStorage.getItem('human-defense.session.v1')), null);
}
try {
  for (const mobile of [false, true]) {
    const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1366, height: 820 }, isMobile: mobile, hasTouch: mobile });
    await context.addInitScript(() => {
      const Original = WebSocket;
      window.WebSocket = class extends Original {
        constructor(...args) {
          super(...args);this.addEventListener('message', event => { const message = JSON.parse(event.data);if (message.type === 'state') window.reviewState = message.state;if (message.type === 'joined') window.reviewJoined = message; });
        }
      };
    });
    const page = await context.newPage();page.setDefaultTimeout(15000);page.on('pageerror', error => errors.push(error.message));
    const roomId = mobile ? 'ENDPHONE' : 'ENDPC';
    await page.goto(url);await join(page, roomId);await choose(page);
    const old = rooms.get(roomId), identity = await page.evaluate(() => window.reviewJoined.id);
    old.game.tasks = [];old.game.timers = [];old.game.globals.udg_waves = 11;old.game.status = 'defeat';
    await page.locator('#battle-result').waitFor();assert.equal(await page.locator('#result-title').textContent(), '基地失守');
    assert.equal(await page.evaluate(() => localStorage.getItem('human-defense.session.v1')), null);
    await page.screenshot({ path: mobile ? 'artifacts/match-exit-mobile.png' : 'artifacts/match-exit-desktop.png' });
    const tap = async locator => mobile ? locator.tap() : locator.click();
    await tap(page.locator('#result-review'));await page.waitForTimeout(200);
    assert.equal(await page.locator('#battle-result').isVisible(), false);
    await tap(page.locator('#leave-room'));await lobby(page);
    assert.equal(await page.evaluate(() => window.__originalVisualDebug().units.length), 0);
    await page.reload();await lobby(page);await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.reviewJoined), undefined);

    await join(page, roomId);assert.notEqual(await page.evaluate(() => window.reviewJoined.id), identity);
    assert.notEqual(rooms.get(roomId), old);
    const second = rooms.get(roomId);second.game.tasks = [];second.game.timers = [];second.game.status = 'victory';
    await page.locator('#battle-result').waitFor();assert.equal(await page.locator('#result-title').textContent(), '守卫成功');
    await tap(page.locator('#result-home'));await lobby(page);

    // Simulate an old browser that closed before seeing the match end. A
    // connected owner keeps that finished room alive while its token is tried.
    const peer = new WebSocket(url.replace('http:', 'ws:'));peers.push(peer);await once(peer, 'open');
    const joined = new Promise(resolve => peer.on('message', raw => { const message = JSON.parse(raw);if (message.type === 'joined') resolve(message); }));
    peer.send(JSON.stringify({ type: 'join', name: 'Saved player', room: roomId }));
    const saved = await joined;rooms.get(roomId).game.status = 'defeat';
    await page.evaluate(saved => localStorage.setItem('human-defense.session.v1', JSON.stringify({ name: saved.name, room: saved.room, resumeToken: saved.resumeToken })), saved);
    await page.reload();await page.waitForFunction(() => document.querySelector('#session-status').textContent.includes('已结束'));
    await lobby(page);assert.equal(await page.evaluate(() => window.reviewJoined), undefined);
    peer.terminate();

    // An explicit exit during a live game must also stop automatic resumption.
    await join(page, '');
    await choose(page);
    await page.locator('.brand').click();await lobby(page);await page.reload();await lobby(page);
    assert.equal(await page.evaluate(() => window.reviewJoined), undefined);
    await join(page, '');await page.locator('#settings-home').click();await lobby(page);
    await page.routeWebSocket('**/*', () => {});
    await page.evaluate(() => localStorage.setItem('human-defense.session.v1', JSON.stringify({ name: 'Pending', room: 'CANCEL', resumeToken: 'c'.repeat(64) })));
    await page.reload();await page.locator('#cancel-reconnect').waitFor();
    await tap(page.locator('#cancel-reconnect'));await lobby(page);await page.reload();await lobby(page);
    assert.equal(await page.evaluate(() => window.reviewJoined), undefined);
    results.push({ device: mobile ? 'portrait' : 'desktop', defeatExit: true, victoryExit: true, freshMatch: true, staleSession: true, explicitExit: true, cancelReconnect: true });
    await context.close();
  }
  assert.deepEqual(errors, []);await writeFile('artifacts/match-exit.json', JSON.stringify({ results, errors }, null, 2));
  console.log(JSON.stringify({ results, errors }));
} finally {
  await browser.close();for (const peer of peers) peer.terminate();for (const room of rooms.values()) clearInterval(room.timer);await new Promise(resolve => server.close(resolve));
}
