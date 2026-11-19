# 模型资源审计

- 源地图：人族无敌III 3.0终极版 (e7740efca962ff58a192c5cf51eb02f8c73308375e32c991f1c8fdf955d27b8d)
- 审计时间：2026-11-19T04:02:02.151Z
- 清单：326 个 MDX 模型，1142 个总资源，下载失败 0 个。
- 判定规则：路径在 `public/warcraft/manifest.json` 或本地 MDX 文件中存在才记为“已存在”；同一路径在多个数据表出现只计一次。

## 结论

当前可玩内容：职业、建造菜单、56 波次单位、5 个首领和 H05V 共 122 个唯一模型引用，缺失 0 个；66 个可建造单位模型也全部存在。当前地图使用的 139 个技能特效/弹道模型全部存在，266 个地图装饰中归并为 29 个模型且全部存在。

当前地图引用的召唤单位和掉落物原始模型及纹理已存在。此审计检查文件和引用；场景渲染、动画及技能触发需要另行验证，不能由资源存在推断。

注意：清单中的“下载失败”为 0 只说明本次下载过程没有 HTTP/解析失败；不代表原版全量数据的 512 个技能特效模型都已经纳入清单。

## 当前玩法影响的缺失

### 召唤单位

| UnitID | 名称 | 源模型路径 | 状态 | 引用能力 |
| --- | --- | --- | --- | --- |
| ndr1, ndr2, ndr3 | 小黑暗之奴 / 黑暗之奴 / 大黑暗之奴 | units/undead/skeleton/skeleton.mdx | 已存在 | A016.UnitID1, A016.UnitID1, A073.UnitID1, A073.UnitID1, A074.UnitID1, A074.UnitID1 |
| efon | 树人 | units/nightelf/ent/ent.mdx | 已存在 | AEfn.UnitID1, AEfn.UnitID2, AEfn.UnitID3, AEfn.UnitID4, A01R.UnitID1, A01T.UnitID1, A01U.UnitID1, A01T.UnitID1, A01R.UnitID1, A01U.UnitID1 |
| hwt2, hwt3, hwat | 水元素 | units/human/waterelemental/waterelemental.mdx | 已存在 | AHwe.UnitID2, A008.UnitID2, A01P.UnitID1, A01P.UnitID2, A01Q.UnitID2, A01R.UnitID2, A01T.UnitID2, A01U.UnitID2, A02Q.UnitID2, A02R.UnitID2, A02S.UnitID2, A03J.UnitID2, A03K.UnitID2, A03L.UnitID2, A009.UnitID2, A01N.UnitID2, A01O.UnitID1, A01O.UnitID2, A01T.UnitID2, A01R.UnitID2 |
| osw1, osw2, osw3 | 幽魂之狼 / 恐惧之狼 / 阴影之狼 | units/orc/spiritwolf/spiritwolf.mdx | 已存在 | AOsf.UnitID1, A00O.UnitID1, A02R.UnitID1, A02R.UnitID1, AOsf.UnitID2, A00O.UnitID2, A02H.UnitID1, A02H.UnitID2, A02I.UnitID2, A02Q.UnitID1, A02Q.UnitID1, AOsf.UnitID3, AOsf.UnitID4, A00O.UnitID3, A00O.UnitID4, A02H.UnitID3, A02H.UnitID4, A02I.UnitID1, A02I.UnitID3, A02I.UnitID4 |
| n004, n005, n006 | 熊 / 怒熊 / 灵魂之熊 | units/creeps/grizzlybear/grizzlybear.mdx | 已存在 | A03J.UnitID1, A03J.UnitID1, A03K.UnitID1, A03K.UnitID1, A03L.UnitID1, A03L.UnitID1 |
| n002, ninf, n003, n001, n00A | 地狱火(Lv1) / 地狱火 / 地狱火(Lv2) / 地狱火(Lv3) / 地狱火(LvMax) | units/demon/infernal/infernal.mdx | 已存在 | A03U.UnitID1, A03U.UnitID1, AUin.UnitID1, AUin.UnitID2, AUin.UnitID3, AUin.UnitID4, A00R.UnitID2, A00R.UnitID3, A00R.UnitID4, A03U.UnitID2, A03U.UnitID3, A03U.UnitID4, A03V.UnitID2, A03V.UnitID3, A03V.UnitID4, A0BT.UnitID2, A0BT.UnitID3, A0BT.UnitID4, A03U.UnitID2, A03U.UnitID3 |
| h037, h038, h036, h05X | 战士(Lv1) / 战士(Lv2) / 战士(Lv3) / 战士(LvMax) | units/human/thecaptain/thecaptain.mdx | 已存在 | A089.UnitID1, A089.UnitID1, A08A.UnitID1, A08A.UnitID1, A07N.UnitID1, A07N.UnitID1, A0BQ.UnitID1, A0BQ.UnitID1 |
| nba2 | 毁灭守卫 | units/demon/doomguard/doomguard.mdx | 已存在 | ANdo.UnitID1, ANdo.UnitID2, ANdo.UnitID3, ANdo.UnitID4, A07N.UnitID2, A07N.UnitID3, A07N.UnitID4, A089.UnitID2, A089.UnitID3, A089.UnitID4, A08A.UnitID2, A08A.UnitID3, A08A.UnitID4, A0BQ.UnitID2, A0BQ.UnitID3, A0BQ.UnitID4, A089.UnitID2, A089.UnitID3, A089.UnitID4, A08A.UnitID2 |
| nfac, nfa1, nfa2 | 兵工厂(Lv1) / 兵工厂(Lv2) / 兵工厂(Lv3) | units/creeps/herotinkerfactory/herotinkerfactory.mdx | 已存在 | A07L.UnitID1, A07L.UnitID1, A07L.UnitID2, A07P.UnitID1, A07P.UnitID2, A07Q.UnitID2, A07L.UnitID2, A07P.UnitID1, A07P.UnitID2, A07Q.UnitID2, A07L.UnitID3, A07L.UnitID4, A07P.UnitID3, A07P.UnitID4, A07Q.UnitID1, A07Q.UnitID3, A07Q.UnitID4, A07L.UnitID3, A07L.UnitID4, A07P.UnitID3 |
| u001, u002, u000, u003 | 1鬼火乱舞1 / 1鬼火乱舞2 / 1鬼火乱舞3 / 1鬼火乱舞4 | abilities/weapons/lordofflamemissile/lordofflamemissile.mdx | 已存在 | A0DX.UnitID1, A0DX.UnitID1, A0CR.UnitID1, A0CR.UnitID1, A0DY.UnitID1, A0DY.UnitID1, A0F3.UnitID1, A0F3.UnitID1 |
| uloc | 蝗虫 | units/undead/locust/locust.mdx | 已存在 | AUls.UnitID1, AUls.UnitID2, AUls.UnitID3, AUls.UnitID4, A0CR.UnitID2, A0CR.UnitID3, A0CR.UnitID4, A0DX.UnitID2, A0DX.UnitID3, A0DX.UnitID4, A0DY.UnitID2, A0DY.UnitID3, A0DY.UnitID4, A0F3.UnitID2, A0F3.UnitID3, A0F3.UnitID4, A0DX.UnitID2, A0DX.UnitID3, A0DX.UnitID4, A0CR.UnitID2 |
| nlv1, nlv2, nlv3 | 炎魔 | units/creeps/lavaspawn/lavaspawn.mdx | 已存在 | ANlm.UnitID1, A0EG.UnitID1, A0EG.UnitID1, ANlm.UnitID2, A017.UnitID1, A017.UnitID2, A0EG.UnitID2, A0EH.UnitID2, A0EG.UnitID2, A017.UnitID1, A017.UnitID2, A0EH.UnitID2, ANlm.UnitID3, ANlm.UnitID4, A017.UnitID3, A017.UnitID4, A0EG.UnitID3, A0EG.UnitID4, A0EH.UnitID1, A0EH.UnitID3 |

当前地图召唤模型均已取得原始 MDX 和纹理。实际显示仍取决于客户端接入、动画及 LOD，资源审计不代替运行验证。

### 掉落物

| ItemID | 名称 | 源模型路径 | 状态 |
| --- | --- | --- | --- |
| ckng, modt, ofir, ocor, oli2, oven, tgrh, stwp, shea, dust, phea, pman, hslv, moon, shas, skul, mcri, rnec, tsct, pams, spre, plcl, sreg, ssan, I000, I001, I002, I003, I004, I005, I006, I007, I008, I009, I00A, I00B, I00C, I00D, I00E, I00F, I00G, I00H, I00I | 国王之冠 +5 / 死亡面罩 / 火焰之球 / 腐蚀之球 / 闪电之球 / 毒液之球 / 小型的大厅 / 回城卷轴 / 医疗卷轴 / 尘土之影 / 生命药水 / 魔法药水 / 医疗剂 / 月亮石 / 速度卷轴 / 献祭头骨 / 机械类的小玩艺 / 巫术妖棍 / 象牙塔 / 抗体药水 / 保存权杖 / 小净化药水 / 恢复卷轴 / 避难权杖 / 哨塔(游侠套装·冰) / 哨塔(游侠套装·毒) / 哨塔(游侠套装·火) / 小熊(野蛮人套装·棍) / 小熊(野蛮人套装·拳) / 小熊(野蛮人套装·刀) / 小小偷(盗贼套装·杀) / 小草菇(术士套装·云) / 小草菇(术士套装·雷) / 小草菇(术士套装·风) / 刀轮塔(猎人套装·攻) / 刀轮塔(猎人套装·法) / 刀轮塔(猎人套装·辅) / 小小偷(盗贼套装·偷) / 小小偷(盗贼套装·抢) / 图腾(魔剑士套装·幻) / 图腾(魔剑士套装·术) / 图腾(魔剑士套装·武) | objects/inventoryitems/treasurechest/treasurechest.mdx | 已存在 |
| tkno | 能量之书 | objects/inventoryitems/tomebrown/tomebrown.mdx | 已存在 |

地图实际引用的 1 个唯一物品模型路径已取得原始 MDX 和纹理。客户端接入及拾取、丢弃、使用验证见 [掉落物与原图核对](item-drop-parity.md)。TreasureChest 为本图共享的装备地面模型，TomeBrown 属于未使用的原版物品资源。

### 建筑

当前地图可建造的 66 个模型全部存在。全量单位表中另有 38 个建筑定义缺失，属于未进入本地图建造菜单或未被当前核心流程使用的基础建筑：

| UnitID | 名称 | 缺失模型路径 |
| --- | --- | --- |
| eaoe | 知识古树 | buildings/nightelf/ancientoflore/ancientoflore.mdx |
| eaom | 战争古树 | buildings/nightelf/ancientofwar/ancientofwar.mdx |
| eaow | 风之古树 | buildings/nightelf/ancientofwind/ancientofwind.mdx |
| eate | 长者祭坛 | buildings/nightelf/altarofelders/altarofelders.mdx |
| eden | 奇迹古树 | buildings/nightelf/ancientofwonder/ancientofwonder.mdx |
| edob | 猎手大厅 | buildings/nightelf/huntershall/huntershall.mdx |
| edos | 奇美拉栖木 | buildings/nightelf/chimaeraroost/chimaeraroost.mdx |
| emow | 月亮井 | buildings/nightelf/moonwell/moonwell.mdx |
| etrp | 远古守护者 | buildings/nightelf/ancientprotector/ancientprotector.mdx |
| halt | 国王祭坛 | buildings/human/altarofkings/altarofkings.mdx |
| harm | 车间 | buildings/human/workshop/workshop.mdx |
| hars | 神秘圣地 | buildings/human/arcanesanctum/arcanesanctum.mdx |
| hbar | 兵营 | buildings/human/humanbarracks/humanbarracks.mdx |
| hbla | 铁匠铺 | buildings/human/blacksmith/blacksmith.mdx |
| hgra | 狮鹫笼 | buildings/human/gryphonaviary/gryphonaviary.mdx |
| hhou | 农场 | buildings/human/farm/farm.mdx |
| hlum | 伐木场 | buildings/human/humanlumbermill/humanlumbermill.mdx |
| hvlt | 神秘藏宝室 | buildings/human/arcanevault/arcanevault.mdx |
| nwgt | 传送门 | buildings/other/waygate/waygate.mdx |
| oalt | 风暴祭坛 | buildings/orc/altarofstorms/altarofstorms.mdx |
| obar | 兵营 | buildings/orc/orcbarracks/orcbarracks.mdx |
| obea | 兽栏 | buildings/orc/beastiary/beastiary.mdx |
| ofor | 战争磨坊 | buildings/orc/warmill/warmill.mdx |
| osld | 灵魂归宿 | buildings/orc/spiritlodge/spiritlodge.mdx |
| otrb | 兽族地洞 | buildings/orc/trollburrow/trollburrow.mdx |
| otto | 牛头人图腾 | buildings/orc/taurentotem/taurentotem.mdx |
| ovln | 巫毒商店 | buildings/orc/voodoolounge/voodoolounge.mdx |
| owtw | 了望塔 | buildings/orc/watchtower/watchtower.mdx |
| uaod | 黑暗祭坛 | buildings/undead/altarofdarkness/altarofdarkness.mdx |
| ubon | 埋骨地 | buildings/undead/boneyard/boneyard.mdx |
| ugol | 闹鬼金矿 | buildings/undead/hauntedmine/hauntedmine.mdx |
| ugrv | 坟场 | buildings/undead/graveyard/graveyard.mdx |
| usap | 牺牲深渊 | buildings/undead/sacrificialpit/sacrificialpit.mdx |
| usep | 地穴 | buildings/undead/crypt/crypt.mdx |
| uslh | 屠宰场 | buildings/undead/slaughterhouse/slaughterhouse.mdx |
| utod | 诅咒神庙 | buildings/undead/templeofthedamned/templeofthedamned.mdx |
| utom | 古墓废墟 | buildings/undead/tombofrelics/tombofrelics.mdx |
| uzg1, uzg2, uzig | 幽魂之塔 / 蛛网怪塔 / 通灵塔 | buildings/undead/ziggurat/ziggurat.mdx |

### 技能特效与弹道

当前地图实际能力集合的模型特效/弹道 139 个全部存在，因此当前波次、职业和脚本技能缺口不是“模型文件没下载”。全量原版能力字符串里共有 512 个不同模型路径，其中缺失 311 个，主要是未被本地图使用的标准技能、物品技能、环境火焰、死亡特效和通用武器。

全量缺失按目录统计：`abilities/spells` 232，`abilities/weapons` 46，`environment/nightelfbuildingfire` 6，`environment/undeadbuildingfire` 6，`objects/inventoryitems` 5，`objects/spawnmodels` 3，`units/creeps` 3，`environment/largebuildingfire` 3，`environment/smallbuildingfire` 3，`units/undead` 2，`units/human` 1，`ui/feedback` 1。完整路径见下方附录和 JSON。

### 地图装饰与嵌入模型

266 个放置记录归并为 29 个模型，当前全部存在。嵌入模型中 `war3mapimported/laser.mdx` 存在，`war3mapimported/loadingscreen.mdx` 没有复制到 `public/warcraft`；后者是载入界面资源，不影响战场单位。

## 全量缺失索引

下面是全量原始数据引用中缺失的路径。它们与上面的“当前玩法缺失”有重叠，不要将各行相加：

### 单位模型（93）

- `buildings/nightelf/ancientoflore/ancientoflore.mdx` — eaoe
- `buildings/nightelf/ancientofwar/ancientofwar.mdx` — eaom
- `buildings/nightelf/ancientofwind/ancientofwind.mdx` — eaow
- `buildings/nightelf/altarofelders/altarofelders.mdx` — eate
- `units/nightelf/chimaera/chimaera.mdx` — echm
- `buildings/nightelf/ancientofwonder/ancientofwonder.mdx` — eden
- `buildings/nightelf/huntershall/huntershall.mdx` — edob
- `buildings/nightelf/chimaeraroost/chimaeraroost.mdx` — edos
- `units/nightelf/faeriedragon/faeriedragon.mdx` — efdr
- `units/nightelf/hippogryph/hippogryph.mdx` — ehip
- `units/nightelf/herokeeperofthegrove/herokeeperofthegrove.mdx` — Ekee
- `buildings/nightelf/moonwell/moonwell.mdx` — emow
- `buildings/nightelf/ancientprotector/ancientprotector.mdx` — etrp
- `buildings/human/altarofkings/altarofkings.mdx` — halt
- `units/human/heroarchmage/heroarchmage.mdx` — Hamg
- `buildings/human/workshop/workshop.mdx` — harm
- `buildings/human/arcanesanctum/arcanesanctum.mdx` — hars
- `buildings/human/humanbarracks/humanbarracks.mdx` — hbar
- `buildings/human/blacksmith/blacksmith.mdx` — hbla
- `units/human/bloodelfdragonhawk/bloodelfdragonhawk.mdx` — hdhw
- `buildings/human/gryphonaviary/gryphonaviary.mdx` — hgra
- `units/human/gryphonrider/gryphonrider.mdx` — hgry
- `units/human/gyrocopter/gyrocopter.mdx` — hgyr
- `buildings/human/farm/farm.mdx` — hhou
- `units/human/knight/knight.mdx` — hkni
- `buildings/human/humanlumbermill/humanlumbermill.mdx` — hlum
- `units/human/militia/militia.mdx` — hmil, n007, n008, n009, ncg2
- `units/human/heromountainking/heromountainking.mdx` — Hmkg
- `units/human/mortarteam/mortarteam.mdx` — hmtm
- `units/human/heropaladin/heropaladin.mdx` — Hpal
- `units/human/rifleman/rifleman.mdx` — hrif
- `buildings/human/arcanevault/arcanevault.mdx` — hvlt
- `units/critters/albatross/albatross.mdx` — nalb
- `units/critters/spidercrab/spidercrab.mdx` — ncrb
- `units/demon/demoness/demoness.mdx` — ndqt
- `units/other/dranai/dranai.mdx` — ndrf
- `units/other/dranaimage/dranaimage.mdx` — ndrs
- `units/creeps/darktroll/darktroll.mdx` — ndtr
- `units/creeps/darktrolltrapper/darktrolltrapper.mdx` — ndtw
- `units/critters/easterchicken/easterchicken.mdx` — nech
- `units/critters/easterrabbit/easterrabbit.mdx` — necr
- `units/critters/frog/frog.mdx` — nfro
- `units/critters/hermitcrab/hermitcrab.mdx` — nhmc
- `units/critters/pig/pig.mdx` — npig
- `units/creeps/stormpandarenbrewmaster/stormpandarenbrewmaster.mdx` — npn2
- `units/critters/penguin/penguin.mdx` — npng, npnw
- `units/critters/raccoon/raccoon.mdx` — nrac
- `units/critters/rat/rat.mdx` — nrat
- `units/critters/seal/seal.mdx` — nsea
- `units/critters/sheep/sheep.mdx` — nsha, nshe, nshw
- `units/critters/flyingsheep/flyingsheep.mdx` — nshf
- `units/creeps/sludgemonster/sludgemonster.mdx` — nslf
- `units/critters/snowowl/snowowl.mdx` — nsno
- `units/creeps/skeletonorc/skeletonorc.mdx` — nsog
- `units/creeps/nerubian/nerubian.mdx` — nspd
- `units/creeps/spider/spider.mdx` — nspr
- `units/creeps/sasquatch/sasquatch.mdx` — nsqo
- `units/creeps/orcwarlock/orcwarlock.mdx` — nsrh
- `units/creeps/satyrtrickster/satyrtrickster.mdx` — nsts
- `units/creeps/tuskarlord/tuskarlord.mdx` — ntkh
- `units/creeps/seaturtle/seaturtle.mdx` — ntrs
- `units/creeps/unbroken/unbroken.mdx` — nubw
- `units/critters/vulture/vulture.mdx` — nvul
- `buildings/other/waygate/waygate.mdx` — nwgt
- `units/creeps/whitewolf/whitewolf.mdx` — nwwg
- `buildings/orc/altarofstorms/altarofstorms.mdx` — oalt
- `buildings/orc/orcbarracks/orcbarracks.mdx` — obar
- `buildings/orc/beastiary/beastiary.mdx` — obea
- `units/orc/catapult/catapult.mdx` — ocat
- `buildings/orc/warmill/warmill.mdx` — ofor
- `units/orc/heroshadowhunter/heroshadowhunter.mdx` — Oshd
- `units/orc/shaman/shaman.mdx` — oshm
- `buildings/orc/spiritlodge/spiritlodge.mdx` — osld
- `units/orc/battroll/battroll.mdx` — otbr
- `units/orc/herotaurenchieftain/herotaurenchieftain.mdx` — Otch
- `buildings/orc/trollburrow/trollburrow.mdx` — otrb
- `buildings/orc/taurentotem/taurentotem.mdx` — otto
- `buildings/orc/voodoolounge/voodoolounge.mdx` — ovln
- `buildings/orc/watchtower/watchtower.mdx` — owtw
- `units/orc/wyvernrider/wyvernrider.mdx` — owyv
- `buildings/undead/altarofdarkness/altarofdarkness.mdx` — uaod
- `units/undead/banshee/banshee.mdx` — uban
- `buildings/undead/boneyard/boneyard.mdx` — ubon
- `units/undead/frostwyrm/frostwyrm.mdx` — ufro
- `buildings/undead/hauntedmine/hauntedmine.mdx` — ugol
- `buildings/undead/graveyard/graveyard.mdx` — ugrv
- `buildings/undead/sacrificialpit/sacrificialpit.mdx` — usap
- `buildings/undead/crypt/crypt.mdx` — usep
- `units/undead/skeletonmage/skeletonmage.mdx` — uskm
- `buildings/undead/slaughterhouse/slaughterhouse.mdx` — uslh
- `buildings/undead/templeofthedamned/templeofthedamned.mdx` — utod
- `buildings/undead/tombofrelics/tombofrelics.mdx` — utom
- `buildings/undead/ziggurat/ziggurat.mdx` — uzg1, uzg2, uzig

### 技能特效、弹道和共用效果（311）

- `objects/spawnmodels/nightelf/necanceldeath/necanceldeath.mdx` — eaoe.Specialart, eaom.Specialart, eaow.Specialart, eate.Specialart, eden.Specialart, edob.Specialart, edos.Specialart, egol.Specialart, emow.Specialart, etoa.Specialart, etoe.Specialart, etol.Specialart, etrp.Specialart, ncta.Specialart, ncte.Specialart, nctl.Specialart
- `abilities/weapons/glaivemissile/glaivemissiletarget.mdx` — ebal.Targetart
- `abilities/weapons/druidofthetalonmissile/druidofthetalonmissile.mdx` — edot.Missileart, edtm.Missileart, nmdm.Missileart, nmed.Missileart
- `abilities/weapons/dryadmissile/dryadmissile.mdx` — edry.Missileart
- `abilities/weapons/faeriedragonmissile/faeriedragonmissile.mdx` — efdr.Missileart
- `abilities/weapons/wardenmissile/wardenmissile.mdx` — Ewar.Missileart, Ewrd.Missileart
- `abilities/spells/undead/orbofdeath/orbofdeathmissile.mdx` — h04Z.Missileart, h050.Missileart, h051.Missileart, hatw.Missileart
- `abilities/weapons/cannontowermissile/cannontowermissile.mdx` — hctw.Missileart
- `abilities/weapons/gryphonridermissile/gryphonridermissiletarget.mdx` — hgry.Targetart
- `abilities/weapons/gyrocopter/gyrocopterimpact.mdx` — hgyr.Missileart
- `abilities/weapons/gyrocopter/gyrocoptermissile.mdx` — hgyr.Missileart
- `abilities/weapons/priestmissile/priestmissile.mdx` — hmpr.Missileart, ntkh.Missileart, nemi.Missileart, nchp.Missileart, nwiz.Missileart
- `abilities/weapons/mortar/mortarmissile.mdx` — hmtm.Missileart, Arng.Targetart
- `abilities/weapons/steamtank/steamtankimpact.mdx` — hmtt.Missileart, hrtt.Missileart
- `abilities/weapons/phoenixmissile/phoenix_missile.mdx` — hphx.Missileart
- `abilities/weapons/rocketmissile/rocketmissile.mdx` — hrtt.Missileart, Aroc.Missileart
- `units/human/militia/militia.mdx` — n007.file, n008.file, n009.file, ncg2.file
- `abilities/weapons/brewmastermissile/brewmastermissile.mdx` — Npbm.Missileart, Nal2.Missileart, Nal3.Missileart, Nrob.Missileart, Nalc.Missileart, Nalm.Missileart, Ntin.Missileart, Nsjs.Missileart
- `abilities/weapons/sludgemissile/sludgemissile.mdx` — nslf.Missileart
- `abilities/weapons/blackkeepermissile/blackkeepermissile.mdx` — nsts.Missileart
- `abilities/weapons/demolishermissile/demolishermissile.mdx` — ocat.Missileart
- `abilities/weapons/witchdoctormissile/witchdoctormissile.mdx` — odoc.Missileart, ovlj.Missileart
- `abilities/weapons/huntermissile/huntermissile.mdx` — ohun.Missileart, otbk.Missileart, otrb.Missileart, orbr.Missileart, ocbw.Missileart
- `abilities/weapons/battrollmissile/battrollmissile.mdx` — otbr.Missileart
- `abilities/weapons/wyvernspear/wyvernspearmissile.mdx` — owyv.Missileart
- `abilities/weapons/locustmissile/locustmissile.mdx` — u000.Missileart, u001.Missileart, u002.Missileart, u003.Missileart, uloc.Missileart
- `units/undead/abomination/abominationexplosion.mdx` — uabo.Specialart, uabc.Specialart
- `objects/spawnmodels/undead/ucanceldeath/ucanceldeath.mdx` — uaod.Specialart, ubon.Specialart, ugol.Specialart, ugrv.Specialart, unp1.Specialart, unp2.Specialart, unpl.Specialart, usap.Specialart, usep.Specialart, uslh.Specialart, utod.Specialart, utom.Specialart, uzg1.Specialart, uzg2.Specialart, uzig.Specialart
- `abilities/weapons/frostwyrmmissile/frostwyrmmissile.mdx` — ufro.Missileart, ndt2.Missileart, ubdd.Missileart, nadk.Missileart, nadr.Missileart, ubdr.Missileart, nadw.Missileart, Afrb.Missileart
- `abilities/weapons/zigguratmissile/zigguratmissile.mdx` — unp1.Missileart, unp2.Missileart, unpl.Missileart, uzg1.Missileart
- `abilities/weapons/skeletalmagemissile/skeletalmagemissile.mdx` — uskm.Missileart
- `abilities/weapons/bristlebackmissile/bristlebackmissile.mdx` — nqb1.Missileart, nqb2.Missileart, nqb3.Missileart, nqb4.Missileart, nqbh.Missileart, nrzt.Missileart
- `abilities/spells/nightelf/corrosivebreath/corrosivebreathmissile.mdx` — ntt1.Missileart
- `abilities/weapons/catapult/catapultmissile.mdx` — nbt2.Missileart, ncat.Missileart
- `abilities/weapons/greendragonmissile/greendragonmissile.mdx` — net2.Missileart, ngrd.Missileart, ngdk.Missileart, nthr.Missileart, ngrw.Missileart
- `abilities/spells/undead/deathcoil/deathcoilmissile.mdx` — ntx2.Missileart, ACdc.Missileart, AUdc.Missileart
- `objects/spawnmodels/naga/nagadeath/nagadeath.mdx` — nnsa.Specialart, nnad.Specialart, nnsg.Specialart, nntg.Specialart, nnfm.Specialart, nntt.Specialart
- `abilities/weapons/harpymissile/harpymissile.mdx` — nanb.Missileart, nbnb.Missileart, nane.Missileart, nanm.Missileart, nhar.Missileart, nhrr.Missileart
- `abilities/weapons/makuramissile/makuramissile.mdx` — nltc.Missileart, nlds.Missileart
- `abilities/weapons/hydraliskimpact/hydraliskimpact.mdx` — zhyd.Missileart
- `abilities/weapons/ancestralguardianmissile/ancestralguardianmissile.mdx` — oang.Missileart, negm.Missileart
- `abilities/weapons/boatmissile/boatmissile.mdx` — hbsh.Missileart, uubs.Missileart, hdes.Missileart, odes.Missileart, udes.Missileart
- `abilities/weapons/fragdriller/fragdriller.mdx` — ngbl.Missileart
- `abilities/weapons/snapmissile/snapmissile.mdx` — nsnp.Missileart, nsbs.Missileart
- `abilities/weapons/wingedserpentmissile/wingedserpentmissile.mdx` — nwgs.Missileart
- `abilities/weapons/poisonarrow/poisonarrowmissile.mdx` — ngns.Missileart
- `abilities/weapons/rexxarmissile/rexxarmissile.mdx` — Orex.Missileart
- `abilities/spells/other/tinkerrocket/tinkerrocketmissile.mdx` — ANc1.Missileart, ANc2.Missileart, ANc3.Missileart, ANcs.Missileart
- `abilities/spells/items/aihe/aihetarget.mdx` — AIh1.Targetart, APh1.Targetart, AIh2.Targetart, APh2.Targetart, AIh3.Targetart, APh3.Targetart, AIha.Targetart, AIhb.Targetart, AIhe.Targetart, AIhx.Targetart
- `abilities/spells/items/aima/aimatarget.mdx` — AIm1.Casterart, Amb2.Specialart, AIm2.Casterart, AIma.Targetart, APmg.Targetart, AIpl.Casterart, AImr.Targetart, APmr.Targetart, AIpr.Casterart
- `abilities/spells/undead/plaguecloud/plaguecloudcaster.mdx` — Aap1.Targetart, Aap3.Targetart, Aap4.Targetart, Aapl.Targetart
- `abilities/spells/nightelf/spiritofvengeance/spiritofvengeanceorbs1.mdx` — Asp1.Targetart, Asp1.Missileart, Asp2.Targetart, Asp2.Missileart, Asp3.Targetart, Asp3.Missileart, Asp4.Targetart, Asp4.Missileart, Asp5.Targetart, Asp5.Missileart, Asp6.Targetart, Asp6.Missileart
- `abilities/spells/items/aivi/aivitarget.mdx` — AIv1.Targetart, AIv2.Targetart, AIvi.Targetart
- `abilities/spells/human/flamestrike/flamestriketarget.mdx` — A002.Effectart, A02A.Effectart, A00G.Effectart, ACfs.Effectart, AHfs.Effectart, ANfs.Effectart
- `abilities/spells/human/flamestrike/flamestrike1.mdx` — A002.Specialart, A02A.Specialart, A00G.Specialart, ACfs.Specialart, AHfs.Specialart, ANfs.Specialart
- `abilities/spells/human/flamestrike/flamestrike2.mdx` — A002.Specialart, A02A.Specialart, A00G.Specialart, ACfs.Specialart, AHfs.Specialart, ANfs.Specialart
- `abilities/spells/human/flamestrike/flamestrike.mdx` — A002.Specialart, A02A.Specialart, A00G.Specialart, ACfs.Specialart, AHfs.Specialart, ANfs.Specialart
- `abilities/spells/items/aiem/aiemtarget.mdx` — AIe2.Casterart, AIem.Casterart
- `abilities/spells/other/aneu/aneucaster.mdx` — Ane2.Casterart, Aall.Casterart, Aneu.Casterart
- `abilities/spells/other/aneu/aneutarget.mdx` — Ane2.Targetart, Aall.Targetart, Aneu.Targetart
- `abilities/spells/orc/purge/purgebufftarget.mdx` — Apg2.Specialart, Aprg.Specialart, Bprg.Targetart, AIps.Specialart, ACpu.Specialart
- `abilities/spells/undead/antimagicshell/antimagicshell.mdx` — Bam2.Targetart, Bams.Targetart
- `abilities/spells/items/orbvenom/orbvenommissile.mdx` — Apo2.Missileart, AIpb.Missileart
- `abilities/spells/nightelf/spiritofvengeance/spiritofvengeanceorbs2.mdx` — Asp2.Targetart, Asp2.Missileart, Asp3.Targetart, Asp3.Missileart, Asp4.Targetart, Asp4.Missileart, Asp5.Targetart, Asp5.Missileart, Asp6.Targetart, Asp6.Missileart
- `abilities/spells/undead/possession/possessionmissile.mdx` — Aps2.Missileart, Apos.Missileart, ACps.Missileart
- `abilities/spells/nightelf/cyclone/cyclonetarget.mdx` — Bcy2.Effectart, Bcyc.Effectart
- `abilities/spells/undead/carrionswarm/carrionswarmdamage.mdx` — A003.Specialart, ACca.Specialart, AUcs.Specialart, A04Y.Specialart
- `abilities/spells/nightelf/spiritofvengeance/spiritofvengeanceorbs3.mdx` — Asp3.Targetart, Asp3.Missileart, Asp4.Targetart, Asp4.Missileart, Asp5.Targetart, Asp5.Missileart, Asp6.Targetart, Asp6.Missileart
- `abilities/spells/nightelf/spiritofvengeance/spiritofvengeanceorbs4.mdx` — Asp4.Targetart, Asp4.Missileart, Asp5.Targetart, Asp5.Missileart, Asp6.Targetart, Asp6.Missileart
- `abilities/spells/nightelf/spiritofvengeance/spiritofvengeanceorbs5.mdx` — Asp5.Targetart, Asp5.Missileart, Asp6.Targetart, Asp6.Missileart
- `abilities/spells/nightelf/spiritofvengeance/spiritofvengeanceorbs6.mdx` — Asp6.Targetart, Asp6.Missileart
- `abilities/spells/orc/feralspirit/feralspirittarget.mdx` — ACs7.Specialart, ACs8.Specialart, ACs9.Specialart, AIfd.Targetart, AIff.Targetart, ACsf.Specialart, AOsf.Specialart, A02H.Specialart, AIfh.Targetart, A02I.Specialart, A00O.Specialart, AIfr.Targetart, AIfu.Targetart
- `abilities/spells/items/ailm/ailmtarget.mdx` — AIaa.Casterart, AImh.Casterart, AImi.Casterart, AIlm.Casterart, AIxm.Targetart, AIpx.Casterart
- `abilities/spells/undead/carrionswarm/carrionswarmmissile.mdx` — ACca.Missileart, AUcs.Missileart, A04Y.Missileart
- `abilities/spells/items/aida/aidacaster.mdx` — AIda.Casterart, AIdb.Casterart
- `abilities/spells/undead/web/web_airtarget.mdx` — Bwea.Targetart
- `abilities/spells/human/flare/flarecaster.mdx` — AIfa.Casterart, Afla.Casterart
- `abilities/spells/human/manaflare/manaflaretarget.mdx` — Bmfa.Targetart
- `abilities/spells/human/manaflare/manaflaremissile.mdx` — Bmfa.Missileart
- `abilities/spells/human/manaflare/manaflareboltimpact.mdx` — Bmfa.Specialart
- `abilities/spells/other/frostarrows/nagacoldarrowmissile.mdx` — ANfa.Missileart
- `abilities/spells/undead/frostarmor/frostarmortarget.mdx` — BUfa.Targetart
- `abilities/spells/undead/frostarmor/frostarmordamage.mdx` — BUfa.Specialart
- `abilities/spells/nightelf/naturetouch/naturetouchtarget.mdx` — AIga.Effectart
- `abilities/spells/human/flare/flaretarget.mdx` — Xfla.Effectart
- `abilities/spells/other/creepsleep/creepsleeptarget.mdx` — Asla.Casterart, ACsp.Casterart
- `abilities/spells/orc/ensnare/ensnare_airtarget.mdx` — Bena.Targetart
- `abilities/spells/nightelf/battleroar/roartarget.mdx` — Broa.Targetart, BNbr.Targetart
- `abilities/spells/other/parasite/parasitemissile.mdx` — ACpa.Missileart, ANpa.Missileart
- `abilities/spells/other/parasite/parasitetarget.mdx` — BNpa.Targetart
- `abilities/weapons/cryptfiendmissile/cryptfiendmissiletarget.mdx` — Bspa.Targetart
- `abilities/spells/items/aire/airetarget.mdx` — AIra.Targetart, APra.Targetart, AIdb.Targetart, AIre.Targetart
- `abilities/spells/human/massteleport/massteleportcaster.mdx` — ANsa.Casterart, AIte.Casterart, AItp.Casterart, ANpr.Casterart, AHmt.Casterart, AImt.Casterart, AIrt.Casterart
- `abilities/spells/human/massteleport/massteleporttarget.mdx` — ANsa.Targetart, ANsa.Specialart, AIte.Targetart, AIte.Specialart, AItp.Targetart, AItp.Specialart, ANpr.Targetart, ANpr.Specialart, AHmt.Specialart, AImt.Specialart, AIrt.Targetart, AIrt.Specialart, Amov.Specialart
- `abilities/spells/items/staffofsanctuary/staff_sanctuary_target.mdx` — BNsa.Targetart
- `abilities/spells/items/aita/crystalballcaster.mdx` — AHta.Casterart, AIta.Casterart
- `abilities/spells/nightelf/taunt/tauntcaster.mdx` — ANta.Casterart, Atau.Casterart
- `abilities/spells/human/thunderclap/thunderclaptarget.mdx` — Bsta.Targetart, BNvc.Targetart, BPSE.Targetart, BHbh.Targetart, BSTN.Targetart, BNcs.Targetart
- `abilities/spells/undead/vampiricaura/vampiricauratarget.mdx` — SCva.Specialart, AIva.Specialart, BUav.Specialart
- `abilities/spells/items/wandofneutralization/neutralizationmissile.mdx` — SCva.Missileart, AIva.Missileart, AIdc.Missileart, Ache.Missileart
- `abilities/spells/other/awaken/awaken.mdx` — Aawa.Targetart
- `abilities/spells/other/generalauratarget/generalauratarget.mdx` — BHab.Targetart, Bakb.Targetart, BOac.Targetart, BHad.Targetart, BOae.Targetart, BEah.Targetart, BEar.Targetart, Babr.Targetart, BUau.Targetart, BUav.Targetart
- `abilities/spells/other/acidbomb/bottleimpact.mdx` — BNab.Targetart
- `abilities/spells/human/feedback/spellbreakerattack.mdx` — Afbb.Specialart, Afbk.Specialart
- `abilities/spells/nightelf/manaburn/manaburntarget.mdx` — Ambb.Targetart, AEmb.Targetart, Amnb.Targetart, Ambd.Targetart
- `abilities/spells/other/drain/draincaster.mdx` — Bdcb.Targetart, Bdcl.Targetart
- `abilities/spells/undead/web/webmissile.mdx` — Aweb.Missileart, ACwb.Missileart, AIwb.Missileart
- `abilities/spells/undead/web/webtarget.mdx` — Bweb.Targetart
- `abilities/spells/orc/wardrums/drumscasterheal.mdx` — Aakb.Targetart, ACac.Targetart, AOac.Targetart, AIcd.Targetart
- `abilities/spells/items/ailb/ailbtarget.mdx` — AIlb.Targetart, AIll.Targetart, AIlx.Targetart
- `abilities/spells/items/ailb/ailbspecialart.mdx` — AIlb.Specialart, AIll.Specialart, AIlx.Specialart
- `abilities/spells/items/aiob/aiobtarget.mdx` — AIob.Targetart, AIft.Targetart
- `abilities/spells/items/aiob/aiobspecialart.mdx` — AIob.Specialart, AIft.Specialart
- `abilities/spells/items/orbvenom/orbvenomspecialart.mdx` — AIpb.Specialart
- `abilities/weapons/poisonsting/poisonstingtarget.mdx` — BIpb.Targetart, BIpd.Targetart, Bpsd.Targetart, Bssd.Targetart, Bpoi.Targetart, Bspo.Targetart
- `abilities/spells/undead/replenishhealth/replenishhealthcaster.mdx` — Arpb.Casterart, Arpl.Casterart
- `abilities/spells/undead/replenishhealth/replenishhealthcasteroverhead.mdx` — Arpb.Specialart, Arpl.Specialart
- `abilities/spells/orc/feralspirit/feralspiritdone.mdx` — BIrb.Effectart, Amec.Targetart, BOsf.Effectart, BFig.Effectart, Bcmg.Effectart, Avng.Targetart, Bvng.Effectart, ANsg.Targetart, BNsg.Effectart, Arsg.Specialart, AIsh.Specialart, BIsh.Effectart, AIwm.Targetart, ANwm.Targetart, BNwm.Effectart, Aslp.Targetart
- `abilities/weapons/procmissile/procmissile.mdx` — AIsb.Missileart
- `abilities/weapons/rockboltmissile/rockboltmissile.mdx` — ACtb.Missileart
- `abilities/spells/other/drain/draintarget.mdx` — Bdtb.Targetart, Bdtl.Targetart
- `abilities/spells/human/stormbolt/stormbolttarget.mdx` — BHtb.Targetart, BUim.Targetart
- `abilities/spells/items/aitb/aitbtarget.mdx` — AItb.Casterart, AIdi.Effectart, APdi.Effectart, AIds.Effectart
- `abilities/spells/other/breathoffire/breathoffiredamage.mdx` — ACbc.Targetart, BNbf.Targetart, Bpxf.Targetart, A07K.Targetart
- `abilities/spells/undead/deathcoil/deathcoilspecialart.mdx` — ACdc.Specialart, AUdc.Specialart
- `abilities/spells/undead/sleep/sleeptarget.mdx` — BNdc.Targetart, BUsl.Targetart
- `abilities/spells/demon/darkconversion/zombifytarget.mdx` — BNdc.Effectart
- `abilities/spells/other/incinerate/incineratebuff.mdx` — BNic.Targetart
- `abilities/spells/undead/possession/possessioncaster.mdx` — Bpoc.Targetart
- `abilities/spells/orc/stasistrap/stasistotemtarget.mdx` — BCtc.Targetart, BHtc.Targetart, Bchd.Targetart, BOeq.Targetart
- `abilities/spells/other/volcano/volcanodeath.mdx` — XNvc.Specialart
- `abilities/spells/other/volcano/volcanomissile.mdx` — XNvc.Missileart
- `abilities/spells/orc/voodoo/voodooaura.mdx` — BOvc.Targetart
- `abilities/spells/undead/animatedead/animatedeadtarget.mdx` — ACad.Specialart, AInd.Specialart, AIan.Specialart, AUan.Specialart
- `abilities/spells/other/frostdamage/frostdamage.mdx` — BHbd.Targetart, Bfro.Targetart
- `abilities/spells/human/defend/defendcaster.mdx` — AIdd.Casterart, Amdf.Casterart, Adef.Casterart
- `abilities/spells/undead/deathanddecay/deathanddecaydamage.mdx` — BUdd.Targetart
- `abilities/spells/undead/deathanddecay/deathanddecaytarget.mdx` — XUdd.Effectart, A0CL.Areaeffectart
- `abilities/spells/other/monsoon/monsoonbolttarget.mdx` — ANmd.Targetart
- `abilities/spells/undead/raiseskeletonwarrior/raiseskeleton.mdx` — ACrd.Effectart, Arai.Effectart, AIfs.Targetart
- `abilities/spells/human/flamestrike/flamestrikedamagetarget.mdx` — BNrd.Targetart, Bbof.Targetart, BHfs.Targetart
- `abilities/spells/nightelf/starfall/starfalltarget.mdx` — AEsd.Targetart
- `abilities/spells/orc/voodoo/voodooauratarget.mdx` — BOvd.Targetart
- `abilities/spells/undead/graveyard/gravemarker.mdx` — Agyd.SpecialArt
- `abilities/spells/demon/darkportal/darkportaltarget.mdx` — A06E.Effectart, A06I.Effectart, A06J.Effectart, ANdp.Effectart
- `abilities/spells/nightelf/faeriefire/faeriefiretarget.mdx` — Bfae.Targetart
- `abilities/spells/undead/devourmagic/devourmagicbirthmissile.mdx` — ACde.Missileart, Advm.Missileart
- `objects/inventoryitems/undeadcaptureflag/undeadcaptureflag.mdx` — AIfe.Targetart
- `abilities/spells/items/aisp/speedtarget.mdx` — Bspe.Targetart
- `abilities/spells/human/resurrect/resurrecttarget.mdx` — AHre.Targetart, APrl.Targetart, APrr.Targetart, AIrs.Targetart, AIrx.Targetart
- `abilities/spells/other/drain/manadraincaster.mdx` — Aste.Casterart, Bdcm.Targetart
- `abilities/spells/other/drain/manadraintarget.mdx` — Aste.Targetart, Bdtm.Targetart
- `abilities/spells/human/revivehuman/revivehuman.mdx` — Aque.Targetart, Arev.Targetart
- `abilities/spells/orc/reviveorc/reviveorc.mdx` — Aque.Targetart, Arev.Targetart
- `abilities/spells/undead/reviveundead/reviveundead.mdx` — Aque.Targetart, Arev.Targetart
- `abilities/spells/nightelf/revivenightelf/revivenightelf.mdx` — Aque.Targetart, Arev.Targetart
- `abilities/spells/demon/revivedemon/revivedemon.mdx` — Aque.Targetart, Arev.Targetart
- `abilities/spells/other/breathoffrost/breathoffrostmissile.mdx` — ACbf.Missileart
- `abilities/spells/other/breathoffrost/breathoffrosttarget.mdx` — BCbf.Targetart
- `abilities/spells/nightelf/immolation/immolationtarget.mdx` — BIcf.Targetart, BEim.Targetart
- `abilities/spells/nightelf/immolation/immolationdamage.mdx` — BIcf.Specialart, BNpi.Specialart, BEim.Specialart
- `abilities/spells/items/orbdarkness/orbdarkness.mdx` — AIdf.Targetart, AIdn.Targetart
- `abilities/spells/human/polymorph/polymorphdoneground.mdx` — Acef.Specialart, ANef.Specialart, A00L.Specialart, A0EL.Specialart, A0EM.Specialart, A0CX.Specialart, AChx.Specialart, ANhx.Specialart, AOhx.Specialart, BOhx.Effectart, Bply.Effectart
- `units/creeps/firepandarenbrewmaster/firepandarenbrewmaster_missile.mdx` — Acef.Missileart, ANef.Missileart
- `units/creeps/stormpandarenbrewmaster/stormpandarenbrewmaster_missile.mdx` — Acef.Missileart, ANef.Missileart
- `units/creeps/earthpandarenbrewmaster/earthpandarenbrewmaster_missile.mdx` — Acef.Missileart, ANef.Missileart
- `abilities/spells/items/aida/aidatarget.mdx` — Bdef.Targetart
- `abilities/spells/orc/mirrorimage/mirrorimagedeathcaster.mdx` — BNef.Effectart, BNef.Specialart, BOmi.Specialart, BIil.Specialart
- `abilities/spells/undead/unholyfrenzy/unholyfrenzytarget.mdx` — Buhf.Targetart
- `abilities/spells/human/cloudoffog/cloudoffog.mdx` — Xclf.Effectart
- `abilities/spells/human/innerfire/innerfiretarget.mdx` — Binf.Targetart
- `abilities/spells/human/flamestrike/flamestrikeembers.mdx` — Xbof.Effectart, XHfs.Effectart
- `abilities/spells/orc/etherealform/spiritwalkerchange.mdx` — Acpf.Casterart, Aetf.Casterart
- `abilities/spells/demon/rainoffire/rainoffiretarget.mdx` — XErf.Effectart
- `abilities/spells/nightelf/starfall/starfallcaster.mdx` — XEsf.Effectart
- `abilities/spells/undead/thornyshield/thornyshieldtargetchestleft.mdx` — BNeg.Targetart, BUts.Targetart
- `abilities/spells/undead/thornyshield/thornyshieldtargetchestright.mdx` — BNeg.Targetart, BUts.Targetart
- `abilities/spells/undead/thornyshield/thornyshieldtargetchestmountleft.mdx` — BNeg.Targetart, BUts.Targetart
- `abilities/spells/undead/thornyshield/thornyshieldtargetchestmountright.mdx` — BNeg.Targetart, BUts.Targetart
- `abilities/spells/other/immolationred/immolationredtarget.mdx` — Bpig.Targetart
- `abilities/spells/other/immolationred/immolationreddamage.mdx` — Bpig.Specialart
- `abilities/spells/other/tempspellart/tempspellart.mdx` — ANlg.Casterart, ANlg.Targetart, ANgl.Casterart, ANgl.Targetart
- `abilities/spells/human/controlmagic/controlmagictarget.mdx` — Acmg.Targetart
- `abilities/spells/orc/ensnare/ensnaretarget.mdx` — Beng.Targetart, Bens.Targetart
- `abilities/spells/other/anrl/anrltarget.mdx` — BIrg.Targetart, Barm.Targetart, BIrm.Targetart, ANrm.Targetart
- `abilities/spells/other/anrm/anrmtarget.mdx` — BIrg.Targetart, Ahnl.Casterart, BIrl.Targetart, ANrl.Targetart, Boar.Targetart
- `abilities/spells/nightelf/thornsaura/thornsaura.mdx` — ACah.Targetart, AEah.Targetart
- `abilities/spells/nightelf/thornsaura/thornsauradamage.mdx` — BEah.Specialart
- `abilities/spells/orc/disenchant/disenchantspecialart.mdx` — Adch.Targetart, Adcn.Targetart
- `abilities/spells/other/strongdrink/brewmastertarget.mdx` — BNdh.Targetart
- `abilities/spells/nightelf/shadowstrike/shadowstrike.mdx` — BEsh.Targetart, BEsi.Targetart
- `abilities/weapons/flyingmachine/flyingmachineimpact.mdx` — Afsh.Targetart
- `abilities/spells/orc/lightningshield/lightningshieldtarget.mdx` — Blsh.Targetart
- `abilities/spells/orc/lightningshield/lightningshieldbuff.mdx` — Blsh.Specialart
- `abilities/spells/nightelf/faeriedragoninvis/faeriedragon_invis.mdx` — Apsh.Specialart, Bpsh.Specialart
- `abilities/spells/other/doom/doomdeath.mdx` — BNdi.Targetart, BNdi.Effectart
- `abilities/spells/other/levelup/levelupcaster.mdx` — AOmi.Targetart, A0BK.Targetart, AHer.Casterart
- `abilities/spells/orc/mirrorimage/mirrorimagecaster.mdx` — AOmi.Specialart, A0BK.Specialart
- `abilities/spells/orc/mirrorimage/mirrorimagemissile.mdx` — AOmi.Missileart, A0BK.Missileart
- `abilities/weapons/poisonsting/poisonstingmissile.mdx` — Apoi.Missileart, A0CL.Effectart
- `abilities/spells/orc/spikebarrier/spikebarrier.mdx` — Aspi.Targetart
- `abilities/spells/undead/cripple/crippletarget.mdx` — Bcri.Targetart
- `abilities/spells/other/silence/silenceareabirth.mdx` — ACsi.Effectart, ANsi.Effectart
- `abilities/spells/other/silence/silencetarget.mdx` — BNsi.Targetart
- `abilities/spells/nightelf/rejuvenation/rejuvenationtarget.mdx` — Brej.TargetArt
- `abilities/spells/undead/orbofdeath/annihilationmissile.mdx` — Afak.Missileart
- `abilities/spells/human/flakcannons/flaktarget.mdx` — Aflk.Targetart, Aflk.Specialart
- `abilities/spells/orc/trollberserk/headhunterweaponsleft.mdx` — Bbsk.Targetart
- `abilities/spells/orc/trollberserk/headhunterweaponsright.mdx` — Bbsk.Targetart
- `abilities/spells/orc/trollberserk/trollbeserkertarget.mdx` — AIxk.Casterart
- `abilities/spells/undead/deathpact/deathpacttarget.mdx` — A0CL.Casterart, ANcl.Casterart, ANcl.Targetart, ANcl.Effectart, AIdp.Targetart, AUdp.Targetart
- `ui/feedback/rallypoint/rallypoint.mdx` — AIfl.Targetart
- `abilities/spells/human/manaflare/manaflarebase.mdx` — Bmfl.Targetart
- `environment/largebuildingfire/largebuildingfire1.mdx` — Xfhl.TargetArt, Xfhl.TargetArt, Xfol.TargetArt, Xfol.TargetArt
- `environment/largebuildingfire/largebuildingfire0.mdx` — Xfhl.TargetArt, Xfhl.TargetArt, Xfol.TargetArt, Xfol.TargetArt, Xfhm.TargetArt, Xfom.TargetArt
- `environment/smallbuildingfire/smallbuildingfire1.mdx` — Xfhl.TargetArt, Xfol.TargetArt, Xfhm.TargetArt, Xfom.TargetArt, Xfhs.TargetArt, Xfos.TargetArt
- `environment/smallbuildingfire/smallbuildingfire0.mdx` — Xfhl.TargetArt, Xfol.TargetArt
- `abilities/spells/items/aiil/aiiltarget.mdx` — AIil.Targetart
- `environment/nightelfbuildingfire/elflargebuildingfire1.mdx` — Xfnl.TargetArt
- `environment/nightelfbuildingfire/elflargebuildingfire0.mdx` — Xfnl.TargetArt, Xfnl.TargetArt, Xfnm.TargetArt
- `environment/nightelfbuildingfire/elfsmallbuildingfire1.mdx` — Xfnl.TargetArt, Xfnm.TargetArt, Xfns.TargetArt
- `environment/nightelfbuildingfire/elflargebuildingfire2.mdx` — Xfnl.TargetArt, Xfnm.TargetArt
- `environment/nightelfbuildingfire/elfsmallbuildingfire0.mdx` — Xfnl.TargetArt
- `abilities/spells/nightelf/treeoflifeupgrade/treeoflifeupgradetargetart.mdx` — Atol.Targetart
- `abilities/spells/nightelf/treeoflifeupgrade/treeoflifeupgradetargetarthand.mdx` — Atol.Targetart, Atol.Targetart
- `units/undead/plaguecloud/plaguecloudtarget.mdx` — Bapl.Targetart
- `abilities/spells/orc/spiritlink/spiritlinktarget.mdx` — Bspl.Targetart
- `abilities/spells/items/healingsalve/healingsalvetarget.mdx` — AIrl.Targetart
- `abilities/spells/other/tornado/tornado_target.mdx` — Basl.Targetart
- `environment/undeadbuildingfire/undeadlargebuildingfire1.mdx` — Xful.TargetArt
- `environment/undeadbuildingfire/undeadlargebuildingfire0.mdx` — Xful.TargetArt, Xful.TargetArt, Xfum.TargetArt
- `environment/undeadbuildingfire/undeadsmallbuildingfire1.mdx` — Xful.TargetArt, Xfum.TargetArt, Xfus.TargetArt
- `environment/undeadbuildingfire/undeadlargebuildingfire2.mdx` — Xful.TargetArt, Xfum.TargetArt
- `environment/undeadbuildingfire/undeadsmallbuildingfire0.mdx` — Xful.TargetArt
- `abilities/spells/human/divineshield/divineshieldtarget.mdx` — Bvul.Targetart, BHds.Targetart
- `abilities/spells/items/aiam/aiamtarget.mdx` — AIam.Targetart, AIgm.Targetart
- `abilities/spells/human/spellsteal/spellstealmissile.mdx` — AIcm.Missileart, Asps.Missileart
- `objects/inventoryitems/humancaptureflag/humancaptureflag.mdx` — AIfm.Targetart
- `abilities/spells/undead/undeadmine/undeadminecircle.mdx` — Abgm.Effectart
- `environment/largebuildingfire/largebuildingfire2.mdx` — Xfhm.TargetArt, Xfom.TargetArt
- `environment/smallbuildingfire/smallbuildingfire2.mdx` — Xfhm.TargetArt, Xfom.TargetArt, Xfhs.TargetArt, Xfos.TargetArt
- `abilities/spells/items/aiim/aiimtarget.mdx` — AIim.Targetart, AItm.Targetart
- `abilities/spells/undead/impale/impalehittarget.mdx` — BUim.Effectart
- `abilities/weapons/lavaspawnmissile/lavaspawnbirthmissile.mdx` — BNlm.Missileart
- `environment/nightelfbuildingfire/elfsmallbuildingfire2.mdx` — Xfnm.TargetArt, Xfns.TargetArt
- `abilities/spells/items/aism/aismtarget.mdx` — AInm.Targetart, AIsm.Targetart
- `abilities/spells/other/transmute/pileofgold.mdx` — BNtm.Specialart
- `environment/undeadbuildingfire/undeadsmallbuildingfire2.mdx` — Xfum.TargetArt, Xfus.TargetArt
- `abilities/spells/human/banish/banishtarget.mdx` — BHbn.Targetart
- `objects/inventoryitems/nightelfcaptureflag/nightelfcaptureflag.mdx` — AIfn.Targetart
- `abilities/spells/items/aico/crownofcmndtarget.mdx` — AIco.Targetart
- `abilities/spells/other/doom/doomtarget.mdx` — BNdo.Targetart
- `objects/inventoryitems/orccaptureflag/orccaptureflag.mdx` — AIfo.Targetart
- `abilities/spells/items/resourceitems/resourceeffecttarget.mdx` — AIgo.Casterart, AIlu.Targetart
- `abilities/spells/orc/bloodlust/bloodlusttarget.mdx` — Bblo.Targetart, Bfzy.Targetart
- `abilities/spells/orc/bloodlust/bloodlustspecial.mdx` — Bblo.Targetart, Bfzy.Targetart
- `abilities/spells/human/slow/slowtarget.mdx` — Bslo.Targetart
- `abilities/spells/other/monsoon/monsoonrain.mdx` — XNmo.Effectart
- `abilities/spells/items/aiso/aisotarget.mdx` — AIso.Effectart
- `abilities/spells/other/soulburn/soulburnbuff.mdx` — BNso.Targetart
- `abilities/spells/other/tornado/tornado.mdx` — XNto.Effectart
- `abilities/spells/human/polymorph/polymorphtarget.mdx` — A0CP.Specialart, Aply.Specialart, ACpy.Specialart
- `abilities/spells/human/polymorph/polymorphfallingsheepart.mdx` — A0CP.Effectart, Aply.Effectart, ACpy.Effectart
- `abilities/spells/undead/deathpact/deathpactcaster.mdx` — AIdp.Casterart, AUdp.Casterart, BUdp.Targetart
- `abilities/spells/other/stampede/missiledeath.mdx` — Arsp.Specialart
- `abilities/spells/other/stampede/stampedemissile.mdx` — Arsp.Missileart, ANst.Missileart
- `abilities/spells/undead/sleep/sleepspecialart.mdx` — BUsp.Targetart, BUst.Targetart
- `abilities/spells/undead/vampiricaura/vampiricaura.mdx` — ACvp.Targetart, AIav.Targetart, AUav.Targetart
- `abilities/spells/orc/earthquake/earthquaketarget.mdx` — XOeq.Effectart
- `abilities/spells/orc/liquidfire/liquidfire.mdx` — Bliq.Targetart
- `abilities/spells/orc/liquidfire/batridermissile.mdx` — Mliq.Missileart
- `abilities/spells/nightelf/tranquility/tranquility.mdx` — XEtq.Effectart
- `abilities/spells/nightelf/barkskin/barkskintarget.mdx` — Bbar.Targetart
- `abilities/spells/undead/regenerationaura/obsidianregenaura.mdx` — Aabr.Targetart
- `abilities/spells/orc/reinforcedtrollburrow/reinforcedtrollburrowtarget.mdx` — Arbr.Targetart
- `abilities/spells/undead/darkritual/darkritualcaster.mdx` — AUdr.Casterart
- `abilities/spells/nightelf/entanglingroots/entanglingrootstarget.mdx` — BEer.Targetart
- `abilities/spells/nightelf/corrosivebreath/chimaeraacidtargetart.mdx` — Bcor.Targetart
- `abilities/spells/nightelf/tranquility/tranquilitytarget.mdx` — AEtr.Targetart
- `abilities/spells/undead/absorbmana/absorbmanabirthmissile.mdx` — Aabs.Missileart
- `abilities/spells/undead/darksummoning/darksummontarget.mdx` — AUds.Effectart, AUds.Targetart
- `abilities/spells/undead/darksummoning/darksummonmissile.mdx` — AUds.Missileart
- `abilities/spells/human/manashield/manashieldcaster.mdx` — BNms.Targetart
- `abilities/spells/undead/unsummon/unsummontarget.mdx` — Buns.Targetart
- `abilities/spells/undead/possession/possessiontarget.mdx` — Bpos.Targetart
- `abilities/spells/undead/curse/cursetarget.mdx` — Bcrs.Targetart
- `abilities/spells/items/spellshieldamulet/spellshieldcaster.mdx` — ANss.Casterart, Bnss.Targetart
- `abilities/spells/human/magicsentry/magicsentrycaster.mdx` — Adts.Casterart
- `abilities/spells/human/invisibility/invisibilitytarget.mdx` — Aivs.Targetart
- `abilities/spells/nightelf/eattree/eattreesprite.mdx` — Aeat.Specialart
- `abilities/spells/human/feedback/arcanetowerattack.mdx` — Afbt.Specialart
- `abilities/spells/nightelf/moonwell/moonwelltarget.mdx` — Ambt.Effectart, Ambt.Effectart, Ambt.Effectart, Ambt.Effectart
- `abilities/spells/nightelf/moonwell/corruptedmoonwelltarget.mdx` — Ambt.Effectart
- `abilities/spells/nightelf/moonwell/moonwellcasterart.mdx` — Ambt.Casterart
- `abilities/spells/other/andt/andt.mdx` — Xbdt.Effectart
- `abilities/spells/items/tomeofretraining/tomeofretrainingcaster.mdx` — Aret.Casterart
- `abilities/spells/other/howlofterror/howltarget.mdx` — BNht.Targetart
- `abilities/spells/human/aerialshackles/aerialshacklestarget.mdx` — Bmlt.Targetart
- `abilities/spells/nightelf/entanglemine/roots.mdx` — Aent.Casterart
- `abilities/spells/orc/ancestralspirit/ancestralspiritcaster.mdx` — Aast.Casterart
- `abilities/spells/human/avatar/avatarcaster.mdx` — AHav.Casterart
- `abilities/spells/orc/devour/devoureffectart.mdx` — Adev.Specialart
- `abilities/spells/orc/healingwave/healingwavetarget.mdx` — AChV.Targetart, ANhw.Targetart, AOhw.Targetart
- `abilities/spells/items/vampiricpotion/vamppotioncaster.mdx` — AIpv.Casterart
- `abilities/spells/items/potionofomniscience/crystalballcaster.mdx` — AIrv.Casterart
- `abilities/spells/nightelf/spiritofvengeance/spiritofvengeancebirthmissile.mdx` — AEsv.Missileart
- `abilities/spells/items/aiso/bisvtarget.mdx` — BIsv.Targetart
- `objects/inventoryitems/battlestandard/battlestandard.mdx` — AIfx.Targetart
- `abilities/spells/human/markofchaos/markofchaostarget.mdx` — AHpx.Specialart
- `abilities/spells/human/blizzard/blizzardtarget.mdx` — XHbz.Effectart
- `abilities/spells/undead/freezingbreath/freezingbreathtargetart.mdx` — Bfrz.Targetart

### 全量召唤单位中的缺失模型（0）

无

## 建议修复顺序

1. 当前地图和全量原版召唤/掉落物模型已经补齐。
2. 下一步可按需补全全量原版表中仍未使用的标准技能特效。
3. 再补全通用建筑模型和其余未使用的原版视觉资源。

审计数据：[artifacts/model-resource-audit.json](../artifacts/model-resource-audit.json)；重新生成：`node tools/audit_model_resources.mjs`。

补充说明：敌方模型在较远距离显示红色圆柱时，优先检查 LOD 而不是模型缺失；当前 `public/models.js` 会在敌方距离超过约 40 个世界单位时切换低模实例。
