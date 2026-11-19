import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Runtime,fourCC} from '../engine/runtime.js';

const data=JSON.parse(await readFile(new URL('../content/original-3.0/data.json',import.meta.url),'utf8'));
const rules=JSON.parse(await readFile(new URL('../content/original-3.0/gameplay.json',import.meta.url),'utf8')).rules;
const make=()=>new Runtime(data,[{slot:0,name:'A'}],7,{offset:[-4096,-4096],pathing:{width:256,height:256,cell:32,flags:new Uint8Array(256*256)}},rules);
const create=(game,id,x=0,y=0,owner=0)=>{
  const unit=game.createUnit(game.players[owner],fourCC(id),x,y);
  unit.hp=unit.maxHp=1e14;unit.stats.hpRegen=0;unit.cooldown=1e6;return unit;
};
const advance=(game,duration)=>{const end=game.time+duration;while(game.time<end-.000001){const dt=Math.min(.05,end-game.time);game.time+=dt;game.updateCombat(dt);}};
const magicDamage=(game,unit,amount)=>amount*game.attackVsArmor.spells[data.units[unit.raw].defType];

test('source ground summons remain ground weapon targets despite flying movement',()=>{
  for(const type of ['n004','n005','n006','efon','osw1','osw2','osw3','hwat','hwt2','hwt3','h037','n008','nlv1']){
    const game=make(),attacker=create(game,'hfoo'),summon=create(game,type,60,0,8);
    assert.equal(data.units[type].movetp,'fly',type);assert.equal(game.isFlying(summon),true,type);
    assert.equal(game.targetPlane(summon),'ground',type);
    attacker.cooldown=0;advance(game,.01);assert.ok(summon.hp<1e14,type);
  }
  const game=make(),attacker=create(game,'hfoo'),flying=create(game,'hgry',60,0,8);
  attacker.cooldown=0;advance(game,.01);assert.equal(flying.hp,1e14);
});

test('hunter max slaughter respects the source nonhero mask on every original boss',()=>{
  const strike=type=>{
    const game=make(),hunter=create(game,'h01A'),target=create(game,type,200,0,8);
    hunter.abilities=new Map([[fourCC('A0B9'),1]]);game.refreshItemStats(hunter);hunter.cooldown=0;hunter.target=target;game.random=()=>0;
    advance(game,.01);hunter.cooldown=1e6;advance(game,1);
    return{game,hunter,target,damage:1e14-target.hp};
  };
  const ordinary=strike('hfoo');assert.ok(ordinary.damage>1e8);
  for(const type of data.bossUnits){
    const {game,hunter,target,damage}=strike(type),definition=data.units[hunter.raw];
    const base=(Number(definition.dmgplus1)||0)+(Number(definition.dice1)||0);
    const expected=base/(1+.06*game.currentArmor(target))*game.attackVsArmor[definition.atkType1][data.units[type].defType];
    assert.ok(Math.abs(damage-expected)<.02,`${type}: ${damage} versus ${expected}`);
    assert.equal(target.death,false,type);
  }
});

test('invalid manual spell targets spend neither mana nor cooldown and do not fire JASS',()=>{
  const game=make(),caster=create(game,'hfoo'),target=create(game,'hfoo',200,0,8),id=fourCC('A010');
  game.natives.UnitAddAbility(caster,id);caster.mana=1000;
  game.applyBuff(target,{kind:'magicImmune',until:5});
  assert.equal(game.action(0,{type:'cast',unit:caster.hid,ability:'A010',target:target.hid}),false);
  assert.equal(caster.mana,1000);assert.equal(caster.castCooldown.has(id),false);assert.equal(game.effects.some(effect=>effect.code==='AEer'),false);
  target.buffs=[];game.natives.UnitAddAbility(target,fourCC('Aloc'));
  assert.equal(game.action(0,{type:'cast',unit:caster.hid,ability:'A010',target:target.hid}),false);
  assert.equal(caster.castCooldown.has(id),false);
  game.natives.UnitRemoveAbilityBJ(fourCC('Aloc'),target);
  assert.equal(game.action(0,{type:'cast',unit:caster.hid,ability:'A010',target:target.hid}),true);
  assert.ok(target.buffs.some(buff=>buff.kind==='root'));
});

test('recasting lightning shield refreshes one shield without stacking damage or delaying ticks',()=>{
  const game=make(),caster=create(game,'e00D'),second=create(game,'e00D',0,100),carrier=create(game,'hfoo',200,0,8),victim=create(game,'hfoo',300,0,8);
  const ability=game.ability('A075');
  assert.equal(game.cast(caster,fourCC('A075'),carrier),true);advance(game,.5);
  assert.equal(game.cast(second,fourCC('A075'),carrier),true);
  game.removeUnit(caster);game.removeUnit(second);advance(game,.5);
  assert.equal(game.spellZones.filter(zone=>zone.shieldKey==='Blsh'&&zone.count>0).length,1);
  assert.equal(carrier.buffs.filter(buff=>buff.kind==='lightningShield').length,1);
  assert.ok(Math.abs(1e14-victim.hp-magicDamage(game,victim,ability.DataA1))<.02);
  assert.equal(carrier.hp,1e14);
  const effects=game.effects.filter(effect=>effect.persistent&&effect.targetId===carrier.hid&&!effect.destroyed);
  assert.equal(effects.length,1);assert.match(effects[0].model,/LightningShieldTarget/i);
  const before=victim.hp;advance(game,1);
  assert.ok(Math.abs(before-victim.hp-magicDamage(game,victim,ability.DataA1))<.02);
  advance(game,3);assert.equal(game.spellZones.some(zone=>zone.shieldKey==='Blsh'),false);assert.equal(effects[0].destroyed,true);
});

test('shackles attach the target buff model rather than the empty caster buff',()=>{
  const game=make(),caster=create(game,'e00V'),target=create(game,'Udea',200,0,8);
  assert.equal(game.natives.IssueTargetOrderById(caster,852480,target),true);
  const effect=game.effects.find(effect=>effect.persistent&&effect.targetId===target.hid);
  assert.ok(effect);assert.match(effect.model,/AerialShacklesTarget/i);assert.equal(effect.attachment,'chest,mount');
  advance(game,data.abilityData.A0DN.HeroDur1+.05);assert.equal(effect.destroyed,true);
});

test('channeling suppresses attacks and movement until it ends or receives an interrupt',()=>{
  for(const interrupt of ['move','attack','spell','stop','stun','silence','remove']){
    const game=make(),caster=create(game,'hfoo'),target=create(game,'hfoo',300,0,8);
    game.natives.UnitAddAbility(caster,fourCC('A011'));caster.cooldown=0;
    assert.equal(game.cast(caster,fourCC('A011')),true);advance(game,.51);
    assert.ok(caster.channel,interrupt);const before=target.hp;
    assert.equal(game.effects.some(effect=>effect.kind==='projectile'&&effect.sourceId===caster.hid),false);
    if(interrupt==='move')assert.equal(game.action(0,{type:'move',unit:caster.hid,x:-600,y:0}),true);
    if(interrupt==='attack')game.action(0,{type:'target',unit:caster.hid,target:target.hid});
    if(interrupt==='spell')game.cast(caster,fourCC('A04D'),null,{x:-600,y:0},true);
    if(interrupt==='stop')game.natives.IssueImmediateOrderById(caster,851972);
    if(interrupt==='remove')game.removeUnit(caster);
    if(interrupt==='stun'||interrupt==='silence')game.applyBuff(caster,{kind:interrupt,until:game.time+.2});
    caster.cooldown=1e6;advance(game,.6);
    assert.equal(caster.channel,null,interrupt);assert.equal(target.hp,before,interrupt);
    assert.equal(game.spellZones.some(zone=>zone.channel===caster),false,interrupt);
    assert.equal(game.effects.find(effect=>effect.kind==='spell'&&effect.code==='AEsf').destroyed,true,interrupt);
  }
});

test('a rejected cast keeps an existing channel and a finished channel resumes combat',()=>{
  const game=make(),caster=create(game,'e002'),target=create(game,'hfoo',200,0,8),ability=game.ability('A011');
  game.cast(caster,fourCC('A011'));const channel=caster.channel;
  caster.castCooldown.set(fourCC('A010'),game.time+5);
  assert.equal(game.cast(caster,fourCC('A010'),target),false);assert.equal(caster.channel,channel);
  const waves=Math.floor(ability.Dur1/ability.DataB1);
  advance(game,ability.Dur1+.05);
  assert.equal(caster.channel,null);assert.equal(game.spellZones.length,0);
  assert.ok(Math.abs(1e14-target.hp-magicDamage(game,target,ability.DataA1)*waves)<.1);
});

test('channel snapshots restore the active pose on reconnect and retain interrupt events past three seconds',()=>{
  const game=make(),caster=create(game,'e002');game.cast(caster,fourCC('AEsf'),null,null,true);
  const effect=caster.channel.effect;game.tick(4);
  assert.ok(game.effects.includes(effect));assert.equal(effect.persistent,true);
  assert.equal(game.snapshot().units.find(unit=>unit.id===caster.hid).channel.ability,'AEsf');
  game.natives.IssueImmediateOrderById(caster,851972);game.tick(.05);
  assert.equal(game.snapshot().units.find(unit=>unit.id===caster.hid).channel,undefined);
  assert.equal(game.snapshot().effects.find(entry=>entry.id===effect.id).destroyed,true);
  game.tick(3.05);assert.equal(game.effects.includes(effect),false);
});
