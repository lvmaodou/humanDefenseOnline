// Generated from the supplied map; regenerate with tools/compile_jass.py.
export function install(V) {
const G=V.globals;
const F=V.functions;
F.__globals = function* () {
G.udg_u = null;
G.udg_uuuuu = null;
G.udg_waves = 0;
G.udg_EnemyType = V.array(0);
G.udg_i = 0;
G.udg_lives = 0;
G.udg_SFHero = null;
G.udg_TempPoi = null;
G.udg_TempGro = null;
G.udg_zhiyexuanze = V.array("");
G.udg_zhiyenm = V.array(0);
G.udg_level1 = V.array(0);
G.udg_level2 = V.array(0);
G.udg_level3 = V.array(0);
G.udg_level4 = V.array(0);
G.udg_level5 = V.array(0);
G.udg_bd = V.array(0);
G.udg_zhiye = V.array(null);
G.udg_zhiyexz1 = V.array(null);
G.udg_zhiyexz2 = V.array(null);
G.udg_zhiyexz3 = V.array(null);
G.udg_zhiyexz4 = V.array(null);
G.udg_j = 0;
G.udg_BossType = V.array(0);
G.udg_Kills = V.array(0);
G.udg_YMu = null;
G.udg_YMuuuu = null;
G.udg_weili = 0;
G.udg_huitian = null;
G.udg_Pointa = null;
G.udg_Pointb = null;
G.udg_daozei = V.array(false);
G.udg_zhiyu = 0;
G.udg_gaolidai = V.array(false);
G.udg_nongming = V.array(null);
G.udg_nandukuang = null;
G.udg_nanduxz = V.array(null);
G.udg_nanduzi = V.array("");
G.udg_xuanze = false;
G.udg_jingling = V.array(null);
G.udg_C = 0;
G.udg_D = 0;
G.udg_E = 0;
G.udg_Pointc = null;
G.udg_Pointd = null;
G.udg_PointE = null;
G.udg_aoyunjingling = V.array(null);
G.udg_A = 0;
G.udg_B = 0;
G.udg_keji = V.array(0);
G.udg_nandujibie = 0;
G.udg_levelT1 = V.array(0);
G.udg_levelT2 = V.array(0);
G.udg_levelT3 = V.array(0);
G.udg_jinengT1 = V.array(0);
G.udg_jinengT2 = V.array(0);
G.udg_jinengT3 = V.array(0);
G.udg_jinengS1 = V.array(0);
G.udg_jinengS2 = V.array(0);
G.udg_jinengS3 = V.array(0);
G.udg_defeat = false;
G.udg_jinggao = V.array(0);
G.udg_jiaodu = 0;
G.udg_zhuanshenP = null;
G.udg_gongxun = 0;
G.udg_shentou = false;
G.udg_nanadead = false;
G.udg_baijia = V.array(false);
G.udg_fennu = false;
G.gg_rct_a1 = null;
G.gg_rct_a2 = null;
G.gg_rct_a3 = null;
G.gg_rct_a4 = null;
G.gg_rct_a5 = null;
G.gg_rct_a6 = null;
G.gg_rct_a7 = null;
G.gg_rct_a8 = null;
G.gg_rct_a9 = null;
G.gg_rct_b1 = null;
G.gg_rct_b2 = null;
G.gg_rct_b3 = null;
G.gg_rct_b4 = null;
G.gg_rct_b5 = null;
G.gg_rct_b6 = null;
G.gg_rct_b7 = null;
G.gg_rct_b8 = null;
G.gg_rct_b9 = null;
G.gg_rct_c1 = null;
G.gg_rct_c2 = null;
G.gg_rct_c3 = null;
G.gg_rct_c4 = null;
G.gg_rct_c5 = null;
G.gg_rct_c6 = null;
G.gg_rct_c7 = null;
G.gg_rct_c8 = null;
G.gg_rct_c9 = null;
G.gg_rct_d1 = null;
G.gg_rct_d3 = null;
G.gg_rct_d4 = null;
G.gg_rct_d5 = null;
G.gg_rct_d6 = null;
G.gg_rct_d7 = null;
G.gg_rct_d8 = null;
G.gg_rct_d9 = null;
G.gg_rct_d2 = null;
G.gg_rct_aa = null;
G.gg_rct_dd = null;
G.gg_rct_bb = null;
G.gg_rct_cc = null;
G.gg_rct_ee = null;
G.gg_rct_aaa = null;
G.gg_rct_bbb = null;
G.gg_rct_ccc = null;
G.gg_rct_ddd = null;
G.gg_rct_aa20 = null;
G.gg_rct_bb20 = null;
G.gg_rct_cc20 = null;
G.gg_rct_dd20 = null;
G.gg_rct_ra1 = null;
G.gg_rct_ra2 = null;
G.gg_rct_ra3 = null;
G.gg_rct_ra4 = null;
G.gg_rct_ra5 = null;
G.gg_rct_AoyunDelete = null;
G.gg_cam_yadianna = null;
G.gg_snd_War2IntroMusic = "";
G.gg_snd_Credits = "";
G.gg_snd_PH1 = "";
G.gg_snd_IllidansTheme = "";
G.gg_snd_LichKingTheme = "";
G.gg_snd_SadMystery = "";
G.gg_snd_Doom = "";
G.gg_snd_PursuitTheme = "";
G.gg_trg_chushiziyuan = null;
G.gg_trg_kaishi = null;
G.gg_trg_Make = null;
G.gg_trg_Add_Point = null;
G.gg_trg_LRzhuanshen = null;
G.gg_trg_LRsiwangqiyue = null;
G.gg_trg_LRhuitianmiedi = null;
G.gg_trg_LRpaoxiao1 = null;
G.gg_trg_LRpaoxiao2 = null;
G.gg_trg_LRpaoxiao3 = null;
G.gg_trg_LRjingxia1 = null;
G.gg_trg_LRjingxia2 = null;
G.gg_trg_LRjingxia3 = null;
G.gg_trg_LRshuren1 = null;
G.gg_trg_LRshuren2 = null;
G.gg_trg_LRshuren3 = null;
G.gg_trg_LRlang1 = null;
G.gg_trg_LRlang2 = null;
G.gg_trg_LRlang3 = null;
G.gg_trg_LRshandian1 = null;
G.gg_trg_LRshandian2 = null;
G.gg_trg_LRshandian3 = null;
G.gg_trg_LRshandian4 = null;
G.gg_trg_LRdahuo1 = null;
G.gg_trg_LRdahuo2 = null;
G.gg_trg_LRdahuo3 = null;
G.gg_trg_LRdahuo4 = null;
G.gg_trg_LRqunxing1 = null;
G.gg_trg_LRqunxing2 = null;
G.gg_trg_LRqunxing3 = null;
G.gg_trg_LRqunxing4 = null;
G.gg_trg_LRqunbu = null;
G.gg_trg_YMmajiajue = null;
G.gg_trg_YMsheshenquyi = null;
G.gg_trg_YMzhaohuanxiong1 = null;
G.gg_trg_YMzhaohuanxiong2 = null;
G.gg_trg_YMzhaohuanxiong3 = null;
G.gg_trg_YMjingshu1 = null;
G.gg_trg_YMjingshu2 = null;
G.gg_trg_YMjingshu3 = null;
G.gg_trg_YMdiyuhuo1 = null;
G.gg_trg_YMdiyuhuo2 = null;
G.gg_trg_YMdiyuhuo3 = null;
G.gg_trg_YMdiyuhuo4 = null;
G.gg_trg_YMchongjibo1 = null;
G.gg_trg_YMchongjibo2 = null;
G.gg_trg_YMchongjibo3 = null;
G.gg_trg_YMdimaoci1 = null;
G.gg_trg_YMdimaoci2 = null;
G.gg_trg_YMdimaoci3 = null;
G.gg_trg_YMdimaoci4 = null;
G.gg_trg_YMfengbaozhichui1 = null;
G.gg_trg_YMfengbaozhichui2 = null;
G.gg_trg_YMfengbaozhichui3 = null;
G.gg_trg_YMfengbaozhichui4 = null;
G.gg_trg_YMLeiTing = null;
G.gg_trg_SSkusimingxiang = null;
G.gg_trg_SSbingxueluanwu1 = null;
G.gg_trg_SSbingxueluanwu2 = null;
G.gg_trg_SSbingxueluanwu3 = null;
G.gg_trg_SSbingxueluanwu4 = null;
G.gg_trg_SSbaofengxue1 = null;
G.gg_trg_SSbaofengxue2 = null;
G.gg_trg_SSbaofengxue3 = null;
G.gg_trg_SSshuiyuansu1 = null;
G.gg_trg_SSshuiyuansu2 = null;
G.gg_trg_SSshuiyuansu3 = null;
G.gg_trg_SSfenghuangniepan1 = null;
G.gg_trg_SSfenghuangniepan2 = null;
G.gg_trg_SSfenghuangniepan3 = null;
G.gg_trg_SSfenghuangniepan4 = null;
G.gg_trg_SSxixingdafa1 = null;
G.gg_trg_SSxixingdafa2 = null;
G.gg_trg_SSxixingdafa3 = null;
G.gg_trg_SSxixingdafa4 = null;
G.gg_trg_SSjulang1 = null;
G.gg_trg_SSjulang2 = null;
G.gg_trg_SSjulang3 = null;
G.gg_trg_SSJiejie = null;
G.gg_trg_YXchaojipaoxiao = null;
G.gg_trg_YXwanjian1 = null;
G.gg_trg_YXwanjian2 = null;
G.gg_trg_YXwanjian3 = null;
G.gg_trg_YXhuoyanyu1 = null;
G.gg_trg_YXhuoyanyu2 = null;
G.gg_trg_YXhuoyanyu3 = null;
G.gg_trg_YXhuoyanyu4 = null;
G.gg_trg_YXliehuojingu1 = null;
G.gg_trg_YXliehuojingu2 = null;
G.gg_trg_YXliehuojingu3 = null;
G.gg_trg_YXliehuojingu4 = null;
G.gg_trg_YXdaolunzhan1 = null;
G.gg_trg_YXdaolunzhan2 = null;
G.gg_trg_YXdaolunzhan3 = null;
G.gg_trg_YXshandianhudun1 = null;
G.gg_trg_YXshandianhudun2 = null;
G.gg_trg_YXshandianhudun3 = null;
G.gg_trg_YXshandianhudun4 = null;
G.gg_trg_YXBingfengqiu = null;
G.gg_trg_DZshentouA = null;
G.gg_trg_DZshentouB = null;
G.gg_trg_DZzhiyutxt = null;
G.gg_trg_DZrengqian = null;
G.gg_trg_DZsuoding = null;
G.gg_trg_DZbaijia1 = null;
G.gg_trg_DZzhiyu = null;
G.gg_trg_DZshentou1 = null;
G.gg_trg_DZshentou2 = null;
G.gg_trg_DZshentou3 = null;
G.gg_trg_DZtouqian = null;
G.gg_trg_DZshandianfengbao1 = null;
G.gg_trg_DZshandianfengbao2 = null;
G.gg_trg_DZshandianfengbao3 = null;
G.gg_trg_DZlinghunsuolian1 = null;
G.gg_trg_DZlinghunsuolian2 = null;
G.gg_trg_DZlinghunsuolian3 = null;
G.gg_trg_DZlinghunsuolian4 = null;
G.gg_trg_DZmorishenpan1 = null;
G.gg_trg_DZmorishenpan2 = null;
G.gg_trg_DZmorishenpan3 = null;
G.gg_trg_DZmorishenpan4 = null;
G.gg_trg_DZshachongji1 = null;
G.gg_trg_DZshachongji2 = null;
G.gg_trg_DZshachongji3 = null;
G.gg_trg_DZanyingtouxi1 = null;
G.gg_trg_DZanyingtouxi2 = null;
G.gg_trg_DZanyingtouxi3 = null;
G.gg_trg_DZanyingtouxi4 = null;
G.gg_trg_DZmanteng1 = null;
G.gg_trg_DZmanteng2 = null;
G.gg_trg_DZmanteng3 = null;
G.gg_trg_DZbinggongchang1 = null;
G.gg_trg_DZbinggongchang2 = null;
G.gg_trg_DZbinggongchang3 = null;
G.gg_trg_DZJianrenfengbao = null;
G.gg_trg_MJSfennu = null;
G.gg_trg_MJSmoliquanshui1 = null;
G.gg_trg_MJSmoliquanshui2 = null;
G.gg_trg_MJSmoliquanshui3 = null;
G.gg_trg_MJSwanjianguizong = null;
G.gg_trg_MJSsiwangsuolian1 = null;
G.gg_trg_MJSsiwangsuolian2 = null;
G.gg_trg_MJSsiwangsuolian3 = null;
G.gg_trg_MJSrenlunwu1 = null;
G.gg_trg_MJSrenlunwu2 = null;
G.gg_trg_MJSrenlunwu3 = null;
G.gg_trg_MJSrenlunwu4 = null;
G.gg_trg_MJSguihuoluanwu1 = null;
G.gg_trg_MJSguihuoluanwu2 = null;
G.gg_trg_MJSguihuoluanwu3 = null;
G.gg_trg_MJSguihuoluanwu4 = null;
G.gg_trg_MJSwanjianjue1 = null;
G.gg_trg_MJSwanjianjue2 = null;
G.gg_trg_MJSwanjianjue3 = null;
G.gg_trg_MJSwanjianjue4 = null;
G.gg_trg_MJSlongpao1 = null;
G.gg_trg_MJSlongpao2 = null;
G.gg_trg_MJSlongpao3 = null;
G.gg_trg_MJSnihong1 = null;
G.gg_trg_MJSnihong2 = null;
G.gg_trg_MJSnihong3 = null;
G.gg_trg_Hit = null;
G.gg_trg_MJSlingguang1 = null;
G.gg_trg_MJSlingguang2 = null;
G.gg_trg_MJSlingguang3 = null;
G.gg_trg_chushou = null;
G.gg_trg_ChakanGXZ = null;
G.gg_trg_shougou = null;
G.gg_trg_Defeated = null;
G.gg_trg_Victory = null;
G.gg_trg_Boss_Dead = null;
G.gg_trg_Set_Enemies = null;
G.gg_trg_nanduxz = null;
G.gg_trg_zhiye = null;
G.gg_trg_zhiyexz = null;
G.gg_trg_xz1 = null;
G.gg_trg_xz2 = null;
G.gg_trg_xz3 = null;
G.gg_trg_xz4 = null;
G.gg_trg_wq = null;
G.gg_trg_a1 = null;
G.gg_trg_a2 = null;
G.gg_trg_a3 = null;
G.gg_trg_a4 = null;
G.gg_trg_a5 = null;
G.gg_trg_a6 = null;
G.gg_trg_a7 = null;
G.gg_trg_a8 = null;
G.gg_trg_a9 = null;
G.gg_trg_b1 = null;
G.gg_trg_b2 = null;
G.gg_trg_b3 = null;
G.gg_trg_b4 = null;
G.gg_trg_b5 = null;
G.gg_trg_b6 = null;
G.gg_trg_b7 = null;
G.gg_trg_b8 = null;
G.gg_trg_b9 = null;
G.gg_trg_c1 = null;
G.gg_trg_c2 = null;
G.gg_trg_c3 = null;
G.gg_trg_c4 = null;
G.gg_trg_c5 = null;
G.gg_trg_c6 = null;
G.gg_trg_c7 = null;
G.gg_trg_c8 = null;
G.gg_trg_c9 = null;
G.gg_trg_d1 = null;
G.gg_trg_d2 = null;
G.gg_trg_d3 = null;
G.gg_trg_d4 = null;
G.gg_trg_d5 = null;
G.gg_trg_d6 = null;
G.gg_trg_d7 = null;
G.gg_trg_d8 = null;
G.gg_trg_d9 = null;
G.gg_trg_AllUnit = null;
G.gg_trg_LevelUp = null;
G.gg_trg_GetP1 = null;
G.gg_trg_GetP2 = null;
G.gg_trg_GetP3 = null;
G.gg_trg_GetP4 = null;
G.gg_trg_GetP5 = null;
G.gg_trg_P1Leave = null;
G.gg_trg_P2Leave = null;
G.gg_trg_P3Leave = null;
G.gg_trg_P4Leave = null;
G.gg_trg_P5Leave = null;
G.gg_trg_EnterP1 = null;
G.gg_trg_EnterP2 = null;
G.gg_trg_EnterP3 = null;
G.gg_trg_EnterP4 = null;
G.gg_trg_luanpao1 = null;
G.gg_trg_luanpao2 = null;
G.gg_trg_luanpao3 = null;
G.gg_trg_luanpao4 = null;
G.gg_trg_luanpaoE = null;
G.gg_trg_luanpaoA20 = null;
G.gg_trg_luanpaoB20 = null;
G.gg_trg_luanpaoC20 = null;
G.gg_trg_luanpaoD20 = null;
G.gg_trg_zidingyi75 = null;
G.gg_trg_Lv1Delete = null;
G.gg_trg_dengluwow8 = null;
G.gg_trg_donghua = null;
G.gg_trg_BlueAndRed = null;
G.gg_trg_YellowAndGreen = null;
G.gg_trg_Black = null;
G.gg_trg_Dianhuoju = null;
G.gg_trg_nongmingPre1 = null;
G.gg_trg_nongmingPre2 = null;
G.gg_trg_nongmingPre3 = null;
G.gg_trg_nongmingPre4 = null;
G.gg_trg_nongmingPre5 = null;
G.gg_trg_jianjie = null;
G.gg_trg_TZLRchanrao = null;
G.gg_trg_TZMJSzhaohuan = null;
G.gg_trg_TZMJSlongyin = null;
G.gg_trg_TZMJSzhenwu = null;
G.gg_trg_TZSSwuyun = null;
G.gg_trg_TZSSlongjuanfeng = null;
G.gg_trg_TZDZqiangjie = null;
G.gg_trg_TZDZtoushu = null;
G.gg_trg_TZAllUnit = null;
G.gg_trg_tingzhijinggao = null;
G.gg_trg_nanadead = null;
G.gg_trg_tishiyinyue = null;
G.gg_trg_yinyue1 = null;
G.gg_trg_yinyue2 = null;
G.gg_trg_yinyue3 = null;
G.gg_trg_yinyue4 = null;
G.gg_trg_yinyue5 = null;
G.gg_trg_yinyue6 = null;
G.gg_trg_yinyue7 = null;
G.gg_trg_yinyue8 = null;
G.gg_unit_e007_0015 = null;
G.gg_unit_Hblm_0011 = null;
G.gg_unit_Hjai_0009 = null;
G.gg_unit_e007_0010 = null;
G.gg_unit_e007_0012 = null;
G.gg_unit_e007_0013 = null;
G.gg_unit_e007_0014 = null;
G.udg_dan = V.array(false);
G.udg_rukouname = V.array("");
G.gg_trg_danji1 = (yield* V.call("CreateTrigger"));
G.gg_trg_danji2 = (yield* V.call("CreateTrigger"));
G.gg_trg_danji3 = (yield* V.call("CreateTrigger"));
G.gg_trg_danji4 = (yield* V.call("CreateTrigger"));
G.gg_trg_danji5 = (yield* V.call("CreateTrigger"));
G.udg_GC = null;
G.udg_jinengsjlv = 1;
G.udg_biaozhunwupin = true;
G.udg_nokuaisumode = true;
G.udg_yxmode = 0;
G.udg_shuaguaishu = 1;
G.udg_modexz = V.array(false);
G.udg_biaozhuncs = V.array(0);
G.udg_mode1 = V.array(null);
G.udg_mode2 = V.array(null);
G.udg_mode3 = V.array(null);
G.udg_mode1kuang = null;
G.udg_mode2kuang = null;
G.udg_mode3kuang = null;
G.gg_trg_mode1_1 = null;
G.gg_trg_mode2_1 = null;
G.gg_trg_mode3_1 = null;
G.gg_trg_mode1xz = null;
G.gg_trg_mode2xz = null;
G.gg_trg_mode3xz = null;
G.udg_modezi = V.array("");
G.udg_modeanniu = 0;
G.udg_stz = V.array("");
G.udg_sp = V.array("");
G.gg_trg_shanc = null;
G.gg_trg_guanbitx = null;
G.gg_trg_kaiqitx = null;
G.gg_trg_TZjianta = null;
G.udg_twaves = null;
G.udg_zongzuxz = V.array(false);
G.udg_playerzz = V.array(0);
G.udg_ab = V.array(0);
G.udg_sln = V.array("");
G.udg_smn = V.array("");
G.udg_sdistxt = V.array("");
G.udg_shuabingcount = 0;
};
F.InitGlobals=function* () {
let i = 0;
G.udg_uuuuu = (yield* V.call("CreateGroup"));
G.udg_waves = 0;
G.udg_i = 0;
G.udg_lives = 50;
G.udg_TempGro = (yield* V.call("CreateGroup"));
i = 0;
while (V.guard()) {
if ((i > 7)) break;
G.udg_zhiyexuanze[i] = "";
i = (i + 1);
}
i = 0;
while (V.guard()) {
if ((i > 5)) break;
G.udg_bd[i] = 0;
i = (i + 1);
}
i = 0;
while (V.guard()) {
if ((i > 7)) break;
G.udg_zhiye[i] = (yield* V.call("DialogCreate"));
i = (i + 1);
}
G.udg_j = 0;
i = 0;
while (V.guard()) {
if ((i > 13)) break;
G.udg_Kills[i] = 0;
i = (i + 1);
}
G.udg_YMuuuu = (yield* V.call("CreateGroup"));
G.udg_weili = 1;
i = 0;
while (V.guard()) {
if ((i > 6)) break;
G.udg_daozei[i] = false;
i = (i + 1);
}
G.udg_zhiyu = 0;
i = 0;
while (V.guard()) {
if ((i > 6)) break;
G.udg_gaolidai[i] = false;
i = (i + 1);
}
G.udg_nandukuang = (yield* V.call("DialogCreate"));
i = 0;
while (V.guard()) {
if ((i > 7)) break;
G.udg_nanduzi[i] = "";
i = (i + 1);
}
G.udg_xuanze = false;
i = 0;
while (V.guard()) {
if ((i > 9)) break;
G.udg_zongzuxz[i] = false;
i = (i + 1);
}
G.udg_C = 0;
G.udg_D = 0;
G.udg_E = 0;
G.udg_A = 0;
G.udg_B = 0;
i = 0;
while (V.guard()) {
if ((i > 7)) break;
G.udg_keji[i] = 0;
i = (i + 1);
}
G.udg_nandujibie = 0;
G.udg_defeat = false;
i = 0;
while (V.guard()) {
if ((i > 6)) break;
i = (i + 1);
}
i = 0;
while (V.guard()) {
if ((i > 6)) break;
G.udg_jinggao[i] = 0;
i = (i + 1);
}
G.udg_jiaodu = 0;
G.udg_gongxun = 0;
G.udg_shentou = false;
G.udg_nanadead = false;
i = 0;
while (V.guard()) {
if ((i > 6)) break;
G.udg_baijia[i] = false;
i = (i + 1);
}
G.udg_fennu = false;
G.udg_shuaguaishu = 1;
G.udg_playerzz[0] = 0;
G.udg_playerzz[1] = 0;
G.udg_playerzz[2] = 0;
G.udg_playerzz[3] = 0;
G.udg_biaozhuncs[0] = 150;
G.udg_biaozhuncs[1] = 400;
G.udg_biaozhuncs[2] = 800;
G.udg_biaozhuncs[3] = 1000;
G.udg_biaozhuncs[4] = 5000;
G.udg_biaozhuncs[5] = 10000;
G.udg_mode1kuang = (yield* V.call("DialogCreate"));
G.udg_mode2kuang = (yield* V.call("DialogCreate"));
G.udg_mode3kuang = (yield* V.call("DialogCreate"));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",8)),100.0));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",9)),100.0));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",10)),100.0));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",11)),100.0));
};
F.Unit000018_DropItems=function* () {
let trigWidget = null;
let trigUnit = null;
let itemID = 0;
let canDrop = true;
trigWidget = G.bj_lastDyingWidget;
if ((trigWidget === null)) {
trigUnit = (yield* V.call("GetTriggerUnit"));
}
if ((trigUnit !== null)) {
canDrop = (!(yield* V.call("IsUnitHidden",trigUnit)));
if ((canDrop && ((yield* V.call("GetChangingUnit")) !== null))) {
canDrop = ((yield* V.call("GetChangingUnitPrevOwner")) === (yield* V.call("Player",G.PLAYER_NEUTRAL_AGGRESSIVE)));
}
}
if (canDrop) {
(yield* V.call("RandomDistReset"));
(yield* V.call("RandomDistAddItem",(yield* V.call("ChooseRandomItemEx",G.ITEM_TYPE_ANY,8)),50));
(yield* V.call("RandomDistAddItem",(-1),50));
itemID = (yield* V.call("RandomDistChoose"));
if ((trigUnit !== null)) {
(yield* V.call("UnitDropItem",trigUnit,itemID));
} else {
(yield* V.call("WidgetDropItem",trigWidget,itemID));
}
(yield* V.call("RandomDistReset"));
(yield* V.call("RandomDistAddItem",(yield* V.call("ChooseRandomItemEx",G.ITEM_TYPE_ANY,8)),50));
(yield* V.call("RandomDistAddItem",(-1),50));
itemID = (yield* V.call("RandomDistChoose"));
if ((trigUnit !== null)) {
(yield* V.call("UnitDropItem",trigUnit,itemID));
} else {
(yield* V.call("WidgetDropItem",trigWidget,itemID));
}
(yield* V.call("RandomDistReset"));
(yield* V.call("RandomDistAddItem",(yield* V.call("ChooseRandomItemEx",G.ITEM_TYPE_ANY,8)),50));
(yield* V.call("RandomDistAddItem",(-1),50));
itemID = (yield* V.call("RandomDistChoose"));
if ((trigUnit !== null)) {
(yield* V.call("UnitDropItem",trigUnit,itemID));
} else {
(yield* V.call("WidgetDropItem",trigWidget,itemID));
}
(yield* V.call("RandomDistReset"));
(yield* V.call("RandomDistAddItem",(yield* V.call("ChooseRandomItemEx",G.ITEM_TYPE_ANY,8)),50));
(yield* V.call("RandomDistAddItem",(-1),50));
itemID = (yield* V.call("RandomDistChoose"));
if ((trigUnit !== null)) {
(yield* V.call("UnitDropItem",trigUnit,itemID));
} else {
(yield* V.call("WidgetDropItem",trigWidget,itemID));
}
(yield* V.call("RandomDistReset"));
(yield* V.call("RandomDistAddItem",(yield* V.call("ChooseRandomItemEx",G.ITEM_TYPE_ANY,8)),50));
(yield* V.call("RandomDistAddItem",(-1),50));
itemID = (yield* V.call("RandomDistChoose"));
if ((trigUnit !== null)) {
(yield* V.call("UnitDropItem",trigUnit,itemID));
} else {
(yield* V.call("WidgetDropItem",trigWidget,itemID));
}
(yield* V.call("RandomDistReset"));
(yield* V.call("RandomDistAddItem",(yield* V.call("ChooseRandomItemEx",G.ITEM_TYPE_ANY,8)),50));
(yield* V.call("RandomDistAddItem",(-1),50));
itemID = (yield* V.call("RandomDistChoose"));
if ((trigUnit !== null)) {
(yield* V.call("UnitDropItem",trigUnit,itemID));
} else {
(yield* V.call("WidgetDropItem",trigWidget,itemID));
}
(yield* V.call("RandomDistReset"));
(yield* V.call("RandomDistAddItem",(yield* V.call("ChooseRandomItemEx",G.ITEM_TYPE_ANY,8)),50));
(yield* V.call("RandomDistAddItem",(-1),50));
itemID = (yield* V.call("RandomDistChoose"));
if ((trigUnit !== null)) {
(yield* V.call("UnitDropItem",trigUnit,itemID));
} else {
(yield* V.call("WidgetDropItem",trigWidget,itemID));
}
(yield* V.call("RandomDistReset"));
(yield* V.call("RandomDistAddItem",(yield* V.call("ChooseRandomItemEx",G.ITEM_TYPE_ANY,8)),50));
(yield* V.call("RandomDistAddItem",(-1),50));
itemID = (yield* V.call("RandomDistChoose"));
if ((trigUnit !== null)) {
(yield* V.call("UnitDropItem",trigUnit,itemID));
} else {
(yield* V.call("WidgetDropItem",trigWidget,itemID));
}
}
G.bj_lastDyingWidget = null;
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
};
F.InitSounds=function* () {
G.gg_snd_War2IntroMusic = "Sound\\Music\\mp3Music\\War2IntroMusic.mp3";
G.gg_snd_Credits = "Sound\\Music\\mp3Music\\Credits.mp3";
G.gg_snd_PH1 = "Sound\\Music\\mp3Music\\PH1.mp3";
G.gg_snd_IllidansTheme = "Sound\\Music\\mp3Music\\IllidansTheme.mp3";
G.gg_snd_LichKingTheme = "Sound\\Music\\mp3Music\\LichKingTheme.mp3";
G.gg_snd_SadMystery = "Sound\\Music\\mp3Music\\SadMystery.mp3";
G.gg_snd_Doom = "Sound\\Music\\mp3Music\\Doom.mp3";
G.gg_snd_PursuitTheme = "Sound\\Music\\mp3Music\\PursuitTheme.mp3";
};
F.CreateUnitsForPlayer0=function* () {
let p = (yield* V.call("Player",0));
G.gg_unit_e007_0010 = (yield* V.call("CreateUnit",p,1697656887,5677.6,1691.0,.22));
};
F.CreateUnitsForPlayer1=function* () {
let p = (yield* V.call("Player",1));
G.gg_unit_e007_0012 = (yield* V.call("CreateUnit",p,1697656887,5687.1,1710.9,297.684));
};
F.CreateUnitsForPlayer2=function* () {
let p = (yield* V.call("Player",2));
G.gg_unit_e007_0013 = (yield* V.call("CreateUnit",p,1697656887,5678.3,1720.9,255.429));
};
F.CreateUnitsForPlayer3=function* () {
let p = (yield* V.call("Player",3));
G.gg_unit_e007_0014 = (yield* V.call("CreateUnit",p,1697656887,5678.8,1720.9,138.74));
};
F.CreateUnitsForPlayer4=function* () {
let p = (yield* V.call("Player",4));
G.gg_unit_e007_0015 = (yield* V.call("CreateUnit",p,1697656887,5675.6,1727.6,136.366));
};
F.CreateBuildingsForPlayer8=function* () {
let p = (yield* V.call("Player",8));
(yield* V.call("CreateUnit",p,1852010547,(-4352.0),6912.0,270.0));
(yield* V.call("CreateUnit",p,1852010547,7168.0,(-4480.0),270.0));
};
F.CreateBuildingsForPlayer9=function* () {
let p = (yield* V.call("Player",9));
(yield* V.call("CreateUnit",p,1852010547,(-7168.0),(-4480.0),270.0));
(yield* V.call("CreateUnit",p,1852010547,3840.0,6912.0,270.0));
};
F.CreateBuildingsForPlayer10=function* () {
let p = (yield* V.call("Player",10));
(yield* V.call("CreateUnit",p,1852010547,3840.0,(-7360.0),270.0));
(yield* V.call("CreateUnit",p,1852010547,(-7168.0),3840.0,270.0));
};
F.CreateBuildingsForPlayer11=function* () {
let p = (yield* V.call("Player",11));
(yield* V.call("CreateUnit",p,1852010547,7168.0,3840.0,270.0));
(yield* V.call("CreateUnit",p,1852010547,(-4352.0),(-7360.0),270.0));
};
F.CreateUnitsForPlayer11=function* () {
let p = (yield* V.call("Player",11));
G.gg_unit_Hblm_0011 = (yield* V.call("CreateUnit",p,1214409837,6009.3,5587.5,41.95));
};
F.CreateNeutralHostile=function* () {
let p = (yield* V.call("Player",G.PLAYER_NEUTRAL_AGGRESSIVE));
let u = null;
let unitID = 0;
let t = null;
let life = 0;
G.gg_unit_Hjai_0009 = (yield* V.call("CreateUnit",p,1214931305,5892.6,(-1849.4),224.94));
(yield* V.call("SetHeroLevel",G.gg_unit_Hjai_0009,10,false));
(yield* V.call("SetHeroStr",G.gg_unit_Hjai_0009,99999,true));
(yield* V.call("SetHeroAgi",G.gg_unit_Hjai_0009,20,true));
(yield* V.call("SetHeroInt",G.gg_unit_Hjai_0009,99999,true));
t = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterUnitEvent",t,G.gg_unit_Hjai_0009,G.EVENT_UNIT_DEATH));
(yield* V.call("TriggerRegisterUnitEvent",t,G.gg_unit_Hjai_0009,G.EVENT_UNIT_CHANGE_OWNER));
(yield* V.call("TriggerAddAction",t,"Unit000018_DropItems"));
};
F.CreatePlayerBuildings=function* () {
(yield* V.call("CreateBuildingsForPlayer8"));
(yield* V.call("CreateBuildingsForPlayer9"));
(yield* V.call("CreateBuildingsForPlayer10"));
(yield* V.call("CreateBuildingsForPlayer11"));
};
F.CreatePlayerUnits=function* () {
(yield* V.call("CreateUnitsForPlayer0"));
(yield* V.call("CreateUnitsForPlayer1"));
(yield* V.call("CreateUnitsForPlayer2"));
(yield* V.call("CreateUnitsForPlayer3"));
(yield* V.call("CreateUnitsForPlayer4"));
(yield* V.call("CreateUnitsForPlayer11"));
};
F.CreateAllUnits=function* () {
(yield* V.call("CreatePlayerBuildings"));
(yield* V.call("CreateNeutralHostile"));
(yield* V.call("CreatePlayerUnits"));
};
F.CreateRegions=function* () {
let we = null;
G.gg_rct_a1 = (yield* V.call("Rect",(-4480.0),6784.0,(-4224.0),7040.0));
G.gg_rct_a2 = (yield* V.call("Rect",(-4480.0),3712.0,(-4224.0),3968.0));
G.gg_rct_a3 = (yield* V.call("Rect",(-4480.0),896.0,(-4224.0),1152.0));
G.gg_rct_a4 = (yield* V.call("Rect",(-1920.0),896.0,(-1664.0),1152.0));
G.gg_rct_a5 = (yield* V.call("Rect",1024.0,896.0,1280.0,1152.0));
G.gg_rct_a6 = (yield* V.call("Rect",1024.0,(-1792.0),1280.0,(-1536.0)));
G.gg_rct_a7 = (yield* V.call("Rect",1024.0,(-4608.0),1280.0,(-4352.0)));
G.gg_rct_a8 = (yield* V.call("Rect",3712.0,(-4608.0),3968.0,(-4352.0)));
G.gg_rct_a9 = (yield* V.call("Rect",7040.0,(-4608.0),7296.0,(-4352.0)));
G.gg_rct_b1 = (yield* V.call("Rect",(-7296.0),(-4608.0),(-7040.0),(-4352.0)));
G.gg_rct_b2 = (yield* V.call("Rect",(-4480.0),(-4608.0),(-4224.0),(-4352.0)));
G.gg_rct_b3 = (yield* V.call("Rect",(-1920.0),(-4608.0),(-1664.0),(-4352.0)));
G.gg_rct_b4 = (yield* V.call("Rect",(-1920.0),(-1792.0),(-1664.0),(-1536.0)));
G.gg_rct_b5 = (yield* V.call("Rect",(-1920.0),896.0,(-1664.0),1152.0));
G.gg_rct_b6 = (yield* V.call("Rect",1024.0,896.0,1280.0,1152.0));
G.gg_rct_b7 = (yield* V.call("Rect",3712.0,896.0,3968.0,1152.0));
G.gg_rct_b8 = (yield* V.call("Rect",3712.0,3712.0,3968.0,3968.0));
G.gg_rct_b9 = (yield* V.call("Rect",3712.0,6784.0,3968.0,7040.0));
G.gg_rct_c1 = (yield* V.call("Rect",3712.0,(-7520.0),3968.0,(-7264.0)));
G.gg_rct_c2 = (yield* V.call("Rect",3712.0,(-4608.0),3968.0,(-4352.0)));
G.gg_rct_c3 = (yield* V.call("Rect",3712.0,(-1792.0),3968.0,(-1536.0)));
G.gg_rct_c4 = (yield* V.call("Rect",1024.0,(-1792.0),1280.0,(-1536.0)));
G.gg_rct_c5 = (yield* V.call("Rect",(-1920.0),(-1792.0),(-1664.0),(-1536.0)));
G.gg_rct_c6 = (yield* V.call("Rect",(-1920.0),896.0,(-1664.0),1152.0));
G.gg_rct_c7 = (yield* V.call("Rect",(-1920.0),3680.0,(-1664.0),3936.0));
G.gg_rct_c8 = (yield* V.call("Rect",(-4480.0),3712.0,(-4224.0),3968.0));
G.gg_rct_c9 = (yield* V.call("Rect",(-7296.0),3712.0,(-7040.0),3968.0));
G.gg_rct_d1 = (yield* V.call("Rect",7040.0,3712.0,7296.0,3968.0));
G.gg_rct_d3 = (yield* V.call("Rect",1024.0,3680.0,1280.0,3936.0));
G.gg_rct_d4 = (yield* V.call("Rect",1024.0,896.0,1280.0,1152.0));
G.gg_rct_d5 = (yield* V.call("Rect",1024.0,(-1792.0),1280.0,(-1536.0)));
G.gg_rct_d6 = (yield* V.call("Rect",(-1920.0),(-1792.0),(-1664.0),(-1536.0)));
G.gg_rct_d7 = (yield* V.call("Rect",(-4448.0),(-1792.0),(-4192.0),(-1536.0)));
G.gg_rct_d8 = (yield* V.call("Rect",(-4480.0),(-4608.0),(-4224.0),(-4352.0)));
G.gg_rct_d9 = (yield* V.call("Rect",(-4480.0),(-7520.0),(-4224.0),(-7264.0)));
G.gg_rct_d2 = (yield* V.call("Rect",3712.0,3712.0,3968.0,3968.0));
G.gg_rct_aa = (yield* V.call("Rect",(-3136.0),2304.0,(-2880.0),2560.0));
G.gg_rct_dd = (yield* V.call("Rect",2560.0,2240.0,2816.0,2496.0));
G.gg_rct_bb = (yield* V.call("Rect",(-3136.0),(-3008.0),(-2880.0),(-2752.0)));
G.gg_rct_cc = (yield* V.call("Rect",2368.0,(-3168.0),2624.0,(-2912.0)));
G.gg_rct_ee = (yield* V.call("Rect",(-768.0),(-768.0),128.0,32.0));
G.gg_rct_aaa = (yield* V.call("Rect",(-4160.0),1248.0,(-2048.0),3616.0));
G.gg_rct_bbb = (yield* V.call("Rect",(-4160.0),(-4256.0),(-2048.0),(-1888.0)));
G.gg_rct_ccc = (yield* V.call("Rect",1376.0,(-4256.0),3584.0,(-1952.0)));
G.gg_rct_ddd = (yield* V.call("Rect",1344.0,1280.0,3616.0,3616.0));
G.gg_rct_aa20 = (yield* V.call("Rect",1440.0,(-1408.0),3552.0,704.0));
G.gg_rct_bb20 = (yield* V.call("Rect",(-1536.0),1280.0,864.0,3552.0));
G.gg_rct_cc20 = (yield* V.call("Rect",(-4096.0),(-1408.0),(-2048.0),736.0));
G.gg_rct_dd20 = (yield* V.call("Rect",(-1568.0),(-4192.0),864.0,(-1952.0)));
G.gg_rct_ra1 = (yield* V.call("Rect",5344.0,(-1952.0),5632.0,(-1664.0)));
G.gg_rct_ra2 = (yield* V.call("Rect",5824.0,(-1664.0),6144.0,(-1376.0)));
G.gg_rct_ra3 = (yield* V.call("Rect",6176.0,(-2048.0),6464.0,(-1760.0)));
G.gg_rct_ra4 = (yield* V.call("Rect",5472.0,(-2368.0),5728.0,(-2112.0)));
G.gg_rct_ra5 = (yield* V.call("Rect",5920.0,(-2432.0),6176.0,(-2176.0)));
G.gg_rct_AoyunDelete = (yield* V.call("Rect",(-2240.0),(-7616.0),1984.0,(-4800.0)));
};
F.CreateCameras=function* () {
G.gg_cam_yadianna = (yield* V.call("CreateCameraSetup"));
(yield* V.call("CameraSetupSetField",G.gg_cam_yadianna,G.CAMERA_FIELD_ZOFFSET,.0,.0));
(yield* V.call("CameraSetupSetField",G.gg_cam_yadianna,G.CAMERA_FIELD_ROTATION,90.0,.0));
(yield* V.call("CameraSetupSetField",G.gg_cam_yadianna,G.CAMERA_FIELD_ANGLE_OF_ATTACK,304.0,.0));
(yield* V.call("CameraSetupSetField",G.gg_cam_yadianna,G.CAMERA_FIELD_TARGET_DISTANCE,1500.0,.0));
(yield* V.call("CameraSetupSetField",G.gg_cam_yadianna,G.CAMERA_FIELD_ROLL,.0,.0));
(yield* V.call("CameraSetupSetField",G.gg_cam_yadianna,G.CAMERA_FIELD_FIELD_OF_VIEW,70.0,.0));
(yield* V.call("CameraSetupSetField",G.gg_cam_yadianna,G.CAMERA_FIELD_FARZ,5000.0,.0));
(yield* V.call("CameraSetupSetDestPosition",G.gg_cam_yadianna,5891.1,(-2123.8),.0));
};
F.Trig_chushiziyuan_Func001002=function* () {
(yield* V.call("CreateFogModifierRectBJ",true,(yield* V.call("GetEnumPlayer")),G.FOG_OF_WAR_VISIBLE,(yield* V.call("GetPlayableMapRect"))));
};
F.Trig_chushiziyuan_Func002A=function* () {
(yield* V.call("SetPlayerStateBJ",(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_FOOD_CAP,20));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD,900));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_LUMBER,12));
};
F.Trig_chushiziyuan_Func003A=function* () {
(yield* V.call("SetPlayerState",(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_GIVES_BOUNTY,1));
};
F.Trig_chushiziyuan_Actions=function* () {
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_chushiziyuan_Func001002"));
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",0)))),"Trig_chushiziyuan_Func002A"));
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_chushiziyuan_Func003A"));
};
F.InitTrig_chushiziyuan=function* () {
G.gg_trg_chushiziyuan = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_chushiziyuan,"Trig_chushiziyuan_Actions"));
};
F.H2I=function* (h) {
return h;
return 0;
};
F.I2U=function* (i) {
return i;
return null;
};
F.I2L=function* (i) {
return i;
return null;
};
F.I2TG=function* (i) {
return i;
return null;
};
F.I2TC=function* (i) {
return i;
return null;
};
F.I2TA=function* (i) {
return i;
return null;
};
F.Trig_danji1_Conditions=function* () {
return (!((yield* V.call("GetPlayerSlotState",(yield* V.call("Player",0)))) === G.PLAYER_SLOT_STATE_PLAYING));
};
F.Trig_danji1_Actions=function* () {
if ((G.udg_dan[0] === false)) {
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),(("|cff80FF00" + (yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer"))))) + "|r|cffFF0000打开了左上|r出怪口。")));
} else {
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),(("|cff80FF00" + (yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer"))))) + "|r|cffFF0000关闭了左上|r出怪口。")));
}
G.udg_dan[0] = (!G.udg_dan[0]);
};
F.Trig_danji2_Conditions=function* () {
return (!((yield* V.call("GetPlayerSlotState",(yield* V.call("Player",1)))) === G.PLAYER_SLOT_STATE_PLAYING));
};
F.Trig_danji2_Actions=function* () {
if ((G.udg_dan[1] === false)) {
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),(("|cff80FF00" + (yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer"))))) + "|r|cff0080FF打开了左下|r出怪口。")));
} else {
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),(("|cff80FF00" + (yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer"))))) + "|r|cff0080FF关闭了左下|r出怪口。")));
}
G.udg_dan[1] = (!G.udg_dan[1]);
};
F.Trig_danji3_Conditions=function* () {
return (!((yield* V.call("GetPlayerSlotState",(yield* V.call("Player",2)))) === G.PLAYER_SLOT_STATE_PLAYING));
};
F.Trig_danji3_Actions=function* () {
if ((G.udg_dan[2] === false)) {
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),(("|cff80FF00" + (yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer"))))) + "|r|cff008000打开了右下|r出怪口。")));
} else {
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),(("|cff80FF00" + (yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer"))))) + "|r|cff008000关闭了右下|r出怪口。")));
}
G.udg_dan[2] = (!G.udg_dan[2]);
};
F.Trig_danji4_Conditions=function* () {
return (!((yield* V.call("GetPlayerSlotState",(yield* V.call("Player",3)))) === G.PLAYER_SLOT_STATE_PLAYING));
};
F.Trig_danji4_Actions=function* () {
if ((G.udg_dan[3] === false)) {
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),(("|cff80FF00" + (yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer"))))) + "|r|cff0000A0打开了右上|r出怪口。")));
} else {
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),(("|cff80FF00" + (yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer"))))) + "|r|cff0000A0关闭了右上|r出怪口。")));
}
G.udg_dan[3] = (!G.udg_dan[3]);
};
F.Trig_danji5_Conditions=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetTriggerUnit")),(yield* V.call("Player",0))));
};
F.Trig_danji5_Actions=function* () {
let u = (yield* V.call("GetTriggerUnit"));
let i = 0;
i = 0;
while (V.guard()) {
if ((i > 3)) break;
if ((((yield* V.call("GetOwningPlayer",u)) === (yield* V.call("Player",(8 + i)))) && (G.udg_dan[i] === false))) {
(yield* V.call("RemoveUnit",u));
}
i = (i + 1);
}
};
F.Trig_danji=function* () {
let i = 0;
i = 0;
while (V.guard()) {
if ((i > 3)) break;
G.udg_dan[i] = true;
i = (i + 1);
}
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji1,(yield* V.call("Player",1)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_UP));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji1,(yield* V.call("Player",2)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_UP));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji1,(yield* V.call("Player",3)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_UP));
(yield* V.call("TriggerAddCondition",G.gg_trg_danji1,(yield* V.call("Condition","Trig_danji1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_danji1,"Trig_danji1_Actions"));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji2,(yield* V.call("Player",0)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_LEFT));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji2,(yield* V.call("Player",2)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_LEFT));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji2,(yield* V.call("Player",3)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_LEFT));
(yield* V.call("TriggerAddCondition",G.gg_trg_danji2,(yield* V.call("Condition","Trig_danji2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_danji2,"Trig_danji2_Actions"));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji3,(yield* V.call("Player",0)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_DOWN));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji3,(yield* V.call("Player",1)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_DOWN));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji3,(yield* V.call("Player",3)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_DOWN));
(yield* V.call("TriggerAddCondition",G.gg_trg_danji3,(yield* V.call("Condition","Trig_danji3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_danji3,"Trig_danji3_Actions"));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji4,(yield* V.call("Player",0)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_RIGHT));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji4,(yield* V.call("Player",1)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_RIGHT));
(yield* V.call("TriggerRegisterPlayerKeyEventBJ",G.gg_trg_danji4,(yield* V.call("Player",2)),G.bj_KEYEVENTTYPE_DEPRESS,G.bj_KEYEVENTKEY_RIGHT));
(yield* V.call("TriggerAddCondition",G.gg_trg_danji4,(yield* V.call("Condition","Trig_danji4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_danji4,"Trig_danji4_Actions"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_danji5,(yield* V.call("GetPlayableMapRect"))));
(yield* V.call("TriggerAddCondition",G.gg_trg_danji5,(yield* V.call("Condition","Trig_danji5_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_danji5,"Trig_danji5_Actions"));
};
F.Trig_mode1_2_Actions=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
(yield* V.call("DestroyTimer",tm));
tm = null;
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
if ((G.udg_modexz[1] === false)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
(yield* V.call("DialogClear",G.udg_mode1kuang));
(yield* V.call("DestroyTrigger",G.gg_trg_mode1xz));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30,"由于玩家一没有在10秒内选择游戏模式，则默认为|c00ff0000正常模式|r~"));
(yield* V.call("TriggerExecute",G.gg_trg_kaishi));
G.udg_yxmode = 0;
G.udg_jinengsjlv = 10;
G.udg_biaozhunwupin = true;
G.udg_nokuaisumode = true;
G.udg_biaozhuncs[0] = 150;
G.udg_biaozhuncs[1] = 400;
G.udg_biaozhuncs[2] = 800;
G.udg_biaozhuncs[3] = 1000;
G.udg_biaozhuncs[4] = 5000;
G.udg_biaozhuncs[5] = 10000;
}
};
F.Trig_mode1_1_Actions=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("SetUserControlForceOff",(yield* V.call("GetPlayersAll"))));
G.udg_modezi[0] = "正常模式";
G.udg_modezi[1] = "|c00FF0000特殊|r模式";
G.udg_modezi[2] = "|c00FF0000疯狂|r|c0000FFFF模式|r";
(yield* V.call("CinematicModeBJ",true,(yield* V.call("GetPlayersAll"))));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.gg_unit_Hblm_0011,"作者：恋风吹雪(searchlove)",null,"|c0000FF00有什么问题和建议请登陆http://bbs.wow8.org/ 人族无敌II专区。",G.bj_TIMETYPE_SET,5.0,true));
(yield* V.call("CinematicModeBJ",false,(yield* V.call("GetPlayersAll"))));
(yield* V.call("RemoveUnit",G.gg_unit_Hblm_0011));
(yield* V.call("DialogSetMessage",G.udg_mode1kuang,"请选择游戏模式"));
G.udg_mode1[0] = (yield* V.call("DialogAddButtonBJ",G.udg_mode1kuang,G.udg_modezi[0]));
G.udg_mode1[1] = (yield* V.call("DialogAddButtonBJ",G.udg_mode1kuang,G.udg_modezi[1]));
G.udg_mode1[2] = (yield* V.call("DialogAddButtonBJ",G.udg_mode1kuang,G.udg_modezi[2]));
(yield* V.call("DialogDisplayBJ",true,G.udg_mode1kuang,(yield* V.call("Player",0))));
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),"玩家一正在选择游戏模式，请稍后……"));
(yield* V.call("CreateTimerDialogBJ",tm,"游戏模式"));
if ((G.udg_twaves !== null)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
}
G.udg_twaves = (yield* V.call("GetLastCreatedTimerDialogBJ"));
(yield* V.call("TimerStart",tm,10.0,false,"Trig_mode1_2_Actions"));
(yield* V.call("TimerDialogDisplay",G.udg_twaves,true));
tm = null;
};
F.InitTrig_mode1_1=function* () {
G.gg_trg_mode1_1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_mode1_1,"Trig_mode1_1_Actions"));
};
F.Trig_mode2_2_Actions=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
(yield* V.call("DestroyTimer",tm));
tm = null;
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
if ((G.udg_modexz[2] === false)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
(yield* V.call("DialogClear",G.udg_mode2kuang));
(yield* V.call("DestroyTrigger",G.gg_trg_mode2xz));
if ((G.udg_yxmode === 2)) {
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30,"由于玩家一没有在10秒内选择游戏进阶模式，则默认为|c00FF8040单线 150%HP|r模式~"));
(yield* V.call("TriggerExecute",G.gg_trg_kaishi));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",8)),150.0));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",9)),150.0));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",10)),150.0));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",11)),150.0));
} else {
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30,"由于玩家一没有在10秒内选择游戏进阶模式，则默认为|c00FF0000快速|r功勋模式~"));
(yield* V.call("TriggerExecute",G.gg_trg_mode3_1));
G.udg_nokuaisumode = false;
G.udg_biaozhuncs[0] = 1;
G.udg_biaozhuncs[1] = 1;
G.udg_biaozhuncs[2] = 1;
G.udg_biaozhuncs[3] = 1;
G.udg_biaozhuncs[4] = 1;
G.udg_biaozhuncs[5] = 1;
}
}
};
F.Trig_mode2_1_Actions=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
if ((G.udg_yxmode === 2)) {
G.udg_modezi[0] = "|c00FF8040单线 150%HP|r";
G.udg_modezi[1] = "|c00FF8040双线 150%HP|r";
G.udg_modezi[2] = "|c00FF8040双线 175%HP|r";
G.udg_modezi[3] = "|c00FF8040双线 200%HP|r";
(yield* V.call("DialogSetMessage",G.udg_mode2kuang,"请选择游戏进阶模式"));
G.udg_mode2[0] = (yield* V.call("DialogAddButtonBJ",G.udg_mode2kuang,G.udg_modezi[0]));
G.udg_mode2[1] = (yield* V.call("DialogAddButtonBJ",G.udg_mode2kuang,G.udg_modezi[1]));
G.udg_mode2[2] = (yield* V.call("DialogAddButtonBJ",G.udg_mode2kuang,G.udg_modezi[2]));
G.udg_mode2[3] = (yield* V.call("DialogAddButtonBJ",G.udg_mode2kuang,G.udg_modezi[3]));
} else {
G.udg_modezi[0] = "正常功勋模式";
G.udg_modezi[1] = "|c00FF0000快速|r功勋模式";
(yield* V.call("DialogSetMessage",G.udg_mode2kuang,"请选择游戏进阶模式"));
G.udg_mode2[0] = (yield* V.call("DialogAddButtonBJ",G.udg_mode2kuang,G.udg_modezi[0]));
G.udg_mode2[1] = (yield* V.call("DialogAddButtonBJ",G.udg_mode2kuang,G.udg_modezi[1]));
}
(yield* V.call("DialogDisplayBJ",true,G.udg_mode2kuang,(yield* V.call("Player",0))));
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),"玩家一正在选择游戏进阶模式，请稍后……"));
(yield* V.call("CreateTimerDialogBJ",tm,"游戏进阶模式"));
if ((G.udg_twaves !== null)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
}
G.udg_twaves = (yield* V.call("GetLastCreatedTimerDialogBJ"));
(yield* V.call("TimerStart",tm,10.0,false,"Trig_mode2_2_Actions"));
(yield* V.call("TimerDialogDisplay",G.udg_twaves,true));
tm = null;
};
F.InitTrig_mode2_1=function* () {
G.gg_trg_mode2_1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_mode2_1,"Trig_mode2_1_Actions"));
};
F.Trig_mode3_2_Actions=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
(yield* V.call("DestroyTimer",tm));
tm = null;
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
if ((G.udg_modexz[3] === false)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
(yield* V.call("DialogClear",G.udg_mode3kuang));
(yield* V.call("DestroyTrigger",G.gg_trg_mode3xz));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30,"由于玩家一没有在10秒内选择游戏技能习得模式，则默认为|c00FF0000100%|r技能习得模式~"));
(yield* V.call("TriggerExecute",G.gg_trg_kaishi));
G.udg_jinengsjlv = 1;
}
};
F.Trig_mode3_1_Actions=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_modezi[0] = "正常技能习得模式";
G.udg_modezi[1] = "|c00FF0000100%|r技能习得模式";
(yield* V.call("DialogSetMessage",G.udg_mode3kuang,"请选择游戏技能习得模式"));
G.udg_mode3[0] = (yield* V.call("DialogAddButtonBJ",G.udg_mode3kuang,G.udg_modezi[0]));
G.udg_mode3[1] = (yield* V.call("DialogAddButtonBJ",G.udg_mode3kuang,G.udg_modezi[1]));
(yield* V.call("DialogDisplayBJ",true,G.udg_mode3kuang,(yield* V.call("Player",0))));
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),"玩家一正在选择游戏技能习得模式，请稍后……"));
(yield* V.call("CreateTimerDialogBJ",tm,"游戏技能习得模式"));
if ((G.udg_twaves !== null)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
}
G.udg_twaves = (yield* V.call("GetLastCreatedTimerDialogBJ"));
(yield* V.call("TimerStart",tm,10.0,false,"Trig_mode3_2_Actions"));
(yield* V.call("TimerDialogDisplay",G.udg_twaves,true));
tm = null;
};
F.InitTrig_mode3_1=function* () {
G.gg_trg_mode3_1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_mode3_1,"Trig_mode3_1_Actions"));
};
F.Trig_Make_Func005002001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetEnumPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_Make_Func005002=function* () {
if ((yield* V.call("Trig_Make_Func005002001"))) {
(yield* V.call("LeaderboardAddItemBJ",(yield* V.call("GetEnumPlayer")),(yield* V.call("GetLastCreatedLeaderboard")),("|c0000FF00" + (yield* V.call("GetPlayerName",(yield* V.call("GetEnumPlayer"))))),0));
}
};
F.Trig_Make_Actions=function* () {
(yield* V.call("CreateLeaderboardBJ",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",0)))),"杀敌排行榜"));
(yield* V.call("LeaderboardAddItemBJ",(yield* V.call("Player",10)),(yield* V.call("GetLastCreatedLeaderboard")),"剩余生命",50));
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",0)))),"Trig_Make_Func005002"));
(yield* V.call("LeaderboardSortItemsBJ",(yield* V.call("GetLastCreatedLeaderboard")),G.bj_SORTTYPE_SORTBYVALUE,false));
(yield* V.call("LeaderboardDisplayBJ",true,(yield* V.call("GetLastCreatedLeaderboard"))));
};
F.InitTrig_Make=function* () {
G.gg_trg_Make = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterTimerEventSingle",G.gg_trg_Make,1.0));
(yield* V.call("TriggerAddAction",G.gg_trg_Make,"Trig_Make_Actions"));
};
F.Trig_Add_Point_Func005C=function* () {
return ((G.udg_nandujibie >= 1) && (G.udg_Kills[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] === 1000));
};
F.Trig_Add_Point_Func006C=function* () {
return ((G.udg_nandujibie >= 3) && (G.udg_Kills[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] === 2000));
};
F.Trig_Add_Point_Func007C=function* () {
return ((G.udg_nandujibie > 3) && (G.udg_Kills[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] === 3000));
};
F.Trig_Add_Point_Func008C=function* () {
return ((G.udg_nandujibie === 2) && (G.udg_Kills[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] === 2000));
};
F.Trig_Add_Point_Func009C=function* () {
if ((!(G.udg_waves <= 45))) {
return false;
}
if (G.udg_biaozhunwupin) {
if ((!((yield* V.call("GetRandomInt",1,10)) === 1))) {
return false;
}
if ((!((yield* V.call("GetRandomInt",1,20)) === 2))) {
return false;
}
return true;
} else {
if (((yield* V.call("GetRandomInt",1,100)) === 1)) {
return true;
}
}
return false;
};
F.Trig_Add_Point_Actions=function* () {
G.udg_Kills[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] = (G.udg_Kills[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] + 1);
(yield* V.call("LeaderboardSetPlayerItemValueBJ",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),(yield* V.call("GetLastCreatedLeaderboard")),G.udg_Kills[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))]));
(yield* V.call("LeaderboardSortItemsBJ",(yield* V.call("GetLastCreatedLeaderboard")),G.bj_SORTTYPE_SORTBYVALUE,false));
(yield* V.call("RemoveUnit",(yield* V.call("GetDyingUnit"))));
if ((yield* V.call("Trig_Add_Point_Func005C"))) {
(yield* V.call("AdjustPlayerStateBJ",5,(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "杀敌数突破|c00FF00001000人|r，奖励5个人口~")));
}
if ((yield* V.call("Trig_Add_Point_Func006C"))) {
(yield* V.call("AdjustPlayerStateBJ",5,(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "杀敌数突破|c00FF00002000人|r，奖励5个人口~")));
}
if ((yield* V.call("Trig_Add_Point_Func007C"))) {
(yield* V.call("AdjustPlayerStateBJ",5,(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "杀敌数突破|c00FF00003000人|r，奖励5个人口~")));
}
if ((yield* V.call("Trig_Add_Point_Func008C"))) {
(yield* V.call("AdjustPlayerStateBJ",5,(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "杀敌数突破|c00FF00002000人|r，奖励5个人口~")));
}
if ((yield* V.call("Trig_Add_Point_Func009C"))) {
G.udg_PointE = (yield* V.call("GetUnitLoc",(yield* V.call("GetDyingUnit"))));
(yield* V.call("CreateItemLoc",(yield* V.call("ChooseRandomItemBJ",10)),G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
}
};
F.InitTrig_Add_Point=function* () {
G.gg_trg_Add_Point = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_Add_Point,(yield* V.call("Player",8)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_Add_Point,(yield* V.call("Player",9)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_Add_Point,(yield* V.call("Player",10)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_Add_Point,(yield* V.call("Player",11)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerAddAction",G.gg_trg_Add_Point,"Trig_Add_Point_Actions"));
};
F.Trig_LRzhuanshen_Conditions=function* () {
return (((yield* V.call("GetSpellAbilityId")) === 1093679414) && (!(G.udg_playerzz[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit"))))))] !== 2)));
};
F.Trig_LRzhuanshen_Func008C=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetLastCreatedUnit")))) === 1747988801) && (G.udg_gongxun >= 5000));
};
F.Trig_LRzhuanshen_Actions=function* () {
G.udg_zhuanshenP = (yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_gongxun = (yield* V.call("GetUnitUserData",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_jiaodu = ((yield* V.call("GetUnitFacing",(yield* V.call("GetSpellAbilityUnit")))) + 90.0);
(yield* V.call("RemoveUnit",(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("CreateNUnitsAtLoc",1,(yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))),G.udg_zhuanshenP,G.udg_TempPoi,G.udg_jiaodu));
(yield* V.call("SetUnitUserData",(yield* V.call("GetLastCreatedUnit")),G.udg_gongxun));
if ((yield* V.call("Trig_LRzhuanshen_Func008C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678159,(yield* V.call("GetLastCreatedUnit"))));
}
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_LRzhuanshen=function* () {
G.gg_trg_LRzhuanshen = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRzhuanshen));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRzhuanshen,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRzhuanshen,(yield* V.call("Condition","Trig_LRzhuanshen_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRzhuanshen,"Trig_LRzhuanshen_Actions"));
};
F.Trig_LRsiwangqiyue_Conditions=function* () {
return (((((((((((yield* V.call("GetSpellAbilityId")) === 1093678159) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747988801)) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) !== 1747988801)) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) !== 1747988530)) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) !== 1747988528)) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) !== 1747988529)) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) !== 1747988531)) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) !== 1747988532)) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) !== 1747990083)) && ((yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))) === (yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit"))))));
};
F.Trig_LRsiwangqiyue_Actions=function* () {
(yield* V.call("SetUnitUserData",(yield* V.call("GetSpellAbilityUnit")),(V.idiv((yield* V.call("GetUnitUserData",(yield* V.call("GetSpellTargetUnit")))),2) + (yield* V.call("GetUnitUserData",(yield* V.call("GetSpellAbilityUnit")))))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetSpellAbilityUnit")))) + (("|r对自己的一名" + (yield* V.call("GetUnitName",(yield* V.call("GetSpellTargetUnit"))))) + "释放了|c0000FF00")) + ("死亡契约(夺命)|r，残忍的将其杀害，获得了|c00FF0000" + ((yield* V.call("I2S",V.idiv((yield* V.call("GetUnitUserData",(yield* V.call("GetSpellTargetUnit")))),2))) + "|r点功勋值！"))))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetSpellTargetUnit")),0));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_TempPoi,"Abilities\\Spells\\Human\\HolyBolt\\HolyBoltSpecialArt.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("AdjustPlayerStateBJ",V.idiv(((yield* V.call("R2I",(yield* V.call("GetUnitStateSwap",G.UNIT_STATE_LIFE,(yield* V.call("GetSpellTargetUnit")))))) * 4),10),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("ExplodeUnitBJ",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_LRsiwangqiyue=function* () {
G.gg_trg_LRsiwangqiyue = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRsiwangqiyue));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRsiwangqiyue,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRsiwangqiyue,(yield* V.call("Condition","Trig_LRsiwangqiyue_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRsiwangqiyue,"Trig_LRsiwangqiyue_Actions"));
};
F.fun_LRhuitianmiediB_Actions=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",G.udg_huitian)))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",G.udg_huitian)) + "|r为拯救人类，牺牲自己释放了|c00FF00FF毁天灭地(牺牲)|r~让我们默默为它哀悼吧~") + ""))));
(yield* V.call("ExplodeUnitBJ",G.udg_huitian));
(yield* V.call("DestroyTimer",tm));
};
F.fun_LRhuitianmiediB=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("TimerStart",tm,.1,false,"fun_LRhuitianmiediB_Actions"));
tm = null;
};
F.Trig_LRhuitianmiedi_Conditions=function* () {
return (((yield* V.call("GetSpellAbilityId")) === 1093678145) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747988550));
};
F.Trig_LRhuitianmiedi_Actions=function* () {
G.udg_huitian = (yield* V.call("GetSpellAbilityUnit"));
(yield* V.call("fun_LRhuitianmiediB"));
};
F.InitTrig_LRhuitianmiedi=function* () {
G.gg_trg_LRhuitianmiedi = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRhuitianmiedi));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRhuitianmiedi,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRhuitianmiedi,(yield* V.call("Condition","Trig_LRhuitianmiedi_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRhuitianmiedi,"Trig_LRhuitianmiedi_Actions"));
};
F.Trig_LRpaoxiao1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988560) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRpaoxiao1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677379,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677379,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852164));
};
F.InitTrig_LRpaoxiao1=function* () {
G.gg_trg_LRpaoxiao1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRpaoxiao1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRpaoxiao1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRpaoxiao1,(yield* V.call("Condition","Trig_LRpaoxiao1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRpaoxiao1,"Trig_LRpaoxiao1_Actions"));
};
F.Trig_LRpaoxiao2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988559) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRpaoxiao2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677402,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677402,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852164));
};
F.InitTrig_LRpaoxiao2=function* () {
G.gg_trg_LRpaoxiao2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRpaoxiao2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRpaoxiao2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRpaoxiao2,(yield* V.call("Condition","Trig_LRpaoxiao2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRpaoxiao2,"Trig_LRpaoxiao2_Actions"));
};
F.Trig_LRpaoxiao3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988554) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRpaoxiao3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677616,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677616,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852164));
};
F.InitTrig_LRpaoxiao3=function* () {
G.gg_trg_LRpaoxiao3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRpaoxiao3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRpaoxiao3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRpaoxiao3,(yield* V.call("Condition","Trig_LRpaoxiao3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRpaoxiao3,"Trig_LRpaoxiao3_Actions"));
};
F.Trig_LRjingxia1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988562) && ((yield* V.call("GetRandomInt",1,10)) <= 1));
};
F.Trig_LRjingxia1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677369,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677369,(yield* V.call("GetAttacker"))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852593,G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRjingxia1=function* () {
G.gg_trg_LRjingxia1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRjingxia1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRjingxia1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRjingxia1,(yield* V.call("Condition","Trig_LRjingxia1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRjingxia1,"Trig_LRjingxia1_Actions"));
};
F.Trig_LRjingxia2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988561) && ((yield* V.call("GetRandomInt",1,10)) <= 1));
};
F.Trig_LRjingxia2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677619,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677619,(yield* V.call("GetAttacker"))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852593,G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRjingxia2=function* () {
G.gg_trg_LRjingxia2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRjingxia2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRjingxia2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRjingxia2,(yield* V.call("Condition","Trig_LRjingxia2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRjingxia2,"Trig_LRjingxia2_Actions"));
};
F.Trig_LRjingxia3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988553) && ((yield* V.call("GetRandomInt",1,10)) <= 1));
};
F.Trig_LRjingxia3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677620,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677620,(yield* V.call("GetAttacker"))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852593,G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRjingxia3=function* () {
G.gg_trg_LRjingxia3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRjingxia3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRjingxia3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRjingxia3,(yield* V.call("Condition","Trig_LRjingxia3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRjingxia3,"Trig_LRjingxia3_Actions"));
};
F.Trig_LRshuren1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988552) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRshuren1_Actions=function* () {
(yield* V.call("UnitAddAbilityBJ",1093677396,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852097));
(yield* V.call("UnitRemoveAbilityBJ",1093677396,(yield* V.call("GetAttacker"))));
};
F.InitTrig_LRshuren1=function* () {
G.gg_trg_LRshuren1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRshuren1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRshuren1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRshuren1,(yield* V.call("Condition","Trig_LRshuren1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRshuren1,"Trig_LRshuren1_Actions"));
};
F.Trig_LRshuren2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988558) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRshuren2_Actions=function* () {
(yield* V.call("UnitAddAbilityBJ",1093677394,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852097));
(yield* V.call("UnitRemoveAbilityBJ",1093677394,(yield* V.call("GetAttacker"))));
};
F.InitTrig_LRshuren2=function* () {
G.gg_trg_LRshuren2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRshuren2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRshuren2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRshuren2,(yield* V.call("Condition","Trig_LRshuren2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRshuren2,"Trig_LRshuren2_Actions"));
};
F.Trig_LRshuren3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988557) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRshuren3_Actions=function* () {
(yield* V.call("UnitAddAbilityBJ",1093677397,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852097));
(yield* V.call("UnitRemoveAbilityBJ",1093677397,(yield* V.call("GetAttacker"))));
};
F.InitTrig_LRshuren3=function* () {
G.gg_trg_LRshuren3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRshuren3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRshuren3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRshuren3,(yield* V.call("Condition","Trig_LRshuren3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRshuren3,"Trig_LRshuren3_Actions"));
};
F.Trig_LRlang1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988568) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRlang1_Actions=function* () {
(yield* V.call("UnitAddAbilityBJ",1093677650,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852097));
(yield* V.call("UnitRemoveAbilityBJ",1093677650,(yield* V.call("GetAttacker"))));
};
F.InitTrig_LRlang1=function* () {
G.gg_trg_LRlang1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRlang1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRlang1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRlang1,(yield* V.call("Condition","Trig_LRlang1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRlang1,"Trig_LRlang1_Actions"));
};
F.Trig_LRlang2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988567) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRlang2_Actions=function* () {
(yield* V.call("UnitAddAbilityBJ",1093677649,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852097));
(yield* V.call("UnitRemoveAbilityBJ",1093677649,(yield* V.call("GetAttacker"))));
};
F.InitTrig_LRlang2=function* () {
G.gg_trg_LRlang2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRlang2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRlang2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRlang2,(yield* V.call("Condition","Trig_LRlang2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRlang2,"Trig_LRlang2_Actions"));
};
F.Trig_LRlang3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988563) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRlang3_Actions=function* () {
(yield* V.call("UnitAddAbilityBJ",1093677651,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852097));
(yield* V.call("UnitRemoveAbilityBJ",1093677651,(yield* V.call("GetAttacker"))));
};
F.InitTrig_LRlang3=function* () {
G.gg_trg_LRlang3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRlang3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRlang3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRlang3,(yield* V.call("Condition","Trig_LRlang3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRlang3,"Trig_LRlang3_Actions"));
};
F.Trig_LRshandian1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988784) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_LRshandian1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677136,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677136,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetTriggerUnit"))));
};
F.InitTrig_LRshandian1=function* () {
G.gg_trg_LRshandian1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRshandian1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRshandian1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRshandian1,(yield* V.call("Condition","Trig_LRshandian1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRshandian1,"Trig_LRshandian1_Actions"));
};
F.Trig_LRshandian2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988570) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_LRshandian2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677625,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677625,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetTriggerUnit"))));
};
F.InitTrig_LRshandian2=function* () {
G.gg_trg_LRshandian2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRshandian2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRshandian2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRshandian2,(yield* V.call("Condition","Trig_LRshandian2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRshandian2,"Trig_LRshandian2_Actions"));
};
F.Trig_LRshandian3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988569) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_LRshandian3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677624,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677624,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetTriggerUnit"))));
};
F.InitTrig_LRshandian3=function* () {
G.gg_trg_LRshandian3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRshandian3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRshandian3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRshandian3,(yield* V.call("Condition","Trig_LRshandian3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRshandian3,"Trig_LRshandian3_Actions"));
};
F.Trig_LRshandian4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990066) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_LRshandian4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681972,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093681972,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetTriggerUnit"))));
};
F.InitTrig_LRshandian4=function* () {
G.gg_trg_LRshandian4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRshandian4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRshandian4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRshandian4,(yield* V.call("Condition","Trig_LRshandian4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRshandian4,"Trig_LRshandian4_Actions"));
};
F.Trig_LRdahuo1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988785) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRdahuo1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678150,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093678150,(yield* V.call("GetAttacker"))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852580,G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRdahuo1=function* () {
G.gg_trg_LRdahuo1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRdahuo1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRdahuo1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRdahuo1,(yield* V.call("Condition","Trig_LRdahuo1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRdahuo1,"Trig_LRdahuo1_Actions"));
};
F.Trig_LRdahuo2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988788) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRdahuo2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677377,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677377,(yield* V.call("GetAttacker"))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852580,G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRdahuo2=function* () {
G.gg_trg_LRdahuo2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRdahuo2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRdahuo2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRdahuo2,(yield* V.call("Condition","Trig_LRdahuo2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRdahuo2,"Trig_LRdahuo2_Actions"));
};
F.Trig_LRdahuo3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988789) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRdahuo3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678151,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093678151,(yield* V.call("GetAttacker"))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852580,G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRdahuo3=function* () {
G.gg_trg_LRdahuo3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRdahuo3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRdahuo3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRdahuo3,(yield* V.call("Condition","Trig_LRdahuo3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRdahuo3,"Trig_LRdahuo3_Actions"));
};
F.Trig_LRdahuo4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990067) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRdahuo4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681970,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093681970,(yield* V.call("GetAttacker"))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852580,G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRdahuo4=function* () {
G.gg_trg_LRdahuo4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRdahuo4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRdahuo4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRdahuo4,(yield* V.call("Condition","Trig_LRdahuo4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRdahuo4,"Trig_LRdahuo4_Actions"));
};
F.Trig_LRqunxing1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988793) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRqunxing1_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656882,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",2.2,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetLastCreatedUnit")),852183));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRqunxing1=function* () {
G.gg_trg_LRqunxing1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRqunxing1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRqunxing1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRqunxing1,(yield* V.call("Condition","Trig_LRqunxing1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRqunxing1,"Trig_LRqunxing1_Actions"));
};
F.Trig_LRqunxing2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988787) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRqunxing2_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656883,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",2.2,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetLastCreatedUnit")),852183));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRqunxing2=function* () {
G.gg_trg_LRqunxing2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRqunxing2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRqunxing2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRqunxing2,(yield* V.call("Condition","Trig_LRqunxing2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRqunxing2,"Trig_LRqunxing2_Actions"));
};
F.Trig_LRqunxing3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988786) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRqunxing3_Actions=function* () {
(yield* V.call("SetUnitUserData",(yield* V.call("GetAttacker")),((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) + (G.udg_waves + 2))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656881,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",2.2,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetLastCreatedUnit")),852183));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRqunxing3=function* () {
G.gg_trg_LRqunxing3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRqunxing3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRqunxing3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRqunxing3,(yield* V.call("Condition","Trig_LRqunxing3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRqunxing3,"Trig_LRqunxing3_Actions"));
};
F.Trig_LRqunxing4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990068) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_LRqunxing4_Actions=function* () {
(yield* V.call("SetUnitUserData",(yield* V.call("GetAttacker")),((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) + (G.udg_waves + 2))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656912,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",2.2,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetLastCreatedUnit")),852183));
(yield* V.call("RemoveLocation",G.udg_Pointa));
};
F.InitTrig_LRqunxing4=function* () {
G.gg_trg_LRqunxing4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRqunxing4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRqunxing4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRqunxing4,(yield* V.call("Condition","Trig_LRqunxing4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRqunxing4,"Trig_LRqunxing4_Actions"));
};
F.Trig_LRqunbu_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988801) && ((yield* V.call("GetRandomInt",1,5)) <= 1));
};
F.Trig_LRqunbu_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_LRqunbu_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_LRqunbu_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_LRqunbu_Func004002003001001")),(yield* V.call("Trig_LRqunbu_Func004002003001002"))));
};
F.Trig_LRqunbu_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_u))));
};
F.Trig_LRqunbu_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_LRqunbu_Func004002003001")),(yield* V.call("Trig_LRqunbu_Func004002003002"))));
};
F.Trig_LRqunbu_Func006Func001C=function* () {
return (G.udg_i < 12);
};
F.Trig_LRqunbu_Func006A=function* () {
if ((yield* V.call("Trig_LRqunbu_Func006Func001C"))) {
G.udg_i = (G.udg_i + 1);
(yield* V.call("CreateNUnitsAtLoc",1,1697656882,(yield* V.call("GetOwningPlayer",G.udg_u)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852106,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitDamageTarget",G.udg_u,(yield* V.call("GetEnumUnit")),(2.0 * ((yield* V.call("I2R",(yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))))) + 15000.0)),false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_LIGHTNING,G.WEAPON_TYPE_WHOKNOWS));
}
};
F.Trig_LRqunbu_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
G.udg_u = (yield* V.call("GetAttacker"));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",700.0,G.udg_Pointb,(yield* V.call("Condition","Trig_LRqunbu_Func004002003"))));
G.udg_i = 0;
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_LRqunbu_Func006A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
(yield* V.call("GroupClear",G.udg_uuuuu));
};
F.InitTrig_LRqunbu=function* () {
G.gg_trg_LRqunbu = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_LRqunbu));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_LRqunbu,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_LRqunbu,(yield* V.call("Condition","Trig_LRqunbu_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LRqunbu,"Trig_LRqunbu_Actions"));
};
F.Trig_YMmajiajue_Conditions=function* () {
return ((yield* V.call("GetUnitTypeId",(yield* V.call("GetConstructedStructure")))) === 1747989042);
};
F.Trig_YMmajiajue_Func001001=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetConstructedStructure")))) === (yield* V.call("Player",0)));
};
F.Trig_YMmajiajue_Func002001=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetConstructedStructure")))) === (yield* V.call("Player",1)));
};
F.Trig_YMmajiajue_Func003001=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetConstructedStructure")))) === (yield* V.call("Player",2)));
};
F.Trig_YMmajiajue_Func004001=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetConstructedStructure")))) === (yield* V.call("Player",3)));
};
F.Trig_YMmajiajue_Func005001=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetConstructedStructure")))) === (yield* V.call("Player",4)));
};
F.Trig_YMmajiajue_Actions=function* () {
if ((yield* V.call("Trig_YMmajiajue_Func001001"))) {
(yield* V.call("RemoveUnit",G.gg_unit_e007_0010));
}
if ((yield* V.call("Trig_YMmajiajue_Func002001"))) {
(yield* V.call("RemoveUnit",G.gg_unit_e007_0012));
}
if ((yield* V.call("Trig_YMmajiajue_Func003001"))) {
(yield* V.call("RemoveUnit",G.gg_unit_e007_0013));
}
if ((yield* V.call("Trig_YMmajiajue_Func004001"))) {
(yield* V.call("RemoveUnit",G.gg_unit_e007_0014));
}
if ((yield* V.call("Trig_YMmajiajue_Func005001"))) {
(yield* V.call("RemoveUnit",G.gg_unit_e007_0015));
}
};
F.InitTrig_YMmajiajue=function* () {
G.gg_trg_YMmajiajue = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMmajiajue,G.EVENT_PLAYER_UNIT_CONSTRUCT_FINISH));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMmajiajue,(yield* V.call("Condition","Trig_YMmajiajue_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMmajiajue,"Trig_YMmajiajue_Actions"));
};
F.Trig_YMsheshenquyi_Conditions=function* () {
return (((yield* V.call("GetSpellAbilityId")) === 1093678146) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747988807));
};
F.Trig_YMsheshenquyi_Func003Func001Func005C=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) === G.udg_level1[(yield* V.call("GetForLoopIndexA"))]) || ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) === G.udg_level2[(yield* V.call("GetForLoopIndexA"))]));
};
F.Trig_YMsheshenquyi_Func003Func001C=function* () {
return (yield* V.call("Trig_YMsheshenquyi_Func003Func001Func005C"));
};
F.Trig_YMsheshenquyi_Func004Func001Func005C=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) === G.udg_level2[(yield* V.call("GetForLoopIndexA"))]) || ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) === G.udg_level3[(yield* V.call("GetForLoopIndexA"))]));
};
F.Trig_YMsheshenquyi_Func004Func001C=function* () {
return (yield* V.call("Trig_YMsheshenquyi_Func004Func001Func005C"));
};
F.Trig_YMsheshenquyi_Func005Func001Func005C=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) === G.udg_level4[(yield* V.call("GetForLoopIndexA"))]) || ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellTargetUnit")))) === G.udg_level3[(yield* V.call("GetForLoopIndexA"))]));
};
F.Trig_YMsheshenquyi_Func005Func001C=function* () {
return (yield* V.call("Trig_YMsheshenquyi_Func005Func001Func005C"));
};
F.Trig_YMsheshenquyi_Actions=function* () {
(yield* V.call("SetUnitUserData",(yield* V.call("GetSpellTargetUnit")),((yield* V.call("GetUnitUserData",(yield* V.call("GetSpellTargetUnit")))) + (yield* V.call("GetUnitUserData",(yield* V.call("GetSpellAbilityUnit")))))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetSpellAbilityUnit")),0));
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 24;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_YMsheshenquyi_Func003Func001C"))) {
(yield* V.call("RemoveUnit",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_level3[(yield* V.call("GetForLoopIndexA"))],(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),(yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit")))),G.bj_UNIT_FACING));
(yield* V.call("AddSpecialEffectLocBJ",(yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit")))),"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetSpellAbilityUnit")))) + (("|r舍身取义，将队友的一名" + (yield* V.call("GetUnitName",(yield* V.call("GetSpellTargetUnit"))))) + "晋升为|c0000FF00")) + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "|r！")))));
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
G.bj_forLoopAIndex = 25;
G.bj_forLoopAIndexEnd = 48;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_YMsheshenquyi_Func004Func001C"))) {
(yield* V.call("RemoveUnit",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_level4[(yield* V.call("GetForLoopIndexA"))],(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),(yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit")))),G.bj_UNIT_FACING));
(yield* V.call("AddSpecialEffectLocBJ",(yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit")))),"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetSpellAbilityUnit")))) + (("|r舍身取义，将队友的一名" + (yield* V.call("GetUnitName",(yield* V.call("GetSpellTargetUnit"))))) + "晋升为|c0000FF00")) + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "|r！")))));
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
G.bj_forLoopAIndex = 49;
G.bj_forLoopAIndexEnd = 72;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_YMsheshenquyi_Func005Func001C"))) {
(yield* V.call("RemoveUnit",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_level5[(yield* V.call("GetForLoopIndexA"))],(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),(yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit")))),G.bj_UNIT_FACING));
(yield* V.call("AddSpecialEffectLocBJ",(yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit")))),"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetSpellAbilityUnit")))) + (("|r舍身取义，将队友的一名" + (yield* V.call("GetUnitName",(yield* V.call("GetSpellTargetUnit"))))) + "晋升为|c0000FF00")) + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "|r！")))));
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
(yield* V.call("ExplodeUnitBJ",(yield* V.call("GetSpellAbilityUnit"))));
};
F.InitTrig_YMsheshenquyi=function* () {
G.gg_trg_YMsheshenquyi = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMsheshenquyi));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMsheshenquyi,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMsheshenquyi,(yield* V.call("Condition","Trig_YMsheshenquyi_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMsheshenquyi,"Trig_YMsheshenquyi_Actions"));
};
F.Trig_YMzhaohuanxiong1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988818) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_YMzhaohuanxiong1_Actions=function* () {
(yield* V.call("UnitAddAbilityBJ",1093677898,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852097));
(yield* V.call("UnitRemoveAbilityBJ",1093677898,(yield* V.call("GetAttacker"))));
};
F.InitTrig_YMzhaohuanxiong1=function* () {
G.gg_trg_YMzhaohuanxiong1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMzhaohuanxiong1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMzhaohuanxiong1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMzhaohuanxiong1,(yield* V.call("Condition","Trig_YMzhaohuanxiong1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMzhaohuanxiong1,"Trig_YMzhaohuanxiong1_Actions"));
};
F.Trig_YMzhaohuanxiong2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988821) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_YMzhaohuanxiong2_Actions=function* () {
(yield* V.call("UnitAddAbilityBJ",1093677899,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852097));
(yield* V.call("UnitRemoveAbilityBJ",1093677899,(yield* V.call("GetAttacker"))));
};
F.InitTrig_YMzhaohuanxiong2=function* () {
G.gg_trg_YMzhaohuanxiong2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMzhaohuanxiong2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMzhaohuanxiong2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMzhaohuanxiong2,(yield* V.call("Condition","Trig_YMzhaohuanxiong2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMzhaohuanxiong2,"Trig_YMzhaohuanxiong2_Actions"));
};
F.Trig_YMzhaohuanxiong3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988822) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_YMzhaohuanxiong3_Actions=function* () {
(yield* V.call("UnitAddAbilityBJ",1093677900,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852097));
(yield* V.call("UnitRemoveAbilityBJ",1093677900,(yield* V.call("GetAttacker"))));
};
F.InitTrig_YMzhaohuanxiong3=function* () {
G.gg_trg_YMzhaohuanxiong3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMzhaohuanxiong3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMzhaohuanxiong3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMzhaohuanxiong3,(yield* V.call("Condition","Trig_YMzhaohuanxiong3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMzhaohuanxiong3,"Trig_YMzhaohuanxiong3_Actions"));
};
F.Trig_YMjingshu1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989044) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_YMjingshu1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677897,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677897,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852588));
};
F.InitTrig_YMjingshu1=function* () {
G.gg_trg_YMjingshu1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMjingshu1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMjingshu1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMjingshu1,(yield* V.call("Condition","Trig_YMjingshu1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMjingshu1,"Trig_YMjingshu1_Actions"));
};
F.Trig_YMjingshu2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988826) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_YMjingshu2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677896,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677896,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852588));
};
F.InitTrig_YMjingshu2=function* () {
G.gg_trg_YMjingshu2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMjingshu2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMjingshu2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMjingshu2,(yield* V.call("Condition","Trig_YMjingshu2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMjingshu2,"Trig_YMjingshu2_Actions"));
};
F.Trig_YMjingshu3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989043) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_YMjingshu3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677368,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677368,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852588));
};
F.InitTrig_YMjingshu3=function* () {
G.gg_trg_YMjingshu3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMjingshu3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMjingshu3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMjingshu3,(yield* V.call("Condition","Trig_YMjingshu3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMjingshu3,"Trig_YMjingshu3_Actions"));
};
F.Trig_YMdiyuhuo1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989046) && ((yield* V.call("GetRandomInt",1,10)) <= 1));
};
F.Trig_YMdiyuhuo1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677909,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677909,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852224,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMdiyuhuo1=function* () {
G.gg_trg_YMdiyuhuo1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMdiyuhuo1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMdiyuhuo1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMdiyuhuo1,(yield* V.call("Condition","Trig_YMdiyuhuo1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMdiyuhuo1,"Trig_YMdiyuhuo1_Actions"));
};
F.Trig_YMdiyuhuo2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989045) && ((yield* V.call("GetRandomInt",1,10)) <= 1));
};
F.Trig_YMdiyuhuo2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677138,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677138,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852224,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMdiyuhuo2=function* () {
G.gg_trg_YMdiyuhuo2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMdiyuhuo2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMdiyuhuo2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMdiyuhuo2,(yield* V.call("Condition","Trig_YMdiyuhuo2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMdiyuhuo2,"Trig_YMdiyuhuo2_Actions"));
};
F.Trig_YMdiyuhuo3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989047) && ((yield* V.call("GetRandomInt",1,10)) <= 1));
};
F.Trig_YMdiyuhuo3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677910,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677910,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852224,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMdiyuhuo3=function* () {
G.gg_trg_YMdiyuhuo3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMdiyuhuo3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMdiyuhuo3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMdiyuhuo3,(yield* V.call("Condition","Trig_YMdiyuhuo3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMdiyuhuo3,"Trig_YMdiyuhuo3_Actions"));
};
F.Trig_YMdiyuhuo4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990065) && ((yield* V.call("GetRandomInt",1,10)) <= 1));
};
F.Trig_YMdiyuhuo4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681748,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093681748,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852224,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMdiyuhuo4=function* () {
G.gg_trg_YMdiyuhuo4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMdiyuhuo4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMdiyuhuo4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMdiyuhuo4,(yield* V.call("Condition","Trig_YMdiyuhuo4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMdiyuhuo4,"Trig_YMdiyuhuo4_Actions"));
};
F.Trig_YMchongjibo1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988805) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMchongjibo1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677875,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677875,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852125,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMchongjibo1=function* () {
G.gg_trg_YMchongjibo1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMchongjibo1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMchongjibo1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMchongjibo1,(yield* V.call("Condition","Trig_YMchongjibo1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMchongjibo1,"Trig_YMchongjibo1_Actions"));
};
F.Trig_YMchongjibo2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988819) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMchongjibo2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677104,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677104,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852125,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMchongjibo2=function* () {
G.gg_trg_YMchongjibo2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMchongjibo2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMchongjibo2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMchongjibo2,(yield* V.call("Condition","Trig_YMchongjibo2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMchongjibo2,"Trig_YMchongjibo2_Actions"));
};
F.Trig_YMchongjibo3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988820) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMchongjibo3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677876,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677876,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852125,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMchongjibo3=function* () {
G.gg_trg_YMchongjibo3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMchongjibo3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMchongjibo3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMchongjibo3,(yield* V.call("Condition","Trig_YMchongjibo3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMchongjibo3,"Trig_YMchongjibo3_Actions"));
};
F.Trig_YMdimaoci1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988825) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMdimaoci1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677139,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677139,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852555,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMdimaoci1=function* () {
G.gg_trg_YMdimaoci1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMdimaoci1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMdimaoci1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMdimaoci1,(yield* V.call("Condition","Trig_YMdimaoci1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMdimaoci1,"Trig_YMdimaoci1_Actions"));
};
F.Trig_YMdimaoci2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988824) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMdimaoci2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677878,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677878,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852555,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMdimaoci2=function* () {
G.gg_trg_YMdimaoci2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMdimaoci2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMdimaoci2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMdimaoci2,(yield* V.call("Condition","Trig_YMdimaoci2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMdimaoci2,"Trig_YMdimaoci2_Actions"));
};
F.Trig_YMdimaoci3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988823) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMdimaoci3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677877,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677877,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852555,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMdimaoci3=function* () {
G.gg_trg_YMdimaoci3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMdimaoci3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMdimaoci3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMdimaoci3,(yield* V.call("Condition","Trig_YMdimaoci3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMdimaoci3,"Trig_YMdimaoci3_Actions"));
};
F.Trig_YMdimaoci4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989850) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMdimaoci4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681753,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093681753,(yield* V.call("GetAttacker"))));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852555,G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.InitTrig_YMdimaoci4=function* () {
G.gg_trg_YMdimaoci4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMdimaoci4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMdimaoci4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMdimaoci4,(yield* V.call("Condition","Trig_YMdimaoci4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMdimaoci4,"Trig_YMdimaoci4_Actions"));
};
F.Trig_YMfengbaozhichui1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989042) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMfengbaozhichui1_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_YMfengbaozhichui1_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_YMfengbaozhichui1_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YMfengbaozhichui1_Func004002003001001")),(yield* V.call("Trig_YMfengbaozhichui1_Func004002003001002"))));
};
F.Trig_YMfengbaozhichui1_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_YMfengbaozhichui1_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YMfengbaozhichui1_Func004002003001")),(yield* V.call("Trig_YMfengbaozhichui1_Func004002003002"))));
};
F.Trig_YMfengbaozhichui1_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656885,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852095,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_YMfengbaozhichui1_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
G.udg_YMu = (yield* V.call("GetAttacker"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",600.0,G.udg_Pointb,(yield* V.call("Condition","Trig_YMfengbaozhichui1_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_YMfengbaozhichui1_Func005A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_YMfengbaozhichui1=function* () {
G.gg_trg_YMfengbaozhichui1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMfengbaozhichui1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMfengbaozhichui1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMfengbaozhichui1,(yield* V.call("Condition","Trig_YMfengbaozhichui1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMfengbaozhichui1,"Trig_YMfengbaozhichui1_Actions"));
};
F.Trig_YMfengbaozhichui2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989040) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMfengbaozhichui2_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_YMfengbaozhichui2_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_YMfengbaozhichui2_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YMfengbaozhichui2_Func004002003001001")),(yield* V.call("Trig_YMfengbaozhichui2_Func004002003001002"))));
};
F.Trig_YMfengbaozhichui2_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_YMfengbaozhichui2_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YMfengbaozhichui2_Func004002003001")),(yield* V.call("Trig_YMfengbaozhichui2_Func004002003002"))));
};
F.Trig_YMfengbaozhichui2_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656886,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852095,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_YMfengbaozhichui2_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
G.udg_YMu = (yield* V.call("GetAttacker"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",650.0,G.udg_Pointb,(yield* V.call("Condition","Trig_YMfengbaozhichui2_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_YMfengbaozhichui2_Func005A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_YMfengbaozhichui2=function* () {
G.gg_trg_YMfengbaozhichui2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMfengbaozhichui2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMfengbaozhichui2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMfengbaozhichui2,(yield* V.call("Condition","Trig_YMfengbaozhichui2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMfengbaozhichui2,"Trig_YMfengbaozhichui2_Actions"));
};
F.Trig_YMfengbaozhichui3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989041) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMfengbaozhichui3_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_YMfengbaozhichui3_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_YMfengbaozhichui3_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YMfengbaozhichui3_Func004002003001001")),(yield* V.call("Trig_YMfengbaozhichui3_Func004002003001002"))));
};
F.Trig_YMfengbaozhichui3_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_YMfengbaozhichui3_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YMfengbaozhichui3_Func004002003001")),(yield* V.call("Trig_YMfengbaozhichui3_Func004002003002"))));
};
F.Trig_YMfengbaozhichui3_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656884,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852095,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_YMfengbaozhichui3_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
G.udg_YMu = (yield* V.call("GetAttacker"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",700.0,G.udg_Pointb,(yield* V.call("Condition","Trig_YMfengbaozhichui3_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_YMfengbaozhichui3_Func005A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_YMfengbaozhichui3=function* () {
G.gg_trg_YMfengbaozhichui3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMfengbaozhichui3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMfengbaozhichui3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMfengbaozhichui3,(yield* V.call("Condition","Trig_YMfengbaozhichui3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMfengbaozhichui3,"Trig_YMfengbaozhichui3_Actions"));
};
F.Trig_YMfengbaozhichui4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990064) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_YMfengbaozhichui4_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_YMfengbaozhichui4_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_YMfengbaozhichui4_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YMfengbaozhichui4_Func004002003001001")),(yield* V.call("Trig_YMfengbaozhichui4_Func004002003001002"))));
};
F.Trig_YMfengbaozhichui4_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_YMfengbaozhichui4_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YMfengbaozhichui4_Func004002003001")),(yield* V.call("Trig_YMfengbaozhichui4_Func004002003002"))));
};
F.Trig_YMfengbaozhichui4_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656915,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852095,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_YMfengbaozhichui4_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
G.udg_YMu = (yield* V.call("GetAttacker"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",700.0,G.udg_Pointb,(yield* V.call("Condition","Trig_YMfengbaozhichui4_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_YMfengbaozhichui4_Func005A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_YMfengbaozhichui4=function* () {
G.gg_trg_YMfengbaozhichui4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMfengbaozhichui4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMfengbaozhichui4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMfengbaozhichui4,(yield* V.call("Condition","Trig_YMfengbaozhichui4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMfengbaozhichui4,"Trig_YMfengbaozhichui4_Actions"));
};
F.Trig_YMLeiTing_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747988813) && ((yield* V.call("GetSpellAbilityId")) === 1093678390));
};
F.Trig_YMLeiTing_Func004Func001002003=function* () {
return (yield* V.call("IsUnitAlly",(yield* V.call("GetFilterUnit")),(yield* V.call("Player",8))));
};
F.Trig_YMLeiTing_Func004Func003002003=function* () {
return (yield* V.call("IsUnitAlly",(yield* V.call("GetFilterUnit")),(yield* V.call("Player",8))));
};
F.Trig_YMLeiTing_Func004C=function* () {
return ((yield* V.call("GetUnitUserData",(yield* V.call("GetSpellAbilityUnit")))) >= 5000);
};
F.Trig_YMLeiTing_Func011Func001C=function* () {
return (G.udg_i < 15);
};
F.Trig_YMLeiTing_Func011A=function* () {
if ((yield* V.call("Trig_YMLeiTing_Func011Func001C"))) {
G.udg_i = (G.udg_i + 1);
(yield* V.call("UnitDamageTarget",G.udg_SFHero,(yield* V.call("GetEnumUnit")),(4.0 * ((yield* V.call("I2R",(yield* V.call("GetUnitUserData",G.udg_SFHero)))) + 12000.0)),false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_LIGHTNING,G.WEAPON_TYPE_WHOKNOWS));
}
};
F.Trig_YMLeiTing_Actions=function* () {
G.udg_SFHero = (yield* V.call("GetSpellAbilityUnit"));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
if ((yield* V.call("Trig_YMLeiTing_Func004C"))) {
G.udg_TempGro = (yield* V.call("GetUnitsInRangeOfLocMatching",1000.0,G.udg_TempPoi,(yield* V.call("Condition","Trig_YMLeiTing_Func004Func003002003"))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656886,(yield* V.call("GetTriggerPlayer")),G.udg_TempPoi,G.bj_UNIT_FACING));
} else {
G.udg_TempGro = (yield* V.call("GetUnitsInRangeOfLocMatching",700.0,G.udg_TempPoi,(yield* V.call("Condition","Trig_YMLeiTing_Func004Func001002003"))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656885,(yield* V.call("GetTriggerPlayer")),G.udg_TempPoi,G.bj_UNIT_FACING));
}
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetLastCreatedUnit")),852096));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_TempPoi,"Abilities\\Spells\\Human\\ThunderClap\\ThunderClapCaster.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
G.udg_i = 0;
(yield* V.call("ForGroupBJ",G.udg_TempGro,"Trig_YMLeiTing_Func011A"));
(yield* V.call("GroupClear",G.udg_TempGro));
};
F.InitTrig_YMLeiTing=function* () {
G.gg_trg_YMLeiTing = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YMLeiTing));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YMLeiTing,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YMLeiTing,(yield* V.call("Condition","Trig_YMLeiTing_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YMLeiTing,"Trig_YMLeiTing_Actions"));
};
F.Trig_SSkusimingxiang_Conditions=function* () {
return (((yield* V.call("GetSpellAbilityId")) === 1093678642) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989059));
};
F.Trig_SSkusimingxiang_Func002002003=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) !== null);
};
F.Trig_SSkusimingxiang_Func005Func001C=function* () {
return ((yield* V.call("GetUnitPointValue",(yield* V.call("GetEnumUnit")))) !== 6);
};
F.Trig_SSkusimingxiang_Func005A=function* () {
if ((yield* V.call("Trig_SSkusimingxiang_Func005Func001C"))) {
(yield* V.call("SetUnitManaPercentBJ",(yield* V.call("GetEnumUnit")),100));
}
};
F.Trig_SSkusimingxiang_Actions=function* () {
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempGro = (yield* V.call("GetUnitsInRangeOfLocMatching",2000.0,G.udg_TempPoi,(yield* V.call("Condition","Trig_SSkusimingxiang_Func002002003"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetSpellAbilityUnit")))) + "|c00FF00FF苦思冥想|r，将附近友军的魔法值恢复全满~但因用脑过度不幸夭折啦……") + "|c0000ff00汗~"))));
(yield* V.call("ExplodeUnitBJ",(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("ForGroupBJ",G.udg_TempGro,"Trig_SSkusimingxiang_Func005A"));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("GroupClear",G.udg_TempGro));
};
F.InitTrig_SSkusimingxiang=function* () {
G.gg_trg_SSkusimingxiang = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSkusimingxiang));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSkusimingxiang,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSkusimingxiang,(yield* V.call("Condition","Trig_SSkusimingxiang_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSkusimingxiang,"Trig_SSkusimingxiang_Actions"));
};
F.Trig_SSbingxueluanwu1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989082) && ((yield* V.call("GetSpellAbilityId")) === 1093678420));
};
F.Trig_SSbingxueluanwu1_Func007002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_SSbingxueluanwu1_Func007002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_SSbingxueluanwu1_Func007002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_SSbingxueluanwu1_Func007002003001001")),(yield* V.call("Trig_SSbingxueluanwu1_Func007002003001002"))));
};
F.Trig_SSbingxueluanwu1_Func007002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_SSbingxueluanwu1_Func007002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_SSbingxueluanwu1_Func007002003001")),(yield* V.call("Trig_SSbingxueluanwu1_Func007002003002"))));
};
F.Trig_SSbingxueluanwu1_Func008A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656889,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852226,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("UnitDamageTarget",G.udg_YMu,(yield* V.call("GetEnumUnit")),5500.0,false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_COLD,G.WEAPON_TYPE_WHOKNOWS));
};
F.Trig_SSbingxueluanwu1_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
G.udg_YMu = (yield* V.call("GetSpellAbilityUnit"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",650.0,G.udg_Pointb,(yield* V.call("Condition","Trig_SSbingxueluanwu1_Func007002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_SSbingxueluanwu1_Func008A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSbingxueluanwu1=function* () {
G.gg_trg_SSbingxueluanwu1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSbingxueluanwu1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSbingxueluanwu1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSbingxueluanwu1,(yield* V.call("Condition","Trig_SSbingxueluanwu1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSbingxueluanwu1,"Trig_SSbingxueluanwu1_Actions"));
};
F.Trig_SSbingxueluanwu2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989081) && ((yield* V.call("GetSpellAbilityId")) === 1093678418));
};
F.Trig_SSbingxueluanwu2_Func007002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_SSbingxueluanwu2_Func007002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_SSbingxueluanwu2_Func007002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_SSbingxueluanwu2_Func007002003001001")),(yield* V.call("Trig_SSbingxueluanwu2_Func007002003001002"))));
};
F.Trig_SSbingxueluanwu2_Func007002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_SSbingxueluanwu2_Func007002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_SSbingxueluanwu2_Func007002003001")),(yield* V.call("Trig_SSbingxueluanwu2_Func007002003002"))));
};
F.Trig_SSbingxueluanwu2_Func008A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656897,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852226,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("UnitDamageTarget",G.udg_YMu,(yield* V.call("GetEnumUnit")),11000.0,false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_COLD,G.WEAPON_TYPE_WHOKNOWS));
};
F.Trig_SSbingxueluanwu2_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
G.udg_YMu = (yield* V.call("GetSpellAbilityUnit"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",650.0,G.udg_Pointb,(yield* V.call("Condition","Trig_SSbingxueluanwu2_Func007002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_SSbingxueluanwu2_Func008A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSbingxueluanwu2=function* () {
G.gg_trg_SSbingxueluanwu2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSbingxueluanwu2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSbingxueluanwu2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSbingxueluanwu2,(yield* V.call("Condition","Trig_SSbingxueluanwu2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSbingxueluanwu2,"Trig_SSbingxueluanwu2_Actions"));
};
F.Trig_SSbingxueluanwu3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989296) && ((yield* V.call("GetSpellAbilityId")) === 1093678419));
};
F.Trig_SSbingxueluanwu3_Func007002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_SSbingxueluanwu3_Func007002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_SSbingxueluanwu3_Func007002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_SSbingxueluanwu3_Func007002003001001")),(yield* V.call("Trig_SSbingxueluanwu3_Func007002003001002"))));
};
F.Trig_SSbingxueluanwu3_Func007002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_SSbingxueluanwu3_Func007002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_SSbingxueluanwu3_Func007002003001")),(yield* V.call("Trig_SSbingxueluanwu3_Func007002003002"))));
};
F.Trig_SSbingxueluanwu3_Func008A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656898,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852226,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_SSbingxueluanwu3_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
G.udg_YMu = (yield* V.call("GetSpellAbilityUnit"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",650.0,G.udg_Pointb,(yield* V.call("Condition","Trig_SSbingxueluanwu3_Func007002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_SSbingxueluanwu3_Func008A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSbingxueluanwu3=function* () {
G.gg_trg_SSbingxueluanwu3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSbingxueluanwu3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSbingxueluanwu3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSbingxueluanwu3,(yield* V.call("Condition","Trig_SSbingxueluanwu3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSbingxueluanwu3,"Trig_SSbingxueluanwu3_Actions"));
};
F.Trig_SSbingxueluanwu4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747990072) && ((yield* V.call("GetSpellAbilityId")) === 1093681988));
};
F.Trig_SSbingxueluanwu4_Func007002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_SSbingxueluanwu4_Func007002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_SSbingxueluanwu4_Func007002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_SSbingxueluanwu4_Func007002003001001")),(yield* V.call("Trig_SSbingxueluanwu4_Func007002003001002"))));
};
F.Trig_SSbingxueluanwu4_Func007002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_SSbingxueluanwu4_Func007002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_SSbingxueluanwu4_Func007002003001")),(yield* V.call("Trig_SSbingxueluanwu4_Func007002003002"))));
};
F.Trig_SSbingxueluanwu4_Func008A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656914,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852226,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_SSbingxueluanwu4_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
G.udg_YMu = (yield* V.call("GetSpellAbilityUnit"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",650.0,G.udg_Pointb,(yield* V.call("Condition","Trig_SSbingxueluanwu4_Func007002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_SSbingxueluanwu4_Func008A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSbingxueluanwu4=function* () {
G.gg_trg_SSbingxueluanwu4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSbingxueluanwu4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSbingxueluanwu4,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSbingxueluanwu4,(yield* V.call("Condition","Trig_SSbingxueluanwu4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSbingxueluanwu4,"Trig_SSbingxueluanwu4_Actions"));
};
F.Trig_SSbaofengxue1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989068) && ((yield* V.call("GetSpellAbilityId")) === 1093678391));
};
F.Trig_SSbaofengxue1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678386,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678386,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852089,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSbaofengxue1=function* () {
G.gg_trg_SSbaofengxue1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSbaofengxue1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSbaofengxue1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSbaofengxue1,(yield* V.call("Condition","Trig_SSbaofengxue1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSbaofengxue1,"Trig_SSbaofengxue1_Actions"));
};
F.Trig_SSbaofengxue2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989067) && ((yield* V.call("GetSpellAbilityId")) === 1093678392));
};
F.Trig_SSbaofengxue2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678385,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678385,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852089,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSbaofengxue2=function* () {
G.gg_trg_SSbaofengxue2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSbaofengxue2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSbaofengxue2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSbaofengxue2,(yield* V.call("Condition","Trig_SSbaofengxue2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSbaofengxue2,"Trig_SSbaofengxue2_Actions"));
};
F.Trig_SSbaofengxue3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989066) && ((yield* V.call("GetSpellAbilityId")) === 1093678401));
};
F.Trig_SSbaofengxue3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677126,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677126,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852089,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSbaofengxue3=function* () {
G.gg_trg_SSbaofengxue3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSbaofengxue3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSbaofengxue3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSbaofengxue3,(yield* V.call("Condition","Trig_SSbaofengxue3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSbaofengxue3,"Trig_SSbaofengxue3_Actions"));
};
F.Trig_SSshuiyuansu1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989071) && ((yield* V.call("GetSpellAbilityId")) === 1093678403));
};
F.Trig_SSshuiyuansu1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677390,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677390,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetSpellAbilityUnit")),852097));
};
F.InitTrig_SSshuiyuansu1=function* () {
G.gg_trg_SSshuiyuansu1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSshuiyuansu1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSshuiyuansu1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSshuiyuansu1,(yield* V.call("Condition","Trig_SSshuiyuansu1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSshuiyuansu1,"Trig_SSshuiyuansu1_Actions"));
};
F.Trig_SSshuiyuansu2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989070) && ((yield* V.call("GetSpellAbilityId")) === 1093678402));
};
F.Trig_SSshuiyuansu2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677391,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677391,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetSpellAbilityUnit")),852097));
};
F.InitTrig_SSshuiyuansu2=function* () {
G.gg_trg_SSshuiyuansu2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSshuiyuansu2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSshuiyuansu2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSshuiyuansu2,(yield* V.call("Condition","Trig_SSshuiyuansu2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSshuiyuansu2,"Trig_SSshuiyuansu2_Actions"));
};
F.Trig_SSshuiyuansu3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989069) && ((yield* V.call("GetSpellAbilityId")) === 1093678393));
};
F.Trig_SSshuiyuansu3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677113,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677113,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetSpellAbilityUnit")),852097));
};
F.InitTrig_SSshuiyuansu3=function* () {
G.gg_trg_SSshuiyuansu3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSshuiyuansu3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSshuiyuansu3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSshuiyuansu3,(yield* V.call("Condition","Trig_SSshuiyuansu3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSshuiyuansu3,"Trig_SSshuiyuansu3_Actions"));
};
F.Trig_SSfenghuangniepan1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989080) && ((yield* V.call("GetSpellAbilityId")) === 1093678415));
};
F.Trig_SSfenghuangniepan1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678411,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678411,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852593,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSfenghuangniepan1=function* () {
G.gg_trg_SSfenghuangniepan1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSfenghuangniepan1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSfenghuangniepan1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSfenghuangniepan1,(yield* V.call("Condition","Trig_SSfenghuangniepan1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSfenghuangniepan1,"Trig_SSfenghuangniepan1_Actions"));
};
F.Trig_SSfenghuangniepan2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989078) && ((yield* V.call("GetSpellAbilityId")) === 1093678414));
};
F.Trig_SSfenghuangniepan2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678410,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678410,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852593,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSfenghuangniepan2=function* () {
G.gg_trg_SSfenghuangniepan2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSfenghuangniepan2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSfenghuangniepan2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSfenghuangniepan2,(yield* V.call("Condition","Trig_SSfenghuangniepan2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSfenghuangniepan2,"Trig_SSfenghuangniepan2_Actions"));
};
F.Trig_SSfenghuangniepan3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989079) && ((yield* V.call("GetSpellAbilityId")) === 1093678413));
};
F.Trig_SSfenghuangniepan3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678412,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678412,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852593,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSfenghuangniepan3=function* () {
G.gg_trg_SSfenghuangniepan3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSfenghuangniepan3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSfenghuangniepan3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSfenghuangniepan3,(yield* V.call("Condition","Trig_SSfenghuangniepan3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSfenghuangniepan3,"Trig_SSfenghuangniepan3_Actions"));
};
F.Trig_SSfenghuangniepan4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747990073) && ((yield* V.call("GetSpellAbilityId")) === 1093681992));
};
F.Trig_SSfenghuangniepan4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681991,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681991,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852593,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSfenghuangniepan4=function* () {
G.gg_trg_SSfenghuangniepan4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSfenghuangniepan4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSfenghuangniepan4,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSfenghuangniepan4,(yield* V.call("Condition","Trig_SSfenghuangniepan4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSfenghuangniepan4,"Trig_SSfenghuangniepan4_Actions"));
};
F.Trig_SSxixingdafa1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989298) && ((yield* V.call("GetSpellAbilityId")) === 1093678425));
};
F.Trig_SSxixingdafa1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677362,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677362,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852587,(yield* V.call("GetSpellTargetUnit"))));
};
F.InitTrig_SSxixingdafa1=function* () {
G.gg_trg_SSxixingdafa1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSxixingdafa1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSxixingdafa1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSxixingdafa1,(yield* V.call("Condition","Trig_SSxixingdafa1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSxixingdafa1,"Trig_SSxixingdafa1_Actions"));
};
F.Trig_SSxixingdafa2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989297) && ((yield* V.call("GetSpellAbilityId")) === 1093678424));
};
F.Trig_SSxixingdafa2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678421,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678421,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852587,(yield* V.call("GetSpellTargetUnit"))));
};
F.InitTrig_SSxixingdafa2=function* () {
G.gg_trg_SSxixingdafa2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSxixingdafa2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSxixingdafa2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSxixingdafa2,(yield* V.call("Condition","Trig_SSxixingdafa2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSxixingdafa2,"Trig_SSxixingdafa2_Actions"));
};
F.Trig_SSxixingdafa3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989299) && ((yield* V.call("GetSpellAbilityId")) === 1093678423));
};
F.Trig_SSxixingdafa3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678422,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678422,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852587,(yield* V.call("GetSpellTargetUnit"))));
};
F.InitTrig_SSxixingdafa3=function* () {
G.gg_trg_SSxixingdafa3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSxixingdafa3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSxixingdafa3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSxixingdafa3,(yield* V.call("Condition","Trig_SSxixingdafa3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSxixingdafa3,"Trig_SSxixingdafa3_Actions"));
};
F.Trig_SSxixingdafa4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747990081) && ((yield* V.call("GetSpellAbilityId")) === 1093681990));
};
F.Trig_SSxixingdafa4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681989,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681989,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852587,(yield* V.call("GetSpellTargetUnit"))));
};
F.InitTrig_SSxixingdafa4=function* () {
G.gg_trg_SSxixingdafa4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSxixingdafa4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSxixingdafa4,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSxixingdafa4,(yield* V.call("Condition","Trig_SSxixingdafa4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSxixingdafa4,"Trig_SSxixingdafa4_Actions"));
};
F.Trig_SSjulang1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989076) && ((yield* V.call("GetSpellAbilityId")) === 1093678408));
};
F.Trig_SSjulang1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677363,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677363,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852218,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSjulang1=function* () {
G.gg_trg_SSjulang1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSjulang1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSjulang1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSjulang1,(yield* V.call("Condition","Trig_SSjulang1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSjulang1,"Trig_SSjulang1_Actions"));
};
F.Trig_SSjulang2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989075) && ((yield* V.call("GetSpellAbilityId")) === 1093678407));
};
F.Trig_SSjulang2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678170,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678170,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852218,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSjulang2=function* () {
G.gg_trg_SSjulang2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSjulang2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSjulang2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSjulang2,(yield* V.call("Condition","Trig_SSjulang2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSjulang2,"Trig_SSjulang2_Actions"));
};
F.Trig_SSjulang3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989077) && ((yield* V.call("GetSpellAbilityId")) === 1093678409));
};
F.Trig_SSjulang3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678384,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678384,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852218,G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_SSjulang3=function* () {
G.gg_trg_SSjulang3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSjulang3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSjulang3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSjulang3,(yield* V.call("Condition","Trig_SSjulang3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSjulang3,"Trig_SSjulang3_Actions"));
};
F.Trig_SSJiejie_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989062) && ((yield* V.call("GetSpellAbilityId")) === 1093678657));
};
F.Trig_SSJiejie_Func004C=function* () {
return ((yield* V.call("GetUnitUserData",(yield* V.call("GetSpellAbilityUnit")))) >= 5000);
};
F.Trig_SSJiejie_Func008002003=function* () {
return (yield* V.call("IsUnitAlly",(yield* V.call("GetFilterUnit")),(yield* V.call("Player",8))));
};
F.Trig_SSJiejie_Func010Func001C=function* () {
return (G.udg_i < 15);
};
F.Trig_SSJiejie_Func010A=function* () {
if ((yield* V.call("Trig_SSJiejie_Func010Func001C"))) {
G.udg_i = (G.udg_i + 1);
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetEnumUnit"))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_Pointa,"Units\\Demon\\Infernal\\InfernalBirth.mdl"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("UnitDamageTarget",G.udg_SFHero,(yield* V.call("GetEnumUnit")),((2.5 * (2.0 + (yield* V.call("I2R",G.udg_weili)))) * ((yield* V.call("I2R",(yield* V.call("GetUnitUserData",G.udg_SFHero)))) + 10000.0)),false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_COLD,G.WEAPON_TYPE_WHOKNOWS));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
}
};
F.Trig_SSJiejie_Actions=function* () {
G.udg_SFHero = (yield* V.call("GetSpellAbilityUnit"));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
if ((yield* V.call("Trig_SSJiejie_Func004C"))) {
G.udg_weili = 1;
} else {
G.udg_weili = 0;
}
(yield* V.call("CreateNUnitsAtLoc",1,1697656889,(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.udg_Pointb,G.bj_UNIT_FACING));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetLastCreatedUnit")),852183));
(yield* V.call("UnitApplyTimedLifeBJ",2.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",1000.0,G.udg_Pointb,(yield* V.call("Condition","Trig_SSJiejie_Func008002003"))));
G.udg_i = 0;
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_SSJiejie_Func010A"));
(yield* V.call("RemoveLocation",G.udg_Pointb));
(yield* V.call("GroupClear",G.udg_YMuuuu));
};
F.InitTrig_SSJiejie=function* () {
G.gg_trg_SSJiejie = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_SSJiejie));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_SSJiejie,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_SSJiejie,(yield* V.call("Condition","Trig_SSJiejie_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_SSJiejie,"Trig_SSJiejie_Actions"));
};
F.fun_YXchaojipaoxiaoB_Actions=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",G.udg_huitian)))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",G.udg_huitian)) + "|r为拯救人类，牺牲自己释放了|c00FF00FF超级咆哮(牺牲)|r~让我们默默为它哀悼吧~") + ""))));
(yield* V.call("ExplodeUnitBJ",G.udg_huitian));
(yield* V.call("DestroyTimer",tm));
};
F.fun_YXchaojipaoxiaoB=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("TimerStart",tm,.1,false,"fun_YXchaojipaoxiaoB_Actions"));
tm = null;
};
F.Trig_YXchaojipaoxiao_Conditions=function* () {
return (((yield* V.call("GetSpellAbilityId")) === 1093678916) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989315));
};
F.Trig_YXchaojipaoxiao_Actions=function* () {
G.udg_huitian = (yield* V.call("GetSpellAbilityUnit"));
(yield* V.call("fun_YXchaojipaoxiaoB"));
};
F.InitTrig_YXchaojipaoxiao=function* () {
G.gg_trg_YXchaojipaoxiao = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXchaojipaoxiao));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXchaojipaoxiao,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXchaojipaoxiao,(yield* V.call("Condition","Trig_YXchaojipaoxiao_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXchaojipaoxiao,"Trig_YXchaojipaoxiao_Actions"));
};
F.Trig_YXwanjian1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989331) && ((yield* V.call("GetSpellAbilityId")) === 1093678678));
};
F.Trig_YXwanjian1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677378,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677378,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852652,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_YXwanjian1=function* () {
G.gg_trg_YXwanjian1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXwanjian1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXwanjian1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXwanjian1,(yield* V.call("Condition","Trig_YXwanjian1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXwanjian1,"Trig_YXwanjian1_Actions"));
};
F.Trig_YXwanjian2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989332) && ((yield* V.call("GetSpellAbilityId")) === 1093678677));
};
F.Trig_YXwanjian2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677906,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677906,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852652,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_YXwanjian2=function* () {
G.gg_trg_YXwanjian2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXwanjian2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXwanjian2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXwanjian2,(yield* V.call("Condition","Trig_YXwanjian2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXwanjian2,"Trig_YXwanjian2_Actions"));
};
F.Trig_YXwanjian3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989333) && ((yield* V.call("GetSpellAbilityId")) === 1093678679));
};
F.Trig_YXwanjian3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677905,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677905,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852652,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_YXwanjian3=function* () {
G.gg_trg_YXwanjian3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXwanjian3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXwanjian3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXwanjian3,(yield* V.call("Condition","Trig_YXwanjian3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXwanjian3,"Trig_YXwanjian3_Actions"));
};
F.Trig_YXhuoyanyu1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989335) && ((yield* V.call("GetSpellAbilityId")) === 1093678898));
};
F.Trig_YXhuoyanyu1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678680,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678680,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852238,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_YXhuoyanyu1=function* () {
G.gg_trg_YXhuoyanyu1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXhuoyanyu1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXhuoyanyu1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXhuoyanyu1,(yield* V.call("Condition","Trig_YXhuoyanyu1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXhuoyanyu1,"Trig_YXhuoyanyu1_Actions"));
};
F.Trig_YXhuoyanyu2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989334) && ((yield* V.call("GetSpellAbilityId")) === 1093678897));
};
F.Trig_YXhuoyanyu2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678681,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678681,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852238,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_YXhuoyanyu2=function* () {
G.gg_trg_YXhuoyanyu2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXhuoyanyu2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXhuoyanyu2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXhuoyanyu2,(yield* V.call("Condition","Trig_YXhuoyanyu2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXhuoyanyu2,"Trig_YXhuoyanyu2_Actions"));
};
F.Trig_YXhuoyanyu3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989336) && ((yield* V.call("GetSpellAbilityId")) === 1093678896));
};
F.Trig_YXhuoyanyu3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678682,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678682,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852238,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_YXhuoyanyu3=function* () {
G.gg_trg_YXhuoyanyu3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXhuoyanyu3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXhuoyanyu3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXhuoyanyu3,(yield* V.call("Condition","Trig_YXhuoyanyu3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXhuoyanyu3,"Trig_YXhuoyanyu3_Actions"));
};
F.Trig_YXhuoyanyu4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747990071) && ((yield* V.call("GetSpellAbilityId")) === 1093681986));
};
F.Trig_YXhuoyanyu4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681985,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681985,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852238,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_YXhuoyanyu4=function* () {
G.gg_trg_YXhuoyanyu4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXhuoyanyu4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXhuoyanyu4,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXhuoyanyu4,(yield* V.call("Condition","Trig_YXhuoyanyu4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXhuoyanyu4,"Trig_YXhuoyanyu4_Actions"));
};
F.Trig_YXliehuojingu1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989337) && ((yield* V.call("GetSpellAbilityId")) === 1093678669));
};
F.Trig_YXliehuojingu1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678660,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678660,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852587,(yield* V.call("GetSpellTargetUnit"))));
};
F.InitTrig_YXliehuojingu1=function* () {
G.gg_trg_YXliehuojingu1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXliehuojingu1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXliehuojingu1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXliehuojingu1,(yield* V.call("Condition","Trig_YXliehuojingu1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXliehuojingu1,"Trig_YXliehuojingu1_Actions"));
};
F.Trig_YXliehuojingu2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989338) && ((yield* V.call("GetSpellAbilityId")) === 1093678670));
};
F.Trig_YXliehuojingu2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678658,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678658,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852587,(yield* V.call("GetSpellTargetUnit"))));
};
F.InitTrig_YXliehuojingu2=function* () {
G.gg_trg_YXliehuojingu2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXliehuojingu2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXliehuojingu2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXliehuojingu2,(yield* V.call("Condition","Trig_YXliehuojingu2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXliehuojingu2,"Trig_YXliehuojingu2_Actions"));
};
F.Trig_YXliehuojingu3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989552) && ((yield* V.call("GetSpellAbilityId")) === 1093678671));
};
F.Trig_YXliehuojingu3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678659,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678659,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852587,(yield* V.call("GetSpellTargetUnit"))));
};
F.InitTrig_YXliehuojingu3=function* () {
G.gg_trg_YXliehuojingu3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXliehuojingu3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXliehuojingu3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXliehuojingu3,(yield* V.call("Condition","Trig_YXliehuojingu3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXliehuojingu3,"Trig_YXliehuojingu3_Actions"));
};
F.Trig_YXliehuojingu4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747990069) && ((yield* V.call("GetSpellAbilityId")) === 1093681977));
};
F.Trig_YXliehuojingu4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681976,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681976,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852587,(yield* V.call("GetSpellTargetUnit"))));
};
F.InitTrig_YXliehuojingu4=function* () {
G.gg_trg_YXliehuojingu4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXliehuojingu4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXliehuojingu4,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXliehuojingu4,(yield* V.call("Condition","Trig_YXliehuojingu4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXliehuojingu4,"Trig_YXliehuojingu4_Actions"));
};
F.Trig_YXdaolunzhan1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989325) && ((yield* V.call("GetSpellAbilityId")) === 1093678675));
};
F.Trig_YXdaolunzhan1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678672,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678672,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetSpellAbilityUnit")),852526));
};
F.InitTrig_YXdaolunzhan1=function* () {
G.gg_trg_YXdaolunzhan1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXdaolunzhan1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXdaolunzhan1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXdaolunzhan1,(yield* V.call("Condition","Trig_YXdaolunzhan1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXdaolunzhan1,"Trig_YXdaolunzhan1_Actions"));
};
F.Trig_YXdaolunzhan2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989313) && ((yield* V.call("GetSpellAbilityId")) === 1093678674));
};
F.Trig_YXdaolunzhan2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677145,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677145,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetSpellAbilityUnit")),852526));
};
F.InitTrig_YXdaolunzhan2=function* () {
G.gg_trg_YXdaolunzhan2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXdaolunzhan2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXdaolunzhan2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXdaolunzhan2,(yield* V.call("Condition","Trig_YXdaolunzhan2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXdaolunzhan2,"Trig_YXdaolunzhan2_Actions"));
};
F.Trig_YXdaolunzhan3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989323) && ((yield* V.call("GetSpellAbilityId")) === 1093678676));
};
F.Trig_YXdaolunzhan3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678673,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678673,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetSpellAbilityUnit")),852526));
};
F.InitTrig_YXdaolunzhan3=function* () {
G.gg_trg_YXdaolunzhan3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXdaolunzhan3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXdaolunzhan3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXdaolunzhan3,(yield* V.call("Condition","Trig_YXdaolunzhan3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXdaolunzhan3,"Trig_YXdaolunzhan3_Actions"));
};
F.Trig_YXshandianhudun1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989553) && ((yield* V.call("GetSpellAbilityId")) === 1093678905));
};
F.Trig_YXshandianhudun1_Func007002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_YXshandianhudun1_Func007002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_YXshandianhudun1_Func007002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YXshandianhudun1_Func007002003001001")),(yield* V.call("Trig_YXshandianhudun1_Func007002003001002"))));
};
F.Trig_YXshandianhudun1_Func007002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_YXshandianhudun1_Func007002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YXshandianhudun1_Func007002003001")),(yield* V.call("Trig_YXshandianhudun1_Func007002003002"))));
};
F.Trig_YXshandianhudun1_Func008A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656900,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852110,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_YXshandianhudun1_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
G.udg_YMu = (yield* V.call("GetSpellAbilityUnit"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",600.0,G.udg_Pointb,(yield* V.call("Condition","Trig_YXshandianhudun1_Func007002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_YXshandianhudun1_Func008A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_YXshandianhudun1=function* () {
G.gg_trg_YXshandianhudun1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXshandianhudun1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXshandianhudun1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXshandianhudun1,(yield* V.call("Condition","Trig_YXshandianhudun1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXshandianhudun1,"Trig_YXshandianhudun1_Actions"));
};
F.Trig_YXshandianhudun2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989300) && ((yield* V.call("GetSpellAbilityId")) === 1093678904));
};
F.Trig_YXshandianhudun2_Func007002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_YXshandianhudun2_Func007002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_YXshandianhudun2_Func007002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YXshandianhudun2_Func007002003001001")),(yield* V.call("Trig_YXshandianhudun2_Func007002003001002"))));
};
F.Trig_YXshandianhudun2_Func007002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_YXshandianhudun2_Func007002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YXshandianhudun2_Func007002003001")),(yield* V.call("Trig_YXshandianhudun2_Func007002003002"))));
};
F.Trig_YXshandianhudun2_Func008A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656901,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852110,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_YXshandianhudun2_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
G.udg_YMu = (yield* V.call("GetSpellAbilityUnit"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",650.0,G.udg_Pointb,(yield* V.call("Condition","Trig_YXshandianhudun2_Func007002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_YXshandianhudun2_Func008A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_YXshandianhudun2=function* () {
G.gg_trg_YXshandianhudun2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXshandianhudun2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXshandianhudun2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXshandianhudun2,(yield* V.call("Condition","Trig_YXshandianhudun2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXshandianhudun2,"Trig_YXshandianhudun2_Actions"));
};
F.Trig_YXshandianhudun3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989554) && ((yield* V.call("GetSpellAbilityId")) === 1093678903));
};
F.Trig_YXshandianhudun3_Func007002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_YXshandianhudun3_Func007002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_YXshandianhudun3_Func007002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YXshandianhudun3_Func007002003001001")),(yield* V.call("Trig_YXshandianhudun3_Func007002003001002"))));
};
F.Trig_YXshandianhudun3_Func007002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_YXshandianhudun3_Func007002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YXshandianhudun3_Func007002003001")),(yield* V.call("Trig_YXshandianhudun3_Func007002003002"))));
};
F.Trig_YXshandianhudun3_Func008A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656902,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852110,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_YXshandianhudun3_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
G.udg_YMu = (yield* V.call("GetSpellAbilityUnit"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",700.0,G.udg_Pointb,(yield* V.call("Condition","Trig_YXshandianhudun3_Func007002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_YXshandianhudun3_Func008A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_YXshandianhudun3=function* () {
G.gg_trg_YXshandianhudun3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXshandianhudun3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXshandianhudun3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXshandianhudun3,(yield* V.call("Condition","Trig_YXshandianhudun3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXshandianhudun3,"Trig_YXshandianhudun3_Actions"));
};
F.Trig_YXshandianhudun4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747990070) && ((yield* V.call("GetSpellAbilityId")) === 1093681975));
};
F.Trig_YXshandianhudun4_Func007002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_YXshandianhudun4_Func007002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_YXshandianhudun4_Func007002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YXshandianhudun4_Func007002003001001")),(yield* V.call("Trig_YXshandianhudun4_Func007002003001002"))));
};
F.Trig_YXshandianhudun4_Func007002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_YMu))));
};
F.Trig_YXshandianhudun4_Func007002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_YXshandianhudun4_Func007002003001")),(yield* V.call("Trig_YXshandianhudun4_Func007002003002"))));
};
F.Trig_YXshandianhudun4_Func008A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656913,(yield* V.call("GetOwningPlayer",G.udg_YMu)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852110,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
};
F.Trig_YXshandianhudun4_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
G.udg_YMu = (yield* V.call("GetSpellAbilityUnit"));
G.udg_YMuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",700.0,G.udg_Pointb,(yield* V.call("Condition","Trig_YXshandianhudun4_Func007002003"))));
(yield* V.call("ForGroupBJ",G.udg_YMuuuu,"Trig_YXshandianhudun4_Func008A"));
(yield* V.call("GroupClear",G.udg_YMuuuu));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
};
F.InitTrig_YXshandianhudun4=function* () {
G.gg_trg_YXshandianhudun4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXshandianhudun4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXshandianhudun4,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXshandianhudun4,(yield* V.call("Condition","Trig_YXshandianhudun4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXshandianhudun4,"Trig_YXshandianhudun4_Actions"));
};
F.Trig_YXBingfengqiu_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989555) && ((yield* V.call("GetSpellAbilityId")) === 1093677365));
};
F.Trig_YXBingfengqiu_Func005C=function* () {
return (((yield* V.call("GetUnitUserData",(yield* V.call("GetSpellAbilityUnit")))) >= 5000) && ((yield* V.call("GetRandomInt",1,4)) === 1));
};
F.Trig_YXBingfengqiu_Func006002003=function* () {
return (yield* V.call("IsUnitAlly",(yield* V.call("GetFilterUnit")),(yield* V.call("Player",8))));
};
F.Trig_YXBingfengqiu_Func008Func001Func005C=function* () {
return (G.udg_weili === 4);
};
F.Trig_YXBingfengqiu_Func008Func001C=function* () {
return (G.udg_i < 12);
};
F.Trig_YXBingfengqiu_Func008A=function* () {
if ((yield* V.call("Trig_YXBingfengqiu_Func008Func001C"))) {
G.udg_i = (G.udg_i + 1);
(yield* V.call("CreateNUnitsAtLoc",1,1697656900,(yield* V.call("GetOwningPlayer",G.udg_SFHero)),G.udg_TempPoi,G.bj_UNIT_FACING));
(yield* V.call("UnitAddAbility",(yield* V.call("GetEnumUnit")),1093678913));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852095,(yield* V.call("GetEnumUnit"))));
if ((yield* V.call("Trig_YXBingfengqiu_Func008Func001Func005C"))) {
(yield* V.call("AddSpecialEffectTargetUnitBJ","origin",(yield* V.call("GetEnumUnit")),"Abilities\\Spells\\Other\\Incinerate\\FireLordDeathExplode.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
}
(yield* V.call("UnitApplyTimedLifeBJ",.5,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("UnitDamageTarget",G.udg_SFHero,(yield* V.call("GetEnumUnit")),(((yield* V.call("I2R",G.udg_weili)) / 1.0) * ((yield* V.call("I2R",G.udg_Kills[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",G.udg_SFHero))))])) * (yield* V.call("I2R",G.udg_waves)))),false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_LIGHTNING,G.WEAPON_TYPE_WHOKNOWS));
(yield* V.call("UnitDamageTarget",G.udg_SFHero,(yield* V.call("GetEnumUnit")),30000.0,true,true,G.ATTACK_TYPE_PIERCE,G.DAMAGE_TYPE_NORMAL,G.WEAPON_TYPE_WHOKNOWS));
}
};
F.Trig_YXBingfengqiu_Actions=function* () {
G.udg_SFHero = (yield* V.call("GetSpellAbilityUnit"));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_PointE = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
if ((yield* V.call("Trig_YXBingfengqiu_Func005C"))) {
G.udg_weili = 4;
} else {
G.udg_weili = 1;
}
G.udg_TempGro = (yield* V.call("GetUnitsInRangeOfLocMatching",900.0,G.udg_PointE,(yield* V.call("Condition","Trig_YXBingfengqiu_Func006002003"))));
G.udg_i = 0;
(yield* V.call("ForGroupBJ",G.udg_TempGro,"Trig_YXBingfengqiu_Func008A"));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("GroupClear",G.udg_TempGro));
};
F.InitTrig_YXBingfengqiu=function* () {
G.gg_trg_YXBingfengqiu = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YXBingfengqiu));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_YXBingfengqiu,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_YXBingfengqiu,(yield* V.call("Condition","Trig_YXBingfengqiu_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_YXBingfengqiu,"Trig_YXBingfengqiu_Actions"));
};
F.Trig_DZshentouA_Conditions=function* () {
return ((yield* V.call("GetUnitTypeId",G.udg_nongming[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetTriggerPlayer"))))])) === 1747988528);
};
F.Trig_DZshentouA_Actions=function* () {
G.udg_shentou = true;
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetTriggerPlayer")),0,0,"关闭神偷技能~"));
};
F.InitTrig_DZshentouA=function* () {
G.gg_trg_DZshentouA = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouA,(yield* V.call("Player",0)),"-close",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouA,(yield* V.call("Player",1)),"-close",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouA,(yield* V.call("Player",2)),"-close",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouA,(yield* V.call("Player",3)),"-close",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouA,(yield* V.call("Player",4)),"-close",true));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshentouA,(yield* V.call("Condition","Trig_DZshentouA_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshentouA,"Trig_DZshentouA_Actions"));
};
F.Trig_DZshentouB_Conditions=function* () {
return ((yield* V.call("GetUnitTypeId",G.udg_nongming[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetTriggerPlayer"))))])) === 1747988528);
};
F.Trig_DZshentouB_Actions=function* () {
G.udg_shentou = false;
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetTriggerPlayer")),0,0,"开启神偷技能~"));
};
F.InitTrig_DZshentouB=function* () {
G.gg_trg_DZshentouB = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouB,(yield* V.call("Player",0)),"-open",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouB,(yield* V.call("Player",1)),"-open",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouB,(yield* V.call("Player",2)),"-open",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouB,(yield* V.call("Player",3)),"-open",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_DZshentouB,(yield* V.call("Player",4)),"-open",true));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshentouB,(yield* V.call("Condition","Trig_DZshentouB_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshentouB,"Trig_DZshentouB_Actions"));
};
F.Trig_DZzhiyutxt_Actions=function* () {
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,"如何才能让|c0000ff00治愈|r(|c00ff0000牺牲|r)发挥最佳的效果呢？"));
};
F.InitTrig_DZzhiyutxt=function* () {
G.gg_trg_DZzhiyutxt = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZzhiyutxt));
(yield* V.call("TriggerAddAction",G.gg_trg_DZzhiyutxt,"Trig_DZzhiyutxt_Actions"));
};
F.Trig_DZrengqian_Conditions=function* () {
return (!(G.udg_playerzz[(yield* V.call("GetPlayerId",(yield* V.call("GetTriggerPlayer"))))] !== 3));
};
F.Trig_DZrengqian_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",(-1),(yield* V.call("GetTriggerPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZrengqian=function* () {
G.gg_trg_DZrengqian = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerEventEndCinematic",G.gg_trg_DZrengqian,(yield* V.call("Player",0))));
(yield* V.call("TriggerRegisterPlayerEventEndCinematic",G.gg_trg_DZrengqian,(yield* V.call("Player",1))));
(yield* V.call("TriggerRegisterPlayerEventEndCinematic",G.gg_trg_DZrengqian,(yield* V.call("Player",2))));
(yield* V.call("TriggerRegisterPlayerEventEndCinematic",G.gg_trg_DZrengqian,(yield* V.call("Player",3))));
(yield* V.call("TriggerRegisterPlayerEventEndCinematic",G.gg_trg_DZrengqian,(yield* V.call("Player",4))));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZrengqian,(yield* V.call("Condition","Trig_DZrengqian_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZrengqian,"Trig_DZrengqian_Actions"));
};
F.Trig_DZsuoding_Conditions=function* () {
return (((yield* V.call("GetSpellAbilityId")) === 1093679416) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747988528));
};
F.Trig_DZsuoding_Func001C=function* () {
return (G.udg_baijia[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit"))))))] === false);
};
F.Trig_DZsuoding_Actions=function* () {
if ((yield* V.call("Trig_DZsuoding_Func001C"))) {
G.udg_baijia[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit"))))))] = true;
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),0,0,"|c0000ff00开启败家技能~每秒扔掉1点金币~请注意及时|c00ff0000关闭|c0000ff00！"));
} else {
G.udg_baijia[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit"))))))] = false;
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),0,0,"|c0000ff00关闭败家技能！"));
}
};
F.InitTrig_DZsuoding=function* () {
G.gg_trg_DZsuoding = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZsuoding));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZsuoding,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZsuoding,(yield* V.call("Condition","Trig_DZsuoding_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZsuoding,"Trig_DZsuoding_Actions"));
};
F.Trig_DZbaijia1_Func001Func001C=function* () {
return G.udg_baijia[G.udg_E];
};
F.Trig_DZbaijia1_Actions=function* () {
G.udg_E = 1;
while (V.guard()) {
if ((G.udg_E > 4)) break;
if ((yield* V.call("Trig_DZbaijia1_Func001Func001C"))) {
(yield* V.call("AdjustPlayerStateBJ",(-1),(yield* V.call("ConvertedPlayer",G.udg_E)),G.PLAYER_STATE_RESOURCE_GOLD));
}
G.udg_E = (G.udg_E + 1);
}
};
F.InitTrig_DZbaijia1=function* () {
G.gg_trg_DZbaijia1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterTimerEventPeriodic",G.gg_trg_DZbaijia1,.5));
(yield* V.call("TriggerAddAction",G.gg_trg_DZbaijia1,"Trig_DZbaijia1_Actions"));
};
F.Trig_DZzhiyu_Conditions=function* () {
return (((yield* V.call("GetSpellAbilityId")) === 1093679185) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989558));
};
F.Trig_DZzhiyu_Actions=function* () {
G.udg_zhiyu = (1 + (yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD)),7)));
G.udg_lives = (G.udg_lives + G.udg_zhiyu);
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "的一名|c0000ff00扒手(Lv3)|r牺牲自己，使人类提高了|c00ff0000") + ((yield* V.call("I2S",G.udg_zhiyu)) + "|r点生命^_^"))));
(yield* V.call("KillUnit",(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,("还剩下" + ((yield* V.call("I2S",G.udg_lives)) + "|r点生命~"))));
(yield* V.call("LeaderboardSetPlayerItemValueBJ",(yield* V.call("Player",10)),(yield* V.call("GetLastCreatedLeaderboard")),G.udg_lives));
};
F.InitTrig_DZzhiyu=function* () {
G.gg_trg_DZzhiyu = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZzhiyu));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZzhiyu,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZzhiyu,(yield* V.call("Condition","Trig_DZzhiyu_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZzhiyu,"Trig_DZzhiyu_Actions"));
};
F.Trig_DZshentou1_Conditions=function* () {
return (((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989558) && (!((yield* V.call("GetUnitAbilityLevel",(yield* V.call("GetAttacker")),1093679185)) === 0))) && ((yield* V.call("GetRandomInt",1,2)) === 1)) && (G.udg_shentou === false));
};
F.Trig_DZshentou1_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",1,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZshentou1=function* () {
G.gg_trg_DZshentou1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZshentou1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZshentou1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshentou1,(yield* V.call("Condition","Trig_DZshentou1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshentou1,"Trig_DZshentou1_Actions"));
};
F.Trig_DZshentou2_Conditions=function* () {
return (((((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < 0) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989569)) && ((yield* V.call("GetRandomInt",1,2)) === 1)) && (G.udg_shentou === false));
};
F.Trig_DZshentou2_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",2,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZshentou2=function* () {
G.gg_trg_DZshentou2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZshentou2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZshentou2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshentou2,(yield* V.call("Condition","Trig_DZshentou2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshentou2,"Trig_DZshentou2_Actions"));
};
F.Trig_DZshentou3_Conditions=function* () {
return (((((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < 0) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989570)) && ((yield* V.call("GetRandomInt",1,2)) === 1)) && (G.udg_shentou === false));
};
F.Trig_DZshentou3_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",3,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZshentou3=function* () {
G.gg_trg_DZshentou3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZshentou3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZshentou3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshentou3,(yield* V.call("Condition","Trig_DZshentou3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshentou3,"Trig_DZshentou3_Actions"));
};
F.Trig_DZtouqian_Conditions=function* () {
return (!(G.udg_playerzz[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] !== 3));
};
F.Trig_DZtouqian_Func002C=function* () {
return (!((yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] + "_") + G.udg_stz[2]),"0")) === 0));
};
F.Trig_DZtouqian_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",V.idiv((G.udg_waves + 2),3),(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.PLAYER_STATE_RESOURCE_GOLD));
if ((yield* V.call("Trig_DZtouqian_Func002C"))) {
(yield* V.call("AdjustPlayerStateBJ",V.idiv((G.udg_waves + 2),6),(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.PLAYER_STATE_RESOURCE_GOLD));
}
};
F.InitTrig_DZtouqian=function* () {
G.gg_trg_DZtouqian = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_DZtouqian,(yield* V.call("Player",8)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_DZtouqian,(yield* V.call("Player",9)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_DZtouqian,(yield* V.call("Player",10)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_DZtouqian,(yield* V.call("Player",11)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZtouqian,(yield* V.call("Condition","Trig_DZtouqian_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZtouqian,"Trig_DZtouqian_Actions"));
};
F.Trig_DZshandianfengbao1_Func009C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZshandianfengbao1_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989573) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),7)) === 0)) && (yield* V.call("Trig_DZshandianfengbao1_Func009C")));
};
F.Trig_DZshandianfengbao1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678919,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093678919,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852591,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("AdjustPlayerStateBJ",(-1),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZshandianfengbao1=function* () {
G.gg_trg_DZshandianfengbao1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZshandianfengbao1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZshandianfengbao1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshandianfengbao1,(yield* V.call("Condition","Trig_DZshandianfengbao1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshandianfengbao1,"Trig_DZshandianfengbao1_Actions"));
};
F.Trig_DZshandianfengbao2_Func009C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZshandianfengbao2_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989574) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),7)) === 0)) && (yield* V.call("Trig_DZshandianfengbao2_Func009C")));
};
F.Trig_DZshandianfengbao2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093677364,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677364,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852591,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("AdjustPlayerStateBJ",(-1),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZshandianfengbao2=function* () {
G.gg_trg_DZshandianfengbao2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZshandianfengbao2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZshandianfengbao2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshandianfengbao2,(yield* V.call("Condition","Trig_DZshandianfengbao2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshandianfengbao2,"Trig_DZshandianfengbao2_Actions"));
};
F.Trig_DZshandianfengbao3_Func009C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZshandianfengbao3_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989575) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),7)) === 0)) && (yield* V.call("Trig_DZshandianfengbao3_Func009C")));
};
F.Trig_DZshandianfengbao3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678920,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093678920,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852591,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("AdjustPlayerStateBJ",(-1),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZshandianfengbao3=function* () {
G.gg_trg_DZshandianfengbao3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZshandianfengbao3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZshandianfengbao3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshandianfengbao3,(yield* V.call("Condition","Trig_DZshandianfengbao3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshandianfengbao3,"Trig_DZshandianfengbao3_Actions"));
};
F.Trig_DZlinghunsuolian1_Func007C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZlinghunsuolian1_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989587) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),6)) === 0)) && (yield* V.call("Trig_DZlinghunsuolian1_Func007C")));
};
F.Trig_DZlinghunsuolian1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093679174,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093679174,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("AdjustPlayerStateBJ",(-4),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZlinghunsuolian1=function* () {
G.gg_trg_DZlinghunsuolian1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZlinghunsuolian1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZlinghunsuolian1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZlinghunsuolian1,(yield* V.call("Condition","Trig_DZlinghunsuolian1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZlinghunsuolian1,"Trig_DZlinghunsuolian1_Actions"));
};
F.Trig_DZlinghunsuolian2_Func007C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZlinghunsuolian2_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989582) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),6)) === 0)) && (yield* V.call("Trig_DZlinghunsuolian2_Func007C")));
};
F.Trig_DZlinghunsuolian2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093679173,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093679173,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("AdjustPlayerStateBJ",(-4),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZlinghunsuolian2=function* () {
G.gg_trg_DZlinghunsuolian2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZlinghunsuolian2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZlinghunsuolian2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZlinghunsuolian2,(yield* V.call("Condition","Trig_DZlinghunsuolian2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZlinghunsuolian2,"Trig_DZlinghunsuolian2_Actions"));
};
F.Trig_DZlinghunsuolian3_Func007C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZlinghunsuolian3_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989588) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),6)) === 0)) && (yield* V.call("Trig_DZlinghunsuolian3_Func007C")));
};
F.Trig_DZlinghunsuolian3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093679175,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093679175,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("AdjustPlayerStateBJ",(-4),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZlinghunsuolian3=function* () {
G.gg_trg_DZlinghunsuolian3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZlinghunsuolian3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZlinghunsuolian3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZlinghunsuolian3,(yield* V.call("Condition","Trig_DZlinghunsuolian3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZlinghunsuolian3,"Trig_DZlinghunsuolian3_Actions"));
};
F.Trig_DZlinghunsuolian4_Func007C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZlinghunsuolian4_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989847) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),7)) === 0)) && (yield* V.call("Trig_DZlinghunsuolian4_Func007C")));
};
F.Trig_DZlinghunsuolian4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681741,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093681741,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("AdjustPlayerStateBJ",(-4),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZlinghunsuolian4=function* () {
G.gg_trg_DZlinghunsuolian4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZlinghunsuolian4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZlinghunsuolian4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZlinghunsuolian4,(yield* V.call("Condition","Trig_DZlinghunsuolian4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZlinghunsuolian4,"Trig_DZlinghunsuolian4_Actions"));
};
F.Trig_DZmorishenpan1_Func007C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZmorishenpan1_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989592) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),8)) === 0)) && (yield* V.call("Trig_DZmorishenpan1_Func007C")));
};
F.Trig_DZmorishenpan1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093679161,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093679161,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852583,(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("AdjustPlayerStateBJ",(-6),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZmorishenpan1=function* () {
G.gg_trg_DZmorishenpan1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZmorishenpan1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZmorishenpan1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZmorishenpan1,(yield* V.call("Condition","Trig_DZmorishenpan1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZmorishenpan1,"Trig_DZmorishenpan1_Actions"));
};
F.Trig_DZmorishenpan2_Func007C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZmorishenpan2_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989593) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),8)) === 0)) && (yield* V.call("Trig_DZmorishenpan2_Func007C")));
};
F.Trig_DZmorishenpan2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093679169,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093679169,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852583,(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("AdjustPlayerStateBJ",(-6),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZmorishenpan2=function* () {
G.gg_trg_DZmorishenpan2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZmorishenpan2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZmorishenpan2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZmorishenpan2,(yield* V.call("Condition","Trig_DZmorishenpan2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZmorishenpan2,"Trig_DZmorishenpan2_Actions"));
};
F.Trig_DZmorishenpan3_Func007C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZmorishenpan3_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989571) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),8)) === 0)) && (yield* V.call("Trig_DZmorishenpan3_Func007C")));
};
F.Trig_DZmorishenpan3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678926,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093678926,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852583,(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("AdjustPlayerStateBJ",(-6),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZmorishenpan3=function* () {
G.gg_trg_DZmorishenpan3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZmorishenpan3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZmorishenpan3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZmorishenpan3,(yield* V.call("Condition","Trig_DZmorishenpan3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZmorishenpan3,"Trig_DZmorishenpan3_Actions"));
};
F.Trig_DZmorishenpan4_Func007C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZmorishenpan4_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747988551) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),8)) === 0)) && (yield* V.call("Trig_DZmorishenpan4_Func007C")));
};
F.Trig_DZmorishenpan4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681745,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093681745,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852583,(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("AdjustPlayerStateBJ",(-6),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZmorishenpan4=function* () {
G.gg_trg_DZmorishenpan4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZmorishenpan4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZmorishenpan4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZmorishenpan4,(yield* V.call("Condition","Trig_DZmorishenpan4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZmorishenpan4,"Trig_DZmorishenpan4_Actions"));
};
F.Trig_DZshachongji1_Func009C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZshachongji1_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989581) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),7)) === 0)) && (yield* V.call("Trig_DZshachongji1_Func009C")));
};
F.Trig_DZshachongji1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678937,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093678937,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852652,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("AdjustPlayerStateBJ",(-2),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZshachongji1=function* () {
G.gg_trg_DZshachongji1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZshachongji1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZshachongji1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshachongji1,(yield* V.call("Condition","Trig_DZshachongji1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshachongji1,"Trig_DZshachongji1_Actions"));
};
F.Trig_DZshachongji2_Func009C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZshachongji2_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989580) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),7)) === 0)) && (yield* V.call("Trig_DZshachongji2_Func009C")));
};
F.Trig_DZshachongji2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678938,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093678938,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852652,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("AdjustPlayerStateBJ",(-2),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZshachongji2=function* () {
G.gg_trg_DZshachongji2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZshachongji2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZshachongji2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshachongji2,(yield* V.call("Condition","Trig_DZshachongji2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshachongji2,"Trig_DZshachongji2_Actions"));
};
F.Trig_DZshachongji3_Func009C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZshachongji3_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989579) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),7)) === 0)) && (yield* V.call("Trig_DZshachongji3_Func009C")));
};
F.Trig_DZshachongji3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678936,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093678936,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852652,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("AdjustPlayerStateBJ",(-2),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZshachongji3=function* () {
G.gg_trg_DZshachongji3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZshachongji3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZshachongji3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZshachongji3,(yield* V.call("Condition","Trig_DZshachongji3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZshachongji3,"Trig_DZshachongji3_Actions"));
};
F.Trig_DZanyingtouxi1_Func012C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZanyingtouxi1_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989589) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),9)) === 0)) && (yield* V.call("Trig_DZanyingtouxi1_Func012C")));
};
F.Trig_DZanyingtouxi1_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_DZanyingtouxi1_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_DZanyingtouxi1_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZanyingtouxi1_Func004002003001001")),(yield* V.call("Trig_DZanyingtouxi1_Func004002003001002"))));
};
F.Trig_DZanyingtouxi1_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_u))));
};
F.Trig_DZanyingtouxi1_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZanyingtouxi1_Func004002003001")),(yield* V.call("Trig_DZanyingtouxi1_Func004002003002"))));
};
F.Trig_DZanyingtouxi1_Func005A=function* () {
(yield* V.call("UnitDamageTarget",G.udg_u,(yield* V.call("GetEnumUnit")),5000.0,false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_SHADOW_STRIKE,G.WEAPON_TYPE_WHOKNOWS));
(yield* V.call("CreateNUnitsAtLoc",1,1697656903,(yield* V.call("GetOwningPlayer",G.udg_u)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852527,(yield* V.call("GetEnumUnit"))));
};
F.Trig_DZanyingtouxi1_Actions=function* () {
G.udg_u = (yield* V.call("GetAttacker"));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",600.0,G.udg_Pointb,(yield* V.call("Condition","Trig_DZanyingtouxi1_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_DZanyingtouxi1_Func005A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
(yield* V.call("GroupClear",G.udg_uuuuu));
(yield* V.call("AdjustPlayerStateBJ",(-5),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZanyingtouxi1=function* () {
G.gg_trg_DZanyingtouxi1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZanyingtouxi1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZanyingtouxi1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZanyingtouxi1,(yield* V.call("Condition","Trig_DZanyingtouxi1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZanyingtouxi1,"Trig_DZanyingtouxi1_Actions"));
};
F.Trig_DZanyingtouxi2_Func011C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZanyingtouxi2_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989590) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),9)) === 0)) && (yield* V.call("Trig_DZanyingtouxi2_Func011C")));
};
F.Trig_DZanyingtouxi2_Func003002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_DZanyingtouxi2_Func003002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_DZanyingtouxi2_Func003002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZanyingtouxi2_Func003002003001001")),(yield* V.call("Trig_DZanyingtouxi2_Func003002003001002"))));
};
F.Trig_DZanyingtouxi2_Func003002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker"))))));
};
F.Trig_DZanyingtouxi2_Func003002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZanyingtouxi2_Func003002003001")),(yield* V.call("Trig_DZanyingtouxi2_Func003002003002"))));
};
F.Trig_DZanyingtouxi2_Func004A=function* () {
(yield* V.call("UnitDamageTarget",G.udg_u,(yield* V.call("GetEnumUnit")),10000.0,false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_SHADOW_STRIKE,G.WEAPON_TYPE_WHOKNOWS));
(yield* V.call("CreateNUnitsAtLoc",1,1697656899,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852527,(yield* V.call("GetEnumUnit"))));
};
F.Trig_DZanyingtouxi2_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",650.0,G.udg_Pointb,(yield* V.call("Condition","Trig_DZanyingtouxi2_Func003002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_DZanyingtouxi2_Func004A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
(yield* V.call("GroupClear",G.udg_uuuuu));
(yield* V.call("AdjustPlayerStateBJ",(-5),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZanyingtouxi2=function* () {
G.gg_trg_DZanyingtouxi2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZanyingtouxi2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZanyingtouxi2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZanyingtouxi2,(yield* V.call("Condition","Trig_DZanyingtouxi2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZanyingtouxi2,"Trig_DZanyingtouxi2_Actions"));
};
F.Trig_DZanyingtouxi3_Func011C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZanyingtouxi3_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989591) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),9)) === 0)) && (yield* V.call("Trig_DZanyingtouxi3_Func011C")));
};
F.Trig_DZanyingtouxi3_Func003002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_DZanyingtouxi3_Func003002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_DZanyingtouxi3_Func003002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZanyingtouxi3_Func003002003001001")),(yield* V.call("Trig_DZanyingtouxi3_Func003002003001002"))));
};
F.Trig_DZanyingtouxi3_Func003002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker"))))));
};
F.Trig_DZanyingtouxi3_Func003002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZanyingtouxi3_Func003002003001")),(yield* V.call("Trig_DZanyingtouxi3_Func003002003002"))));
};
F.Trig_DZanyingtouxi3_Func004A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656904,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852527,(yield* V.call("GetEnumUnit"))));
};
F.Trig_DZanyingtouxi3_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",700.0,G.udg_Pointb,(yield* V.call("Condition","Trig_DZanyingtouxi3_Func003002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_DZanyingtouxi3_Func004A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
(yield* V.call("GroupClear",G.udg_uuuuu));
(yield* V.call("AdjustPlayerStateBJ",(-5),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZanyingtouxi3=function* () {
G.gg_trg_DZanyingtouxi3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZanyingtouxi3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZanyingtouxi3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZanyingtouxi3,(yield* V.call("Condition","Trig_DZanyingtouxi3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZanyingtouxi3,"Trig_DZanyingtouxi3_Actions"));
};
F.Trig_DZanyingtouxi4_Func011C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZanyingtouxi4_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989849) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),9)) === 0)) && (yield* V.call("Trig_DZanyingtouxi4_Func011C")));
};
F.Trig_DZanyingtouxi4_Func003002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_DZanyingtouxi4_Func003002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_DZanyingtouxi4_Func003002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZanyingtouxi4_Func003002003001001")),(yield* V.call("Trig_DZanyingtouxi4_Func003002003001002"))));
};
F.Trig_DZanyingtouxi4_Func003002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker"))))));
};
F.Trig_DZanyingtouxi4_Func003002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZanyingtouxi4_Func003002003001")),(yield* V.call("Trig_DZanyingtouxi4_Func003002003002"))));
};
F.Trig_DZanyingtouxi4_Func004A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656911,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852527,(yield* V.call("GetEnumUnit"))));
};
F.Trig_DZanyingtouxi4_Actions=function* () {
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_Pointb = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",700.0,G.udg_Pointb,(yield* V.call("Condition","Trig_DZanyingtouxi4_Func003002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_DZanyingtouxi4_Func004A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
(yield* V.call("GroupClear",G.udg_uuuuu));
(yield* V.call("AdjustPlayerStateBJ",(-5),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZanyingtouxi4=function* () {
G.gg_trg_DZanyingtouxi4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZanyingtouxi4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZanyingtouxi4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZanyingtouxi4,(yield* V.call("Condition","Trig_DZanyingtouxi4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZanyingtouxi4,"Trig_DZanyingtouxi4_Actions"));
};
F.Trig_DZmanteng1_Func010C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZmanteng1_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989583) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),10)) === 0)) && (yield* V.call("Trig_DZmanteng1_Func010C")));
};
F.Trig_DZmanteng1_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_DZmanteng1_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_DZmanteng1_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZmanteng1_Func004002003001001")),(yield* V.call("Trig_DZmanteng1_Func004002003001002"))));
};
F.Trig_DZmanteng1_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_u))));
};
F.Trig_DZmanteng1_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZmanteng1_Func004002003001")),(yield* V.call("Trig_DZmanteng1_Func004002003002"))));
};
F.Trig_DZmanteng1_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656903,(yield* V.call("GetOwningPlayer",G.udg_u)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852171,(yield* V.call("GetEnumUnit"))));
};
F.Trig_DZmanteng1_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",(-3),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_u = (yield* V.call("GetAttacker"));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",800.0,G.udg_Pointa,(yield* V.call("Condition","Trig_DZmanteng1_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_DZmanteng1_Func005A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("GroupClear",G.udg_uuuuu));
};
F.InitTrig_DZmanteng1=function* () {
G.gg_trg_DZmanteng1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZmanteng1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZmanteng1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZmanteng1,(yield* V.call("Condition","Trig_DZmanteng1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZmanteng1,"Trig_DZmanteng1_Actions"));
};
F.Trig_DZmanteng2_Func010C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZmanteng2_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989584) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),10)) === 0)) && (yield* V.call("Trig_DZmanteng2_Func010C")));
};
F.Trig_DZmanteng2_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_DZmanteng2_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_DZmanteng2_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZmanteng2_Func004002003001001")),(yield* V.call("Trig_DZmanteng2_Func004002003001002"))));
};
F.Trig_DZmanteng2_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_u))));
};
F.Trig_DZmanteng2_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZmanteng2_Func004002003001")),(yield* V.call("Trig_DZmanteng2_Func004002003002"))));
};
F.Trig_DZmanteng2_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656899,(yield* V.call("GetOwningPlayer",G.udg_u)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852171,(yield* V.call("GetEnumUnit"))));
};
F.Trig_DZmanteng2_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",(-3),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
G.udg_u = (yield* V.call("GetAttacker"));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",800.0,G.udg_Pointa,(yield* V.call("Condition","Trig_DZmanteng2_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_DZmanteng2_Func005A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("GroupClear",G.udg_uuuuu));
};
F.InitTrig_DZmanteng2=function* () {
G.gg_trg_DZmanteng2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZmanteng2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZmanteng2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZmanteng2,(yield* V.call("Condition","Trig_DZmanteng2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZmanteng2,"Trig_DZmanteng2_Actions"));
};
F.Trig_DZmanteng3_Func010C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZmanteng3_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989585) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),10)) === 0)) && (yield* V.call("Trig_DZmanteng3_Func010C")));
};
F.Trig_DZmanteng3_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_DZmanteng3_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_DZmanteng3_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZmanteng3_Func004002003001001")),(yield* V.call("Trig_DZmanteng3_Func004002003001002"))));
};
F.Trig_DZmanteng3_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_u))));
};
F.Trig_DZmanteng3_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_DZmanteng3_Func004002003001")),(yield* V.call("Trig_DZmanteng3_Func004002003002"))));
};
F.Trig_DZmanteng3_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656904,(yield* V.call("GetOwningPlayer",G.udg_u)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852171,(yield* V.call("GetEnumUnit"))));
};
F.Trig_DZmanteng3_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",(-3),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_u = (yield* V.call("GetAttacker"));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",800.0,G.udg_Pointa,(yield* V.call("Condition","Trig_DZmanteng3_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_DZmanteng3_Func005A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("GroupClear",G.udg_uuuuu));
};
F.InitTrig_DZmanteng3=function* () {
G.gg_trg_DZmanteng3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZmanteng3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZmanteng3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZmanteng3,(yield* V.call("Condition","Trig_DZmanteng3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZmanteng3,"Trig_DZmanteng3_Actions"));
};
F.Trig_DZbinggongchang1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989578) && ((yield* V.call("GetSpellAbilityId")) === 1093678931));
};
F.Trig_DZbinggongchang1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678924,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678924,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852658,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("AdjustPlayerStateBJ",(-2),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZbinggongchang1=function* () {
G.gg_trg_DZbinggongchang1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZbinggongchang1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZbinggongchang1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZbinggongchang1,(yield* V.call("Condition","Trig_DZbinggongchang1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZbinggongchang1,"Trig_DZbinggongchang1_Actions"));
};
F.Trig_DZbinggongchang2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989577) && ((yield* V.call("GetSpellAbilityId")) === 1093678930));
};
F.Trig_DZbinggongchang2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678928,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678928,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852658,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("AdjustPlayerStateBJ",(-2),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZbinggongchang2=function* () {
G.gg_trg_DZbinggongchang2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZbinggongchang2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZbinggongchang2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZbinggongchang2,(yield* V.call("Condition","Trig_DZbinggongchang2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZbinggongchang2,"Trig_DZbinggongchang2_Actions"));
};
F.Trig_DZbinggongchang3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989576) && ((yield* V.call("GetSpellAbilityId")) === 1093678932));
};
F.Trig_DZbinggongchang3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093678929,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093678929,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852658,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("AdjustPlayerStateBJ",(-2),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.InitTrig_DZbinggongchang3=function* () {
G.gg_trg_DZbinggongchang3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZbinggongchang3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZbinggongchang3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZbinggongchang3,(yield* V.call("Condition","Trig_DZbinggongchang3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZbinggongchang3,"Trig_DZbinggongchang3_Actions"));
};
F.Trig_DZJianrenfengbao_Func003C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)) > 0) || ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_DZJianrenfengbao_Conditions=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989586) && ((yield* V.call("ModuloInteger",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD)),6)) === 0)) && (yield* V.call("Trig_DZJianrenfengbao_Func003C")));
};
F.Trig_DZJianrenfengbao_Func010002003=function* () {
return (yield* V.call("IsUnitAlly",(yield* V.call("GetFilterUnit")),(yield* V.call("Player",8))));
};
F.Trig_DZJianrenfengbao_Func012Func001C=function* () {
return (G.udg_i < 12);
};
F.Trig_DZJianrenfengbao_Func012A=function* () {
if ((yield* V.call("Trig_DZJianrenfengbao_Func012Func001C"))) {
G.udg_i = (G.udg_i + 1);
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetEnumUnit"))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_Pointa,"Abilities\\Spells\\Human\\HolyBolt\\HolyBoltSpecialArt.mdl"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("UnitDamageTarget",G.udg_SFHero,(yield* V.call("GetEnumUnit")),(2.0 * ((yield* V.call("I2R",(yield* V.call("GetUnitUserData",G.udg_SFHero)))) + ((yield* V.call("I2R",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",G.udg_SFHero)),G.PLAYER_STATE_RESOURCE_GOLD)))) * 2.0))),false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_LIGHTNING,G.WEAPON_TYPE_WHOKNOWS));
}
};
F.Trig_DZJianrenfengbao_Actions=function* () {
G.udg_SFHero = (yield* V.call("GetAttacker"));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
(yield* V.call("AdjustPlayerStateBJ",(-10),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("UnitRemoveAbilityBJ",1093677131,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677131,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852128));
G.udg_TempGro = (yield* V.call("GetUnitsInRangeOfLocMatching",900.0,G.udg_TempPoi,(yield* V.call("Condition","Trig_DZJianrenfengbao_Func010002003"))));
G.udg_i = 0;
(yield* V.call("ForGroupBJ",G.udg_TempGro,"Trig_DZJianrenfengbao_Func012A"));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("GroupClear",G.udg_TempGro));
};
F.InitTrig_DZJianrenfengbao=function* () {
G.gg_trg_DZJianrenfengbao = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_DZJianrenfengbao));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_DZJianrenfengbao,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_DZJianrenfengbao,(yield* V.call("Condition","Trig_DZJianrenfengbao_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_DZJianrenfengbao,"Trig_DZJianrenfengbao_Actions"));
};
F.Trig_MJSfennu_Conditions=function* () {
return (((yield* V.call("GetSpellAbilityId")) === 1093682501) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747990084));
};
F.Trig_MJSfennu_Actions=function* () {
G.udg_fennu = true;
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "的一名|c0000ff00步兵(Lv3)|r牺牲自己，使所有魔剑士部队进入|c00ff0000愤怒|r状态！持续25秒~") + "")));
(yield* V.call("KillUnit",(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("TriggerSleepAction",25.0));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,"|c00ff0000愤怒|r状态消失~"));
G.udg_fennu = false;
};
F.InitTrig_MJSfennu=function* () {
G.gg_trg_MJSfennu = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSfennu));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSfennu,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSfennu,(yield* V.call("Condition","Trig_MJSfennu_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSfennu,"Trig_MJSfennu_Actions"));
};
F.Trig_MJSmoliquanshui1_Conditions=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093682499);
};
F.Trig_MJSmoliquanshui1_Actions=function* () {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetSpellTargetUnit")),((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetSpellTargetUnit")))) + 2.0)));
};
F.InitTrig_MJSmoliquanshui1=function* () {
G.gg_trg_MJSmoliquanshui1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSmoliquanshui1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSmoliquanshui1,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSmoliquanshui1,(yield* V.call("Condition","Trig_MJSmoliquanshui1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSmoliquanshui1,"Trig_MJSmoliquanshui1_Actions"));
};
F.Trig_MJSmoliquanshui2_Conditions=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093682500);
};
F.Trig_MJSmoliquanshui2_Actions=function* () {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetSpellTargetUnit")),((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetSpellTargetUnit")))) + 3.0)));
};
F.InitTrig_MJSmoliquanshui2=function* () {
G.gg_trg_MJSmoliquanshui2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSmoliquanshui2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSmoliquanshui2,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSmoliquanshui2,(yield* V.call("Condition","Trig_MJSmoliquanshui2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSmoliquanshui2,"Trig_MJSmoliquanshui2_Actions"));
};
F.Trig_MJSmoliquanshui3_Conditions=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093682498);
};
F.Trig_MJSmoliquanshui3_Actions=function* () {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetSpellTargetUnit")),((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetSpellTargetUnit")))) + 4.0)));
};
F.InitTrig_MJSmoliquanshui3=function* () {
G.gg_trg_MJSmoliquanshui3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSmoliquanshui3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSmoliquanshui3,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSmoliquanshui3,(yield* V.call("Condition","Trig_MJSmoliquanshui3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSmoliquanshui3,"Trig_MJSmoliquanshui3_Actions"));
};
F.Trig_MJSwanjianguizong_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747990327) && ((yield* V.call("GetSpellAbilityId")) === 1093682488));
};
F.Trig_MJSwanjianguizong_Func006002003=function* () {
return (yield* V.call("IsUnitAlly",(yield* V.call("GetFilterUnit")),(yield* V.call("Player",8))));
};
F.Trig_MJSwanjianguizong_Func009Func001C=function* () {
return (G.udg_i < 15);
};
F.Trig_MJSwanjianguizong_Func009A=function* () {
if ((yield* V.call("Trig_MJSwanjianguizong_Func009Func001C"))) {
G.udg_i = (G.udg_i + 1);
(yield* V.call("CreateNUnitsAtLoc",1,1697656918,(yield* V.call("GetOwningPlayer",G.udg_SFHero)),G.udg_TempPoi,G.bj_UNIT_FACING));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852095,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitApplyTimedLifeBJ",2.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("UnitDamageTarget",G.udg_SFHero,(yield* V.call("GetEnumUnit")),(((yield* V.call("I2R",(yield* V.call("GetUnitUserData",G.udg_SFHero)))) + 8000.0) * ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,G.udg_SFHero)) * .8)),false,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_LIGHTNING,G.WEAPON_TYPE_WHOKNOWS));
(yield* V.call("AddSpecialEffectTargetUnitBJ","origin",(yield* V.call("GetEnumUnit")),"Abilities\\Spells\\Other\\Tornado\\TornadoElementalSmall.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
}
};
F.Trig_MJSwanjianguizong_Actions=function* () {
G.udg_SFHero = (yield* V.call("GetSpellAbilityUnit"));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellAbilityUnit"))));
G.udg_PointE = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
G.udg_TempGro = (yield* V.call("GetUnitsInRangeOfLocMatching",1200.0,G.udg_TempPoi,(yield* V.call("Condition","Trig_MJSwanjianguizong_Func006002003"))));
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 18;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
(yield* V.call("CreateNUnitsAtLoc",1,1697656918,(yield* V.call("GetOwningPlayer",G.udg_SFHero)),G.udg_TempPoi,G.bj_UNIT_FACING));
G.udg_Pointd = (yield* V.call("PolarProjectionBJ",G.udg_TempPoi,256,((yield* V.call("I2R",(yield* V.call("GetForLoopIndexA")))) * 20.0)));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetLastCreatedUnit")),852218,G.udg_Pointd));
(yield* V.call("UnitApplyTimedLifeBJ",2.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("RemoveLocation",G.udg_Pointd));
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
G.udg_i = 0;
(yield* V.call("ForGroupBJ",G.udg_TempGro,"Trig_MJSwanjianguizong_Func009A"));
(yield* V.call("SetUnitManaBJ",G.udg_SFHero,0));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("GroupClear",G.udg_TempGro));
};
F.InitTrig_MJSwanjianguizong=function* () {
G.gg_trg_MJSwanjianguizong = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSwanjianguizong));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSwanjianguizong,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSwanjianguizong,(yield* V.call("Condition","Trig_MJSwanjianguizong_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSwanjianguizong,"Trig_MJSwanjianguizong_Actions"));
};
F.Trig_MJSsiwangsuolian1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990103) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 10.0));
};
F.Trig_MJSsiwangsuolian1_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_MJSsiwangsuolian1_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_MJSsiwangsuolian1_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_MJSsiwangsuolian1_Func004002003001001")),(yield* V.call("Trig_MJSsiwangsuolian1_Func004002003001002"))));
};
F.Trig_MJSsiwangsuolian1_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_u))));
};
F.Trig_MJSsiwangsuolian1_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_MJSsiwangsuolian1_Func004002003001")),(yield* V.call("Trig_MJSsiwangsuolian1_Func004002003002"))));
};
F.Trig_MJSsiwangsuolian1_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656918,(yield* V.call("GetOwningPlayer",G.udg_u)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",3.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852480,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitDamageTarget",G.udg_u,(yield* V.call("GetEnumUnit")),4000.0,true,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_LIGHTNING,G.WEAPON_TYPE_WHOKNOWS));
};
F.Trig_MJSsiwangsuolian1_Actions=function* () {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetAttacker")),0));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_u = (yield* V.call("GetAttacker"));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",900.0,G.udg_Pointa,(yield* V.call("Condition","Trig_MJSsiwangsuolian1_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_MJSsiwangsuolian1_Func005A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("GroupClear",G.udg_uuuuu));
};
F.InitTrig_MJSsiwangsuolian1=function* () {
G.gg_trg_MJSsiwangsuolian1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSsiwangsuolian1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSsiwangsuolian1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSsiwangsuolian1,(yield* V.call("Condition","Trig_MJSsiwangsuolian1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSsiwangsuolian1,"Trig_MJSsiwangsuolian1_Actions"));
};
F.Trig_MJSsiwangsuolian2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990102) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 10.0));
};
F.Trig_MJSsiwangsuolian2_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_MJSsiwangsuolian2_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_MJSsiwangsuolian2_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_MJSsiwangsuolian2_Func004002003001001")),(yield* V.call("Trig_MJSsiwangsuolian2_Func004002003001002"))));
};
F.Trig_MJSsiwangsuolian2_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_u))));
};
F.Trig_MJSsiwangsuolian2_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_MJSsiwangsuolian2_Func004002003001")),(yield* V.call("Trig_MJSsiwangsuolian2_Func004002003002"))));
};
F.Trig_MJSsiwangsuolian2_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656916,(yield* V.call("GetOwningPlayer",G.udg_u)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",3.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852480,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitDamageTarget",G.udg_u,(yield* V.call("GetEnumUnit")),8000.0,true,true,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_LIGHTNING,G.WEAPON_TYPE_WHOKNOWS));
};
F.Trig_MJSsiwangsuolian2_Actions=function* () {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetAttacker")),0));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_u = (yield* V.call("GetAttacker"));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",950.0,G.udg_Pointa,(yield* V.call("Condition","Trig_MJSsiwangsuolian2_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_MJSsiwangsuolian2_Func005A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("GroupClear",G.udg_uuuuu));
};
F.InitTrig_MJSsiwangsuolian2=function* () {
G.gg_trg_MJSsiwangsuolian2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSsiwangsuolian2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSsiwangsuolian2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSsiwangsuolian2,(yield* V.call("Condition","Trig_MJSsiwangsuolian2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSsiwangsuolian2,"Trig_MJSsiwangsuolian2_Actions"));
};
F.Trig_MJSsiwangsuolian3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990104) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 10.0));
};
F.Trig_MJSsiwangsuolian3_Func004002003001001=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetFilterUnit")),G.UNIT_TYPE_STRUCTURE)) === false);
};
F.Trig_MJSsiwangsuolian3_Func004002003001002=function* () {
return (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetFilterUnit"))));
};
F.Trig_MJSsiwangsuolian3_Func004002003001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_MJSsiwangsuolian3_Func004002003001001")),(yield* V.call("Trig_MJSsiwangsuolian3_Func004002003001002"))));
};
F.Trig_MJSsiwangsuolian3_Func004002003002=function* () {
return (yield* V.call("IsUnitEnemy",(yield* V.call("GetFilterUnit")),(yield* V.call("GetOwningPlayer",G.udg_u))));
};
F.Trig_MJSsiwangsuolian3_Func004002003=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_MJSsiwangsuolian3_Func004002003001")),(yield* V.call("Trig_MJSsiwangsuolian3_Func004002003002"))));
};
F.Trig_MJSsiwangsuolian3_Func005A=function* () {
(yield* V.call("CreateNUnitsAtLoc",1,1697656917,(yield* V.call("GetOwningPlayer",G.udg_u)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("UnitApplyTimedLifeBJ",3.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetLastCreatedUnit")),852480,(yield* V.call("GetEnumUnit"))));
(yield* V.call("UnitDamageTarget",G.udg_u,(yield* V.call("GetEnumUnit")),12000.0,true,false,G.ATTACK_TYPE_NORMAL,G.DAMAGE_TYPE_LIGHTNING,G.WEAPON_TYPE_WHOKNOWS));
};
F.Trig_MJSsiwangsuolian3_Actions=function* () {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetAttacker")),0));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
G.udg_u = (yield* V.call("GetAttacker"));
G.udg_uuuuu = (yield* V.call("GetUnitsInRangeOfLocMatching",1000.0,G.udg_Pointa,(yield* V.call("Condition","Trig_MJSsiwangsuolian3_Func004002003"))));
(yield* V.call("ForGroupBJ",G.udg_uuuuu,"Trig_MJSsiwangsuolian3_Func005A"));
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("GroupClear",G.udg_uuuuu));
};
F.InitTrig_MJSsiwangsuolian3=function* () {
G.gg_trg_MJSsiwangsuolian3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSsiwangsuolian3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSsiwangsuolian3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSsiwangsuolian3,(yield* V.call("Condition","Trig_MJSsiwangsuolian3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSsiwangsuolian3,"Trig_MJSsiwangsuolian3_Actions"));
};
F.Trig_MJSrenlunwu1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990325) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 15.0));
};
F.Trig_MJSrenlunwu1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682483,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682483,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852128));
};
F.InitTrig_MJSrenlunwu1=function* () {
G.gg_trg_MJSrenlunwu1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSrenlunwu1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSrenlunwu1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSrenlunwu1,(yield* V.call("Condition","Trig_MJSrenlunwu1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSrenlunwu1,"Trig_MJSrenlunwu1_Actions"));
};
F.Trig_MJSrenlunwu2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990324) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 15.0));
};
F.Trig_MJSrenlunwu2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682482,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682482,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852128));
};
F.InitTrig_MJSrenlunwu2=function* () {
G.gg_trg_MJSrenlunwu2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSrenlunwu2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSrenlunwu2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSrenlunwu2,(yield* V.call("Condition","Trig_MJSrenlunwu2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSrenlunwu2,"Trig_MJSrenlunwu2_Actions"));
};
F.Trig_MJSrenlunwu3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990326) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 15.0));
};
F.Trig_MJSrenlunwu3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682484,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682484,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852128));
};
F.InitTrig_MJSrenlunwu3=function* () {
G.gg_trg_MJSrenlunwu3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSrenlunwu3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSrenlunwu3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSrenlunwu3,(yield* V.call("Condition","Trig_MJSrenlunwu3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSrenlunwu3,"Trig_MJSrenlunwu3_Actions"));
};
F.Trig_MJSrenlunwu4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990341) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 15.0));
};
F.Trig_MJSrenlunwu4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682522,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682522,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852128));
};
F.InitTrig_MJSrenlunwu4=function* () {
G.gg_trg_MJSrenlunwu4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSrenlunwu4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSrenlunwu4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSrenlunwu4,(yield* V.call("Condition","Trig_MJSrenlunwu4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSrenlunwu4,"Trig_MJSrenlunwu4_Actions"));
};
F.Trig_MJSguihuoluanwu1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990323) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 20.0));
};
F.Trig_MJSguihuoluanwu1_Func002C=function* () {
return (((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= 250) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < (G.udg_waves + 252)));
};
F.Trig_MJSguihuoluanwu1_Actions=function* () {
(yield* V.call("SetUnitUserData",(yield* V.call("GetAttacker")),((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) + (G.udg_waves + 2))));
if ((yield* V.call("Trig_MJSguihuoluanwu1_Func002C"))) {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetAttacker")),0));
(yield* V.call("SetUnitUserData",(yield* V.call("GetAttacker")),(-1000)));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
(yield* V.call("RemoveUnit",(yield* V.call("GetAttacker"))));
(yield* V.call("CreateNUnitsAtLoc",1,1747990322,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_TempPoi,(yield* V.call("GetUnitFacing",(yield* V.call("GetAttacker"))))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),5.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetAttacker")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "|r！")))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_TempPoi,"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
} else {
(yield* V.call("UnitRemoveAbilityBJ",1093682264,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682264,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852556));
}
};
F.InitTrig_MJSguihuoluanwu1=function* () {
G.gg_trg_MJSguihuoluanwu1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSguihuoluanwu1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSguihuoluanwu1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSguihuoluanwu1,(yield* V.call("Condition","Trig_MJSguihuoluanwu1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSguihuoluanwu1,"Trig_MJSguihuoluanwu1_Actions"));
};
F.Trig_MJSguihuoluanwu2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990322) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 20.0));
};
F.Trig_MJSguihuoluanwu2_Func002C=function* () {
return (((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= 400) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < (G.udg_waves + 402)));
};
F.Trig_MJSguihuoluanwu2_Actions=function* () {
(yield* V.call("SetUnitUserData",(yield* V.call("GetAttacker")),((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) + (G.udg_waves + 2))));
if ((yield* V.call("Trig_MJSguihuoluanwu2_Func002C"))) {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetAttacker")),0));
(yield* V.call("SetUnitUserData",(yield* V.call("GetAttacker")),(-1000)));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttacker"))));
(yield* V.call("RemoveUnit",(yield* V.call("GetAttacker"))));
(yield* V.call("CreateNUnitsAtLoc",1,1747990321,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_TempPoi,(yield* V.call("GetUnitFacing",(yield* V.call("GetAttacker"))))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),5.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetAttacker")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "|r！")))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_TempPoi,"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
} else {
(yield* V.call("UnitRemoveAbilityBJ",1093682002,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682002,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852556));
}
};
F.InitTrig_MJSguihuoluanwu2=function* () {
G.gg_trg_MJSguihuoluanwu2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSguihuoluanwu2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSguihuoluanwu2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSguihuoluanwu2,(yield* V.call("Condition","Trig_MJSguihuoluanwu2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSguihuoluanwu2,"Trig_MJSguihuoluanwu2_Actions"));
};
F.Trig_MJSguihuoluanwu3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990321) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 20.0));
};
F.Trig_MJSguihuoluanwu3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682265,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682265,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852556));
};
F.InitTrig_MJSguihuoluanwu3=function* () {
G.gg_trg_MJSguihuoluanwu3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSguihuoluanwu3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSguihuoluanwu3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSguihuoluanwu3,(yield* V.call("Condition","Trig_MJSguihuoluanwu3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSguihuoluanwu3,"Trig_MJSguihuoluanwu3_Actions"));
};
F.Trig_MJSguihuoluanwu4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990343) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 20.0));
};
F.Trig_MJSguihuoluanwu4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682739,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682739,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852556));
};
F.InitTrig_MJSguihuoluanwu4=function* () {
G.gg_trg_MJSguihuoluanwu4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSguihuoluanwu4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSguihuoluanwu4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSguihuoluanwu4,(yield* V.call("Condition","Trig_MJSguihuoluanwu4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSguihuoluanwu4,"Trig_MJSguihuoluanwu4_Actions"));
};
F.Trig_MJSwanjianjue1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990106) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 8.0));
};
F.Trig_MJSwanjianjue1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682259,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682259,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852593,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSwanjianjue1=function* () {
G.gg_trg_MJSwanjianjue1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSwanjianjue1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSwanjianjue1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSwanjianjue1,(yield* V.call("Condition","Trig_MJSwanjianjue1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSwanjianjue1,"Trig_MJSwanjianjue1_Actions"));
};
F.Trig_MJSwanjianjue2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990105) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 8.0));
};
F.Trig_MJSwanjianjue2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682260,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682260,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852593,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSwanjianjue2=function* () {
G.gg_trg_MJSwanjianjue2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSwanjianjue2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSwanjianjue2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSwanjianjue2,(yield* V.call("Condition","Trig_MJSwanjianjue2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSwanjianjue2,"Trig_MJSwanjianjue2_Actions"));
};
F.Trig_MJSwanjianjue3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990320) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 8.0));
};
F.Trig_MJSwanjianjue3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682258,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682258,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852593,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSwanjianjue3=function* () {
G.gg_trg_MJSwanjianjue3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSwanjianjue3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSwanjianjue3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSwanjianjue3,(yield* V.call("Condition","Trig_MJSwanjianjue3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSwanjianjue3,"Trig_MJSwanjianjue3_Actions"));
};
F.Trig_MJSwanjianjue4_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990342) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 8.0));
};
F.Trig_MJSwanjianjue4_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682737,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682737,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852593,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSwanjianjue4=function* () {
G.gg_trg_MJSwanjianjue4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSwanjianjue4));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSwanjianjue4,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSwanjianjue4,(yield* V.call("Condition","Trig_MJSwanjianjue4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSwanjianjue4,"Trig_MJSwanjianjue4_Actions"));
};
F.Trig_MJSlongpao1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990100) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 10.0));
};
F.Trig_MJSlongpao1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682248,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682248,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852652,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSlongpao1=function* () {
G.gg_trg_MJSlongpao1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSlongpao1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSlongpao1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSlongpao1,(yield* V.call("Condition","Trig_MJSlongpao1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSlongpao1,"Trig_MJSlongpao1_Actions"));
};
F.Trig_MJSlongpao2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990101) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 10.0));
};
F.Trig_MJSlongpao2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682006,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682006,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852652,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSlongpao2=function* () {
G.gg_trg_MJSlongpao2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSlongpao2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSlongpao2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSlongpao2,(yield* V.call("Condition","Trig_MJSlongpao2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSlongpao2,"Trig_MJSlongpao2_Actions"));
};
F.Trig_MJSlongpao3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990099) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 10.0));
};
F.Trig_MJSlongpao3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682249,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682249,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852652,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSlongpao3=function* () {
G.gg_trg_MJSlongpao3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSlongpao3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSlongpao3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSlongpao3,(yield* V.call("Condition","Trig_MJSlongpao3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSlongpao3,"Trig_MJSlongpao3_Actions"));
};
F.Trig_MJSnihong1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990094) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 7.0));
};
F.Trig_MJSnihong1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682010,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682010,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetTriggerUnit"))));
};
F.InitTrig_MJSnihong1=function* () {
G.gg_trg_MJSnihong1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSnihong1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSnihong1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSnihong1,(yield* V.call("Condition","Trig_MJSnihong1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSnihong1,"Trig_MJSnihong1_Actions"));
};
F.Trig_MJSnihong2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990093) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 7.0));
};
F.Trig_MJSnihong2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682242,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682242,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetTriggerUnit"))));
};
F.InitTrig_MJSnihong2=function* () {
G.gg_trg_MJSnihong2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSnihong2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSnihong2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSnihong2,(yield* V.call("Condition","Trig_MJSnihong2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSnihong2,"Trig_MJSnihong2_Actions"));
};
F.Trig_MJSnihong3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990095) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 7.0));
};
F.Trig_MJSnihong3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093682243,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682243,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852119,(yield* V.call("GetTriggerUnit"))));
};
F.InitTrig_MJSnihong3=function* () {
G.gg_trg_MJSnihong3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSnihong3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSnihong3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSnihong3,(yield* V.call("Condition","Trig_MJSnihong3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSnihong3,"Trig_MJSnihong3_Actions"));
};
F.Trig_Hit_Conditions=function* () {
return ((yield* V.call("GetUnitPointValue",(yield* V.call("GetAttacker")))) === 6);
};
F.Trig_Hit_Func003C=function* () {
return G.udg_fennu;
};
F.Trig_Hit_Func004C=function* () {
return ((((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990327) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= 5000)) && ((yield* V.call("GetRandomInt",1,2)) === 1));
};
F.Trig_Hit_Actions=function* () {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetAttacker")),((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) + 1)));
if ((yield* V.call("Trig_Hit_Func003C"))) {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetAttacker")),((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) + 1)));
}
if ((yield* V.call("Trig_Hit_Func004C"))) {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetAttacker")),((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) + 1)));
}
(yield* V.call("CreateTextTagUnitBJ",(("|cffd55bb0" + (yield* V.call("I2S",(yield* V.call("R2I",(yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker"))))))))) + "|r Hit！"),(yield* V.call("GetAttacker")),0,10,100,100,100,0));
(yield* V.call("SetTextTagVelocityBJ",(yield* V.call("GetLastCreatedTextTag")),32.0,90));
(yield* V.call("SetTextTagFadepoint",(yield* V.call("GetLastCreatedTextTag")),.5));
(yield* V.call("SetTextTagPermanent",(yield* V.call("GetLastCreatedTextTag")),false));
(yield* V.call("SetTextTagLifespan",(yield* V.call("GetLastCreatedTextTag")),1.0));
};
F.InitTrig_Hit=function* () {
G.gg_trg_Hit = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_Hit,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_Hit,(yield* V.call("Condition","Trig_Hit_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_Hit,"Trig_Hit_Actions"));
};
F.Trig_MJSlingguang1_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990096) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 7.0));
};
F.Trig_MJSlingguang1_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681998,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093681998,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852125,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSlingguang1=function* () {
G.gg_trg_MJSlingguang1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSlingguang1));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSlingguang1,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSlingguang1,(yield* V.call("Condition","Trig_MJSlingguang1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSlingguang1,"Trig_MJSlingguang1_Actions"));
};
F.Trig_MJSlingguang2_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990097) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 7.0));
};
F.Trig_MJSlingguang2_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681997,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093681997,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852125,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSlingguang2=function* () {
G.gg_trg_MJSlingguang2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSlingguang2));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSlingguang2,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSlingguang2,(yield* V.call("Condition","Trig_MJSlingguang2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSlingguang2,"Trig_MJSlingguang2_Actions"));
};
F.Trig_MJSlingguang3_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990098) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 7.0));
};
F.Trig_MJSlingguang3_Actions=function* () {
(yield* V.call("UnitRemoveAbilityBJ",1093681999,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093681999,(yield* V.call("GetAttacker"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetAttacker")),852125,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
};
F.InitTrig_MJSlingguang3=function* () {
G.gg_trg_MJSlingguang3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_MJSlingguang3));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_MJSlingguang3,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_MJSlingguang3,(yield* V.call("Condition","Trig_MJSlingguang3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_MJSlingguang3,"Trig_MJSlingguang3_Actions"));
};
F.Trig_chushou_Conditions=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093677384);
};
F.Trig_chushou_TZ=function* () {
let i = 0;
let j = 0;
let pid = 0;
let u = (yield* V.call("GetSpellAbilityUnit"));
let u1 = null;
let u2 = null;
let u3 = null;
pid = (yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",u))));
i = 0;
while (V.guard()) {
if ((i > 5)) break;
j = 1;
while (V.guard()) {
if ((j > 3)) break;
if ((u === (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),(yield* V.call("I2S",j)))))))) {
u1 = (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"1"))));
u2 = (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"2"))));
u3 = (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"3"))));
(yield* V.call("StoreInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"0",0));
(yield* V.call("StoreInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),(yield* V.call("I2S",j)),0));
(yield* V.call("UnitRemoveAbilityBJ",G.udg_ab[i],u1));
(yield* V.call("UnitRemoveAbilityBJ",G.udg_ab[i],u2));
(yield* V.call("UnitRemoveAbilityBJ",G.udg_ab[i],u3));
(yield* V.call("DestroyLightning",(yield* V.call("I2L",(yield* V.call("GetStoredInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"0"))))));
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"0",0));
(yield* V.call("DestroyLightning",(yield* V.call("I2L",(yield* V.call("GetStoredInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"1"))))));
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"1",0));
(yield* V.call("DestroyLightning",(yield* V.call("I2L",(yield* V.call("GetStoredInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"2"))))));
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"2",0));
u = null;
u1 = null;
u2 = null;
u3 = null;
return ;
}
j = (j + 1);
}
i = (i + 1);
}
u = null;
};
F.Trig_chushou_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",V.idiv(((yield* V.call("R2I",(yield* V.call("GetUnitStateSwap",G.UNIT_STATE_LIFE,(yield* V.call("GetSpellAbilityUnit")))))) * 10),10),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),0,0,("你卖掉了一名|cff00ff00" + ((yield* V.call("GetUnitName",(yield* V.call("GetSpellAbilityUnit")))) + ("|r获得了|c00FF0000" + ((yield* V.call("I2S",V.idiv(((yield* V.call("R2I",(yield* V.call("GetUnitStateSwap",G.UNIT_STATE_LIFE,(yield* V.call("GetSpellAbilityUnit")))))) * 10),10))) + "|r点金币~"))))));
(yield* V.call("Trig_chushou_TZ"));
(yield* V.call("ExplodeUnitBJ",(yield* V.call("GetSpellAbilityUnit"))));
};
F.InitTrig_chushou=function* () {
G.gg_trg_chushou = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_chushou,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_chushou,(yield* V.call("Condition","Trig_chushou_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_chushou,"Trig_chushou_Actions"));
};
F.Trig_ChakanGXZ_Conditions=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093677141);
};
F.Trig_ChakanGXZ_Actions=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),0,0,((("你的这名|cffffcc00" + (yield* V.call("GetUnitName",(yield* V.call("GetSpellAbilityUnit"))))) + "|r的功勋值为|c0000FF00") + (yield* V.call("I2S",(yield* V.call("GetUnitUserData",(yield* V.call("GetSpellAbilityUnit")))))))));
};
F.InitTrig_ChakanGXZ=function* () {
G.gg_trg_ChakanGXZ = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_ChakanGXZ,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_ChakanGXZ,(yield* V.call("Condition","Trig_ChakanGXZ_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_ChakanGXZ,"Trig_ChakanGXZ_Actions"));
};
F.Trig_shougou_Conditions=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093678917);
};
F.Trig_shougou_Func001Func001Func001Func001Func002C=function* () {
return (((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP)) - (yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),G.PLAYER_STATE_RESOURCE_FOOD_USED))) > 0);
};
F.Trig_shougou_Func001Func001Func001Func001C=function* () {
return (1000.0 <= (yield* V.call("I2R",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD)))));
};
F.Trig_shougou_Func001Func001Func001C=function* () {
return ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_LIFE,(yield* V.call("GetSpellTargetUnit")))) !== 220.0);
};
F.Trig_shougou_Func001Func001C=function* () {
return ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_LIFE,(yield* V.call("GetSpellTargetUnit")))) <= (yield* V.call("I2R",(yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD)))));
};
F.Trig_shougou_Func001C=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_shougou_Actions=function* () {
if ((yield* V.call("Trig_shougou_Func001C"))) {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),0,0,10.0,"小强啊~非常抱歉~只能收购离线玩家的单位哦~收购失败咯~"));
} else {
if ((yield* V.call("Trig_shougou_Func001Func001C"))) {
if ((yield* V.call("Trig_shougou_Func001Func001Func001C"))) {
(yield* V.call("AdjustPlayerStateBJ",((yield* V.call("R2I",(yield* V.call("GetUnitStateSwap",G.UNIT_STATE_LIFE,(yield* V.call("GetSpellTargetUnit")))))) * (-1)),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("AdjustPlayerStateBJ",((yield* V.call("R2I",(yield* V.call("GetUnitStateSwap",G.UNIT_STATE_LIFE,(yield* V.call("GetSpellTargetUnit")))))) * 1),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "收购了") + ((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))))) + ("的一名|cff00ff00" + ((yield* V.call("GetUnitName",(yield* V.call("GetSpellTargetUnit")))) + "|r~这年头有钱啥都能买..."))))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_TempPoi,"Abilities\\Spells\\Other\\Charm\\CharmTarget.mdl"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP,((yield* V.call("GetPlayerState",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP)) - (yield* V.call("GetUnitFoodUsed",(yield* V.call("GetSpellTargetUnit")))))));
(yield* V.call("SetUnitUseFoodBJ",false,(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("SetUnitOwner",(yield* V.call("GetSpellTargetUnit")),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),true));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
} else {
if ((yield* V.call("Trig_shougou_Func001Func001Func001Func001C"))) {
if ((yield* V.call("Trig_shougou_Func001Func001Func001Func001Func002C"))) {
(yield* V.call("AdjustPlayerStateBJ",1,(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP));
(yield* V.call("AdjustPlayerStateBJ",(-1000),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("AdjustPlayerStateBJ",(-1),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "收购了") + ((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))))) + ("的一个|cff00ff00" + ("人口" + "|r~这年头有钱啥都能买..."))))));
} else {
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))))) + "收购了") + ((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellTargetUnit")))))) + ("的一名|cff00ff00" + ((yield* V.call("GetUnitName",(yield* V.call("GetSpellTargetUnit")))) + "|r~这年头有钱啥都能买..."))))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("AdjustPlayerStateBJ",(-1000),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_TempPoi,"Abilities\\Spells\\Other\\Charm\\CharmTarget.mdl"));
(yield* V.call("SetUnitOwner",(yield* V.call("GetSpellTargetUnit")),(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),true));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
}
} else {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),0,0,"小强啊~你的钱不够哦~|c00FF0000收购失败|r啦~"));
}
}
} else {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),0,0,"小强啊~你的钱不够哦~|c00FF0000收购失败|r啦~"));
}
}
};
F.InitTrig_shougou=function* () {
G.gg_trg_shougou = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_shougou,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_shougou,(yield* V.call("Condition","Trig_shougou_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_shougou,"Trig_shougou_Actions"));
};
F.Trig_NextRound_1_boss_Actions=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetLocalPlayer")),0,0,10.0,"雅典娜派遣|c00FF0000Boss部队|r发起了偷袭！"));
G.udg_Pointa = (yield* V.call("GetRectCenter",G.gg_rct_a1));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_BossType[V.idiv(G.udg_waves,10)],(yield* V.call("Player",8)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointa));
G.udg_Pointb = (yield* V.call("GetRectCenter",G.gg_rct_b1));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_BossType[V.idiv(G.udg_waves,10)],(yield* V.call("Player",9)),G.udg_Pointb,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointb));
G.udg_Pointc = (yield* V.call("GetRectCenter",G.gg_rct_c1));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_BossType[V.idiv(G.udg_waves,10)],(yield* V.call("Player",10)),G.udg_Pointc,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointc));
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d1));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_BossType[V.idiv(G.udg_waves,10)],(yield* V.call("Player",11)),G.udg_Pointd,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointd));
(yield* V.call("DestroyTimer",tm));
};
F.InitTrig_NextRound_1_boss=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("TimerStart",tm,8.0,false,"Trig_NextRound_1_boss_Actions"));
tm = null;
};
F.Trig_NextRound_2_boss_Actions=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetLocalPlayer")),0,0,10.0,"雅典娜派遣|c00FF0000Boss部队|r发起了最后的进攻！"));
G.udg_Pointa = (yield* V.call("GetRectCenter",G.gg_rct_a1));
(yield* V.call("CreateNUnitsAtLoc",1,1211118934,(yield* V.call("Player",8)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointa));
G.udg_Pointb = (yield* V.call("GetRectCenter",G.gg_rct_b1));
(yield* V.call("CreateNUnitsAtLoc",1,1211118934,(yield* V.call("Player",9)),G.udg_Pointb,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointb));
G.udg_Pointc = (yield* V.call("GetRectCenter",G.gg_rct_c1));
(yield* V.call("CreateNUnitsAtLoc",1,1211118934,(yield* V.call("Player",10)),G.udg_Pointc,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointc));
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d1));
(yield* V.call("CreateNUnitsAtLoc",1,1211118934,(yield* V.call("Player",11)),G.udg_Pointd,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointd));
(yield* V.call("DestroyTimer",tm));
};
F.InitTrig_NextRound_2_boss=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("TimerStart",tm,40,false,"Trig_NextRound_2_boss_Actions"));
tm = null;
};
F.Trig_EveryRound_Actions=function* () {
let t = (yield* V.call("GetExpiredTimer"));
let i = 0;
if ((G.udg_waves > 56)) {
(yield* V.call("DestroyTimer",t));
return ;
}
G.udg_Pointa = (yield* V.call("GetRectCenter",G.gg_rct_a1));
G.udg_Pointb = (yield* V.call("GetRectCenter",G.gg_rct_b1));
G.udg_Pointc = (yield* V.call("GetRectCenter",G.gg_rct_c1));
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d1));
i = 1;
while (V.guard()) {
if ((i > G.udg_shuaguaishu)) break;
(yield* V.call("CreateUnitAtLoc",(yield* V.call("Player",8)),G.udg_EnemyType[G.udg_waves],G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("CreateUnitAtLoc",(yield* V.call("Player",9)),G.udg_EnemyType[G.udg_waves],G.udg_Pointb,G.bj_UNIT_FACING));
(yield* V.call("CreateUnitAtLoc",(yield* V.call("Player",10)),G.udg_EnemyType[G.udg_waves],G.udg_Pointc,G.bj_UNIT_FACING));
(yield* V.call("CreateUnitAtLoc",(yield* V.call("Player",11)),G.udg_EnemyType[G.udg_waves],G.udg_Pointd,G.bj_UNIT_FACING));
i = (i + 1);
}
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointc));
(yield* V.call("RemoveLocation",G.udg_Pointd));
G.udg_shuabingcount = (G.udg_shuabingcount + 1);
if ((G.udg_waves > 44)) {
if ((G.udg_shuabingcount >= 40)) {
G.udg_shuabingcount = 0;
(yield* V.call("DestroyTimer",t));
if (((yield* V.call("ModuloInteger",G.udg_waves,10)) === 0)) {
(yield* V.call("InitTrig_NextRound_1_boss"));
}
if ((G.udg_waves === 56)) {
(yield* V.call("InitTrig_NextRound_2_boss"));
}
}
} else {
if ((G.udg_shuabingcount >= 40)) {
G.udg_shuabingcount = 0;
(yield* V.call("DestroyTimer",t));
if (((yield* V.call("ModuloInteger",G.udg_waves,10)) === 0)) {
(yield* V.call("InitTrig_NextRound_1_boss"));
}
}
}
};
F.InitTrig_EveryRound1=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("TimerStart",tm,.8,true,"Trig_EveryRound_Actions"));
tm = null;
};
F.InitTrig_EveryRound2=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("TimerStart",tm,1.0,true,"Trig_EveryRound_Actions"));
tm = null;
};
F.Trig_NextRound_shangqian=function* () {
return (((yield* V.call("ModuloInteger",G.udg_waves,7)) === 0) && (G.udg_waves <= 28));
};
F.Trig_NextRound_gaolidai1=function* () {
return (G.udg_j > V.idiv((yield* V.call("GetPlayerState",(yield* V.call("ConvertedPlayer",(yield* V.call("GetForLoopIndexA")))),G.PLAYER_STATE_RESOURCE_GOLD)),10));
};
F.Trig_NextRound_gaolidai2=function* () {
return (G.udg_gaolidai[(yield* V.call("GetForLoopIndexA"))] && (G.udg_waves > 40));
};
F.Trig_NextRound_faqian=function* () {
let t = 0;
if ((G.udg_yxmode === 2)) {
t = (yield* V.call("R2I",(((G.udg_waves * 6) + 50) * 1.5)));
} else {
t = ((G.udg_waves * 6) + 50);
}
(yield* V.call("AdjustPlayerStateBJ",t,(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,10.0,(("赏钱了，你得到|c00ffff00" + (yield* V.call("I2S",t))) + "|r金")));
};
F.Trig_NextRound=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
G.udg_waves = (G.udg_waves + 1);
if ((G.udg_waves > 56)) {
(yield* V.call("DestroyTimer",tm));
} else {
if ((G.udg_waves < 56)) {
(yield* V.call("TimerDialogDisplayBJ",true,G.udg_twaves));
(yield* V.call("TimerDialogSetTitle",G.udg_twaves,("|c00FF0000" + ((yield* V.call("I2S",(G.udg_waves + 1))) + "|r/56 波"))));
}
if ((yield* V.call("Trig_NextRound_shangqian"))) {
(yield* V.call("AdjustPlayerStateBJ",V.idiv((G.udg_waves * 100),7),(yield* V.call("LeaderboardGetIndexedPlayerBJ",4,(yield* V.call("GetLastCreatedLeaderboard")))),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("DisplayTextToPlayer",(yield* V.call("LeaderboardGetIndexedPlayerBJ",4,(yield* V.call("GetLastCreatedLeaderboard")))),0,0,("|c0000ff00由于你杀敌太少，雅典娜十分欣慰，贿赂你|c00ff0000" + ((yield* V.call("I2S",V.idiv((G.udg_waves * 100),7))) + "|c0000ff00点金币，希望你继续保持^_^"))));
}
if ((G.udg_waves === 40)) {
(yield* V.call("TriggerExecute",G.gg_trg_Lv1Delete));
}
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 5;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_NextRound_gaolidai2"))) {
G.udg_j = 4000;
if ((yield* V.call("Trig_NextRound_gaolidai1"))) {
G.udg_j = V.idiv((yield* V.call("GetPlayerState",(yield* V.call("ConvertedPlayer",(yield* V.call("GetForLoopIndexA")))),G.PLAYER_STATE_RESOURCE_GOLD)),10);
}
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("ConvertedPlayer",(yield* V.call("GetForLoopIndexA")))))) + "获得了|c00ff0000") + ((yield* V.call("I2S",G.udg_j)) + "|r点高利贷利息~真让人眼红^_^"))));
(yield* V.call("AdjustPlayerStateBJ",G.udg_j,(yield* V.call("ConvertedPlayer",(yield* V.call("GetForLoopIndexA")))),G.PLAYER_STATE_RESOURCE_GOLD));
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
if ((G.udg_waves === 45)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
(yield* V.call("DestroyTimer",tm));
G.udg_twaves = null;
tm = null;
(yield* V.call("ExecuteFunc","fun_NextRound2"));
}
if ((G.udg_waves > 44)) {
(yield* V.call("InitTrig_EveryRound2"));
} else {
(yield* V.call("InitTrig_EveryRound1"));
}
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d1));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_EnemyType[G.udg_waves],(yield* V.call("Player",8)),G.udg_Pointd,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointd));
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetLocalPlayer")),0,0,10.0,((("Level " + (yield* V.call("I2S",G.udg_waves))) + " |c00ffff00") + (yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))))));
(yield* V.call("RemoveUnit",(yield* V.call("GetLastCreatedUnit"))));
if ((G.udg_waves !== 1)) {
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",0)))),"Trig_NextRound_faqian"));
}
}
};
F.fun_NextRound=function* () {
let tm = (yield* V.call("CreateTimer"));
if ((G.udg_twaves !== null)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
}
G.udg_twaves = (yield* V.call("CreateTimerDialogBJ",tm,("|c00FF0000" + ((yield* V.call("I2S",(G.udg_waves + 1))) + "|r/56 波"))));
(yield* V.call("TimerDialogDisplayBJ",true,G.udg_twaves));
(yield* V.call("TimerStart",tm,60.0,true,"Trig_NextRound"));
tm = null;
};
F.fun_NextRound2=function* () {
let tm = (yield* V.call("CreateTimer"));
if ((G.udg_twaves !== null)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
}
G.udg_twaves = (yield* V.call("CreateTimerDialogBJ",tm,("|c00FF0000" + ((yield* V.call("I2S",(G.udg_waves + 1))) + "|r/56 波"))));
(yield* V.call("TimerDialogDisplayBJ",true,G.udg_twaves));
(yield* V.call("TimerStart",tm,80.0,true,"Trig_NextRound"));
tm = null;
};
F.fun_FirstRound_Actions=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
(yield* V.call("Trig_NextRound"));
(yield* V.call("fun_NextRound"));
(yield* V.call("DestroyTimer",tm));
tm = null;
};
F.fun_FirstRound=function* () {
let tm = (yield* V.call("CreateTimer"));
if ((G.udg_twaves !== null)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
}
G.udg_twaves = (yield* V.call("CreateTimerDialogBJ",tm,"edit by archcarol"));
(yield* V.call("TimerDialogDisplayBJ",true,G.udg_twaves));
(yield* V.call("TimerDialogSetTitle",G.udg_twaves,("|c00FF0000" + ((yield* V.call("I2S",(G.udg_waves + 1))) + "|r/56 波"))));
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetLocalPlayer")),0,0,10.0,"|c00FFFF00第一波怪物30秒后到达|r"));
(yield* V.call("TimerStart",tm,30.0,false,"fun_FirstRound_Actions"));
tm = null;
};
F.Trig_Defeated_Conditions=function* () {
return (G.udg_lives <= 0);
};
F.Trig_Defeated_Func003A=function* () {
(yield* V.call("CustomDefeatBJ",(yield* V.call("GetEnumPlayer")),("|c00FFFF00胜败乃兵家常事，大虾请重新来过！|n            |c0000ff00当前第|c00ff0000" + ((yield* V.call("I2S",G.udg_waves)) + "|c0000ff00波~"))));
};
F.Trig_Defeated_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_defeat = true;
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",0)))),"Trig_Defeated_Func003A"));
};
F.InitTrig_Defeated=function* () {
G.gg_trg_Defeated = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_Defeated));
(yield* V.call("TriggerAddCondition",G.gg_trg_Defeated,(yield* V.call("Condition","Trig_Defeated_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_Defeated,"Trig_Defeated_Actions"));
};
F.Trig_Victory_Conditions=function* () {
return ((((((G.udg_waves >= 57) && ((yield* V.call("GetPlayerState",(yield* V.call("Player",8)),G.PLAYER_STATE_RESOURCE_FOOD_USED)) === 0)) && ((yield* V.call("GetPlayerState",(yield* V.call("Player",9)),G.PLAYER_STATE_RESOURCE_FOOD_USED)) === 0)) && ((yield* V.call("GetPlayerState",(yield* V.call("Player",10)),G.PLAYER_STATE_RESOURCE_FOOD_USED)) === 0)) && ((yield* V.call("GetPlayerState",(yield* V.call("Player",11)),G.PLAYER_STATE_RESOURCE_FOOD_USED)) === 0)) && (G.udg_defeat === false));
};
F.Trig_Victory_Func022Func010A=function* () {
(yield* V.call("CustomVictoryBJ",(yield* V.call("GetEnumPlayer")),true,true));
};
F.Trig_Victory_Func022Func029A=function* () {
(yield* V.call("CustomVictoryBJ",(yield* V.call("GetEnumPlayer")),true,true));
};
F.Trig_Victory_Func022C=function* () {
return (G.udg_nanadead === false);
};
F.Trig_Victory_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("PolledWait",1.0));
(yield* V.call("CinematicModeBJ",true,(yield* V.call("GetPlayersAll"))));
(yield* V.call("SetCameraTargetController",G.gg_unit_Hjai_0009,0,0,false));
(yield* V.call("PolledWait",2.0));
(yield* V.call("SetUnitPositionLoc",G.udg_nongming[1],(yield* V.call("GetRectCenter",G.gg_rct_ra1))));
(yield* V.call("AddSpecialEffectLocBJ",(yield* V.call("GetRectCenter",G.gg_rct_ra1)),"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("SetUnitPositionLoc",G.udg_nongming[2],(yield* V.call("GetRectCenter",G.gg_rct_ra2))));
(yield* V.call("AddSpecialEffectLocBJ",(yield* V.call("GetRectCenter",G.gg_rct_ra2)),"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("SetUnitPositionLoc",G.udg_nongming[3],(yield* V.call("GetRectCenter",G.gg_rct_ra3))));
(yield* V.call("AddSpecialEffectLocBJ",(yield* V.call("GetRectCenter",G.gg_rct_ra3)),"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("SetUnitPositionLoc",G.udg_nongming[4],(yield* V.call("GetRectCenter",G.gg_rct_ra4))));
(yield* V.call("AddSpecialEffectLocBJ",(yield* V.call("GetRectCenter",G.gg_rct_ra4)),"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("SetUnitPositionLoc",G.udg_nongming[5],(yield* V.call("GetRectCenter",G.gg_rct_ra5))));
(yield* V.call("AddSpecialEffectLocBJ",(yield* V.call("GetRectCenter",G.gg_rct_ra5)),"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("PolledWait",1.0));
if ((yield* V.call("Trig_Victory_Func022C"))) {
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.udg_nongming[1],"小强甲",null,"雅典娜你个小样的，敢欺负我们人类，看我们小强怎么收拾你~",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.gg_unit_Hjai_0009,"堕落的雅典娜",null,"大哥大姐小强小小强们，行行好吧~看我这么靓，你们怎么忍心下得了手呢~",G.bj_TIMETYPE_ADD,0,true));
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 5;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
(yield* V.call("IssueTargetOrderById",G.udg_nongming[(yield* V.call("GetForLoopIndexA"))],851983,G.gg_unit_Hjai_0009));
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.udg_nongming[2],"小强乙",null,"俺们都还没成年，你就用这招，太毒了吧……小强兄弟们快点把他砍了~就是这招搞得我们国王哈迪斯神魂颠倒的……",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.gg_unit_Hjai_0009,"堕落的雅典娜",null,"既然你们不懂得怜香惜玉~那我就不客气了~就凭你们几个小样~哈哈~",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.gg_unit_Hjai_0009,"堕落的雅典娜",null,"嗯……奇怪了~你们用的什么兵器~怎么就没见过呢？",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.udg_nongming[3],"小强丙",null,"连菜刀都不知道？？真是没见过世面……",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.gg_unit_Hjai_0009,"堕落的雅典娜",null,"菜刀？？？难道是传说中的神器吗？(完蛋了，今天看来是我的忌日了啊……)",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,"雅典娜越想越害怕，心跳加速……加速，终于啊的一声~挂掉了~"));
(yield* V.call("PolledWait",1.0));
(yield* V.call("KillUnit",G.gg_unit_Hjai_0009));
(yield* V.call("PolledWait",5.0));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.udg_nongming[4],"小强丁",null,"俺们拿不起斧头才拿菜刀砍的……没想到菜刀这么强啊~",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,"从此以后，菜刀砍死雅典娜的传说就这样流传开了……"));
(yield* V.call("PolledWait",5.0));
(yield* V.call("CinematicModeBJ",false,(yield* V.call("GetPlayersAll"))));
(yield* V.call("PolledWait",1.0));
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",0)))),"Trig_Victory_Func022Func029A"));
} else {
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.udg_nongming[1],"小强甲",null,"咦？雅典娜这妞跑哪去了~",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.udg_nongming[2],"小强乙",null,"不知道是哪位高手整死她了啊^_^",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.gg_unit_Hjai_0009,"雅典娜的冤魂",null,"我死的好惨~我做鬼也不会放过你们的~",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.udg_nongming[3],"小强丙",null,"呵呵~幸亏你死得早~要是死在俺们手里~那才悲惨呢~",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.udg_nongming[4],"小强丁",null,"的确是啊~呵呵~至于为什么恐怕只有电视机前的观众朋友们能明白了o(∩_∩)o",G.bj_TIMETYPE_ADD,0,true));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,"从此以后，雅典娜的冤魂一直飘荡在地狱最深处……"));
(yield* V.call("PolledWait",5.0));
(yield* V.call("CinematicModeBJ",false,(yield* V.call("GetPlayersAll"))));
(yield* V.call("PolledWait",1.0));
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",0)))),"Trig_Victory_Func022Func010A"));
}
};
F.InitTrig_Victory=function* () {
G.gg_trg_Victory = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterTimerEventPeriodic",G.gg_trg_Victory,5.0));
(yield* V.call("TriggerAddCondition",G.gg_trg_Victory,(yield* V.call("Condition","Trig_Victory_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_Victory,"Trig_Victory_Actions"));
};
F.Trig_Boss_Dead_Conditions=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetDyingUnit")),G.UNIT_TYPE_HERO)) !== null);
};
F.Trig_Boss_Dead_Actions=function* () {
(yield* V.call("AdjustPlayerStateBJ",5,(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.PLAYER_STATE_RESOURCE_FOOD_CAP));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "消灭了一名|c00FF0000Boss|r，奖励5个人口~")));
};
F.InitTrig_Boss_Dead=function* () {
G.gg_trg_Boss_Dead = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_Boss_Dead,(yield* V.call("Player",8)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_Boss_Dead,(yield* V.call("Player",9)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_Boss_Dead,(yield* V.call("Player",10)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_Boss_Dead,(yield* V.call("Player",11)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerAddCondition",G.gg_trg_Boss_Dead,(yield* V.call("Condition","Trig_Boss_Dead_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_Boss_Dead,"Trig_Boss_Dead_Actions"));
};
F.Trig_Set_Enemies_Actions=function* () {
G.udg_i = 1;
G.udg_EnemyType[G.udg_i] = 1851879011;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1851879023;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1851941230;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1851944036;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1851941997;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1851941999;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852007794;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852010091;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1853055842;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1853055795;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1969709426;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1970169187;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1969451641;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1970107511;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852990571;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1851947620;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852728434;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852990828;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852140642;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852141155;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852142195;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852206964;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852204898;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852860012;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852207728;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852207713;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852270642;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1853056866;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1853055597;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852272246;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852270450;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1853321831;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852338801;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852336242;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1851877497;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852404848;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852404855;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852403297;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852534636;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1853060215;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852600434;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852599148;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1853323876;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852663652;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852666723;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852665205;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852733297;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852794732;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852798821;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852861538;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852207203;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852996199;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852600950;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1853252727;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1853320801;
G.udg_i = (G.udg_i + 1);
G.udg_EnemyType[G.udg_i] = 1852403302;
G.udg_j = 1;
G.udg_BossType[G.udg_j] = 1432642913;
G.udg_j = (G.udg_j + 1);
G.udg_BossType[G.udg_j] = 1433168227;
G.udg_j = (G.udg_j + 1);
G.udg_BossType[G.udg_j] = 1432646245;
G.udg_j = (G.udg_j + 1);
G.udg_BossType[G.udg_j] = 1432580716;
G.udg_j = (G.udg_j + 1);
G.udg_BossType[G.udg_j] = 1215722344;
};
F.InitTrig_Set_Enemies=function* () {
G.gg_trg_Set_Enemies = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_Set_Enemies,"Trig_Set_Enemies_Actions"));
};
F.OpenTrigger=function* (xz) {
if (G.udg_zongzuxz[xz]) {
return ;
}
G.udg_zongzuxz[xz] = true;
if ((xz === 1)) {
(yield* V.call("EnableTrigger",G.gg_trg_YMchongjibo1));
(yield* V.call("EnableTrigger",G.gg_trg_YMchongjibo2));
(yield* V.call("EnableTrigger",G.gg_trg_YMchongjibo3));
(yield* V.call("EnableTrigger",G.gg_trg_YMdimaoci1));
(yield* V.call("EnableTrigger",G.gg_trg_YMdimaoci2));
(yield* V.call("EnableTrigger",G.gg_trg_YMdimaoci3));
(yield* V.call("EnableTrigger",G.gg_trg_YMdimaoci4));
(yield* V.call("EnableTrigger",G.gg_trg_YMdiyuhuo1));
(yield* V.call("EnableTrigger",G.gg_trg_YMdiyuhuo2));
(yield* V.call("EnableTrigger",G.gg_trg_YMdiyuhuo3));
(yield* V.call("EnableTrigger",G.gg_trg_YMdiyuhuo4));
(yield* V.call("EnableTrigger",G.gg_trg_YMfengbaozhichui1));
(yield* V.call("EnableTrigger",G.gg_trg_YMfengbaozhichui2));
(yield* V.call("EnableTrigger",G.gg_trg_YMfengbaozhichui3));
(yield* V.call("EnableTrigger",G.gg_trg_YMfengbaozhichui4));
(yield* V.call("EnableTrigger",G.gg_trg_YMjingshu1));
(yield* V.call("EnableTrigger",G.gg_trg_YMjingshu2));
(yield* V.call("EnableTrigger",G.gg_trg_YMjingshu3));
(yield* V.call("EnableTrigger",G.gg_trg_YMmajiajue));
(yield* V.call("EnableTrigger",G.gg_trg_YMzhaohuanxiong1));
(yield* V.call("EnableTrigger",G.gg_trg_YMzhaohuanxiong2));
(yield* V.call("EnableTrigger",G.gg_trg_YMzhaohuanxiong3));
(yield* V.call("EnableTrigger",G.gg_trg_YMsheshenquyi));
(yield* V.call("EnableTrigger",G.gg_trg_YMLeiTing));
}
if ((xz === 2)) {
(yield* V.call("EnableTrigger",G.gg_trg_LRzhuanshen));
(yield* V.call("EnableTrigger",G.gg_trg_LRdahuo1));
(yield* V.call("EnableTrigger",G.gg_trg_LRdahuo2));
(yield* V.call("EnableTrigger",G.gg_trg_LRdahuo3));
(yield* V.call("EnableTrigger",G.gg_trg_LRdahuo4));
(yield* V.call("EnableTrigger",G.gg_trg_LRhuitianmiedi));
(yield* V.call("EnableTrigger",G.gg_trg_LRjingxia1));
(yield* V.call("EnableTrigger",G.gg_trg_LRjingxia2));
(yield* V.call("EnableTrigger",G.gg_trg_LRjingxia3));
(yield* V.call("EnableTrigger",G.gg_trg_LRlang1));
(yield* V.call("EnableTrigger",G.gg_trg_LRlang2));
(yield* V.call("EnableTrigger",G.gg_trg_LRlang3));
(yield* V.call("EnableTrigger",G.gg_trg_LRpaoxiao1));
(yield* V.call("EnableTrigger",G.gg_trg_LRpaoxiao2));
(yield* V.call("EnableTrigger",G.gg_trg_LRpaoxiao3));
(yield* V.call("EnableTrigger",G.gg_trg_LRqunbu));
(yield* V.call("EnableTrigger",G.gg_trg_LRqunxing1));
(yield* V.call("EnableTrigger",G.gg_trg_LRqunxing2));
(yield* V.call("EnableTrigger",G.gg_trg_LRqunxing3));
(yield* V.call("EnableTrigger",G.gg_trg_LRqunxing4));
(yield* V.call("EnableTrigger",G.gg_trg_LRshandian1));
(yield* V.call("EnableTrigger",G.gg_trg_LRshandian2));
(yield* V.call("EnableTrigger",G.gg_trg_LRshandian3));
(yield* V.call("EnableTrigger",G.gg_trg_LRshandian4));
(yield* V.call("EnableTrigger",G.gg_trg_LRshuren1));
(yield* V.call("EnableTrigger",G.gg_trg_LRshuren2));
(yield* V.call("EnableTrigger",G.gg_trg_LRshuren3));
(yield* V.call("EnableTrigger",G.gg_trg_LRsiwangqiyue));
}
if ((xz === 3)) {
(yield* V.call("EnableTrigger",G.gg_trg_DZsuoding));
(yield* V.call("EnableTrigger",G.gg_trg_DZJianrenfengbao));
(yield* V.call("EnableTrigger",G.gg_trg_DZanyingtouxi1));
(yield* V.call("EnableTrigger",G.gg_trg_DZanyingtouxi2));
(yield* V.call("EnableTrigger",G.gg_trg_DZanyingtouxi3));
(yield* V.call("EnableTrigger",G.gg_trg_DZanyingtouxi4));
(yield* V.call("EnableTrigger",G.gg_trg_DZbinggongchang1));
(yield* V.call("EnableTrigger",G.gg_trg_DZbinggongchang2));
(yield* V.call("EnableTrigger",G.gg_trg_DZbinggongchang3));
(yield* V.call("EnableTrigger",G.gg_trg_DZlinghunsuolian1));
(yield* V.call("EnableTrigger",G.gg_trg_DZlinghunsuolian2));
(yield* V.call("EnableTrigger",G.gg_trg_DZlinghunsuolian3));
(yield* V.call("EnableTrigger",G.gg_trg_DZlinghunsuolian4));
(yield* V.call("EnableTrigger",G.gg_trg_DZmanteng1));
(yield* V.call("EnableTrigger",G.gg_trg_DZmanteng2));
(yield* V.call("EnableTrigger",G.gg_trg_DZmanteng3));
(yield* V.call("EnableTrigger",G.gg_trg_DZmorishenpan1));
(yield* V.call("EnableTrigger",G.gg_trg_DZmorishenpan2));
(yield* V.call("EnableTrigger",G.gg_trg_DZmorishenpan3));
(yield* V.call("EnableTrigger",G.gg_trg_DZmorishenpan4));
(yield* V.call("EnableTrigger",G.gg_trg_DZshachongji1));
(yield* V.call("EnableTrigger",G.gg_trg_DZshachongji2));
(yield* V.call("EnableTrigger",G.gg_trg_DZshachongji3));
(yield* V.call("EnableTrigger",G.gg_trg_DZshandianfengbao1));
(yield* V.call("EnableTrigger",G.gg_trg_DZshandianfengbao2));
(yield* V.call("EnableTrigger",G.gg_trg_DZshandianfengbao3));
(yield* V.call("EnableTrigger",G.gg_trg_DZshentou1));
(yield* V.call("EnableTrigger",G.gg_trg_DZshentou2));
(yield* V.call("EnableTrigger",G.gg_trg_DZshentou3));
(yield* V.call("EnableTrigger",G.gg_trg_DZtouqian));
(yield* V.call("EnableTrigger",G.gg_trg_DZzhiyu));
(yield* V.call("EnableTrigger",G.gg_trg_DZzhiyutxt));
}
if ((xz === 4)) {
(yield* V.call("EnableTrigger",G.gg_trg_SSJiejie));
(yield* V.call("EnableTrigger",G.gg_trg_SSbaofengxue1));
(yield* V.call("EnableTrigger",G.gg_trg_SSbaofengxue2));
(yield* V.call("EnableTrigger",G.gg_trg_SSbaofengxue3));
(yield* V.call("EnableTrigger",G.gg_trg_SSbingxueluanwu1));
(yield* V.call("EnableTrigger",G.gg_trg_SSbingxueluanwu2));
(yield* V.call("EnableTrigger",G.gg_trg_SSbingxueluanwu3));
(yield* V.call("EnableTrigger",G.gg_trg_SSbingxueluanwu4));
(yield* V.call("EnableTrigger",G.gg_trg_SSfenghuangniepan1));
(yield* V.call("EnableTrigger",G.gg_trg_SSfenghuangniepan2));
(yield* V.call("EnableTrigger",G.gg_trg_SSfenghuangniepan3));
(yield* V.call("EnableTrigger",G.gg_trg_SSfenghuangniepan4));
(yield* V.call("EnableTrigger",G.gg_trg_SSjulang1));
(yield* V.call("EnableTrigger",G.gg_trg_SSjulang2));
(yield* V.call("EnableTrigger",G.gg_trg_SSjulang3));
(yield* V.call("EnableTrigger",G.gg_trg_SSkusimingxiang));
(yield* V.call("EnableTrigger",G.gg_trg_SSshuiyuansu1));
(yield* V.call("EnableTrigger",G.gg_trg_SSshuiyuansu2));
(yield* V.call("EnableTrigger",G.gg_trg_SSshuiyuansu3));
(yield* V.call("EnableTrigger",G.gg_trg_SSxixingdafa1));
(yield* V.call("EnableTrigger",G.gg_trg_SSxixingdafa2));
(yield* V.call("EnableTrigger",G.gg_trg_SSxixingdafa3));
(yield* V.call("EnableTrigger",G.gg_trg_SSxixingdafa4));
}
if ((xz === 5)) {
(yield* V.call("EnableTrigger",G.gg_trg_YXBingfengqiu));
(yield* V.call("EnableTrigger",G.gg_trg_YXchaojipaoxiao));
(yield* V.call("EnableTrigger",G.gg_trg_YXdaolunzhan1));
(yield* V.call("EnableTrigger",G.gg_trg_YXdaolunzhan2));
(yield* V.call("EnableTrigger",G.gg_trg_YXdaolunzhan3));
(yield* V.call("EnableTrigger",G.gg_trg_YXhuoyanyu1));
(yield* V.call("EnableTrigger",G.gg_trg_YXhuoyanyu2));
(yield* V.call("EnableTrigger",G.gg_trg_YXhuoyanyu3));
(yield* V.call("EnableTrigger",G.gg_trg_YXhuoyanyu4));
(yield* V.call("EnableTrigger",G.gg_trg_YXliehuojingu1));
(yield* V.call("EnableTrigger",G.gg_trg_YXliehuojingu2));
(yield* V.call("EnableTrigger",G.gg_trg_YXliehuojingu3));
(yield* V.call("EnableTrigger",G.gg_trg_YXliehuojingu4));
(yield* V.call("EnableTrigger",G.gg_trg_YXshandianhudun1));
(yield* V.call("EnableTrigger",G.gg_trg_YXshandianhudun2));
(yield* V.call("EnableTrigger",G.gg_trg_YXshandianhudun3));
(yield* V.call("EnableTrigger",G.gg_trg_YXshandianhudun4));
(yield* V.call("EnableTrigger",G.gg_trg_YXwanjian1));
(yield* V.call("EnableTrigger",G.gg_trg_YXwanjian2));
(yield* V.call("EnableTrigger",G.gg_trg_YXwanjian3));
}
if ((xz === 6)) {
(yield* V.call("EnableTrigger",G.gg_trg_MJSguihuoluanwu1));
(yield* V.call("EnableTrigger",G.gg_trg_MJSguihuoluanwu2));
(yield* V.call("EnableTrigger",G.gg_trg_MJSguihuoluanwu3));
(yield* V.call("EnableTrigger",G.gg_trg_MJSguihuoluanwu4));
(yield* V.call("EnableTrigger",G.gg_trg_MJSlingguang1));
(yield* V.call("EnableTrigger",G.gg_trg_MJSlingguang2));
(yield* V.call("EnableTrigger",G.gg_trg_MJSlingguang3));
(yield* V.call("EnableTrigger",G.gg_trg_MJSlongpao1));
(yield* V.call("EnableTrigger",G.gg_trg_MJSlongpao2));
(yield* V.call("EnableTrigger",G.gg_trg_MJSlongpao3));
(yield* V.call("EnableTrigger",G.gg_trg_MJSmoliquanshui1));
(yield* V.call("EnableTrigger",G.gg_trg_MJSmoliquanshui2));
(yield* V.call("EnableTrigger",G.gg_trg_MJSmoliquanshui3));
(yield* V.call("EnableTrigger",G.gg_trg_MJSnihong1));
(yield* V.call("EnableTrigger",G.gg_trg_MJSnihong2));
(yield* V.call("EnableTrigger",G.gg_trg_MJSnihong3));
(yield* V.call("EnableTrigger",G.gg_trg_MJSrenlunwu1));
(yield* V.call("EnableTrigger",G.gg_trg_MJSrenlunwu2));
(yield* V.call("EnableTrigger",G.gg_trg_MJSrenlunwu3));
(yield* V.call("EnableTrigger",G.gg_trg_MJSrenlunwu4));
(yield* V.call("EnableTrigger",G.gg_trg_MJSsiwangsuolian1));
(yield* V.call("EnableTrigger",G.gg_trg_MJSsiwangsuolian2));
(yield* V.call("EnableTrigger",G.gg_trg_MJSsiwangsuolian3));
(yield* V.call("EnableTrigger",G.gg_trg_MJSwanjianguizong));
(yield* V.call("EnableTrigger",G.gg_trg_MJSwanjianjue1));
(yield* V.call("EnableTrigger",G.gg_trg_MJSwanjianjue2));
(yield* V.call("EnableTrigger",G.gg_trg_MJSwanjianjue3));
(yield* V.call("EnableTrigger",G.gg_trg_MJSwanjianjue4));
(yield* V.call("EnableTrigger",G.gg_trg_MJSfennu));
}
};
F.Trig_kaishi2_Func003C=function* () {
return (G.udg_xuanze === false);
};
F.Trig_kaishi2_Actions=function* () {
let tm = (yield* V.call("GetExpiredTimer"));
(yield* V.call("DestroyTimer",tm));
tm = null;
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
if ((yield* V.call("Trig_kaishi2_Func003C"))) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
(yield* V.call("DialogClear",G.udg_nandukuang));
(yield* V.call("DestroyTrigger",G.gg_trg_nanduxz));
G.udg_xuanze = false;
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30,"由于玩家一没有在10秒内选择游戏难度，则默认为|c00ff0000简单|r难度~"));
(yield* V.call("TriggerExecute",G.gg_trg_zhiyexz));
(yield* V.call("fun_FirstRound"));
}
};
F.Trig_kaishi_Actions=function* () {
let tm = (yield* V.call("CreateTimer"));
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_zhiyexuanze[0] = "野蛮人";
G.udg_zhiyexuanze[1] = "猎人";
G.udg_zhiyexuanze[2] = "盗贼";
G.udg_zhiyexuanze[3] = "术士";
G.udg_zhiyexuanze[4] = "游侠";
G.udg_zhiyexuanze[5] = "魔剑士";
G.udg_nanduzi[0] = "简单";
G.udg_nanduzi[1] = "普通";
G.udg_nanduzi[2] = "困难";
G.udg_nanduzi[3] = "专家";
G.udg_nanduzi[4] = "天才";
(yield* V.call("DialogSetMessage",G.udg_nandukuang,"请选择游戏难度"));
G.udg_nanduxz[0] = (yield* V.call("DialogAddButtonBJ",G.udg_nandukuang,"简单"));
G.udg_nanduxz[1] = (yield* V.call("DialogAddButtonBJ",G.udg_nandukuang,"普通"));
G.udg_nanduxz[2] = (yield* V.call("DialogAddButtonBJ",G.udg_nandukuang,"困难"));
G.udg_nanduxz[3] = (yield* V.call("DialogAddButtonBJ",G.udg_nandukuang,"专家"));
G.udg_nanduxz[4] = (yield* V.call("DialogAddButtonBJ",G.udg_nandukuang,"天才"));
(yield* V.call("DialogDisplayBJ",true,G.udg_nandukuang,(yield* V.call("Player",0))));
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),"玩家一正在选择游戏难度，请稍后……"));
(yield* V.call("CreateTimerDialogBJ",tm,"游戏难度"));
if ((G.udg_twaves !== null)) {
(yield* V.call("DestroyTimerDialog",G.udg_twaves));
}
G.udg_twaves = (yield* V.call("GetLastCreatedTimerDialogBJ"));
(yield* V.call("TimerStart",tm,10.0,false,"Trig_kaishi2_Actions"));
(yield* V.call("TimerDialogDisplay",G.udg_twaves,true));
tm = null;
};
F.InitTrig_kaishi=function* () {
G.gg_trg_kaishi = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_kaishi,"Trig_kaishi_Actions"));
};
F.Trig_mode1xz_Func001=function* () {
if (((yield* V.call("GetClickedButtonBJ")) === G.udg_mode1[(yield* V.call("GetForLoopIndexA"))])) {
G.udg_modeanniu = (yield* V.call("GetForLoopIndexA"));
return true;
}
return false;
};
F.Trig_mode1xz_Func002=function* () {
G.udg_yxmode = G.udg_modeanniu;
if ((G.udg_modeanniu === 0)) {
G.udg_jinengsjlv = 10;
G.udg_biaozhunwupin = true;
G.udg_nokuaisumode = true;
G.udg_biaozhuncs[0] = 150;
G.udg_biaozhuncs[1] = 400;
G.udg_biaozhuncs[2] = 800;
G.udg_biaozhuncs[3] = 1000;
G.udg_biaozhuncs[4] = 5000;
G.udg_biaozhuncs[5] = 10000;
(yield* V.call("TriggerExecute",G.gg_trg_kaishi));
}
if ((G.udg_modeanniu === 1)) {
G.udg_biaozhunwupin = false;
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,"|c00FF0000特殊|r|c00FFFF00模式套装物品掉落率提高1倍。|r"));
(yield* V.call("TriggerExecute",G.gg_trg_mode2_1));
}
if ((G.udg_modeanniu === 2)) {
G.udg_biaozhunwupin = false;
G.udg_jinengsjlv = 1;
G.udg_nokuaisumode = false;
G.udg_biaozhuncs[0] = 1;
G.udg_biaozhuncs[1] = 1;
G.udg_biaozhuncs[2] = 1;
G.udg_biaozhuncs[3] = 1;
G.udg_biaozhuncs[4] = 1;
G.udg_biaozhuncs[5] = 1;
G.udg_lives = 75;
(yield* V.call("LeaderboardSetPlayerItemValueBJ",(yield* V.call("Player",10)),(yield* V.call("GetLastCreatedLeaderboard")),G.udg_lives));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,"|c00FF0000疯狂|r|c0000FFFF模式|r|c00FFFF00套装物品掉落率提高1倍。|r"));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,"|c00FF0000疯狂|r|c0000FFFF模式|r|c00FFFF00默认是快速功勋+100%技能习得。|r"));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,"|c00FFFF00游戏每波奖励收入提高到原来的1.5倍。玩家初始人口最大值为20。|r"));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,"|c00FF0000疯狂|r|c0000FFFF模式|r|c00FFFF00额外增加25点生命|r"));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,"|c00FFFF00套装职业不再限制并可以多套，套装距离提高到|r|c00FF000099999|r"));
(yield* V.call("TriggerExecute",G.gg_trg_mode2_1));
}
};
F.Trig_mode1xz_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_modexz[1] = true;
G.bj_forLoopAIndex = 0;
G.bj_forLoopAIndexEnd = 2;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_mode1xz_Func001"))) {
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,("玩家一选择的游戏模式为：|c00ff0000" + G.udg_modezi[(yield* V.call("GetForLoopIndexA"))])));
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("Trig_mode1xz_Func002"));
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
};
F.InitTrig_mode1xz=function* () {
G.gg_trg_mode1xz = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterDialogEventBJ",G.gg_trg_mode1xz,G.udg_mode1kuang));
(yield* V.call("TriggerAddAction",G.gg_trg_mode1xz,"Trig_mode1xz_Actions"));
};
F.Trig_mode2xz_Func001=function* () {
if (((yield* V.call("GetClickedButtonBJ")) === G.udg_mode2[(yield* V.call("GetForLoopIndexA"))])) {
G.udg_modeanniu = (yield* V.call("GetForLoopIndexA"));
return true;
}
return false;
};
F.Trig_mode2xz_Func002=function* () {
let r = 0;
if ((G.udg_yxmode === 2)) {
if ((G.udg_modeanniu === 0)) {
r = 150.0;
}
if ((G.udg_modeanniu === 1)) {
r = 150.0;
G.udg_shuaguaishu = 2;
}
if ((G.udg_modeanniu === 2)) {
r = 175.0;
G.udg_shuaguaishu = 2;
}
if ((G.udg_modeanniu === 3)) {
r = 200.0;
G.udg_shuaguaishu = 2;
}
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",8)),r));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",9)),r));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",10)),r));
(yield* V.call("SetPlayerHandicapBJ",(yield* V.call("Player",11)),r));
(yield* V.call("TriggerExecute",G.gg_trg_kaishi));
} else {
if ((G.udg_modeanniu === 0)) {
G.udg_nokuaisumode = true;
G.udg_biaozhuncs[0] = 150;
G.udg_biaozhuncs[1] = 400;
G.udg_biaozhuncs[2] = 800;
G.udg_biaozhuncs[3] = 1000;
G.udg_biaozhuncs[4] = 5000;
G.udg_biaozhuncs[5] = 10000;
}
if ((G.udg_modeanniu === 1)) {
G.udg_nokuaisumode = false;
G.udg_biaozhuncs[0] = 1;
G.udg_biaozhuncs[1] = 1;
G.udg_biaozhuncs[2] = 1;
G.udg_biaozhuncs[3] = 1;
G.udg_biaozhuncs[4] = 1;
G.udg_biaozhuncs[5] = 1;
}
(yield* V.call("TriggerExecute",G.gg_trg_mode3_1));
}
};
F.Trig_mode2xz_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_modexz[2] = true;
G.bj_forLoopAIndex = 0;
if ((G.udg_yxmode === 2)) {
G.bj_forLoopAIndexEnd = 3;
} else {
G.bj_forLoopAIndexEnd = 1;
}
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_mode2xz_Func001"))) {
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,("|c00FFFF00玩家一选择的游戏进阶模式为：|c00ff0000" + G.udg_modezi[(yield* V.call("GetForLoopIndexA"))])));
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("Trig_mode2xz_Func002"));
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
};
F.InitTrig_mode2xz=function* () {
G.gg_trg_mode2xz = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterDialogEventBJ",G.gg_trg_mode2xz,G.udg_mode2kuang));
(yield* V.call("TriggerAddAction",G.gg_trg_mode2xz,"Trig_mode2xz_Actions"));
};
F.Trig_mode3xz_Func001=function* () {
if (((yield* V.call("GetClickedButtonBJ")) === G.udg_mode3[(yield* V.call("GetForLoopIndexA"))])) {
G.udg_modeanniu = (yield* V.call("GetForLoopIndexA"));
return true;
}
return false;
};
F.Trig_mode3xz_Func002=function* () {
if ((G.udg_modeanniu === 0)) {
G.udg_jinengsjlv = 10;
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30,"|c00FFFF00正常技能模式只有|c00FF000010%|r概率获得特殊技能"));
}
if ((G.udg_modeanniu === 1)) {
G.udg_jinengsjlv = 1;
}
(yield* V.call("TriggerExecute",G.gg_trg_kaishi));
};
F.Trig_mode3xz_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_modexz[3] = true;
G.bj_forLoopAIndex = 0;
G.bj_forLoopAIndexEnd = 2;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_mode3xz_Func001"))) {
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,("|c00FFFF00玩家一选择的游戏技能习得模式为：|c00ff0000" + G.udg_modezi[(yield* V.call("GetForLoopIndexA"))])));
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("Trig_mode3xz_Func002"));
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
};
F.InitTrig_mode3xz=function* () {
G.gg_trg_mode3xz = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterDialogEventBJ",G.gg_trg_mode3xz,G.udg_mode3kuang));
(yield* V.call("TriggerAddAction",G.gg_trg_mode3xz,"Trig_mode3xz_Actions"));
};
F.Trig_nanduxz_Func003Func001Func005A=function* () {
(yield* V.call("SetPlayerTechResearchedSwap",1378889783,(yield* V.call("GetForLoopIndexA")),(yield* V.call("GetEnumPlayer"))));
};
F.Trig_nanduxz_Func003Func001C=function* () {
return ((yield* V.call("GetClickedButtonBJ")) === G.udg_nanduxz[(yield* V.call("GetForLoopIndexA"))]);
};
F.Trig_nanduxz_Func004Func001A=function* () {
(yield* V.call("AdjustPlayerStateBJ",100,(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_nanduxz_Func004C=function* () {
return (G.udg_nandujibie === 3);
};
F.Trig_nanduxz_Func005Func001Func002A=function* () {
(yield* V.call("SetPlayerTechResearchedSwap",1378889783,5,(yield* V.call("GetEnumPlayer"))));
};
F.Trig_nanduxz_Func005Func001A=function* () {
(yield* V.call("AdjustPlayerStateBJ",300,(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",8)))),"Trig_nanduxz_Func005Func001Func002A"));
};
F.Trig_nanduxz_Func005C=function* () {
return (G.udg_nandujibie === 4);
};
F.Trig_nanduxz_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_xuanze = true;
G.bj_forLoopAIndex = 0;
G.bj_forLoopAIndexEnd = 4;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_nanduxz_Func003Func001C"))) {
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),30.0,("|c00FFFF00玩家一选择的游戏难度为：|c00ff0000" + G.udg_nanduzi[(yield* V.call("GetForLoopIndexA"))])));
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("TriggerExecute",G.gg_trg_zhiyexz));
(yield* V.call("fun_FirstRound"));
G.udg_nandujibie = (yield* V.call("GetForLoopIndexA"));
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",8)))),"Trig_nanduxz_Func003Func001Func005A"));
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
if ((yield* V.call("Trig_nanduxz_Func004C"))) {
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",0)))),"Trig_nanduxz_Func004Func001A"));
}
if ((yield* V.call("Trig_nanduxz_Func005C"))) {
(yield* V.call("ForForce",(yield* V.call("GetPlayersAllies",(yield* V.call("Player",0)))),"Trig_nanduxz_Func005Func001A"));
}
};
F.InitTrig_nanduxz=function* () {
G.gg_trg_nanduxz = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterDialogEventBJ",G.gg_trg_nanduxz,G.udg_nandukuang));
(yield* V.call("TriggerAddAction",G.gg_trg_nanduxz,"Trig_nanduxz_Actions"));
};
F.Trig_zhiye_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_zhiyenm[0] = 1747988529;
G.udg_zhiyenm[1] = 1747988530;
G.udg_zhiyenm[2] = 1747988528;
G.udg_zhiyenm[3] = 1747988532;
G.udg_zhiyenm[4] = 1747988531;
G.udg_zhiyenm[5] = 1747990083;
};
F.InitTrig_zhiye=function* () {
G.gg_trg_zhiye = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_zhiye,"Trig_zhiye_Actions"));
};
F.Trig_zhiyexz_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("DialogSetMessage",G.udg_zhiye[1],"请选择你喜欢的职业"));
G.udg_zhiyexz1[1] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[1],"野蛮人"));
G.udg_zhiyexz1[2] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[1],"猎人"));
G.udg_zhiyexz1[3] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[1],"盗贼"));
G.udg_zhiyexz1[4] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[1],"术士"));
G.udg_zhiyexz1[5] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[1],"游侠"));
G.udg_zhiyexz1[6] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[1],"魔剑士"));
(yield* V.call("DialogDisplayBJ",true,G.udg_zhiye[1],(yield* V.call("Player",0))));
(yield* V.call("DialogSetMessage",G.udg_zhiye[2],"请选择你喜欢的职业"));
G.udg_zhiyexz2[1] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[2],"野蛮人"));
G.udg_zhiyexz2[2] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[2],"猎人"));
G.udg_zhiyexz2[3] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[2],"盗贼"));
G.udg_zhiyexz2[4] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[2],"术士"));
G.udg_zhiyexz2[5] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[2],"游侠"));
G.udg_zhiyexz2[6] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[2],"魔剑士"));
(yield* V.call("DialogDisplayBJ",true,G.udg_zhiye[2],(yield* V.call("Player",1))));
(yield* V.call("DialogSetMessage",G.udg_zhiye[3],"请选择你喜欢的职业"));
G.udg_zhiyexz3[1] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[3],"野蛮人"));
G.udg_zhiyexz3[2] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[3],"猎人"));
G.udg_zhiyexz3[3] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[3],"盗贼"));
G.udg_zhiyexz3[4] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[3],"术士"));
G.udg_zhiyexz3[5] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[3],"游侠"));
G.udg_zhiyexz3[6] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[3],"魔剑士"));
(yield* V.call("DialogDisplayBJ",true,G.udg_zhiye[3],(yield* V.call("Player",2))));
(yield* V.call("DialogSetMessage",G.udg_zhiye[4],"请选择你喜欢的职业"));
G.udg_zhiyexz4[1] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[4],"野蛮人"));
G.udg_zhiyexz4[2] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[4],"猎人"));
G.udg_zhiyexz4[3] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[4],"盗贼"));
G.udg_zhiyexz4[4] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[4],"术士"));
G.udg_zhiyexz4[5] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[4],"游侠"));
G.udg_zhiyexz4[6] = (yield* V.call("DialogAddButtonBJ",G.udg_zhiye[4],"魔剑士"));
(yield* V.call("DialogDisplayBJ",true,G.udg_zhiye[4],(yield* V.call("Player",3))));
(yield* V.call("TriggerSleepAction",120.0));
(yield* V.call("DialogClear",G.udg_zhiye[1]));
(yield* V.call("DialogClear",G.udg_zhiye[2]));
(yield* V.call("DialogClear",G.udg_zhiye[3]));
(yield* V.call("DialogClear",G.udg_zhiye[4]));
};
F.InitTrig_zhiyexz=function* () {
G.gg_trg_zhiyexz = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_zhiyexz));
(yield* V.call("TriggerAddAction",G.gg_trg_zhiyexz,"Trig_zhiyexz_Actions"));
};
F.Trig_xz1_Func002Func001Func001C=function* () {
return ((yield* V.call("GetForLoopIndexA")) === 3);
};
F.Trig_xz1_Func002Func001Func002C=function* () {
return true;
};
F.Trig_xz1_Func002Func001C=function* () {
return ((yield* V.call("GetClickedButtonBJ")) === G.udg_zhiyexz1[(yield* V.call("GetForLoopIndexA"))]);
};
F.Trig_xz1_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 6;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_xz1_Func002Func001C"))) {
if ((yield* V.call("Trig_xz1_Func002Func001Func001C"))) {
G.udg_daozei[1] = true;
}
if ((yield* V.call("Trig_xz1_Func002Func001Func002C"))) {
(yield* V.call("OpenTrigger",(yield* V.call("GetForLoopIndexA"))));
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),((((yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer")))) + "选择了|c0000FF00") + G.udg_zhiyexuanze[((yield* V.call("GetForLoopIndexA")) - 1)]) + "|r职业。")));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_zhiyenm[((yield* V.call("GetForLoopIndexA")) - 1)],(yield* V.call("Player",0)),(yield* V.call("GetRectCenter",G.gg_rct_aa)),G.bj_UNIT_FACING));
(yield* V.call("PanCameraToTimedLocForPlayer",(yield* V.call("Player",0)),(yield* V.call("GetRectCenter",G.gg_rct_aa)),.5));
G.udg_nongming[1] = (yield* V.call("GetLastCreatedUnit"));
G.udg_playerzz[0] = (yield* V.call("GetForLoopIndexA"));
}
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
};
F.InitTrig_xz1=function* () {
G.gg_trg_xz1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterDialogEventBJ",G.gg_trg_xz1,G.udg_zhiye[1]));
(yield* V.call("TriggerAddAction",G.gg_trg_xz1,"Trig_xz1_Actions"));
};
F.Trig_xz2_Func002Func001Func001C=function* () {
return ((yield* V.call("GetForLoopIndexA")) === 3);
};
F.Trig_xz2_Func002Func001Func002C=function* () {
return true;
};
F.Trig_xz2_Func002Func001C=function* () {
return ((yield* V.call("GetClickedButtonBJ")) === G.udg_zhiyexz2[(yield* V.call("GetForLoopIndexA"))]);
};
F.Trig_xz2_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 6;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_xz2_Func002Func001C"))) {
if ((yield* V.call("Trig_xz2_Func002Func001Func001C"))) {
G.udg_daozei[2] = true;
}
if ((yield* V.call("Trig_xz2_Func002Func001Func002C"))) {
(yield* V.call("OpenTrigger",(yield* V.call("GetForLoopIndexA"))));
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),((((yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer")))) + "选择了|c0000FF00") + G.udg_zhiyexuanze[((yield* V.call("GetForLoopIndexA")) - 1)]) + "|r职业。")));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_zhiyenm[((yield* V.call("GetForLoopIndexA")) - 1)],(yield* V.call("Player",1)),(yield* V.call("GetRectCenter",G.gg_rct_bb)),G.bj_UNIT_FACING));
(yield* V.call("PanCameraToTimedLocForPlayer",(yield* V.call("Player",1)),(yield* V.call("GetRectCenter",G.gg_rct_bb)),.5));
G.udg_nongming[2] = (yield* V.call("GetLastCreatedUnit"));
G.udg_playerzz[1] = (yield* V.call("GetForLoopIndexA"));
}
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
};
F.InitTrig_xz2=function* () {
G.gg_trg_xz2 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterDialogEventBJ",G.gg_trg_xz2,G.udg_zhiye[2]));
(yield* V.call("TriggerAddAction",G.gg_trg_xz2,"Trig_xz2_Actions"));
};
F.Trig_xz3_Func002Func001Func001C=function* () {
return ((yield* V.call("GetForLoopIndexA")) === 3);
};
F.Trig_xz3_Func002Func001Func002C=function* () {
return true;
};
F.Trig_xz3_Func002Func001C=function* () {
return ((yield* V.call("GetClickedButtonBJ")) === G.udg_zhiyexz3[(yield* V.call("GetForLoopIndexA"))]);
};
F.Trig_xz3_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 6;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_xz3_Func002Func001C"))) {
if ((yield* V.call("Trig_xz3_Func002Func001Func001C"))) {
G.udg_daozei[3] = true;
}
if ((yield* V.call("Trig_xz3_Func002Func001Func002C"))) {
(yield* V.call("OpenTrigger",(yield* V.call("GetForLoopIndexA"))));
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),((((yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer")))) + "选择了|c0000FF00") + G.udg_zhiyexuanze[((yield* V.call("GetForLoopIndexA")) - 1)]) + "|r职业。")));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_zhiyenm[((yield* V.call("GetForLoopIndexA")) - 1)],(yield* V.call("Player",2)),(yield* V.call("GetRectCenter",G.gg_rct_cc)),G.bj_UNIT_FACING));
(yield* V.call("PanCameraToTimedLocForPlayer",(yield* V.call("Player",2)),(yield* V.call("GetRectCenter",G.gg_rct_cc)),.5));
G.udg_nongming[3] = (yield* V.call("GetLastCreatedUnit"));
G.udg_playerzz[2] = (yield* V.call("GetForLoopIndexA"));
}
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
};
F.InitTrig_xz3=function* () {
G.gg_trg_xz3 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterDialogEventBJ",G.gg_trg_xz3,G.udg_zhiye[3]));
(yield* V.call("TriggerAddAction",G.gg_trg_xz3,"Trig_xz3_Actions"));
};
F.Trig_xz4_Func002Func001Func001C=function* () {
return ((yield* V.call("GetForLoopIndexA")) === 3);
};
F.Trig_xz4_Func002Func001Func002C=function* () {
return true;
};
F.Trig_xz4_Func002Func001C=function* () {
return ((yield* V.call("GetClickedButtonBJ")) === G.udg_zhiyexz4[(yield* V.call("GetForLoopIndexA"))]);
};
F.Trig_xz4_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 6;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_xz4_Func002Func001C"))) {
if ((yield* V.call("Trig_xz4_Func002Func001Func001C"))) {
G.udg_daozei[4] = true;
}
if ((yield* V.call("Trig_xz4_Func002Func001Func002C"))) {
(yield* V.call("OpenTrigger",(yield* V.call("GetForLoopIndexA"))));
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),((((yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer")))) + "选择了|c0000FF00") + G.udg_zhiyexuanze[((yield* V.call("GetForLoopIndexA")) - 1)]) + "|r职业。")));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_zhiyenm[((yield* V.call("GetForLoopIndexA")) - 1)],(yield* V.call("Player",3)),(yield* V.call("GetRectCenter",G.gg_rct_dd)),G.bj_UNIT_FACING));
(yield* V.call("PanCameraToTimedLocForPlayer",(yield* V.call("Player",3)),(yield* V.call("GetRectCenter",G.gg_rct_dd)),.5));
G.udg_nongming[4] = (yield* V.call("GetLastCreatedUnit"));
G.udg_playerzz[3] = (yield* V.call("GetForLoopIndexA"));
}
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
};
F.InitTrig_xz4=function* () {
G.gg_trg_xz4 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterDialogEventBJ",G.gg_trg_xz4,G.udg_zhiye[4]));
(yield* V.call("TriggerAddAction",G.gg_trg_xz4,"Trig_xz4_Actions"));
};
F.Trig_wq_Conditions=function* () {
return ((((((((((((((((((((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894832) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894850)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894851)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894852)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894838)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894837)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894836)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894833)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894834)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894835)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894853)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894854)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894839)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894840)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894841)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894849)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894855)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894856)) && ((yield* V.call("GetItemTypeId",(yield* V.call("GetManipulatedItem")))) !== 1227894857));
};
F.Trig_wq_Actions=function* () {
(yield* V.call("TriggerSleepAction",(yield* V.call("GetRandomReal",60.0,180.0))));
(yield* V.call("UnitAddAbilityBJ",1093681995,(yield* V.call("GetTriggerUnit"))));
};
F.InitTrig_wq=function* () {
G.gg_trg_wq = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_wq,G.EVENT_PLAYER_UNIT_PICKUP_ITEM));
(yield* V.call("TriggerAddCondition",G.gg_trg_wq,(yield* V.call("Condition","Trig_wq_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_wq,"Trig_wq_Actions"));
};
F.Trig_a1_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_a1_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_a2));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_a1=function* () {
G.gg_trg_a1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_a1,G.gg_rct_a1));
(yield* V.call("TriggerAddCondition",G.gg_trg_a1,(yield* V.call("Condition","Trig_a1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_a1,"Trig_a1_Actions"));
};
F.Trig_a2_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_a2_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_a3));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_a2=function* () {
G.gg_trg_a2 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_a2,G.gg_rct_a2));
(yield* V.call("TriggerAddCondition",G.gg_trg_a2,(yield* V.call("Condition","Trig_a2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_a2,"Trig_a2_Actions"));
};
F.Trig_a3_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_a3_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_a4));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_a3=function* () {
G.gg_trg_a3 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_a3,G.gg_rct_a3));
(yield* V.call("TriggerAddCondition",G.gg_trg_a3,(yield* V.call("Condition","Trig_a3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_a3,"Trig_a3_Actions"));
};
F.Trig_a4_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_a4_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_a5));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_a4=function* () {
G.gg_trg_a4 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_a4,G.gg_rct_a4));
(yield* V.call("TriggerAddCondition",G.gg_trg_a4,(yield* V.call("Condition","Trig_a4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_a4,"Trig_a4_Actions"));
};
F.Trig_a5_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_a5_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_a6));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_a5=function* () {
G.gg_trg_a5 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_a5,G.gg_rct_a5));
(yield* V.call("TriggerAddCondition",G.gg_trg_a5,(yield* V.call("Condition","Trig_a5_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_a5,"Trig_a5_Actions"));
};
F.Trig_a6_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_a6_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_a7));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_a6=function* () {
G.gg_trg_a6 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_a6,G.gg_rct_a6));
(yield* V.call("TriggerAddCondition",G.gg_trg_a6,(yield* V.call("Condition","Trig_a6_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_a6,"Trig_a6_Actions"));
};
F.Trig_a7_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_a7_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_a8));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_a7=function* () {
G.gg_trg_a7 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_a7,G.gg_rct_a7));
(yield* V.call("TriggerAddCondition",G.gg_trg_a7,(yield* V.call("Condition","Trig_a7_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_a7,"Trig_a7_Actions"));
};
F.Trig_a8_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_a8_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_a9));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_a8=function* () {
G.gg_trg_a8 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_a8,G.gg_rct_a8));
(yield* V.call("TriggerAddCondition",G.gg_trg_a8,(yield* V.call("Condition","Trig_a8_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_a8,"Trig_a8_Actions"));
};
F.Trig_a9_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_a9_Func003Func001Func001Func002A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个小BOSS，损失|c00ff00002|r点生命！"));
};
F.Trig_a9_Func003Func001Func001Func004A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个大BOSS，损失|c00ff000010|r点生命！"));
};
F.Trig_a9_Func003Func001Func001C=function* () {
return ((yield* V.call("GetUnitTypeId",(yield* V.call("GetTriggerUnit")))) === 1211118934);
};
F.Trig_a9_Func003Func001Func003A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个BOSS，损失|c00ff00005|r点生命！"));
};
F.Trig_a9_Func003Func001C=function* () {
return (G.udg_waves >= 56);
};
F.Trig_a9_Func003C=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetTriggerUnit")),G.UNIT_TYPE_HERO)) !== null);
};
F.Trig_a9_Func004A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,("还剩下|c00ff0000" + ((yield* V.call("I2S",G.udg_lives)) + "|r点生命！"))));
};
F.Trig_a9_Actions=function* () {
(yield* V.call("RemoveUnit",(yield* V.call("GetTriggerUnit"))));
G.udg_lives = (G.udg_lives - 1);
if ((yield* V.call("Trig_a9_Func003C"))) {
if ((yield* V.call("Trig_a9_Func003Func001C"))) {
if ((yield* V.call("Trig_a9_Func003Func001Func001C"))) {
G.udg_lives = (G.udg_lives - 9);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_a9_Func003Func001Func001Func004A"));
} else {
G.udg_lives = (G.udg_lives - 1);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_a9_Func003Func001Func001Func002A"));
}
} else {
G.udg_lives = (G.udg_lives - 4);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_a9_Func003Func001Func003A"));
}
}
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_a9_Func004A"));
(yield* V.call("LeaderboardSetPlayerItemValueBJ",(yield* V.call("Player",10)),(yield* V.call("GetLastCreatedLeaderboard")),G.udg_lives));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_Defeated));
};
F.InitTrig_a9=function* () {
G.gg_trg_a9 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_a9,G.gg_rct_a9));
(yield* V.call("TriggerAddCondition",G.gg_trg_a9,(yield* V.call("Condition","Trig_a9_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_a9,"Trig_a9_Actions"));
};
F.Trig_b1_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_b1_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_b2));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_b1=function* () {
G.gg_trg_b1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_b1,G.gg_rct_b1));
(yield* V.call("TriggerAddCondition",G.gg_trg_b1,(yield* V.call("Condition","Trig_b1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_b1,"Trig_b1_Actions"));
};
F.Trig_b2_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_b2_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_b3));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_b2=function* () {
G.gg_trg_b2 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_b2,G.gg_rct_b2));
(yield* V.call("TriggerAddCondition",G.gg_trg_b2,(yield* V.call("Condition","Trig_b2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_b2,"Trig_b2_Actions"));
};
F.Trig_b3_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_b3_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_b4));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_b3=function* () {
G.gg_trg_b3 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_b3,G.gg_rct_b3));
(yield* V.call("TriggerAddCondition",G.gg_trg_b3,(yield* V.call("Condition","Trig_b3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_b3,"Trig_b3_Actions"));
};
F.Trig_b4_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_b4_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_b5));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_b4=function* () {
G.gg_trg_b4 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_b4,G.gg_rct_b4));
(yield* V.call("TriggerAddCondition",G.gg_trg_b4,(yield* V.call("Condition","Trig_b4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_b4,"Trig_b4_Actions"));
};
F.Trig_b5_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_b5_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_b6));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_b5=function* () {
G.gg_trg_b5 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_b5,G.gg_rct_b5));
(yield* V.call("TriggerAddCondition",G.gg_trg_b5,(yield* V.call("Condition","Trig_b5_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_b5,"Trig_b5_Actions"));
};
F.Trig_b6_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_b6_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_b7));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_b6=function* () {
G.gg_trg_b6 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_b6,G.gg_rct_b6));
(yield* V.call("TriggerAddCondition",G.gg_trg_b6,(yield* V.call("Condition","Trig_b6_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_b6,"Trig_b6_Actions"));
};
F.Trig_b7_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_b7_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_b8));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_b7=function* () {
G.gg_trg_b7 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_b7,G.gg_rct_b7));
(yield* V.call("TriggerAddCondition",G.gg_trg_b7,(yield* V.call("Condition","Trig_b7_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_b7,"Trig_b7_Actions"));
};
F.Trig_b8_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_b8_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_b9));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_b8=function* () {
G.gg_trg_b8 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_b8,G.gg_rct_b8));
(yield* V.call("TriggerAddCondition",G.gg_trg_b8,(yield* V.call("Condition","Trig_b8_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_b8,"Trig_b8_Actions"));
};
F.Trig_b9_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_b9_Func003Func001Func001Func002A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个小BOSS，损失|c00ff00002|r点生命！"));
};
F.Trig_b9_Func003Func001Func001Func004A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个大BOSS，损失|c00ff000010|r点生命！"));
};
F.Trig_b9_Func003Func001Func001C=function* () {
return ((yield* V.call("GetUnitTypeId",(yield* V.call("GetTriggerUnit")))) === 1211118934);
};
F.Trig_b9_Func003Func001Func003A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个BOSS，损失|c00ff00005|r点生命！"));
};
F.Trig_b9_Func003Func001C=function* () {
return (G.udg_waves === 56);
};
F.Trig_b9_Func003C=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetTriggerUnit")),G.UNIT_TYPE_HERO)) !== null);
};
F.Trig_b9_Func004A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,("还剩下|c00ff0000" + ((yield* V.call("I2S",G.udg_lives)) + "|r点生命！"))));
};
F.Trig_b9_Actions=function* () {
(yield* V.call("RemoveUnit",(yield* V.call("GetTriggerUnit"))));
G.udg_lives = (G.udg_lives - 1);
if ((yield* V.call("Trig_b9_Func003C"))) {
if ((yield* V.call("Trig_b9_Func003Func001C"))) {
if ((yield* V.call("Trig_b9_Func003Func001Func001C"))) {
G.udg_lives = (G.udg_lives - 9);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_b9_Func003Func001Func001Func004A"));
} else {
G.udg_lives = (G.udg_lives - 1);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_b9_Func003Func001Func001Func002A"));
}
} else {
G.udg_lives = (G.udg_lives - 4);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_b9_Func003Func001Func003A"));
}
}
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_b9_Func004A"));
(yield* V.call("LeaderboardSetPlayerItemValueBJ",(yield* V.call("Player",10)),(yield* V.call("GetLastCreatedLeaderboard")),G.udg_lives));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_Defeated));
};
F.InitTrig_b9=function* () {
G.gg_trg_b9 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_b9,G.gg_rct_b9));
(yield* V.call("TriggerAddCondition",G.gg_trg_b9,(yield* V.call("Condition","Trig_b9_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_b9,"Trig_b9_Actions"));
};
F.Trig_c1_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_c1_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_c2));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_c1=function* () {
G.gg_trg_c1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_c1,G.gg_rct_c1));
(yield* V.call("TriggerAddCondition",G.gg_trg_c1,(yield* V.call("Condition","Trig_c1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_c1,"Trig_c1_Actions"));
};
F.Trig_c2_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_c2_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_c3));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_c2=function* () {
G.gg_trg_c2 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_c2,G.gg_rct_c2));
(yield* V.call("TriggerAddCondition",G.gg_trg_c2,(yield* V.call("Condition","Trig_c2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_c2,"Trig_c2_Actions"));
};
F.Trig_c3_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_c3_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_c4));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_c3=function* () {
G.gg_trg_c3 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_c3,G.gg_rct_c3));
(yield* V.call("TriggerAddCondition",G.gg_trg_c3,(yield* V.call("Condition","Trig_c3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_c3,"Trig_c3_Actions"));
};
F.Trig_c4_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_c4_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_c5));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_c4=function* () {
G.gg_trg_c4 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_c4,G.gg_rct_c4));
(yield* V.call("TriggerAddCondition",G.gg_trg_c4,(yield* V.call("Condition","Trig_c4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_c4,"Trig_c4_Actions"));
};
F.Trig_c5_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_c5_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_c6));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_c5=function* () {
G.gg_trg_c5 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_c5,G.gg_rct_c5));
(yield* V.call("TriggerAddCondition",G.gg_trg_c5,(yield* V.call("Condition","Trig_c5_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_c5,"Trig_c5_Actions"));
};
F.Trig_c6_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_c6_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_c7));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_c6=function* () {
G.gg_trg_c6 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_c6,G.gg_rct_c6));
(yield* V.call("TriggerAddCondition",G.gg_trg_c6,(yield* V.call("Condition","Trig_c6_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_c6,"Trig_c6_Actions"));
};
F.Trig_c7_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_c7_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_c8));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_c7=function* () {
G.gg_trg_c7 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_c7,G.gg_rct_c7));
(yield* V.call("TriggerAddCondition",G.gg_trg_c7,(yield* V.call("Condition","Trig_c7_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_c7,"Trig_c7_Actions"));
};
F.Trig_c8_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_c8_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_c9));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_c8=function* () {
G.gg_trg_c8 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_c8,G.gg_rct_c8));
(yield* V.call("TriggerAddCondition",G.gg_trg_c8,(yield* V.call("Condition","Trig_c8_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_c8,"Trig_c8_Actions"));
};
F.Trig_c9_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_c9_Func003Func001Func001Func002A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个小BOSS，损失|c00ff00002|r点生命！"));
};
F.Trig_c9_Func003Func001Func001Func004A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个大BOSS，损失|c00ff000010|r点生命！"));
};
F.Trig_c9_Func003Func001Func001C=function* () {
return ((yield* V.call("GetUnitTypeId",(yield* V.call("GetTriggerUnit")))) === 1211118934);
};
F.Trig_c9_Func003Func001Func003A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个BOSS，损失|c00ff00005|r点生命！"));
};
F.Trig_c9_Func003Func001C=function* () {
return (G.udg_waves === 56);
};
F.Trig_c9_Func003C=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetTriggerUnit")),G.UNIT_TYPE_HERO)) !== null);
};
F.Trig_c9_Func004A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,("还剩下|c00ff0000" + ((yield* V.call("I2S",G.udg_lives)) + "|r点生命！"))));
};
F.Trig_c9_Actions=function* () {
(yield* V.call("RemoveUnit",(yield* V.call("GetTriggerUnit"))));
G.udg_lives = (G.udg_lives - 1);
if ((yield* V.call("Trig_c9_Func003C"))) {
if ((yield* V.call("Trig_c9_Func003Func001C"))) {
if ((yield* V.call("Trig_c9_Func003Func001Func001C"))) {
G.udg_lives = (G.udg_lives - 9);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_c9_Func003Func001Func001Func004A"));
} else {
G.udg_lives = (G.udg_lives - 1);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_c9_Func003Func001Func001Func002A"));
}
} else {
G.udg_lives = (G.udg_lives - 4);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_c9_Func003Func001Func003A"));
}
}
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_c9_Func004A"));
(yield* V.call("LeaderboardSetPlayerItemValueBJ",(yield* V.call("Player",10)),(yield* V.call("GetLastCreatedLeaderboard")),G.udg_lives));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_Defeated));
};
F.InitTrig_c9=function* () {
G.gg_trg_c9 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_c9,G.gg_rct_c9));
(yield* V.call("TriggerAddCondition",G.gg_trg_c9,(yield* V.call("Condition","Trig_c9_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_c9,"Trig_c9_Actions"));
};
F.Trig_d1_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_d1_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d2));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_d1=function* () {
G.gg_trg_d1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_d1,G.gg_rct_d1));
(yield* V.call("TriggerAddCondition",G.gg_trg_d1,(yield* V.call("Condition","Trig_d1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_d1,"Trig_d1_Actions"));
};
F.Trig_d2_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_d2_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d3));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_d2=function* () {
G.gg_trg_d2 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_d2,G.gg_rct_d2));
(yield* V.call("TriggerAddCondition",G.gg_trg_d2,(yield* V.call("Condition","Trig_d2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_d2,"Trig_d2_Actions"));
};
F.Trig_d3_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_d3_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d4));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_d3=function* () {
G.gg_trg_d3 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_d3,G.gg_rct_d3));
(yield* V.call("TriggerAddCondition",G.gg_trg_d3,(yield* V.call("Condition","Trig_d3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_d3,"Trig_d3_Actions"));
};
F.Trig_d4_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_d4_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d5));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_d4=function* () {
G.gg_trg_d4 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_d4,G.gg_rct_d4));
(yield* V.call("TriggerAddCondition",G.gg_trg_d4,(yield* V.call("Condition","Trig_d4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_d4,"Trig_d4_Actions"));
};
F.Trig_d5_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_d5_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d6));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_d5=function* () {
G.gg_trg_d5 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_d5,G.gg_rct_d5));
(yield* V.call("TriggerAddCondition",G.gg_trg_d5,(yield* V.call("Condition","Trig_d5_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_d5,"Trig_d5_Actions"));
};
F.Trig_d6_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_d6_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d7));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_d6=function* () {
G.gg_trg_d6 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_d6,G.gg_rct_d6));
(yield* V.call("TriggerAddCondition",G.gg_trg_d6,(yield* V.call("Condition","Trig_d6_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_d6,"Trig_d6_Actions"));
};
F.Trig_d7_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_d7_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d8));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_d7=function* () {
G.gg_trg_d7 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_d7,G.gg_rct_d7));
(yield* V.call("TriggerAddCondition",G.gg_trg_d7,(yield* V.call("Condition","Trig_d7_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_d7,"Trig_d7_Actions"));
};
F.Trig_d8_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_d8_Actions=function* () {
G.udg_Pointd = (yield* V.call("GetRectCenter",G.gg_rct_d9));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_Pointd));
(yield* V.call("RemoveLocation",G.udg_Pointd));
};
F.InitTrig_d8=function* () {
G.gg_trg_d8 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_d8,G.gg_rct_d8));
(yield* V.call("TriggerAddCondition",G.gg_trg_d8,(yield* V.call("Condition","Trig_d8_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_d8,"Trig_d8_Actions"));
};
F.Trig_d9_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_d9_Func003Func001Func001Func002A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个小BOSS，损失|c00ff00002|r点生命！"));
};
F.Trig_d9_Func003Func001Func001Func004A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个大BOSS，损失|c00ff000010|r点生命！"));
};
F.Trig_d9_Func003Func001Func001C=function* () {
return ((yield* V.call("GetUnitTypeId",(yield* V.call("GetTriggerUnit")))) === 1211118934);
};
F.Trig_d9_Func003Func001Func003A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,"跑掉一个BOSS，损失|c00ff00005|r点生命！"));
};
F.Trig_d9_Func003Func001C=function* () {
return (G.udg_waves === 56);
};
F.Trig_d9_Func003C=function* () {
return ((yield* V.call("IsUnitType",(yield* V.call("GetTriggerUnit")),G.UNIT_TYPE_HERO)) !== null);
};
F.Trig_d9_Func004A=function* () {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,("还剩下|c00ff0000" + ((yield* V.call("I2S",G.udg_lives)) + "|r点生命！"))));
};
F.Trig_d9_Actions=function* () {
(yield* V.call("RemoveUnit",(yield* V.call("GetTriggerUnit"))));
G.udg_lives = (G.udg_lives - 1);
if ((yield* V.call("Trig_d9_Func003C"))) {
if ((yield* V.call("Trig_d9_Func003Func001C"))) {
if ((yield* V.call("Trig_d9_Func003Func001Func001C"))) {
G.udg_lives = (G.udg_lives - 9);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_d9_Func003Func001Func001Func004A"));
} else {
G.udg_lives = (G.udg_lives - 1);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_d9_Func003Func001Func001Func002A"));
}
} else {
G.udg_lives = (G.udg_lives - 4);
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_d9_Func003Func001Func003A"));
}
}
(yield* V.call("ForForce",(yield* V.call("GetPlayersAll")),"Trig_d9_Func004A"));
(yield* V.call("LeaderboardSetPlayerItemValueBJ",(yield* V.call("Player",10)),(yield* V.call("GetLastCreatedLeaderboard")),G.udg_lives));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_Defeated));
};
F.InitTrig_d9=function* () {
G.gg_trg_d9 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_d9,G.gg_rct_d9));
(yield* V.call("TriggerAddCondition",G.gg_trg_d9,(yield* V.call("Condition","Trig_d9_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_d9,"Trig_d9_Actions"));
};
F.Trig_AllUnit_Actions=function* () {
G.udg_level1[1] = 1747988556;
G.udg_level1[2] = 1747988560;
G.udg_level1[3] = 1747988552;
G.udg_level1[4] = 1747988562;
G.udg_level1[5] = 1747988814;
G.udg_level1[6] = 1747988805;
G.udg_level1[7] = 1747988815;
G.udg_level1[8] = 1747988818;
G.udg_level1[9] = 1747989057;
G.udg_level1[10] = 1747989068;
G.udg_level1[11] = 1747989071;
G.udg_level1[12] = 1747989073;
G.udg_level1[13] = 1747989322;
G.udg_level1[14] = 1747989326;
G.udg_level1[15] = 1747989325;
G.udg_level1[16] = 1747989329;
G.udg_level1[17] = 1747989556;
G.udg_level1[18] = 1747989573;
G.udg_level1[19] = 1747989578;
G.udg_level1[20] = 1747989581;
G.udg_level1[21] = 1747990085;
G.udg_level1[22] = 1747990094;
G.udg_level1[23] = 1747990096;
G.udg_level1[24] = 1747990100;
G.udg_level2[1] = 1747988555;
G.udg_level2[2] = 1747988559;
G.udg_level2[3] = 1747988558;
G.udg_level2[4] = 1747988561;
G.udg_level2[5] = 1747988806;
G.udg_level2[6] = 1747988819;
G.udg_level2[7] = 1747988816;
G.udg_level2[8] = 1747988821;
G.udg_level2[9] = 1747989058;
G.udg_level2[10] = 1747989067;
G.udg_level2[11] = 1747989070;
G.udg_level2[12] = 1747989072;
G.udg_level2[13] = 1747989314;
G.udg_level2[14] = 1747989327;
G.udg_level2[15] = 1747989313;
G.udg_level2[16] = 1747989328;
G.udg_level2[17] = 1747989557;
G.udg_level2[18] = 1747989574;
G.udg_level2[19] = 1747989577;
G.udg_level2[20] = 1747989580;
G.udg_level2[21] = 1747990086;
G.udg_level2[22] = 1747990093;
G.udg_level2[23] = 1747990097;
G.udg_level2[24] = 1747990101;
G.udg_level2[25] = 1747988564;
G.udg_level2[26] = 1747988568;
G.udg_level2[27] = 1747988784;
G.udg_level2[28] = 1747988785;
G.udg_level2[29] = 1747988804;
G.udg_level2[30] = 1747989044;
G.udg_level2[31] = 1747988825;
G.udg_level2[32] = 1747989042;
G.udg_level2[33] = 1747989060;
G.udg_level2[34] = 1747989076;
G.udg_level2[35] = 1747989082;
G.udg_level2[36] = 1747989080;
G.udg_level2[37] = 1747989316;
G.udg_level2[38] = 1747989331;
G.udg_level2[39] = 1747989337;
G.udg_level2[40] = 1747989335;
G.udg_level2[41] = 1747989561;
G.udg_level2[42] = 1747989583;
G.udg_level2[43] = 1747989587;
G.udg_level2[44] = 1747989589;
G.udg_level2[45] = 1747990088;
G.udg_level2[46] = 1747990103;
G.udg_level2[47] = 1747990106;
G.udg_level2[48] = 1747990323;
G.udg_level3[1] = 1747988550;
G.udg_level3[2] = 1747988554;
G.udg_level3[3] = 1747988557;
G.udg_level3[4] = 1747988553;
G.udg_level3[5] = 1747988807;
G.udg_level3[6] = 1747988820;
G.udg_level3[7] = 1747988817;
G.udg_level3[8] = 1747988822;
G.udg_level3[9] = 1747989059;
G.udg_level3[10] = 1747989066;
G.udg_level3[11] = 1747989069;
G.udg_level3[12] = 1747989074;
G.udg_level3[13] = 1747989315;
G.udg_level3[14] = 1747989324;
G.udg_level3[15] = 1747989323;
G.udg_level3[16] = 1747989330;
G.udg_level3[17] = 1747989558;
G.udg_level3[18] = 1747989575;
G.udg_level3[19] = 1747989576;
G.udg_level3[20] = 1747989579;
G.udg_level3[21] = 1747990084;
G.udg_level3[22] = 1747990095;
G.udg_level3[23] = 1747990098;
G.udg_level3[24] = 1747990099;
G.udg_level3[25] = 1747988565;
G.udg_level3[26] = 1747988567;
G.udg_level3[27] = 1747988570;
G.udg_level3[28] = 1747988788;
G.udg_level3[29] = 1747988809;
G.udg_level3[30] = 1747988826;
G.udg_level3[31] = 1747988824;
G.udg_level3[32] = 1747989040;
G.udg_level3[33] = 1747989061;
G.udg_level3[34] = 1747989075;
G.udg_level3[35] = 1747989081;
G.udg_level3[36] = 1747989078;
G.udg_level3[37] = 1747989317;
G.udg_level3[38] = 1747989332;
G.udg_level3[39] = 1747989338;
G.udg_level3[40] = 1747989334;
G.udg_level3[41] = 1747989560;
G.udg_level3[42] = 1747989584;
G.udg_level3[43] = 1747989582;
G.udg_level3[44] = 1747989590;
G.udg_level3[45] = 1747990089;
G.udg_level3[46] = 1747990102;
G.udg_level3[47] = 1747990105;
G.udg_level3[48] = 1747990322;
G.udg_level3[49] = 1747988792;
G.udg_level3[50] = 1747988793;
G.udg_level3[53] = 1747988811;
G.udg_level3[54] = 1747989046;
G.udg_level3[57] = 1747989063;
G.udg_level3[58] = 1747989298;
G.udg_level3[61] = 1747989319;
G.udg_level3[62] = 1747989553;
G.udg_level3[65] = 1747989572;
G.udg_level3[66] = 1747989592;
G.udg_level3[69] = 1747990091;
G.udg_level3[70] = 1747990325;
G.udg_level4[25] = 1747988566;
G.udg_level4[26] = 1747988563;
G.udg_level4[27] = 1747988569;
G.udg_level4[28] = 1747988789;
G.udg_level4[29] = 1747988810;
G.udg_level4[30] = 1747989043;
G.udg_level4[31] = 1747988823;
G.udg_level4[32] = 1747989041;
G.udg_level4[33] = 1747989049;
G.udg_level4[34] = 1747989077;
G.udg_level4[35] = 1747989296;
G.udg_level4[36] = 1747989079;
G.udg_level4[37] = 1747989318;
G.udg_level4[38] = 1747989333;
G.udg_level4[39] = 1747989552;
G.udg_level4[40] = 1747989336;
G.udg_level4[41] = 1747989569;
G.udg_level4[42] = 1747989585;
G.udg_level4[43] = 1747989588;
G.udg_level4[44] = 1747989591;
G.udg_level4[45] = 1747990087;
G.udg_level4[46] = 1747990104;
G.udg_level4[47] = 1747990320;
G.udg_level4[48] = 1747990321;
G.udg_level4[49] = 1747988790;
G.udg_level4[50] = 1747988787;
G.udg_level4[53] = 1747988812;
G.udg_level4[54] = 1747989045;
G.udg_level4[57] = 1747989064;
G.udg_level4[58] = 1747989297;
G.udg_level4[61] = 1747989321;
G.udg_level4[62] = 1747989300;
G.udg_level4[65] = 1747989559;
G.udg_level4[66] = 1747989593;
G.udg_level4[69] = 1747990090;
G.udg_level4[70] = 1747990324;
G.udg_level5[49] = 1747988791;
G.udg_level5[50] = 1747988786;
G.udg_level5[53] = 1747988808;
G.udg_level5[54] = 1747989047;
G.udg_level5[57] = 1747989065;
G.udg_level5[58] = 1747989299;
G.udg_level5[61] = 1747989320;
G.udg_level5[62] = 1747989554;
G.udg_level5[65] = 1747989570;
G.udg_level5[66] = 1747989571;
G.udg_level5[69] = 1747990092;
G.udg_level5[70] = 1747990326;
};
F.InitTrig_AllUnit=function* () {
G.gg_trg_AllUnit = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_AllUnit,"Trig_AllUnit_Actions"));
};
F.Trig_LevelUp_Conditions=function* () {
return (((((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) !== 1747990323) && ((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) !== 1747990322)) && (yield* V.call("IsUnitType",(yield* V.call("GetKillingUnitBJ")),G.UNIT_TYPE_STRUCTURE))) && (yield* V.call("IsUnitAliveBJ",(yield* V.call("GetKillingUnitBJ")))));
};
F.Trig_LevelUp_Func006Func001Func001C=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === G.udg_level1[(yield* V.call("GetForLoopIndexA"))]) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 0));
};
F.Trig_LevelUp_Func006Func002Func001C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === G.udg_levelT1[G.udg_A]))) {
return false;
}
if ((G.udg_nokuaisumode === false)) {
if ((((yield* V.call("GetUnitAbilityLevel",(yield* V.call("GetKillingUnitBJ")),G.udg_jinengT2[G.udg_A])) !== 0) || ((yield* V.call("GetUnitAbilityLevel",(yield* V.call("GetKillingUnitBJ")),G.udg_jinengT3[G.udg_A])) !== 0))) {
return false;
}
}
return true;
};
F.Trig_LevelUp_Func006C=function* () {
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 150))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 152)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func007Func001Func001Func007Func001C=function* () {
return (G.udg_bd[2] === 1);
};
F.Trig_LevelUp_Func007Func001Func001Func007Func002C=function* () {
return (G.udg_bd[2] === 5);
};
F.Trig_LevelUp_Func007Func001Func001Func007Func003C=function* () {
return (G.udg_bd[2] === 9);
};
F.Trig_LevelUp_Func007Func001Func001Func007Func004C=function* () {
return (G.udg_bd[2] === 13);
};
F.Trig_LevelUp_Func007Func001Func001Func007Func005C=function* () {
return (G.udg_bd[2] === 17);
};
F.Trig_LevelUp_Func007Func001Func001Func007Func006C=function* () {
return (G.udg_bd[2] === 21);
};
F.Trig_LevelUp_jinengxuexi1=function* () {
return ((yield* V.call("GetRandomInt",1,G.udg_jinengsjlv)) === 1);
};
F.Trig_LevelUp_Func007Func001Func001C=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === G.udg_level2[(yield* V.call("GetForLoopIndexB"))]) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 0));
};
F.Trig_LevelUp_Func007C=function* () {
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 250))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 252)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func008Func001Func001C=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === G.udg_levelT1[G.udg_B]) && (!((G.udg_nokuaisumode === false) && ((yield* V.call("GetUnitAbilityLevel",(yield* V.call("GetKillingUnitBJ")),G.udg_jinengT3[G.udg_B])) !== 0))));
};
F.Trig_LevelUp_Func008C=function* () {
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 400))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 402)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func009Func001Func001Func007Func001C=function* () {
return (G.udg_bd[3] === 25);
};
F.Trig_LevelUp_Func009Func001Func001Func007Func002C=function* () {
return (G.udg_bd[3] === 29);
};
F.Trig_LevelUp_Func009Func001Func001Func007Func003C=function* () {
return (G.udg_bd[3] === 33);
};
F.Trig_LevelUp_Func009Func001Func001Func007Func004C=function* () {
return (G.udg_bd[3] === 37);
};
F.Trig_LevelUp_Func009Func001Func001Func007Func005C=function* () {
return (G.udg_bd[3] === 41);
};
F.Trig_LevelUp_Func009Func001Func001Func007Func006C=function* () {
return (G.udg_bd[3] === 45);
};
F.Trig_LevelUp_jinengxuexi2=function* () {
return ((yield* V.call("GetRandomInt",1,G.udg_jinengsjlv)) === 1);
};
F.Trig_LevelUp_Func009Func001Func001C=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === G.udg_level3[G.udg_C]) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 0));
};
F.Trig_LevelUp_Func009C=function* () {
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 500))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 502)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func010Func001Func001Func010Func001C=function* () {
return (G.udg_bd[4] === 49);
};
F.Trig_LevelUp_Func010Func001Func001Func010Func002C=function* () {
return (G.udg_bd[4] === 53);
};
F.Trig_LevelUp_Func010Func001Func001Func010Func003C=function* () {
return (G.udg_bd[4] === 57);
};
F.Trig_LevelUp_Func010Func001Func001Func010Func004C=function* () {
return (G.udg_bd[4] === 61);
};
F.Trig_LevelUp_Func010Func001Func001Func010Func005C=function* () {
return (G.udg_bd[4] === 65);
};
F.Trig_LevelUp_Func010Func001Func001Func010Func006C=function* () {
return (G.udg_bd[4] === 69);
};
F.Trig_LevelUp_jinengxuexi3=function* () {
return ((yield* V.call("GetRandomInt",1,G.udg_jinengsjlv)) === 1);
};
F.Trig_LevelUp_Func010Func001Func001C=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === G.udg_level4[G.udg_D]) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 0));
};
F.Trig_LevelUp_Func010C=function* () {
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 800))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 802)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func011C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747988550))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 1000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 1002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func012C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747988807))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 1000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 1002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func013C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747989059))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 1000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 1002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func014C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747990084))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 800))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 802)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func015C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747989315))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 1000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 1002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func016C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747989558))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 800))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 802)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func017C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747988813))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 5000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 5002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func018C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747988801))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 5000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 5002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func019C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747989062))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 5000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 5002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func020C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747989555))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 5000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 5002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func021C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747989555))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 10000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 10002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func022C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747989586))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 5000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 5002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Func023C=function* () {
if ((!((yield* V.call("GetUnitTypeId",(yield* V.call("GetKillingUnitBJ")))) === 1747990327))) {
return false;
}
if (G.udg_nokuaisumode) {
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) >= 5000))) {
return false;
}
}
if ((!((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) < (G.udg_waves + 5002)))) {
return false;
}
return true;
};
F.Trig_LevelUp_Actions=function* () {
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),((yield* V.call("GetUnitUserData",(yield* V.call("GetKillingUnitBJ")))) + (G.udg_waves + 2))));
if ((yield* V.call("Trig_LevelUp_Func006C"))) {
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 24;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
if ((yield* V.call("Trig_LevelUp_Func006Func001Func001C"))) {
G.udg_bd[1] = (yield* V.call("GetForLoopIndexA"));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),(-1000)));
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("RemoveUnit",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_level2[G.udg_bd[1]],(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.udg_Pointc,(yield* V.call("GetUnitFacing",(yield* V.call("GetKillingUnitBJ"))))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_Pointc,"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_Pointc));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),5.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "|r！")))));
G.udg_bd[1] = 0;
return ;
}
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
G.udg_A = 1;
while (V.guard()) {
if ((G.udg_A > 18)) break;
if ((yield* V.call("Trig_LevelUp_Func006Func002Func001C"))) {
G.udg_bd[1] = G.udg_A;
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("UnitRemoveAbilityBJ",G.udg_jinengT1[G.udg_bd[1]],(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("UnitRemoveAbilityBJ",G.udg_jinengS1[G.udg_bd[1]],(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("UnitAddAbilityBJ",G.udg_jinengT2[G.udg_bd[1]],(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("UnitAddAbilityBJ",G.udg_jinengS2[G.udg_bd[1]],(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_Pointc,"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_Pointc));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),5.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，|c0000FF00能力大大提升了！") + ""))));
G.udg_bd[1] = 0;
return ;
}
G.udg_A = (G.udg_A + 1);
}
}
if ((yield* V.call("Trig_LevelUp_Func007C"))) {
G.bj_forLoopBIndex = 1;
G.bj_forLoopBIndexEnd = 48;
while (V.guard()) {
if ((G.bj_forLoopBIndex > G.bj_forLoopBIndexEnd)) break;
if ((yield* V.call("Trig_LevelUp_Func007Func001Func001C"))) {
G.udg_bd[2] = (yield* V.call("GetForLoopIndexB"));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),(-1000)));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("RemoveUnit",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_level3[G.udg_bd[2]],(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.udg_TempPoi,(yield* V.call("GetUnitFacing",(yield* V.call("GetKillingUnitBJ"))))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),5.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "|r！")))));
if ((yield* V.call("Trig_LevelUp_jinengxuexi1"))) {
if ((yield* V.call("Trig_LevelUp_Func007Func001Func001Func007Func001C"))) {
(yield* V.call("UnitAddAbilityBJ",1093677144,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF削弱(Lv1)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func007Func001Func001Func007Func002C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678131,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF嗜血术(Lv1)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func007Func001Func001Func007Func003C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678426,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF减速(Lv1)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func007Func001Func001Func007Func004C"))) {
(yield* V.call("UnitAddAbilityBJ",1093679189,(yield* V.call("GetLastCreatedUnit"))));
G.udg_keji[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] = (G.udg_keji[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] + 1);
(yield* V.call("SetPlayerTechResearchedSwap",1378889781,G.udg_keji[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))],(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF长弓(Lv1)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func007Func001Func001Func007Func005C"))) {
(yield* V.call("UnitAddAbilityBJ",1093679184,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetLastCreatedUnit")),(-3000)));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF神偷(Lv1)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func007Func001Func001Func007Func006C"))) {
(yield* V.call("UnitAddAbilityBJ",1093682499,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF魔力泉水(Lv1)|r~")))));
}
}
(yield* V.call("AddSpecialEffectLocBJ",G.udg_TempPoi,"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
G.udg_bd[2] = 0;
return ;
}
G.bj_forLoopBIndex = (G.bj_forLoopBIndex + 1);
}
}
if ((yield* V.call("Trig_LevelUp_Func008C"))) {
G.udg_B = 1;
while (V.guard()) {
if ((G.udg_B > 18)) break;
if ((yield* V.call("Trig_LevelUp_Func008Func001Func001C"))) {
G.udg_bd[2] = G.udg_B;
G.udg_Pointd = (yield* V.call("GetUnitLoc",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("UnitRemoveAbilityBJ",G.udg_jinengT2[G.udg_bd[2]],(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("UnitRemoveAbilityBJ",G.udg_jinengS2[G.udg_bd[2]],(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("UnitAddAbilityBJ",G.udg_jinengT3[G.udg_bd[2]],(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("UnitAddAbilityBJ",G.udg_jinengS3[G.udg_bd[2]],(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_Pointd,"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_Pointd));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),5.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，|c0000FF00能力大大提升了！") + ""))));
G.udg_bd[2] = 0;
return ;
}
G.udg_B = (G.udg_B + 1);
}
}
if ((yield* V.call("Trig_LevelUp_Func009C"))) {
G.udg_C = 25;
while (V.guard()) {
if ((G.udg_C > 72)) break;
if ((yield* V.call("Trig_LevelUp_Func009Func001Func001C"))) {
G.udg_bd[3] = G.udg_C;
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),(-1000)));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("RemoveUnit",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_level4[G.udg_bd[3]],(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.udg_TempPoi,(yield* V.call("GetUnitFacing",(yield* V.call("GetKillingUnitBJ"))))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),5.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "|r！")))));
if ((yield* V.call("Trig_LevelUp_jinengxuexi2"))) {
if ((yield* V.call("Trig_LevelUp_Func009Func001Func001Func007Func001C"))) {
(yield* V.call("UnitAddAbilityBJ",1093677653,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF削弱(Lv2)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func009Func001Func001Func007Func002C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678133,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF嗜血术(Lv2)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func009Func001Func001Func007Func003C"))) {
(yield* V.call("UnitAddAbilityBJ",1093677125,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF减速(Lv2)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func009Func001Func001Func007Func004C"))) {
(yield* V.call("UnitAddAbilityBJ",1093679187,(yield* V.call("GetLastCreatedUnit"))));
G.udg_keji[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] = (G.udg_keji[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] + 2);
(yield* V.call("SetPlayerTechResearchedSwap",1378889781,G.udg_keji[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))],(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF长弓(Lv2)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func009Func001Func001Func007Func005C"))) {
(yield* V.call("UnitAddAbilityBJ",1093679183,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetLastCreatedUnit")),(-6000)));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF神偷(Lv2)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func009Func001Func001Func007Func006C"))) {
(yield* V.call("UnitAddAbilityBJ",1093682500,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF魔力泉水(Lv2)|r~")))));
}
}
(yield* V.call("AddSpecialEffectLocBJ",G.udg_TempPoi,"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
G.udg_bd[3] = 0;
return ;
}
G.udg_C = (G.udg_C + 1);
}
}
if ((yield* V.call("Trig_LevelUp_Func010C"))) {
G.udg_D = 49;
while (V.guard()) {
if ((G.udg_D > 72)) break;
if ((yield* V.call("Trig_LevelUp_Func010Func001Func001C"))) {
G.udg_bd[4] = G.udg_D;
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),(-1000)));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("RemoveUnit",(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_level5[G.udg_bd[4]],(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))),G.udg_TempPoi,(yield* V.call("GetUnitFacing",(yield* V.call("GetKillingUnitBJ"))))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_TempPoi,"Abilities\\Spells\\Human\\Thunderclap\\ThunderClapCaster.mdl"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),5.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "|r！")))));
if ((yield* V.call("Trig_LevelUp_jinengxuexi3"))) {
if ((yield* V.call("Trig_LevelUp_Func010Func001Func001Func010Func001C"))) {
(yield* V.call("UnitAddAbilityBJ",1093677652,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),5.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF削弱(Lv3)|r~命真好")))));
}
if ((yield* V.call("Trig_LevelUp_Func010Func001Func001Func010Func002C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678132,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF嗜血术(Lv3)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func010Func001Func001Func010Func003C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678640,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF减速(Lv3)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func010Func001Func001Func010Func004C"))) {
(yield* V.call("UnitAddAbilityBJ",1093679188,(yield* V.call("GetLastCreatedUnit"))));
G.udg_keji[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] = (G.udg_keji[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] + 3);
(yield* V.call("SetPlayerTechResearchedSwap",1378889781,G.udg_keji[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))],(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF长弓(Lv3)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func010Func001Func001Func010Func005C"))) {
(yield* V.call("UnitAddAbilityBJ",1093679182,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetLastCreatedUnit")),(-9000)));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF神偷(Lv3)|r~")))));
}
if ((yield* V.call("Trig_LevelUp_Func010Func001Func001Func010Func006C"))) {
(yield* V.call("UnitAddAbilityBJ",1093682498,(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，晋升为|c0000FF00") + ((yield* V.call("GetUnitName",(yield* V.call("GetLastCreatedUnit")))) + "，一不小心领悟了|c00FF00FF魔力泉水(Lv3)|r~")))));
}
}
G.udg_bd[4] = 0;
return ;
}
G.udg_D = (G.udg_D + 1);
}
}
if ((yield* V.call("Trig_LevelUp_Func011C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678145,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),1054));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF毁天灭地(牺牲)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func012C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678146,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),1054));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF舍身取义(牺牲)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func013C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678642,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),1054));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF苦思冥想(牺牲)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func014C"))) {
(yield* V.call("UnitAddAbilityBJ",1093682501,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),864));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF愤怒(牺牲)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func015C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093677141,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("UnitAddAbilityBJ",1093678916,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),1054));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF超级咆哮(牺牲)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func016C"))) {
(yield* V.call("UnitAddAbilityBJ",1093679185,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),864));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),10.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF治愈(牺牲)|r~"))));
(yield* V.call("TriggerSleepAction",15.0));
(yield* V.call("TriggerExecute",G.gg_trg_DZzhiyutxt));
}
if ((yield* V.call("Trig_LevelUp_Func017C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678158,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),5064));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF神拳(强化)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func018C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678159,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),5064));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF死亡契约(夺命)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func019C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678641,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),5064));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF魔之心(强化)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func020C"))) {
(yield* V.call("UnitAddAbilityBJ",1093678915,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),5064));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF法术暴击(强化)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func021C"))) {
(yield* V.call("UnitAddAbilityBJ",1093679415,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),10064));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF强弩(光环)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func022C"))) {
(yield* V.call("UnitAddAbilityBJ",1093679186,(yield* V.call("GetKillingUnitBJ"))));
G.udg_gaolidai[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ"))))))] = true;
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),5064));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF高利贷(利滚利)|r~"))));
}
if ((yield* V.call("Trig_LevelUp_Func023C"))) {
(yield* V.call("UnitAddAbilityBJ",1093682489,(yield* V.call("GetKillingUnitBJ"))));
(yield* V.call("SetUnitUserData",(yield* V.call("GetKillingUnitBJ")),5064));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),15.0,(((yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",(yield* V.call("GetKillingUnitBJ")))))) + "的一名|c00FFFF00") + (((yield* V.call("GetUnitName",(yield* V.call("GetKillingUnitBJ")))) + "|r杀敌英勇，") + "，领悟了|c00FF00FF魔力图腾(吸收)|r~"))));
}
};
F.InitTrig_LevelUp=function* () {
G.gg_trg_LevelUp = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_LevelUp,(yield* V.call("Player",8)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_LevelUp,(yield* V.call("Player",9)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_LevelUp,(yield* V.call("Player",10)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerRegisterPlayerUnitEventSimple",G.gg_trg_LevelUp,(yield* V.call("Player",11)),G.EVENT_PLAYER_UNIT_DEATH));
(yield* V.call("TriggerAddCondition",G.gg_trg_LevelUp,(yield* V.call("Condition","Trig_LevelUp_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_LevelUp,"Trig_LevelUp_Actions"));
};
F.Trig_GetP1_Func001001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP1_Func001Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",0))));
};
F.Trig_GetP1_Func001Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP1_Func001Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_GetP1_Func001Func002001003001001001")),(yield* V.call("Trig_GetP1_Func001Func002001003001001002"))));
};
F.Trig_GetP1_Func001A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",0)))) + "|c0000FF00的金币又被俺们瓜分啦~(*^__^*) ")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",0)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP1_Func001Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_GetP1_Actions=function* () {
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP1_Func001001001")))),"Trig_GetP1_Func001A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",0)),G.PLAYER_STATE_RESOURCE_GOLD,0));
};
F.InitTrig_GetP1=function* () {
G.gg_trg_GetP1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_GetP1));
(yield* V.call("TriggerRegisterTimerEventPeriodic",G.gg_trg_GetP1,120.0));
(yield* V.call("TriggerAddAction",G.gg_trg_GetP1,"Trig_GetP1_Actions"));
};
F.Trig_GetP2_Func001001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP2_Func001Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",0))));
};
F.Trig_GetP2_Func001Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP2_Func001Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_GetP2_Func001Func002001003001001001")),(yield* V.call("Trig_GetP2_Func001Func002001003001001002"))));
};
F.Trig_GetP2_Func001A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",1)))) + "|c0000FF00的金币又被俺们瓜分啦~哈哈")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",1)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP2_Func001Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_GetP2_Actions=function* () {
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP2_Func001001001")))),"Trig_GetP2_Func001A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",1)),G.PLAYER_STATE_RESOURCE_GOLD,0));
};
F.InitTrig_GetP2=function* () {
G.gg_trg_GetP2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_GetP2));
(yield* V.call("TriggerRegisterTimerEventPeriodic",G.gg_trg_GetP2,120.0));
(yield* V.call("TriggerAddAction",G.gg_trg_GetP2,"Trig_GetP2_Actions"));
};
F.Trig_GetP3_Func001001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP3_Func001Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",0))));
};
F.Trig_GetP3_Func001Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP3_Func001Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_GetP3_Func001Func002001003001001001")),(yield* V.call("Trig_GetP3_Func001Func002001003001001002"))));
};
F.Trig_GetP3_Func001A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",2)))) + "|c0000FF00的金币又被俺们瓜分啦~嘿嘿")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",2)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP3_Func001Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_GetP3_Actions=function* () {
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP3_Func001001001")))),"Trig_GetP3_Func001A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",2)),G.PLAYER_STATE_RESOURCE_GOLD,0));
};
F.InitTrig_GetP3=function* () {
G.gg_trg_GetP3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_GetP3));
(yield* V.call("TriggerRegisterTimerEventPeriodic",G.gg_trg_GetP3,120.0));
(yield* V.call("TriggerAddAction",G.gg_trg_GetP3,"Trig_GetP3_Actions"));
};
F.Trig_GetP4_Func001001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP4_Func001Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",0))));
};
F.Trig_GetP4_Func001Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP4_Func001Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_GetP4_Func001Func002001003001001001")),(yield* V.call("Trig_GetP4_Func001Func002001003001001002"))));
};
F.Trig_GetP4_Func001A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",3)))) + "|c0000FF00的金币又被俺们瓜分啦~呵呵")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",3)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP4_Func001Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_GetP4_Actions=function* () {
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP4_Func001001001")))),"Trig_GetP4_Func001A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",3)),G.PLAYER_STATE_RESOURCE_GOLD,0));
};
F.InitTrig_GetP4=function* () {
G.gg_trg_GetP4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_GetP4));
(yield* V.call("TriggerRegisterTimerEventPeriodic",G.gg_trg_GetP4,120.0));
(yield* V.call("TriggerAddAction",G.gg_trg_GetP4,"Trig_GetP4_Actions"));
};
F.Trig_GetP5_Func001001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP5_Func001Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",0))));
};
F.Trig_GetP5_Func001Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_GetP5_Func001Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_GetP5_Func001Func002001003001001001")),(yield* V.call("Trig_GetP5_Func001Func002001003001001002"))));
};
F.Trig_GetP5_Func001A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",4)))) + "|c0000FF00的金币又被俺们瓜分啦~HoHo")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",4)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP5_Func001Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_GetP5_Actions=function* () {
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_GetP5_Func001001001")))),"Trig_GetP5_Func001A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",4)),G.PLAYER_STATE_RESOURCE_GOLD,0));
};
F.InitTrig_GetP5=function* () {
G.gg_trg_GetP5 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_GetP5));
(yield* V.call("TriggerRegisterTimerEventPeriodic",G.gg_trg_GetP5,120.0));
(yield* V.call("TriggerAddAction",G.gg_trg_GetP5,"Trig_GetP5_Actions"));
};
F.Trig_P1Leave_Func002001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P1Leave_Func002Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",0))));
};
F.Trig_P1Leave_Func002Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P1Leave_Func002Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_P1Leave_Func002Func002001003001001001")),(yield* V.call("Trig_P1Leave_Func002Func002001003001001002"))));
};
F.Trig_P1Leave_Func002A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",0)))) + "离开了游戏，他的金币被俺们瓜分啦~每隔2分钟都会从他那瓜分金币~")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",0)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P1Leave_Func002Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_P1Leave_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P1Leave_Func002001001")))),"Trig_P1Leave_Func002A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",0)),G.PLAYER_STATE_RESOURCE_GOLD,0));
(yield* V.call("EnableTrigger",G.gg_trg_GetP1));
};
F.InitTrig_P1Leave=function* () {
G.gg_trg_P1Leave = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerEventLeave",G.gg_trg_P1Leave,(yield* V.call("Player",0))));
(yield* V.call("TriggerAddAction",G.gg_trg_P1Leave,"Trig_P1Leave_Actions"));
};
F.Trig_P2Leave_Func002001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P2Leave_Func002Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",1))));
};
F.Trig_P2Leave_Func002Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P2Leave_Func002Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_P2Leave_Func002Func002001003001001001")),(yield* V.call("Trig_P2Leave_Func002Func002001003001001002"))));
};
F.Trig_P2Leave_Func002A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",1)))) + "离开了游戏，他的金币被俺们瓜分啦~每隔2分钟都会从他那瓜分金币~")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",1)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P2Leave_Func002Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_P2Leave_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P2Leave_Func002001001")))),"Trig_P2Leave_Func002A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",1)),G.PLAYER_STATE_RESOURCE_GOLD,0));
(yield* V.call("EnableTrigger",G.gg_trg_GetP2));
};
F.InitTrig_P2Leave=function* () {
G.gg_trg_P2Leave = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerEventLeave",G.gg_trg_P2Leave,(yield* V.call("Player",1))));
(yield* V.call("TriggerAddAction",G.gg_trg_P2Leave,"Trig_P2Leave_Actions"));
};
F.Trig_P3Leave_Func002001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P3Leave_Func002Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",2))));
};
F.Trig_P3Leave_Func002Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P3Leave_Func002Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_P3Leave_Func002Func002001003001001001")),(yield* V.call("Trig_P3Leave_Func002Func002001003001001002"))));
};
F.Trig_P3Leave_Func002A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",2)))) + "离开了游戏，他的金币被俺们瓜分啦~每隔2分钟都会从他那瓜分金币~")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",2)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P3Leave_Func002Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_P3Leave_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P3Leave_Func002001001")))),"Trig_P3Leave_Func002A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",2)),G.PLAYER_STATE_RESOURCE_GOLD,0));
(yield* V.call("EnableTrigger",G.gg_trg_GetP3));
};
F.InitTrig_P3Leave=function* () {
G.gg_trg_P3Leave = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerEventLeave",G.gg_trg_P3Leave,(yield* V.call("Player",2))));
(yield* V.call("TriggerAddAction",G.gg_trg_P3Leave,"Trig_P3Leave_Actions"));
};
F.Trig_P4Leave_Func002001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P4Leave_Func002Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",3))));
};
F.Trig_P4Leave_Func002Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P4Leave_Func002Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_P4Leave_Func002Func002001003001001001")),(yield* V.call("Trig_P4Leave_Func002Func002001003001001002"))));
};
F.Trig_P4Leave_Func002A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",3)))) + "离开了游戏，他的金币被俺们瓜分啦~每隔2分钟都会从他那瓜分金币~")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",3)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P4Leave_Func002Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_P4Leave_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P4Leave_Func002001001")))),"Trig_P4Leave_Func002A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",3)),G.PLAYER_STATE_RESOURCE_GOLD,0));
(yield* V.call("EnableTrigger",G.gg_trg_GetP4));
};
F.InitTrig_P4Leave=function* () {
G.gg_trg_P4Leave = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerEventLeave",G.gg_trg_P4Leave,(yield* V.call("Player",3))));
(yield* V.call("TriggerAddAction",G.gg_trg_P4Leave,"Trig_P4Leave_Actions"));
};
F.Trig_P5Leave_Func002001001=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P5Leave_Func002Func002001003001001001=function* () {
return (yield* V.call("IsPlayerAlly",(yield* V.call("GetFilterPlayer")),(yield* V.call("Player",4))));
};
F.Trig_P5Leave_Func002Func002001003001001002=function* () {
return ((yield* V.call("GetPlayerSlotState",(yield* V.call("GetFilterPlayer")))) === G.PLAYER_SLOT_STATE_PLAYING);
};
F.Trig_P5Leave_Func002Func002001003001001=function* () {
return (yield* V.call("GetBooleanAnd",(yield* V.call("Trig_P5Leave_Func002Func002001003001001001")),(yield* V.call("Trig_P5Leave_Func002Func002001003001001002"))));
};
F.Trig_P5Leave_Func002A=function* () {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetEnumPlayer")),0,0,15.0,((yield* V.call("GetPlayerName",(yield* V.call("Player",4)))) + "离开了游戏，他的金币被俺们瓜分啦~每隔2分钟都会从他那瓜分金币~")));
(yield* V.call("AdjustPlayerStateBJ",V.idiv((yield* V.call("GetPlayerState",(yield* V.call("Player",4)),G.PLAYER_STATE_RESOURCE_GOLD)),(yield* V.call("CountPlayersInForceBJ",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P5Leave_Func002Func002001003001001"))))))),(yield* V.call("GetEnumPlayer")),G.PLAYER_STATE_RESOURCE_GOLD));
};
F.Trig_P5Leave_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("ForForce",(yield* V.call("GetPlayersMatching",(yield* V.call("Condition","Trig_P5Leave_Func002001001")))),"Trig_P5Leave_Func002A"));
(yield* V.call("SetPlayerStateBJ",(yield* V.call("Player",4)),G.PLAYER_STATE_RESOURCE_GOLD,0));
(yield* V.call("EnableTrigger",G.gg_trg_GetP5));
};
F.InitTrig_P5Leave=function* () {
G.gg_trg_P5Leave = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerEventLeave",G.gg_trg_P5Leave,(yield* V.call("Player",4))));
(yield* V.call("TriggerAddAction",G.gg_trg_P5Leave,"Trig_P5Leave_Actions"));
};
F.Trig_luanpao1_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_luanpao1_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_a8));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_luanpao1=function* () {
G.gg_trg_luanpao1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_luanpao1,G.EVENT_PLAYER_UNIT_ISSUED_ORDER));
(yield* V.call("TriggerAddCondition",G.gg_trg_luanpao1,(yield* V.call("Condition","Trig_luanpao1_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_luanpao1,"Trig_luanpao1_Actions"));
};
F.Trig_luanpao2_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_luanpao2_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_b8));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_luanpao2=function* () {
G.gg_trg_luanpao2 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_luanpao2,G.EVENT_PLAYER_UNIT_ISSUED_ORDER));
(yield* V.call("TriggerAddCondition",G.gg_trg_luanpao2,(yield* V.call("Condition","Trig_luanpao2_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_luanpao2,"Trig_luanpao2_Actions"));
};
F.Trig_luanpao3_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_luanpao3_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_c8));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_luanpao3=function* () {
G.gg_trg_luanpao3 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_luanpao3,G.EVENT_PLAYER_UNIT_ISSUED_ORDER));
(yield* V.call("TriggerAddCondition",G.gg_trg_luanpao3,(yield* V.call("Condition","Trig_luanpao3_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_luanpao3,"Trig_luanpao3_Actions"));
};
F.Trig_luanpao4_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_luanpao4_Actions=function* () {
G.udg_PointE = (yield* V.call("GetRectCenter",G.gg_rct_d8));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetTriggerUnit")),851986,G.udg_PointE));
(yield* V.call("RemoveLocation",G.udg_PointE));
};
F.InitTrig_luanpao4=function* () {
G.gg_trg_luanpao4 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_luanpao4,G.EVENT_PLAYER_UNIT_ISSUED_ORDER));
(yield* V.call("TriggerAddCondition",G.gg_trg_luanpao4,(yield* V.call("Condition","Trig_luanpao4_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_luanpao4,"Trig_luanpao4_Actions"));
};
F.Trig_luanpaoE_Func001C=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_luanpaoE_Func002C=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_luanpaoE_Func003C=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_luanpaoE_Func004C=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_luanpaoE_Actions=function* () {
if ((yield* V.call("Trig_luanpaoE_Func001C"))) {
(yield* V.call("SetUnitPositionLoc",(yield* V.call("GetTriggerUnit")),(yield* V.call("GetRectCenter",G.gg_rct_a5))));
}
if ((yield* V.call("Trig_luanpaoE_Func002C"))) {
(yield* V.call("SetUnitPositionLoc",(yield* V.call("GetTriggerUnit")),(yield* V.call("GetRectCenter",G.gg_rct_b5))));
}
if ((yield* V.call("Trig_luanpaoE_Func003C"))) {
(yield* V.call("SetUnitPositionLoc",(yield* V.call("GetTriggerUnit")),(yield* V.call("GetRectCenter",G.gg_rct_c5))));
}
if ((yield* V.call("Trig_luanpaoE_Func004C"))) {
(yield* V.call("SetUnitPositionLoc",(yield* V.call("GetTriggerUnit")),(yield* V.call("GetRectCenter",G.gg_rct_d5))));
}
};
F.InitTrig_luanpaoE=function* () {
G.gg_trg_luanpaoE = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_luanpaoE,G.gg_rct_ee));
(yield* V.call("TriggerAddAction",G.gg_trg_luanpaoE,"Trig_luanpaoE_Actions"));
};
F.Trig_luanpaoA20_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",8)));
};
F.Trig_luanpaoA20_Actions=function* () {
(yield* V.call("SetUnitPositionLoc",(yield* V.call("GetTriggerUnit")),(yield* V.call("GetRectCenter",G.gg_rct_a6))));
};
F.InitTrig_luanpaoA20=function* () {
G.gg_trg_luanpaoA20 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_luanpaoA20,G.gg_rct_aa20));
(yield* V.call("TriggerAddCondition",G.gg_trg_luanpaoA20,(yield* V.call("Condition","Trig_luanpaoA20_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_luanpaoA20,"Trig_luanpaoA20_Actions"));
};
F.Trig_luanpaoB20_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",9)));
};
F.Trig_luanpaoB20_Actions=function* () {
(yield* V.call("SetUnitPositionLoc",(yield* V.call("GetTriggerUnit")),(yield* V.call("GetRectCenter",G.gg_rct_b6))));
};
F.InitTrig_luanpaoB20=function* () {
G.gg_trg_luanpaoB20 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_luanpaoB20,G.gg_rct_bb20));
(yield* V.call("TriggerAddCondition",G.gg_trg_luanpaoB20,(yield* V.call("Condition","Trig_luanpaoB20_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_luanpaoB20,"Trig_luanpaoB20_Actions"));
};
F.Trig_luanpaoC20_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",10)));
};
F.Trig_luanpaoC20_Actions=function* () {
(yield* V.call("SetUnitPositionLoc",(yield* V.call("GetTriggerUnit")),(yield* V.call("GetRectCenter",G.gg_rct_c6))));
};
F.InitTrig_luanpaoC20=function* () {
G.gg_trg_luanpaoC20 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_luanpaoC20,G.gg_rct_cc20));
(yield* V.call("TriggerAddCondition",G.gg_trg_luanpaoC20,(yield* V.call("Condition","Trig_luanpaoC20_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_luanpaoC20,"Trig_luanpaoC20_Actions"));
};
F.Trig_luanpaoD20_Conditions=function* () {
return ((yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("Player",11)));
};
F.Trig_luanpaoD20_Actions=function* () {
(yield* V.call("SetUnitPositionLoc",(yield* V.call("GetTriggerUnit")),(yield* V.call("GetRectCenter",G.gg_rct_d6))));
};
F.InitTrig_luanpaoD20=function* () {
G.gg_trg_luanpaoD20 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterEnterRectSimple",G.gg_trg_luanpaoD20,G.gg_rct_dd20));
(yield* V.call("TriggerAddCondition",G.gg_trg_luanpaoD20,(yield* V.call("Condition","Trig_luanpaoD20_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_luanpaoD20,"Trig_luanpaoD20_Actions"));
};
F.Trig_zidingyi75_Func002C=function* () {
return ((((((((yield* V.call("GetUnitTypeId",(yield* V.call("GetConstructedStructure")))) === 1747989578) || ((yield* V.call("GetUnitTypeId",(yield* V.call("GetConstructedStructure")))) === 1747988818)) || ((yield* V.call("GetUnitTypeId",(yield* V.call("GetConstructedStructure")))) === 1747989326)) || ((yield* V.call("GetUnitTypeId",(yield* V.call("GetConstructedStructure")))) === 1747988552)) || ((yield* V.call("GetUnitTypeId",(yield* V.call("GetConstructedStructure")))) === 1747988560)) || ((yield* V.call("GetUnitTypeId",(yield* V.call("GetConstructedStructure")))) === 1747989071)) || ((yield* V.call("GetUnitTypeId",(yield* V.call("GetConstructedStructure")))) === 1747990340));
};
F.Trig_zidingyi75_Conditions=function* () {
return (yield* V.call("Trig_zidingyi75_Func002C"));
};
F.Trig_zidingyi75_Actions=function* () {
(yield* V.call("SetUnitUserData",(yield* V.call("GetConstructedStructure")),100));
};
F.InitTrig_zidingyi75=function* () {
G.gg_trg_zidingyi75 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_zidingyi75,G.EVENT_PLAYER_UNIT_CONSTRUCT_FINISH));
(yield* V.call("TriggerAddCondition",G.gg_trg_zidingyi75,(yield* V.call("Condition","Trig_zidingyi75_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_zidingyi75,"Trig_zidingyi75_Actions"));
};
F.Trig_Lv1Delete_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("DestroyTrigger",G.gg_trg_DZbinggongchang1));
(yield* V.call("DestroyTrigger",G.gg_trg_DZbinggongchang2));
(yield* V.call("DestroyTrigger",G.gg_trg_DZbinggongchang3));
(yield* V.call("DestroyTrigger",G.gg_trg_DZshandianfengbao1));
(yield* V.call("DestroyTrigger",G.gg_trg_DZshandianfengbao2));
(yield* V.call("DestroyTrigger",G.gg_trg_DZshandianfengbao3));
(yield* V.call("DestroyTrigger",G.gg_trg_LRjingxia1));
(yield* V.call("DestroyTrigger",G.gg_trg_LRjingxia2));
(yield* V.call("DestroyTrigger",G.gg_trg_LRjingxia3));
(yield* V.call("DestroyTrigger",G.gg_trg_LRshuren1));
(yield* V.call("DestroyTrigger",G.gg_trg_LRshuren2));
(yield* V.call("DestroyTrigger",G.gg_trg_LRshuren3));
(yield* V.call("DestroyTrigger",G.gg_trg_SSbaofengxue1));
(yield* V.call("DestroyTrigger",G.gg_trg_SSbaofengxue2));
(yield* V.call("DestroyTrigger",G.gg_trg_SSbaofengxue3));
(yield* V.call("DestroyTrigger",G.gg_trg_SSshuiyuansu1));
(yield* V.call("DestroyTrigger",G.gg_trg_SSshuiyuansu2));
(yield* V.call("DestroyTrigger",G.gg_trg_SSshuiyuansu3));
(yield* V.call("DestroyTrigger",G.gg_trg_YMchongjibo1));
(yield* V.call("DestroyTrigger",G.gg_trg_YMchongjibo2));
(yield* V.call("DestroyTrigger",G.gg_trg_YMchongjibo3));
(yield* V.call("DestroyTrigger",G.gg_trg_YXdaolunzhan1));
(yield* V.call("DestroyTrigger",G.gg_trg_YXdaolunzhan2));
(yield* V.call("DestroyTrigger",G.gg_trg_YXdaolunzhan3));
};
F.InitTrig_Lv1Delete=function* () {
G.gg_trg_Lv1Delete = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_Lv1Delete));
(yield* V.call("TriggerAddAction",G.gg_trg_Lv1Delete,"Trig_Lv1Delete_Actions"));
};
F.Trig_dengluwow8_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.gg_unit_Hblm_0011,"作者：恋风吹雪(searchlove)",null,"|c0000FF00最新地图请到http://bbs.wow8.org/ 下载。",G.bj_TIMETYPE_SET,10.0,true));
};
F.InitTrig_dengluwow8=function* () {
G.gg_trg_dengluwow8 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_dengluwow8));
(yield* V.call("TriggerAddAction",G.gg_trg_dengluwow8,"Trig_dengluwow8_Actions"));
};
F.Trig_donghua_Func016A=function* () {
(yield* V.call("RemoveDestructable",(yield* V.call("GetEnumDestructable"))));
};
F.Trig_donghua_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
(yield* V.call("TriggerExecute",G.gg_trg_BlueAndRed));
(yield* V.call("TriggerSleepAction",8.0));
(yield* V.call("TriggerExecute",G.gg_trg_YellowAndGreen));
(yield* V.call("TriggerSleepAction",8.0));
(yield* V.call("TriggerExecute",G.gg_trg_Black));
(yield* V.call("TriggerSleepAction",8.0));
G.udg_E = 1;
while (V.guard()) {
if ((G.udg_E > 5)) break;
(yield* V.call("CreateNUnitsAtLoc",1,1697656910,(yield* V.call("Player",G.PLAYER_NEUTRAL_AGGRESSIVE)),G.udg_jingling[G.udg_E],G.bj_UNIT_FACING));
G.udg_aoyunjingling[G.udg_E] = (yield* V.call("GetLastCreatedUnit"));
G.udg_Pointa = (yield* V.call("GetUnitLoc",(yield* V.call("GetLastCreatedUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetLastCreatedUnit")),852089,G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointa));
G.udg_E = (G.udg_E + 1);
}
(yield* V.call("TriggerSleepAction",3.0));
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 5;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
(yield* V.call("CreateNUnitsAtLoc",1,G.udg_zhiyenm[((yield* V.call("GetForLoopIndexA")) - 1)],(yield* V.call("ConvertedPlayer",G.bj_forLoopAIndex)),G.udg_jingling[G.bj_forLoopAIndex],G.bj_UNIT_FACING));
(yield* V.call("AddSpecialEffectLocBJ",(yield* V.call("GetUnitLoc",(yield* V.call("GetLastCreatedUnit")))),"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
G.udg_nongming[(yield* V.call("GetForLoopIndexA"))] = (yield* V.call("GetLastCreatedUnit"));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
G.bj_forLoopAIndex = 1;
G.bj_forLoopAIndexEnd = 5;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
G.udg_TempPoi = (yield* V.call("GetUnitLoc",G.udg_nongming[G.bj_forLoopAIndex]));
(yield* V.call("CreateItemLoc",1227894832,G.udg_TempPoi));
(yield* V.call("IssueNeutralTargetOrder",(yield* V.call("ConvertedPlayer",(yield* V.call("GetForLoopIndexA")))),G.udg_nongming[G.bj_forLoopAIndex],"smart",G.bj_lastCreatedItem));
(yield* V.call("TriggerSleepAction",.1));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("TriggerExecute",G.gg_trg_Dianhuoju));
(yield* V.call("TransmissionFromUnitWithNameBJ",(yield* V.call("GetPlayersAll")),G.gg_unit_Hblm_0011,"作者：恋风吹雪(searchlove)",null,"|c0000FF00接下来有请人类来自五大洲的5名勇士为奥运五环点燃火炬。",G.bj_TIMETYPE_SET,15.0,true));
(yield* V.call("TriggerSleepAction",23.0));
(yield* V.call("EnumDestructablesInRectAll",G.gg_rct_AoyunDelete,"Trig_donghua_Func016A"));
(yield* V.call("TriggerSleepAction",2.0));
};
F.InitTrig_donghua=function* () {
G.gg_trg_donghua = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_donghua));
(yield* V.call("TriggerAddAction",G.gg_trg_donghua,"Trig_donghua_Actions"));
};
F.Trig_BlueAndRed_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.bj_forLoopAIndex = 0;
G.bj_forLoopAIndexEnd = 44;
while (V.guard()) {
if ((G.bj_forLoopAIndex > G.bj_forLoopAIndexEnd)) break;
G.udg_Pointa = (yield* V.call("PolarProjectionBJ",G.udg_jingling[3],550.0,(yield* V.call("I2R",((yield* V.call("GetForLoopIndexA")) * 8)))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656909,(yield* V.call("Player",1)),G.udg_Pointa,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointa));
G.udg_Pointb = (yield* V.call("PolarProjectionBJ",G.udg_jingling[2],550.0,(yield* V.call("I2R",(((yield* V.call("GetForLoopIndexA")) * (-8)) + 180)))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656908,(yield* V.call("Player",0)),G.udg_Pointb,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointb));
(yield* V.call("TriggerSleepAction",.1));
G.bj_forLoopAIndex = (G.bj_forLoopAIndex + 1);
}
};
F.InitTrig_BlueAndRed=function* () {
G.gg_trg_BlueAndRed = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_BlueAndRed));
(yield* V.call("TriggerAddAction",G.gg_trg_BlueAndRed,"Trig_BlueAndRed_Actions"));
};
F.Trig_YellowAndGreen_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.bj_forLoopBIndex = 0;
G.bj_forLoopBIndexEnd = 44;
while (V.guard()) {
if ((G.bj_forLoopBIndex > G.bj_forLoopBIndexEnd)) break;
G.udg_Pointc = (yield* V.call("PolarProjectionBJ",G.udg_jingling[4],550.0,(yield* V.call("I2R",(((yield* V.call("GetForLoopIndexB")) * 8) + 90)))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656905,(yield* V.call("Player",4)),G.udg_Pointc,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointc));
G.udg_Pointd = (yield* V.call("PolarProjectionBJ",G.udg_jingling[1],550.0,(yield* V.call("I2R",(((yield* V.call("GetForLoopIndexB")) * (-8)) + 90)))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656907,(yield* V.call("Player",2)),G.udg_Pointd,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_Pointd));
(yield* V.call("TriggerSleepAction",.1));
G.bj_forLoopBIndex = (G.bj_forLoopBIndex + 1);
}
};
F.InitTrig_YellowAndGreen=function* () {
G.gg_trg_YellowAndGreen = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_YellowAndGreen));
(yield* V.call("TriggerAddAction",G.gg_trg_YellowAndGreen,"Trig_YellowAndGreen_Actions"));
};
F.Trig_Black_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_C = 0;
while (V.guard()) {
if ((G.udg_C > 22)) break;
G.udg_TempPoi = (yield* V.call("PolarProjectionBJ",G.udg_jingling[5],550.0,(yield* V.call("I2R",((G.udg_C * (-8)) + 270)))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656906,(yield* V.call("Player",11)),G.udg_TempPoi,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
G.udg_TempPoi = (yield* V.call("PolarProjectionBJ",G.udg_jingling[5],550.0,(yield* V.call("I2R",((G.udg_C * 8) + 270)))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656906,(yield* V.call("Player",11)),G.udg_TempPoi,G.bj_UNIT_FACING));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
(yield* V.call("TriggerSleepAction",.1));
G.udg_C = (G.udg_C + 1);
}
};
F.InitTrig_Black=function* () {
G.gg_trg_Black = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_Black));
(yield* V.call("TriggerAddAction",G.gg_trg_Black,"Trig_Black_Actions"));
};
F.Trig_Dianhuoju_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_A = 0;
G.udg_B = 0;
G.udg_C = 0;
G.udg_D = 0;
G.udg_E = 0;
(yield* V.call("TriggerExecute",G.gg_trg_nongmingPre1));
(yield* V.call("TriggerExecute",G.gg_trg_nongmingPre2));
(yield* V.call("TriggerExecute",G.gg_trg_nongmingPre3));
(yield* V.call("TriggerExecute",G.gg_trg_nongmingPre4));
(yield* V.call("TriggerExecute",G.gg_trg_nongmingPre5));
};
F.InitTrig_Dianhuoju=function* () {
G.gg_trg_Dianhuoju = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_Dianhuoju));
(yield* V.call("TriggerAddAction",G.gg_trg_Dianhuoju,"Trig_Dianhuoju_Actions"));
};
F.Trig_nongmingPre1_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_Pointa = (yield* V.call("PolarProjectionBJ",G.udg_jingling[1],550.0,(yield* V.call("I2R",((G.udg_A * 8) + 94)))));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[1],851986,G.udg_Pointa));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_Pointa,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_Pointa));
G.udg_A = 1;
while (V.guard()) {
if ((G.udg_A > 22)) break;
G.udg_Pointa = (yield* V.call("PolarProjectionBJ",G.udg_jingling[1],550.0,(yield* V.call("I2R",((G.udg_A * 16) + 94)))));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[1],851986,G.udg_Pointa));
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_Pointa,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_Pointa));
G.udg_A = (G.udg_A + 1);
}
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[1],851986,G.udg_jingling[1]));
(yield* V.call("TriggerSleepAction",5.0));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_jingling[1],"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("RemoveUnit",G.udg_nongming[1]));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("TriggerSleepAction",1.0));
(yield* V.call("IssueImmediateOrderById",G.udg_aoyunjingling[1],852183));
(yield* V.call("TriggerSleepAction",10.0));
(yield* V.call("RemoveUnit",G.udg_aoyunjingling[1]));
(yield* V.call("RemoveLocation",G.udg_jingling[1]));
};
F.InitTrig_nongmingPre1=function* () {
G.gg_trg_nongmingPre1 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_nongmingPre1));
(yield* V.call("TriggerAddAction",G.gg_trg_nongmingPre1,"Trig_nongmingPre1_Actions"));
};
F.Trig_nongmingPre2_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_Pointb = (yield* V.call("PolarProjectionBJ",G.udg_jingling[2],550.0,(yield* V.call("I2R",((G.udg_B * (-8)) + 176)))));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[2],851986,G.udg_Pointb));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_Pointb,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_Pointb));
G.udg_B = 1;
while (V.guard()) {
if ((G.udg_B > 22)) break;
G.udg_Pointb = (yield* V.call("PolarProjectionBJ",G.udg_jingling[2],550.0,(yield* V.call("I2R",((G.udg_B * (-16)) + 176)))));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[2],851986,G.udg_Pointb));
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_Pointb,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_Pointb));
G.udg_B = (G.udg_B + 1);
}
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[2],851986,G.udg_jingling[2]));
(yield* V.call("TriggerSleepAction",5.0));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_jingling[2],"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("RemoveUnit",G.udg_nongming[2]));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("TriggerSleepAction",1.0));
(yield* V.call("IssueImmediateOrderById",G.udg_aoyunjingling[2],852183));
(yield* V.call("TriggerSleepAction",10.0));
(yield* V.call("RemoveUnit",G.udg_aoyunjingling[2]));
(yield* V.call("RemoveLocation",G.udg_jingling[2]));
};
F.InitTrig_nongmingPre2=function* () {
G.gg_trg_nongmingPre2 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_nongmingPre2));
(yield* V.call("TriggerAddAction",G.gg_trg_nongmingPre2,"Trig_nongmingPre2_Actions"));
};
F.Trig_nongmingPre3_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_Pointc = (yield* V.call("PolarProjectionBJ",G.udg_jingling[3],550.0,(yield* V.call("I2R",((G.udg_C * 8) + 4)))));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[3],851986,G.udg_Pointc));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_Pointc,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_Pointc));
G.udg_C = 1;
while (V.guard()) {
if ((G.udg_C > 22)) break;
G.udg_Pointc = (yield* V.call("PolarProjectionBJ",G.udg_jingling[3],550.0,(yield* V.call("I2R",((G.udg_C * 16) + 4)))));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[3],851986,G.udg_Pointc));
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_Pointc,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_Pointc));
G.udg_C = (G.udg_C + 1);
}
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[3],851986,G.udg_jingling[3]));
(yield* V.call("TriggerSleepAction",5.0));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_jingling[3],"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("RemoveUnit",G.udg_nongming[3]));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("TriggerSleepAction",1.0));
(yield* V.call("IssueImmediateOrderById",G.udg_aoyunjingling[3],852183));
(yield* V.call("TriggerSleepAction",10.0));
(yield* V.call("RemoveUnit",G.udg_aoyunjingling[3]));
(yield* V.call("RemoveLocation",G.udg_jingling[3]));
};
F.InitTrig_nongmingPre3=function* () {
G.gg_trg_nongmingPre3 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_nongmingPre3));
(yield* V.call("TriggerAddAction",G.gg_trg_nongmingPre3,"Trig_nongmingPre3_Actions"));
};
F.Trig_nongmingPre4_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_Pointd = (yield* V.call("PolarProjectionBJ",G.udg_jingling[4],550.0,(yield* V.call("I2R",((G.udg_D * (-8)) + 86)))));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[4],851986,G.udg_Pointd));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_Pointd,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_Pointd));
G.udg_D = 1;
while (V.guard()) {
if ((G.udg_D > 22)) break;
G.udg_Pointd = (yield* V.call("PolarProjectionBJ",G.udg_jingling[4],550.0,(yield* V.call("I2R",((G.udg_D * (-16)) + 86)))));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[4],851986,G.udg_Pointd));
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_Pointd,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_Pointd));
G.udg_D = (G.udg_D + 1);
}
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[4],851986,G.udg_jingling[4]));
(yield* V.call("TriggerSleepAction",5.0));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_jingling[4],"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("RemoveUnit",G.udg_nongming[4]));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("TriggerSleepAction",1.0));
(yield* V.call("IssueImmediateOrderById",G.udg_aoyunjingling[4],852183));
(yield* V.call("TriggerSleepAction",10.0));
(yield* V.call("RemoveUnit",G.udg_aoyunjingling[4]));
(yield* V.call("RemoveLocation",G.udg_jingling[4]));
};
F.InitTrig_nongmingPre4=function* () {
G.gg_trg_nongmingPre4 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_nongmingPre4));
(yield* V.call("TriggerAddAction",G.gg_trg_nongmingPre4,"Trig_nongmingPre4_Actions"));
};
F.Trig_nongmingPre5_Actions=function* () {
(yield* V.call("DestroyTrigger",(yield* V.call("GetTriggeringTrigger"))));
G.udg_TempPoi = (yield* V.call("PolarProjectionBJ",G.udg_jingling[5],550.0,(yield* V.call("I2R",((G.udg_E * (-8)) + 274)))));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[5],851986,G.udg_TempPoi));
(yield* V.call("TriggerSleepAction",2.0));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_TempPoi,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
G.udg_E = 1;
while (V.guard()) {
if ((G.udg_E > 22)) break;
G.udg_TempPoi = (yield* V.call("PolarProjectionBJ",G.udg_jingling[5],550.0,(yield* V.call("I2R",((G.udg_E * (-16)) + 274)))));
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[5],851986,G.udg_TempPoi));
(yield* V.call("TriggerSleepAction",.5));
(yield* V.call("CreateDestructableLoc",1280599416,G.udg_TempPoi,(yield* V.call("GetRandomDirectionDeg")),1,0));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
G.udg_E = (G.udg_E + 1);
}
(yield* V.call("IssuePointOrderByIdLoc",G.udg_nongming[5],851986,G.udg_jingling[5]));
(yield* V.call("TriggerSleepAction",5.0));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_jingling[5],"Abilities\\Spells\\Human\\MassTeleport\\MassTeleportTo.mdl"));
(yield* V.call("RemoveUnit",G.udg_nongming[5]));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("TriggerSleepAction",1.0));
(yield* V.call("IssueImmediateOrderById",G.udg_aoyunjingling[5],852183));
(yield* V.call("TriggerSleepAction",10.0));
(yield* V.call("RemoveUnit",G.udg_aoyunjingling[5]));
(yield* V.call("RemoveLocation",G.udg_jingling[5]));
};
F.InitTrig_nongmingPre5=function* () {
G.gg_trg_nongmingPre5 = (yield* V.call("CreateTrigger"));
(yield* V.call("DisableTrigger",G.gg_trg_nongmingPre5));
(yield* V.call("TriggerAddAction",G.gg_trg_nongmingPre5,"Trig_nongmingPre5_Actions"));
};
F.Trig_jianjie_Actions=function* () {
(yield* V.call("CreateQuestBJ",G.bj_QUESTTYPE_REQ_DISCOVERED,"|c0000FF00修正版说明|r","基于人族无敌2.1a官方正式版(www.wow8.org)修改，加入多个模式选择。由于原图也存在的BUG，本修改版不给予解决，请等待原图作者更新。\n修正快速模式下套装炮塔升级问题，套装物品掉落几率增加。\n加入单机模式，多人联网时请勿开启：\n开启方法按键盘上的方向键(↑↓←→)即可。","ReplaceableTextures\\CommandButtons\\BTNAvatarOff.blp"));
(yield* V.call("CreateQuestBJ",G.bj_QUESTTYPE_REQ_DISCOVERED,"|c0000FF002.1c重点更新|r","加入物品删除命令，10波后才能启用，输入-q\n加入套装效果删除命令，输入-guanbi\n恢复套装效果输入-kaiqi，其他一些小修复游戏中体验。","ReplaceableTextures\\CommandButtons\\BTNAvatarOff.blp"));
(yield* V.call("CreateQuestBJ",G.bj_QUESTTYPE_REQ_DISCOVERED,"|c0000FF00模式说明|r","正常模式就不用介绍了吧。\n特殊模式：\n可以任意组合，结合正常和快速升级模式，使难度多样变化。","ReplaceableTextures\\CommandButtons\\BTNAvatarOff.blp"));
(yield* V.call("CreateQuestBJ",G.bj_QUESTTYPE_OPT_DISCOVERED,"2.1a版更新内容","TRIGSTR_3566","ReplaceableTextures\\CommandButtons\\BTNAvatarOn.blp"));
(yield* V.call("CreateQuestBJ",G.bj_QUESTTYPE_OPT_DISCOVERED,"关键性提示","|c0000ff00☆|r所有炮塔技能快捷键均为R。\n|c0000ff00☆|r降低了一些升级难度大的炮塔的升级难度。\n|c0000ff00☆|r盗贼的扔钱技能改在小强身上，金钱数为0时只有25%的几率触发技能，而不是之前版本的100%。\n|c0000ff00☆|r穿刺攻击对英雄甲和城墙甲均造成100%的伤害，可以说是最好的一种攻击方式了。\n|c0000ff00☆|r套装炮塔能力提升后技能会停止自动释放，请及时操作。Lv3炮塔升级到LvMax时，技能也会停止自动释放。","ReplaceableTextures\\CommandButtons\\BTNAvatarOn.blp"));
(yield* V.call("CreateQuestBJ",G.bj_QUESTTYPE_OPT_DISCOVERED,"关于套装炮塔","|c0000ff00☆|r只有普通以上难度才会增加套装炮塔系统。\n|c0000ff00☆|r杀死敌人有很小的几率掉落套装炮塔，难度越高几率越大。\n|c0000ff00☆|r只有职业相符，并且炮塔之间距离均不超过1200码时才能激活套装效果。每个玩家只能拥有一套套装。收购的套装炮塔无法构成套装。\n|c0000ff00☆|r发现任何bug请登陆http://bbs.wow8.org/人族无敌II专区提交，感谢您的支持。","ReplaceableTextures\\CommandButtons\\BTNAvatarOn.blp"));
};
F.InitTrig_jianjie=function* () {
G.gg_trg_jianjie = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_jianjie,"Trig_jianjie_Actions"));
};
F.Trig_TZLRchanrao_Conditions=function* () {
return ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989841);
};
F.Trig_TZLRchanrao_Func001C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681715);
};
F.Trig_TZLRchanrao_Func002C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681716);
};
F.Trig_TZLRchanrao_Func003C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681714);
};
F.Trig_TZLRchanrao_Actions=function* () {
if ((yield* V.call("Trig_TZLRchanrao_Func001C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093677360,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093677360,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852171,(yield* V.call("GetSpellTargetUnit"))));
}
if ((yield* V.call("Trig_TZLRchanrao_Func002C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093681713,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681713,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852171,(yield* V.call("GetSpellTargetUnit"))));
}
if ((yield* V.call("Trig_TZLRchanrao_Func003C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093681712,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681712,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetSpellAbilityUnit")),852171,(yield* V.call("GetSpellTargetUnit"))));
}
};
F.InitTrig_TZLRchanrao=function* () {
G.gg_trg_TZLRchanrao = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_TZLRchanrao,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_TZLRchanrao,(yield* V.call("Condition","Trig_TZLRchanrao_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_TZLRchanrao,"Trig_TZLRchanrao_Actions"));
};
F.Trig_TZMJSzhaohuan_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990340) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 10.0));
};
F.Trig_TZMJSzhaohuan_Func001C=function* () {
return ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < G.udg_biaozhuncs[0]);
};
F.Trig_TZMJSzhaohuan_Func002C=function* () {
return (((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= G.udg_biaozhuncs[0]) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < G.udg_biaozhuncs[1]));
};
F.Trig_TZMJSzhaohuan_Func003C=function* () {
return ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= G.udg_biaozhuncs[1]);
};
F.Trig_TZMJSzhaohuan_Actions=function* () {
if ((yield* V.call("Trig_TZMJSzhaohuan_Func001C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093682503,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682503,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852667));
}
if ((yield* V.call("Trig_TZMJSzhaohuan_Func002C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093677367,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093677367,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852667));
}
if ((yield* V.call("Trig_TZMJSzhaohuan_Func003C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093682504,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682504,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetAttacker")),852667));
}
};
F.InitTrig_TZMJSzhaohuan=function* () {
G.gg_trg_TZMJSzhaohuan = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_TZMJSzhaohuan,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_TZMJSzhaohuan,(yield* V.call("Condition","Trig_TZMJSzhaohuan_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_TZMJSzhaohuan,"Trig_TZMJSzhaohuan_Actions"));
};
F.Trig_TZMJSlongyin_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990339) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 10.0));
};
F.Trig_TZMJSlongyin_Func002C=function* () {
return ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < G.udg_biaozhuncs[0]);
};
F.Trig_TZMJSlongyin_Func003C=function* () {
return (((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= G.udg_biaozhuncs[0]) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < G.udg_biaozhuncs[1]));
};
F.Trig_TZMJSlongyin_Func004C=function* () {
return ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= G.udg_biaozhuncs[1]);
};
F.Trig_TZMJSlongyin_Actions=function* () {
(yield* V.call("SetUnitManaBJ",(yield* V.call("GetAttacker")),0));
if ((yield* V.call("Trig_TZMJSlongyin_Func002C"))) {
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656918,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointc,G.bj_UNIT_FACING));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetLastCreatedUnit")),852096));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
}
if ((yield* V.call("Trig_TZMJSlongyin_Func003C"))) {
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656916,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointc,G.bj_UNIT_FACING));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetLastCreatedUnit")),852096));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
}
if ((yield* V.call("Trig_TZMJSlongyin_Func004C"))) {
G.udg_Pointc = (yield* V.call("GetUnitLoc",(yield* V.call("GetAttackedUnitBJ"))));
(yield* V.call("CreateNUnitsAtLoc",1,1697656917,(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.udg_Pointc,G.bj_UNIT_FACING));
(yield* V.call("IssueImmediateOrderById",(yield* V.call("GetLastCreatedUnit")),852096));
(yield* V.call("UnitApplyTimedLifeBJ",1.0,1112820806,(yield* V.call("GetLastCreatedUnit"))));
}
};
F.InitTrig_TZMJSlongyin=function* () {
G.gg_trg_TZMJSlongyin = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_TZMJSlongyin,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_TZMJSlongyin,(yield* V.call("Condition","Trig_TZMJSlongyin_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_TZMJSlongyin,"Trig_TZMJSlongyin_Actions"));
};
F.Trig_TZMJSzhenwu_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747990338) && ((yield* V.call("GetUnitStateSwap",G.UNIT_STATE_MANA,(yield* V.call("GetAttacker")))) >= 10.0));
};
F.Trig_TZMJSzhenwu_Func001C=function* () {
return ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < G.udg_biaozhuncs[0]);
};
F.Trig_TZMJSzhenwu_Func002C=function* () {
return (((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= G.udg_biaozhuncs[0]) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < G.udg_biaozhuncs[1]));
};
F.Trig_TZMJSzhenwu_Func003C=function* () {
return ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= G.udg_biaozhuncs[1]);
};
F.Trig_TZMJSzhenwu_Actions=function* () {
if ((yield* V.call("Trig_TZMJSzhenwu_Func001C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093682517,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682517,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852095,(yield* V.call("GetAttackedUnitBJ"))));
}
if ((yield* V.call("Trig_TZMJSzhenwu_Func002C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093682518,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682518,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852095,(yield* V.call("GetAttackedUnitBJ"))));
}
if ((yield* V.call("Trig_TZMJSzhenwu_Func003C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093682516,(yield* V.call("GetAttacker"))));
(yield* V.call("UnitAddAbilityBJ",1093682516,(yield* V.call("GetAttacker"))));
(yield* V.call("IssueTargetOrderById",(yield* V.call("GetAttacker")),852095,(yield* V.call("GetAttackedUnitBJ"))));
}
};
F.InitTrig_TZMJSzhenwu=function* () {
G.gg_trg_TZMJSzhenwu = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_TZMJSzhenwu,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_TZMJSzhenwu,(yield* V.call("Condition","Trig_TZMJSzhenwu_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_TZMJSzhenwu,"Trig_TZMJSzhenwu_Actions"));
};
F.Trig_TZSSwuyun_Conditions=function* () {
return ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989839);
};
F.Trig_TZSSwuyun_Func001C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681482);
};
F.Trig_TZSSwuyun_Func002C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681480);
};
F.Trig_TZSSwuyun_Func003C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681481);
};
F.Trig_TZSSwuyun_Actions=function* () {
if ((yield* V.call("Trig_TZSSwuyun_Func001C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093681478,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681478,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852591,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
}
if ((yield* V.call("Trig_TZSSwuyun_Func002C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093681477,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681477,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852591,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
}
if ((yield* V.call("Trig_TZSSwuyun_Func003C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093681479,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681479,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852591,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
}
};
F.InitTrig_TZSSwuyun=function* () {
G.gg_trg_TZSSwuyun = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_TZSSwuyun,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_TZSSwuyun,(yield* V.call("Condition","Trig_TZSSwuyun_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_TZSSwuyun,"Trig_TZSSwuyun_Actions"));
};
F.Trig_TZSSlongjuanfeng_Conditions=function* () {
return ((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989838);
};
F.Trig_TZSSlongjuanfeng_Func001C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681493);
};
F.Trig_TZSSlongjuanfeng_Func002C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681494);
};
F.Trig_TZSSlongjuanfeng_Func003C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681492);
};
F.Trig_TZSSlongjuanfeng_Actions=function* () {
if ((yield* V.call("Trig_TZSSlongjuanfeng_Func001C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093681491,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681491,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852125,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
}
if ((yield* V.call("Trig_TZSSlongjuanfeng_Func002C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093681490,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681490,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852125,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
}
if ((yield* V.call("Trig_TZSSlongjuanfeng_Func003C"))) {
(yield* V.call("UnitRemoveAbilityBJ",1093681489,(yield* V.call("GetSpellAbilityUnit"))));
(yield* V.call("UnitAddAbilityBJ",1093681489,(yield* V.call("GetSpellAbilityUnit"))));
G.udg_TempPoi = (yield* V.call("GetUnitLoc",(yield* V.call("GetSpellTargetUnit"))));
(yield* V.call("IssuePointOrderByIdLoc",(yield* V.call("GetSpellAbilityUnit")),852125,G.udg_TempPoi));
(yield* V.call("RemoveLocation",G.udg_TempPoi));
}
};
F.InitTrig_TZSSlongjuanfeng=function* () {
G.gg_trg_TZSSlongjuanfeng = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_TZSSlongjuanfeng,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_TZSSlongjuanfeng,(yield* V.call("Condition","Trig_TZSSlongjuanfeng_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_TZSSlongjuanfeng,"Trig_TZSSlongjuanfeng_Actions"));
};
F.Trig_TZDZqiangjie_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetSpellAbilityUnit")))) === 1747989845) && (!(G.udg_playerzz[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit"))))))] !== 3)));
};
F.Trig_TZDZqiangjie_Func001C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681734);
};
F.Trig_TZDZqiangjie_Func002C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681733);
};
F.Trig_TZDZqiangjie_Func003C=function* () {
return ((yield* V.call("GetSpellAbilityId")) === 1093681735);
};
F.Trig_TZDZqiangjie_Actions=function* () {
if ((yield* V.call("Trig_TZDZqiangjie_Func001C"))) {
(yield* V.call("AdjustPlayerStateBJ",3,(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
}
if ((yield* V.call("Trig_TZDZqiangjie_Func002C"))) {
(yield* V.call("AdjustPlayerStateBJ",6,(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
}
if ((yield* V.call("Trig_TZDZqiangjie_Func003C"))) {
(yield* V.call("AdjustPlayerStateBJ",9,(yield* V.call("GetOwningPlayer",(yield* V.call("GetSpellAbilityUnit")))),G.PLAYER_STATE_RESOURCE_GOLD));
}
};
F.InitTrig_TZDZqiangjie=function* () {
G.gg_trg_TZDZqiangjie = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_TZDZqiangjie,G.EVENT_PLAYER_UNIT_SPELL_CAST));
(yield* V.call("TriggerAddCondition",G.gg_trg_TZDZqiangjie,(yield* V.call("Condition","Trig_TZDZqiangjie_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_TZDZqiangjie,"Trig_TZDZqiangjie_Actions"));
};
F.Trig_TZDZtoushu_Conditions=function* () {
return (((yield* V.call("GetUnitTypeId",(yield* V.call("GetAttacker")))) === 1747989844) && (!(G.udg_playerzz[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker"))))))] !== 3)));
};
F.Trig_TZDZtoushu_Func001C=function* () {
return (((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < G.udg_biaozhuncs[0]) && ((yield* V.call("GetRandomInt",1,20)) === 1));
};
F.Trig_TZDZtoushu_Func002C=function* () {
return ((((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= G.udg_biaozhuncs[0]) && ((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) < G.udg_biaozhuncs[1])) && ((yield* V.call("GetRandomInt",1,10)) === 1));
};
F.Trig_TZDZtoushu_Func003C=function* () {
return (((yield* V.call("GetUnitUserData",(yield* V.call("GetAttacker")))) >= G.udg_biaozhuncs[1]) && ((yield* V.call("GetRandomInt",1,20)) <= 3));
};
F.Trig_TZDZtoushu_Actions=function* () {
if ((yield* V.call("Trig_TZDZtoushu_Func001C"))) {
(yield* V.call("AdjustPlayerStateBJ",V.idiv((G.udg_waves + 2),3),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
}
if ((yield* V.call("Trig_TZDZtoushu_Func002C"))) {
(yield* V.call("AdjustPlayerStateBJ",V.idiv((G.udg_waves + 2),3),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
}
if ((yield* V.call("Trig_TZDZtoushu_Func003C"))) {
(yield* V.call("AdjustPlayerStateBJ",V.idiv((G.udg_waves + 2),3),(yield* V.call("GetOwningPlayer",(yield* V.call("GetAttacker")))),G.PLAYER_STATE_RESOURCE_GOLD));
}
};
F.InitTrig_TZDZtoushu=function* () {
G.gg_trg_TZDZtoushu = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_TZDZtoushu,G.EVENT_PLAYER_UNIT_ATTACKED));
(yield* V.call("TriggerAddCondition",G.gg_trg_TZDZtoushu,(yield* V.call("Condition","Trig_TZDZtoushu_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_TZDZtoushu,"Trig_TZDZtoushu_Actions"));
};
F.Trig_TZjianta_Addtx=function* (pid,i) {
(yield* V.call("AddLightningLoc",G.udg_sln[i],G.udg_Pointa,G.udg_Pointb));
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"0",(yield* V.call("H2I",(yield* V.call("GetLastCreatedLightningBJ"))))));
(yield* V.call("AddLightningLoc",G.udg_sln[i],G.udg_Pointb,G.udg_Pointc));
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"1",(yield* V.call("H2I",(yield* V.call("GetLastCreatedLightningBJ"))))));
(yield* V.call("AddLightningLoc",G.udg_sln[i],G.udg_Pointc,G.udg_Pointa));
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"2",(yield* V.call("H2I",(yield* V.call("GetLastCreatedLightningBJ"))))));
};
F.Trig_TZjianta_Deltx=function* (pid,i) {
(yield* V.call("DestroyLightning",(yield* V.call("I2L",(yield* V.call("GetStoredInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"0"))))));
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"0",0));
(yield* V.call("DestroyLightning",(yield* V.call("I2L",(yield* V.call("GetStoredInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"1"))))));
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"1",0));
(yield* V.call("DestroyLightning",(yield* V.call("I2L",(yield* V.call("GetStoredInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"2"))))));
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"2",0));
};
F.Trig_TZjianta_jiance=function* (u,i) {
let distance = 0;
if ((G.udg_yxmode === 2)) {
distance = 99999.0;
} else {
distance = 1200.0;
}
if (((yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",u))))] + "_") + G.udg_stz[i]),"1")) === 0)) {
return false;
}
if (((yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",u))))] + "_") + G.udg_stz[i]),"2")) === 0)) {
return false;
}
if (((yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",u))))] + "_") + G.udg_stz[i]),"3")) === 0)) {
return false;
}
if ((!((yield* V.call("DistanceBetweenPoints",G.udg_Pointa,G.udg_Pointb)) <= distance))) {
return false;
}
if ((!((yield* V.call("DistanceBetweenPoints",G.udg_Pointb,G.udg_Pointc)) <= distance))) {
return false;
}
if ((!((yield* V.call("DistanceBetweenPoints",G.udg_Pointc,G.udg_Pointa)) <= distance))) {
return false;
}
return true;
};
F.Trig_TZjianta_Actions=function* (i,j) {
let pid = 0;
let u = (yield* V.call("GetTriggerUnit"));
let u1 = null;
let u2 = null;
let u3 = null;
pid = (yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",u))));
if ((G.udg_yxmode === 2)) {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))),0,0,30,"|c0000ff00套装炮塔不限制职业建造，但每种套装最多一套，并且相互之间距离都在|c00ff000099999码以内|c0000ff00时才能激活套装效果。"));
} else {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))),0,0,30,"|c0000ff00套装炮塔只能由|c00ff0000对应的职业|c0000ff00建造，并且相互之间距离都在|c00ff00001200码以内|c0000ff00时才能激活套装效果。每个职业只能拥有一套套装。"));
}
(yield* V.call("StoreInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),(yield* V.call("I2S",j)),(yield* V.call("H2I",u))));
u1 = (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"1"))));
u2 = (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"2"))));
u3 = (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"3"))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",u1));
G.udg_Pointb = (yield* V.call("GetUnitLoc",u2));
G.udg_Pointc = (yield* V.call("GetUnitLoc",u3));
if ((yield* V.call("Trig_TZjianta_jiance",u,i))) {
(yield* V.call("StoreInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"0",1));
(yield* V.call("UnitAddAbilityBJ",G.udg_ab[i],u1));
(yield* V.call("UnitAddAbilityBJ",G.udg_ab[i],u2));
(yield* V.call("UnitAddAbilityBJ",G.udg_ab[i],u3));
(yield* V.call("Trig_TZjianta_Addtx",pid,i));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_Pointa,G.udg_smn[i]));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_Pointb,G.udg_smn[i]));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("AddSpecialEffectLocBJ",G.udg_Pointc,G.udg_smn[i]));
(yield* V.call("DestroyEffect",(yield* V.call("GetLastCreatedEffectBJ"))));
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),20.0,(((("恭喜|c00ff0000" + (yield* V.call("GetPlayerName",(yield* V.call("GetOwningPlayer",u))))) + "|r集齐了") + G.udg_sdistxt[i]) + "！")));
}
u = null;
u1 = null;
u2 = null;
u3 = null;
(yield* V.call("RemoveLocation",G.udg_Pointa));
(yield* V.call("RemoveLocation",G.udg_Pointb));
(yield* V.call("RemoveLocation",G.udg_Pointc));
};
F.Trig_TZjianta_Conditions=function* () {
let i = 0;
let j = 0;
i = 0;
while (V.guard()) {
if ((i > 5)) break;
j = 1;
while (V.guard()) {
if ((j > 3)) break;
if (((yield* V.call("GetUnitTypeId",(yield* V.call("GetTriggerUnit")))) === (yield* V.call("GetStoredInteger",G.udg_GC,G.udg_stz[i],(yield* V.call("I2S",j)))))) {
if ((G.udg_yxmode !== 2)) {
if ((G.udg_playerzz[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit"))))))] !== (i + 1))) {
return ;
}
}
if (((yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit"))))))] + "_") + G.udg_stz[i]),(yield* V.call("I2S",j)))) !== 0)) {
return ;
}
if (((yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[(yield* V.call("GetPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit"))))))] + "_") + G.udg_stz[i]),"0")) !== 0)) {
return ;
}
(yield* V.call("Trig_TZjianta_Actions",i,j));
return ;
}
j = (j + 1);
}
i = (i + 1);
}
};
F.InitTrig_TZjianta=function* () {
G.gg_trg_TZjianta = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_TZjianta,G.EVENT_PLAYER_UNIT_UPGRADE_FINISH));
(yield* V.call("TriggerAddAction",G.gg_trg_TZjianta,"Trig_TZjianta_Conditions"));
};
F.Trig_shanc_Conditions=function* () {
return (G.udg_waves > 10);
};
F.Trig_shanc_001=function* () {
(yield* V.call("RemoveItem",(yield* V.call("GetEnumItem"))));
};
F.Trig_shanc_Actions=function* () {
(yield* V.call("DisplayTextToForce",(yield* V.call("GetPlayersAll")),((yield* V.call("GetPlayerName",(yield* V.call("GetTriggerPlayer")))) + "|cffe55bb0清除了地上的物品!|r")));
(yield* V.call("EnumItemsInRectBJ",(yield* V.call("GetPlayableMapRect")),"Trig_shanc_001"));
};
F.InitTrig_shanc=function* () {
G.gg_trg_shanc = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_shanc,(yield* V.call("Player",0)),"-q",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_shanc,(yield* V.call("Player",1)),"-q",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_shanc,(yield* V.call("Player",2)),"-q",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_shanc,(yield* V.call("Player",3)),"-q",true));
(yield* V.call("TriggerAddCondition",G.gg_trg_shanc,(yield* V.call("Condition","Trig_shanc_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_shanc,"Trig_shanc_Actions"));
};
F.Trig_guanbitx_Actions=function* () {
let b = false;
let i = 0;
let pid = (yield* V.call("GetPlayerId",(yield* V.call("GetTriggerPlayer"))));
i = 0;
while (V.guard()) {
if ((i > 5)) break;
if (((yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"0")) !== 0)) {
if (((yield* V.call("GetStoredInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"0")) !== 0)) {
b = true;
(yield* V.call("Trig_TZjianta_Deltx",pid,i));
}
}
i = (i + 1);
}
if (b) {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetTriggerPlayer")),0,0,"|c00FFFF80关闭套装特效技能~|r"));
}
};
F.InitTrig_guanbitx=function* () {
G.gg_trg_guanbitx = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_guanbitx,(yield* V.call("Player",0)),"-guanbi",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_guanbitx,(yield* V.call("Player",1)),"-guanbi",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_guanbitx,(yield* V.call("Player",2)),"-guanbi",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_guanbitx,(yield* V.call("Player",3)),"-guanbi",true));
(yield* V.call("TriggerAddAction",G.gg_trg_guanbitx,"Trig_guanbitx_Actions"));
};
F.Trig_kaiqitx_Actions=function* () {
let u1 = null;
let u2 = null;
let u3 = null;
let i = 0;
let pid = (yield* V.call("GetPlayerId",(yield* V.call("GetTriggerPlayer"))));
let b = false;
i = 0;
while (V.guard()) {
if ((i > 5)) break;
if (((yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"0")) !== 0)) {
if (((yield* V.call("GetStoredInteger",G.udg_GC,(((G.udg_sp[pid] + "_") + G.udg_stz[i]) + "_lightning"),"0")) === 0)) {
u1 = (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"1"))));
u2 = (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"2"))));
u3 = (yield* V.call("I2U",(yield* V.call("GetStoredInteger",G.udg_GC,((G.udg_sp[pid] + "_") + G.udg_stz[i]),"3"))));
G.udg_Pointa = (yield* V.call("GetUnitLoc",u1));
G.udg_Pointb = (yield* V.call("GetUnitLoc",u2));
G.udg_Pointc = (yield* V.call("GetUnitLoc",u3));
u1 = null;
u2 = null;
u3 = null;
(yield* V.call("Trig_TZjianta_Addtx",pid,i));
b = true;
}
}
i = (i + 1);
}
if (b) {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetTriggerPlayer")),0,0,"|c00FFFF80开启套装特效技能~|r"));
}
};
F.InitTrig_kaiqitx=function* () {
G.gg_trg_kaiqitx = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_kaiqitx,(yield* V.call("Player",0)),"-kaiqi",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_kaiqitx,(yield* V.call("Player",1)),"-kaiqi",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_kaiqitx,(yield* V.call("Player",2)),"-kaiqi",true));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_kaiqitx,(yield* V.call("Player",3)),"-kaiqi",true));
(yield* V.call("TriggerAddAction",G.gg_trg_kaiqitx,"Trig_kaiqitx_Actions"));
};
F.Trig_TZAllUnit_Actions=function* () {
let i = 0;
let j = 0;
let k = 0;
G.udg_stz[0] = "YM";
G.udg_stz[1] = "LR";
G.udg_stz[2] = "DZ";
G.udg_stz[3] = "SS";
G.udg_stz[4] = "YX";
G.udg_stz[5] = "MJS";
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[0],"1",1747989835));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[0],"2",1747989834));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[0],"3",1747989836));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[1],"1",1747989840));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[1],"2",1747989841));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[1],"3",1747989842));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[2],"1",1747989844));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[2],"2",1747989845));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[2],"3",1747989843));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[3],"1",1747989839));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[3],"2",1747989837));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[3],"3",1747989838));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[4],"1",1747989810));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[4],"2",1747989811));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[4],"3",1747989812));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[5],"1",1747990340));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[5],"2",1747990339));
(yield* V.call("StoreInteger",G.udg_GC,G.udg_stz[5],"3",1747990338));
G.udg_sp[0] = "player0";
G.udg_sp[1] = "player1";
G.udg_sp[2] = "player2";
G.udg_sp[3] = "player3";
i = 0;
while (V.guard()) {
if ((i > 3)) break;
j = 0;
while (V.guard()) {
if ((j > 5)) break;
k = 0;
while (V.guard()) {
if ((k > 3)) break;
(yield* V.call("StoreInteger",G.udg_GC,((G.udg_sp[i] + "_") + G.udg_stz[j]),(yield* V.call("I2S",k)),0));
if ((k < 3)) {
(yield* V.call("StoreInteger",G.udg_GC,(((G.udg_sp[i] + "_") + G.udg_stz[j]) + "_lightning"),(yield* V.call("I2S",k)),0));
}
k = (k + 1);
}
j = (j + 1);
}
i = (i + 1);
}
G.udg_ab[0] = 1093679449;
G.udg_ab[1] = 1093681737;
G.udg_ab[2] = 1093681736;
G.udg_ab[3] = 1093681738;
G.udg_ab[4] = 1093679434;
G.udg_ab[5] = 1093682502;
G.udg_sln[0] = "DRAL";
G.udg_sln[1] = "SPLK";
G.udg_sln[2] = "AFOD";
G.udg_sln[3] = "DRAM";
G.udg_sln[4] = "CLSB";
G.udg_sln[5] = "LEAS";
G.udg_smn[0] = "Abilities\\Spells\\Human\\Resurrect\\ResurrectCaster.mdl";
G.udg_smn[1] = "Abilities\\Spells\\Human\\Resurrect\\ResurrectCaster.mdl";
G.udg_smn[2] = "Abilities\\Spells\\Human\\Resurrect\\ResurrectCaster.mdl";
G.udg_smn[3] = "Abilities\\Spells\\Human\\Resurrect\\ResurrectCaster.mdl";
G.udg_smn[4] = "Abilities\\Spells\\Human\\Resurrect\\ResurrectCaster.mdl";
G.udg_smn[5] = "Abilities\\Spells\\Human\\Resurrect\\ResurrectCaster.mdl";
G.udg_sdistxt[0] = "|c0000ff00野蛮人套装|r";
G.udg_sdistxt[1] = "|c0000ff00猎人套装|r";
G.udg_sdistxt[2] = "|c0000ff00盗贼套装|r";
G.udg_sdistxt[3] = "|c0000ff00术士套装|r";
G.udg_sdistxt[4] = "|c0000ff00游侠套装|r";
G.udg_sdistxt[5] = "|c0000ff00魔剑士套装|r";
G.udg_levelT1[1] = 1747989810;
G.udg_levelT1[2] = 1747989811;
G.udg_levelT1[3] = 1747989812;
G.udg_levelT1[4] = 1747989840;
G.udg_levelT1[5] = 1747989841;
G.udg_levelT1[6] = 1747989842;
G.udg_levelT1[7] = 1747989844;
G.udg_levelT1[8] = 1747989845;
G.udg_levelT1[9] = 1747989843;
G.udg_levelT1[10] = 1747989835;
G.udg_levelT1[11] = 1747989834;
G.udg_levelT1[12] = 1747989836;
G.udg_levelT1[13] = 1747989839;
G.udg_levelT1[14] = 1747989837;
G.udg_levelT1[15] = 1747989838;
G.udg_levelT1[16] = 1747990340;
G.udg_levelT1[17] = 1747990339;
G.udg_levelT1[18] = 1747990338;
G.udg_jinengT1[1] = 1093679430;
G.udg_jinengT1[2] = 1093679431;
G.udg_jinengT1[3] = 1093679426;
G.udg_jinengT1[4] = 1093681497;
G.udg_jinengT1[5] = 1093681715;
G.udg_jinengT1[6] = 1093681719;
G.udg_jinengT1[7] = 1093681730;
G.udg_jinengT1[8] = 1093681734;
G.udg_jinengT1[9] = 1093681729;
G.udg_jinengT1[10] = 1093677134;
G.udg_jinengT1[11] = 1093681457;
G.udg_jinengT1[12] = 1093681465;
G.udg_jinengT1[13] = 1093681482;
G.udg_jinengT1[14] = 1093681484;
G.udg_jinengT1[15] = 1093681493;
G.udg_jinengT1[16] = 1093682507;
G.udg_jinengT1[17] = 1093682512;
G.udg_jinengT1[18] = 1093682514;
G.udg_jinengT2[1] = 1093679429;
G.udg_jinengT2[2] = 1093679432;
G.udg_jinengT2[3] = 1093679427;
G.udg_jinengT2[4] = 1093681496;
G.udg_jinengT2[5] = 1093681716;
G.udg_jinengT2[6] = 1093681718;
G.udg_jinengT2[7] = 1093681731;
G.udg_jinengT2[8] = 1093681733;
G.udg_jinengT2[9] = 1093681720;
G.udg_jinengT2[10] = 1093681475;
G.udg_jinengT2[11] = 1093681456;
G.udg_jinengT2[12] = 1093681464;
G.udg_jinengT2[13] = 1093681480;
G.udg_jinengT2[14] = 1093681483;
G.udg_jinengT2[15] = 1093681494;
G.udg_jinengT2[16] = 1093682506;
G.udg_jinengT2[17] = 1093682510;
G.udg_jinengT2[18] = 1093682513;
G.udg_jinengT3[1] = 1093679428;
G.udg_jinengT3[2] = 1093679433;
G.udg_jinengT3[3] = 1093679425;
G.udg_jinengT3[4] = 1093681498;
G.udg_jinengT3[5] = 1093681714;
G.udg_jinengT3[6] = 1093681717;
G.udg_jinengT3[7] = 1093681732;
G.udg_jinengT3[8] = 1093681735;
G.udg_jinengT3[9] = 1093681721;
G.udg_jinengT3[10] = 1093681474;
G.udg_jinengT3[11] = 1093681458;
G.udg_jinengT3[12] = 1093681473;
G.udg_jinengT3[13] = 1093681481;
G.udg_jinengT3[14] = 1093681485;
G.udg_jinengT3[15] = 1093681492;
G.udg_jinengT3[16] = 1093682505;
G.udg_jinengT3[17] = 1093682511;
G.udg_jinengT3[18] = 1093682515;
G.udg_jinengS1[5] = 1093677360;
G.udg_jinengS1[11] = 1093679450;
G.udg_jinengS1[12] = 1093681463;
G.udg_jinengS1[13] = 1093681478;
G.udg_jinengS1[14] = 1093681488;
G.udg_jinengS1[15] = 1093681491;
G.udg_jinengS1[16] = 1093682503;
G.udg_jinengS1[18] = 1093682517;
G.udg_jinengS2[5] = 1093681713;
G.udg_jinengS2[11] = 1093681459;
G.udg_jinengS2[12] = 1093681461;
G.udg_jinengS2[13] = 1093681477;
G.udg_jinengS2[14] = 1093681487;
G.udg_jinengS2[15] = 1093681490;
G.udg_jinengS2[16] = 1093677367;
G.udg_jinengS2[18] = 1093682518;
G.udg_jinengS3[5] = 1093681712;
G.udg_jinengS3[11] = 1093681460;
G.udg_jinengS3[12] = 1093681462;
G.udg_jinengS3[13] = 1093681479;
G.udg_jinengS3[14] = 1093681486;
G.udg_jinengS3[15] = 1093681489;
G.udg_jinengS3[16] = 1093682504;
G.udg_jinengS3[18] = 1093682516;
};
F.InitTrig_TZAllUnit=function* () {
G.gg_trg_TZAllUnit = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerAddAction",G.gg_trg_TZAllUnit,"Trig_TZAllUnit_Actions"));
};
F.Trig_tingzhijinggao_Func003C=function* () {
return ((((yield* V.call("GetUnitPointValue",(yield* V.call("GetTriggerUnit")))) === 6) || ((yield* V.call("GetUnitTypeId",G.udg_nongming[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit"))))))])) === 1747988529)) || ((yield* V.call("GetUnitTypeId",G.udg_nongming[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit"))))))])) === 1747988530));
};
F.Trig_tingzhijinggao_Conditions=function* () {
return ((yield* V.call("Trig_tingzhijinggao_Func003C")) && ((yield* V.call("GetIssuedOrderIdBJ")) === 851972));
};
F.Trig_tingzhijinggao_Func002C=function* () {
return (G.udg_jinggao[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit"))))))] > 20);
};
F.Trig_tingzhijinggao_Actions=function* () {
G.udg_jinggao[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit"))))))] = (G.udg_jinggao[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit"))))))] + 1);
if ((yield* V.call("Trig_tingzhijinggao_Func002C"))) {
(yield* V.call("DisplayTimedTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))),0,0,30,"由于你过度使用停止键(|cffffcc00S|r)，雅典娜不服，告上国际法庭，判处该单位死刑……"));
(yield* V.call("KillUnit",(yield* V.call("GetTriggerUnit"))));
} else {
(yield* V.call("DisplayTextToPlayer",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit")))),0,0,("请不要使用停止键(|cffffcc00S|r)!|c00ff0000第|r" + ((yield* V.call("I2S",G.udg_jinggao[(yield* V.call("GetConvertedPlayerId",(yield* V.call("GetOwningPlayer",(yield* V.call("GetTriggerUnit"))))))])) + "|c00ff0000次警告！|c0000ff00警告超过|r20|c0000ff00次将摧毁当前单位！"))));
}
};
F.InitTrig_tingzhijinggao=function* () {
G.gg_trg_tingzhijinggao = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterAnyUnitEventBJ",G.gg_trg_tingzhijinggao,G.EVENT_PLAYER_UNIT_ISSUED_ORDER));
(yield* V.call("TriggerAddCondition",G.gg_trg_tingzhijinggao,(yield* V.call("Condition","Trig_tingzhijinggao_Conditions"))));
(yield* V.call("TriggerAddAction",G.gg_trg_tingzhijinggao,"Trig_tingzhijinggao_Actions"));
};
F.Trig_nanadead_Actions=function* () {
G.udg_nanadead = true;
};
F.InitTrig_nanadead=function* () {
G.gg_trg_nanadead = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterUnitEvent",G.gg_trg_nanadead,G.gg_unit_Hjai_0009,G.EVENT_UNIT_DEATH));
(yield* V.call("TriggerAddAction",G.gg_trg_nanadead,"Trig_nanadead_Actions"));
};
F.Trig_tishiyinyue_Actions=function* () {
(yield* V.call("DisplayTimedTextToForce",(yield* V.call("GetPlayersAll")),20.0,"|c0000ff00玩家一输入“|c00ff0000-数字|c0000ff00”可更换背景音乐，这里的数字可以是1~8。"));
};
F.InitTrig_tishiyinyue=function* () {
G.gg_trg_tishiyinyue = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterTimerEventSingle",G.gg_trg_tishiyinyue,60.0));
(yield* V.call("TriggerAddAction",G.gg_trg_tishiyinyue,"Trig_tishiyinyue_Actions"));
};
F.Trig_yinyue1_Actions=function* () {
(yield* V.call("PlayMusicBJ",G.gg_snd_Credits));
};
F.InitTrig_yinyue1=function* () {
G.gg_trg_yinyue1 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_yinyue1,(yield* V.call("Player",0)),"-1",true));
(yield* V.call("TriggerAddAction",G.gg_trg_yinyue1,"Trig_yinyue1_Actions"));
};
F.Trig_yinyue2_Actions=function* () {
(yield* V.call("PlayMusicBJ",G.gg_snd_Doom));
};
F.InitTrig_yinyue2=function* () {
G.gg_trg_yinyue2 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_yinyue2,(yield* V.call("Player",0)),"-2",true));
(yield* V.call("TriggerAddAction",G.gg_trg_yinyue2,"Trig_yinyue2_Actions"));
};
F.Trig_yinyue3_Actions=function* () {
(yield* V.call("PlayMusicBJ",G.gg_snd_IllidansTheme));
};
F.InitTrig_yinyue3=function* () {
G.gg_trg_yinyue3 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_yinyue3,(yield* V.call("Player",0)),"-3",true));
(yield* V.call("TriggerAddAction",G.gg_trg_yinyue3,"Trig_yinyue3_Actions"));
};
F.Trig_yinyue4_Actions=function* () {
(yield* V.call("PlayMusicBJ",G.gg_snd_LichKingTheme));
};
F.InitTrig_yinyue4=function* () {
G.gg_trg_yinyue4 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_yinyue4,(yield* V.call("Player",0)),"-4",true));
(yield* V.call("TriggerAddAction",G.gg_trg_yinyue4,"Trig_yinyue4_Actions"));
};
F.Trig_yinyue5_Actions=function* () {
(yield* V.call("PlayMusicBJ",G.gg_snd_PH1));
};
F.InitTrig_yinyue5=function* () {
G.gg_trg_yinyue5 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_yinyue5,(yield* V.call("Player",0)),"-5",true));
(yield* V.call("TriggerAddAction",G.gg_trg_yinyue5,"Trig_yinyue5_Actions"));
};
F.Trig_yinyue6_Actions=function* () {
(yield* V.call("PlayMusicBJ",G.gg_snd_SadMystery));
};
F.InitTrig_yinyue6=function* () {
G.gg_trg_yinyue6 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_yinyue6,(yield* V.call("Player",0)),"-6",true));
(yield* V.call("TriggerAddAction",G.gg_trg_yinyue6,"Trig_yinyue6_Actions"));
};
F.Trig_yinyue7_Actions=function* () {
(yield* V.call("PlayMusicBJ",G.gg_snd_PursuitTheme));
};
F.InitTrig_yinyue7=function* () {
G.gg_trg_yinyue7 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_yinyue7,(yield* V.call("Player",0)),"-7",true));
(yield* V.call("TriggerAddAction",G.gg_trg_yinyue7,"Trig_yinyue7_Actions"));
};
F.Trig_yinyue8_Actions=function* () {
(yield* V.call("PlayMusicBJ",G.gg_snd_War2IntroMusic));
};
F.InitTrig_yinyue8=function* () {
G.gg_trg_yinyue8 = (yield* V.call("CreateTrigger"));
(yield* V.call("TriggerRegisterPlayerChatEvent",G.gg_trg_yinyue8,(yield* V.call("Player",0)),"-8",true));
(yield* V.call("TriggerAddAction",G.gg_trg_yinyue8,"Trig_yinyue8_Actions"));
};
F.InitCustomTriggers=function* () {
(yield* V.call("InitGameCacheBJ","MapName.w3v"));
G.udg_GC = G.bj_lastCreatedGameCache;
(yield* V.call("InitTrig_chushiziyuan"));
(yield* V.call("Trig_danji"));
(yield* V.call("InitTrig_mode1_1"));
(yield* V.call("InitTrig_mode2_1"));
(yield* V.call("InitTrig_mode3_1"));
(yield* V.call("InitTrig_mode1xz"));
(yield* V.call("InitTrig_mode2xz"));
(yield* V.call("InitTrig_mode3xz"));
(yield* V.call("InitTrig_TZjianta"));
(yield* V.call("InitTrig_shanc"));
(yield* V.call("InitTrig_guanbitx"));
(yield* V.call("InitTrig_kaiqitx"));
(yield* V.call("InitTrig_kaishi"));
(yield* V.call("InitTrig_Make"));
(yield* V.call("InitTrig_Add_Point"));
(yield* V.call("InitTrig_LRzhuanshen"));
(yield* V.call("InitTrig_LRsiwangqiyue"));
(yield* V.call("InitTrig_LRhuitianmiedi"));
(yield* V.call("InitTrig_LRpaoxiao1"));
(yield* V.call("InitTrig_LRpaoxiao2"));
(yield* V.call("InitTrig_LRpaoxiao3"));
(yield* V.call("InitTrig_LRjingxia1"));
(yield* V.call("InitTrig_LRjingxia2"));
(yield* V.call("InitTrig_LRjingxia3"));
(yield* V.call("InitTrig_LRshuren1"));
(yield* V.call("InitTrig_LRshuren2"));
(yield* V.call("InitTrig_LRshuren3"));
(yield* V.call("InitTrig_LRlang1"));
(yield* V.call("InitTrig_LRlang2"));
(yield* V.call("InitTrig_LRlang3"));
(yield* V.call("InitTrig_LRshandian1"));
(yield* V.call("InitTrig_LRshandian2"));
(yield* V.call("InitTrig_LRshandian3"));
(yield* V.call("InitTrig_LRshandian4"));
(yield* V.call("InitTrig_LRdahuo1"));
(yield* V.call("InitTrig_LRdahuo2"));
(yield* V.call("InitTrig_LRdahuo3"));
(yield* V.call("InitTrig_LRdahuo4"));
(yield* V.call("InitTrig_LRqunxing1"));
(yield* V.call("InitTrig_LRqunxing2"));
(yield* V.call("InitTrig_LRqunxing3"));
(yield* V.call("InitTrig_LRqunxing4"));
(yield* V.call("InitTrig_LRqunbu"));
(yield* V.call("InitTrig_YMmajiajue"));
(yield* V.call("InitTrig_YMsheshenquyi"));
(yield* V.call("InitTrig_YMzhaohuanxiong1"));
(yield* V.call("InitTrig_YMzhaohuanxiong2"));
(yield* V.call("InitTrig_YMzhaohuanxiong3"));
(yield* V.call("InitTrig_YMjingshu1"));
(yield* V.call("InitTrig_YMjingshu2"));
(yield* V.call("InitTrig_YMjingshu3"));
(yield* V.call("InitTrig_YMdiyuhuo1"));
(yield* V.call("InitTrig_YMdiyuhuo2"));
(yield* V.call("InitTrig_YMdiyuhuo3"));
(yield* V.call("InitTrig_YMdiyuhuo4"));
(yield* V.call("InitTrig_YMchongjibo1"));
(yield* V.call("InitTrig_YMchongjibo2"));
(yield* V.call("InitTrig_YMchongjibo3"));
(yield* V.call("InitTrig_YMdimaoci1"));
(yield* V.call("InitTrig_YMdimaoci2"));
(yield* V.call("InitTrig_YMdimaoci3"));
(yield* V.call("InitTrig_YMdimaoci4"));
(yield* V.call("InitTrig_YMfengbaozhichui1"));
(yield* V.call("InitTrig_YMfengbaozhichui2"));
(yield* V.call("InitTrig_YMfengbaozhichui3"));
(yield* V.call("InitTrig_YMfengbaozhichui4"));
(yield* V.call("InitTrig_YMLeiTing"));
(yield* V.call("InitTrig_SSkusimingxiang"));
(yield* V.call("InitTrig_SSbingxueluanwu1"));
(yield* V.call("InitTrig_SSbingxueluanwu2"));
(yield* V.call("InitTrig_SSbingxueluanwu3"));
(yield* V.call("InitTrig_SSbingxueluanwu4"));
(yield* V.call("InitTrig_SSbaofengxue1"));
(yield* V.call("InitTrig_SSbaofengxue2"));
(yield* V.call("InitTrig_SSbaofengxue3"));
(yield* V.call("InitTrig_SSshuiyuansu1"));
(yield* V.call("InitTrig_SSshuiyuansu2"));
(yield* V.call("InitTrig_SSshuiyuansu3"));
(yield* V.call("InitTrig_SSfenghuangniepan1"));
(yield* V.call("InitTrig_SSfenghuangniepan2"));
(yield* V.call("InitTrig_SSfenghuangniepan3"));
(yield* V.call("InitTrig_SSfenghuangniepan4"));
(yield* V.call("InitTrig_SSxixingdafa1"));
(yield* V.call("InitTrig_SSxixingdafa2"));
(yield* V.call("InitTrig_SSxixingdafa3"));
(yield* V.call("InitTrig_SSxixingdafa4"));
(yield* V.call("InitTrig_SSjulang1"));
(yield* V.call("InitTrig_SSjulang2"));
(yield* V.call("InitTrig_SSjulang3"));
(yield* V.call("InitTrig_SSJiejie"));
(yield* V.call("InitTrig_YXchaojipaoxiao"));
(yield* V.call("InitTrig_YXwanjian1"));
(yield* V.call("InitTrig_YXwanjian2"));
(yield* V.call("InitTrig_YXwanjian3"));
(yield* V.call("InitTrig_YXhuoyanyu1"));
(yield* V.call("InitTrig_YXhuoyanyu2"));
(yield* V.call("InitTrig_YXhuoyanyu3"));
(yield* V.call("InitTrig_YXhuoyanyu4"));
(yield* V.call("InitTrig_YXliehuojingu1"));
(yield* V.call("InitTrig_YXliehuojingu2"));
(yield* V.call("InitTrig_YXliehuojingu3"));
(yield* V.call("InitTrig_YXliehuojingu4"));
(yield* V.call("InitTrig_YXdaolunzhan1"));
(yield* V.call("InitTrig_YXdaolunzhan2"));
(yield* V.call("InitTrig_YXdaolunzhan3"));
(yield* V.call("InitTrig_YXshandianhudun1"));
(yield* V.call("InitTrig_YXshandianhudun2"));
(yield* V.call("InitTrig_YXshandianhudun3"));
(yield* V.call("InitTrig_YXshandianhudun4"));
(yield* V.call("InitTrig_YXBingfengqiu"));
(yield* V.call("InitTrig_DZshentouA"));
(yield* V.call("InitTrig_DZshentouB"));
(yield* V.call("InitTrig_DZzhiyutxt"));
(yield* V.call("InitTrig_DZrengqian"));
(yield* V.call("InitTrig_DZsuoding"));
(yield* V.call("InitTrig_DZbaijia1"));
(yield* V.call("InitTrig_DZzhiyu"));
(yield* V.call("InitTrig_DZshentou1"));
(yield* V.call("InitTrig_DZshentou2"));
(yield* V.call("InitTrig_DZshentou3"));
(yield* V.call("InitTrig_DZtouqian"));
(yield* V.call("InitTrig_DZshandianfengbao1"));
(yield* V.call("InitTrig_DZshandianfengbao2"));
(yield* V.call("InitTrig_DZshandianfengbao3"));
(yield* V.call("InitTrig_DZlinghunsuolian1"));
(yield* V.call("InitTrig_DZlinghunsuolian2"));
(yield* V.call("InitTrig_DZlinghunsuolian3"));
(yield* V.call("InitTrig_DZlinghunsuolian4"));
(yield* V.call("InitTrig_DZmorishenpan1"));
(yield* V.call("InitTrig_DZmorishenpan2"));
(yield* V.call("InitTrig_DZmorishenpan3"));
(yield* V.call("InitTrig_DZmorishenpan4"));
(yield* V.call("InitTrig_DZshachongji1"));
(yield* V.call("InitTrig_DZshachongji2"));
(yield* V.call("InitTrig_DZshachongji3"));
(yield* V.call("InitTrig_DZanyingtouxi1"));
(yield* V.call("InitTrig_DZanyingtouxi2"));
(yield* V.call("InitTrig_DZanyingtouxi3"));
(yield* V.call("InitTrig_DZanyingtouxi4"));
(yield* V.call("InitTrig_DZmanteng1"));
(yield* V.call("InitTrig_DZmanteng2"));
(yield* V.call("InitTrig_DZmanteng3"));
(yield* V.call("InitTrig_DZbinggongchang1"));
(yield* V.call("InitTrig_DZbinggongchang2"));
(yield* V.call("InitTrig_DZbinggongchang3"));
(yield* V.call("InitTrig_DZJianrenfengbao"));
(yield* V.call("InitTrig_MJSfennu"));
(yield* V.call("InitTrig_MJSmoliquanshui1"));
(yield* V.call("InitTrig_MJSmoliquanshui2"));
(yield* V.call("InitTrig_MJSmoliquanshui3"));
(yield* V.call("InitTrig_MJSwanjianguizong"));
(yield* V.call("InitTrig_MJSsiwangsuolian1"));
(yield* V.call("InitTrig_MJSsiwangsuolian2"));
(yield* V.call("InitTrig_MJSsiwangsuolian3"));
(yield* V.call("InitTrig_MJSrenlunwu1"));
(yield* V.call("InitTrig_MJSrenlunwu2"));
(yield* V.call("InitTrig_MJSrenlunwu3"));
(yield* V.call("InitTrig_MJSrenlunwu4"));
(yield* V.call("InitTrig_MJSguihuoluanwu1"));
(yield* V.call("InitTrig_MJSguihuoluanwu2"));
(yield* V.call("InitTrig_MJSguihuoluanwu3"));
(yield* V.call("InitTrig_MJSguihuoluanwu4"));
(yield* V.call("InitTrig_MJSwanjianjue1"));
(yield* V.call("InitTrig_MJSwanjianjue2"));
(yield* V.call("InitTrig_MJSwanjianjue3"));
(yield* V.call("InitTrig_MJSwanjianjue4"));
(yield* V.call("InitTrig_MJSlongpao1"));
(yield* V.call("InitTrig_MJSlongpao2"));
(yield* V.call("InitTrig_MJSlongpao3"));
(yield* V.call("InitTrig_MJSnihong1"));
(yield* V.call("InitTrig_MJSnihong2"));
(yield* V.call("InitTrig_MJSnihong3"));
(yield* V.call("InitTrig_Hit"));
(yield* V.call("InitTrig_MJSlingguang1"));
(yield* V.call("InitTrig_MJSlingguang2"));
(yield* V.call("InitTrig_MJSlingguang3"));
(yield* V.call("InitTrig_chushou"));
(yield* V.call("InitTrig_ChakanGXZ"));
(yield* V.call("InitTrig_shougou"));
(yield* V.call("InitTrig_Defeated"));
(yield* V.call("InitTrig_Victory"));
(yield* V.call("InitTrig_Boss_Dead"));
(yield* V.call("InitTrig_Set_Enemies"));
(yield* V.call("InitTrig_nanduxz"));
(yield* V.call("InitTrig_zhiye"));
(yield* V.call("InitTrig_zhiyexz"));
(yield* V.call("InitTrig_xz1"));
(yield* V.call("InitTrig_xz2"));
(yield* V.call("InitTrig_xz3"));
(yield* V.call("InitTrig_xz4"));
(yield* V.call("InitTrig_wq"));
(yield* V.call("InitTrig_a1"));
(yield* V.call("InitTrig_a2"));
(yield* V.call("InitTrig_a3"));
(yield* V.call("InitTrig_a4"));
(yield* V.call("InitTrig_a5"));
(yield* V.call("InitTrig_a6"));
(yield* V.call("InitTrig_a7"));
(yield* V.call("InitTrig_a8"));
(yield* V.call("InitTrig_a9"));
(yield* V.call("InitTrig_b1"));
(yield* V.call("InitTrig_b2"));
(yield* V.call("InitTrig_b3"));
(yield* V.call("InitTrig_b4"));
(yield* V.call("InitTrig_b5"));
(yield* V.call("InitTrig_b6"));
(yield* V.call("InitTrig_b7"));
(yield* V.call("InitTrig_b8"));
(yield* V.call("InitTrig_b9"));
(yield* V.call("InitTrig_c1"));
(yield* V.call("InitTrig_c2"));
(yield* V.call("InitTrig_c3"));
(yield* V.call("InitTrig_c4"));
(yield* V.call("InitTrig_c5"));
(yield* V.call("InitTrig_c6"));
(yield* V.call("InitTrig_c7"));
(yield* V.call("InitTrig_c8"));
(yield* V.call("InitTrig_c9"));
(yield* V.call("InitTrig_d1"));
(yield* V.call("InitTrig_d2"));
(yield* V.call("InitTrig_d3"));
(yield* V.call("InitTrig_d4"));
(yield* V.call("InitTrig_d5"));
(yield* V.call("InitTrig_d6"));
(yield* V.call("InitTrig_d7"));
(yield* V.call("InitTrig_d8"));
(yield* V.call("InitTrig_d9"));
(yield* V.call("InitTrig_AllUnit"));
(yield* V.call("InitTrig_LevelUp"));
(yield* V.call("InitTrig_GetP1"));
(yield* V.call("InitTrig_GetP2"));
(yield* V.call("InitTrig_GetP3"));
(yield* V.call("InitTrig_GetP4"));
(yield* V.call("InitTrig_GetP5"));
(yield* V.call("InitTrig_P1Leave"));
(yield* V.call("InitTrig_P2Leave"));
(yield* V.call("InitTrig_P3Leave"));
(yield* V.call("InitTrig_P4Leave"));
(yield* V.call("InitTrig_P5Leave"));
(yield* V.call("InitTrig_luanpao1"));
(yield* V.call("InitTrig_luanpao2"));
(yield* V.call("InitTrig_luanpao3"));
(yield* V.call("InitTrig_luanpao4"));
(yield* V.call("InitTrig_luanpaoE"));
(yield* V.call("InitTrig_luanpaoA20"));
(yield* V.call("InitTrig_luanpaoB20"));
(yield* V.call("InitTrig_luanpaoC20"));
(yield* V.call("InitTrig_luanpaoD20"));
(yield* V.call("InitTrig_zidingyi75"));
(yield* V.call("InitTrig_Lv1Delete"));
(yield* V.call("InitTrig_dengluwow8"));
(yield* V.call("InitTrig_donghua"));
(yield* V.call("InitTrig_BlueAndRed"));
(yield* V.call("InitTrig_YellowAndGreen"));
(yield* V.call("InitTrig_Black"));
(yield* V.call("InitTrig_Dianhuoju"));
(yield* V.call("InitTrig_nongmingPre1"));
(yield* V.call("InitTrig_nongmingPre2"));
(yield* V.call("InitTrig_nongmingPre3"));
(yield* V.call("InitTrig_nongmingPre4"));
(yield* V.call("InitTrig_nongmingPre5"));
(yield* V.call("InitTrig_jianjie"));
(yield* V.call("InitTrig_TZLRchanrao"));
(yield* V.call("InitTrig_TZMJSzhaohuan"));
(yield* V.call("InitTrig_TZMJSlongyin"));
(yield* V.call("InitTrig_TZMJSzhenwu"));
(yield* V.call("InitTrig_TZSSwuyun"));
(yield* V.call("InitTrig_TZSSlongjuanfeng"));
(yield* V.call("InitTrig_TZDZqiangjie"));
(yield* V.call("InitTrig_TZDZtoushu"));
(yield* V.call("InitTrig_TZAllUnit"));
(yield* V.call("InitTrig_tingzhijinggao"));
(yield* V.call("InitTrig_nanadead"));
(yield* V.call("InitTrig_tishiyinyue"));
(yield* V.call("InitTrig_yinyue1"));
(yield* V.call("InitTrig_yinyue2"));
(yield* V.call("InitTrig_yinyue3"));
(yield* V.call("InitTrig_yinyue4"));
(yield* V.call("InitTrig_yinyue5"));
(yield* V.call("InitTrig_yinyue6"));
(yield* V.call("InitTrig_yinyue7"));
(yield* V.call("InitTrig_yinyue8"));
};
F.RunInitializationTriggers=function* () {
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_chushiziyuan));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_mode1_1));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_Set_Enemies));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_zhiye));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_AllUnit));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_jianjie));
(yield* V.call("ConditionalTriggerExecute",G.gg_trg_TZAllUnit));
};
F.InitUpgrades_Player0=function* () {
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",0)),1378889776,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",0)),1378889777,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",0)),1378889778,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",0)),1378889779,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",0)),1382576237,1));
};
F.InitUpgrades_Player1=function* () {
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",1)),1378889776,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",1)),1378889777,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",1)),1378889778,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",1)),1378889779,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",1)),1382576237,1));
};
F.InitUpgrades_Player2=function* () {
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",2)),1378889776,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",2)),1378889777,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",2)),1378889778,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",2)),1378889779,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",2)),1382576237,1));
};
F.InitUpgrades_Player3=function* () {
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",3)),1378889776,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",3)),1378889777,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",3)),1378889778,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",3)),1378889779,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",3)),1382576237,1));
};
F.InitUpgrades_Player8=function* () {
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",8)),1378889776,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",8)),1378889777,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",8)),1378889778,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",8)),1378889779,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",8)),1382576237,1));
};
F.InitUpgrades_Player9=function* () {
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",9)),1378889776,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",9)),1378889777,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",9)),1378889778,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",9)),1378889779,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",9)),1382576237,1));
};
F.InitUpgrades_Player10=function* () {
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",10)),1378889776,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",10)),1378889777,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",10)),1378889778,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",10)),1378889779,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",10)),1382576237,1));
};
F.InitUpgrades_Player11=function* () {
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",11)),1378889776,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",11)),1378889777,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",11)),1378889778,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",11)),1378889779,1));
(yield* V.call("SetPlayerTechResearched",(yield* V.call("Player",11)),1382576237,1));
};
F.InitUpgrades=function* () {
(yield* V.call("InitUpgrades_Player0"));
(yield* V.call("InitUpgrades_Player1"));
(yield* V.call("InitUpgrades_Player2"));
(yield* V.call("InitUpgrades_Player3"));
(yield* V.call("InitUpgrades_Player8"));
(yield* V.call("InitUpgrades_Player9"));
(yield* V.call("InitUpgrades_Player10"));
(yield* V.call("InitUpgrades_Player11"));
};
F.InitCustomPlayerSlots=function* () {
(yield* V.call("SetPlayerStartLocation",(yield* V.call("Player",0)),0));
(yield* V.call("ForcePlayerStartLocation",(yield* V.call("Player",0)),0));
(yield* V.call("SetPlayerColor",(yield* V.call("Player",0)),(yield* V.call("ConvertPlayerColor",0))));
(yield* V.call("SetPlayerRacePreference",(yield* V.call("Player",0)),G.RACE_PREF_HUMAN));
(yield* V.call("SetPlayerRaceSelectable",(yield* V.call("Player",0)),false));
(yield* V.call("SetPlayerController",(yield* V.call("Player",0)),G.MAP_CONTROL_USER));
(yield* V.call("SetPlayerStartLocation",(yield* V.call("Player",1)),1));
(yield* V.call("ForcePlayerStartLocation",(yield* V.call("Player",1)),1));
(yield* V.call("SetPlayerColor",(yield* V.call("Player",1)),(yield* V.call("ConvertPlayerColor",1))));
(yield* V.call("SetPlayerRacePreference",(yield* V.call("Player",1)),G.RACE_PREF_HUMAN));
(yield* V.call("SetPlayerRaceSelectable",(yield* V.call("Player",1)),false));
(yield* V.call("SetPlayerController",(yield* V.call("Player",1)),G.MAP_CONTROL_USER));
(yield* V.call("SetPlayerStartLocation",(yield* V.call("Player",2)),2));
(yield* V.call("ForcePlayerStartLocation",(yield* V.call("Player",2)),2));
(yield* V.call("SetPlayerColor",(yield* V.call("Player",2)),(yield* V.call("ConvertPlayerColor",2))));
(yield* V.call("SetPlayerRacePreference",(yield* V.call("Player",2)),G.RACE_PREF_HUMAN));
(yield* V.call("SetPlayerRaceSelectable",(yield* V.call("Player",2)),false));
(yield* V.call("SetPlayerController",(yield* V.call("Player",2)),G.MAP_CONTROL_USER));
(yield* V.call("SetPlayerStartLocation",(yield* V.call("Player",3)),3));
(yield* V.call("ForcePlayerStartLocation",(yield* V.call("Player",3)),3));
(yield* V.call("SetPlayerColor",(yield* V.call("Player",3)),(yield* V.call("ConvertPlayerColor",3))));
(yield* V.call("SetPlayerRacePreference",(yield* V.call("Player",3)),G.RACE_PREF_HUMAN));
(yield* V.call("SetPlayerRaceSelectable",(yield* V.call("Player",3)),false));
(yield* V.call("SetPlayerController",(yield* V.call("Player",3)),G.MAP_CONTROL_USER));
(yield* V.call("SetPlayerStartLocation",(yield* V.call("Player",8)),4));
(yield* V.call("ForcePlayerStartLocation",(yield* V.call("Player",8)),4));
(yield* V.call("SetPlayerColor",(yield* V.call("Player",8)),(yield* V.call("ConvertPlayerColor",8))));
(yield* V.call("SetPlayerRacePreference",(yield* V.call("Player",8)),G.RACE_PREF_UNDEAD));
(yield* V.call("SetPlayerRaceSelectable",(yield* V.call("Player",8)),false));
(yield* V.call("SetPlayerController",(yield* V.call("Player",8)),G.MAP_CONTROL_COMPUTER));
(yield* V.call("SetPlayerStartLocation",(yield* V.call("Player",9)),5));
(yield* V.call("ForcePlayerStartLocation",(yield* V.call("Player",9)),5));
(yield* V.call("SetPlayerColor",(yield* V.call("Player",9)),(yield* V.call("ConvertPlayerColor",9))));
(yield* V.call("SetPlayerRacePreference",(yield* V.call("Player",9)),G.RACE_PREF_UNDEAD));
(yield* V.call("SetPlayerRaceSelectable",(yield* V.call("Player",9)),false));
(yield* V.call("SetPlayerController",(yield* V.call("Player",9)),G.MAP_CONTROL_COMPUTER));
(yield* V.call("SetPlayerStartLocation",(yield* V.call("Player",10)),6));
(yield* V.call("ForcePlayerStartLocation",(yield* V.call("Player",10)),6));
(yield* V.call("SetPlayerColor",(yield* V.call("Player",10)),(yield* V.call("ConvertPlayerColor",10))));
(yield* V.call("SetPlayerRacePreference",(yield* V.call("Player",10)),G.RACE_PREF_UNDEAD));
(yield* V.call("SetPlayerRaceSelectable",(yield* V.call("Player",10)),false));
(yield* V.call("SetPlayerController",(yield* V.call("Player",10)),G.MAP_CONTROL_COMPUTER));
(yield* V.call("SetPlayerStartLocation",(yield* V.call("Player",11)),7));
(yield* V.call("ForcePlayerStartLocation",(yield* V.call("Player",11)),7));
(yield* V.call("SetPlayerColor",(yield* V.call("Player",11)),(yield* V.call("ConvertPlayerColor",11))));
(yield* V.call("SetPlayerRacePreference",(yield* V.call("Player",11)),G.RACE_PREF_UNDEAD));
(yield* V.call("SetPlayerRaceSelectable",(yield* V.call("Player",11)),false));
(yield* V.call("SetPlayerController",(yield* V.call("Player",11)),G.MAP_CONTROL_COMPUTER));
};
F.InitCustomTeams=function* () {
(yield* V.call("SetPlayerTeam",(yield* V.call("Player",0)),0));
(yield* V.call("SetPlayerTeam",(yield* V.call("Player",1)),0));
(yield* V.call("SetPlayerTeam",(yield* V.call("Player",2)),0));
(yield* V.call("SetPlayerTeam",(yield* V.call("Player",3)),0));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",0)),(yield* V.call("Player",1)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",0)),(yield* V.call("Player",2)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",0)),(yield* V.call("Player",3)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",1)),(yield* V.call("Player",0)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",1)),(yield* V.call("Player",2)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",1)),(yield* V.call("Player",3)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",2)),(yield* V.call("Player",0)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",2)),(yield* V.call("Player",1)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",2)),(yield* V.call("Player",3)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",3)),(yield* V.call("Player",0)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",3)),(yield* V.call("Player",1)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",3)),(yield* V.call("Player",2)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",0)),(yield* V.call("Player",1)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",0)),(yield* V.call("Player",2)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",0)),(yield* V.call("Player",3)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",1)),(yield* V.call("Player",0)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",1)),(yield* V.call("Player",2)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",1)),(yield* V.call("Player",3)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",2)),(yield* V.call("Player",0)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",2)),(yield* V.call("Player",1)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",2)),(yield* V.call("Player",3)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",3)),(yield* V.call("Player",0)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",3)),(yield* V.call("Player",1)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",3)),(yield* V.call("Player",2)),true));
(yield* V.call("SetPlayerTeam",(yield* V.call("Player",8)),1));
(yield* V.call("SetPlayerTeam",(yield* V.call("Player",9)),1));
(yield* V.call("SetPlayerTeam",(yield* V.call("Player",10)),1));
(yield* V.call("SetPlayerTeam",(yield* V.call("Player",11)),1));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",8)),(yield* V.call("Player",9)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",8)),(yield* V.call("Player",10)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",8)),(yield* V.call("Player",11)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",9)),(yield* V.call("Player",8)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",9)),(yield* V.call("Player",10)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",9)),(yield* V.call("Player",11)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",10)),(yield* V.call("Player",8)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",10)),(yield* V.call("Player",9)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",10)),(yield* V.call("Player",11)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",11)),(yield* V.call("Player",8)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",11)),(yield* V.call("Player",9)),true));
(yield* V.call("SetPlayerAllianceStateAllyBJ",(yield* V.call("Player",11)),(yield* V.call("Player",10)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",8)),(yield* V.call("Player",9)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",8)),(yield* V.call("Player",10)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",8)),(yield* V.call("Player",11)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",9)),(yield* V.call("Player",8)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",9)),(yield* V.call("Player",10)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",9)),(yield* V.call("Player",11)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",10)),(yield* V.call("Player",8)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",10)),(yield* V.call("Player",9)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",10)),(yield* V.call("Player",11)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",11)),(yield* V.call("Player",8)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",11)),(yield* V.call("Player",9)),true));
(yield* V.call("SetPlayerAllianceStateVisionBJ",(yield* V.call("Player",11)),(yield* V.call("Player",10)),true));
};
F.InitAllyPriorities=function* () {
(yield* V.call("SetStartLocPrioCount",0,3));
(yield* V.call("SetStartLocPrio",0,0,1,G.MAP_LOC_PRIO_HIGH));
(yield* V.call("SetStartLocPrio",0,1,2,G.MAP_LOC_PRIO_LOW));
(yield* V.call("SetStartLocPrio",0,2,3,G.MAP_LOC_PRIO_HIGH));
(yield* V.call("SetStartLocPrioCount",1,3));
(yield* V.call("SetStartLocPrio",1,0,0,G.MAP_LOC_PRIO_HIGH));
(yield* V.call("SetStartLocPrio",1,1,2,G.MAP_LOC_PRIO_HIGH));
(yield* V.call("SetStartLocPrio",1,2,3,G.MAP_LOC_PRIO_LOW));
(yield* V.call("SetStartLocPrioCount",2,3));
(yield* V.call("SetStartLocPrio",2,0,0,G.MAP_LOC_PRIO_LOW));
(yield* V.call("SetStartLocPrio",2,1,1,G.MAP_LOC_PRIO_HIGH));
(yield* V.call("SetStartLocPrio",2,2,3,G.MAP_LOC_PRIO_HIGH));
(yield* V.call("SetStartLocPrioCount",3,3));
(yield* V.call("SetStartLocPrio",3,0,0,G.MAP_LOC_PRIO_HIGH));
(yield* V.call("SetStartLocPrio",3,1,1,G.MAP_LOC_PRIO_LOW));
(yield* V.call("SetStartLocPrio",3,2,2,G.MAP_LOC_PRIO_HIGH));
};
F.main=function* () {
(yield* V.call("SetCameraBounds",((-7424.0) + (yield* V.call("GetCameraMargin",G.CAMERA_MARGIN_LEFT))),((-7680.0) + (yield* V.call("GetCameraMargin",G.CAMERA_MARGIN_BOTTOM))),(7424.0 - (yield* V.call("GetCameraMargin",G.CAMERA_MARGIN_RIGHT))),(7168.0 - (yield* V.call("GetCameraMargin",G.CAMERA_MARGIN_TOP))),((-7424.0) + (yield* V.call("GetCameraMargin",G.CAMERA_MARGIN_LEFT))),(7168.0 - (yield* V.call("GetCameraMargin",G.CAMERA_MARGIN_TOP))),(7424.0 - (yield* V.call("GetCameraMargin",G.CAMERA_MARGIN_RIGHT))),((-7680.0) + (yield* V.call("GetCameraMargin",G.CAMERA_MARGIN_BOTTOM)))));
(yield* V.call("SetDayNightModels","Environment\\DNC\\DNCLordaeron\\DNCLordaeronTerrain\\DNCLordaeronTerrain.mdl","Environment\\DNC\\DNCLordaeron\\DNCLordaeronUnit\\DNCLordaeronUnit.mdl"));
(yield* V.call("NewSoundEnvironment","Default"));
(yield* V.call("SetAmbientDaySound","LordaeronSummerDay"));
(yield* V.call("SetAmbientNightSound","LordaeronSummerNight"));
(yield* V.call("SetMapMusic","Music",true,0));
(yield* V.call("InitSounds"));
(yield* V.call("CreateRegions"));
(yield* V.call("CreateCameras"));
(yield* V.call("InitUpgrades"));
(yield* V.call("CreateAllUnits"));
(yield* V.call("InitBlizzard"));
(yield* V.call("InitGlobals"));
(yield* V.call("InitCustomTriggers"));
(yield* V.call("RunInitializationTriggers"));
};
F.config=function* () {
(yield* V.call("SetMapName","人族无敌II3.0终极版"));
(yield* V.call("SetMapDescription","  |c0000FF00国王哈迪斯不忍雅典娜遭受牢狱之苦，不久便将雅典娜秘密放出，让她重获自由。雅典娜并没有因此心存感激，而是秘密地组建又一支更加强大的邪恶军团(魑魅魍魉)，向人类发起了新一轮的进攻……|r\n                     作者:|c00FF0000恋风吹雪|r(searchlove)"));
(yield* V.call("SetPlayers",8));
(yield* V.call("SetTeams",8));
(yield* V.call("SetGamePlacement",G.MAP_PLACEMENT_TEAMS_TOGETHER));
(yield* V.call("DefineStartLocation",0,(-3008.0),2432.0));
(yield* V.call("DefineStartLocation",1,(-3008.0),(-2880.0)));
(yield* V.call("DefineStartLocation",2,2496.0,(-3008.0)));
(yield* V.call("DefineStartLocation",3,2496.0,2368.0));
(yield* V.call("DefineStartLocation",4,(-6016.0),5632.0));
(yield* V.call("DefineStartLocation",5,(-6144.0),(-6272.0)));
(yield* V.call("DefineStartLocation",6,6016.0,(-6272.0)));
(yield* V.call("DefineStartLocation",7,6016.0,5568.0));
(yield* V.call("InitCustomPlayerSlots"));
(yield* V.call("InitCustomTeams"));
(yield* V.call("InitAllyPriorities"));
};
}