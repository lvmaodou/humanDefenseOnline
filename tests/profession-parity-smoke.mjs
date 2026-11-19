import assert from 'node:assert/strict';
import { once } from 'node:events';
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { professionRoster } from '../tools/audit_professions.mjs';

process.env.PORT='0';
const {server,rooms,sessions}=await import('../server.js');
if(!server.listening)await once(server,'listening');
const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
const data=await read('../content/original-3.0/data.json'),functions=await read('../content/original-3.0/functions.json');
const roster=professionRoster(data,functions),errors=[],report=[];
const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
const learned=['A04B','A04A','A08Q','A062','A07D','A0EE'];
const learnedTypes=['h01G','h00F','h046','h02C','h03C','h06D'];
async function project(page,x,y){
  return page.evaluate(async({x,y})=>{
    const T=await import('/vendor/three.module.js'),c=await import('/coordinates.js'),view=window.__originalVisualDebug().camera,canvas=document.querySelector('#battle'),rect=canvas.getBoundingClientRect();
    const camera=new T.PerspectiveCamera(c.cameraVerticalFov(),canvas.width/canvas.height,.1,view.far);camera.position.fromArray(view.position);camera.lookAt(new T.Vector3().fromArray(view.focus));camera.updateMatrixWorld(true);
    const [wx,wz]=c.sourceToWorld(x,y),point=new T.Vector3(wx,.2,wz).project(camera);
    if(getComputedStyle(document.querySelector('#app')).transform!=='none')return{x:rect.left+(point.y+1)/2*rect.width,y:rect.top+(point.x+1)/2*rect.height};
    return{x:rect.left+(point.x+1)/2*rect.width,y:rect.top+(1-point.y)/2*rect.height};
  },{x,y});
}
try{
  const page=await browser.newPage({viewport:{width:1280,height:800}});page.setDefaultTimeout(25000);
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{
    const Socket=WebSocket;window.WebSocket=class extends Socket{
      constructor(...args){super(...args);this.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.type==='state')window.reviewState=m.state;if(m.type==='map')window.reviewMeta=m.meta;});}
    };
  });
  await page.goto(`http://localhost:${server.address().port}`);
  await page.locator('#nickname').fill('Profession Audit');await page.locator('#room-code').fill('CLASSES');await page.locator('.join-button').click();
  for(let attempt=0;attempt<20;attempt++){
    if(await page.evaluate(()=>window.reviewState?.units.some(unit=>unit.owner===0&&unit.type==='h001')))break;
    await page.waitForTimeout(300);
    if(!await page.locator('#dialog').evaluate(element=>element.classList.contains('hidden')))await page.locator('#dialog-options button').first().click();
  }
  await page.waitForFunction(()=>window.__originalVisualDebug?.().terrainTexture&&window.reviewState?.units.some(unit=>unit.owner===0&&unit.type==='h001'));
  const room=rooms.get('CLASSES'),game=room.game,worker=[...game.units.values()].find(unit=>unit.owner.id===0&&unit.raw==='h001');
  game.tasks=[];game.timers=[];game.tick=()=>{};game.players[0].gold=1000000;game.players[0].lumber=10000;game.players[0].cap=1000;
  for(const unit of [...game.units.values()])if(unit!==worker)game.removeUnit(unit);
  await page.waitForTimeout(1000);
  for(const[index,row]of roster.entries()){
    for(const unit of [...game.units.values()])if(unit!==worker)game.removeUnit(unit);
    game.globals.udg_playerzz[0]=index+1;
    const units=row.buildings.map((id,i)=>{const unit=game.createUnit(game.players[0],game.fourCC(id),worker.x+(i%8-4)*128,worker.y+512+Math.floor(i/8)*128);unit.cooldown=1000;return unit;});
    const upgradeUnit=units.find(unit=>data.units[unit.raw].Upgrade);game.moveUnit(upgradeUnit,worker.x+256,worker.y+128);
    // All forty forms are displayed together for rendering coverage; only
    // the selected probe participates in the normal population budget.
    game.players[0].food=upgradeUnit.food;
    for(const required of String(data.units[data.units[upgradeUnit.raw].Upgrade].Requires||'').split(',').filter(Boolean))game.players[0].tech[required]=1;
    sessions.publish(room);
    await page.waitForFunction(ids=>ids.every(id=>window.__originalVisualDebug().units.some(unit=>unit.id===id&&unit.model==='original-mdx'&&unit.available)),units.map(unit=>unit.hid));
    let point=await project(page,upgradeUnit.x,upgradeUnit.y);await page.mouse.click(point.x,point.y);
    await page.locator('#unit-upgrade').waitFor({state:'visible'});assert.match(await page.locator('#unit-upgrade').textContent(),/升级为/);
    await page.locator('#unit-upgrade').click();await page.waitForFunction(id=>window.reviewState.units.find(unit=>unit.id===id)?.upgrade,upgradeUnit.hid);
    const veteran=game.createUnit(game.players[0],game.fourCC(learnedTypes[index]),worker.x-256,worker.y+128);game.natives.UnitAddAbility(veteran,game.fourCC(learned[index]));sessions.publish(room);
    await page.waitForFunction(id=>window.reviewState.units.some(unit=>unit.id===id),veteran.hid);
    point=await project(page,veteran.x,veteran.y);await page.mouse.click(point.x,point.y);
    await page.locator(`[data-spell="${learned[index]}"]`).waitFor({state:'visible'});
    if(index===4){
      const setTower=units.find(unit=>unit.raw==='h052');game.moveUnit(setTower,worker.x+64,worker.y-128);sessions.publish(room);await page.waitForTimeout(200);
      point=await project(page,setTower.x,setTower.y);await page.mouse.click(point.x,point.y);
      await page.locator('[data-autocast="A09F"]').click();await page.waitForFunction(id=>!window.reviewState.units.find(unit=>unit.id===id)?.abilities.find(ability=>ability.id==='A09F').autocast,setTower.hid);
    }
    await page.screenshot({path:`artifacts/profession-${row.prefix.toLowerCase()}.png`});
    report.push({profession:row.name,buildingModels:units.length,upgrade:upgradeUnit.upgradeTo,learnedAbility:learned[index]});
    console.log(`${row.prefix}: 40 models, upgrade and learned command verified`);
  }
  const enemy=game.createUnit(game.players[8],game.fourCC('hfoo'),worker.x+256,worker.y-128),dummy=game.createUnit(game.players[0],game.fourCC('e002'),worker.x,worker.y);
  game.cast(dummy,game.fourCC('A00I'),enemy,null,true);sessions.publish(room);
  await page.waitForFunction(()=>window.__originalVisualDebug().originalEffects.models.some(model=>/ensnaretarget/i.test(model.path)));
  const shield=game.createUnit(game.players[0],game.fourCC('e00D'),worker.x,worker.y-256);
  const shackles=game.createUnit(game.players[0],game.fourCC('e00V'),worker.x,worker.y-256);
  game.cast(shield,game.fourCC('A075'),enemy,null,true);game.cast(shackles,game.fourCC('A0DN'),enemy,null,true);
  const channel=game.createUnit(game.players[0],game.fourCC('h00I'),worker.x-256,worker.y-384);
  game.cast(channel,game.fourCC('A019'),null,{x:worker.x+512,y:worker.y-384},true);sessions.publish(room);
  await page.waitForFunction(id=>/^spell/i.test(window.__originalVisualDebug().units.find(unit=>unit.id===id)?.animation?.name||''),channel.hid);
  await page.waitForFunction(()=>['lightningshieldtarget','aerialshacklestarget'].every(path=>window.__originalVisualDebug().originalEffects.models.some(model=>model.path.includes(path))));
  await page.waitForTimeout(2500);
  assert.match(await page.evaluate(id=>window.__originalVisualDebug().units.find(unit=>unit.id===id)?.animation?.name,channel.hid),/^spell/i);
  const locust=await page.evaluate(async()=>{const assets=(await import('/models.js')).getModelAssets();return(await assets.load('abilities/weapons/locustmissile/locustmissile.mdx'))?.path;});
  assert.equal(locust,'abilities/weapons/locustmissile/locustmissile.mdx');
  await page.screenshot({path:'artifacts/profession-channel-and-buffs.png'});
  game.natives.IssueImmediateOrderById(channel,851972);sessions.publish(room);
  await page.waitForFunction(id=>/^stand/i.test(window.__originalVisualDebug().units.find(unit=>unit.id===id)?.animation?.name||''),channel.hid);
  assert.deepEqual(game.errors,[]);assert.deepEqual(errors,[]);
  const visual=await page.evaluate(()=>window.__originalVisualDebug());assert.deepEqual(visual.assets.failed,[]);
  const storageState=await page.context().storageState();await page.close();
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,storageState}),phone=await mobile.newPage();
  phone.on('pageerror',error=>errors.push(error.message));await phone.goto(`http://localhost:${server.address().port}`);
  await phone.locator('.connection.on').waitFor();await phone.waitForFunction(()=>window.__originalVisualDebug?.().assets.loadedModels>20);
  const point=await project(phone,worker.x-256,worker.y+128);await phone.touchscreen.tap(point.x,point.y);
  await phone.locator('[data-spell="A0EE"]').waitFor({state:'visible'});await phone.screenshot({path:'artifacts/profession-mobile.png'});assert.deepEqual(errors,[]);
  await writeFile('artifacts/profession-browser-audit.json',JSON.stringify({professions:report,errors,failedAssets:visual.assets.failed,buffEffect:visual.originalEffects.models.filter(model=>/ensnaretarget|lightningshieldtarget|aerialshacklestarget/i.test(model.path)),channelAnimationAndInterrupt:true,locustMissile:locust},null,2));
  console.log(JSON.stringify({professions:report,errors,failedAssets:visual.assets.failed}));
}finally{
  await browser.close();await new Promise(resolve=>server.close(resolve));
}
