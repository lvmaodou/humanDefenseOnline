import { CLIFF_STEP, sampleTerrainHeight } from './terrain-height.js';
import { splitTerrainTriangle } from './terrain-triangles.js';
import { buildingFootprints } from './building-footprints.js';
import { convexHull, rectangle, polygonBounds, polygonsOverlap, clipPolygon, polygonArea } from './footprint-geometry.js';

const footprintCache=new Map();
export function buildingFootprint(type,x=0,y=0,facing=270,{reserveUpgrades=true}={}) {
  const key=`${type}:${facing}:${reserveUpgrades}`;
  let polygon=footprintCache.get(key);
  if(!polygon){
    const profile=buildingFootprints[type],path=(reserveUpgrades?profile?.reservedPathing:null)||profile?.pathing||[128,128],radians=facing*Math.PI/180,c=Math.cos(radians),s=Math.sin(radians);
    polygon=convexHull([...rectangle(0,0,...path),...((reserveUpgrades?profile?.reserved:profile?.base)||[]).map(([px,py])=>[px*c-py*s,px*s+py*c])]);
    footprintCache.set(key,polygon);if(footprintCache.size>1024)footprintCache.delete(footprintCache.keys().next().value);
  }
  return polygon.map(([px,py])=>[x+px,y+py]);
}

export function originalBuildBlockers(placements) {
  return placements.flatMap(placement => {
    if (placement.life === 0) return [];
    const footprint = String(placement.definition?.pathTex || '').match(/(\d+)x(\d+)(?:Default|SimpleSolid)\.tga$/i);
    if (!footprint) return [];
    const width = Number(footprint[1]) * 32, height = Number(footprint[2]) * 32;
    return [{ x: placement.position[0], y: placement.position[1], halfWidth: width / 2, halfHeight: height / 2 }];
  });
}

export function checkBuildPlacement(terrain, units, x, y, options={}) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return { valid: false, reason: '无效位置' };
  if(options.snap!==false){x = Math.round(x / 64) * 64;y = Math.round(y / 64) * 64;}
  const invalid = reason => ({ valid: false, reason, x, y });
  if (!terrain) return invalid('地图数据同步中');
  const polygon=buildingFootprint(options.type,x,y,options.facing??270),bounds=polygonBounds(polygon),path=terrain.pathing;
  const maxX=terrain.offset[0]+(terrain.width-1)*terrain.tileSize,maxY=terrain.offset[1]+(terrain.height-1)*terrain.tileSize;
  if(bounds.minX<terrain.offset[0]||bounds.minY<terrain.offset[1]||bounds.maxX>maxX||bounds.maxY>maxY)return invalid('建筑占地超出地图边界');
  if(!footprintFitsSurface(terrain,polygon,x,y))return invalid('建筑底座跨越沟壑边缘或地面不平');
  if(path?.flags)for(let row=Math.floor((bounds.minY-terrain.offset[1])/path.cell);row<=Math.floor((bounds.maxY-terrain.offset[1]-1e-5)/path.cell);row++)for(let column=Math.floor((bounds.minX-terrain.offset[0])/path.cell);column<=Math.floor((bounds.maxX-terrain.offset[0]-1e-5)/path.cell);column++){
    const sx=terrain.offset[0]+(column+.5)*path.cell,sy=terrain.offset[1]+(row+.5)*path.cell;
    if(!polygonsOverlap(polygon,rectangle(sx,sy,path.cell)))continue;
    // WPM 0x08 is unbuildable. 0x04 blocks flying, and cannot substitute for it.
    if (column < 0 || row < 0 || column >= path.width || row >= path.height) return invalid('地形不允许建造');
    const flags = path.flags[row * path.width + column];
    if (!(flags & 8)) continue;
    // The source WPM's 202 cliff band extends onto the visible upper grass.
    // Permit that margin only when the entire footprint fits the same rendered
    // upper surface. Explicit no-build/no-fly cells and rock roads stay blocked.
    if (flags !== 202 || !upperCliffGround(terrain, sx, sy, x, y)) return invalid('地形不允许建造');
  }
  if(terrain.buildBlockers?.some(blocker=>polygonsOverlap(polygon,rectangle(blocker.x,blocker.y,blocker.halfWidth*2,blocker.halfHeight*2))))return invalid('树木或装饰物占用此位置');
  if(units.some(unit=>unit.building&&!unit.dead&&!unit.death&&!unit.removed&&(options.exclude===undefined||(unit.id??unit.hid)!==options.exclude)&&polygonsOverlap(polygon,buildingFootprint(unit.raw||unit.type,unit.x,unit.y,unit.facing??270))))return invalid('与已有建筑底座重叠');
  return { valid: true, x, y, reason: '位置可以建造' };
}
function upperCliffGround(terrain, sx, sy, x, y) {
  if (!terrain.heights || !terrain.buildableTiles || !terrain.textures) return false;
  const column = Math.floor((sx - terrain.offset[0]) / terrain.tileSize), row = Math.floor((sy - terrain.offset[1]) / terrain.tileSize);
  const indices = [row * terrain.width + column, row * terrain.width + column + 1, (row + 1) * terrain.width + column, (row + 1) * terrain.width + column + 1];
  const heights = indices.map(index => terrain.heights[index]), high = Math.max(...heights);
  return high - Math.min(...heights) >= CLIFF_STEP && sampleTerrainHeight(terrain, x, y) === high &&
    indices.filter((index, i) => heights[i] === high).every(index => terrain.buildableTiles[terrain.textures[index]]);
}

function footprintFitsSurface(terrain, polygon, x, y) {
  if(!terrain.heights)return true;
  const height=sampleTerrainHeight(terrain,x,y),bounds=polygonBounds(polygon),cell=terrain.tileSize;
  const minX=Math.max(0,Math.floor((bounds.minX-terrain.offset[0])/cell)),maxX=Math.min(terrain.width-2,Math.floor((bounds.maxX-terrain.offset[0]-1e-5)/cell));
  const minY=Math.max(0,Math.floor((bounds.minY-terrain.offset[1])/cell)),maxY=Math.min(terrain.height-2,Math.floor((bounds.maxY-terrain.offset[1]-1e-5)/cell));
  for(let row=minY;row<=maxY;row++)for(let column=minX;column<=maxX;column++){
    const corners=[[0,0],[1,0],[0,1],[1,1]].map(([dx,dy])=>({x:terrain.offset[0]+(column+dx)*cell,z:terrain.offset[1]+(row+dy)*cell,height:terrain.heights[(row+dy)*terrain.width+column+dx]||0,u:dx,v:dy}));
    for(const triangle of [[corners[0],corners[1],corners[2]],[corners[1],corners[3],corners[2]]])for(const surface of splitTerrainTriangle(triangle).surfaces){
      const clipped=clipPolygon(surface.map(point=>[point.x,point.z,point.height]),polygon);
      if(clipped.length>=3&&polygonArea(clipped)>1e-4&&clipped.some(point=>Math.abs(point[2]-height)>.001))return false;
    }
  }
  return true;
}
