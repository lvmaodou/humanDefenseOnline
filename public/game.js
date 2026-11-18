import * as THREE from 'three';
import { configureModels, getModelAssets, createUnitModel, animateUnit, cueUnitAnimation, releaseUnitModel } from './models.js';
import { BattleEffects, effectStyle } from './effects.js';
import { createWorldMaterials } from './surface.js';
import { CLASSIC_CAMERA, cameraOffset, cameraVerticalFov, cameraGroundFootprint, cameraFootprintFits, clampCameraTarget, setCameraTarget, sourceToWorld, worldToSource, terrainSourceBounds } from './coordinates.js';
import { createOriginalWorld, OriginalEffects } from './original-world.js';
import { createTerrainGeometry, sampleTerrainHeight } from './terrain-relief.js';
import { createTerrainAtlas } from './terrain-textures.js';
import { checkBuildPlacement } from './placement.js';
import { enableRotatedListScroll } from './scroll-list.js';

function interactiveObjectAt(clientX,clientY){setPointerFromClient(clientX,clientY);camera.updateMatrixWorld(true);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects([...objects.values()].filter(object=>object.userData.entity||object.userData.item),true).length>0;}
const $=s=>document.querySelector(s),canvas=$('#battle'),app=$('#app');
enableRotatedListScroll($('#build-list'),()=>getComputedStyle(app).transform!=='none');
const viewportSize=()=>({width:app.clientWidth,height:app.clientHeight});
const initialViewport=viewportSize();
function setPointerFromClient(clientX,clientY){const rect=canvas.getBoundingClientRect();if(getComputedStyle(app).transform!=='none')pointer.set((clientY-rect.top)/rect.height*2-1,(clientX-rect.left)/rect.width*2-1);else pointer.set((clientX-rect.left)/rect.width*2-1,1-(clientY-rect.top)/rect.height*2);}
let meta=null,terrain=null,state=null,mySlot=-1,roomId='',socket=null,selectedUnit=null,buildingId=null,buildAreaOpen=false,targetMode=false,mouseDown=null,cameraPanStart=null,cameraPanButton=null,zoom=1,followHero=true,previewObject=null,previewSourcePoint=null,dialogSignature='',buildSignature='',abilitySignature='',inspectorSignature='',assets=null,originalEffects=null,originalDoodads=[];
let targetUnit=null,castingAbility=null,targetingItem=null,moveMode=false,buildAnchor=null;
// A small vertical lift makes the map's single-level cliffs readable at game zoom.
const TERRAIN_RELIEF=1.45;
window.__originalVisualDebug=()=>{camera.updateMatrixWorld(true);return{assets:assets?.stats,originalDoodads:originalDoodads.length,terrainTexture:Boolean(worldMaterials.terrain.map),camera:{target:cameraTarget.toArray(),focus:cameraFocus.toArray(),position:camera.position.toArray(),zoom,far:camera.far,footprint:cameraGroundFootprint(camera,cameraTarget,cameraTarget.y),bounds:meta?.visuals?.camera?.bounds,projectedCorners:[[-64,64],[64,64],[-64,-64],[64,-64]].map(([x,z])=>new THREE.Vector3(x,0,z).project(camera).toArray())},units:[...objects.values()].filter(object=>object.userData.entity).slice(0,18).map(object=>({type:object.userData.entity.type,model:object.userData.style?.representation,path:object.userData.style?.sourceModel,source:meta?.units[object.userData.entity.type]?.file,available:assets?.has(meta?.units[object.userData.entity.type]?.file),scale:object.userData.baseScale})),renderer:{calls:renderer.info.render.calls,triangles:renderer.info.render.triangles}};};
const dayBackground=new THREE.Color('#93a9b5'),nightBackground=new THREE.Color('#202b40'),dayFog=new THREE.Color('#93a9b5'),nightFog=new THREE.Color('#293448'),daySun=new THREE.Color('#ffe5c0'),nightSun=new THREE.Color('#9bb7e8');
const scene=new THREE.Scene();scene.background=dayBackground.clone();scene.fog=new THREE.Fog(dayFog,112,245);
const camera=new THREE.PerspectiveCamera(cameraVerticalFov(CLASSIC_CAMERA.fieldOfView),initialViewport.width/initialViewport.height,.1,CLASSIC_CAMERA.farZ/128),cameraProbe=camera.clone();let cameraTarget=new THREE.Vector3(0,0,0),cameraFocus=cameraTarget.clone();camera.position.fromArray(cameraOffset());camera.lookAt(cameraFocus);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(initialViewport.width,initialViewport.height);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const worldMaterials=createWorldMaterials(renderer);
const hemisphere=new THREE.HemisphereLight(0xe3edf0,0x41483a,.8);scene.add(hemisphere);const sun=new THREE.DirectionalLight(daySun,1.15);sun.position.set(-45,105,60);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-72;sun.shadow.camera.right=72;sun.shadow.camera.top=72;sun.shadow.camera.bottom=-72;sun.shadow.camera.near=1;sun.shadow.camera.far=240;sun.shadow.camera.updateProjectionMatrix();sun.shadow.bias=-.0002;sun.shadow.normalBias=.02;scene.add(sun);
const fill=new THREE.DirectionalLight(0xa5c8e2,.15);fill.position.set(45,35,-55);scene.add(fill);
function updateEnvironment(){const remaining=Math.max(0,(state?.environment?.nightUntil||0)-(state?.time||0)),blend=Math.min(1,remaining/2);scene.background.copy(dayBackground).lerp(nightBackground,blend);scene.fog.color.copy(dayFog).lerp(nightFog,blend);sun.color.copy(daySun).lerp(nightSun,blend);sun.intensity=1.15-.88*blend;hemisphere.intensity=.8-.42*blend;fill.intensity=.15+.12*blend;}
const objects=new Map(),unitsById=new Map(),materialCache=new Map(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),groundPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();
const effects=new BattleEffects(scene,{capacity:4096,ground:terrainHeight});
function material(color,roughness=.9){const key=`${color}:${roughness}`;if(!materialCache.has(key))materialCache.set(key,new THREE.MeshStandardMaterial({color,roughness}));return materialCache.get(key);}
function pos(x,y){return sourceToWorld(x,y);}
function meshEntity(unit){const def=meta.units[unit.type]||{};return createUnitModel(unit,{...def,model:def.file,modelScale:def.modelScale??1,selectionScale:def.selectionScale??1});}
function terrainHeight(x,y){return sampleTerrainHeight(terrain,x,y)/128*TERRAIN_RELIEF;}
async function buildTerrain(data){
  terrain=data;
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
  buildCliffs(cliffs);originalDoodads=createOriginalWorld(scene,assets,meta.visuals?.doodads||[],terrainHeight);buildWater(terrain);originalEffects=new OriginalEffects(scene,assets,objects);constrainCamera();
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
function updateObjects(){if(!state)return;unitsById.clear();for(const u of state.units)unitsById.set(u.id,u);const present=new Set(state.units.map(u=>'u'+u.id));for(const [key,obj]of objects)if(key.startsWith('u')&&!present.has(key)){releaseUnitModel(obj);objects.delete(key);}for(const u of state.units){const key='u'+u.id;let obj=objects.get(key);const definition=meta.units[u.type]||{};if(obj&&assets?.has(definition.file)&&obj.userData.style?.representation!=='original-mdx'){releaseUnitModel(obj);objects.delete(key);obj=null;}if(!obj){obj=meshEntity(u);scene.add(obj);objects.set(key,obj);}const [x,z]=pos(u.x,u.y);obj.userData.rig.move=u.moving?Number(u.moveSpeed)||0:0;obj.position.set(x,effects.ground(u.x,u.y),z);obj.rotation.y=u.facing*Math.PI/180;obj.userData.entity=u;obj.userData.selection.visible=u.id===selectedUnit&&u.owner===mySlot;obj.scale.setScalar(obj.userData.baseScale);if(u.dead&&!obj.userData.deathCue)cueUnitAnimation(obj,'death');}
  const itemKeys=new Set(state.items.map(i=>'i'+i.id));for(const [key,obj]of objects)if(key.startsWith('i')&&!itemKeys.has(key)){scene.remove(obj);objects.delete(key);}for(const item of state.items){const key='i'+item.id;let obj=objects.get(key);if(!obj){obj=new THREE.Group();const gem=new THREE.Mesh(new THREE.OctahedronGeometry(.24,0),material('#dbbe72',.35));gem.position.y=.55;gem.castShadow=true;obj.add(gem);const ring=new THREE.Mesh(new THREE.TorusGeometry(.3,.025,5,16),new THREE.MeshBasicMaterial({color:'#ead497',transparent:true,opacity:.6}));ring.rotation.x=Math.PI/2;ring.position.y=.06;obj.add(ring);obj.userData.item=item;scene.add(obj);objects.set(key,obj);}const [x,z]=pos(item.x,item.y);obj.position.set(x,terrainHeight(item.x,item.y),z);obj.userData.item=item;}}
function renderHud(){
  if(!state)return;
  updateEnvironment();
  const self=state.players.find(p=>p.slot===mySlot),maxLives=state.gameModes.mode===2?75:50;
  $('#wave').textContent=state.wave?`第 ${state.wave} / 56 波`:state.dialogs.length?'部署':`首波 ${Math.max(0,30-Math.floor(state.time))} 秒`;
  $('#base').textContent=`${state.lives} / ${maxLives}`;$('#room-label').textContent=roomId;$('#gold').textContent=self?.gold??'—';
  $('#gold-label').textContent=self?.goldDrain?'金币 · 败家已开':'金币';
  const hero=state.units.find(u=>u.owner===mySlot&&['h001','h002','h000','h004','h003','h06C'].includes(u.type));
  if(hero&&followHero){setCameraTarget(cameraTarget,hero.x,hero.y,terrainHeight(hero.x,hero.y));constrainCamera();}
  $('#message').textContent=state.messages.at(-1)?.text||'请选择游戏模式。';
  $('#clock').textContent=`${state.status==='victory'?'守卫成功':state.status==='defeat'?'基地失守':state.wave?`游戏时间 ${Math.floor(state.time/60)}:${String(Math.floor(state.time%60)).padStart(2,'0')}`:'等待开战'}`;
  if(selectedUnit&&!state.units.some(u=>u.id===selectedUnit&&u.owner===mySlot)){
    const previous=unitsById.get(selectedUnit);
    selectedUnit=previous?.building?state.units.find(unit=>unit.owner===mySlot&&unit.building&&!unit.dead&&Math.hypot(unit.x-previous.x,unit.y-previous.y)<1)?.id||null:null;
    targetMode=false;moveMode=false;
  }
  renderBuildList(self);renderDialogs();updateObjects();renderUnitInspector();
  if(previewSourcePoint){const [x,z]=sourceToWorld(previewSourcePoint.x,previewSourcePoint.y);positionBuildPreview(new THREE.Vector3(x,0,z));}
}
function renderBuildList(self){
  const hero=state?.units.find(u=>u.owner===mySlot&&['h001','h002','h000','h004','h003','h06C'].includes(u.type)),list=$('#build-list');
  list.hidden=!buildAreaOpen||!!selectedUnit;
  if(!buildAreaOpen||selectedUnit)return;
  if(!hero){list.innerHTML='<div class="empty-build">选择职业后显示可建建筑</div>';return;}
  const builds=String(meta.units[hero.type]?.builds||'').split(',').filter(Boolean),signature=`${hero.type}:${buildingId}:${builds.join(',')}`;
  if(signature===buildSignature)return;
  buildSignature=signature;
  const scrollTop=list.scrollTop;
  list.innerHTML=builds.map(id=>{const u=meta.units[id]||{},icon=assets?.url(u.icon);return `<button class="tower ${buildingId===id?'active':''}" data-unit="${id}"><span class="tower-icon">${icon?`<img src="${icon}" alt="">`:'⌂'}</span><span><b>${esc(u.name||id)}</b><small>${esc(u.tip||'防御建筑')} · 木材 ${u.lumberCost||0}</small></span><strong>${u.cost||0}</strong></button>`;}).join('');
  list.scrollTop=scrollTop;
  list.querySelectorAll('.tower').forEach(button=>button.onclick=()=>{
    buildingId=button.dataset.unit;selectedUnit=null;targetMode=false;moveMode=false;castingAbility=null;dropBuildPreview();updatePlacementControls();
    $('#context-eyebrow').textContent='BUILD AREA';$('#context-title').textContent='建造建筑';
    $('#hint').textContent=`已选择 ${meta.units[buildingId].name}，点击绿色位置建造`;
    buildSignature='';renderBuildList(self);ensureBuildPreview();if(buildAnchor)positionBuildPreview(buildAnchor);
  });
}
function renderDialogs(){const dialog=state.dialogs.find(d=>d.players.includes(mySlot));const overlay=$('#dialog');if(!dialog){dialogSignature='';overlay.classList.add('hidden');return;}const signature=JSON.stringify(dialog);if(signature===dialogSignature)return;dialogSignature=signature;overlay.classList.remove('hidden');$('#dialog-title').textContent=dialog.title;$('#dialog-options').innerHTML=dialog.buttons.map((b,i)=>`<button class="primary dialog-option" data-id="${b.id}"><span class="option-number">0${i+1}</span><span>${esc(b.text)}</span><b>→</b></button>`).join('');$('#dialog-options').querySelectorAll('button').forEach(b=>b.onclick=()=>act({type:'choose',dialog:dialog.id,button:Number(b.dataset.id)}));}
function renderItems(filter=''){const list=$('#item-list');if(!meta.items||!list)return;const term=filter.trim().toLowerCase(),rows=Object.entries(meta.items).filter(([id,i])=>!term||`${id} ${i.name} ${i.description}`.toLowerCase().includes(term)).sort((a,b)=>(Number(a[1].cost)||0)-(Number(b[1].cost)||0));list.innerHTML=rows.map(([id,item])=>`<div class="item-row"><div class="item-mark">✦</div><div><b>${esc(item.name)}</b><small>${esc(String(item.description).replaceAll('|n',' ').replace(/\|c[\da-fA-F]{8}|\|r/g,''))}</small></div><div class="item-actions"><em>${item.cost||'掉落'}</em><button data-buy="${id}" ${item.sellable?'':'disabled'}>${item.sellable?'购买':'掉落'}</button></div></div>`).join('');list.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{if(!selectedUnit){notify('先选择一名己方单位');return;}act({type:'buy',unit:selectedUnit,item:b.dataset.buy});});}
function renderAbilities(){
  const list=$('#ability-list'),autoList=$('#autocast-list'),unit=state?.units.find(u=>u.id===selectedUnit&&u.owner===mySlot);
  if(!list||!unit||!meta){if(list)list.innerHTML='';if(autoList)autoList.innerHTML='';abilitySignature='';return;}
  const definitions=new Map((meta.units[unit.type]?.abilities||[]).map(a=>[a.id,a]));
  const abilities=unit.abilities.filter(a=>a.level>0&&definitions.get(a.id)?.castable&&!['A01H','A07F'].includes(a.id));
  const autos=unit.abilities.filter(a=>a.level>0&&a.autocastSupported);
  const goldDrain=Boolean(state.players.find(player=>player.slot===mySlot)?.goldDrain);
  const signature=`${unit.id}:${castingAbility}:${goldDrain}:${abilities.map(a=>`${a.id}.${a.level}`).join(',')}:${autos.map(a=>`${a.id}.${a.autocast}`).join(',')}`;
  if(signature!==abilitySignature){
    abilitySignature=signature;
    list.innerHTML=abilities.length?`<div class="ability-title">技能</div>${abilities.map((a,i)=>{const def=definitions.get(a.id);return `<button class="ability-button ${castingAbility===a.id?'active':''} ${a.id==='A098'?'toggle-skill':''} ${a.id==='A098'&&goldDrain?'toggle-active':''}" data-spell="${a.id}" title="${esc(def?.description||def?.name||a.id)}" ${a.id==='A098'?`aria-pressed="${goldDrain}"`:''}><span>${i+1}</span><b>${esc(def?.name||a.id)}</b><small></small></button>`;}).join('')}`:'';
    autoList.innerHTML=autos.map(a=>{const def=definitions.get(a.id);return `<button class="autocast-toggle" type="button" data-autocast="${a.id}" aria-pressed="${a.autocast}"><span>自动施放：${esc(def?.name||a.id)}</span><small>${a.autocast?'已开启':'已关闭'}</small></button>`;}).join('');
    list.querySelectorAll('[data-spell]').forEach(button=>button.onclick=()=>activateAbility(button.dataset.spell));
    autoList.querySelectorAll('[data-autocast]').forEach(button=>button.onclick=()=>{const selected=unitsById.get(selectedUnit),ability=selected?.abilities.find(a=>a.id===button.dataset.autocast);if(selected&&ability)act({type:'autocast',unit:selected.id,ability:ability.id,enabled:!ability.autocast});});
  }
  for(const ability of abilities){
    const button=list.querySelector(`[data-spell="${ability.id}"]`);
    if(button){button.querySelector('small').textContent=ability.id==='A098'?(goldDrain?'已开启 · 每0.5秒扣1金':'已关闭 · 点击切换'):ability.cooldown>0?`${ability.cooldown.toFixed(1)}s`:`Lv ${ability.level}`;button.classList.toggle('toggle-active',ability.id==='A098'&&goldDrain);button.disabled=ability.cooldown>0;}
  }
}
function renderUnitInspector(){
  const unit=state?.units.find(u=>u.id===selectedUnit&&u.owner===mySlot),panel=$('#unit-inspector'),context=$('#context-panel');
  panel.hidden=!unit;context.hidden=!unit&&!buildAreaOpen;
  $('#sell').hidden=!unit?.abilities.some(ability=>ability.id==='A01H');$('#sell').disabled=$('#sell').hidden;
  if(!unit){inspectorSignature='';return;}
  const def=meta.units[unit.type]||{},target=state.units.find(entry=>entry.id===unit.target),signature=`${unit.type}:${unit.id}:${Boolean(unit.building)}:${unit.abilities.map(a=>`${a.id}.${a.level}.${a.autocast}`).join(',')}`;
  $('#context-eyebrow').textContent=unit.building?'BUILDING':'UNIT';$('#context-title').textContent=def.name||unit.type;
  $('#unit-move').hidden=Boolean(unit.building);$('#unit-move').classList.toggle('active',moveMode);$('#unit-move').textContent=moveMode?'点击地面移动 · 再按取消':'移动到指定位置';
  if(signature!==inspectorSignature){inspectorSignature=signature;$('#unit-name').textContent=def.name||unit.type;$('#unit-description').textContent=def.tip||'';$('#unit-build').hidden=!def.builds;}
  $('#unit-type').textContent=unit.building?(unit.construct>0?`建造中 ${unit.construct.toFixed(1)} 秒`:'防御建筑'):(def.weaponType?'战斗单位':'可操作单位');
  $('#unit-health-text').textContent=`${Math.ceil(unit.hp)} / ${Math.ceil(unit.maxHp)}`;$('#unit-health-bar').style.width=`${Math.max(0,Math.min(100,unit.hp/Math.max(1,unit.maxHp)*100))}%`;$('#mana-row').hidden=unit.maxMana<=0;$('#unit-mana-text').textContent=`${Math.ceil(unit.mana)} / ${Math.ceil(unit.maxMana)}`;$('#unit-mana-bar').style.width=`${Math.max(0,Math.min(100,unit.mana/Math.max(1,unit.maxMana)*100))}%`;
  const stats=[['攻击',def.weaponType?`${def.attackMin}-${def.attackMax}`:'—'],['射程',unit.attackRange?Math.round(unit.attackRange):'—'],['护甲',Number(unit.armor??def.armor??0).toFixed(1)]];$('#unit-stats').innerHTML=stats.map(([name,value])=>`<div class="unit-stat">${name}<b>${esc(value)}</b></div>`).join('');
  $('#target-mode').classList.toggle('active',targetMode);$('#target-mode').textContent=targetMode?'点选敌方单位':'指定攻击目标';$('#clear-target').disabled=!unit.target;$('#unit-target').textContent=target?`当前目标：${meta.units[target.type]?.name||target.type}`:targetMode?'请选择一名敌方单位':'当前目标：自动选择';targetUnit=unit.target||null;
}
function setBuildArea(open,point=null){
  buildAreaOpen=Boolean(open);buildAnchor=point?.clone()||null;moveMode=false;
  if(buildAreaOpen){
    selectedUnit=null;targetMode=false;castingAbility=null;targetUnit=null;buildingId=null;dropBuildPreview();
    $('#context-eyebrow').textContent='BUILD AREA';$('#context-title').textContent='建造建筑';
    $('#hint').textContent='选择建筑后，在地面查看可建位置；点击己方建筑查看信息';
  }else{buildingId=null;castingAbility=null;dropBuildPreview();}
  buildSignature='';abilitySignature='';updatePlacementControls();renderBuildList(state?.players.find(player=>player.slot===mySlot));renderUnitInspector();
}
function buildCheck(id,x,y){
  const player=state?.players.find(entry=>entry.slot===mySlot),definition=meta?.units[id],builder=state?.units.find(unit=>unit.owner===mySlot&&!unit.dead&&String(meta.units[unit.type]?.builds||'').split(',').includes(id));
  if(state?.status!=='playing')return{valid:false,reason:'当前阶段不能建造'};
  if(!definition?.isBuilding||!builder)return{valid:false,reason:'当前职业不能建造该建筑'};
  const placement=checkBuildPlacement(terrain,state.units,x,y);if(!placement.valid)return placement;
  for(const needed of definition.requires||[]){const owned=state.units.some(unit=>unit.owner===mySlot&&!unit.dead&&unit.construct<=0&&unit.type===needed);if(!owned&&!player?.tech?.[needed])return{...placement,valid:false,reason:`需要：${meta.units[needed]?.name||needed}`};}
  if((player?.gold||0)<(definition.cost||0)||(player?.lumber||0)<(definition.lumberCost||0))return{...placement,valid:false,reason:'金币或木材不足'};
  if((player?.food||0)+(definition.food||0)>Math.min(65,player?.cap||0))return{...placement,valid:false,reason:'人口不足'};
  return placement;
}
function positionBuildPreview(point){if(!buildingId||!point)return;const [sourceX,sourceY]=worldToSource(point.x,point.z),check=buildCheck(buildingId,sourceX,sourceY);previewSourcePoint={x:check.x??Math.round(sourceX/64)*64,y:check.y??Math.round(sourceY/64)*64,check};const [x,z]=sourceToWorld(previewSourcePoint.x,previewSourcePoint.y);ensureBuildPreview();if(!previewObject)return;previewObject.visible=true;previewObject.position.set(x,terrainHeight(previewSourcePoint.x,previewSourcePoint.y),z);previewObject.rotation.y=270*Math.PI/180;previewObject.traverse(object=>{if(!object.isMesh)return;for(const material of(Array.isArray(object.material)?object.material:[object.material]))material.color?.set(check.valid?'#91d684':'#e16c58');});const status=$('#placement-status');status.textContent=check.valid?'绿色位置可以建造':`不可建造：${check.reason}`;status.classList.toggle('invalid',!check.valid);}
function activateAbility(id){const unit=unitsById.get(selectedUnit),ability=unit?.abilities.find(entry=>entry.id===id),definition=meta.units[unit?.type]?.abilities.find(entry=>entry.id===id);if(!unit||!ability||!definition?.castable)return;if(ability.cooldown>0){notify(`技能冷却中：${ability.cooldown.toFixed(1)} 秒`);return;}moveMode=false;targetMode=false;if(definition.targeting==='unit'||definition.targeting==='point'||definition.targeting==='either'){castingAbility=id;$('#hint').textContent=definition.targeting==='unit'?'选择技能目标':'选择技能施放位置';renderAbilities();return;}act({type:'cast',unit:unit.id,ability:id});}
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
function moveSelectedTo(point){const unit=unitsById.get(selectedUnit);if(!point||!unit||unit.owner!==mySlot||unit.building)return false;const [x,y]=worldToSource(point.x,point.z);act({type:'move',unit:unit.id,x,y});moveMode=false;$('#hint').textContent='已下达移动指令；单击地面打开建造列表';renderUnitInspector();return true;}
function placeAt(point){if(!point)return false;const [sourceX,sourceY]=worldToSource(point.x,point.z);if(buildingId){const check=buildCheck(buildingId,sourceX,sourceY);if(!check.valid){positionBuildPreview(point);notify(check.reason);return false;}act({type:'build',unit:buildingId,x:check.x,y:check.y});return true;}setBuildArea(true,point);return false;}

function updatePlacementControls(){$('#placement-controls').hidden=!buildingId;if(buildingId){$('#placement-status').textContent='移动鼠标查看可建位置';$('#placement-status').classList.remove('invalid');}else{$('#placement-status').textContent='';$('#placement-status').classList.remove('invalid');}}
$('#cancel-build').addEventListener('click',()=>{buildingId=null;dropBuildPreview();updatePlacementControls();buildSignature='';if(state)renderBuildList(state.players.find(p=>p.slot===mySlot));$('#hint').textContent='已取消建筑选择';});

// A tap uses the same selection and targeting rules for touch and mouse.
function battleTap(clientX,clientY){
  setPointerFromClient(clientX,clientY);camera.updateMatrixWorld(true);raycaster.setFromCamera(pointer,camera);
  const picked=raycaster.intersectObjects([...objects.values()].filter(o=>o.userData.entity||o.userData.item),true)[0];
  let object=picked?.object;while(object&&!object.userData.entity&&!object.userData.item)object=object.parent;
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
  if(object?.userData.item){if(selectedUnit)act({type:'pickup',unit:selectedUnit,item:object.userData.item.id});else notify('先选择一名己方单位');return;}
  if(moveMode){moveSelectedTo(groundAt(clientX,clientY));return;}
  if(unit){
    if(unit.owner>=8){if(selectedUnit&&state?.units.some(u=>u.id===selectedUnit&&u.owner===mySlot)){targetUnit=unit.id;targetMode=false;act({type:'target',unit:selectedUnit,target:unit.id});$('#hint').textContent='目标：'+(meta.units[unit.type]?.name||unit.type);renderUnitInspector();}else notify('先选择一名己方单位');return;}
    selectedUnit=unit.id;targetUnit=unit.target||null;targetMode=false;moveMode=false;buildAreaOpen=false;followHero=false;buildingId=null;castingAbility=null;dropBuildPreview();updatePlacementControls();
    $('#hint').textContent=(meta.units[unit.type]?.name||unit.type)+' · HP '+Math.ceil(unit.hp)+' / '+Math.ceil(unit.maxHp);
    buildSignature='';abilitySignature='';renderBuildList(state.players.find(p=>p.slot===mySlot));renderUnitInspector();return;
  }
  if(targetMode){$('#unit-target').textContent='请选择一名敌方单位';return;}
  placeAt(groundAt(clientX,clientY));
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
let mobileUnitSignature='';
function activateItem(unit,item){
  const abilities=String(meta.items[item.type]?.ability||'').split(','),targeted=abilities.some(id=>['AIrd','ANpr','ANsa'].includes(id)),pointTargeted=abilities.some(id=>['AIbl','AIbg','AIbt','Ablp'].includes(id));
  if(targeted||pointTargeted){targetingItem={unit:unit.id,item:item.id,kind:targeted?'unit':'point'};$('#hint').textContent=targeted?'鐐瑰嚮鐩爣鍗曚綅':'鐐瑰嚮鍦板浘浣嶇疆';return;}
  act({type:'item',unit:unit.id,item:item.id,...(targetUnit?{target:targetUnit}:{})});
}
function renderMobileUnitActions(){
  const controls=$('#mobile-unit-actions'),unit=unitsById.get(selectedUnit);
  const owned=unit&&unit.owner===mySlot;
  controls.hidden=!owned||!!buildingId;
  if(!owned){mobileUnitSignature='';return;}
  const signature=`${unit.id}:${unit.items.map(item=>`${item.id}.${item.type}`).join(',')}`;
  if(signature===mobileUnitSignature)return;
  mobileUnitSignature=signature;
  const list=$('#unit-items');
  list.innerHTML=unit.items.map(item=>`<button type="button" data-item="${esc(item.id)}">使用 ${esc(meta.items[item.type]?.name||item.type)}</button>`).join('');
  list.querySelectorAll('[data-item]').forEach(button=>button.onclick=()=>{
    const selected=unitsById.get(selectedUnit),item=selected?.items.find(entry=>String(entry.id)===button.dataset.item);
    if(selected?.owner===mySlot&&item)activateItem(selected,item);
  });
}
$('#unit-build').onclick=()=>setBuildArea(true);
$('#unit-move').onclick=()=>{moveMode=!moveMode;targetMode=false;castingAbility=null;$('#hint').textContent=moveMode?'点击地面下达移动指令；电脑也可右键移动':'已取消移动指令';renderUnitInspector();};
$('#context-close').onclick=()=>{selectedUnit=null;targetMode=false;targetUnit=null;abilitySignature='';setBuildArea(false);renderAbilities();};
$('#target-mode').onclick=()=>{if(!selectedUnit)return;targetMode=!targetMode;moveMode=false;castingAbility=null;$('#hint').textContent=targetMode?'点击敌方单位指定攻击目标':'已退出目标选择';renderUnitInspector();};
$('#clear-target').onclick=()=>{if(!selectedUnit)return;act({type:'target',unit:selectedUnit,target:null});targetUnit=null;$('#unit-target').textContent='当前目标：自动选择';};
setInterval(()=>{renderAbilities();renderMobileUnitActions();},250);
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function act(action){if(socket?.readyState===1)socket.send(JSON.stringify({type:'action',action}));}
function connect(name,room){socket=new WebSocket(`${location.protocol==='https:'?'wss:':'ws:'}//${location.host}`);socket.onopen=()=>socket.send(JSON.stringify({type:'join',name,room}));socket.onmessage=e=>{const m=JSON.parse(e.data);if(m.type==='map'){meta=m.meta;Promise.all([fetch('/map/terrain.json').then(r=>r.json()),fetch('/map/visuals.json').then(r=>r.json()),fetch('/warcraft/manifest.json').then(r=>r.json())]).then(([terrainData,visuals,manifest])=>{meta.visuals=visuals;meta.visuals.terrainTileData=visuals.terrainTileData;assets=configureModels(renderer,manifest);buildTerrain(terrainData);});}else if(m.type==='joined'){mySlot=m.slot;roomId=m.room;$('#lobby').classList.add('hidden');$('.connection').classList.add('on');$('#link-text').textContent='联机正常';}else if(m.type==='state'){state=m.state;renderHud();}else if(m.type==='error')notify(m.message);};socket.onerror=()=>notify('联机连接失败');socket.onclose=()=>{$('#link-text').textContent='连接中断';$('.connection').classList.remove('on');};}
function notify(message){const el=$('#toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1700);}
$('#join-form').addEventListener('submit',e=>{e.preventDefault();connect($('#nickname').value||'边境守卫',$('#room-code').value);});
$('#goods').onclick=()=>{$('#inventory').classList.remove('hidden');renderItems($('#item-search').value);};$('#item-search').oninput=e=>renderItems(e.target.value);$('#inventory-close').onclick=()=>$('#inventory').classList.add('hidden');$('#sell').onclick=()=>{if(selectedUnit)act({type:'cast',unit:selectedUnit,ability:'A01H'});};
$('#zoom-in').onclick=()=>{zoom=Math.max(.65,zoom-.1);};$('#zoom-out').onclick=()=>{zoom=Math.min(1.45,zoom+.1);};$('#center').onclick=()=>{const hero=state?.units.find(u=>u.owner===mySlot&&['h001','h002','h000','h004','h003','h06C'].includes(u.type));if(hero)setCameraTarget(cameraTarget,hero.x,hero.y,terrainHeight(hero.x,hero.y));else cameraTarget.set(0,0,0);zoom=1;constrainCamera();};
canvas.addEventListener('pointerdown',e=>{if(e.pointerType!=='touch')mouseDown={x:e.clientX,y:e.clientY,button:e.button};});
const editingText=e=>!!e.target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"])');
addEventListener('keydown',e=>{
  if(editingText(e)||e.repeat)return;
  if(e.key==='Escape'){
    $('#inventory').classList.add('hidden');targetingItem=null;castingAbility=null;
    if(buildingId){buildingId=null;dropBuildPreview();updatePlacementControls();buildSignature='';if(state)renderBuildList(state.players.find(p=>p.slot===mySlot));}
    else if(targetMode||moveMode){targetMode=false;moveMode=false;renderUnitInspector();}
    else if(buildAreaOpen)setBuildArea(false);
    else if(selectedUnit)$('#context-close').click();
    renderAbilities();return;
  }
  if(e.key==='q'||e.key==='Q'){$('#inventory').classList.toggle('hidden');renderItems();return;}
  if(selectedUnit&&/^[1-6]$/.test(e.key))$('#ability-list').querySelectorAll('[data-spell]')[Number(e.key)-1]?.click();
});
$('#center').addEventListener('click',()=>setTimeout(()=>{followHero=true;zoom=1;},0));
for(const [selector,delta]of [['#zoom-in',-.1],['#zoom-out',.1]])$(selector).addEventListener('click',e=>{e.stopImmediatePropagation();followHero=false;zoom=THREE.MathUtils.clamp(zoom+delta,.55,2.8);constrainCamera();},{capture:true});
let lastFrame=performance.now(),gameClock=0;function frame(){requestAnimationFrame(frame);const now=performance.now(),dt=Math.min(.05,(now-lastFrame)/1000);lastFrame=now;gameClock+=dt;const offset=new THREE.Vector3(...cameraOffset(CLASSIC_CAMERA,zoom)),blend=1-Math.exp(-dt*5);cameraFocus.lerp(cameraTarget,blend);camera.position.lerp(cameraTarget.clone().add(offset),blend);camera.lookAt(cameraFocus);if(state){effects.consume(state.effects,fx=>{if(fx.kind==='camera'){if(fx.player===mySlot||fx.player===null){if(fx.operation==='pan'){setCameraTarget(cameraTarget,fx.x,fx.y,terrainHeight(fx.x,fx.y));followHero=false;setTimeout(()=>followHero=true,Math.max(0,fx.duration||0)*1000);}if(fx.operation==='follow'){const unit=objects.get(`u${fx.sourceId}`);if(unit)setCameraTarget(cameraTarget,unit.userData.entity.x+(fx.offset?.[0]||0),unit.userData.entity.y+(fx.offset?.[1]||0),unit.position.y);followHero=!!fx.inherit;}}return true;}const object=objects.get(`u${fx.sourceId}`);if(object)cueUnitAnimation(object,fx.kind==='projectile'?'attack':fx.kind==='spell'?'spell':fx.kind,fx.animationNames||'');return originalEffects?.handle(fx)||false;});for(const [key,obj]of objects)if(key.startsWith('u'))animateUnit(obj,dt,gameClock,obj.userData.entity?.id===selectedUnit&&obj.userData.entity?.owner===mySlot,camera);effects.update(dt);originalEffects?.update(dt,objects,state.effects);}renderer.render(scene,camera);}frame();addEventListener('resize',()=>{const {width,height}=viewportSize();camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);constrainCamera();});
