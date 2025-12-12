"use client";

import { useStore } from "@/store/useStore";
import { heroes, getHeroWikiUrl } from "@/data/heroes";
import { X, Users, Swords, ExternalLink } from "lucide-react";
import { TeamAnalysisPanel } from "./TeamAnalysisPanel";
import { useState, useRef, useEffect } from "react";

interface HeroSlotProps {
  heroId: string | null;
  onSelect: (heroId: string | null) => void;
  slotIndex: number;
  teamType: "enemy" | "my";
}

function HeroSlot({ heroId, onSelect, slotIndex, teamType }: HeroSlotProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hero = heroId ? heroes.find((h) => h.id === heroId) : null;

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (id: string) => {
    onSelect(id);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(null);
  };

  const bgColor =
    teamType === "enemy"
      ? "bg-red-900/30 border-red-500/50"
      : "bg-blue-900/30 border-blue-500/50";
  const hoverColor =
    teamType === "enemy" ? "hover:border-red-400" : "hover:border-blue-400";

  return (
    <div className="relative" ref={popoverRef}>
      <div
        onClick={() => setOpen(!open)}
        className={`relative w-16 h-16 rounded-xl border-2 ${bgColor} ${hoverColor} cursor-pointer transition-all flex items-center justify-center`}
      >
        {hero ? (
          <>
            <img
              src={hero.avatar || "/placeholder.png"}
              alt={hero.name}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <button
              onClick={handleClear}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors border border-gray-600"
            >
              <X className="w-3 h-3 text-white" />
            </button>
            <a
              href={getHeroWikiUrl(hero)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors border border-orange-400"
              title="查看Wiki详情"
            >
              <ExternalLink className="w-3 h-3 text-white" />
            </a>
          </>
        ) : (
          <span className="text-sm text-gray-500 font-medium">
            {slotIndex + 1}
          </span>
        )}
      </div>
      {open && (
        <div className="absolute z-50 top-16 left-0 w-72 p-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-64 overflow-y-auto">
          <div className="grid grid-cols-6 gap-1">
            {heroes.map((h) => (
              <button
                key={h.id}
                onClick={() => handleSelect(h.id)}
                className={`w-10 h-10 rounded border hover:border-orange-400 transition-colors ${
                  heroId === h.id
                    ? "border-orange-500 bg-orange-500/20"
                    : "border-gray-600"
                }`}
                title={h.name}
              >
                <img
                  src={h.avatar || "/placeholder.png"}
                  alt={h.name}
                  className="w-9 h-9 rounded object-cover mx-auto"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function BattleDashboard() {
  const {
    battleState,
    setEnemyHero,
    setMyHero,
    clearEnemyTeam,
    clearMyTeam,
    clearBattle,
  } = useStore();

  const enemyCount = battleState.enemyTeam.filter(Boolean).length;
  const myCount = battleState.myTeam.filter(Boolean).length;

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-5 space-y-5 border border-gray-700/50 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2 text-orange-400">
          <Swords className="w-6 h-6" />
          实战面板
        </h3>
        <button
          onClick={clearBattle}
          className="text-xs px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
        >
          清空全部
        </button>
      </div>

      {/* 敌方阵容 */}
      <div className="space-y-3 bg-red-950/20 rounded-lg p-3 border border-red-900/30">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-red-400 flex items-center gap-2">
            <Users className="w-5 h-5" />
            敌方阵容 ({enemyCount}/5)
          </span>
          <button
            onClick={clearEnemyTeam}
            disabled={enemyCount === 0}
            className="text-xs px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            清空
          </button>
        </div>
        <div className="flex gap-3 justify-center">
          {battleState.enemyTeam.map((heroId, index) => (
            <HeroSlot
              key={`enemy-${index}`}
              heroId={heroId}
              onSelect={(id) => setEnemyHero(index, id)}
              slotIndex={index}
              teamType="enemy"
            />
          ))}
        </div>
      </div>

      {/* 己方阵容 */}
      <div className="space-y-3 bg-blue-950/20 rounded-lg p-3 border border-blue-900/30">
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-blue-400 flex items-center gap-2">
            <Users className="w-5 h-5" />
            己方阵容 ({myCount}/5)
          </span>
          <button
            onClick={clearMyTeam}
            disabled={myCount === 0}
            className="text-xs px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            清空
          </button>
        </div>
        <div className="flex gap-3 justify-center">
          {battleState.myTeam.map((heroId, index) => (
            <HeroSlot
              key={`my-${index}`}
              heroId={heroId}
              onSelect={(id) => setMyHero(index, id)}
              slotIndex={index}
              teamType="my"
            />
          ))}
        </div>
      </div>

      {/* 阵容分析 */}
      <TeamAnalysisPanel />
    </div>
  );
}
