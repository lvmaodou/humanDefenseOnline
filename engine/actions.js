import {fourCC,rawId} from './runtime.js';
import {checkBuildPlacement} from '../public/placement.js';

export function installActions(V,terrain){
  V.canBuild=(slot,id,x,y)=>{
    const p=V.players[slot],d=V.data.units[id];if(!p?.active||!d?.isbldg||V.status!=='playing')throw new Error('当前无法建造');
    const builder=[...V.units.values()].find(u=>u.owner===p&&!u.removed&&!u.death&&String(V.data.units[u.raw]?.Builds||'').split(',').includes(id));
    if(!builder)throw new Error('该职业不能建造此单位');
    const placement=checkBuildPlacement(terrain,[...V.units.values()],x,y);
    if(!placement.valid)throw new Error(placement.reason);
    x=placement.x;y=placement.y;
    const owned=[...V.units.values()].filter(u=>u.owner===p&&u.constructed&&!u.removed);
    for(const needed of String(d.Requires||'').split(',').filter(Boolean)){if(!owned.some(u=>u.raw===needed)&&!p.tech[needed])throw new Error(`需要：${V.data.units[needed]?.Name||needed}`);}
    if(p.gold<Number(d.goldcost||0)||p.lumber<Number(d.lumbercost||0))throw new Error('金币或木材不足');
    if(p.food+Number(d.fused||0)>Math.min(Number(V.rules.FoodCeiling)||65,p.cap))throw new Error('人口不足');
    return {x,y,builder,definition:d};
  };
  V.build=(slot,id,x,y)=>{const check=V.canBuild(slot,id,x,y),p=V.players[slot],d=check.definition;p.gold-=Number(d.goldcost||0);p.lumber-=Number(d.lumbercost||0);const u=V.createUnit(p,fourCC(id),check.x,check.y,270);u.constructed=false;u.constructEnd=V.time+(Number(d.bldtm)||.1);V.effect('build',u,u,{unit:id});return u;};
  V.action=(slot,m)=>{
    if(m.type==='choose')return V.choose(slot,m.dialog,m.button);
    if(m.type==='chat'){V.chat(slot,m.text);return true;}
    if(m.type==='build')return V.build(slot,m.unit,Number(m.x),Number(m.y));
    const unit=V.units.get(m.unit),p=V.players[slot];if(!unit||unit.owner!==p)throw new Error('只能操作自己的单位');
    if(m.type==='autocast'){const id=fourCC(m.ability);if(!unit.abilities.has(id)||!String(V.data.units[unit.raw]?.auto||'_').split(',').includes(rawId(id)))throw new Error('该单位没有这个自动施法技能');if(m.enabled)unit.autoCast.add(id);else unit.autoCast.delete(id);return true;}
    if(m.type==='move'){if(unit.building)throw new Error('建筑不能移动');if(!Number.isFinite(m.x)||!Number.isFinite(m.y))return false;unit.manualTarget=null;unit.target=null;unit.manualTargetApproachAt=0;return V.setMove(unit,{x:Math.max(-7800,Math.min(7800,m.x)),y:Math.max(-7800,Math.min(7800,m.y))});}
    if(m.type==='cast'){const id=fourCC(m.ability);if(!unit.abilities.has(id))throw new Error('单位没有该技能');const target=V.units.get(m.target),point=Number.isFinite(m.x)&&Number.isFinite(m.y)?{x:m.x,y:m.y}:null;return V.cast(unit,id,target,point);}
    if(m.type==='target'){if(m.target===null){unit.manualTarget=null;unit.target=null;unit.manualTargetApproachAt=0;return true;}const target=V.units.get(m.target);if(target&&target.owner.team!==p.team){unit.manualTarget=target;unit.target=target;unit.move=null;unit.manualTargetApproachAt=0;}return true;}
    if(m.type==='pickup')return V.pickup(unit,V.items.get(m.item));
    if(m.type==='buy')return V.buy(slot,unit,V.data.items[m.item]);
    if(m.type==='drop'){const item=V.items.get(m.item);if(item?.carrier===unit)V.dropItem(unit,item);return true;}
    if(m.type==='item'){const item=V.items.get(m.item);return V.useItem(unit,item,{x:Number.isFinite(m.x)?m.x:unit.x,y:Number.isFinite(m.y)?m.y:unit.y,targetId:m.target});}
    return false;
  };
}
