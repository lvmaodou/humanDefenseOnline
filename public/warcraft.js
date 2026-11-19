import * as THREE from 'three';
import { parseMDX, ModelRenderer } from './vendor/war3-model.mjs';

export const WORLD_SCALE = 1 / 128;
export const normalizeResource = value => String(value || '').replaceAll('\\', '/').toLowerCase().replace(/^\/+/, '');
export function modelResource(value) {
  const path = normalizeResource(value);
  return !path || path === '_' ? null : /\.(mdx|mdl)$/.test(path) ? path.replace(/\.mdl$/, '.mdx') : `${path}.mdx`;
}
export const TEAM_COLORS = [0xff0303,0x0042ff,0x1ce6b9,0x540081,0xfffc01,0xfe8a0e,0x20c000,0xe55bb0,0x959697,0x7ebff1,0x106246,0x4e2a04,0x282828,0x282828,0x282828,0x282828];
export function uploadModelTexture(modelRenderer, gl, path, image) {
  // MDX UVs address the image from its top edge. An asynchronous image load can
  // otherwise inherit Three's flipped terrain upload state on the shared GL.
  const unpack = [gl.UNPACK_FLIP_Y_WEBGL, gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL];
  const previous = unpack.map(parameter => gl.getParameter(parameter));
  try {
    for (const parameter of unpack) gl.pixelStorei(parameter, false);
    modelRenderer.setTextureImage(path, image);
  } finally {
    unpack.forEach((parameter, index) => gl.pixelStorei(parameter, previous[index]));
  }
}
const animationTags = value => String(value || '').toLowerCase().replaceAll(',', ' ').split(/\s+/).filter(Boolean);
const animationVariants = new Set(['upgrade','first','second','third','fourth','fifth','alternate','alternateex','swim']);
export function selectSequence(sequences, requested, properties = '') {
  const [action = 'stand', ...modifiers] = animationTags(requested), persistent = animationTags(properties);
  const tags = new Set([...modifiers, ...persistent]);
  const choose = name => {
    let best = -1, bestScore = -Infinity;
    for (const [index, sequence] of sequences.entries()) {
      const words = animationTags(sequence.Name);if (!words.includes(name)) continue;
      // A shared MDX can contain several mutually exclusive building forms.
      // Prefer the authored form, including when a missing action uses Stand.
      let score = -(Number(sequence.Rarity) || 0) / 100;
      for (const tag of tags) score += words.includes(tag) ? 10 : -2;
      for (const word of words) if (animationVariants.has(word) && !tags.has(word)) score -= 20;
      if (score > bestScore) { bestScore = score;best = index; }
    }
    return best;
  };
  const selected = choose(action);
  return selected >= 0 ? selected : choose('stand');
}

// MDX owns its native skinning, animated layers, particles and ribbons. The
// bridge shares Three's camera, transforms, depth buffer and WebGL context.
// There is no separate canvas, pre-rendered sprite, or video of the model.
export class WarcraftAssets {
  constructor(renderer, manifest) {
    this.renderer = renderer; this.manifest = manifest; this.models = new Map(); this.images = new Map(); this.textures = {};
    this.stats = { instances: 0, loadedModels: 0, failed: [], rendered: 0 };
    this.team = new THREE.Color(); this.tempMatrix = new THREE.Matrix4();
  }
  has(path) { return Boolean(this.manifest.models[modelResource(path)]); }
  url(path) { return this.manifest.resources[normalizeResource(path)]?.url || null; }
  image(path) {
    const url = this.url(path); if (!url) return Promise.resolve(null);
    if (!this.images.has(url)) this.images.set(url, new Promise((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error(`Cannot load ${url}`)); image.src = url;
    }));
    return this.images.get(url);
  }
  async load(path, overrides = {}) {
    const key = modelResource(path), variant = `${key}:${JSON.stringify(overrides)}`;
    if (!this.has(key)) return null;
    if (!this.models.has(variant)) this.models.set(variant, (async () => {
      const response = await fetch(this.manifest.models[key].url); if (!response.ok) throw new Error(`Cannot load ${key}`);
      const model = parseMDX(await response.arrayBuffer());
      if (!model.Sequences.length) model.Sequences.push({ Name: 'Stand', Interval: new Uint32Array([0, 1000]), NonLooping: false, MoveSpeed: 0, Rarity: 0 });
      for (const texture of model.Textures) if (overrides[texture.ReplaceableId]) { texture.Image = overrides[texture.ReplaceableId]; texture.ReplaceableId = 0; }
      const prototype = new ModelRenderer(model); prototype.initGL(this.renderer.getContext());
      prototype.rendererData.textures = this.textures;
      await Promise.all(model.Textures.filter(texture => texture.Image).map(async texture => {
        const image = await this.image(texture.Image);
        if (image && !this.textures[texture.Image]) uploadModelTexture(prototype, this.renderer.getContext(), texture.Image, image);
      }));
      this.renderer.resetState(); this.stats.loadedModels++;
      return { path: key, model, prototype };
    })().catch(error => { this.stats.failed.push({ path: key, message: error.message }); return null; }));
    return this.models.get(variant);
  }
  async attach(root, path, definition = {}, overrides = {}) {
    const color=Number(definition.ownerColor??0),team=String(Math.max(0,Math.min(11,color))).padStart(2,'0');
    const replacements={1:`replaceabletextures/teamcolor/teamcolor${team}.blp`,2:`replaceabletextures/teamglow/teamglow${team}.blp`,31:'replaceabletextures/lordaerontree/lordaeronsummertree.blp',...overrides};
    const resource = await this.load(path, replacements); if (!resource || root.userData.released) return null;
    const instance = new WarcraftInstance(this, resource, definition);
    root.add(instance.coordinate); root.userData.warcraft = instance; this.stats.instances++;
    return instance;
  }
}

const nativeCameraPosition = new THREE.Vector3(), nativeCameraQuaternion = new THREE.Quaternion(), nativeInverse = new THREE.Quaternion();
const modelView = new THREE.Matrix4(), lightPosition = new THREE.Vector3();
const cueAliases = { cast: 'spell', build: 'birth', hit: null, damage: null, projectile: 'attack' };
export class WarcraftInstance {
  constructor(library, resource, definition) {
    this.library = library; this.resource = resource; this.definition = definition; this.pending = 0; this.action = 'stand'; this.hold = 0; this.dead = false;this.poseDirty = true;
    this.renderer = new ModelRenderer(resource.model);
    // Geometry, programs and immutable textures are shared between instances.
    // Animation state and emitter buffers remain private to each instance.
    const privateFields = new Set(['model','rendererData','interp','particlesController','ribbonsController']);
    for (const key of Object.keys(resource.prototype)) if (!privateFields.has(key)) this.renderer[key] = resource.prototype[key];
    this.renderer.rendererData.textures = library.textures;
    this.renderer.particlesController.initGL(library.renderer.getContext());
    this.renderer.ribbonsController.initGL(library.renderer.getContext());
    library.renderer.resetState();
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute([0,0,0,0,0,0,0,0,0], 3));
    const min = resource.model.Info.MinimumExtent, max = resource.model.Info.MaximumExtent;
    const radius = Math.max(64, Math.hypot(...Array.from(max || [128,128,128]).map((value, index) => Math.max(Math.abs(value), Math.abs(min?.[index] || 0)))));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), Math.min(radius, 100000));
    const material = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false, depthTest: false });
    this.drawable = new THREE.Mesh(geometry, material); this.drawable.name = `MDX:${resource.path}`;
    this.coordinate = new THREE.Group(); this.coordinate.rotation.x = -Math.PI / 2; this.coordinate.scale.setScalar(WORLD_SCALE); this.coordinate.add(this.drawable);
    this.drawable.onAfterRender = (renderer, scene, camera) => this.draw(renderer, camera);
    this.play('stand', definition.Animprops || '');
  }
  play(action, properties = '', restart = false) {
    const index = selectSequence(this.resource.model.Sequences, action, properties);
    if (index >= 0 && (restart || this.renderer.getSequence() !== index)) { this.renderer.setSequence(index);this.poseDirty = true; }
    this.action = action;
    return index >= 0 ? this.resource.model.Sequences[index] : null;
  }
  cue(kind, animationNames = '') {
    const action = kind in cueAliases ? cueAliases[kind] : kind;
    if (!action || this.dead) return;
    if(this.channel&&action!=='spell'&&action!=='death')return;
    if (this.construction && action !== 'death') return;
    if (action === 'death') this.dead = true;
    const requested = animationTags(animationNames)[0] || action;
    const properties = `${this.definition.Animprops || ''} ${animationNames}`;
    const selected = selectSequence(this.resource.model.Sequences, requested, properties);
    // A passive/automatic spell can have no model animation. Leave the
    // current attack running instead of restarting Stand on every spell cue.
    if (action !== 'death' && (selected < 0 || !animationTags(this.resource.model.Sequences[selected].Name).includes(requested))) return;
    const sequence = this.play(requested, properties, true);
    this.hold = sequence ? (sequence.Interval[1] - sequence.Interval[0]) / 1000 : .4;
  }
  setChannel(state) {
    if(this.dead||this.construction)state=null;
    if((this.channel?.ability||null)===(state?.ability||null))return;
    const previous=this.channel;this.channel=state;
    if(state){this.cue('spell',state.animationNames||'spell,channel');this.channelSequence=this.renderer.getSequence();}
    else if(previous&&this.renderer.getSequence()===this.channelSequence){this.hold=0;this.play('stand',this.definition.Animprops||'');}
  }
  setConstruction(phase) {
    if (this.dead) return;
    if (!phase) {
      if (this.construction) { this.construction = null;this.pending = 0;this.hold = 0;this.play('stand', this.definition.Animprops || '', true); }
      return;
    }
    if (this.construction?.kind !== phase.kind || this.construction?.properties !== phase.properties) {
      // "Upgrade" on a combat unit's Stand/Attack is a weapon variant, not
      // a construction animation. Only use an actual Birth sequence here.
      const sequences = this.resource.model.Sequences;
      const candidates = sequences.map((sequence, index) => ({ ...sequence, index })).filter(sequence => /^birth(?:\s|$)/i.test(sequence.Name) && (phase.kind !== 'upgrade' || /\bupgrade\b/i.test(sequence.Name)));
      const selected = selectSequence(candidates, 'birth', phase.properties || '');
      this.constructionSequence = selected >= 0 ? candidates[selected].index : -1;
      this.pending = 0;this.hold = 0;
      if (this.constructionSequence >= 0) { this.renderer.setSequence(this.constructionSequence);this.action = 'birth';this.poseDirty = true; }
      else this.play('stand', this.definition.Animprops || '', true);
    }
    this.construction = phase;
  }
  advance(dt, movement = 0) {
    if (this.construction && !this.dead) {
      const sequence = this.resource.model.Sequences[this.constructionSequence];
      this.pending += dt * 1000 * (sequence ? (sequence.Interval[1] - sequence.Interval[0]) / (this.construction.duration * 1000) : 1);
      return;
    }
    if (!this.dead) {
      if(!this.channel){
        this.hold = Math.max(0, this.hold - dt);
        if (this.hold <= 0) this.play(movement > .01 ? 'walk' : 'stand', this.definition.Animprops || '');
      }
    }
    const sequence = this.resource.model.Sequences[this.renderer.getSequence()];
    let speed = 1;
    if (this.action === 'walk' && movement > 0 && sequence?.MoveSpeed > 0) speed = Math.max(.15, Math.min(4, movement / sequence.MoveSpeed));
    this.pending += dt * 1000 * speed;
  }
  draw(renderer, camera) {
    if (this.disposed) return;
    renderer.resetState();
    const gl = renderer.getContext(); gl.enable(gl.DEPTH_TEST); gl.depthMask(true); gl.colorMask(true,true,true,true);
    modelView.multiplyMatrices(camera.matrixWorldInverse, this.coordinate.matrixWorld);
    nativeCameraPosition.copy(camera.position); this.coordinate.worldToLocal(nativeCameraPosition);
    this.coordinate.getWorldQuaternion(nativeInverse).invert(); nativeCameraQuaternion.copy(nativeInverse).multiply(camera.quaternion);
    this.renderer.setCamera(nativeCameraPosition.toArray(), nativeCameraQuaternion.toArray());
    const color = Number(this.definition.teamColor) >= 0 ? Number(this.definition.teamColor) : Number(this.definition.ownerColor ?? 0);
    this.library.team.setHex(TEAM_COLORS[color] || TEAM_COLORS[0]); this.renderer.setTeamColor(this.library.team.toArray());
    this.renderer.setLightColor([(Number(this.definition.red) || 255) / 255, (Number(this.definition.green) || 255) / 255, (Number(this.definition.blue) || 255) / 255]);
    lightPosition.set(-4000, -6000, 10000); this.renderer.setLightPosition(lightPosition.toArray());
    const sequence = this.resource.model.Sequences[this.renderer.getSequence()];
    let delta;
    if (this.construction && !this.dead && this.constructionSequence >= 0) {
      // Seek from server progress, including after a reconnect or a late MDX
      // download. Keep emitter updates running at the same animation speed.
      const start = sequence.Interval[0], span = Math.max(0, sequence.Interval[1] - start - .01);
      const frame = start + span * Math.max(0, Math.min(1, this.construction.progress));
      delta = Math.min(this.pending, frame - start);
      if (Math.abs(frame - this.renderer.getFrame()) > .001) this.poseDirty = true;
      this.renderer.setFrame(frame - delta);
    } else delta = sequence?.NonLooping ? Math.min(this.pending, Math.max(0, sequence.Interval[1] - this.renderer.getFrame() - .01)) : this.pending;
    // A distant unit still draws its full model every frame. Reuse its last
    // pose between animation updates instead of recomputing every bone at dt=0.
    if (this.poseDirty || delta > .001) { this.renderer.update(Math.max(0, delta));this.poseDirty = false; }
    this.pending = 0;
    this.renderer.render(modelView.elements, camera.projectionMatrix.elements, {});
    this.library.stats.rendered++;this.drawCount=(this.drawCount||0)+1;renderer.resetState();
  }
  attachment(name, out = new THREE.Vector3()) {
    const key = String(name || 'origin').toLowerCase().replace(/\s+/g, '');
    const node = this.resource.model.Attachments.find(node => node.Name.toLowerCase().replace(/\s|ref/g, '').includes(key));
    if (node) {
      const matrix = this.renderer.rendererData.nodes[node.ObjectId]?.matrix;
      out.fromArray(node.PivotPoint); if (matrix) out.applyMatrix4(new THREE.Matrix4().fromArray(matrix));
    } else out.set(0,0,key === 'chest' ? 60 : key === 'overhead' ? 120 : 0);
    return this.coordinate.localToWorld(out);
  }
  dispose() {
    if (this.disposed) return; this.disposed = true;
    this.renderer.particlesController.destroy(); this.renderer.ribbonsController.destroy();
    this.drawable.geometry.dispose(); this.drawable.material.dispose(); this.coordinate.removeFromParent(); this.library.stats.instances--;
  }
}
