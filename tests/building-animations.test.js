import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as THREE from 'three';
import { parseMDX, ModelRenderer } from 'war3-model';
import { WarcraftInstance, modelResource, selectSequence, WORLD_SCALE } from '../public/warcraft.js';
import { configureModels, createUnitModel, releaseUnitModel } from '../public/models.js';

const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const data = await read('../content/original-3.0/data.json'), manifest = await read('../public/warcraft/manifest.json');
const towerIds = ['h007','h055','h057','h052','h053','h054'];
const bytes = await readFile(new URL(`../public${manifest.models[modelResource(data.units.h052.file)].url}`, import.meta.url));
const tower = parseMDX(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
function native(id) {
  const instance = Object.assign(Object.create(WarcraftInstance.prototype), {
    resource: { model: tower }, renderer: new ModelRenderer(tower), definition: data.units[id],
    pending: 0, hold: 0, action: 'stand', dead: false, poseDirty: true
  });
  instance.play('stand', instance.definition.Animprops || '');instance.renderer.update(0);
  return instance;
}
const sequence = instance => tower.Sequences[instance.renderer.getSequence()].Name;
const visibleGeosets = instance => {
  instance.renderer.update(0);
  return instance.renderer.rendererData.geosetAlpha.flatMap((alpha, index) => alpha > 1e-6 ? [index] : []);
};

test('ranger set structures use the source model scale, separately from selection scale', async () => {
  const assets = configureModels({}, manifest);
  assets.attach = async root => {
    const coordinate = new THREE.Group();coordinate.rotation.x = -Math.PI / 2;coordinate.scale.setScalar(WORLD_SCALE);root.add(coordinate);
    const instance = { coordinate, setConstruction() {}, dispose() {} };root.userData.warcraft = instance;return instance;
  };
  for (const id of towerIds) {
    const definition = data.units[id];assert.equal(definition.modelScale, 1);assert.equal(definition.scale, 2.5);
    const root = createUnitModel({ type: id, owner: 0, building: true, hp: 100, maxHp: 100 }, { ...definition, selectionScale: definition.scale });
    await root.userData.ready;root.updateMatrixWorld(true);
    const scale = root.userData.warcraft.coordinate.getWorldScale(new THREE.Vector3());
    assert.ok(Math.abs(scale.x - definition.modelScale / 128) < 1e-12);
    assert.equal(root.userData.baseScale, definition.modelScale);assert.notEqual(root.userData.baseScale, definition.scale);
    releaseUnitModel(root);
  }
});

test('missing tower actions fall back to Stand of the same upgraded form', () => {
  for (const id of towerIds) {
    const properties = data.units[id].Animprops || '', expected = selectSequence(tower.Sequences, 'stand', properties);
    for (const unavailable of ['spell','walk','spell,throw']) {
      const actual = selectSequence(tower.Sequences, unavailable, properties);
      assert.equal(actual, expected, `${id}: ${unavailable}`);
    }
  }
});

test('ice and fire arrow animation names preserve the original upgraded tower geosets', () => {
  for (const id of ['h052','h054']) {
    const instance = native(id), original = visibleGeosets(instance), ability = data.units[id].auto;
    assert.equal(data.abilityStrings[ability].Animnames, 'attack');
    instance.cue('attack');instance.advance(.1);instance.renderer.update(instance.pending);instance.pending = 0;
    instance.cue('spell', data.abilityStrings[ability].Animnames);
    assert.match(sequence(instance), /Upgrade First/);assert.deepEqual(visibleGeosets(instance), original);
  }
});

test('unsupported passive spell cues neither replace nor rewind an ongoing tower attack', () => {
  const instance = native('h052');instance.cue('attack');
  instance.renderer.setFrame(tower.Sequences[instance.renderer.getSequence()].Interval[0] + 600);
  const before = instance.renderer.getFrame(), geosets = visibleGeosets(instance), hold = instance.hold;
  for (let i = 0; i < 10; i++) instance.cue('spell');
  assert.equal(instance.renderer.getFrame(), before);assert.equal(instance.action, 'attack');assert.equal(instance.hold, hold);
  assert.deepEqual(visibleGeosets(instance), geosets);
});

test('shared tower instances keep independent construction, guard and arcane forms through attack and spell cues', () => {
  const scout = native('h007'), guard = native('h052'), arcane = native('h04Z');
  const scoutParts = visibleGeosets(scout), guardParts = visibleGeosets(guard), arcaneParts = visibleGeosets(arcane);
  assert.notDeepEqual(scoutParts, guardParts);assert.notDeepEqual(guardParts, arcaneParts);
  for (let i = 0; i < 5; i++) for (const [instance, parts] of [[scout,scoutParts],[guard,guardParts],[arcane,arcaneParts]]) {
    instance.cue('attack');instance.cue('spell','attack');instance.cue('spell');
    assert.deepEqual(visibleGeosets(instance), parts);
  }
});

test('sequence variants avoid unrelated upgraded, swimming and alternate forms when the requested action is unavailable', () => {
  const sequences = ['Stand Upgrade Third','Stand Upgrade First','Stand Swim','Stand Alternate','Stand','Attack Upgrade First'].map(Name => ({ Name }));
  assert.equal(sequences[selectSequence(sequences, 'spell')].Name, 'Stand');
  assert.equal(sequences[selectSequence(sequences, 'spell', 'upgrade,first')].Name, 'Stand Upgrade First');
  assert.equal(sequences[selectSequence(sequences, 'walk', 'swim')].Name, 'Stand Swim');
  assert.equal(sequences[selectSequence(sequences, 'attack', 'upgrade,first')].Name, 'Attack Upgrade First');
  assert.equal(selectSequence([], 'stand'), -1);
});

test('the source Furion spell pose persists during a channel and releases on interrupt', async () => {
  const definition=data.units.h00I,bytes=await readFile(new URL(`../public${manifest.models[modelResource(definition.file)].url}`,import.meta.url));
  const model=parseMDX(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
  const instance=Object.assign(Object.create(WarcraftInstance.prototype),{resource:{model},renderer:new ModelRenderer(model),definition,pending:0,hold:0,action:'stand',dead:false});
  instance.play('stand');instance.setChannel({ability:'A019',animationNames:'spell,channel'});
  const selected=instance.renderer.getSequence();assert.match(model.Sequences[selected].Name,/Spell/);
  instance.advance(5);assert.equal(instance.renderer.getSequence(),selected);
  instance.cue('attack');assert.equal(instance.renderer.getSequence(),selected);
  instance.setChannel(null);instance.cue('attack');assert.match(model.Sequences[instance.renderer.getSequence()].Name,/Attack/);
  const tower=native('h052');tower.setChannel({ability:'A019',animationNames:'spell,channel'});tower.advance(5);
  assert.match(sequence(tower),/Stand Upgrade First/);tower.setChannel(null);assert.match(sequence(tower),/Stand Upgrade First/);
});
