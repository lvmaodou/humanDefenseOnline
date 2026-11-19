import * as THREE from 'three';
import { configureModels, getModelAssets, createUnitModel, animateUnit, cueUnitAnimation, updateUnitConstruction, releaseUnitModel, lowDetailResources } from './models.js';
import { createItemModel, animateItem, releaseItemModel } from './item-models.js';
import { TEAM_COLORS } from './warcraft.js';
import { BattleEffects, effectStyle } from './effects.js';
import { createWorldMaterials } from './surface.js';
import { CLASSIC_CAMERA, cameraOffset, cameraVerticalFov, cameraGroundFootprint, cameraFootprintFits, clampCameraTarget, setCameraTarget, sourceToWorld, worldToSource, terrainSourceBounds } from './coordinates.js';
import { createOriginalWorld, OriginalEffects } from './original-world.js';
import { createTerrainGeometry, sampleTerrainHeight } from './terrain-relief.js';
import { createTerrainAtlas } from './terrain-textures.js';
import { checkBuildPlacement, originalBuildBlockers } from './placement.js';
import { enableRotatedListScroll } from './scroll-list.js';
import { pickBattleObject } from './selection.js';
import { BattleConnection } from './connection.js';
import { buildingRequirement, orderedBuildings } from './building-options.js';

function interactiveObjectAt(clientX,clientY){return Boolean(battleObjectAt(clientX,clientY));}
function battleObjectAt(clientX,clientY,point=groundAt(clientX,clientY)){
  setPointerFromClient(clientX,clientY);camera.updateMatrixWorld(true);raycaster.setFromCamera(pointer,camera);
  const [x,y]=point?worldToSource(point.x,point.z):[],candidates=[...objects.values()].filter(object=>object.userData.entity||object.userData.item);
  return pickBattleObject(raycaster.intersectObjects(candidates,true),point?{x,y}:null,candidates);
}
const $=s=>document.querySelector(s),canvas=$('#battle'),app=$('#app');
enableRotatedListScroll($('#build-list'),()=>getComputedStyle(app).transform!=='none');
enableRotatedListScroll($('#unit-inspector'),()=>getComputedStyle(app).transform!=='none');
const viewportSize=()=>({width:app.clientWidth,height:app.clientHeight});
const initialViewport=viewportSize();
function setPointerFromClient(clientX,clientY){const rect=canvas.getBoundingClientRect();if(getComputedStyle(app).transform!=='none')pointer.set((clientY-rect.top)/rect.height*2-1,(clientX-rect.left)/rect.width*2-1);else pointer.set((clientX-rect.left)/rect.width*2-1,1-(clientY-rect.top)/rect.height*2);}
let meta=null,terrain=null,state=null,mySlot=-1,roomId='',selectedUnit=null,buildingId=null,buildAreaOpen=false,targetMode=false,mouseDown=null,cameraPanStart=null,cameraPanButton=null,zoom=1,followHero=true,previewObject=null,previewSourcePoint=null,dialogSignature='',buildSignature='',abilitySignature='',inspectorSignature='',assets=null,originalEffects=null,originalDoodads=[];
let targetUnit=null,castingAbility=null,targetingItem=null,buildAnchor=null,pendingBuild=null,actionSequence=0,buildingItem=null,pendingGift=null;
let resultDismissed=false;
const playerWorkerTypes=new Set(['h001','h002','h000','h004','h003','h06C']);
const isPlayerWorker=unit=>unit?.owner===mySlot&&!unit.dead&&playerWorkerTypes.has(unit.type);
const isMovableUnit=unit=>unit?.owner===mySlot&&!unit.dead&&!unit.building&&(unit.canMove??unit.moveSpeed>0);
// A small vertical lift makes the map's single-level cliffs readable at game zoom.
const TERRAIN_RELIEF=1.45;
window.__itemVisualDebug=()=>[...objects.values()].filter(object=>object.userData.item).map(object=>({id:object.userData.item.id,type:object.userData.item.type,path:object.userData.itemModel,loaded:Boolean(object.userData.warcraft),frame:object.userData.warcraft?.renderer.getFrame()}));
window.__originalVisualDebug=()=>{camera.updateMatrixWorld(true);return{assets:assets?.stats,effects:effects.stats(),modelLod:{simplified:[...objects.values()].filter(object=>object.userData.lowDetail).length,units:[...objects.values()].filter(object=>object.userData.entity).length},originalEffects:originalEffects?.stats(),originalDoodads:originalDoodads.length,terrainTexture:Boolean(worldMaterials.terrain.map),camera:{target:cameraTarget.toArray(),focus:cameraFocus.toArray(),position:camera.position.toArray(),zoom,far:camera.far,footprint:cameraGroundFootprint(camera,cameraTarget,cameraTarget.y),bounds:meta?.visuals?.camera?.bounds,projectedCorners:[[-64,64],[64,64],[-64,-64],[64,-64]].map(([x,z])=>new THREE.Vector3(x,0,z).project(camera).toArray())},units:[...objects.values()].filter(object=>object.userData.entity).slice(0,18).map(object=>({id:object.userData.entity.id,construction:object.userData.entity.construction,animation:object.userData.warcraft?{name:object.userData.warcraft.resource.model.Sequences[object.userData.warcraft.renderer.getSequence()]?.Name,frame:object.userData.warcraft.renderer.getFrame(),progress:object.userData.warcraft.construction?.progress}:null,type:object.userData.entity.type,model:object.userData.style?.representation,path:object.userData.style?.sourceModel,source:meta?.units[object.userData.entity.type]?.file,available:assets?.has(meta?.units[object.userData.entity.type]?.file),scale:object.userData.baseScale})),renderer:{calls:renderer.info.render.calls,triangles:renderer.info.render.triangles}};};
window.__modelDistanceDebug=()=>{const distances=[...objects.values()].filter(object=>object.userData.entity?.owner>=4).map(object=>camera.position.distanceTo(object.position)).sort((a,b)=>a-b);return{min:distances[0]||0,median:distances[Math.floor(distances.length*.5)]||0,p90:distances[Math.floor(distances.length*.9)]||0,max:distances.at(-1)||0};};
const dayBackground=new THREE.Color('#93a9b5'),nightBackground=new THREE.Color('#202b40'),dayFog=new THREE.Color('#93a9b5'),nightFog=new THREE.Color('#293448'),daySun=new THREE.Color('#ffe5c0'),nightSun=new THREE.Color('#9bb7e8');
const scene=new THREE.Scene();scene.background=dayBackground.clone();scene.fog=new THREE.Fog(dayFog,112,245);
const camera=new THREE.PerspectiveCamera(cameraVerticalFov(CLASSIC_CAMERA.fieldOfView),initialViewport.width/initialViewport.height,.1,CLASSIC_CAMERA.farZ/128),cameraProbe=camera.clone(),frameFrustum=new THREE.Frustum(),frameProjection=new THREE.Matrix4();let cameraTarget=new THREE.Vector3(0,0,0),cameraFocus=cameraTarget.clone();camera.position.fromArray(cameraOffset());camera.lookAt(cameraFocus);
const lowDetailBatchResources=lowDetailResources(),lowDetailBatch=new THREE.InstancedMesh(lowDetailBatchResources.geometry,lowDetailBatchResources.material,16384),instanceTransform=new THREE.Object3D(),instanceTint=new THREE.Color();lowDetailBatch.count=0;lowDetailBatch.frustumCulled=false;lowDetailBatch.renderOrder=3;lowDetailBatch.instanceMatrix.setUsage(THREE.DynamicDrawUsage);scene.add(lowDetailBatch);
window.__lowDetailInstanceCount=()=>lowDetailBatch.count;
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(initialViewport.width,initialViewport.height);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const worldMaterials=createWorldMaterials(renderer);
const hemisphere=new THREE.HemisphereLight(0xe3edf0,0x41483a,.8);scene.add(hemisphere);const sun=new THREE.DirectionalLight(daySun,1.15);sun.position.set(-45,105,60);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-72;sun.shadow.camera.right=72;sun.shadow.camera.top=72;sun.shadow.camera.bottom=-72;sun.shadow.camera.near=1;sun.shadow.camera.far=240;sun.shadow.camera.updateProjectionMatrix();sun.shadow.bias=-.0002;sun.shadow.normalBias=.02;scene.add(sun);
const fill=new THREE.DirectionalLight(0xa5c8e2,.15);fill.position.set(45,35,-55);scene.add(fill);
function updateEnvironment(){const remaining=Math.max(0,(state?.environment?.nightUntil||0)-(state?.time||0)),blend=Math.min(1,remaining/2);scene.background.copy(dayBackground).lerp(nightBackground,blend);scene.fog.color.copy(dayFog).lerp(nightFog,blend);sun.color.copy(daySun).lerp(nightSun,blend);sun.intensity=1.15-.88*blend;hemisphere.intensity=.8-.42*blend;fill.intensity=.15+.12*blend;}
const objects=new Map(),unitsById=new Map(),materialCache=new Map(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),groundPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();
let effects=new BattleEffects(scene,{capacity:4096,ground:terrainHeight});
function material(color,roughness=.9){const key=`${color}:${roughness}`;if(!materialCache.has(key))materialCache.set(key,new THREE.MeshStandardMaterial({color,roughness}));return materialCache.get(key);}
function pos(x,y){return sourceToWorld(x,y);}
function meshEntity(unit){const def=meta.units[unit.type]||{};return createUnitModel(unit,{...def,model:def.file,modelScale:def.modelScale??1,selectionScale:def.selectionScale??1});}
function terrainHeight(x,y){return sampleTerrainHeight(terrain,x,y)/128*TERRAIN_RELIEF;}
async function buildTerrain(data){
  terrain=data;terrain.buildBlockers=originalBuildBlockers(meta.visuals?.doodads||[]);
  terrain.buildableTiles=terrain.tiles.map(id=>Number(meta.visuals?.terrainTileData[id]?.buildable)===1);
  const used=new Set(data.textures),images=await Promise.all(data.tiles.map(async(id,index)=>{
    if(!used.has(index))return null;
    const row=meta.visuals.terrainTileData[id];return assets.image(`${row.dir}\\${row.file}.blp`);
  }));
  const atlas=createTerrainAtlas(data,images),{surface,cliffs}=createTerrainGeometry(data,atlas.uvForCell,TERRAIN_RELIEF);
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(surface.positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(surface.uvs,2));geometry.setIndex(surface.indices);geometry.computeVertexNormals();
  const texture=new THREE.CanvasTexture(atlas.canvas);texture.colorSpace=THREE.SRGBColorSpace;
  // Mipmaps across a packed atlas can mix unrelated edge masks at distant zoom.
  texture.generateMipmaps=false;texture.minFilter=THREE.LinearFilter;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();
  worldMaterials.terrain.map=texture;worldMaterials.terrain.needsUpdate=true;
  const mesh=new THREE.Mesh(geometry,worldMaterials.terrain);mesh.receiveShadow=true;mesh.userData.ground=true;scene.add(mesh);objects.set('terrain',mesh);
  buildCliffs(cliffs);originalDoodads=createOriginalWorld(scene,assets,meta.visuals?.doodads||[],terrainHeight);buildWater(terrain);originalEffects=new OriginalEffects(scene,assets,objects,{ground:terrainHeight});constrainCamera();
}
function buildCliffs(groups){
  groups.forEach((group,type)=>{
    if(!group.indices.length)return;
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.Float32BufferAttribute(group.positions,3));
    geometry.setAttribute('uv',new THREE.Float32BufferAttribute(group.uvs,2));
    geometry.setIndex(group.indices);geometry.computeVertexNormals();
    const surface=new THREE.MeshLambertMaterial({color:0xffffff,side:THREE.DoubleSide}),wall=new THREE.Mesh(geometry,surface);
    wall.castShadow=true;wall.receiveShadow=true;scene.add(wall);
    const path=`replaceabletextures/cliff/cliff${type}.blp`;
    assets.image(path).then(image=>{
      if(!image)return;
      // Cliff1's first atlas quadrant also contains a grass transition in its
      // lower corner. Vertical faces use only the rock rows above that patch.
      const half=Math.floor(Math.min(image.width,image.height)/2),sourceHeight=type===1?Math.floor(half*.56):half,crop=document.createElement('canvas');
      crop.width=half;crop.height=half;
      crop.getContext('2d').drawImage(image,0,0,half,sourceHeight,0,0,half,half);
      const texture=new THREE.CanvasTexture(crop);texture.colorSpace=THREE.SRGBColorSpace;
      surface.map=texture;surface.needsUpdate=true;
    }).catch(error=>console.error('[cliff texture]',path,error));
  });
}
function buildWater(data){const positions=[],indices=[];let vertex=0;for(let y=0;y<data.height-1;y++)for(let x=0;x<data.width-1;x++){const cells=[[y*data.width+x,(y)*data.width+x+1,(y+1)*data.width+x,(y+1)*data.width+x+1]];for(const corners of cells){if(!corners.every(index=>data.waterHeights?.[index]!==null&&data.waterHeights?.[index]!==undefined))continue;for(const index of corners){const sx=data.offset[0]+index%data.width*data.tileSize,sy=data.offset[1]+Math.floor(index/data.width)*data.tileSize,[wx,wz]=sourceToWorld(sx,sy);positions.push(wx,data.waterHeights[index]/128*TERRAIN_RELIEF+.018,wz);}indices.push(vertex,vertex+1,vertex+2,vertex+1,vertex+3,vertex+2);vertex+=4;}}if(!indices.length)return;const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setIndex(indices);geometry.computeVertexNormals();const water=new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({color:0x859ea0,transparent:true,opacity:.48,shininess:75,side:THREE.DoubleSide,depthWrite:false}));water.renderOrder=2;scene.add(water);objects.set('water',water);}
function updateObjects(){if(!state)return;unitsById.clear();for(const u of state.units)unitsById.set(u.id,u);const present=new Set(state.units.map(u=>'u'+u.id));for(const [key,obj]of objects)if(key.startsWith('u')&&!present.has(key)){releaseUnitModel(obj);objects.delete(key);}for(const u of state.units){const key='u'+u.id;let obj=objects.get(key);const definition=meta.units[u.type]||{};if(obj&&(obj.userData.entity?.type!==u.type||assets?.has(definition.file)&&obj.userData.style?.representation!=='original-mdx')){releaseUnitModel(obj);objects.delete(key);obj=null;}if(!obj){obj=meshEntity(u);scene.add(obj);objects.set(key,obj);}const [x,z]=pos(u.x,u.y),y=effects.ground(u.x,u.y),previous=obj.userData.entity;if(!previous){obj.position.set(x,y,z);obj.userData.remoteMove=null;}else if(previous.x!==u.x||previous.y!==u.y){obj.userData.remoteMove={from:obj.position.clone(),to:new THREE.Vector3(x,y,z),elapsed:0,duration:.1};}else if(!obj.userData.remoteMove)obj.position.set(x,y,z);obj.userData.rig.move=u.moving?Number(u.moveSpeed)||0:0;obj.rotation.y=u.facing*Math.PI/180;obj.userData.entity=u;updateUnitConstruction(obj,u,meta.units[u.upgrade?.type]?.Animprops||'');obj.userData.selection.visible=u.id===selectedUnit&&u.owner===mySlot;obj.scale.setScalar(obj.userData.baseScale);if(u.dead&&!obj.userData.deathCue)cueUnitAnimation(obj,'death');}
  const itemKeys=new Set(state.items.map(i=>'i'+i.id));for(const [key,obj]of objects)if(key.startsWith('i')&&!itemKeys.has(key)){releaseItemModel(obj);objects.delete(key);}for(const item of state.items){const key='i'+item.id,definition=meta.items[item.type]||{};let obj=objects.get(key);if(obj&&!obj.userData.nativeRequested&&assets?.has(definition.model)){releaseItemModel(obj);objects.delete(key);obj=null;}if(!obj){obj=createItemModel(item,definition,assets);scene.add(obj);objects.set(key,obj);}const [x,z]=pos(item.x,item.y);obj.position.set(x,terrainHeight(item.x,item.y),z);obj.userData.item=item;}}
function renderHud(){
  if(!state)return;
  updateEnvironment();
  const self=state.players.find(p=>p.slot===mySlot),maxLives=state.gameModes.mode===2?75:50;
  $('#wave').textContent=state.wave?`第 ${state.wave} / 56 波`:state.dialogs.length?'部署':`首波 ${Math.max(0,30-Math.floor(state.time))} 秒`;
  $('#base').textContent=`${state.lives} / ${maxLives}`;$('#room-label').textContent=roomId;$('#gold').textContent=self?.gold??'—';
  $('#lumber').textContent=self?.lumber??'—';$('#food').textContent=self?`${self.food} / ${Math.min(65,self.cap)}`:'—';
  $('#gold-label').textContent=self?.goldDrain?'金币 · 败家已开':'金币';
  $('#open-build').classList.toggle('active',buildAreaOpen||Boolean(buildingId));
  $('#open-build').setAttribute('aria-pressed',String(buildAreaOpen||Boolean(buildingId)));
  const hero=state.units.find(isPlayerWorker);
  if(hero&&followHero){setCameraTarget(cameraTarget,hero.x,hero.y,terrainHeight(hero.x,hero.y));constrainCamera();}
  $('#message').textContent=state.messages.at(-1)?.text||'请选择游戏模式。';
  $('#clock').textContent=`${state.status==='victory'?'守卫成功':state.status==='defeat'?'基地失守':state.wave?`游戏时间 ${Math.floor(state.time/60)}:${String(Math.floor(state.time%60)).padStart(2,'0')}`:'等待开战'}`;
  if(selectedUnit&&!state.units.some(u=>u.id===selectedUnit&&u.owner===mySlot)){
    const previous=unitsById.get(selectedUnit);
    selectedUnit=previous?.building?state.units.find(unit=>unit.owner===mySlot&&unit.building&&!unit.dead&&Math.hypot(unit.x-previous.x,unit.y-previous.y)<1)?.id||null:null;
    targetMode=false;
  }
  renderBuildList(self);renderDialogs();updateObjects();renderUnitInspector();renderMobileUnitActions();renderPlayerControls();
  renderBattleResult();
  if(previewSourcePoint){const [x,z]=sourceToWorld(previewSourcePoint.x,previewSourcePoint.y);positionBuildPreview(new THREE.Vector3(x,0,z));}
}
function renderBattleResult(){
  const ended=['victory','defeat'].includes(state?.status),result=$('#battle-result');
  result.classList.toggle('hidden',!ended||resultDismissed);
  if(!ended)return;
  $('#dialog').classList.add('hidden');$('#inventory').classList.add('hidden');
  const won=state.status==='victory',self=state.players.find(player=>player.slot===mySlot),seconds=Math.floor(state.time);
  $('#result-title').textContent=won?'守卫成功':'基地失守';
  $('#result-description').textContent=won?'已击退本局敌军，感谢你的坚守。':'本局防守已结束，返回首页可以重新开始。';
  $('#result-stats').innerHTML=[['防守波次',`${state.wave} / 56`],['战斗时间',`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`],['击杀',self?.kills||0]].map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
}
function renderBuildList(self){
  const hero=state?.units.find(isPlayerWorker),list=$('#build-list');
  list.hidden=!buildAreaOpen||!!selectedUnit;
  if(!buildAreaOpen||selectedUnit)return;
  if(!hero){list.innerHTML='<div class="empty-build">选择职业后显示可建建筑</div>';return;}
  const builds=orderedBuildings(meta.units[hero.type]?.builds,meta.units),signature=`${hero.type}:${builds.join(',')}`;
  if(signature!==buildSignature){
    buildSignature=signature;
    const scrollTop=list.scrollTop;
    list.innerHTML=builds.map(id=>{const u=meta.units[id]||{},icon=assets?.url(u.icon);return `<button class="tower" data-unit="${id}"><span class="tower-icon">${icon?`<img src="${icon}" alt="">`:'⌂'}</span><span><b>${esc(u.name||id)}</b><small>${esc(u.tip||'防御建筑')} · 木材 ${u.lumberCost||0}${u.buildTime?` · ${u.buildTime}秒`:""}</small><small class="build-requirement"></small></span><strong>${u.cost||0}</strong></button>`;}).join('');
    list.scrollTop=scrollTop;
    list.querySelectorAll('.tower').forEach(button=>button.onclick=()=>{
      if(pendingBuild)return;
      buildingId=button.dataset.unit;selectedUnit=null;targetMode=false;castingAbility=null;targetingItem=null;dropBuildPreview();updatePlacementControls();
      $('#context-eyebrow').textContent='BUILD AREA';$('#context-title').textContent='建造建筑';
      const requirement=buildingRequirement(meta.units[buildingId],state.players.find(player=>player.slot===mySlot),state.units,meta.units,state.status);
      $('#hint').textContent=requirement.valid?`已选择 ${meta.units[buildingId].name}，点击绿色位置建造`:requirement.reason;
      renderBuildList(state.players.find(player=>player.slot===mySlot));ensureBuildPreview();if(buildAnchor)positionBuildPreview(buildAnchor);
    });
  }
  list.querySelectorAll('.tower').forEach(button=>{
    const requirement=buildingRequirement(meta.units[button.dataset.unit],self,state.units,meta.units,state.status);
    button.classList.toggle('active',buildingId===button.dataset.unit);button.classList.toggle('unavailable',!requirement.valid);
    button.querySelector('.build-requirement').textContent=requirement.reason;button.title=requirement.reason;
  });
}
function renderDialogs(){const dialog=state.dialogs.find(d=>d.players.includes(mySlot));const overlay=$('#dialog');if(!dialog){dialogSignature='';overlay.classList.add('hidden');return;}const signature=JSON.stringify(dialog);if(signature===dialogSignature)return;dialogSignature=signature;overlay.classList.remove('hidden');$('#dialog-title').textContent=dialog.title;$('#dialog-options').innerHTML=dialog.buttons.map((b,i)=>`<button class="primary dialog-option" data-id="${b.id}"><span class="option-number">0${i+1}</span><span>${esc(b.text)}</span><b>→</b></button>`).join('');$('#dialog-options').querySelectorAll('button').forEach(b=>b.onclick=()=>act({type:'choose',dialog:dialog.id,button:Number(b.dataset.id)}));}
function renderItems(filter=''){
  const list=$('#item-list');if(!meta?.items||!list)return;
  const term=filter.trim().toLowerCase(),rows=Object.entries(meta.items).filter(([id,item])=>item.inMap&&(!term||`${id} ${item.name} ${item.description}`.toLowerCase().includes(term))).sort((a,b)=>(Number(a[1].cost)||0)-(Number(b[1].cost)||0));
  $('#inventory-note').textContent=Object.values(meta.items).some(item=>item.purchasable)?'购买需靠近对应商店；掉落装备不能在图鉴直接购买。':'套装道具通过击杀掉落获取，拾取后使用建塔并升级，集齐三座激活职业套装。';
  list.innerHTML=rows.map(([id,item])=>`<div class="item-row" data-catalog-item="${id}"><div class="item-mark">✦</div><div><b>${esc(item.name)}</b><small>${esc(item.description)}</small></div><div class="item-actions">${item.purchasable?`<em>${item.cost||0} 金</em><button data-buy="${id}">购买</button>`:`<span class="item-source">${esc(item.sources.join(' / ')||'装备')}</span>`}</div></div>`).join('')||'<div class="empty-build">没有匹配的物品</div>';
  list.querySelectorAll('[data-buy]').forEach(button=>button.onclick=()=>{const worker=state?.units.find(isPlayerWorker);if(worker)act({type:'buy',unit:worker.id,item:button.dataset.buy});});
}
function renderAbilities(){
  const list=$('#ability-list'),autoList=$('#autocast-list'),passiveList=$('#passive-list'),unit=state?.units.find(u=>u.id===selectedUnit&&u.owner===mySlot);
  if(!list||!unit||!meta){if(list)list.innerHTML='';if(autoList)autoList.innerHTML='';if(passiveList)passiveList.innerHTML='';abilitySignature='';return;}
  const definitions=new Map((meta.units[unit.type]?.abilities||[]).map(a=>[a.id,a]));
  const abilities=unit.abilities.filter(a=>a.level>0&&definitions.get(a.id)?.castable&&!['A01H','A07F'].includes(a.id));
  const autos=unit.abilities.filter(a=>a.level>0&&a.autocastSupported);
  const passives=unit.abilities.filter(a=>a.level>0&&definitions.has(a.id)&&(!definitions.get(a.id).castable||a.id==='A07F')&&!a.autocastSupported&&!['Avul','AInv','A00U'].includes(a.id));
  const goldDrain=Boolean(state.players.find(player=>player.slot===mySlot)?.goldDrain);
  const busy=unit.construct>0||Boolean(unit.upgrade),busyText=unit.upgrade?'升级中':'建造中';
  const signature=`${unit.id}:${castingAbility}:${goldDrain}:${abilities.map(a=>`${a.id}.${a.level}`).join(',')}:${autos.map(a=>`${a.id}.${a.autocast}`).join(',')}:${passives.map(a=>`${a.id}.${a.level}`).join(',')}`;
  if(signature!==abilitySignature){
    abilitySignature=signature;
    list.innerHTML=abilities.length?`<div class="ability-title">技能</div>${abilities.map((a,i)=>{const def=definitions.get(a.id);return `<button class="ability-button ${castingAbility===a.id?'active':''} ${a.id==='A098'?'toggle-skill':''} ${a.id==='A098'&&goldDrain?'toggle-active':''}" data-spell="${a.id}" title="${esc(def?.description||def?.name||a.id)}" ${a.id==='A098'?`aria-pressed="${goldDrain}"`:''}><span>${i+1}</span><b>${esc(def?.name||a.id)}</b><small></small></button>`;}).join('')}`:'';
    autoList.innerHTML=autos.map(a=>{const def=definitions.get(a.id);return `<button class="autocast-toggle" type="button" data-autocast="${a.id}" aria-pressed="${a.autocast}"><span>自动施放：${esc(def?.name||a.id)}</span><small>${a.autocast?'已开启':'已关闭'}</small></button>`;}).join('');
    passiveList.innerHTML=passives.map(a=>{const def=definitions.get(a.id);return `<details class="passive-skill" data-passive="${a.id}"><summary>${esc(def.name||a.id)}<small>被动技能</small></summary>${def.description?`<p>${esc(def.description)}</p>`:''}</details>`;}).join('');
    list.querySelectorAll('[data-spell]').forEach(button=>button.onclick=()=>activateAbility(button.dataset.spell));
    autoList.querySelectorAll('[data-autocast]').forEach(button=>button.onclick=()=>{const selected=unitsById.get(selectedUnit),ability=selected?.abilities.find(a=>a.id===button.dataset.autocast);if(selected&&ability)act({type:'autocast',unit:selected.id,ability:ability.id,enabled:!ability.autocast});});
  }
  for(const ability of abilities){
    const button=list.querySelector(`[data-spell="${ability.id}"]`);
    if(button){button.querySelector('small').textContent=busy?busyText:ability.id==='A098'?(goldDrain?'已开启 · 每0.5秒扣1金':'已关闭 · 点击切换'):ability.cooldown>0?`${ability.cooldown.toFixed(1)}s`:`Lv ${ability.level}`;button.classList.toggle('toggle-active',ability.id==='A098'&&goldDrain);button.disabled=busy||ability.cooldown>0;}
  }
  autoList.querySelectorAll('button').forEach(button=>button.disabled=busy);
}
function renderUnitInspector(){
  const unit=state?.units.find(u=>u.id===selectedUnit&&u.owner===mySlot),panel=$('#unit-inspector'),context=$('#context-panel');
  panel.hidden=!unit;context.hidden=!unit&&!buildAreaOpen;
  $('#sell').hidden=!unit?.abilities.some(ability=>ability.id==='A01H');$('#sell').disabled=$('#sell').hidden||unit.construct>0||Boolean(unit.upgrade);
  $('#goods').hidden=!isPlayerWorker(unit);$('#unit-actions').hidden=$('#goods').hidden&&$('#sell').hidden;
  if(!unit){inspectorSignature='';return;}
  const def=meta.units[unit.type]||{},target=state.units.find(entry=>entry.id===unit.target),signature=`${unit.type}:${unit.id}:${Boolean(unit.building)}:${unit.abilities.map(a=>`${a.id}.${a.level}.${a.autocast}`).join(',')}`;
  $('#context-eyebrow').textContent=unit.building?'BUILDING':isPlayerWorker(unit)?'PLAYER':'UNIT';$('#context-title').textContent=def.name||unit.type;
  if(signature!==inspectorSignature){inspectorSignature=signature;$('#unit-name').textContent=def.name||unit.type;$('#unit-description').textContent=def.tip||'';$('#unit-build').hidden=!def.builds;}
  $('#unit-type').textContent=unit.building?(unit.upgrade?`升级中 ${unit.upgrade.remaining.toFixed(1)} 秒`:unit.construct>0?`建造中 ${unit.construct.toFixed(1)} 秒`:'防御建筑'):unit.itemBuild?'前往装备建造位置':(def.weaponType?'战斗单位':'可操作单位');
  const upgrade=meta.units[def.upgradeTo];$('#unit-upgrade').hidden=!upgrade;$('#unit-upgrade').disabled=Boolean(unit.upgrade)||unit.construct>0;
  if(upgrade)$('#unit-upgrade').textContent=unit.upgrade?`升级中 · ${unit.upgrade.remaining.toFixed(1)} 秒`:`升级为${upgrade.name} · ${upgrade.cost}金${upgrade.lumberCost?` / ${upgrade.lumberCost}木`:''} / ${upgrade.food}人口`;
  const construction=unit.construction,busy=unit.construct>0||Boolean(unit.upgrade);
  $('#construction-row').hidden=!construction;
  if(construction){$('#unit-construction-label').textContent=construction.kind==='upgrade'?'升级进度':'建造进度';$('#unit-construction-text').textContent=`${Math.floor(construction.progress*100)}% · 剩余 ${construction.remaining.toFixed(1)} 秒`;$('#unit-construction-bar').style.width=`${construction.progress*100}%`;}
  $('#unit-health-text').textContent=`${Math.ceil(unit.hp)} / ${Math.ceil(unit.maxHp)}`;$('#unit-health-bar').style.width=`${Math.max(0,Math.min(100,unit.hp/Math.max(1,unit.maxHp)*100))}%`;$('#mana-row').hidden=unit.maxMana<=0;$('#unit-mana-text').textContent=`${Math.ceil(unit.mana)} / ${Math.ceil(unit.maxMana)}`;$('#unit-mana-bar').style.width=`${Math.max(0,Math.min(100,unit.mana/Math.max(1,unit.maxMana)*100))}%`;
  const stats=[['攻击',def.weaponType?`${def.attackMin}-${def.attackMax}`:'—'],['射程',unit.attackRange?Math.round(unit.attackRange):'—'],['护甲',Number(unit.armor??def.armor??0).toFixed(1)]];$('#unit-stats').innerHTML=stats.map(([name,value])=>`<div class="unit-stat">${name}<b>${esc(value)}</b></div>`).join('');
  $('#target-mode').classList.toggle('active',targetMode);$('#target-mode').textContent=targetMode?'点选敌方单位':'指定攻击目标';$('#clear-target').disabled=!unit.target;$('#unit-target').textContent=target?`当前目标：${meta.units[target.type]?.name||target.type}`:targetMode?'请选择一名敌方单位':'当前目标：自动选择';targetUnit=unit.target||null;
  $('#target-mode').disabled=busy;$('#clear-target').disabled=busy||!unit.target;
}
function setBuildArea(open,point=null){
  buildAreaOpen=Boolean(open);buildAnchor=point?.clone()||null;buildingItem=null;
  if(buildAreaOpen){
    selectedUnit=null;targetMode=false;castingAbility=null;targetingItem=null;targetUnit=null;buildingId=null;dropBuildPreview();
    if(!buildAnchor){const worker=state?.units.find(isPlayerWorker);if(worker){const [x,z]=sourceToWorld(worker.x,worker.y+256);buildAnchor=new THREE.Vector3(x,terrainHeight(worker.x,worker.y+256),z);}}
    $('#context-eyebrow').textContent='BUILD AREA';$('#context-title').textContent='建造建筑';
    $('#hint').textContent='选择建筑，再点击绿色位置放置；Esc 取消建造';
  }else{buildingId=null;castingAbility=null;dropBuildPreview();}
  buildSignature='';abilitySignature='';updatePlacementControls();renderBuildList(state?.players.find(player=>player.slot===mySlot));renderUnitInspector();
  $('#open-build').classList.toggle('active',buildAreaOpen);$('#open-build').setAttribute('aria-pressed',String(buildAreaOpen));
}
function buildCheck(id,x,y){
  const player=state?.players.find(entry=>entry.slot===mySlot),definition=meta?.units[id],builder=buildingItem?state?.units.find(unit=>unit.id===buildingItem.unit&&unit.owner===mySlot&&!unit.dead&&unit.items.some(item=>item.id===buildingItem.item)):state?.units.find(unit=>unit.owner===mySlot&&!unit.dead&&String(meta.units[unit.type]?.builds||'').split(',').includes(id));
  if(state?.status!=='playing')return buildingRequirement(definition||{},player,state?.units||[],meta?.units||{},state?.status);
  if(!definition?.isBuilding||!builder)return{valid:false,reason:'当前职业不能建造该建筑'};
  const placement=checkBuildPlacement(terrain,state.units,x,y);if(!placement.valid)return placement;
  const requirement=buildingRequirement(definition,player,state.units,meta.units,state.status,{item:Boolean(buildingItem)});
  if(!requirement.valid)return{...placement,...requirement};
  return placement;
}
function positionBuildPreview(point){if(!buildingId||!point)return;const [sourceX,sourceY]=worldToSource(point.x,point.z),check=buildCheck(buildingId,sourceX,sourceY);previewSourcePoint={x:check.x??Math.round(sourceX/64)*64,y:check.y??Math.round(sourceY/64)*64,check};const [x,z]=sourceToWorld(previewSourcePoint.x,previewSourcePoint.y);ensureBuildPreview();if(!previewObject)return;previewObject.visible=true;previewObject.position.set(x,terrainHeight(previewSourcePoint.x,previewSourcePoint.y),z);previewObject.rotation.y=270*Math.PI/180;previewObject.traverse(object=>{if(!object.isMesh)return;for(const material of(Array.isArray(object.material)?object.material:[object.material]))material.color?.set(check.valid?'#91d684':'#e16c58');});const status=$('#placement-status');status.textContent=check.valid?'绿色位置可以建造':`不可建造：${check.reason}`;status.classList.toggle('invalid',!check.valid);}
function activateAbility(id){const unit=unitsById.get(selectedUnit),ability=unit?.abilities.find(entry=>entry.id===id),definition=meta.units[unit?.type]?.abilities.find(entry=>entry.id===id);if(!unit||!ability||!definition?.castable||unit.construct>0||unit.upgrade)return;if(ability.cooldown>0){notify(`技能冷却中：${ability.cooldown.toFixed(1)} 秒`);return;}targetMode=false;if(definition.targeting==='unit'||definition.targeting==='point'||definition.targeting==='either'){castingAbility=id;$('#hint').textContent=definition.targeting==='unit'?'选择技能目标':'选择技能施放位置';renderAbilities();return;}act({type:'cast',unit:unit.id,ability:id});}
function groundAt(clientX,clientY){setPointerFromClient(clientX,clientY);camera.updateMatrixWorld(true);raycaster.setFromCamera(pointer,camera);const floor=objects.get('terrain');const hitGround=floor&&raycaster.intersectObject(floor,false)[0];if(hitGround)return hitGround.point.clone();return raycaster.ray.intersectPlane(groundPlane,new THREE.Vector3());}
function panPointAt(clientX,clientY){setPointerFromClient(clientX,clientY);camera.updateMatrixWorld(true);raycaster.setFromCamera(pointer,camera);return raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),-cameraTarget.y),new THREE.Vector3());}
function footprintAt(distance){cameraProbe.aspect=camera.aspect;cameraProbe.updateProjectionMatrix();cameraProbe.position.copy(cameraTarget).add(new THREE.Vector3(...cameraOffset(CLASSIC_CAMERA,distance)));cameraProbe.lookAt(cameraTarget);cameraProbe.updateMatrixWorld(true);return cameraGroundFootprint(cameraProbe,cameraTarget,cameraTarget.y);}
function constrainCamera(){const bounds=terrainSourceBounds(terrain)||meta?.visuals?.camera?.bounds;if(!bounds)return;let footprint=footprintAt(zoom);if(!cameraFootprintFits(footprint,bounds)){let low=.55,high=zoom;for(let i=0;i<18;i++){const mid=(low+high)/2;if(cameraFootprintFits(footprintAt(mid),bounds))low=mid;else high=mid;}zoom=low;footprint=footprintAt(zoom);}clampCameraTarget(cameraTarget,footprint,bounds);const xs=[bounds[0],bounds[2],bounds[4],bounds[6]].map(value=>value/128),zs=[bounds[1],bounds[3],bounds[5],bounds[7]].map(value=>-value/128),planned=cameraTarget.clone().add(new THREE.Vector3(...cameraOffset(CLASSIC_CAMERA,zoom)));let far=CLASSIC_CAMERA.farZ/128;for(const x of [Math.min(...xs),Math.max(...xs)])for(const z of [Math.min(...zs),Math.max(...zs)])for(const y of [0,-1])far=Math.max(far,planned.distanceTo(new THREE.Vector3(x,y,z))+8);if(Math.abs(camera.far-far)>.25){camera.far=far;camera.updateProjectionMatrix();}}
function ensureBuildPreview(){
  if(!buildingId||!meta?.units[buildingId])return;
  if(previewObject?.userData.entity?.type===buildingId)return;
  if(previewObject)dropBuildPreview();
  const unit={id:-1,type:buildingId,owner:mySlot,x:0,y:0,facing:270,hp:1,maxHp:1,building:true,construct:0,abilities:[],items:[]};
  previewObject=meshEntity(unit);previewObject.visible=false;previewObject.userData.preview=true;previewObject.userData.selection.visible=false;
  // Native MDX materials do not inherit a Three mesh tint. Use a separate
  // ground footprint so valid/invalid placement remains visible for every model.
  const size=1/previewObject.userData.baseScale,footprint=new THREE.Mesh(new THREE.PlaneGeometry(size,size),new THREE.MeshBasicMaterial({color:0x91d684,transparent:true,opacity:.5,depthWrite:false,side:THREE.DoubleSide}));
  footprint.rotation.x=-Math.PI/2;footprint.position.y=.04*size;
  previewObject.add(footprint);previewObject.userData.footprint=footprint;scene.add(previewObject);
}
function dropBuildPreview(){if(previewObject){const footprint=previewObject.userData.footprint;footprint?.geometry.dispose();footprint?.material.dispose();releaseUnitModel(previewObject);previewObject=null;}previewSourcePoint=null;}
function moveSelectedTo(point){const unit=unitsById.get(selectedUnit);if(!point||!isMovableUnit(unit))return false;const [x,y]=worldToSource(point.x,point.z);if(act({type:'move',unit:unit.id,x,y})===null){notify('连接中断，请重新连接');return false;}$('#hint').textContent=isPlayerWorker(unit)?'单击地面移动；点击「建造建筑」打开建造列表':'单击地面移动；点击敌人指定攻击';renderUnitInspector();return true;}
function placeAt(point){if(!point||pendingBuild)return false;const [sourceX,sourceY]=worldToSource(point.x,point.z);if(buildingId){const check=buildCheck(buildingId,sourceX,sourceY);if(!check.valid){positionBuildPreview(point);notify(check.reason);return false;}const action=buildingItem?{type:'item',...buildingItem,x:check.x,y:check.y}:{type:'build',unit:buildingId,x:check.x,y:check.y},requestId=act(action);if(requestId===null){notify('连接中断，请重新连接');return false;}pendingBuild={requestId,buildingId};return true;}setBuildArea(true,point);return false;}

function selectUnit(unit){
  selectedUnit=unit.id;targetUnit=unit.target||null;targetMode=false;buildAreaOpen=false;followHero=false;buildingId=null;castingAbility=null;targetingItem=null;buildingItem=null;dropBuildPreview();updatePlacementControls();
  $('#hint').textContent=isPlayerWorker(unit)?'单击地面移动；建造和装备操作在此面板':isMovableUnit(unit)?'单击地面移动；点击敌人指定攻击':(meta.units[unit.type]?.name||unit.type)+' · HP '+Math.ceil(unit.hp)+' / '+Math.ceil(unit.maxHp);
  buildSignature='';abilitySignature='';renderBuildList(state.players.find(p=>p.slot===mySlot));renderUnitInspector();
}

function openItemCatalog(){
  const worker=state?.units.find(isPlayerWorker);if(!worker){notify('选择职业后可查看装备图鉴');return;}
  selectUnit(worker);$('#inventory').classList.remove('hidden');renderItems($('#item-search').value);
}

function updatePlacementControls(){$('#placement-controls').hidden=!buildingId;if(buildingId){$('#placement-status').textContent='移动鼠标查看可建位置';$('#placement-status').classList.remove('invalid');}else{$('#placement-status').textContent='';$('#placement-status').classList.remove('invalid');}}
$('#cancel-build').addEventListener('click',()=>{buildingItem=null;buildingId=null;dropBuildPreview();updatePlacementControls();buildSignature='';if(state)renderBuildList(state.players.find(p=>p.slot===mySlot));$('#hint').textContent='已取消建筑选择';});

// A tap uses the same selection and targeting rules for touch and mouse.
function battleTap(clientX,clientY){
  const ground=groundAt(clientX,clientY);
  if(buildingId){placeAt(ground);return;}
  const object=battleObjectAt(clientX,clientY,ground);
  const unit=object?.userData.entity;
  if(targetingItem){
    const pending=targetingItem;
    if(pending.kind==='unit'){
      if(!unit){notify('璇烽€夋嫨鐩爣鍗曚綅');return;}
      targetingItem=null;act({type:'item',unit:pending.unit,item:pending.item,target:unit.id});return;
    }
    const point=groundAt(clientX,clientY);if(point){const [x,y]=worldToSource(point.x,point.z);targetingItem=null;act({type:'item',unit:pending.unit,item:pending.item,x,y});}return;
  }
  if(castingAbility&&selectedUnit){
    const caster=unitsById.get(selectedUnit),definition=meta.units[caster?.type]?.abilities.find(entry=>entry.id===castingAbility),useUnit=definition?.targeting==='unit'&&unit||definition?.targeting==='either'&&unit;
    if(useUnit)act({type:'cast',unit:selectedUnit,ability:castingAbility,target:unit.id});
    else{const point=groundAt(clientX,clientY);if(point){const [x,y]=worldToSource(point.x,point.z);act({type:'cast',unit:selectedUnit,ability:castingAbility,x,y});}}
    castingAbility=null;abilitySignature='';renderAbilities();return;
  }
  if(object?.userData.item){pickupEquipment(object.userData.item.id);return;}
  if(unit){
    if(unit.owner>=8){if(selectedUnit&&state?.units.some(u=>u.id===selectedUnit&&u.owner===mySlot)){targetUnit=unit.id;targetMode=false;act({type:'target',unit:selectedUnit,target:unit.id});$('#hint').textContent='目标：'+(meta.units[unit.type]?.name||unit.type);renderUnitInspector();}else notify('先选择一名己方单位');return;}
    selectUnit(unit);return;
  }
  if(targetMode){$('#unit-target').textContent='请选择一名敌方单位';return;}
  const point=groundAt(clientX,clientY);
  const selected=unitsById.get(selectedUnit);
  if(isMovableUnit(selected)){moveSelectedTo(point);return;}
  if(selected?.owner===mySlot&&!selected.building){notify('该单位不能移动');return;}
  placeAt(point);
}
function panCamera(delta){const previous=cameraTarget.clone();cameraTarget.add(delta);constrainCamera();const applied=cameraTarget.clone().sub(previous);cameraFocus.add(applied);camera.position.add(applied);camera.lookAt(cameraFocus);}
function panFromAnchor(anchor,clientX,clientY){if(!anchor)return;const now=panPointAt(clientX,clientY);if(now)panCamera(anchor.clone().sub(now));}

// Track all touch pointers together so a pinch or cancelled gesture can never
// turn into a tap that moves a unit or places a building.
const activeTouches=new Map();let touchGesture=null;
const touchDistance=points=>Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y);
canvas.addEventListener('pointerdown',e=>{
  if(e.pointerType!=='touch')return;e.preventDefault();e.stopImmediatePropagation();
  activeTouches.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(activeTouches.size===1)touchGesture={start:{x:e.clientX,y:e.clientY},anchor:panPointAt(e.clientX,e.clientY),moved:false,multi:false};
  else if(touchGesture){touchGesture.multi=true;touchGesture.moved=true;touchGesture.pinchDistance=touchDistance([...activeTouches.values()].slice(0,2));}
  try{canvas.setPointerCapture(e.pointerId);}catch{}
},{capture:true});
canvas.addEventListener('pointermove',e=>{
  if(e.pointerType!=='touch'||!activeTouches.has(e.pointerId))return;e.preventDefault();e.stopImmediatePropagation();
  activeTouches.set(e.pointerId,{x:e.clientX,y:e.clientY});if(!touchGesture)return;
  if(activeTouches.size>=2){const distance=touchDistance([...activeTouches.values()].slice(0,2));if(distance>0&&touchGesture.pinchDistance>0){followHero=false;zoom=THREE.MathUtils.clamp(zoom*touchGesture.pinchDistance/distance,.55,2.8);constrainCamera();}touchGesture.pinchDistance=distance;return;}
  if(!touchGesture.moved&&Math.hypot(e.clientX-touchGesture.start.x,e.clientY-touchGesture.start.y)>8)touchGesture.moved=true;
  if(touchGesture.moved){followHero=false;panFromAnchor(touchGesture.anchor,e.clientX,e.clientY);}
},{capture:true});
function finishTouch(e){
  if(e.pointerType!=='touch'||!activeTouches.has(e.pointerId))return;e.preventDefault();e.stopImmediatePropagation();
  if(touchGesture&&!touchGesture.multi&&Math.hypot(e.clientX-touchGesture.start.x,e.clientY-touchGesture.start.y)>8)touchGesture.moved=true;
  activeTouches.delete(e.pointerId);
  if(!activeTouches.size){if(e.type==='pointerup'&&touchGesture&&!touchGesture.moved&&!touchGesture.multi)battleTap(e.clientX,e.clientY);touchGesture=null;return;}
  if(touchGesture){touchGesture.multi=true;touchGesture.moved=true;const remaining=[...activeTouches.values()];if(remaining.length===1){touchGesture.start=remaining[0];touchGesture.anchor=panPointAt(remaining[0].x,remaining[0].y);}else touchGesture.pinchDistance=touchDistance(remaining.slice(0,2));}
}
canvas.addEventListener('pointerup',finishTouch,{capture:true});
canvas.addEventListener('pointercancel',finishTouch,{capture:true});
canvas.addEventListener('lostpointercapture',finishTouch,{capture:true});

canvas.addEventListener('pointerdown',e=>{if(e.button===2||e.button===1){cameraPanButton=e.button;cameraPanStart=panPointAt(e.clientX,e.clientY);canvas.setPointerCapture?.(e.pointerId);}else if(e.button===0&&!buildingId&&!interactiveObjectAt(e.clientX,e.clientY)){cameraPanButton=0;cameraPanStart=panPointAt(e.clientX,e.clientY);canvas.setPointerCapture?.(e.pointerId);}},{capture:true});
addEventListener('pointerup',e=>{if(cameraPanButton===1||cameraPanButton===2){cameraPanStart=null;cameraPanButton=null;return;}if(cameraPanButton!==0)return;const dragged=mouseDown&&Math.hypot(e.clientX-mouseDown.x,e.clientY-mouseDown.y)>5;cameraPanStart=null;cameraPanButton=null;if(dragged){mouseDown=null;e.preventDefault();e.stopImmediatePropagation();}},{capture:true});
canvas.addEventListener('pointermove',e=>{const panMask=cameraPanButton===0?1:cameraPanButton===1?4:2;if(cameraPanStart&&(e.buttons&panMask)){if(!mouseDown||Math.hypot(e.clientX-mouseDown.x,e.clientY-mouseDown.y)>5){followHero=false;const now=panPointAt(e.clientX,e.clientY);if(now)panCamera(cameraPanStart.clone().sub(now));}return;}if(buildingId){const point=groundAt(e.clientX,e.clientY);if(point)positionBuildPreview(point);}});
canvas.addEventListener('pointerup',e=>{if(!mouseDown)return;const drag=Math.hypot(e.clientX-mouseDown.x,e.clientY-mouseDown.y)>5,button=mouseDown.button;mouseDown=null;if(button===2||button===1){cameraPanStart=null;if(button===2&&!drag)moveSelectedTo(groundAt(e.clientX,e.clientY));e.preventDefault();e.stopImmediatePropagation();return;}if(drag){e.stopImmediatePropagation();return;}battleTap(e.clientX,e.clientY);e.stopImmediatePropagation();},{capture:true});
canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('lostpointercapture',()=>{cameraPanStart=null;cameraPanButton=null;});
canvas.addEventListener('wheel',e=>{e.preventDefault();followHero=false;zoom=THREE.MathUtils.clamp(zoom+(e.deltaY>0?.1:-.1),.55,2.8);constrainCamera();},{passive:false});
let mobileUnitSignature='',groundItemSignature='',setProgressSignature='',teamSignature='';
function activateItem(unit,item){
  const use=meta.items[item.type]?.use;
  if(!use){notify('这件装备随携带自动生效');return;}
  targetingItem=null;castingAbility=null;targetMode=false;
  if(use.buildUnit){
    selectUnit(unit);buildingItem={unit:unit.id,item:item.id};buildingId=use.buildUnit;
    ensureBuildPreview();updatePlacementControls();$('#hint').textContent='选择绿色地格建造；农民会走近后使用道具，建成后点击建筑升级';
    renderMobileUnitActions();return;
  }
  if(use.targeting==='unit'||use.targeting==='point'){
    targetingItem={unit:unit.id,item:item.id,kind:use.targeting};$('#hint').textContent=use.targeting==='unit'?'点击目标单位':'点击地图位置';return;
  }
  act({type:'item',unit:unit.id,item:item.id});
}
function pickupEquipment(id){
  const worker=state?.units.find(isPlayerWorker),item=state?.items.find(item=>item.id===id);
  if(!worker||!item)return;
  if(worker.items.length>=6){notify('农民物品栏已满，请先丢弃一件装备');return;}
  if(Math.hypot(worker.x-item.x,worker.y-item.y)>meta.pickupRange){notify('装备超出拾取范围');return;}
  selectUnit(worker);act({type:'pickup',unit:worker.id,item:id});
}
function renderMobileUnitActions(){
  const controls=$('#mobile-unit-actions'),unit=unitsById.get(selectedUnit),owned=isPlayerWorker(unit);
  controls.hidden=!owned||Boolean(buildingId);
  if(!owned){mobileUnitSignature='';return;}
  $('#inventory-count').textContent=`${unit.items.length} / 6`;
  const signature=`${unit.id}:${unit.items.map(item=>`${item.id}.${item.type}.${item.charges}`).join(',')}`;
  if(signature===mobileUnitSignature)return;mobileUnitSignature=signature;
  const list=$('#unit-items');
  list.innerHTML=unit.items.map(item=>{
    const definition=meta.items[item.type]||{},use=definition.use;
    return `<div class="equipment-slot" data-held-item="${item.id}"><b title="${esc(definition.description||'')}">${esc(definition.name||item.type)}</b><small>${item.charges>1?`${item.charges}次 · `:''}${use?.buildUnit?'一次性建塔道具':use?'可使用物品':'携带生效'}</small><div><button type="button" data-item="${item.id}" ${use?'':'disabled'}>${use?.buildUnit?'选择位置建造':use?'使用':'被动'}</button><button type="button" data-drop-item="${item.id}">丢弃</button></div></div>`;
  }).join('')+Array.from({length:6-unit.items.length},()=>'<div class="equipment-slot empty-slot">空位</div>').join('');
  list.querySelectorAll('[data-item]').forEach(button=>button.onclick=()=>{
    const selected=unitsById.get(selectedUnit),item=selected?.items.find(entry=>String(entry.id)===button.dataset.item);
    if(isPlayerWorker(selected)&&item)activateItem(selected,item);
  });
  list.querySelectorAll('[data-drop-item]').forEach(button=>button.onclick=()=>{
    const selected=unitsById.get(selectedUnit);
    if(isPlayerWorker(selected))act({type:'drop',unit:selected.id,item:Number(button.dataset.dropItem)});
  });
}
function renderPlayerControls(){
  const worker=unitsById.get(selectedUnit),self=state?.players.find(player=>player.slot===mySlot),controls=$('#player-controls');
  controls.hidden=!isPlayerWorker(worker);if(controls.hidden||!self)return;
  const team=state.players.filter(player=>player.active&&player.connected!==false&&player.slot!==mySlot),signature=team.map(player=>`${player.slot}.${player.name}`).join(',');
  if(signature!==teamSignature||!$('#gift-player').options.length){
    teamSignature=signature;const selected=$('#gift-player').value;
    $('#gift-player').innerHTML=team.length?team.map(player=>`<option value="${player.slot}">${esc(player.name)}</option>`).join(''):'<option value="">暂无在线队友</option>';
    if(team.some(player=>String(player.slot)===selected))$('#gift-player').value=selected;
  }
  $('#gift-gold').max=Math.floor(self.gold);$('#gift-lumber').max=Math.floor(self.lumber);$('#gift-submit').disabled=!team.length||Boolean(pendingGift)||!connection.joined;
  if(!team.length)$('#gift-status').textContent='队友进入同一房间后即可赠送';
  else if($('#gift-status').textContent==='队友进入同一房间后即可赠送')$('#gift-status').textContent='';
  const drops=state.items.slice().sort((a,b)=>Math.hypot(a.x-worker.x,a.y-worker.y)-Math.hypot(b.x-worker.x,b.y-worker.y));
  $('#ground-item-count').textContent=drops.length;
  const dropSignature=`${worker.items.length}:${drops.map(item=>`${item.id}.${Math.hypot(item.x-worker.x,item.y-worker.y)<=meta.pickupRange}`).join(',')}`;
  if(dropSignature!==groundItemSignature){
    groundItemSignature=dropSignature;
    $('#ground-items').innerHTML=drops.map(item=>`<div class="ground-item"><span>${esc(meta.items[item.type]?.name||item.type)}</span><button type="button" data-pickup="${item.id}" ${worker.items.length>=6||Math.hypot(item.x-worker.x,item.y-worker.y)>meta.pickupRange?'disabled':''}>拾取</button></div>`).join('')||'<small class="equipment-help">暂无地面装备</small>';
    $('#ground-items').querySelectorAll('[data-pickup]').forEach(button=>button.onclick=()=>pickupEquipment(Number(button.dataset.pickup)));
  }
  const progress=JSON.stringify(self.sets);
  if(progress!==setProgressSignature){
    setProgressSignature=progress;
    $('#set-progress').innerHTML=(self.sets||[]).filter(set=>set.eligible||set.count||set.pieces.some(piece=>piece.placed)).map(set=>{
      const definition=meta.equipment.find(definition=>definition.id===set.id);
      return `<div class="set-status ${set.active?'set-active':''}" data-set="${set.id}"><b>${esc(definition.name)} · ${set.active?'已激活':`${set.count} / 3`}</b><small>${set.pieces.map(piece=>`${piece.built?'✓':piece.placed?'待升级':'○'} ${esc(meta.units[piece.unit]?.name||piece.unit)}`).join('<br>')}</small><p>${set.active?'三座套装塔的职业效果已生效':!set.eligible?'当前模式需要对应职业激活':!set.inRange?`三座塔之间距离须不超过 ${set.distance} 码`:`使用三件道具建塔并升级；三座塔之间距离须不超过 ${set.distance} 码`}</p></div>`;
    }).join('');
  }
}
$('#resource-form').addEventListener('submit',event=>{
  event.preventDefault();if(pendingGift)return;
  const gold=Number($('#gift-gold').value),lumber=Number($('#gift-lumber').value),player=Number($('#gift-player').value);
  if(!Number.isSafeInteger(gold)||!Number.isSafeInteger(lumber)||gold<0||lumber<0||gold+lumber<=0){$('#gift-status').textContent='请输入金币或木材的整数数量';return;}
  const requestId=act({type:'transfer',player,gold,lumber});
  if(requestId===null){$('#gift-status').textContent='连接中断，未能赠送';return;}
  pendingGift={requestId};$('#gift-status').textContent='正在赠送…';$('#gift-submit').disabled=true;
});
$('#unit-upgrade').onclick=()=>{const unit=unitsById.get(selectedUnit),to=meta.units[unit?.type]?.upgradeTo;if(unit&&to)act({type:'upgrade',unit:unit.id,to});};
$('#select-worker').onclick=()=>{const worker=state?.units.find(isPlayerWorker);if(worker)selectUnit(worker);};
$('#unit-build').onclick=()=>setBuildArea(true);
$('#open-build').onclick=()=>setBuildArea(true);
$('#context-close').onclick=()=>{selectedUnit=null;targetMode=false;targetUnit=null;abilitySignature='';setBuildArea(false);renderAbilities();};
$('#target-mode').onclick=()=>{if(!selectedUnit)return;targetMode=!targetMode;castingAbility=null;$('#hint').textContent=targetMode?'点击敌方单位指定攻击目标':'已退出目标选择';renderUnitInspector();};
$('#clear-target').onclick=()=>{if(!selectedUnit)return;act({type:'target',unit:selectedUnit,target:null});targetUnit=null;$('#unit-target').textContent='当前目标：自动选择';};
setInterval(()=>{renderAbilities();renderMobileUnitActions();},250);
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function act(action){const requestId=++actionSequence;return connection.send({type:'action',requestId,action})?requestId:null;}
let terrainLoading=null,connectionStatus='idle';
let browserStorage;try{browserStorage=localStorage;}catch{}
function resetBattle(){
  resultDismissed=false;$('#battle-result').classList.add('hidden');
  state=null;selectedUnit=null;targetUnit=null;targetMode=false;targetingItem=null;buildingItem=null;
  pendingBuild=null;pendingGift=null;buildingId=null;buildAreaOpen=false;dropBuildPreview();
  for(const [key,object]of objects){
    if(key.startsWith('u')){releaseUnitModel(object);objects.delete(key);}
    else if(key.startsWith('i')){releaseItemModel(object);objects.delete(key);}
  }
  unitsById.clear();effects.dispose();effects=new BattleEffects(scene,{capacity:4096,ground:terrainHeight});
  originalEffects?.dispose();originalEffects=assets?new OriginalEffects(scene,assets,objects,{ground:terrainHeight}):null;
  dialogSignature=buildSignature=abilitySignature=inspectorSignature=mobileUnitSignature=groundItemSignature=setProgressSignature=teamSignature='';
  followHero=true;$('#context-panel').hidden=true;updatePlacementControls();
}
function showLobby(message=''){
  resetBattle();mySlot=-1;roomId='';mouseDown=null;cameraPanStart=null;cameraPanButton=null;
  $('#lobby').classList.remove('hidden');$('#dialog').classList.add('hidden');$('#inventory').classList.add('hidden');
  $('#leave-room').hidden=true;$('#cancel-reconnect').hidden=true;$('#network-status').hidden=true;
  $('#room-code').value='';$('#session-status').textContent=message;
  $('#wave').textContent='待命';$('#base').textContent='—';$('#room-label').textContent='未连接';
  for(const id of ['gold','lumber','food'])$('#'+id).textContent='—';
  $('#clock').textContent='等待开战';$('#message').textContent='连接或创建一个房间，开始组队防守。';
}
function returnHome(){
  connection.leave();showLobby();$('#nickname').focus();
}
const connection=new BattleConnection({
  url:`${location.protocol==='https:'?'wss:':'ws:'}//${location.host}`,storage:browserStorage,
  onStatus(status,message){
    const lost=connectionStatus==='connected'&&status!=='connected';connectionStatus=status;
    $('.connection').classList.toggle('on',status==='connected');
    $('#link-text').textContent=({connected:'联机正常',connecting:'连接中…',reconnecting:'正在重连…',replaced:'其他页面已连接',failed:'连接未恢复',finished:'对局已结束'})[status]||'未连接';
    $('#reconnect').hidden=!['reconnecting','replaced'].includes(status);
    $('.join-button').disabled=['connecting','reconnecting'].includes(status);
    $('#leave-room').hidden=mySlot<0;
    $('#cancel-reconnect').hidden=mySlot>=0||!['connecting','reconnecting','replaced'].includes(status);
    $('#session-status').textContent=message||(status==='reconnecting'?`正在返回房间 ${connection.session?.room||''}…`:status==='connecting'?'正在连接战场…':'');
    const banner=$('#network-status');banner.hidden=!['reconnecting','replaced'].includes(status)||mySlot<0;
    banner.textContent=message||'连接中断，正在自动重连。全员离线时战场保留 30 分钟。';
    if(lost){
      if(pendingGift)$('#gift-status').textContent='连接中断，请重连后核对余额';
      pendingBuild=null;pendingGift=null;targetingItem=null;targetMode=false;
      if(state){setBuildArea(false);renderPlayerControls();}
    }
    if(status==='failed'){
      showLobby(message);
    }
  },
  onMessage(m){
    if(m.type==='map'){
      meta??=m.meta;
      if(!terrainLoading)terrainLoading=Promise.all([fetch('/map/terrain.json').then(r=>r.json()),fetch('/map/visuals.json').then(r=>r.json()),fetch('/warcraft/manifest.json').then(r=>r.json())]).then(async([terrainData,visuals,manifest])=>{
        meta.visuals=visuals;assets=configureModels(renderer,manifest);await buildTerrain(terrainData);
      }).catch(()=>{terrainLoading=null;notify('地图加载失败，请检查网络后重新连接');});
    }else if(m.type==='joined'){
      if(mySlot>=0&&!m.resumed)resetBattle();
      mySlot=m.slot;roomId=m.room;$('#lobby').classList.add('hidden');
      $('#leave-room').hidden=false;$('#cancel-reconnect').hidden=true;
    }else if(m.type==='state'){state=m.state;renderHud();}
    else if(m.type==='action-result'){
      if(pendingBuild?.requestId===m.requestId){const worker=buildingItem&&unitsById.get(buildingItem.unit);pendingBuild=null;if(worker){buildingItem=null;selectUnit(worker);}else setBuildArea(false);}
      if(pendingGift?.requestId===m.requestId){pendingGift=null;$('#gift-gold').value='0';$('#gift-lumber').value='0';$('#gift-status').textContent='赠送成功';}
    }else if(m.type==='error'){
      if(pendingBuild?.requestId===m.requestId)pendingBuild=null;
      if(pendingGift?.requestId===m.requestId){pendingGift=null;$('#gift-status').textContent=m.message;}
      notify(m.message);
    }
  }
});
function connect(name,room){
  room=String(room||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,8);
  const saved=connection.session;
  connection.start({name,room,...(saved?.room===room&&saved.name===name?{resumeToken:saved.resumeToken}:{})});
}
$('#reconnect').onclick=()=>connection.retry();
$('#leave-room').onclick=returnHome;$('#result-home').onclick=returnHome;$('#settings-home').onclick=returnHome;$('#cancel-reconnect').onclick=returnHome;
$('#result-review').onclick=()=>{resultDismissed=true;$('#battle-result').classList.add('hidden');};
$('.brand').addEventListener('click',event=>{event.preventDefault();returnHome();});
addEventListener('online',()=>{if(connectionStatus==='reconnecting')connection.retry();});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&connectionStatus==='reconnecting')connection.retry();});
addEventListener('pagehide',()=>connection.stop());
addEventListener('pageshow',event=>{if(event.persisted&&connection.session)connection.retry();});
if(connection.session){$('#nickname').value=connection.session.name||'';$('#room-code').value=connection.session.room;connection.start();}
function notify(message){const el=$('#toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1700);}
$('#join-form').addEventListener('submit',e=>{e.preventDefault();connect($('#nickname').value||'边境守卫',$('#room-code').value);});
$('#goods').onclick=openItemCatalog;$('#item-search').oninput=e=>renderItems(e.target.value);$('#inventory-close').onclick=()=>$('#inventory').classList.add('hidden');$('#sell').onclick=()=>{if(selectedUnit)act({type:'cast',unit:selectedUnit,ability:'A01H'});};
$('#zoom-in').onclick=()=>{zoom=Math.max(.65,zoom-.1);};$('#zoom-out').onclick=()=>{zoom=Math.min(1.45,zoom+.1);};$('#center').onclick=()=>{const hero=state?.units.find(u=>u.owner===mySlot&&['h001','h002','h000','h004','h003','h06C'].includes(u.type));if(hero)setCameraTarget(cameraTarget,hero.x,hero.y,terrainHeight(hero.x,hero.y));else cameraTarget.set(0,0,0);zoom=1;constrainCamera();};
canvas.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')mouseDown={x:e.clientX,y:e.clientY,button:e.button};});
const editingText=e=>!!e.target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"])');
addEventListener('keydown',e=>{
  if(e.key==='F1'){e.preventDefault();$('#select-worker').click();return;}
  if(editingText(e)||e.repeat)return;
  if(e.key==='b'||e.key==='B'){e.preventDefault();if(state?.units.some(isPlayerWorker))setBuildArea(true);return;}
  if(e.key==='Escape'){
    $('#inventory').classList.add('hidden');targetingItem=null;castingAbility=null;
    if(buildingId){buildingItem=null;buildingId=null;dropBuildPreview();updatePlacementControls();buildSignature='';if(state)renderBuildList(state.players.find(p=>p.slot===mySlot));}
    else if(targetMode){targetMode=false;renderUnitInspector();}
    else if(buildAreaOpen)setBuildArea(false);
    else if(selectedUnit)$('#context-close').click();
    renderAbilities();return;
  }
  if(e.key==='q'||e.key==='Q'){if($('#inventory').classList.contains('hidden'))openItemCatalog();else $('#inventory').classList.add('hidden');return;}
  if(selectedUnit&&/^[1-6]$/.test(e.key))$('#ability-list').querySelectorAll('[data-spell]')[Number(e.key)-1]?.click();
});
$('#center').addEventListener('click',()=>setTimeout(()=>{followHero=true;zoom=1;},0));
for(const [selector,delta]of [['#zoom-in',-.1],['#zoom-out',.1]])$(selector).addEventListener('click',e=>{e.stopImmediatePropagation();followHero=false;zoom=THREE.MathUtils.clamp(zoom+delta,.55,2.8);constrainCamera();},{capture:true});
function advanceRemotePosition(obj,dt){const move=obj.userData.remoteMove;if(!move)return;move.elapsed=Math.min(move.elapsed+dt,move.duration);const progress=move.elapsed/move.duration;obj.position.lerpVectors(move.from,move.to,progress);if(progress===1)obj.userData.remoteMove=null;}
function updateUnitViews(dt,time){
  let instances=0;
  for(const[key,obj]of objects){
    if(key.startsWith('i')){animateItem(obj,dt);continue;}
    if(!key.startsWith('u'))continue;
    advanceRemotePosition(obj,dt);
    const unit=obj.userData.entity,selected=unit?.id===selectedUnit&&unit?.owner===mySlot;
    obj.userData.forceDetail=unit?.id===targetUnit;
    const outside=frameFrustum.planes.some(plane=>plane.distanceToPoint(obj.position)<-12);
    animateUnit(obj,dt,time,selected,camera,frameFrustum);
    if(!obj.userData.lowDetail||outside)continue;
    instanceTransform.position.copy(obj.position);instanceTransform.position.y+=.42*obj.userData.baseScale;instanceTransform.rotation.copy(obj.rotation);instanceTransform.scale.setScalar(obj.userData.baseScale);instanceTransform.updateMatrix();
    lowDetailBatch.setMatrixAt(instances,instanceTransform.matrix);
    const ownerColor=Number(unit.ownerColor??unit.owner);
    instanceTint.setHex(ownerColor>=4?0xff2626:TEAM_COLORS[ownerColor]||0x23fa35);
    lowDetailBatch.setColorAt(instances,instanceTint);instances++;
  }
  lowDetailBatch.count=instances;
  if(instances){
    lowDetailBatch.instanceMatrix.clearUpdateRanges();lowDetailBatch.instanceMatrix.addUpdateRange(0,instances*16);lowDetailBatch.instanceMatrix.needsUpdate=true;
    if(lowDetailBatch.instanceColor){lowDetailBatch.instanceColor.clearUpdateRanges();lowDetailBatch.instanceColor.addUpdateRange(0,instances*3);lowDetailBatch.instanceColor.needsUpdate=true;}
  }
}
let lastFrame=performance.now(),gameClock=0;
function frame(){
  requestAnimationFrame(frame);
  const now=performance.now(),dt=Math.min(.25,(now-lastFrame)/1000);lastFrame=now;gameClock+=dt;
  const offset=new THREE.Vector3(...cameraOffset(CLASSIC_CAMERA,zoom)),blend=1-Math.exp(-dt*5);
  cameraFocus.lerp(cameraTarget,blend);camera.position.lerp(cameraTarget.clone().add(offset),blend);camera.lookAt(cameraFocus);camera.updateMatrixWorld();
  frameProjection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);frameFrustum.setFromProjectionMatrix(frameProjection);
  if(state){
    effects.consume(state.effects,fx=>{
      if(fx.kind==='camera'){
        if(fx.player===mySlot||fx.player===null){
          if(fx.operation==='pan'){setCameraTarget(cameraTarget,fx.x,fx.y,terrainHeight(fx.x,fx.y));followHero=false;setTimeout(()=>followHero=true,Math.max(0,fx.duration||0)*1000);}
          if(fx.operation==='follow'){const unit=objects.get(`u${fx.sourceId}`);if(unit)setCameraTarget(cameraTarget,unit.userData.entity.x+(fx.offset?.[0]||0),unit.userData.entity.y+(fx.offset?.[1]||0),unit.position.y);followHero=!!fx.inherit;}
        }
        return true;
      }
      if(fx.kind==='build')return true;
      const object=objects.get(`u${fx.sourceId}`);
      if(object&&['projectile','spell','death'].includes(fx.kind))cueUnitAnimation(object,fx.kind==='projectile'?'attack':fx.kind==='spell'?'spell':fx.kind,fx.animationNames||'');
      return originalEffects?.handle(fx)||false;
    });
    updateUnitViews(dt,gameClock);effects.update(dt,state.effects);originalEffects?.update(dt,objects,state.effects);
  }else lowDetailBatch.count=0;
  renderer.render(scene,camera);
}
frame();
addEventListener('resize',()=>{const {width,height}=viewportSize();camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);constrainCamera();});
