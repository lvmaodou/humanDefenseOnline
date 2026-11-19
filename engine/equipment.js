import { fourCC, clean } from './runtime.js';
import { checkBuildPlacement } from '../public/placement.js';

export function originalItemUse(data, item) {
  const abilities = String(item?.abilList || '').split(',').map(id => data.abilityData[id]).filter(Boolean);
  const build = abilities.find(ability => ability.code === 'AIbl');
  if (build) return { targeting: 'point', buildUnit: String(build.UnitID1 || '').split(',')[0], range: Number(build.Rng1) || 100, duration: Number(build.Dur1) || 5 };
  if (abilities.some(ability => ['AIrd', 'ANpr', 'ANsa'].includes(ability.code))) return { targeting: 'unit' };
  if (abilities.some(ability => ['Ablp', 'AIbg', 'AIbt'].includes(ability.code))) return { targeting: 'point' };
  const passive = new Set(['AIab', 'AIat', 'AIas', 'AIva', 'AIfb', 'AIcb', 'AIpb', 'Apo2', 'AIsb']);
  return abilities.some(ability => !passive.has(ability.code)) ? { targeting: 'self' } : null;
}

export function originalEquipment(data) {
  return Object.entries(data.arrays.stz).map(([index, id]) => {
    const name = clean(data.arrays.sdistxt[index]), className = name.replace('套装', '');
    const pieces = Object.entries(data.items).filter(([, item]) => String(item.Name).includes(`${className}套装`)).map(([item, definition]) => {
      const base = originalItemUse(data, definition)?.buildUnit;
      return { item, base, unit: data.units[base]?.Upgrade };
    }).filter(piece => piece.base && piece.unit);
    return { id, classId: Number(index) + 1, name, ability: data.arrays.ab[index], pieces };
  });
}

export function installEquipment(V) {
  V.equipment = originalEquipment(V.data);
  const setBases = new Map(V.equipment.flatMap(set => set.pieces.map(piece => [piece.base, { ...piece, set }])));
  V.equipmentState = slot => {
    const units = [...V.units.values()].filter(unit => unit.owner.id === slot && !unit.removed && !unit.death);
    return V.equipment.map(set => {
      const pieces = set.pieces.map(piece => {
        const tower = units.find(unit => unit.raw === piece.unit && unit.constructed);
        return { ...piece, built: Boolean(tower), active: Boolean(tower?.abilities.has(fourCC(set.ability))), placed: units.some(unit => unit.raw === piece.base), unitId: tower?.hid };
      });
      const towers = pieces.map(piece => V.units.get(piece.unitId)).filter(Boolean);
      const distance = V.globals.udg_yxmode === 2 ? 99999 : 1200;
      const inRange = towers.every(a => towers.every(b => Math.hypot(a.x - b.x, a.y - b.y) <= distance));
      return { id: set.id, count: pieces.filter(piece => piece.built).length, active: pieces.every(piece => piece.active), eligible: V.globals.udg_yxmode === 2 || V.globals.udg_playerzz[slot] === set.classId, inRange, distance, pieces };
    });
  };

  V.itemBuildCheck = (unit, item, point) => {
    if (V.status !== 'playing') throw new Error('当前无法建造');
    if (!unit || unit.removed || unit.death || !item || item.carrier !== unit || item.removed || item.charges <= 0) throw new Error('该物品已不在农民物品栏中');
    const use = originalItemUse(V.data, V.data.items[item.raw]), definition = V.data.units[use?.buildUnit];
    if (!definition?.isbldg || !Number.isFinite(point?.x) || !Number.isFinite(point?.y)) throw new Error('无效的建造物品或位置');
    const placement = V.terrain ? checkBuildPlacement(V.terrain, [...V.units.values()], point.x, point.y) : { valid: true, x: point.x, y: point.y };
    if (!placement.valid) throw new Error(placement.reason);
    if (unit.owner.food + (Number(definition.fused) || 0) > Math.min(Number(V.rules.FoodCeiling) || 65, unit.owner.cap)) throw new Error('人口不足');
    return { ...placement, ...use };
  };
  const startItemBuilding = (unit, item, placement) => {
    const built = V.createUnit(unit.owner, fourCC(placement.buildUnit), placement.x, placement.y, unit.facing);
    built.constructed = false;built.constructEnd = V.time + placement.duration;built.fromItem = item.raw;
    unit.pendingItemBuild = null;unit.move = null;
    item.charges--;if (item.charges === 0 && V.data.items[item.raw].perishable) V.removeItem(item);
    V.effect('build', unit, built, { item: built.fromItem, unit: built.raw, duration: placement.duration });
    return true;
  };
  V.useBuildItem = (unit, item, point) => {
    const placement = V.itemBuildCheck(unit, item, point);
    if (Math.hypot(placement.x - unit.x, placement.y - unit.y) <= placement.range) return startItemBuilding(unit, item, placement);
    const dx = placement.x - unit.x, dy = placement.y - unit.y, distance = Math.hypot(dx, dy), stop = placement.range * .75;
    if (!V.setMove(unit, { x: placement.x - dx / distance * stop, y: placement.y - dy / distance * stop }) || Math.hypot(unit.move.x - placement.x, unit.move.y - placement.y) > placement.range) {
      unit.move = null;throw new Error('农民无法到达该建造位置');
    }
    unit.pendingItemBuild = { item: item.hid, x: placement.x, y: placement.y };unit.target = null;unit.manualTarget = null;
    return true;
  };
  V.updateItemBuild = unit => {
    const pending = unit.pendingItemBuild;if (!pending) return;
    const item = V.items.get(pending.item);
    if (!item || item.carrier !== unit || item.removed) { unit.pendingItemBuild = null;return; }
    const range = originalItemUse(V.data, V.data.items[item.raw]).range;
    if (Math.hypot(unit.x - pending.x, unit.y - pending.y) > range) {
      if (!unit.move) { unit.pendingItemBuild = null;V.message('农民未能到达建造位置，装备已保留。', unit.owner); }
      return;
    }
    if (unit.buffs.some(buff => ['stun', 'root'].includes(buff.kind) && buff.until > V.time)) return;
    try { startItemBuilding(unit, item, V.itemBuildCheck(unit, item, pending)); }
    catch (error) { unit.pendingItemBuild = null;unit.move = null;V.message(`${error.message}，装备已保留。`, unit.owner); }
  };

  V.upgradeEquipment = (unit, id) => {
    const piece = setBases.get(unit.raw), definition = V.data.units[id], player = unit.owner;
    if (V.status !== 'playing' || unit.removed || unit.death || !unit.constructed || unit.constructEnd || unit.upgradeEnd || !piece || piece.unit !== id) throw new Error('该建筑当前不能进行套装升级');
    for (const needed of String(definition.Requires || '').split(',').filter(Boolean)) if (!player.tech[needed] && ![...V.units.values()].some(other => other.owner === player && !other.removed && !other.death && other.constructed && other.raw === needed)) throw new Error(`需要：${V.data.units[needed]?.Name || needed}`);
    const gold = Number(definition.goldcost) || 0, lumber = Number(definition.lumbercost) || 0, food = Number(definition.fused) || 0;
    if (player.gold < gold || player.lumber < lumber) throw new Error('金币或木材不足');
    if (player.food - unit.food + food > Math.min(Number(V.rules.FoodCeiling) || 65, player.cap)) throw new Error('人口不足');
    player.gold -= gold;player.lumber -= lumber;player.food += food - unit.food;unit.food = food;
    unit.upgradeTo = id;unit.upgradeEnd = V.time + Math.max(.1, Number(definition.bldtm) || .1);
    V.effect('build', unit, unit, { unit: id });return true;
  };
  V.finishEquipmentUpgrade = unit => {
    const id = unit.upgradeTo, definition = V.data.units[id], health = unit.hp / unit.maxHp;
    unit.raw = id;unit.type = fourCC(id);unit.stats = V.unitStats(unit);unit.maxHp = unit.stats.maxHp * unit.owner.handicap;unit.hp = unit.maxHp * health;
    unit.maxMana = unit.stats.maxMana;unit.mana = Math.min(unit.maxMana, Number(definition.mana0) || 0);
    unit.abilities = new Map(String(definition.abilList || '').split(',').filter(id => id && id !== '_').map(id => [fourCC(id), 1]));
    unit.autoCast = new Set(String(definition.auto || '').split(',').filter(id => unit.abilities.has(fourCC(id))).map(fourCC));
    unit.castCooldown.clear();unit.upgradeTo = null;unit.upgradeEnd = null;unit.cooldown = 0;unit.constructed = true;
    V.fire('EVENT_PLAYER_UNIT_UPGRADE_FINISH', { unit, player: unit.owner });
  };

  const auraCodes = new Set(['AHad', 'AOae', 'AHab', 'AUau']);
  const auraIds = new Set(V.equipment.map(set => fourCC(set.ability)));
  const auraEffects = new Map();
  const swordsmen = new Set([...String(V.data.units.h06C.Builds).split(','), ...V.equipment[5].pieces.map(piece => piece.unit)]);
  for (const id of swordsmen) for (const upgrade of String(V.data.units[id]?.Upgrade || '').split(',').filter(Boolean)) swordsmen.add(upgrade);
  V.updateEquipmentAuras = () => {
    const units = [...V.units.values()].filter(unit => !unit.removed && !unit.death);
    const visible = new Set();
    for (const unit of units) unit.equipmentAuras = new Map();
    for (const source of units) for (const id of source.abilities.keys()) {
      if (!auraIds.has(id)) continue;
      const ability = V.ability(id);if (!auraCodes.has(ability.code)) continue;
      const art = V.data.abilityStrings[ability.alias], key = `${source.hid}:${id}`;
      if (art?.Targetart && art.Targetart !== '_') {
        visible.add(key);
        if (!auraEffects.has(key)) auraEffects.set(key, V.effect('model', source, source, { model: art.Targetart.split(',')[0], attachment: art.Targetattach || 'origin', persistent: true, follow: true }));
      }
      const tags = String(ability.targs1 || '').split(','), enemy = tags.some(tag => ['enemy', 'enemies'].includes(tag));
      for (const target of V.near(source, Number(ability.Area1) || 0, source.owner.team, enemy)) {
        if (ability.code === 'AHab' && swordsmen.has(target.raw)) continue;
        target.equipmentAuras.set(id, ability);
      }
    }
    for (const [key, effect] of auraEffects) if (!visible.has(key)) { effect.destroyed = true;effect.destroyedAt = V.time;auraEffects.delete(key); }
    for (const unit of units) {
      unit.auraArmor = 0;unit.auraAttackSpeed = 0;unit.auraMove = 0;unit.auraMana = 0;
      for (const ability of unit.equipmentAuras.values()) {
        if (ability.code === 'AHad') unit.auraArmor += Number(ability.DataA1) || 0;
        if (ability.code === 'AOae') unit.auraAttackSpeed += Number(ability.DataB1) || 0;
        if (ability.code === 'AUau' || ability.code === 'AOae') unit.auraMove += Number(ability.DataA1) || 0;
        if (ability.code === 'AHab') unit.auraMana += Number(ability.DataA1) || 0;
      }
    }
  };
  const adjust = V.natives.AdjustPlayerStateBJ;
  V.natives.AdjustPlayerStateBJ = (amount, player, state) => {
    const actor = V.ctx.attacker || V.ctx.caster || V.ctx.unit;
    const theft = V.ctx.trigger?.actions.some(action => /^Trig_TZDZ(?:toushu|qiangjie)_Actions$/.test(action));
    if (theft && amount > 0 && state === 'PLAYER_STATE_RESOURCE_GOLD' && actor?.abilities.has(fourCC(V.equipment[2].ability))) amount = Math.floor(amount * 1.5);
    return adjust(amount, player, state);
  };
}
