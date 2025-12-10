"use client";

import React, { useState } from "react";
import { Hero, HeroRating } from "@/data/heroes";
import { cn } from "@/lib/utils";
import { soundManager } from "@/utils/soundManager";
import { useStore } from "@/store/useStore";
import { Shield, Swords, Heart } from "lucide-react";

interface HeroCardProps {
  hero: Hero;
  rating: HeroRating;
  onRatingChange: (rating: HeroRating) => void;
  disabled?: boolean;
  selectedRating?: HeroRating;
  hasSynergy?: boolean; // 是否有配合英雄
}

export default function HeroCard({
  hero,
  rating,
  onRatingChange,
  disabled = false,
  selectedRating,
  hasSynergy = false,
}: HeroCardProps) {
  const [isHovering, setIsHovering] = React.useState(false);
  const { setHeroRating } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const getRatingColor = (r: HeroRating) => {
    switch (r) {
      case HeroRating.GOOD:
        return "border-orange-500/70";
      case HeroRating.AVERAGE:
        return "border-blue-500/70";
      case HeroRating.BAD:
        return "border-slate-500/70";
      default:
        return "border-slate-600/50";
    }
  };

  const getHoverPreviewColor = (r: HeroRating) => {
    switch (r) {
      case HeroRating.GOOD:
        return "shadow-orange-500/50";
      case HeroRating.AVERAGE:
        return "shadow-blue-500/50";
      case HeroRating.BAD:
        return "shadow-slate-500/50";
      default:
        return "";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "坦克":
        return "text-blue-400";
      case "输出":
        return "text-red-400";
      case "支援":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "坦克":
        return <Shield className="w-3.5 h-3.5" />;
      case "输出":
        return <Swords className="w-3.5 h-3.5" />;
      case "支援":
        return <Heart className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const getCursorStyle = () => {
    if (disabled) return "cursor-not-allowed";
    if (rating === HeroRating.UNRATED && selectedRating) {
      if (selectedRating === HeroRating.BAD) {
        return "cursor-not-allowed"; // 红色禁止光标
      }
      return "cursor-crosshair"; // 画笔光标
    }
    return "cursor-pointer"; // 已评级英雄用普通点击
  };

  return (
    <div
      className={cn(
        "group relative transition-all duration-200",
        disabled ? "opacity-50" : "hover:scale-105",
        getCursorStyle()
      )}
      onDoubleClick={() => {
        if (!disabled) {
          const target = selectedRating ?? HeroRating.GOOD;
          setHeroRating(hero.id, target);
          soundManager.play("click");
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (disabled) return;
        setMenuPos({ x: e.clientX, y: e.clientY });
        setMenuOpen(true);
      }}
      onClick={() => {
        if (!disabled) {
          onRatingChange(rating);
          soundManager.play("click");
        }
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 悬停预览效果 */}
      {isHovering && selectedRating && rating === HeroRating.UNRATED && (
        <div
          className={cn(
            "absolute inset-0 rounded-lg pointer-events-none z-20 transition-all",
            "shadow-2xl ring-2",
            selectedRating === HeroRating.GOOD &&
              "ring-orange-500/70 shadow-orange-500/50",
            selectedRating === HeroRating.AVERAGE &&
              "ring-blue-500/70 shadow-blue-500/50",
            selectedRating === HeroRating.BAD &&
              "ring-red-500/70 shadow-red-500/50"
          )}
        ></div>
      )}

      <div
        className={cn(
          "relative bg-slate-800/50 border-2 rounded-lg overflow-hidden transition-all",
          isHovering && selectedRating && rating === HeroRating.UNRATED
            ? getRatingColor(selectedRating)
            : rating === HeroRating.UNRATED
            ? hasSynergy
              ? "border-yellow-500/60 hover:border-yellow-400 shadow-lg shadow-yellow-500/20"
              : "border-slate-600/50 hover:border-slate-500"
            : getRatingColor(rating)
        )}
      >
        {/* 头像 */}
        <div className="aspect-square relative overflow-hidden">
          {hero.avatar ? (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${hero.avatar}`}
              alt={hero.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.innerHTML = `<div class=\"w-full h-full flex items-center justify-center bg-slate-700\"><span class=\"text-3xl font-bold\">${hero.name[0]}</span></div>`;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-700">
              <span className="text-3xl font-bold">{hero.name[0]}</span>
            </div>
          )}

          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        </div>

        {/* 信息栏 */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-slate-900/95 to-transparent">
          <h3 className="font-bold text-sm text-white text-center leading-tight mb-0.5">
            {hero.name}
          </h3>
          <div className="flex items-center justify-center gap-1">
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-wider flex items-center gap-1",
                getRoleColor(hero.role)
              )}
            >
              {getRoleIcon(hero.role)}
              {hero.role}
            </span>
          </div>
        </div>
      </div>
      {/* 右键菜单 */}
      {menuOpen && (
        <div
          className="fixed z-50 bg-slate-800 border border-slate-700 rounded shadow-xl text-sm text-slate-200"
          style={{ left: menuPos.x, top: menuPos.y }}
          onMouseLeave={() => setMenuOpen(false)}
        >
          {[
            { label: "设为推荐", value: HeroRating.GOOD },
            { label: "设为备选", value: HeroRating.AVERAGE },
            { label: "设为不推荐", value: HeroRating.BAD },
            { label: "清除评级", value: HeroRating.UNRATED },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setHeroRating(hero.id, item.value);
                setMenuOpen(false);
                soundManager.play("click");
              }}
              className="block w-full text-left px-3 py-2 hover:bg-slate-700"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
