import { install } from './map-script.js';
import { installNatives } from './natives.js';
import { installCombat } from './combat.js';
import { installActions } from './actions.js';
import { installEquipment } from './equipment.js';
import { PathingGrid } from './pathing.js';

export const fourCC = value => typeof value === 'number' ? value : [...value].reduce((n,c)=>n*256+c.charCodeAt(0),0);
export const rawId = n => typeof n==='string'?n:String.fromCharCode((n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255);
export const clean = s => String(s??'').replace(/\|c[\da-fA-F]{8}/g,'').replace(/\|r/g,'').replace(/\|n/g,'\n');
export const attackVsArmor={
  normal:{small:1,medium:1.5,large:1,fort:.7,hero:1,normal:1,divine:.05,none:1},
  pierce:{small:2,medium:.75,large:1,fort:.35,hero:.5,normal:1.5,divine:.05,none:1},
  siege:{small:1,medium:.5,large:1,fort:1.5,hero:.5,normal:1.5,divine:.05,none:1},
  magic:{small:1.25,medium:.75,large:2,fort:.35,hero:.5,normal:1,divine:.05,none:1},
  chaos:{small:1,medium:1,large:1,fort:1,hero:1,normal:1,divine:1,none:1},
  hero:{small:1,medium:1,large:1,fort:.5,hero:1,normal:1,divine:.05,none:1},
  spells:{small:1,medium:1,large:1,fort:1,hero:1,normal:1,divine:.05,none:1}
};
const armorOrder=['small','medium','large','fort','hero','normal','divine','none'];
export class Runtime {
  constructor(data, members=[], seed=7, terrain=null, rules={}) {
    const sourceRules=rules.sourceGameplayConstants||rules;
    this.data=data;this.terrain=terrain;this.pathfinder=terrain?.pathing?new PathingGrid(terrain):null;this.rules={MinUnitSpeed:100,MaxUnitSpeed:522,PickupItemRange:180,FoodCeiling:65,...sourceRules};this.attackVsArmor=Object.fromEntries(Object.entries(attackVsArmor).map(([type,row])=>[type,{...row}]));
    for(const [type,key] of [['pierce','DamageBonusPierce'],['spells','DamageBonusSpells']])for(const [index,value] of (this.rules[key]||[]).entries())if(armorOrder[index]&&Number.isFinite(Number(value)))this.attackVsArmor[type][armorOrder[index]]=Number(value);
    this.time=0;this.seed=seed>>>0;this.id=1;this.tasks=[];this.timers=[];this.triggers=[];this.units=new Map();this.items=new Map();this.handles=new Map();this.effects=[];this.projectiles=[];this.messages=[];this.quests=[];this.dialogs=new Map();this.errors=[];this.status='playing';this.ctx={};this.operations=0;this.nativeCalls={};this.spatial=new Map();this.spatialCell=256;this.startLocations=new Map();this.nightUntil=0;
    this.players=Array.from({length:16},(_,id)=>({id,color:id,name:members.find(m=>m.slot===id)?.name||`玩家 ${id+1}`,active:members.some(m=>m.slot===id)||id>=8&&id<=11,team:id<8?0:1,gold:0,lumber:0,food:0,cap:0,tech:{},handicap:1}));
    const constants={PLAYER_NEUTRAL_AGGRESSIVE:12,PLAYER_NEUTRAL_PASSIVE:15,bj_lastDyingWidget:null,bj_UNIT_FACING:270,bj_PI:Math.PI,bj_DEGTORAD:Math.PI/180,bj_RADTODEG:180/Math.PI,bj_MAX_PLAYERS:12,bj_MAX_PLAYER_SLOTS:16,bj_forLoopAIndex:0,bj_forLoopBIndex:0,bj_forLoopAIndexEnd:0,bj_forLoopBIndexEnd:0};
    this.globals=new Proxy(constants,{get:(o,k)=>k in o?o[k]:typeof k==='string'&&(k===k.toUpperCase()||k.startsWith('bj_'))?k:null});this.functions={};this.natives={};
    this.fourCC=fourCC;installNatives(this);installCombat(this);installEquipment(this);install(this);if(terrain)installActions(this,terrain);this.run('__globals');
  }
  array(value){return new Proxy(Object.create(null),{get:(o,k)=>k in o?o[k]:value});}
  idiv(a,b){return b?Math.trunc(a/b):0;}
  unitStats(unit){
    const d=this.data.units[unit.raw]||{},stats={maxHp:Number(d.HP)||1,maxMana:Number(d.manaN??d.realM)||0,hpRegen:Number(d.regenHP)||0,manaRegen:Number(d.regenMana)||0,armor:Number(d.def)||0,attackRange:Number(d.rangeN1)||100,attackDamageBonus:0,moveSpeed:Number(d.spd)||0};
    for(const [id,rawLevel] of Object.entries(unit.owner?.tech||{})){
      const level=Math.max(0,Math.floor(Number(rawLevel)||0)),upgrade=this.data.upgrades[id];if(!level||!upgrade)continue;
      for(let index=1;index<=4;index++){
        const effect=upgrade[`effect${index}`],base=Number(upgrade[`base${index}`])||0,mod=Number(upgrade[`mod${index}`])||0,value=base+mod*(level-1);
        if(!effect||effect==='_')continue;
        if(effect==='rhpo')stats.hpRegen+=value;
        else if(effect==='rhpx')stats.maxHp+=value;
        else if(effect==='rmnx')stats.maxMana+=value;
        else if(effect==='rmnr')stats.manaRegen+=value;
        else if(effect==='rarm')stats.armor+=value;
        else if(effect==='ratx')stats.attackDamageBonus+=value;
        else if(effect==='ratr'&&stats.attackRange>150)stats.attackRange+=value;
        else if(effect==='rmvx')stats.moveSpeed+=value;
      }
    }
    return stats;
  }
  refreshUnitStats(unit){
    if(!unit||unit.removed)return;
    const previous=unit.stats||this.unitStats(unit),next=this.unitStats(unit),handicap=unit.owner?.handicap||1,maxHp=next.maxHp*handicap,maxMana=next.maxMana;
    unit.maxHp=maxHp;unit.hp=Math.max(0,Math.min(maxHp,unit.hp+(maxHp-previous.maxHp*handicap)));unit.maxMana=maxMana;unit.mana=Math.max(0,Math.min(maxMana,unit.mana+(maxMana-previous.maxMana)));unit.stats=next;
  }
  refreshPlayerUnits(player){for(const unit of this.units.values())if(unit.owner===player)this.refreshUnitStats(unit);}
  moveSpeed(unit){
    const speed=(unit.stats?.moveSpeed??this.unitStats(unit).moveSpeed)*(1+(unit.auraMove||0));if(speed<=0)return 0;
    return Math.max(Number(this.rules.MinUnitSpeed)||100,Math.min(Number(this.rules.MaxUnitSpeed)||522,speed));
  }
  canMove(unit){return Boolean(unit&&!unit.removed&&!unit.death&&!unit.building&&this.moveSpeed(unit)>0);}
  isFlying(unit){return this.data.units[unit.raw]?.movetp==='fly';}
  pathingFor(unit){
    if(!this.pathfinder||!this.isFlying(unit))return this.pathfinder;
    // WPM 0x04 blocks flight; cliffs and ground-only obstacles use 0x02.
    return this.flyingPathfinder??=new PathingGrid(this.terrain,{blockedMask:4});
  }
  spatialKey(x,y){return `${Math.floor(x/this.spatialCell)},${Math.floor(y/this.spatialCell)}`;}
  addSpatial(unit){if(!unit||unit.removed||unit.death)return;const key=this.spatialKey(unit.x,unit.y);let bucket=this.spatial.get(key);if(!bucket)this.spatial.set(key,bucket=new Set());bucket.add(unit);unit.spatialKey=key;}
  removeSpatial(unit){if(!unit?.spatialKey)return;const bucket=this.spatial.get(unit.spatialKey);bucket?.delete(unit);if(bucket&&!bucket.size)this.spatial.delete(unit.spatialKey);unit.spatialKey=null;}
  syncSpatial(unit,previousX=unit.x,previousY=unit.y){const key=this.spatialKey(unit.x,unit.y);if(unit.spatialKey===key)return;this.removeSpatial(unit);this.addSpatial(unit);}
  nearbyUnits(point,radius){
    const minX=Math.floor((point.x-radius)/this.spatialCell),maxX=Math.floor((point.x+radius)/this.spatialCell),minY=Math.floor((point.y-radius)/this.spatialCell),maxY=Math.floor((point.y+radius)/this.spatialCell),found=[];
    for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){const bucket=this.spatial.get(`${x},${y}`);if(bucket)found.push(...bucket);}
    return found;
  }
  setMove(unit,destination,order=null){
    if(!unit||unit.removed||unit.death||!destination||!Number.isFinite(destination.x)||!Number.isFinite(destination.y))return false;
    const pathfinder=this.pathingFor(unit),path=pathfinder?pathfinder.findPath(unit,destination):[{x:destination.x,y:destination.y}];if(!path?.length)return false;
    const end=path.at(-1)||destination;unit.move={x:end.x,y:end.y,path,index:0,stalled:0,escape:!!pathfinder&&!pathfinder.isWalkable(unit.x,unit.y)};if(order!==null)unit.order=order;
    const next=path[0];unit.facing=Math.atan2(next.y-unit.y,next.x-unit.x)*180/Math.PI;return true;
  }
  moveUnit(unit,x,y){if(!unit)return;const previousX=unit.x,previousY=unit.y;unit.x=x;unit.y=y;this.syncSpatial(unit,previousX,previousY);this.enterRegions(unit);}
  guard(){if(++this.operations>300000)throw new Error('JASS instruction budget exceeded');return true;}
  handle(o){o.hid=this.id++;this.handles.set(o.hid,o);return o;}
  random(){this.seed=(1664525*this.seed+1013904223)>>>0;return this.seed/4294967296;}
  *call(name,...args){this.guard();if(this.functions[name]&&!this.nativeOverrides?.has(name))return yield* this.functions[name](...args);const native=this.natives[name];if(!native)throw new Error(`Missing JASS native: ${name}`);this.nativeCalls[name]=(this.nativeCalls[name]||0)+1;const out=native(...args);return out?.next?yield* out:out;}
  run(name,args=[],context={}){return this.resume({iterator:this.call(name,...args),context:{...this.ctx,...context},name});}
  resume(task){const previous=this.ctx;this.ctx=task.context;this.operations=0;try{const result=task.iterator.next();if(!result.done){task.at=this.time+Math.max(.001,Number(result.value?.wait)||.001);this.tasks.push(task);}return result.value;}catch(error){this.errors.push({time:this.time,task:task.name,message:error.stack});this.status='error';throw error;}finally{this.ctx=previous;}}
  invoke(name,args=[],context={}){return this.run(name,args,context);}
  message(text,player=null){this.messages.push({id:this.id++,time:this.time,text:clean(text),player:player?.id??null});if(this.messages.length>60)this.messages.shift();}
  effect(kind,source,target,extra={}){this.effects.push({id:this.id++,kind,x:source?.x??0,y:source?.y??0,tx:target?.x??source?.x??0,ty:target?.y??source?.y??0,time:this.time,sourceId:source?.hid,targetId:target?.hid,...extra});if(this.effects.length>250){for(let i=0;this.effects.length>250&&i<this.effects.length;){if(!this.effects[i].persistent)this.effects.splice(i,1);else i++;}}return this.effects.at(-1);}
  fire(event,context={}){for(const t of [...this.triggers]){if(!t.enabled||t.dead)continue;for(const e of t.events){if(e.event!==event)continue;if(e.player&&e.player!==(context.player||context.unit?.owner))continue;if(e.unit&&e.unit!==context.unit)continue;if(e.dialog&&e.dialog!==context.dialog)continue;if(e.rect&&e.rect!==context.rect)continue;if(event==='chat'&&!(e.exact?context.text===e.text:context.text.startsWith(e.text)))continue;this.execute(t,context,true);break;}}}
  execute(t,context={},conditions=false){if(!t||t.dead)return;const ctx={...this.ctx,...context,trigger:t};if(conditions&&t.conditions.some(c=>!this.run(c,[],ctx)))return;for(const action of [...t.actions])this.run(action,[],ctx);}
  register(t,event,extra={}){const e={event,...extra};t.events.push(e);return e;}
  timer(seconds,repeat,callback,extra={}){const t=this.handle({at:this.time+Math.max(.001,seconds),period:seconds,repeat,callback,...extra});this.timers.push(t);return t;}
  tick(dt){
    if(this.status!=='playing')return;
    this.time+=dt;let rounds=0;
    while(rounds++<20){
      const due=this.tasks.filter(t=>t.at<=this.time);this.tasks=this.tasks.filter(t=>t.at>this.time);
      const timers=this.timers.filter(t=>!t.dead&&t.at<=this.time);
      if(!due.length&&!timers.length)break;
      for(const t of timers){
        if(t.repeat)t.at+=Math.max(.001,t.period);else t.dead=true;
        if(t.trigger){
          // Disabled triggers skip timer events while the timer keeps its schedule.
          // Explicit TriggerExecute calls can still run them through execute().
          if(t.trigger.enabled)this.execute(t.trigger,{timer:t},true);
        }else this.run(t.callback,[],{timer:t});
      }
      for(const t of due)this.resume(t);
    }
    this.timers=this.timers.filter(t=>!t.dead);this.updateCombat(dt);
    this.effects=this.effects.filter(e=>e.persistent&&!e.destroyed||this.time-(e.destroyedAt??e.time)<3);
    for(const u of [...this.units.values()])if(u.corpseUntil&&u.corpseUntil<=this.time)this.removeUnit(u);
  }
  start(){this.run('config');this.run('main');}
  choose(slot,dialogId,buttonId){const d=this.dialogs.get(dialogId),p=this.players[slot];if(!d||!d.visible.has(slot))return false;const button=d.buttons.find(b=>b.hid===buttonId);if(!button)return false;d.visible.delete(slot);this.fire('dialog',{dialog:d,button,player:p});return true;}
  chat(slot,text){this.fire('chat',{player:this.players[slot],text:String(text).slice(0,200)});}
  inside(u,r){return u.x>=r.x1&&u.x<=r.x2&&u.y>=r.y1&&u.y<=r.y2;}
  enterRegions(u){if(u.removed)return;const previous=u.regions||new Set();const next=new Set();for(const t of this.triggers)for(const e of t.events){if(e.event!=='enter'||!this.inside(u,e.rect))continue;next.add(e.rect.hid);if(!previous.has(e.rect.hid))this.fire('enter',{unit:u,rect:e.rect,player:u.owner});}u.regions=next;}
  createUnit(owner,type,x,y,facing=270){const id=rawId(type),d=this.data.units[id];if(!d)throw new Error(`Unknown original unit ${id}`);const stats=this.unitStats({raw:id,owner}),hp=stats.maxHp;const u=this.handle({type:fourCC(type),raw:id,owner,x,y,facing,hp:hp*owner.handicap,maxHp:hp*owner.handicap,mana:Number(d.mana0)||0,maxMana:stats.maxMana,stats,data:0,abilities:new Map(),autoCast:new Set(),inventory:[],cooldown:0,castCooldown:new Map(),food:Number(d.fused)||0,useFood:true,regions:new Set(),buffs:[],constructed:true,level:1,building:!!d.isbldg,death:false,collision:Number(d.collision)||0});for(const a of String(d.abilList||'').split(','))if(a&&a!=='_')u.abilities.set(fourCC(a),1);for(const a of String(d.auto||'').split(',').filter(a=>a&&a!=='_'))if(u.abilities.has(fourCC(a)))u.autoCast.add(fourCC(a));this.units.set(u.hid,u);this.addSpatial(u);owner.food+=u.food;this.globals.bj_lastCreatedUnit=u;this.enterRegions(u);return u;}
  removeUnit(u,corpse=false){if(!u||u.removed&&!corpse&&!u.corpse)return;u.removed=true;this.removeSpatial(u);if(u.useFood)u.owner.food-=u.food;u.useFood=false;if(corpse){u.corpse=true;u.corpseUntil=this.time+Math.max(.5,Number(this.data.units[u.raw]?.deathDuration)||2.5);return;}u.corpse=false;u.corpseUntil=0;this.units.delete(u.hid);}
  damage(source,target,amount,attack=false,damageType='DAMAGE_TYPE_NORMAL',attackType=null){const isMagic=/MAGIC|LIGHTNING|COLD|FIRE|DIVINE/.test(String(damageType));if(!target||target.death||target.removed||target.abilities.has(fourCC('Avul'))||isMagic&&target.buffs.some(b=>b.kind==='magicImmune'&&b.until>this.time))return 0;const d=this.data.units[target.raw]||{};let damage=Math.max(0,Number(amount)||0);if(attack){damage+=Number(source?.stats?.attackDamageBonus)||0;damage+=Number(source?.itemStats?.damage)||0;}const armorKey=String(d.defType||'').toLowerCase(),attackKey=String(attackType||(isMagic?'spells':'')).replace(/^ATTACK_TYPE_/,'').toLowerCase();if(attack){let armor=(Number(target.stats?.armor??d.def)||0)+(target.auraArmor||0)-target.buffs.filter(b=>b.kind==='armor'&&b.until>this.time).reduce((sum,b)=>sum+b.amount,0);damage*=armor>=0?1/(1+.06*armor):2-Math.pow(.94,-armor);}const typeMultiplier=this.attackVsArmor[attackKey]?.[armorKey];if(typeMultiplier!==undefined)damage*=typeMultiplier;const dealt=Math.min(target.hp,damage);target.hp-=damage;this.effect(attack?'hit':'damage',target,target,{value:Math.round(dealt),attackType:attackKey||null,armorType:armorKey||null,damageType});if(target.hp<=0)this.kill(target,source);return dealt;}
  kill(u,killer=null){if(!u||u.death||u.removed)return;this.effect('death',u,u,{unit:u.raw});u.death=true;u.hp=0;u.killer=killer;this.globals.bj_lastDyingWidget=u;if(killer&&u.owner.team!==killer.owner.team){const d=this.data.units[u.raw];killer.owner.gold+=(Number(d.bountyplus)||0)+Array.from({length:Number(d.bountydice)||0},()=>1+Math.floor(this.random()*(Number(d.bountysides)||1))).reduce((a,b)=>a+b,0);}this.fire('EVENT_PLAYER_UNIT_DEATH',{unit:u,dying:u,killer,player:u.owner});this.fire('EVENT_UNIT_DEATH',{unit:u,dying:u,killer,player:u.owner});if(!u.removed)this.removeUnit(u,true);}
  snapshot(){
    return {
      time:this.time,status:this.status,wave:this.globals.udg_waves,lives:this.globals.udg_lives,environment:{nightUntil:this.nightUntil},
      mode:this.globals.udg_yxmode,difficulty:this.globals.udg_nandujibie,
      gameModes:{mode:this.globals.udg_yxmode,mode2:this.globals.udg_mode2anniu,mode3:this.globals.udg_mode3anniu,skillChance:this.globals.udg_jinengsjlv,difficulty:this.globals.udg_nandujibie},
      players:this.players.filter(p=>p.id<4).map(p=>({slot:p.id,name:p.name,active:p.active,connected:p.connected??p.active,gold:p.gold,goldDrain:Boolean(this.globals.udg_baijia[p.id+1]),lumber:p.lumber,food:p.food,cap:p.cap,startX:p.startX,startY:p.startY,tech:{...p.tech},classId:this.globals.udg_playerzz[p.id],kills:this.globals.udg_Kills[p.id+1],sets:this.equipmentState(p.id)})),
      units:[...this.units.values()].filter(u=>!u.removed||u.corpseUntil>this.time).map(u=>({id:u.hid,type:u.raw,owner:u.owner.id,ownerColor:u.owner.color,x:u.x,y:u.y,facing:u.facing,moving:Boolean(u.move&&!u.death),moveSpeed:this.moveSpeed(u),canMove:this.canMove(u),dead:Boolean(u.death),deathDuration:Number(this.data.units[u.raw]?.deathDuration)||2.5,hp:u.hp,maxHp:u.maxHp,mana:u.mana,maxMana:u.maxMana,armor:(u.stats?.armor??(Number(this.data.units[u.raw]?.def)||0))+(u.auraArmor||0),attackRange:u.stats?.attackRange??(Number(this.data.units[u.raw]?.rangeN1)||0),merit:u.data,building:u.building,abilities:[...u.abilities].map(([id,level])=>({id:rawId(id),level,cooldown:Math.max(0,(u.castCooldown.get(id)||0)-this.time),autocastSupported:String(this.data.units[u.raw]?.auto||'_').split(',').includes(rawId(id)),autocast:Boolean(u.autoCast?.has(id))})),items:u.inventory.map(i=>({id:i.hid,type:i.raw,charges:i.charges})),target:u.target?.hid,construct:u.constructEnd?Math.max(0,u.constructEnd-this.time):0,upgrade:u.upgradeTo?{type:u.upgradeTo,remaining:Math.max(0,u.upgradeEnd-this.time)}:null,itemBuild:u.pendingItemBuild||null})),
      items:[...this.items.values()].filter(i=>!i.carrier&&!i.removed).map(i=>({id:i.hid,type:i.raw,x:i.x,y:i.y})),
      dialogs:[...this.dialogs.values()].filter(d=>d.visible.size).map(d=>({id:d.hid,title:clean(d.title),players:[...d.visible],buttons:d.buttons.map(b=>({id:b.hid,text:clean(b.text)}))})),
      messages:this.messages,effects:this.effects,quests:this.quests,errors:this.errors.map(e=>({time:e.time,message:e.message.split('\n')[0]}))
    };
  }
}
