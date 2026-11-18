# 原版视觉资源与验证记录

地图 SHA-256：`e7740efca962ff58a192c5cf51eb02f8c73308375e32c991f1c8fdf955d27b8d`。

Three.js 负责地图、镜头、深度缓冲和交互；同一 WebGL 上下文中的 MDX 渲染器实时计算原始骨骼、材质层、粒子和拖尾。模型不是录像或预渲染图片。

资源库：[WarRaft/War3.mpq](https://github.com/WarRaft/War3.mpq)，固定提交 `bce1f9d87ab7d71e208624dbbdce208db5690d4f`；解析器 war3-model 4.0.1。归档中有 291 个模型、1057 个资源，逐文件 SHA-256 见 public/warcraft/manifest.json。

六职业建造者都使用 Peasant，模型缩放 1。模型缩放与选择圈缩放独立。世界坐标统一为 128 魔兽单位 = 1 Three.js 单位，Y 轴取反转到 Three 的 Z 轴；不再额外放大地形高度。原图 266 处装饰物使用原始位置、旋转、变体、缩放和换皮。

普通相机从 Blizzard.j 的 distance 1650、angleOfAttack 304、FOV 70、rotation 90、farZ 5000 开始。地图保存的 distance 1500 相机未找到应用调用，不能当成默认镜头。投影换算需对照相应版本客户端确认，不能仅凭参数宣称像素一致。

职业、建筑、56 波与首领模型：134/134 已找到；缺失：无。

| 单位 | 名称 | 模型缩放 | 选择圈缩放 | 原始模型 | 资源 |
| --- | --- | --- | --- | --- | --- |
| nanc | 水晶阿卡那瑟德 | 0.65 | 1.2 | units/creeps/archnathidgreen/archnathidgreen.mdx | 已接入 |
| nano | 阿卡那瑟德领主 | 0.7 | 1.8 | units/creeps/archnathidpurple/archnathidpurple.mdx | 已接入 |
| nban | 强盗 | 1 | 1 | units/creeps/bandit/bandit.mdx | 已接入 |
| nbld | 强盗领主 | 1 | 1.25 | units/creeps/banditlord/banditlord.mdx | 已接入 |
| nbdm | 龙卵盗贼 | 0.6 | 1.8 | units/creeps/dragonspawnblue/dragonspawnblue.mdx | 已接入 |
| nbdo | 龙卵领主 | 0.8 | 2.5 | units/creeps/dragonspawnblue/dragonspawnblue.mdx | 已接入 |
| ncer | 半人马苦工 | 1 | 1 | units/creeps/centaur/centaur.mdx | 已接入 |
| ncnk | 半人马可汗 | 1.2 | 1.85 | units/creeps/centaurkhan/centaurkhan.mdx | 已接入 |
| nscb | 蜘蛛螃蟹 | 0.8 | 1.2 | units/creeps/spidercrabcreep/spidercrabcreep.mdx | 已接入 |
| nsc3 | 蜘蛛螃蟹巨兽 | 1 | 1.72 | units/creeps/spidercrabcreep/spidercrabcreep.mdx | 已接入 |
| ugar | 石像鬼 | 1 | 1.25 | units/undead/gargoyle/gargoyle.mdx | 已接入 |
| unec | 不死族巫师 | 1 | 1.25 | units/undead/necromancer/necromancer.mdx | 已接入 |
| ucry | 穴居恶魔 | 0.7 | 1.85 | units/undead/cryptfiend/cryptfiend.mdx | 已接入 |
| umtw | 绞肉车 | 0.8 | 2.5 | units/undead/meatwagon/meatwagon.mdx | 已接入 |
| nrdk | 红幼龙 | 0.7 | 1.75 | units/creeps/reddragonwelp/reddragonwelp.mdx | 已接入 |
| nbzd | 青龙 | 1 | 2.25 | units/creeps/bronzedragon/bronzedragon.mdx | 已接入 |
| nndr | 耐瑟龙 | 1 | 2 | units/creeps/netherdragon/netherdragon.mdx | 已接入 |
| nrel | 暗礁元素 | 0.7 | 1.6 | units/creeps/seaelemental/seaelemental.mdx | 已接入 |
| nelb | 狂暴元素 | 1 | 1.6 | units/human/waterelemental/waterelemental.mdx | 已接入 |
| nenc | 堕落树人 | 0.9 | 1 | units/creeps/corruptedent/corruptedent.mdx | 已接入 |
| ners | 埃瑞达男巫 | 1 | 2 | units/demon/eredarwarlock/eredarwarlock.mdx | 已接入 |
| nfot | 无名恐怖者 | 1.2 | 2 | units/creeps/facelessone/facelessone.mdx | 已接入 |
| nfgb | 血恶魔 | 1 | 1.35 | units/demon/felgaurd/felgaurd.mdx | 已接入 |
| npfl | 狂暴野兽 | 0.8 | 1.2 | units/creeps/felstalkerpurple/felstalkerpurple.mdx | 已接入 |
| nfrp | 熊猫 | 0.8 | 1 | units/creeps/furbolgpanda/furbolgpanda.mdx | 已接入 |
| nfra | 熊怪乌萨战士 | 1 | 1.75 | units/creeps/furbolgelder/furbolgelder.mdx | 已接入 |
| ngh2 | 幽魂 | 1.2 | 1 | units/creeps/bansheeghost/bansheeghost.mdx | 已接入 |
| nsgb | 深海巨兽 | 0.8 | 3 | units/creeps/seagiant/seagiant.mdx | 已接入 |
| nsbm | 血浴之母 | 1.2 | 1.5 | units/creeps/spiderblue/spiderblue.mdx | 已接入 |
| ngnv | 豺狼首领 | 1.2 | 1 | units/creeps/gnolloverseer/gnolloverseer.mdx | 已接入 |
| nggr | 花岗岩傀儡 | 1 | 3 | units/creeps/rockgolem/rockgolem.mdx | 已接入 |
| nwrg | 战争傀儡 | 1 | 1.9 | units/creeps/golemstatue/golemstatue.mdx | 已接入 |
| nhrq | 女妖女皇 | 1.5 | 2 | units/creeps/harpyqueen/harpyqueen.mdx | 已接入 |
| nhhr | 异教徒 | 1.5 | 1.25 | units/undead/acolyte/acolyte.mdx | 已接入 |
| nahy | 远古九头怪蛇 | 1 | 3 | units/creeps/hydra/hydra.mdx | 已接入 |
| nitp | 冰魔牧师 | 1 | 1 | units/creeps/icetrollshadowpriest/icetrollshadowpriest.mdx | 已接入 |
| nitw | 冰魔首领 | 1.2 | 1 | units/creeps/icetroll/icetroll.mdx | 已接入 |
| nina | 地狱战舰 | 1 | 3.5 | units/creeps/infernalcannonflame/infernalcannonflame.mdx | 已接入 |
| nkol | 狗头人首领 | 1 | 1 | units/creeps/kobold/kobold.mdx | 已接入 |
| nstw | 风暴巨龙 | 1 | 3 | units/creeps/thunderlizard/thunderlizard.mdx | 已接入 |
| nlpr | 巨虾 | 0.5 | 1.4 | units/creeps/lobstrokkred/lobstrokkred.mdx | 已接入 |
| nlkl | 马库拉潮汐领主 | 0.8 | 2.5 | units/creeps/lobstrokkgreen/lobstrokkgreen.mdx | 已接入 |
| nwzd | 黑暗巫师 | 1.2 | 1.5 | units/creeps/banditmage/banditmage.mdx | 已接入 |
| nmgd | 玛格娜托破坏者 | 1 | 3 | units/creeps/magnataurblue/magnataurblue.mdx | 已接入 |
| nmsc | 穆格尔影子法师 | 1.2 | 1.5 | units/creeps/murgulshadowcaster/murgulshadowcaster.mdx | 已接入 |
| nmmu | 变异两栖人 | 2 | 1 | units/creeps/murlocmutant/murlocmutant.mdx | 已接入 |
| nnwq | 蛛网怪女皇 | 1.2 | 2 | units/creeps/nerubianqueen/nerubianqueen.mdx | 已接入 |
| nogl | 食人鬼首领 | 1.2 | 2 | units/creeps/ogrelord/ogrelord.mdx | 已接入 |
| nowe | 暴怒野兽 | 1 | 1.8 | units/creeps/owlbear/owlbear.mdx | 已接入 |
| nplb | 北极熊 | 0.8 | 1.8 | units/creeps/polarbear/polarbear.mdx | 已接入 |
| nfpc | 北极熊怪战士 | 1 | 1.5 | units/creeps/polarfurbolg/polarfurbolg.mdx | 已接入 |
| nrzg | 尖毛兽酋长 | 1.5 | 1 | units/creeps/razormanechief/razormanechief.mdx | 已接入 |
| nlrv | 深渊领主幽灵 | 1.5 | 1 | units/creeps/revenantofthewaves/revenantofthewaves.mdx | 已接入 |
| nvdw | 虚无行者 | 1.15 | 1.2 | units/creeps/voidwalker/voidwalker.mdx | 已接入 |
| nwna | 远古雪怪 | 1 | 1.5 | units/creeps/wendigo/wendigo.mdx | 已接入 |
| ninf | 地狱火 | 0.8 | 2.5 | units/demon/infernal/infernal.mdx | 已接入 |
| Udea | 死亡骑士 | 2 | 1.85 | units/undead/herodeathknight/herodeathknight.mdx | 已接入 |
| Ulic | 巫妖 | 2 | 1.25 | units/undead/herolich/herolich.mdx | 已接入 |
| Udre | 恐惧魔王 | 2 | 1.5 | units/undead/herodreadlord/herodreadlord.mdx | 已接入 |
| Ucrl | 地穴领主 | 2 | 1.85 | units/undead/herocryptlord/herocryptlord.mdx | 已接入 |
| Hvsh | 娜迦女海巫 | 2.5 | 1.5 | units/demon/heropitlord/heropitlord.mdx | 已接入 |
| H05V | 邪恶女神之奴 | 3 | 1.5 | units/naga/nagasummoner/nagasummoner.mdx | 已接入 |
| h001 | 野蛮人 | 1 | 1 | units/human/peasant/peasant.mdx | 已接入 |
| h01K | 拳击手(Lv1) | 0.6 | 2.5 | units/nightelf/mountaingiant/mountaingiant.mdx | 已接入 |
| h026 | 灭绝师太(Lv1) | 1 | 2.5 | units/creeps/bansheeghost/bansheeghost.mdx | 已接入 |
| h01M | 拳王(功勋) | 1.2 | 2.5 | units/human/muradin/muradin.mdx | 已接入 |
| h022 | 马加爵(Lv1) | 0.8 | 2.5 | units/creeps/lordgarithos/lordgarithos.mdx | 已接入 |
| h01Y | 超级猛男(Lv1) | 0.8 | 2.5 | units/demon/chaoswarlord/chaoswarlord.mdx | 已接入 |
| h024 | 恐龙(Lv1) | 0.8 | 2.5 | units/creeps/thunderlizardvizier/thunderlizardvizier.mdx | 已接入 |
| h01D | 打手(Lv1) | 0.6 | 2.5 | units/undead/abomination/abomination.mdx | 已接入 |
| h01R | 驯兽师(Lv1) | 0.8 | 2.5 | units/orc/kotobeast/kotobeast.mdx | 已接入 |
| h01O | 肌肉男(Lv1) | 0.8 | 2.5 | units/orc/tauren/tauren.mdx | 已接入 |
| h01E | 猛女(Lv1) | 0.8 | 2.5 | units/demon/demonessblue/demonessblue.mdx | 已接入 |
| h01N | 小混混(Lv1) | 0.8 | 2.5 | units/orc/grunt/grunt.mdx | 已接入 |
| h002 | 猎人 | 1 | 1 | units/human/peasant/peasant.mdx | 已接入 |
| h018 | 专家猎人(Lv1) | 1 | 2.5 | units/nightelf/vengeance/vengeance.mdx | 已接入 |
| h019 | 摘星手(Lv1) | 0.8 | 2.5 | units/nightelf/spiritofvengeance/spiritofvengeance.mdx | 已接入 |
| h01A | 猎王 | 1.2 | 2.5 | units/nightelf/evilillidan/illidanevil.mdx | 已接入 |
| h011 | 纵火者(Lv1) | 0.8 | 2.5 | units/creeps/heroflamelord/heroflamelord.mdx | 已接入 |
| h010 | 雷光舞者(Lv1) | 0.8 | 2.5 | units/nightelf/herowarden/herowarden.mdx | 已接入 |
| h00X | 狼王(Lv1) | 0.8 | 2.5 | units/orc/herofarseer/herofarseer.mdx | 已接入 |
| h00T | 高级猎人(Lv1) | 0.8 | 2.5 | units/creeps/assassin/assassin.mdx | 已接入 |
| h00R | 猎术师(Lv1) | 0.8 | 2.5 | units/nightelf/furion/furion.mdx | 已接入 |
| h00P | 猎人长者(Lv1) | 0.8 | 2.5 | units/creeps/watcher/watcher.mdx | 已接入 |
| h00H | 丛林使者(Lv1) | 0.6 | 2.5 | units/nightelf/druidoftheclaw/druidoftheclaw.mdx | 已接入 |
| h00L | 女猎手(Lv1) | 0.8 | 2.5 | units/nightelf/huntress/huntress.mdx | 已接入 |
| h000 | 盗贼 | 1 | 1 | units/human/peasant/peasant.mdx | 已接入 |
| h04D | 抢劫犯(Lv1) | 0.8 | 2.5 | units/creeps/banditlord/banditlord.mdx | 已接入 |
| h04X | 仲裁者(Lv1) | 0.8 | 2.5 | units/orc/thrall/thrall.mdx | 已接入 |
| h04R | 盗圣(财富) | 1.2 | 2.5 | units/demon/herochaosblademaster/herochaosblademaster.mdx | 已接入 |
| h04U | 蒙面刺客(Lv1) | 1 | 2.5 | units/undead/acolyte/acolyte.mdx | 已接入 |
| h04S | 神偷世家(Lv1) | 0.8 | 2.5 | units/demon/chaoswolfrider/chaoswolfrider.mdx | 已接入 |
| h04O | 魔法大盗(Lv1) | 0.8 | 2.5 | units/orc/witchdoctor/witchdoctor.mdx | 已接入 |
| h049 | 强盗(Lv1) | 0.8 | 2.5 | units/creeps/bandit/bandit.mdx | 已接入 |
| h04M | 小小强(Lv1) | 1 | 2.5 | units/critters/villagerkid1/villagerkid1.mdx | 已接入 |
| h04J | 小偷工程师(Lv1) | 0.8 | 2.5 | units/creeps/irongolem/irongolem.mdx | 已接入 |
| h04E | 电光小贼(Lv1) | 0.8 | 2.5 | units/orc/headhunter/headhunter.mdx | 已接入 |
| h044 | 扒手(Lv1) | 0.8 | 2.5 | units/undead/ghoul/ghoul.mdx | 已接入 |
| h004 | 术士 | 1 | 1 | units/human/peasant/peasant.mdx | 已接入 |
| h02G | 魔法院长(Lv1) | 0.8 | 2.5 | units/creeps/medivh/medivh.mdx | 已接入 |
| h032 | 勾魂魔女(Lv1) | 1 | 2.5 | units/human/sorceress/sorceress.mdx | 已接入 |
| h02F | 魔神(功勋) | 1.2 | 2.5 | units/other/heroarchmageghost/heroarchmageghost.mdx | 已接入 |
| h02X | 掌凤术士(Lv1) | 0.8 | 2.5 | units/human/herobloodelf/herobloodelf.mdx | 已接入 |
| h02Z | 冰魄法师(Lv1) | 0.8 | 2.5 | units/nightelf/herokeeperofthegroveghost/herokeeperofthegroveghost.mdx | 已接入 |
| h02T | 波浪术士(Lv1) | 0.8 | 2.5 | units/naga/nagasiren/nagasiren.mdx | 已接入 |
| h02D | 魔法学长(Lv1) | 0.8 | 2.5 | units/human/priest/priest.mdx | 已接入 |
| h02Q | 凤凰天祥(Lv1) | 0.8 | 2.5 | units/human/phoenix/phoenix.mdx | 已接入 |
| h02O | 召唤师(Lv1) | 1 | 2.5 | units/undead/kelthuzad/kelthuzad.mdx | 已接入 |
| h02L | 暴风术士(Lv1) | 0.8 | 2.5 | units/creeps/chaoswarlockgreen/chaoswarlockgreen.mdx | 已接入 |
| h02A | 魔法学徒(Lv1) | 0.8 | 2.5 | units/creeps/humanmage/humanmage.mdx | 已接入 |
| h003 | 游侠 | 1 | 1 | units/human/peasant/peasant.mdx | 已接入 |
| h03G | 神射手(Lv1) | 1 | 2.5 | units/creeps/bansheeranger/bansheeranger.mdx | 已接入 |
| h041 | 娜迦游侠(Lv1) | 1 | 2.5 | units/naga/heronagaseawitch/heronagaseawitch.mdx | 已接入 |
| h043 | 后羿(战绩) | 1.5 | 2.5 | units/nightelf/heromoonpriestess/heromoonpriestess.mdx | 已接入 |
| h03W | 火雨专家(Lv1) | 0.8 | 2.5 | units/orc/spiritwalker/spiritwalker.mdx | 已接入 |
| h03Y | 烈火游侠(Lv1) | 0.8 | 2.5 | units/creeps/highelfarcher/highelfarcher.mdx | 已接入 |
| h03S | 冰箭射手(Lv1) | 0.8 | 2.5 | units/creeps/sylvanuswindrunner/sylvanuswindrunner.mdx | 已接入 |
| h03D | 高级射手(Lv1) | 0.8 | 2.5 | units/nightelf/shandris/shandris.mdx | 已接入 |
| h03Q | 五毒女妖(Lv1) | 0.8 | 2.5 | units/nightelf/dryad/dryad.mdx | 已接入 |
| h03M | 刀轮射手(Lv1) | 0.8 | 2.5 | units/nightelf/runner/runner.mdx | 已接入 |
| h03N | 灵魂射手(Lv1) | 0.8 | 2.5 | units/creeps/skeletonarcher/skeletonarcher.mdx | 已接入 |
| h03J | 弓箭手(Lv1) | 0.8 | 2.5 | units/nightelf/archer/archer.mdx | 已接入 |
| h06C | 魔剑士 | 1 | 1 | units/human/peasant/peasant.mdx | 已接入 |
| h06K | 将军(Lv1) | 0.8 | 2.5 | units/human/arthaswithsword/arthaswithsword.mdx | 已接入 |
| h075 | 刀圣(Lv1) | 0.8 | 2.5 | units/demon/chaoshellscream/chaoshellscream.mdx | 已接入 |
| h077 | 剑魔(功勋) | 1.6 | 2.5 | units/other/proudmoore/proudmoore.mdx | 已接入 |
| h073 | 喷火兵(Lv1) | 0.8 | 2.5 | units/critters/chaosspaceorc/chaosspaceorc.mdx | 已接入 |
| h06Z | 剑客(Lv1) | 0.8 | 2.5 | units/orc/heroblademaster/heroblademaster.mdx | 已接入 |
| h06W | 刀客(Lv1) | 0.8 | 2.5 | units/human/bloodelfspellthief/bloodelfspellthief.mdx | 已接入 |
| h06H | 圣堂武士(Lv1) | 0.8 | 2.5 | units/creeps/revenantofthewaves/revenantofthewaves.mdx | 已接入 |
| h06T | 机枪兵(Lv1) | 0.8 | 2.5 | units/critters/marine/marine.mdx | 已接入 |
| h06P | 剑士(Lv1) | 0.8 | 2.5 | units/human/thecaptain/thecaptain.mdx | 已接入 |
| h06N | 刀狼骑士(Lv1) | 0.8 | 2.5 | units/orc/wolfrider/wolfrider.mdx | 已接入 |
| h06E | 步兵(Lv1) | 0.8 | 2.5 | units/human/footman/footman.mdx | 已接入 |

尚未完成逐像素验收：客户端版本对应的地形混合、悬崖、水面、战争迷雾、阴影、昼夜光照、完整原版 HUD 与音频。原图没有保存每台电脑的分辨率与画质设置，需要原版运行画面作为验收依据。实时测试入口 /visual-lab.html 可以逐模型播放动作。
