import * as THREE from 'three';
import * as fallback from './procedural-models.js';
import { WarcraftAssets, modelResource, normalizeResource, TEAM_COLORS } from './warcraft.js';

let assets = null;
export function configureModels(renderer, manifest) { assets = new WarcraftAssets(renderer, manifest); return assets; }
export function getModelAssets() { return assets; }
const MODEL_ALIASES = new Map([
  ['units/nightelf/ent/ent', 'units/creeps/corruptedent/corruptedent']
]);
function resolvedModelPath(value) {
  const source = modelResource(value);
  if (!source || assets?.has(source)) return source;
  const alias = MODEL_ALIASES.get(normalizeResource(value));
  return alias && assets?.has(alias) ? alias : source;
}
export function describeModel(definition = {}, id = '') {
  const rawSource = definition.model || definition.file || '';
  const source = resolvedModelPath(rawSource) || '';
  const modelScale = Number(definition.modelScale ?? 1);
  return { ...fallback.describeModel({ ...definition, model: source }, id),
    sourceModel: modelResource(source), size: Number.isFinite(modelScale) && modelScale > 0 ? modelScale : 1,
    hero: ['h001','h002','h000','h004','h003','h06C'].includes(id),
    family: /peasant/i.test(source) ? 'worker' : fallback.describeModel({ ...definition, model: source }, '').family,
    representation: assets?.has(source) ? 'original-mdx' : modelResource(source) ? 'procedural-fallback' : 'hidden-source'
  };
}
const ownerDefinition = (unit, definition) => ({ ...definition, ownerColor: unit.ownerColor ?? unit.owner ?? 0 });
const lowDetailGeometry=new THREE.CylinderGeometry(.16,.23,.82,6);
const lowDetailMaterial=new THREE.MeshLambertMaterial({color:0xffffff});
export function lowDetailResources(){return{geometry:lowDetailGeometry,material:lowDetailMaterial};}
export function createUnitModel(unit, definition = {}) {
  const style = describeModel(definition, unit.type), root = new THREE.Group();
  root.name = `unit:${unit.type}`; root.scale.setScalar(style.size);
  Object.assign(root.userData, { entity: unit, definition, style, baseScale: style.size, rig: { move: 0, phase: 0 }, released: false });
  const min = assets?.manifest.models[style.sourceModel]?.extent.min || [-32,-32,0];
  const max = assets?.manifest.models[style.sourceModel]?.extent.max || [32,32,100];
  if(style.sourceModel){
    // A worker's full animation extent includes its tool and outstretched arms.
    // Pick its body so standing beside an item tower cannot mask the tower.
    const worker=style.family==='worker',height=Math.max(64,max[2])/128;
    const geometry=worker?new THREE.CylinderGeometry(24/128,24/128,height,12):new THREE.BoxGeometry(Math.max(16,max[0]-min[0])/128,Math.max(32,max[2]-min[2])/128,Math.max(16,max[1]-min[1])/128);
    const box = new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false}));
    if(worker)box.position.y=height/2;else box.position.set((min[0]+max[0])/256,(min[2]+max[2])/256,-(min[1]+max[1])/256);
    box.visible=false;
    root.add(box); root.userData.pickBox = box;
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
  if(unit.building){
    const progressBackground=makeBar(0x111111,width+.025,.055/style.size,.004);progressBackground.position.y=.065/style.size;progressBackground.visible=false;
    const progress=makeBar(0xe3b650,width,.03/style.size,.005);progress.position.y=.065/style.size;progress.visible=false;
    root.userData.constructionBar=progress;root.userData.constructionBackground=progressBackground;
  }
  root.add(bar); root.userData.healthBar=bar; root.userData.health=health; root.userData.mana=mana; root.userData.barWidth=width;
  if(style.sourceModel&&assets?.has(style.sourceModel)&&unit.owner>=4&&!unit.building)root.userData.lodProxy=true;
  if (assets?.has(style.sourceModel)) {
    root.userData.ready=assets.attach(root,style.sourceModel,ownerDefinition(unit,definition)).then(instance=>{
      if(instance&&root.userData.deathCue)instance.cue('death');
      else instance?.setConstruction(root.userData.construction || null);
      return instance;
    });
  } else if(style.sourceModel) {
    const replacement = fallback.createUnitModel(unit,{ ...definition, scale: definition.modelScale ?? 1, model: definition.file });
    replacement.scale.setScalar(1); replacement.rotation.y=Math.PI/2;
    replacement.userData.selection.visible=false; replacement.userData.healthBar.visible=false;
    root.add(replacement); root.userData.fallback=replacement; root.userData.ready=Promise.resolve(null);
  }
  updateUnitConstruction(root,unit);
  return root;
}
export function updateUnitConstruction(root,unit,properties='') {
  root.userData.construction=unit.construction&&!unit.dead?{...unit.construction,properties,elapsed:0}:null;
  root.userData.warcraft?.setConstruction(root.userData.construction);
}
export function cueUnitAnimation(root,kind,animationNames='') {
  if(kind==='death')root.userData.deathCue=true;
  if(root.userData.warcraft)root.userData.warcraft.cue(kind,animationNames);
  else if(root.userData.fallback)fallback.cueUnitAnimation(root.userData.fallback,kind);
}
const inverse = new THREE.Quaternion();
export function animateUnit(root,dt,time,selected=false,camera=null,frustum=null) {
  const unit=root.userData.entity, rig=root.userData.rig;
  const animation=root.userData.animationState??={elapsed:0};
  animation.elapsed+=dt;
  const construction=root.userData.construction;
  if(construction){construction.elapsed+=dt;root.userData.warcraft?.setConstruction({...construction,progress:Math.min(1,construction.progress+construction.elapsed/construction.duration)});}
  if(!selected&&frustum?.planes.some(plane=>plane.distanceToPoint(root.position)<-12))return !root.userData.released;
  const distanceSq=camera?camera.position.distanceToSquared(root.position):0;
  const pinned=selected||root.userData.forceDetail;
  if(root.userData.lodProxy){
    // Keep the authored Warcraft model visible throughout the play area.  The
    // shared cylinder is only a far distance fallback for units outside the
    // focus of the battle; using it at 12-16 world units made ordinary
    // monsters look like red pillars as soon as they entered the camera.
    const simplified=root.userData.lowDetail?distanceSq>30*30:distanceSq>40*40;
    root.userData.lowDetail=Boolean(!pinned&&!unit.dead&&simplified);
    if(root.userData.warcraft)root.userData.warcraft.coordinate.visible=!root.userData.lowDetail;
    if(root.userData.fallback)root.userData.fallback.visible=!root.userData.lowDetail;
  }
  if(root.userData.lowDetail){
    root.userData.selection.visible=false;root.userData.healthBar.visible=false;
    return true;
  }
  const interval=pinned||distanceSq<28*28?0:distanceSq<64*64?.05:.1;
  if(interval===0||animation.elapsed>=interval){
    const elapsed=animation.elapsed;animation.elapsed=0;
    root.userData.warcraft?.advance(elapsed,rig.move||0);
    if(root.userData.fallback)fallback.animateUnit(root.userData.fallback,elapsed,time,false,camera);
  }
  root.userData.selection.visible=selected&&!root.userData.deathCue;
  const fraction=Math.max(0,Math.min(1,(unit.hp||0)/Math.max(1,unit.maxHp||1)));
  root.userData.health.scale.x=fraction;root.userData.health.position.x=-root.userData.barWidth*(1-fraction)/2;
  root.userData.mana.scale.x=Math.max(0,Math.min(1,(unit.mana||0)/Math.max(1,unit.maxMana||1)));root.userData.mana.visible=Boolean(unit.maxMana);
  if(root.userData.constructionBar){
    const progress=construction?Math.min(1,construction.progress+construction.elapsed/construction.duration):0;
    root.userData.constructionBar.visible=root.userData.constructionBackground.visible=Boolean(construction)&&!root.userData.deathCue;
    root.userData.constructionBar.scale.x=progress;root.userData.constructionBar.position.x=-root.userData.barWidth*(1-progress)/2;
  }
  root.userData.healthBar.visible=!root.userData.deathCue&&(selected||fraction<.995||Boolean(construction));
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
