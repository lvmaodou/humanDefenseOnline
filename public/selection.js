// MDX extents include attack/death animation bounds. Only accept building hits
// whose snapped ground position overlaps its footprint. The half-grid margin
// keeps its body clickable while a free, touching placement stays available.
export function pickBattleObject(intersections, ground, candidates = []) {
  const occupied = ground && candidates.find(object => {
    const unit = object.userData.entity;
    return unit?.building && !unit.dead && !unit.removed && Math.abs(unit.x - ground.x) < 64 && Math.abs(unit.y - ground.y) < 64;
  });
  for (const intersection of intersections) {
    let object = intersection.object;
    while (object && !object.userData?.entity && !object.userData?.item) object = object.parent;
    if (!object) continue;
    const unit = object.userData.entity;
    if (unit?.dead || unit?.removed) continue;
    if (unit?.building) {
      if (occupied && occupied !== object) continue;
      if (!ground) continue;
      const x = Math.round(ground.x / 64) * 64, y = Math.round(ground.y / 64) * 64;
      if (Math.abs(unit.x - x) >= 128 || Math.abs(unit.y - y) >= 128) continue;
    }
    return object;
  }
  return occupied || null;
}
