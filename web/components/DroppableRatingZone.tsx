"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { HeroRating } from "@/data/heroes";
import { cn } from "@/lib/utils";
import { Shield, Swords, Heart } from "lucide-react";

interface DroppableRatingZoneProps {
  rating: HeroRating;
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  count: number;
  roleSummary?: { tank: number; damage: number; support: number };
  hintMode?: "drag" | "click";
}

export default function DroppableRatingZone({
  rating,
  children,
  title,
  icon,
  count,
  roleSummary,
  hintMode = "drag",
}: DroppableRatingZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `zone-${rating}`,
    data: { rating },
  });

  const getZoneStyle = () => {
    switch (rating) {
      case HeroRating.GOOD:
        return {
          border: "border-orange-500/30",
          bg: "bg-orange-500/5",
          hoverBg: "bg-orange-500/10",
          text: "text-orange-400",
          ring: "ring-orange-500/50",
        };
      case HeroRating.AVERAGE:
        return {
          border: "border-blue-500/30",
          bg: "bg-blue-500/5",
          hoverBg: "bg-blue-500/10",
          text: "text-blue-400",
          ring: "ring-blue-500/50",
        };
      case HeroRating.BAD:
        return {
          border: "border-red-500/30",
          bg: "bg-red-500/5",
          hoverBg: "bg-red-500/10",
          text: "text-red-400",
          ring: "ring-red-500/50",
        };
      default:
        return {
          border: "border-slate-700/50",
          bg: "bg-slate-900/30",
          hoverBg: "bg-slate-900/50",
          text: "text-slate-300",
          ring: "ring-slate-500/50",
        };
    }
  };

  const style = getZoneStyle();

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative rounded-lg border-2 p-4 transition-all duration-300",
        style.border,
        isOver ? `${style.hoverBg} ring-2 ${style.ring} scale-[1.02]` : style.bg
      )}
    >
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn("p-1.5 rounded", isOver && "animate-pulse")}>
            {icon}
          </div>
          <h3
            className={cn(
              "text-sm font-bold uppercase tracking-wide",
              style.text
            )}
          >
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {roleSummary && (
            <div
              className={cn(
                "hidden sm:flex items-center gap-2 text-[11px]",
                style.text
              )}
            >
              <span className="flex items-center gap-1 opacity-80">
                <Shield className="w-3.5 h-3.5" />
                {roleSummary.tank}
              </span>
              <span className="flex items-center gap-1 opacity-80">
                <Swords className="w-3.5 h-3.5" />
                {roleSummary.damage}
              </span>
              <span className="flex items-center gap-1 opacity-80">
                <Heart className="w-3.5 h-3.5" />
                {roleSummary.support}
              </span>
            </div>
          )}
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-semibold",
              `bg-${
                rating === HeroRating.GOOD
                  ? "orange"
                  : rating === HeroRating.AVERAGE
                  ? "blue"
                  : "red"
              }-500/20`,
              style.text
            )}
          >
            {count}
          </span>
        </div>
      </div>

      {/* 拖拽目标提示 */}
      {isOver && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              "px-4 py-2 rounded-lg font-medium text-sm animate-bounce",
              style.hoverBg,
              style.text
            )}
          >
            松开以添加
          </div>
        </div>
      )}

      {/* 内容区域 */}
      <div
        className={cn(
          "grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2",
          isOver && "opacity-50"
        )}
      >
        {count === 0 && !isOver ? (
          <div className="col-span-full flex items-center justify-center py-6 opacity-70">
            <div className={cn("text-sm", style.text)}>
              {hintMode === "click" ? "点击英雄分配到这里" : "将英雄拖拽到这里"}
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
