import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createTerrainGeometry, rightAngleJunctionCells } from '../public/terrain-relief.js';

const terrain = JSON.parse(await readFile(new URL('../content/original-3.0/terrain.json', import.meta.url), 'utf8'));
const junctions = [[-1792, 1024], [-1792, -1664], [1152, -1664], [1152, 1024]];

test('all four original road junctions render cliff turns as right angles', () => {
  const rightAngleCells = rightAngleJunctionCells(terrain);
  assert.equal(rightAngleCells.size, 16, 'four high-low corner cells are squared at each route junction');

  const { cliffs } = createTerrainGeometry(terrain, () => [[0, 0], [1, 0], [0, 1], [1, 1]], .75, { rightAngleCells });
  for (const [x, y] of junctions) {
    const walls = [];
    for (const cliff of cliffs) for (let index = 0; index < cliff.positions.length; index += 12) {
      const ax = cliff.positions[index] * 128, ay = -cliff.positions[index + 2] * 128;
      const bx = cliff.positions[index + 3] * 128, by = -cliff.positions[index + 5] * 128;
      const midpointX = (ax + bx) / 2, midpointY = (ay + by) / 2;
      if (Math.abs(midpointX - x) <= 768 && Math.abs(midpointY - y) <= 768) walls.push([ax, ay, bx, by]);
    }
    assert.ok(walls.length > 0, `junction ${x},${y} keeps its cliff walls`);
    assert.ok(walls.every(([ax, ay, bx, by]) => Math.abs(ax - bx) < 1e-6 || Math.abs(ay - by) < 1e-6), `junction ${x},${y} contains no diagonal cliff turns`);
  }
});
