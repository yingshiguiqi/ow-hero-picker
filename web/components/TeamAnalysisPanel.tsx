"use client";

import { useMemo } from "react";
import { useStore } from "@/store/useStore";
import { heroes } from "@/data/heroes";
import { analyzeTeamComposition, TeamAnalysis } from "@/utils/recommendEngine";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle,
  Shield,
  Sword,
  Heart,
  TrendingUp,
  Lightbulb,
  Users,
} from "lucide-react";

export function TeamAnalysisPanel() {
  const battleState = useStore((state) => state.battleState);
  const { myTeam, enemyTeam } = battleState;

  const analysis: TeamAnalysis | null = useMemo(() => {
    const hasMyTeam = myTeam.some((h: string | null) => h !== null);
    if (!hasMyTeam) return null;
    return analyzeTeamComposition(myTeam, enemyTeam);
  }, [myTeam, enemyTeam]);

  if (!analysis) {
    return (
      <div className="bg-gradient-to-br from-purple-900/30 to-slate-800/50 rounded-xl p-5 border border-purple-700/30">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-bold text-white">阵容分析</h3>
        </div>
        <p className="text-base text-slate-400 text-center py-6">
          请先在己方阵容中添加英雄
        </p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "bg-green-500/20";
    if (score >= 50) return "bg-yellow-500/20";
    return "bg-red-500/20";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-400 bg-red-500/20";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20";
      case "low":
        return "text-blue-400 bg-blue-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-slate-800/50 rounded-xl p-5 border border-purple-700/30">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-bold text-white">阵容分析</h3>
        </div>
        <div
          className={`px-4 py-2 rounded-lg font-bold text-lg ${getScoreBg(
            analysis.overallScore
          )} ${getScoreColor(analysis.overallScore)}`}
        >
          {analysis.overallScore}分
        </div>
      </div>

      {/* 阵容构成 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-yellow-500/10 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
            <Shield className="w-4 h-4" />
            <span className="text-xs">坦克</span>
          </div>
          <div className="flex justify-center gap-1">
            {analysis.composition.tanks.length > 0 ? (
              analysis.composition.tanks.map((h) => (
                <div
                  key={h.id}
                  className="w-8 h-8 rounded overflow-hidden bg-gray-700"
                  title={h.name}
                >
                  {h.avatar && (
                    <Image
                      src={h.avatar}
                      alt={h.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))
            ) : (
              <span className="text-xs text-gray-500">无</span>
            )}
          </div>
        </div>

        <div className="bg-red-500/10 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-red-400 mb-1">
            <Sword className="w-4 h-4" />
            <span className="text-xs">输出</span>
          </div>
          <div className="flex justify-center gap-1 flex-wrap">
            {analysis.composition.damage.length > 0 ? (
              analysis.composition.damage.map((h) => (
                <div
                  key={h.id}
                  className="w-8 h-8 rounded overflow-hidden bg-gray-700"
                  title={h.name}
                >
                  {h.avatar && (
                    <Image
                      src={h.avatar}
                      alt={h.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))
            ) : (
              <span className="text-xs text-gray-500">无</span>
            )}
          </div>
        </div>

        <div className="bg-green-500/10 rounded-lg p-2 text-center">
          <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs">辅助</span>
          </div>
          <div className="flex justify-center gap-1 flex-wrap">
            {analysis.composition.support.length > 0 ? (
              analysis.composition.support.map((h) => (
                <div
                  key={h.id}
                  className="w-8 h-8 rounded overflow-hidden bg-gray-700"
                  title={h.name}
                >
                  {h.avatar && (
                    <Image
                      src={h.avatar}
                      alt={h.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))
            ) : (
              <span className="text-xs text-gray-500">无</span>
            )}
          </div>
        </div>
      </div>

      {/* 问题列表 */}
      {analysis.issues.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>发现问题</span>
          </div>
          <div className="space-y-1">
            {analysis.issues.map((issue, i) => (
              <div
                key={i}
                className={`text-xs px-2 py-1.5 rounded ${getSeverityColor(
                  issue.severity
                )}`}
              >
                {issue.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 无问题提示 */}
      {analysis.issues.length === 0 && (
        <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
          <CheckCircle className="w-4 h-4" />
          <span>阵容配置良好</span>
        </div>
      )}

      {/* 建议 */}
      {analysis.suggestions.length > 0 && (
        <div>
          <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
            <Lightbulb className="w-4 h-4" />
            <span>推荐补位</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {analysis.suggestions.map((s) => {
              const hero = heroes.find((h) => h.id === s.heroId);
              if (!hero) return null;
              return (
                <div
                  key={s.heroId}
                  className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                  title={s.reason}
                >
                  <div className="w-5 h-5 rounded overflow-hidden bg-gray-700">
                    {hero.avatar && (
                      <Image
                        src={hero.avatar}
                        alt={hero.name}
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span>{hero.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
