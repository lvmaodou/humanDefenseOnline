import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime, rawId } from '../engine/runtime.js';

const root=new URL('../content/original-3.0/',import.meta.url);
const data=JSON.parse(await readFile(new URL('data.json',root),'utf8'));
const terrain=JSON.parse(await readFile(new URL('terrain.json',root),'utf8'));
const reference=JSON.parse(await readFile(new URL('gameplay.json',root),'utf8'));
const makeGame=(members=[{slot:0,name:'守卫'}],seed=7)=>new Runtime(data,members,seed,terrain,reference.rules);

test('generated reference pack retains imported source tables, map identity, and custom gameplay constants',()=>{
  assert.equal(reference.source.sha256,data.source.sha256);
  assert.equal(reference.map.metadataName,'人族无敌III 3.0终极版');
  assert.equal(reference.map.sourceName,'人族无敌II3.0终极版');
  assert.equal(reference.map.embeddedName,'人族无敌II3.0终极版');
  assert.equal(reference.rules.sourceGameplayConstants.PickupItemRange,99999);
  assert.equal(reference.rules.sourceGameplayConstants.MaxUnitSpeed,522);
  const game=makeGame([]);
  assert.equal(game.rules.PickupItemRange,99999);
  assert.equal(game.attackVsArmor.pierce.normal,1);
  assert.equal(game.attackVsArmor.pierce.none,1.5);
  assert.equal(game.attackVsArmor.spells.normal,.75);
  assert.deepEqual(reference.rules.combat.sourceDamageBonusOverrides.DamageBonusSpells,[.95,.95,.95,.9,.95,.75,.05,.95]);
  assert.equal(reference.counts.units,Object.keys(data.units).length);
  assert.equal(reference.counts.items,Object.keys(data.items).length);
  assert.equal(reference.classes.length,6);
  assert.ok(reference.classes.every(c=>c.buildings.length===11));
  assert.equal(reference.waves.length,56);
  assert.equal(reference.waves[0].unit.id,'nanc');
  assert.equal(reference.waves[55].unit.id,'ninf');
  assert.deepEqual(reference.bosses.map(b=>b.wave),[10,20,30,40,50]);
  assert.equal(reference.finalBoss.id,'H05V');
  assert.ok(reference.counts.classActionTriggers>100);
});

test('version 3.0 source content retains original classes, enemies, and late-game waves',()=>{
  assert.deepEqual(['野蛮人','猎人','盗贼','术士','游侠','魔剑士'],Object.values(data.arrays.zhiyexuanze));
  assert.equal(data.waveUnits.length,56);
  assert.deepEqual(['Udea','Ulic','Udre','Ucrl','Hvsh'],data.bossUnits);
  assert.ok(Object.keys(data.items).length>200);
  assert.ok(Object.keys(data.abilityData).length>800);
});

test('converted original startup presents original mode, difficulty, and class choices',()=>{
  const game=makeGame();game.start();
  let dialog=game.snapshot().dialogs.find(d=>d.players.includes(0));
  assert.equal(dialog.title,'请选择游戏模式');game.choose(0,dialog.id,dialog.buttons[0].id);
  dialog=game.snapshot().dialogs.find(d=>d.players.includes(0));
  for(let i=0;i<12;i++)game.tick(.05);
  dialog=game.snapshot().dialogs.find(d=>d.players.includes(0));
  assert.equal(dialog.title,'请选择游戏难度');game.choose(0,dialog.id,dialog.buttons[0].id);
  for(let i=0;i<12;i++)game.tick(.05);
  dialog=game.snapshot().dialogs.find(d=>d.players.includes(0));
  assert.equal(dialog.title,'请选择你喜欢的职业');game.choose(0,dialog.id,dialog.buttons[0].id);
  assert.ok(game.snapshot().units.some(u=>u.owner===0&&u.type==='h001'));
  assert.equal(game.errors.length,0);
});

test('converted periodic spawn script reaches the first original wave without script errors',()=>{
  const game=makeGame();game.start();const chosen=new Set();
  for(let i=0;i<900&&!game.globals.udg_waves;i++){
    for(const d of game.snapshot().dialogs){if(chosen.has(d.id))continue;chosen.add(d.id);game.choose(0,d.id,d.buttons[0].id);}
    game.tick(.05);
  }
  assert.equal(game.globals.udg_waves,1);assert.equal(rawId(game.globals.udg_EnemyType[1]),'nanc');assert.equal(game.errors.length,0);
});

test('original periodic wave triggers reach wave 56 without script errors',()=>{
  const game=makeGame();game.start();game.updateCombat=()=>{};const chosen=new Set();let steps=0;
  for(;steps<5000&&game.globals.udg_waves<56&&game.status==='playing';steps++){
    for(const dialog of game.dialogs.values())if(dialog.visible.has(0)&&!chosen.has(dialog.hid)){chosen.add(dialog.hid);game.choose(0,dialog.hid,dialog.buttons[0].hid);}
    game.tick(1);
    if(game.errors.length)break;
  }
  assert.equal(game.globals.udg_waves,56);
  assert.equal(rawId(game.globals.udg_EnemyType[56]),'ninf');
  assert.ok(game.units.size>8000);
  assert.equal(game.errors.length,0);
});

test('ground items use the source map pickup range',()=>{
  const game=makeGame();game.start();
  let dialog=game.snapshot().dialogs[0];game.choose(0,dialog.id,dialog.buttons[0].id);
  for(let i=0;i<12;i++)game.tick(.05);
  dialog=game.snapshot().dialogs[0];game.choose(0,dialog.id,dialog.buttons[0].id);
  for(let i=0;i<12;i++)game.tick(.05);
  dialog=game.snapshot().dialogs[0];game.choose(0,dialog.id,dialog.buttons[0].id);
  const hero=[...game.units.values()].find(u=>u.owner.id===0&&u.raw==='h001');
  const item=game.createItem('ratf',{x:hero.x+1000,y:hero.y});
  assert.equal(game.action(0,{type:'pickup',unit:hero.hid,item:item.hid}),true);
  const distant=game.createItem('ratf',{x:hero.x+100000,y:hero.y});
  assert.equal(game.action(0,{type:'pickup',unit:hero.hid,item:distant.hid}),false);
  game.action(0,{type:'drop',unit:hero.hid,item:item.hid});
  item.x=hero.x;item.y=hero.y;
  assert.equal(game.action(0,{type:'pickup',unit:hero.hid,item:item.hid}),true);
  assert.equal(hero.inventory.length,1);
});

test('rogue map triggers toggle the gold drain and blink moves to the chosen point',()=>{
  const game=makeGame();game.start();
  let dialog=game.snapshot().dialogs[0];game.choose(0,dialog.id,dialog.buttons[0].id);
  for(let i=0;i<12;i++)game.tick(.05);
  dialog=game.snapshot().dialogs[0];game.choose(0,dialog.id,dialog.buttons[0].id);
  for(let i=0;i<12;i++)game.tick(.05);
  dialog=game.snapshot().dialogs[0];game.choose(0,dialog.id,dialog.buttons[2].id);
  const player=game.players[0],hero=[...game.units.values()].find(u=>u.owner===player&&u.raw==='h000');
  assert.ok(hero);
  player.gold=10;game.cast(hero,game.fourCC('A098'));
  assert.equal(game.globals.udg_baijia[1],true);
  for(let i=0;i<10;i++)game.tick(.05);
  assert.equal(player.gold,9);
  game.cast(hero,game.fourCC('A098'));assert.equal(game.globals.udg_baijia[1],false);
  const destination={x:hero.x+120,y:hero.y+80};
  game.cast(hero,game.fourCC('A04D'),null,destination);
  assert.equal(hero.x,destination.x);assert.equal(hero.y,destination.y);
  assert.equal(game.errors.length,0);
});

test('turn actions update unit facing and normalize angles',()=>{
  const game=makeGame();game.start();
  for(let step=0;step<3;step++){
    const dialog=game.snapshot().dialogs.find(d=>d.players.includes(0));
    game.choose(0,dialog.id,dialog.buttons[0].id);
    for(let i=0;i<12;i++)game.tick(.05);
  }
  const hero=[...game.units.values()].find(u=>u.owner.id===0&&u.raw==='h001');
  assert.ok(hero);
  assert.equal(game.action(0,{type:'turn',unit:hero.hid,facing:45}),true);
  assert.equal(hero.facing,45);
  assert.equal(game.action(0,{type:'turn',unit:hero.hid,facing:405}),true);
  assert.equal(hero.facing,45);
  const tower=game.action(0,{type:'build',unit:'h01R',x:hero.x,y:hero.y+384,facing:135});
  assert.equal(tower.facing,135);
  assert.equal(tower.building,true);
  assert.equal(game.errors.length,0);
});

test('original weapon rows drive attacks on both teams with integer damage rolls',()=>{
  const game=makeGame();
  const defender=game.createUnit(game.players[0],game.fourCC('hfoo'),0,0);
  const creep=game.createUnit(game.players[8],game.fourCC('nanc'),30,0);
  const defenderHp=defender.hp,creepHp=creep.hp,seed=game.seed;
  const nextSeed=(Math.imul(1664525,seed)+1013904223)>>>0;
  const random=nextSeed/4294967296;
  const weapon=data.units.hfoo;
  const rolledDamage=(Number(weapon.dmgplus1)||0)+(Number(weapon.dice1)||0)*(1+Math.floor(random*(Number(weapon.sides1)||1)));
  const armor=Number(data.units.nanc.def)||0;
  const expectedDamage=rolledDamage*(armor>=0?1/(1+.06*armor):2-Math.pow(.94,-armor));
  const regeneration=(Number(data.units.nanc.regenHP)||0)*.05;
  game.tick(.05);
  assert.ok(Math.abs((creepHp-creep.hp)-(expectedDamage-regeneration))<1e-9);
  assert.ok(defender.hp<defenderHp);
  assert.ok(defender.cooldown>0);
  assert.ok(creep.cooldown>0);
});

test('weapon damage applies the current runtime attack-type versus armor-type multiplier',()=>{
  const game=makeGame();
  const attacker=game.createUnit(game.players[0],game.fourCC('hfoo'),0,0);
  const target=game.createUnit(game.players[8],game.fourCC('ncp3'),30,0);
  target.abilities.delete(game.fourCC('Avul'));
  const before=target.hp,armor=Number(data.units.ncp3.def)||0;
  const expected=100*(armor>=0?1/(1+.06*armor):2-Math.pow(.94,-armor));
  game.damage(attacker,target,100,true,'DAMAGE_TYPE_NORMAL','pierce');
  assert.ok(Math.abs((before-target.hp)-expected)<1e-9);
  const normal=game.createUnit(game.players[8],game.fourCC('nanc'),100,100);
  const beforeSpell=normal.hp,spellArmor=Number(data.units.nanc.def)||0;
  game.damage(attacker,normal,100,true,'DAMAGE_TYPE_MAGIC','spells');
  const expectedSpell=100*.75*(spellArmor>=0?1/(1+.06*spellArmor):2-Math.pow(.94,-spellArmor));
  assert.ok(Math.abs((beforeSpell-normal.hp)-expectedSpell)<1e-9);
});

test('map speed cap and researched upgrade levels affect live unit stats',()=>{
  const game=makeGame([]),builder=game.createUnit(game.players[0],game.fourCC('h001'),0,0);
  builder.move={x:1000,y:0};
  game.tick(.05);
  assert.equal(game.moveSpeed(builder),522);
  assert.ok(Math.abs(builder.x-26.1)<1e-9);

  const ranger=game.createUnit(game.players[0],game.fourCC('h018'),2000,0);
  const baseRange=ranger.stats.attackRange;
  game.natives.SetPlayerTechResearched(game.players[0],game.fourCC('R005'),1);
  assert.equal(ranger.stats.attackRange,baseRange+100);

  const creep=game.createUnit(game.players[8],game.fourCC('nanc'),5000,0),baseRegen=creep.stats.hpRegen;
  game.natives.SetPlayerTechResearchedSwap(game.fourCC('R007'),4,game.players[8]);
  creep.hp-=10;
  game.tick(1);
  assert.ok(Math.abs(creep.stats.hpRegen-(baseRegen+.2+3*.3))<1e-9);
  assert.ok(Math.abs(creep.hp-(creep.maxHp-10+baseRegen+.2+3*.3))<1e-9);
});
