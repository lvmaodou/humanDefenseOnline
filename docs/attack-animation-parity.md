# 攻击时序、转身与粒子更新对照

核查日期：2026-11-20。对照依据包括原图单位数据 `content/original-3.0/data.json`、地图常量 `content/original-3.0/gameplay.json`、原图 JASS，以及已核查的 Warsmash 行为实现。行为实现用于核对 Warcraft III 的通用运行规则；原图 JASS 和单位数据用于核对这张地图的具体取值。

## 已按代码与数据对齐的部分

- 攻击起手时读取 `dmgpt1`、`backSw1`、`cool1`，按当前攻击速度折算，然后分别等待伤害点、后摇和冷却。冷却从攻击起手开始计时，起手时取攻速快照，后续按真实秒数递减，避免一边先折算冷却、一边再次乘攻速。
- JASS 的 `EVENT_PLAYER_UNIT_ATTACKED` 与 `EVENT_UNIT_ATTACKED` 在攻击起手触发；命中、武器被动伤害和弹道则留到 `dmgpt1`。如果目标死亡、离开武器范围，或单位转入移动、施法、眩晕，未到伤害点的攻击会取消。
- 攻击者先转到 `AttackHalfAngle` 范围内才起手。移动与攻击转向都按单位数据中的 `turnRate` 逐个 0.05 秒模拟步长转动；移动窗口读取单位 `propWin`，攻击窗口读取原图常量。建筑不套用单位转身。
- MDX 存在 Attack 序列时，序列按原图攻击总时长播放；没有对应序列时使用程序模型回退动画。远景单位仍降低骨骼姿势重算频率，但粒子与 Ribbon 的时间推进已经从骨骼姿势更新中分离。
- 六职业武器攻击、地图攻击触发器、弹道伤害点和攻击取消已由 `tests/map-runtime.test.js` 覆盖；转身单位换算与攻速折算由 `tests/unit-timing.test.js` 覆盖；远景动画与粒子更新由 `tests/unit-visibility.test.js` 覆盖。

## 仍未完全覆盖的画面资源

项目当前的 `war3-model` 渲染器推进 `ParticleEmitter2` 和 Ribbon，但没有渲染旧式 `ParticleEmitter`。在已解析的单位和效果模型中，以下资源包含旧式发射器，因此这些模型的部分原生粒子仍缺失：

- `units/undead/gargoyle/gargoyle.mdx`
- `units/creeps/reddragonwelp/reddragonwelp.mdx`
- `units/creeps/bronzedragon/bronzedragon.mdx`
- `units/creeps/medivh/medivh.mdx`
- `abilities/spells/orc/lightningbolt/lightningboltmissile.mdx`
- `units/nightelf/ent/ent.mdx`
- `units/undead/obsidianstatue/obsidianstatue.mdx`
- `units/nightelf/riddenhippogryph/riddenhippogryph.mdx`
- `units/nightelf/druidofthetalon/druidofthetalon.mdx`

另外，远景骨骼姿势仍以最多每秒 10 次更新来控制成本；模型保持原始 MDX 和形状，但这不等于远距离逐帧动画一致。此次工作核对了攻击与转向的代码时序，不能据此宣称所有粒子和动作画面已与原客户端逐帧相同。旧式粒子渲染及原客户端画面对照仍是明确缺口。
