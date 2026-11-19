import assert from 'node:assert/strict';
import { once } from 'node:events';
import { chromium } from 'playwright';
import { compactNetworkState } from '../engine/network-state.js';

process.env.PORT = '0';
const { server, rooms } = await import('../server.js');
await once(server, 'listening');
const browser = await chromium.launch({
  headless: true,
  ...(process.platform === 'win32' ? { executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' } : {})
});
async function frameMetrics(page) {
  return page.evaluate(() => {
    const frames = window.__frameTimes.slice(-120);
    const deltas = frames.slice(1).map((time, index) => time - frames[index]).sort((a, b) => a - b);
    const average = deltas.reduce((sum, value) => sum + value, 0) / Math.max(1, deltas.length);
    const recentStates = window.__stateTimes.filter(time => performance.now() - time < 1100);
    const visual = window.__originalVisualDebug();
    return {
      fps: Math.round(1000 / average),
      p95FrameMs: Math.round(deltas[Math.floor(deltas.length * .95)] || 0),
      statePacketsPerSecond: recentStates.length,
      stateBytes: window.__stateBytes,
      lod: visual.modelLod,
      batchedUnits: window.__lowDetailInstanceCount(),
      renderedCalls: visual.renderer.calls,
      loadedModels: visual.assets.loadedModels
    };
  });
}

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    window.__frameTimes = [];
    window.__stateTimes = [];
    const requestFrame = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = callback => requestFrame(time => {
      window.__frameTimes.push(time);
      if (window.__frameTimes.length > 240) window.__frameTimes.shift();
      callback(time);
    });
    const NativeWebSocket = window.WebSocket;
    window.WebSocket = class extends NativeWebSocket {
      constructor(...args) {
        super(...args);
        this.addEventListener('message', event => {
          const message = JSON.parse(event.data);
          if (message.type === 'state') {
            window.reviewState = message.state;
            window.__stateTimes.push(performance.now());
            window.__stateBytes = event.data.length;
          }
        });
      }
    };
  });

  await page.goto(`http://localhost:${server.address().port}`);
  await page.locator('#nickname').fill('Perf');
  await page.locator('#room-code').fill('PERF');
  await page.locator('.join-button').click();
  await page.locator('.connection.on').waitFor();
  for (let i = 0; i < 6; i++) {
    await page.waitForTimeout(1000);
    if (await page.locator('#dialog').evaluate(element => element.classList.contains('hidden'))) break;
    await page.locator('#dialog-options button').first().evaluate(button => button.click());
  }
  await page.waitForFunction(() => window.reviewState?.units.some(unit => unit.owner === 0));
  await page.waitForFunction(() => window.__originalVisualDebug?.().terrainTexture && window.__originalVisualDebug().assets.loadedModels > 20);
  await page.waitForTimeout(1000);
  const baseline = await frameMetrics(page);

  const game = rooms.get('PERF').game;
  const worker = [...game.units.values()].find(unit => unit.owner.id === 0 && ['h001', 'h002', 'h000', 'h004', 'h003', 'h06C'].includes(unit.raw));
  const enemyOwner = game.players.find(player => player.id === 8);
  assert.ok(worker && enemyOwner);
  for (let i = 0; i < 500; i++) {
    const x = (i % 32 - 16) * 512;
    const y = (Math.floor(i / 32) - 8) * 512;
    game.createUnit(enemyOwner, game.fourCC('nanc'), worker.x + x, worker.y + y);
  }

  await page.waitForFunction(() => window.reviewState?.units.filter(unit => unit.owner === 8).length >= 500);
  await page.waitForTimeout(2500);
  const fullSnapshot = game.snapshot();
  const compactSnapshot = compactNetworkState(structuredClone(fullSnapshot));
  const rawBytes = Buffer.byteLength(JSON.stringify(fullSnapshot));
  const compactBytes = Buffer.byteLength(JSON.stringify(compactSnapshot));
  const report = await frameMetrics(page);
  console.log(JSON.stringify({ units: game.units.size, baseline, rawBytes, compactBytes, ...report }));
  assert.ok(report.statePacketsPerSecond >= 6, 'live simulation updates keep reaching the browser');
  assert.ok(compactBytes < rawBytes, 'enemy snapshot compaction reduces wire data');
  assert.ok(report.lod.simplified > 0, 'visible distant enemy units use the lightweight model');
  assert.ok(report.batchedUnits > 0, 'visible lightweight units are submitted in a shared draw batch');
  assert.equal(errors.length, 0, errors.join('\n'));
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
