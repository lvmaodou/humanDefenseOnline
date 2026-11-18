const CORNER_BITS = [2, 1, 8, 4]; // SW, SE, NW, NE in a top-down image mask.

export function terrainCellLayers(data, x, y, surfaceHeight) {
  const indices = [y * data.width + x, y * data.width + x + 1, (y + 1) * data.width + x, (y + 1) * data.width + x + 1];
  const heights = indices.map(index => data.heights[index] || 0);
  const split = Math.max(...heights) - Math.min(...heights) >= 64;
  const corners = indices.map((index, corner) => ({ index, corner, texture: data.textures[index] }))
    .filter(({ corner }) => !split || surfaceHeight === undefined || heights[corner] === surfaceHeight);
  const textures = [...new Set(corners.map(corner => corner.texture))].sort((a, b) => a - b);
  return textures.map((texture, layer) => {
    const matching = corners.filter(corner => corner.texture === texture);
    return {
      texture,
      mask: layer === 0 ? 15 : matching.reduce((mask, corner) => mask | CORNER_BITS[corner.corner], 0),
      // The upper three W3E bits are cliff variation, not ground UV rotation.
      variation: (data.textureVariations?.[matching[0].index] || 0) & 31
    };
  });
}

export function terrainTileSource(width, variation, mask = 15) {
  const tile = 64;
  if (mask !== 15) return { x: (mask & 3) * tile, y: (mask >> 2) * tile, size: tile };
  // The left 4x4 block holds corner masks; only its first and last squares are
  // opaque. Extended atlases add sixteen opaque variants in the right block.
  if (width >= 512 && variation < 16) return { x: (4 + variation % 4) * tile, y: Math.floor(variation / 4) * tile, size: tile };
  const last = width >= 512 ? variation === 17 : (variation & 1) !== 0;
  return { x: last ? 3 * tile : 0, y: last ? 3 * tile : 0, size: tile };
}

export function createTerrainAtlas(data, images) {
  const entries = new Map(), surfaces = new Map(), cellKey = (x, y, height) => `${x},${y},${height ?? 'ground'}`;
  for (let y = 0; y < data.height - 1; y++) for (let x = 0; x < data.width - 1; x++) {
    const indices = [y * data.width + x, y * data.width + x + 1, (y + 1) * data.width + x, (y + 1) * data.width + x + 1];
    const heights = [undefined, ...new Set(indices.map(index => data.heights[index] || 0))];
    for (const height of heights) {
      const layers = terrainCellLayers(data, x, y, height), key = JSON.stringify(layers);
      if (!entries.has(key)) entries.set(key, { layers, slot: entries.size });
      surfaces.set(cellKey(x, y, height), key);
    }
  }
  const size = 64, gutter = 2, stride = size + gutter * 2, columns = Math.max(1, Math.ceil(Math.sqrt(entries.size)));
  const canvas = document.createElement('canvas');
  canvas.width = columns * stride;canvas.height = Math.ceil(entries.size / columns) * stride;
  const context = canvas.getContext('2d');
  for (const { layers, slot } of entries.values()) {
    const x = slot % columns * stride + gutter, y = Math.floor(slot / columns) * stride + gutter;
    for (const layer of layers) {
      const image = images[layer.texture];
      if (!image) throw new Error(`Missing ground texture ${data.tiles[layer.texture]}`);
      const source = terrainTileSource(image.width, layer.variation, layer.mask);
      context.drawImage(image, source.x, source.y, size, size, x, y, size, size);
    }
    context.drawImage(canvas, x, y, 1, size, x - gutter, y, gutter, size);
    context.drawImage(canvas, x + size - 1, y, 1, size, x + size, y, gutter, size);
    context.drawImage(canvas, x - gutter, y, stride, 1, x - gutter, y - gutter, stride, gutter);
    context.drawImage(canvas, x - gutter, y + size - 1, stride, 1, x - gutter, y + size, stride, gutter);
  }
  return {
    canvas,
    entries: entries.size,
    uvForCell(x, y, height) {
      const { slot } = entries.get(surfaces.get(cellKey(x, y, height)));
      const left = (slot % columns * stride + gutter) / canvas.width, right = left + size / canvas.width;
      const top = 1 - (Math.floor(slot / columns) * stride + gutter) / canvas.height, bottom = top - size / canvas.height;
      return [[left, bottom], [right, bottom], [left, top], [right, top]];
    }
  };
}
