import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime, fourCC } from '../engine/runtime.js';
import { abilityControls, abilityValue, spellOrders } from '../engine/ability-data.js';
import { professionRoster, professionAudit } from '../tools/audit_professions.mjs';
import { releaseTestAttack } from './support/attack.js';

const root=new URL('../content/original-3.0/',import.meta.url);
const data=JSON.parse(await readFile(new URL('data.json',root),'utf8'));
const rules=JSON.parse(await readFile(new URL('gameplay.json',root),'utf8')).rules;
const functions=JSON.parse(await readFile(new URL('functions.json',root),'utf8'));
const roster=professionRoster(data,functions);
const make=()=>new Runtime(data,[{slot:0,name:'A'},{slot:1,name:'B'}],7,{offset:[-4096,-4096],pathing:{width:256,height:256,cell:32,flags:new Uint8Array(256*256)}},rules);
const create=(game,id='hfoo',x=300,y=0,owner=8)=>{
  const unit=game.createUnit(game.players[owner],fourCC(id),x,y);unit.hp=unit.maxHp=1e9;unit.stats.hpRegen=0;unit.cooldown=1e6;return unit;
};
const advance=(game,duration)=>{const end=game.time+duration;while(game.time<end-.000001){const dt=Math.min(.05,end-game.time);game.time+=dt;game.updateCombat(dt);}};
const fire=(game,unit,target)=>{releaseTestAttack(game,unit,target);unit.cooldown=1e6;};
const spellDamage=(game,unit,value)=>value*game.attackVsArmor.spells[data.units[unit.raw].defType];

test('all original dummy-caster order IDs resolve to their actual native spell family',()=>{
  const game=make();
  for(const [id,unitId,code] of [[852183,'e002','AEsf'],[852106,'e002','Aens'],[852226,'e009','AUfn'],[852110,'e00D','Alsh'],[852527,'e00G','AEsh'],[852480,'e00V','Amls']]){
    assert.equal(spellOrders[id],code);
    const unit=create(game,unitId,0,0,0),target=create(game,'hfoo',100,0);
    assert.equal(game.natives.IssueTargetOrderById(unit,id,target),true,`${unitId}: ${id}`);
    assert.ok(game.effects.some(effect=>effect.sourceId===unit.hid&&effect.code===code));
  }
});

test('hunter starfall actually damages nearby enemies through the original dummy order',()=>{
  const game=make(),unit=create(game,'e002',0,0,0),target=create(game,'hfoo',200,0);
  assert.equal(game.natives.IssueImmediateOrderById(unit,852183),true);
  advance(game,.5);
  assert.equal(1e9-target.hp,spellDamage(game,target,data.abilityData.A011.DataA1));
});

test('forked lightning is a single hit on the source number of targets and does not stun',()=>{
  const game=make(),caster=create(game,'h032',0,0,0),ability=game.ability('A012');
  const targets=Array.from({length:12},(_,index)=>create(game,'hfoo',500+index*15,index*10));
  game.cast(caster,fourCC('A012'),targets[0],null,true);
  assert.equal(targets.filter(unit=>unit.hp<1e9).length,ability.DataB1);
  for(const unit of targets.filter(unit=>unit.hp<1e9)){
    assert.equal(1e9-unit.hp,spellDamage(game,unit,ability.DataA1));
    assert.equal(unit.buffs.some(buff=>buff.kind==='stun'),false);
  }
  const after=targets.map(unit=>unit.hp);advance(game,2);assert.deepEqual(targets.map(unit=>unit.hp),after);
});

test('warlock automatic casts require and consume the original mana cost',()=>{
  const game=make();game.start();game.tasks=[];game.timers=[];game.run('OpenTrigger',[4]);
  const caster=create(game,'h032',0,0,0),target=create(game,'hfoo',200,0),id=fourCC('A05Y'),cost=abilityValue(game.ability(id),'Cost');
  caster.mana=0;fire(game,caster,target);assert.equal(caster.castCooldown.has(id),false);
  caster.mana=cost;fire(game,caster,target);assert.ok(caster.castCooldown.has(id));assert.ok(caster.mana<cost,'the autocast spends its original mana cost after attack backswing');
});

test('ranger barrage launches original missiles at ground and air secondary targets',()=>{
  for(const secondaryType of ['hfoo','hgry']){
    const game=make(),caster=create(game,'h03J',0,0,0),target=create(game,'hfoo',400,0),secondary=create(game,secondaryType,500,100),outside=create(game,'hfoo',1800,0);
    fire(game,caster,target);
    assert.equal(game.projectiles.filter(shot=>shot.attacker===caster).length,2);
    assert.equal(target.hp,1e9);assert.equal(secondary.hp,1e9,'secondary damage waits for its missile');
    advance(game,.6);assert.ok(target.hp<1e9);assert.ok(secondary.hp<1e9);assert.equal(outside.hp,1e9);
  }
});

test('high-tier barrage keeps the source target count without an eight-target cap',()=>{
  const game=make(),caster=create(game,'h043',0,0,0),targets=Array.from({length:14},(_,index)=>create(game,'hfoo',400+index*15,index*10));
  caster.autoCast.clear();fire(game,caster,targets[0]);
  assert.equal(game.projectiles.filter(shot=>shot.attacker===caster).length,1+data.abilityData.A066.DataC1);
});

test('black arrow suppresses barrage and a marked enemy raises a skeleton when an ally kills it',()=>{
  const game=make(),caster=create(game,'h03N',0,0,0),target=create(game,'hfoo',400,0);create(game,'hfoo',450,0);
  fire(game,caster,target);assert.equal(game.projectiles.filter(shot=>shot.attacker===caster).length,1);
  advance(game,.4);assert.ok(target.buffs.some(buff=>buff.kind==='blackArrow'));
  const ally=create(game,'hfoo',0,100,1);game.kill(target,ally);
  const skeletons=[...game.units.values()].filter(unit=>unit.summoner===caster&&unit.raw==='ndr1');
  assert.equal(skeletons.length,1);assert.equal(skeletons[0].expires,game.time+data.abilityData.A016.DataC1);
});

test('impale uses wave distance, travel time, damage and hero stun from separate source fields',()=>{
  const game=make(),caster=create(game,'h01M',0,0,0),ability=game.ability('A036'),target=create(game,'hfoo',ability.DataA1*.5,0),outside=create(game,'hfoo',ability.DataA1+500,0);
  game.cast(caster,fourCC('A036'),null,{x:ability.DataA1,y:0},true);
  assert.equal(target.hp,1e9);
  advance(game,ability.DataB1+.05);
  assert.equal(1e9-target.hp,spellDamage(game,target,ability.DataC1));assert.equal(outside.hp,1e9);assert.ok(target.buffs.some(buff=>buff.kind==='stun'));
});

test('frost nova slows, ensnare roots and shackles disable attacks using hero duration',()=>{
  const game=make(),caster=create(game,'e009',0,0,0),target=create(game,'hfoo',200,0);
  game.natives.IssueTargetOrderById(caster,852226,target);
  assert.ok(target.buffs.some(buff=>buff.kind==='slow'));assert.equal(target.buffs.some(buff=>buff.kind==='stun'),false);
  const hunter=create(game,'e002',0,0,0);game.natives.IssueTargetOrderById(hunter,852106,target);
  assert.ok(target.buffs.some(buff=>buff.kind==='root'));assert.equal(game.movementSpeed(target),0);
  const dummy=create(game,'e00V',0,0,0),boss=create(game,'Udea',200,50);
  game.natives.IssueTargetOrderById(dummy,852480,boss);
  assert.equal(boss.buffs.find(buff=>buff.kind==='stun').until,game.time+data.abilityData.A0DN.HeroDur1);
});

test('shadow strike initial and periodic damage survive the short-lived dummy caster',()=>{
  const game=make(),caster=create(game,'e00H',0,0,0),target=create(game,'hfoo',200,0),ability=game.ability('A07J');
  game.natives.IssueTargetOrderById(caster,852527,target);
  assert.equal(1e9-target.hp,spellDamage(game,target,ability.DataE1));
  game.removeUnit(caster);const before=target.hp;advance(game,ability.Cast1+.05);
  assert.equal(before-target.hp,spellDamage(game,target,ability.DataA1));
});

test('pocket factories produce militia every four seconds with independent ten-second lives',()=>{
  const game=make(),caster=create(game,'h04J',0,0,0);game.cast(caster,fourCC('A07L'),null,{x:300,y:0},true);
  const militia=()=>[...game.units.values()].filter(unit=>unit.raw==='n008'&&!unit.death&&!unit.removed);
  advance(game,3.9);assert.equal(militia().length,0);advance(game,.11);assert.equal(militia().length,1);
  assert.ok(Math.abs(militia()[0].expires-14)<.051);advance(game,4);assert.equal(militia().length,2);
  advance(game,20);assert.equal(game.factories.length,0);assert.equal(militia().length,0);
});

test('doom persists until death, silences its target and creates the specified warrior',()=>{
  const game=make(),caster=create(game,'h04O',0,0,0),target=create(game,'hfoo',200,0),ability=game.ability('A089');
  game.cast(caster,fourCC('A089'),target,null,true);advance(game,1);
  assert.equal(1e9-target.hp,spellDamage(game,target,ability.DataA1));assert.equal(target.buffs.find(buff=>buff.kind==='doom').until,Infinity);
  game.kill(target,caster);
  const summoned=[...game.units.values()].find(unit=>unit.raw===ability.UnitID1&&unit.summoner===caster);
  assert.ok(summoned);assert.equal(summoned.expires,game.time+ability.DataC1);
});

test('infernals retain their source lifetime, permanent immolation and magic immunity',()=>{
  const game=make(),caster=create(game,'h01M',0,0,0);game.cast(caster,fourCC('A03U'),null,{x:200,y:0},true);
  assert.equal([...game.units.values()].some(unit=>unit.raw==='n002'),false);advance(game,data.abilityData.A03U.DataC1);
  const infernal=[...game.units.values()].find(unit=>unit.raw==='n002');assert.ok(infernal);
  assert.equal(infernal.expires,game.time+data.abilityData.A03U.DataB1);
  const before=infernal.hp;assert.equal(game.damage(caster,infernal,100,false,'DAMAGE_TYPE_MAGIC','spells'),0);assert.equal(infernal.hp,before);
  const target=create(game,'hfoo',250,0);infernal.cooldown=1e6;advance(game,1.05);
  assert.equal(1e9-target.hp,spellDamage(game,target,data.abilityData.A038.DataA1));
});

test('locust swarm releases real source units and removes them when the spell ends',()=>{
  const game=make(),caster=create(game,'h06Z',0,0,0),ability=game.ability('A0CR');
  game.cast(caster,fourCC('A0CR'),null,null,true);advance(game,5);
  const units=[...game.units.values()].filter(unit=>unit.swarm);assert.equal(units.length,ability.DataA1);assert.ok(units.every(unit=>unit.raw===ability.UnitID1));
  const snapshot=game.snapshot().units.filter(unit=>units.some(other=>other.hid===unit.id));assert.ok(snapshot.every(unit=>unit.selectable===false));
  assert.throws(()=>game.action(0,{type:'move',unit:units[0].hid,x:100,y:100}),/无法直接操作/);
  advance(game,8);assert.equal([...game.units.values()].filter(unit=>unit.swarm).length,0);
});

test('frost attack refreshes its native slow instead of stacking it once per arrow',()=>{
  const game=make(),caster=create(game,'h02A',0,0,0),target=create(game,'hfoo',200,0);
  for(let index=0;index<8;index++)fire(game,caster,target);
  advance(game,.5);
  const slows=target.buffs.filter(buff=>buff.kind==='slow');assert.equal(slows.length,1);assert.equal(slows[0].factor,1-rules.sourceGameplayConstants.FrostMoveSpeedDecrease);
  assert.equal(game.movementSpeed(target),Number(data.units.hfoo.spd)*slows[0].factor);
});

test('roar defense is armor rather than attack speed and repeated casts refresh one buff',()=>{
  const game=make(),caster=create(game,'h00P',0,0,0),friend=create(game,'hfoo',100,0,0),ability=game.ability('A01C'),armor=game.currentArmor(friend);
  game.cast(caster,fourCC('A01C'),null,null,true);game.cast(caster,fourCC('A01C'),null,null,true);
  assert.equal(friend.buffs.filter(buff=>buff.kind==='power').length,1);assert.equal(game.currentArmor(friend),armor+abilityValue(ability,'DataB'));
  assert.equal(friend.buffs.find(buff=>buff.kind==='power').speed,0);
});

test('range and difficulty technologies affect only the unit types listed by the map',()=>{
  const game=make(),ranger=create(game,'h03J',0,0,0),hunter=create(game,'h018',0,100,0),creep=create(game,'nanc',500,0);
  game.natives.SetPlayerTechResearched(game.players[0],fourCC('R005'),3);
  assert.equal(ranger.stats.attackRange,Number(data.units.h03J.rangeN1)+300);assert.equal(hunter.stats.attackRange,Number(data.units.h018.rangeN1));
  game.natives.SetPlayerTechResearched(game.players[8],fourCC('R007'),2);assert.equal(creep.stats.hpRegen,(Number(data.units.nanc.regenHP)||0)+.5);
});

test('all 56 source waves have their disabled weapons respected near vulnerable summons',()=>{
  const game=make(),summon=create(game,'efon',0,0,0);
  for(const type of data.waveUnits){const creep=create(game,type,40,0);creep.cooldown=0;game.updateCombat(.05);assert.equal(creep.target,undefined,type);game.removeUnit(creep);}
  assert.equal(summon.hp,1e9);
});

test('script attack classes, physical armor and weapon bonuses are independent',()=>{
  const game=make(),source=create(game,'hfoo',0,0,0),target=create(game,'hfoo',200,0);source.stats.attackDamageBonus=1000;
  const magical=game.damage(source,target,100,true,'DAMAGE_TYPE_LIGHTNING','ATTACK_TYPE_NORMAL');assert.equal(magical,spellDamage(game,target,100));
  const physical=game.damage(source,target,100,false,'DAMAGE_TYPE_NORMAL','ATTACK_TYPE_MELEE');
  assert.equal(physical,100/(1+.06*(Number(data.units.hfoo.def)||0))*game.attackVsArmor.normal[data.units.hfoo.defType]);
});

test('manual commands distinguish native passives, real autocasts and point versus unit targets',()=>{
  assert.deepEqual(abilityControls(data,'h032','A05Y'),{castable:true,autocastSupported:true,targeting:'unit'});
  assert.deepEqual(abilityControls(data,'h03Q','A06K'),{castable:false,autocastSupported:false,targeting:'self'});
  assert.equal(abilityControls(data,'h001','A04D').targeting,'point');
  const game=make(),caster=create(game,'h032',0,0,0),target=create(game,'hfoo',2000,0);caster.mana=1000;
  assert.equal(game.action(0,{type:'cast',unit:caster.hid,ability:'A05Y',x:100,y:0}),false);
  assert.equal(game.action(0,{type:'cast',unit:caster.hid,ability:'A05Y',target:target.hid}),false);assert.equal(caster.mana,1000);
  assert.throws(()=>game.action(0,{type:'cast',unit:caster.hid,ability:'A00Q'}),/被动技能/);
});

test('all six professions include every merit tier, manual upgrade and set building with available native models',async()=>{
  const manifest=JSON.parse(await readFile(new URL('../public/warcraft/manifest.json',import.meta.url),'utf8'));
  for(const row of professionAudit(data,functions,manifest)){
    assert.equal(row.buildable.length,11,row.name);assert.equal(row.buildings.length,40,row.name);
    assert.deepEqual(row.missingModels,[],row.name);
    const game=make();
    for(const entry of row.buildings){
      const unit=game.createUnit(game.players[0],fourCC(entry.id),0,0),def=data.units[entry.id];
      assert.equal(unit.maxHp,Number(def.HP));assert.equal(unit.maxMana,Number(def.manaN??def.realM)||0);
      assert.equal(game.currentArmor(unit),Number(def.def)||0);assert.equal(unit.stats.attackRange,Number(def.rangeN1)||100);
      assert.deepEqual([...unit.abilities.keys()].map(id=>String.fromCharCode(id>>>24,(id>>>16)&255,(id>>>8)&255,id&255)),String(def.abilList).split(',').filter(id=>id&&id!=='_'));
      game.removeUnit(unit);
    }
  }
});

test('all 54 native building upgrade edges enforce prerequisites, costs and construction time',()=>{
  let count=0;
  for(const row of roster)for(const id of row.buildings){
    const next=data.units[id].Upgrade;if(!next)continue;count++;
    const game=make(),player=game.players[0],unit=game.createUnit(player,fourCC(id),0,0),def=data.units[next];
    player.cap=65;player.gold=1e6;player.lumber=1e6;unit.data=123;unit.hp=unit.maxHp*.5;
    assert.throws(()=>game.action(0,{type:'upgrade',unit:unit.hid,to:row.worker}),/不能/);
    const requires=String(def.Requires||'').split(',').filter(Boolean);
    if(requires.length)assert.throws(()=>game.action(0,{type:'upgrade',unit:unit.hid,to:next}),/需要/);
    for(const required of requires)player.tech[required]=1;
    const gold=player.gold,lumber=player.lumber,food=player.food,oldFood=unit.food;
    assert.equal(game.action(0,{type:'upgrade',unit:unit.hid,to:next}),true);
    assert.equal(gold-player.gold,Number(def.goldcost)||0);assert.equal(lumber-player.lumber,Number(def.lumbercost)||0);
    assert.equal(player.food,food-oldFood+(Number(def.fused)||0));
    const duration=Number(def.bldtm);assert.equal(unit.upgradeEnd-game.time,duration);
    advance(game,duration-.01);assert.equal(unit.raw,id);advance(game,.02);assert.equal(unit.raw,next);
    assert.equal(unit.data,123);assert.ok(Math.abs(unit.hp/unit.maxHp-.5)<.001);
  }
  assert.equal(count,54);
});

test('source merit promotion and learned abilities execute for all six professions',()=>{
  const learned=[['h01G','A04B',1000],['h00F','A04A',1000],['h046','A08Q',800],['h02C','A062',1000],['h03C','A07D',1000],['h06D','A0EE',800]];
  for(const [index,row]of roster.entries()){
    const game=make();game.start();game.tasks=[];game.timers=[];game.globals.udg_playerzz[0]=index+1;game.globals.udg_nokuaisumode=true;game.globals.udg_waves=0;
    const first=row.buildings.find(id=>Object.values(data.arrays.level1).includes(id)),levelIndex=Object.keys(data.arrays.level1).find(index=>data.arrays.level1[index]===first);
    const tower=create(game,first,0,0,0);tower.data=149;
    game.run('Trig_LevelUp_Actions',[],{killer:tower});assert.equal(tower.removed,true);
    assert.equal(game.globals.bj_lastCreatedUnit.raw,data.arrays.level2[levelIndex]);
    const [type,ability,threshold]=learned[index],veteran=create(game,type,0,0,0);veteran.data=threshold-1;
    game.run('Trig_LevelUp_Actions',[],{killer:veteran});assert.ok(veteran.abilities.has(fourCC(ability)),`${row.name}: ${ability}`);
    assert.deepEqual(game.errors,[]);
  }
});

test('set frost and fire arrows honor autocast, native bonuses and frost duration',()=>{
  for(const [type,ability]of [['h052','A09F'],['h054','A09B']]){
    const game=make(),unit=create(game,type,0,0,0),target=create(game,'hfoo',200,0);game.random=()=>0;
    const base=(Number(data.units[type].dmgplus1)||0)+(Number(data.units[type].dice1)||0),extra=abilityValue(game.ability(ability),'DataA');
    fire(game,unit,target);advance(game,.5);
    const expected=(base+extra)/(1+.06*game.currentArmor(target))*game.attackVsArmor[data.units[type].atkType1][data.units.hfoo.defType];
    assert.ok(Math.abs(1e9-target.hp-expected)<.00001,type);
    if(type==='h052'){const slow=target.buffs.find(buff=>buff.kind==='slow');assert.ok(slow);assert.equal(slow.factor,.7);}
    assert.equal(game.action(0,{type:'autocast',unit:unit.hid,ability,enabled:false}),true);
    const before=target.hp;fire(game,unit,target);advance(game,.5);assert.ok(target.hp<before);assert.ok(before-target.hp<expected);
  }
});

test('set poison and directly attached equipment abilities contribute their source properties',()=>{
  const game=make(),unit=create(game,'h053',0,0,0),target=create(game,'hfoo',200,0),ability=game.ability('A09G');
  fire(game,unit,target);advance(game,.5);const poison=target.buffs.find(buff=>buff.kind==='poison');assert.ok(poison);assert.equal(poison.damage,ability.DataA1);
  const before=target.hp;advance(game,1);assert.equal(before-target.hp,spellDamage(game,target,ability.DataA1));
  const fireOrb=create(game,'h05J',0,100,0),corruption=create(game,'h05K',0,200,0),warlock=create(game,'h05M',0,300,0);
  game.natives.UnitAddAbility(fireOrb,fourCC('A09Z'));assert.equal(fireOrb.itemStats.damage,abilityValue(game.ability('A09Z'),'DataA'));
  game.natives.UnitAddAbility(corruption,fourCC('A0A7'));assert.equal(corruption.itemStats.armorReduction,20);
  assert.equal(warlock.itemStats.damage,500);game.natives.UnitRemoveAbilityBJ(fourCC('A0AP'),warlock);game.natives.UnitAddAbility(warlock,fourCC('A0AO'));assert.equal(warlock.itemStats.damage,1200);
});

test('learned marksman and percentage armor auras follow native target masks',()=>{
  const game=make(),source=create(game,'h03C',0,0,0),ranged=create(game,'h03J',100,0,0),melee=create(game,'hfoo',100,50,0);
  game.natives.UnitAddAbility(source,fourCC('A097'));game.updateEquipmentAuras();assert.equal(ranged.auraDamage,.5);assert.equal(melee.auraDamage,0);
  game.natives.UnitAddAbility(source,fourCC('A07A'));game.updateEquipmentAuras();assert.equal(game.currentArmor(source),(Number(data.units.h03C.def)||0)*.6);
  assert.equal(game.currentArmor(ranged),Number(data.units.h03J.def)||0);
});

test('sacrifice war stomp deals native global damage and stun before the scripted death',()=>{
  const game=make();game.start();game.tasks=[];game.timers=[];game.globals.udg_playerzz[0]=2;game.run('OpenTrigger',[2]);
  const source=create(game,'h00F',0,0,0),target=create(game,'hfoo',3000,0);game.natives.UnitAddAbility(source,fourCC('A04A'));
  assert.equal(game.action(0,{type:'cast',unit:source.hid,ability:'A04A'}),true);
  assert.equal(1e9-target.hp,spellDamage(game,target,10000));assert.ok(target.buffs.some(buff=>buff.kind==='stun'&&buff.until===15));
  game.tick(.11);assert.equal(source.death,true);assert.deepEqual(game.errors,[]);
});

test('native buff effects refresh once and are destroyed on expiry or unit removal',()=>{
  const game=make(),caster=create(game,'e002',0,0,0),target=create(game,'hfoo',200,0);
  game.natives.IssueTargetOrderById(caster,852106,target);game.natives.IssueTargetOrderById(caster,852106,target);
  const effects=game.effects.filter(effect=>effect.persistent&&effect.targetId===target.hid);assert.equal(effects.length,1);
  assert.ok(/ensnare/i.test(effects[0].model));advance(game,.05);assert.equal(effects[0].destroyed,undefined);
  game.removeUnit(target);advance(game,.05);assert.equal(effects[0].destroyed,true);
});

test('learned friendly spells expose autocast and heal mana without selecting an enemy',()=>{
  const game=make();game.start();game.tasks=[];game.timers=[];game.globals.udg_playerzz[0]=6;game.run('OpenTrigger',[6]);
  const source=create(game,'h06O',0,0,0),friend=create(game,'h06M',100,0,0),enemy=create(game,'hfoo',200,0);
  game.natives.UnitAddAbility(source,fourCC('A0EC'));source.mana=source.maxMana;friend.mana=0;
  assert.equal(game.action(0,{type:'autocast',unit:source.hid,ability:'A0EC',enabled:true}),true);
  advance(game,.05);assert.ok(friend.mana>0);assert.equal(enemy.mana,0);assert.deepEqual(game.errors,[]);
  const bloodlust=create(game,'h01G',0,100,0);game.natives.UnitAddAbility(bloodlust,fourCC('A043'));advance(game,.05);
  assert.ok([...game.units.values()].some(unit=>unit.owner.id===0&&unit.buffs.some(buff=>buff.kind==='power'&&buff.ability==='A043')));
});

test('hunter set bounce research adds three targets and each bounce travels before dealing damage',()=>{
  const game=make();game.natives.SetPlayerTechResearched(game.players[0],fourCC('R002'),1);
  const source=create(game,'h05P',0,0,0),targets=Array.from({length:6},(_,index)=>create(game,'hfoo',100+index*100,0));
  assert.equal(source.stats.attackTargets,5);fire(game,source,targets[0]);advance(game,.15);
  assert.ok(targets[0].hp<1e9);assert.equal(targets[1].hp,1e9);
  advance(game,1);assert.equal(targets.filter(unit=>unit.hp<1e9).length,5);assert.equal(targets[5].hp,1e9);
  const losses=targets.slice(0,5).map(unit=>1e9-unit.hp);for(let index=1;index<losses.length;index++)assert.ok(Math.abs(losses[index]/losses[index-1]-(1-data.units.h05P.damageLoss1))<.00001);
});

test('locust assignment respects the per-target limit and only heals after returning to its caster',()=>{
  const game=make(),source=create(game,'h06Z',0,0,0),target=create(game,'hfoo',400,0),ability=game.ability('A0CR');
  game.cast(source,fourCC('A0CR'),null,null,true);advance(game,4.1);
  const swarm=game.swarms[0];assert.ok(swarm.units.filter(unit=>unit.swarmAssigned).length<=ability.DataC1);
  for(const unit of swarm.units.slice(1))game.removeUnit(unit);game.removeUnit(target);swarm.count=0;
  const unit=swarm.units[0];game.moveUnit(unit,600,0);unit.swarmStored=100;unit.swarmReturning=true;unit.move=null;source.hp=source.maxHp-1000;
  const before=source.hp;advance(game,.05);assert.equal(source.hp,before);advance(game,2);
  assert.equal(source.hp-before,100*ability.DataD1);
});

test('stampede beasts travel, collide and use the source explosion radius',()=>{
  const game=make(),caster=create(game,'h00I',0,0,0),primary=create(game,'hfoo',500,0),nearby=create(game,'hfoo',500,200),outside=create(game,'hfoo',500,1200);
  game.random=()=>.5;game.cast(caster,fourCC('A019'),null,{x:500,y:0},true);advance(game,.25);
  assert.equal(primary.hp,1e9);assert.equal(nearby.hp,1e9);assert.ok(game.spellProjectiles.some(shot=>shot.code==='ANst'));
  advance(game,1.5);assert.ok(primary.hp<1e9);assert.ok(nearby.hp<1e9);assert.equal(outside.hp,1e9);
});

test('summoned factories accept a rally point and send their children to it',()=>{
  const game=make(),caster=create(game,'h04E',0,0,0),ability=game.ability('A07L');
  game.cast(caster,fourCC('A07L'),null,{x:0,y:200},true);
  const factory=[...game.units.values()].find(unit=>unit.raw===ability.UnitID1);
  assert.equal(abilityControls(data,factory.raw,'ARal').targeting,'point');
  assert.equal(game.action(0,{type:'cast',unit:factory.hid,ability:'ARal',x:1200,y:200}),true);
  advance(game,4.05);
  const child=[...game.units.values()].find(unit=>unit.raw===ability.DataB1&&unit.summoner===caster);
  assert.ok(child);assert.equal(child.move.manual,true);assert.equal(child.move.x,1200);assert.equal(child.move.y,200);
});

test('an explicit move command suppresses attacks until the summon reaches its destination',()=>{
  const game=make(),unit=create(game,'efon',0,0,0),enemy=create(game,'hfoo',100,0);unit.ai=true;unit.cooldown=0;
  assert.equal(game.action(0,{type:'move',unit:unit.hid,x:600,y:0}),true);advance(game,.1);
  assert.equal(enemy.hp,1e9);assert.equal(game.effects.some(effect=>effect.kind==='projectile'&&effect.sourceId===unit.hid),false);
  game.moveUnit(enemy,650,0);advance(game,2);assert.ok(enemy.hp<1e9);
});
