import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { attackVsArmor } from '../engine/runtime.js';
import { readSourcePresentation } from './read_source_presentation.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = resolve(root, 'content/original-3.0');
const readJson = async name => JSON.parse(await readFile(resolve(contentRoot, name), 'utf8'));
const [data, meta, manifest, terrain] = await Promise.all([
  readJson('data.json'), readJson('metadata.json'), readJson('manifest.json'), readJson('terrain.json')
]);
const script = await readFile(resolve(contentRoot, 'script.j'), 'utf8');
const presentation = await readSourcePresentation({ contentRoot, data, script, manifest, terrain });
if (manifest.sha256 !== meta.sourceSha256 || data.source.sha256 !== manifest.sha256) {
  throw new Error('Map, extraction manifest, and metadata hashes do not match.');
}

const number = value => value === undefined || value === null || value === '' || value === '_' ? null : Number.isFinite(Number(value)) ? Number(value) : null;
const clean = value => String(value ?? '').replace(/\|c[\da-fA-F]{8}/g, '').replace(/\|r/g, '').replace(/\|n/g, ' ').replace(/\s+/g, ' ').trim();
const escapeCell = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ').replaceAll('\r', ' ');
const list = value => String(value ?? '').split(',').map(x => x.trim()).filter(Boolean);
const abilityInfo = id => {
  const base = data.abilityData[id] || {};
  const localized = data.abilityStrings[id] || {};
  return {
    id,
    name: clean(localized.Name || base.Name || id),
    tip: clean(localized.Tip || base.Tip || ''),
    description: clean(localized.Ubertip || base.Ubertip || ''),
    art: localized.Art || base.Art || null
  };
};

function unitInfo(id) {
  const unit = data.units[id] || {};
  const damageBase = number(unit.dmgplus1) ?? 0;
  const diceCount = number(unit.dice1) ?? 0;
  const diceSides = number(unit.sides1) ?? 1;
  const weapon = unit.atkType1 && unit.atkType1 !== '_' && unit.weapTp1 && unit.weapTp1 !== '_' ? {
    attackType: unit.atkType1,
    weaponType: unit.weapTp1,
    damageMin: damageBase + diceCount,
    damageMax: damageBase + diceCount * diceSides,
    damageBase,
    diceCount,
    diceSides,
    cooldownSeconds: number(unit.cool1),
    range: number(unit.rangeN1),
    acquisitionRange: number(unit.acquire),
    targets: list(unit.targs1)
  } : null;
  return {
    id,
    name: clean(unit.Name || unit.name || id),
    tip: clean(unit.Tip || ''),
    description: clean(unit.Ubertip || ''),
    model: unit.file || null,
    hp: number(unit.HP),
    mana: { initial: number(unit.mana0), maximum: number(unit.manaN) },
    regeneration: { hpPerSecond: number(unit.regenHP), manaPerSecond: number(unit.regenMana) },
    armor: { value: number(unit.def), type: unit.defType || null },
    movement: { type: unit.movetp || null, speed: number(unit.spd) },
    collision: number(unit.collision),
    weapon,
    bounty: { base: number(unit.bountyplus), diceCount: number(unit.bountydice), diceSides: number(unit.bountysides) },
    cost: { gold: number(unit.goldcost), lumber: number(unit.lumbercost), food: number(unit.fused) },
    building: Boolean(number(unit.isbldg)),
    requirements: list(unit.Requires),
    abilities: list(unit.abilList).filter(code => code !== '_').map(abilityInfo),
    builds: list(unit.Builds)
  };
}

function functionBodies(text) {
  const result = new Map();
  for (const match of text.matchAll(/^function (\w+) takes [^\n]*\n([\s\S]*?)^endfunction/gm)) result.set(match[1], match[2]);
  return result;
}

function callArguments(text, name) {
  const result = [];
  const matcher = new RegExp(`\\b${name}\\(`, 'g');
  for (const match of text.matchAll(matcher)) {
    let cursor = match.index + match[0].length;
    let start = cursor, depth = 0, quoted = false, escaped = false;
    const args = [];
    for (; cursor < text.length; cursor++) {
      const char = text[cursor];
      if (quoted) {
        if (char === '"' && !escaped) quoted = false;
        escaped = char === '\\' && !escaped;
        if (char !== '\\') escaped = false;
        continue;
      }
      if (char === '"') { quoted = true; continue; }
      if (char === '(') depth++;
      else if (char === ')') {
        if (depth === 0) { args.push(text.slice(start, cursor).trim()); break; }
        depth--;
      } else if (char === ',' && depth === 0) {
        args.push(text.slice(start, cursor).trim());
        start = cursor + 1;
      }
    }
    if (args.length) result.push(args);
  }
  return result;
}

const bodies = functionBodies(script);
const labels = {
  YM: {
    majiajue: '马加爵', sheshenquyi: '舍身取义', zhaohuanxiong: '召唤熊', jingshu: '恐怖嚎叫', diyuhuo: '地狱火',
    chongjibo: '冲击波', dimaoci: '地矛刺', fengbaozhichui: '风暴之锤', LeiTing: '雷霆'
  },
  LR: {
    zhuanshen: '转身', siwangqiyue: '死亡契约', huitianmiedi: '毁天灭地', paoxiao: '咆哮', jingxia: '惊吓',
    shuren: '树人', lang: '狼', shandian: '闪电', dahuo: '大火', qunxing: '群星', qunbu: '群捕'
  },
  DZ: {
    shentouA: '神偷 A', shentouB: '神偷 B', shentou: '神偷', zhiyu: '治愈', shandianfengbao: '闪电风暴', linghunsuolian: '灵魂锁链', morishenpan: '末日审判',
    shachongji: '沙冲击', anyingtouxi: '暗影突袭', manteng: '蔓藤', binggongchang: '兵工厂', Jianrenfengbao: '剑刃风暴',
    suoding: '锁定', baijia: '败家', rengqian: '扔钱', zhiyutxt: '治疗说明'
  },
  SS: {
    kusimingxiang: '苦思冥想', bingxueluanwu: '冰雪乱舞', baofengxue: '暴风雪', shuiyuansu: '水元素',
    fenghuangniepan: '凤凰涅槃', xixingdafa: '吸星大法', julang: '巨浪', Jiejie: '结界'
  },
  YX: {
    chaojipaoxiao: '超级咆哮', wanjian: '万箭齐发', huoyanyu: '火焰雨', liehuojingu: '烈火金箍',
    daolunzhan: '刀轮战', shandianhudun: '闪电护盾', Bingfengqiu: '冰封球'
  },
  MJS: {
    fennu: '愤怒', moliquanshui: '魔力泉水', wanjianguizong: '万剑归宗', siwangsuolian: '死亡锁链',
    renlunwu: '刃轮舞', guihuoluanwu: '鬼火乱舞', wanjianjue: '万剑诀', longpao: '龙炮', nihong: '霓虹', lingguang: '灵光'
  }
};

function effectKinds(body) {
  const candidates = [
    ['UnitDamageTarget', '伤害'], ['CreateUnit', '召唤/创建单位'], ['IssuePointOrder', '移动/点目标命令'],
    ['SetUnitPositionLoc', '位置移动'], ['UnitAddAbility', '添加技能/状态'], ['UnitRemoveAbility', '移除技能/状态'],
    ['UnitApplyTimedLifeBJ', '限时单位'], ['AdjustPlayerStateBJ', '资源调整'], ['SetPlayerState', '玩家属性'],
    ['SetHero', '英雄属性'], ['SetUnitOwner', '改变归属'], ['KillUnit', '击杀'], ['RemoveUnit', '移除单位'],
    ['TimerStart', '计时器'], ['TriggerSleepAction', '延时']
  ];
  return candidates.filter(([call]) => body.includes(call)).map(([, label]) => label);
}

function jassStrings(body) {
  const values = [];
  for (const match of body.matchAll(/"((?:\\.|[^"\\])*)"/g)) {
    const value = clean(match[1].replace(/\\n/g, ' ').replace(/\\r/g, ' ').replace(/\\t/g, ' '));
    if (value.length > 4 && /[\u3400-\u9fff]/.test(value) && !values.includes(value)) values.push(value);
  }
  return values.slice(0, 4);
}

const classSources = [
  { prefix: 'YM', index: 0 }, { prefix: 'LR', index: 1 }, { prefix: 'DZ', index: 2 },
  { prefix: 'SS', index: 3 }, { prefix: 'YX', index: 4 }, { prefix: 'MJS', index: 5 }
];
const classes = classSources.map(({ prefix, index }) => {
  const name = data.arrays.zhiyexuanze[String(index)];
  const heroId = data.arrays.zhiyenm?.[String(index)] || ['h001', 'h002', 'h000', 'h004', 'h003', 'h06C'][index];
  const hero = unitInfo(heroId);
  const groups = new Map();
  const matcher = new RegExp(`^Trig_${prefix}([A-Za-z0-9_]+)_Actions$`);
  for (const [functionName, actionBody] of bodies) {
    const match = functionName.match(matcher);
    if (!match) continue;
    const suffix = match[1], stem = suffix.replace(/\d+$/, '');
    const conditionName = `Trig_${prefix}${suffix}_Conditions`;
    const body = `${bodies.get(conditionName) || ''}\n${actionBody}`;
    const codes = [...new Set([...body.matchAll(/'([A-Za-z0-9]{4})'/g)].map(code => code[1]))];
    const unitCodes = codes.filter(code => data.units[code]);
    const abilityCodes = codes.filter(code => data.abilityData[code] || data.abilityStrings[code] || data.abilities[code]);
    const damageFormulas = [...new Set(callArguments(actionBody, 'UnitDamageTarget').map(args => args[2]).filter(Boolean))];
    const trigger = {
      function: functionName,
      condition: bodies.has(conditionName) ? conditionName : null,
      level: Number(suffix.match(/(\d+)$/)?.[1]) || null,
      relatedUnits: unitCodes.map(id => ({ id, name: clean(data.units[id].Name || data.units[id].name || id), tip: clean(data.units[id].Tip || ''), description: clean(data.units[id].Ubertip || '') })),
      relatedAbilities: abilityCodes.map(abilityInfo),
      effects: effectKinds(actionBody),
      damageFormulas,
      messages: jassStrings(actionBody)
    };
    if (!groups.has(stem)) groups.set(stem, []);
    groups.get(stem).push(trigger);
  }
  const triggers = [...groups.entries()].map(([stem, variants]) => ({
    id: stem,
    name: labels[prefix]?.[stem] || stem,
    variants: variants.sort((a, b) => (a.level || 0) - (b.level || 0))
  }));
  const buildings = hero.builds.map(unitInfo);
  return { id: index, name, prefix, hero, buildings, triggers };
});

const waves = data.waveUnits.map((unitId, index) => ({ number: index + 1, unit: unitInfo(unitId) }));
const bosses = data.bossUnits.map((unitId, index) => ({ wave: (index + 1) * 10, unit: unitInfo(unitId) }));
const finalBoss = unitInfo('H05V');
const route = prefix => Array.from({ length: 9 }, (_, index) => {
  const rect = data.rects[`gg_rct_${prefix}${index + 1}`];
  return rect ? { x: (rect[0] + rect[2]) / 2, y: (rect[1] + rect[3]) / 2 } : null;
}).filter(Boolean);
const itemCatalog = Object.entries(data.items).map(([id, item]) => ({
  id,
  name: clean(item.Name || item.name || id),
  level: number(item.oldLevel ?? item.Level),
  goldCost: number(item.goldcost),
  charges: number(item.uses),
  sellable: Boolean(number(item.sellable)),
  randomDrop: Boolean(number(item.pickRandom)),
  description: clean(item.Ubertip || item.Description || item.Tip || ''),
  abilities: list(item.abilList)
}));
const upgradeCatalog = Object.entries(data.upgrades).map(([id, upgrade]) => ({
  id,
  name: clean(data.upgradeStrings[id]?.Name || upgrade.Name || id),
  levels: number(upgrade.maxlevel ?? upgrade.MaxLevel),
  goldCost: number(upgrade.goldbase),
  lumberCost: number(upgrade.lumberbase),
  raw: upgrade
}));
const mapObjectNames = new Set(manifest.files.map(file => file.name.toLowerCase().replaceAll('/', '\\')));
const reference = {
  title: meta.name,
  version: meta.version,
  description: meta.description,
  source: { file: '人族无敌3.0终极版.w3x', sha256: manifest.sha256, bytes: manifest.sourceBytes, extractedFiles: manifest.files.length, extractionErrors: manifest.errors.length },
  map: {
    metadataName: meta.name,
    sourceName: presentation.sourceMapInfo.name,
    embeddedName: script.match(/call SetMapName\("([^"]*)"\)/)?.[1] || null,
    players: meta.humanSlots,
    waves: meta.waves,
    terrain: { width: terrain.width, height: terrain.height, tileSize: terrain.tileSize, offset: terrain.offset },
    routes: Object.fromEntries(['a', 'b', 'c', 'd'].map(prefix => [prefix, route(prefix)])),
    objectFiles: { units: mapObjectNames.has('war3map.w3u'), items: mapObjectNames.has('war3map.w3t'), abilities: mapObjectNames.has('war3map.w3a'), upgrades: mapObjectNames.has('war3map.w3q') }
  },
  rules: {
    sourceGameplayConstants: presentation.gameplayConstants.sections.Misc,
    classSelection: classes.map(({ id, name, hero }) => ({ id, name, unitId: hero.id })),
    modes: [
      { id: 0, name: '正常模式', lives: 50, skillLearnChance: '10% when normal skill acquisition is selected' },
      { id: 1, name: '特殊模式', setItemDrop: '2x' },
      { id: 2, name: '疯狂模式', lives: 75, skillLearnChance: '100%', waveRewardMultiplier: 1.5, setItemDrop: '2x', startingFoodCap: 20, setDistance: 99999 }
    ],
    crazySubmodes: [
      { id: 0, name: '单线 150% HP', enemyHpMultiplier: 1.5, parallelLines: 1 },
      { id: 1, name: '双线 150% HP', enemyHpMultiplier: 1.5, parallelLines: 2 },
      { id: 2, name: '双线 175% HP', enemyHpMultiplier: 1.75, parallelLines: 2 },
      { id: 3, name: '双线 200% HP', enemyHpMultiplier: 2, parallelLines: 2 }
    ],
    difficulty: ['简单', '普通', '困难', '专家', '天才'].map((name, upgradeLevel) => ({ name, upgrade: 'R007', upgradeLevel })),
    waveSchedule: { maximum: 56, standardIntervalSeconds: 60, waves45to56IntervalSeconds: 80, spawnIntervalSeconds: { waves1to44: 0.8, waves45to56: 1 }, spawnsPerLanePerTick: 1, spawnTicks: 40 },
    bosses: { regularWaves: bosses.map(row => row.wave), regularDelaySeconds: 8, finalWave: 56, finalBossId: finalBoss.id, finalBossDelaySeconds: 40, countPerLane: 1 },
    rewards: { ordinaryWaveGold: '50 + 6 * wave', crazyMultiplier: 1.5, bossKillFoodCap: 5, leakLives: { ordinaryUnit: 1, heroBeforeFinalWave: 5, heroOnFinalWave: 2, finalBossOnWave56: 10 } },
    combat: { parityStatus: 'incomplete', runtimeWeaponRoll: 'dmgplus1 + dice1 * randomInteger(1..sides1)', positiveArmorMultiplier: '1 / (1 + 0.06 * armor)', negativeArmorMultiplier: '2 - 0.94 ^ abs(armor)', runtimeAttackVsArmor: attackVsArmor, sourceDamageBonusOverrides: Object.fromEntries(Object.entries(presentation.gameplayConstants.sections.Misc).filter(([key]) => key.startsWith('DamageBonus'))) }
  },
  classes,
  waves,
  bosses,
  finalBoss,
  counts: {
    units: Object.keys(data.units).length,
    items: Object.keys(data.items).length,
    mapAbilityOverrides: Object.keys(data.abilities).length,
    abilityData: Object.keys(data.abilityData).length,
    upgrades: Object.keys(data.upgrades).length,
    jassFunctions: bodies.size,
    classActionTriggers: classes.reduce((sum, item) => sum + item.triggers.reduce((n, trigger) => n + trigger.variants.length, 0), 0),
    jassNatives: Object.keys(await readJson('native-api.json')).length
  },
  items: itemCatalog,
  upgrades: upgradeCatalog
};

const inline = value => value === null || value === undefined ? '-' : String(value);
const weaponText = unit => unit.weapon ? `${unit.weapon.attackType} ${unit.weapon.damageMin}-${unit.weapon.damageMax}, ${unit.weapon.cooldownSeconds}s, range ${unit.weapon.range}` : '-';
const abilityText = unit => unit.abilities.map(item => `${item.name} (${item.id})`).join(', ') || '-';
const bountyText = unit => unit.bounty.diceCount && unit.bounty.diceSides ? `${unit.bounty.base} + ${unit.bounty.diceCount}d${unit.bounty.diceSides}` : inline(unit.bounty.base);
const markdown = [
  `# ${reference.title} 原版数据与机制参考`,
  '',
  `版本：${reference.version}。本文由地图归档中的单位表、技能表和 JASS 触发脚本生成；源文件 SHA-256：\`${reference.source.sha256}\`。原地图文件与用户提供的 F 盘文件 SHA-256 一致。`,
  '',
  `名称核对：项目显示名为“${reference.map.metadataName}”；原图 \`war3map.w3i\` 与 JASS 的 \`SetMapName\` 均为“${reference.map.sourceName}”。项目显示名不是原图元数据。`,
  '',
  '**还原状态：尚未与原版完全一致。本文记录原图对象与脚本，同时列明部分在线运行时算法；提取成功及本地测试通过不能证明机制等价。已确认的差距与画面参数见 [原版画面与一致性核查](original-parity-audit.md)，完整视觉字段见 [presentation.json](../content/original-3.0/presentation.json)。**',
  '',
  '## 数据范围',
  '',
  `归档大小 ${reference.source.bytes} 字节，解出 ${reference.source.extractedFiles} 个文件，错误 ${reference.source.extractionErrors} 个。已读取 ${reference.counts.units} 个单位行、${reference.counts.items} 个物品行、${reference.counts.abilityData} 个技能定义、${reference.counts.upgrades} 个升级定义、${reference.counts.jassFunctions} 个 JASS 函数。`,
  '',
  `地图地形为 ${terrain.width} x ${terrain.height} 个采样点，原始地形格尺寸 ${terrain.tileSize}；玩家位 ${meta.humanSlots}，波数 ${meta.waves}。地图清单中 ${reference.map.objectFiles.units ? '包含' : '没有'} \`war3map.w3u\` 单位覆盖表、${reference.map.objectFiles.items ? '包含' : '没有'} \`war3map.w3t\` 物品覆盖表、${reference.map.objectFiles.abilities ? '包含' : '没有'} \`war3map.w3a\` 技能覆盖表。游戏内对象数值来自归档内完整 \`units/*.slk\` / \`units/*.txt\` 数据及 JASS；具体逐字段值保留在数据文件。`,
  '',
  `完整源对象表：[data.json](../content/original-3.0/data.json)；结构化玩法索引：[gameplay.json](../content/original-3.0/gameplay.json)；原始脚本：[script.j](../content/original-3.0/script.j)；函数索引：[functions.json](../content/original-3.0/functions.json)；归档校验清单：[manifest.json](../content/original-3.0/manifest.json)。`,
  '',
  '## 选择与波次规则',
  '',
  '| 模式 | 原版规则 |',
  '|---|---|',
  '| 正常 | 初始生命 50；标准物品模式开启；普通技能习得模式的特殊技能触发概率为 10%。 |',
  '| 特殊 | 套装物品掉落率提高 1 倍；另选功勋速度与技能习得模式。 |',
  '| 疯狂 | 初始生命 75；每波奖励金币 x1.5；技能习得概率 100%；套装物品掉率提高 1 倍；人口上限初始 20；套装不限制职业且距离阈值 99999。 |',
  '',
  '疯狂模式进阶选择：',
  '',
  '| 选项 | 线路数 | 敌方生命倍率 |',
  '|---|---:|---:|',
  ...reference.rules.crazySubmodes.map(mode => `| ${mode.name} | ${mode.parallelLines} | ${mode.enemyHpMultiplier * 100}% |`),
  '',
  `难度依次为 ${reference.rules.difficulty.map(item => item.name).join('、')}，对应敌方升级 \`R007\` 的 0 至 4 级。普通波次间隔 ${reference.rules.waveSchedule.standardIntervalSeconds} 秒；45 至 56 波间隔 ${reference.rules.waveSchedule.waves45to56IntervalSeconds} 秒。1 至 44 波每 ${reference.rules.waveSchedule.spawnIntervalSeconds.waves1to44} 秒刷新，45 至 56 波每 ${reference.rules.waveSchedule.spawnIntervalSeconds.waves45to56} 秒刷新；每条线路每次刷新 1 个单位，连续 ${reference.rules.waveSchedule.spawnTicks} 次。`,
  '',
  `常规 Boss 出现在第 ${reference.rules.bosses.regularWaves.join('、')} 波，普通波次刷怪结束后 ${reference.rules.bosses.regularDelaySeconds} 秒各线路各刷 1 只。第 56 波单位波结束后 ${reference.rules.bosses.finalBossDelaySeconds} 秒在四线各刷 1 只终局 Boss。每波基础金币公式为 \`${reference.rules.rewards.ordinaryWaveGold}\`；击杀赏金按单位表的 \`bountyplus + bountydice * random(1..bountysides)\` 计算。击杀 Boss 增加 5 人口上限。`,
  '',
  `漏怪扣生命：普通单位 1 点；第 56 波之前的英雄单位 5 点；第 56 波时普通英雄 2 点，终局单位 \`${finalBoss.id}\` 10 点。该数值由原版四条终点触发器直接扣减。`,
  '',
  '## 战斗数值',
  '',
  '单位表提供伤害基数与骰子字段，本表伤害区间按其最小/最大值展开。当前在线运行时使用 `dmgplus1 + dice1 * randomInteger(1..sides1)`，正护甲乘数为 `1 / (1 + 0.06 * armor)`，负护甲乘数为 `2 - 0.94 ^ abs(armor)`；这些实现尚未完成与原引擎的逐项等价核验。下表仅为当前运行时的攻击/护甲倍率，原图在 `war3mapmisc.txt` 中另有覆盖，当前运行时尚未加载该文件：',
  '',
  '| 攻击类型 \\ 护甲类型 | small | medium | large | fort | hero | normal | divine | none |',
  '|---|---:|---:|---:|---:|---:|---:|---:|---:|',
  ...Object.entries(attackVsArmor).map(([type, row]) => `| ${type} | ${['small','medium','large','fort','hero','normal','divine','none'].map(armor => `${Math.round((row[armor] ?? 1) * 100)}%`).join(' | ')} |`),
  '',
  '原图自定义倍率原始数组（保持文件顺序；不是上表中的当前运行时矩阵）：',
  '',
  ...Object.entries(reference.rules.combat.sourceDamageBonusOverrides).map(([key, values]) => `- \`${key}=${values.join(',')}\``),
  '',
  `原图还设置拾取距离 \`PickupItemRange=${reference.rules.sourceGameplayConstants.PickupItemRange}\`、最高移速 \`MaxUnitSpeed=${reference.rules.sourceGameplayConstants.MaxUnitSpeed}\`、人口上限 \`FoodCeiling=${reference.rules.sourceGameplayConstants.FoodCeiling}\` 等全局规则；全部原始字段位于 \`gameplay.json.rules.sourceGameplayConstants\`。`,
  '',
  '四条原版寻路路线使用地图区域中心点，坐标单位为 Warcraft 世界坐标：',
  '',
  ...Object.entries(reference.map.routes).map(([lane, points]) => `- ${lane.toUpperCase()}：${points.map(point => `(${point.x}, ${point.y})`).join(' -> ')}`),
  '',
  '## 职业与防御单位',
  '',
  '所有职业英雄初始生命为单位表中的 `HP`，拥有原始技能、无敌标记与 11 个可建造单位。伤害区间按原版武器字段 `dmgplus1 + dice1 * random(1..sides1)` 计算；攻击间隔、攻击范围、目标类型、护甲、移动速度、成本和技能均从原始行读取。',
  ''
];

for (const profession of classes) {
  markdown.push(`### ${profession.name} (${profession.hero.id})`, '');
  markdown.push(`英雄生命 ${inline(profession.hero.hp)}；护甲 ${inline(profession.hero.armor.value)} / ${inline(profession.hero.armor.type)}；初始技能：${abilityText(profession.hero)}。职业脚本前缀：\`${profession.prefix}\`。`, '');
  markdown.push('| 建筑/单位 | ID | HP | 护甲 | 移速 | 攻击 | 攻速 | 射程 | 金币 | 木材 | 技能 |', '|---|---|---:|---|---:|---|---:|---:|---:|---:|---|');
  for (const building of profession.buildings) {
    markdown.push(`| ${escapeCell(building.name)} | \`${building.id}\` | ${inline(building.hp)} | ${inline(building.armor.value)} / ${inline(building.armor.type)} | ${inline(building.movement.speed)} | ${escapeCell(weaponText(building))} | ${inline(building.weapon?.cooldownSeconds)} | ${inline(building.weapon?.range)} | ${inline(building.cost.gold)} | ${inline(building.cost.lumber)} | ${escapeCell(abilityText(building))} |`);
  }
  markdown.push('', `职业机制触发器索引（${profession.triggers.reduce((n, entry) => n + entry.variants.length, 0)} 个动作函数）。每个函数还保留了关联单位/技能 ID、触发效果类别、脚本伤害公式和原版提示文本；函数完整逻辑见 \`functions.json\`。`, '');
  markdown.push('| 技能/机制 | 原版触发函数 | 关联对象 | 触发效果与伤害表达式 |', '|---|---|---|---|');
  for (const trigger of profession.triggers) {
    const variants = trigger.variants.map(variant => {
      const names = [...variant.relatedUnits.map(item => `${item.name}(${item.id})`), ...variant.relatedAbilities.map(item => `${item.name}(${item.id})`)];
      const details = [
        ...variant.effects,
        ...variant.damageFormulas.map(formula => `伤害=${formula}`),
        ...variant.relatedUnits.map(item => item.description || item.tip),
        ...variant.relatedAbilities.map(item => item.description || item.tip),
        ...variant.messages
      ].filter(Boolean).join('; ');
      return `\`${variant.function}\`${variant.level ? ` Lv${variant.level}` : ''}${names.length ? ` [${names.join(', ')}]` : ''}${details ? `: ${details}` : ''}`;
    });
    const objectNames = [...new Set(trigger.variants.flatMap(v => [...v.relatedUnits.map(x => `${x.name}(${x.id})`), ...v.relatedAbilities.map(x => `${x.name}(${x.id})`)]))];
    const details = [...new Set(trigger.variants.flatMap(v => [
      ...v.effects,
      ...v.damageFormulas.map(formula => `伤害=${formula}`),
      ...v.relatedUnits.map(item => item.description || item.tip),
      ...v.relatedAbilities.map(item => item.description || item.tip)
    ].filter(Boolean)))].join('; ') || '-';
    markdown.push(`| ${escapeCell(trigger.name)} | ${escapeCell(variants.map(item => item.split(':')[0]).join('<br>'))} | ${escapeCell(objectNames.join(', ') || '-')} | ${escapeCell(details)} |`);
  }
  markdown.push('');
}

markdown.push('## 56 波怪物数值', '', '波次每次固定对应一个原始单位 ID。生命、护甲类型与数值、移速、攻击伤害、攻击类型、攻击间隔、攻击范围、赏金和技能均来自归档单位数据。', '', '| 波次 | 单位 | ID | HP | 护甲 | 移速 | 攻击 | 攻速 | 射程 | 赏金 | 技能 |', '|---:|---|---|---:|---|---:|---|---:|---:|---|---|');
for (const wave of waves) {
  const unit = wave.unit;
  const bounty = bountyText(unit);
  markdown.push(`| ${wave.number} | ${escapeCell(unit.name)} | \`${unit.id}\` | ${inline(unit.hp)} | ${inline(unit.armor.value)} / ${inline(unit.armor.type)} | ${inline(unit.movement.speed)} | ${escapeCell(weaponText(unit))} | ${inline(unit.weapon?.cooldownSeconds)} | ${inline(unit.weapon?.range)} | ${bounty} | ${escapeCell(abilityText(unit))} |`);
}

markdown.push('', '## 常规与终局 Boss', '', '| 波次 | Boss | ID | HP | 护甲 | 移速 | 攻击 | 攻速 | 射程 | 赏金 | 技能 |', '|---:|---|---|---:|---|---:|---|---:|---:|---|---|');
for (const row of [...bosses, { wave: 56, unit: finalBoss }]) {
  const unit = row.unit;
  markdown.push(`| ${row.wave} | ${escapeCell(unit.name)} | \`${unit.id}\` | ${inline(unit.hp)} | ${inline(unit.armor.value)} / ${inline(unit.armor.type)} | ${inline(unit.movement.speed)} | ${escapeCell(weaponText(unit))} | ${inline(unit.weapon?.cooldownSeconds)} | ${inline(unit.weapon?.range)} | ${bountyText(unit)} | ${escapeCell(abilityText(unit))} |`);
}

markdown.push('', '## 完整数值文件', '', `本文件按游戏对象展开职业、建筑、波次和 Boss；全量对象目录另保留在 \`data.json\` / \`gameplay.json\`，包括 ${reference.counts.units} 个单位、${reference.counts.items} 个物品、${reference.counts.abilityData} 个标准技能定义、${reference.counts.mapAbilityOverrides} 个地图技能覆盖和 ${reference.counts.upgrades} 个升级。物品逐条名称、等级、价格、次数、掉落标志、说明和技能 ID 位于 \`gameplay.json.items\`；升级逐条字段位于 \`gameplay.json.upgrades\`。`, '', `重新生成：在 \`human-defense-online\` 目录执行 \`npm run reference\`。`, '');

const gameplayPath = resolve(contentRoot, 'gameplay.json');
const docPath = resolve(root, 'docs/original-map-reference.md');
const presentationPath = resolve(contentRoot, 'presentation.json');
const auditPath = resolve(root, 'docs/original-parity-audit.md');
const audit = [
  '# 原版画面参数与一致性核查', '',
  `源地图 SHA-256：\`${manifest.sha256}\`。以下结论来自归档内容与当前在线版代码的对照，不代表已在 Warcraft 客户端完成全程对比验收。`, '',
  '**结论：地图数据与原始模型资源已接入，部分全局战斗规则和升级效果已按归档修正；完整玩法与画面对照仍未达到 Warcraft 客户端等价验收。**', '',
  '## 已确认的机制差距', '',
  '| 项目 | 原图证据 | 当前在线版 |', '|---|---|---|',
  '| 全局规则 | war3mapmisc.txt 的 Misc 段包含拾取距离、移速、人口上限、伤害倍率等 | Runtime 从原图规则初始化拾取距离、移动上下限、人口上限及穿刺/法术倍率；返还率等未接入 |',
  `| 拾取距离 | PickupItemRange=${reference.rules.sourceGameplayConstants.PickupItemRange} | combat.js 按原图距离判定，已覆盖跨 1000 世界单位的回归测试 |`,
  `| 移动速度 | MinUnitSpeed=${reference.rules.sourceGameplayConstants.MinUnitSpeed}、MaxUnitSpeed=${reference.rules.sourceGameplayConstants.MaxUnitSpeed}，六个建造者的 spd 原始字段为 1500 | 服务器移动和客户端动作速度共用限速后的单位值 |`,
  '| 伤害倍率 | DamageBonusPierce、DamageBonusSpells 存在原图覆盖 | Runtime 按原图 8 类护甲顺序覆盖穿刺和法术伤害矩阵 |',
  '| 难度与功勋升级 | R007 的 rhpo、R005 的 ratr 在升级表中定义属性效果，JASS 设置研究等级 | 已将生命回复和远程射程升级接入实时单位属性；其余升级效果仍未完整实现 |',
  '| 装备与原生技能 | 物品与能力表提供被动属性及各种效果 | inventory 可存物品，但尚无完整的装备被动属性聚合；技能分支只覆盖部分原生效果 |',
  '| 移动与碰撞 | 地图有路径、碰撞和阻挡相关字段 | 移动主要为朝目标直线插值；建造检查路径标志不等于完整单位寻路 |',
  '| 弹道与伤害时机 | 单位与技能表有 Missilespeed、Missilearc 等 | 攻击记录 projectile 后立即结算伤害；画面弹道另用近似速度 |', '',
  '221 个脚本原生调用有对应函数，或 1270 个 JASS 函数已转换，都不等于它们已实现原引擎的全部行为。部分调用为空实现。当前测试覆盖内容导入、启动、首波、完整 56 波触发调度、原图全局战斗参数、R005/R007 升级及选定交互；完整战斗状态下的六职业技能、全部升级/装备和 56 波等价验收仍未完成。', '',
  '## 地图与屏幕尺寸', '',
  `原地形为 ${terrain.width} × ${terrain.height} 个顶点，对应 ${terrain.width - 1} × ${terrain.height - 1} 个地形格，每格 ${terrain.tileSize} 世界单位，整张地形 ${presentation.terrain.worldSize.join(' × ')} 世界单位，坐标原点偏移 ${terrain.offset.join(', ')}。`, '',
  `原图 war3map.w3i 的可玩尺寸字段为 ${presentation.sourceMapInfo.playableWidthTiles} × ${presentation.sourceMapInfo.playableHeightTiles} 格；其镜头边界字段为 ${presentation.sourceMapInfo.cameraBounds.join(', ')}。脚本另调用 SetCameraBounds，使用边距表达式，原文保留在 presentation.json.scriptCameraBounds。`, '',
  '地图文件没有固定“地图在显示器上占多少像素”或“单位固定高多少像素”的字段。屏幕大小由地图世界尺寸、相机投影、镜头距离/角度、窗口分辨率和 UI 可视区域共同决定；单位大小还取决于模型本体几何尺寸与 modelScale。碰撞半径或选择圈字段不能代替模型几何尺寸。', '',
  '## 源文件相机参数', '',
  '| 预设 | 字段 | 原始值 |', '|---|---|---:|',
  ...presentation.cameras.flatMap(camera => Object.entries(camera.fields).map(([field, entry]) => `| ${camera.id} | ${field} | ${entry.value} |`)), '',
  ...presentation.cameras.map(camera => `预设 ${camera.id} 的目标位置为 (${camera.destination?.x}, ${camera.destination?.y})；除创建与设置字段外的应用调用共 ${camera.applicationCalls.length} 处。当前脚本没有把这个预设应用为普通游玩镜头的证据，不能直接认定其中的距离/视野就是原作日常镜头。`), '',
  'CAMERA_FIELD_TARGET_DISTANCE 是相机至目标的距离，不是离地高度。离地高度还依赖攻击角、目标地形高度和 ZOFFSET。在线运行时已将普通视点初始值切到 Warcraft 默认 distance=1650、angle=304、rotation=90、farZ=5000；地图中未应用的 distance=1500 预设没有冒充普通镜头。投影视野的引擎换算仍需用目标 Warcraft 版本对照。', '',
  '当前网页使用 PerspectiveCamera 与原始默认相机几何参数，128 个 Warcraft 世界单位映射为 1 个 Three.js 单位，X/Y 转为 Three.js X/Z，地面高度按原始地形数据换算。镜头缩放仍有网页交互；画面尺寸和最终投影需要在相同客户端版本、分辨率及视口下校准。', '',
  '## 六个操作单位的原始外观', '',
  '| 职业 | ID | 原模型路径 | modelScale | scale 原始字段 |', '|---|---|---|---:|---:|',
  ...classes.map(profession => { const u = data.units[profession.hero.id]; return `| ${profession.name} | ${profession.hero.id} | ${escapeCell(u.file)} | ${inline(u.modelScale)} | ${inline(u.scale)} |`; }), '',
  '六个职业的操作单位都使用 Peasant（人族农民）模型、modelScale=1。当前 models.js 加载原始 Peasant MDX，保留模型比例与农民本来的动作，不按职业另造战士、弓手或法师外形。', '',
  '## 职业建造单位的模型与比例', '',
  '下面列出六职业建造菜单的全部单位。网页从原始资源包加载这些 MDX 模型及纹理，并使用原始 modelScale；选择圈 scale 与模型缩放分开使用。屏幕像素高度还依赖最终镜头投影。', ''
];
for (const profession of classes) {
  audit.push(`### ${profession.name}`, '', '| 单位 | ID | 模型路径 | modelScale | scale 原始字段 | 弹道模型 | 弹速 |', '|---|---|---|---:|---:|---|---:|');
  for (const building of profession.buildings) {
    const u = data.units[building.id];
    audit.push(`| ${escapeCell(building.name)} | ${building.id} | ${escapeCell(u.file)} | ${inline(u.modelScale)} | ${inline(u.scale)} | ${escapeCell(u.Missileart || '-')} | ${inline(u.Missilespeed)} |`);
  }
  audit.push('');
}
audit.push('## 56 波与 Boss 的外观', '', '| 波次 | 单位 | ID | 模型路径 | modelScale | scale 原始字段 |', '|---|---|---|---|---:|---:|');
for (const row of [...waves.map(wave => ({ label: wave.number, unit: wave.unit })), ...bosses.map(boss => ({ label: `Boss ${boss.wave}`, unit: boss.unit })), { label: '终局', unit: finalBoss }]) {
  const u = data.units[row.unit.id];
  audit.push(`| ${row.label} | ${escapeCell(row.unit.name)} | ${row.unit.id} | ${escapeCell(u.file)} | ${inline(u.modelScale)} | ${inline(u.scale)} |`);
}
audit.push('', '## 技能动画、动作与资源依赖', '',
  '原图技能字符串表包含 Animnames（动作选择）、Missileart/Missilespeed（弹道）、Specialart、Areaeffectart、附着点、音效等信息；JASS 还会创建模型特效和闪电。', '',
  '- 闪烁 A04D：Animnames=spell,throw，Areaeffectart=Abilities\\Spells\\NightElf\\Blink\\BlinkTarget.mdl，Specialart=Abilities\\Spells\\NightElf\\Blink\\BlinkCaster.mdl。',
  '- 冲击波 A033：Animnames=attack,slam，Missileart=Abilities\\Spells\\Orc\\Shockwave\\ShockwaveMissile.mdl，Missilespeed=600。', '',
  '在线版从 Warcraft 资源档案读取对应 MDX 的骨骼、动作序列、材质层、粒子与拖尾，并由实时 Three.js 场景使用同一 WebGL 上下文绘制；在客户端原资源可用时不将模型先转成录像或精灵图。缺失或原生渲染器尚不支持的特效仍会使用程序化效果作为回退。', '',
  `地图内嵌的模型：${presentation.embeddedModels.map(name => `\`${name}\``).join('、')}。已额外接入固定资源版本的经典 Warcraft III 客户端模型资源；当前原职业、建筑、56 波与首领模型覆盖表及动作信息见 [原版视觉复原记录](original-visual-restoration.md)。`, '',
  `war3map.doo 记录了 ${presentation.doodadPlacement.count} 个装饰物/可破坏物摆放条目。在线版读取其原始摆放位置、变体、旋转和缩放并按资源表加载模型；完整地图色彩、悬崖光照、战争迷雾及客户端材质需要在 Warcraft 客户端逐项核对。`, '',
  '## 完整数据与后续还原顺序', '',
  '[presentation.json](../content/original-3.0/presentation.json) 保存全部单位视觉字段、全部已读技能视觉字段、原图 W3I 信息、镜头预设、全局常量和嵌入模型清单。', '',
  '尚未完成应用原图全局规则、升级与全部装备技能效果。也尚未在相同目标分辨率、视口和客户端渲染设置下完成逐像素验收；资源覆盖和模型动作已接入不代表最终画面已经像素级等同原作。', ''
);
await mkdir(dirname(docPath), { recursive: true });
await writeFile(gameplayPath, `${JSON.stringify(reference, null, 2)}\n`, 'utf8');
await writeFile(docPath, markdown.join('\n'), 'utf8');
await writeFile(presentationPath, `${JSON.stringify(presentation, null, 2)}\n`, 'utf8');
await writeFile(auditPath, audit.join('\n'), 'utf8');
console.log(JSON.stringify({ gameplay: gameplayPath, document: docPath, presentation: presentationPath, audit: auditPath, hash: manifest.sha256, counts: reference.counts }, null, 2));
