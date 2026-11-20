// Unit turnRate is radians per simulation turn in the compatible behavior
// model (20 turns/sec). Keep the conversion explicit, independent of tick dt.
export const TURN_STEP_SECONDS = .05;
export const angleDifference = (from, to) => ((to-from+540)%360+360)%360-180;
export function turnTowards(unit, definition, point, dt, window = Number(definition.propWin) || 0) {
  if(unit.building){unit.turning=false;return dt;}
  const goal=Math.atan2(point.y-unit.y,point.x-unit.x)*180/Math.PI;
  const difference=angleDifference(unit.facing,goal),rate=Math.max(0,Number(definition.turnRate)||0)/TURN_STEP_SECONDS*180/Math.PI;
  if(!rate){unit.turning=Math.abs(difference)>=window;return unit.turning?0:dt;}
  unit.facing=((unit.facing+Math.sign(difference)*Math.min(Math.abs(difference),rate*dt))%360+360)%360;
  unit.turning=Math.abs(angleDifference(unit.facing,goal))>=window;
  return unit.turning?0:dt;
}

export function attackSpeed(unit, time) {
  const buffs=unit.buffs.filter(buff=>buff.until>time);
  const increase=1+(unit.auraAttackSpeed||0)+buffs.filter(buff=>buff.kind==='power').reduce((sum,buff)=>sum+(buff.speed||0),0);
  const slow=buffs.filter(buff=>buff.kind==='attackSlow').reduce((factor,buff)=>factor*(buff.factor??1),1);
  return Math.max(.1,Math.min(5,increase*slow));
}

export function attackTiming(unit, definition, time) {
  const speed=attackSpeed(unit,time);
  return {speed,damagePoint:Math.max(0,Number(definition.dmgpt1)||0)/speed,backswing:Math.max(0,Number(definition.backSw1)||0)/speed,cooldown:Math.max(.05,Number(definition.cool1)||1)/speed};
}
