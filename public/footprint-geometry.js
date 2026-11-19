const cross = (a,b,c) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
export function convexHull(points) {
  const sorted=[...new Map(points.map(point=>[`${point[0].toFixed(5)},${point[1].toFixed(5)}`,point])).values()].sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
  if(sorted.length<3)return sorted;
  const half=list=>{const result=[];for(const point of list){while(result.length>1&&cross(result.at(-2),result.at(-1),point)<=1e-8)result.pop();result.push(point);}return result.slice(0,-1);};
  return [...half(sorted),...half([...sorted].reverse())];
}
export const rectangle = (x,y,width,height=width) => [[x-width/2,y-height/2],[x+width/2,y-height/2],[x+width/2,y+height/2],[x-width/2,y+height/2]];
export function polygonBounds(polygon) {
  return {minX:Math.min(...polygon.map(p=>p[0])),maxX:Math.max(...polygon.map(p=>p[0])),minY:Math.min(...polygon.map(p=>p[1])),maxY:Math.max(...polygon.map(p=>p[1]))};
}
export function pointInPolygon(polygon,point){
  return polygon.length>=3&&polygon.every((a,index)=>cross(a,polygon[(index+1)%polygon.length],point)>1e-6);
}
export function polygonsOverlap(a,b) {
  const first=polygonBounds(a),second=polygonBounds(b);
  if(first.maxX<=second.minX+1e-5||second.maxX<=first.minX+1e-5||first.maxY<=second.minY+1e-5||second.maxY<=first.minY+1e-5)return false;
  for(const polygon of [a,b])for(let i=0;i<polygon.length;i++){
    const p=polygon[i],q=polygon[(i+1)%polygon.length],nx=q[1]-p[1],ny=p[0]-q[0];
    const project=points=>points.map(point=>point[0]*nx+point[1]*ny),one=project(a),two=project(b);
    if(Math.max(...one)<=Math.min(...two)+1e-5||Math.max(...two)<=Math.min(...one)+1e-5)return false;
  }
  return true;
}
// Keep a possible third component (terrain height) when clipping triangles.
export function clipPolygon(subject,clip) {
  let result=subject;
  for(let i=0;i<clip.length&&result.length;i++){
    const a=clip[i],b=clip[(i+1)%clip.length],input=result;result=[];
    for(let j=0;j<input.length;j++){
      const p=input[j],q=input[(j+1)%input.length],dp=cross(a,b,p),dq=cross(a,b,q);
      if(dp>=-1e-8)result.push(p);
      if((dp>=0)!==(dq>=0)){const t=dp/(dp-dq);result.push(p.map((value,axis)=>value+(q[axis]-value)*t));}
    }
  }
  return result;
}
export const polygonArea = polygon => Math.abs(polygon.reduce((sum,p,index)=>{const q=polygon[(index+1)%polygon.length];return sum+p[0]*q[1]-q[0]*p[1];},0))/2;
