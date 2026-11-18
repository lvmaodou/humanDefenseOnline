import * as THREE from 'three';
import * as fallback from './procedural-models.js';
import { WarcraftAssets, modelResource, TEAM_COLORS } from './warcraft.js';

let assets = null;
export function configureModels(renderer, manifest) { assets = new WarcraftAssets(renderer, manifest); return assets; }
export function getModelAssets() { return assets; }
export function describeModel(definition = {}, id = '') {
  const rawSource = definition.model || definition.file || '';
  const source = modelResource(rawSource) ? rawSource : '';
  const modelScale = Number(definition.modelScale ?? 1);
  return { ...fallback.describeModel({ ...definition, model: source }, id),
    sourceModel: modelResource(source), size: Number.isFinite(modelScale) && modelScale > 0 ? modelScale : 1,
    hero: ['h001','h002','h000','h004','h003','h06C'].includes(id),
    family: /peasant/i.test(source) ? 'worker' : fallback.describeModel({ ...definition, model: source }, '').family,
    representation: assets?.has(source) ? 'original-mdx' : modelResource(source) ? 'procedural-fallback' : 'hidden-source'
  };
}
const ownerDefinition = (unit, definition) => ({ ...definition, ownerColor: unit.ownerColor ?? unit.owner ?? 0 });
export function createUnitModel(unit, definition = {}) {
  const style = describeModel(definition, unit.type), root = new THREE.Group();
  root.name = `unit:${unit.type}`; root.scale.setScalar(style.size);
  Object.assign(root.userData, { entity: unit, definition, style, baseScale: style.size, rig: { move: 0, phase: 0 }, released: false });
  const min = assets?.manifest.models[style.sourceModel]?.extent.min || [-32,-32,0];
  const max = assets?.manifest.models[style.sourceModel]?.extent.max || [32,32,100];
  if(style.sourceModel){
    const box = new THREE.Mesh(new THREE.BoxGeometry(Math.max(16,max[0]-min[0])/128,Math.max(32,max[2]-min[2])/128,Math.max(16,max[1]-min[1])/128),new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false}));
    box.position.set((min[0]+max[0])/256,(min[2]+max[2])/256,-(min[1]+max[1])/256); root.add(box); root.userData.pickBox = box;
  }
  const radius = Math.max(.1, Number(definition.selectionScale ?? definition.scale ?? 1)*36/128/style.size);
  const selection = new THREE.Mesh(new THREE.RingGeometry(radius-.018/style.size,radius+.018/style.size,48),new THREE.MeshBasicMaterial({color:unit.owner>=8?0xff2626:TEAM_COLORS[unit.ownerColor??unit.owner]||0x23fa35,side:THREE.DoubleSide,depthWrite:false,transparent:true,opacity:.9}));
  selection.rotation.x = -Math.PI/2; selection.position.y=.018/style.size; selection.visible=false; root.add(selection); root.userData.selection=selection;
  const bar = new THREE.Group(), width=.58/style.size;
  bar.position.y = Math.max(70, Math.min(500, max[2]))/128+.13/style.size;
  const makeBar=(color,w,h,z)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color,depthTest:false}));m.position.z=z;m.renderOrder=1000;bar.add(m);return m;};
  makeBar(0x111111,width+.025,.075/style.size,0);
  const health=makeBar(unit.owner>=8?0xdb2929:0x37ba27,width,.04/style.size,.002);
  const mana=makeBar(0x2367e3,width,.015/style.size,.003); mana.position.y=-.03/style.size;
  root.add(bar); root.userData.healthBar=bar; root.userData.health=health; root.userData.mana=mana; root.userData.barWidth=width;
  if (assets?.has(style.sourceModel)) {
    root.userData.ready=assets.attach(root,style.sourceModel,ownerDefinition(unit,definition)).then(instance=>{
      if(instance&&root.userData.deathCue)instance.cue('death');
      return instance;
    });
  } else if(style.sourceModel) {
    const replacement = fallback.createUnitModel(unit,{ ...definition, scale: definition.modelScale ?? 1, model: definition.file });
    replacement.scale.setScalar(1); replacement.rotation.y=Math.PI/2;
    replacement.userData.selection.visible=false; replacement.userData.healthBar.visible=false;
    root.add(replacement); root.userData.fallback=replacement; root.userData.ready=Promise.resolve(null);
  }
  return root;
}
export function cueUnitAnimation(root,kind,animationNames='') {
  if(kind==='death')root.userData.deathCue=true;
  if(root.userData.warcraft)root.userData.warcraft.cue(kind,animationNames);
  else if(root.userData.fallback)fallback.cueUnitAnimation(root.userData.fallback,kind);
}
const inverse = new THREE.Quaternion();
export function animateUnit(root,dt,time,selected=false,camera=null) {
  const unit=root.userData.entity, rig=root.userData.rig;
  root.userData.warcraft?.advance(dt,rig.move||0);
  if(root.userData.fallback)fallback.animateUnit(root.userData.fallback,dt,time,false,camera);
  root.userData.selection.visible=selected&&!root.userData.deathCue;
  const fraction=Math.max(0,Math.min(1,(unit.hp||0)/Math.max(1,unit.maxHp||1)));
  root.userData.health.scale.x=fraction;root.userData.health.position.x=-root.userData.barWidth*(1-fraction)/2;
  root.userData.mana.scale.x=Math.max(0,Math.min(1,(unit.mana||0)/Math.max(1,unit.maxMana||1)));root.userData.mana.visible=Boolean(unit.maxMana);
  root.userData.healthBar.visible=!root.userData.deathCue&&(selected||fraction<.995);
  if(camera){root.getWorldQuaternion(inverse).invert();root.userData.healthBar.quaternion.copy(inverse).multiply(camera.quaternion);}
  return !root.userData.released;
}
export function releaseUnitModel(root) {
  if(root.userData.released)return;root.userData.released=true;
  root.userData.warcraft?.dispose();if(root.userData.fallback)fallback.releaseUnitModel(root.userData.fallback);
  for(const object of [root.userData.pickBox,root.userData.selection,...root.userData.healthBar.children]){object?.geometry?.dispose();object?.material?.dispose();}
  root.removeFromParent();
}
export function modelResourceStats(){return assets?{...assets.stats,resources:assets.models.size}:fallback.modelResourceStats();}
export const createCentralKeep=fallback.createCentralKeep;
export const animateCentralKeep=fallback.animateCentralKeep;
