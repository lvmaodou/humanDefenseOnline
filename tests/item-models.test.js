import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { createItemModel, animateItem, releaseItemModel } from '../public/item-models.js';
import { originalItemSources } from '../engine/item-sources.js';
import { modelResource } from '../public/warcraft.js';
import { pickBattleObject } from '../public/selection.js';

const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const data = await read('../content/original-3.0/data.json'), manifest = await read('../public/warcraft/manifest.json');
const script = await readFile(new URL('../content/original-3.0/script.j', import.meta.url), 'utf8');
const chest = 'objects/inventoryitems/treasurechest/treasurechest.mdx';

test('all map-referenced items share the available source chest; the stock tome is outside the map drop pool', () => {
  const sources = originalItemSources(data, script), items = Object.entries(data.items).filter(([id]) => sources[id].inMap);
  assert.equal(items.length, 19);
  assert.deepEqual([...new Set(items.map(([, item]) => modelResource(item.file)))], [chest]);
  assert.ok(manifest.models[chest]);
  assert.ok(manifest.models['objects/inventoryitems/tomebrown/tomebrown.mdx']);
  assert.equal(items.some(([, item]) => /tomebrown/i.test(item.file)), false);
});

test('source drops have a raycastable model volume, animate and release their native and picking resources once', async () => {
  const calls = [], instance = { play: action => calls.push(action), advance: dt => calls.push(dt), dispose: () => calls.push('dispose') };
  const assets = { manifest, has: path => path === chest, attach: async (root, path, definition) => {
    assert.equal(path, chest);assert.deepEqual(definition, { red: 255, green: 255, blue: 255 });return instance;
  } };
  const item = { id: 123, type: 'I001' }, root = createItemModel(item, data.items.I001, assets), scene = new THREE.Scene();
  scene.add(root);await root.userData.ready;scene.updateMatrixWorld(true);
  const ray = new THREE.Raycaster(new THREE.Vector3(0, 2, 2), new THREE.Vector3(0, -1.75, -2).normalize());
  const intersections = ray.intersectObject(root, true);
  assert.ok(intersections.length > 0, 'the native model body is clickable above the ground ring');
  assert.equal(pickBattleObject(intersections, null), root);
  animateItem(root, .05);assert.deepEqual(calls, ['stand', .05]);
  const disposed = [];
  for (const mesh of [root.userData.pickBox, root.userData.itemRing]) {
    mesh.geometry.addEventListener('dispose', () => disposed.push('geometry'));
    mesh.material.addEventListener('dispose', () => disposed.push('material'));
  }
  releaseItemModel(root);releaseItemModel(root);animateItem(root, .05);
  assert.deepEqual(calls, ['stand', .05, 'dispose']);
  assert.deepEqual(disposed, ['geometry', 'material', 'geometry', 'material']);assert.equal(root.parent, null);
});

test('picking up a drop while its MDX is loading cannot leave a late native instance in the scene', async () => {
  let loaded, disposed = 0;
  const assets = { manifest, has: () => true, attach: () => new Promise(resolve => { loaded = resolve; }) };
  const root = createItemModel({ id: 1, type: 'I001' }, data.items.I001, assets);
  releaseItemModel(root);
  loaded({ dispose: () => disposed++, play: () => assert.fail('a picked-up item must not start animating') });
  assert.equal(await root.userData.ready, null);assert.equal(disposed, 1);
});
