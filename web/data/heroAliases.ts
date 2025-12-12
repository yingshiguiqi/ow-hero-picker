/**
 * 英雄外号/别名数据
 * 用于模糊搜索和外号识别
 */

export interface HeroAliasEntry {
  heroId: string;
  aliases: string[];
  description?: string; // 外号来源说明
}

export const heroAliases: HeroAliasEntry[] = [
  // 坦克
  {
    heroId: "dva",
    aliases: [
      "迪瓦",
      "迪娃",
      "机甲",
      "小迪瓦",
      "小萝莉",
      "宋哈娜",
      "D.VA",
      "DVA",
    ],
    description: "D.VA名的直呼，机甲形态和人形态的区分",
  },
  {
    heroId: "reinhardt",
    aliases: ["大锤", "王大锤", "莱茵哈特", "锤子"],
    description: "因为举着一把类似大锤的武器",
  },
  {
    heroId: "roadhog",
    aliases: ["猪头", "胖子", "肥猪", "屠夫", "猪", "路霸猪", "拦路猪"],
    description: "胖子向来都会被叫成猪，设定很像DOTA里的屠夫",
  },
  {
    heroId: "winston",
    aliases: ["猩猩", "黄旭东", "科学家", "猴子", "大猩猩"],
    description: "温斯顿确实是一只猩猩，戴着眼镜圆圆滚滚",
  },
  {
    heroId: "zarya",
    aliases: ["毛妹", "女汉子", "查莉亚", "查莉娅", "粉毛"],
    description: "查莉亚来自俄罗斯，战斗民族",
  },
  {
    heroId: "sigma",
    aliases: ["希格玛", "石头人", "老头"],
  },
  {
    heroId: "wrecking_ball",
    aliases: ["球", "仓鼠", "仓鼠球", "哈蒙德", "滚球"],
  },
  {
    heroId: "doomfist",
    aliases: ["铁拳", "末日", "拳头", "黑拳"],
  },
  {
    heroId: "orisa",
    aliases: ["奥莉莎", "马", "机器马"],
  },
  {
    heroId: "junker_queen",
    aliases: ["女王", "渣客女王", "JQ"],
  },
  {
    heroId: "ramattra",
    aliases: ["拉马刹", "和尚坦克"],
  },
  {
    heroId: "mauga",
    aliases: ["毛哥", "双枪"],
  },
  {
    heroId: "hazard",
    aliases: ["骇灾", "蜘蛛坦克"],
  },

  // 输出
  {
    heroId: "genji",
    aliases: ["幼儿园", "忍者", "Genji", "根基", "疯狗", "源"],
    description: "谐音'源'，忍者原型来自日本故事",
  },
  {
    heroId: "soldier_76",
    aliases: ["士兵", "76", "爸爸", "老兵"],
    description: "士兵76一起叫起来太麻烦，所以叫一半",
  },
  {
    heroId: "bastion",
    aliases: ["炮台", "全场最佳", "堡垒机器人"],
    description: "新手局面中堡垒通常会超神并进入全场最佳",
  },
  {
    heroId: "pharah",
    aliases: ["法拉", "法鸡", "飞天", "火箭"],
    description: "俗话说落地法拉不如鸡",
  },
  {
    heroId: "junkrat",
    aliases: ["老鼠", "黄鼠", "炸弹人", "狂鼠"],
    description: "老鼠比狂鼠的名字更好记",
  },
  {
    heroId: "cassidy",
    aliases: ["麦克雷", "牛仔", "麦卡利", "装X", "闪光弹"],
    description: "麦克雷的角色原型是行侠仗义的牛仔",
  },
  {
    heroId: "symmetra",
    aliases: ["阿三妹", "辛梅塔", "摄像头", "传送门", "秩序", "光子"],
    description: "秩序之光来自印度",
  },
  {
    heroId: "reaper",
    aliases: ["幽灵", "呆呆呆", "死神", "黑衣人"],
    description: "死神的大招英文发音为Die!Die!Die!",
  },
  {
    heroId: "hanzo",
    aliases: ["弓箭手", "汉子", "小狙", "随缘箭法", "玄学箭"],
    description: "谐音半藏的英文叫法Hanzo",
  },
  {
    heroId: "widowmaker",
    aliases: ["寡妇", "狙", "大狙", "黑寡妇", "蜘蛛"],
    description: "英文原名widowmaker即寡妇制造者",
  },
  {
    heroId: "torbjorn",
    aliases: ["科比", "矮子", "矮人", "炮台", "托比昂", "托比"],
    description: "无论是造炮台还是修炮台，都是在打铁",
  },
  {
    heroId: "mei",
    aliases: ["冻住不洗澡", "冰箱", "小美", "魔鬼"],
    description: "原词为冻住不许走，但很多时候会听成不洗澡",
  },
  {
    heroId: "tracer",
    aliases: ["猎空", "闪光", "屁股", "裂空"],
  },
  {
    heroId: "sombra",
    aliases: ["黑客", "隐身", "骇客"],
  },
  {
    heroId: "ashe",
    aliases: ["艾什", "女牛仔", "鲍勃"],
  },
  {
    heroId: "echo",
    aliases: ["回音", "复制人", "飞机"],
  },
  {
    heroId: "sojourn",
    aliases: ["索杰恩", "滑铲"],
  },
  {
    heroId: "venture",
    aliases: ["探险家", "钻地"],
  },

  // 支援
  {
    heroId: "mercy",
    aliases: ["奶妈", "慈悲", "天使姐姐", "安吉拉"],
    description: "比卢西奥更纯粹的治疗职业",
  },
  {
    heroId: "lucio",
    aliases: ["DJ", "卢西奥", "青蛙"],
    description: "卢西奥的大部分技能和音乐有关",
  },
  {
    heroId: "zenyatta",
    aliases: ["和尚", "禅雅塔", "铁球"],
    description: "禅雅塔的原型很像一位僧人",
  },
  {
    heroId: "ana",
    aliases: ["老奶奶", "安娜", "狙击奶"],
  },
  {
    heroId: "moira",
    aliases: ["莫伊拉", "吸血鬼", "紫球"],
  },
  {
    heroId: "brigitte",
    aliases: ["小美", "布丽吉塔", "盾奶", "锤妹"],
  },
  {
    heroId: "baptiste",
    aliases: ["巴蒂", "不死力场"],
  },
  {
    heroId: "kiriko",
    aliases: ["雾子", "狐狸", "小狐狸"],
  },
  {
    heroId: "lifeweaver",
    aliases: ["生命", "花", "拉人"],
  },
  {
    heroId: "illari",
    aliases: ["伊拉锐", "太阳", "光柱"],
  },
  {
    heroId: "juno",
    aliases: ["朱诺", "太空奶"],
  },
];

/**
 * 获取英雄的所有别名（包括原名和英文名）
 */
export function getAllAliasesForHero(heroId: string): string[] {
  const entry = heroAliases.find((e) => e.heroId === heroId);
  return entry?.aliases || [];
}

/**
 * 通过别名搜索英雄ID
 */
export function findHeroByAlias(alias: string): string | null {
  const normalizedAlias = alias.toLowerCase().trim();
  for (const entry of heroAliases) {
    for (const a of entry.aliases) {
      if (
        a.toLowerCase().includes(normalizedAlias) ||
        normalizedAlias.includes(a.toLowerCase())
      ) {
        return entry.heroId;
      }
    }
  }
  return null;
}
