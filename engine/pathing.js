const directions=[
  [1,0,10],[0,1,10],[-1,0,10],[0,-1,10],
  [1,1,14],[-1,1,14],[-1,-1,14],[1,-1,14]
];

class MinHeap{
  constructor(){this.nodes=[];this.scores=[];}
  push(node,score){
    let index=this.nodes.length;this.nodes.push(node);this.scores.push(score);
    while(index){const parent=(index-1)>>1;if(this.scores[parent]<=score)break;this.nodes[index]=this.nodes[parent];this.scores[index]=this.scores[parent];index=parent;}
    this.nodes[index]=node;this.scores[index]=score;
  }
  pop(){
    const node=this.nodes[0],score=this.scores.pop(),last=this.nodes.pop();
    if(this.nodes.length){let index=0;while(true){const left=index*2+1,right=left+1;if(left>=this.nodes.length)break;const child=right<this.nodes.length&&this.scores[right]<this.scores[left]?right:left;if(this.scores[child]>=score)break;this.nodes[index]=this.nodes[child];this.scores[index]=this.scores[child];index=child;}this.nodes[index]=last;this.scores[index]=score;}
    return node;
  }
  get length(){return this.nodes.length;}
}

export class PathingGrid{
  constructor(terrain,{cacheLimit=256,blockedMask=2}={}){
    this.grid=terrain.pathing;this.offset=terrain.offset;this.cell=this.grid.cell||32;this.width=this.grid.width;this.height=this.grid.height;this.flags=this.grid.flags;this.cacheLimit=cacheLimit;this.cache=new Map();
    this.walkable=new Uint8Array(this.flags.length);for(let i=0;i<this.flags.length;i++)this.walkable[i]=(this.flags[i]&blockedMask)?0:1;
  }
  index(x,y){return y*this.width+x;}
  cellAt(x,y){return [Math.floor((x-this.offset[0])/this.cell),Math.floor((y-this.offset[1])/this.cell)];}
  center(index){return {x:this.offset[0]+(index%this.width+.5)*this.cell,y:this.offset[1]+(Math.floor(index/this.width)+.5)*this.cell};}
  isWalkable(x,y){const [cx,cy]=this.cellAt(x,y);return cx>=0&&cy>=0&&cx<this.width&&cy<this.height&&this.walkable[this.index(cx,cy)]===1;}
  segmentWalkable(a,b){
    const distance=Math.hypot(b.x-a.x,b.y-a.y),steps=Math.max(1,Math.ceil(distance/(this.cell*.4)));let previous=null;
    for(let i=0;i<=steps;i++){
      const k=i/steps,x=a.x+(b.x-a.x)*k,y=a.y+(b.y-a.y)*k,[cx,cy]=this.cellAt(x,y);
      if(cx<0||cy<0||cx>=this.width||cy>=this.height)return false;
      const index=this.index(cx,cy);if(!this.walkable[index])return false;
      if(previous){const px=previous%this.width,py=Math.floor(previous/this.width),dx=cx-px,dy=cy-py;if(dx&&dy&&(!this.walkable[this.index(cx,py)]||!this.walkable[this.index(px,cy)]))return false;}
      previous=index;
    }
    return true;
  }
  nearestWalkable(x,y,maxRadius=12){
    let [cx,cy]=this.cellAt(x,y);cx=Math.max(0,Math.min(this.width-1,cx));cy=Math.max(0,Math.min(this.height-1,cy));
    const start=this.index(cx,cy);if(this.walkable[start])return start;
    for(let radius=1;radius<=maxRadius;radius++){
      let best=-1,bestDistance=Infinity;
      for(let oy=-radius;oy<=radius;oy++)for(let ox=-radius;ox<=radius;ox++){
        if(Math.max(Math.abs(ox),Math.abs(oy))!==radius)continue;const nx=cx+ox,ny=cy+oy;if(nx<0||ny<0||nx>=this.width||ny>=this.height)continue;
        const index=this.index(nx,ny);if(!this.walkable[index])continue;const distance=ox*ox+oy*oy;if(distance<bestDistance){best=index;bestDistance=distance;}
      }
      if(best>=0)return best;
    }
    return -1;
  }
  findPath(start,destination){
    if(!start||!destination||![start.x,start.y,destination.x,destination.y].every(Number.isFinite))return null;
    const startIndex=this.nearestWalkable(start.x,start.y),goalIndex=this.nearestWalkable(destination.x,destination.y);if(startIndex<0||goalIndex<0)return null;
    const cacheKey=[startIndex,goalIndex,start.x,start.y,destination.x,destination.y].join(':'),cached=this.cache.get(cacheKey);if(cached){this.cache.delete(cacheKey);this.cache.set(cacheKey,cached);return cached.map(point=>({...point}));}
    if(startIndex===goalIndex){const path=this.segmentWalkable(start,destination)?[{x:destination.x,y:destination.y}]:[this.center(goalIndex)];this.remember(cacheKey,path);return path.map(point=>({...point}));}
    const total=this.width*this.height,costs=new Float64Array(total);costs.fill(Infinity);const parents=new Int32Array(total);parents.fill(-1);const closed=new Uint8Array(total),open=new MinHeap();
    const gx=goalIndex%this.width,gy=Math.floor(goalIndex/this.width),heuristic=(x,y)=>{const dx=Math.abs(gx-x),dy=Math.abs(gy-y),diagonal=Math.min(dx,dy);return 10*Math.max(dx,dy)+4*diagonal;};
    const sx=startIndex%this.width,sy=Math.floor(startIndex/this.width);costs[startIndex]=0;open.push(startIndex,heuristic(sx,sy));
    while(open.length){
      const current=open.pop();if(closed[current])continue;closed[current]=1;if(current===goalIndex)break;
      const x=current%this.width,y=Math.floor(current/this.width),base=costs[current];
      for(const [dx,dy,step] of directions){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=this.width||ny>=this.height)continue;const next=this.index(nx,ny);if(closed[next]||!this.walkable[next])continue;if(dx&&dy&&(!this.walkable[this.index(nx,y)]||!this.walkable[this.index(x,ny)]))continue;const candidate=base+step;if(candidate>=costs[next])continue;costs[next]=candidate;parents[next]=current;open.push(next,candidate+heuristic(nx,ny));}
    }
    if(parents[goalIndex]<0)return null;
    const raw=[];for(let index=goalIndex;index!==startIndex;index=parents[index])raw.push(this.center(index));raw.reverse();
    const startWalkable=this.isWalkable(start.x,start.y),startPoint=startWalkable?{x:start.x,y:start.y}:this.center(startIndex);
    let path=startWalkable?[]:[this.center(startIndex)],anchor=startPoint,at=0;
    while(at<raw.length){let furthest=at;for(let candidate=raw.length-1;candidate>at;candidate--)if(this.segmentWalkable(anchor,raw[candidate])){furthest=candidate;break;}path.push(raw[furthest]);anchor=raw[furthest];at=furthest+1;}
    if(this.segmentWalkable(anchor,destination))path.push({x:destination.x,y:destination.y});
    this.remember(cacheKey,path);return path.map(point=>({...point}));
  }
  remember(key,path){this.cache.set(key,path.map(point=>({...point})));if(this.cache.size>this.cacheLimit)this.cache.delete(this.cache.keys().next().value);}
}
