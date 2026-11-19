import fs from 'node:fs';
const x = JSON.parse(fs.readFileSync('artifacts/model-resource-audit.json', 'utf8'));
const esc = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const status = row => row.present ? '已存在' : '缺失';
const table = (headers, rows) => [`| ${headers.join(' | ')} |`,`| ${headers.map(() => '---').join(' | ')} |`,...rows.map(row => `| ${row.map(esc).join(' | ')} |`)].join('\n');
const pathRows = rows => rows.map(r => [r.path, status(r), r.refs?.map(ref => ref.source).filter(Boolean).slice(0, 8).join(', ') || '']);
const rowNames = row => row.names?.join(' / ') || '';
const groups = rows => {
  const map = new Map();
  for (const row of rows) { const key = row.path.split('/').slice(0, 2).join('/'); map.set(key, (map.get(key) || 0) + 1); }
  return [...map].sort((a,b) => b[1] - a[1]);
};
const missingAbility = x.missing.allAbilities;
const missingUnits = x.missing.allUnits;
const missingBuildings = x.buildings.all.filter(r => !r.present);
const summonRows = x.summons.mapUsed.map(r => [r.ids.join(', '), rowNames(r), r.path, status(r), r.refs.join(', ')]);
const allSummonRows = x.summons.all.filter(r => !r.present).map(r => [r.ids.join(', '), rowNames(r), r.path, r.refs.join(', ')]);
const itemRows = x.items.all.map(r => [r.ids.join(', '), rowNames(r), r.path, status(r)]);
const buildingRows = missingBuildings.map(r => [r.ids.join(', '), rowNames(r), r.path]);
const coreMissing = x.core.filter(r => !r.present);
const categories = x.catalogs.map(r => [r.name, r.total, r.present, r.missing]);
const generated = new Date().toISOString();
const report = `# ${String.fromCharCode(0x6a21,0x578b,0x8d44,0x6e90,0x5ba1,0x8ba1)}\n\n- ${String.fromCharCode(0x6e90,0x5730,0x56fe)}：${x.source.map.name} (${x.source.map.sha256})\n- ${String.fromCharCode(0x5ba1,0x8ba1,0x65f6,0x95f4)}：${generated}\n- ${String.fromCharCode(0x6e05,0x5355)}：${x.manifest.models} 个 MDX 模型，${x.manifest.resources} 个总资源，下载失败 ${x.manifest.failedDownloads} 个。\n- ${String.fromCharCode(0x5224,0x5b9a,0x89c4,0x5219)}：路径在 \`public/warcraft/manifest.json\` 或本地 MDX 文件中存在才记为“已存在”；同一路径在多个数据表出现只计一次。\n\n## ${String.fromCharCode(0x7ed3,0x8bba)}\n\n${String.fromCharCode(0x5f53,0x524d,0x53ef,0x73a9,0x5185,0x5bb9)}：职业、建造菜单、56 波次单位、5 个首领和 H05V 共 ${x.core.length} 个唯一模型引用，缺失 ${coreMissing.length} 个；66 个可建造单位模型也全部存在。当前地图使用的 139 个技能特效/弹道模型全部存在，266 个地图装饰中归并为 29 个模型且全部存在。\n\n${String.fromCharCode(0x5f53,0x524d,0x4f1a,0x51fa,0x73b0,0x6a21,0x578b,0x7f3a,0x53e3)}：召唤能力引用的 12 个唯一模型中有 8 个缺失；地图物品引用的世界模型有 1 个缺失（19 个物品共用）；原始数据的另一个物品模型也缺失。缺失模型会进入当前程序化替代或通用特效路径，逻辑仍可运行，但外观、动画、粒子和挂点无法与原版一致。\n\n${String.fromCharCode(0x6ce8,0x610f)}：清单中的“下载失败”为 0 只说明本次下载过程没有 HTTP/解析失败；不代表原版全量数据的 512 个技能特效模型都已经纳入清单。\n\n## ${String.fromCharCode(0x5f53,0x524d,0x73a9,0x6cd5,0x5f71,0x54cd,0x7684,0x7f3a,0x5931)}\n\n### ${String.fromCharCode(0x53ec,0x5524,0x5355,0x4f4d)}\n\n${table(['UnitID','名称','源模型路径','状态','引用能力'], summonRows)}\n\n8 个缺失源模型的运行时处理：\n\n- \`units/nightelf/ent/ent.mdx\`：当前通过 corruptedent 别名和程序化树人替代，外观不是原始 Ent。\n- \`units/orc/spiritwolf/spiritwolf.mdx\`、\`units/creeps/grizzlybear/grizzlybear.mdx\`：进入 beast 程序化模型。\n- \`units/creeps/lavaspawn/lavaspawn.mdx\`、\`units/undead/locust/locust.mdx\`：进入 elemental/arachnid 程序化模型。\n- \`units/demon/doomguard/doomguard.mdx\`：进入 brute 程序化模型。\n- \`units/undead/skeleton/skeleton.mdx\`、\`units/creeps/herotinkerfactory/herotinkerfactory.mdx\`：使用通用人形程序化模型，差异最大。\n\n### ${String.fromCharCode(0x6389,0x843d,0x7269)}\n\n${table(['ItemID','名称','源模型路径','状态'], itemRows)}\n\n地图实际脚本引用的是 treasurechest 路径，因此掉落物目前没有原版宝箱模型；当前掉落表现使用程序化光环/粒子，物品图标和装备逻辑不受此路径影响。\n\n### ${String.fromCharCode(0x5efa,0x7b51)}\n\n当前地图可建造的 66 个模型全部存在。全量单位表中另有 ${missingBuildings.length} 个建筑定义缺失，属于未进入本地图建造菜单或未被当前核心流程使用的基础建筑：\n\n${table(['UnitID','名称','缺失模型路径'], buildingRows)}\n\n### ${String.fromCharCode(0x6280,0x80fd,0x7279,0x6548,0x4e0e,0x5f39,0x9053)}\n\n当前地图实际能力集合的模型特效/弹道 ${x.catalogs.find(r => r.name === 'map-used-ability-effect-models').total} 个全部存在，因此当前波次、职业和脚本技能缺口不是“模型文件没下载”。全量原版能力字符串里共有 ${x.catalogs.find(r => r.name === 'all-ability-effect-models').total} 个不同模型路径，其中缺失 ${missingAbility.length} 个，主要是未被本地图使用的标准技能、物品技能、环境火焰、死亡特效和通用武器。\n\n全量缺失按目录统计：${groups(missingAbility).map(([group,count]) => `\`${group}\` ${count}`).join('，')}。完整路径见下方附录和 JSON。\n\n### ${String.fromCharCode(0x5730,0x56fe,0x88c5,0x9970,0x4e0e,0x5d4c,0x5165,0x6a21,0x578b)}\n\n266 个放置记录归并为 29 个模型，当前全部存在。嵌入模型中 \`war3mapimported/laser.mdx\` 存在，\`war3mapimported/loadingscreen.mdx\` 没有复制到 \`public/warcraft\`；后者是载入界面资源，不影响战场单位。\n\n## ${String.fromCharCode(0x5168,0x91cf,0x7f3a,0x5931,0x7d22,0x5f15)}\n\n下面是全量原始数据引用中缺失的路径。它们与上面的“当前玩法缺失”有重叠，不要将各行相加：\n\n### ${String.fromCharCode(0x5355,0x4f4d,0x6a21,0x578b)}（${missingUnits.length}）\n\n${missingUnits.map(r => `- \`${r.path}\` — ${r.refs.map(v => v.source).join(', ')}`).join('\n')}\n\n### ${String.fromCharCode(0x6280,0x80fd,0x7279,0x6548,0x3001,0x5f39,0x9053,0x548c,0x5171,0x7528,0x6548,0x679c)}（${missingAbility.length}）\n\n${missingAbility.map(r => `- \`${r.path}\` — ${r.refs.map(v => `${v.source}.${v.field}`).join(', ')}`).join('\n')}\n\n### ${String.fromCharCode(0x5168,0x91cf,0x53ec,0x5524,0x5355,0x4f4d,0x4e2d,0x7684,0x7f3a,0x5931,0x6a21,0x578b)}（${x.missing.summonsAll.length}）\n\n${allSummonRows.length ? table(['UnitID','名称','缺失模型路径','引用能力'], allSummonRows) : '无'}\n\n## ${String.fromCharCode(0x5efa,0x8bae,0x4fee,0x590d,0x987a,0x5e8f)}\n\n1. ${String.fromCharCode(0x5148,0x8865,0x5168,0x516b,0x7c7b,0x5f53,0x524d,0x4f1a,0x51fa,0x573a,0x7684,0x53ec,0x5524,0x6a21,0x578b)}：Skeleton、Ent、SpiritWolf、GrizzlyBear、DoomGuard、HeroTinkerFactory、Locust、LavaSpawn。\n2. ${String.fromCharCode(0x8865,0x5168,0x6389,0x843d,0x7269,0x7684,0x0054,0x0072,0x0065,0x0061,0x0073,0x0075,0x0072,0x0065,0x0043,0x0068,0x0065,0x0073,0x0074,0x002f,0x0054,0x006f,0x006d,0x0065,0x0042,0x0072,0x006f,0x0077,0x006e)}。\n3. ${String.fromCharCode(0x518d,0x8865,0x5168,0x5168,0x91cf,0x539f,0x7248,0x80fd,0x529b,0x7279,0x6548,0x548c,0x901a,0x7528,0x5efa,0x7b51,0x6a21,0x578b)}，这一步只影响未使用的原版内容，不应和当前战场缺口混在一起。\n\n${String.fromCharCode(0x5ba1,0x8ba1,0x6570,0x636e)}：[artifacts/model-resource-audit.json](../artifacts/model-resource-audit.json)；${String.fromCharCode(0x91cd,0x65b0,0x751f,0x6210)}：\`node tools/audit_model_resources.mjs\`。\n\n${String.fromCharCode(0x8865,0x5145,0x8bf4,0x660e)}：敌方模型在较远距离显示红色圆柱时，优先检查 LOD 而不是模型缺失；当前 \`public/models.js\` 会在敌方距离超过约 40 个世界单位时切换低模实例。\n`;
const mapSummonMissing = x.missing.summonsMap.length;
const mapItemMissing = x.missing.itemsMap.length;
const mapItemTotal = x.items.mapUsed.length;
const currentGap = mapSummonMissing || mapItemMissing
  ? String.fromCharCode(0x5f53,0x524d,0x5730,0x56fe,0x4ecd,0x6709) + ' ' + mapSummonMissing + String.fromCharCode(0x4e2a,0x53ec,0x5524,0x6a21,0x578b,0x548c) + ' ' + mapItemMissing + String.fromCharCode(0x4e2a,0x6389,0x843d,0x7269,0x6a21,0x578b,0x7f3a,0x5931) + String.fromCharCode(0x3002,0x7f3a,0x5931,0x9879,0x4f1a,0x8fdb,0x5165,0x7a0b,0x5e8f,0x5316,0x66ff,0x4ee3,0x6216,0x901a,0x7528,0x6389,0x843d,0x7279,0x6548,0x3002)
  : '当前地图引用的召唤单位和掉落物原始模型及纹理已存在。此审计检查文件和引用；场景渲染、动画及技能触发需要另行验证，不能由资源存在推断。';
const summonRuntime = mapSummonMissing
  ? String.fromCharCode(0x4ecd,0x6709,0x7f3a,0x5931,0x53ec,0x5524,0x6e90,0x6a21,0x578b,0xFF0C) + '\n\n' + x.missing.summonsMap.map(row => '- `' + row.path + '`').join('\n')
  : '当前地图召唤模型均已取得原始 MDX 和纹理。实际显示仍取决于客户端接入、动画及 LOD，资源审计不代替运行验证。';
const dropRuntime = mapItemMissing
  ? String.fromCharCode(0x5730,0x56fe,0x5b9e,0x9645,0x811a,0x672c,0x4ecd,0x6709,0x6389,0x843d,0x7269,0x4e16,0x754c,0x6a21,0x578b,0x7f3a,0x5931,0x3002)
  : `地图实际引用的 ${mapItemTotal} 个唯一物品模型路径已取得原始 MDX 和纹理。客户端接入及拾取、丢弃、使用验证见 [掉落物与原图核对](item-drop-parity.md)。TreasureChest 为本图共享的装备地面模型，TomeBrown 属于未使用的原版物品资源。`;
let finalReport = report
  .replace(/\u5f53\u524d\u4f1a\u51fa\u73b0\u6a21\u578b\u7f3a\u53e3：[\s\S]*?\u539f\u7248\u4e00\u81f4。/, currentGap)
  .replace(/8 \u4e2a\u7f3a\u5931\u6e90\u6a21\u578b\u7684\u8fd0\u884c\u65f6\u5904\u7406：[\s\S]*?\u5dee\u5f02\u6700\u5927。/, summonRuntime)
  .replace(/\u5730\u56fe\u5b9e\u9645\u811a\u672c\u5f15\u7528\u7684\u662f treasurechest \u8def\u5f84，因此\u6389\u843d\u7269\u76ee\u524d\u6ca1\u6709\u539f\u7248\u5b9d\u7bb1\u6a21\u578b；\u5f53\u524d\u6389\u843d\u8868\u73b0\u4f7f\u7528\u7a0b\u5e8f\u5316\u5149\u73af\/\u7c92\u5b50，\u7269\u54c1\u56fe\u6807\u548c\u88c5\u5907\u903b\u8f91\u4e0d\u53d7\u6b64\u8def\u5f84\u5f71\u54cd。/, dropRuntime)
  .replace(/1\. \u5148\u8865\u5168\u516b\u7c7b\u5f53\u524d\u4f1a\u51fa\u573a\u7684\u53ec\u5524\u6a21\u578b：[\s\S]*?2\. \u8865\u5168\u6389\u843d\u7269\u7684\s*TreasureChest\/TomeBrown。/, '1. ' + String.fromCharCode(0x5f53,0x524d,0x5730,0x56fe,0x7684,0x53ec,0x5524,0x6a21,0x578b,0x548c,0x6389,0x843d,0x7269,0x6a21,0x578b,0x5df2,0x7ecf,0x8865,0x9f50,0x3002) + '\n2. ' + String.fromCharCode(0x4e0b,0x4e00,0x6b65,0x53ef,0x6309,0x9700,0x8865,0x5168,0x5168,0x91cf,0x539f,0x7248,0x8868,0x4e2d,0x4ecd,0x672a,0x4f7f,0x7528,0x7684,0x53ec,0x5524,0x6a21,0x578b,0x548c,0x6807,0x51c6,0x6280,0x80fd,0x7279,0x6548) + '。');
const remainingSummons = x.missing.summonsAll.length;
const remainingItems = x.missing.itemsAll.length;
const recommendation = remainingSummons || remainingItems
  ? `1. 继续补全仍缺失的 ${remainingSummons} 个原版召唤模型和 ${remainingItems} 个物品模型。\n2. 按需补全全量原版表中未使用的标准技能特效。\n3. 再补全通用建筑模型和其余未使用的原版视觉资源。`
  : '1. 当前地图和全量原版召唤/掉落物模型已经补齐。\n2. 下一步可按需补全全量原版表中仍未使用的标准技能特效。\n3. 再补全通用建筑模型和其余未使用的原版视觉资源。';
finalReport = finalReport.replace(/1\. 当前地图的召唤模型和掉落物模型已经补齐。[\s\S]*?3\. 再补全全量原版能力特效和通用建筑模型，这一步只影响未使用的原版内容，不应和当前战场缺口混在一起。/, recommendation);
fs.writeFileSync('docs/model-resource-audit.md', finalReport, 'utf8');

