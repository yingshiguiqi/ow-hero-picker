'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import MapSelector from '@/components/MapSelector';
import HeroGrid from '@/components/HeroGrid';
import PresetManager from '@/components/PresetManager';
import ImportMode from '@/components/ImportMode';
import UndoRedoHandler from '@/components/UndoRedoHandler';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import SoundToggle from '@/components/SoundToggle';
import StatsDashboard from '@/components/StatsDashboard';
import { Map, MapIcon, MapPin, Menu, X, Users, Upload, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const { 
    mode, 
    setMode, 
    selectedMap, 
    selectedSubMap, 
    selectMap,
    importedHeroes 
  } = useStore();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'manual' | 'stats'>('manual');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 撤销/重做快捷键监听 */}
      <UndoRedoHandler />
      
      {/* 快捷键提示 */}
      <KeyboardShortcuts />
      
      {/* 音效开关 */}
      <SoundToggle />
      {/* 头部 - 守望先锋风格 */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b-2 border-orange-500/30 sticky top-0 z-20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 blur-xl opacity-30"></div>
                <MapIcon className="relative w-10 h-10 text-orange-500" />
              </div>
              <div>
                <h1 className="text-xl font-black uppercase tracking-wider text-white">
                  守望先锋
                </h1>
                <p className="text-xs text-slate-400 tracking-wide">英雄推荐系统</p>
              </div>
            </div>
            
            {/* 当前地图信息 - 紧凑显示 */}
            {selectedMap && (
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 border border-orange-500/30 rounded">
                <MapPin className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-sm font-bold text-white">
                    {selectedSubMap ? selectedSubMap.name : selectedMap.name}
                  </p>
                  <p className="text-xs text-slate-400">{selectedMap.type}</p>
                </div>
              </div>
            )}
            
            {/* Tab切换 - 配置/统计 */}
            <div className="flex gap-2 items-center">
              <span className="text-xs text-slate-500 uppercase tracking-wider">页面</span>
              <div className="flex gap-1.5 bg-slate-800/50 p-1 rounded border border-slate-700/50">
                <button
                  onClick={() => setActiveTab('manual')}
                  className={cn(
                    'px-4 py-1.5 font-medium uppercase tracking-wide text-xs transition-all rounded flex items-center gap-1.5',
                    activeTab === 'manual'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                  )}
                >
                  <Users className="w-3.5 h-3.5" />
                  配置
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={cn(
                    'px-4 py-1.5 font-medium uppercase tracking-wide text-xs transition-all rounded flex items-center gap-1.5',
                    activeTab === 'stats'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                  )}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  统计
                </button>
              </div>
            </div>
            
            {/* 模式切换 - 仅在配置页显示 */}
            {activeTab === 'manual' && (
              <div className="flex gap-2 items-center">
                <span className="text-xs text-slate-500 uppercase tracking-wider">模式</span>
                <div className="flex gap-1.5 bg-slate-800/50 p-1 rounded border border-slate-700/50">
                  <button
                    onClick={() => setMode('manual')}
                    className={cn(
                      'px-4 py-1.5 font-medium uppercase tracking-wide text-xs transition-all rounded flex items-center gap-1.5',
                      mode === 'manual'
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                    )}
                  >
                    <Users className="w-3.5 h-3.5" />
                    手动
                  </button>
                  <button
                    onClick={() => setMode('import')}
                    className={cn(
                      'px-4 py-1.5 font-medium uppercase tracking-wide text-xs transition-all rounded flex items-center gap-1.5',
                      mode === 'import'
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                    )}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    导入
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 侧边栏切换按钮 */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-20 z-20 p-3 rounded-lg shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border border-blue-400/50 hover:shadow-blue-500/50 hover:scale-110"
          aria-label="打开侧边栏"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      )}

      {/* 侧边栏 - 移动端抽屉式 */}
      {sidebarOpen && (
        <>
          {/* 移动端遮罩 */}
          <div 
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          
          <aside className="fixed left-0 top-0 md:top-16 h-full md:h-[calc(100vh-4rem)] w-full sm:w-96 md:w-80 bg-slate-900/98 md:bg-slate-900/95 backdrop-blur-md border-r-2 border-slate-700/50 overflow-y-auto z-40 md:z-10 shadow-2xl animate-slide-up">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute right-3 top-3 z-20 p-1.5 bg-slate-800/80 hover:bg-orange-500/20 border border-slate-700 hover:border-orange-500/50 transition-all duration-200 group rounded"
              aria-label="关闭侧边栏"
            >
              <X className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
            </button>
            
            <div className="p-5 space-y-5 pt-12">
              {/* 地图选择器 */}
              <MapSelector
                selectedMap={selectedMap}
                selectedSubMap={selectedSubMap}
                onMapSelect={selectMap}
              />
              
              {/* 预设管理 */}
              <PresetManager />
            </div>
          </aside>
        </>
      )}

      {/* 主内容区 - 响应式 */}
      <main className={cn(
        'transition-all duration-300 px-4 md:px-6 py-4 md:py-6',
        sidebarOpen ? 'md:ml-80' : 'ml-0'
      )}>
        <div className="container mx-auto max-w-[1800px]">
          {/* Tab内容切换 */}
          {activeTab === 'stats' ? (
            <StatsDashboard />
          ) : mode === 'import' ? (
            <div className="space-y-6">
              <ImportMode />
              {importedHeroes.length > 0 && selectedMap && (
                <div id="hero-grid-export">
                  <HeroGrid mode="import" importedHeroes={importedHeroes} />
                </div>
              )}
            </div>
          ) : (
            selectedMap ? (
              <div id="hero-grid-export">
                <HeroGrid mode="manual" />
              </div>
            ) : (
              <div className="bg-slate-800/50 rounded-xl p-12 backdrop-blur-sm text-center">
                <Map className="w-16 h-16 mx-auto mb-4 text-slate-500" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">
                  请选择一张地图
                </h3>
                <p className="text-slate-500">
                  从侧边栏选择地图后，即可开始为英雄评级
                </p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
