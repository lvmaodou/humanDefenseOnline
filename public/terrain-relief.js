import { sourceToWorld } from './coordinates.js';
import { CLIFF_STEP } from './terrain-height.js';
import { splitTerrainTriangle } from './terrain-triangles.js';
export { sampleTerrainHeight } from './terrain-height.js';
export { splitTerrainTriangle } from './terrain-triangles.js';

const ROAD_JUNCTIONS = [[-1792, 1024], [-1792, -1664], [1152, -1664], [1152, 1024]];

export function rightAngleJunctionCells(data) {
  const cells = new Set();
  if (!data?.offset || !data.tileSize || data.width < 2 || data.height < 2) return cells;
  for (const [x, y] of ROAD_JUNCTIONS) {
    const column = Math.round((x - data.offset[0]) / data.tileSize), row = Math.round((y - data.offset[1]) / data.tileSize);
    for (const dy of [-2, 1]) for (const dx of [-2, 1]) {
      const cellX = column + dx, cellY = row + dy;
      if (cellX < 0 || cellY < 0 || cellX >= data.width - 1 || cellY >= data.height - 1) continue;
      const indices = [cellY * data.width + cellX, cellY * data.width + cellX + 1, (cellY + 1) * data.width + cellX, (cellY + 1) * data.width + cellX + 1];
      const heights = indices.map(index => data.heights[index] || 0), low = Math.min(...heights), high = Math.max(...heights);
      if (high - low >= CLIFF_STEP && heights.filter(height => height === low).length === 3) cells.add(cellY * (data.width - 1) + cellX);
    }
  }
  return cells;
}

export function createTerrainGeometry(data, uvForCell, relief = 1, { rightAngleCells = new Set() } = {}) {
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
  const addWallSegment = (a, b, low, high, lowIndex) => {
    const type = data.cliffTypes?.[lowIndex];
    if (!Number.isInteger(type) || type < 0 || type >= cliffs.length) return;
    const group = cliffs[type];
    if (!group) return;
    const lower = low / 128 * relief, upper = high / 128 * relief;
    const base = group.positions.length / 3, length = Math.hypot(b.x - a.x, b.z - a.z);
    group.positions.push(a.x, lower, a.z, b.x, lower, b.z, a.x, upper, a.z, b.x, upper, b.z);
    group.uvs.push(0, 0, length, 0, 0, 1, length, 1);
    group.indices.push(base, base + 2, base + 1, base + 1, base + 2, base + 3);
  };
  const addWall = wall => {
    if (!wall || wall.ends.length !== 2) return;
    addWallSegment(wall.ends[0], wall.ends[1], wall.low, wall.high, wall.lowIndex);
  };
  const addSquareCliffCell = (corners, x, y) => {
    const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, z: (a.z + b.z) / 2, u: (a.u + b.u) / 2, v: (a.v + b.v) / 2 });
    const middle = { x: (corners[0].x + corners[3].x) / 2, z: (corners[0].z + corners[3].z) / 2, u: .5, v: .5 };
    const m01 = midpoint(corners[0], corners[1]), m02 = midpoint(corners[0], corners[2]);
    const m13 = midpoint(corners[1], corners[3]), m23 = midpoint(corners[2], corners[3]);
    const quadrants = [
      [corners[0], m01, middle, m02],
      [m01, corners[1], m13, middle],
      [m02, middle, m23, corners[2]],
      [middle, m13, corners[3], m23]
    ];
    quadrants.forEach((polygon, index) => {
      const height = corners[index].height;
      addPolygon(polygon.map(point => ({ ...point, height })), uvForCell(x, y, height));
    });
    for (const [first, second, a, b] of [[0, 1, m01, middle], [2, 3, middle, m23], [0, 2, m02, middle], [1, 3, m13, middle]]) {
      const firstHeight = corners[first].height, secondHeight = corners[second].height;
      if (firstHeight === secondHeight) continue;
      const lowIndex = firstHeight < secondHeight ? corners[first].index : corners[second].index;
      addWallSegment(a, b, Math.min(firstHeight, secondHeight), Math.max(firstHeight, secondHeight), lowIndex);
    }
  };

  for (let y = 0; y < data.height - 1; y++) for (let x = 0; x < data.width - 1; x++) {
    const corners = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([dx, dy], i) => {
      const index = (y + dy) * data.width + x + dx;
      const [wx, wz] = sourceToWorld(data.offset[0] + (x + dx) * data.tileSize, data.offset[1] + (y + dy) * data.tileSize);
      return { x: wx, z: wz, height: data.heights[index] || 0, u: dx, v: dy, index };
    });
    const cellHasCliff = Math.max(...corners.map(point => point.height)) - Math.min(...corners.map(point => point.height)) >= CLIFF_STEP;
    if (cellHasCliff && rightAngleCells.has(y * (data.width - 1) + x)) {
      addSquareCliffCell(corners, x, y);
      continue;
    }
    for (const triangle of [[corners[0], corners[1], corners[2]], [corners[1], corners[3], corners[2]]]) {
      const { surfaces, wall } = splitTerrainTriangle(triangle);
      surfaces.forEach(polygon => addPolygon(polygon, uvForCell(x, y, cellHasCliff ? polygon[0].height : undefined)));
      addWall(wall);
    }
  }
  return { surface, cliffs };
}
