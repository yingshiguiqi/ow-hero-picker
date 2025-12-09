import { create } from 'zustand';
import { Hero, HeroRating } from '@/data/heroes';
import { Map as MapType, SubMap } from '@/data/maps';

// 英雄评级数据
export interface HeroRatingData {
  heroId: string;
  rating: HeroRating;
}

// 地图配置
export interface MapConfiguration {
  mapId: string;
  subMapId?: string;
  heroRatings: HeroRatingData[];
}

// 预设
export interface Preset {
  id: string;
  name: string;
  configurations: MapConfiguration[];
  createdAt: Date;
  updatedAt: Date;
}

// 历史记录项
interface HistoryEntry {
  ratings: Map<string, HeroRating>;
  timestamp: number;
}

interface AppState {
  // 当前模式
  mode: 'manual' | 'import';
  
  // 当前选中的地图
  selectedMap: MapType | null;
  selectedSubMap: SubMap | null;
  
  // 当前地图的英雄评级
  currentRatings: Map<string, HeroRating>;
  
  // 撤销/重做历史
  history: HistoryEntry[];
  historyIndex: number;
  
  // 导入的英雄列表（导入模式）
  importedHeroes: Hero[];
  
  // 预设列表
  presets: Preset[];
  
  // 当前预设
  currentPreset: Preset | null;
  
  // Actions
  setMode: (mode: 'manual' | 'import') => void;
  selectMap: (map: MapType | null, subMap?: SubMap | null) => void;
  setHeroRating: (heroId: string, rating: HeroRating) => void;
  setMultipleHeroRatings: (ratings: HeroRatingData[]) => void;
  importHeroes: (heroes: Hero[]) => void;
  clearImportedHeroes: () => void;
  
  // 一键分配剩余英雄
  assignRemainingHeroes: (rating: HeroRating, heroIds: string[]) => void;
  
  // 清空当前评级
  clearCurrentRatings: () => void;
  
  // 撤销/重做
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  savePreset: (name: string) => void;
  loadPreset: (presetId: string) => void;
  renamePreset: (presetId: string, newName: string) => void;
  deletePreset: (presetId: string) => void;
  exportPreset: (presetId: string) => string;
  importPreset: (data: string) => void;
  exportAsText: () => Promise<string> | '';
  
  // 分享代码
  generateShareCode: () => string;
  loadFromShareCode: (code: string) => boolean;
}

const MAX_HISTORY = 50; // 最多保存50条历史记录

export const useStore = create<AppState>((set, get) => ({
  mode: 'manual',
  selectedMap: null,
  selectedSubMap: null,
  currentRatings: new Map(),
  history: [],
  historyIndex: -1,
  importedHeroes: [],
  presets: [],
  currentPreset: null,
  
  setMode: (mode) => set({ mode }),
  
  selectMap: (map, subMap = null) => {
    set({ 
      selectedMap: map,
      selectedSubMap: subMap,
      currentRatings: new Map()
    });
  },
  
  setHeroRating: (heroId, rating) => {
    set((state) => {
      // 保存当前状态到历史
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({
        ratings: new Map(state.currentRatings),
        timestamp: Date.now()
      });
      
      // 限制历史记录数量
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      
      const newRatings = new Map(state.currentRatings);
      if (rating === HeroRating.UNRATED) {
        newRatings.delete(heroId);
      } else {
        newRatings.set(heroId, rating);
      }
      
      return { 
        currentRatings: newRatings,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    });
  },
  
  setMultipleHeroRatings: (ratings) => {
    set((state) => {
      const newRatings = new Map(state.currentRatings);
      ratings.forEach(({ heroId, rating }) => {
        if (rating === HeroRating.UNRATED) {
          newRatings.delete(heroId);
        } else {
          newRatings.set(heroId, rating);
        }
      });
      return { currentRatings: newRatings };
    });
  },
  
  importHeroes: (heroes) => set({ importedHeroes: heroes }),
  
  clearImportedHeroes: () => set({ importedHeroes: [] }),
  
  assignRemainingHeroes: (rating, heroIds) => {
    set((state) => {
      const newRatings = new Map(state.currentRatings);
      heroIds.forEach((heroId) => {
        if (!newRatings.has(heroId)) {
          newRatings.set(heroId, rating);
        }
      });
      return { currentRatings: newRatings };
    });
  },
  
  clearCurrentRatings: () => set({ currentRatings: new Map() }),
  
  savePreset: (name) => {
    const state = get();
    if (!state.selectedMap) return;
    
    const newPreset: Preset = {
      id: Date.now().toString(),
      name,
      configurations: [{
        mapId: state.selectedMap.id,
        subMapId: state.selectedSubMap?.id,
        heroRatings: Array.from(state.currentRatings.entries()).map(([heroId, rating]) => ({
          heroId,
          rating
        }))
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    set((state) => ({
      presets: [...state.presets, newPreset],
      currentPreset: newPreset
    }));
    
    // 保存到localStorage
    const presets = [...get().presets];
    localStorage.setItem('ow-presets', JSON.stringify(presets));
  },
  
  loadPreset: (presetId) => {
    const state = get();
    const preset = state.presets.find(p => p.id === presetId);
    if (!preset || preset.configurations.length === 0) return;
    
    const config = preset.configurations[0];
    const newRatings = new Map<string, HeroRating>();
    config.heroRatings.forEach(({ heroId, rating }) => {
      newRatings.set(heroId, rating);
    });
    
    // 导入 maps 数据以查找对应的地图
    import('@/data/maps').then(({ maps }) => {
      // 查找对应的地图
      const map = maps.find(m => m.id === config.mapId);
      if (!map) return;
      
      // 查找子地图（如果有）
      let subMap = null;
      if (config.subMapId && map.subMaps) {
        subMap = map.subMaps.find(sm => sm.id === config.subMapId) || null;
      }
      
      // 更新状态
      set({
        currentPreset: preset,
        currentRatings: newRatings,
        selectedMap: map,
        selectedSubMap: subMap
      });
    });
  },
  
  renamePreset: (presetId: string, newName: string) => {
    set((state) => {
      const newPresets = state.presets.map(p => 
        p.id === presetId ? { ...p, name: newName, updatedAt: new Date() } : p
      );
      localStorage.setItem('ow-presets', JSON.stringify(newPresets));
      const updatedCurrentPreset = state.currentPreset?.id === presetId && state.currentPreset
        ? { ...state.currentPreset, name: newName, updatedAt: new Date() }
        : state.currentPreset;
      return {
        presets: newPresets,
        currentPreset: updatedCurrentPreset
      };
    });
  },
  
  deletePreset: (presetId) => {
    set((state) => {
      const newPresets = state.presets.filter(p => p.id !== presetId);
      localStorage.setItem('ow-presets', JSON.stringify(newPresets));
      return {
        presets: newPresets,
        currentPreset: state.currentPreset?.id === presetId ? null : state.currentPreset
      };
    });
  },
  
  exportPreset: (presetId) => {
    const preset = get().presets.find(p => p.id === presetId);
    return preset ? JSON.stringify(preset, null, 2) : '';
  },
  
  importPreset: (data) => {
    try {
      const preset = JSON.parse(data) as Preset;
      preset.id = Date.now().toString(); // 生成新ID
      preset.updatedAt = new Date();
      
      set((state) => {
        const newPresets = [...state.presets, preset];
        localStorage.setItem('ow-presets', JSON.stringify(newPresets));
        return { presets: newPresets };
      });
    } catch (error) {
      console.error('导入预设失败:', error);
    }
  },
  
  exportAsText: () => {
    const state = get();
    if (!state.selectedMap) return '';
    
    return import('@/data/heroes').then(({ heroes }) => {
      const lines: string[] = [];
      lines.push(`地图：${state.selectedMap!.name}${state.selectedSubMap ? ' - ' + state.selectedSubMap.name : ''}`);
      lines.push('');
      
      const recommended = heroes.filter(h => state.currentRatings.get(h.id) === HeroRating.GOOD);
      const alternative = heroes.filter(h => state.currentRatings.get(h.id) === HeroRating.AVERAGE);
      const notRecommended = heroes.filter(h => state.currentRatings.get(h.id) === HeroRating.BAD);
      
      if (recommended.length > 0) {
        lines.push(`✅ 推荐：${recommended.map(h => h.name).join(', ')}`);
      }
      if (alternative.length > 0) {
        lines.push(`⚡ 备选：${alternative.map(h => h.name).join(', ')}`);
      }
      if (notRecommended.length > 0) {
        lines.push(`❌ 不推荐：${notRecommended.map(h => h.name).join(', ')}`);
      }
      
      return lines.join('\n');
    });
  },
  
  // 撤销
  undo: () => {
    const state = get();
    if (state.historyIndex <= 0) return;
    
    const newIndex = state.historyIndex - 1;
    const entry = state.history[newIndex];
    
    set({
      currentRatings: new Map(entry.ratings),
      historyIndex: newIndex
    });
  },
  
  // 重做
  redo: () => {
    const state = get();
    if (state.historyIndex >= state.history.length - 1) return;
    
    const newIndex = state.historyIndex + 1;
    const entry = state.history[newIndex];
    
    set({
      currentRatings: new Map(entry.ratings),
      historyIndex: newIndex
    });
  },
  
  // 是否可以撤销
  canUndo: () => {
    const state = get();
    return state.historyIndex > 0;
  },
  
  // 是否可以重做
  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },
  
  // 生成分享代码
  generateShareCode: () => {
    const state = get();
    if (!state.selectedMap) return '';
    
    const data = {
      m: state.selectedMap.id,
      s: state.selectedSubMap?.id || null,
      r: Array.from(state.currentRatings.entries()).map(([heroId, rating]) => [heroId, rating])
    };
    
    try {
      const json = JSON.stringify(data);
      const base64 = btoa(encodeURIComponent(json));
      return base64;
    } catch (error) {
      console.error('生成分享代码失败:', error);
      return '';
    }
  },
  
  // 从分享代码加载（带Zod验证）
  loadFromShareCode: (code: string) => {
    try {
      const json = decodeURIComponent(atob(code));
      const data = JSON.parse(json);
      
      // Zod运行时验证
      import('@/utils/validation').then(({ validateShareCode }) => {
        const validated = validateShareCode(data);
        if (!validated) {
          console.error('分享码验证失败');
          return false;
        }
        
        // 导入地图数据
        import('@/data/maps').then(({ maps }) => {
          const map = maps.find(m => m.id === validated.m);
          if (!map) {
            console.error('未找到地图');
            return false;
          }
          
          let subMap = null;
          if (validated.s && map.subMaps) {
            subMap = map.subMaps.find(sm => sm.id === validated.s) || null;
          }
          
          const ratings = new Map<string, HeroRating>(validated.r);
          
          set({
            selectedMap: map,
            selectedSubMap: subMap,
            currentRatings: ratings,
            history: [],
            historyIndex: -1
          });
        });
      });
      
      return true;
    } catch (error) {
      console.error('加载分享代码失败:', error);
      return false;
    }
  }
}));
