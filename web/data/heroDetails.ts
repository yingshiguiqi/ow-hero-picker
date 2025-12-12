/**
 * 英雄详细信息数据
 * 包含技能、定位、玩法说明等
 */

export interface HeroAbility {
  name: string;
  key: string; // 按键
  description: string;
  cooldown?: number; // 冷却时间（秒）
  type: "primary" | "secondary" | "ability" | "ultimate" | "passive";
}

export interface HeroDetail {
  heroId: string;
  difficulty: 1 | 2 | 3; // 难度 1-3星
  playstyle: string; // 玩法定位
  strengths: string[]; // 优势
  weaknesses: string[]; // 劣势
  tips: string[]; // 玩法技巧
  abilities: HeroAbility[];
  synergies: string[]; // 配合英雄ID
  mapPreferences: {
    good: string[]; // 擅长的地图类型
    bad: string[]; // 不擅长的地图类型
  };
}

export const heroDetails: Record<string, HeroDetail> = {
  // ===== 坦克 =====
  dva: {
    heroId: "dva",
    difficulty: 2,
    playstyle: "机动坦克，擅长骚扰和保护队友",
    strengths: [
      "高机动性，可快速支援",
      "防御矩阵吸收投射物",
      "自毁可造成大范围伤害",
      "机甲被毁后有第二条命",
    ],
    weaknesses: [
      "大体型容易被集火",
      "矩阵无法吸收激光类攻击",
      "近战伤害较低",
      "充能需要时间",
    ],
    tips: [
      "用矩阵保护队友免受关键技能伤害",
      "推进器可用于撞击敌人造成伤害",
      "自毁配合温斯顿/查莉娅大招效果更佳",
      "小D.Va不要恋战，优先找掩体",
    ],
    abilities: [
      {
        name: "聚变机炮",
        key: "左键",
        description: "近距离散射武器",
        type: "primary",
      },
      {
        name: "防御矩阵",
        key: "右键",
        description: "吸收前方投射物",
        type: "secondary",
        cooldown: 1,
      },
      {
        name: "推进器",
        key: "Shift",
        description: "快速飞行",
        type: "ability",
        cooldown: 4,
      },
      {
        name: "微型飞弹",
        key: "E",
        description: "发射一群小型飞弹",
        type: "ability",
        cooldown: 7,
      },
      {
        name: "自毁",
        key: "Q",
        description: "引爆机甲造成大范围伤害",
        type: "ultimate",
      },
    ],
    synergies: ["ana", "mercy", "zarya", "winston"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  reinhardt: {
    heroId: "reinhardt",
    difficulty: 1,
    playstyle: "主坦克，为队伍提供屏障保护",
    strengths: [
      "大型屏障保护队友",
      "近战伤害高",
      "冲锋可秒杀脆皮",
      "大招可击倒多个敌人",
    ],
    weaknesses: ["机动性差", "容易被绕后", "盾破后较脆弱", "被远程消耗"],
    tips: [
      "不要一直举盾，适时进攻",
      "冲锋要谨慎，避免冲进敌群",
      "大锤挥舞可穿透护盾",
      "配合卢西奥加速更容易接近敌人",
    ],
    abilities: [
      {
        name: "火箭锤",
        key: "左键",
        description: "大范围近战攻击",
        type: "primary",
      },
      {
        name: "屏障力场",
        key: "右键",
        description: "展开大型护盾",
        type: "secondary",
      },
      {
        name: "冲锋",
        key: "Shift",
        description: "向前冲锋并撞击敌人",
        type: "ability",
        cooldown: 10,
      },
      {
        name: "烈焰打击",
        key: "E",
        description: "发射火焰弹",
        type: "ability",
        cooldown: 6,
      },
      {
        name: "裂地猛击",
        key: "Q",
        description: "击倒前方敌人",
        type: "ultimate",
      },
    ],
    synergies: ["ana", "lucio", "zarya", "brigitte"],
    mapPreferences: {
      good: ["混合推车图", "纯推车图"],
      bad: ["抢点图"],
    },
  },

  winston: {
    heroId: "winston",
    difficulty: 2,
    playstyle: "跳跃坦克，擅长骚扰后排",
    strengths: [
      "高机动性，可跳跃进场",
      "自动瞄准武器克制高机动目标",
      "屏障可保护自己和队友",
      "大招可打乱敌方阵型",
    ],
    weaknesses: [
      "伤害较低",
      "被死神等近战英雄克制",
      "屏障血量有限",
      "需要队伍配合跟进",
    ],
    tips: [
      "跳跃落地有伤害，可用于收割残血",
      "屏障放置位置很重要",
      "大招可用于拖延时间或环境击杀",
      "优先攻击敌方辅助",
    ],
    abilities: [
      {
        name: "特斯拉炮",
        key: "左键",
        description: "自动瞄准电击",
        type: "primary",
      },
      {
        name: "屏障发生器",
        key: "E",
        description: "放置圆顶护盾",
        type: "ability",
        cooldown: 12,
      },
      {
        name: "喷射背包",
        key: "Shift",
        description: "跳跃到指定位置",
        type: "ability",
        cooldown: 6,
      },
      {
        name: "原始暴怒",
        key: "Q",
        description: "变身狂暴状态",
        type: "ultimate",
      },
    ],
    synergies: ["dva", "tracer", "genji", "kiriko"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  zarya: {
    heroId: "zarya",
    difficulty: 3,
    playstyle: "充能坦克，伤害随能量增长",
    strengths: [
      "护盾可保护自己和队友",
      "高能量时伤害极高",
      "大招可控制多个敌人",
      "可解除队友控制效果",
    ],
    weaknesses: [
      "低能量时伤害低",
      "没有位移技能",
      "护盾冷却时较脆弱",
      "需要良好的能量管理",
    ],
    tips: [
      "在敌人攻击时开盾获取能量",
      "保护被集火的队友可快速充能",
      "大招配合其他伤害技能效果最佳",
      "高能量时积极进攻",
    ],
    abilities: [
      {
        name: "粒子炮",
        key: "左键",
        description: "激光束攻击",
        type: "primary",
      },
      {
        name: "粒子炮",
        key: "右键",
        description: "能量弹攻击",
        type: "secondary",
      },
      {
        name: "粒子屏障",
        key: "Shift",
        description: "为自己套盾",
        type: "ability",
        cooldown: 10,
      },
      {
        name: "投射屏障",
        key: "E",
        description: "为队友套盾",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "引力弹",
        key: "Q",
        description: "将敌人拉到一起",
        type: "ultimate",
      },
    ],
    synergies: ["reinhardt", "hanzo", "pharah", "genji"],
    mapPreferences: {
      good: ["混合推车图", "纯推车图"],
      bad: ["抢点图"],
    },
  },

  roadhog: {
    heroId: "roadhog",
    difficulty: 1,
    playstyle: "自给自足的近战坦克",
    strengths: [
      "钩子可拉取敌人",
      "自我治疗能力强",
      "近距离伤害高",
      "可单独击杀脆皮",
    ],
    weaknesses: [
      "大体型容易被打",
      "给敌方充大招",
      "没有护盾保护队友",
      "钩子失误后较被动",
    ],
    tips: [
      "钩子后立即开枪+近战连招",
      "自我治疗时减伤50%",
      "大招可用于推人或收割",
      "注意不要给敌方送大招能量",
    ],
    abilities: [
      {
        name: "废料枪",
        key: "左键",
        description: "近距离散射",
        type: "primary",
      },
      {
        name: "废料枪",
        key: "右键",
        description: "远距离弹片",
        type: "secondary",
      },
      {
        name: "链钩",
        key: "Shift",
        description: "拉取敌人",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "自我修复",
        key: "E",
        description: "恢复生命值",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "猪圈蹦迪",
        key: "Q",
        description: "持续射击并击退敌人",
        type: "ultimate",
      },
    ],
    synergies: ["ana", "kiriko", "orisa"],
    mapPreferences: {
      good: ["混合推车图"],
      bad: ["机动推进图"],
    },
  },

  sigma: {
    heroId: "sigma",
    difficulty: 3,
    playstyle: "远程坦克，擅长控制和吸收伤害",
    strengths: [
      "可吸收伤害转化为护盾",
      "远程攻击能力强",
      "大招可控制区域",
      "屏障可灵活放置",
    ],
    weaknesses: ["机动性差", "近战时较弱", "屏障血量有限", "被穿盾英雄克制"],
    tips: [
      "吸收敌人投射物获取护盾",
      "石头可打断敌人技能",
      "屏障可远程放置保护队友",
      "大招可配合队友技能",
    ],
    abilities: [
      {
        name: "超球体",
        key: "左键",
        description: "发射弹跳球体",
        type: "primary",
      },
      {
        name: "动能吸收",
        key: "右键",
        description: "吸收伤害转化为护盾",
        type: "secondary",
        cooldown: 10,
      },
      {
        name: "实验屏障",
        key: "Shift",
        description: "远程放置屏障",
        type: "ability",
      },
      {
        name: "质量吸附",
        key: "E",
        description: "投掷石块击晕敌人",
        type: "ability",
        cooldown: 10,
      },
      {
        name: "万有引力崩溃",
        key: "Q",
        description: "将敌人举起并摔下",
        type: "ultimate",
      },
    ],
    synergies: ["baptiste", "ana", "hanzo"],
    mapPreferences: {
      good: ["纯推车图", "混合推车图"],
      bad: ["抢点图"],
    },
  },

  // ===== 输出 =====
  tracer: {
    heroId: "tracer",
    difficulty: 3,
    playstyle: "高机动刺客，擅长骚扰和收割",
    strengths: [
      "极高机动性",
      "可回溯时间恢复状态",
      "近距离爆发伤害高",
      "可快速进出战场",
    ],
    weaknesses: [
      "血量极低",
      "被控制后容易死亡",
      "弹匣较小需要频繁换弹",
      "远距离伤害低",
    ],
    tips: [
      "记住回溯位置，避免回到危险区域",
      "闪烁可用于躲避技能",
      "脉冲炸弹贴脸扔更准",
      "优先攻击落单的辅助",
    ],
    abilities: [
      {
        name: "脉冲双枪",
        key: "左键",
        description: "快速射击",
        type: "primary",
      },
      {
        name: "闪烁",
        key: "Shift",
        description: "短距离传送",
        type: "ability",
        cooldown: 3,
      },
      {
        name: "回溯",
        key: "E",
        description: "回到3秒前的状态",
        type: "ability",
        cooldown: 12,
      },
      {
        name: "脉冲炸弹",
        key: "Q",
        description: "投掷粘性炸弹",
        type: "ultimate",
      },
    ],
    synergies: ["winston", "dva", "zenyatta"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  genji: {
    heroId: "genji",
    difficulty: 3,
    playstyle: "忍者刺客，擅长收割和骚扰",
    strengths: [
      "高机动性，可攀墙和二段跳",
      "闪可弹反伤害",
      "龙刃可团灭敌人",
      "击杀后重置突进",
    ],
    weaknesses: [
      "血量较低",
      "被自动瞄准英雄克制",
      "龙刃需要队伍配合",
      "远距离伤害不稳定",
    ],
    tips: [
      "闪可弹反大部分投射物",
      "突进击杀后立即重置",
      "龙刃配合纳米/加速效果更佳",
      "利用地形进行骚扰",
    ],
    abilities: [
      {
        name: "手里剑",
        key: "左键",
        description: "投掷手里剑",
        type: "primary",
      },
      {
        name: "手里剑",
        key: "右键",
        description: "扇形投掷",
        type: "secondary",
      },
      {
        name: "影",
        key: "Shift",
        description: "快速突进",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "闪",
        key: "E",
        description: "弹反攻击",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "龙刃",
        key: "Q",
        description: "拔出龙刃近战攻击",
        type: "ultimate",
      },
    ],
    synergies: ["ana", "mercy", "zarya", "winston"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  widowmaker: {
    heroId: "widowmaker",
    difficulty: 3,
    playstyle: "远程狙击手，擅长秒杀和侦查",
    strengths: [
      "远距离一击必杀",
      "钩爪可到达高点",
      "毒雷可侦查敌人",
      "大招可透视敌人位置",
    ],
    weaknesses: [
      "近战能力弱",
      "被高机动英雄克制",
      "需要良好的瞄准能力",
      "对团队贡献依赖击杀",
    ],
    tips: [
      "优先击杀敌方辅助",
      "利用钩爪寻找好的狙击点",
      "毒雷放在敌人必经之路",
      "大招可帮助队伍掌握信息",
    ],
    abilities: [
      {
        name: "寡妇之吻",
        key: "左键",
        description: "自动步枪模式",
        type: "primary",
      },
      {
        name: "寡妇之吻",
        key: "右键",
        description: "狙击模式",
        type: "secondary",
      },
      {
        name: "抓钩",
        key: "Shift",
        description: "钩到指定位置",
        type: "ability",
        cooldown: 12,
      },
      {
        name: "剧毒地雷",
        key: "E",
        description: "放置侦查地雷",
        type: "ability",
        cooldown: 15,
      },
      {
        name: "红外侦测",
        key: "Q",
        description: "透视所有敌人",
        type: "ultimate",
      },
    ],
    synergies: ["mercy", "hanzo", "ashe"],
    mapPreferences: {
      good: ["纯推车图", "混合推车图"],
      bad: ["抢点图"],
    },
  },

  pharah: {
    heroId: "pharah",
    difficulty: 2,
    playstyle: "空中火力，擅长高空压制",
    strengths: [
      "可持续飞行",
      "对地面目标有优势",
      "火箭弹范围伤害",
      "大招伤害极高",
    ],
    weaknesses: [
      "被hitscan英雄克制",
      "大招时自己也很脆弱",
      "需要队伍保护",
      "室内地图较弱",
    ],
    tips: [
      "配合天使可持续输出",
      "利用震荡弹推人下悬崖",
      "大招时注意敌方hitscan位置",
      "保持高度优势",
    ],
    abilities: [
      {
        name: "火箭发射器",
        key: "左键",
        description: "发射火箭弹",
        type: "primary",
      },
      {
        name: "震荡弹",
        key: "E",
        description: "击退敌人",
        type: "ability",
        cooldown: 9,
      },
      {
        name: "喷射飞行",
        key: "Shift",
        description: "向上飞行",
        type: "ability",
      },
      {
        name: "悬浮喷射",
        key: "空格",
        description: "悬浮在空中",
        type: "passive",
      },
      {
        name: "火箭弹幕",
        key: "Q",
        description: "发射大量火箭",
        type: "ultimate",
      },
    ],
    synergies: ["mercy", "ana", "zarya"],
    mapPreferences: {
      good: ["抢点图", "混合推车图"],
      bad: ["机动推进图"],
    },
  },

  // ===== 辅助 =====
  ana: {
    heroId: "ana",
    difficulty: 3,
    playstyle: "狙击治疗，擅长远程治疗和反制",
    strengths: [
      "远程治疗能力强",
      "睡眠飞镖可控制敌人",
      "生物手雷可反奶",
      "纳米激素可强化队友",
    ],
    weaknesses: [
      "没有位移技能",
      "被高机动英雄克制",
      "需要良好的瞄准",
      "自我保护能力弱",
    ],
    tips: [
      "睡眠飞镖优先用于关键目标",
      "手雷可用于自保或反奶",
      "纳米给龙刃/猩猩效果好",
      "保持与队伍的距离",
    ],
    abilities: [
      {
        name: "生物步枪",
        key: "左键",
        description: "治疗队友或伤害敌人",
        type: "primary",
      },
      {
        name: "生物步枪",
        key: "右键",
        description: "瞄准镜模式",
        type: "secondary",
      },
      {
        name: "睡眠飞镖",
        key: "Shift",
        description: "使敌人昏睡",
        type: "ability",
        cooldown: 14,
      },
      {
        name: "生物手雷",
        key: "E",
        description: "治疗增益/反奶",
        type: "ability",
        cooldown: 10,
      },
      { name: "纳米激素", key: "Q", description: "强化队友", type: "ultimate" },
    ],
    synergies: ["reinhardt", "genji", "roadhog", "ramattra"],
    mapPreferences: {
      good: ["纯推车图", "混合推车图"],
      bad: ["抢点图"],
    },
  },

  mercy: {
    heroId: "mercy",
    difficulty: 1,
    playstyle: "飞行治疗，擅长单体治疗和增伤",
    strengths: [
      "持续治疗能力强",
      "可增强队友伤害",
      "复活可挽回劣势",
      "高机动性",
    ],
    weaknesses: [
      "自身伤害低",
      "复活时很脆弱",
      "依赖队友保护",
      "被高机动敌人克制",
    ],
    tips: [
      "优先治疗坦克和关键输出",
      "复活要注意安全",
      "增伤给高爆发英雄效果好",
      "利用守护天使保持机动",
    ],
    abilities: [
      {
        name: "天使权杖",
        key: "左键",
        description: "治疗光束",
        type: "primary",
      },
      {
        name: "天使权杖",
        key: "右键",
        description: "增伤光束",
        type: "secondary",
      },
      {
        name: "守护天使",
        key: "Shift",
        description: "飞向队友",
        type: "ability",
        cooldown: 1.5,
      },
      {
        name: "复活",
        key: "E",
        description: "复活队友",
        type: "ability",
        cooldown: 30,
      },
      {
        name: "英勇",
        key: "Q",
        description: "飞行并强化能力",
        type: "ultimate",
      },
    ],
    synergies: ["pharah", "ashe", "echo", "genji"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["机动推进图"],
    },
  },

  lucio: {
    heroId: "lucio",
    difficulty: 2,
    playstyle: "范围治疗，擅长加速和推人",
    strengths: [
      "范围治疗/加速",
      "高机动性可滑墙",
      "大招可提供护盾",
      "推人可环境击杀",
    ],
    weaknesses: [
      "单体治疗量低",
      "需要靠近队友",
      "被远程英雄克制",
      "大招需要预判",
    ],
    tips: [
      "加速帮助队伍快速进场",
      "推人配合悬崖地形",
      "大招要提前开，不要等队友快死",
      "利用滑墙保持机动",
    ],
    abilities: [
      {
        name: "音波枪",
        key: "左键",
        description: "发射音波弹",
        type: "primary",
      },
      {
        name: "音波枪",
        key: "右键",
        description: "击退敌人",
        type: "secondary",
        cooldown: 4,
      },
      {
        name: "切歌",
        key: "Shift",
        description: "切换治疗/加速",
        type: "ability",
      },
      {
        name: "强音",
        key: "E",
        description: "增强当前效果",
        type: "ability",
        cooldown: 12,
      },
      { name: "音障", key: "Q", description: "提供临时护盾", type: "ultimate" },
    ],
    synergies: ["reinhardt", "dva", "winston", "brigitte"],
    mapPreferences: {
      good: ["抢点图", "机动推进图"],
      bad: ["纯推车图"],
    },
  },

  zenyatta: {
    heroId: "zenyatta",
    difficulty: 3,
    playstyle: "攻击型治疗，擅长增伤和远程输出",
    strengths: [
      "不和珠增加敌人受到的伤害",
      "远程伤害高",
      "大招可团队无敌",
      "可同时治疗和输出",
    ],
    weaknesses: ["机动性差", "血量低", "被高机动英雄克制", "单体治疗量有限"],
    tips: [
      "不和珠优先给坦克或关键目标",
      "蓄力球可秒杀脆皮",
      "大招可反制敌方大招",
      "保持距离，利用输出能力",
    ],
    abilities: [
      {
        name: "毁灭之珠",
        key: "左键",
        description: "发射能量球",
        type: "primary",
      },
      {
        name: "毁灭之珠",
        key: "右键",
        description: "蓄力发射",
        type: "secondary",
      },
      {
        name: "谐和之珠",
        key: "Shift",
        description: "持续治疗队友",
        type: "ability",
      },
      {
        name: "不和之珠",
        key: "E",
        description: "增加敌人受到的伤害",
        type: "ability",
      },
      {
        name: "超凡入圣",
        key: "Q",
        description: "范围无敌治疗",
        type: "ultimate",
      },
    ],
    synergies: ["tracer", "genji", "winston", "dva"],
    mapPreferences: {
      good: ["纯推车图", "混合推车图"],
      bad: ["抢点图"],
    },
  },

  // ===== 更多坦克 =====
  orisa: {
    heroId: "orisa",
    difficulty: 1,
    playstyle: "前线坦克，擅长持续输出和控制",
    strengths: [
      "持续输出能力强",
      "矛刺可控制敌人",
      "坚毅可免疫控制",
      "大招可拉取并伤害敌人",
    ],
    weaknesses: [
      "机动性差",
      "大体型容易被集火",
      "没有护盾保护队友",
      "被远程消耗",
    ],
    tips: [
      "矛刺可打断敌人技能和大招",
      "坚毅在关键时刻使用",
      "大招配合队友技能效果更佳",
      "利用能量标枪远程骚扰",
    ],
    abilities: [
      {
        name: "增强聚变驱动器",
        key: "左键",
        description: "持续射击",
        type: "primary",
      },
      {
        name: "能量标枪",
        key: "右键",
        description: "投掷标枪击退敌人",
        type: "secondary",
        cooldown: 6,
      },
      {
        name: "坚毅",
        key: "Shift",
        description: "获得生命加成并免疫控制",
        type: "ability",
        cooldown: 16,
      },
      {
        name: "标枪旋转",
        key: "E",
        description: "旋转标枪抵挡伤害",
        type: "ability",
        cooldown: 9,
      },
      {
        name: "大地崩裂",
        key: "Q",
        description: "拉取并伤害敌人",
        type: "ultimate",
      },
    ],
    synergies: ["ana", "baptiste", "sigma"],
    mapPreferences: {
      good: ["混合推车图", "纯推车图"],
      bad: ["抢点图"],
    },
  },

  wrecking_ball: {
    heroId: "wrecking_ball",
    difficulty: 3,
    playstyle: "高机动干扰坦克，擅长打乱敌方阵型",
    strengths: [
      "极高机动性",
      "可快速进出战场",
      "大招可控制区域",
      "自适应护盾提供生存能力",
    ],
    weaknesses: [
      "被控制后容易死亡",
      "需要高超操作技巧",
      "团队配合要求高",
      "被黑影克制",
    ],
    tips: [
      "利用钩爪加速撞击敌人",
      "自适应护盾在敌群中使用",
      "大招可用于分割战场",
      "保持移动，不要停留",
    ],
    abilities: [
      {
        name: "四联机炮",
        key: "左键",
        description: "双枪射击",
        type: "primary",
      },
      {
        name: "抓钩",
        key: "右键",
        description: "钩住物体摆动",
        type: "secondary",
        cooldown: 5,
      },
      { name: "滚动", key: "Shift", description: "变成球形", type: "ability" },
      {
        name: "自适应护盾",
        key: "E",
        description: "获得临时护盾",
        type: "ability",
        cooldown: 15,
      },
      {
        name: "地雷禁区",
        key: "Q",
        description: "部署地雷阵",
        type: "ultimate",
      },
    ],
    synergies: ["tracer", "sombra", "lucio"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  junker_queen: {
    heroId: "junker_queen",
    difficulty: 2,
    playstyle: "近战坦克，擅长持续战斗和自我恢复",
    strengths: [
      "流血效果提供持续伤害和治疗",
      "近战伤害高",
      "大招可反奶",
      "冲锋可快速接近敌人",
    ],
    weaknesses: ["被远程风筝", "没有护盾", "需要近身才能发挥", "被反奶克制"],
    tips: [
      "飞刀命中后可拉回造成额外伤害",
      "大招可打断敌方治疗",
      "利用冲锋接近敌人",
      "保持流血效果维持生存",
    ],
    abilities: [
      {
        name: "散射枪",
        key: "左键",
        description: "霰弹枪射击",
        type: "primary",
      },
      {
        name: "锯齿刀",
        key: "右键",
        description: "投掷飞刀",
        type: "secondary",
        cooldown: 6,
      },
      {
        name: "狂暴冲锋",
        key: "Shift",
        description: "向前冲锋",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "怒吼",
        key: "E",
        description: "提升移速并造成流血",
        type: "ability",
        cooldown: 15,
      },
      {
        name: "杀戮狂欢",
        key: "Q",
        description: "挥刀造成流血和反奶",
        type: "ultimate",
      },
    ],
    synergies: ["lucio", "kiriko", "ana"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  doomfist: {
    heroId: "doomfist",
    difficulty: 3,
    playstyle: "近战坦克，擅长突进和控制",
    strengths: ["高爆发伤害", "多段位移", "击杀获得护盾", "大招可躲避伤害"],
    weaknesses: [
      "被控制后容易死亡",
      "需要精准操作",
      "远程能力弱",
      "被黑影克制",
    ],
    tips: [
      "拳头蓄力撞墙伤害更高",
      "利用技能连招最大化伤害",
      "大招可用于逃跑或进场",
      "保持护盾叠加",
    ],
    abilities: [
      { name: "护手炮", key: "左键", description: "短程射击", type: "primary" },
      {
        name: "火箭重拳",
        key: "右键",
        description: "蓄力冲拳",
        type: "secondary",
        cooldown: 4,
      },
      {
        name: "流星坠击",
        key: "Shift",
        description: "跳跃后下砸",
        type: "ability",
        cooldown: 7,
      },
      {
        name: "能量格挡",
        key: "E",
        description: "格挡并蓄力",
        type: "ability",
        cooldown: 7,
      },
      {
        name: "毁天灭地",
        key: "Q",
        description: "跳跃后砸地",
        type: "ultimate",
      },
    ],
    synergies: ["ana", "kiriko", "lucio"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  ramattra: {
    heroId: "ramattra",
    difficulty: 2,
    playstyle: "双形态坦克，擅长远近切换",
    strengths: [
      "双形态适应不同情况",
      "涅槃形态伤害高",
      "屏障可保护队友",
      "大招持续造成伤害",
    ],
    weaknesses: [
      "涅槃形态机动性差",
      "屏障血量有限",
      "被远程消耗",
      "大招需要近身",
    ],
    tips: [
      "根据情况切换形态",
      "涅槃形态近战伤害高",
      "屏障放置位置很重要",
      "大招可持续追击敌人",
    ],
    abilities: [
      {
        name: "虚空加速器",
        key: "左键",
        description: "远程射击",
        type: "primary",
      },
      {
        name: "虚空屏障",
        key: "右键",
        description: "放置屏障",
        type: "secondary",
        cooldown: 15,
      },
      {
        name: "涅槃形态",
        key: "Shift",
        description: "切换近战形态",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "贪婪漩涡",
        key: "E",
        description: "减速并伤害敌人",
        type: "ability",
        cooldown: 12,
      },
      {
        name: "歼灭",
        key: "Q",
        description: "持续伤害周围敌人",
        type: "ultimate",
      },
    ],
    synergies: ["ana", "lucio", "zarya"],
    mapPreferences: {
      good: ["混合推车图", "纯推车图"],
      bad: ["抢点图"],
    },
  },

  mauga: {
    heroId: "mauga",
    difficulty: 1,
    playstyle: "重火力坦克，擅长持续输出",
    strengths: [
      "双枪持续输出",
      "过热提供暴击",
      "冲锋可快速接近",
      "大招可困住敌人",
    ],
    weaknesses: ["大体型容易被打", "被反奶克制", "需要持续射击", "机动性一般"],
    tips: [
      "交替射击避免过热",
      "冲锋可撞击敌人",
      "大招困住敌人后集火",
      "利用心脏跳动恢复生命",
    ],
    abilities: [
      {
        name: "火山炮/熔岩炮",
        key: "左键/右键",
        description: "双枪射击",
        type: "primary",
      },
      {
        name: "过热",
        key: "被动",
        description: "过热后造成暴击",
        type: "passive",
      },
      {
        name: "狂奔冲撞",
        key: "Shift",
        description: "向前冲锋",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "心脏跳动",
        key: "E",
        description: "恢复生命",
        type: "ability",
        cooldown: 12,
      },
      {
        name: "笼中困兽",
        key: "Q",
        description: "创造屏障困住敌人",
        type: "ultimate",
      },
    ],
    synergies: ["ana", "kiriko", "lucio"],
    mapPreferences: {
      good: ["混合推车图", "闪点图"],
      bad: ["抢点图"],
    },
  },

  // ===== 更多输出 =====
  ashe: {
    heroId: "ashe",
    difficulty: 2,
    playstyle: "远程射手，擅长中远距离输出",
    strengths: [
      "瞄准镜伤害高",
      "炸药可范围伤害",
      "鲍勃可占点和输出",
      "教练枪可自保",
    ],
    weaknesses: ["近战能力弱", "被高机动英雄克制", "需要良好瞄准", "弹匣较小"],
    tips: [
      "炸药射击引爆造成更多伤害",
      "教练枪可用于位移",
      "鲍勃可占点触发加时",
      "保持中远距离输出",
    ],
    abilities: [
      { name: "毒蛇", key: "左键", description: "半自动步枪", type: "primary" },
      {
        name: "毒蛇",
        key: "右键",
        description: "瞄准镜模式",
        type: "secondary",
      },
      {
        name: "教练枪",
        key: "Shift",
        description: "击退敌人和自己",
        type: "ability",
        cooldown: 10,
      },
      {
        name: "延时雷管",
        key: "E",
        description: "投掷炸药",
        type: "ability",
        cooldown: 12,
      },
      { name: "鲍勃", key: "Q", description: "召唤鲍勃", type: "ultimate" },
    ],
    synergies: ["mercy", "ana", "zenyatta"],
    mapPreferences: {
      good: ["纯推车图", "混合推车图"],
      bad: ["抢点图"],
    },
  },

  reaper: {
    heroId: "reaper",
    difficulty: 1,
    playstyle: "近战刺客，擅长击杀坦克",
    strengths: [
      "近距离伤害极高",
      "吸血提供生存能力",
      "幽灵形态可逃跑",
      "大招范围伤害高",
    ],
    weaknesses: ["远程能力弱", "被风筝", "大招容易被打断", "需要近身"],
    tips: [
      "利用暗影步绕后",
      "幽灵形态可躲避伤害",
      "优先击杀坦克获取治疗",
      "大招从高处或侧面使用",
    ],
    abilities: [
      {
        name: "地狱火霰弹枪",
        key: "左键",
        description: "双枪射击",
        type: "primary",
      },
      {
        name: "幽灵形态",
        key: "Shift",
        description: "无敌移动",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "暗影步",
        key: "E",
        description: "传送到指定位置",
        type: "ability",
        cooldown: 10,
      },
      { name: "死亡绽放", key: "Q", description: "旋转射击", type: "ultimate" },
    ],
    synergies: ["ana", "lucio", "zarya"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  hanzo: {
    heroId: "hanzo",
    difficulty: 3,
    playstyle: "远程狙击，擅长爆发和侦查",
    strengths: ["蓄力箭伤害高", "音波箭可侦查", "龙可穿墙伤害", "风可快速输出"],
    weaknesses: [
      "需要良好瞄准",
      "近战能力弱",
      "被高机动英雄克制",
      "弹道需要预判",
    ],
    tips: [
      "音波箭放在关键位置",
      "龙配合控制技能效果好",
      "利用攀墙寻找角度",
      "风可快速清理脆皮",
    ],
    abilities: [
      { name: "岚之弓", key: "左键", description: "蓄力射箭", type: "primary" },
      {
        name: "音波箭",
        key: "Shift",
        description: "侦查区域",
        type: "ability",
        cooldown: 12,
      },
      {
        name: "风",
        key: "E",
        description: "快速射出多箭",
        type: "ability",
        cooldown: 8,
      },
      { name: "龙魂击", key: "Q", description: "发射穿墙龙", type: "ultimate" },
    ],
    synergies: ["zarya", "ana", "mercy"],
    mapPreferences: {
      good: ["纯推车图", "混合推车图"],
      bad: ["抢点图"],
    },
  },

  soldier_76: {
    heroId: "soldier_76",
    difficulty: 1,
    playstyle: "全能输出，擅长持续输出和自保",
    strengths: ["稳定持续输出", "自我治疗", "冲刺机动性好", "大招自动瞄准"],
    weaknesses: [
      "爆发不如其他输出",
      "被护盾阻挡",
      "大招容易被躲避",
      "没有特殊能力",
    ],
    tips: [
      "治疗站可帮助队友",
      "螺旋飞弹可快速击杀",
      "冲刺可追击或逃跑",
      "大招优先击杀辅助",
    ],
    abilities: [
      {
        name: "重脉冲步枪",
        key: "左键",
        description: "自动步枪",
        type: "primary",
      },
      {
        name: "螺旋飞弹",
        key: "右键",
        description: "发射飞弹",
        type: "secondary",
        cooldown: 6,
      },
      { name: "冲刺", key: "Shift", description: "快速奔跑", type: "ability" },
      {
        name: "生物力场",
        key: "E",
        description: "放置治疗站",
        type: "ability",
        cooldown: 15,
      },
      { name: "战术目镜", key: "Q", description: "自动瞄准", type: "ultimate" },
    ],
    synergies: ["ana", "mercy", "lucio"],
    mapPreferences: {
      good: ["混合推车图", "纯推车图"],
      bad: ["抢点图"],
    },
  },

  echo: {
    heroId: "echo",
    difficulty: 3,
    playstyle: "空中输出，擅长爆发和复制",
    strengths: [
      "飞行能力强",
      "粘性炸弹爆发高",
      "聚焦光线可秒杀",
      "大招可复制敌人",
    ],
    weaknesses: ["血量较低", "被hitscan克制", "需要良好瞄准", "复制需要判断"],
    tips: [
      "粘性炸弹配合主武器爆发",
      "聚焦光线对低血量敌人有效",
      "复制坦克可快速充能大招",
      "利用飞行保持高度优势",
    ],
    abilities: [
      {
        name: "三连发",
        key: "左键",
        description: "三连发射击",
        type: "primary",
      },
      {
        name: "粘性炸弹",
        key: "右键",
        description: "发射粘性炸弹",
        type: "secondary",
        cooldown: 6,
      },
      {
        name: "飞行",
        key: "Shift",
        description: "快速飞行",
        type: "ability",
        cooldown: 6,
      },
      {
        name: "聚焦光线",
        key: "E",
        description: "对低血量敌人高伤害",
        type: "ability",
        cooldown: 8,
      },
      { name: "复制", key: "Q", description: "复制敌方英雄", type: "ultimate" },
    ],
    synergies: ["mercy", "ana", "winston"],
    mapPreferences: {
      good: ["抢点图", "混合推车图"],
      bad: ["机动推进图"],
    },
  },

  sombra: {
    heroId: "sombra",
    difficulty: 3,
    playstyle: "潜行刺客，擅长骚扰和禁用",
    strengths: [
      "隐身可潜入敌后",
      "入侵可禁用技能",
      "定位器可快速逃跑",
      "大招可禁用全队",
    ],
    weaknesses: ["伤害较低", "被发现后脆弱", "需要良好判断", "团队配合要求高"],
    tips: [
      "入侵优先禁用关键目标",
      "定位器放在安全位置",
      "大招配合队友进攻",
      "利用隐身侦查敌人位置",
    ],
    abilities: [
      {
        name: "冲锋枪",
        key: "左键",
        description: "全自动射击",
        type: "primary",
      },
      {
        name: "入侵",
        key: "右键",
        description: "禁用敌人技能",
        type: "secondary",
        cooldown: 4,
      },
      {
        name: "隐身",
        key: "Shift",
        description: "进入隐身状态",
        type: "ability",
        cooldown: 6,
      },
      {
        name: "位移传动",
        key: "E",
        description: "传送到定位器",
        type: "ability",
        cooldown: 6,
      },
      {
        name: "电磁脉冲",
        key: "Q",
        description: "禁用范围内敌人",
        type: "ultimate",
      },
    ],
    synergies: ["winston", "dva", "zarya"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  cassidy: {
    heroId: "cassidy",
    difficulty: 2,
    playstyle: "中距离输出，擅长决斗和收割",
    strengths: [
      "单发伤害高",
      "磁力手雷可粘人",
      "翻滚可躲避和装弹",
      "大招可秒杀多人",
    ],
    weaknesses: ["机动性一般", "被远程克制", "大招容易被打断", "弹匣较小"],
    tips: [
      "磁力手雷配合爆头",
      "翻滚可取消后摇",
      "大招从侧面或高处使用",
      "保持中距离输出",
    ],
    abilities: [
      { name: "维和者", key: "左键", description: "精准射击", type: "primary" },
      {
        name: "维和者",
        key: "右键",
        description: "快速扇射",
        type: "secondary",
      },
      {
        name: "战术翻滚",
        key: "Shift",
        description: "翻滚并装弹",
        type: "ability",
        cooldown: 6,
      },
      {
        name: "磁力手雷",
        key: "E",
        description: "投掷粘性手雷",
        type: "ability",
        cooldown: 10,
      },
      { name: "神枪手", key: "Q", description: "锁定并射击", type: "ultimate" },
    ],
    synergies: ["ana", "mercy", "zarya"],
    mapPreferences: {
      good: ["混合推车图", "纯推车图"],
      bad: ["抢点图"],
    },
  },

  // ===== 更多辅助 =====
  kiriko: {
    heroId: "kiriko",
    difficulty: 3,
    playstyle: "机动辅助，擅长治疗和保护",
    strengths: [
      "苦无伤害高",
      "铃铛可净化控制",
      "传送可快速支援",
      "大招可加速全队",
    ],
    weaknesses: ["治疗需要瞄准", "铃铛冷却长", "需要良好判断", "单体治疗"],
    tips: [
      "铃铛在关键时刻使用",
      "苦无爆头伤害高",
      "传送可穿墙支援队友",
      "大招配合进攻使用",
    ],
    abilities: [
      {
        name: "治疗御札",
        key: "左键",
        description: "治疗队友",
        type: "primary",
      },
      { name: "苦无", key: "右键", description: "投掷苦无", type: "secondary" },
      {
        name: "快步",
        key: "Shift",
        description: "传送到队友",
        type: "ability",
        cooldown: 7,
      },
      {
        name: "祓除之铃",
        key: "E",
        description: "净化并提供无敌",
        type: "ability",
        cooldown: 14,
      },
      {
        name: "狐灵冲刺",
        key: "Q",
        description: "加速并提升攻速",
        type: "ultimate",
      },
    ],
    synergies: ["genji", "tracer", "winston"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  baptiste: {
    heroId: "baptiste",
    difficulty: 2,
    playstyle: "范围辅助，擅长治疗和保护",
    strengths: [
      "范围治疗能力强",
      "不朽力场可救命",
      "增幅矩阵可增伤",
      "自身输出不错",
    ],
    weaknesses: [
      "不朽力场可被摧毁",
      "机动性一般",
      "需要良好站位",
      "被高机动英雄克制",
    ],
    tips: [
      "不朽力场放在掩体后",
      "增幅矩阵配合队友输出",
      "利用外骨骼靴跳跃",
      "再生爆发可自保",
    ],
    abilities: [
      {
        name: "生化榴弹枪",
        key: "左键",
        description: "三连发射击",
        type: "primary",
      },
      {
        name: "生化榴弹枪",
        key: "右键",
        description: "治疗榴弹",
        type: "secondary",
      },
      {
        name: "再生爆发",
        key: "Shift",
        description: "范围治疗",
        type: "ability",
        cooldown: 13,
      },
      {
        name: "维生力场",
        key: "E",
        description: "防止死亡",
        type: "ability",
        cooldown: 25,
      },
      {
        name: "增幅矩阵",
        key: "Q",
        description: "增加伤害和治疗",
        type: "ultimate",
      },
    ],
    synergies: ["sigma", "ashe", "soldier_76"],
    mapPreferences: {
      good: ["混合推车图", "纯推车图"],
      bad: ["抢点图"],
    },
  },

  brigitte: {
    heroId: "brigitte",
    difficulty: 1,
    playstyle: "近战辅助，擅长保护和反潜",
    strengths: [
      "护甲包可远程治疗",
      "盾击可击退敌人",
      "盾牌可保护自己",
      "大招可提供护甲",
    ],
    weaknesses: ["远程能力弱", "被远程消耗", "盾牌血量有限", "治疗量一般"],
    tips: [
      "盾击可打断敌人技能",
      "护甲包优先给前排",
      "利用盾牌保护自己",
      "大招在团战前使用",
    ],
    abilities: [
      {
        name: "火箭连枷",
        key: "左键",
        description: "近战攻击",
        type: "primary",
      },
      {
        name: "屏障护盾",
        key: "右键",
        description: "举起盾牌",
        type: "secondary",
      },
      {
        name: "盾击",
        key: "Shift",
        description: "盾牌冲击",
        type: "ability",
        cooldown: 5,
      },
      {
        name: "修理包",
        key: "E",
        description: "投掷护甲包",
        type: "ability",
        cooldown: 6,
      },
      {
        name: "集结号令",
        key: "Q",
        description: "提供护甲加成",
        type: "ultimate",
      },
    ],
    synergies: ["reinhardt", "lucio", "zarya"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  moira: {
    heroId: "moira",
    difficulty: 1,
    playstyle: "双重辅助，擅长治疗和输出",
    strengths: ["治疗量高", "自动瞄准吸取", "消散可逃跑", "大招可穿透治疗"],
    weaknesses: [
      "需要管理资源",
      "远程能力弱",
      "被控制后脆弱",
      "大招容易被躲避",
    ],
    tips: [
      "吸取敌人补充治疗资源",
      "消散可躲避技能",
      "治疗球优先于伤害球",
      "大招可穿透屏障",
    ],
    abilities: [
      {
        name: "生化之握",
        key: "左键",
        description: "治疗喷雾",
        type: "primary",
      },
      {
        name: "生化之握",
        key: "右键",
        description: "吸取生命",
        type: "secondary",
      },
      {
        name: "消散",
        key: "Shift",
        description: "快速移动并无敌",
        type: "ability",
        cooldown: 6,
      },
      {
        name: "生化之球",
        key: "E",
        description: "发射治疗/伤害球",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "聚合射线",
        key: "Q",
        description: "穿透治疗/伤害",
        type: "ultimate",
      },
    ],
    synergies: ["reinhardt", "zarya", "dva"],
    mapPreferences: {
      good: ["抢点图", "闪点图"],
      bad: ["纯推车图"],
    },
  },

  lifeweaver: {
    heroId: "lifeweaver",
    difficulty: 3,
    playstyle: "保护型辅助，擅长救援和控制",
    strengths: [
      "生命之握可拉回队友",
      "花瓣平台可提供高度",
      "荆棘可控制区域",
      "大招可大量治疗",
    ],
    weaknesses: [
      "输出能力弱",
      "需要良好判断",
      "机动性一般",
      "被高机动英雄克制",
    ],
    tips: [
      "生命之握在关键时刻使用",
      "花瓣平台可帮助队友占据高点",
      "荆棘可阻挡敌人路线",
      "大招可逆转团战",
    ],
    abilities: [
      {
        name: "治愈花簇",
        key: "左键",
        description: "蓄力治疗",
        type: "primary",
      },
      {
        name: "荆棘之刺",
        key: "右键",
        description: "射击荆棘",
        type: "secondary",
      },
      {
        name: "花瓣平台",
        key: "Shift",
        description: "创造平台",
        type: "ability",
        cooldown: 12,
      },
      {
        name: "生命之握",
        key: "E",
        description: "拉回队友",
        type: "ability",
        cooldown: 20,
      },
      {
        name: "生命之树",
        key: "Q",
        description: "种植治疗树",
        type: "ultimate",
      },
    ],
    synergies: ["pharah", "echo", "ashe"],
    mapPreferences: {
      good: ["混合推车图", "纯推车图"],
      bad: ["抢点图"],
    },
  },

  illari: {
    heroId: "illari",
    difficulty: 2,
    playstyle: "远程辅助，擅长输出和治疗",
    strengths: [
      "远程输出能力强",
      "治疗塔可持续治疗",
      "太阳能可爆发",
      "大招可控制区域",
    ],
    weaknesses: [
      "治疗塔可被摧毁",
      "需要管理能量",
      "近战能力弱",
      "被高机动英雄克制",
    ],
    tips: [
      "治疗塔放在安全位置",
      "太阳能蓄力伤害高",
      "利用击退保持距离",
      "大招可配合队友技能",
    ],
    abilities: [
      {
        name: "太阳能步枪",
        key: "左键",
        description: "蓄力射击",
        type: "primary",
      },
      {
        name: "太阳能步枪",
        key: "右键",
        description: "治疗光束",
        type: "secondary",
      },
      {
        name: "治愈之光",
        key: "Shift",
        description: "放置治疗塔",
        type: "ability",
        cooldown: 8,
      },
      {
        name: "爆发脉冲",
        key: "E",
        description: "击退敌人",
        type: "ability",
        cooldown: 7,
      },
      {
        name: "俘获日光",
        key: "Q",
        description: "发射太阳能球",
        type: "ultimate",
      },
    ],
    synergies: ["sigma", "ashe", "hanzo"],
    mapPreferences: {
      good: ["纯推车图", "混合推车图"],
      bad: ["抢点图"],
    },
  },

  juno: {
    heroId: "juno",
    difficulty: 2,
    playstyle: "机动辅助，擅长加速和治疗",
    strengths: ["高机动性", "可加速队友", "治疗能力稳定", "大招可增强全队"],
    weaknesses: ["血量较低", "需要良好站位", "被控制后脆弱", "输出能力一般"],
    tips: [
      "利用滑行保持机动",
      "加速可帮助队友进场",
      "治疗优先给前排",
      "大招在团战时使用",
    ],
    abilities: [
      { name: "脉冲枪", key: "左键", description: "连发射击", type: "primary" },
      {
        name: "治疗轨道",
        key: "右键",
        description: "治疗队友",
        type: "secondary",
      },
      {
        name: "滑行推进",
        key: "Shift",
        description: "快速滑行",
        type: "ability",
        cooldown: 5,
      },
      {
        name: "速度环",
        key: "E",
        description: "加速队友",
        type: "ability",
        cooldown: 12,
      },
      { name: "轨道光环", key: "Q", description: "增强全队", type: "ultimate" },
    ],
    synergies: ["reinhardt", "winston", "genji"],
    mapPreferences: {
      good: ["抢点图", "机动推进图"],
      bad: ["纯推车图"],
    },
  },
};

/**
 * 获取英雄详细信息
 */
export function getHeroDetail(heroId: string): HeroDetail | null {
  return heroDetails[heroId] || null;
}

/**
 * 获取难度星级显示
 */
export function getDifficultyStars(difficulty: 1 | 2 | 3): string {
  return "★".repeat(difficulty) + "☆".repeat(3 - difficulty);
}
