import * as T from 'three';

// Procedural fallback for resources absent from the imported client archive.
const materials=new Map(),geometries=new Map();
const C={iron:0x697582,edge:0xc1cfda,leather:0x473424,skin:0xcf9f75,bone:0xe0d5ad,gold:0xc79845,wood:0x554332,stone:0x646b68};
export const CLASS_STYLES={
  h001:{name:'野蛮人',family:'warrior',color:0xae523b,weapon:'axe'},
  h002:{name:'猎人',family:'ranger',color:0x9a7740,weapon:'crossbow'},
  h000:{name:'盗贼',family:'rogue',color:0x795399,weapon:'daggers'},
  h004:{name:'术士',family:'mage',color:0x9852ab,weapon:'staff'},
  h003:{name:'游侠',family:'ranger',color:0x438477,weapon:'bow'},
  h06C:{name:'魔剑士',family:'knight',color:0x497faa,weapon:'runesword'},
};
function mat(color,glow=0){const key=`${color}:${glow}`;if(!materials.has(key))materials.set(key,new T.MeshStandardMaterial({color,roughness:.78,metalness:glow?0:.18,emissive:glow?color:0,emissiveIntensity:glow,flatShading:true}));return materials.get(key);}
function geo(kind){if(!geometries.has(kind)){const values={box:()=>new T.BoxGeometry(1,1,1),ball:()=>new T.IcosahedronGeometry(.5,1),cone:()=>new T.ConeGeometry(.5,1,6),cylinder:()=>new T.CylinderGeometry(.5,.5,1,8),sphere:()=>new T.SphereGeometry(.5,10,7),crystal:()=>new T.OctahedronGeometry(.5),ring:()=>new T.TorusGeometry(.5,.045,4,20)};geometries.set(kind,values[kind]());}return geometries.get(kind);}
function mesh(parent,kind,color,p=[0,0,0],s=[1,1,1],r=[0,0,0],glow=0){const m=new T.Mesh(geo(kind),mat(color,glow));m.position.fromArray(p);m.scale.fromArray(s);m.rotation.set(...r);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function joint(parent,name,p){const group=new T.Group();group.name=name;group.position.fromArray(p);parent.add(group);return group;}
function rod(parent,a,b,r,color){const x=new T.Vector3(...a),y=new T.Vector3(...b),delta=y.clone().sub(x);const m=mesh(parent,'cylinder',color,x.add(y).multiplyScalar(.5).toArray(),[r*2,delta.length(),r*2]);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());return m;}
function curve(parent,points,color,width=.025){for(let i=1;i<points.length;i++)rod(parent,points[i-1],points[i],width,color);}
function blade(parent,style,color){const grip=mesh(parent,'cylinder',C.leather,[0,-.08,0],[.085,.27,.085]);mesh(parent,'box',C.gold,[0,.07,0],[.34,.06,.10]);mesh(parent,'box',color,[0,.45,0],[.12,.70,.055]);mesh(parent,'cone',color,[0,.87,0],[.12,.17,.055]);if(style==='runesword'){for(let i=0;i<4;i++)mesh(parent,'box',0x71d9ff,[0,.23+i*.15,-.034],[.06,.035,.014],[0,0,.5],1.3);}return grip;}
function weapon(parent,type,color){const g=joint(parent,'weapon',[0,-.38,0]);
  if(type==='axe'){mesh(g,'cylinder',C.wood,[0,.27,0],[.075,1.0,.075]);mesh(g,'box',C.iron,[0,.62,0],[.56,.29,.10]);for(const sign of [-1,1])mesh(g,'cone',C.edge,[sign*.30,.62,0],[.30,.29,.11],[0,0,-sign*Math.PI/2]);}
  else if(type==='staff'){mesh(g,'cylinder',C.wood,[0,.28,0],[.07,1.25,.07]);mesh(g,'ring',C.gold,[0,1,0],[.46,.46,.46]);mesh(g,'crystal',color,[0,1,0],[.25,.40,.25],[0,0,.2],1.4);}
  else if(type==='bow'||type==='crossbow'){curve(g,[[-.05,-.40,0],[.16,-.27,0],[.25,0,0],[.16,.27,0],[-.05,.40,0]],C.wood,.035);rod(g,[-.05,-.40,0],[-.05,.40,0],.009,C.bone);rod(g,[.05,0,-.12],[.05,0,.51],.012,C.wood);mesh(g,'cone',C.edge,[.05,0,.57],[.07,.17,.07],[Math.PI/2,0,0]);if(type==='crossbow')mesh(g,'box',C.wood,[0,-.02,.10],[.11,.12,.48]);}
  else if(type==='hammer'){mesh(g,'cylinder',C.wood,[0,.18,0],[.07,.65,.07]);mesh(g,'box',C.iron,[0,.50,0],[.46,.25,.25]);}
  else if(type==='spear'){mesh(g,'cylinder',C.wood,[0,.35,0],[.055,1.5,.055]);mesh(g,'cone',C.edge,[0,1.2,0],[.13,.34,.08]);}
  else blade(g,type,type==='runesword'?0xa4d1e4:C.edge);
  return g;
}
export function describeModel(def={},id=''){
  if(CLASS_STYLES[id])return {...CLASS_STYLES[id],hero:true,size:1.28};
  const f=String(def.model||def.file||'').toLowerCase(),name=String(def.name||def.Name||'');
  let family='warrior',weaponType='sword';
  if(/archnathid|spider|cryptfiend|nerubian|cryptlord|spidercrab/.test(f))family='arachnid';
  else if(/lobstrokk/.test(f))family='crustacean';
  else if(/hydra/.test(f))family='hydra';
  else if(/dragon|gargoyle|harpy|phoenix/.test(f))family='dragon';
  else if(/centaur|magnataur/.test(f))family='centaur';
  else if(/rider|huntress|farseer|thrall|priestess|deathknight|banditlord|garithos/.test(f))family='mounted';
  else if(/meatwagon|cannon|ballista|demolisher/.test(f))family='siege';
  else if(/golem|mountaingiant|infernal/.test(f))family='golem';
  else if(/elemental|voidwalker|ghost|vengeance|banshee|revenant|flamelord/.test(f))family='elemental';
  else if(/wolf|bear|furbolg|ow[l]?bear|koto|lizard|felstalker/.test(f))family='beast';
  else if(/tower|guardian|hornof/.test(f))family='tower';
  else if(/archer|ranger|headhunter|runner|shandris|sylvanus/.test(f)){family='ranger';weaponType=/headhunter/.test(f)?'spear':'bow';}
  else if(/mage|warlock|priest|sorceress|acolyte|necromancer|lich|medivh|kelthuzad|furion|siren|seawitch|witchdoctor|spiritwalker/.test(f)){family='mage';weaponType='staff';}
  else if(/warden|assassin|bandit|ghoul|illidan/.test(f)){family='rogue';weaponType='daggers';}
  else if(/grun[t]|tauren|ogre|razor|felga|pitlord|chaos|dreadlord/.test(f)){family='brute';weaponType='axe';}
  else if(/captain|footman|arthas|blade|proudmoore/.test(f)){family='knight';weaponType='sword';}
  const boss=/^[A-Z]/.test(id),hash=[...id].reduce((n,c)=>n*31+c.charCodeAt(0),0)>>>0;
  const colors={arachnid:0x5a8095,crustacean:0xa45e44,hydra:0x4a8255,dragon:0x8b4855,beast:0x8c7457,golem:/infernal/.test(f)?0x528745:0x697a79,mage:0x7b579b,rogue:0x5f6384,ranger:0x57866b,knight:0x527ca4,brute:0x8b5149,mounted:0x666c98,elemental:/water|sea/.test(f)?0x418eae:0x77569d};
  return {family,weapon:weaponType,color:colors[family]||0x916547,boss,size:boss?2.0:Math.max(.8,Math.min(1.7,Number(def.scale||def.modelScale)||1)),variant:hash%4,flying:def.movement==='fly'||def.movetp==='fly',name};
}
function human(root,rig,style){const color=style.color,heavy=['warrior','knight','brute'].includes(style.family),robe=style.family==='mage';
  const body=rig.body=joint(root,'torso',[0,.77,0]);mesh(body,'box',robe?color:heavy?C.iron:color,[0,.23,0],[heavy?.53:.41,.55,.27]);mesh(body,'box',C.leather,[0,-.03,0],[.44,.10,.30]);mesh(body,'box',C.gold,[0,-.03,.163],[.12,.10,.03]);
  if(robe){mesh(body,'cone',color,[0,-.19,0],[.69,.83,.54]);for(const x of [-.15,.15])mesh(body,'box',C.gold,[x,-.2,.23],[.035,.58,.02]);}
  const head=rig.head=joint(body,'head',[0,.62,0]);mesh(head,'ball',style.family==='brute'?0x8f9a68:C.skin,[0,0,0],[.35,.43,.33]);
  if(heavy){mesh(head,'sphere',C.iron,[0,.09,0],[.39,.31,.38]);mesh(head,'box',C.iron,[0,.015,.158],[.10,.30,.065]);}
  else if(['ranger','rogue'].includes(style.family)){mesh(head,'sphere',color,[0,.07,-.03],[.43,.41,.43]);mesh(head,'box',C.skin,[0,-.02,.15],[.27,.20,.05]);if(style.family==='rogue')mesh(head,'box',color,[0,-.07,.19],[.28,.11,.04]);}
  else if(robe){mesh(head,'cone',color,[0,.27,0],[.48,.55,.46]);mesh(head,'cylinder',color,[0,.09,0],[.57,.045,.50]);}
  else mesh(head,'sphere',C.wood,[0,.11,-.03],[.36,.22,.35]);
  for(const x of [-.085,.085])mesh(head,'box',style.boss?0xff6948:0xc9d5c8,[x,.02,.175],[.045,.035,.02],undefined,style.boss?.6:0);
  rig.arms=[];rig.legs=[];
  for(const side of [-1,1]){const arm=joint(body,`arm${side}`,[side*.31,.41,0]);mesh(arm,'box',heavy?C.iron:color,[0,-.17,0],[.19,.34,.23]);const elbow=joint(arm,`elbow${side}`,[0,-.34,0]);mesh(elbow,'box',C.leather,[0,-.13,0],[.16,.28,.18]);mesh(elbow,'ball',C.skin,[0,-.29,0],[.18,.16,.18]);rig.arms.push({joint:arm,elbow,side});
    const leg=joint(body,`leg${side}`,[side*.135,-.08,0]);mesh(leg,'box',heavy?0x414b55:0x343736,[0,-.22,0],[.19,.43,.20]);mesh(leg,'box',C.leather,[0,-.51,.04],[.22,.25,.32]);rig.legs.push({joint:leg,side});}
  rig.weapon=weapon(rig.arms[1].elbow,style.weapon||'sword',color);
  if(style.weapon==='daggers')weapon(rig.arms[0].elbow,'dagger',color);
  if(style.family==='knight'){mesh(rig.arms[0].elbow,'box',color,[-.07,-.17,.02],[.12,.47,.38]);mesh(rig.arms[0].elbow,'box',C.gold,[-.14,-.17,.02],[.025,.36,.045]);}
  if(['ranger','rogue','knight','mage'].includes(style.family)){const cape=mesh(body,'cone',color,[0,.05,-.19],[.54,.77,.12],[.1,0,0]);rig.cape=cape;}
  if(style.boss){for(const side of [-1,1])mesh(head,'cone',C.bone,[side*.23,.24,0],[.12,.43,.12],[0,0,-side*.65]);}
}
function quadruped(root,rig,style){rig.body=joint(root,'body',[0,.65,0]);const b=rig.body;mesh(b,'ball',style.color,[0,0,0],[.76,.65,1.25]);mesh(b,'ball',style.color,[0,.34,.49],[.55,.56,.60]);mesh(b,'box',style.color,[0,.20,.80],[.38,.25,.43]);for(const s of [-1,1]){mesh(b,'cone',style.color,[s*.21,.66,.48],[.18,.28,.18]);mesh(b,'ball',0xe5c065,[s*.19,.37,.75],[.07,.07,.055],undefined,.4);}rig.legs=[];for(const z of [-.42,.42])for(const side of [-1,1]){const leg=joint(b,'leg',[side*.30,-.16,z]);mesh(leg,'box',style.color,[0,-.2,0],[.20,.5,.21]);mesh(leg,'ball',0x3e342b,[0,-.42,.08],[.28,.15,.32]);rig.legs.push({joint:leg,side,z});}const tail=rig.tail=joint(b,'tail',[0,.05,-.55]);mesh(tail,'cone',style.color,[0,0,-.28],[.20,.65,.23],[-Math.PI/2,0,0]);}
function spider(root,rig,style){const b=rig.body=joint(root,'carapace',[0,.44,0]);mesh(b,'ball',style.color,[0,.10,-.15],[.85,.65,1]);mesh(b,'ball',0x373f4b,[0,0,.42],[.52,.37,.43]);rig.legs=[];for(let i=0;i<4;i++)for(const side of [-1,1]){const z=(i-1.5)*.24,leg=joint(b,'leg',[side*.28,-.02,z]);rod(leg,[0,0,0],[side*.40,.10,-.14],.06,style.color);rod(leg,[side*.40,.10,-.14],[side*.62,-.42,.02],.04,style.color);rig.legs.push({joint:leg,side,index:i});}for(const side of [-1,1]){mesh(b,'ball',0x85dfca,[side*.12,.09,.61],[.09,.09,.06],undefined,1);mesh(b,'cone',C.bone,[side*.13,-.13,.63],[.10,.30,.10],[.7,0,side*.3]);}
  if(style.family==='crustacean')for(const s of [-1,1]){rod(b,[s*.25,0,.40],[s*.7,.1,.75],.09,style.color);mesh(b,'cone',style.color,[s*.79,.1,.82],[.35,.55,.23],[Math.PI/2,0,s*.35]);}
  else {const tail=rig.tail=joint(b,'tail',[0,.24,-.47]);curve(tail,[[0,0,0],[0,.45,-.18],[0,.8,.02],[0,.9,.30]],style.color,.07);mesh(tail,'cone',C.bone,[0,.83,.41],[.13,.30,.13],[Math.PI/2,0,0]);}
}
function dragon(root,rig,style){quadruped(root,rig,style);const b=rig.body;rig.wings=[];for(const side of [-1,1]){const wing=joint(b,'wing',[side*.26,.25,-.05]);const shape=new T.Shape();shape.moveTo(0,0);shape.lineTo(side*1.35,.38);shape.lineTo(side*1.13,-.48);shape.lineTo(side*.55,-.25);shape.lineTo(0,-.38);const membrane=new T.Mesh(new T.ShapeGeometry(shape),new T.MeshStandardMaterial({color:style.color,side:T.DoubleSide,roughness:1}));wing.add(membrane);rod(wing,[0,0,0],[side*1.35,.38,0],.04,C.bone);rig.wings.push({joint:wing,side});}for(let i=0;i<5;i++)mesh(b,'cone',C.bone,[0,.37,-.5+i*.19],[.10,.23,.12]);}
function golem(root,rig,style){human(root,rig,{...style,family:'warrior',weapon:'hammer'});rig.weapon.visible=false;root.traverse(o=>{if(o.isMesh&&o.material.emissiveIntensity===0)o.material=mat(style.color);});for(const side of [-1,1])mesh(rig.body,'ball',style.color,[side*.40,.47,0],[.48,.46,.45]);for(let i=0;i<3;i++)mesh(rig.body,'crystal',0x9ce49d,[0,.16+i*.13,.16],[.07,.12,.05],undefined,1.2);rig.body.scale.set(1.3,1.13,1.25);}
function elemental(root,rig,style){rig.body=joint(root,'vortex',[0,.1,0]);rig.rings=[];for(let i=0;i<5;i++){const ring=mesh(rig.body,'ring',style.color,[0,.15+i*.22,0],[.48+i*.12,.48+i*.12,.48+i*.12],[Math.PI/2,0,0],.6);rig.rings.push(ring);}mesh(rig.body,'crystal',style.color,[0,1.2,0],[.48,.68,.48],undefined,.9);for(const s of [-1,1])mesh(rig.body,'ball',0xd0f1ff,[s*.10,1.23,.21],[.065,.06,.04],undefined,1.5);}
function siege(root,rig,style){rig.body=joint(root,'chassis',[0,.40,0]);mesh(rig.body,'box',C.wood,[0,0,0],[.85,.35,1.25]);rig.wheels=[];for(const z of [-.42,.42])for(const side of [-1,1]){const wheel=mesh(rig.body,'cylinder',C.iron,[side*.47,-.08,z],[.50,.12,.50],[0,0,Math.PI/2]);rig.wheels.push(wheel);}rig.turret=joint(rig.body,'turret',[0,.20,.1]);mesh(rig.turret,'cylinder',C.iron,[0,.10,.28],[.23,1.1,.23],[Math.PI/2-.2,0,0]);mesh(rig.turret,'box',style.color,[0,.1,-.1],[.54,.35,.45]);}
function tower(root,rig,style){rig.body=joint(root,'tower',[0,0,0]);mesh(rig.body,'cylinder',C.stone,[0,.13,0],[1.0,.26,1.0]);mesh(rig.body,'cylinder',C.stone,[0,.8,0],[.65,1.2,.65]);mesh(rig.body,'cylinder',style.color,[0,1.5,0],[.90,.28,.90]);for(let i=0;i<6;i++){const a=i*Math.PI/3;mesh(rig.body,'box',C.stone,[Math.sin(a)*.35,1.76,Math.cos(a)*.35],[.2,.3,.2]);}rig.turret=joint(rig.body,'turret',[0,1.85,0]);mesh(rig.turret,'crystal',0x8dc7df,[0,0,0],[.32,.60,.32],undefined,.7);}
export function createUnitModel(unit,def={}){
  const style=describeModel(def,unit.type),root=new T.Group(),rig={phase:(Number(unit.id)||0)*2.399,attack:0,cast:0,move:0,style};root.name=`model:${unit.type}`;root.userData.rig=rig;root.userData.entity=unit;root.userData.definition=def;root.userData.style=style;
  switch(style.family){case 'arachnid':case 'crustacean':spider(root,rig,style);break;case 'dragon':dragon(root,rig,style);break;case 'beast':quadruped(root,rig,style);break;case 'golem':golem(root,rig,style);break;case 'elemental':elemental(root,rig,style);break;case 'siege':siege(root,rig,style);break;case 'tower':tower(root,rig,style);break;case 'mounted':case 'centaur':{quadruped(root,rig,{...style,color:0x655448});const mount=rig.body,legs=rig.legs;const rider=joint(root,'rider',[0,.55,-.05]),riderRig={};human(rider,riderRig,{...style,family:'knight'});rider.scale.setScalar(.8);rig.rider=riderRig;rig.body=mount;rig.legs=legs;break;}case 'hydra':{quadruped(root,rig,style);for(const s of [-1,1]){rod(rig.body,[s*.25,.12,.3],[s*.5,.75,.52],.14,style.color);mesh(rig.body,'ball',style.color,[s*.5,.8,.6],[.34,.33,.52]);}break;}default:human(root,rig,style);}
  if(unit.building&&style.family!=='tower'){const base=mesh(root,'cylinder',C.stone,[0,.055,0],[1.10,.11,1.10]);base.castShadow=false;rig.platform=base;}
  const visualFactor=style.hero?1.7:unit.building?1.45:['dragon','hydra','golem','elemental','siege','tower'].includes(style.family)?1.25:1.4;style.size*=visualFactor;root.scale.setScalar(style.size);root.userData.baseScale=style.size;
  const selection=new T.Mesh(geo('ring'),new T.MeshBasicMaterial({color:unit.owner>=8?0xe1755b:0xaed88c,transparent:true,opacity:.9,depthWrite:false}));selection.rotation.x=Math.PI/2;selection.position.y=.04;selection.scale.setScalar(style.boss?1.35:1.05);selection.visible=false;root.add(selection);root.userData.selection=selection;
  const bar=new T.Group();bar.position.y=style.family==='dragon'?1.85:1.9;const back=new T.Mesh(geo('box'),new T.MeshBasicMaterial({color:0x17201b}));back.scale.set(.72,.055,.026);bar.add(back);const health=new T.Mesh(geo('box'),new T.MeshBasicMaterial({color:unit.owner>=8?0xd96d51:0x8ac77a}));health.scale.set(.68,.028,.03);health.position.z=.02;bar.add(health);root.add(bar);root.userData.healthBar=bar;root.userData.health=health;return root;
}
export function createCentralKeep(){const root=new T.Group(),stone=mat(0x59665b),shadow=mat(0x303b36),gold=mat(0xc8a566),roof=mat(0x526d62),glow=mat(0xffbd67,1.6);
  const base=new T.Mesh(new T.CylinderGeometry(3.9,4.3,.52,12),shadow);base.position.y=.20;root.add(base);
  const wall=new T.Mesh(new T.CylinderGeometry(3.4,3.7,2.3,10,1,true),stone);wall.position.y=1.35;root.add(wall);
  const inner=new T.Mesh(new T.CylinderGeometry(2.35,2.5,2.8,8),shadow);inner.position.y=1.5;root.add(inner);
  for(let i=0;i<8;i++){const a=i*Math.PI/4,x=Math.sin(a)*3.6,z=Math.cos(a)*3.6;const tower=new T.Group();tower.position.set(x,.1,z);root.add(tower);const shaft=new T.Mesh(new T.CylinderGeometry(.62,.78,3.05,6),stone);shaft.position.y=1.53;tower.add(shaft);const cap=new T.Mesh(new T.ConeGeometry(.78,.9,6),roof);cap.position.y=3.5;tower.add(cap);const gem=new T.Mesh(new T.OctahedronGeometry(.18),gold);gem.position.y=4.02;tower.add(gem);}
  const gate=new T.Mesh(new T.BoxGeometry(1.5,1.8,.18),shadow);gate.position.set(0,.93,3.42);root.add(gate);for(let i=-2;i<=2;i++){const stoneBlock=new T.Mesh(new T.BoxGeometry(.54,.34,.16),gold);stoneBlock.position.set(i*.26,1.95,3.42);root.add(stoneBlock);}
  const keep=new T.Mesh(new T.CylinderGeometry(1.3,1.55,3.7,7),stone);keep.position.y=2;root.add(keep);const crown=new T.Mesh(new T.ConeGeometry(1.7,2.4,7),roof);crown.position.y=5;root.add(crown);const beacon=new T.Mesh(new T.OctahedronGeometry(.46),glow);beacon.position.y=6.6;root.add(beacon);const halo=new T.Mesh(geo('ring'),new T.MeshBasicMaterial({color:0xffcf78,transparent:true,opacity:.7,side:T.DoubleSide}));halo.position.y=6.5;halo.scale.setScalar(.85);root.add(halo);
  root.userData.beacon=beacon;root.userData.halo=halo;root.userData.isKeep=true;root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return root;
}
export function animateCentralKeep(root,time){if(root?.userData.isKeep){root.userData.beacon.rotation.y=time*.7;root.userData.beacon.rotation.x=time*.23;root.userData.halo.rotation.y=-time*.5;}}
export function cueUnitAnimation(root,kind){const rig=root?.userData.rig;if(!rig)return;if(kind==='attack'){rig.attack=.42;}else if(kind==='cast'){rig.cast=.7;}else if(kind==='hit')rig.hit=.15;else if(kind==='death')rig.dying=0.001;}
export function animateUnit(root,dt,time,selected=false,camera=null){const rig=root.userData.rig;if(!rig)return;const unit=root.userData.entity;rig.attack=Math.max(0,rig.attack-dt);rig.cast=Math.max(0,rig.cast-dt);rig.hit=Math.max(0,(rig.hit||0)-dt);const move=rig.move||0,phase=time*(move?8:2)+rig.phase;
  if(rig.body){rig.body.rotation.z=Math.sin(phase*.5)*.025*(move?2:1);if(!['tower','siege'].includes(rig.style.family))rig.body.position.y=(rig.body.userData.baseY??=rig.body.position.y)+Math.sin(phase)*(move?.035:.012);}
  for(const leg of rig.legs||[]){leg.joint.rotation.x=Math.sin(phase+(leg.index||0)*1.3+(leg.side>0?Math.PI:0))*.65*move;}
  const arms=rig.arms||rig.rider?.arms||[];for(const arm of arms){arm.joint.rotation.x=Math.sin(phase+arm.side)*.3*move;arm.joint.rotation.z=-arm.side*.08;arm.elbow.rotation.x=-.18;if(rig.attack&&arm.side===1){arm.joint.rotation.x=-Math.sin((1-rig.attack/.42)*Math.PI)*1.8;arm.elbow.rotation.x=-.5;}if(rig.cast){arm.joint.rotation.x=-1.25-Math.sin(time*10)*.08;arm.joint.rotation.z=-arm.side*.32;}}
  if(rig.cape)rig.cape.rotation.x=.1+Math.sin(phase)*.12*(move?1:.3);if(rig.tail)rig.tail.rotation.y=Math.sin(phase)*.22;for(const wing of rig.wings||[])wing.joint.rotation.z=wing.side*(Math.sin(time*7+rig.phase)*.55+.12);for(const wheel of rig.wheels||[])wheel.rotation.x+=move*dt*6;for(const [i,ring]of (rig.rings||[]).entries()){ring.rotation.z+=dt*(i%2?1:-1);ring.position.x=Math.sin(time*2+i)*.05;}
  if(rig.turret&&rig.attack)rig.turret.rotation.x=Math.sin(rig.attack/.42*Math.PI)*.18;
  root.userData.selection.visible=selected;const health=root.userData.health;if(health&&unit){const fraction=Math.max(0,Math.min(1,unit.hp/Math.max(1,unit.maxHp)));health.scale.x=.68*fraction;health.position.x=-.34*(1-fraction);root.userData.healthBar.visible=selected||fraction<.995;if(camera)root.userData.healthBar.quaternion.copy(camera.quaternion);}
  if(rig.dying){rig.dying+=dt;root.rotation.z=Math.min(Math.PI/2,rig.dying*2.6);root.position.y-=dt*.7;return rig.dying<.8;}return true;
}
export function releaseUnitModel(root){root.traverse(o=>{if(o.isMesh&&(o===root.userData.selection||o===root.userData.health||o.parent===root.userData.healthBar))o.material.dispose();});root.removeFromParent();}
export function modelResourceStats(){return {materials:materials.size,geometries:geometries.size};}
