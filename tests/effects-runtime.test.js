import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { OriginalEffects } from '../public/original-world.js';
import { BattleEffects } from '../public/effects.js';
import { modelResource } from '../public/warcraft.js';
import { pickBattleObject } from '../public/selection.js';

const manifest=JSON.parse(await readFile(new URL('../public/warcraft/manifest.json',import.meta.url),'utf8'));
const clap='Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl';
const wave='Abilities\\Spells\\Orc\\Shockwave\\ShockwaveMissile.mdl';
function fixture(){
  const scene=new THREE.Scene(),instances=[];
  const assets={manifest,has:path=>Boolean(manifest.models[modelResource(path)]),attach:async()=>{
    const instance={cues:[],elapsed:0,disposed:false,cue(name){this.cues.push(name);},advance(dt){this.elapsed+=dt;},dispose(){this.disposed=true;}};
    instances.push(instance);return instance;
  }};
  return{scene,assets,instances,effects:new OriginalEffects(scene,assets,new Map(),{ground:(x,y)=>y>0?2:0})};
}

test('source effects destroyed in the same tick still animate once at the correct terrain position',async()=>{
  const {effects,scene,instances}=fixture(),event={id:1,kind:'model',x:128,y:256,model:clap,persistent:true,destroyed:true};
  assert.equal(effects.handle(event),true);const record=effects.live.get(1);await record.ready;
  assert.equal(record.phase,'ending');assert.equal(record.sequence,'stand');
  assert.deepEqual(record.root.position.toArray(),[1,2.05,-2]);
  effects.update(.25,new Map(),[event]);assert.equal(effects.live.size,1);assert.equal(instances[0].elapsed,.25);
  effects.update(2,new Map(),[event]);assert.equal(effects.live.size,0);assert.equal(scene.children.length,0);assert.equal(instances[0].disposed,true);
});

test('native spell missiles use the source model, line length, animation and corrected server coordinates',async()=>{
  const {effects}=fixture();
  const spell={id:2,kind:'spell',code:'AOsh',x:0,y:128,tx:256,ty:128,lineLength:800,visual:{Missileart:wave,Missilespeed:'600'}};
  assert.equal(effects.handle(spell),true);const record=effects.live.get('2:missile:0');await record.ready;
  assert.equal(record.flight.end.x,800/128);assert.equal(record.flight.end.z,-1);
  effects.update(.2,new Map(),[spell]);assert.ok(record.root.position.x>0);assert.ok(record.instance.elapsed>0);
  assert.equal(effects.handle({id:3,kind:'projectile',model:wave,x:0,y:128,tx:600,ty:128,missileSpeed:900}),true);
  const missile=effects.live.get(3);await missile.ready;
  effects.handle({id:4,kind:'projectile-update',projectileId:3,x:64,y:128,tx:700,ty:256,remaining:.8,height:90});
  assert.equal(missile.flight.start.z,-1);assert.equal(missile.flight.end.z,-2);
  effects.handle({id:5,kind:'impact',projectileId:3,x:700,y:256,tx:700,ty:256});
  assert.equal(missile.phase,'ending');assert.equal(missile.instance.cues.at(-1),'death');
  effects.dispose();
});

test('attached effects resolve prefixed unit IDs and observe destruction in later snapshots',async()=>{
  const {effects}=fixture(),target=new THREE.Group();target.position.set(4,3,-5);target.userData.entity={ownerColor:2};
  target.userData.warcraft={attachment(name,out){assert.equal(name,'chest');return out.copy(target.position).add(new THREE.Vector3(0,.5,0));}};
  const units=new Map([['u8',target]]),event={id:6,kind:'model',x:512,y:640,targetId:8,model:wave,attachment:'chest',follow:true,persistent:true};
  effects.units=units;effects.handle(event);const record=effects.live.get(6);await record.ready;
  effects.update(.1,units,[event]);assert.deepEqual(record.root.position.toArray(),[4,3.5,-5]);
  target.position.x=8;effects.update(.1,units,[{...event,destroyed:true}]);
  assert.equal(record.root.position.x,8);assert.equal(record.phase,'ending');assert.equal(record.sequence,'death');
  effects.update(2,units,[]);assert.equal(effects.live.size,0);
});

test('channel spell models stop when the server interrupts them after the ordinary event retention window',async()=>{
  const {effects}=fixture(),event={id:60,kind:'spell',code:'AEsf',x:0,y:0,persistent:true,visual:{Casterart:clap}};
  effects.handle(event);const record=effects.live.get('60:casterart:0');await record.ready;
  effects.update(5,new Map(),[event]);assert.equal(record.phase,'playing');
  effects.update(.1,new Map(),[{...event,destroyed:true}]);assert.equal(record.phase,'ending');
  effects.update(2,new Map(),[]);assert.equal(effects.live.size,0);
});

test('disposing an effect before asynchronous model loading completes releases the late instance',async()=>{
  const {effects,assets,scene}=fixture();let resolve;
  assets.attach=()=>new Promise(done=>{resolve=done;});
  effects.handle({id:7,kind:'model',model:clap,x:0,y:0});const record=effects.live.get(7);effects.dispose();
  const instance={disposed:false,dispose(){this.disposed=true;}};resolve(instance);await record.ready;
  assert.equal(instance.disposed,true);assert.equal(scene.children.length,0);assert.equal(record.root.userData.released,true);
});

test('fallback spell positions use the same north/south transform and elevation as units',()=>{
  const effects=new BattleEffects(new THREE.Scene(),{ground:()=>2});
  effects.consume([{id:1,kind:'lightning',x:128,y:256,tx:384,ty:512}]);
  const positions=effects.live[0].object.geometry.attributes.position.array;
  assert.equal(positions[0],1);assert.equal(positions[2],-2);assert.equal(positions.at(-3),3);assert.equal(positions.at(-1),-4);
  effects.dispose();
});

test('an oversized building model cannot select the neighbouring ground square',()=>{
  const building=new THREE.Group();building.userData.entity={id:1,x:0,y:0,building:true};
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(5,8,5));building.add(mesh);
  const intersections=[{object:mesh}];
  assert.equal(pickBattleObject(intersections,{x:0,y:0}),building);
  assert.equal(pickBattleObject(intersections,{x:0,y:70}),building,'the model body remains clickable over an overlapping placement');
  assert.equal(pickBattleObject([],{x:0,y:0},[building]),building,'a small floating item tower is selectable by its occupied footprint');
  for(const point of [{x:128,y:0},{x:0,y:128},{x:-128,y:0},{x:0,y:-128},{x:100,y:0}])assert.equal(pickBattleObject(intersections,point),null);
  mesh.geometry.dispose();mesh.material.dispose();
});

test('original set lightning links animate persistently until the source destroys them',()=>{
  const scene=new THREE.Scene(),effects=new BattleEffects(scene,{ground:()=>2});
  const link={id:1,kind:'lightning',persistent:true,code:'SPLK',x:128,y:256,tx:384,ty:512};
  effects.consume([link]);effects.update(2,[link]);
  assert.equal(effects.stats().setLinks,1);
  const positions=effects.live[0].object.geometry.attributes.position;
  assert.equal(positions.getX(0),1);assert.equal(positions.getZ(0),-2);assert.equal(positions.getZ(24),-4);
  for(let id=2;id<310;id++)effects.consume([{id,kind:'hit',x:128,y:256,tx:384,ty:512}]);
  assert.equal(effects.stats().setLinks,1,'combat effect pressure cannot evict a persistent set link');
  effects.update(.05,[{...link,destroyed:true}]);assert.equal(effects.stats().setLinks,0);
  effects.dispose();
});
