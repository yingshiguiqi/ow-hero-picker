'use client';

import React, { useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useStore } from '@/store/useStore';
import { heroes, HeroRole, HeroRating } from '@/data/heroes';
import { TrendingUp, Users, Award, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StatsDashboard() {
  const { presets, currentRatings } = useStore();

  // 统计所有预设中的英雄使用频率
  const heroUsageStats = useMemo(() => {
    const usageMap = new Map<string, number>();
    
    // 统计所有预设
    presets.forEach(preset => {
      preset.configurations.forEach(config => {
        config.heroRatings.forEach(({ heroId, rating }) => {
          if (rating === HeroRating.GOOD) {
            usageMap.set(heroId, (usageMap.get(heroId) || 0) + 1);
          }
        });
      });
    });

    // 转换为数组并排序
    const stats = Array.from(usageMap.entries())
      .map(([heroId, count]) => {
        const hero = heroes.find(h => h.id === heroId);
        return {
          name: hero?.name || heroId,
          count,
          percentage: presets.length > 0 ? Math.round((count / presets.length) * 100) : 0
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10

    return stats;
  }, [presets]);

  // 统计职责偏好
  const roleStats = useMemo(() => {
    const roleCount = {
      [HeroRole.TANK]: 0,
      [HeroRole.DAMAGE]: 0,
      [HeroRole.SUPPORT]: 0
    };

    presets.forEach(preset => {
      preset.configurations.forEach(config => {
        config.heroRatings.forEach(({ heroId, rating }) => {
          if (rating === HeroRating.GOOD) {
            const hero = heroes.find(h => h.id === heroId);
            if (hero) {
              roleCount[hero.role]++;
            }
          }
        });
      });
    });

    return [
      { name: '坦克', value: roleCount[HeroRole.TANK], color: '#3b82f6' },
      { name: '输出', value: roleCount[HeroRole.DAMAGE], color: '#ef4444' },
      { name: '支援', value: roleCount[HeroRole.SUPPORT], color: '#10b981' }
    ];
  }, [presets]);

  // 当前配置统计
  const currentStats = useMemo(() => {
    const stats = {
      total: 0,
      good: 0,
      average: 0,
      bad: 0
    };

    currentRatings.forEach((rating) => {
      stats.total++;
      if (rating === HeroRating.GOOD) stats.good++;
      else if (rating === HeroRating.AVERAGE) stats.average++;
      else if (rating === HeroRating.BAD) stats.bad++;
    });

    return stats;
  }, [currentRatings]);

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold">{payload[0].payload.name}</p>
          <p className="text-orange-400">
            使用次数: <span className="font-bold">{payload[0].value}</span>
          </p>
          <p className="text-slate-400 text-sm">
            ({payload[0].payload.percentage}% 的预设)
          </p>
        </div>
      );
    }
    return null;
  };

  if (presets.length === 0) {
    return (
      <div className="w-full bg-slate-800/50 rounded-xl p-8 backdrop-blur-sm text-center">
        <div className="max-w-md mx-auto">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">暂无数据</h3>
          <p className="text-slate-500">
            保存一些预设后，这里将显示您的英雄使用统计
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* 概览卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-slate-400" />
            <span className="text-2xl font-bold text-white">{presets.length}</span>
          </div>
          <p className="text-sm text-slate-400">预设总数</p>
        </div>

        <div className="bg-gradient-to-br from-orange-900/30 to-slate-900 rounded-lg p-4 border border-orange-500/30">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-orange-400" />
            <span className="text-2xl font-bold text-orange-400">{currentStats.good}</span>
          </div>
          <p className="text-sm text-slate-400">当前推荐</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-2xl font-bold text-blue-400">{currentStats.average}</span>
          </div>
          <p className="text-sm text-slate-400">当前备选</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-slate-400" />
            <span className="text-2xl font-bold text-white">
              {heroUsageStats[0]?.name.slice(0, 4) || '-'}
            </span>
          </div>
          <p className="text-sm text-slate-400">最常用</p>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 英雄使用排行 */}
        <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-400" />
            英雄登场率 Top 10
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={heroUsageStats}>
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="#f97316"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          {heroUsageStats.length > 0 && (
            <p className="mt-4 text-sm text-slate-400 text-center">
              你在 <span className="font-bold text-orange-400">{heroUsageStats[0].percentage}%</span> 的预设中推荐了 
              <span className="font-bold text-white"> {heroUsageStats[0].name}</span>
            </p>
          )}
        </div>

        {/* 职责偏好 */}
        <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            职责偏好分布
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {roleStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center gap-4">
            {roleStats.map((role) => (
              <div key={role.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: role.color }}
                />
                <span className="text-sm text-slate-300">
                  {role.name}: {role.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
