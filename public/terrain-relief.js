import { sourceToWorld } from './coordinates.js';
import { CLIFF_STEP } from './terrain-height.js';
import { splitTerrainTriangle } from './terrain-triangles.js';
export { sampleTerrainHeight } from './terrain-height.js';
export { splitTerrainTriangle } from './terrain-triangles.js';

export function createTerrainGeometry(data, uvForCell, relief = 1) {
  const surface = { positions: [], uvs: [], indices: [] };
  const cliffs = data.cliffs.map(() => ({ positions: [], uvs: [], indices: [] }));
  const addPolygon = (polygon, uv) => {
    const base = surface.positions.length / 3;
    for (const point of polygon) {
      surface.positions.push(point.x, point.height / 128 * relief, point.z);
      for (let axis = 0; axis < 2; axis++) surface.uvs.push(
        (1 - point.v) * ((1 - point.u) * uv[0][axis] + point.u * uv[1][axis]) +
        point.v * ((1 - point.u) * uv[2][axis] + point.u * uv[3][axis])
      );
    }
    for (let i = 1; i < polygon.length - 1; i++) surface.indices.push(base, base + i, base + i + 1);
  };
  const addWall = wall => {
    if (!wall || wall.ends.length !== 2) return;
    const type = data.cliffTypes?.[wall.lowIndex];
    if (!Number.isInteger(type) || type < 0 || type >= cliffs.length) return;
    const group = cliffs[type];
    if (!group) return;
    const [a, b] = wall.ends, low = wall.low / 128 * relief, high = wall.high / 128 * relief;
    const base = group.positions.length / 3, length = Math.hypot(b.x - a.x, b.z - a.z);
    group.positions.push(a.x, low, a.z, b.x, low, b.z, a.x, high, a.z, b.x, high, b.z);
    group.uvs.push(0, 0, length, 0, 0, 1, length, 1);
    group.indices.push(base, base + 2, base + 1, base + 1, base + 2, base + 3);
  };

  for (let y = 0; y < data.height - 1; y++) for (let x = 0; x < data.width - 1; x++) {
    const corners = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([dx, dy], i) => {
      const index = (y + dy) * data.width + x + dx;
      const [wx, wz] = sourceToWorld(data.offset[0] + (x + dx) * data.tileSize, data.offset[1] + (y + dy) * data.tileSize);
      return { x: wx, z: wz, height: data.heights[index] || 0, u: dx, v: dy, index };
    });
    const cellHasCliff = Math.max(...corners.map(point => point.height)) - Math.min(...corners.map(point => point.height)) >= CLIFF_STEP;
    for (const triangle of [[corners[0], corners[1], corners[2]], [corners[1], corners[3], corners[2]]]) {
      const { surfaces, wall } = splitTerrainTriangle(triangle);
      surfaces.forEach(polygon => addPolygon(polygon, uvForCell(x, y, cellHasCliff ? polygon[0].height : undefined)));
      addWall(wall);
    }
  }
  return { surface, cliffs };
}
