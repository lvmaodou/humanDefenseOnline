# 游侠套装建筑尺寸与动画核查

核查日期：2026-11-19，依据 `content/original-3.0/data.json`、归档地图脚本及项目中的原始 MDX。

## 尺寸结论

游侠三种套装的基础建筑 `h007`、`h055`、`h057`，以及升级后的 `h052`、`h053`、`h054`，共用 `buildings/human/humantower/humantower.mdx`。原表六种建筑的 `modelScale` 均为 **1**，选择圈 `scale` 均为 **2.5**；选择圈没有乘进模型缩放。源脚本也没有针对它们调用额外的 `SetUnitScale`。

箭塔本身比多数单位模型高。作为参照，弓箭手 Lv1 的原图模型缩放为 0.8，Lv3 为 1.2；不能将不同模型缩放数值相同理解为实际高度相同。本次保留原图尺寸，没有统一压小套装建筑。

原始 `4x4SimpleSolid` 路径占地只有 128×128，实际石质底座超出此范围。因此放置判断现已按实际底座扩展，默认朝向的完整占地外包尺寸约为 131.6×151.5；预览和服务端用同一个多边形检测沟边与邻近建筑。没有添加支撑裙边或抬高沟壑填平模型。具体规则和六职业清单见 [建造占地核查](build-placement-alignment.md)。

## 已复现的动画错误与修复

原始 HumanTower MDX 包含哨塔、箭塔、炮塔、神秘之塔等互斥形态。游侠三种升级箭塔依靠原表 `Animprops=upgrade,first` 选择箭塔部件。

1. 冰箭和火箭的原始技能指定 `Animnames=attack`，此前这个字段会覆盖建筑的持续动画属性，导致技能播放时从 `Stand Upgrade First Ready Attack` 错切到 `Stand Ready Attack`，视觉上切回哨塔。
2. 模型不存在某个动作时，此前固定回退到列表中的第一个 Stand，也会丢失升级形态。
3. 没有对应模型动画的技能事件会不断重启 Stand，打断当前攻击并使动画跳变。

现在动作属性与建筑形态属性合并选择；回退 Stand 也按相同形态匹配，并降低不相关升级、水中、变身形态的优先级。没有对应动作的技能保留当前动画，让正在播放的攻击继续。建造使用实际 Birth，升级仍使用 Birth Upgrade，不把武器形态动作当作建造动作。

本次确认并修复的是上述可复现的形态切换和动画重置问题，尚未以 Warcraft 原客户端录像完成全部动作的逐帧比较。

## 验证

- `node --test --test-reporter=tap`：156 项通过，含原始塔模型互斥部件显隐、冰火箭技能、连续动作、独立实例、原图缩放及动画回退。日志见 [building-animations-full-tests.log](../artifacts/building-animations-full-tests.log)。
- `node tests/building-animations-smoke.mjs`：在独立服务器同一场景中重现修复前行为，再加载修复代码验证冰、毒、火箭塔；同时检查原始哨塔、弓箭手、其他职业套装和手机显示。结果见 [ranger-tower-animations.json](../artifacts/ranger-tower-animations.json)。
- [修复前画面](../artifacts/ranger-towers-before.png)、[修复后画面](../artifacts/ranger-towers-after.png)、[手机画面](../artifacts/ranger-towers-mobile.png)。修复前画面由浏览器仅替换旧动画选择逻辑复现，资源和场景相同。
- `node tests/construction-smoke.mjs`：建造 Birth、升级 Birth Upgrade、重连恢复进度及升级完成的箭塔形态均通过。旧测试的进度比较改用浮点容差，允许等价的 `0.5000000000000001`。
- `node tests/profession-parity-smoke.mjs`：六职业共 240 种建筑模型、升级、领悟技能、套装自动施法与手机检查通过，无页面、资源和脚本错误。
