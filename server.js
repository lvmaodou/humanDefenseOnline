import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { randomBytes } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Runtime, fourCC } from './engine/runtime.js';

const PORT=Number(process.env.PORT||8080),ROOT=fileURLToPath(new URL('.',import.meta.url)),PUBLIC=join(ROOT,'public');
const gameData=JSON.parse(await readFile(join(ROOT,'content/original-3.0/data.json'),'utf8'));
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
const meta=JSON.parse(await readFile(join(ROOT,'content/original-3.0/metadata.json'),'utf8'));
const displayText=value=>String(value??'').replace(/\|c[\da-f]{8}/gi,'').replace(/\|r/gi,'').replace(/\|n/g,' ').replace(/\s+/g,' ').trim();
const routes=['a','b','c','d'].map(prefix=>Array.from({length:9},(_,i)=>{const r=gameData.rects[`gg_rct_${prefix}${i+1}`];return r?[(r[0]+r[2])/256,-(r[1]+r[3])/256]:null;}).filter(Boolean));
const visualUnits=Object.fromEntries(Object.entries(gameData.units).map(([id,u])=>[id,{
  ...Object.fromEntries(Object.entries(u).filter(([key])=>/^(file|modelScale|scale|red|green|blue|teamColor|movetp|spd|moveHeight|moveFloor|launchX|launchY|launchZ|impactZ|walk|run|blend|propWin|orientInterp|death|unitShadow|shadowW|shadowH|shadowX|shadowY|Art|animProps|Attachmentanimprops|Boneprops|buildTime)$/i.test(key))),
  name:displayText(u.Name),icon:u.Art||null,modelScale:Number(u.modelScale??1),selectionScale:Number(u.scale??1),cost:Number(u.goldcost)||0,builds:u.Builds,tip:displayText(u.Tip),
  abilities:(u.abilList||'').split(',').filter(a=>a&&a!=='Avul').map(a=>({id:a,name:displayText(gameData.abilityStrings[a]?.Name||gameData.abilityData[a]?.Name||a),art:gameData.abilityStrings[a]?.Art||gameData.abilityData[a]?.Art}))
}]));
const rooms=new Map();
const send=(ws,data)=>{if(ws.readyState===1)ws.send(JSON.stringify(data));};
function broadcast(room){const state=room.game.snapshot();for(const p of room.players.values())send(p.ws,{type:'state',room:room.id,state});}
function slotMembers(room){return [...room.players.values()].map(p=>({slot:p.slot,name:p.name}));}
function createRoom(id){const room={id,players:new Map(),game:new Runtime(gameData,[],undefined,terrain,gameRules),timer:null};rooms.set(id,room);return room;}
function begin(room){room.game=new Runtime(gameData,slotMembers(room),undefined,terrain,gameRules);room.game.start();broadcast(room);}
function shutdown(){for(const room of rooms.values())clearInterval(room.timer);process.exit(0);}
const server=createServer(async(req,res)=>{if(req.url==='/health'){res.writeHead(200,{'content-type':'application/json; charset=utf-8'});res.end(JSON.stringify({ok:true,rooms:rooms.size,map:meta.name,version:meta.version}));return;}const path=req.url==='/'?'index.html':decodeURIComponent(req.url.split('?')[0].slice(1));const vendor=path.startsWith('vendor/three');const base=vendor?join(ROOT,'node_modules/three/build'):PUBLIC;const file=join(base,vendor?path.slice(7):path);try{if(!file.startsWith(base))throw new Error('invalid path');const body=await readFile(file);const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.json':'application/json','.png':'image/png','.jpg':'image/jpeg'};res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream','cache-control':'public,max-age=3600'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}});
const wss=new WebSocketServer({server,maxPayload:4096});
wss.on('connection',ws=>{let room=null,player=null;send(ws,{type:'map',meta:{name:meta.name,version:meta.version,description:meta.description,routes,units:visualUnits,visualAssets:'/warcraft/manifest.json',visualData:'/map/visuals.json',items:Object.fromEntries(Object.entries(gameData.items).map(([id,i])=>[id,{name:displayText(i.Name),cost:i.goldcost||0,description:displayText(i.Description||i.Ubertip||''),art:i.Art,ability:i.abilList,level:i.Level,charges:i.uses||0,sellable:Boolean(i.sellable)}])),terrain:{width:terrain.width,height:terrain.height,offset:terrain.offset,tileSize:terrain.tileSize},classes:Object.fromEntries(Object.entries(gameData.units).filter(([id,u])=>['h001','h002','h000','h004','h003','h06C'].includes(id)).map(([id,u])=>[id,displayText(u.Name)]))}});
  ws.on('message',raw=>{let m;try{m=JSON.parse(raw);}catch{return;}try{
    if(m.type==='join'){if(player){send(ws,{type:'error',message:'此连接已进入房间'});return;}const id=String(m.room||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8)||randomBytes(3).toString('hex').toUpperCase();room=rooms.get(id)||createRoom(id);const slot=[0,1,2,3].find(i=>![...room.players.values()].some(p=>p.slot===i));if(slot===undefined){send(ws,{type:'error',message:'房间已满，最多4人'});return;}if(room.game.globals.udg_waves>0){send(ws,{type:'error',message:'游戏开始后不能加入，请重新建房'});return;}player={id:randomBytes(5).toString('hex'),slot,name:String(m.name||`玩家${slot+1}`).slice(0,12),ws};room.players.set(player.id,player);if(room.players.size===1)begin(room);else{room.game.players[slot].active=true;room.game.players[slot].name=player.name;}send(ws,{type:'joined',id:player.id,slot,room:id});broadcast(room);if(!room.timer)room.timer=setInterval(()=>{try{room.game.tick(.05);broadcast(room);}catch(error){console.error('[room]',room.id,error);broadcast(room);}},50);return;}
    if(!room||!player)return;
    if(m.type==='action'){const result=room.game.action(player.slot,m.action||{});if(result===false)send(ws,{type:'error',message:'操作无效或当前不可用'});broadcast(room);return;}
  }catch(error){send(ws,{type:'error',message:error.message||'操作失败'});}});
  ws.on('close',()=>{if(!room||!player)return;room.players.delete(player.id);room.game.players[player.slot].active=false;room.game.message(`${player.name} 离开了战场`);if(!room.players.size){clearInterval(room.timer);rooms.delete(room.id);}else broadcast(room);});
});
server.listen(PORT,()=>console.log(`Human Defense ${meta.version} listening on http://localhost:${PORT}`));
process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
