import assert from 'node:assert/strict';
import { once } from 'node:events';
import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { buildingFootprint, checkBuildPlacement } from '../public/placement.js';

process.env.PORT='0';
const {server,rooms,sessions}=await import('../server.js');
if(!server.listening)await once(server,'listening');
const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}:{})});
const errors=[],report=[];
const cases=[['YM','h001','h024'],['LR','h002','h010'],['DZ','h000','h04X'],['SS','h004','h02O'],['YX','h003','h041'],['MJS','h06C','h06N']];
async function watch(page){
  page.setDefaultTimeout(20000);page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{const Socket=WebSocket;window.WebSocket=class extends Socket{constructor(...args){super(...args);this.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.type==='state')window.reviewState=m.state;});}};});
}
async function project(page,x,y){
  return page.evaluate(async({x,y})=>{
    const T=await import('/vendor/three.module.js'),C=await import('/coordinates.js'),view=window.__originalVisualDebug().camera,canvas=document.querySelector('#battle'),rect=canvas.getBoundingClientRect();
    const camera=new T.PerspectiveCamera(C.cameraVerticalFov(),canvas.width/canvas.height,.1,view.far);camera.position.fromArray(view.position);camera.lookAt(new T.Vector3().fromArray(view.focus));camera.updateMatrixWorld(true);
    const [wx,wz]=C.sourceToWorld(x,y),p=new T.Vector3(wx,.03,wz).project(camera);
    return getComputedStyle(document.querySelector('#app')).transform==='none'?{x:rect.left+(p.x+1)/2*rect.width,y:rect.top+(1-p.y)/2*rect.height}:{x:rect.left+(p.y+1)/2*rect.width,y:rect.top+(p.x+1)/2*rect.height};
  },{x,y});
}
function findSites(terrain,type){
  for(let y=-6400;y<=6400;y+=128)for(let x=-6400;x<=6400;x+=128){
    if(!checkBuildPlacement(terrain,[],x,y,{type:'h03J'}).valid)continue;
    const check=checkBuildPlacement(terrain,[],x,y,{type});if(check.valid||!check.reason.includes('底座跨越'))continue;
    for(const distance of [64,128,192,256])for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]){
      const valid=checkBuildPlacement(terrain,[],x+dx*distance,y+dy*distance,{type});if(!valid.valid)continue;
      const neighbour=[[128,0],[-128,0],[0,128],[0,-128]].map(([ox,oy])=>checkBuildPlacement(terrain,[],valid.x+ox,valid.y+oy,{type})).find(p=>p.valid&&!checkBuildPlacement(terrain,[{type,x:valid.x,y:valid.y,building:true,facing:270}],p.x,p.y,{type}).valid);
      if(neighbour)return{invalid:check,valid,neighbour};
    }
  }
  throw new Error(`No supported cliff regression site for ${type}`);
}
async function settle(page){await page.waitForFunction(()=>{const v=window.__originalVisualDebug().camera;return Math.hypot(...v.focus.map((n,i)=>n-v.target[i]))<.005;});}
async function choose(page,type,touch=false){const tap=l=>touch?l.tap():l.click();await tap(page.locator('#open-build'));await tap(page.locator(`[data-unit="${type}"]`));}
async function preview(page,site,type,valid){
  const p=await project(page,site.x,site.y);await page.mouse.move(p.x,p.y);
  await page.waitForFunction(({x,y,type,valid})=>{const p=window.__buildPlacementDebug?.();return p?.x===x&&p?.y===y&&p?.type===type&&p.check.valid===valid;},{x:site.x,y:site.y,type,valid});
  const drawn=await page.evaluate(()=>window.__buildPlacementDebug()),expected=buildingFootprint(type,site.x,site.y);
  assert.equal(drawn.polygon.length,expected.length);for(let i=0;i<expected.length;i++)assert.ok(Math.hypot(...drawn.polygon[i].map((v,j)=>v-expected[i][j]))<.005);
  return drawn;
}
try{
  const page=await browser.newPage({viewport:{width:1366,height:820}});await watch(page);await page.goto(`http://localhost:${server.address().port}`);
  await page.locator('#nickname').fill('All Bases');await page.locator('#room-code').fill('ALLBASE');await page.locator('.join-button').click();
  for(let i=0;i<25;i++){
    if(await page.evaluate(()=>window.reviewState?.units.some(u=>u.owner===0&&u.type==='h001')))break;
    await page.waitForTimeout(300);
    if(!await page.locator('#dialog').evaluate(el=>el.classList.contains('hidden')))await page.locator('#dialog-options button').first().click();
  }
  await page.waitForFunction(()=>window.reviewState?.time>=11&&window.reviewState.units.some(u=>u.owner===0&&u.type==='h001'));
  const room=rooms.get('ALLBASE'),game=room.game;game.tasks=[];game.timers=[];game.tick=()=>{};
  let last;
  for(const [index,[profession,workerType,type]]of cases.entries()){
    await page.keyboard.press('Escape');await page.keyboard.press('Escape');
    for(const unit of [...game.units.values()])game.removeUnit(unit);
    const player=game.players[0];player.gold=1000000;player.lumber=10000;player.cap=65;game.globals.udg_playerzz[0]=index+1;
    const sites=findSites(game.terrain,type),worker=game.createUnit(player,game.fourCC(workerType),sites.valid.x+192,sites.valid.y);
    for(const required of String(game.data.units[type].Requires||'').split(',').filter(Boolean))player.tech[required]=1;
    game.effect('camera',{x:(sites.invalid.x+sites.valid.x)/2,y:(sites.invalid.y+sites.valid.y)/2},null,{operation:'pan',player:0,duration:60});sessions.publish(room);
    await page.waitForFunction(id=>window.reviewState.units.some(u=>u.id===id),worker.hid);await settle(page);await choose(page,type);
    const blocked=await preview(page,sites.invalid,type,false),balances=[player.gold,player.lumber,player.food];
    let point=await project(page,sites.invalid.x,sites.invalid.y);await page.mouse.click(point.x,point.y);
    assert.deepEqual([player.gold,player.lumber,player.food],balances);assert.match(blocked.check.reason,/底座跨越/);
    const inland=await preview(page,sites.valid,type,true);point=await project(page,sites.valid.x,sites.valid.y);await page.mouse.click(point.x,point.y);
    await page.waitForFunction(type=>window.reviewState.units.some(u=>u.type===type),type);
    const tower=[...game.units.values()].find(u=>u.raw===type);assert.deepEqual([tower.x,tower.y,tower.facing],[sites.valid.x,sites.valid.y,270]);
    await choose(page,type);const neighbour=await preview(page,sites.neighbour,type,false);assert.match(neighbour.check.reason,/底座重叠/);
    await page.screenshot({path:`artifacts/nonstandard-building-${profession.toLowerCase()}.png`});
    report.push({profession,type,name:game.data.units[type].Name,invalid:blocked,valid:inland,neighbour});last={type,sites};
    console.log(JSON.stringify({profession,type,cliff:true,preview:true,construction:true,neighbour:true}));
  }
  const storageState=await page.context().storageState();await page.close();
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,storageState}),phone=await context.newPage();await watch(phone);
  await phone.goto(`http://localhost:${server.address().port}`);await phone.locator('.connection.on').waitFor();await settle(phone);await choose(phone,last.type,true);
  const point=await project(phone,last.sites.invalid.x,last.sites.invalid.y);await phone.touchscreen.tap(point.x,point.y);
  await phone.waitForFunction(()=>window.__buildPlacementDebug?.()?.check.valid===false);
  assert.match(await phone.locator('#placement-status').textContent(),/底座跨越/);await phone.screenshot({path:'artifacts/nonstandard-building-mobile.png'});
  const failedAssets=await phone.evaluate(()=>window.__originalVisualDebug().assets.failed);
  assert.deepEqual(errors,[]);assert.deepEqual(game.errors,[]);assert.deepEqual(failedAssets,[]);
  await writeFile('artifacts/nonstandard-building-browser.json',JSON.stringify({professions:report,mobile:true,errors,failedAssets},null,2));
  console.log(JSON.stringify({passed:true,professions:report.length,mobile:true,errors,failedAssets}));
}finally{
  await browser.close();for(const room of rooms.values())clearInterval(room.timer);await new Promise(resolve=>server.close(resolve));
}
