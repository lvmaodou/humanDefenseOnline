import {buildingFootprint} from './placement.js';
import {pointInPolygon,polygonBounds} from './footprint-geometry.js';

// Match the current base rather than the MDX's attack/death bounds or the
// space reserved for later upgrades. A touching free square stays clickable.
export function pickBattleObject(intersections, ground, candidates = []) {
  const footprint=unit=>buildingFootprint(unit.raw||unit.type,unit.x,unit.y,unit.facing??270,{reserveUpgrades:false});
  const occupied = ground && candidates.find(object => {
    const unit = object.userData.entity;
    return unit?.building && !unit.dead && !unit.removed && unit.selectable!==false && pointInPolygon(footprint(unit),[ground.x,ground.y]);
  });
  for (const intersection of intersections) {
    let object = intersection.object;
    while (object && !object.userData?.entity && !object.userData?.item) object = object.parent;
    if (!object) continue;
    const unit = object.userData.entity;
    if (unit?.dead || unit?.removed || unit?.selectable === false) continue;
    if (unit?.building) {
      if (occupied && occupied !== object) continue;
      if (!ground) continue;
      const x = Math.round(ground.x / 64) * 64, y = Math.round(ground.y / 64) * 64;
      const bounds=polygonBounds(footprint(unit));
      if(x<=bounds.minX-64||x>=bounds.maxX+64||y<=bounds.minY-64||y>=bounds.maxY+64)continue;
    }
    return object;
  }
  return occupied || null;
}
