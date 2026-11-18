import * as THREE from 'three';
import {sourceToWorld} from './coordinates.js';
import {normalizeResource} from './warcraft.js';

export function createOriginalWorld(scene,assets,placements,ground){
  const roots=[];
  for(const placement of placements){
    if(!placement.model||!assets.has(placement.model))continue;
    const root=new THREE.Group(),[x,z]=sourceToWorld(placement.position[0],placement.position[1]),height=ground(placement.position[0],placement.position[1]);
    root.name=`original-doodad:${placement.id}:${placement.variation}`;root.position.set(x,height+placement.position[2]/128,z);
    root.rotation.y=placement.angle;root.scale.set(...placement.scale);scene.add(root);roots.push(root);
    assets.attach(root,placement.model,{},Object.fromEntries(Object.entries(placement.textureOverrides||{}).map(([id,path])=>[id,normalizeResource(path)])));
  }
  return roots;
}

export class OriginalEffects{
  constructor(scene,assets,units){this.scene=scene;this.assets=assets;this.units=units;this.live=new Map();this.lastId=0;}
  consume(effects){
    const present=new Set();
    for(const effect of effects||[]){if(effect.kind!=='model'&&!(effect.kind==='spell'&&effect.visual))continue;
      present.add(effect.id);
      if(!this.live.has(effect.id)&&effect.model&&this.assets.has(effect.model)){
        const root=new THREE.Group(),source=this.units.get(effect.sourceId),target=this.units.get(effect.targetId),point=effect.follow&&target?target:effect;
        const [x,z]=sourceToWorld(point.x,point.y);root.position.set(x,.05,z);root.name=`original-effect:${effect.model}`;this.scene.add(root);
        const definition={modelScale:Number(effect.scale)||1,ownerColor:source?.userData.entity?.ownerColor||0};
        const record={root,effect,source,target,born:performance.now(),ready:null};
        record.ready=this.assets.attach(root,effect.model,definition).then(instance=>{record.instance=instance;instance?.cue('birth',effect.animationNames||'birth');});
        this.live.set(effect.id,record);
      }
      if(effect.destroyed){const record=this.live.get(effect.id);if(record)this.remove(effect.id,record);}
    }
    for(const [id,record]of this.live)if(!present.has(id)&&!record.effect.persistent)this.remove(id,record);
  }
  handle(effect){
    if(effect.kind==='projectile')return this.projectile(effect);
    if(effect.kind==='model'){
      if(effect.destroyed){const record=this.live.get(effect.id);if(record)this.remove(effect.id,record);return true;}
      if(!this.live.has(effect.id)&&effect.model&&this.assets.has(effect.model)){
        const target=this.units.get(effect.targetId),[x,z]=target?[target.position.x,target.position.z]:sourceToWorld(effect.x,effect.y),root=new THREE.Group();root.position.set(x,.05,z);this.scene.add(root);
        const record={root,effect,target};record.ready=this.assets.attach(root,effect.model,{ownerColor:effect.sourceColor||0},{ }).then(instance=>record.instance=instance);this.live.set(effect.id,record);return true;
      }
      return this.live.has(effect.id);
    }
    if(effect.kind==='spell'&&effect.visual){
      const caster=this.units.get(effect.sourceId),target=this.units.get(effect.targetId),spell=effect.visual;
      const model=spell.Targetart||spell.TargetArt||spell.Specialart||spell.specialArt||spell.Areaeffectart||spell.AreaEffectArt||spell.Casterart||spell.CasterArt;
      const anchor=spell.Targetart||spell.TargetArt?target:caster;
      if(model&&this.assets.has(model)){const instance=caster?.userData.warcraft;if(instance)instance.cue('spell',effect.animationNames||'spell');return this.spawn(effect,model,anchor||effect);}
    }
    return false;
  }
  spawn(effect,path,anchor){const [x,z]=anchor?.position?[anchor.position.x,anchor.position.z]:sourceToWorld(effect.tx??effect.x,effect.ty??effect.y),root=new THREE.Group();root.position.set(x,.05,z);this.scene.add(root);const record={root,effect,born:performance.now()};record.ready=this.assets.attach(root,path,{}).then(instance=>record.instance=instance);this.live.set(effect.id,record);return true;}
  projectile(effect){
    if(!effect.model||!this.assets.has(effect.model))return false;
    const root=new THREE.Group(),[x,z]=sourceToWorld(effect.x,effect.y),[tx,tz]=sourceToWorld(effect.tx,effect.ty),source=this.units.get(effect.sourceId),facing=(source?.userData.entity?.facing||0)*Math.PI/180,[launchX,launchY,launchZ]=effect.launch||[0,0,0],start=new THREE.Vector3(x+(launchX*Math.cos(facing)-launchY*Math.sin(facing))/128,(launchZ||0)/128+.35,z-(launchX*Math.sin(facing)+launchY*Math.cos(facing))/128);
    root.position.copy(start);root.rotation.y=Math.atan2(start.z-tz,tx-start.x);this.scene.add(root);
    const record={root,effect,born:performance.now(),start,end:new THREE.Vector3(tx,.35+(effect.impactZ||0)/128,tz),arc:Number(effect.missileArc)||0};
    record.ready=this.assets.attach(root,effect.model,{modelScale:1,ownerColor:0}).then(instance=>{record.instance=instance;instance?.cue('stand','');});
    this.live.set(effect.id,record);return true;
  }
  update(dt,units,effects=[]){this.units=units;const ids=new Set(effects.map(effect=>effect.id));for(const [id,record]of this.live){
    if(record.effect.kind==='projectile'){const duration=Math.max(.06,Math.min(8,record.start.distanceTo(record.end)*128/(record.effect.missileSpeed||900))),t=(performance.now()-record.born)/1000/duration,k=Math.min(t,1);record.root.position.lerpVectors(record.start,record.end,k);record.root.position.y+=Math.sin(k*Math.PI)*record.start.distanceTo(record.end)*record.arc*.5;if(t>=1){record.instance?.cue('death');if(t>1.5)this.remove(id,record);}}
    else if(record.effect.follow&&record.target&&!record.target.userData.released){record.root.position.copy(record.target.position);}
    if(record.effect.destroyed||record.effect.persistent&&!ids.has(id))this.remove(id,record);
  }}
  remove(id,record){record.instance?.dispose();if(!record.instance)record.root.removeFromParent();this.live.delete(id);}
  dispose(){for(const [id,record]of this.live)this.remove(id,record);}
}
