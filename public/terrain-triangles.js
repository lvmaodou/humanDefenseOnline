import {CLIFF_STEP} from './terrain-height.js';

// Shared by rendering and placement so a foundation cannot cross a surface
// which only looks flat in a coarser pathing grid.
export function splitTerrainTriangle(corners) {
  const low=Math.min(...corners.map(point=>point.height)),high=Math.max(...corners.map(point=>point.height));
  if(high-low<CLIFF_STEP)return{surfaces:[corners],wall:null};
  const middle=(low+high)/2,crossings=[];
  const clip=upper=>{
    const polygon=[];
    for(let i=0;i<corners.length;i++){
      const current=corners[i],next=corners[(i+1)%corners.length],inside=upper?current.height>=middle:current.height<middle,nextInside=upper?next.height>=middle:next.height<middle;
      if(inside)polygon.push({...current,height:upper?high:low});
      if(inside!==nextInside){
        const t=(middle-current.height)/(next.height-current.height),point={x:current.x+(next.x-current.x)*t,z:current.z+(next.z-current.z)*t,u:current.u+(next.u-current.u)*t,v:current.v+(next.v-current.v)*t,height:upper?high:low};
        polygon.push(point);if(upper)crossings.push(point);
      }
    }
    return polygon;
  };
  return{surfaces:[clip(true),clip(false)],wall:{ends:crossings,low,high,lowIndex:corners.find(point=>point.height===low).index}};
}
