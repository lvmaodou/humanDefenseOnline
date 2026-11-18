import * as T from 'three';

export function createWorldMaterials(renderer){
  const terrain=new T.MeshLambertMaterial({color:0xffffff,side:T.DoubleSide});
  return {terrain,road:terrain,stone:new T.MeshLambertMaterial({color:0x898781}),dispose(){terrain.dispose();this.stone.dispose();}};
}
