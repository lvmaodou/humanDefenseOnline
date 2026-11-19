export const CLIFF_STEP = 64;

// Keep placement checks and the rendered cliff surfaces on the same triangles.
export function sampleTerrainHeight(data, x, y) {
  if (!data) return 0;
  const gx = Math.max(0, Math.min(data.width - 1, (x - data.offset[0]) / data.tileSize));
  const gy = Math.max(0, Math.min(data.height - 1, (y - data.offset[1]) / data.tileSize));
  const ix = Math.min(data.width - 2, Math.floor(gx)), iy = Math.min(data.height - 2, Math.floor(gy));
  const fx = gx - ix, fy = gy - iy;
  const at = (sx, sy) => data.heights[sy * data.width + sx] || 0;
  const h00 = at(ix, iy), h10 = at(ix + 1, iy), h01 = at(ix, iy + 1), h11 = at(ix + 1, iy + 1);
  const first = fx + fy <= 1;
  const heights = first ? [h00, h10, h01] : [h10, h11, h01];
  const value = first ? h00 * (1 - fx - fy) + h10 * fx + h01 * fy : h10 * (1 - fy) + h11 * (fx + fy - 1) + h01 * (1 - fx);
  const low = Math.min(...heights), high = Math.max(...heights);
  return high - low < CLIFF_STEP ? value : value >= (low + high) / 2 ? high : low;
}
