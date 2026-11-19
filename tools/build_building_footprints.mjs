import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {parseMDX,ModelRenderer} from 'war3-model';
import * as THREE from 'three';
import {modelResource,selectSequence} from '../public/warcraft.js';
import {convexHull,polygonBounds,rectangle} from '../public/footprint-geometry.js';
import {professionRoster} from './audit_professions.mjs';

const pathingTextures=JSON.parse(await readFile(new URL('../content/original-client/pathing-textures.json',import.meta.url),'utf8'));
export function originalPathingSize(path){
  const key=String(path||'').replaceAll('\\','/').toLowerCase(),texture=pathingTextures.textures[key];
  if(texture)return[texture.width*32,texture.height*32];
  const dimensions=key.match(/(\d+)x(\d+)/);
  if(dimensions)return[Number(dimensions[1])*32,Number(dimensions[2])*32];
  if(!key||key==='_')return[128,128];
  throw new Error(`Unknown original pathing texture: ${path}`);
}

// Use the solid, visible ground-level body of the standing form. Global MDX
// extents also contain roofs, attacks, scaffolding and death debris.
export function measureBuildingBase(model,properties='',scale=1) {
  const renderer=new ModelRenderer(model),index=selectSequence(model.Sequences,'stand',properties);
  if(index<0)return [];
  const variantTags=/\b(upgrade|first|second|third|fourth|fifth|alternate|alternateex|swim)\b/g;
  const form=sequence=>[...sequence.Name.toLowerCase().matchAll(variantTags)].map(match=>match[1]).sort().join(',');
  const sequences=model.Sequences.map((sequence,i)=>({sequence,i})).filter(({sequence,i})=>i===index||(/^stand\b/i.test(sequence.Name)&&form(sequence)===form(model.Sequences[index])&&!/\b(work|gold|lumber|channel|spell|victory)\b/i.test(sequence.Name)));
  const points=[],matrix=new THREE.Matrix4(),position=new THREE.Vector3(),sum=new THREE.Vector3();
  const feet=new Set(model.Nodes.filter(node=>/foot|paw|hoof|ankle/i.test(node.Name)).map(node=>node.ObjectId));
  for(const {sequence,i:index}of sequences)for(const fraction of [0,.25,.5,.75,.99]){
    renderer.setSequence(index);renderer.setFrame(sequence.Interval[0]+(sequence.Interval[1]-sequence.Interval[0])*fraction);
    renderer.updateNode(renderer.rendererData.rootNode);
    const posed=[],footHeights=new Map();
    for(const [geosetId,geoset]of model.Geosets.entries()){
      if(renderer.findAlpha(geosetId)<1e-5)continue;
      const solid=model.Materials[geoset.MaterialID]?.Layers.some(layer=>layer.FilterMode<=1&&(typeof layer.Alpha==='number'?layer.Alpha:layer.Alpha?renderer.interp.num(layer.Alpha)??1:1)>1e-5);
      if(!solid)continue;
      const vertices=[];
      for(let i=0;i<geoset.Vertices.length;i+=3){
        position.fromArray(geoset.Vertices,i);sum.set(0,0,0);
        const group=geoset.Groups?.[geoset.VertexGroup?.[i/3]];
        if(group?.length){for(const bone of group)sum.add(position.clone().applyMatrix4(matrix.fromArray(renderer.rendererData.nodes[bone].matrix)));sum.multiplyScalar(1/group.length);}else sum.copy(position);
        const footBones=(group||[]).filter(bone=>feet.has(bone));
        vertices.push({position:sum.clone(),footBones});
        for(const bone of footBones)footHeights.set(bone,Math.min(footHeights.get(bone)??Infinity,sum.z));
      }
      posed.push({geoset,vertices});
    }
    for(const {geoset,vertices}of posed){
      // Some authored feet stand a few model units above z=0. Include each
      // foot's lowest solid surface, so the front paws of a wolf are not lost.
      for(const vertex of vertices){vertex.limit=Math.max(4,...vertex.footBones.map(bone=>footHeights.get(bone)+4));const p=vertex.position;if(p.z<=vertex.limit)points.push([p.x*scale,p.y*scale]);}
      for(let i=0;i<geoset.Faces.length;i+=3){
        const triangle=Array.from(geoset.Faces.slice(i,i+3),vertex=>vertices[vertex]);
        for(let edge=0;edge<3;edge++){
          const first=triangle[edge],second=triangle[(edge+1)%3],a=first.position,b=second.position,da=a.z-first.limit,db=b.z-second.limit;
          if((da<=0)!==(db<=0)){const t=da/(da-db);points.push([(a.x+(b.x-a.x)*t)*scale,(a.y+(b.y-a.y)*t)*scale]);}
        }
      }
    }
  }
  return convexHull(points).map(point=>point.map(value=>Math.round(value*1000)/1000));
}

export async function buildBuildingFootprints(data,manifest){
  const profiles={},models=new Map(),measured=new Map();
  for(const [id,definition]of Object.entries(data.units)){
    if(!definition.isbldg)continue;
    const pathing=originalPathingSize(definition.pathTex);
    let base=[];
    const resource=modelResource(definition.file),asset=manifest.models[resource];
    if(asset){
      if(!models.has(resource)){const bytes=await readFile(new URL(`../public${asset.url}`,import.meta.url));models.set(resource,parseMDX(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)));}
      const key=`${resource}:${definition.Animprops||''}:${definition.modelScale??1}`;
      if(!measured.has(key))measured.set(key,measureBuildingBase(models.get(resource),definition.Animprops||'',Number(definition.modelScale)||1));
      base=measured.get(key);
    }
    profiles[id]={pathing,base};
  }
  // Reserve later forms now, so a successful automatic promotion cannot put
  // a larger base over a cliff or into its neighbour.
  const next=new Map(),link=(from,to)=>{if(from&&to&&profiles[from]&&profiles[to]){if(!next.has(from))next.set(from,new Set());next.get(from).add(to);}};
  for(const [from,to,start,end]of [[1,2,1,24],[2,3,1,48],[3,4,25,72],[4,5,49,72]])for(let index=start;index<=end;index++)link(data.arrays[`level${from}`][index],data.arrays[`level${to}`][index]);
  for(const [id,definition]of Object.entries(data.units))for(const upgrade of String(definition.Upgrade||'').split(','))link(id,upgrade);
  for(const [id,profile]of Object.entries(profiles)){
    const seen=new Set(),points=[],reservedPathing=[...profile.pathing];
    const visit=type=>{if(seen.has(type))return;seen.add(type);points.push(...profiles[type].base);for(let axis=0;axis<2;axis++)reservedPathing[axis]=Math.max(reservedPathing[axis],profiles[type].pathing[axis]);for(const other of next.get(type)||[])visit(other);};visit(id);
    profile.reserved=convexHull(points);
    profile.reservedPathing=reservedPathing;
  }
  return profiles;
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const read=async path=>JSON.parse(await readFile(new URL(path,import.meta.url),'utf8'));
  const [data,manifest]=await Promise.all([read('../content/original-3.0/data.json'),read('../public/warcraft/manifest.json')]);
  const profiles=await buildBuildingFootprints(data,manifest);
  const lines=Object.entries(profiles).map(([id,profile])=>`  ${JSON.stringify(id)}: ${JSON.stringify(profile)}`);
  await writeFile(new URL('../public/building-footprints.js',import.meta.url),`// Generated from original standing MDX forms; run node tools/build_building_footprints.mjs.\nexport const buildingFootprints = {\n${lines.join(',\n')}\n};\n`);
  const describe=id=>{const unit=data.units[id],profile=profiles[id],model=modelResource(unit.file),bounds=profile.base.length?polygonBounds(profile.base):null,placementBounds=polygonBounds(convexHull([...rectangle(0,0,...profile.reservedPathing),...profile.reserved.map(([x,y])=>[y,-x])]));return{id,name:unit.Name,model,modelScale:Number(unit.modelScale)||1,modelAvailable:Boolean(manifest.models[model]),...profile,placementBounds,baseExceedsPathing:Boolean(bounds&&(bounds.minX<-profile.pathing[0]/2||bounds.maxX>profile.pathing[0]/2||bounds.minY<-profile.pathing[1]/2||bounds.maxY>profile.pathing[1]/2)),placementExceeds128:Math.max(...Object.values(placementBounds).map(Math.abs))>64.001};};
  const professions=professionRoster(data).map(row=>({name:row.name,buildings:row.buildings.map(describe)})),buildings=Object.keys(profiles).map(describe);
  const professionBuildings=professions.flatMap(row=>row.buildings);
  const summary={buildings:buildings.length,professionBuildings:professionBuildings.length,measuredBases:buildings.filter(row=>row.base.length).length,baseExceedsPathing:buildings.filter(row=>row.baseExceedsPathing).length,nonstandardPathing:buildings.filter(row=>row.pathing.some(size=>size!==128)).length,professionMeasuredBases:professionBuildings.filter(row=>row.base.length).length,professionBaseExceedsPathing:professionBuildings.filter(row=>row.baseExceedsPathing).length,professionPlacementExceeds128:professionBuildings.filter(row=>row.placementExceeds128).length};
  await writeFile(new URL('../artifacts/building-footprint-audit.json',import.meta.url),JSON.stringify({sourceSha256:data.source.sha256,pathingSource:pathingTextures.source,summary,professions,buildings},null,2));
  console.log(JSON.stringify(summary));
}
