export function buildingRequirement(definition, player, units, definitions, status, { item = false } = {}) {
  if (status !== 'playing') return { valid: false, reason: status === 'defeat' ? '基地已失守，当前战局已结束' : status === 'victory' ? '已获胜，当前战局已结束' : '当前阶段不能建造' };
  for (const needed of definition.requires || []) {
    const owned = units.some(unit => unit.owner === player?.slot && !unit.dead && !unit.death && !unit.removed && (unit.construct || 0) <= 0 && unit.type === needed);
    if (!owned && !player?.tech?.[needed]) return { valid: false, reason: `需要：${definitions[needed]?.name || needed}` };
  }
  if (!item && (player?.gold || 0) < (definition.cost || 0)) return { valid: false, reason: `金币不足（需 ${definition.cost}）` };
  if (!item && (player?.lumber || 0) < (definition.lumberCost || 0)) return { valid: false, reason: `木材不足（需 ${definition.lumberCost}）` };
  if ((player?.food || 0) + (definition.food || 0) > Math.min(65, player?.cap || 0)) return { valid: false, reason: '人口不足' };
  return { valid: true, reason: '可以建造' };
}

export function orderedBuildings(builds, definitions) {
  return String(builds || '').split(',').filter(Boolean).sort((a, b) => (definitions[a]?.cost || 0) - (definitions[b]?.cost || 0));
}
