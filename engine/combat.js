import {fourCC,rawId} from './runtime.js';
import {resolveAbility, abilityValue, spellOrders, abilityControls} from './ability-data.js';
import {installNativeSpells} from './native-spells.js';
import {matchesTargetMask, targetMask, targetPlane} from './targeting.js';
import {attackSpeed,attackTiming,turnTowards} from './unit-timing.js';

const passiveItemCodes=new Set(['AIab','AIat','AIas','AIva','AIfb','AIcb','AIpb','Apo2','AIsb']);
export function installCombat(V){
  const N=V.natives;
  const hasWeapon=d=>Boolean((Number(d?.weapsOn)&1)&&d?.atkType1&&d.atkType1!=='_'&&d?.weapTp1&&d.weapTp1!=='_'&&Number.isFinite(Number(d.cool1)));
  const canTarget=(attacker,target,d)=>{
    if(!target||target.removed||target.death||target.abilities.has(fourCC('Avul'))||[...target.abilities.keys()].some(id=>V.ability(id).code==='Aloc')||attacker.owner.team===target.owner.team)return false;
    const tags=String(d.targs1||'ground,air').split(',');
    const flying=targetPlane(V,target)==='air',canHitAir=flying&&([...attacker.abilities.keys()].some(id=>V.ability(id).code==='Aroc')||(attacker.itemStats||V.itemStats(attacker)).airAttack);
    if(!tags.includes(flying?'air':'ground')&&!canHitAir)return false;
    return !target.building||tags.includes('structure');
  };
  const weaponDamage=(d)=>{
    const base=Number(d.dmgplus1)||0,dice=Number(d.dice1)||0,sides=Number(d.sides1)||1;
    let damage=base;for(let die=0;die<dice;die++)damage+=1+Math.floor(V.random()*sides);return damage;
  };
  const abilityCache=new Map();
  V.ability=id=>{const key=rawId(id);if(!abilityCache.has(key))abilityCache.set(key,resolveAbility(V.data,key));return abilityCache.get(key);};
  V.matchesTargetMask=(caster,target,mask,options)=>matchesTargetMask(V,caster,target,mask,options);
  V.targetPlane=unit=>targetPlane(V,unit);
  V.cancelAttack=unit=>{
    if(!unit)return;
    if(unit.attackWindup||unit.attackBackswingEnd>V.time)V.effect('attack-cancel',unit,unit);
    unit.attackWindup=null;unit.attackBackswingEnd=0;
  };
  V.near=(point,radius,team,enemy=true)=>(V.nearbyUnits?.(point,radius)||[...V.units.values()]).filter(u=>!u.death&&!u.removed&&(enemy?u.owner.team!==team:u.owner.team===team)&&Math.hypot(u.x-point.x,u.y-point.y)<=radius);
  installNativeSpells(V);
  V.randomItem=(level,kind)=>{const entries=Object.entries(V.data.items).filter(([id,d])=>Number(kind?d.Level:d.oldLevel)===level&&Number(d.pickRandom)===1&&(!kind||kind==='ITEM_TYPE_ANY'||d.class===kind));return entries.length?fourCC(entries[Math.floor(V.random()*entries.length)][0]):0;};
  V.createItem=(type,p)=>{const id=rawId(type);if(!V.data.items[id])return null;const i=V.handle({type:fourCC(type),raw:id,x:p?.x||0,y:p?.y||0,charges:Number(V.data.items[id].uses)||0});V.items.set(i.hid,i);V.effect('drop',p,p,{item:id});return i;};
  V.removeItem=i=>{if(!i)return;const carrier=i.carrier;if(carrier){carrier.inventory=carrier.inventory.filter(x=>x!==i);i.carrier=null;V.refreshItemStats(carrier);}i.removed=true;V.items.delete(i.hid);};
  V.dropItem=(u,i)=>{if(!u||!i||i.carrier!==u||i.removed)return false;u.inventory=u.inventory.filter(x=>x!==i);i.carrier=null;i.x=u.x;i.y=u.y;if(u.pendingItemBuild?.item===i.hid){u.pendingItemBuild=null;u.move=null;}V.refreshItemStats(u);V.fire('EVENT_PLAYER_UNIT_DROP_ITEM',{unit:u,item:i,player:u.owner});return true;};
  V.inventoryCapacity=u=>Math.max(0,...[...(u?.abilities||[])].map(([id,level])=>{const ability=V.ability(id);return ability.code==='AInv'?Number(ability[`DataA${level}`]??ability.DataA1)||0:0;}));
  V.pickup=(u,i)=>{if(!u||u.removed||u.death||!i||i.carrier||i.removed||u.inventory.length>=V.inventoryCapacity(u)||Math.hypot(u.x-i.x,u.y-i.y)>Number(V.rules.PickupItemRange))return false;i.carrier=u;u.inventory.push(i);V.refreshItemStats(u);V.fire('EVENT_PLAYER_UNIT_PICKUP_ITEM',{unit:u,item:i,player:u.owner});return true;};
  V.buy=(slot,u,item)=>{if(!u||u.removed||u.death||!item||u.owner.id!==slot)throw new Error('该物品无法购买');const shops=[...V.units.values()].filter(s=>!s.removed&&!s.death&&s.owner.id>=8&&String(V.data.units[s.raw]?.Sellitems||'').split(',').includes(item.itemID));if(!shops.length)throw new Error('原图未设置出售此物品的商店，请通过掉落获取');const shop=shops.find(s=>Math.hypot(s.x-u.x,s.y-u.y)<=1200);if(!shop)throw new Error('请靠近出售此物品的商店');if(u.inventory.length>=6)throw new Error('物品栏已满');const cost=Number(item.goldcost)||0;if(u.owner.gold<cost)throw new Error('金币不足');u.owner.gold-=cost;const i=V.createItem(V.fourCC(item.itemID),u);V.pickup(u,i);return i;};
  V.itemStats=u=>{
    const stats={damage:0,lifeSteal:0,fireDamage:0,fireArea:0,poisonDamage:0,poisonDuration:0,poisonInterval:1,armorReduction:0,armorDuration:0,orbSlowChance:0,orbSlowFactor:0,orbSlowDuration:0,airAttack:false,attributes:{strength:0,agility:0,intelligence:0}};
    const abilities=[...(u?.abilities||[])].map(([id,level])=>({id,level}));
    for(const item of u?.inventory||[])for(const id of String(V.data.items[item.raw]?.abilList||'').split(',').filter(Boolean))abilities.push({id,level:1});
    for(const {id,level} of abilities){
      const a=V.ability(id),get=key=>abilityValue(a,key,level);
      if(a.code==='AIab'){stats.attributes.strength+=get('DataA');stats.attributes.agility+=get('DataB');stats.attributes.intelligence+=get('DataC');}
      else if(a.code==='AIat')stats.damage+=get('DataA');
      else if(a.code==='AIva')stats.lifeSteal+=get('DataA');
      else if(a.code==='AIfb'){stats.damage+=get('DataA');stats.fireDamage+=get('DataA');stats.fireArea=Math.max(stats.fireArea,get('Area'));stats.airAttack=true;}
      else if(a.code==='AIcb'){stats.damage+=get('DataA');stats.armorReduction+=get('DataB');stats.armorDuration=Math.max(stats.armorDuration,get('Dur'));stats.airAttack=true;}
      else if(a.code==='AIpb'){stats.damage+=get('DataA');stats.airAttack=true;}
      else if(['Apo2','Aven','Apoi'].includes(a.code)){stats.poisonDamage+=get('DataA');stats.poisonDuration=Math.max(stats.poisonDuration,get('Dur'));stats.poisonAbility=rawId(id);stats.poisonMove=Math.max(stats.poisonMove||0,get('DataC'));stats.poisonAttack=Math.max(stats.poisonAttack||0,get('DataB'));}
      else if(a.code==='AIsb'){stats.damage+=get('DataA');stats.orbSlowChance=Math.max(stats.orbSlowChance,get('DataB'));stats.orbSlowFactor=Math.max(stats.orbSlowFactor,Math.min(100,get('DataD'))/100);stats.orbSlowDuration=Math.max(stats.orbSlowDuration,get('DataC'));stats.airAttack=true;}
    }
    return stats;
  };
  V.refreshItemStats=u=>{if(u)u.itemStats=V.itemStats(u);};
  const mainHallRank={htow:0,ogre:0,unpl:0,etol:0,hkee:1,ostr:1,unp2:1,etoa:1,hcas:2,ofrt:2,etoe:2};
  const mainHall=player=>[...V.units.values()].filter(unit=>unit.owner===player&&!unit.removed&&!unit.death&&mainHallRank[unit.raw]!==undefined).sort((a,b)=>mainHallRank[b.raw]-mainHallRank[a.raw])[0];
  const teleport=(unit,point)=>{if(!point||!Number.isFinite(point.x)||!Number.isFinite(point.y))return false;let destination=point;if(V.pathfinder){const index=V.pathfinder.nearestWalkable(point.x,point.y);if(index<0)return false;destination=V.pathfinder.center(index);}V.moveUnit(unit,destination.x,destination.y);unit.move=null;return true;};
  V.useItem=(u,i,p)=>{
    if(!u||u.removed||u.death||!i||i.carrier!==u||i.removed)return false;const d=V.data.items[i.raw];if(Number(d.uses)>0&&i.charges<=0)return false;let used=false;
    if(V.equipment.some(set=>set.pieces.some(piece=>piece.item===i.raw)))return V.useBuildItem(u,i,p);
    const abilityIds=String(d.abilList||'').split(',').filter(Boolean);
    // Passive inventory abilities are applied by itemStats/attackExtras.  They
    // do not have a Warcraft "use" order and must not be consumed if a client
    // sends an artificial item action for them (for example the story orb).
    if(!abilityIds.some(id=>!passiveItemCodes.has(V.ability(id).code)))return false;
    for(const id of abilityIds){
      const a=V.ability(id),code=a.code,get=key=>Number(a[`${key}1`]??a[key]??0),target=V.units.get(p?.targetId)||u,point=p||u;
      if(passiveItemCodes.has(code))continue;
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
    if(!used)return false;if(i.charges>0){i.charges--;if(i.charges===0&&d.perishable)V.removeItem(i);}return true;
  };
  V.cast=(u,id,target=null,point=null,force=false)=>{
    if(!u||u.removed||u.death||!force&&(!u.constructed||u.upgradeEnd))return false;const a=V.ability(id),level=u.abilities.get(id)||1,suffix=String(level),get=(key,fallback=0)=>Number(a[key+suffix]??a[key+'1']??fallback),code=a.code;const p=point||target||u;
    if(!force&&((u.castCooldown.get(id)||0)>V.time||u.mana<get('Cost')))return false;
    if(!force){
      const controls=abilityControls(V.data,u.raw,rawId(id));
      if(u.buffs.some(buff=>buff.until>V.time&&['stun','doom','silence'].includes(buff.kind)))return false;
      if(controls.targeting==='unit'&&!target||controls.targeting==='point'&&!point&&!target)return false;
      if(target&&(target.removed||target.death))return false;
      if(get('Rng')>0&&Math.hypot(p.x-u.x,p.y-u.y)>get('Rng'))return false;
      if(target&&!V.matchesTargetMask(u,target,targetMask(a,level),{magicImmune:code==='Auhf'}))return false;
    }
    if(u.casting===id)return false;
    if(!['ANba','AHca','AHfa'].includes(code))V.cancelAttack(u);
    V.interruptChannel(u);
    if(!force)u.mana-=get('Cost');u.castCooldown.set(id,V.time+get('Cool'));u.casting=id;
    const ctx={unit:u,caster:u,ability:id,target,player:u.owner,point:p};
    V.fire('EVENT_PLAYER_UNIT_SPELL_CAST',ctx);V.fire('EVENT_PLAYER_UNIT_SPELL_EFFECT',ctx);u.casting=null;
    if(u.removed||u.death)return true;
    const visual={...V.data.abilityStrings[code],...V.data.abilityStrings[rawId(id)]},effect=V.effect('spell',u,p,{ability:rawId(id),code,area:get('Area'),duration:get('Dur'),range:get('Rng'),lineLength:code==='AUim'?get('DataA'):get('DataC',get('Rng',800)),missileSpeed:Number(visual.Missilespeed)||900,visual,animationNames:visual.Animnames});
    V.nativeSpell(u,id,target,point,level,visual,effect);
    return true;
  };
  const order=(u,id,target,point)=>{
    if(!u||u.removed)return false;
    if(id===851986||id===851971){if(point)V.setMove(u,point,id);return true;}
    if(id===851972){V.cancelAttack(u);V.interruptChannel(u);u.move=null;u.target=null;u.manualTarget=null;return true;}
    if(id===851983){if(u.target!==target)V.cancelAttack(u);V.interruptChannel(u);u.target=target;return true;}
    const code=spellOrders[id],ability=[...u.abilities.keys()].find(key=>V.ability(key).code===code);
    if(ability)return V.cast(u,ability,target,point);
    return false;
  };
  N.IssueImmediateOrderById=(u,id)=>order(u,id);N.IssueTargetOrderById=(u,id,target)=>order(u,id,target);N.IssuePointOrderByIdLoc=(u,id,p)=>order(u,id,null,p);N.IssueNeutralTargetOrder=(player,u,name,target)=>{
    // The original intro uses a neutral "smart" order to make each peasant
    // pick up the story item immediately after it is created at that peasant.
    // Treat item targets as pickup operations; storing an item in u.target
    // would make combat target validation dereference unit-only fields.
    if(target&&V.items?.get(target.hid)===target)return V.pickup(u,target);
    if(u)u.target=target;
    return true;
  };
  const oldRemove=N.UnitRemoveAbilityBJ;N.UnitRemoveAbilityBJ=(id,u)=>{u?.castCooldown.delete(id);u?.autoCast?.delete(id);return oldRemove(id,u);};
  const attackExtras=(attacker,target,baseDamage,weapon,passives,bonus,now,blackArrow=null,arrow=null)=>{
    if(!target||target.death||target.removed)return;
    if(blackArrow)V.markBlackArrow(attacker,target,blackArrow);
    const dealt=V.damage(attacker,target,baseDamage,true,'DAMAGE_TYPE_NORMAL',weapon.atkType1);
    const items=attacker.itemStats||V.itemStats(attacker);
    if(items.lifeSteal>0&&dealt>0)attacker.hp=Math.min(attacker.maxHp,attacker.hp+dealt*items.lifeSteal);
    if(attacker.swarm&&dealt>0){attacker.swarmStored=(attacker.swarmStored||0)+dealt;if(attacker.swarmStored>=attacker.swarm.threshold){attacker.swarmReturning=true;attacker.swarmAssigned=false;attacker.target=null;attacker.move=null;}}
    if(attacker.lavaSpawn&&dealt>0){const spawn=attacker.lavaSpawn;spawn.hits++;if(!spawn.splitAt&&spawn.generation<abilityValue(spawn.ability,'DataF',spawn.level)&&spawn.hits>=abilityValue(spawn.ability,'DataC',spawn.level)&&attacker.hp>=attacker.maxHp*abilityValue(spawn.ability,'DataD',spawn.level))spawn.splitAt=now+abilityValue(spawn.ability,'DataB',spawn.level);}
    if(items.fireDamage>0&&items.fireArea>0)for(const enemy of V.near(target,items.fireArea,attacker.owner.team))if(enemy!==target)V.damage(attacker,enemy,items.fireDamage,false,'DAMAGE_TYPE_MAGIC','spells');
    if(items.poisonDamage>0){
      const fields={key:'item-poison',ability:items.poisonAbility,source:attacker,until:now+Math.max(1,items.poisonDuration)};
      V.applyBuff(target,{...fields,kind:'poison',damage:items.poisonDamage,interval:items.poisonInterval,next:now+items.poisonInterval});
      if(items.poisonMove)V.applyBuff(target,{...fields,kind:'slow',factor:1-items.poisonMove});
      if(items.poisonAttack)V.applyBuff(target,{...fields,kind:'attackSlow',factor:1-items.poisonAttack});
    }
    if(arrow&&V.ability(arrow).code==='AHca'){
      const ability=V.ability(arrow),level=attacker.abilities.get(arrow)||1,fields={key:ability.BuffID1||rawId(arrow),ability:rawId(arrow),until:now+V.spellDuration(ability,level,target)};
      if(abilityValue(ability,'DataB',level))V.applyBuff(target,{...fields,kind:'slow',factor:1-abilityValue(ability,'DataB',level)});
      if(abilityValue(ability,'DataC',level))V.applyBuff(target,{...fields,kind:'attackSlow',factor:1-abilityValue(ability,'DataC',level)});
    }
    if(items.armorReduction>0)V.applyBuff(target,{kind:'armor',key:'item-orb-armor',amount:items.armorReduction,until:now+Math.max(1,items.armorDuration)});
    if(items.orbSlowChance>0&&V.random()*100<items.orbSlowChance)V.applyBuff(target,{kind:'slow',key:'item-orb-slow',factor:1-items.orbSlowFactor,until:now+Math.max(.1,items.orbSlowDuration)});
    for(const passive of passives){
      const id=fourCC(passive.alias),level=attacker.abilities.get(id)||1,get=(key,fallback=0)=>abilityValue(passive,key,level,fallback);
      if(passive.code==='ANca'){
        // The original half-moon descriptions measure Area forward from the attacker.
        const angle=(Number(attacker.facing)||0)*Math.PI/180,forwardX=Math.cos(angle),forwardY=Math.sin(angle);
        for(const enemy of V.near(attacker,get('Area',200),attacker.owner.team)){
          const dx=enemy.x-attacker.x,dy=enemy.y-attacker.y;
          if(enemy===target||dx*forwardX+dy*forwardY<0||!V.matchesTargetMask(attacker,enemy,targetMask(passive,level),{relation:'enemy',magicImmune:true}))continue;
          V.damage(attacker,enemy,baseDamage*get('DataA'),true,'DAMAGE_TYPE_NORMAL',weapon.atkType1);
        }
      }
      else if(passive.code==='AHbh'&&bonus?.ability===passive){const extra=get('DataC');if(extra)V.damage(attacker,target,extra,false,'DAMAGE_TYPE_MAGIC','spells');const duration=V.spellDuration(passive,level,target);if(duration)V.applyBuff(target,{kind:'stun',key:passive.BuffID1||passive.alias,until:now+duration});}
      else if(passive.code==='Awar'&&V.random()*100<get('DataA')){
        const inner=get('DataC'),outer=get('DataD',inner),damage=get('DataB');
        for(const enemy of V.spellTargets(attacker,target,outer,passive,level)){if(enemy===target)continue;const distance=Math.hypot(enemy.x-target.x,enemy.y-target.y);V.damage(attacker,enemy,damage*(distance<=inner?1:.5),false,'DAMAGE_TYPE_MAGIC','spells');}
        V.effect('area',attacker,target,{code:'Awar',area:outer});
      }
      else if(passive.code==='Afra'){
        const duration=V.spellDuration(passive,level,target),key=passive.BuffID1||'Bfro';
        V.applyBuff(target,{kind:'slow',key,factor:1-Number(V.rules.FrostMoveSpeedDecrease??.5),until:now+duration});
        V.applyBuff(target,{kind:'attackSlow',key,factor:1-Number(V.rules.FrostAttackSpeedDecrease??.25),until:now+duration});
      }
      else if(passive.code==='Afrz')for(const enemy of V.spellTargets(attacker,target,get('Area'),passive,level))V.applyBuff(enemy,{kind:'stun',key:passive.BuffID1||'Bfrz',until:now+V.spellDuration(passive,level,enemy)});
    }
  };
  const splash=(projectile,center,skip)=>{
    const weapon=projectile.weapon,tiers=[['Farea1',1],['Harea1',.5],['Qarea1',.25]],seen=new Set(skip?[skip.hid]:[]);
    for(const [field,factor] of tiers){const radius=Number(weapon[field])||0;if(!radius)continue;for(const enemy of V.near(center,radius,projectile.attacker.owner.team)){if(seen.has(enemy.hid)||!canTarget(projectile.attacker,enemy,weapon))continue;if(Math.hypot(enemy.x-center.x,enemy.y-center.y)>radius)continue;seen.add(enemy.hid);V.damage(projectile.attacker,enemy,projectile.damage*factor,true,'DAMAGE_TYPE_NORMAL',weapon.atkType1);}}
  };
  const impact=projectile=>{
    const {attacker,target}=projectile,weapon=projectile.weapon,weaponType=String(weapon.weapTp1||''),alive=!target.removed&&!target.death,directHit=alive&&projectile.hitTarget!==false;
    if(directHit)attackExtras(attacker,target,projectile.damage,weapon,projectile.passives,projectile.bonus,projectile.impactAt,projectile.blackArrow,projectile.arrow);
    const center=directHit?target:projectile.position;
    if(['msplash','artillery'].includes(weaponType))splash(projectile,center,directHit?target:null);
    if(['mline','aline'].includes(weaponType)){
      const from=projectile.start,to=projectile.aim,dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy)||1,spillDistance=Number(weapon.spillDist1)||length,width=Number(weapon.spillRadius1)||Number(weapon.Farea1)||48;
      for(const enemy of V.near(from,spillDistance+width,attacker.owner.team))if(enemy!==target&&canTarget(attacker,enemy,weapon)){const ex=enemy.x-from.x,ey=enemy.y-from.y,along=(ex*dx+ey*dy)/length,side=Math.abs(ex*dy-ey*dx)/length;if(along>=0&&along<=spillDistance&&side<=width)V.damage(attacker,enemy,projectile.damage,true,'DAMAGE_TYPE_NORMAL',weapon.atkType1);}
    }
    if(directHit&&weaponType==='mbounce'){
      const maxTargets=Math.max(1,Math.floor(attacker.stats?.attackTargets||Number(weapon.targCount1)||1)),range=Number(weapon.Farea1)||400,loss=Math.max(0,Math.min(1,Number(weapon.damageLoss1)||0)),visited=projectile.bounceVisited||new Set();visited.add(target.hid);
      if(visited.size<maxTargets){
        const next=V.near(target,range,attacker.owner.team).filter(enemy=>!visited.has(enemy.hid)&&canTarget(attacker,enemy,weapon)).sort((a,b)=>Math.hypot(a.x-target.x,a.y-target.y)-Math.hypot(b.x-target.x,b.y-target.y))[0];
        if(next)launchWeapon(attacker,next,weapon,projectile.damage*(1-loss),projectile.passives,null,null,null,{start:{x:target.x,y:target.y},visited});
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
  const launchWeapon=(u,target,d,damage,passives,bonus,blackArrow=null,arrow=null,bounce=null)=>{
      const projectileSpeed=Number(String(d.Missilespeed||'').split(',')[0])||0,start=bounce?.start||{x:u.x+(Number(d.launchX)||0),y:u.y+(Number(d.launchY)||0)},aim={x:target.x,y:target.y},distance=Math.hypot(aim.x-start.x,aim.y-start.y),flightTime=projectileSpeed>0&&!['normal','instant'].includes(d.weapTp1)?distance/projectileSpeed:0;
      const projectile={attacker:u,target,damage,weapon:d,passives,bonus,blackArrow,arrow,bounceVisited:bounce?.visited,impactAt:V.time+flightTime,start,aim,position:{...start},speed:projectileSpeed,homing:!['artillery','mline','aline'].includes(d.weapTp1)&&String(d.MissileHoming??'1')!=='0',initialDistance:Math.max(1,distance),travelled:0,lastUpdateAt:V.time,lastVisualTarget:{...aim}};
      const visual=V.effect('projectile',bounce?start:u,target,{attackStarted:true,model:String(d.Missileart||'').split(',')[0],weaponType:d.weapTp1,attackType:d.atkType1,unit:u.raw,targetId:target.hid,missileSpeed:projectileSpeed,missileArc:Number(d.Missilearc)||0,flightTime,launch:bounce?[0,0,Number(V.data.units[u.raw]?.impactZ)||0]:[Number(d.launchX)||0,Number(d.launchY)||0,Number(d.launchZ)||0],impactZ:Number(V.data.units[target.raw]?.impactZ)||0});projectile.visualId=visual.id;
      if(flightTime>0)V.projectiles.push(projectile);else{projectile.position={...aim};projectile.hitTarget=true;impact(projectile);}
  };
  const releaseAttack=(u,target,d,serial=u.attackSerial)=>{
      if(u.removed||u.death||target.removed||target.death)return;
      u.attackReleaseSerial=serial;
      let damage=(weaponDamage(d)+(u.stats?.attackDamageBonus||0)+(u.itemStats?.damage||0)+(u.auraDamageFlat||0))*(1+(u.auraDamage||0));
      let blackArrow=null,arrow=null;
      for(const id of u.abilities.keys()){
        const ability=V.ability(id);if(!['ANba','AHca','AHfa'].includes(ability.code))continue;
        const paid=u.pendingArrow?.id===id&&u.pendingArrow.paid,level=u.abilities.get(id)||1,cost=abilityValue(ability,'Cost',level);
        if(paid||u.autoCast?.has(id)&&u.mana>=cost&&(u.castCooldown.get(id)||0)<=V.time){arrow=id;if(ability.code==='ANba')blackArrow=id;damage+=abilityValue(ability,'DataA',level);if(!paid){u.mana-=cost;u.castCooldown.set(id,V.time+abilityValue(ability,'Cool',level));}u.pendingArrow=null;break;}
      }
      for(const b of u.buffs)if(b.kind==='power')damage*=1+b.damage;for(const b of u.buffs)if(b.kind==='damageDebuff')damage*=Math.max(0,Number(b.factor)||1);for(const b of u.buffs)if(b.kind==='weaken')damage*=Math.max(0,1-(Number(b.damage)||0));
      const passives=[...u.abilities.keys()].map(id=>V.ability(id));
      const eligible=a=>V.matchesTargetMask(u,target,targetMask(a,u.abilities.get(fourCC(a.alias))||1),{relation:'enemy',magicImmune:true});
      for(const a of passives){const level=u.abilities.get(fourCC(a.alias))||1;if(a.code==='AOcr'&&eligible(a)&&V.random()*100<abilityValue(a,'DataA',level))damage*=abilityValue(a,'DataB',level,1);}
      let bonus=null;for(const a of passives){const level=u.abilities.get(fourCC(a.alias))||1;if(a.code==='AHbh'&&eligible(a)&&abilityValue(a,'DataA',level)>0&&V.random()*100<abilityValue(a,'DataA',level)){bonus={ability:a};damage*=abilityValue(a,'DataB',level,1)||1;break;}}
      const arrowVisual=arrow&&V.data.abilityStrings[rawId(arrow)];
      launchWeapon(u,target,arrowVisual?.Missileart?{...d,Missileart:arrowVisual.Missileart,Missilespeed:arrowVisual.Missilespeed||d.Missilespeed}:d,damage,passives,bonus,blackArrow,arrow);
      if(!arrow)for(const passive of passives.filter(ability=>ability.code==='Aroc')){
        const level=u.abilities.get(fourCC(passive.alias))||1,count=abilityValue(passive,'DataC',level),radius=abilityValue(passive,'Area',level),visual=V.data.abilityStrings[passive.alias]||{};
        const others=V.spellTargets(u,u,radius,passive,level).filter(enemy=>enemy!==target&&canTarget(u,enemy,d)).sort((a,b)=>Math.hypot(a.x-u.x,a.y-u.y)-Math.hypot(b.x-u.x,b.y-u.y)).slice(0,count);
        for(const enemy of others)launchWeapon(u,enemy,{...d,Missileart:visual.Missileart||d.Missileart,Missilespeed:visual.Missilespeed||d.Missilespeed},damage,passives.filter(ability=>ability.code!=='Aroc'),null);
      }
  };
  V.updateCombat=dt=>{
    updateProjectiles();
    V.updateNativeSpells(dt);
    V.updateEquipmentAuras();
    for(const zone of V.zones||[]){if(zone.count>0&&zone.next<=V.time){zone.next+=zone.interval;zone.count--;for(const e of V.near(zone.center,zone.radius,zone.source.owner.team))V.damage(zone.source,e,zone.damage,false,'DAMAGE_TYPE_MAGIC','spells');V.effect('area',zone.center,zone.center,{code:zone.kind,area:zone.radius});}}
    V.zones=(V.zones||[]).filter(z=>z.count>0);
    for(const u of [...V.units.values()]){
      if(u.removed||u.death)continue;if(u.expires&&u.expires<=V.time){V.kill(u);continue;}
      V.updateItemBuild(u);
      if(u.upgradeEnd){if(u.upgradeEnd>V.time)continue;V.finishBuildingUpgrade(u);}
      if(u.constructEnd){if(u.constructEnd>V.time)continue;u.constructEnd=null;u.constructStart=null;u.constructed=true;V.fire('EVENT_PLAYER_UNIT_CONSTRUCT_FINISH',{unit:u,player:u.owner});V.flushMerit(u);}
      const d=V.data.units[u.raw],stats=u.stats||V.unitStats(u);
      for(const dot of u.buffs.filter(buff=>['poison','burn','spellDot','doom'].includes(buff.kind))){while(dot.next<=Math.min(V.time,dot.until)+.000001&&!u.death&&!u.removed){dot.next+=dot.interval;V.damage(dot.source||null,u,dot.damage,false,dot.kind==='burn'?'DAMAGE_TYPE_FIRE':'DAMAGE_TYPE_MAGIC','spells');}}
      if(u.death||u.removed)continue;
      u.buffs=u.buffs.filter(b=>b.until>V.time);u.hp=Math.min(u.maxHp,u.hp+(stats.hpRegen+(u.auraHp||0)+u.buffs.filter(b=>b.kind==='regen'||b.kind==='power').reduce((sum,b)=>sum+(b.kind==='regen'?b.amount:b.regen||0),0))*dt);u.mana=Math.min(u.maxMana,u.mana+(stats.manaRegen+(u.auraMana||0)+u.buffs.filter(b=>b.kind==='mana-regen').reduce((sum,b)=>sum+b.amount,0))*dt);
      for(const sanctuary of u.buffs.filter(b=>b.kind==='sanctuary')){while(sanctuary.next<=V.time&&u.hp<u.maxHp){sanctuary.next+=1;const healed=Math.min(sanctuary.rate,u.maxHp-u.hp);u.hp+=healed;V.effect('heal',u,u,{value:healed,kind:'sanctuary'});}if(u.hp>=u.maxHp)u.buffs=u.buffs.filter(buff=>buff!==sanctuary);}
      V.updateNativePassives(u);
      V.updateNativeAutocast(u);
      if(hasWeapon(d))u.cooldown-=dt;
      if(u.channel||u.buffs.some(b=>b.kind==='stun')){V.cancelAttack(u);continue;}
      if(u.attackWindup){
        const attack=u.attackWindup;
        if(!canTarget(u,attack.target,d)||Math.hypot(attack.target.x-u.x,attack.target.y-u.y)>(stats.attackRange||100)+(Number(d.RngBuff1)||0))V.cancelAttack(u);
        else{
          turnTowards(u,d,attack.target,dt,Number(V.rules.AttackHalfAngle??.5)*180/Math.PI);
          if(!u.turning&&V.time+.000001>=attack.launchAt){u.attackWindup=null;releaseAttack(u,attack.target,attack.weapon,attack.serial);}
          continue;
        }
      }
      const movementSpeed=V.movementSpeed(u);
      if(u.move&&!u.buffs.some(b=>b.kind==='root')&&movementSpeed>0){
        const movement=u.move,pathfinder=V.pathingFor(u),flying=V.isFlying(u);
        if(!movement.path){const path=pathfinder?pathfinder.findPath(u,{x:movement.x,y:movement.y}):[{x:movement.x,y:movement.y}];if(!path?.length){u.move=null;continue;}movement.path=path;movement.index=0;movement.stalled=0;movement.escape=!!pathfinder&&!pathfinder.isWalkable(u.x,u.y);const end=path.at(-1);movement.x=end.x;movement.y=end.y;}
        const path=movement.path;
        while(movement.index<path.length&&Math.hypot(path[movement.index].x-u.x,path[movement.index].y-u.y)<.001)movement.index++;
        const travelTime=movement.index<path.length?turnTowards(u,d,path[movement.index],dt):dt;
        const step=movementSpeed*travelTime;let remaining=step;
        while(u.move===movement&&movement.index<path.length&&remaining>0){const waypoint=path[movement.index],dx=waypoint.x-u.x,dy=waypoint.y-u.y,distance=Math.hypot(dx,dy);if(distance<=Math.max(.001,remaining)){V.moveUnit(u,waypoint.x,waypoint.y);remaining-=distance;movement.index++;}else break;}
        if(u.move===movement&&movement.index>=path.length){V.moveUnit(u,movement.x,movement.y);if(u.move===movement)u.move=null;}
        else if(u.move===movement&&remaining>0){const waypoint=path[movement.index],dx=waypoint.x-u.x,dy=waypoint.y-u.y,distance=Math.hypot(dx,dy)||1,nx=dx/distance,ny=dy/distance,amount=Math.min(remaining,distance),radius=Math.max(16,Number(u.collision)*16),candidateList=[[nx,ny],[(nx-ny*.55)/1.12,(ny+nx*.55)/1.12],[(nx+ny*.55)/1.12,(ny-nx*.55)/1.12],[-ny,nx],[ny,-nx]];let moved=false,terrainOpen=false;
          for(const [vx,vy]of candidateList){const x=u.x+vx*amount,y=u.y+vy*amount;if(pathfinder&&!movement.escape&&!pathfinder.segmentWalkable(u,{x,y}))continue;terrainOpen=true;const blocked=V.nearbyUnits({x,y},radius+32).some(other=>{if(u.swarm||other.swarm||other===u||other.removed||other.death||V.isFlying(other)!==flying)return false;const separation=radius+Math.max(16,Number(other.collision)*16),before=Math.hypot(other.x-u.x,other.y-u.y),after=Math.hypot(other.x-x,other.y-y);return after<separation&&(before>=separation||after<=before+.001);});if(blocked)continue;V.moveUnit(u,x,y);if(pathfinder&&pathfinder.isWalkable(u.x,u.y))movement.escape=false;moved=true;movement.stalled=0;break;}
          // Waiting for another unit is not a failed terrain path. Keep the
          // route and retry steering; rerunning the same A* cannot clear a crowd.
          if(!moved){movement.stalled=(movement.stalled||0)+dt;if(!terrainOpen&&movement.stalled>.5&&pathfinder&&(movement.repathAt||0)<=V.time){movement.repathAt=V.time+1;const path=pathfinder.findPath(u,{x:movement.x,y:movement.y});if(path?.length){movement.path=path;movement.index=0;movement.stalled=0;}else u.move=null;}}
        }
      }
      if(!hasWeapon(d)||u.removed)continue;
      if(u.cooldown>0||u.move?.manual||u.swarm&&(u.swarmReturning||!u.swarmAssigned))continue;
       const range=stats.attackRange||100;
      // Warcraft separates weapon range from acquisition range.  Summoned
      // units (and the hostile wave units) can notice a target before it is
      // in weapon range, then walk into range instead of standing idle.
      const acquire=Math.max(range,Number(d.acquire)||range),autonomous=Boolean(u.ai||u.summoner||u.owner.id>=8);
      let target=u.manualTarget||u.target;
      if(!canTarget(u,target,d)){if(target===u.target)u.target=null;u.manualTarget=null;target=null;}
      if(!target&&u.attackBackswingEnd>V.time)continue;
      if(!target)target=V.near(u,acquire,u.owner.team).filter(e=>canTarget(u,e,d)).sort((a,b)=>Math.hypot(a.x-u.x,a.y-u.y)-Math.hypot(b.x-u.x,b.y-u.y))[0];
      if(!target){u.target=null;continue;}
      if(Math.hypot(target.x-u.x,target.y-u.y)>range){
        if(!u.manualTarget&&!autonomous){u.target=null;continue;}
        u.target=target;
        if(!u.building&&!u.move&&(!u.autoApproachAt||u.autoApproachAt<=V.time)){
          const dx=target.x-u.x,dy=target.y-u.y,distance=Math.hypot(dx,dy)||1,stop=Math.max(40,range*.82);
          u.autoApproachAt=V.time+1;
          V.setMove(u,{x:target.x-dx/distance*stop,y:target.y-dy/distance*stop});
        }
        continue;
      }
      u.autoApproachAt=0;
      if(u.manualTarget)u.manualTargetApproachAt=0;
      u.target=target;
      turnTowards(u,d,target,dt,Number(V.rules.AttackHalfAngle??.5)*180/Math.PI);
      if(u.turning)continue;
      if(u.attackBackswingEnd>V.time)continue;
      for(const id of [...u.abilities.keys()]){const a=V.ability(id);if(a.code==='Afae'&&u.autoCast?.has(id)&&(u.castCooldown.get(id)||0)<=V.time&&Math.hypot(target.x-u.x,target.y-u.y)<=Number(a.Rng1||Infinity))V.cast(u,id,target);}
      if(u.removed||u.death||target.removed||target.death||u.move?.manual)continue;
      const timing=attackTiming(u,d,V.time);
      u.move=null;u.turning=false;u.cooldown=timing.cooldown;
      u.attackSerial=(u.attackSerial||0)+1;
      const attack={target,weapon:d,launchAt:V.time+timing.damagePoint,serial:u.attackSerial};
      u.attackWindup=attack;
      u.attackBackswingEnd=V.time+timing.damagePoint+timing.backswing;
      V.effect('attack',u,target,{unit:u.raw,attackSerial:attack.serial,duration:timing.damagePoint+timing.backswing,damagePoint:timing.damagePoint,animationSpeed:timing.speed});
      V.fire('EVENT_PLAYER_UNIT_ATTACKED',{unit:target,attacker:u,player:target.owner});V.fire('EVENT_UNIT_ATTACKED',{unit:target,attacker:u,player:target.owner});
      if(u.removed||u.death||target.removed||target.death){if(u.attackWindup===attack)V.cancelAttack(u);continue;}
      if(u.attackWindup!==attack)continue;
      if(timing.damagePoint===0){u.attackWindup=null;releaseAttack(u,target,d,attack.serial);}

    }
  };
}
