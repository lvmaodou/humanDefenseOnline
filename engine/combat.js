import {fourCC,rawId} from './runtime.js';

const orders={852089:'AHbz',852095:'AHtb',852096:'AHtc',852097:'AHwe',852119:'AOcl',852125:'AOsh',852128:'AOww',852164:'Aroa',852171:'AEer',852183:'Alsh',852218:'AUcs',852224:'AUin',852238:'ANrf',852526:'AEfk',852555:'AUim',852556:'AUls',852580:'ANbf',852583:'ANdo',852587:'ANfl',852588:'ANht',852591:'ANmo',852593:'ANst',852652:'ANcs',852658:'ANsy',852667:'ANlm'};
const passiveCodes=new Set(['AHbh','AOcr','AEev','ANca','Afae','Avul','AInv','Aroc','Amgl','Afra','Afrz','Aven','Apxf','AIat','AIab','AIcb','AIfb','AIbl','AIva','AIas','Ablo','AHad','AEar','AOae','AUau','ANms','AIaa','Aloc']);
export function installCombat(V){
  const N=V.natives;
  const hasWeapon=d=>Boolean(d?.atkType1&&d.atkType1!=='_'&&d?.weapTp1&&d.weapTp1!=='_'&&Number.isFinite(Number(d.cool1)));
  const canTarget=(attacker,target,d)=>{
    if(!target||target.removed||target.death||target.abilities.has(fourCC('Avul'))||attacker.owner.team===target.owner.team)return false;
    const targetData=V.data.units[target.raw]||{},tags=String(d.targs1||'ground,air').split(',');
    const flying=targetData.movetp==='fly',canHitAir=flying&&([...attacker.abilities.keys()].some(id=>V.ability(id).code==='Aroc')||(attacker.itemStats||V.itemStats(attacker)).airAttack);
    if(!tags.includes(flying?'air':'ground')&&!canHitAir)return false;
    return !target.building||tags.includes('structure');
  };
  const weaponDamage=(d)=>{
    const base=Number(d.dmgplus1)||0,dice=Number(d.dice1)||0,sides=Number(d.sides1)||1;
    return base+dice*(1+Math.floor(V.random()*sides));
  };
  V.ability=id=>{const key=rawId(id),raw=V.data.abilityData[key]||{},over=V.data.abilities[key];if(!over)return raw;const base={...V.data.abilityData[over.base],...raw};const map={anam:'Name',acdn:'Cool',amcs:'Cost',aare:'Area',aran:'Rng',adur:'Dur',ahdu:'HeroDur'};for(const [field,levels]of Object.entries(over.fields))for(const [level,value]of Object.entries(levels))base[(map[field]||field)+(level==='0'?'':level)]=value;return base;};
  V.near=(point,radius,team,enemy=true)=>(V.nearbyUnits?.(point,radius)||[...V.units.values()]).filter(u=>!u.death&&!u.removed&&(enemy?u.owner.team!==team:u.owner.team===team)&&Math.hypot(u.x-point.x,u.y-point.y)<=radius);
  V.randomItem=(level,kind)=>{const entries=Object.entries(V.data.items).filter(([id,d])=>Number(d.oldLevel??d.Level)===level&&d.pickRandom!==0&&(!kind||kind==='ITEM_TYPE_ANY'||d.class===kind));return entries.length?fourCC(entries[Math.floor(V.random()*entries.length)][0]):0;};
  V.createItem=(type,p)=>{const id=rawId(type);if(!V.data.items[id])return null;const i=V.handle({type:fourCC(type),raw:id,x:p?.x||0,y:p?.y||0,charges:Number(V.data.items[id].uses)||1});V.items.set(i.hid,i);V.effect('drop',p,p,{item:id});return i;};
  V.removeItem=i=>{if(!i)return;const carrier=i.carrier;if(carrier){carrier.inventory=carrier.inventory.filter(x=>x!==i);i.carrier=null;V.refreshItemStats(carrier);}i.removed=true;V.items.delete(i.hid);};
  V.dropItem=(u,i)=>{if(!u||!i)return;u.inventory=u.inventory.filter(x=>x!==i);i.carrier=null;i.x=u.x;i.y=u.y;V.refreshItemStats(u);V.fire('EVENT_PLAYER_UNIT_DROP_ITEM',{unit:u,item:i,player:u.owner});};
  V.pickup=(u,i)=>{if(!u||!i||i.carrier||i.removed||u.inventory.length>=6||Math.hypot(u.x-i.x,u.y-i.y)>Number(V.rules.PickupItemRange))return false;i.carrier=u;u.inventory.push(i);V.refreshItemStats(u);V.fire('EVENT_PLAYER_UNIT_PICKUP_ITEM',{unit:u,item:i,player:u.owner});return true;};
  V.buy=(slot,u,item)=>{if(!u||!item||u.owner.id!==slot||!item.sellable)throw new Error('该物品无法购买');const shop=[...V.units.values()].find(s=>{const d=V.data.units[s.raw];return !s.removed&&s.owner.id>=8&&String(d.Sellitems||'').split(',').includes(item.itemID)&&Math.hypot(s.x-u.x,s.y-u.y)<=1200;});if(!shop)throw new Error('请靠近出售此物品的商店');if(u.inventory.length>=6)throw new Error('物品栏已满');const cost=Number(item.goldcost)||0;if(u.owner.gold<cost)throw new Error('金币不足');u.owner.gold-=cost;const i=V.createItem(V.fourCC(item.itemID),u);V.pickup(u,i);return i;};
  V.itemStats=u=>{
    const stats={damage:0,lifeSteal:0,fireDamage:0,fireArea:0,poisonDamage:0,poisonDuration:0,poisonInterval:1,armorReduction:0,armorDuration:0,orbSlowChance:0,orbSlowFactor:0,orbSlowDuration:0,airAttack:false,attributes:{strength:0,agility:0,intelligence:0}};
    for(const item of u?.inventory||[]){const def=V.data.items[item.raw]||{};for(const rawIdValue of String(def.abilList||'').split(',').filter(Boolean)){const a=V.ability(rawIdValue),get=key=>Number(a[`${key}1`]??a[key]??0);if(a.code==='AIab'){stats.attributes.strength+=get('DataA');stats.attributes.agility+=get('DataB');stats.attributes.intelligence+=get('DataC');}else if(a.code==='AIva')stats.lifeSteal+=get('DataA');else if(a.code==='AIfb'){stats.fireDamage+=get('DataA');stats.fireArea=Math.max(stats.fireArea,get('Area'));stats.airAttack=true;}else if(a.code==='AIcb'){stats.damage+=get('DataA');stats.armorReduction+=get('DataB');stats.armorDuration=Math.max(stats.armorDuration,get('Dur'));stats.airAttack=true;}else if(a.code==='AIpb'){stats.damage+=get('DataA');stats.airAttack=true;}else if(a.code==='Apo2'){stats.poisonDamage+=get('DataA');stats.poisonDuration=Math.max(stats.poisonDuration,get('Dur'));stats.poisonInterval=Math.max(.1,get('DataD')||1);}else if(a.code==='AIsb'){stats.damage+=get('DataA');stats.orbSlowChance=Math.max(stats.orbSlowChance,get('DataB'));stats.orbSlowFactor=Math.max(stats.orbSlowFactor,Math.min(100,get('DataD'))/100);stats.orbSlowDuration=Math.max(stats.orbSlowDuration,get('DataC'));stats.airAttack=true;}}}
    return stats;
  };
  V.refreshItemStats=u=>{if(u)u.itemStats=V.itemStats(u);};
  const mainHallRank={htow:0,ogre:0,unpl:0,etol:0,hkee:1,ostr:1,unp2:1,etoa:1,hcas:2,ofrt:2,etoe:2};
  const mainHall=player=>[...V.units.values()].filter(unit=>unit.owner===player&&!unit.removed&&!unit.death&&mainHallRank[unit.raw]!==undefined).sort((a,b)=>mainHallRank[b.raw]-mainHallRank[a.raw])[0];
  const teleport=(unit,point)=>{if(!point||!Number.isFinite(point.x)||!Number.isFinite(point.y))return false;let destination=point;if(V.pathfinder){const index=V.pathfinder.nearestWalkable(point.x,point.y);if(index<0)return false;destination=V.pathfinder.center(index);}V.moveUnit(unit,destination.x,destination.y);unit.move=null;return true;};
  V.useItem=(u,i,p)=>{
    if(!u||!i||i.carrier!==u||i.removed)return false;const d=V.data.items[i.raw];let used=false;
    for(const id of String(d.abilList||'').split(',').filter(Boolean)){
      const a=V.ability(id),code=a.code,get=key=>Number(a[`${key}1`]??a[key]??0),target=V.units.get(p?.targetId)||u,point=p||u;
      if(code==='AIhe'){target.hp=Math.min(target.maxHp,target.hp+get('DataA'));V.effect('heal',u,target,{item:i.raw,value:get('DataA')});used=true;}
      else if(code==='AIma'){target.mana=Math.min(target.maxMana,target.mana+get('DataA'));V.effect('mana',u,target,{item:i.raw,value:get('DataA')});used=true;}
      else if(code==='AIha'){for(const friend of V.near(u,get('Area',600),u.owner.team,false)){friend.hp=Math.min(friend.maxHp,friend.hp+get('DataA'));V.effect('heal',u,friend,{item:i.raw,value:get('DataA')});}used=true;}
      else if(code==='AIrl'||code==='AIrg'){
        const duration=Math.max(1,get('Dur',45)),healthAmount=get('DataA'),manaAmount=get('DataB'),targets=get('Area')>0?V.near(u,get('Area'),u.owner.team,false):[u];
        if(healthAmount>0)for(const friend of targets)friend.buffs.push({kind:'regen',amount:healthAmount/duration,until:V.time+duration});
        if(manaAmount>0)for(const friend of targets)friend.buffs.push({kind:'mana-regen',amount:manaAmount/duration,until:V.time+duration});
        if(healthAmount>0||manaAmount>0){V.effect(healthAmount>0?'heal':'mana',u,u,{item:i.raw,value:healthAmount||manaAmount,duration,area:get('Area')});used=true;}
      }
      else if(code==='AIlm'){u.level=Math.min(Number(V.rules.MaxHeroLevel)||100,u.level+Math.max(1,get('DataA')));V.effect('level',u,u,{item:i.raw,level:u.level});used=true;}
      else if(code==='AIsa'){
        const duration=Math.max(.1,get('Dur',10)),factor=Math.max(1,get('DataA',2));for(const friend of V.near(u,get('Area',600),u.owner.team,false))friend.buffs.push({kind:'haste',factor,until:V.time+duration});
        V.effect('spell',u,u,{item:i.raw,ability:id,area:get('Area',600),duration});used=true;
      }
      else if(code==='AItb'){
        const duration=Math.max(.1,get('Dur',20)),radius=get('Area',1000);for(const enemy of V.near(u,radius,u.owner.team))enemy.buffs.push({kind:'revealed',source:u,until:V.time+duration});
        V.effect('spell',u,u,{item:i.raw,ability:id,area:radius,duration});used=true;
      }
      else if(code==='AIct'){
        V.nightUntil=Math.max(V.nightUntil,V.time+Math.max(.1,get('Dur',30)));V.effect('eclipse',u,u,{item:i.raw,duration:get('Dur',30)});used=true;
      }
      else if(code==='Aami'){
        const duration=Math.max(.1,get('Dur',15));u.buffs.push({kind:'magicImmune',until:V.time+duration});V.effect('spell',u,u,{item:i.raw,ability:id,duration});used=true;
      }
      else if(code==='AIrd'){
        const corpse=V.units.get(p?.targetId),unitId=a.UnitID1||a.DataC1,duration=Math.max(.1,get('Dur',65)),count=Math.max(1,Math.floor(get('DataA',2)));
        if(corpse?.death&&corpse.corpseUntil>V.time&&Math.hypot(corpse.x-u.x,corpse.y-u.y)<=get('Rng',600)&&unitId&&V.data.units[unitId]){
          for(let n=0;n<count;n++){const skeleton=V.createUnit(u.owner,fourCC(unitId),corpse.x+(n-(count-1)/2)*32,corpse.y,u.facing);skeleton.expires=V.time+duration;skeleton.summoner=u;skeleton.ai=true;skeleton.useFood=false;u.owner.food-=skeleton.food;skeleton.food=0;skeleton.target=V.near(skeleton,2000,u.owner.team)[0]||null;}
          V.effect('spell',u,corpse,{item:i.raw,ability:id,unit:unitId,count,duration});used=true;
        }
      }
      else if(code==='ANpr'||code==='ANsa'){
        const recipient=V.units.get(p?.targetId),home=mainHall(u.owner),destination=home|| (Number.isFinite(u.owner.startX)&&Number.isFinite(u.owner.startY)?{x:u.owner.startX,y:u.owner.startY}:null);
        if(recipient&&Math.hypot(recipient.x-u.x,recipient.y-u.y)<=get('Rng',700)&&destination&&teleport(recipient,destination)){
          if(code==='ANsa'){
            const duration=Math.max(.1,get('DataA',15));recipient.buffs.push({kind:'stun',until:V.time+duration},{kind:'sanctuary',rate:Math.max(0,get('DataE',15)),next:V.time+1,until:Infinity});
          }
          V.effect('spell',u,recipient,{item:i.raw,ability:id,duration:code==='ANsa'?get('DataA',15):0});used=true;
        }
      }
      else if(code==='Ablp'){
        const radius=get('Area',350),duration=Math.max(.1,get('Dur',.08));if(Math.hypot(point.x-u.x,point.y-u.y)<=get('Rng',500)){V.blightZones??=[];V.blightZones.push({x:point.x,y:point.y,radius,until:V.time+duration,source:u});V.effect('area',u,point,{item:i.raw,ability:id,area:radius,duration});used=true;}
      }
      else if(code==='Amec'){
        const count=Math.max(1,Math.floor(get('DataA',1))),unitId=V.data.units.ncrb?'ncrb':null;
        if(unitId){for(let index=0;index<count;index++){const scout=V.createUnit(u.owner,fourCC(unitId),u.x+(index-(count-1)/2)*32,u.y,u.facing);scout.summoner=u;scout.mechanicalCritter=true;scout.ai=false;scout.useFood=false;u.owner.food-=scout.food;scout.food=0;}V.effect('summon',u,u,{item:i.raw,ability:id,unit:unitId,count});used=true;}
      }
      else if(code==='AItp'){
        const building=p?.targetId!==undefined&&target!==u&&target.building&&target.owner.team===u.owner.team?target:null,requested=building||{x:u.owner.startX??p?.x??u.x,y:u.owner.startY??p?.y??u.y};
        if(!teleport(u,requested))return false;V.effect('camera',u,u,{player:u.owner.id,operation:'pan',x:u.x,y:u.y});used=true;
      }
      else if(code==='AIbl'){
        const unitId=String(a.UnitID1||a.DataA1||'').split(',').filter(Boolean)[0];
        if(Math.hypot(point.x-u.x,point.y-u.y)<=get('Rng',100)&&unitId&&V.data.units[unitId]){const built=V.createUnit(u.owner,fourCC(unitId),point.x,point.y,u.facing);built.expires=V.time+Math.max(.1,get('Dur',5));built.summoner=u;built.ai=true;V.fire('EVENT_PLAYER_UNIT_CONSTRUCT_FINISH',{unit:built,player:u.owner});V.effect('spell',u,built,{item:i.raw,ability:id,unit:unitId,duration:get('Dur',5)});used=true;}
      }
      else used=V.cast(u,fourCC(id),null,point,true)||used;
    }
    if(!used)return false;i.charges=Math.max(0,i.charges-1);if(i.charges===0&&d.perishable)V.removeItem(i);return true;
  };
  V.cast=(u,id,target=null,point=null,force=false)=>{
    if(!u||u.removed||u.death)return false;const a=V.ability(id),level=u.abilities.get(id)||1,suffix=String(level),get=(key,fallback=0)=>Number(a[key+suffix]??a[key+'1']??fallback),code=a.code;const p=point||target||u;
    if(!force&&((u.castCooldown.get(id)||0)>V.time||u.mana<get('Cost')))return false;
    if(u.casting===id)return false;
    if(!force)u.mana-=get('Cost');u.castCooldown.set(id,V.time+get('Cool'));u.casting=id;
    const ctx={unit:u,caster:u,ability:id,target,player:u.owner,point:p};
    V.fire('EVENT_PLAYER_UNIT_SPELL_CAST',ctx);V.fire('EVENT_PLAYER_UNIT_SPELL_EFFECT',ctx);u.casting=null;
    if(u.removed||u.death)return true;
    const visual={...V.data.abilityStrings[code],...V.data.abilityStrings[rawId(id)]};V.effect('spell',u,p,{ability:rawId(id),code,area:get('Area'),duration:get('Dur'),visual,animationNames:visual.Animnames});
    const dmg=get('DataA'),area=get('Area',200),duration=get('Dur'),enemies=()=>V.near(p,area,u.owner.team);
    const aoe=(center,radius,value,stun=0)=>{for(const e of V.near(center,radius,u.owner.team)){V.damage(u,e,value,false,'DAMAGE_TYPE_MAGIC','spells');if(stun)e.buffs.push({kind:'stun',until:V.time+stun});}};
    const summon=(type,count,life)=>{if(!type||!V.data.units[type])return;for(let i=0;i<count;i++){const s=V.createUnit(u.owner,fourCC(type),p.x+(i%3)*24,p.y+Math.floor(i/3)*24,u.facing);s.summoner=u;if(life)s.expires=V.time+life;s.useFood=false;s.owner.food-=s.food;s.food=0;s.target=target;s.ai=true;}};
    const periodic=(center,radius,damage,interval,count,kind)=>{V.zones??=[];V.zones.push({source:u,center:{x:center.x,y:center.y},radius,damage,interval,next:V.time+interval,count,kind});};
    if(code==='AOcl'){
      const candidates=V.near(p,get('Area',500),u.owner.team);let previous=u,damage=dmg;let chain=target&&!target.removed?[target,...candidates.filter(e=>e!==target)]:candidates;
      for(const e of chain.slice(0,get('DataB',1))){V.effect('lightning',previous,e,{ability:rawId(id)});V.damage(u,e,damage,false,'DAMAGE_TYPE_MAGIC','spells');damage*=1-get('DataC');previous=e;}
    }else if(['AOsh','AUcs','ANbf','AUim'].includes(code)){
      const dx=p.x-u.x,dy=p.y-u.y,len=Math.hypot(dx,dy)||1,length=get('DataC',get('Rng',800)),width=area||100;
      for(const e of V.near(u,length+width,u.owner.team)){const ex=e.x-u.x,ey=e.y-u.y,along=(ex*dx+ey*dy)/len,side=Math.abs(ex*dy-ey*dx)/len;if(along>=-40&&along<=length&&side<=width){V.damage(u,e,dmg,false,'DAMAGE_TYPE_MAGIC','spells');if(code==='AUim')e.buffs.push({kind:'stun',until:V.time+duration});}}
    }else if(['AHbz','ANrf','ANst','ANcs'].includes(code)){
      const count=code==='AHbz'?get('DataA',1):code==='ANcs'?get('DataC',1):Math.max(1,Math.ceil(duration/(get('DataD',1)||1)));
      const damage=code==='AHbz'?get('DataB'):code==='ANcs'?get('DataA'):get('DataA');periodic(p,area,damage,Math.max(.1,get('DataD',.5)),count,code);
    }else if(['AHtb','AUfn'].includes(code)){if(target){V.damage(u,target,dmg,false,'DAMAGE_TYPE_MAGIC','spells');target.buffs.push({kind:'stun',until:V.time+duration});}if(code==='AUfn')aoe(p,area,get('DataB'));
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
    else if(['Aslo','Acri','Acyc','Abli','Aens','Aprg','Afra','Afrz'].includes(code)){if(target)target.buffs.push({kind:code==='Acyc'?'stun':'slow',factor:1-get('DataA',.3),until:V.time+Math.max(duration,.25)});}
    else if(code==='AHds'){if(rawId(id)==='A096')u.facing=(u.facing+90)%360;}
    else if(code==='AEbl'){u.x=p.x;u.y=p.y;V.enterRegions(u);}
    return true;
  };
  const order=(u,id,target,point)=>{
    if(!u||u.removed)return false;
    if(id===851986||id===851971){if(point)V.setMove(u,point,id);return true;}
    if(id===851983){u.target=target;return true;}
    const code=orders[id],ability=[...u.abilities.keys()].find(key=>V.ability(key).code===code);
    if(ability)return V.cast(u,ability,target,point);
    return false;
  };
  N.IssueImmediateOrderById=(u,id)=>order(u,id);N.IssueTargetOrderById=(u,id,target)=>order(u,id,target);N.IssuePointOrderByIdLoc=(u,id,p)=>order(u,id,null,p);N.IssueNeutralTargetOrder=(player,u,name,target)=>{u.target=target;return true;};
  const oldRemove=N.UnitRemoveAbilityBJ;N.UnitRemoveAbilityBJ=(id,u)=>{u?.castCooldown.delete(id);u?.autoCast?.delete(id);return oldRemove(id,u);};
  const attackExtras=(attacker,target,baseDamage,weapon,passives,bonus,now)=>{
    if(!target||target.death||target.removed)return;
    const dealt=V.damage(attacker,target,baseDamage, true,'DAMAGE_TYPE_NORMAL',weapon.atkType1);
    const items=attacker.itemStats||V.itemStats(attacker);
    if(items.lifeSteal>0&&dealt>0)attacker.hp=Math.min(attacker.maxHp,attacker.hp+dealt*items.lifeSteal);
    if(items.fireDamage>0){V.damage(attacker,target,items.fireDamage,false,'DAMAGE_TYPE_MAGIC','spells');if(items.fireArea>0)for(const enemy of V.near(target,items.fireArea,attacker.owner.team))if(enemy!==target)V.damage(attacker,enemy,items.fireDamage,false,'DAMAGE_TYPE_MAGIC','spells');}
    if(items.poisonDamage>0)target.buffs.push({kind:'poison',source:attacker,damage:items.poisonDamage,interval:items.poisonInterval,next:now+items.poisonInterval,until:now+Math.max(1,items.poisonDuration)});
    if(items.armorReduction>0)target.buffs.push({kind:'armor',amount:items.armorReduction,until:now+Math.max(1,items.armorDuration)});
    if(items.orbSlowChance>0&&V.random()*100<items.orbSlowChance)target.buffs.push({kind:'slow',factor:1-items.orbSlowFactor,until:now+Math.max(.1,items.orbSlowDuration)});
    for(const passive of passives){
      if(passive.code==='ANca'){for(const enemy of V.near(target,Number(passive[`Area${attacker.abilities.get(fourCC(passive.alias))||1}`])||200,attacker.owner.team))if(enemy!==target)V.damage(attacker,enemy,baseDamage*(Number(passive.DataA1)||0),true,'DAMAGE_TYPE_NORMAL',weapon.atkType1);}
      else if(passive.code==='AHbh'&&bonus?.ability===passive){const extra=Number(passive.DataC1)||0;if(extra)V.damage(attacker,target,extra,false,'DAMAGE_TYPE_MAGIC','spells');const duration=Number(passive.Dur1)||0;if(duration)target.buffs.push({kind:'stun',until:now+duration});}
      else if(passive.code==='Awar'&&V.random()*100<Number(passive.DataA1||0)){
        const inner=Number(passive.DataC1)||0,outer=Number(passive.DataD1)||inner,damage=Number(passive.DataB1)||0;
        for(const enemy of V.near(target,outer,attacker.owner.team)){if(enemy===target)continue;const distance=Math.hypot(enemy.x-target.x,enemy.y-target.y);if(distance<=inner)V.damage(attacker,enemy,damage,false,'DAMAGE_TYPE_NORMAL',weapon.atkType1);else if(distance<=outer)V.damage(attacker,enemy,damage*.5,false,'DAMAGE_TYPE_NORMAL',weapon.atkType1);}
        V.effect('area',attacker,target,{code:'Awar',area:outer});
      }
      else if(passive.code==='Aapl'&&attacker.autoCast?.has(fourCC(passive.alias))){
        const duration=Math.max(.1,Number(passive.DataA1)||3),damage=Number(passive.DataB1)||0,interval=.5;
        if(damage>0){V.zones??=[];V.zones.push({source:attacker,center:{x:target.x,y:target.y},radius:Number(passive.Area1)||500,damage,interval,next:now+interval,count:Math.ceil(duration/interval),kind:'Aapl'});V.effect('area',attacker,target,{code:'Aapl',area:Number(passive.Area1)||500,duration});}
      }
      else if(passive.code==='Apxf'){
        const abilityId=fourCC(passive.alias),level=attacker.abilities.get(abilityId)||1,suffix=String(level),cooldown=Number(passive[`Cool${suffix}`]??passive.Cool1)||.5,cost=Number(passive[`Cost${suffix}`]??passive.Cost1)||0;
        if((attacker.castCooldown.get(abilityId)||0)<=now&&attacker.mana>=cost){attacker.mana-=cost;attacker.castCooldown.set(abilityId,now+cooldown);V.damage(attacker,target,Number(passive[`DataA${suffix}`]??passive.DataA1)||0,false,'DAMAGE_TYPE_FIRE','spells');const duration=Math.max(.1,Number(passive[`Dur${suffix}`]??passive.Dur1)||5),burn=Number(passive[`DataB${suffix}`]??passive.DataB1)||0;if(burn>0){target.buffs=target.buffs.filter(buff=>buff.kind!=='burn'||buff.source!==attacker);target.buffs.push({kind:'burn',source:attacker,damage:burn,next:now+1,interval:1,until:now+duration});}V.effect('spell',attacker,target,{code:'Apxf',duration,damage:burn});}
      }
      else if(passive.code==='ANba'&&attacker.autoCast?.has(fourCC(passive.alias))){
        if(target.death&&target.killer===attacker&&!target.blackArrowRaised){target.blackArrowRaised=true;const unitId=passive.UnitID1||passive.DataC1,duration=Math.max(.1,Number(passive.Dur1)||5),count=Math.max(1,Math.floor(Number(passive.DataB1)||1));if(unitId&&V.data.units[unitId])for(let index=0;index<count;index++){const skeleton=V.createUnit(attacker.owner,fourCC(unitId),target.x+(index-(count-1)/2)*24,target.y,attacker.facing);skeleton.expires=now+duration;skeleton.summoner=attacker;skeleton.useFood=false;attacker.owner.food-=skeleton.food;skeleton.food=0;skeleton.ai=true;skeleton.target=V.near(skeleton,2000,attacker.owner.team)[0]||null;}V.effect('spell',attacker,target,{code:'ANba',unit:unitId,count,duration});}
      }
      else if(['Afra','Afrz'].includes(passive.code)){target.buffs.push({kind:'slow',factor:1-(Number(passive.DataA1)||.35),until:now+(Number(passive.Dur1)||2)});}
      else if(passive.code==='Aroc'){
        const count=Math.max(0,Math.min(8,Number(passive.DataC1)||0)),radius=Number(passive.Area1)||0;
        for(const enemy of V.near(target,radius,attacker.owner.team).filter(other=>other!==target&&V.data.units[other.raw]?.movetp==='fly').slice(0,count))V.damage(attacker,enemy,baseDamage*(Number(passive.DataA1)||1),true,'DAMAGE_TYPE_NORMAL',weapon.atkType1);
      }
    }
  };
  const splash=(projectile,center,skip)=>{
    const weapon=projectile.weapon,tiers=[['Farea1',1],['Harea1',.5],['Qarea1',.25]],seen=new Set(skip?[skip.hid]:[]);
    for(const [field,factor] of tiers){const radius=Number(weapon[field])||0;if(!radius)continue;for(const enemy of V.near(center,radius,projectile.attacker.owner.team)){if(seen.has(enemy.hid)||!canTarget(projectile.attacker,enemy,weapon))continue;if(Math.hypot(enemy.x-center.x,enemy.y-center.y)>radius)continue;seen.add(enemy.hid);V.damage(projectile.attacker,enemy,projectile.damage*factor,true,'DAMAGE_TYPE_NORMAL',weapon.atkType1);}}
  };
  const impact=projectile=>{
    const {attacker,target}=projectile,weapon=projectile.weapon,weaponType=String(weapon.weapTp1||''),alive=!attacker.removed&&!attacker.death&&!target.removed&&!target.death,directHit=alive&&projectile.hitTarget!==false;
    if(directHit)attackExtras(attacker,target,projectile.damage,weapon,projectile.passives,projectile.bonus,projectile.impactAt);
    const center=directHit?target:projectile.position;
    if(['msplash','artillery'].includes(weaponType))splash(projectile,center,directHit?target:null);
    if(['mline','aline'].includes(weaponType)){
      const from=projectile.start,to=projectile.aim,dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy)||1,spillDistance=Number(weapon.spillDist1)||length,width=Number(weapon.spillRadius1)||Number(weapon.Farea1)||48;
      for(const enemy of V.near(from,spillDistance+width,attacker.owner.team))if(enemy!==target&&canTarget(attacker,enemy,weapon)){const ex=enemy.x-from.x,ey=enemy.y-from.y,along=(ex*dx+ey*dy)/length,side=Math.abs(ex*dy-ey*dx)/length;if(along>=0&&along<=spillDistance&&side<=width)V.damage(attacker,enemy,projectile.damage,true,'DAMAGE_TYPE_NORMAL',weapon.atkType1);}
    }
    if(directHit&&weaponType==='mbounce'){
      const maxTargets=Math.max(1,Math.floor(Number(weapon.targCount1)||1)),range=Number(weapon.Farea1)||400,loss=Math.max(0,Math.min(1,Number(weapon.damageLoss1)||0)),visited=new Set([target.hid]);let previous=target,damage=projectile.damage;
      for(let count=1;count<maxTargets;count++){
        const next=V.near(previous,range,attacker.owner.team).filter(enemy=>!visited.has(enemy.hid)&&canTarget(attacker,enemy,weapon)).sort((a,b)=>Math.hypot(a.x-previous.x,a.y-previous.y)-Math.hypot(b.x-previous.x,b.y-previous.y))[0];if(!next)break;
        visited.add(next.hid);damage*=1-loss;V.effect('lightning',previous,next,{unit:attacker.raw,weaponType});attackExtras(attacker,next,damage,weapon,projectile.passives,null,projectile.impactAt);previous=next;
      }
    }
    const visibleHit=directHit||['msplash','artillery','mline','aline','mbounce'].includes(weaponType),extra={unit:attacker.raw,targetId:target.hid,model:String(weapon.Missileart||'').split(',')[0],projectileId:projectile.visualId};
    if(visibleHit)V.effect('impact',attacker,center,extra);else V.effect('miss',attacker,center,extra);
  };
  const updateProjectiles=()=>{
    for(const projectile of [...V.projectiles]){
      const elapsed=Math.max(0,V.time-projectile.lastUpdateAt);if(elapsed){
        const target=projectile.target;if(projectile.homing&&!target.removed&&!target.death)projectile.aim={x:target.x,y:target.y};
        const dx=projectile.aim.x-projectile.position.x,dy=projectile.aim.y-projectile.position.y,distance=Math.hypot(dx,dy),travel=projectile.speed*elapsed,step=Math.min(distance,travel);
        if(distance<=travel){projectile.position={...projectile.aim};const hitRadius=Math.max(24,Number(V.data.units[target.raw]?.collision)*16);projectile.hitTarget=!target.removed&&!target.death&&(projectile.homing||Math.hypot(target.x-projectile.position.x,target.y-projectile.position.y)<=hitRadius);projectile.impactAt=V.time;}
        else{projectile.position.x+=dx/distance*step;projectile.position.y+=dy/distance*step;projectile.impactAt=V.time+(distance-step)/projectile.speed;}
        projectile.travelled+=step;projectile.lastUpdateAt=V.time;
        const moved=Math.hypot(target.x-projectile.lastVisualTarget.x,target.y-projectile.lastVisualTarget.y)>=24;
        if((projectile.homing&&moved)||projectile.impactAt<=V.time){const progress=Math.min(1,projectile.travelled/projectile.initialDistance),launchZ=Number(projectile.weapon.launchZ)||0,impactZ=Number(V.data.units[target.raw]?.impactZ)||0;V.effect('projectile-update',projectile.position,target,{projectileId:projectile.visualId,remaining:Math.max(0,projectile.impactAt-V.time),missileSpeed:projectile.speed,progress,height:launchZ+(impactZ-launchZ)*progress,impactZ,weaponType:projectile.weapon.weapTp1});projectile.lastVisualTarget={x:target.x,y:target.y};}
      }
      if(projectile.impactAt<=V.time){V.projectiles.splice(V.projectiles.indexOf(projectile),1);impact(projectile);}
    }
  };
  V.updateCombat=dt=>{
    updateProjectiles();
    for(const zone of V.zones||[]){if(zone.count>0&&zone.next<=V.time){zone.next+=zone.interval;zone.count--;for(const e of V.near(zone.center,zone.radius,zone.source.owner.team))V.damage(zone.source,e,zone.damage,false,'DAMAGE_TYPE_MAGIC','spells');V.effect('area',zone.center,zone.center,{code:zone.kind,area:zone.radius});}}
    V.zones=(V.zones||[]).filter(z=>z.count>0);
    for(const u of [...V.units.values()]){
      if(u.removed||u.death)continue;if(u.expires&&u.expires<=V.time){V.kill(u);continue;}
      if(u.constructEnd){if(u.constructEnd>V.time)continue;u.constructEnd=null;u.constructed=true;V.fire('EVENT_PLAYER_UNIT_CONSTRUCT_FINISH',{unit:u,player:u.owner});}
      const d=V.data.units[u.raw],stats=u.stats||V.unitStats(u);u.buffs=u.buffs.filter(b=>b.until>V.time);u.hp=Math.min(u.maxHp,u.hp+(stats.hpRegen+u.buffs.filter(b=>b.kind==='regen').reduce((sum,b)=>sum+b.amount,0))*dt);u.mana=Math.min(u.maxMana,u.mana+(stats.manaRegen+u.buffs.filter(b=>b.kind==='mana-regen').reduce((sum,b)=>sum+b.amount,0))*dt);
      for(const sanctuary of u.buffs.filter(b=>b.kind==='sanctuary')){while(sanctuary.next<=V.time&&u.hp<u.maxHp){sanctuary.next+=1;const healed=Math.min(sanctuary.rate,u.maxHp-u.hp);u.hp+=healed;V.effect('heal',u,u,{value:healed,kind:'sanctuary'});}if(u.hp>=u.maxHp)u.buffs=u.buffs.filter(buff=>buff!==sanctuary);}
      for(const poison of u.buffs.filter(b=>b.kind==='poison'))if(poison.next<=V.time){poison.next+=poison.interval;V.damage(poison.source||null,u,poison.damage,false,'DAMAGE_TYPE_MAGIC','spells');}
      for(const burn of u.buffs.filter(b=>b.kind==='burn'))if(burn.next<=V.time){burn.next+=burn.interval;V.damage(burn.source||null,u,burn.damage,false,'DAMAGE_TYPE_FIRE','spells');}
      if(u.buffs.some(b=>b.kind==='stun'))continue;
      const haste=u.buffs.filter(b=>b.kind==='haste').reduce((n,b)=>Math.max(n,b.factor||1),1),baseSpeed=Math.min(Number(V.rules.MaxUnitSpeed)||522,V.moveSpeed(u)*haste),slow=u.buffs.filter(b=>b.kind==='slow').reduce((n,b)=>n*b.factor,1),movementSpeed=baseSpeed?Math.max(Number(V.rules.MinUnitSpeed)||100,baseSpeed*slow):0;
      if(u.move&&!u.buffs.some(b=>b.kind==='root')&&movementSpeed>0){
        const movement=u.move;
        if(!movement.path){const path=V.pathfinder?V.pathfinder.findPath(u,{x:movement.x,y:movement.y}):[{x:movement.x,y:movement.y}];if(!path?.length){u.move=null;continue;}movement.path=path;movement.index=0;movement.stalled=0;movement.escape=!!V.pathfinder&&!V.pathfinder.isWalkable(u.x,u.y);const end=path.at(-1);movement.x=end.x;movement.y=end.y;}
        const path=movement.path,step=movementSpeed*dt;let remaining=step;
        while(movement.index<path.length&&remaining>0){const waypoint=path[movement.index],dx=waypoint.x-u.x,dy=waypoint.y-u.y,distance=Math.hypot(dx,dy);if(distance<=Math.max(.001,remaining)){V.moveUnit(u,waypoint.x,waypoint.y);remaining-=distance;movement.index++;}else break;}
        if(movement.index>=path.length){V.moveUnit(u,movement.x,movement.y);u.move=null;}
        else if(remaining>0){const waypoint=path[movement.index],dx=waypoint.x-u.x,dy=waypoint.y-u.y,distance=Math.hypot(dx,dy)||1,nx=dx/distance,ny=dy/distance,amount=Math.min(remaining,distance),radius=Math.max(16,Number(u.collision)*16),candidateList=[[nx,ny],[(nx-ny*.55)/1.12,(ny+nx*.55)/1.12],[(nx+ny*.55)/1.12,(ny-nx*.55)/1.12],[-ny,nx],[ny,-nx]];let moved=false;
          for(const [vx,vy]of candidateList){const x=u.x+vx*amount,y=u.y+vy*amount;if(V.pathfinder&&!movement.escape&&!V.pathfinder.segmentWalkable(u,{x,y}))continue;const blocked=V.nearbyUnits({x,y},radius+32).some(other=>other!==u&&!other.removed&&!other.death&&Math.hypot(other.x-x,other.y-y)<radius+Math.max(16,Number(other.collision)*16));if(blocked)continue;const oldX=u.x,oldY=u.y;V.moveUnit(u,x,y);if(V.pathfinder&&V.pathfinder.isWalkable(u.x,u.y))movement.escape=false;u.facing=Math.atan2(y-oldY,x-oldX)*180/Math.PI;moved=true;movement.stalled=0;break;}
          if(!moved){movement.stalled=(movement.stalled||0)+dt;if(movement.stalled>.5){const path=V.pathfinder?.findPath(u,{x:movement.x,y:movement.y});if(path?.length){movement.path=path;movement.index=0;movement.stalled=0;}else u.move=null;}}
        }
      }
      if(!hasWeapon(d)||u.removed)continue;
      u.cooldown-=dt*(1+u.buffs.filter(b=>b.kind==='power').reduce((sum,b)=>sum+Math.max(0,b.speed||0),0));if(u.cooldown>0)continue;
       const range=stats.attackRange||100;
      let target=u.manualTarget||u.target;if(!canTarget(u,target,d)){if(target===u.target)u.target=null;u.manualTarget=null;target=null;}
      if(target&&Math.hypot(target.x-u.x,target.y-u.y)>range){if(!u.manualTarget)target=null;else{u.target=target;if(!u.building&&!u.move&&(!u.manualTargetApproachAt||u.manualTargetApproachAt<=V.time)){const dx=target.x-u.x,dy=target.y-u.y,distance=Math.hypot(dx,dy)||1,stop=Math.max(40,range*.82);u.manualTargetApproachAt=V.time+1;V.setMove(u,{x:target.x-dx/distance*stop,y:target.y-dy/distance*stop});}continue;}}
      if(!target)target=V.near(u,range,u.owner.team).filter(e=>canTarget(u,e,d)).sort((a,b)=>Math.hypot(a.x-u.x,a.y-u.y)-Math.hypot(b.x-u.x,b.y-u.y))[0];
      if(!target){u.target=null;continue;}
      if(u.manualTarget)u.manualTargetApproachAt=0;
      u.target=target;
      for(const id of [...u.abilities.keys()]){const a=V.ability(id);if(a.code==='Afae'&&u.autoCast?.has(id)&&(u.castCooldown.get(id)||0)<=V.time&&Math.hypot(target.x-u.x,target.y-u.y)<=Number(a.Rng1||Infinity))V.cast(u,id,target,null,true);}
      V.fire('EVENT_PLAYER_UNIT_ATTACKED',{unit:target,attacker:u,player:target.owner});V.fire('EVENT_UNIT_ATTACKED',{unit:target,attacker:u,player:target.owner});
      if(u.removed||target.removed||target.death)continue;let damage=weaponDamage(d);
      for(const b of u.buffs)if(b.kind==='power')damage*=1+b.damage;
      const passives=[...u.abilities.keys()].map(id=>V.ability(id));
      for(const a of passives)if(a.code==='ANba')damage+=Number(a.DataA1)||0;
      for(const a of passives)if(a.code==='AOcr'&&V.random()*100<Number(a.DataA1||0))damage*=Number(a.DataB1)||1;
      let bonus=null;for(const a of passives)if(a.code==='AHbh'&&Number(a.DataA1)>0&&V.random()*100<Number(a.DataA1)){bonus={ability:a};damage*=Number(a.DataB1)||1;break;}
      const projectileSpeed=Number(String(d.Missilespeed||'').split(',')[0])||0,start={x:u.x+(Number(d.launchX)||0),y:u.y+(Number(d.launchY)||0)},aim={x:target.x,y:target.y},distance=Math.hypot(aim.x-start.x,aim.y-start.y),flightTime=projectileSpeed>0&&!['normal','instant'].includes(d.weapTp1)?distance/projectileSpeed:0;
      const projectile={attacker:u,target,damage,weapon:d,passives,bonus,impactAt:V.time+flightTime,start,aim,position:{...start},speed:projectileSpeed,homing:!['artillery','mline','aline'].includes(d.weapTp1)&&String(d.MissileHoming??'1')!=='0',initialDistance:Math.max(1,distance),travelled:0,lastUpdateAt:V.time,lastVisualTarget:{...aim}};
      const visual=V.effect('projectile',u,target,{model:String(d.Missileart||'').split(',')[0],weaponType:d.weapTp1,attackType:d.atkType1,unit:u.raw,targetId:target.hid,missileSpeed:projectileSpeed,missileArc:Number(d.Missilearc)||0,flightTime,launch:[Number(d.launchX)||0,Number(d.launchY)||0,Number(d.launchZ)||0],impactZ:Number(V.data.units[target.raw]?.impactZ)||0});projectile.visualId=visual.id;
      if(flightTime>0)V.projectiles.push(projectile);else{projectile.position={...aim};projectile.hitTarget=true;impact(projectile);}
      u.cooldown=Math.max(.05,Number(d.cool1)||1);
    }
  };
}
