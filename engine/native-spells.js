import { abilityValue } from './ability-data.js';
import { targetMask } from './targeting.js';

const lineCodes = new Set(['AOsh', 'AUcs', 'ANbf', 'AUim']);
const idOf = id => typeof id === 'number' ? String.fromCharCode((id>>>24)&255,(id>>>16)&255,(id>>>8)&255,id&255) : id;

export function installNativeSpells(V) {
  V.spellProjectiles = [];
  V.spellZones = [];
  V.factories = [];
  V.swarms = [];
  V.delayedSpells = [];
  const buffEffects = new Map();
  const paths = value => String(value||'').split(',').map(path=>path.trim()).filter(path=>/\.(mdl|mdx)$/i.test(path));
  const showBuff = (unit,buff,key) => {
    const ability=V.ability(buff.ability||''),ids=new Set(buff.visualBuffs||[V.data.abilityStrings[key]?key:String(ability[`BuffID${buff.level||1}`]||ability.BuffID1||'').split(',')[0]]);
    const arts=new Map();
    for(const id of ids){const visual=V.data.abilityStrings[id];for(const path of paths(visual?.Targetart))arts.set(path,visual.Targetattach||'origin');}
    const effectKey=`${unit.hid}:${key}`;
    if(arts.size&&!buffEffects.has(effectKey))buffEffects.set(effectKey,{unit,key,effects:[...arts].map(([model,attachment])=>V.effect('model',unit,unit,{model,attachment,follow:true,persistent:true,buff:key}))});
  };
  V.applyBuff = (unit, buff) => {
    if (!unit || unit.death || unit.removed) return;
    const key = buff.key || buff.ability || buff.kind;
    const previous = unit.buffs.find(entry => entry.kind === buff.kind && (entry.key || entry.ability || entry.kind) === key && entry.until > V.time);
    if (previous) {
      // A second application of the same native buff refreshes it. It does not
      // multiply slows, armor reduction, or roar once per attack/source.
      const next = previous.next;
      Object.assign(previous, buff, { key });
      if (next !== undefined) previous.next = next;
      showBuff(unit,previous,key);
      return previous;
    }
    const entry = { ...buff, key };unit.buffs.push(entry);showBuff(unit,entry,key);return entry;
  };
  V.spellDuration = (ability, level, target) => {
    const hero = target && (V.natives.IsUnitType(target, 'UNIT_TYPE_HERO') || [...target.abilities.keys()].some(id => V.ability(id).code === 'Arsk'));
    return abilityValue(ability, hero ? 'HeroDur' : 'Dur', level, abilityValue(ability, 'Dur', level));
  };
  V.spellTargets = (caster, center, radius, ability, level = 1) =>
    (V.nearbyUnits?.(center,radius)||[...V.units.values()]).filter(unit => Math.hypot(unit.x-center.x,unit.y-center.y)<=radius && V.matchesTargetMask(caster,unit,targetMask(ability,level),{relation:'enemy'}));
  V.summon = (caster, type, point, count = 1, duration = 0, options = {}) => {
    if (!V.data.units[type]) return [];
    const units = [];
    for (let index = 0; index < Math.max(0, Math.floor(count)); index++) {
      const unit = V.createUnit(caster.owner, V.fourCC(type), point.x + (index % 3) * 24, point.y + Math.floor(index / 3) * 24, caster.facing);
      unit.summoner = caster;unit.ai = true;
      if (duration > 0) unit.expires = V.time + duration;
      if (unit.useFood) { unit.owner.food -= unit.food;unit.useFood = false;unit.food = 0; }
      Object.assign(unit, options);units.push(unit);
    }
    return units;
  };
  const buffKey = (ability, id, level = 1) => String(ability[`BuffID${level}`] || ability.BuffID1 || id || ability.code).split(',')[0];
  const debuff = (caster, target, ability, id, level, kind, fields = {}) => V.applyBuff(target, { kind, source: caster, ability: idOf(id), level, key: ability.code==='Aens'?(V.targetPlane(target)==='air'?'Bena':'Beng'):buffKey(ability, id, level), visualBuffs:ability.code==='Amls'?String(ability[`BuffID${level}`]||ability.BuffID1||'').split(',').slice(1):undefined, until: V.time + V.spellDuration(ability, level, target), ...fields });
  const slow = (caster, target, ability, id, level, movement, attack = 0) => {
    if (movement > 0) debuff(caster, target, ability, id, level, 'slow', { factor: Math.max(.01, 1 - movement) });
    if (attack > 0) debuff(caster, target, ability, id, level, 'attackSlow', { factor: Math.max(.01, 1 - attack) });
  };
  const damage = (source, target, amount, type = 'DAMAGE_TYPE_MAGIC') => V.damage(source, target, amount, false, type, 'spells');
  V.interruptChannel = unit => {
    const channel=unit?.channel;if(!channel)return;
    channel.interrupted=true;unit.channel=null;
    if(channel.effect){channel.effect.destroyed=true;channel.effect.destroyedAt=V.time;}
  };
  const zone = (caster, center, ability, id, options) => {
    if(options.channel){
      V.interruptChannel(caster);caster.move=null;caster.channel={ability:idOf(id),effect:options.effect,animationNames:options.effect?.animationNames||'spell,channel'};options.channelState=caster.channel;
      if(options.effect)options.effect.persistent=true;
    }
    const active={ source: caster, center: { x: center.x, y: center.y }, ability, id: idOf(id), next: V.time + options.interval, ...options };
    V.spellZones.push(active);return active;
  };
  V.nativeSpell = (caster, id, target, point, level, visual, effect) => {
    const ability = V.ability(id), code = ability.code, get = (field, fallback = 0) => abilityValue(ability, field, level, fallback);
    const p = point || target || caster, radius = get('Area'), duration = get('Dur');
    if (code === 'AOcl' || code === 'ANfl') {
      if (!target) return false;
      let previous = caster, amount = get('DataA');
      const visited = new Set();
      const dx = target.x - caster.x, dy = target.y - caster.y, distance = Math.hypot(dx, dy) || 1;
      for (let index = 0; index < Math.max(1, get('DataB', 1)); index++) {
        let next = index === 0 ? target : null;
        if (!next && code === 'AOcl') next = V.spellTargets(caster, previous, radius || 500, ability, level).filter(unit => !visited.has(unit.hid)).sort((a,b) => Math.hypot(a.x-previous.x,a.y-previous.y)-Math.hypot(b.x-previous.x,b.y-previous.y))[0];
        if (!next && code === 'ANfl') next = V.spellTargets(caster, caster, get('DataC', get('Rng')), ability, level).filter(unit => {
          const x = unit.x - caster.x, y = unit.y - caster.y, along = (x*dx+y*dy)/distance, side = Math.abs(x*dy-y*dx)/distance;
          return !visited.has(unit.hid) && along >= 0 && side <= (radius + (get('DataD', radius)-radius)*Math.min(1, along/Math.max(1,get('DataC'))));
        }).sort((a,b) => Math.hypot(a.x-target.x,a.y-target.y)-Math.hypot(b.x-target.x,b.y-target.y))[0];
        if (!next) break;
        visited.add(next.hid);V.effect('lightning', code === 'ANfl' ? caster : previous, next, { ability: idOf(id), code: visual.LightningEffect || 'CLPB' });
        damage(caster, next, amount);previous = next;
        if (code === 'AOcl') amount *= 1-get('DataC');
      }
    } else if (lineCodes.has(code)) {
      const dx = p.x-caster.x, dy = p.y-caster.y, distance = Math.hypot(dx,dy) || 1;
      const length = code === 'AUim' ? get('DataA') : get('DataC',get('Rng',800));
      const speed = Number(visual.Missilespeed) || (code === 'AUim' ? length/Math.max(.01,get('DataB',.3)) : 900);
      V.spellProjectiles.push({ source: caster, ability, id: idOf(id), level, code, start: {x:caster.x,y:caster.y}, direction: {x:dx/distance,y:dy/distance}, length, speed, distance: 0, width: radius || 100, finalWidth: code === 'AUim' ? radius : get('DataD',radius), damage: code === 'AUim' ? get('DataC') : get('DataA'), hits: new Set() });
    } else if (code === 'AHbz' || code === 'ANrf') {
      zone(caster, p, ability, id, { radius, damage: get('DataB'), interval: 1, next: V.time+Math.max(.1,get('Cast',.5)), count: Math.max(1,get('DataA',1)), cap: get('DataF',Infinity), burn: code === 'ANrf' ? get('DataE') : 0, duration, level, channel:caster, effect });
    } else if (code === 'ANcs') {
      zone(caster, p, ability, id, { radius, damage: get('DataA'), interval: Math.max(.01,get('DataB',.25)), count: Math.max(1,get('DataC',1)), cap: get('DataD',Infinity), stun: duration, level, channel:caster, effect });
    } else if (code === 'AEsf' || code === 'ANmo') {
      const interval = Math.max(.05,get('DataB',.5));
      zone(caster, code === 'AEsf' ? caster : p, ability, id, { radius, damage: get('DataA'), interval, count: Math.max(1,Math.floor(duration/interval)), channel: caster, level, effect });
    } else if (code === 'ANst') {
      zone(caster, p, ability, id, { radius, damage: get('DataC'), interval: 1/Math.max(1,get('DataA',1)), next: V.time+get('DataE',.2), count: Math.max(1,Math.ceil(duration*get('DataA',1))), stampede: true, hitRadius: get('DataD'), collision: get('DataB'), visual, channel: caster, level, effect });
    } else if (code === 'AHtb') {
      if (target) { damage(caster,target,get('DataA'));debuff(caster,target,ability,id,level,'stun'); }
    } else if (code === 'AUfn') {
      if (target) damage(caster,target,get('DataB'));
      for (const unit of V.spellTargets(caster,p,radius,ability,level)) { damage(caster,unit,get('DataA'));slow(caster,unit,ability,id,level,Number(V.rules.FrostMoveSpeedDecrease ?? .5),Number(V.rules.FrostAttackSpeedDecrease ?? .25)); }
    } else if (code === 'AHtc' || code === 'AOws') {
      for (const unit of V.spellTargets(caster,caster,radius,ability,level)) {
        damage(caster,unit,get('DataA'));
        if(code === 'AOws')debuff(caster,unit,ability,id,level,'stun');
        else slow(caster,unit,ability,id,level,get('DataC'),get('DataD'));
      }
    } else if (code === 'AEer' || code === 'Amls') {
      if (target) { debuff(caster,target,ability,id,level,code === 'Amls' ? 'stun' : 'root');debuff(caster,target,ability,id,level,'spellDot',{ damage:get('DataA'), interval:1, next:V.time+1 }); }
    } else if (code === 'AEsh') {
      if (target) { damage(caster,target,get('DataE'));slow(caster,target,ability,id,level,get('DataB'));debuff(caster,target,ability,id,level,'spellDot',{damage:get('DataA'),interval:Math.max(.1,get('Cast',3)),next:V.time+Math.max(.1,get('Cast',3))}); }
    } else if (code === 'Alsh') {
      if (target) {
        const key=buffKey(ability,id,level),until=V.time+V.spellDuration(ability,level,target);
        // Lightning Shield is one native buff on its carrier. Recasting it
        // refreshes that shield, including casts by another short-lived dummy.
        const previous=V.spellZones.find(active=>active.count>0&&active.follow===target&&active.shieldKey===key);
        debuff(caster,target,ability,id,level,'lightningShield');
        if(previous)Object.assign(previous,{source:caster,ability,id:idOf(id),level,radius,damage:get('DataA'),count:Math.max(0,Math.floor(until-previous.next+.000001)+1)});
        else zone(caster,target,ability,id,{radius,damage:get('DataA'),interval:1,count:Math.max(1,Math.floor(until-V.time)),follow:target,exclude:target,shieldKey:key,level});
      }
    } else if (code === 'AOww') {
      zone(caster,caster,ability,id,{radius,damage:get('DataA'),interval:1,count:Math.max(1,Math.ceil(duration)),follow:caster,level});
    } else if (code === 'AUls') {
      V.swarms.push({ source:caster, type:ability[`UnitID${level}`] || ability.UnitID1, count:Math.max(0,get('DataA')), interval:Math.max(.01,get('DataB',.2)), next:V.time, until:V.time+duration, units:[], radius, maxPerTarget:Math.max(1,get('DataC',1)), healFactor:get('DataD'), threshold:get('DataE') });
    } else if (code === 'AEfk') {
      const targets = V.spellTargets(caster,caster,radius,ability,level).slice(0,get('DataC',Infinity)), amount = Math.min(get('DataA'),get('DataB',Infinity)/Math.max(1,targets.length));
      for (const unit of targets) damage(caster,unit,amount);
    } else if (code === 'ANdo') {
      if (target) debuff(caster,target,ability,id,level,'doom',{until:Infinity,damage:get('DataA'),interval:1,next:V.time+1,type:ability.UnitID1,count:get('DataB',1),duration:get('DataC')});
    } else if (code === 'AUin') {
      V.delayedSpells.push({at:V.time+get('DataC'),caster,point:{x:p.x,y:p.y},ability,id,level});
    } else if (code === 'AHwe' || code === 'ANlm') {
      const units = V.summon(caster,ability[`UnitID${level}`] || ability.UnitID1,p,get('DataA',1),duration);
      if (code === 'ANlm') for (const unit of units) unit.lavaSpawn = { ability, level, hits:0, generation:0 };
    } else if (code === 'ANsy') {
      const [factory] = V.summon(caster,ability[`UnitID${level}`] || ability.UnitID1,p,1,duration);
      if (factory) V.factories.push({unit:factory,caster,type:ability[`DataB${level}`] || ability.DataB1,interval:Math.max(.1,get('DataA',4)),next:V.time+Math.max(.1,get('DataA',4)),duration:get('DataC'),offset:get('DataD')});
    } else if (['ANba','AHca','AHfa'].includes(code)) {
      if (target) { caster.pendingArrow = {id,paid:true};caster.manualTarget=target;caster.target=target; }
    } else if (code === 'Aroa' || code === 'Ainf' || code === 'Ablo') {
      const targets = code === 'Aroa' ? V.near(caster,radius,caster.owner.team,false).filter(unit=>V.matchesTargetMask(caster,unit,targetMask(ability,level),{relation:'friend',magicImmune:true})) : target ? [target] : [];
      for (const unit of targets) debuff(caster,unit,ability,id,level,'power',{damage:code === 'Ablo' ? 0 : get('DataA'),speed:code === 'Ablo' ? get('DataA') : 0,move:code === 'Ablo' ? get('DataB') : 0,armor:code === 'Ablo' ? 0 : get('DataB'),regen:code === 'Ablo' ? 0 : get('DataC')});
    } else if (code === 'ANht') {
      for (const unit of V.spellTargets(caster,caster,radius,ability,level)) debuff(caster,unit,ability,id,level,'weaken',{damage:get('DataA')});
    } else if (code === 'Afae') {
      if (target && get('DataA')>0) debuff(caster,target,ability,id,level,'armor',{amount:get('DataA')});
    } else if (['Aslo','Acri','Acyc','Abli','Aens','Aprg'].includes(code)) {
      if (target) {
        if (code === 'Acyc' || code === 'Aens') debuff(caster,target,ability,id,level,code === 'Aens' ? 'root' : 'stun');
        else slow(caster,target,ability,id,level,get('DataA',.3),get('DataB'));
        if (code === 'Acri') debuff(caster,target,ability,id,level,'damageDebuff',{factor:Math.max(.01,1-get('DataC'))});
      }
    } else if (code === 'AEbl') {
      V.moveUnit(caster,p.x,p.y);caster.move=null;
    } else if (code === 'ARal') {
      caster.rally={x:p.x,y:p.y};
    }
    return true;
  };
  V.markBlackArrow = (source,target,id) => {
    const ability=V.ability(id),level=source.abilities.get(id)||1;
    debuff(source,target,ability,id,level,'blackArrow',{type:ability.UnitID1,count:abilityValue(ability,'DataB',level,1),duration:abilityValue(ability,'DataC',level)});
  };
  V.onSpellDeath = unit => {
    for (const mark of unit.buffs.filter(buff => ['doom','blackArrow'].includes(buff.kind) && buff.until > V.time)) {
      V.summon(mark.source,mark.type,unit,mark.count,mark.duration);
    }
  };
  V.updateNativeSpells = dt => {
    for(const spell of V.delayedSpells.filter(spell=>spell.at<=V.time)){
      const {caster,point,ability,id,level}=spell;
      for(const unit of V.spellTargets(caster,point,abilityValue(ability,'Area',level),ability,level)){damage(caster,unit,abilityValue(ability,'DataA',level));debuff(caster,unit,ability,id,level,'stun');}
      V.summon(caster,ability[`UnitID${level}`]||ability.UnitID1,point,1,abilityValue(ability,'DataB',level));
    }
    V.delayedSpells=V.delayedSpells.filter(spell=>spell.at>V.time);
    for(const [key,record] of buffEffects)if(record.unit.death||record.unit.removed||!record.unit.buffs.some(buff=>buff.key===record.key&&buff.until>V.time)){
      for(const effect of record.effects){effect.destroyed=true;effect.destroyedAt=V.time;}buffEffects.delete(key);
    }
    for (const shot of V.spellProjectiles) {
      const before=shot.distance;shot.distance=Math.min(shot.length,before+shot.speed*dt);
      const mid=(before+shot.distance)/2,center={x:shot.start.x+shot.direction.x*mid,y:shot.start.y+shot.direction.y*mid};
      for (const unit of V.spellTargets(shot.source,center,(shot.distance-before)/2+Math.max(shot.width,shot.finalWidth),shot.ability,shot.level)) {
        if (shot.hits.has(unit.hid)) continue;
        const dx=unit.x-shot.start.x,dy=unit.y-shot.start.y,along=dx*shot.direction.x+dy*shot.direction.y,side=Math.abs(dx*shot.direction.y-dy*shot.direction.x),width=shot.width+(shot.finalWidth-shot.width)*Math.max(0,Math.min(1,along/Math.max(1,shot.length)));
        if (along<before || along>shot.distance || side>width) continue;
        if(shot.code==='ANst'){
          for(const target of V.spellTargets(shot.source,unit,shot.splash,shot.ability,shot.level))damage(shot.source,target,shot.damage);
          V.effect('impact',unit,unit,{projectileId:shot.visualId,ability:shot.id});shot.distance=shot.length;break;
        }
        shot.hits.add(unit.hid);damage(shot.source,unit,shot.damage);
        if (shot.code === 'AUim') debuff(shot.source,unit,shot.ability,shot.id,shot.level,'stun');
        if (shot.code === 'ANbf' && abilityValue(shot.ability,'DataE',shot.level)>0) debuff(shot.source,unit,shot.ability,shot.id,shot.level,'burn',{damage:abilityValue(shot.ability,'DataE',shot.level),interval:1,next:V.time+1});
      }
    }
    V.spellProjectiles=V.spellProjectiles.filter(shot => shot.distance<shot.length);
    for (const active of V.spellZones) {
      if (active.channel && (active.channel.death || active.channel.removed || active.channel.channel!==active.channelState || active.channel.buffs.some(buff=>buff.until>V.time&&['stun','silence','doom'].includes(buff.kind)))) {
        if(active.channel.channel===active.channelState)V.interruptChannel(active.channel);
        active.count=0;continue;
      }
      if (active.follow?.death || active.follow?.removed) {active.count=0;continue;}
      while (active.count>0 && active.next<=V.time+.000001) {
        active.next+=active.interval;active.count--;
        const center=active.follow || active.center,targets=V.spellTargets(active.source,center,active.radius,active.ability,active.level).filter(unit=>unit!==active.exclude);
        if(active.stampede){
          const dx=center.x-active.source.x,dy=center.y-active.source.y,distance=Math.hypot(dx,dy)||1,nx=dx/distance,ny=dy/distance,spread=(V.random()-.5)*active.radius;
          const start={x:active.source.x-ny*spread,y:active.source.y+nx*spread},length=distance+active.radius,end={x:start.x+nx*length,y:start.y+ny*length},speed=Number(active.visual.Missilespeed)||500;
          const effect=V.effect('projectile',start,end,{model:active.visual.Missileart,ability:active.id,missileSpeed:speed,flightTime:length/speed});
          V.spellProjectiles.push({source:active.source,ability:active.ability,id:active.id,level:active.level,code:'ANst',start,direction:{x:nx,y:ny},length,speed,distance:0,width:active.collision,finalWidth:active.collision,damage:active.damage,splash:active.hitRadius,hits:new Set(),visualId:effect.id});
          continue;
        }
        for (const unit of targets) {
          damage(active.source,unit,Math.min(active.damage,(active.cap || Infinity)/Math.max(1,targets.length)));
          if (active.stun) debuff(active.source,unit,active.ability,active.id,active.level,'stun');
          if (active.burn) debuff(active.source,unit,active.ability,active.id,active.level,'burn',{damage:active.burn,interval:1,next:V.time+1});
          if(active.ability.code==='AEsf')for(const buff of String(active.ability.BuffID1||'').split(','))for(const model of paths(V.data.abilityStrings[buff]?.Targetart))V.effect('model',unit,unit,{model});
          if(active.ability.code==='ANmo')V.effect('lightning',{x:unit.x,y:unit.y},unit,{code:'CLPB',ability:active.id,falling:true});
        }
        for(const effectId of String(active.ability.EfctID1||'').split(','))for(const model of paths(V.data.abilityStrings[effectId]?.Effectart)){
          const shards=['AHbz','ANrf'].includes(active.ability.code)?Math.max(1,abilityValue(active.ability,'DataC',active.level)):1;
          for(let index=0;index<shards;index++){const angle=V.random()*Math.PI*2,distance=Math.sqrt(V.random())*active.radius;const point=shards>1?{x:center.x+Math.cos(angle)*distance,y:center.y+Math.sin(angle)*distance}:center;V.effect('model',point,point,{model});}
        }
        V.effect('area',center,center,{code:active.ability.code,ability:active.id,area:active.radius});
      }
      if(active.count<=0&&active.channel?.channel===active.channelState)V.interruptChannel(active.channel);
    }
    V.spellZones=V.spellZones.filter(active=>active.count>0);
    for (const factory of V.factories) {
      if (factory.unit.death || factory.unit.removed || factory.unit.expires<=V.time) continue;
      while (factory.next<=V.time+.000001) {
        factory.next+=factory.interval;
        const children=V.summon(factory.caster,factory.type,{x:factory.unit.x+factory.offset,y:factory.unit.y},1,factory.duration);
        if(factory.unit.rally)for(const child of children)V.setMove(child,factory.unit.rally,851986);
      }
    }
    V.factories=V.factories.filter(factory=>!factory.unit.death&&!factory.unit.removed&&factory.unit.expires>V.time);
    for (const swarm of V.swarms) {
      if (swarm.source.removed || swarm.source.death) {for(const unit of swarm.units)V.removeUnit(unit);continue;}
      if(swarm.until<=V.time)swarm.ending=true;
      while (!swarm.ending && swarm.count>0 && swarm.next<=V.time+.000001) {
        swarm.next+=swarm.interval;swarm.count--;
        const [unit]=V.summon(swarm.source,swarm.type,swarm.source,1,0,{swarm});if(unit)swarm.units.push(unit);
      }
      const targets=V.spellTargets(swarm.source,swarm.source,swarm.radius,{}),assigned=new Map();
      for (const unit of swarm.units) {
        if(unit.removed || unit.death)continue;
        if(swarm.ending)unit.swarmReturning=true;
        if(unit.swarmReturning){
          unit.target=null;unit.swarmAssigned=false;
          if(Math.hypot(unit.x-swarm.source.x,unit.y-swarm.source.y)<=64){
            const healed=Math.min(swarm.source.maxHp-swarm.source.hp,(unit.swarmStored||0)*swarm.healFactor);
            swarm.source.hp+=healed;if(healed>0)V.effect('heal',unit,swarm.source,{value:healed});unit.swarmStored=0;unit.swarmReturning=false;unit.move=null;
            if(swarm.ending){V.removeUnit(unit);continue;}
          }else{
            if(!unit.move||Math.hypot(unit.move.x-swarm.source.x,unit.move.y-swarm.source.y)>64)V.setMove(unit,{x:swarm.source.x,y:swarm.source.y});
            continue;
          }
        }
        const target=targets.find(target=>(assigned.get(target.hid)||0)<swarm.maxPerTarget);
        unit.swarmAssigned=Boolean(target);unit.target=target||null;
        if(target)assigned.set(target.hid,(assigned.get(target.hid)||0)+1);
      }
    }
    V.swarms=V.swarms.filter(swarm=>(!swarm.ending||swarm.units.some(unit=>!unit.removed&&!unit.death))&&!swarm.source.death&&!swarm.source.removed);
  };
  V.updateNativePassives = unit => {
    const spawn=unit.lavaSpawn;
    if(spawn?.splitAt&&spawn.splitAt<=V.time){
      const bonus=abilityValue(spawn.ability,'DataE',spawn.level),duration=Math.max(0,(unit.expires||V.time)-V.time)+bonus;
      const next={...spawn,hits:0,generation:spawn.generation+1,splitAt:null};
      const [child]=V.summon(unit.summoner||unit,unit.raw,{x:unit.x+32,y:unit.y},1,duration,{lavaSpawn:{...next}});
      if(child){child.hp=child.maxHp*(unit.hp/unit.maxHp);unit.expires=V.time+duration;unit.lavaSpawn=next;}
    }
    unit.passiveTicks ??= new Map();
    for (const [id,level] of unit.abilities) {
      const ability=V.ability(id),code=ability.code,get=(field,fallback=0)=>abilityValue(ability,field,level,fallback);
      if (!['Aapl','ANpi','Apxf'].includes(code) || (unit.passiveTicks.get(id)||0)>V.time) continue;
      const interval=code==='Apxf'?Math.max(.05,get('Cool',.5)):1;
      unit.passiveTicks.set(id,V.time+interval);
      const targets=V.spellTargets(unit,unit,get('Area'),ability,level);
      if (code==='ANpi') for(const target of targets)damage(unit,target,get('DataA'));
      else if(code==='Aapl'){
        for(const target of targets)debuff(unit,target,ability,id,level,'spellDot',{damage:get('DataB'),interval:1,next:V.time+1,until:V.time+Math.max(1,get('DataA'))});
        if(targets.length)V.effect('area',unit,unit,{code,area:get('Area'),duration:get('DataA')});
      }
      else if(targets.length && unit.mana>=get('Cost')) {
        const target=targets.sort((a,b)=>Math.hypot(a.x-unit.x,a.y-unit.y)-Math.hypot(b.x-unit.x,b.y-unit.y))[0];
        unit.mana-=get('Cost');damage(unit,target,get('DataA'));
        debuff(unit,target,ability,id,level,'burn',{damage:get('DataB'),interval:1,next:V.time+1});
        V.effect('spell',unit,target,{ability:idOf(id),code,visual:{...V.data.abilityStrings[code],...V.data.abilityStrings[idOf(id)]},duration:get('Dur')});
      }
    }
  };
  V.updateNativeAutocast = unit => {
    if(unit.channel)return;
    if(unit.buffs.some(buff=>['stun','doom','silence'].includes(buff.kind)&&buff.until>V.time))return;
    for(const id of unit.autoCast){
      const ability=V.ability(id),code=ability.code;
      const friendlyCarrier=code==='Afae'&&String(ability.targs1||'').split(',').includes('friend');
      if(!friendlyCarrier&&!['Ainf','Ablo','Aslo'].includes(code)||(unit.castCooldown.get(id)||0)>V.time)continue;
      const friendly=code!=='Aslo',level=unit.abilities.get(id)||1;
      if(unit.mana<abilityValue(ability,'Cost',level))continue;
      const key=buffKey(ability,id,level),kind=friendly?'power':'slow';
      const target=V.near(unit,abilityValue(ability,'Rng',level),unit.owner.team,!friendly).find(target=>{
        if(friendlyCarrier&&target.mana>=target.maxMana)return false;
        return V.matchesTargetMask(unit,target,targetMask(ability,level))&&!target.buffs.some(buff=>buff.key===key&&buff.kind===kind&&buff.until>V.time);
      });
      if(target)V.cast(unit,id,target);
    }
  };
}
