import { CLIFF_STEP, sampleTerrainHeight } from './terrain-height.js';

export function originalBuildBlockers(placements) {
  return placements.flatMap(placement => {
    if (placement.life === 0) return [];
    const footprint = String(placement.definition?.pathTex || '').match(/(\d+)x(\d+)(?:Default|SimpleSolid)\.tga$/i);
    if (!footprint) return [];
    const width = Number(footprint[1]) * 32, height = Number(footprint[2]) * 32;
    return [{ x: placement.position[0], y: placement.position[1], halfWidth: width / 2, halfHeight: height / 2 }];
  });
}

export function checkBuildPlacement(terrain, units, x, y) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return { valid: false, reason: '无效位置' };
  x = Math.round(x / 64) * 64;y = Math.round(y / 64) * 64;
  const invalid = reason => ({ valid: false, reason, x, y });
  if (!terrain) return invalid('地图数据同步中');
  // All 66 original profession buildings use 4x4SimpleSolid: 4 pathing cells
  // of 32 units, with no player-start radius restriction in the map script.
  const half = 64, path = terrain.pathing, maxX = terrain.offset[0] + (terrain.width - 1) * terrain.tileSize, maxY = terrain.offset[1] + (terrain.height - 1) * terrain.tileSize;
  if (x - half < terrain.offset[0] || y - half < terrain.offset[1] || x + half > maxX || y + half > maxY) return invalid('建筑占地超出地图边界');
  let levelFootprint;
  if (path?.flags) for (let sy = y - 48; sy <= y + 48; sy += 32) for (let sx = x - 48; sx <= x + 48; sx += 32) {
    const column = Math.floor((sx - terrain.offset[0]) / path.cell), row = Math.floor((sy - terrain.offset[1]) / path.cell);
    // WPM 0x08 is unbuildable. 0x04 blocks flying, and cannot substitute for it.
    if (column < 0 || row < 0 || column >= path.width || row >= path.height) return invalid('地形不允许建造');
    const flags = path.flags[row * path.width + column];
    if (!(flags & 8)) continue;
    // The source WPM's 202 cliff band extends onto the visible upper grass.
    // Permit that margin only when the entire footprint fits the same rendered
    // upper surface. Explicit no-build/no-fly cells and rock roads stay blocked.
    if (flags !== 202 || !upperCliffGround(terrain, sx, sy, x, y)) return invalid('地形不允许建造');
    levelFootprint ??= footprintFitsSurface(terrain, x, y, half);
    if (!levelFootprint) return invalid('建筑占地跨越沟壑边缘');
  }
  if (terrain.buildBlockers?.some(blocker => Math.abs(blocker.x - x) < blocker.halfWidth + half && Math.abs(blocker.y - y) < blocker.halfHeight + half)) return invalid('树木或装饰物占用此位置');
  if (units.some(unit => unit.building && !unit.dead && !unit.death && !unit.removed && Math.abs(unit.x - x) < half * 2 && Math.abs(unit.y - y) < half * 2)) return invalid('与已有建筑重叠');
  return { valid: true, x, y, reason: '位置可以建造' };
}
function upperCliffGround(terrain, sx, sy, x, y) {
  if (!terrain.heights || !terrain.buildableTiles || !terrain.textures) return false;
  const column = Math.floor((sx - terrain.offset[0]) / terrain.tileSize), row = Math.floor((sy - terrain.offset[1]) / terrain.tileSize);
  const indices = [row * terrain.width + column, row * terrain.width + column + 1, (row + 1) * terrain.width + column, (row + 1) * terrain.width + column + 1];
  const heights = indices.map(index => terrain.heights[index]), high = Math.max(...heights);
  return high - Math.min(...heights) >= CLIFF_STEP && sampleTerrainHeight(terrain, x, y) === high &&
    indices.filter((index, i) => heights[i] === high).every(index => terrain.buildableTiles[terrain.textures[index]]);
}

function footprintFitsSurface(terrain, x, y, half) {
  const height = sampleTerrainHeight(terrain, x, y), samples = [-half + .001, -32, 0, 32, half - .001];
  return samples.every(dy => samples.every(dx => Math.abs(sampleTerrainHeight(terrain, x + dx, y + dy) - height) < .001));
}
