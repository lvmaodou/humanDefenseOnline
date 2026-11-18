# 原版画面参数与一致性核查

源地图 SHA-256：`e7740efca962ff58a192c5cf51eb02f8c73308375e32c991f1c8fdf955d27b8d`。以下结论来自归档内容与当前在线版代码的对照，不代表已在 Warcraft 客户端完成全程对比验收。

**结论：地图数据与原始模型资源已接入，部分全局战斗规则和升级效果已按归档修正；完整玩法与画面对照仍未达到 Warcraft 客户端等价验收。**

## 已确认的机制差距

| 项目 | 原图证据 | 当前在线版 |
|---|---|---|
| 全局规则 | war3mapmisc.txt 的 Misc 段包含拾取距离、移速、人口上限、伤害倍率等 | Runtime 从原图规则初始化拾取距离、移动上下限、人口上限及穿刺/法术倍率；返还率等未接入 |
| 拾取距离 | PickupItemRange=99999 | combat.js 按原图距离判定，已覆盖跨 1000 世界单位的回归测试 |
| 移动速度 | MinUnitSpeed=100、MaxUnitSpeed=522，六个建造者的 spd 原始字段为 1500 | 服务器移动和客户端动作速度共用限速后的单位值 |
| 伤害倍率 | DamageBonusPierce、DamageBonusSpells 存在原图覆盖 | Runtime 按原图 8 类护甲顺序覆盖穿刺和法术伤害矩阵 |
| 难度与功勋升级 | R007 的 rhpo、R005 的 ratr 在升级表中定义属性效果，JASS 设置研究等级 | 已将生命回复和远程射程升级接入实时单位属性；其余升级效果仍未完整实现 |
| 装备与原生技能 | 物品与能力表提供被动属性及各种效果 | inventory 可存物品，但尚无完整的装备被动属性聚合；技能分支只覆盖部分原生效果 |
| 移动与碰撞 | 地图有路径、碰撞和阻挡相关字段 | 移动主要为朝目标直线插值；建造检查路径标志不等于完整单位寻路 |
| 弹道与伤害时机 | 单位与技能表有 Missilespeed、Missilearc 等 | 攻击记录 projectile 后立即结算伤害；画面弹道另用近似速度 |

221 个脚本原生调用有对应函数，或 1270 个 JASS 函数已转换，都不等于它们已实现原引擎的全部行为。部分调用为空实现。当前测试覆盖内容导入、启动、首波、完整 56 波触发调度、原图全局战斗参数、R005/R007 升级及选定交互；完整战斗状态下的六职业技能、全部升级/装备和 56 波等价验收仍未完成。

## 地图与屏幕尺寸

原地形为 129 × 129 个顶点，对应 128 × 128 个地形格，每格 128 世界单位，整张地形 16384 × 16384 世界单位，坐标原点偏移 -8192, -8192。

原图 war3map.w3i 的可玩尺寸字段为 116 × 116 格；其镜头边界字段为 -6912, -7424, 6912, 6912, -6912, 6912, 6912, -7424。脚本另调用 SetCameraBounds，使用边距表达式，原文保留在 presentation.json.scriptCameraBounds。

地图文件没有固定“地图在显示器上占多少像素”或“单位固定高多少像素”的字段。屏幕大小由地图世界尺寸、相机投影、镜头距离/角度、窗口分辨率和 UI 可视区域共同决定；单位大小还取决于模型本体几何尺寸与 modelScale。碰撞半径或选择圈字段不能代替模型几何尺寸。

## 源文件相机参数

| 预设 | 字段 | 原始值 |
|---|---|---:|
| gg_cam_yadianna | CAMERA_FIELD_ZOFFSET | 0 |
| gg_cam_yadianna | CAMERA_FIELD_ROTATION | 90 |
| gg_cam_yadianna | CAMERA_FIELD_ANGLE_OF_ATTACK | 304 |
| gg_cam_yadianna | CAMERA_FIELD_TARGET_DISTANCE | 1500 |
| gg_cam_yadianna | CAMERA_FIELD_ROLL | 0 |
| gg_cam_yadianna | CAMERA_FIELD_FIELD_OF_VIEW | 70 |
| gg_cam_yadianna | CAMERA_FIELD_FARZ | 5000 |

预设 gg_cam_yadianna 的目标位置为 (5891.1, -2123.8)；除创建与设置字段外的应用调用共 0 处。当前脚本没有把这个预设应用为普通游玩镜头的证据，不能直接认定其中的距离/视野就是原作日常镜头。

CAMERA_FIELD_TARGET_DISTANCE 是相机至目标的距离，不是离地高度。离地高度还依赖攻击角、目标地形高度和 ZOFFSET。在线运行时已将普通视点初始值切到 Warcraft 默认 distance=1650、angle=304、rotation=90、farZ=5000；地图中未应用的 distance=1500 预设没有冒充普通镜头。投影视野的引擎换算仍需用目标 Warcraft 版本对照。

当前网页使用 PerspectiveCamera 与原始默认相机几何参数，128 个 Warcraft 世界单位映射为 1 个 Three.js 单位，X/Y 转为 Three.js X/Z，地面高度按原始地形数据换算。镜头缩放仍有网页交互；画面尺寸和最终投影需要在相同客户端版本、分辨率及视口下校准。

## 六个操作单位的原始外观

| 职业 | ID | 原模型路径 | modelScale | scale 原始字段 |
|---|---|---|---:|---:|
| 野蛮人 | h001 | units\human\Peasant\Peasant | 1 | 1 |
| 猎人 | h002 | units\human\Peasant\Peasant | 1 | 1 |
| 盗贼 | h000 | units\human\Peasant\Peasant | 1 | 1 |
| 术士 | h004 | units\human\Peasant\Peasant | 1 | 1 |
| 游侠 | h003 | units\human\Peasant\Peasant | 1 | 1 |
| 魔剑士 | h06C | units\human\Peasant\Peasant | 1 | 1 |

六个职业的操作单位都使用 Peasant（人族农民）模型、modelScale=1。当前 models.js 加载原始 Peasant MDX，保留模型比例与农民本来的动作，不按职业另造战士、弓手或法师外形。

## 职业建造单位的模型与比例

下面列出六职业建造菜单的全部单位。网页从原始资源包加载这些 MDX 模型及纹理，并使用原始 modelScale；选择圈 scale 与模型缩放分开使用。屏幕像素高度还依赖最终镜头投影。

### 野蛮人

| 单位 | ID | 模型路径 | modelScale | scale 原始字段 | 弹道模型 | 弹速 |
|---|---|---|---:|---:|---|---:|
| 拳击手(Lv1) | h01K | units\nightelf\MountainGiant\MountainGiant.mdl | 0.6 | 2.5 | Abilities\Weapons\AncientProtectorMissile\AncientProtectorMissile.mdl | 1800 |
| 灭绝师太(Lv1) | h026 | units\creeps\BansheeGhost\BansheeGhost.mdl | 1 | 2.5 | Abilities\Weapons\BansheeMissile\BansheeMissile.mdl | 1800 |
| 拳王(功勋) | h01M | units\human\Muradin\Muradin.mdl | 1.2 | 2.5 | Abilities\Weapons\AncientProtectorMissile\AncientProtectorMissile.mdl | 1800 |
| 马加爵(Lv1) | h022 | units\creeps\LordGarithos\LordGarithos.mdl | 0.8 | 2.5 | Abilities\Weapons\GlaiveMissile\GlaiveMissile.mdl | 1800 |
| 超级猛男(Lv1) | h01Y | units\demon\ChaosWarlord\ChaosWarlord.mdl | 0.8 | 2.5 | Abilities\Weapons\ChimaeraAcidMissile\ChimaeraAcidMissile.mdl | 1800 |
| 恐龙(Lv1) | h024 | units\creeps\ThunderLizardVizier\ThunderLizardVizier.mdl | 0.8 | 2.5 | Abilities\Weapons\FireBallMissile\FireBallMissile.mdl | 1800 |
| 打手(Lv1) | h01D | units\undead\Abomination\Abomination.mdl | 0.6 | 2.5 | Abilities\Weapons\ChimaeraAcidMissile\ChimaeraAcidMissile.mdl | 1800 |
| 驯兽师(Lv1) | h01R | units\orc\KotoBeast\KotoBeast.mdl | 0.8 | 2.5 | Abilities\Weapons\Axe\AxeMissile.mdl | 1800 |
| 肌肉男(Lv1) | h01O | units\orc\Tauren\Tauren.mdl | 0.8 | 2.5 | Abilities\Weapons\FireBallMissile\FireBallMissile.mdl | 1800 |
| 猛女(Lv1) | h01E | units\demon\DemonessBlue\DemonessBlue.mdl | 0.8 | 2.5 | Abilities\Weapons\NecromancerMissile\NecromancerMissile.mdl | 1800 |
| 小混混(Lv1) | h01N | units\orc\Grunt\Grunt.mdl | 0.8 | 2.5 | Abilities\Weapons\ShadowHunterMissile\ShadowHunterMissile.mdl | 1800 |

### 猎人

| 单位 | ID | 模型路径 | modelScale | scale 原始字段 | 弹道模型 | 弹速 |
|---|---|---|---:|---:|---|---:|
| 专家猎人(Lv1) | h018 | units\nightelf\Vengeance\Vengeance.mdl | 1 | 2.5 | Abilities\Weapons\VengeanceMissile\VengeanceMissile.mdl | 0 |
| 摘星手(Lv1) | h019 | units\nightelf\SpiritOfVengeance\SpiritOfVengeance.mdl | 0.8 | 2.5 | Abilities\Weapons\SpiritOfVengeanceMissile\SpiritOfVengeanceMissile.mdl | 0 |
| 猎王 | h01A | units\nightelf\EvilIllidan\IllidanEvil.mdl | 1.2 | 2.5 | Abilities\Weapons\DemonHunterMissile\DemonHunterMissile.mdl | 0 |
| 纵火者(Lv1) | h011 | Units\Creeps\HeroFlameLord\HeroFlameLord.mdl | 0.8 | 2.5 | Abilities\Weapons\LordofFlameMissile\LordofFlameMissile.mdl | 0 |
| 雷光舞者(Lv1) | h010 | units\nightelf\herowarden\herowarden.mdl | 0.8 | 2.5 | Abilities\Spells\NightElf\shadowstrike\ShadowStrikeMissile.mdl | 0 |
| 狼王(Lv1) | h00X | units\orc\HeroFarSeer\HeroFarSeer.mdl | 0.8 | 2.5 | Abilities\Weapons\FarseerMissile\FarseerMissile.mdl | 0 |
| 高级猎人(Lv1) | h00T | units\creeps\assassin\assassin.mdl | 0.8 | 2.5 | Abilities\Weapons\KeeperGroveMissile\KeeperGroveMissile.mdl | 0 |
| 猎术师(Lv1) | h00R | units\nightelf\Furion\Furion.mdl | 0.8 | 2.5 | Abilities\Weapons\KeeperGroveMissile\KeeperGroveMissile.mdl | 0 |
| 猎人长者(Lv1) | h00P | units\creeps\watcher\watcher.mdl | 0.8 | 2.5 | Abilities\Weapons\SentinelMissile\SentinelMissile.mdl | 0 |
| 丛林使者(Lv1) | h00H | units\nightelf\DruidoftheClaw\DruidoftheClaw.mdl | 0.6 | 2.5 | Abilities\Weapons\GuardTowerMissile\GuardTowerMissile.mdl | 0 |
| 女猎手(Lv1) | h00L | units\nightelf\Huntress\Huntress.mdl | 0.8 | 2.5 | Abilities\Weapons\SentinelMissile\SentinelMissile.mdl | 0 |

### 盗贼

| 单位 | ID | 模型路径 | modelScale | scale 原始字段 | 弹道模型 | 弹速 |
|---|---|---|---:|---:|---|---:|
| 抢劫犯(Lv1) | h04D | units\creeps\BanditLord\BanditLord.mdl | 0.8 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 仲裁者(Lv1) | h04X | units\orc\Thrall\Thrall.mdl | 0.8 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 盗圣(财富) | h04R | units\demon\HeroChaosBladeMaster\HeroChaosBladeMaster.mdl | 1.2 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 蒙面刺客(Lv1) | h04U | units\undead\Acolyte\Acolyte.mdl | 1 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 神偷世家(Lv1) | h04S | units\demon\ChaosWolfRider\ChaosWolfRider.mdl | 0.8 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 魔法大盗(Lv1) | h04O | units\orc\WitchDoctor\WitchDoctor.mdl | 0.8 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 强盗(Lv1) | h049 | units\creeps\Bandit\Bandit.mdl | 0.8 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 小小强(Lv1) | h04M | units\critters\VillagerKid1\VillagerKid1.mdl | 1 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 小偷工程师(Lv1) | h04J | units\creeps\IronGolem\IronGolem.mdl | 0.8 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 电光小贼(Lv1) | h04E | units\orc\HeadHunter\HeadHunter.mdl | 0.8 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |
| 扒手(Lv1) | h044 | units\undead\Ghoul\Ghoul.mdl | 0.8 | 2.5 | Objects\InventoryItems\PotofGold\PotofGold.mdl | 1800 |

### 术士

| 单位 | ID | 模型路径 | modelScale | scale 原始字段 | 弹道模型 | 弹速 |
|---|---|---|---:|---:|---|---:|
| 魔法院长(Lv1) | h02G | units\creeps\Medivh\Medivh.mdl | 0.8 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 勾魂魔女(Lv1) | h032 | units\human\Sorceress\Sorceress.mdl | 1 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 魔神(功勋) | h02F | units\other\HeroArchMageGhost\HeroArchMageGhost.mdl | 1.2 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 掌凤术士(Lv1) | h02X | units\human\HeroBloodElf\HeroBloodElf.mdl | 0.8 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 冰魄法师(Lv1) | h02Z | units\nightelf\HeroKeeperoftheGroveGhost\HeroKeeperoftheGroveGhost.mdl | 0.8 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 波浪术士(Lv1) | h02T | Units\Naga\NagaSiren\NagaSiren.mdl | 0.8 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 魔法学长(Lv1) | h02D | units\human\Priest\Priest.mdl | 0.8 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 凤凰天祥(Lv1) | h02Q | units\human\phoenix\phoenix.mdl | 0.8 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 召唤师(Lv1) | h02O | units\undead\Kelthuzad\Kelthuzad.mdl | 1 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 暴风术士(Lv1) | h02L | units\creeps\ChaosWarlockGreen\ChaosWarlockGreen.mdl | 0.8 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |
| 魔法学徒(Lv1) | h02A | units\creeps\HumanMage\HumanMage.mdl | 0.8 | 2.5 | Abilities\Spells\Other\FrostBolt\FrostBoltMissile.mdl | 1200 |

### 游侠

| 单位 | ID | 模型路径 | modelScale | scale 原始字段 | 弹道模型 | 弹速 |
|---|---|---|---:|---:|---|---:|
| 神射手(Lv1) | h03G | Units\Creeps\BansheeRanger\BansheeRanger.mdl | 1 | 2.5 | Abilities\Weapons\Arrow\ArrowMissile.mdl | 1200 |
| 娜迦游侠(Lv1) | h041 | units\naga\HeroNagaSeawitch\HeroNagaSeawitch.mdl | 1 | 2.5 | Abilities\Weapons\NagaArrowMissile\NagaArrowMissile.mdl | 1200 |
| 后羿(战绩) | h043 | units\nightelf\HeroMoonPriestess\HeroMoonPriestess.mdl | 1.5 | 2.5 | Abilities\Weapons\Arrow\ArrowMissile.mdl | 1200 |
| 火雨专家(Lv1) | h03W | units\orc\spiritwalker\spiritwalker.mdl | 0.8 | 2.5 | Abilities\Weapons\SorceressMissile\SorceressMissile.mdl | 1200 |
| 烈火游侠(Lv1) | h03Y | units\creeps\HighElfArcher\HighElfArcher.mdl | 0.8 | 2.5 | Abilities\Weapons\Arrow\ArrowMissile.mdl | 1200 |
| 冰箭射手(Lv1) | h03S | units\creeps\SylvanusWindrunner\SylvanusWindrunner.mdl | 0.8 | 2.5 | Abilities\Weapons\MoonPriestessMissile\MoonPriestessMissile.mdl | 1200 |
| 高级射手(Lv1) | h03D | units\nightelf\Shandris\Shandris.mdl | 0.8 | 2.5 | Abilities\Weapons\Arrow\ArrowMissile.mdl | 1200 |
| 五毒女妖(Lv1) | h03Q | units\nightelf\Dryad\Dryad.mdl | 0.8 | 2.5 | Abilities\Weapons\FireBallMissile\FireBallMissile.mdl | 1200 |
| 刀轮射手(Lv1) | h03M | units\nightelf\Runner\Runner.mdl | 0.8 | 2.5 | Abilities\Weapons\Arrow\ArrowMissile.mdl | 1200 |
| 灵魂射手(Lv1) | h03N | units\creeps\SkeletonArcher\SkeletonArcher.mdl | 0.8 | 2.5 | Abilities\Weapons\FireBallMissile\FireBallMissile.mdl | 1200 |
| 弓箭手(Lv1) | h03J | units\nightelf\Archer\Archer.mdl | 0.8 | 2.5 | Abilities\Weapons\Arrow\ArrowMissile.mdl | 1200 |

### 魔剑士

| 单位 | ID | 模型路径 | modelScale | scale 原始字段 | 弹道模型 | 弹速 |
|---|---|---|---:|---:|---|---:|
| 将军(Lv1) | h06K | units\human\ArthaswithSword\ArthaswithSword.mdl | 0.8 | 2.5 | Abilities\Weapons\Banditmissile\Banditmissile.mdl | 1800 |
| 刀圣(Lv1) | h075 | units\demon\ChaosHellscream\ChaosHellscream.mdl | 0.8 | 2.5 | Abilities\Weapons\GryphonRiderMissile\GryphonRiderMissile.mdl | 1800 |
| 剑魔(功勋) | h077 | units\other\Proudmoore\Proudmoore.mdl | 1.6 | 2.5 | Abilities\Weapons\IllidanMissile\IllidanMissile.mdl | 2000 |
| 喷火兵(Lv1) | h073 | Units\Critters\ChaosSpaceOrc\ChaosSpaceOrc.mdl | 0.8 | 2.5 | Abilities\Weapons\FireBallMissile\FireBallMissile.mdl | 1400 |
| 剑客(Lv1) | h06Z | units\orc\HeroBladeMaster\HeroBladeMaster.mdl | 0.8 | 2.5 | Abilities\Weapons\DragonHawkMissile\DragonHawkMissile.mdl | 1400 |
| 刀客(Lv1) | h06W | units\human\BloodElfSpellThief\BloodElfSpellThief.mdl | 0.8 | 2.5 | Abilities\Weapons\BloodElfSpellThiefMISSILE\BloodElfSpellThiefMISSILE.mdl | 1400 |
| 圣堂武士(Lv1) | h06H | units\creeps\RevenantOfTheWaves\RevenantOfTheWaves.mdl | 0.8 | 2.5 | Abilities\Weapons\Banditmissile\Banditmissile.mdl | 1400 |
| 机枪兵(Lv1) | h06T | Units\Critters\Marine\Marine.mdl | 0.8 | 2.5 | Abilities\Weapons\Rifle\RifleImpact.mdl | 1000 |
| 剑士(Lv1) | h06P | units\human\TheCaptain\TheCaptain.mdl | 0.8 | 2.5 | Abilities\Weapons\QuillSprayMissile\QuillSprayMissile.mdl | 1000 |
| 刀狼骑士(Lv1) | h06N | units\orc\WolfRider\WolfRider.mdl | 0.8 | 2.5 | Abilities\Spells\Orc\Ensnare\EnsnareMissile.mdl | 1000 |
| 步兵(Lv1) | h06E | units\human\Footman\Footman.mdl | 0.8 | 2.5 | abilities\weapons\TuskarSpear\TuskarSpear.mdl | 1000 |

## 56 波与 Boss 的外观

| 波次 | 单位 | ID | 模型路径 | modelScale | scale 原始字段 |
|---|---|---|---|---:|---:|
| 1 | 水晶阿卡那瑟德 | nanc | Units\Creeps\ArchnathidGreen\ArchnathidGreen | 0.65 | 1.2 |
| 2 | 阿卡那瑟德领主 | nano | Units\Creeps\Archnathidpurple\Archnathidpurple | 0.7 | 1.8 |
| 3 | 强盗 | nban | units\creeps\Bandit\Bandit | 1 | 1 |
| 4 | 强盗领主 | nbld | units\creeps\BanditLord\BanditLord | 1 | 1.25 |
| 5 | 龙卵盗贼 | nbdm | Units\Creeps\DragonSpawnBlue\DragonSpawnBlue | 0.6 | 1.8 |
| 6 | 龙卵领主 | nbdo | Units\Creeps\DragonSpawnBlue\DragonSpawnBlue | 0.8 | 2.5 |
| 7 | 半人马苦工 | ncer | units\creeps\Centaur\Centaur | 1 | 1 |
| 8 | 半人马可汗 | ncnk | units\creeps\CentaurKhan\CentaurKhan | 1.2 | 1.85 |
| 9 | 蜘蛛螃蟹 | nscb | units\creeps\SpiderCrabCreep\SpiderCrabCreep | 0.8 | 1.2 |
| 10 | 蜘蛛螃蟹巨兽 | nsc3 | units\creeps\SpiderCrabCreep\SpiderCrabCreep | 1 | 1.72 |
| 11 | 石像鬼 | ugar | units\undead\Gargoyle\Gargoyle | 1 | 1.25 |
| 12 | 不死族巫师 | unec | units\undead\Necromancer\Necromancer | 1 | 1.25 |
| 13 | 穴居恶魔 | ucry | units\undead\CryptFiend\CryptFiend | 0.7 | 1.85 |
| 14 | 绞肉车 | umtw | units\undead\MeatWagon\MeatWagon | 0.8 | 2.5 |
| 15 | 红幼龙 | nrdk | units\creeps\RedDragonWelp\RedDragonWelp | 0.7 | 1.75 |
| 16 | 青龙 | nbzd | units\creeps\BronzeDragon\BronzeDragon | 1 | 2.25 |
| 17 | 耐瑟龙 | nndr | units\creeps\NetherDragon\NetherDragon | 1 | 2 |
| 18 | 暗礁元素 | nrel | Units\Creeps\SeaElemental\SeaElemental | 0.7 | 1.6 |
| 19 | 狂暴元素 | nelb | units\human\WaterElemental\WaterElemental | 1 | 1.6 |
| 20 | 堕落树人 | nenc | units\creeps\CorruptedEnt\CorruptedEnt | 0.9 | 1 |
| 21 | 埃瑞达男巫 | ners | units\demon\EredarWarlock\EredarWarlock | 1 | 2 |
| 22 | 无名恐怖者 | nfot | Units\Creeps\FacelessOne\FacelessOne | 1.2 | 2 |
| 23 | 血恶魔 | nfgb | units\demon\Felgaurd\Felgaurd | 1 | 1.35 |
| 24 | 狂暴野兽 | npfl | units\creeps\FelstalkerPurple\FelstalkerPurple | 0.8 | 1.2 |
| 25 | 熊猫 | nfrp | units\creeps\FurbolgPanda\FurbolgPanda | 0.8 | 1 |
| 26 | 熊怪乌萨战士 | nfra | units\creeps\FurbolgElder\FurbolgElder | 1 | 1.75 |
| 27 | 幽魂 | ngh2 | units\creeps\BansheeGhost\BansheeGhost | 1.2 | 1 |
| 28 | 深海巨兽 | nsgb | Units\Creeps\SeaGiant\SeaGiant | 0.8 | 3 |
| 29 | 血浴之母 | nsbm | units\creeps\SpiderBlue\SpiderBlue | 1.2 | 1.5 |
| 30 | 豺狼首领 | ngnv | units\creeps\GnollOverseer\GnollOverseer | 1.2 | 1 |
| 31 | 花岗岩傀儡 | nggr | units\creeps\RockGolem\RockGolem | 1 | 3 |
| 32 | 战争傀儡 | nwrg | units\creeps\GolemStatue\GolemStatue | 1 | 1.9 |
| 33 | 女妖女皇 | nhrq | units\creeps\HarpyQueen\HarpyQueen | 1.5 | 2 |
| 34 | 异教徒 | nhhr | units\undead\Acolyte\Acolyte | 1.5 | 1.25 |
| 35 | 远古九头怪蛇 | nahy | Units\Creeps\Hydra\Hydra | 1 | 3 |
| 36 | 冰魔牧师 | nitp | units\creeps\IceTrollShadowPriest\IceTrollShadowPriest | 1 | 1 |
| 37 | 冰魔首领 | nitw | units\creeps\IceTroll\IceTroll | 1.2 | 1 |
| 38 | 地狱战舰 | nina | units\creeps\InfernalCannonFlame\InfernalCannonFlame | 1 | 3.5 |
| 39 | 狗头人首领 | nkol | units\creeps\Kobold\Kobold | 1 | 1 |
| 40 | 风暴巨龙 | nstw | units\creeps\ThunderLizard\ThunderLizard | 1 | 3 |
| 41 | 巨虾 | nlpr | Units\Creeps\Lobstrokkred\Lobstrokkred | 0.5 | 1.4 |
| 42 | 马库拉潮汐领主 | nlkl | Units\Creeps\Lobstrokkgreen\Lobstrokkgreen | 0.8 | 2.5 |
| 43 | 黑暗巫师 | nwzd | units\creeps\BanditMage\BanditMage | 1.2 | 1.5 |
| 44 | 玛格娜托破坏者 | nmgd | Units\Creeps\MagnataurBlue\MagnataurBlue | 1 | 3 |
| 45 | 穆格尔影子法师 | nmsc | Units\Creeps\MurgulShadowCaster\MurgulShadowCaster | 1.2 | 1.5 |
| 46 | 变异两栖人 | nmmu | units\creeps\MurlocMutant\MurlocMutant | 2 | 1 |
| 47 | 蛛网怪女皇 | nnwq | units\creeps\NerubianQueen\NerubianQueen | 1.2 | 2 |
| 48 | 食人鬼首领 | nogl | units\creeps\OgreLord\OgreLord | 1.2 | 2 |
| 49 | 暴怒野兽 | nowe | units\creeps\Owlbear\Owlbear | 1 | 1.8 |
| 50 | 北极熊 | nplb | units\creeps\PolarBear\PolarBear | 0.8 | 1.8 |
| 51 | 北极熊怪战士 | nfpc | units\creeps\PolarFurbolg\PolarFurbolg | 1 | 1.5 |
| 52 | 尖毛兽酋长 | nrzg | units\creeps\RazorManeChief\RazorManeChief | 1.5 | 1 |
| 53 | 深渊领主幽灵 | nlrv | units\creeps\RevenantOfTheWaves\RevenantOfTheWaves | 1.5 | 1 |
| 54 | 虚无行者 | nvdw | units\creeps\VoidWalker\VoidWalker | 1.15 | 1.2 |
| 55 | 远古雪怪 | nwna | units\creeps\Wendigo\Wendigo | 1 | 1.5 |
| 56 | 地狱火 | ninf | units\demon\Infernal\Infernal | 0.8 | 2.5 |
| Boss 10 | 死亡骑士 | Udea | units\undead\HeroDeathKnight\HeroDeathKnight | 2 | 1.85 |
| Boss 20 | 巫妖 | Ulic | units\undead\HeroLich\HeroLich | 2 | 1.25 |
| Boss 30 | 恐惧魔王 | Udre | units\undead\HeroDreadLord\HeroDreadLord | 2 | 1.5 |
| Boss 40 | 地穴领主 | Ucrl | units\undead\HeroCryptLord\HeroCryptLord | 2 | 1.85 |
| Boss 50 | 娜迦女海巫 | Hvsh | units\demon\HeroPitLord\HeroPitLord.mdl | 2.5 | 1.5 |
| 终局 | 邪恶女神之奴 | H05V | Units\Naga\NagaSummoner\NagaSummoner.mdl | 3 | 1.5 |

## 技能动画、动作与资源依赖

原图技能字符串表包含 Animnames（动作选择）、Missileart/Missilespeed（弹道）、Specialart、Areaeffectart、附着点、音效等信息；JASS 还会创建模型特效和闪电。

- 闪烁 A04D：Animnames=spell,throw，Areaeffectart=Abilities\Spells\NightElf\Blink\BlinkTarget.mdl，Specialart=Abilities\Spells\NightElf\Blink\BlinkCaster.mdl。
- 冲击波 A033：Animnames=attack,slam，Missileart=Abilities\Spells\Orc\Shockwave\ShockwaveMissile.mdl，Missilespeed=600。

在线版从 Warcraft 资源档案读取对应 MDX 的骨骼、动作序列、材质层、粒子与拖尾，并由实时 Three.js 场景使用同一 WebGL 上下文绘制；在客户端原资源可用时不将模型先转成录像或精灵图。缺失或原生渲染器尚不支持的特效仍会使用程序化效果作为回退。

地图内嵌的模型：`war3mapimported\laser.mdx`、`war3mapimported\loadingscreen.mdx`。已额外接入固定资源版本的经典 Warcraft III 客户端模型资源；当前原职业、建筑、56 波与首领模型覆盖表及动作信息见 [原版视觉复原记录](original-visual-restoration.md)。

war3map.doo 记录了 266 个装饰物/可破坏物摆放条目。在线版读取其原始摆放位置、变体、旋转和缩放并按资源表加载模型；完整地图色彩、悬崖光照、战争迷雾及客户端材质需要在 Warcraft 客户端逐项核对。

## 完整数据与后续还原顺序

[presentation.json](../content/original-3.0/presentation.json) 保存全部单位视觉字段、全部已读技能视觉字段、原图 W3I 信息、镜头预设、全局常量和嵌入模型清单。

尚未完成应用原图全局规则、升级与全部装备技能效果。也尚未在相同目标分辨率、视口和客户端渲染设置下完成逐像素验收；资源覆盖和模型动作已接入不代表最终画面已经像素级等同原作。
