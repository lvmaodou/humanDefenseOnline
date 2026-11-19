import { sourceToWorld } from './coordinates.js';
import { CLIFF_STEP } from './terrain-height.js';
export { sampleTerrainHeight } from './terrain-height.js';

// Split each original ground triangle at the middle of a cliff step. Keeping
// both halves flat leaves a continuous edge on which to build the cliff face.
export function splitTerrainTriangle(corners) {
  const low = Math.min(...corners.map(point => point.height));
  const high = Math.max(...corners.map(point => point.height));
  if (high - low < CLIFF_STEP) return { surfaces: [corners], wall: null };

  const middle = (low + high) / 2;
  const crossings = [];
  const clip = upper => {
    const polygon = [];
    for (let i = 0; i < corners.length; i++) {
      const current = corners[i], next = corners[(i + 1) % corners.length];
      const inside = upper ? current.height >= middle : current.height < middle;
      const nextInside = upper ? next.height >= middle : next.height < middle;
      if (inside) polygon.push({ ...current, height: upper ? high : low });
      if (inside !== nextInside) {
        const t = (middle - current.height) / (next.height - current.height);
        const point = {
          x: current.x + (next.x - current.x) * t,
          z: current.z + (next.z - current.z) * t,
          u: current.u + (next.u - current.u) * t,
          v: current.v + (next.v - current.v) * t,
          height: upper ? high : low
        };
        polygon.push(point);
        if (upper) crossings.push(point);
      }
    }
    return polygon;
  };
  const surfaces = [clip(true), clip(false)];
  return { surfaces, wall: { ends: crossings, low, high, lowIndex: corners.find(point => point.height === low).index } };
}

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
