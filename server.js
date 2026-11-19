import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { randomBytes } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Runtime, fourCC } from './engine/runtime.js';
import { originalBuildBlockers } from './public/placement.js';
import { originalItemSources } from './engine/item-sources.js';
import { originalEquipment, originalItemUse } from './engine/equipment.js';
import { RoomSessions } from './engine/room-sessions.js';
import { compactNetworkState } from './engine/network-state.js';

const PORT=Number(process.env.PORT||8080),ROOT=fileURLToPath(new URL('.',import.meta.url)),PUBLIC=join(ROOT,'public');
const gameData=JSON.parse(await readFile(join(ROOT,'content/original-3.0/data.json'),'utf8'));
const itemSources=originalItemSources(gameData,await readFile(join(ROOT,'content/original-3.0/script.j'),'utf8'));
const equipment=originalEquipment(gameData);
const gameplay=JSON.parse(await readFile(join(ROOT,'content/original-3.0/gameplay.json'),'utf8'));
const gameRules=gameplay.rules;
const modelManifest=JSON.parse(await readFile(join(ROOT,'public/warcraft/manifest.json'),'utf8'));
for(const unit of Object.values(gameData.units)){
  const model=String(unit.file||'').replaceAll('\\','/').toLowerCase().replace(/\.mdl$/,'');
  const metadata=modelManifest.models[`${model}.mdx`];
  const death=metadata?.sequences.find(sequence=>/^death(?:\s|$)/i.test(sequence.name));
  if(death)unit.deathDuration=Math.max(.5,Math.min(8,(death.interval[1]-death.interval[0])/1000));
}
const terrain=JSON.parse(await readFile(join(ROOT,'content/original-3.0/terrain.json'),'utf8'));
const sourceWorld=JSON.parse(await readFile(join(ROOT,'public/map/visuals.json'),'utf8'));
terrain.buildBlockers=originalBuildBlockers(sourceWorld.doodads);
terrain.buildableTiles=terrain.tiles.map(id=>Number(sourceWorld.terrainTileData[id]?.buildable)===1);
const meta=JSON.parse(await readFile(join(ROOT,'content/original-3.0/metadata.json'),'utf8'));
const displayText=value=>String(value??'').replace(/\|c[\da-f]{8}/gi,'').replace(/\|r/gi,'').replace(/\|n/g,' ').replace(/\s+/g,' ').trim();
const passiveAbilityCodes=new Set(['AHbh','AOcr','AEev','ANca','Afae','Aapl','ANba','Avul','AInv','Aroc','Amgl','Afra','Afrz','Aven','Apxf','AIat','AIab','AIcb','AIfb','AIbl','AIva','AIas','Ablo','AHad','AHab','AEar','AOae','AUau','ANms','AIaa','Awar','Aien','Abds','Aeat','Aro1','Aro2','Abdl','Aspi','Argl','Aion','Abgs','Aloc','Adtn','Aren','Awha']);
const itemModelPath=item=>String(item?.file||'').replaceAll('\\','/').toLowerCase().replace(/\.mdl$/i,'.mdx');
const routes=['a','b','c','d'].map(prefix=>Array.from({length:9},(_,i)=>{const r=gameData.rects[`gg_rct_${prefix}${i+1}`];return r?[(r[0]+r[2])/256,-(r[1]+r[3])/256]:null;}).filter(Boolean));
const visualUnits=Object.fromEntries(Object.entries(gameData.units).map(([id,u])=>[id,{
  ...Object.fromEntries(Object.entries(u).filter(([key])=>/^(file|modelScale|scale|red|green|blue|teamColor|movetp|spd|moveHeight|moveFloor|launchX|launchY|launchZ|impactZ|walk|run|blend|propWin|orientInterp|death|unitShadow|shadowW|shadowH|shadowX|shadowY|Art|animProps|Attachmentanimprops|Boneprops|buildTime)$/i.test(key))),
  name:displayText(u.Name),icon:u.Art||null,modelScale:Number(u.modelScale??1),selectionScale:Number(u.scale??1),cost:Number(u.goldcost)||0,lumberCost:Number(u.lumbercost)||0,food:Number(u.fused)||0,buildTime:Number(u.bldtm)||0,builds:u.Builds,isBuilding:Boolean(u.isbldg),tip:displayText(u.Tip),autocast:u.auto&&u.auto!=='_'?u.auto:null,upgradeTo:equipment.flatMap(set=>set.pieces).find(piece=>piece.base===id)?.unit,
  hp:Number(u.HP)||1,mana:Number(u.manaN??u.realM)||0,armor:Number(u.def)||0,attackMin:(Number(u.dmgplus1)||0)+(Number(u.dice1)||0),attackMax:(Number(u.dmgplus1)||0)+(Number(u.dice1)||0)*(Number(u.sides1)||1),attackRange:Number(u.rangeN1)||0,attackCooldown:Number(u.cool1)||0,weaponType:u.weapTp1||null,requires:String(u.Requires||'').split(',').filter(Boolean),
  abilities:[...new Set([...(u.abilList||'').split(','),...equipment.filter(set=>set.pieces.some(piece=>piece.unit===id)).map(set=>set.ability)])].filter(a=>a&&a!=='Avul').map(a=>{const def=gameData.abilityData[a]||{},strings=gameData.abilityStrings[a]||{},code=def.code||a,targets=String(def.targs1||'').split(',').filter(Boolean),unitTarget=targets.some(target=>['enemy','enemies','ally','neutral'].includes(target));return{id:a,code,name:displayText(strings.Name||def.Name||a),art:strings.Art||def.Art,description:displayText(strings.Ubertip||def.Ubertip||''),castable:!passiveAbilityCodes.has(code)&&!['AInv','Avul','Atau'].includes(code),targeting:a==='A04D'||code==='AEbl'?'point':a==='A07E'||unitTarget?(targets.some(target=>['ground','point'].includes(target))?'either':'unit'):'self'};})
}]));
const send=(ws,data)=>{if(ws?.readyState===1)ws.send(JSON.stringify(data));};
function broadcast(room){const state=compactNetworkState(room.game.snapshot()),payload=JSON.stringify({type:'state',room:room.id,state});for(const p of room.players.values())if(p.ws?.readyState===1)p.ws.send(payload);}
const sessions=new RoomSessions({createGame:members=>new Runtime(gameData,members,undefined,terrain,gameRules),broadcast});
const rooms=sessions.rooms;
function shutdown(){clearInterval(heartbeat);sessions.dispose();process.exit(0);}
const server=createServer(async(req,res)=>{
  if(req.url==='/health'){res.writeHead(200,{'content-type':'application/json; charset=utf-8'});res.end(JSON.stringify({ok:true,rooms:rooms.size,map:meta.name,version:meta.version}));return;}
  const path=req.url==='/'?'index.html':decodeURIComponent(req.url.split('?')[0].slice(1)),vendor=path.startsWith('vendor/three');
  const base=vendor?join(ROOT,'node_modules/three/build'):PUBLIC,file=join(base,vendor?path.slice(7):path);
  try{
    if(!file.startsWith(base))throw new Error('invalid path');
    const body=await readFile(file),extension=extname(file);
    const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg'};
    const cacheControl=!vendor&&['.html','.css','.js','.mjs','.json'].includes(extension)?'no-cache':'public,max-age=3600';
    res.writeHead(200,{'content-type':types[extension]||'application/octet-stream','cache-control':cacheControl});res.end(body);
  }catch{res.writeHead(404);res.end('Not found');}
});
const wss=new WebSocketServer({server,maxPayload:4096});
wss.on('connection',ws=>{let room=null,player=null;send(ws,{type:'map',meta:{name:meta.name,version:meta.version,description:meta.description,routes,units:visualUnits,equipment,pickupRange:Number(gameRules.sourceGameplayConstants?.PickupItemRange??gameRules.PickupItemRange??180),visualAssets:'/warcraft/manifest.json',visualData:'/map/visuals.json',items:Object.fromEntries(Object.entries(gameData.items).map(([id,i])=>[id,{name:displayText(i.Name),cost:i.goldcost||0,description:displayText(i.Description||i.Ubertip||''),art:i.Art,model:itemModelPath(i),scale:i.scale??1,colorR:i.colorR??255,colorG:i.colorG??255,colorB:i.colorB??255,ability:i.abilList,level:i.Level,charges:i.uses||0,sellable:Boolean(i.sellable),use:originalItemUse(gameData,i),...itemSources[id]}])),terrain:{width:terrain.width,height:terrain.height,offset:terrain.offset,tileSize:terrain.tileSize},classes:Object.fromEntries(Object.entries(gameData.units).filter(([id,u])=>['h001','h002','h000','h004','h003','h06C'].includes(id)).map(([id,u])=>[id,displayText(u.Name)]))}});
  ws.isAlive=true;
  ws.on('pong',()=>{ws.isAlive=true;});
  ws.on('error',()=>{});
  ws.on('message',raw=>{
    let m;try{m=JSON.parse(raw);}catch{return;}
    if(!m||typeof m!=='object')return;
    try{
      if(m.type==='join'){
        if(player){send(ws,{type:'error',code:'ALREADY_JOINED',message:'此连接已进入房间'});return;}
        const joined=sessions.join(ws,m);room=joined.room;player=joined.player;
        send(ws,{type:'joined',id:player.id,slot:player.slot,name:player.name,room:room.id,resumeToken:player.token,resumed:joined.resumed,retentionMs:sessions.retentionMs});
        sessions.publish(room);return;
      }
      if(!room||!player||player.ws!==ws)return;
      if(m.type==='leave'){
        sessions.leave(room,player,ws);room=null;player=null;send(ws,{type:'left'});return;
      }
      if(m.type==='action'){
        const result=room.game.action(player.slot,m.action||{});
        if(result===false)send(ws,{type:'error',requestId:m.requestId,message:'操作无效或当前不可用'});
        else send(ws,{type:'action-result',requestId:m.requestId,action:m.action?.type,unit:result?.hid});
        sessions.publish(room);
      }
    }catch(error){send(ws,{type:'error',code:error.code,requestId:m?.requestId,message:error.message||'操作失败'});}
  });
  ws.on('close',()=>{if(room&&player)sessions.detach(room,player,ws);});
});
const heartbeat=setInterval(()=>{
  for(const ws of wss.clients){
    if(!ws.isAlive){ws.terminate();continue;}
    ws.isAlive=false;ws.ping();
  }
  sessions.sweep();
},15000);
heartbeat.unref();
server.on('close',()=>{clearInterval(heartbeat);sessions.dispose();});
server.listen(PORT,()=>console.log(`Human Defense ${meta.version} listening on http://localhost:${PORT}`));
export { server, rooms, sessions };
process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
