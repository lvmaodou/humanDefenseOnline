const CLASS_WORKERS = ['h001', 'h002', 'h000', 'h004', 'h003', 'h06C'];
const CLASS_NAMES = ['野蛮人', '猎人', '盗贼', '术士', '游侠', '魔剑士'];
const STARTS = [[-3008, 2432], [-3008, -2880], [2496, -3008], [2496, 2368]];
const ROUTE_CROSSROADS = ['a4', 'b4', 'c4', 'd4'];
const CROSSROAD_FALLBACKS = [[-1792, 1024], [-1792, -1664], [1152, -1664], [1152, 1024]];

const rawIds = value => String(value || '').split(',').filter(id => id && id !== '_');

export class RoomBotDirector {
  state(room, slot) {
    room.botState ||= new Map();
    if (!room.botState.has(slot)) room.botState.set(slot, { nextActionAt: 0 });
    return room.botState.get(slot);
  }

  step(room) {
    const game = room.game;
    if (!game || ['victory', 'defeat'].includes(game.status)) return;
    const wavePending = this.firstWavePending(game);
    if (wavePending) this.fillVacantSeats(room);
    for (let slot = 0; slot < 4; slot++) {
      const player = game.players[slot];
      if (!player?.active || !player.bot) continue;
      this.resolveDialogs(room, slot);
      if (!wavePending || Number(game.globals?.udg_playerzz?.[slot]) > 0) continue;
      this.chooseClass(room, slot);
    }
    if (!wavePending) return;
    for (let slot = 0; slot < 4; slot++) {
      const player = game.players[slot];
      if (!player?.active || !player.bot || !Number(game.globals?.udg_playerzz?.[slot])) continue;
      const state = this.state(room, slot);
      if (game.time < state.nextActionAt) continue;
      state.nextActionAt = game.time + 3;
      const towerCount = this.towers(game, player).length;
      if (towerCount < 4) {
        if (this.build(room, slot, { uniqueOnly: true })) continue;
        this.upgrade(room, slot);
        continue;
      }
      if (!this.upgrade(room, slot)) this.build(room, slot);
    }
  }

  firstWavePending(game) {
    return Number(game.globals?.udg_waves) > 0 || game.timers?.some(timer =>
      !timer.dead && timer.callback === 'fun_FirstRound_Actions'
    );
  }

  fillVacantSeats(room) {
    const game = room.game;
    for (const slot of room.pendingBotSlots || []) {
      if ([...room.players.values()].some(member => member.slot === slot)) continue;
      const player = game.players[slot];
      if (!player) continue;
      player.active = true;player.connected = false;player.bot = true;player.name = `电脑 ${slot + 1}`;
      room.pendingBotSlots.delete(slot);
      this.state(room, slot);
      game.message(`${player.name}加入队伍并开始自动托管`);
      this.chooseClass(room, slot);
    }
  }

  takeover(room, slot) {
    const player = room.game.players[slot];
    if (!player?.active) return;
    player.bot = true;
    this.state(room, slot).nextActionAt = room.game.time;
    this.resolveDialogs(room, slot);
  }

  resume(room, slot) {
    const player = room.game.players[slot];
    if (player) player.bot = false;
  }

  resolveDialogs(room, slot) {
    const game = room.game;
    for (let count = 0; count < 5; count++) {
      const dialog = [...game.dialogs.values()].find(candidate => candidate.visible.has(slot) && candidate.buttons.length);
      if (!dialog) break;
      const classDialog = game.globals.udg_zhiye?.[slot + 1];
      if (dialog === classDialog) {
        this.chooseClass(room, slot);
        continue;
      }
      game.choose(slot, dialog.hid, dialog.buttons[0].hid);
    }
  }

  chooseClass(room, slot) {
    const game = room.game, player = game.players[slot];
    if (!player?.bot || Number(game.globals.udg_playerzz?.[slot]) > 0) return false;
    const index = this.preferredClass(game, slot), dialog = game.globals.udg_zhiye?.[slot + 1];
    const button = game.globals[`udg_zhiyexz${slot + 1}`]?.[index];
    if (dialog && button) {
      if (!dialog.buttons.some(candidate => candidate.hid === button.hid)) dialog.buttons = Array.from({ length: 6 }, (_, i) => game.globals[`udg_zhiyexz${slot + 1}`]?.[i + 1]).filter(Boolean);
      dialog.visible.add(slot);
      return game.choose(slot, dialog.hid, button.hid);
    }
    const workerId = CLASS_WORKERS[index - 1], start = game.startLocations.get(slot) || {}, [fallbackX, fallbackY] = STARTS[slot];
    const worker = game.createUnit(player, game.fourCC(workerId), Number.isFinite(player.startX) ? player.startX : Number.isFinite(start.x) ? start.x : fallbackX, Number.isFinite(player.startY) ? player.startY : Number.isFinite(start.y) ? start.y : fallbackY);
    game.globals.udg_playerzz[slot] = index;game.globals.udg_nongming[slot + 1] = worker;
    game.globals.udg_zhiyexuanze[slot] = CLASS_NAMES[index - 1];
    if (index === 3) game.globals.udg_daozei[slot + 1] = true;
    game.run('OpenTrigger', [index]);
    return true;
  }

  preferredClass(game, slot) {
    const counts = Array(6).fill(0);
    for (let index = 0; index < 4; index++) {
      const current = Number(game.globals.udg_playerzz?.[index]) || 0;
      if (current > 0 && current <= 6) counts[current - 1]++;
    }
    const minimum = Math.min(...counts), choices = counts.map((count, index) => count === minimum ? index + 1 : 0).filter(Boolean);
    return choices[(slot + (Number(game.seed) || 0)) % choices.length];
  }

  upgrade(room, slot) {
    const game = room.game, player = game.players[slot];
    const buildings = [...game.units.values()].filter(unit => unit.owner === player && unit.building && !unit.removed && !unit.death && unit.constructed && !unit.upgradeTo);
    const choices = buildings.flatMap(unit => rawIds(game.data.units[unit.raw]?.Upgrade).map(id => ({ unit, id, definition: game.data.units[id] })))
      .filter(({ definition }) => definition?.isbldg && player.gold >= (Number(definition.goldcost) || 0) && player.lumber >= (Number(definition.lumbercost) || 0))
      .sort((a, b) => (Number(a.definition.goldcost) || 0) - (Number(b.definition.goldcost) || 0));
    for (const { unit, id } of choices) {
      try { if (game.action(slot, { type: 'upgrade', unit: unit.hid, to: id })) return true; }
      catch { /* Keep trying eligible buildings when a larger base cannot fit. */ }
    }
    return false;
  }

  build(room, slot, { uniqueOnly = false } = {}) {
    const game = room.game, player = game.players[slot], data = game.data.units;
    const builders = [...game.units.values()].filter(unit => unit.owner === player && !unit.removed && !unit.death && !unit.building && rawIds(data[unit.raw]?.Builds).length);
    if (!builders.length) return false;
    const ownedUnits = [...game.units.values()].filter(unit => unit.owner === player && !unit.removed && !unit.death);
    const owned = ownedUnits.filter(unit => unit.constructed);
    const buildable = new Set(builders.flatMap(builder => rawIds(data[builder.raw]?.Builds)));
    const candidates = [...buildable].map(id => ({ id, definition: data[id] })).filter(({ definition }) => {
      if (!definition?.isbldg || !(Number(definition.weapsOn) & 1) || !definition.weapTp1 || definition.weapTp1 === '_') return false;
      const gold = Number(definition.goldcost) || 0, lumber = Number(definition.lumbercost) || 0, food = Number(definition.fused) || 0;
      if (player.gold < gold || player.lumber < lumber || player.food + food > Math.min(Number(game.rules.FoodCeiling) || 65, player.cap)) return false;
      return rawIds(definition.Requires).every(id => player.tech[id] || owned.some(unit => unit.raw === id));
    });
    const towers = this.towers(game, player);
    const existingTypes = new Set(towers.map(unit => unit.raw));
    const fresh = candidates.filter(({ id }) => !existingTypes.has(id));
    if (uniqueOnly && !fresh.length) return false;
    const choices = fresh.length ? fresh : candidates;
    const roleCounts = new Map();
    for (const tower of towers) {
      const role = this.role(data[tower.raw]);
      roleCounts.set(role, (roleCounts.get(role) || 0) + 1);
    }
    choices.sort((a, b) => this.strategyValue(b.definition, roleCounts) - this.strategyValue(a.definition, roleCounts));
    const center = this.crossroads(game, slot);
    for (const { id } of choices) {
      for (const [x, y] of this.sites(center, towers.length)) {
        try {
          const placement = game.canBuild(slot, id, x, y);
          if (game.action(slot, { type: 'build', unit: id, x: placement.x, y: placement.y })) return true;
        } catch { /* The shared placement checks reject occupied and blocked sites. */ }
      }
    }
    return false;
  }

  towers(game, player) {
    return [...game.units.values()].filter(unit => {
      if (unit.owner !== player || unit.removed || unit.death || !unit.building) return false;
      const definition = game.data.units[unit.raw];
      return Boolean(definition && (Number(definition.weapsOn) & 1) && definition.weapTp1 && definition.weapTp1 !== '_');
    });
  }

  crossroads(game, slot) {
    const route = ROUTE_CROSSROADS[slot] || ROUTE_CROSSROADS[0];
    const rect = game.globals?.[`gg_rct_${route}`];
    if (rect && game.natives?.GetRectCenter) {
      const center = game.natives.GetRectCenter(rect);
      if (Number.isFinite(center.x) && Number.isFinite(center.y)) return [center.x, center.y];
    }
    return CROSSROAD_FALLBACKS[slot] || CROSSROAD_FALLBACKS[0];
  }

  role(definition) {
    const weapon = String(definition?.weapTp1 || '');
    const area = Math.max(Number(definition?.Farea1) || 0, Number(definition?.Harea1) || 0, Number(definition?.Qarea1) || 0);
    const splash = area > 0 || Number(definition?.targCount1) > 1 || ['msplash', 'mbounce', 'mline', 'aline', 'artillery'].includes(weapon);
    const range = Number(definition?.rangeN1) || 0;
    return `${splash ? 'area' : 'single'}:${range >= 1000 ? 'long' : range >= 800 ? 'medium' : 'short'}`;
  }

  strategyValue(definition, roleCounts) {
    const roleCount = roleCounts.get(this.role(definition)) || 0;
    const range = Math.min(1400, Number(definition.rangeN1) || 0);
    const area = Math.max(Number(definition.Farea1) || 0, Number(definition.Harea1) || 0, Number(definition.Qarea1) || 0);
    return this.value(definition) * (1 + range / 7000 + Math.min(.2, area / 1000)) / (1 + roleCount * .35);
  }

  value(definition) {
    const damage = (Number(definition.dmgplus1) || 0) + (Number(definition.dice1) || 0) * (1 + (Number(definition.sides1) || 1) / 2);
    const dps = damage / Math.max(.1, Number(definition.cool1) || 1);
    const cost = (Number(definition.goldcost) || 0) + 2 * (Number(definition.lumbercost) || 0);
    return dps / Math.max(100, cost) + (rawIds(definition.Upgrade).length ? .02 : 0);
  }

  *sites([centerX, centerY], towerCount = 0) {
    const firstQuadrant = towerCount % 4;
    const corners = [[1, 1], [-1, 1], [-1, -1], [1, -1]];
    for (let distance = 320; distance <= 768; distance += 64) {
      for (let offset = 0; offset < 4; offset++) {
        const [xSign, ySign] = corners[(firstQuadrant + offset) % 4];
        yield [centerX + xSign * distance, centerY + ySign * distance];
      }
    }
  }
}
