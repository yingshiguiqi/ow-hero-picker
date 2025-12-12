/**
 * 英雄克制关系矩阵
 * counters[heroA][heroB] = score
 * 正数表示 heroA 克制 heroB（heroA 对阵 heroB 有优势）
 * 负数表示 heroA 被 heroB 克制（heroA 对阵 heroB 有劣势）
 *
 * 分数范围建议：-30 ~ +30
 * - 强克制：±20~30
 * - 中等克制：±10~15
 * - 轻微克制：±5
 */

export type CounterMatrix = Record<string, Record<string, number>>;

// 克制关系数据
// 格式：当敌方有某英雄时，我方选某英雄的加减分
export const counters: CounterMatrix = {
  // ===== 坦克 =====
  // D.Va 害怕在掩体偏少的地形上对面具备持续高伤害的消耗
  dva: {
    pharah: 25, // D.Va 克制法鸡（飞行追击+矩阵吃火箭）
    junkrat: 15, // 矩阵吃炸弹
    bastion: 15, // 矩阵吃子弹
    torbjorn: 10, // 吃炮台
    junker_queen: -15, // 被渣克女王克制
    sigma: -15, // 被西格玛克制
    zarya: -20, // 被查里雅克制（充能）
    moira: -10, // 被莫伊拉克制
    zenyatta: -15, // 被禅雅塔克制（不和）
    ana: -15, // 被安娜克制
    symmetra: -15, // 被秩序之光克制（穿盾）
    echo: -15, // 被回声克制
    sombra: -15, // 被黑影克制（hack矩阵）
    widowmaker: -15, // 被黑百合克制
    mei: -15, // 被美克制（冻住）
    hanzo: -10, // 被半藏克制
  },
  // 莱因哈特害怕远程消耗和绕后
  reinhardt: {
    winston: -15, // 被温斯顿克制
    ramattra: -15, // 被拉玛刹克制
    pharah: -20, // 被法鸡克制（打不到）
    ashe: -15, // 被艾什克制
    echo: -15, // 被回声克制
    bastion: -25, // 被堡垒克制（盾碎）
    mei: -15, // 被美克制
    junkrat: -15, // 被狂鼠克制（炸盾）
    torbjorn: -10, // 被托比昂克制
    ana: -15, // 被安娜克制
    baptiste: -10, // 被巴蒂斯特克制
    brigitte: -10, // 被布里吉塔克制
    zenyatta: -15, // 被禅雅塔克制
    lucio: -10, // 被卢西奥克制
    illari: -15, // 被伊拉锐克制
  },
  // 温斯顿害怕高爆发和控制
  winston: {
    widowmaker: 25, // 跳脸黑百合
    hanzo: 20, // 跳脸半藏
    ana: 15, // 跳脸安娜
    genji: 15, // 电击源氏
    ashe: 15, // 跳脸艾什
    hazard: -15, // 被骇灾克制
    mauga: -15, // 被毛加克制
    junker_queen: -15, // 被渣克女王克制
    dva: -15, // 被D.Va克制
    torbjorn: -15, // 被托比昂克制
    bastion: -20, // 被堡垒克制
    reaper: -25, // 被死神克制
    cassidy: -15, // 被卡西迪克制
    echo: -15, // 被回声克制
    junkrat: -15, // 被狂鼠克制
    lucio: -10, // 被卢西奥克制
    illari: -15, // 被伊拉锐克制
    brigitte: -15, // 被布里吉塔克制
    zenyatta: -15, // 被禅雅塔克制
  },
  // 查里雅害怕远程消耗
  zarya: {
    dva: 20, // 克制D.Va（充能）
    doomfist: 15, // 克制铁拳
    roadhog: 15, // 克制路霸
    hazard: 15, // 克制骇灾
    junker_queen: 15, // 克制渣克女王
    mauga: 15, // 克制毛加
    orisa: 15, // 克制奥丽莎
    wrecking_ball: 15, // 克制破坏球
    ramattra: 15, // 克制拉玛刹
    winston: -15, // 被温斯顿克制
    reinhardt: -10, // 被莱因哈特克制
    widowmaker: -15, // 被黑百合克制（远程）
    mei: -15, // 被美克制
    ashe: -15, // 被艾什克制
    zenyatta: -15, // 被禅雅塔克制
    lifeweaver: -10, // 被生命之梭克制
  },
  // 路霸害怕反奶和远程消耗
  roadhog: {
    winston: 15, // 克制猴子
    wrecking_ball: 15, // 克制球
    tracer: 10, // 钩子抓猎空
    junker_queen: -15, // 被渣克女王克制
    zarya: -20, // 被查里雅克制
    orisa: -15, // 被奥丽莎克制
    doomfist: -15, // 被铁拳克制
    mauga: -15, // 被毛加克制
    reinhardt: -10, // 被莱因哈特克制
    echo: -15, // 被回声克制
    widowmaker: -15, // 被黑百合克制
    mei: -15, // 被美克制
    pharah: -15, // 被法鸡克制
    reaper: -15, // 被死神克制
    sojourn: -15, // 被索杰恩克制
    genji: -10, // 被源氏克制
    ashe: -15, // 被艾什克制
    hanzo: -10, // 被半藏克制
    sombra: -15, // 被黑影克制
    zenyatta: -20, // 被禅雅塔克制（不和）
    ana: -20, // 被安娜克制（反奶）
    baptiste: -10, // 被巴蒂斯特克制
    brigitte: -10, // 被布里吉塔克制
  },
  // 西格玛害怕近战和控制
  sigma: {
    dva: 15, // 克制D.Va
    mauga: 15, // 克制毛加
    orisa: 15, // 克制奥丽莎
    reinhardt: 15, // 石头打大锤
    bastion: 10, // 吸收子弹
    doomfist: -15, // 被铁拳克制
    winston: -15, // 被温斯顿克制
    ramattra: -15, // 被拉玛刹克制
    symmetra: -15, // 被秩序之光克制
    mei: -15, // 被美克制
    sombra: -20, // 被黑影克制
    pharah: -20, // 被法鸡克制
    kiriko: -10, // 被雾子克制
    brigitte: -15, // 被布里吉塔克制
    zenyatta: -15, // 被禅雅塔克制
    lifeweaver: -10, // 被生命之梭克制
    moira: -10, // 被莫伊拉克制
  },
  // 破坏球害怕控制和钩子
  wrecking_ball: {
    widowmaker: 20, // 撞黑百合
    ana: 15, // 撞安娜
    zenyatta: 15, // 撞和尚
    orisa: -15, // 被奥丽莎克制
    dva: -15, // 被D.Va克制
    doomfist: -15, // 被铁拳克制
    mauga: -15, // 被毛加克制
    roadhog: -15, // 被猪克制（钩子）
    sombra: -25, // 被黑影克制（hack）
    cassidy: -20, // 被卡西迪克制
    tracer: -10, // 被裂空克制
    sojourn: -15, // 被索杰恩克制
    torbjorn: -15, // 被托比昂克制
    mei: -20, // 被美克制（冻住）
    brigitte: -15, // 被布里吉塔克制
    lucio: -10, // 被卢西奥克制
  },
  // 铁拳害怕控制技能还有拉扯的时候自己家后排没了
  doomfist: {
    widowmaker: 20, // 跳脸黑百合
    ana: 15, // 跳脸安娜
    zenyatta: 15, // 秒和尚
    reinhardt: 15, // 穿盾打大锤
    sigma: 15, // 克制西格玛
    roadhog: -15, // 被路霸克制
    zarya: -20, // 被查里雅克制
    orisa: -20, // 被奥丽莎克制
    sombra: -25, // 被黑影克制
    cassidy: -20, // 被卡西迪克制
    tracer: -15, // 被裂空克制
    juno: -15, // 被朱诺克制
    brigitte: -20, // 被布里吉塔克制
    pharah: -20, // 被法鸡克制
    bastion: -15, // 被堡垒克制
    mei: -15, // 被美克制
  },
  // 奥丽莎害怕持续消耗和绕后
  orisa: {
    doomfist: 15, // 克制铁拳
    wrecking_ball: 15, // 克制破坏球
    junker_queen: 15, // 克制渣克女王
    mauga: 15, // 克制毛加
    roadhog: 15, // 矛刺打断钩子
    reinhardt: 15, // 拉大锤
    sigma: -15, // 被西格玛克制
    winston: -15, // 被温斯顿克制
    zarya: -15, // 被查里雅克制
    baptiste: -15, // 被巴蒂斯特克制
    hanzo: -15, // 被半藏克制
    ashe: -15, // 被艾什克制
    sojourn: -15, // 被索杰恩克制
    tracer: -15, // 被裂空克制
    junkrat: -15, // 被狂鼠克制
    echo: -15, // 被回声克制
    widowmaker: -15, // 被黑百合克制
    pharah: -15, // 被法鸡克制
    bastion: -15, // 被堡垒克制
    ana: -15, // 被安娜克制
    illari: -15, // 被伊拉锐克制
    zenyatta: -15, // 被禅雅塔克制
  },
  // 渣克女王害怕远程消耗和反奶
  junker_queen: {
    dva: 15, // 克制D.Va
    roadhog: 15, // 克制路霸
    reinhardt: 10, // 近战优势
    winston: 10, // 近战优势
    orisa: -15, // 被奥丽莎克制
    doomfist: -15, // 被铁拳克制
    mauga: -15, // 被毛加克制
    hazard: -15, // 被骇灾克制
    zarya: -15, // 被查里雅克制
    pharah: -15, // 被法鸡克制
    mei: -15, // 被美克制
    torbjorn: -15, // 被托比昂克制
    sojourn: -15, // 被索杰恩克制
    echo: -15, // 被回声克制
    juno: -15, // 被朱诺克制
    ana: -20, // 被安娜克制（反奶）
    lucio: -10, // 被卢西奥克制
    kiriko: -10, // 被雾子克制
  },
  // 拉玛刹害怕远程消耗和控制
  ramattra: {
    reinhardt: 10, // 穿盾
    winston: 10, // 近战优势
    zarya: 10, // 克制查里雅
    sigma: -15, // 被西格玛克制
    junker_queen: -15, // 被渣克女王克制
    mauga: -15, // 被毛加克制
    roadhog: -15, // 被路霸克制
    hazard: -15, // 被骇灾克制
    bastion: -15, // 被堡垒克制
    pharah: -20, // 被法鸡克制
    genji: -10, // 被源氏克制
    torbjorn: -15, // 被托比昂克制
    sojourn: -15, // 被索杰恩克制
    reaper: -15, // 被死神克制
    mei: -15, // 被美克制
    tracer: -15, // 被裂空克制
    echo: -15, // 被回声克制
    juno: -15, // 被朱诺克制
    ana: -15, // 被安娜克制
    baptiste: -10, // 被巴蒂斯特克制
    illari: -15, // 被伊拉锐克制
    zenyatta: -15, // 被禅雅塔克制
  },
  // 毛加害怕反奶和远程消耗
  mauga: {
    reinhardt: 10, // 近战压制
    winston: 10, // 近战压制
    junker_queen: 15, // 克制渣克女王
    ramattra: 15, // 克制拉玛刹
    doomfist: 15, // 克制铁拳
    wrecking_ball: 15, // 克制破坏球
    sigma: -15, // 被西格玛克制
    zarya: -20, // 被查里雅克制
    orisa: -15, // 被奥丽莎克制
    pharah: -15, // 被法鸡克制
    echo: -15, // 被回声克制
    reaper: -15, // 被死神克制
    sojourn: -15, // 被索杰恩克制
    widowmaker: -15, // 被黑百合克制
    zenyatta: -20, // 被禅雅塔克制（不和）
    ana: -25, // 被安娜克制（反奶）
    juno: -15, // 被朱诺克制
  },
  // 骇灾害怕高机动和控制
  hazard: {
    reinhardt: 10, // 墙体控制
    genji: 10, // 墙体限制机动
    junker_queen: 15, // 克制渣克女王
    winston: 15, // 克制温斯顿
    dva: -15, // 被D.Va克制
    sigma: -15, // 被西格玛克制
    doomfist: -15, // 被铁拳克制
    roadhog: -15, // 被路霸克制
    orisa: -15, // 被奥丽莎克制
    zarya: -15, // 被查里雅克制
    tracer: -15, // 被裂空克制
    sojourn: -15, // 被索杰恩克制
    torbjorn: -15, // 被托比昂克制
    echo: -15, // 被回声克制
    ana: -15, // 被安娜克制
    zenyatta: -15, // 被禅雅塔克制
    pharah: -15, // 被法鸡克制
    widowmaker: -10, // 被黑百合克制
  },

  // ===== 输出 =====
  // 法老之鹰害怕hitscan
  pharah: {
    reinhardt: 20, // 克制大锤
    junkrat: 20, // 克制狂鼠
    mei: 20, // 克制美
    reaper: 20, // 克制死神
    symmetra: 15, // 克制秒
    torbjorn: 15, // 克制托比昂
    dva: -25, // 被D.Va克制
    wrecking_ball: -15, // 被破坏球克制
    ashe: -20, // 被艾什克制
    echo: -15, // 被回声克制
    soldier_76: -20, // 被76克制
    widowmaker: -25, // 被黑百合克制
    baptiste: -15, // 被巴蒂斯特克制
    illari: -15, // 被伊拉锐克制
  },
  // 士兵76害怕高机动和近战
  soldier_76: {
    pharah: 20, // 克制法鸡
    echo: 15, // 克制回声
    mercy: 10, // 打飞行目标
    sombra: 15, // 克制黑影
    sigma: -15, // 被西格玛克制
    winston: -15, // 被温斯顿克制
    doomfist: -15, // 被铁拳克制
    wrecking_ball: -15, // 被破坏球克制
    junker_queen: -10, // 被渣克女王克制
    mauga: -15, // 被毛加克制
    hazard: -15, // 被骇灾克制
    dva: -10, // 被D.Va克制
    sojourn: -15, // 被索杰恩克制
    reaper: -15, // 被死神克制
    bastion: -15, // 被堡垒克制
    ashe: -15, // 被艾什克制
    widowmaker: -15, // 被黑百合克制
    hanzo: -10, // 被半藏克制
    zenyatta: -15, // 被禅雅塔克制
    baptiste: -10, // 被巴蒂斯特克制
    illari: -15, // 被伊拉锐克制
  },
  // 死神害怕远程和控制
  reaper: {
    winston: 25, // 克制猴子
    roadhog: 15, // 克制猪
    reinhardt: 10, // 近身打大锤
    dva: 10, // 近身打D.Va
    ramattra: 15, // 克制拉玛刹
    mauga: 15, // 克制毛加
    sigma: -15, // 被西格玛克制
    zarya: -15, // 被查里雅克制
    orisa: -15, // 被奥丽莎克制
    ashe: -15, // 被艾什克制
    hanzo: -15, // 被半藏克制
    pharah: -25, // 被法鸡克制
    widowmaker: -20, // 被黑百合克制
    cassidy: -15, // 被麦克雷克制
    echo: -15, // 被回声克制
    tracer: -10, // 被裂空克制
    sojourn: -15, // 被索杰恩克制
    torbjorn: -10, // 被托比昂克制
    genji: -10, // 被源氏克制
    symmetra: -10, // 被秩序之光克制
    ana: -15, // 被安娜克制
    baptiste: -10, // 被巴蒂斯特克制
    brigitte: -15, // 被布里吉塔克制
    zenyatta: -15, // 被禅雅塔克制
    lucio: -10, // 被卢西奥克制
    illari: -15, // 被伊拉锐克制
    juno: -10, // 被朱诺克制
  },
  // 裂空害怕控制和炮台
  tracer: {
    widowmaker: 20, // 贴脸黑百合
    ana: 20, // 贴脸安娜
    zenyatta: 20, // 贴脸和尚
    hanzo: 15, // 贴脸半藏
    sombra: 15, // 克制黑影
    dva: -15, // 被D.Va克制
    cassidy: -20, // 被麦克雷克制
    torbjorn: -15, // 被托比昂克制
    baptiste: -15, // 被巴蒂斯特克制
    brigitte: -25, // 被布里吉塔克制
    illari: -15, // 被伊拉锐克制
    juno: -10, // 被朱诺克制
  },
  // 源氏害怕控制和自动瞄准
  genji: {
    widowmaker: 20, // 跳脸黑百合
    ana: 20, // 跳脸安娜
    bastion: 15, // 弹反堡垒
    hanzo: 15, // 克制半藏
    ramattra: 10, // 克制拉玛刹
    roadhog: 10, // 克制路霸
    winston: -15, // 被猴子克制
    zarya: -15, // 被查里雅克制
    pharah: -15, // 被法鸡克制
    echo: -15, // 被回声克制
    torbjorn: -15, // 被托比昂克制
    cassidy: -15, // 被卡西迪克制
    brigitte: -20, // 被布里吉塔克制
    zenyatta: -15, // 被禅雅塔克制
  },
  // 卡西迪害怕远程和高机动
  cassidy: {
    tracer: 20, // 闪光弹抓猎空
    genji: 15, // 闪光弹抓源氏
    doomfist: 20, // 闪光弹打断末日
    wrecking_ball: 20, // 闪光弹控球
    reaper: 15, // 闪光弹抓死神
    hazard: -15, // 被骇灾克制
    zarya: -15, // 被查里雅克制
    orisa: -15, // 被奥丽莎克制
    mauga: -15, // 被毛加克制
    mei: -15, // 被美克制
    ashe: -15, // 被艾什克制
    sojourn: -15, // 被索杰恩克制
    hanzo: -15, // 被半藏克制
    soldier_76: -10, // 被76克制
    torbjorn: -10, // 被托比昂克制
    widowmaker: -20, // 被黑百合克制
    zenyatta: -15, // 被禅雅塔克制
    baptiste: -10, // 被巴蒂斯特克制
    ana: -10, // 被安娜克制
    illari: -15, // 被伊拉锐克制
  },
  // 半藏害怕高机动和近战
  hanzo: {
    reinhardt: 10, // 破盾
    orisa: 15, // 克制奥丽莎
    dva: 10, // 克制D.Va
    roadhog: 10, // 克制路霸
    wrecking_ball: -15, // 被破坏球克制
    winston: -20, // 被猴子克制
    hazard: -15, // 被骇灾克制
    doomfist: -15, // 被铁拳克制
    sombra: -15, // 被黑影克制
    echo: -15, // 被回声克制
    tracer: -15, // 被猎空克制
    genji: -10, // 被源氏克制
    pharah: -15, // 被法鸡克制
    lucio: -10, // 被卢西奥克制
    venture: -15, // 被探奇克制
    juno: -10, // 被朱诺克制
    kiriko: -10, // 被雾子克制
    moira: -10, // 被莫伊拉克制
  },
  // 黑百合害怕高机动
  widowmaker: {
    pharah: 25, // 克制法鸡
    echo: 20, // 克制回声
    ana: 15, // 狙击战
    zenyatta: 15, // 秒和尚
    mercy: 15, // 秒天使
    soldier_76: 15, // 克制76
    ashe: 10, // 狙击战
    cassidy: 10, // 克制卡西迪
    torbjorn: 15, // 克制托比昂
    bastion: 15, // 克制堡垒
    mauga: 15, // 克制毛加
    roadhog: 15, // 克制路霸
    orisa: 15, // 克制奥丽莎
    dva: 15, // 克制D.Va
    zarya: 15, // 克制查里雅
    wrecking_ball: -20, // 被球克制
    doomfist: -20, // 被铁拳克制
    sigma: -15, // 被西格玛克制
    winston: -25, // 被猴子克制
    widowmaker: -10, // 对狙
    sombra: -15, // 被黑影克制
    tracer: -20, // 被猎空克制
    genji: -20, // 被源氏克制
    kiriko: -10, // 被雾子克制
    lucio: -10, // 被卢西奥克制
  },
  // 艾什害怕高机动
  ashe: {
    pharah: 20, // 克制法鸡
    echo: 15, // 克制回声
    mercy: 10, // 打飞行目标
    mei: 15, // 克制美
    lifeweaver: 15, // 克制生命之梭
    soldier_76: 15, // 克制76
    cassidy: 15, // 克制卡西迪
    junkrat: 15, // 克制狂鼠
    symmetra: 15, // 克制秩序之光
    torbjorn: 15, // 克制托比昂
    orisa: 15, // 克制奥丽莎
    brigitte: 15, // 克制布里吉塔
    winston: -15, // 被猴子克制
    ramattra: -15, // 被拉玛刹克制
    hazard: -15, // 被骇灾克制
    hanzo: -15, // 被半藏克制
    widowmaker: -15, // 被黑百合克制
    tracer: -10, // 被猎空克制
    sojourn: -15, // 被索杰恩克制
    zenyatta: -15, // 被禅雅塔克制
    kiriko: -10, // 被雾子克制
    illari: -15, // 被伊拉锐克制
  },
  // 美害怕远程
  mei: {
    winston: 15, // 克制猴子
    dva: 15, // 克制D.Va
    wrecking_ball: 20, // 克制球
    doomfist: 15, // 克制末日
    genji: 20, // 克制源氏
    tracer: 15, // 克制猎空
    sigma: 15, // 克制西格玛
    zarya: 15, // 克制查里雅
    ramattra: 15, // 克制拉玛刹
    roadhog: 15, // 克制路霸
    junker_queen: 15, // 克制渣克女王
    ashe: -15, // 被艾什克制
    pharah: -20, // 被法鸡克制
    widowmaker: -15, // 被黑百合克制
    cassidy: -10, // 被卡西迪克制
    echo: -15, // 被回声克制
    hanzo: -10, // 被半藏克制
    reaper: -10, // 被死神克制
    venture: -10, // 被探奇克制
    zenyatta: -15, // 被禅雅塔克制
    baptiste: -10, // 被巴蒂斯特克制
    ana: -10, // 被安娜克制
    juno: -10, // 被朱诺克制
    illari: -10, // 被伊拉锐克制
  },
  // 狂鼠害怕飞行和远程
  junkrat: {
    reinhardt: 15, // 炸盾
    orisa: 10, // 炸盾
    sigma: 10, // 炸盾
    brigitte: 10, // 克制布里吉塔
    zarya: -15, // 被查里雅克制
    ashe: -15, // 被艾什克制
    hanzo: -15, // 被半藏克制
    pharah: -20, // 被法鸡克制
    echo: -15, // 被回声克制
    tracer: -10, // 被裂空克制
    genji: -10, // 被源氏克制
    juno: -10, // 被朱诺克制
    zenyatta: -10, // 被禅雅塔克制
  },
  // 托比昂害怕远程
  torbjorn: {
    tracer: 15, // 炮台打猎空
    genji: 10, // 炮台打源氏
    winston: 15, // 炮台打猴子
    wrecking_ball: 15, // 炮台打球
    hazard: 15, // 炮台打骇灾
    sombra: 15, // 克制黑影
    junker_queen: 15, // 克制渣克女王
    ramattra: 15, // 克制拉玛刹
    orisa: -15, // 被奥丽莎克制
    zarya: -15, // 被查里雅克制
    mei: -10, // 被美克制
    widowmaker: -15, // 被黑百合克制
    echo: -15, // 被回声克制
    junkrat: -10, // 被狂鼠克制
    bastion: -15, // 被堡垒克制
    pharah: -15, // 被法鸡克制
    hanzo: -10, // 被半藏克制
    ashe: -10, // 被艾什克制
    sojourn: -10, // 被索杰恩克制
    zenyatta: -10, // 被禅雅塔克制
    ana: -10, // 被安娜克制
  },
  // 秩序之光害怕高机动
  symmetra: {
    reinhardt: 15, // 穿盾
    sigma: 10, // 穿盾
    dva: 15, // 穿矩阵
    sombra: 15, // 克制黑影
    reaper: 10, // 克制死神
    winston: -15, // 被猴子克制
    zarya: -15, // 被查里雅克制
    venture: -15, // 被探奇克制
    pharah: -15, // 被法鸡克制
    widowmaker: -15, // 被黑百合克制
    echo: -15, // 被回声克制
    ashe: -10, // 被艾什克制
    ana: -10, // 被安娜克制
    zenyatta: -10, // 被禅雅塔克制
    brigitte: -10, // 被布里吉塔克制
    kiriko: -10, // 被雾子克制
  },
  // 堡垒害怕高机动和远程
  bastion: {
    reinhardt: 25, // 碎盾
    orisa: 20, // 碎盾
    roadhog: 15, // 打大目标
    winston: 20, // 打猴子
    ramattra: 15, // 克制拉玛刹
    brigitte: 15, // 克制布里吉塔
    sigma: -15, // 被西格玛克制
    junker_queen: -15, // 被渣克女王克制
    dva: -15, // 被D.Va克制（矩阵）
    hazard: -15, // 被骇灾克制
    mauga: -15, // 被毛加克制
    ashe: -15, // 被艾什克制
    hanzo: -15, // 被半藏克制
    widowmaker: -15, // 被黑百合克制
    echo: -15, // 被回声克制
    junkrat: -10, // 被狂鼠克制
    pharah: -15, // 被法鸡克制
    sojourn: -15, // 被索杰恩克制
    genji: -15, // 被源氏克制（弹反）
    symmetra: -10, // 被秩序之光克制
    ana: -15, // 被安娜克制（睡眠）
    zenyatta: -15, // 被禅雅塔克制
    illari: -15, // 被伊拉锐克制
    sombra: -20, // 被黑影克制
  },
  // 黑影害怕控制和自动瞄准
  sombra: {
    wrecking_ball: 25, // hack球
    doomfist: 25, // hack末日
    dva: 15, // hack D.Va
    sigma: 20, // hack西格玛
    widowmaker: 15, // 隐身接近
    ana: 15, // 克制安娜
    hanzo: 15, // 克制半藏
    junker_queen: 10, // 克制渣克女王
    roadhog: 15, // 克制路霸
    lifeweaver: 15, // 克制生命之梭
    mercy: 15, // 克制天使
    juno: 15, // 克制朱诺
    winston: -15, // 被温斯顿克制
    zarya: -15, // 被查里雅克制
    torbjorn: -15, // 被托比昂克制
    tracer: -15, // 被裂空克制
    soldier_76: -15, // 被76克制
    sojourn: -15, // 被索杰恩克制
    symmetra: -10, // 被秩序之光克制
    cassidy: -15, // 被麦克雷克制
    brigitte: -15, // 被布里吉塔克制
    lucio: -10, // 被卢西奥克制
  },
  // 回声害怕hitscan
  echo: {
    reinhardt: 15, // 飞行优势
    mei: 15, // 飞行优势
    reaper: 15, // 飞行优势
    junkrat: 15, // 克制狂鼠
    torbjorn: 15, // 克制托比昂
    symmetra: 15, // 克制秩序之光
    hanzo: 15, // 克制半藏
    genji: 15, // 克制源氏
    brigitte: 15, // 克制布里吉塔
    lifeweaver: 15, // 克制生命之梭
    lucio: 10, // 克制卢西奥
    moira: 15, // 克制莫伊拉
    orisa: 15, // 克制奥丽莎
    roadhog: 15, // 克制路霸
    ramattra: 15, // 克制拉玛刹
    mauga: 15, // 克制毛加
    hazard: 15, // 克制骇灾
    junker_queen: 15, // 克制渣克女王
    winston: -15, // 被温斯顿克制
    zarya: -15, // 被查里雅克制
    ashe: -15, // 被艾什克制
    soldier_76: -15, // 被76克制
    widowmaker: -20, // 被黑百合克制
    ana: -15, // 被安娜克制
    baptiste: -15, // 被巴蒂斯特克制
    illari: -15, // 被伊拉锐克制
  },
  // 索杰恩害怕高机动
  sojourn: {
    pharah: 15, // 打飞行目标
    soldier_76: 15, // 克制76
    cassidy: 15, // 克制卡西迪
    bastion: 15, // 克制堡垒
    torbjorn: 10, // 克制托比昂
    hazard: 15, // 克制骇灾
    ramattra: 15, // 克制拉玛刹
    mauga: 15, // 克制毛加
    orisa: 15, // 克制奥丽莎
    roadhog: 15, // 克制路霸
    wrecking_ball: 15, // 克制破坏球
    junker_queen: 15, // 克制渣克女王
    venture: 15, // 克制探奇
    sombra: 15, // 克制黑影
    juno: 15, // 克制朱诺
    baptiste: 15, // 克制巴蒂斯特
    illari: 15, // 克制伊拉锐
    kiriko: 10, // 克制雾子
    zenyatta: 15, // 克制禅雅塔
    winston: -15, // 被温斯顿克制
    widowmaker: -10, // 被黑百合克制
    echo: -10, // 被回声克制
    tracer: -10, // 被裂空克制
    symmetra: -10, // 被秩序之光克制
  },
  // 探奇害怕控制和远程
  venture: {
    widowmaker: 15, // 钻地接近
    ana: 15, // 钻地接近
    hanzo: 15, // 钻地接近
    symmetra: 15, // 克制秩序之光
    mei: 10, // 克制美
    zenyatta: 15, // 克制禅雅塔
    lifeweaver: 15, // 克制生命之梭
    roadhog: -15, // 被路霸克制
    doomfist: -15, // 被铁拳克制
    orisa: -15, // 被奥丽莎克制
    sojourn: -15, // 被索杰恩克制
    echo: -15, // 被回声克制
    pharah: -15, // 被法鸡克制
    tracer: -15, // 被裂空克制
    cassidy: -15, // 被卡西迪克制
    juno: -15, // 被朱诺克制
    kiriko: -15, // 被雾子克制
    brigitte: -15, // 被布里吉塔克制
    lucio: -10, // 被卢西奥克制
    mercy: -10, // 被天使克制
    moira: -10, // 被莫伊拉克制
  },

  // ===== 辅助 =====
  // 安娜害怕高机动
  ana: {
    roadhog: 20, // 反奶猪
    mauga: 25, // 反奶毛加
    bastion: 15, // 睡眠堡垒
    pharah: 15, // 打法鸡
    ramattra: 15, // 克制拉玛刹
    dva: 15, // 克制D.Va
    cassidy: 10, // 克制卡西迪
    soldier_76: 10, // 克制76
    torbjorn: 10, // 克制托比昂
    mei: 10, // 克制美
    brigitte: 10, // 克制布里吉塔
    lucio: 10, // 克制卢西奥
    baptiste: 10, // 克制巴蒂斯特
    moira: 10, // 克制莫伊拉
    orisa: -15, // 被奥丽莎克制
    hazard: -10, // 被骇灾克制
    junker_queen: -10, // 被渣克女王克制
    wrecking_ball: -15, // 被破坏球克制
    doomfist: -15, // 被铁拳克制
    winston: -15, // 被猴子克制
    tracer: -20, // 被猎空克制
    sombra: -15, // 被黑影克制
    widowmaker: -15, // 被黑百合克制
    venture: -15, // 被探奇克制
    hanzo: -10, // 被半藏克制
    genji: -20, // 被源氏克制
    kiriko: -10, // 被雾子克制
    zenyatta: -10, // 被禅雅塔克制
  },
  // 天使害怕高机动
  mercy: {
    pharah: 15, // 配合法鸡
    venture: 10, // 克制探奇
    dva: -15, // 被D.Va克制
    hazard: -15, // 被骇灾克制
    mauga: -15, // 被毛加克制
    junker_queen: -15, // 被渣克女王克制
    wrecking_ball: -15, // 被破坏球克制
    winston: -15, // 被温斯顿克制
    illari: -15, // 被伊拉锐克制
    sombra: -15, // 被黑影克制
    echo: -15, // 被回声克制
    ashe: -15, // 被艾什克制
    tracer: -15, // 被裂空克制
    soldier_76: -10, // 被76克制
    sojourn: -15, // 被索杰恩克制
    juno: -10, // 被朱诺克制
    ana: -15, // 被安娜克制
  },
  // 莫伊拉害怕远程
  moira: {
    genji: 15, // 克制源氏
    winston: 10, // 奶量压制
    dva: 10, // 克制D.Va
    sigma: 10, // 克制西格玛
    venture: 10, // 克制探奇
    hanzo: 10, // 克制半藏
    junker_queen: -15, // 被渣克女王克制
    wrecking_ball: -15, // 被破坏球克制
    pharah: -15, // 被法鸡克制
    widowmaker: -15, // 被黑百合克制
    echo: -15, // 被回声克制
    tracer: -10, // 被裂空克制
    torbjorn: -10, // 被托比昂克制
    ashe: -10, // 被艾什克制
    zenyatta: -15, // 被禅雅塔克制
    juno: -10, // 被朱诺克制
    ana: -10, // 被安娜克制（反奶）
    baptiste: -10, // 被巴蒂斯特克制
  },
  // 卢西奥害怕远程
  lucio: {
    reinhardt: 15, // 加速冲锋配合
    mei: 10, // 速度对抗冻结
    wrecking_ball: 10, // 克制破坏球
    brigitte: 10, // 克制布里吉塔
    venture: 10, // 克制探奇
    hanzo: 10, // 克制半藏
    widowmaker: 10, // 克制黑百合
    pharah: -15, // 被法鸡克制
    sombra: -10, // 被黑影克制（hack）
    echo: -10, // 被回声克制
    zenyatta: -15, // 被禅雅塔克制
    illari: -15, // 被伊拉锐克制
    juno: -10, // 被朱诺克制
    ana: -10, // 被安娜克制
    baptiste: -10, // 被巴蒂斯特克制
  },
  // 布里吉塔害怕远程
  brigitte: {
    tracer: 25, // 克制猎空
    genji: 20, // 克制源氏
    doomfist: 20, // 克制末日
    reaper: 15, // 克制死神
    wrecking_ball: 15, // 克制球
    sombra: 15, // 克制黑影
    venture: 15, // 克制探奇
    reinhardt: 10, // 克制莱因哈特
    winston: 15, // 克制温斯顿
    hazard: -15, // 被骇灾克制
    ramattra: -15, // 被拉玛刹克制
    junker_queen: -15, // 被渣克女王克制
    pharah: -20, // 被法鸡克制
    mei: -15, // 被美克制
    widowmaker: -15, // 被黑百合克制
    echo: -15, // 被回声克制
    junkrat: -10, // 被狂鼠克制
    torbjorn: -10, // 被托比昂克制
    symmetra: -10, // 被秩序之光克制
    ashe: -10, // 被艾什克制
    hanzo: -10, // 被半藏克制
    bastion: -10, // 被堡垒克制
    illari: -15, // 被伊拉锐克制
    moira: -10, // 被莫伊拉克制
    zenyatta: -15, // 被禅雅塔克制
    ana: -10, // 被安娜克制
    baptiste: -10, // 被巴蒂斯特克制
  },
  // 禅雅塔害怕高机动
  zenyatta: {
    roadhog: 15, // 不和打大目标
    reinhardt: 15, // 不和打大目标
    dva: 15, // 不和打大目标
    mauga: 20, // 不和打毛加
    hazard: 15, // 不和打骇灾
    soldier_76: 15, // 克制76
    cassidy: 15, // 克制卡西迪
    bastion: 15, // 克制堡垒
    orisa: 15, // 克制奥丽莎
    ashe: 15, // 克制艾什
    reaper: 15, // 克制死神
    junkrat: 10, // 克制狂鼠
    torbjorn: 10, // 克制托比昂
    symmetra: 10, // 克制秩序之光
    mei: 15, // 克制美
    brigitte: 15, // 克制布里吉塔
    lucio: 15, // 克制卢西奥
    moira: 15, // 克制莫伊拉
    baptiste: 15, // 克制巴蒂斯特
    lifeweaver: 15, // 克制生命之梭
    ana: 10, // 克制安娜
    illari: 10, // 克制伊拉锐
    juno: 10, // 克制朱诺
    wrecking_ball: -20, // 被破坏球克制
    doomfist: -20, // 被末日克制
    winston: -15, // 被猴子克制
    genji: -15, // 被源氏克制
    hanzo: -10, // 被半藏克制
    venture: -15, // 被探奇克制
    widowmaker: -15, // 被黑百合克制
    sombra: -15, // 被黑影克制
    echo: -10, // 被回声克制
    tracer: -20, // 被猎空克制
    sojourn: -15, // 被索杰恩克制
    kiriko: -10, // 被雾子克制
  },
  // 巴蒂斯特害怕高机动
  baptiste: {
    pharah: 10, // 打飞行目标
    echo: 10, // 打飞行目标
    bastion: 10, // 不死力场
    tracer: 15, // 克制裂空
    reaper: 10, // 克制死神
    cassidy: 10, // 克制卡西迪
    soldier_76: 10, // 克制76
    orisa: 15, // 克制奥丽莎
    mei: 10, // 克制美
    brigitte: 10, // 克制布里吉塔
    lucio: 10, // 克制卢西奥
    winston: -15, // 被温斯顿克制
    hazard: -15, // 被骇灾克制
    junker_queen: -15, // 被渣克女王克制
    genji: -15, // 被源氏克制
    hanzo: -15, // 被半藏克制
    widowmaker: -15, // 被黑百合克制
    sojourn: -15, // 被索杰恩克制
    illari: -10, // 被伊拉锐克制
    ana: -10, // 被安娜克制
    zenyatta: -15, // 被禅雅塔克制
    moira: -10, // 被莫伊拉克制
  },
  // 雾子害怕远程
  kiriko: {
    ana: 15, // 铃铛解睡眠/反奶
    mei: 10, // 铃铛解冻
    sombra: 10, // 铃铛解hack
    sigma: 10, // 克制西格玛
    junker_queen: 10, // 克制渣克女王
    hanzo: 10, // 克制半藏
    widowmaker: 10, // 克制黑百合
    ashe: 10, // 克制艾什
    symmetra: 10, // 克制秩序之光
    venture: 15, // 克制探奇
    pharah: -15, // 被法鸡克制
    tracer: -10, // 被猎空克制
    sojourn: -10, // 被索杰恩克制
    zenyatta: -10, // 被禅雅塔克制
  },
  // 生命之梭害怕高机动
  lifeweaver: {
    roadhog: 15, // 拉人解钩
    reinhardt: 10, // 拉人解锤
    zarya: 10, // 克制查里雅
    sigma: 10, // 克制西格玛
    mauga: -15, // 被毛加克制
    junker_queen: -15, // 被渣克女王克制
    sombra: -15, // 被黑影克制
    echo: -15, // 被回声克制
    ashe: -15, // 被艾什克制
    widowmaker: -15, // 被黑百合克制
    venture: -15, // 被探奇克制
    pharah: -15, // 被法鸡克制
    ana: -10, // 被安娜克制
    zenyatta: -15, // 被禅雅塔克制
  },
  // 伊拉锐害怕高机动
  illari: {
    pharah: 15, // 打飞行目标
    echo: 10, // 打飞行目标
    reinhardt: 15, // 克制莱因哈特
    ramattra: 15, // 克制拉玛刹
    orisa: 15, // 克制奥丽莎
    brigitte: 15, // 克制布里吉塔
    mei: 10, // 克制美
    tracer: 15, // 克制裂空
    lucio: 15, // 克制卢西奥
    mercy: 15, // 克制天使
    cassidy: 15, // 克制卡西迪
    soldier_76: 15, // 克制76
    bastion: 15, // 克制堡垒
    reaper: 15, // 克制死神
    winston: -15, // 被温斯顿克制
    sigma: -15, // 被西格玛克制
    widowmaker: -15, // 被黑百合克制
    sojourn: -15, // 被索杰恩克制
    ashe: -10, // 被艾什克制
    zenyatta: -10, // 被禅雅塔克制
  },
  // 朱诺害怕高机动
  juno: {
    pharah: 10, // 打飞行目标
    doomfist: 15, // 克制铁拳
    ramattra: 15, // 克制拉玛刹
    mauga: 15, // 克制毛加
    junkrat: 10, // 克制狂鼠
    hanzo: 10, // 克制半藏
    venture: 15, // 克制探奇
    tracer: 10, // 克制裂空
    lucio: 10, // 克制卢西奥
    mercy: 10, // 克制天使
    moira: 10, // 克制莫伊拉
    mei: 10, // 克制美
    junker_queen: -15, // 被渣克女王克制
    sombra: -15, // 被黑影克制
    sojourn: -15, // 被索杰恩克制
    illari: -10, // 被伊拉锐克制
    ana: -10, // 被安娜克制
    zenyatta: -10, // 被禅雅塔克制
  },
};

/**
 * 计算英雄对敌方阵容的动态分数
 * @param heroId 我方英雄ID
 * @param enemyTeam 敌方阵容（英雄ID数组）
 * @returns 动态分数（正数=有优势，负数=有劣势）
 */
export function calcDynamicScore(
  heroId: string,
  enemyTeam: (string | null)[]
): number {
  const heroCounters = counters[heroId];
  if (!heroCounters) return 0;

  let score = 0;
  for (const enemyId of enemyTeam) {
    if (enemyId && heroCounters[enemyId] !== undefined) {
      score += heroCounters[enemyId];
    }
  }
  return score;
}

/**
 * 获取英雄对敌方阵容的克制详情
 * @param heroId 我方英雄ID
 * @param enemyTeam 敌方阵容
 * @returns 克制详情数组
 */
export function getCounterDetails(
  heroId: string,
  enemyTeam: (string | null)[]
): { enemyId: string; score: number }[] {
  const heroCounters = counters[heroId];
  if (!heroCounters) return [];

  const details: { enemyId: string; score: number }[] = [];
  for (const enemyId of enemyTeam) {
    if (enemyId && heroCounters[enemyId] !== undefined) {
      details.push({ enemyId, score: heroCounters[enemyId] });
    }
  }
  return details;
}
