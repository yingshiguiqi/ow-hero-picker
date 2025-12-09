// 英雄羁绊/Combo数据
export interface HeroCombo {
  id: string;        // Combo ID
  heroes: string[];  // 英雄ID数组
  name: string;      // Combo名称
  description: string; // 描述
  synergy: string;   // 配合说明
  custom?: boolean;  // 是否为自定义Combo
}

export const heroCombos: HeroCombo[] = [
  {
    id: 'pharmercy',
    heroes: ['pharah', 'mercy'],
    name: '天地组合',
    description: '法老之鹰 + 天使',
    synergy: '天使持续治疗+伤害加成，法老空中持续输出'
  },
  {
    id: 'grav-dragon',
    heroes: ['zarya', 'hanzo'],
    name: '重力龙',
    description: '查莉娅 + 半藏',
    synergy: '重力激增聚集敌人，龙击杀团灭'
  },
  {
    id: 'grav-blade',
    heroes: ['zarya', 'genji'],
    name: '龙刃重力',
    description: '查莉娅 + 源氏',
    synergy: '重力激增控场，龙刃收割'
  },
  {
    id: 'nano-blade',
    heroes: ['ana', 'genji'],
    name: '纳米龙刃',
    description: '安娜 + 源氏',
    synergy: '纳米激素增强龙刃，快速团灭'
  },
  {
    id: 'nano-rein',
    heroes: ['ana', 'reinhardt'],
    name: '纳米莱因',
    description: '安娜 + 莱因哈特',
    synergy: '纳米激素让莱因冲锋无敌'
  },
  {
    id: 'dva-zarya',
    heroes: ['dva', 'zarya'],
    name: '防御矩阵',
    description: 'D.Va + 查莉娅',
    synergy: 'D.Va保护查莉娅充能，查莉娅护盾保护D.Va'
  },
  {
    id: 'lucio-rein',
    heroes: ['lucio', 'reinhardt'],
    name: '加速冲锋',
    description: '卢西奥 + 莱因哈特',
    synergy: '卢西奥加速让莱因快速接近敌人'
  },
  {
    id: 'dive-tank',
    heroes: ['winston', 'dva'],
    name: '双飞',
    description: '温斯顿 + D.Va',
    synergy: '双突进坦克，同时切入后排'
  },
  {
    id: 'sombra-doom',
    heroes: ['sombra', 'doomfist'],
    name: '黑拳组合',
    description: '黑影 + 末日铁拳',
    synergy: '黑影EMP破盾，末日冲拳击杀'
  },
  {
    id: 'bunker',
    heroes: ['orisa', 'bastion'],
    name: '堡垒炮台',
    description: '奥丽莎 + 堡垒',
    synergy: '奥丽莎护盾保护堡垒固定火力'
  },
  {
    id: 'double-sniper',
    heroes: ['widowmaker', 'hanzo'],
    name: '双狙',
    description: '黑百合 + 半藏',
    synergy: '远程狙击控场，限制敌方走位'
  },
  {
    id: 'mercy-ashe',
    heroes: ['mercy', 'ashe'],
    name: '伤害加成',
    description: '天使 + 艾什',
    synergy: '天使伤害加成让艾什一枪爆头秒杀200血英雄'
  },
  {
    id: 'brig-rein',
    heroes: ['brigitte', 'reinhardt'],
    name: '装甲双盾',
    description: '布里吉塔 + 莱因哈特',
    synergy: '布里吉塔提供装甲和额外治疗，保护莱因'
  },
  {
    id: 'double-shield',
    heroes: ['sigma', 'orisa'],
    name: '双盾',
    description: '西格玛 + 奥丽莎',
    synergy: '双护盾交替使用，持续防护'
  },
  {
    id: 'echo-mercy',
    heroes: ['echo', 'mercy'],
    name: '双飞输出',
    description: '回声 + 天使',
    synergy: '天使跟随回声飞行，持续增伤'
  }
];

// 根据选中的英雄获取可能的Combo
export function getAvailableCombos(selectedHeroes: string[]): HeroCombo[] {
  const selectedSet = new Set(selectedHeroes);
  
  return heroCombos.filter(combo => {
    // 至少有一个Combo中的英雄被选中
    return combo.heroes.some(heroId => selectedSet.has(heroId));
  });
}

// 获取某个英雄的配合英雄（包含自定义）
export function getSynergyHeroes(heroId: string, customCombos: HeroCombo[] = []): string[] {
  const synergies = new Set<string>();
  const allCombos = [...heroCombos, ...customCombos];
  
  allCombos.forEach(combo => {
    if (combo.heroes.includes(heroId)) {
      combo.heroes.forEach(h => {
        if (h !== heroId) {
          synergies.add(h);
        }
      });
    }
  });
  
  return Array.from(synergies);
}

// 从localStorage加载自定义Combo
export function loadCustomCombos(): HeroCombo[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem('ow-custom-combos');
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('加载自定义Combo失败:', error);
    return [];
  }
}

// 保存自定义Combo到localStorage
export function saveCustomCombos(combos: HeroCombo[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('ow-custom-combos', JSON.stringify(combos));
  } catch (error) {
    console.error('保存自定义Combo失败:', error);
  }
}

// 创建新的自定义Combo
export function createCustomCombo(
  name: string,
  heroes: string[],
  synergy: string
): HeroCombo {
  return {
    id: `custom-${Date.now()}`,
    heroes,
    name,
    description: heroes.map(h => h).join(' + '),
    synergy,
    custom: true
  };
}
