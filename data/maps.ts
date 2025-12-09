// 地图数据配置
export interface Map {
  id: string;
  name: string;
  type: MapType;
  subMaps?: SubMap[];
}

export interface SubMap {
  id: string;
  name: string;
  section?: string; // A点, B段, C段等
}

export enum MapType {
  CONTROL = '抢点图',
  PUSH = '机动推进图',
  FLASHPOINT = '闪点图',
  ESCORT = '纯推车图',
  HYBRID = '混合推车图',
}

export const maps: Map[] = [
  // 抢点图
  {
    id: 'ilios',
    name: '伊里奥斯',
    type: MapType.CONTROL,
    subMaps: [
      { id: 'ilios_lighthouse', name: '伊里奥斯灯塔' },
      { id: 'ilios_well', name: '伊里奥斯深井' },
      { id: 'ilios_ruins', name: '伊里奥斯废墟' },
    ],
  },
  {
    id: 'lijiang',
    name: '漓江塔',
    type: MapType.CONTROL,
    subMaps: [
      { id: 'lijiang_market', name: '漓江塔夜市' },
      { id: 'lijiang_control', name: '漓江塔控制中心' },
      { id: 'lijiang_garden', name: '漓江塔庭院' },
    ],
  },
  {
    id: 'antarctic',
    name: '南极冰岛',
    type: MapType.CONTROL,
    subMaps: [
      { id: 'antarctic_sublevel', name: '南极冰岛冰下层' },
      { id: 'antarctic_labs', name: '南极冰岛实验区' },
      { id: 'antarctic_icebreaker', name: '南极冰岛破冰船' },
    ],
  },
  {
    id: 'nepal',
    name: '尼泊尔',
    type: MapType.CONTROL,
    subMaps: [
      { id: 'nepal_sanctum', name: '尼泊尔圣所' },
      { id: 'nepal_shrine', name: '尼泊尔圣坛' },
      { id: 'nepal_village', name: '尼泊尔村庄' },
    ],
  },
  {
    id: 'oasis',
    name: '绿洲城',
    type: MapType.CONTROL,
    subMaps: [
      { id: 'oasis_center', name: '绿洲城中心' },
      { id: 'oasis_gardens', name: '绿洲城花园' },
      { id: 'oasis_university', name: '绿洲城大学' },
    ],
  },
  {
    id: 'samoa',
    name: '萨摩亚',
    type: MapType.CONTROL,
    subMaps: [
      { id: 'samoa_volcano', name: '萨摩亚火山' },
      { id: 'samoa_downtown', name: '萨摩亚城区' },
      { id: 'samoa_beach', name: '萨摩亚海滩' },
    ],
  },
  {
    id: 'busan',
    name: '釜山',
    type: MapType.CONTROL,
    subMaps: [
      { id: 'busan_downtown', name: '釜山城区' },
      { id: 'busan_sanctuary', name: '釜山寺院' },
      { id: 'busan_meka', name: '釜山meka基地' },
    ],
  },
  // 机动推进图
  {
    id: 'esperanca',
    name: '埃斯佩兰萨',
    type: MapType.PUSH,
  },
  {
    id: 'colosseo',
    name: '斗兽场',
    type: MapType.PUSH,
  },
  {
    id: 'new_queen_street',
    name: '新皇后街',
    type: MapType.PUSH,
  },
  {
    id: 'runasapi',
    name: '鲁纳塞彼',
    type: MapType.PUSH,
  },
  // 闪点图
  {
    id: 'new_junk_city',
    name: '新渣克城',
    type: MapType.FLASHPOINT,
  },
  {
    id: 'suravasa',
    name: '苏拉瓦萨',
    type: MapType.FLASHPOINT,
  },
  {
    id: 'throne',
    name: '阿特利斯',
    type: MapType.FLASHPOINT,
  },
  // 纯推车图
  {
    id: 'route66',
    name: '66公路',
    type: MapType.ESCORT,
    subMaps: [
      { id: 'route66_a', name: '66公路A段', section: 'A段' },
      { id: 'route66_b', name: '66公路B段', section: 'B段' },
      { id: 'route66_c', name: '66公路C段', section: 'C段' },
    ],
  },
  {
    id: 'havana',
    name: '哈瓦那',
    type: MapType.ESCORT,
    subMaps: [
      { id: 'havana_a', name: '哈瓦那A段', section: 'A段' },
      { id: 'havana_b', name: '哈瓦那B段', section: 'B段' },
      { id: 'havana_c', name: '哈瓦那C段', section: 'C段' },
    ],
  },
  {
    id: 'dorado',
    name: '多拉多',
    type: MapType.ESCORT,
    subMaps: [
      { id: 'dorado_a', name: '多拉多A段', section: 'A段' },
      { id: 'dorado_b', name: '多拉多B段', section: 'B段' },
      { id: 'dorado_c', name: '多拉多C段', section: 'C段' },
    ],
  },
  {
    id: 'junkertown',
    name: '渣克镇',
    type: MapType.ESCORT,
    subMaps: [
      { id: 'junkertown_a', name: '渣克镇A段', section: 'A段' },
      { id: 'junkertown_b', name: '渣克镇B段', section: 'B段' },
      { id: 'junkertown_c', name: '渣克镇C段', section: 'C段' },
    ],
  },
  {
    id: 'circuit_royal',
    name: '皇家赛道',
    type: MapType.ESCORT,
    subMaps: [
      { id: 'circuit_royal_a', name: '皇家赛道A段', section: 'A段' },
      { id: 'circuit_royal_b', name: '皇家赛道B段', section: 'B段' },
      { id: 'circuit_royal_c', name: '皇家赛道C段', section: 'C段' },
    ],
  },
  {
    id: 'watchpoint_gibraltar',
    name: '直布罗陀',
    type: MapType.ESCORT,
    subMaps: [
      { id: 'watchpoint_gibraltar_a', name: '直布罗陀A段', section: 'A段' },
      { id: 'watchpoint_gibraltar_b', name: '直布罗陀B段', section: 'B段' },
      { id: 'watchpoint_gibraltar_c', name: '直布罗陀C段', section: 'C段' },
    ],
  },
  {
    id: 'rialto',
    name: '里阿尔托',
    type: MapType.ESCORT,
    subMaps: [
      { id: 'rialto_a', name: '里阿尔托A段', section: 'A段' },
      { id: 'rialto_b', name: '里阿尔托B段', section: 'B段' },
      { id: 'rialto_c', name: '里阿尔托C段', section: 'C段' },
    ],
  },
  {
    id: 'shambali',
    name: '乡巴里寺院',
    type: MapType.ESCORT,
    subMaps: [
      { id: 'shambali_a', name: '乡巴里寺院A段', section: 'A段' },
      { id: 'shambali_b', name: '乡巴里寺院B段', section: 'B段' },
      { id: 'shambali_c', name: '乡巴里寺院C段', section: 'C段' },
    ],
  },
  // 混合推车图
  {
    id: 'midtown',
    name: '中城',
    type: MapType.HYBRID,
    subMaps: [
      { id: 'midtown_a', name: '中城A点', section: 'A点' },
      { id: 'midtown_b', name: '中城B段', section: 'B段' },
      { id: 'midtown_c', name: '中城C段', section: 'C段' },
    ],
  },
  {
    id: 'numbani',
    name: '努巴尼',
    type: MapType.HYBRID,
    subMaps: [
      { id: 'numbani_a', name: '努巴尼A点', section: 'A点' },
      { id: 'numbani_b', name: '努巴尼B段', section: 'B段' },
      { id: 'numbani_c', name: '努巴尼C段', section: 'C段' },
    ],
  },
  {
    id: 'kings_row',
    name: '国王大道',
    type: MapType.HYBRID,
    subMaps: [
      { id: 'kings_row_a', name: '国王大道A点', section: 'A点' },
      { id: 'kings_row_b', name: '国王大道B段', section: 'B段' },
      { id: 'kings_row_c', name: '国王大道C段', section: 'C段' },
    ],
  },
  {
    id: 'hollywood',
    name: '好莱坞',
    type: MapType.HYBRID,
    subMaps: [
      { id: 'hollywood_a', name: '好莱坞A点', section: 'A点' },
      { id: 'hollywood_b', name: '好莱坞B段', section: 'B段' },
      { id: 'hollywood_c', name: '好莱坞C段', section: 'C段' },
    ],
  },
  {
    id: 'blizzard_world',
    name: '暴雪世界',
    type: MapType.HYBRID,
    subMaps: [
      { id: 'blizzard_world_a', name: '暴雪世界A点', section: 'A点' },
      { id: 'blizzard_world_b', name: '暴雪世界B段', section: 'B段' },
      { id: 'blizzard_world_c', name: '暴雪世界C段', section: 'C段' },
    ],
  },
  {
    id: 'eichenwalde',
    name: '艾兴瓦尔德',
    type: MapType.HYBRID,
    subMaps: [
      { id: 'eichenwalde_a', name: '艾兴瓦尔德A点', section: 'A点' },
      { id: 'eichenwalde_b', name: '艾兴瓦尔德B段', section: 'B段' },
      { id: 'eichenwalde_c', name: '艾兴瓦尔德C段', section: 'C段' },
    ],
  },
  {
    id: 'paraiso',
    name: '帕拉伊苏',
    type: MapType.HYBRID,
    subMaps: [
      { id: 'paraiso_a', name: '帕拉伊苏A点', section: 'A点' },
      { id: 'paraiso_b', name: '帕拉伊苏B段', section: 'B段' },
      { id: 'paraiso_c', name: '帕拉伊苏C段', section: 'C段' },
    ],
  },
];
