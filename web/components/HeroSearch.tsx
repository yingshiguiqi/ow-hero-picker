"use client";

import { useState, useMemo, useCallback } from "react";
import { heroes, Hero, HeroRole } from "@/data/heroes";
import { heroAliases } from "@/data/heroAliases";
import { Search, X } from "lucide-react";
import Image from "next/image";

interface HeroSearchProps {
  onSelect?: (hero: Hero) => void;
  placeholder?: string;
  className?: string;
}

/**
 * 英雄搜索组件
 * 支持中文名、英文名、外号模糊搜索
 */
export default function HeroSearch({
  onSelect,
  placeholder = "搜索英雄（支持外号如：大锤、猩猩、法鸡...）",
  className = "",
}: HeroSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // 搜索逻辑
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase().trim();
    const results: { hero: Hero; score: number; matchType: string }[] = [];

    for (const hero of heroes) {
      let score = 0;
      let matchType = "";

      // 精确匹配中文名
      if (hero.name.toLowerCase() === q) {
        score = 100;
        matchType = "精确匹配";
      }
      // 精确匹配英文名
      else if (hero.nameEn.toLowerCase() === q) {
        score = 95;
        matchType = "英文名";
      }
      // 精确匹配ID
      else if (hero.id.toLowerCase() === q) {
        score = 90;
        matchType = "ID";
      }
      // 中文名包含
      else if (hero.name.toLowerCase().includes(q)) {
        score = 80;
        matchType = "中文名";
      }
      // 英文名包含
      else if (hero.nameEn.toLowerCase().includes(q)) {
        score = 75;
        matchType = "英文名";
      }
      // 原始别名匹配
      else if (hero.aliases?.some((a) => a.toLowerCase().includes(q))) {
        score = 70;
        matchType = "别名";
      }
      // 外号匹配
      else {
        const aliasEntry = heroAliases.find((e) => e.heroId === hero.id);
        if (aliasEntry) {
          for (const alias of aliasEntry.aliases) {
            if (
              alias.toLowerCase().includes(q) ||
              q.includes(alias.toLowerCase())
            ) {
              score = 65;
              matchType = `外号: ${alias}`;
              break;
            }
          }
        }
      }

      if (score > 0) {
        results.push({ hero, score, matchType });
      }
    }

    // 按分数排序
    return results.sort((a, b) => b.score - a.score).slice(0, 10);
  }, [query]);

  const handleSelect = useCallback(
    (hero: Hero) => {
      onSelect?.(hero);
      setQuery("");
      setIsFocused(false);
    },
    [onSelect]
  );

  const getRoleColor = (role: HeroRole) => {
    switch (role) {
      case HeroRole.TANK:
        return "bg-yellow-500/20 text-yellow-400";
      case HeroRole.DAMAGE:
        return "bg-red-500/20 text-red-400";
      case HeroRole.SUPPORT:
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* 搜索输入框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 搜索结果下拉 */}
      {isFocused && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-80 overflow-y-auto">
          {searchResults.map(({ hero, matchType }) => (
            <button
              key={hero.id}
              onClick={() => handleSelect(hero)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-700 transition-colors text-left"
            >
              {/* 头像 */}
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
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

              {/* 信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{hero.name}</span>
                  <span className="text-gray-500 text-sm">{hero.nameEn}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${getRoleColor(
                      hero.role
                    )}`}
                  >
                    {hero.role}
                  </span>
                  <span className="text-gray-500 text-xs truncate">
                    {matchType}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 无结果提示 */}
      {isFocused && query && searchResults.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 text-center text-gray-500">
          未找到匹配的英雄
        </div>
      )}
    </div>
  );
}
