import * as THREE from 'three';
import { modelResource, WORLD_SCALE } from './warcraft.js';

export function createItemModel(item, definition = {}, assets = null) {
  const root = new THREE.Group(), path = modelResource(definition.model || definition.file);
  root.name = `item:${item.type}`;
  const scale = Number(definition.scale ?? 1);
  root.scale.setScalar(Number.isFinite(scale) && scale > 0 ? scale : 1);
  Object.assign(root.userData, { item, itemModel: path, nativeRequested: Boolean(assets?.has(path)), released: false });

  // Native MDX draws directly into WebGL, so its visible triangles are not
  // available to Three's raycaster. Give the actual item extents a pick volume.
  const extent = assets?.manifest.models[path]?.extent;
  const min = extent?.min || [-32, -32, 0], max = extent?.max || [32, 32, 64];
  const pick = new THREE.Mesh(new THREE.BoxGeometry(
    Math.max(16, max[0] - min[0]) * WORLD_SCALE,
    Math.max(16, max[2] - min[2]) * WORLD_SCALE,
    Math.max(16, max[1] - min[1]) * WORLD_SCALE
  ), new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }));
  pick.position.set((min[0] + max[0]) * WORLD_SCALE / 2, (min[2] + max[2]) * WORLD_SCALE / 2, -(min[1] + max[1]) * WORLD_SCALE / 2);
  pick.visible = false;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.3, .025, 5, 16), new THREE.MeshBasicMaterial({ color: '#ead497', transparent: true, opacity: .6, depthWrite: false }));
  ring.rotation.x = Math.PI / 2;ring.position.y = .06;
  root.add(pick, ring);root.userData.pickBox = pick;root.userData.itemRing = ring;

  root.userData.ready = assets?.has(path) ? assets.attach(root, path, {
    red: definition.colorR ?? 255, green: definition.colorG ?? 255, blue: definition.colorB ?? 255
  }).then(instance => {
    if (root.userData.released) { instance?.dispose();return null; }
    if (instance) { root.userData.warcraft = instance;instance.play('stand'); }
    return instance;
  }) : Promise.resolve(null);
  return root;
}

export function animateItem(root, dt) {
  if (!root.userData.released) root.userData.warcraft?.advance(dt);
}

export function releaseItemModel(root) {
  if (!root || root.userData.released) return;
  root.userData.released = true;
  root.userData.warcraft?.dispose();
  for (const mesh of [root.userData.pickBox, root.userData.itemRing]) {
    mesh.geometry.dispose();mesh.material.dispose();
  }
  root.removeFromParent();
}
