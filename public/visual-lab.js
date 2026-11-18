import * as THREE from 'three';
import {configureModels,createUnitModel,animateUnit,cueUnitAnimation,releaseUnitModel} from './models.js';
const renderer=new THREE.WebGLRenderer({canvas:document.querySelector('canvas'),antialias:true,preserveDrawingBuffer:true});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
const scene=new THREE.Scene();scene.background=new THREE.Color(0x263c2b);const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.01,200);camera.position.set(3,3,5);camera.lookAt(0,.6,0);
scene.add(new THREE.HemisphereLight(0xffffff,0x525252,2));const floor=new THREE.Mesh(new THREE.PlaneGeometry(100,100),new THREE.MeshStandardMaterial({color:0x3e5840,roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.01;scene.add(floor);scene.add(new THREE.GridHelper(20,20,0x60705b,0x405040));
const [manifest,reference]=await Promise.all([fetch('/warcraft/manifest.json').then(r=>r.json()),fetch('/map/visuals.json').then(r=>r.ok?r.json():null)]);
const assets=configureModels(renderer,manifest),menu=document.querySelector('#model');
const defaults=[['units/human/peasant/peasant.mdx','六职业建造者（农民）'],['units/orc/grunt/grunt.mdx','小混混（兽人步兵）'],['units/nightelf/mountaingiant/mountaingiant.mdx','拳击手（山岭巨人）'],['units/creeps/archnathidgreen/archnathidgreen.mdx','第一波：蝎子'],['units/undead/herolich/herolich.mdx','巫妖首领']];
for(const [path,name]of defaults)if(assets.has(path))menu.add(new Option(name,path));
for(const path of Object.keys(manifest.models).sort())if(!defaults.some(d=>d[0]===path))menu.add(new Option(path.split('/').at(-1),path));
let model=null,last=performance.now(),time=0;
async function show(){if(model)releaseUnitModel(model);model=createUnitModel({type:'lab',id:1,owner:0,hp:100,maxHp:100},{file:menu.value,modelScale:1,selectionScale:1});scene.add(model);await model.userData.ready;window.visualLab={assets,model,camera,renderer,scene,reference};}
menu.onchange=show;document.querySelector('#play').onclick=()=>cueUnitAnimation(model,document.querySelector('#animation').value.toLowerCase());await show();
function frame(){requestAnimationFrame(frame);const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;time+=dt;animateUnit(model,dt,time,true,camera);renderer.render(scene,camera);document.querySelector('#status').textContent=`原版 MDX 实时渲染\n${menu.selectedOptions[0]?.textContent}\n${model.userData.warcraft?.resource.model.Sequences[model.userData.warcraft.renderer.getSequence()]?.Name||'载入中'}\n模型 ${assets.stats.loadedModels} · 绘制 ${assets.stats.rendered}\n${assets.stats.failed.map(e=>e.message).join('\n')}`;}frame();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
