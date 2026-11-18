import * as THREE from 'three';

// Warcraft uses X/Y ground coordinates and Z up; Three uses X/Z and Y up.
export const WORLD_SCALE=1/128;
export const sourceToWorld=(x,y)=>[x/128,-y/128];
export const worldToSource=(x,z)=>[x*128,-z*128];
export function terrainSourceBounds(terrain){
  if(!terrain?.offset||terrain.width<2||terrain.height<2||!terrain.tileSize)return null;
  const [minX,minY]=terrain.offset,maxX=minX+(terrain.width-1)*terrain.tileSize,maxY=minY+(terrain.height-1)*terrain.tileSize;
  return[minX,minY,maxX,maxY,minX,maxY,maxX,minY];
}
export const CLASSIC_CAMERA=Object.freeze({distance:1650,farZ:5000,angleOfAttack:304,fieldOfView:70,rotation:90,roll:0,zOffset:0});
// Warcraft's FOV field is the diagonal angle of its reference 4:3 viewport.
// Preserve the reference vertical angle on widescreen (Hor+).
export function cameraVerticalFov(fieldOfView=70){return 2*Math.atan(Math.tan(fieldOfView*Math.PI/360)*.6)*180/Math.PI;}
export function cameraOffset(config=CLASSIC_CAMERA,zoom=1){
  const elevation=(360-config.angleOfAttack)*Math.PI/180,rotation=config.rotation*Math.PI/180,distance=config.distance/128*zoom;
  return [-Math.cos(rotation)*Math.cos(elevation)*distance,Math.sin(elevation)*distance,Math.sin(rotation)*Math.cos(elevation)*distance];
}
export function setCameraTarget(target,x,y,terrainHeight=0){const [worldX,worldZ]=sourceToWorld(x,y);target.set(worldX,terrainHeight,worldZ);}
export function cameraGroundFootprint(camera,target,planeY=target.y){
  camera.updateMatrixWorld(true);
  const cast=new THREE.Raycaster(),plane=new THREE.Plane(new THREE.Vector3(0,1,0),-planeY),point=new THREE.Vector3(),footprint=[];
  for(const y of [-1,1])for(const x of [-1,1]){
    cast.setFromCamera(new THREE.Vector2(x,y),camera);
    if(!cast.ray.intersectPlane(plane,point))return null;
    footprint.push([point.x-target.x,point.z-target.z]);
  }
  return footprint;
}
export function cameraFootprintFits(footprint,bounds){
  if(!footprint?.length||!bounds?.length)return true;
  const xs=[bounds[0],bounds[2],bounds[4],bounds[6]],ys=[bounds[1],bounds[3],bounds[5],bounds[7]],viewX=footprint.map(point=>point[0]),viewZ=footprint.map(point=>point[1]);
  return Math.max(...viewX)-Math.min(...viewX)<=(Math.max(...xs)-Math.min(...xs))/128&&Math.max(...viewZ)-Math.min(...viewZ)<=(Math.max(...ys)-Math.min(...ys))/128;
}
export function clampCameraTarget(target,footprint,bounds){
  if(!footprint?.length||!bounds?.length)return target;
  const xs=[bounds[0],bounds[2],bounds[4],bounds[6]].map(value=>value/128),ys=[bounds[1],bounds[3],bounds[5],bounds[7]].map(value=>-value/128),viewX=footprint.map(point=>point[0]),viewZ=footprint.map(point=>point[1]);
  const clampAxis=(value,min,max,view)=>{const low=min-Math.min(...view),high=max-Math.max(...view);return low<=high?THREE.MathUtils.clamp(value,low,high):(min+max-Math.min(...view)-Math.max(...view))/2;};
  target.x=clampAxis(target.x,Math.min(...xs),Math.max(...xs),viewX);
  target.z=clampAxis(target.z,Math.min(...ys),Math.max(...ys),viewZ);
  return target;
}
