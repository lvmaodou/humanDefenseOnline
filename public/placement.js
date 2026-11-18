export function checkBuildPlacement(terrain, units, x, y) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return { valid: false, reason: '无效位置' };
  x = Math.round(x / 64) * 64;y = Math.round(y / 64) * 64;
  const invalid = reason => ({ valid: false, reason, x, y });
  if (!terrain) return invalid('地图数据同步中');
  // All 66 original profession buildings use 4x4SimpleSolid: 4 pathing cells
  // of 32 units, with no player-start radius restriction in the map script.
  const half = 64, path = terrain.pathing, maxX = terrain.offset[0] + (terrain.width - 1) * terrain.tileSize, maxY = terrain.offset[1] + (terrain.height - 1) * terrain.tileSize;
  if (x - half < terrain.offset[0] || y - half < terrain.offset[1] || x + half > maxX || y + half > maxY) return invalid('建筑占地超出地图边界');
  if (path?.flags) for (let sy = y - 48; sy <= y + 48; sy += 32) for (let sx = x - 48; sx <= x + 48; sx += 32) {
    const column = Math.floor((sx - terrain.offset[0]) / path.cell), row = Math.floor((sy - terrain.offset[1]) / path.cell);
    if (column < 0 || row < 0 || column >= path.width || row >= path.height || (path.flags[row * path.width + column] & 4)) return invalid('地形不允许建造');
  }
  if (units.some(unit => unit.building && !unit.dead && !unit.death && !unit.removed && Math.abs(unit.x - x) < half * 2 && Math.abs(unit.y - y) < half * 2)) return invalid('与已有建筑重叠');
  return { valid: true, x, y, reason: '位置可以建造' };
}
