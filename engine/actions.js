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
  V.build=(slot,id,x,y)=>{const check=V.canBuild(slot,id,x,y),p=V.players[slot],d=check.definition;p.gold-=Number(d.goldcost||0);p.lumber-=Number(d.lumbercost||0);const u=V.createUnit(p,fourCC(id),check.x,check.y,270);V.startConstruction(u,d.bldtm);V.effect('build',u,u,{unit:id});return u;};
  V.action=(slot,m)=>{
    if(m.type==='choose')return V.choose(slot,m.dialog,m.button);
    if(m.type==='chat'){V.chat(slot,m.text);return true;}
    if(m.type==='build')return V.build(slot,m.unit,Number(m.x),Number(m.y));
    if(m.type==='transfer'){
      const player=V.players[slot],recipient=V.players[m.player],gold=m.gold??0,lumber=m.lumber??0;
      if(V.status!=='playing'||!player?.active||player.connected===false||!Number.isInteger(m.player)||m.player<0||m.player>3||!recipient?.active||recipient.connected===false||recipient===player||recipient.team!==player.team)throw new Error('请选择一名在线队友');
      if(!Number.isSafeInteger(gold)||!Number.isSafeInteger(lumber)||gold<0||lumber<0||gold+lumber<=0)throw new Error('赠送数量必须为非负整数，且至少赠送一项资源');
      if(player.gold<gold||player.lumber<lumber)throw new Error('金币或木材不足');
      if(!Number.isSafeInteger(recipient.gold+gold)||!Number.isSafeInteger(recipient.lumber+lumber))throw new Error('队友资源已达到上限');
      player.gold-=gold;player.lumber-=lumber;recipient.gold+=gold;recipient.lumber+=lumber;
      V.message(`${player.name} 赠送给 ${recipient.name}：${gold} 金币、${lumber} 木材`);return true;
    }
    const unit=V.units.get(m.unit),p=V.players[slot];if(!unit||unit.owner!==p)throw new Error('只能操作自己的单位');
    if(unit.removed||unit.death)throw new Error('该单位当前无法操作');
    if((!unit.constructed||unit.upgradeEnd)&&['cast','autocast','target'].includes(m.type))throw new Error(unit.upgradeEnd?'建筑升级中，完工后可操作':'建筑建造中，完工后可操作');
    if(m.type==='upgrade')return V.upgradeEquipment(unit,m.to);
    if(m.type==='autocast'){const id=fourCC(m.ability);if(!unit.abilities.has(id)||!String(V.data.units[unit.raw]?.auto||'_').split(',').includes(rawId(id)))throw new Error('该单位没有这个自动施法技能');if(m.enabled)unit.autoCast.add(id);else unit.autoCast.delete(id);return true;}
    if(m.type==='move'){if(unit.building)throw new Error('建筑不能移动');if(!V.canMove(unit))throw new Error('该单位不能移动');if(!Number.isFinite(m.x)||!Number.isFinite(m.y))return false;unit.pendingItemBuild=null;unit.manualTarget=null;unit.target=null;unit.manualTargetApproachAt=0;return V.setMove(unit,{x:Math.max(-7800,Math.min(7800,m.x)),y:Math.max(-7800,Math.min(7800,m.y))},851986);}
    if(m.type==='cast'){const id=fourCC(m.ability);if(!unit.abilities.has(id))throw new Error('单位没有该技能');const target=V.units.get(m.target),point=Number.isFinite(m.x)&&Number.isFinite(m.y)?{x:m.x,y:m.y}:null;return V.cast(unit,id,target,point);}
    if(m.type==='target'){if(m.target===null){unit.manualTarget=null;unit.target=null;unit.manualTargetApproachAt=0;return true;}const target=V.units.get(m.target);if(target&&target.owner.team!==p.team){unit.manualTarget=target;unit.target=target;unit.move=null;unit.manualTargetApproachAt=0;}return true;}
    if(m.type==='pickup')return V.pickup(unit,V.items.get(m.item));
    if(m.type==='buy')return V.buy(slot,unit,V.data.items[m.item]);
    if(m.type==='drop'){const item=V.items.get(m.item);if(item?.carrier!==unit||item.removed)throw new Error('该装备不在物品栏中');return V.dropItem(unit,item);}
    if(m.type==='item'){const item=V.items.get(m.item);return V.useItem(unit,item,{x:Number.isFinite(m.x)?m.x:unit.x,y:Number.isFinite(m.y)?m.y:unit.y,targetId:m.target});}
    return false;
  };
}
