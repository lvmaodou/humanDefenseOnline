import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Runtime, rawId } from '../engine/runtime.js';
import { PathingGrid } from '../engine/pathing.js';
import { checkBuildPlacement, originalBuildBlockers } from '../public/placement.js';
import { sampleTerrainHeight } from '../public/terrain-height.js';
import { originalItemSources } from '../engine/item-sources.js';

const root=new URL('../content/original-3.0/',import.meta.url);
const data=JSON.parse(await readFile(new URL('data.json',root),'utf8'));
const terrain=JSON.parse(await readFile(new URL('terrain.json',root),'utf8'));
const world=JSON.parse(await readFile(new URL('../public/map/visuals.json',import.meta.url),'utf8'));
terrain.buildBlockers=originalBuildBlockers(world.doodads);
terrain.buildableTiles=terrain.tiles.map(id=>Number(world.terrainTileData[id]?.buildable)===1);
const reference=JSON.parse(await readFile(new URL('gameplay.json',root),'utf8'));
const makeGame=(members=[{slot:0,name:'守卫'}],seed=7)=>new Runtime(data,members,seed,terrain,reference.rules);

test('original item purchases require real shop stock and the map only supplies its scripted items',async()=>{
  const script=await readFile(new URL('script.j',root),'utf8'),sources=originalItemSources(data,script);
  assert.equal(Object.values(sources).filter(item=>item.inMap).length,19);
  assert.equal(Object.values(sources).some(item=>item.purchasable),false,'ngme exists in stock tables but is never placed by this map');
  assert.deepEqual(sources.I001.sources,['击杀掉落']);assert.deepEqual(sources.I000.sources,['地图剧情']);
  assert.equal(sources.stwp.inMap,false,'an unused stock item does not become a purchasable map item');
  const game=makeGame();game.start();const worker=game.createUnit(game.players[0],game.fourCC('h002'),0,0);game.players[0].gold=10000;
  assert.throws(()=>game.buy(0,worker,data.items.I001),/未设置/);assert.equal(worker.inventory.length,0);assert.equal(game.players[0].gold,10000);
  const allowed=new Set(Object.keys(sources).filter(id=>sources[id].sources.includes('击杀掉落')));
  for(let i=0;i<30;i++){
    assert.ok(allowed.has(rawId(game.natives.ChooseRandomItemBJ(10))));
    assert.ok(allowed.has(rawId(game.natives.ChooseRandomItemEx('ITEM_TYPE_ANY',8))));
  }
});

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
  assert.equal(game.players[0].startX,-3008);assert.equal(game.players[0].startY,2432);
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

test('story passive items follow smart pickup orders and cannot be consumed as active items',()=>{
  const game=makeGame([]),worker=game.createUnit(game.players[0],game.fourCC('h001'),0,0),item=game.natives.CreateItemLoc(game.fourCC('I000'),worker);
  assert.equal(game.globals.bj_lastCreatedItem,item);
  assert.equal(game.natives.IssueNeutralTargetOrder(game.players[0],worker,'smart',game.globals.bj_lastCreatedItem),true);
  assert.equal(item.carrier,worker);
  assert.equal(worker.target??null,null);
  assert.equal(worker.itemStats.fireDamage,5);
  assert.equal(game.action(0,{type:'item',unit:worker.hid,item:item.hid}),false);
  assert.equal(item.carrier,worker);
  assert.equal(item.charges,0,'the source passive orb has no consumable charges');
  assert.equal(game.dropItem(worker,item),true);
  assert.equal(worker.itemStats.fireDamage,0);
  assert.equal(game.pickup(worker,item),true);
  assert.equal(worker.itemStats.fireDamage,5);
  game.tick(.05);assert.deepEqual(game.errors,[]);
});

test('real wave deaths follow the original drop rolls, cutoff and all eighteen item choices',()=>{
  const game=makeGame();game.start();game.tick(1.05);game.tasks=[];game.timers=[];
  const worker=game.createUnit(game.players[0],game.fourCC('h001'),-3008,2560);
  const cases=[
    {standard:true,wave:45,rolls:[[10,1],[20,2]],drop:1},
    {standard:true,wave:45,rolls:[[10,1],[20,1]],drop:0},
    {standard:true,wave:45,rolls:[[10,2]],drop:0},
    {standard:false,wave:45,rolls:[[100,1]],drop:1},
    {standard:false,wave:45,rolls:[[100,2]],drop:0},
    {standard:true,wave:46,rolls:[],drop:0},
    {standard:false,wave:46,rolls:[],drop:0}
  ];
  for(const sample of cases){
    game.globals.udg_biaozhunwupin=sample.standard;game.globals.udg_waves=sample.wave;
    const rolls=[...sample.rolls],before=game.items.size;
    game.natives.GetRandomInt=(min,max)=>{const expected=rolls.shift();assert.ok(expected,'no extra drop roll');assert.deepEqual([min,max],[1,expected[0]]);return expected[1];};
    const enemy=game.createUnit(game.players[8],game.fourCC('nanc'),-2752,2816);game.kill(enemy,worker);
    assert.equal(game.items.size-before,sample.drop,JSON.stringify(sample));assert.equal(rolls.length,0);assert.equal(enemy.removed,true);
  }
  game.globals.udg_waves=1;game.globals.udg_biaozhunwupin=true;game.natives.GetRandomInt=(min,max)=>max===20?2:1;
  const pool=Object.entries(data.items).filter(([,item])=>item.pickRandom===1&&item.oldLevel===10).map(([id])=>id),seen=new Set();
  assert.equal(pool.length,18);
  for(const [index,id]of pool.entries()){
    game.random=()=> (index+.25)/pool.length;
    const enemy=game.createUnit(game.players[8],game.fourCC('nanc'),-2752,2816);game.kill(enemy,worker);
    const drop=[...game.items.values()].at(-1);assert.equal(drop.raw,id);assert.deepEqual([drop.x,drop.y],[enemy.x,enemy.y]);seen.add(drop.raw);
  }
  assert.equal(seen.size,18);assert.deepEqual(game.errors,[]);
});

test('the original neutral Jaina table makes eight independent half-chance drops only once',()=>{
  for(const success of [false,true]){
    const game=makeGame();game.start();game.tasks=[];game.timers=[];game.random=()=>success ? .25 : .75;
    const jaina=game.globals.gg_unit_Hjai_0009,before=game.items.size;
    game.natives.SetUnitOwner(jaina,game.players[0]);
    assert.equal(game.items.size-before,success?8:0);
    for(const item of game.items.values())assert.deepEqual([item.x,item.y],[jaina.x,jaina.y]);
    game.kill(jaina);assert.equal(game.items.size-before,success?8:0,'the table trigger destroys itself after the first owner change/death');
    assert.deepEqual(game.errors,[]);
  }
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
  player.gold=10;
  assert.equal(game.snapshot().players.find(entry=>entry.slot===0).goldDrain,false);
  for(let i=0;i<20;i++)game.tick(.05);
  assert.equal(player.gold,10,'unused toggle skill must not spend gold');
  game.cast(hero,game.fourCC('A098'));
  assert.equal(game.globals.udg_baijia[1],true);
  assert.equal(game.snapshot().players.find(entry=>entry.slot===0).goldDrain,true);
  for(let i=0;i<10;i++)game.tick(.05);
  assert.equal(player.gold,9);
  game.cast(hero,game.fourCC('A098'));assert.equal(game.globals.udg_baijia[1],false);
  assert.equal(game.snapshot().players.find(entry=>entry.slot===0).goldDrain,false);
  const destination={x:hero.x+120,y:hero.y+80};
  game.cast(hero,game.fourCC('A04D'),null,destination);
  assert.equal(hero.x,destination.x);assert.equal(hero.y,destination.y);
  assert.equal(game.errors.length,0);
});

test('building direction follows original hunter skills rather than a universal turn action',()=>{
  const game=makeGame();game.start();
  for(let step=0;step<3;step++){
    const dialog=game.snapshot().dialogs.find(d=>d.players.includes(0));
    game.choose(0,dialog.id,dialog.buttons[step===2?1:0].id);
    for(let i=0;i<12;i++)game.tick(.05);
  }
  const hero=[...game.units.values()].find(u=>u.owner.id===0&&u.raw==='h002');
  assert.ok(hero);
  const facing=hero.facing;
  assert.equal(game.action(0,{type:'turn',unit:hero.hid,facing:45}),false);
  assert.equal(hero.facing,facing);
  const tower=game.action(0,{type:'build',unit:'h00L',x:hero.x,y:hero.y+384,facing:135});
  assert.equal(tower.facing,270,'client facing cannot rotate every building');
  assert.equal(tower.building,true);
  game.tick(game.data.units[tower.raw].bldtm+.05);
  tower.data=123;
  const gold=game.players[0].gold;
  assert.equal(game.action(0,{type:'cast',unit:tower.hid,ability:'A096'}),true);
  const replacement=[...game.units.values()].find(u=>u.owner.id===0&&u.raw===tower.raw&&u.hid!==tower.hid);
  assert.ok(replacement,'original hunter turn trigger replaces the building');
  assert.ok(Math.abs(replacement.facing%360)<1e-6);
  assert.equal(replacement.data,123,'turning keeps the original merit value');
  assert.equal(game.players[0].gold,gold,'turning does not spend build cost again');
  assert.equal(game.errors.length,0);
});

test('source pathing and 4x4 tower footprints apply without a player-start radius rule',()=>{
  const classBuildings=['h001','h002','h000','h004','h003','h06C'].flatMap(id=>data.units[id].Builds.split(','));
  assert.ok(classBuildings.every(id=>data.units[id].pathTex==='PathTextures\\4x4SimpleSolid.tga'&&data.units[id].preventPlace==='unbuildable'));
  const game=makeGame();game.start();
  for(let step=0;step<3;step++){
    const dialog=game.snapshot().dialogs.find(entry=>entry.players.includes(0));
    game.choose(0,dialog.id,dialog.buttons[step===2?1:0].id);
    for(let i=0;i<12;i++)game.tick(.05);
  }
  const hero=[...game.units.values()].find(unit=>unit.raw==='h002'&&unit.owner.id===0);
  let destination=null;
  for(let y=-6400;y<=6400&&!destination;y+=128)for(let x=-6400;x<=6400;x+=128){
    const distance=Math.hypot(x-hero.x,y-hero.y);
    if(distance<=2304||distance>3200)continue;
    const placement=checkBuildPlacement(terrain,[...game.units.values()],x,y);
    if(placement.valid){destination=placement;break;}
  }
  assert.ok(destination,'the map contains buildable ground beyond the old artificial circle');
  const gold=game.players[0].gold,tower=game.action(0,{type:'build',unit:'h00L',x:destination.x,y:destination.y});
  assert.equal(tower.x,destination.x);assert.equal(tower.y,destination.y);
  assert.equal(game.players[0].gold,gold-data.units.h00L.goldcost);
  assert.throws(()=>game.canBuild(0,'h00L',tower.x,tower.y),/重叠/);
  assert.equal(checkBuildPlacement(terrain,[],terrain.offset[0],terrain.offset[1]).valid,false,'the entire footprint must stay inside the map');
  assert.equal(checkBuildPlacement(terrain,[],terrain.offset[0]+64,terrain.offset[1]+64).reason,'地形不允许建造','source WPM still blocks unbuildable terrain');
  assert.equal(game.errors.length,0);
});

test('native WPM buildability and original tree footprints prevent construction on roads and decorations',()=>{
  const pathing={width:8,height:8,cell:32,flags:new Array(64).fill(64)},map={width:3,height:3,offset:[0,0],tileSize:128,pathing};
  assert.equal(checkBuildPlacement(map,[],128,128).valid,true);
  pathing.flags[3*8+3]=64|4;
  assert.equal(checkBuildPlacement(map,[],128,128).valid,true,'a no-fly flag alone does not prevent building');
  pathing.flags[3*8+3]=64|8;
  assert.equal(checkBuildPlacement(map,[],128,128).valid,false,'a single unbuildable square invalidates the full footprint');
  const tree=world.doodads.find(placement=>placement.id==='LTlt');
  assert.equal(checkBuildPlacement(terrain,[],tree.position[0],tree.position[1]).reason,'树木或装饰物占用此位置');
  const game=makeGame(),builder=game.createUnit(game.players[0],game.fourCC('h002'),tree.position[0]+256,tree.position[1]);
  game.players[0].gold=900;game.players[0].cap=65;
  assert.ok(builder);
  assert.throws(()=>game.canBuild(0,'h00L',tree.position[0],tree.position[1]),/树木或装饰物/);
});

test('grass footprints can sit flush with rendered cliffs while crossing footprints and explicit no-build cells stay blocked',()=>{
  const game=makeGame();game.createUnit(game.players[0],game.fourCC('h002'),4096,-6208);
  game.players[0].gold=900;game.players[0].cap=65;
  for(const x of [4096,-4608]){
    const y=-6400;
    assert.equal(checkBuildPlacement(terrain,[],x,y).valid,true,'the full grass square touches the visible cliff without overhang');
    assert.ok(game.canBuild(0,'h00L',x,y));
    const towardsCliff=x>0?-64:64;
    assert.equal(checkBuildPlacement(terrain,[],x+towardsCliff,y).valid,false,'moving half a square over the cliff is rejected');
  }
  const gold=game.players[0].gold,building=game.build(0,'h00L',4096,-6400);
  assert.equal(building.x,4096);assert.equal(building.y,-6400);
  assert.equal(game.players[0].gold,gold-data.units.h00L.goldcost);
  assert.throws(()=>game.canBuild(0,'h00L',4096,-6272),/重叠/,'a hunter must reserve its larger promoted form instead of assuming a 128 square');
  assert.ok(game.canBuild(0,'h00L',4096,-6208),'edge-aligned buildings retain a valid site beyond the actual reserved base');
  assert.throws(()=>game.canBuild(0,'h00L',4096,-6336),/重叠/);
  const explicit={...terrain,pathing:{...terrain.pathing,flags:[...terrain.pathing.flags]}};
  const column=(4096-48-terrain.offset[0])/32,row=(-6400-48-terrain.offset[1])/32;
  explicit.pathing.flags[Math.floor(row)*explicit.pathing.width+Math.floor(column)]=8;
  assert.equal(checkBuildPlacement(explicit,[],4096,-6400).valid,false,'an explicit forbidden cell is never treated as cliff clearance');
  const rock={...terrain,buildableTiles:terrain.buildableTiles.map(()=>false)};
  assert.equal(checkBuildPlacement(rock,[],4096,-6400).valid,false,'nonbuildable surface types cannot use cliff clearance');
  assert.equal(sampleTerrainHeight(terrain,3968,-6400),-128);
  assert.equal(checkBuildPlacement(terrain,[],3968,-6400).valid,false,'ravine roads remain unbuildable');
});

test('enabled defender weapons use integer rolls and source waves retain disabled weapons',()=>{
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
  assert.equal(defender.hp,defenderHp,'the source wave has weapsOn=0');
  assert.ok(defender.cooldown>0);
  assert.equal(creep.cooldown,0);
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
  const expectedSpell=100*.75;
  assert.ok(Math.abs((beforeSpell-normal.hp)-expectedSpell)<1e-9);
});

test('map speed cap and researched upgrade levels affect live unit stats',()=>{
  const game=new Runtime(data,[],7,null,reference.rules),builder=game.createUnit(game.players[0],game.fourCC('h001'),0,0);
  game.setMove(builder,{x:1000,y:0});
  game.tick(.05);
  assert.equal(game.moveSpeed(builder),522);
  assert.ok(Math.abs(builder.x-26.1)<1e-9);

  const ranger=game.createUnit(game.players[0],game.fourCC('h03J'),2000,0);
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

test('path grid routes around blocked cells and clamps blocked destinations to walkable ground',()=>{
  const flags=new Uint8Array(7*7);
  for(let y=0;y<5;y++)flags[y*7+3]=2;
  const pathfinder=new PathingGrid({offset:[0,0],pathing:{width:7,height:7,cell:32,flags}});
  const start={x:48,y:48},destination={x:176,y:48},path=pathfinder.findPath(start,destination);
  assert.ok(path.length>1);
  assert.ok(path.some(point=>point.y>=160));
  let previous=start;
  for(const point of path){assert.equal(pathfinder.segmentWalkable(previous,point),true);previous=point;}

  const routeGame=new Runtime(data,[],7,{offset:[0,0],pathing:{width:7,height:7,cell:32,flags:new Uint8Array(flags)}}),walker=routeGame.createUnit(routeGame.players[0],routeGame.fourCC('hfoo'),48,48);
  assert.equal(routeGame.setMove(walker,{x:176,y:48}),true);
  for(let i=0;i<100&&walker.move;i++){routeGame.tick(.05);assert.equal(routeGame.pathfinder.isWalkable(walker.x,walker.y),true);}
  assert.equal(walker.move,null);
  assert.ok(Math.hypot(walker.x-176,walker.y-48)<1e-6);

  flags[1*7+1]=2;
  flags[1*7+5]=2;
  const blockedStartPath=pathfinder.findPath(start,destination);
  assert.ok(blockedStartPath.length>0);
  assert.equal(pathfinder.isWalkable(blockedStartPath[0].x,blockedStartPath[0].y),true);
  assert.equal(pathfinder.isWalkable(blockedStartPath.at(-1).x,blockedStartPath.at(-1).y),true);
});

test('source WPM pathing routes within a lane and rejects unreachable map regions',()=>{
  const game=makeGame([]),walker=game.createUnit(game.players[0],game.fourCC('hfoo'),-3008,2432),nearby={x:-2800,y:2432},separateRegion={x:-6000,y:-6000};
  const path=game.pathfinder.findPath(walker,nearby);
  assert.ok(path?.length);
  assert.equal(game.pathfinder.findPath(walker,separateRegion),null);
  assert.equal(game.setMove(walker,nearby),true);
  for(let index=0;index<100&&walker.move;index++){game.tick(.05);assert.equal(game.pathfinder.isWalkable(walker.x,walker.y),true);}
  assert.equal(walker.move,null);
  assert.ok(Math.hypot(walker.x-nearby.x,walker.y-nearby.y)<1);
  assert.equal(game.setMove(walker,separateRegion),false);
});

test('missile attacks resolve damage only when their original projectile flight completes',()=>{
  const game=makeGame([]),attacker=game.createUnit(game.players[0],game.fourCC('h01K'),0,0),target=game.createUnit(game.players[8],game.fourCC('hfoo'),600,0);
  target.hp=target.maxHp=1e9;attacker.target=target;
  game.tick(.05);
  const before=target.hp,projectile=game.effects.findLast(effect=>effect.kind==='projectile');
  assert.equal(game.projectiles.length,1);
  assert.equal(projectile.flightTime,600/1800);
  game.tick(.25);
  assert.equal(target.hp,before);
  game.tick(.05);
  assert.equal(target.hp,before);
  game.tick(.05);
  assert.ok(target.hp<before);
  assert.equal(game.projectiles.length,0);
});

test('homing missiles recalculate travel time and target coordinates after movement',()=>{
  const game=makeGame([]),attacker=game.createUnit(game.players[0],game.fourCC('h01K'),0,0),target=game.createUnit(game.players[8],game.fourCC('hfoo'),600,0);
  target.hp=target.maxHp=1e9;attacker.target=target;game.tick(.05);game.moveUnit(target,800,0);
  game.tick(.25);
  assert.equal(target.hp,1e9);
  assert.ok(game.effects.some(effect=>effect.kind==='projectile-update'));
  game.tick(.2);
  assert.ok(target.hp<1e9);
});

test('missile bounce and concentric splash use the original weapon fields',()=>{
  const splashGame=makeGame([]),mage=splashGame.createUnit(splashGame.players[0],splashGame.fourCC('h02G'),0,0),primary=splashGame.createUnit(splashGame.players[8],splashGame.fourCC('hfoo'),200,0),full=splashGame.createUnit(splashGame.players[8],splashGame.fourCC('hfoo'),240,0),half=splashGame.createUnit(splashGame.players[8],splashGame.fourCC('hfoo'),270,0),quarter=splashGame.createUnit(splashGame.players[8],splashGame.fourCC('hfoo'),350,0);
  for(const unit of [primary,full,half,quarter])unit.hp=unit.maxHp=1e9;
  mage.target=primary;splashGame.time=.05;splashGame.updateCombat(.05);splashGame.time=.25;splashGame.updateCombat(0);
  const losses=[primary,full,half,quarter].map(unit=>1e9-unit.hp);
  assert.ok(Math.abs(losses[1]/losses[0]-1)<1e-9);
  assert.ok(Math.abs(losses[2]/losses[0]-.5)<1e-9);
  assert.ok(Math.abs(losses[3]/losses[0]-.25)<1e-9);

  const bounceGame=makeGame([]),bouncer=bounceGame.createUnit(bounceGame.players[0],bounceGame.fourCC('h05P'),0,0),first=bounceGame.createUnit(bounceGame.players[8],bounceGame.fourCC('hfoo'),100,0),second=bounceGame.createUnit(bounceGame.players[8],bounceGame.fourCC('hfoo'),200,0);
  first.hp=first.maxHp=second.hp=second.maxHp=1e9;bouncer.target=first;bounceGame.time=.05;bounceGame.updateCombat(.05);bounceGame.time=.25;bounceGame.updateCombat(0);
  assert.equal(second.hp,1e9,'the bounce must travel from the first target');bounceGame.time=.5;bounceGame.updateCombat(0);
  const firstLoss=1e9-first.hp,secondLoss=1e9-second.hp;
  assert.ok(firstLoss>0&&secondLoss>0);
  assert.ok(Math.abs(secondLoss/firstLoss-(1-data.units.h05P.damageLoss1))<1e-9);
});

test('mline weapons damage targets along their fixed projectile path',()=>{
  const game=makeGame([]),swordsman=game.createUnit(game.players[0],game.fourCC('h06K'),0,0),primary=game.createUnit(game.players[8],game.fourCC('hfoo'),300,0),lineTarget=game.createUnit(game.players[8],game.fourCC('hfoo'),500,100),outside=game.createUnit(game.players[8],game.fourCC('hfoo'),500,350);
  for(const unit of [primary,lineTarget,outside])unit.hp=unit.maxHp=1e9;
  swordsman.target=primary;game.time=.05;game.updateCombat(.05);
  assert.equal(game.projectiles.length,1);
  game.time=1;game.updateCombat(0);
  assert.ok(primary.hp<1e9);
  assert.ok(lineTarget.hp<1e9);
  assert.equal(outside.hp,1e9);
});

test('all six profession attacks run their passive and map-trigger effects',()=>{
  const game=makeGame([]);game.start();game.random=()=>0;
  game.globals.udg_waves=4;game.globals.udg_biaozhuncs[0]=1;game.globals.udg_biaozhuncs[1]=2;
  const professions=[['barbarian','h01K','A040'],['hunter','h018','A091'],['rogue','h05T','A07F'],['mage','h02G','A00Q'],['ranger','h03G','A067'],['swordsman','h06K','A0D3']];
  const fixtures=professions.map(([name,unitId,abilityId],index)=>{
    const x=-6500+index*2400,tower=game.createUnit(game.players[0],game.fourCC(unitId),x,0),target=game.createUnit(game.players[8],game.fourCC('hfoo'),x+200,0);
    target.hp=target.maxHp=1e9;target.move=null;tower.target=target;tower.cooldown=100;
    assert.ok(tower.abilities.has(game.fourCC(abilityId)),`${name} has ${abilityId}`);
    let secondary=null;
    if(name==='hunter'||name==='swordsman'||name==='ranger'){
      const raw=name==='ranger'?'hgry':'hfoo',secondaryX=name==='swordsman'?x+300:x+100;secondary=game.createUnit(game.players[8],game.fourCC(raw),secondaryX,20);secondary.hp=secondary.maxHp=1e9;secondary.move=null;
    }
    return {name,tower,target,secondary,index};
  });
  for(const fixture of fixtures){
    for(const other of fixtures)other.tower.cooldown=100;
    fixture.target.x=fixture.tower.x+200;fixture.target.y=0;fixture.target.move=null;game.syncSpatial(fixture.target);
    if(fixture.secondary){fixture.secondary.x=fixture.tower.x+(fixture.name==='swordsman'?300:100);fixture.secondary.y=20;fixture.secondary.move=null;game.syncSpatial(fixture.secondary);}
    const goldBefore=fixture.tower.owner.gold;
    fixture.tower.cooldown=0;game.globals.udg_playerzz[0]=fixture.index+1;game.time+=.05;game.updateCombat(.05);
    const pending=game.projectiles.filter(projectile=>projectile.attacker===fixture.tower);
    const impactAt=Math.max(game.time,...pending.map(projectile=>projectile.impactAt));
    game.time=impactAt+.001;game.updateCombat(.001);fixture.buffs=[...fixture.target.buffs];fixture.goldGain=fixture.tower.owner.gold-goldBefore;
  }
  assert.ok(fixtures.find(f=>f.name==='barbarian').target.buffs.some(buff=>buff.kind==='stun'));
  assert.ok(fixtures.find(f=>f.name==='hunter').secondary.hp<1e9);
  assert.equal(fixtures.find(f=>f.name==='rogue').goldGain,2);
  assert.ok(fixtures.find(f=>f.name==='mage').buffs.some(buff=>buff.kind==='stun'));
  assert.ok(fixtures.find(f=>f.name==='ranger').secondary.hp<1e9);
  assert.ok(fixtures.find(f=>f.name==='swordsman').secondary.hp<1e9);
  assert.equal(game.errors.length,0);

  const airGame=makeGame([]),ranger=airGame.createUnit(airGame.players[0],airGame.fourCC('h03G'),0,0),flying=airGame.createUnit(airGame.players[8],airGame.fourCC('hgry'),200,0);
  flying.move=null;ranger.target=flying;airGame.updateCombat(.05);
  assert.equal(airGame.projectiles.length,1);
});

test('every tower tier in all six professions completes an attack without runtime errors',()=>{
  for(const profession of reference.classes){
    const game=makeGame([]);game.start();game.run('OpenTrigger',[profession.id+1]);game.random=()=>0;
    game.globals.udg_waves=4;game.globals.udg_playerzz[0]=profession.id+1;game.globals.udg_biaozhuncs[0]=1;game.globals.udg_biaozhuncs[1]=2;
    let attackingTowers=0;
    for(const [index,building] of profession.buildings.entries()){
      const x=-6000+index*1100,y=-6500,definition=game.data.units[building.id],tower=game.createUnit(game.players[0],game.fourCC(building.id),x,y),target=game.createUnit(game.players[8],game.fourCC('hfoo'),x+Math.max(24,Math.min(200,(Number(definition.rangeN1)||100)-10)),y);
      target.hp=target.maxHp=1e9;target.move=null;tower.target=target;tower.cooldown=0;
      if(game.data.units[tower.raw].weapTp1!=='_')attackingTowers++;
      game.tick(.05);tower.cooldown=100;game.tick(.5);
      assert.equal(game.errors.length,0,`${profession.name} ${building.id} script runtime`);
      if(game.data.units[tower.raw].weapTp1!=='_')assert.ok(game.effects.some(effect=>effect.sourceId===tower.hid&&['projectile','spell'].includes(effect.kind)),`${profession.name} ${building.id} attack or skill effect`);
    }
    assert.ok(attackingTowers>0,`${profession.name} has attack-capable tiers`);
  }
});

test('advanced profession passives use source damage, duration, and summon fields',()=>{
  const landAttack=(game,tower,target)=>{tower.target=target;tower.cooldown=0;game.time=.05;game.updateCombat(.05);game.time=5;game.updateCombat(0);};

  const pulverizeGame=makeGame([]);pulverizeGame.random=()=>0;
  const pulverizer=pulverizeGame.createUnit(pulverizeGame.players[0],pulverizeGame.fourCC('h01O'),0,0),primary=pulverizeGame.createUnit(pulverizeGame.players[8],pulverizeGame.fourCC('hfoo'),200,0),inner=pulverizeGame.createUnit(pulverizeGame.players[8],pulverizeGame.fourCC('hfoo'),800,0),outer=pulverizeGame.createUnit(pulverizeGame.players[8],pulverizeGame.fourCC('hfoo'),1000,0),outside=pulverizeGame.createUnit(pulverizeGame.players[8],pulverizeGame.fourCC('hfoo'),1150,0);
  for(const unit of [primary,inner,outer,outside])unit.hp=unit.maxHp=1e9;
  landAttack(pulverizeGame,pulverizer,primary);
  assert.equal(1e9-inner.hp,500*pulverizeGame.attackVsArmor.spells[data.units.hfoo.defType]);
  assert.equal(1e9-outer.hp,250*pulverizeGame.attackVsArmor.spells[data.units.hfoo.defType]);
  assert.equal(outside.hp,1e9);

  const poisonGame=makeGame([]),poisoner=poisonGame.createUnit(poisonGame.players[0],poisonGame.fourCC('h03Q'),0,0),poisonTarget=poisonGame.createUnit(poisonGame.players[8],poisonGame.fourCC('hfoo'),200,0),cloudVictim=poisonGame.createUnit(poisonGame.players[8],poisonGame.fourCC('hfoo'),450,0);
  for(const unit of [poisonTarget,cloudVictim])unit.hp=unit.maxHp=1e9;
  landAttack(poisonGame,poisoner,poisonTarget);
  const poisonBefore=cloudVictim.hp;
  poisonGame.time=6;poisonGame.updateCombat(1);
  assert.ok(poisonBefore-cloudVictim.hp>0&&poisonBefore-cloudVictim.hp<=300);
  assert.ok(poisonGame.effects.some(effect=>effect.kind==='area'&&effect.code==='Aapl'));

  const phoenixGame=makeGame([]),phoenix=phoenixGame.createUnit(phoenixGame.players[0],phoenixGame.fourCC('h02Q'),0,0),phoenixTarget=phoenixGame.createUnit(phoenixGame.players[8],phoenixGame.fourCC('hfoo'),200,0);
  phoenixTarget.hp=phoenixTarget.maxHp=1e9;
  landAttack(phoenixGame,phoenix,phoenixTarget);
  const afterFlame=phoenixTarget.hp;
  assert.ok(1e9-afterFlame>100);
  assert.ok(phoenixTarget.buffs.some(buff=>buff.kind==='burn'&&buff.damage===500&&buff.until===10));
  phoenixGame.time=6;phoenixGame.updateCombat(1);
  assert.ok(phoenixTarget.hp<afterFlame);

  const arrowGame=makeGame([]),archer=arrowGame.createUnit(arrowGame.players[0],arrowGame.fourCC('h03N'),0,0),doomed=arrowGame.createUnit(arrowGame.players[8],arrowGame.fourCC('hfoo'),200,0);
  doomed.hp=1;landAttack(arrowGame,archer,doomed);
  const skeletons=[...arrowGame.units.values()].filter(unit=>unit.raw==='ndr1'&&unit.summoner===archer);
  assert.equal(skeletons.length,1);
  assert.equal(skeletons[0].expires,10);
});

test('custom Afae profession casts run JASS effects without mana or generic slow',()=>{
  const game=makeGame();game.start();game.run('OpenTrigger',[1]);game.random=()=>0;
  const tower=game.createUnit(game.players[0],game.fourCC('h01M'),0,0),target=game.createUnit(game.players[8],game.fourCC('hfoo'),200,0);
  target.hp=target.maxHp=1e9;tower.target=target;tower.cooldown=0;game.time=.05;game.updateCombat(.05);
  assert.equal(tower.mana,0);
  assert.equal(tower.castCooldown.get(game.fourCC('A056')),5.05);
  assert.ok(target.hp<1e9);
  assert.equal(game.errors.length,0);

  const proxyGame=makeGame([]),proxy=proxyGame.createUnit(proxyGame.players[0],proxyGame.fourCC('h01M'),0,0),proxyTarget=proxyGame.createUnit(proxyGame.players[8],proxyGame.fourCC('hfoo'),200,0);
  assert.equal(proxyGame.cast(proxy,proxyGame.fourCC('A056'),proxyTarget),true);
  assert.equal(proxyTarget.buffs.some(buff=>buff.kind==='slow'),false);
});

test('map-defined autocast defaults are visible and disable their automatic combat effects',()=>{
  const game=makeGame();game.start();game.run('OpenTrigger',[1]);game.random=()=>0;
  const fae=game.createUnit(game.players[0],game.fourCC('h01M'),0,0),faeTarget=game.createUnit(game.players[8],game.fourCC('hfoo'),200,0);
  assert.equal(fae.autoCast.has(game.fourCC('A056')),true);
  assert.equal(game.snapshot().units.find(unit=>unit.id===fae.hid).abilities.find(ability=>ability.id==='A056').autocast,true);
  fae.target=faeTarget;fae.cooldown=0;
  assert.equal(game.action(0,{type:'autocast',unit:fae.hid,ability:'A056',enabled:false}),true);
  game.time=.05;game.updateCombat(.05);
  assert.equal(fae.castCooldown.has(game.fourCC('A056')),false);
  assert.equal(game.snapshot().units.find(unit=>unit.id===fae.hid).abilities.find(ability=>ability.id==='A056').autocast,false);
  assert.equal(game.action(0,{type:'cast',unit:fae.hid,ability:'A056',target:faeTarget.hid}),true);
  assert.ok(fae.castCooldown.has(game.fourCC('A056')),'manual casts remain available while autocast is off');

  const poison=game.createUnit(game.players[0],game.fourCC('h03Q'),1000,0),poisonTarget=game.createUnit(game.players[8],game.fourCC('hfoo'),1200,0);
  poisonTarget.hp=poisonTarget.maxHp=1e9;poison.target=poisonTarget;poison.cooldown=0;
  assert.equal(game.snapshot().units.find(unit=>unit.id===poison.hid).abilities.find(ability=>ability.id==='A06K').autocastSupported,false);
  assert.throws(()=>game.action(0,{type:'autocast',unit:poison.hid,ability:'A06K',enabled:false}),/自动施法/);
  game.time=.1;game.updateCombat(.05);
  assert.equal((game.zones||[]).some(zone=>zone.source===poison&&zone.kind==='Aapl'),false);
  assert.throws(()=>game.action(0,{type:'autocast',unit:poison.hid,ability:'A04E',enabled:false}),/自动施法/);

  const archer=game.createUnit(game.players[0],game.fourCC('h03N'),2000,0),victim=game.createUnit(game.players[8],game.fourCC('hfoo'),2200,0);
  victim.hp=1;archer.target=victim;archer.cooldown=0;
  assert.equal(archer.autoCast.has(game.fourCC('A016')),true);
  assert.equal(game.action(0,{type:'autocast',unit:archer.hid,ability:'A016',enabled:false}),true);
  game.time=.15;game.updateCombat(.05);
  assert.equal([...game.units.values()].some(unit=>unit.raw==='ndr1'&&unit.summoner===archer),false);
  assert.equal(game.errors.length,0);
});

test('target actions support clearing a manually assigned enemy',()=>{
  const game=makeGame(),tower=game.createUnit(game.players[0],game.fourCC('h03Q'),0,0),enemy=game.createUnit(game.players[8],game.fourCC('hfoo'),2000,0);
  assert.equal(game.action(0,{type:'target',unit:tower.hid,target:enemy.hid}),true);
  assert.equal(tower.target,enemy);
  game.tick(.05);
  assert.equal(tower.target,enemy,'the explicit target stays selected while outside tower range');
  assert.equal(tower.manualTarget,enemy);
  assert.equal(game.action(0,{type:'target',unit:tower.hid,target:null}),true);
  assert.equal(tower.target,null);
  assert.equal(tower.manualTarget,null);
  assert.equal(game.action(0,{type:'target',unit:tower.hid,target:enemy.hid}),true);
  game.kill(enemy);game.tick(.05);
  assert.equal(tower.manualTarget,null,'dead targets are released');

  const mover=game.createUnit(game.players[0],game.fourCC('h001'),-3008,2432),distant=game.createUnit(game.players[8],game.fourCC('hfoo'),-2200,2432);
  assert.equal(game.action(0,{type:'target',unit:mover.hid,target:distant.hid}),true);
  game.tick(.05);
  assert.ok(mover.move,'a movable unit paths toward its selected target');
  assert.equal(game.action(0,{type:'move',unit:mover.hid,x:-2500,y:2400}),true);
  assert.equal(mover.manualTarget,null,'a manual move clears the attack target order');
});

test('the original sell ability refunds unit life and removes the sold tower',()=>{
  const game=makeGame();game.start();
  const tower=game.createUnit(game.players[0],game.fourCC('h01K'),-3008,2432),gold=game.players[0].gold,refund=Math.floor(tower.hp);
  assert.equal(game.cast(tower,game.fourCC('A01H')),true);
  assert.equal(game.players[0].gold,gold+refund);
  assert.equal(tower.death,true);
  assert.equal(tower.removed,true);
  assert.equal(game.errors.length,0);
});

test('usable and passive inventory items apply their original ability effects',()=>{
  const game=makeGame([]),hero=game.createUnit(game.players[0],game.fourCC('h001'),4000,0),mage=game.createUnit(game.players[0],game.fourCC('h004'),4200,0);
  const give=(unit,id)=>{const item=game.createItem(id,{x:unit.x,y:unit.y});assert.equal(game.action(unit.owner.id,{type:'pickup',unit:unit.hid,item:item.hid}),true);return item;};
  hero.maxHp+=1000;hero.hp=hero.maxHp-500;
  const health=give(hero,'phea'),healthBefore=hero.hp;
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:health.hid}),true);
  assert.equal(hero.hp,healthBefore+250);
  assert.equal(game.items.has(health.hid),false);

  mage.maxMana=400;mage.mana=0;
  const mana=give(mage,'pman');
  assert.equal(game.action(0,{type:'item',unit:mage.hid,item:mana.hid}),true);
  assert.equal(mage.mana,150);

  hero.hp-=200;const ally=game.createUnit(game.players[0],game.fourCC('h002'),4050,0);ally.maxHp+=1000;ally.hp=ally.maxHp-200;
  const scroll=give(hero,'shea');
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:scroll.hid}),true);
  assert.equal(hero.hp,hero.maxHp-300);
  assert.equal(ally.hp,ally.maxHp-50);

  give(hero,'ckng');give(hero,'modt');give(hero,'ofir');give(hero,'ocor');give(hero,'oven');
  assert.deepEqual(hero.itemStats.attributes,{strength:5,agility:5,intelligence:5});
  assert.equal(hero.itemStats.lifeSteal,.5);
  assert.equal(hero.itemStats.fireDamage,5);
  assert.equal(hero.itemStats.damage,15);
  assert.equal(hero.itemStats.poisonDamage,9);
  assert.equal(hero.itemStats.airAttack,true);
  const target=game.createUnit(game.players[8],game.fourCC('hfoo'),4050,50),nearby=game.createUnit(game.players[8],game.fourCC('hfoo'),4080,65);
  target.hp=target.maxHp=1e9;nearby.hp=nearby.maxHp=1e9;hero.hp=hero.maxHp-500;hero.target=target;hero.cooldown=0;
  const heroBefore=hero.hp,nearbyBefore=nearby.hp;game.updateCombat(.05);
  assert.ok(hero.hp>heroBefore);
  assert.ok(nearby.hp<nearbyBefore);
  assert.ok(target.buffs.some(buff=>buff.kind==='armor'&&buff.amount===5));
  assert.ok(target.buffs.some(buff=>buff.kind==='poison'&&buff.source===hero));

  const towerItem=give(hero,'tsct'),beforeBuild=game.units.size;
  const charges=towerItem.charges;
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:towerItem.hid,x:4300,y:300}),false);
  assert.equal(towerItem.charges,charges);
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:towerItem.hid,x:4050,y:20}),true);
  const watchTower=[...game.units.values()].find(unit=>unit.raw==='hwtw'&&unit.owner===hero.owner);
  assert.ok(game.units.size>beforeBuild);
  assert.ok(watchTower);
  const returnItem=give(hero,'stwp'),beforeTeleport={x:hero.x,y:hero.y};
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:returnItem.hid,target:watchTower.hid,x:beforeTeleport.x,y:beforeTeleport.y}),true);
  assert.ok(Math.hypot(hero.x-watchTower.x,hero.y-watchTower.y)<400);
  assert.equal(hero.move,null);
});

test('targeted items, temporary buffs, resurrection and start-location travel follow source data',()=>{
  const game=makeGame([]),hero=game.createUnit(game.players[0],game.fourCC('h001'),0,0),ally=game.createUnit(game.players[0],game.fourCC('hfoo'),80,0),enemy=game.createUnit(game.players[8],game.fourCC('hfoo'),120,0);
  const give=(unit,id)=>{const item=game.createItem(id,{x:unit.x,y:unit.y});assert.equal(game.action(unit.owner.id,{type:'pickup',unit:unit.hid,item:item.hid}),true);return item;};

  const haste=give(hero,'shas');
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:haste.hid}),true);
  assert.ok(ally.buffs.some(buff=>buff.kind==='haste'&&buff.factor===2&&buff.until===10));
  const reveal=give(hero,'dust');
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:reveal.hid}),true);
  assert.ok(enemy.buffs.some(buff=>buff.kind==='revealed'&&buff.until===20));
  const immunity=give(ally,'pams'),before=ally.hp;
  assert.equal(game.action(0,{type:'item',unit:ally.hid,item:immunity.hid}),true);
  game.damage(enemy,ally,100,false,'DAMAGE_TYPE_MAGIC');
  assert.equal(ally.hp,before);
  game.damage(enemy,ally,100,false,'DAMAGE_TYPE_NORMAL');
  assert.ok(ally.hp<before);
  const moon=give(hero,'moon');
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:moon.hid}),true);
  assert.equal(game.nightUntil,30);

  const clarity=give(hero,'plcl');
  hero.maxMana=200;hero.mana=0;
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:clarity.hid}),true);
  game.tick(1);
  assert.ok(Math.abs(hero.mana-100/30)<1e-9);

  const corpse=game.createUnit(game.players[8],game.fourCC('hfoo'),160,0);game.kill(corpse);
  const resurrection=give(hero,'rnec');
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:resurrection.hid,target:corpse.hid}),true);
  const skeletons=[...game.units.values()].filter(unit=>unit.raw==='uske'&&unit.summoner===hero);
  assert.equal(skeletons.length,2);
  assert.ok(skeletons.every(unit=>unit.expires===66));

  const home=game.createUnit(game.players[0],game.fourCC('htow'),400,400),recipient=game.createUnit(game.players[0],game.fourCC('hfoo'),100,200),preservation=give(hero,'spre');
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:preservation.hid,target:recipient.hid}),true);
  assert.ok(Math.hypot(recipient.x-home.x,recipient.y-home.y)<32);
  const sanctuaryTarget=game.createUnit(game.players[0],game.fourCC('hfoo'),300,300),sanctuary=give(hero,'ssan');
  sanctuaryTarget.hp-=100;const wounded=sanctuaryTarget.hp;
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:sanctuary.hid,target:sanctuaryTarget.hid}),true);
  assert.ok(sanctuaryTarget.buffs.some(buff=>buff.kind==='stun'));
  game.tick(1.1);
  assert.ok(sanctuaryTarget.hp>=wounded+15);

  const farTarget=game.createUnit(game.players[0],game.fourCC('hfoo'),1000,1000),farSanctuary=give(hero,'ssan');
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:farSanctuary.hid,target:farTarget.hid}),false);
  assert.equal(farSanctuary.charges,0,'the reusable source staff has no consumable charges');

  const returnScroll=give(hero,'stwp');
  hero.owner.startX=-3008;hero.owner.startY=2432;
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:returnScroll.hid}),true);
  assert.ok(Math.hypot(hero.x+3008,hero.y-2432)<32);
  assert.equal(game.errors.length,0);
});

test('remaining active items apply level, blight, summon, and lightning-orb behavior',()=>{
  const game=makeGame([]);game.random=()=>0;
  const hero=game.createUnit(game.players[0],game.fourCC('h001'),0,0),enemy=game.createUnit(game.players[8],game.fourCC('hfoo'),50,0);
  const give=id=>{const item=game.createItem(id,{x:hero.x,y:hero.y});assert.equal(game.action(0,{type:'pickup',unit:hero.hid,item:item.hid}),true);return item;};

  const orb=give('oli2');
  assert.equal(hero.itemStats.damage,5);
  hero.target=enemy;hero.cooldown=0;game.time=.05;game.updateCombat(.05);
  assert.ok(enemy.buffs.some(buff=>buff.kind==='slow'&&buff.factor===.65));

  const tome=give('tkno'),level=hero.level;
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:tome.hid}),true);
  assert.equal(hero.level,level+1);

  const skull=give('skul');
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:skull.hid,x:250,y:0}),true);
  assert.equal(game.blightZones.length,1);
  assert.deepEqual({x:game.blightZones[0].x,y:game.blightZones[0].y,radius:game.blightZones[0].radius},{x:250,y:0,radius:350});

  const critter=give('mcri'),unitsBefore=game.units.size;
  assert.equal(game.action(0,{type:'item',unit:hero.hid,item:critter.hid}),true);
  const scout=[...game.units.values()].find(unit=>unit.mechanicalCritter&&unit.summoner===hero);
  assert.equal(game.units.size,unitsBefore+1);
  assert.equal(scout.raw,'ncrb');
  assert.equal(scout.owner,hero.owner);
  assert.equal(scout.useFood,false);
  assert.equal(game.errors.length,0);
});
