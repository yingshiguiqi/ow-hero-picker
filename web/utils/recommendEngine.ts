/**
 * 动态推荐引擎
 * 综合静态预设分 + 动态克制分，生成最终推荐列表
 */

import { heroes, HeroRating, Hero } from "@/data/heroes";
import { calcDynamicScore, getCounterDetails } from "@/data/counters";

// 静态分映射
const STATIC_SCORE_MAP: Record<HeroRating, number> = {
  [HeroRating.GOOD]: 30,
  [HeroRating.AVERAGE]: 10,
  [HeroRating.BAD]: -20,
  [HeroRating.UNRATED]: 0,
};

export interface HeroRecommendation {
  hero: Hero;
  staticScore: number; // 来自预设的静态分
  dynamicScore: number; // 来自敌方阵容的动态分
  totalScore: number; // 综合分
  rating: HeroRating; // 原始评级
  counterDetails: { enemyId: string; score: number }[]; // 克制详情
}

/**
 * 计算英雄推荐列表
 * @param currentRatings 当前地图的英雄评级
 * @param enemyTeam 敌方阵容
 * @param staticWeight 静态分权重（0-1）
 * @param dynamicWeight 动态分权重（0-1）
 */
export function calcRecommendations(
  currentRatings: Map<string, HeroRating>,
  enemyTeam: (string | null)[],
  staticWeight: number = 0.6,
  dynamicWeight: number = 0.4
): HeroRecommendation[] {
  const recommendations: HeroRecommendation[] = [];

  for (const hero of heroes) {
    const rating = currentRatings.get(hero.id) || HeroRating.UNRATED;
    const staticScore = STATIC_SCORE_MAP[rating];
    const dynamicScore = calcDynamicScore(hero.id, enemyTeam);
    const counterDetails = getCounterDetails(hero.id, enemyTeam);

    // 加权综合分
    const totalScore =
      staticScore * staticWeight + dynamicScore * dynamicWeight;

    recommendations.push({
      hero,
      staticScore,
      dynamicScore,
      totalScore,
      rating,
      counterDetails,
    });
  }

  // 按综合分降序排列
  recommendations.sort((a, b) => b.totalScore - a.totalScore);

  return recommendations;
}

/**
 * 获取推荐等级
 * 根据综合分划分为推荐/备选/不推荐
 */
export function getRecommendTier(
  totalScore: number
): "recommended" | "alternative" | "not_recommended" | "neutral" {
  if (totalScore >= 20) return "recommended";
  if (totalScore >= 5) return "alternative";
  if (totalScore <= -10) return "not_recommended";
  return "neutral";
}

/**
 * 获取分数颜色
 */
export function getScoreColor(score: number): string {
  if (score >= 20) return "text-green-400";
  if (score >= 10) return "text-green-300";
  if (score >= 0) return "text-gray-300";
  if (score >= -10) return "text-yellow-400";
  return "text-red-400";
}

/**
 * 格式化分数显示
 */
export function formatScore(score: number): string {
  if (score > 0) return `+${score.toFixed(0)}`;
  return score.toFixed(0);
}

// ===== 团队阵容分析 =====

export interface TeamComposition {
  tanks: Hero[];
  damage: Hero[];
  support: Hero[];
}

export interface TeamAnalysis {
  composition: TeamComposition;
  issues: TeamIssue[];
  suggestions: TeamSuggestion[];
  overallScore: number; // 0-100
}

export interface TeamIssue {
  type:
    | "missing_role"
    | "weak_synergy"
    | "counter_vulnerable"
    | "no_main_healer"
    | "no_shield";
  severity: "high" | "medium" | "low";
  message: string;
}

export interface TeamSuggestion {
  heroId: string;
  reason: string;
  priority: number; // 1-10
}

/**
 * 分析己方阵容
 */
export function analyzeTeamComposition(
  myTeam: (string | null)[],
  enemyTeam: (string | null)[]
): TeamAnalysis {
  const composition: TeamComposition = {
    tanks: [],
    damage: [],
    support: [],
  };

  // 分类己方英雄
  for (const heroId of myTeam) {
    if (!heroId) continue;
    const hero = heroes.find((h) => h.id === heroId);
    if (!hero) continue;

    switch (hero.role) {
      case "坦克":
        composition.tanks.push(hero);
        break;
      case "输出":
        composition.damage.push(hero);
        break;
      case "支援":
        composition.support.push(hero);
        break;
    }
  }

  const issues: TeamIssue[] = [];
  const suggestions: TeamSuggestion[] = [];

  // 检查阵容问题
  // 1. 缺少坦克
  if (composition.tanks.length === 0) {
    issues.push({
      type: "missing_role",
      severity: "high",
      message: "阵容缺少坦克，建议补充一个坦克英雄",
    });
    suggestions.push(
      { heroId: "reinhardt", reason: "提供护盾保护", priority: 9 },
      { heroId: "winston", reason: "高机动性骚扰", priority: 8 },
      { heroId: "dva", reason: "灵活支援", priority: 8 }
    );
  }

  // 2. 缺少辅助
  if (composition.support.length === 0) {
    issues.push({
      type: "missing_role",
      severity: "high",
      message: "阵容缺少辅助，建议补充治疗英雄",
    });
    suggestions.push(
      { heroId: "ana", reason: "强力单体治疗", priority: 9 },
      { heroId: "lucio", reason: "范围治疗+加速", priority: 8 },
      { heroId: "mercy", reason: "稳定治疗+增伤", priority: 8 }
    );
  }

  // 3. 只有一个辅助
  if (composition.support.length === 1) {
    issues.push({
      type: "no_main_healer",
      severity: "medium",
      message: "只有一个辅助，治疗量可能不足",
    });
  }

  // 4. 缺少输出
  if (composition.damage.length === 0 && myTeam.filter(Boolean).length >= 3) {
    issues.push({
      type: "missing_role",
      severity: "medium",
      message: "阵容缺少输出英雄",
    });
  }

  // 5. 检查是否有护盾坦克
  const shieldTanks = ["reinhardt", "sigma", "ramattra"];
  const hasShield = composition.tanks.some((t) => shieldTanks.includes(t.id));
  if (composition.tanks.length > 0 && !hasShield) {
    issues.push({
      type: "no_shield",
      severity: "low",
      message: "没有护盾坦克，可能需要更多掩体意识",
    });
  }

  // 6. 检查敌方克制
  const enemyIds = enemyTeam.filter(Boolean) as string[];
  if (enemyIds.length > 0) {
    for (const myHeroId of myTeam.filter(Boolean) as string[]) {
      const myHero = heroes.find((h) => h.id === myHeroId);
      if (!myHero) continue;

      const dynamicScore = calcDynamicScore(myHeroId, enemyTeam);
      if (dynamicScore <= -15) {
        issues.push({
          type: "counter_vulnerable",
          severity: "medium",
          message: `${myHero.name} 被敌方阵容严重克制`,
        });
      }
    }
  }

  // 计算整体评分
  let overallScore = 70; // 基础分
  for (const issue of issues) {
    switch (issue.severity) {
      case "high":
        overallScore -= 20;
        break;
      case "medium":
        overallScore -= 10;
        break;
      case "low":
        overallScore -= 5;
        break;
    }
  }
  overallScore = Math.max(0, Math.min(100, overallScore));

  return {
    composition,
    issues,
    suggestions: suggestions
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 5),
    overallScore,
  };
}

/**
 * 获取补位推荐
 * 根据当前阵容推荐最适合的英雄
 */
export function getSlotRecommendations(
  myTeam: (string | null)[],
  enemyTeam: (string | null)[],
  currentRatings: Map<string, HeroRating>,
  slotIndex: number
): HeroRecommendation[] {
  const analysis = analyzeTeamComposition(myTeam, enemyTeam);
  const recommendations = calcRecommendations(currentRatings, enemyTeam);

  // 根据阵容缺失调整分数
  const adjusted = recommendations.map((rec) => {
    let bonus = 0;

    // 如果缺少该角色，给予加分
    if (analysis.composition.tanks.length === 0 && rec.hero.role === "坦克") {
      bonus += 15;
    }
    if (analysis.composition.support.length < 2 && rec.hero.role === "支援") {
      bonus += 10;
    }
    if (analysis.composition.damage.length === 0 && rec.hero.role === "输出") {
      bonus += 5;
    }

    // 如果是建议的英雄，额外加分
    const suggestion = analysis.suggestions.find(
      (s) => s.heroId === rec.hero.id
    );
    if (suggestion) {
      bonus += suggestion.priority * 2;
    }

    return {
      ...rec,
      totalScore: rec.totalScore + bonus,
    };
  });

  // 排除已选英雄
  const selectedIds = new Set(myTeam.filter(Boolean));
  const filtered = adjusted.filter((r) => !selectedIds.has(r.hero.id));

  return filtered.sort((a, b) => b.totalScore - a.totalScore);
}
