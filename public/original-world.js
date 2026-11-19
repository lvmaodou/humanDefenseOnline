import * as THREE from 'three';
import {sourceToWorld} from './coordinates.js';
import {normalizeResource,modelResource} from './warcraft.js';

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
  constructor(scene,assets,units,{ground=()=>0}={}){
    this.scene=scene;this.assets=assets;this.units=units;this.ground=ground;
    this.live=new Map();this.lastId=0;this.time=0;this.created=0;this.advanced=0;
  }
  unit(id){return this.units.get(`u${id}`)||this.units.get(id);}
  point(x,y,height=.05){const [wx,wz]=sourceToWorld(x??0,y??0);return new THREE.Vector3(wx,this.ground(x??0,y??0)+height,wz);}
  paths(value){return String(value||'').split(',').map(path=>path.trim()).filter(path=>path&&this.assets.has(path));}
  sequences(record){return this.assets.manifest?.models[modelResource(record.path)]?.sequences||[];}
  animation(record,choices){
    const sequences=this.sequences(record),sequence=choices.map(name=>sequences.find(sequence=>sequence.name.toLowerCase().split(/\s+/)[0]===name)).find(Boolean);
    const name=sequence?.name.toLowerCase().split(/\s+/)[0]||choices[0],duration=sequence?Math.max(.05,Math.min(30,(sequence.interval[1]-sequence.interval[0])/1000)):1;
    record.instance?.cue(name);record.sequence=name;record.animationDuration=duration;return duration;
  }
  create(effect,path,{key=effect.id,atTarget=false,follow=effect.follow,attachment=effect.attachment,delay=0,flight=null}={}){
    if(!this.assets.has(path))return false;
    if(this.live.has(key))return true;
    const root=new THREE.Group(),source=this.unit(effect.sourceId);
    root.name=`original-effect:${path}`;root.scale.setScalar(Number(effect.scale)||1);this.scene.add(root);
    const record={key,eventId:effect.id,root,effect,path,atTarget,follow,attachment,flight,startAt:this.time+delay,phase:'loading',stopRequested:Boolean(effect.destroyed),released:false};
    this.live.set(key,record);this.created++;this.place(record);
    record.ready=this.assets.attach(root,path,{ownerColor:source?.userData.entity?.ownerColor??effect.sourceColor??0}).then(instance=>{
      if(record.released){instance?.dispose();return;}
      record.instance=instance;
      if(!instance){this.remove(key,record);return;}
      if(this.time>=record.startAt)this.begin(record);
    }).catch(()=>this.remove(key,record));
    return true;
  }
  begin(record){
    if(!record.instance||record.phase!=='loading')return;
    record.started=this.time;record.phase=record.stopRequested?'ending':'playing';
    const choices=record.stopRequested?['death','birth','stand']:['birth','stand'];
    const duration=this.animation(record,choices);
    record.expiresAt=record.stopRequested?this.time+duration+.3:record.flight||record.effect.persistent?Infinity:this.time+Math.max(duration,Math.min(15,Number(record.effect.duration)||0))+.3;
    record.root.visible=true;
  }
  place(record){
    if(record.flight){record.root.position.copy(record.flight.start);return;}
    const effect=record.effect,target=this.unit(record.atTarget||effect.follow?effect.targetId:effect.sourceId);
    if(target&&!target.userData.released){
      if(record.attachment&&target.userData.warcraft)target.userData.warcraft.attachment(String(record.attachment).split(',')[0],record.root.position);
      else record.root.position.copy(target.position).add(new THREE.Vector3(0,.05,0));
    }else record.root.position.copy(this.point(record.atTarget?effect.tx??effect.x:effect.x,record.atTarget?effect.ty??effect.y:effect.y));
  }
  stop(record){
    if(record.released||record.phase==='ending')return;
    record.stopRequested=true;
    if(!record.instance)return;
    record.phase='ending';
    const death=this.sequences(record).some(sequence=>/^death(?:\s|$)/i.test(sequence.name));
    if(death)record.expiresAt=this.time+this.animation(record,['death'])+.3;
    else record.expiresAt=Math.max(this.time+.1,(record.started??this.time)+(record.animationDuration||1)+.3);
  }
  consume(effects){for(const effect of effects||[]){if(effect.id<=this.lastId)continue;this.lastId=effect.id;this.handle(effect);}}
  handle(effect){
    if(effect.kind==='projectile-update'){
      const record=this.live.get(effect.projectileId);if(!record?.flight||record.phase==='ending')return false;
      record.flight={start:this.point(effect.x,effect.y,(Number(effect.height)||0)/128),end:this.point(effect.tx,effect.ty,(Number(effect.impactZ)||0)/128),duration:Math.max(.03,Number(effect.remaining)||.03),elapsed:0,arc:0};
      return true;
    }
    if(effect.kind==='impact'||effect.kind==='miss'){
      const record=this.live.get(effect.projectileId);if(record){record.root.position.copy(this.point(effect.tx??effect.x,effect.ty??effect.y,.2));this.stop(record);}return false;
    }
    if(effect.kind==='projectile')return this.projectile(effect);
    if(effect.kind==='model')return this.create(effect,effect.model,{atTarget:Boolean(effect.follow)});
    if(effect.kind!=='spell'||!effect.visual)return false;
    const visual=Object.fromEntries(Object.entries(effect.visual).map(([key,value])=>[key.toLowerCase(),value]));
    let handled=false;
    for(const [field,atTarget,attachment,follow] of [
      ['casterart',false,'casterattach',true],['targetart',true,'targetattach',true],
      ['specialart',true,'specialattach',false],['areaeffectart',true,null,false],['effectart',true,null,false]
    ])for(const [index,path]of this.paths(visual[field]).entries())handled=this.create(effect,path,{key:`${effect.id}:${field}:${index}`,atTarget,attachment:visual[attachment],follow})||handled;
    for(const [index,path]of this.paths(visual.missileart).entries()){
      const missile={...effect,model:path,missileSpeed:Number(visual.missilespeed)||effect.missileSpeed||900};
      if(['AOsh','AUcs','ANbf','AUim'].includes(effect.code)){
        const dx=effect.tx-effect.x,dy=effect.ty-effect.y,distance=Math.hypot(dx,dy)||1,length=Number(effect.lineLength)||Number(effect.range)||800;
        missile.tx=effect.x+dx/distance*length;missile.ty=effect.y+dy/distance*length;
      }
      handled=this.projectile(missile,`${effect.id}:missile:${index}`)||handled;
    }
    return handled;
  }
  projectile(effect,key=effect.id){
    if(!effect.model||!this.assets.has(effect.model))return false;
    const source=this.unit(effect.sourceId),facing=(source?.userData.entity?.facing||0)*Math.PI/180,[launchX,launchY,launchZ]=effect.launch||[0,0,0];
    const start=this.point(effect.x,effect.y,(launchZ||0)/128+.2),end=this.point(effect.tx,effect.ty,(effect.impactZ||0)/128+.2);
    start.x+=(launchX*Math.cos(facing)-launchY*Math.sin(facing))/128;start.z-=(launchX*Math.sin(facing)+launchY*Math.cos(facing))/128;
    const duration=Math.max(.03,Number(effect.flightTime)||start.distanceTo(end)*128/(effect.missileSpeed||900));
    return this.create(effect,effect.model,{key,flight:{start,end,duration,elapsed:0,arc:Number(effect.missileArc)||0}});
  }
  update(dt,units,effects=[]){
    this.units=units;this.time+=dt;
    const latest=new Map(effects.map(effect=>[effect.id,effect]));
    for(const [key,record]of this.live){
      const snapshot=latest.get(record.eventId);
      if(snapshot&&record.effect.kind==='model'){record.effect=snapshot;if(snapshot.destroyed)this.stop(record);}
      else if(record.effect.persistent&&!snapshot)this.stop(record);
      if(record.phase==='loading'){
        record.root.visible=false;
        if(this.time>=record.startAt)this.begin(record);
      }
      if(record.phase==='loading')continue;
      record.instance?.advance(dt);this.advanced++;
      if(record.flight&&record.phase==='playing'){
        const flight=record.flight;flight.elapsed+=dt;const k=Math.min(1,flight.elapsed/flight.duration);
        record.root.position.lerpVectors(flight.start,flight.end,k);record.root.position.y+=Math.sin(k*Math.PI)*flight.start.distanceTo(flight.end)*flight.arc*.5;
        record.root.rotation.y=Math.atan2(flight.start.z-flight.end.z,flight.end.x-flight.start.x);
        if(k===1)this.stop(record);
      }else if(record.follow)this.place(record);
      if(this.time>=record.expiresAt)this.remove(key,record);
    }
  }
  stats(){return{created:this.created,advanced:this.advanced,active:this.live.size,models:[...this.live.values()].map(record=>({path:modelResource(record.path),phase:record.phase,sequence:record.sequence,position:record.root.position.toArray(),frame:record.instance?.renderer?.getFrame()}))};}
  remove(key,record){if(record.released)return;record.released=true;record.root.userData.released=true;record.instance?.dispose();record.root.removeFromParent();this.live.delete(key);}
  dispose(){for(const [key,record]of this.live)this.remove(key,record);}
}
