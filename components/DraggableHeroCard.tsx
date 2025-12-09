'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Hero, HeroRating } from '@/data/heroes';
import { cn } from '@/lib/utils';
import { soundManager } from '@/utils/soundManager';

interface DraggableHeroCardProps {
  hero: Hero;
  rating: HeroRating;
  onRatingChange: (rating: HeroRating) => void;
  selectedRating?: HeroRating;
  hasSynergy?: boolean;
}

export default function DraggableHeroCard({ 
  hero, 
  rating, 
  onRatingChange, 
  selectedRating,
  hasSynergy = false 
}: DraggableHeroCardProps) {
  const [isHovering, setIsHovering] = React.useState(false);
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `hero-${hero.id}-${rating}`,
    data: {
      heroId: hero.id,
      currentRating: rating
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const getRatingColor = (r: HeroRating) => {
    switch (r) {
      case HeroRating.GOOD:
        return 'border-orange-500/70';
      case HeroRating.AVERAGE:
        return 'border-blue-500/70';
      case HeroRating.BAD:
        return 'border-slate-500/70';
      default:
        return 'border-slate-600/50';
    }
  };

  const getCursorStyle = () => {
    if (rating === HeroRating.UNRATED && selectedRating) {
      if (selectedRating === HeroRating.BAD) return 'cursor-not-allowed';
      return 'cursor-crosshair';
    }
    return 'cursor-grab active:cursor-grabbing';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'group relative transition-all duration-200',
        isDragging ? 'opacity-50 scale-95' : 'hover:scale-105',
        getCursorStyle()
      )}
      onClick={() => {
        if (rating === HeroRating.UNRATED && selectedRating) {
          onRatingChange(selectedRating);
          soundManager.play('click');
        }
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 悬停预览效果 */}
      {isHovering && selectedRating && rating === HeroRating.UNRATED && (
        <div className={cn(
          'absolute inset-0 rounded-lg pointer-events-none z-20 transition-all',
          'shadow-2xl ring-2',
          selectedRating === HeroRating.GOOD && 'ring-orange-500/70 shadow-orange-500/50',
          selectedRating === HeroRating.AVERAGE && 'ring-blue-500/70 shadow-blue-500/50',
          selectedRating === HeroRating.BAD && 'ring-red-500/70 shadow-red-500/50'
        )}></div>
      )}
      
      <div className={cn(
        'relative bg-slate-800/50 border-2 rounded-lg overflow-hidden transition-all',
        isHovering && selectedRating && rating === HeroRating.UNRATED 
          ? getRatingColor(selectedRating)
          : rating === HeroRating.UNRATED 
          ? hasSynergy
            ? 'border-yellow-500/60 hover:border-yellow-400 shadow-lg shadow-yellow-500/20'
            : 'border-slate-600/50 hover:border-slate-500'
          : getRatingColor(rating)
      )}>
        {/* 拖拽指示器 */}
        {!isDragging && (
          <div className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-5 h-5 bg-slate-700/80 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-slate-300" fill="currentColor" viewBox="0 0 16 16">
                <circle cx="3" cy="3" r="1.5"/>
                <circle cx="8" cy="3" r="1.5"/>
                <circle cx="13" cy="3" r="1.5"/>
                <circle cx="3" cy="8" r="1.5"/>
                <circle cx="8" cy="8" r="1.5"/>
                <circle cx="13" cy="8" r="1.5"/>
                <circle cx="3" cy="13" r="1.5"/>
                <circle cx="8" cy="13" r="1.5"/>
                <circle cx="13" cy="13" r="1.5"/>
              </svg>
            </div>
          </div>
        )}

        {/* 头像 */}
        <div className="aspect-square relative overflow-hidden">
          {hero.avatar ? (
            <img 
              src={hero.avatar} 
              alt={hero.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-hero.png';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
              <span className="text-xs text-slate-400">{hero.name[0]}</span>
            </div>
          )}
          
          {/* 评级遮罩 */}
          {rating !== HeroRating.UNRATED && (
            <div className={cn(
              'absolute inset-0 transition-all',
              rating === HeroRating.BAD && 'bg-red-900/40'
            )} />
          )}
        </div>

        {/* 名称 */}
        <div className="px-1.5 py-1 bg-slate-900/70 backdrop-blur-sm">
          <p className="text-[10px] font-medium text-center truncate text-white">
            {hero.name}
          </p>
        </div>

        {/* 评级标记 */}
        {rating === HeroRating.BAD && (
          <div className="absolute top-1 left-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
          </div>
        )}
      </div>
    </div>
  );
}
