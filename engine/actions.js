import {fourCC} from './runtime.js';

export function installActions(V,terrain){
  V.canBuild=(slot,id,x,y)=>{
    const p=V.players[slot],d=V.data.units[id];if(!p?.active||!d?.isbldg||V.status!=='playing')throw new Error('当前无法建造');
    const builder=[...V.units.values()].find(u=>u.owner===p&&String(V.data.units[u.raw]?.Builds||'').split(',').includes(id));
    if(!builder)throw new Error('该职业不能建造此单位');
    if(!Number.isFinite(x)||!Number.isFinite(y))throw new Error('无效坐标');
    x=Math.round(x/64)*64;y=Math.round(y/64)*64;
    if(x<terrain.offset[0]+128||y<terrain.offset[1]+128||x>terrain.offset[0]+(terrain.width-1)*128-128||y>terrain.offset[1]+(terrain.height-1)*128-128)throw new Error('不能在地图边界建造');
    const starts=[[-3008,2432],[-3008,-2880],[2496,-3008],[2496,2368]];const [sx,sy]=starts[slot];if(Math.hypot(x-sx,y-sy)>2304)throw new Error('只能在你的防区内建造');
    const path=terrain.pathing;
    for(let yy=y-48;yy<=y+48;yy+=32)for(let xx=x-48;xx<=x+48;xx+=32){const tx=Math.floor((xx-terrain.offset[0])/32),ty=Math.floor((yy-terrain.offset[1])/32);if(path.flags[ty*path.width+tx]&4)throw new Error('这块地形不能建造');}
    if([...V.units.values()].some(u=>u.building&&Math.abs(u.x-x)<128&&Math.abs(u.y-y)<128))throw new Error('与已有建筑重叠');
    const owned=[...V.units.values()].filter(u=>u.owner===p&&u.constructed&&!u.removed);
    for(const needed of String(d.Requires||'').split(',').filter(Boolean)){if(!owned.some(u=>u.raw===needed)&&!p.tech[needed])throw new Error(`需要：${V.data.units[needed]?.Name||needed}`);}
    if(p.gold<Number(d.goldcost||0)||p.lumber<Number(d.lumbercost||0))throw new Error('金币或木材不足');
    if(p.food+Number(d.fused||0)>Math.min(Number(V.rules.FoodCeiling)||65,p.cap))throw new Error('人口不足');
    return {x,y,builder,definition:d};
  };
  V.build=(slot,id,x,y,facing=270)=>{const check=V.canBuild(slot,id,x,y),p=V.players[slot],d=check.definition;p.gold-=Number(d.goldcost||0);p.lumber-=Number(d.lumbercost||0);const u=V.createUnit(p,fourCC(id),check.x,check.y,((Number(facing)%360)+360)%360);u.constructed=false;u.constructEnd=V.time+(Number(d.bldtm)||.1);V.effect('build',u,u,{unit:id});return u;};
  V.action=(slot,m)=>{
    if(m.type==='choose')return V.choose(slot,m.dialog,m.button);
    if(m.type==='chat'){V.chat(slot,m.text);return true;}
    if(m.type==='build'){const facing=Number(m.facing);return V.build(slot,m.unit,Number(m.x),Number(m.y),Number.isFinite(facing)?facing:270);}
    const unit=V.units.get(m.unit),p=V.players[slot];if(!unit||unit.owner!==p)throw new Error('只能操作自己的单位');
    if(m.type==='move'){if(unit.building)throw new Error('建筑不能移动');if(!Number.isFinite(m.x)||!Number.isFinite(m.y))return false;unit.move={x:Math.max(-7800,Math.min(7800,m.x)),y:Math.max(-7800,Math.min(7800,m.y))};return true;}
    if(m.type==='cast'){const id=fourCC(m.ability);if(!unit.abilities.has(id))throw new Error('单位没有该技能');const target=V.units.get(m.target),point=Number.isFinite(m.x)&&Number.isFinite(m.y)?{x:m.x,y:m.y}:null;return V.cast(unit,id,target,point);}
    if(m.type==='turn'){if(!Number.isFinite(m.facing))return false;unit.facing=((m.facing%360)+360)%360;return true;}
    if(m.type==='target'){const target=V.units.get(m.target);if(target&&target.owner.team!==p.team)unit.target=target;return true;}
    if(m.type==='pickup')return V.pickup(unit,V.items.get(m.item));
    if(m.type==='buy')return V.buy(slot,unit,V.data.items[m.item]);
    if(m.type==='drop'){const item=V.items.get(m.item);if(item?.carrier===unit)V.dropItem(unit,item);return true;}
    if(m.type==='item'){const item=V.items.get(m.item);return V.useItem(unit,item,{x:Number.isFinite(m.x)?m.x:unit.x,y:Number.isFinite(m.y)?m.y:unit.y});}
    return false;
  };
}
