export const targetMask = (ability, level = 1) => String(ability?.[`targs${level}`] ?? ability?.targs1 ?? '');

// Movement and weapon target classification are separate object fields. This
// map gives bears, treants, water elementals and infernals flying movement while
// retaining ground targeting, so movetp must not decide whether spells hit them.
export function targetPlane(V, unit) {
  const definition = V.data.units[unit.raw] || {};
  const types = String(definition.targType || '').toLowerCase().split(',');
  if (types.includes('ground')) return 'ground';
  if (types.includes('air')) return 'air';
  return definition.movetp === 'fly' ? 'air' : 'ground';
}

export function matchesTargetMask(V, caster, target, mask, { relation = 'any', magicImmune = false } = {}) {
  if (!target || target.removed || target.death) return false;
  const tags = new Set(String(mask || '').toLowerCase().split(',').filter(tag => tag && tag !== '_'));
  const codes = new Set([...target.abilities.keys()].map(id => V.ability(id).code));
  if (codes.has('Aloc')) return false;
  const invulnerable = codes.has('Avul');
  if (invulnerable && !tags.has('invu') && !tags.has('invulnerable') && !(tags.has('self') && target === caster)) return false;
  if (!magicImmune && (codes.has('Amim') || target.buffs.some(buff => buff.kind === 'magicImmune' && buff.until > V.time))) return false;
  if ((tags.has('ground') || tags.has('air')) && !tags.has(targetPlane(V, target))) return false;
  if (tags.has('nonhero') && V.natives.IsUnitType(target, 'UNIT_TYPE_HERO')) return false;
  if (tags.has('nonsapper') && String(V.data.units[target.raw]?.type || '').toLowerCase().split(',').includes('sapper')) return false;
  const sameTeam = caster.owner.team === target.owner.team;
  const enemy = tags.has('enemy') || tags.has('enemies');
  const friend = tags.has('friend') || tags.has('ally');
  const self = tags.has('self');
  const neutral = tags.has('neutral') && target.owner.id >= 12;
  if (enemy || friend || self || tags.has('neutral')) {
    if (!(enemy && !sameTeam || friend && sameTeam || self && target === caster || neutral)) return false;
  } else if (relation === 'enemy' && sameTeam || relation === 'friend' && !sameTeam) return false;
  if (target.building && !tags.has('structure') && !(self && target === caster)) return false;
  return true;
}
