"use client";

import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { heroes, HeroRole } from "@/data/heroes";
import {
  calcRecommendations,
  getScoreColor,
  formatScore,
  HeroRecommendation,
} from "@/utils/recommendEngine";
import { TrendingUp, TrendingDown, Minus, Zap, Target } from "lucide-react";

interface RecommendCardProps {
  rec: HeroRecommendation;
  rank: number;
}

function RecommendCard({ rec, rank }: RecommendCardProps) {
  const { hero, staticScore, dynamicScore, totalScore, counterDetails } = rec;

  const scoreIcon =
    dynamicScore > 0 ? (
      <TrendingUp className="w-3 h-3 text-green-400" />
    ) : dynamicScore < 0 ? (
      <TrendingDown className="w-3 h-3 text-red-400" />
    ) : (
      <Minus className="w-3 h-3 text-gray-400" />
    );

  const rankBg =
    rank <= 3
      ? "bg-orange-500/20 border-orange-500/50"
      : rank <= 6
      ? "bg-blue-500/20 border-blue-500/50"
      : "bg-gray-700/30 border-gray-600/50";

  return (
    <div
      className={`relative flex items-center gap-3 p-2 rounded-lg border ${rankBg} transition-all hover:scale-[1.02]`}
    >
      {/* 排名 */}
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
          rank <= 3
            ? "bg-orange-500 text-white"
            : rank <= 6
            ? "bg-blue-500 text-white"
            : "bg-gray-600 text-gray-300"
        }`}
      >
        {rank}
      </div>

      {/* 头像 */}
      <img
        src={hero.avatar || "/placeholder.png"}
        alt={hero.name}
        className="w-10 h-10 rounded-md object-cover"
      />

      {/* 信息 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-white truncate">
            {hero.name}
          </span>
          {scoreIcon}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">静态:{formatScore(staticScore)}</span>
          <span className={getScoreColor(dynamicScore)}>
            动态:{formatScore(dynamicScore)}
          </span>
        </div>
      </div>

      {/* 总分 */}
      <div className={`text-lg font-bold ${getScoreColor(totalScore)}`}>
        {formatScore(totalScore)}
      </div>

      {/* 克制详情 tooltip */}
      {counterDetails.length > 0 && (
        <div className="absolute left-full ml-2 top-0 hidden group-hover:block z-50 bg-gray-800 border border-gray-600 rounded-lg p-2 text-xs whitespace-nowrap">
          {counterDetails.map((d, i) => {
            const enemy = heroes.find((h) => h.id === d.enemyId);
            return (
              <div
                key={i}
                className={`flex items-center gap-1 ${
                  d.score > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                <span>{d.score > 0 ? "克制" : "被克制"}</span>
                <span>{enemy?.name || d.enemyId}</span>
                <span>({formatScore(d.score)})</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DynamicRecommendPanel() {
  const { currentRatings, battleState } = useStore();

  const enemyCount = battleState.enemyTeam.filter(Boolean).length;

  const recommendations = useMemo(() => {
    return calcRecommendations(currentRatings, battleState.enemyTeam);
  }, [currentRatings, battleState.enemyTeam]);

  // 取前12个推荐
  const topRecommendations = recommendations.slice(0, 12);

  // 按角色分组的推荐
  const tankRecs = topRecommendations
    .filter((r) => r.hero.role === HeroRole.TANK)
    .slice(0, 3);
  const damageRecs = topRecommendations
    .filter((r) => r.hero.role === HeroRole.DAMAGE)
    .slice(0, 5);
  const supportRecs = topRecommendations
    .filter((r) => r.hero.role === HeroRole.SUPPORT)
    .slice(0, 4);

  if (enemyCount === 0) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold">动态推荐</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">在实战面板填入敌方阵容</p>
          <p className="text-sm">即可获得动态推荐</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold">动态推荐</h3>
        </div>
        <span className="text-xs text-gray-400">
          基于 {enemyCount} 个敌方英雄
        </span>
      </div>

      <div className="space-y-4">
        {/* 坦克推荐 */}
        {tankRecs.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              坦克
            </div>
            <div className="space-y-1">
              {tankRecs.map((rec, i) => (
                <RecommendCard key={rec.hero.id} rec={rec} rank={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* 输出推荐 */}
        {damageRecs.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              输出
            </div>
            <div className="space-y-1">
              {damageRecs.map((rec, i) => (
                <RecommendCard key={rec.hero.id} rec={rec} rank={i + 1} />
              ))}
            </div>
          </div>
        )}

        {/* 辅助推荐 */}
        {supportRecs.length > 0 && (
          <div>
            <div className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
              辅助
            </div>
            <div className="space-y-1">
              {supportRecs.map((rec, i) => (
                <RecommendCard key={rec.hero.id} rec={rec} rank={i + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
