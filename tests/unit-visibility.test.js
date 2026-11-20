import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { configureModels, createUnitModel, animateUnit, releaseUnitModel } from '../public/models.js';
import { WarcraftInstance } from '../public/warcraft.js';

const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const data = await read('../content/original-3.0/data.json'), manifest = await read('../public/warcraft/manifest.json');

test('all 56 wave models remain visible when the camera moves beyond the old cylinder threshold', async () => {
  const assets = configureModels({}, manifest), camera = new THREE.PerspectiveCamera();
  assets.attach = async root => {
    const native = { coordinate: new THREE.Group(), elapsed: 0, setConstruction() {}, advance(dt) { this.elapsed += dt; }, dispose() {} };
    root.add(native.coordinate);root.userData.warcraft = native;return native;
  };
  for (const [index, type] of data.waveUnits.entries()) {
    const root = createUnitModel({ id: index, type, owner: 8, hp: 100, maxHp: 100 }, data.units[type]);
    const native = await root.userData.ready;assert.ok(native, type);
    for (const distance of [10, 45, 90, 20, 100]) {
      camera.position.set(0, distance * .8, distance * .6);
      animateUnit(root, .1, native.elapsed, false, camera);
      assert.equal(root.userData.style.representation, 'original-mdx');
      assert.equal(root.userData.warcraft, native, `${type} keeps the same model at distance ${distance}`);
      assert.equal(native.coordinate.visible, true, `${type} must remain visible at distance ${distance}`);
      assert.equal(root.userData.animationState.interval, distance < 28 ? 0 : distance < 64 ? .05 : .1);
    }
    assert.ok(native.elapsed >= .5);releaseUnitModel(root);
  }
});

test('offscreen animation work stays culled and a selected or targeted model animates immediately', async () => {
  const assets = configureModels({}, manifest), camera = new THREE.PerspectiveCamera();camera.position.set(0, 90, 0);
  let elapsed = 0,effectElapsed=0;
  const native = { setConstruction() {}, advance(dt) { elapsed += dt; }, advanceEffects(dt){effectElapsed+=dt;}, dispose() {} };
  assets.attach = async root => { root.userData.warcraft = native;return native; };
  const root = createUnitModel({ id: 1, type: 'ugar', owner: 8, hp: 1, maxHp: 1 }, data.units.ugar);await root.userData.ready;
  animateUnit(root, .02, 0, false, camera, { planes: [{ distanceToPoint: () => -100 }] });
  assert.equal(elapsed, 0);assert.equal(effectElapsed,.02);assert.equal(root.userData.animationState.culled, true);
  animateUnit(root, .01, .03, true, camera);
  assert.ok(elapsed >= .03);assert.ok(effectElapsed>=.03);assert.equal(root.userData.animationState.interval, 0);
  root.userData.forceDetail = true;animateUnit(root, .01, .04, false, camera);
  assert.ok(elapsed >= .04);assert.ok(effectElapsed>=.04);assert.equal(root.userData.animationState.interval, 0);
  releaseUnitModel(root);
});

test('a native model draws its cached pose between animation updates and refreshes attack and death cues', () => {
  const sequences = [
    { Name: 'Stand', Interval: [0, 1000] },
    { Name: 'Attack', Interval: [2000, 2400], NonLooping: true },
    { Name: 'Death', Interval: [3000, 3400], NonLooping: true }
  ];
  let index = 0, frame = 0, renders = 0;const updates = [],particleUpdates=[],ribbonUpdates=[];
  const native = Object.assign(Object.create(WarcraftInstance.prototype), {
    resource: { model: { Sequences: sequences } }, definition: {}, pending: 0, action: 'stand', hold: 0, poseDirty: true,
    effectsPending: 0,
    coordinate: new THREE.Group(), library: { team: new THREE.Color(), stats: { rendered: 0 } },
    advanceParticles: dt => particleUpdates.push(dt), advanceRibbons: dt => ribbonUpdates.push(dt),
    renderer: {
      getSequence: () => index, getFrame: () => frame, setSequence(value) { index = value;frame = sequences[value].Interval[0]; },
      update(dt) { updates.push(dt);frame += dt; }, render() { renders++; },
      setCamera() {}, setTeamColor() {}, setLightColor() {}, setLightPosition() {}
    }
  });
  const camera = new THREE.PerspectiveCamera();camera.updateMatrixWorld(true);native.coordinate.updateMatrixWorld(true);
  const renderer = { resetState() {}, getContext: () => ({ enable() {}, depthMask() {}, colorMask() {} }) };
  native.draw(renderer, camera);native.draw(renderer, camera);native.draw(renderer, camera);
  assert.equal(renders, 3);assert.deepEqual(updates, [0], 'the first pose is initialized, then reused');
  native.advanceEffects(.016);native.draw(renderer,camera);
  assert.deepEqual(updates,[0],'particle updates do not force a bone pose update');
  assert.deepEqual(particleUpdates,[.016]);assert.deepEqual(ribbonUpdates,[.016]);
  native.advance(.1);native.draw(renderer, camera);assert.equal(frame, 100);assert.deepEqual(updates, [0, 100]);
  native.cue('attack');native.draw(renderer, camera);assert.equal(index, 1);assert.equal(updates.at(-1), 0);
  native.cue('death');native.draw(renderer, camera);assert.equal(index, 2);
  native.advance(1);native.draw(renderer, camera);assert.ok(frame > 3399 && frame < 3400);
  const count = updates.length;native.advance(1);native.draw(renderer, camera);
  assert.equal(updates.length, count, 'finished death poses stay visible without more bone updates');
  assert.equal(renders, 9);
});
