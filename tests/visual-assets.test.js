import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseMDX } from 'war3-model';
import { modelResource, selectSequence, uploadModelTexture } from '../public/warcraft.js';
import { createUnitModel, releaseUnitModel } from '../public/models.js';
import { createOriginalWorld } from '../public/original-world.js';
import * as THREE from 'three';
import { sourceToWorld, worldToSource, cameraOffset, cameraVerticalFov, cameraGroundFootprint, cameraFootprintFits, clampCameraTarget, terrainSourceBounds, CLASSIC_CAMERA } from '../public/coordinates.js';
import { BattleEffects, effectStyle } from '../public/effects.js';
import { createTerrainGeometry, sampleTerrainHeight } from '../public/terrain-relief.js';
import { terrainCellLayers, terrainTileSource } from '../public/terrain-textures.js';

const readJson = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const data = await readJson('../content/original-3.0/data.json');
const visuals = await readJson('../public/map/visuals.json');
const terrain = await readJson('../public/map/terrain.json');
const assets = await readJson('../public/warcraft/manifest.json');
const classes = ['h001','h002','h000','h004','h003','h06C'];
const required = [...new Set([
  ...classes,
  ...classes.flatMap(id => String(data.units[id].Builds).split(',')),
  ...data.waveUnits,
  ...data.bossUnits,
  'H05V'
])];

test('original class builders, buildings, waves and bosses resolve to source MDX models', () => {
  assert.equal(new Set(classes.map(id => modelResource(data.units[id].file))).size, 1);
  assert.equal(modelResource(data.units.h001.file), 'units/human/peasant/peasant.mdx');
  assert.ok(classes.every(id => Number(data.units[id].modelScale) === 1));
  assert.equal(required.length, 134);
  for (const id of required) {
    const resource = modelResource(data.units[id].file);
    assert.ok(assets.models[resource], `${id}: ${resource}`);
    assert.ok(Number(data.units[id].modelScale ?? 1) > 0, `${id}: source model scale`);
  }
  assert.equal(data.waveUnits.length, 56);
  assert.equal(visuals.doodads.length, 266);
  assert.equal(visuals.sourceSha256, data.source.sha256);
});

test('source units marked without a model do not receive a fabricated mesh', () => {
  const unit = createUnitModel({ id: 1, type: 'e007', owner: 0, hp: 1, maxHp: 1 }, { file: '_' });
  assert.equal(unit.userData.style.representation, 'hidden-source');
  assert.equal(unit.userData.fallback, undefined);
  releaseUnitModel(unit);
});

test('doodad texture overrides keep their original BLP resource paths', () => {
  const attached = [], scene = new THREE.Scene();
  const assets = { has: () => true, attach: (...args) => attached.push(args) };
  createOriginalWorld(scene, assets, [{
    id: 'ATtr', variation: 0, position: [128, 256, 0], angle: 0, scale: [1, 1, 1],
    model: 'doodads/lordaerontree/treesummer0.mdx',
    textureOverrides: { 31: 'ReplaceableTextures\\LordaeronTree\\LordaeronSummerTree.blp' }
  }], () => 0);
  assert.deepEqual(attached[0][3], { 31: 'replaceabletextures/lordaerontree/lordaeronsummertree.blp' });
  assert.equal(scene.children[0].name, 'original-doodad:ATtr:0');
});

test('original Lordaeron tree crowns resolve the native replaceable foliage texture', async () => {
  const tree=visuals.doodads.find(placement=>placement.model?.includes('lordaerontree'));
  assert.ok(tree,'the map contains original Lordaeron tree placements');
  assert.equal(tree.textureOverrides?.['31']?.toLowerCase(),'replaceabletextures\\lordaerontree\\lordaeronsummertree.blp');
  assert.ok(assets.resources['replaceabletextures/lordaerontree/lordaeronsummertree.blp']);
  const modelPath=`../public/warcraft/${tree.model}`;
  const bytes=await readFile(new URL(modelPath,import.meta.url));
  const model=parseMDX(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
  assert.ok(model.Textures.some(texture=>texture.ReplaceableId===31));
});

test('native model texture uploads ignore terrain flip state and restore the shared context', () => {
  const values = new Map([[1, true], [2, true]]);
  const gl = {
    UNPACK_FLIP_Y_WEBGL: 1, UNPACK_PREMULTIPLY_ALPHA_WEBGL: 2,
    getParameter: parameter => values.get(parameter),
    pixelStorei: (parameter, value) => values.set(parameter, value)
  };
  let uploaded = false;
  uploadModelTexture({ setTextureImage(path, image) {
    assert.equal(path, 'tree.blp');
    assert.equal(image, 'tree-image');
    assert.equal(values.get(1), false, 'tree crown UVs keep the source image orientation');
    assert.equal(values.get(2), false, 'leaf cutouts keep straight alpha');
    uploaded = true;
  } }, gl, 'tree.blp', 'tree-image');
  assert.equal(uploaded, true);
  assert.deepEqual([...values.values()], [true, true]);
  assert.throws(() => uploadModelTexture({ setTextureImage() { throw new Error('upload failed'); } }, gl, 'tree.blp', null));
  assert.deepEqual([...values.values()], [true, true], 'upload failure also restores Three state');
});

test('the extracted Peasant keeps its original model and playable animation sequences', async () => {
  const resource = assets.models['units/human/peasant/peasant.mdx'];
  const bytes = await readFile(new URL(`../public${resource.url}`, import.meta.url));
  const model = parseMDX(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
  const names = model.Sequences.map(sequence => sequence.Name.toLowerCase());
  for (const action of ['stand','walk','attack','death']) {
    assert.ok(names.some(name => name.includes(action)), `${action} exists`);
    assert.ok(selectSequence(model.Sequences, action) >= 0, `${action} can be selected`);
  }
  assert.ok(selectSequence(model.Sequences, 'spell') >= 0, 'unsupported farmer spell action falls back to Stand');
  const lich = assets.models[modelResource(data.units.Ulic.file)];
  assert.ok(lich.sequences.some(sequence => /^spell(?:\s|$)/i.test(sequence.name)));
  assert.ok(selectSequence(lich.sequences.map(sequence => ({ Name: sequence.name, ...sequence })), 'spell') >= 0);
});

test('map conversion and default camera retain the original coordinates and values', () => {
  assert.deepEqual(sourceToWorld(128, 256), [1, -2]);
  assert.deepEqual(worldToSource(1, -2), [128, 256]);
  assert.ok(Math.abs(Math.hypot(...cameraOffset()) - CLASSIC_CAMERA.distance / 128) < 1e-8);
  assert.equal(CLASSIC_CAMERA.farZ, 5000);
  assert.ok(cameraVerticalFov() > 40 && cameraVerticalFov() < 50);
  assert.ok(visuals.camera.mapPresets.every(preset => preset.applicationCalls.length === 0));
});

test('terrain retains source texture masks and cliff levels for 3D rendering', () => {
  assert.equal(terrain.textureVariations.length, terrain.width * terrain.height);
  assert.ok(new Set(terrain.textureVariations.map(value => value & 31)).size > 1);
  assert.equal(terrain.cliffTypes.length, terrain.width * terrain.height);
  assert.ok(terrain.cliffs.includes('CLdi') && terrain.cliffs.includes('CLgr'));
  assert.ok(terrain.heights.includes(-128));
  assert.ok(terrain.cliffTypes.includes(1));
});

test('ground variants use opaque atlas squares while corner masks keep their north/south orientation', () => {
  assert.deepEqual(terrainTileSource(512, 1), { x: 320, y: 0, size: 64 });
  assert.deepEqual(terrainTileSource(512, 16), { x: 0, y: 0, size: 64 });
  assert.deepEqual(terrainTileSource(512, 17), { x: 192, y: 192, size: 64 });
  const map = { width: 2, heights: [0, 0, 0, 0], textures: [3, 3, 4, 4], textureVariations: [0, 0, 66, 0] };
  assert.deepEqual(terrainCellLayers(map, 0, 0), [
    { texture: 3, mask: 15, variation: 0 }, { texture: 4, mask: 12, variation: 2 }
  ]);
  assert.deepEqual(terrainTileSource(512, 2, 12), { x: 0, y: 192, size: 64 }, 'north grass uses the mask with opaque top corners');
});

test('both surfaces at a ravine boundary use their own ground textures, including flat triangles', () => {
  const map = { width: 2, height: 2, offset: [0, 0], tileSize: 128, heights: [0, -128, 0, 0], textures: [4, 3, 4, 4], cliffTypes: [1, 0, 1, 1], cliffs: ['CLdi', 'CLgr'] };
  assert.deepEqual(terrainCellLayers(map, 0, 0, -128), [{ texture: 3, mask: 15, variation: 0 }]);
  assert.deepEqual(terrainCellLayers(map, 0, 0, 0), [{ texture: 4, mask: 15, variation: 0 }]);
  const requested = [];
  const { surface } = createTerrainGeometry(map, (x, y, height) => {
    requested.push(height);
    const base = height === -128 ? 0 : .5;
    return [[base, 0], [base + .25, 0], [base, 1], [base + .25, 1]];
  });
  assert.ok(requested.includes(-128) && requested.includes(0));
  assert.ok(!requested.includes(undefined), 'the unsplit triangle in a cliff cell also uses the correct elevation texture');
  for (let index = 0; index < surface.positions.length / 3; index++) {
    const low = surface.positions[index * 3 + 1] < 0, u = surface.uvs[index * 2];
    assert.ok(low ? u <= .25 : u >= .5, 'no surface samples the opposite elevation texture');
  }
});

test('cliff walls follow the boundary and match the height used for units', () => {
  const map = { width: 2, height: 2, offset: [0, 0], tileSize: 128, heights: [0, -128, 0, -128], cliffTypes: [0, 1, 0, 1], cliffs: ['CLdi', 'CLgr'] };
  const uv = () => [[0, 1], [1, 1], [0, 0], [1, 0]];
  const { surface, cliffs } = createTerrainGeometry(map, uv, 1.45);
  const heights = surface.positions.filter((_, index) => index % 3 === 1);
  assert.ok(heights.every(height => height === 0 || height === -1.45));
  assert.equal(cliffs[0].indices.length, 0);
  assert.equal(cliffs[1].indices.length, 12);
  const wallX = cliffs[1].positions.filter((_, index) => index % 3 === 0);
  const wallZ = cliffs[1].positions.filter((_, index) => index % 3 === 2);
  assert.ok(wallX.every(x => x === 0.5), 'wall stays on the elevation boundary');
  assert.equal(Math.min(...wallZ), -1);
  assert.equal(Math.max(...wallZ), 0);
  assert.equal(sampleTerrainHeight(map, 32, 64), 0);
  assert.equal(sampleTerrainHeight(map, 96, 64), -128);
  for (const [x, z] of [[-34,-54],[-34,-8],[9,13],[30,35],[56,35]]) {
    const [sourceX, sourceY] = worldToSource(x, z);
    assert.equal(sampleTerrainHeight(terrain, sourceX, sourceY), -128, 'monster route remains on low ground');
  }
});

test('terrain points without a cliff texture do not receive a fallback dirt wall', () => {
  const map={width:2,height:2,offset:[0,0],tileSize:128,heights:[0,-128,0,-128],cliffTypes:[15,15,15,15],cliffs:['CLdi','CLgr']};
  const uv=()=>[[0,1],[1,1],[0,0],[1,0]];
  const {cliffs}=createTerrainGeometry(map,uv,1.45);
  assert.deepEqual(cliffs.map(group=>group.indices.length),[0,0]);
});

test('camera pan bounds include the full visible viewport and allow map-wide navigation', () => {
  const bounds = terrainSourceBounds(terrain);
  assert.deepEqual(bounds, [-8192,-8192,8192,8192,-8192,8192,8192,-8192]);
  const target = new THREE.Vector3(0, 0, 0);
  const camera = new THREE.PerspectiveCamera(cameraVerticalFov(), 16/9, .1, 100);
  camera.position.fromArray(cameraOffset());
  camera.lookAt(target);
  const footprint = cameraGroundFootprint(camera, target);
  assert.ok(cameraFootprintFits(footprint, bounds));
  const farEdge = new THREE.Vector3(500, 0, -500);
  clampCameraTarget(farEdge, footprint, bounds);
  const visibleX = footprint.map(([x]) => farEdge.x+x), visibleZ = footprint.map(([,z]) => farEdge.z+z);
  const xs=[bounds[0],bounds[2],bounds[4],bounds[6]].map(value=>value/128),zs=[bounds[1],bounds[3],bounds[5],bounds[7]].map(value=>-value/128);
  assert.ok(Math.min(...visibleX)>=Math.min(...xs)-1e-8);
  assert.ok(Math.max(...visibleX)<=Math.max(...xs)+1e-8);
  assert.ok(Math.min(...visibleZ)>=Math.min(...zs)-1e-8);
  assert.ok(Math.max(...visibleZ)<=Math.max(...zs)+1e-8);
  assert.ok(footprint.some(([x])=>x<0)&&footprint.some(([x])=>x>0));
});

test('original spell identifiers still classify fallback effects', () => {
  assert.equal(effectStyle({kind:'spell',code:'AEbl'}).shape,'blink');
  assert.equal(effectStyle({kind:'spell',code:'AHbz'}).theme,'ice');
  assert.equal(effectStyle({kind:'spell',code:'AOcl'}).theme,'lightning');
  assert.equal(effectStyle({kind:'spell',code:'AEer'}).shape,'root');
  assert.equal(effectStyle({kind:'spell',code:'ANrf'}).theme,'fire');
  assert.equal(effectStyle({kind:'spell',code:'AUin'}).shape,'meteor');
  assert.equal(effectStyle({kind:'eclipse',item:'moon'}).theme,'shadow');
  assert.equal(effectStyle({kind:'spell',code:'AIrd'}).theme,'holy');
  assert.equal(effectStyle({kind:'area',code:'Awar'}).shape,'shockwave');
  assert.equal(effectStyle({kind:'area',code:'Aapl'}).theme,'poison');
  assert.equal(effectStyle({kind:'spell',code:'Apxf'}).theme,'fire');
  assert.equal(effectStyle({kind:'summon',code:'ANba'}).theme,'shadow');
});

test('projectile visuals follow server corrections and end at their impact cue',()=>{
  const scene=new THREE.Scene(),effects=new BattleEffects(scene,{capacity:64,ground:()=>0});
  effects.consume([{id:1,kind:'projectile',x:0,y:0,tx:600,ty:0,model:'Abilities\\Weapons\\Arrow\\ArrowMissile.mdl',weaponType:'missile',missileSpeed:1200,flightTime:.5,launch:[0,0,120],impactZ:60}]);
  const flight=effects.projectiles.get(1),object=flight.entry.object,startX=object.position.x;
  assert.ok(flight);
  effects.update(.1);
  assert.ok(object.position.x>startX);
  effects.consume([{id:2,kind:'projectile-update',projectileId:1,x:40,y:0,tx:800,ty:40,remaining:.8,height:90,impactZ:60}]);
  assert.ok(Math.abs(flight.position.x-40/128)<1e-9);
  assert.ok(Math.abs(flight.target.z+40/128)<1e-9);
  effects.consume([{id:3,kind:'impact',projectileId:1,x:800,y:40,tx:800,ty:40}]);
  effects.update(.01);
  assert.equal(effects.projectiles.size,0);
  effects.dispose();
});
