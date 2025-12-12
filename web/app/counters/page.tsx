"use client";

import { useState, useMemo } from "react";
import { heroes, Hero, HeroRole } from "@/data/heroes";
import { counters } from "@/data/counters";
import { heroAliases } from "@/data/heroAliases";
import HeroSearch from "@/components/HeroSearch";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Sword,
  Heart,
  ChevronUp,
  ChevronDown,
  Search,
  Info,
} from "lucide-react";

type ViewMode = "hero" | "matrix";

export default function CountersPage() {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("hero");
  const [roleFilter, setRoleFilter] = useState<HeroRole | "all">("all");
  const [showCounters, setShowCounters] = useState(true); // 显示克制的
  const [showCounteredBy, setShowCounteredBy] = useState(true); // 显示被克制的

  // 获取英雄的克制关系
  const counterData = useMemo(() => {
    if (!selectedHero) return { countersHeroes: [], counteredByHeroes: [] };

    const heroCounters = counters[selectedHero.id] || {};
    const countersHeroes: { hero: Hero; score: number }[] = [];
    const counteredByHeroes: { hero: Hero; score: number }[] = [];

    for (const [targetId, score] of Object.entries(heroCounters)) {
      const targetHero = heroes.find((h) => h.id === targetId);
      if (targetHero) {
        if (score > 0) {
          countersHeroes.push({ hero: targetHero, score });
        } else if (score < 0) {
          counteredByHeroes.push({ hero: targetHero, score: Math.abs(score) });
        }
      }
    }

    // 按分数排序
    countersHeroes.sort((a, b) => b.score - a.score);
    counteredByHeroes.sort((a, b) => b.score - a.score);

    return { countersHeroes, counteredByHeroes };
  }, [selectedHero]);

  // 获取英雄外号
  const getHeroAliases = (heroId: string) => {
    const entry = heroAliases.find((e) => e.heroId === heroId);
    return entry?.aliases.slice(0, 3).join("、") || "";
  };

  // 角色图标
  const RoleIcon = ({ role }: { role: HeroRole }) => {
    switch (role) {
      case HeroRole.TANK:
        return <Shield className="w-4 h-4" />;
      case HeroRole.DAMAGE:
        return <Sword className="w-4 h-4" />;
      case HeroRole.SUPPORT:
        return <Heart className="w-4 h-4" />;
    }
  };

  // 角色颜色
  const getRoleColor = (role: HeroRole) => {
    switch (role) {
      case HeroRole.TANK:
        return "text-yellow-400 bg-yellow-500/20";
      case HeroRole.DAMAGE:
        return "text-red-400 bg-red-500/20";
      case HeroRole.SUPPORT:
        return "text-green-400 bg-green-500/20";
    }
  };

  // 分数颜色
  const getScoreColor = (score: number, isCounter: boolean) => {
    if (isCounter) {
      if (score >= 20) return "text-green-400 bg-green-500/20";
      if (score >= 15) return "text-green-300 bg-green-500/15";
      return "text-green-200 bg-green-500/10";
    } else {
      if (score >= 20) return "text-red-400 bg-red-500/20";
      if (score >= 15) return "text-red-300 bg-red-500/15";
      return "text-red-200 bg-red-500/10";
    }
  };

  // 过滤英雄
  const filteredHeroes = useMemo(() => {
    if (roleFilter === "all") return heroes;
    return heroes.filter((h) => h.role === roleFilter);
  }, [roleFilter]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </Link>
          <h1 className="text-xl font-bold text-orange-500">英雄克制关系</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 搜索和筛选 */}
        <div className="mb-6 space-y-4">
          {/* 搜索框 */}
          <HeroSearch
            onSelect={(hero) => setSelectedHero(hero)}
            className="max-w-xl"
          />

          {/* 角色筛选 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setRoleFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                roleFilter === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              全部
            </button>
            {Object.values(HeroRole).map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors ${
                  roleFilter === role
                    ? "bg-orange-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                <RoleIcon role={role} />
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 英雄列表 */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-500" />
                选择英雄
              </h2>
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-[60vh] overflow-y-auto">
                {filteredHeroes.map((hero) => (
                  <button
                    key={hero.id}
                    onClick={() => setSelectedHero(hero)}
                    className={`relative group rounded-lg overflow-hidden transition-all ${
                      selectedHero?.id === hero.id
                        ? "ring-2 ring-orange-500 scale-105"
                        : "hover:scale-105"
                    }`}
                    title={`${hero.name} (${hero.nameEn})`}
                  >
                    <div className="aspect-square bg-gray-700">
                      {hero.avatar ? (
                        <Image
                          src={hero.avatar}
                          alt={hero.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                          {hero.name[0]}
                        </div>
                      )}
                    </div>
                    {/* 角色标识 */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 text-center text-[10px] py-0.5 ${getRoleColor(
                        hero.role
                      )}`}
                    >
                      {hero.name.slice(0, 3)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 克制关系详情 */}
          <div className="lg:col-span-2">
            {selectedHero ? (
              <div className="space-y-4">
                {/* 英雄信息卡 */}
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-700">
                      {selectedHero.avatar ? (
                        <Image
                          src={selectedHero.avatar}
                          alt={selectedHero.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          {selectedHero.name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {selectedHero.name}
                      </h2>
                      <p className="text-gray-400">{selectedHero.nameEn}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-0.5 rounded text-sm flex items-center gap-1 ${getRoleColor(
                            selectedHero.role
                          )}`}
                        >
                          <RoleIcon role={selectedHero.role} />
                          {selectedHero.role}
                        </span>
                      </div>
                      {getHeroAliases(selectedHero.id) && (
                        <p className="text-gray-500 text-sm mt-1">
                          外号: {getHeroAliases(selectedHero.id)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 克制关系切换 */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCounters(!showCounters)}
                    className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      showCounters
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    <ChevronUp className="w-4 h-4" />
                    克制 ({counterData.countersHeroes.length})
                  </button>
                  <button
                    onClick={() => setShowCounteredBy(!showCounteredBy)}
                    className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      showCounteredBy
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                    被克制 ({counterData.counteredByHeroes.length})
                  </button>
                </div>

                {/* 克制的英雄 */}
                {showCounters && counterData.countersHeroes.length > 0 && (
                  <div className="bg-gray-800 rounded-xl p-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-400">
                      <ChevronUp className="w-5 h-5" />
                      {selectedHero.name} 克制以下英雄
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {counterData.countersHeroes.map(({ hero, score }) => (
                        <button
                          key={hero.id}
                          onClick={() => setSelectedHero(hero)}
                          className="flex items-center gap-2 p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-600 flex-shrink-0">
                            {hero.avatar ? (
                              <Image
                                src={hero.avatar}
                                alt={hero.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                {hero.name[0]}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="text-sm font-medium truncate">
                              {hero.name}
                            </div>
                            <div
                              className={`text-xs px-1.5 py-0.5 rounded inline-block ${getScoreColor(
                                score,
                                true
                              )}`}
                            >
                              +{score}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 被克制的英雄 */}
                {showCounteredBy &&
                  counterData.counteredByHeroes.length > 0 && (
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-400">
                        <ChevronDown className="w-5 h-5" />
                        {selectedHero.name} 被以下英雄克制
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {counterData.counteredByHeroes.map(
                          ({ hero, score }) => (
                            <button
                              key={hero.id}
                              onClick={() => setSelectedHero(hero)}
                              className="flex items-center gap-2 p-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-600 flex-shrink-0">
                                {hero.avatar ? (
                                  <Image
                                    src={hero.avatar}
                                    alt={hero.name}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                    {hero.name[0]}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0 text-left">
                                <div className="text-sm font-medium truncate">
                                  {hero.name}
                                </div>
                                <div
                                  className={`text-xs px-1.5 py-0.5 rounded inline-block ${getScoreColor(
                                    score,
                                    false
                                  )}`}
                                >
                                  -{score}
                                </div>
                              </div>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* 无克制关系提示 */}
                {counterData.countersHeroes.length === 0 &&
                  counterData.counteredByHeroes.length === 0 && (
                    <div className="bg-gray-800 rounded-xl p-8 text-center text-gray-500">
                      <Info className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>暂无克制关系数据</p>
                    </div>
                  )}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-xl p-12 text-center text-gray-500">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">请选择一个英雄查看克制关系</p>
                <p className="text-sm mt-2">
                  支持搜索英雄名、英文名或外号（如：大锤、猩猩、法鸡）
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
