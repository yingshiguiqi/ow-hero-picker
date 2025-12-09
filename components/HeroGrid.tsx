'use client';

import React, { useState, useMemo } from 'react';
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Hero, HeroRole, HeroRating, heroes } from '@/data/heroes';
import HeroCard from './HeroCard';
import DraggableHeroCard from './DraggableHeroCard';
import DroppableRatingZone from './DroppableRatingZone';
import { useStore } from '@/store/useStore';
import { Users, Shield, Swords, Heart, Zap, ThumbsUp, Minus, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSynergyHeroes, loadCustomCombos } from '@/data/combos';
import { soundManager } from '@/utils/soundManager';

interface HeroGridProps {
  mode: 'manual' | 'import';
  importedHeroes?: Hero[];
}

export default function HeroGrid({ mode, importedHeroes = [] }: HeroGridProps) {
  const { currentRatings, setHeroRating, assignRemainingHeroes, setMultipleHeroRatings } = useStore();
  const [selectedRating, setSelectedRating] = useState<HeroRating>(HeroRating.GOOD);
  const [selectedRole, setSelectedRole] = useState<HeroRole | 'all'>('all');
  const [draggedHero, setDraggedHero] = useState<Hero | null>(null);
  const [isDragMode, setIsDragMode] = useState(false); // 拖拽模式开关

  // 配置拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px移动距离后激活拖拽
      },
    })
  );

  const displayHeroes = mode === 'import' && importedHeroes.length > 0 ? importedHeroes : heroes;

  const filteredHeroes = useMemo(() => {
    if (selectedRole === 'all') return displayHeroes;
    return displayHeroes.filter(hero => hero.role === selectedRole);
  }, [displayHeroes, selectedRole]);

  const heroesByRating = useMemo(() => {
    const groups = {
      [HeroRating.GOOD]: [] as Hero[],
      [HeroRating.AVERAGE]: [] as Hero[],
      [HeroRating.BAD]: [] as Hero[],
      [HeroRating.UNRATED]: [] as Hero[],
    };

    filteredHeroes.forEach(hero => {
      const rating = currentRatings.get(hero.id) || HeroRating.UNRATED;
      groups[rating].push(hero);
    });

    return groups;
  }, [filteredHeroes, currentRatings]);

  const handleHeroClick = (hero: Hero) => {
    const currentRating = currentRatings.get(hero.id) || HeroRating.UNRATED;
    if (currentRating === selectedRating) {
      setHeroRating(hero.id, HeroRating.UNRATED);
    } else {
      setHeroRating(hero.id, selectedRating);
    }
  };

  const handleAssignRemaining = () => {
    const unratedHeroes = heroesByRating[HeroRating.UNRATED].map(h => h.id);
    assignRemainingHeroes(HeroRating.BAD, unratedHeroes);
  };

  const getRoleIcon = (role: HeroRole | 'all') => {
    switch (role) {
      case 'all':
        return <Users className="w-4 h-4" />;
      case HeroRole.TANK:
        return <Shield className="w-4 h-4" />;
      case HeroRole.DAMAGE:
        return <Swords className="w-4 h-4" />;
      case HeroRole.SUPPORT:
        return <Heart className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  // 计算已选英雄的配合关系（包含自定义Combo）
  const customCombos = useMemo(() => loadCustomCombos(), []);
  
  const selectedHeroes = useMemo(() => {
    return heroes.filter(h => currentRatings.get(h.id) === HeroRating.GOOD).map(h => h.id);
  }, [currentRatings]);

  const synergyHeroes = useMemo(() => {
    const synergies = new Set<string>();
    selectedHeroes.forEach(heroId => {
      getSynergyHeroes(heroId, customCombos).forEach(synergy => synergies.add(synergy));
    });
    return synergies;
  }, [selectedHeroes, customCombos]);

  // 拖拽开始
  const handleDragStart = (event: any) => {
    const { active } = event;
    const heroId = active.data.current?.heroId;
    if (heroId) {
      const hero = heroes.find(h => h.id === heroId);
      setDraggedHero(hero || null);
      soundManager.play('whoosh');
    }
  };

  // 拖拽结束
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedHero(null);

    if (!over) return;

    const heroId = active.data.current?.heroId;
    const targetRating = over.data.current?.rating;

    if (heroId && targetRating !== undefined) {
      setHeroRating(heroId, targetRating);
      soundManager.play('success');
    }
  };

  // 拖拽取消
  const handleDragCancel = () => {
    setDraggedHero(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="w-full bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
        {/* 控制栏 */}
        <div className="mb-4 md:mb-6 bg-slate-900/40 border border-slate-700/50 rounded-lg p-3 md:p-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-6">
            {/* 拖拽模式切换 */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDragMode(!isDragMode)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2',
                  isDragMode
                    ? 'bg-purple-500/20 border-2 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-700/50 border-2 border-slate-600 text-slate-400 hover:border-purple-500/50'
                )}
              >
                <Zap className="w-4 h-4" />
                {isDragMode ? '拖拽模式' : '点击模式'}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-2">
              <button
                onClick={() => setSelectedRating(HeroRating.GOOD)}
                className={cn(
                  'px-6 py-2 font-bold uppercase tracking-wide text-sm transition-all relative overflow-hidden',
                  'before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-600 before:to-orange-500 before:transition-transform',
                  selectedRating === HeroRating.GOOD
                    ? 'text-white before:translate-x-0 shadow-lg shadow-orange-500/30'
                    : 'text-slate-400 before:-translate-x-full hover:text-white'
                )}
                style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
              >
                <span className="relative z-10">推荐</span>
              </button>
              <button
                onClick={() => setSelectedRating(HeroRating.AVERAGE)}
                className={cn(
                  'px-6 py-2 font-bold uppercase tracking-wide text-sm transition-all relative overflow-hidden',
                  'before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-600 before:to-blue-500 before:transition-transform',
                  selectedRating === HeroRating.AVERAGE
                    ? 'text-white before:translate-x-0 shadow-lg shadow-blue-500/30'
                    : 'text-slate-400 before:-translate-x-full hover:text-white'
                )}
                style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
              >
                <span className="relative z-10">备选</span>
              </button>
              <button
                onClick={() => setSelectedRating(HeroRating.BAD)}
                className={cn(
                  'px-6 py-2 font-bold uppercase tracking-wide text-sm transition-all relative overflow-hidden',
                  'before:absolute before:inset-0 before:bg-gradient-to-r before:from-slate-600 before:to-slate-500 before:transition-transform',
                  selectedRating === HeroRating.BAD
                    ? 'text-white before:translate-x-0 shadow-lg shadow-slate-500/30'
                    : 'text-slate-400 before:-translate-x-full hover:text-white'
                )}
                style={{ clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)' }}
              >
                <span className="relative z-10">不推荐</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">职责</span>
            <div className="flex gap-2">
              {(['all', HeroRole.TANK, HeroRole.DAMAGE, HeroRole.SUPPORT] as const).map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={cn(
                    'px-4 py-2.5 rounded font-medium transition-all flex items-center gap-2 text-sm h-10',
                    selectedRole === role
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-600/50'
                  )}
                >
                  {getRoleIcon(role)}
                  <span className="uppercase tracking-wide">{role === 'all' ? '全部' : role}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAssignRemaining}
            className="px-4 py-2.5 h-10 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded font-medium transition-all flex items-center gap-2 text-sm uppercase tracking-wide border border-slate-500/50"
          >
            <Zap className="w-4 h-4" />
            清空剩余
          </button>
        </div>
      </div>

      {/* 已评级英雄 - 加强版 */}
      <div className="mb-8 space-y-4">
        {heroesByRating[HeroRating.GOOD].length > 0 && (
          <div className="relative bg-gradient-to-r from-orange-500/15 via-orange-500/8 to-transparent border-l-4 border-orange-500 rounded-r-lg p-5 shadow-lg shadow-orange-500/10 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 blur-xl opacity-60"></div>
                  <div className="relative w-2.5 h-12 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 rounded-full shadow-lg"></div>
                </div>
                <div>
                  <span className="text-lg font-black text-orange-400 uppercase tracking-wider block drop-shadow-lg">推荐</span>
                  <span className="text-xs text-orange-300/70">({heroesByRating[HeroRating.GOOD].length} 英雄)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 flex-1">
                {heroesByRating[HeroRating.GOOD].map(hero => (
                  <button
                    key={hero.id}
                    onClick={() => handleHeroClick(hero)}
                    className="group relative"
                    title={`移除 ${hero.name}`}
                  >
                    <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-orange-500/40 to-orange-600/25 border-3 border-orange-500/70 hover:border-orange-400 hover:scale-110 transition-all overflow-hidden shadow-2xl shadow-orange-500/30">
                      {hero.avatar && <img src={hero.avatar} alt={hero.name} className="w-full h-full object-cover" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 text-[10px] font-bold text-white text-center bg-orange-900/90 px-1 py-1 leading-tight shadow-lg">{hero.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {heroesByRating[HeroRating.AVERAGE].length > 0 && (
          <div className="relative bg-gradient-to-r from-blue-500/15 via-blue-500/8 to-transparent border-l-4 border-blue-500 rounded-r-lg p-5 shadow-lg shadow-blue-500/10 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-xl opacity-60"></div>
                  <div className="relative w-2.5 h-12 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-lg"></div>
                </div>
                <div>
                  <span className="text-lg font-black text-blue-400 uppercase tracking-wider block drop-shadow-lg">备选</span>
                  <span className="text-xs text-blue-300/70">({heroesByRating[HeroRating.AVERAGE].length} 英雄)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 flex-1">
                {heroesByRating[HeroRating.AVERAGE].map(hero => (
                  <button
                    key={hero.id}
                    onClick={() => handleHeroClick(hero)}
                    className="group relative"
                    title={`移除 ${hero.name}`}
                  >
                    <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500/40 to-blue-600/25 border-3 border-blue-500/70 hover:border-blue-400 hover:scale-110 transition-all overflow-hidden shadow-2xl shadow-blue-500/30">
                      {hero.avatar && <img src={hero.avatar} alt={hero.name} className="w-full h-full object-cover" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 text-[10px] font-bold text-white text-center bg-blue-900/90 px-1 py-1 leading-tight shadow-lg">{hero.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {heroesByRating[HeroRating.BAD].length > 0 && (
          <div className="relative bg-gradient-to-r from-red-500/8 via-red-500/4 to-transparent border-l-4 border-red-500/60 rounded-r-lg p-5 shadow-lg shadow-red-500/10 animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 blur-xl opacity-40"></div>
                  <div className="relative w-2.5 h-12 bg-gradient-to-b from-red-400 via-red-500 to-red-600 rounded-full shadow-lg"></div>
                </div>
                <div>
                  <span className="text-lg font-black text-red-400 uppercase tracking-wider block drop-shadow-lg">不推荐</span>
                  <span className="text-xs text-red-300/70">({heroesByRating[HeroRating.BAD].length} 英雄)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 flex-1">
                {heroesByRating[HeroRating.BAD].map(hero => (
                  <button
                    key={hero.id}
                    onClick={() => handleHeroClick(hero)}
                    className="group relative"
                    title={`移除 ${hero.name}`}
                  >
                    <div className="relative w-20 h-20 rounded-lg bg-gradient-to-br from-red-500/15 to-red-600/10 border-3 border-red-500/60 hover:border-red-400 hover:scale-110 transition-all overflow-hidden shadow-2xl shadow-red-500/20">
                      {hero.avatar && (
                        <>
                          <img src={hero.avatar} alt={hero.name} className="w-full h-full object-cover" />
                          {/* 红色半透明遮罩 */}
                          <div className="absolute inset-0 bg-red-500/25 mix-blend-multiply group-hover:bg-red-500/15 transition-all"></div>
                          {/* 警告图标 */}
                          <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <span className="text-white text-xs font-black">!</span>
                          </div>
                        </>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 text-[10px] font-bold text-white text-center bg-red-900/80 px-1 py-1 leading-tight shadow-lg">{hero.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 主区域：英雄选择池 */}
      <div className="relative">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/30 border border-slate-700/30 rounded">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 blur-md opacity-30"></div>
              <div className="relative w-1 h-6 bg-gradient-to-b from-orange-500 via-blue-500 to-orange-500 rounded-full"></div>
            </div>
            <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">选择池</span>
            <div className="px-2 py-0.5 bg-slate-900/50 border border-orange-500/20 rounded text-xs">
              <span className="font-bold text-orange-400">{heroesByRating[HeroRating.UNRATED].length}</span>
            </div>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
        </div>
        
        <div className="relative bg-slate-900/30 border-2 border-slate-700/50 rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
            {heroesByRating[HeroRating.UNRATED].map(hero => (
              isDragMode ? (
                <DraggableHeroCard
                  key={hero.id}
                  hero={hero}
                  rating={HeroRating.UNRATED}
                  onRatingChange={() => handleHeroClick(hero)}
                  selectedRating={selectedRating}
                  hasSynergy={synergyHeroes.has(hero.id)}
                />
              ) : (
                <HeroCard
                  key={hero.id}
                  hero={hero}
                  rating={HeroRating.UNRATED}
                  onRatingChange={() => handleHeroClick(hero)}
                  selectedRating={selectedRating}
                  hasSynergy={synergyHeroes.has(hero.id)}
                />
              )
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* 拖拽预览 */}
    <DragOverlay>
      {draggedHero ? (
        <div className="opacity-90 scale-110 rotate-6">
          <HeroCard
            hero={draggedHero}
            rating={currentRatings.get(draggedHero.id) || HeroRating.UNRATED}
            onRatingChange={() => {}}
          />
        </div>
      ) : null}
    </DragOverlay>
  </DndContext>
  );
}
