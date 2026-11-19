import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Runtime } from '../engine/runtime.js';
import { buildingFootprints } from '../public/building-footprints.js';
import { buildingFootprint, checkBuildPlacement } from '../public/placement.js';
import { polygonBounds } from '../public/footprint-geometry.js';
import { buildBuildingFootprints, originalPathingSize } from '../tools/build_building_footprints.mjs';
import { professionRoster } from '../tools/audit_professions.mjs';
import { pickBattleObject } from '../public/selection.js';

const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const data = await read('../content/original-3.0/data.json');
const rules = (await read('../content/original-3.0/gameplay.json')).rules;
function flatMap({ offset = [-512, -512], height = () => 0, width = 9 } = {}) {
  const tileSize = 128, pathWidth = (width - 1) * 4;
  return {
    width, height: width, offset, tileSize,
    heights: Array.from({ length: width * width }, (_, i) => height(offset[0] + i % width * tileSize, offset[1] + Math.floor(i / width) * tileSize)),
    pathing: { width: pathWidth, height: pathWidth, cell: 32, flags: new Array(pathWidth * pathWidth).fill(64) }
  };
}
const place = (terrain, x = 0, y = 0, type = 'h007', options = {}, units = []) => checkBuildPlacement(terrain, units, x, y, { type, ...options });

test('all 240 profession forms have reproducible footprints from their original pathing and standing MDX bases', async () => {
  const manifest = await read('../public/warcraft/manifest.json');
  assert.deepEqual(await buildBuildingFootprints(data, manifest), buildingFootprints, 'regenerate the shared profiles after changing models or original unit data');
  const roster = professionRoster(data), forms = roster.flatMap(row => row.buildings);
  assert.equal(forms.length, 240);
  assert.ok(forms.every(id => buildingFootprints[id]?.pathing.join(',') === '128,128'));
  assert.equal(forms.filter(id => buildingFootprints[id].base.length).length, 221, 'unit, creature and prop models are measured along with architectural models');
  const tower = polygonBounds(buildingFootprints.h052.base);
  assert.ok(tower.maxX - tower.minX > 147 && tower.maxX - tower.minX < 149, 'the solid tower base is wider than the pathing square');
  assert.ok(tower.maxY - tower.minY > 130 && tower.maxY - tower.minY < 132);
  assert.ok(Object.values(tower).every(value => Math.abs(value) < 100), 'roof, birth scaffolding and death debris do not inflate the base');
});

test('actual base rotation and original model scale are applied without using the selection-circle scale', () => {
  const tower = polygonBounds(buildingFootprint('h052'));
  assert.ok(Math.abs(tower.minX + 67.583) < .001);
  assert.ok(Math.abs(tower.minY + 87.453) < .001);
  const opposite = polygonBounds(buildingFootprint('h052', 0, 0, 90));
  assert.ok(Math.abs(opposite.maxX + tower.minX) < .001);
  assert.ok(Math.abs(opposite.maxY + tower.minY) < .001);
  for (const type of ['h007', 'h055', 'h057', 'h052', 'h053', 'h054']) {
    assert.equal(data.units[type].modelScale, 1);
    assert.equal(data.units[type].scale, 2.5);
    assert.deepEqual(buildingFootprint(type), buildingFootprint('h052'));
  }
});

test('construction reserves larger future bases, including all three magic swordsman set upgrades', () => {
  for (const [base, upgrade] of [['h078', 'h07D'], ['h079', 'h07C'], ['h07A', 'h07B']]) {
    const small = polygonBounds(buildingFootprints[base].base);
    assert.ok(small.maxX - small.minX < 100);
    assert.deepEqual(buildingFootprint(base), buildingFootprint(upgrade));
    const reserved = polygonBounds(buildingFootprint(base));
    assert.ok(reserved.maxX - reserved.minX > 177);
  }
});

test('each cliff direction rejects a real base overhang while retaining flush placement for smaller buildings', () => {
  for (const [axis, sign, facing] of [[0, 1, 270], [0, -1, 90], [1, 1, 0], [1, -1, 180]]) {
    const terrain = flatMap({ height: (x, y) => [x, y][axis] * sign >= 0 ? 0 : -128 });
    assert.equal(place(terrain, 0, 0, 'h03J').valid, true, 'a complete 128 square is supported');
    assert.match(place(terrain, 0, 0, 'h007', { facing }).reason, /底座跨越/);
    const inland = [0, 0];inland[axis] = sign * 64;
    assert.equal(place(terrain, ...inland, 'h007', { facing }).valid, true);
  }
});

test('a tiny overhang at a diagonal cliff is detected between path-grid sample points', () => {
  const terrain = flatMap({ offset: [-480, -480], height: (x, y) => x + y >= -64 ? 0 : -128 });
  assert.equal(place(terrain, 0, 0, 'h00L').valid, true);
  assert.match(place(terrain).reason, /底座跨越/);
  assert.equal(place(terrain, 64, 0).valid, true);
});

test('neighbour collisions use both real footprints and allow touching small footprints', () => {
  const terrain = flatMap(), tower = { id: 1, type: 'h052', building: true, x: 0, y: 0, facing: 270 };
  for (const [x, y] of [[128, 0], [-128, 0], [0, 128], [0, -128]]) {
    assert.match(place(terrain, x, y, 'h007', {}, [tower]).reason, /底座重叠/);
  }
  for (const [x, y] of [[192, 0], [0, 192]]) assert.equal(place(terrain, x, y, 'h007', {}, [tower]).valid, true);
  assert.equal(place(terrain, 0, -128, 'h00L', {}, [tower]).valid, false, 'the existing larger base also blocks a small new building');
  assert.equal(place(terrain, 128, 0, 'h00L', {}, [{ ...tower, type: 'h00L' }]).valid, true);
  assert.equal(place(terrain, 0, 0, 'h007', { exclude: 1 }, [tower]).valid, true, 'upgrade checks exclude the existing unit itself');
  assert.equal(place(terrain, 0, 0, 'h007', {}, [{ ...tower, dead: true }]).valid, true);
  assert.equal(place(terrain, 0, 0, 'h007', {}, [{ ...tower, removed: true }]).valid, true);
});

test('the enlarged base is checked against map boundaries, decorations and every touched no-build cell', () => {
  const bounded = flatMap({ offset: [-64, -512] });
  assert.equal(place(bounded, 0, 0, 'h00L').valid, true);
  assert.match(place(bounded).reason, /地图边界/);
  const decorated = flatMap();decorated.buildBlockers = [{ x: -67, y: -62, halfWidth: 1, halfHeight: 1 }];
  assert.equal(place(decorated, 0, 0, 'h00L').valid, true);
  assert.match(place(decorated).reason, /装饰物/);
  const forbidden = flatMap(), index = 14 * forbidden.pathing.width + 13;
  forbidden.pathing.flags[index] = 72;
  assert.equal(place(forbidden, 0, 0, 'h00L').valid, true);
  assert.match(place(forbidden).reason, /地形不允许/);
  forbidden.pathing.flags[index] = 68;
  assert.equal(place(forbidden).valid, true, 'no-fly alone is not a build restriction');
});

function makeGame(workerType='h003') {
  const terrain = flatMap({ height: x => x >= 0 ? 0 : -128 });
  const game = new Runtime(data, [{ slot: 0, name: 'Footprint' }], 7, terrain, rules);
  game.start();game.tasks = [];game.timers = [];
  for (const unit of [...game.units.values()]) game.removeUnit(unit);
  const player = game.players[0];player.gold = 100000;player.lumber = 1000;player.cap = 65;
  const worker = game.createUnit(player, game.fourCC(workerType), 128, 0, 137);
  const item = game.createItem('I001', worker);assert.equal(game.pickup(worker, item), true);
  return { game, player, worker, item };
}

test('item construction uses the same footprint and facing as the preview and preserves equipment on invalid sites', () => {
  const { game, worker, item } = makeGame();
  assert.throws(() => game.action(0, { type: 'item', unit: worker.hid, item: item.hid, x: 0, y: 0 }), /底座跨越/);
  assert.equal(item.charges, 1);assert.equal(item.carrier, worker);
  assert.equal(game.action(0, { type: 'item', unit: worker.hid, item: item.hid, x: 64, y: 0 }), true);
  const tower = [...game.units.values()].find(unit => unit.raw === 'h007');
  assert.deepEqual([tower.x, tower.y, tower.facing], [64, 0, 270]);
  assert.equal(item.removed, true);
  game.tick(5.1);
  assert.equal(game.action(0, { type: 'upgrade', unit: tower.hid, to: 'h052' }), true);
  game.tick(10.1);assert.equal(tower.raw, 'h052');assert.deepEqual(game.errors, []);
});

test('legacy tower upgrades reject unsupported or overlapping larger bases before charging resources', () => {
  for (const blockedBy of ['cliff', 'neighbour']) {
    const { game, player } = makeGame();
    const tower = game.createUnit(player, game.fourCC('h007'), blockedBy === 'cliff' ? 0 : 128, 0, 270);
    if (blockedBy === 'neighbour') game.createUnit(player, game.fourCC('h00L'), 128, -128, 270);
    const balances = [player.gold, player.lumber, player.food];
    assert.throws(() => game.action(0, { type: 'upgrade', unit: tower.hid, to: 'h052' }), /升级后底座无法放置/);
    assert.deepEqual([player.gold, player.lumber, player.food], balances);
    assert.equal(tower.raw, 'h007');assert.equal(tower.upgradeTo, undefined);
  }
});

test('upgrading existing off-grid buildings validates their actual position without silently snapping', () => {
  const { game, player } = makeGame();
  const tower = game.createUnit(player, game.fourCC('h007'), 200, 20, 270);
  assert.equal(game.action(0, { type: 'upgrade', unit: tower.hid, to: 'h052' }), true);
  game.tick(10.1);assert.deepEqual([tower.x, tower.y], [200, 20]);
});

test('all twelve original pathing masks retain their actual TGA dimensions and pinned contents', async () => {
  const metadata=await read('../content/original-client/pathing-textures.json');
  assert.equal(Object.keys(metadata.textures).length,12);
  for(const [path,entry]of Object.entries(metadata.textures)){
    const bytes=await readFile(new URL(`../content/original-client/${path}`,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256);
    assert.deepEqual(originalPathingSize(path),[bytes.readUInt16LE(12)*32,bytes.readUInt16LE(14)*32]);
  }
  assert.deepEqual(buildingFootprints.nwgt.pathing,[640,640],'Waygate is a 20-cell mask, not the old 128 fallback');
  for(const id of ['unpl','unp1','unp2'])assert.deepEqual(buildingFootprints[id].pathing,[512,512]);
  assert.throws(()=>originalPathingSize('PathTextures/UnknownBuilding.tga'),/Unknown original pathing/);
});

test('large unit-model buildings and higher-than-zero front paws contribute real supporting ground', () => {
  for(const id of ['h024','h01R','h041','h026','h06O']){
    const bounds=polygonBounds(buildingFootprints[id].base);
    assert.ok(Math.max(...Object.values(bounds).map(Math.abs))>64,id);
    assert.ok(buildingFootprints[id].base.length>=3,id);
  }
  const wolf=polygonBounds(buildingFootprints.h06O.base);
  assert.ok(wolf.minX< -65&&wolf.maxX>78,'front and rear paws are both reserved even when front paws stand above z=4');
});

test('every profession promotion and paid upgrade fits the footprint reserved by its previous form', () => {
  const links=[];
  for(const [from,to,start,end]of [[1,2,1,24],[2,3,1,48],[3,4,25,72],[4,5,49,72]])for(let i=start;i<=end;i++)links.push([data.arrays[`level${from}`][i],data.arrays[`level${to}`][i]]);
  for(const row of professionRoster(data))for(const id of row.buildings)for(const to of String(data.units[id].Upgrade||'').split(',').filter(Boolean))links.push([id,to]);
  let checked=0;
  for(const [from,to]of links){
    if(!buildingFootprints[from]||!buildingFootprints[to])continue;
    for(const facing of [0,90,137,270]){
      const reserved=buildingFootprint(from,0,0,facing),next=buildingFootprint(to,0,0,facing);
      for(const point of next)assert.ok(reserved.every((a,i)=>{const b=reserved[(i+1)%reserved.length];return(b[0]-a[0])*(point[1]-a[1])-(b[1]-a[1])*(point[0]-a[0])>=-1e-5;}),`${from} -> ${to} at ${facing}`);
    }
    checked++;
  }
  assert.equal(checked,174,'120 populated promotion links and 54 paid upgrades');
});

test('later pathing masks are reserved even when neither model has a solid base', async () => {
  const profiles=await buildBuildingFootprints({units:{small:{isbldg:1,pathTex:'PathTextures/4x4SimpleSolid.tga',Upgrade:'large'},large:{isbldg:1,pathTex:'PathTextures/12x12Simple.tga'}},arrays:Object.fromEntries([1,2,3,4,5].map(level=>[`level${level}`,{}]))},{models:{}});
  assert.deepEqual(profiles.small.pathing,[128,128]);
  assert.deepEqual(profiles.small.reservedPathing,[384,384]);
});

test('ordinary construction rejects oversized creature bases before charging and keeps valid sites available', () => {
  const {game,player}=makeGame('h001');
  for(const required of String(data.units.h024.Requires||'').split(',').filter(Boolean))player.tech[required]=1;
  const before=[player.gold,player.lumber,player.food];
  assert.throws(()=>game.build(0,'h024',0,0),/底座跨越/);
  assert.deepEqual([player.gold,player.lumber,player.food],before);
  const first=game.build(0,'h024',128,0);
  assert.deepEqual([first.x,first.y,first.facing],[128,0,270]);
  assert.throws(()=>game.canBuild(0,'h024',256,0),/底座重叠/);
  assert.equal(game.canBuild(0,'h024',384,0).x,384);
});

test('special masks and unit-model bases are selectable at their outer occupied ground without stealing free neighbours', () => {
  const object=type=>({userData:{entity:{id:1,type,x:0,y:0,building:true,facing:270}}});
  for(const [type,x]of [['nwgt',300],['unpl',240]]){
    const building=object(type);
    assert.equal(pickBattleObject([],{x,y:0},[building]),building);
    assert.equal(pickBattleObject([],{x:384,y:0},[building]),null);
  }
  const creature=object('h024'),polygon=buildingFootprint('h024',0,0,270,{reserveUpgrades:false});
  const vertex=polygon.find(point=>Math.abs(point[0])>65||Math.abs(point[1])>65),point=vertex.map(value=>value*.99);
  assert.equal(pickBattleObject([],{x:point[0],y:point[1]},[creature]),creature);
  assert.equal(pickBattleObject([],{x:128,y:128},[creature]),null);
  assert.equal(pickBattleObject([],{x:84,y:0},[object('h078')]),null,'empty space reserved for a later upgrade is not the current visible base');
});

test('all 314 building profiles reject exactly the unsupported cliff sides and allow supported placement inland', () => {
  for(const [axis,sign,key]of [[0,1,'minX'],[0,-1,'maxX'],[1,1,'minY'],[1,-1,'maxY']]){
    const terrain=flatMap({width:17,offset:[-1024,-1024],height:(x,y)=>[x,y][axis]*sign>=0?0:-128});
    for(const type of Object.keys(buildingFootprints)){
      const bounds=polygonBounds(buildingFootprint(type)),reach=-sign*bounds[key],overhang=reach>64.0001;
      assert.equal(place(terrain,0,0,type).valid,!overhang,`${type} against ${key} cliff`);
      const inland=[0,0];inland[axis]=sign*Math.max(0,Math.ceil((reach-64)/64)*64);
      assert.equal(place(terrain,...inland,type).valid,true,`${type} fits inland at ${inland}`);
    }
  }
});
