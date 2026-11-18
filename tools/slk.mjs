export function parseSlk(text) {
  const cells = new Map(), headers = new Map();
  let x = 1, y = 1;
  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith('C;')) continue;
    const fields = line.match(/(?:[^;"\n]|"(?:[^"]|"")*")+/g) || [];
    for (const part of fields.slice(1)) {
      if (part[0] === 'X') x = Number(part.slice(1));
      else if (part[0] === 'Y') y = Number(part.slice(1));
      else if (part[0] === 'K') {
        const raw = part.slice(1), value = raw.startsWith('"') ? raw.slice(1, -1).replaceAll('""', '"') : Number.isFinite(Number(raw)) ? Number(raw) : raw;
        if (y === 1) headers.set(x, value);
        else { if (!cells.has(y)) cells.set(y, {}); cells.get(y)[headers.get(x) || String(x)] = value; }
      }
    }
  }
  return Object.fromEntries([...cells.values()].map(row => [Object.values(row)[0], row]));
}
