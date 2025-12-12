import { create } from "zustand";
import { Hero, HeroRating } from "@/data/heroes";
import { Map as MapType, SubMap } from "@/data/maps";

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

// 实战面板：敌我阵容槽位
export interface BattleState {
  enemyTeam: (string | null)[]; // 5 slots, heroId or null
  myTeam: (string | null)[]; // 5 slots, heroId or null
}

interface AppState {
  // 当前模式
  mode: "manual" | "import";

  // 当前选中的地图
  selectedMap: MapType | null;
  selectedSubMap: SubMap | null;

  // 当前地图的英雄评级
  currentRatings: Map<string, HeroRating>;

  // 会话内各地图的工作区配置（key = `${mapId}::${subMapId||''}`）
  mapWorkspace: Record<string, Map<string, HeroRating>>;

  // 撤销/重做历史
  history: HistoryEntry[];
  historyIndex: number;

  // 导入的英雄列表（导入模式）
  importedHeroes: Hero[];

  // 预设列表
  presets: Preset[];

  // 当前预设
  currentPreset: Preset | null;

  // 实战面板：敌我阵容
  battleState: BattleState;

  // Actions
  setMode: (mode: "manual" | "import") => void;
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
  exportAsText: () => Promise<string> | "";

  // 分享代码
  generateShareCode: () => string;
  loadFromShareCode: (code: string) => boolean;

  // 实战面板操作
  setEnemyHero: (slotIndex: number, heroId: string | null) => void;
  setMyHero: (slotIndex: number, heroId: string | null) => void;
  setEnemyTeam: (heroIds: (string | null)[]) => void;
  setMyTeam: (heroIds: (string | null)[]) => void;
  clearEnemyTeam: () => void;
  clearMyTeam: () => void;
  clearBattle: () => void;
}

const MAX_HISTORY = 50; // 最多保存50条历史记录

const EMPTY_BATTLE_STATE: BattleState = {
  enemyTeam: [null, null, null, null, null],
  myTeam: [null, null, null, null, null],
};

export const useStore = create<AppState>((set, get) => ({
  mode: "manual",
  selectedMap: null,
  selectedSubMap: null,
  currentRatings: new Map(),
  mapWorkspace: {},
  history: [],
  historyIndex: -1,
  importedHeroes: [],
  presets: [],
  currentPreset: null,
  battleState: {
    ...EMPTY_BATTLE_STATE,
    enemyTeam: [...EMPTY_BATTLE_STATE.enemyTeam],
    myTeam: [...EMPTY_BATTLE_STATE.myTeam],
  },

  setMode: (mode) => set({ mode }),

  selectMap: (map, subMap = null) => {
    set((state) => {
      const mk = (mid?: string | null, sid?: string | null) =>
        `${mid || ""}::${sid || ""}`;
      const ws: Record<string, Map<string, HeroRating>> = {
        ...state.mapWorkspace,
      };
      // 将上一个地图的当前评级写回工作区
      if (state.selectedMap) {
        const prevKey = mk(
          state.selectedMap.id,
          state.selectedSubMap?.id || null
        );
        ws[prevKey] = new Map(state.currentRatings);
      }
      // 切换到新地图时，从工作区载入
      let nextRatings = new Map<string, HeroRating>();
      if (map) {
        const nextKey = mk(map.id, subMap?.id || null);
        if (ws[nextKey]) nextRatings = new Map(ws[nextKey]);
      }
      return {
        selectedMap: map,
        selectedSubMap: subMap,
        currentRatings: nextRatings,
        mapWorkspace: ws,
      };
    });
  },

  setHeroRating: (heroId, rating) => {
    set((state) => {
      // 保存当前状态到历史
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push({
        ratings: new Map(state.currentRatings),
        timestamp: Date.now(),
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

      // 同步到工作区
      const mk = (mid?: string | null, sid?: string | null) =>
        `${mid || ""}::${sid || ""}`;
      const ws: Record<string, Map<string, HeroRating>> = {
        ...state.mapWorkspace,
      };
      if (state.selectedMap) {
        const key = mk(state.selectedMap.id, state.selectedSubMap?.id || null);
        ws[key] = new Map(newRatings);
      }
      return {
        currentRatings: newRatings,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        mapWorkspace: ws,
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
      // 同步到工作区
      const mk = (mid?: string | null, sid?: string | null) =>
        `${mid || ""}::${sid || ""}`;
      const ws: Record<string, Map<string, HeroRating>> = {
        ...state.mapWorkspace,
      };
      if (state.selectedMap) {
        const key = mk(state.selectedMap.id, state.selectedSubMap?.id || null);
        ws[key] = new Map(newRatings);
      }
      return { currentRatings: newRatings, mapWorkspace: ws };
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

  clearCurrentRatings: () =>
    set((state) => {
      const mk = (mid?: string | null, sid?: string | null) =>
        `${mid || ""}::${sid || ""}`;
      const ws: Record<string, Map<string, HeroRating>> = {
        ...state.mapWorkspace,
      };
      if (state.selectedMap) {
        const key = mk(state.selectedMap.id, state.selectedSubMap?.id || null);
        ws[key] = new Map();
      }
      return { currentRatings: new Map(), mapWorkspace: ws };
    }),

  savePreset: (name) => {
    const state = get();
    const mk = (mid?: string | null, sid?: string | null) =>
      `${mid || ""}::${sid || ""}`;
    // 先把当前地图写回工作区，防止未切换时丢失
    if (state.selectedMap) {
      const key = mk(state.selectedMap.id, state.selectedSubMap?.id || null);
      const wsNow = { ...state.mapWorkspace };
      wsNow[key] = new Map(state.currentRatings);
      set({ mapWorkspace: wsNow });
    }

    const wsAll = get().mapWorkspace;
    const allConfigs: MapConfiguration[] = [];
    Object.entries(wsAll).forEach(([key, mp]) => {
      const [mapId, subIdRaw] = key.split("::");
      if (mp && mapId) {
        allConfigs.push({
          mapId,
          subMapId: subIdRaw || undefined,
          heroRatings: Array.from(mp.entries()).map(([heroId, rating]) => ({
            heroId,
            rating,
          })),
        });
      }
    });
    // 若工作区为空，至少保存当前地图（可能为空）
    if (allConfigs.length === 0 && state.selectedMap) {
      allConfigs.push({
        mapId: state.selectedMap.id,
        subMapId: state.selectedSubMap?.id,
        heroRatings: Array.from(state.currentRatings.entries()).map(
          ([heroId, rating]) => ({ heroId, rating })
        ),
      });
    }

    set((state) => {
      const presetsCopy = [...state.presets];
      const nameKey = name.trim().toLowerCase();
      const existIdx = presetsCopy.findIndex(
        (p) => (p.name || "").trim().toLowerCase() === nameKey
      );
      if (existIdx >= 0) {
        const updated: Preset = {
          ...presetsCopy[existIdx],
          configurations: allConfigs,
          updatedAt: new Date(),
        };
        presetsCopy[existIdx] = updated;
        localStorage.setItem("ow-presets", JSON.stringify(presetsCopy));
        return { presets: presetsCopy, currentPreset: updated };
      }
      const newPreset: Preset = {
        id: Date.now().toString(),
        name,
        configurations: allConfigs,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const nextPresets = [...presetsCopy, newPreset];
      localStorage.setItem("ow-presets", JSON.stringify(nextPresets));
      return { presets: nextPresets, currentPreset: newPreset };
    });
  },

  loadPreset: (presetId) => {
    const state = get();
    const preset = state.presets.find((p) => p.id === presetId);
    if (!preset || preset.configurations.length === 0) return;

    const mk = (mid?: string | null, sid?: string | null) =>
      `${mid || ""}::${sid || ""}`;
    // 写入整套配置到工作区
    const ws: Record<string, Map<string, HeroRating>> = {};
    preset.configurations.forEach((c) => {
      const key = mk(c.mapId, c.subMapId || null);
      ws[key] = new Map(
        c.heroRatings.map(
          ({ heroId, rating }) => [heroId, rating] as [string, HeroRating]
        )
      );
    });

    // 选择呈现的地图：优先当前选中且在配置内；否则首个
    let chosen = preset.configurations[0];
    if (state.selectedMap) {
      const curKey = mk(state.selectedMap.id, state.selectedSubMap?.id || null);
      if (ws[curKey]) {
        const found = preset.configurations.find(
          (c) => mk(c.mapId, c.subMapId || null) === curKey
        );
        if (found) chosen = found;
      }
    }

    const chosenRatings = new Map<string, HeroRating>(
      ws[mk(chosen.mapId, chosen.subMapId || null)]
    );

    import("@/data/maps").then(({ maps }) => {
      const map = maps.find((m) => m.id === chosen.mapId);
      if (!map) return;
      let subMap = null as any;
      if (chosen.subMapId && map.subMaps) {
        subMap = map.subMaps.find((sm) => sm.id === chosen.subMapId) || null;
      }
      set({
        currentPreset: preset,
        currentRatings: chosenRatings,
        selectedMap: map,
        selectedSubMap: subMap,
        mapWorkspace: ws,
      });
    });
  },

  renamePreset: (presetId: string, newName: string) => {
    set((state) => {
      const newPresets = state.presets.map((p) =>
        p.id === presetId ? { ...p, name: newName, updatedAt: new Date() } : p
      );
      localStorage.setItem("ow-presets", JSON.stringify(newPresets));
      const updatedCurrentPreset =
        state.currentPreset?.id === presetId && state.currentPreset
          ? { ...state.currentPreset, name: newName, updatedAt: new Date() }
          : state.currentPreset;
      return {
        presets: newPresets,
        currentPreset: updatedCurrentPreset,
      };
    });
  },

  deletePreset: (presetId) => {
    set((state) => {
      const newPresets = state.presets.filter((p) => p.id !== presetId);
      localStorage.setItem("ow-presets", JSON.stringify(newPresets));
      return {
        presets: newPresets,
        currentPreset:
          state.currentPreset?.id === presetId ? null : state.currentPreset,
      };
    });
  },

  exportPreset: (presetId) => {
    const preset = get().presets.find((p) => p.id === presetId);
    return preset ? JSON.stringify(preset, null, 2) : "";
  },

  importPreset: (data) => {
    try {
      const preset = JSON.parse(data) as Preset;
      preset.id = Date.now().toString(); // 生成新ID
      preset.updatedAt = new Date();

      set((state) => {
        const newPresets = [...state.presets, preset];
        localStorage.setItem("ow-presets", JSON.stringify(newPresets));
        return { presets: newPresets };
      });
    } catch (error) {
      console.error("导入预设失败:", error);
    }
  },

  exportAsText: () => {
    const state = get();
    if (!state.selectedMap) return "";

    return import("@/data/heroes").then(({ heroes }) => {
      const lines: string[] = [];
      lines.push(
        `地图：${state.selectedMap!.name}${
          state.selectedSubMap ? " - " + state.selectedSubMap.name : ""
        }`
      );
      lines.push("");

      const recommended = heroes.filter(
        (h) => state.currentRatings.get(h.id) === HeroRating.GOOD
      );
      const alternative = heroes.filter(
        (h) => state.currentRatings.get(h.id) === HeroRating.AVERAGE
      );
      const notRecommended = heroes.filter(
        (h) => state.currentRatings.get(h.id) === HeroRating.BAD
      );

      if (recommended.length > 0) {
        lines.push(`✅ 推荐：${recommended.map((h) => h.name).join(", ")}`);
      }
      if (alternative.length > 0) {
        lines.push(`⚡ 备选：${alternative.map((h) => h.name).join(", ")}`);
      }
      if (notRecommended.length > 0) {
        lines.push(
          `❌ 不推荐：${notRecommended.map((h) => h.name).join(", ")}`
        );
      }

      return lines.join("\n");
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
      historyIndex: newIndex,
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
      historyIndex: newIndex,
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
    if (!state.selectedMap) return "";

    const data = {
      m: state.selectedMap.id,
      s: state.selectedSubMap?.id || null,
      r: Array.from(state.currentRatings.entries()).map(([heroId, rating]) => [
        heroId,
        rating,
      ]),
    };

    try {
      const json = JSON.stringify(data);
      const base64 = btoa(encodeURIComponent(json));
      return base64;
    } catch (error) {
      console.error("生成分享代码失败:", error);
      return "";
    }
  },

  // 从分享代码加载（带Zod验证）
  loadFromShareCode: (code: string) => {
    try {
      const json = decodeURIComponent(atob(code));
      const data = JSON.parse(json);

      // Zod运行时验证
      import("@/utils/validation").then(({ validateShareCode }) => {
        const validated = validateShareCode(data);
        if (!validated) {
          console.error("分享码验证失败");
          return false;
        }

        // 导入地图数据
        import("@/data/maps").then(({ maps }) => {
          const map = maps.find((m) => m.id === validated.m);
          if (!map) {
            console.error("未找到地图");
            return false;
          }

          let subMap = null;
          if (validated.s && map.subMaps) {
            subMap = map.subMaps.find((sm) => sm.id === validated.s) || null;
          }

          const ratings = new Map<string, HeroRating>(validated.r);

          set({
            selectedMap: map,
            selectedSubMap: subMap,
            currentRatings: ratings,
            history: [],
            historyIndex: -1,
          });
        });
      });

      return true;
    } catch (error) {
      console.error("加载分享代码失败:", error);
      return false;
    }
  },

  // 实战面板操作
  setEnemyHero: (slotIndex, heroId) => {
    set((state) => {
      const newTeam = [...state.battleState.enemyTeam];
      if (slotIndex >= 0 && slotIndex < 5) {
        newTeam[slotIndex] = heroId;
      }
      return { battleState: { ...state.battleState, enemyTeam: newTeam } };
    });
  },

  setMyHero: (slotIndex, heroId) => {
    set((state) => {
      const newTeam = [...state.battleState.myTeam];
      if (slotIndex >= 0 && slotIndex < 5) {
        newTeam[slotIndex] = heroId;
      }
      return { battleState: { ...state.battleState, myTeam: newTeam } };
    });
  },

  setEnemyTeam: (heroIds) => {
    set((state) => {
      const newTeam: (string | null)[] = [null, null, null, null, null];
      heroIds.slice(0, 5).forEach((id, i) => {
        newTeam[i] = id;
      });
      return { battleState: { ...state.battleState, enemyTeam: newTeam } };
    });
  },

  setMyTeam: (heroIds) => {
    set((state) => {
      const newTeam: (string | null)[] = [null, null, null, null, null];
      heroIds.slice(0, 5).forEach((id, i) => {
        newTeam[i] = id;
      });
      return { battleState: { ...state.battleState, myTeam: newTeam } };
    });
  },

  clearEnemyTeam: () => {
    set((state) => ({
      battleState: {
        ...state.battleState,
        enemyTeam: [null, null, null, null, null],
      },
    }));
  },

  clearMyTeam: () => {
    set((state) => ({
      battleState: {
        ...state.battleState,
        myTeam: [null, null, null, null, null],
      },
    }));
  },

  clearBattle: () => {
    set({
      battleState: {
        enemyTeam: [null, null, null, null, null],
        myTeam: [null, null, null, null, null],
      },
    });
  },
}));
