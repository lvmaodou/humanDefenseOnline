import {fourCC,rawId} from './runtime.js';

const orders={852089:'AHbz',852095:'AHtb',852096:'AHtc',852097:'AHwe',852119:'AOcl',852125:'AOsh',852128:'AOww',852164:'Aroa',852171:'AEer',852183:'Alsh',852218:'AUcs',852224:'AUin',852238:'ANrf',852526:'AEfk',852555:'AUim',852556:'AUls',852580:'ANbf',852583:'ANdo',852587:'ANfl',852588:'ANht',852591:'ANmo',852593:'ANst',852652:'ANcs',852658:'ANsy',852667:'ANlm'};
const passiveCodes=new Set(['AHbh','AOcr','AEev','ANca','Afae','Avul','AInv','Aroc','Amgl','Afra','Afrz','Aven','Apxf','AIat','AIab','AIcb','AIfb','AIbl','AIva','AIas','Ablo','AHad','AEar','AOae','AUau','ANms','AIaa','Aloc']);
export function installCombat(V){
  const N=V.natives;
  const hasWeapon=d=>Boolean(d?.atkType1&&d.atkType1!=='_'&&d?.weapTp1&&d.weapTp1!=='_'&&Number.isFinite(Number(d.cool1)));
  const canTarget=(attacker,target,d)=>{
    if(!target||target.removed||target.death||target.abilities.has(fourCC('Avul'))||attacker.owner.team===target.owner.team)return false;
    const targetData=V.data.units[target.raw]||{},tags=String(d.targs1||'ground,air').split(',');
    if(!tags.includes(targetData.movetp==='fly'?'air':'ground'))return false;
    return !target.building||tags.includes('structure');
  };
  const weaponDamage=(d)=>{
    const base=Number(d.dmgplus1)||0,dice=Number(d.dice1)||0,sides=Number(d.sides1)||1;
    return base+dice*(1+Math.floor(V.random()*sides));
  };
  V.ability=id=>{const key=rawId(id),raw=V.data.abilityData[key]||{},over=V.data.abilities[key];if(!over)return raw;const base={...V.data.abilityData[over.base],...raw};const map={anam:'Name',acdn:'Cool',amcs:'Cost',aare:'Area',aran:'Rng',adur:'Dur',ahdu:'HeroDur'};for(const [field,levels]of Object.entries(over.fields))for(const [level,value]of Object.entries(levels))base[(map[field]||field)+(level==='0'?'':level)]=value;return base;};
  V.near=(point,radius,team,enemy=true)=>[...V.units.values()].filter(u=>!u.death&&!u.removed&&(enemy?u.owner.team!==team:u.owner.team===team)&&Math.hypot(u.x-point.x,u.y-point.y)<=radius);
  V.randomItem=(level,kind)=>{const entries=Object.entries(V.data.items).filter(([id,d])=>Number(d.oldLevel??d.Level)===level&&d.pickRandom!==0&&(!kind||kind==='ITEM_TYPE_ANY'||d.class===kind));return entries.length?fourCC(entries[Math.floor(V.random()*entries.length)][0]):0;};
  V.createItem=(type,p)=>{const id=rawId(type);if(!V.data.items[id])return null;const i=V.handle({type:fourCC(type),raw:id,x:p?.x||0,y:p?.y||0,charges:Number(V.data.items[id].uses)||1});V.items.set(i.hid,i);V.effect('drop',p,p,{item:id});return i;};
  V.removeItem=i=>{if(!i)return;if(i.carrier)i.carrier.inventory=i.carrier.inventory.filter(x=>x!==i);i.removed=true;V.items.delete(i.hid);};
  V.dropItem=(u,i)=>{if(!u||!i)return;u.inventory=u.inventory.filter(x=>x!==i);i.carrier=null;i.x=u.x;i.y=u.y;V.fire('EVENT_PLAYER_UNIT_DROP_ITEM',{unit:u,item:i,player:u.owner});};
  V.pickup=(u,i)=>{if(!u||!i||i.carrier||i.removed||u.inventory.length>=6||Math.hypot(u.x-i.x,u.y-i.y)>Number(V.rules.PickupItemRange))return false;i.carrier=u;u.inventory.push(i);V.fire('EVENT_PLAYER_UNIT_PICKUP_ITEM',{unit:u,item:i,player:u.owner});return true;};
  V.buy=(slot,u,item)=>{if(!u||!item||u.owner.id!==slot||!item.sellable)throw new Error('该物品无法购买');const shop=[...V.units.values()].find(s=>{const d=V.data.units[s.raw];return !s.removed&&s.owner.id>=8&&String(d.Sellitems||'').split(',').includes(item.itemID)&&Math.hypot(s.x-u.x,s.y-u.y)<=1200;});if(!shop)throw new Error('请靠近出售此物品的商店');if(u.inventory.length>=6)throw new Error('物品栏已满');const cost=Number(item.goldcost)||0;if(u.owner.gold<cost)throw new Error('金币不足');u.owner.gold-=cost;const i=V.createItem(V.fourCC(item.itemID),u);V.pickup(u,i);return i;};
  V.useItem=(u,i,p)=>{if(!u||!i||i.carrier!==u)return false;const d=V.data.items[i.raw];for(const id of String(d.abilList||'').split(',')){const a=V.ability(id);if(a.code==='AIbl'){const type=a.UnitID1||a.DataA1;if(typeof type==='string'&&V.data.units[type]){const built=V.createUnit(u.owner,fourCC(type),p.x,p.y,u.facing);V.fire('EVENT_PLAYER_UNIT_CONSTRUCT_FINISH',{unit:built,player:u.owner});}}else V.cast(u,fourCC(id),null,p,true);}i.charges--;if(i.charges<=0&&d.perishable)V.removeItem(i);return true;};
  V.cast=(u,id,target=null,point=null,force=false)=>{
    if(!u||u.removed||u.death)return false;const a=V.ability(id),level=u.abilities.get(id)||1,suffix=String(level),get=(key,fallback=0)=>Number(a[key+suffix]??a[key+'1']??fallback),code=a.code;const p=point||target||u;
    if(!force&&((u.castCooldown.get(id)||0)>V.time||u.mana<get('Cost')))return false;
    if(u.casting===id)return false;
    u.mana-=get('Cost');u.castCooldown.set(id,V.time+get('Cool'));u.casting=id;
    const ctx={unit:u,caster:u,ability:id,target,player:u.owner,point:p};
    V.fire('EVENT_PLAYER_UNIT_SPELL_CAST',ctx);V.fire('EVENT_PLAYER_UNIT_SPELL_EFFECT',ctx);u.casting=null;
    if(u.removed||u.death)return true;
    const visual={...V.data.abilityStrings[code],...V.data.abilityStrings[rawId(id)]};V.effect('spell',u,p,{ability:rawId(id),code,area:get('Area'),duration:get('Dur'),visual,animationNames:visual.Animnames});
    const dmg=get('DataA'),area=get('Area',200),duration=get('Dur'),enemies=()=>V.near(p,area,u.owner.team);
    const aoe=(center,radius,value,stun=0)=>{for(const e of V.near(center,radius,u.owner.team)){V.damage(u,e,value);if(stun)e.buffs.push({kind:'stun',until:V.time+stun});}};
    const summon=(type,count,life)=>{if(!type||!V.data.units[type])return;for(let i=0;i<count;i++){const s=V.createUnit(u.owner,fourCC(type),p.x+(i%3)*24,p.y+Math.floor(i/3)*24,u.facing);s.summoner=u;if(life)s.expires=V.time+life;s.useFood=false;s.owner.food-=s.food;s.food=0;s.target=target;s.ai=true;}};
    const periodic=(center,radius,damage,interval,count,kind)=>{V.zones??=[];V.zones.push({source:u,center:{x:center.x,y:center.y},radius,damage,interval,next:V.time+interval,count,kind});};
    if(code==='AOcl'){
      const candidates=V.near(p,get('Area',500),u.owner.team);let previous=u,damage=dmg;let chain=target&&!target.removed?[target,...candidates.filter(e=>e!==target)]:candidates;
      for(const e of chain.slice(0,get('DataB',1))){V.effect('lightning',previous,e,{ability:rawId(id)});V.damage(u,e,damage);damage*=1-get('DataC');previous=e;}
    }else if(['AOsh','AUcs','ANbf','AUim'].includes(code)){
      const dx=p.x-u.x,dy=p.y-u.y,len=Math.hypot(dx,dy)||1,length=get('DataC',get('Rng',800)),width=area||100;
      for(const e of V.near(u,length+width,u.owner.team)){const ex=e.x-u.x,ey=e.y-u.y,along=(ex*dx+ey*dy)/len,side=Math.abs(ex*dy-ey*dx)/len;if(along>=-40&&along<=length&&side<=width){V.damage(u,e,dmg);if(code==='AUim')e.buffs.push({kind:'stun',until:V.time+duration});}}
    }else if(['AHbz','ANrf','ANst','ANcs'].includes(code)){
      const count=code==='AHbz'?get('DataA',1):code==='ANcs'?get('DataC',1):Math.max(1,Math.ceil(duration/(get('DataD',1)||1)));
      const damage=code==='AHbz'?get('DataB'):code==='ANcs'?get('DataA'):get('DataA');periodic(p,area,damage,Math.max(.1,get('DataD',.5)),count,code);
    }else if(['AHtb','AUfn'].includes(code)){if(target){V.damage(u,target,dmg);target.buffs.push({kind:'stun',until:V.time+duration});}if(code==='AUfn')aoe(p,area,get('DataB'));
    }else if(code==='AHtc'){aoe(u,area,dmg);for(const e of V.near(u,area,u.owner.team))e.buffs.push({kind:'slow',factor:1-get('DataC'),until:V.time+duration});
    }else if(code==='AEer'){if(target){target.buffs.push({kind:'root',until:V.time+duration});periodic(target,30,get('DataA'),1,Math.ceil(duration),code);}}
    else if(['AOww','AUls'].includes(code)){periodic(u,area||600,get('DataA'),1,Math.max(1,Math.ceil(duration)),code);}
    else if(code==='AEfk'){aoe(u,area,dmg);}
    else if(['ANfl','ANdo'].includes(code)){if(target){const n=get('DataC',duration)||duration;periodic(target,code==='ANfl'?area:25,get('DataA'),1,Math.max(1,Math.ceil(n)),code);if(code==='ANfl')target.buffs.push({kind:'stun',until:V.time+n});}}
    else if(code==='ANmo'){periodic(p,area||500,get('DataA'),1,Math.max(1,Math.ceil(duration)),code);}
    else if(code==='AUin'){aoe(p,area,get('DataA'),duration);summon(a.UnitID1||a.DataB1,1,get('DataC',60));}
    else if(['AHwe','ANlm','ANsy'].includes(code)){summon(a.UnitID1||a.DataA1,code==='AHwe'?get('DataA',1):1,duration||get('DataB',60));}
    else if(['Aroa','Ablo','Ainf'].includes(code)){for(const friend of V.near(u,area||500,u.owner.team,false))friend.buffs.push({kind:'power',damage:get('DataA'),speed:get('DataB'),until:V.time+duration});}
    else if(code==='ANht'){for(const e of V.near(u,area,u.owner.team))e.buffs.push({kind:'weaken',damage:get('DataA'),until:V.time+duration});}
    else if(['Aslo','Afae','Acri','Acyc','Abli','Aens','Aprg','Afra'].includes(code)){if(target)target.buffs.push({kind:code==='Acyc'?'stun':'slow',factor:1-get('DataA',.3),until:V.time+duration});}
    else if(code==='AHds'){if(rawId(id)==='A096')u.facing=(u.facing+90)%360;}
    else if(code==='AEbl'){u.x=p.x;u.y=p.y;V.enterRegions(u);}
    return true;
  };
  const order=(u,id,target,point)=>{
    if(!u||u.removed)return false;
    if(id===851986||id===851971){if(point){u.move={x:point.x,y:point.y};u.order=id;}return true;}
    if(id===851983){u.target=target;return true;}
    const code=orders[id],ability=[...u.abilities.keys()].find(key=>V.ability(key).code===code);
    if(ability)return V.cast(u,ability,target,point);
    return false;
  };
  N.IssueImmediateOrderById=(u,id)=>order(u,id);N.IssueTargetOrderById=(u,id,target)=>order(u,id,target);N.IssuePointOrderByIdLoc=(u,id,p)=>order(u,id,null,p);N.IssueNeutralTargetOrder=(player,u,name,target)=>{u.target=target;return true;};
  const oldRemove=N.UnitRemoveAbilityBJ;N.UnitRemoveAbilityBJ=(id,u)=>{u?.castCooldown.delete(id);return oldRemove(id,u);};
  V.updateCombat=dt=>{
    for(const zone of V.zones||[]){if(zone.count>0&&zone.next<=V.time){zone.next+=zone.interval;zone.count--;for(const e of V.near(zone.center,zone.radius,zone.source.owner.team))V.damage(zone.source,e,zone.damage);V.effect('area',zone.center,zone.center,{code:zone.kind,area:zone.radius});}}
    V.zones=(V.zones||[]).filter(z=>z.count>0);
    for(const u of [...V.units.values()]){
      if(u.removed||u.death)continue;if(u.expires&&u.expires<=V.time){V.kill(u);continue;}
      if(u.constructEnd){if(u.constructEnd>V.time)continue;u.constructEnd=null;u.constructed=true;V.fire('EVENT_PLAYER_UNIT_CONSTRUCT_FINISH',{unit:u,player:u.owner});}
      const d=V.data.units[u.raw],stats=u.stats||V.unitStats(u);u.buffs=u.buffs.filter(b=>b.until>V.time);u.hp=Math.min(u.maxHp,u.hp+stats.hpRegen*dt);u.mana=Math.min(u.maxMana,u.mana+stats.manaRegen*dt);
      if(u.buffs.some(b=>b.kind==='stun'))continue;
      const baseSpeed=V.moveSpeed(u),slow=u.buffs.filter(b=>b.kind==='slow').reduce((n,b)=>n*b.factor,1),speed=baseSpeed?Math.max(Number(V.rules.MinUnitSpeed)||100,baseSpeed*slow):0;
      if(u.move&&!u.buffs.some(b=>b.kind==='root')){const dx=u.move.x-u.x,dy=u.move.y-u.y,distance=Math.hypot(dx,dy),step=speed*dt;if(distance<=step){u.x=u.move.x;u.y=u.move.y;u.move=null;}else if(distance){u.x+=dx/distance*step;u.y+=dy/distance*step;}u.facing=Math.atan2(dy,dx)*180/Math.PI;V.enterRegions(u);}
      if(!hasWeapon(d)||u.removed)continue;
      u.cooldown-=dt;if(u.cooldown>0)continue;
       const range=stats.attackRange||100;
      let target=u.target;if(!canTarget(u,target,d)||Math.hypot(target.x-u.x,target.y-u.y)>range)target=V.near(u,range,u.owner.team).filter(e=>canTarget(u,e,d)).sort((a,b)=>Math.hypot(a.x-u.x,a.y-u.y)-Math.hypot(b.x-u.x,b.y-u.y))[0];
       if(!target)continue;
      u.target=target;
      for(const id of [...u.abilities.keys()]){const a=V.ability(id);if(a.code==='Afae'&&(u.castCooldown.get(id)||0)<=V.time&&u.mana>=Number(a.Cost1||0))V.cast(u,id,target);}
      V.fire('EVENT_PLAYER_UNIT_ATTACKED',{unit:target,attacker:u,player:target.owner});V.fire('EVENT_UNIT_ATTACKED',{unit:target,attacker:u,player:target.owner});
      if(u.removed||target.removed||target.death)continue;let damage=weaponDamage(d);
      for(const b of u.buffs)if(b.kind==='power')damage*=1+b.damage;
      const passives=[...u.abilities.keys()].map(id=>V.ability(id));
      for(const a of passives)if(a.code==='AOcr'&&V.random()*100<Number(a.DataA1||0))damage*=Number(a.DataB1)||1;
    V.effect('projectile',u,target,{model:d.Missileart,weaponType:d.weapTp1,attackType:d.atkType1,unit:u.raw,missileSpeed:Number(d.Missilespeed)||0,missileArc:Number(d.Missilearc)||0,launch:[Number(d.launchX)||0,Number(d.launchY)||0,Number(d.launchZ)||0],impactZ:Number(V.data.units[target.raw]?.impactZ)||0});V.damage(u,target,damage,true,'DAMAGE_TYPE_NORMAL',d.atkType1);
      for(const a of passives){if(a.code==='ANca'){for(const e of V.near(target,Number(a.Area1)||0,u.owner.team))if(e!==target)V.damage(u,e,damage*(Number(a.DataA1)||0));}else if(a.code==='AHbh'&&V.random()*100<Number(a.DataA1||0)){V.damage(u,target,Number(a.DataC1)||0);target.buffs.push({kind:'stun',until:V.time+(Number(a.Dur1)||0)});}else if(['Afra','Afrz'].includes(a.code)){target.buffs.push({kind:'slow',factor:1-(Number(a.DataA1)||.35),until:V.time+(Number(a.Dur1)||2)});}}
      if(d.weapTp1==='msplash'){for(const e of V.near(target,Number(d.Farea1)||0,u.owner.team))if(e!==target)V.damage(u,e,damage,true);}
      u.cooldown=Math.max(.05,Number(d.cool1)||1);
    }
  };
}
