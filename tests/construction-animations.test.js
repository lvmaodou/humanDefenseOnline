import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { WarcraftInstance } from '../public/warcraft.js';
import { configureModels, createUnitModel, updateUnitConstruction, animateUnit, releaseUnitModel } from '../public/models.js';

const manifest = JSON.parse(await readFile(new URL('../public/warcraft/manifest.json', import.meta.url), 'utf8'));
const definition = { file: 'buildings/human/humantower/humantower.mdx' };
function instance(sequences) {
  let index = 0, frame = sequences[0].Interval[0];
  const native = Object.assign(Object.create(WarcraftInstance.prototype), {
    resource: { model: { Sequences: sequences } }, definition: {}, pending: 0, hold: 0, action: 'stand', dead: false,
    coordinate: new THREE.Group(), library: { team: new THREE.Color(), stats: { rendered: 0 } },
    renderer: {
      getSequence: () => index, setSequence(value) { index = value;frame = sequences[value].Interval[0]; },
      getFrame: () => frame, setFrame(value) { frame = value; }, update(delta) { frame += delta; },
      setCamera() {}, setTeamColor() {}, setLightColor() {}, setLightPosition() {}, render() {}
    }
  });
  return native;
}
const sequences = [
  { Name: 'Stand', Interval: [70000, 71000] },
  { Name: 'Birth', Interval: [0, 60000], NonLooping: true },
  { Name: 'Birth Upgrade First', Interval: [80000, 140000], NonLooping: true }
];
const phase = progress => ({ kind: 'build', duration: 5, remaining: 5 * (1 - progress), progress, properties: '' });
function draw(native) {
  const gl = { enable() {}, depthMask() {}, colorMask() {} }, renderer = { resetState() {}, getContext: () => gl };
  const camera = new THREE.PerspectiveCamera();camera.updateMatrixWorld(true);native.coordinate.updateMatrixWorld(true);
  native.draw(renderer, camera);
}

test('native Birth follows construction progress instead of its authored sixty-second duration', () => {
  const native = instance(sequences);native.setConstruction(phase(.5));native.advance(.1);draw(native);
  assert.equal(native.action, 'birth');assert.equal(native.renderer.getSequence(), 1);
  assert.ok(Math.abs(native.renderer.getFrame() - 29999.995) < .01);
  native.cue('attack');assert.equal(native.action, 'birth');
  native.setConstruction(phase(.95));native.advance(.1);draw(native);
  assert.ok(native.renderer.getFrame() > 56999 && native.renderer.getFrame() < 57000);
  native.setConstruction(null);assert.equal(native.action, 'stand');assert.equal(native.renderer.getSequence(), 0);
});

test('an upgrade chooses Birth Upgrade and models without Birth keep their own Stand animation', () => {
  const native = instance(sequences);
  native.setConstruction({ ...phase(.6), kind: 'upgrade', duration: 10, properties: 'upgrade,first' });native.advance(.1);draw(native);
  assert.equal(native.renderer.getSequence(), 2);assert.ok(Math.abs(native.renderer.getFrame() - 115999.994) < .01);
  const soldier = instance([{ Name: 'Stand', Interval: [0, 1000] }, { Name: 'Stand Upgrade', Interval: [2000, 3000] }]);
  soldier.setConstruction(phase(.5));soldier.advance(.1);draw(soldier);
  assert.equal(soldier.action, 'stand');assert.equal(soldier.renderer.getSequence(), 0);assert.equal(soldier.renderer.getFrame(), 100);
  soldier.cue('death');soldier.setConstruction(null);assert.equal(soldier.dead, true);assert.equal(soldier.action, 'death');
});

test('a late model load uses the latest construction snapshot and completion clears the progress bar', async () => {
  const assets = configureModels({}, manifest);let ready, root;
  const phases = [], native = { setConstruction: value => phases.push(value), advance() {}, dispose() {} };
  assets.attach = target => new Promise(resolve => { ready = () => { target.userData.warcraft = native;resolve(native); }; });
  const unit = { id: 1, type: 'h007', owner: 0, building: true, hp: 100, maxHp: 100, construct: 5, construction: phase(0) };
  root = createUnitModel(unit, definition);
  const current = { ...unit, construct: 2, construction: phase(.6) };root.userData.entity = current;updateUnitConstruction(root, current);
  ready();await root.userData.ready;
  assert.equal(phases.at(-1).progress, .6, 'loading does not replay construction from the beginning');
  animateUnit(root, .1, .1);assert.ok(phases.at(-1).progress > .6);
  assert.equal(root.userData.healthBar.visible, true);assert.equal(root.userData.constructionBar.visible, true);
  assert.ok(Math.abs(root.userData.constructionBar.scale.x - .62) < 1e-8);
  const finished = { ...unit, construct: 0, construction: undefined };root.userData.entity = finished;updateUnitConstruction(root, finished);animateUnit(root, .1, .2);
  assert.equal(phases.at(-1), null);assert.equal(root.userData.constructionBar.visible, false);assert.equal(root.userData.healthBar.visible, false);
  releaseUnitModel(root);
});
