import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', args: ['--use-gl=swiftshader', '--enable-webgl'] });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } }), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://localhost:8080'); await page.locator('#nickname').fill('地形验证'); await page.locator('#room-code').fill('TERRAIN'); await page.locator('#join-form .join-button').click(); await page.locator('.connection.on').waitFor();
  for (let i = 0; i < 3; i++) { await page.locator('#dialog-options button').first().waitFor(); await page.locator('#dialog-options button').first().click(); await page.waitForTimeout(600); }
  await page.waitForTimeout(500); await page.screenshot({ path: 'artifacts/terrain-aligned.png' }); console.log(JSON.stringify({ errors })); if (errors.length) process.exitCode = 1;
} finally { await browser.close(); }
