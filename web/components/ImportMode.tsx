"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  Image as ImageIcon,
  Clipboard,
  Type,
  X,
  CheckCircle,
  PlugZap,
  Unplug,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import {
  recognizeHeroesFromText,
  recognizeHeroesFromImage,
  recognizeHeroesFromImageDetailed,
  ScreenType,
  recognizeMapFromText,
} from "@/utils/heroRecognition";
import { soundManager } from "@/utils/soundManager";
import { Hero, heroes as ALL_HEROES, HeroRating } from "@/data/heroes";
import { cn } from "@/lib/utils";

const AUTO_FROM_IMAGE = false;

// 识别结果确认弹窗数据
interface RecognitionResult {
  heroes: Hero[];
  mapId?: string;
  subMapId?: string;
  screenType: ScreenType;
}

export default function ImportMode() {
  const {
    importHeroes,
    clearImportedHeroes,
    importedHeroes,
    selectMap,
    presets,
    currentPreset,
    loadPreset,
    setMultipleHeroRatings,
    setEnemyTeam,
    battleState,
  } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [pasteHint, setPasteHint] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 本地截图助手（方案C）
  const [watcherUrl, setWatcherUrl] = useState("http://localhost:8766/stream");
  const [watcherDir, setWatcherDir] = useState<string>("");
  const [watcherConnected, setWatcherConnected] = useState(false);
  const lastEventTsRef = useRef<number>(0);
  const esRef = useRef<EventSource | null>(null);
  // 阶段1：界面类型与OCR摘要
  const [screenType, setScreenType] = useState<ScreenType>("unknown");
  const [manualScreenType, setManualScreenType] = useState<ScreenType | "auto">(
    "auto"
  );
  const [lastOcrText, setLastOcrText] = useState<string>("");

  // 识别结果确认弹窗
  const [pendingResult, setPendingResult] = useState<RecognitionResult | null>(
    null
  );
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // 全局Ctrl+V粘贴图片监听
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          e.preventDefault();
          const blob = items[i].getAsFile();
          if (blob) {
            setPasteHint(true);
            soundManager.play("pop");
            await handleFileUpload(blob);
            setTimeout(() => setPasteHint(false), 2000);
          }
          break;
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleTextRecognition = () => {
    if (!textInput.trim()) return;

    const recognizedHeroes = recognizeHeroesFromText(textInput);
    importHeroes(recognizedHeroes);
    setTextInput("");
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const detailed = await recognizeHeroesFromImageDetailed(file);
      setScreenType(detailed.screenType);
      setLastOcrText(detailed.text || "");

      // 如果识别到英雄，显示确认弹窗
      if (
        detailed.heroes &&
        detailed.heroes.length > 0 &&
        detailed.heroes.length <= 10
      ) {
        setPendingResult({
          heroes: detailed.heroes,
          mapId: detailed.mapId,
          subMapId: detailed.subMapId,
          screenType: detailed.screenType,
        });
        setShowConfirmDialog(true);
        setIsProcessing(false);
        return;
      }

      if (AUTO_FROM_IMAGE) {
        clearImportedHeroes();
        importHeroes(detailed.heroes);
      }
      // 将识别到的英雄直接标记为“推荐( GOOD )”，便于立即展示在上方“推荐”区
      // 仅在识别数量不多(≤10)时自动打标；否则只作为“已导入的英雄”供你手动分配
      if (AUTO_FROM_IMAGE) {
        if (
          detailed.heroes &&
          detailed.heroes.length > 0 &&
          detailed.heroes.length <= 10
        ) {
          setMultipleHeroRatings(
            detailed.heroes.map((h) => ({
              heroId: h.id,
              rating: HeroRating.GOOD,
            }))
          );
        }
      }

      if (AUTO_FROM_IMAGE) {
        // 自动切换到识别出的地图/子图（若AI未给出mapId，则用文本回退识别）
        const fallbackMap = !detailed.mapId
          ? recognizeMapFromText(detailed.text || "")
          : null;
        const mapIdToUse = detailed.mapId || fallbackMap?.mapId;
        const subIdToUse = detailed.subMapId || fallbackMap?.subMapId;
        if (mapIdToUse) {
          try {
            const { maps } = await import("@/data/maps");
            const map = maps.find((m) => m.id === mapIdToUse) || null;
            let subMap = null as any;
            if (map && subIdToUse && map.subMaps) {
              subMap = map.subMaps.find((sm) => sm.id === subIdToUse) || null;
            }
            if (map) {
              // 先切换地图
              selectMap(map, subMap);
              // 如果还没有加载任何预设，自动加载最近更新的一个，并按当前地图匹配
              if (!currentPreset && presets.length > 0) {
                const latest = [...presets].sort(
                  (a, b) =>
                    new Date(b.updatedAt as any).getTime() -
                    new Date(a.updatedAt as any).getTime()
                )[0];
                if (latest) {
                  loadPreset(latest.id);
                }
              }
              // 再次断言选择地图，避免预设加载导致地图回滚
              setTimeout(() => {
                try {
                  selectMap(map, subMap);
                } catch {}
              }, 80);
              // 回退：若未识别出任何英雄，则根据当前地图的“不错哦(GOOD)”填充导入列表
              if (!detailed.heroes || detailed.heroes.length === 0) {
                setTimeout(() => {
                  try {
                    const ratings = useStore.getState().currentRatings;
                    const goodIds: string[] = [];
                    ratings.forEach((r, hid) => {
                      if (r === HeroRating.GOOD) goodIds.push(hid);
                    });
                    if (goodIds.length > 0) {
                      const heroesObjs: Hero[] = ALL_HEROES.filter((h) =>
                        goodIds.includes(h.id)
                      );
                      clearImportedHeroes();
                      importHeroes(heroesObjs);
                    }
                  } catch (e) {
                    console.warn("回退填充失败", e);
                  }
                }, 120);
              }
            }
          } catch (e) {
            console.error("地图切换失败:", e);
          }
        }
      }
      if (AUTO_FROM_IMAGE) {
        // 最终写回：防止 selectMap/loadPreset 重置当前评级，将识别英雄再次标记为“推荐”
        // 同样只在识别数量≤10时自动打标
        if (
          detailed.heroes &&
          detailed.heroes.length > 0 &&
          detailed.heroes.length <= 10
        ) {
          setTimeout(() => {
            try {
              setMultipleHeroRatings(
                detailed.heroes.map((h) => ({
                  heroId: h.id,
                  rating: HeroRating.GOOD,
                }))
              );
            } catch {}
          }, 120);
        }
      }
    } catch (error) {
      console.error("图片识别失败:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // 连接本地截图助手（SSE）
  const connectWatcher = () => {
    if (watcherConnected || esRef.current) return;
    try {
      const es = new EventSource(watcherUrl);
      esRef.current = es;
      es.addEventListener("open", () => {
        setWatcherConnected(true);
      });
      es.addEventListener("ready", (ev: MessageEvent) => {
        try {
          const data = JSON.parse((ev as any).data || "{}");
          if (data.dir) setWatcherDir(data.dir);
        } catch {}
      });
      es.addEventListener("screenshot", async (ev: MessageEvent) => {
        const now = Date.now();
        if (now - (lastEventTsRef.current || 0) < 1000) return; // 简单节流：1秒
        lastEventTsRef.current = now;
        try {
          const payload = JSON.parse((ev as any).data || "{}");
          const { data, mime, name } = payload || {};
          if (!data || !mime) return;
          const bin = atob(data);
          const len = bin.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
          const blob = new Blob([bytes], { type: mime });
          const file = new File([blob], name || `screenshot_${now}.png`, {
            type: mime,
          });
          soundManager.play("pop");
          await handleFileUpload(file);
        } catch (err) {
          console.error("SSE payload 处理失败:", err);
        }
      });
      es.addEventListener("error", () => {
        // 断线时标记为未连接
        setWatcherConnected(false);
      });
    } catch (e) {
      console.error("连接本地截图助手失败:", e);
    }
  };

  const disconnectWatcher = () => {
    try {
      esRef.current?.close();
    } catch {}
    esRef.current = null;
    setWatcherConnected(false);
  };

  const removeHero = (heroId: string) => {
    const newHeroes = importedHeroes.filter((h) => h.id !== heroId);
    importHeroes(newHeroes);
  };

  // 确认将识别结果填入敌方槽位
  const handleConfirmAsEnemy = () => {
    if (!pendingResult) return;
    const heroIds = pendingResult.heroes.slice(0, 5).map((h) => h.id);
    setEnemyTeam(heroIds);
    soundManager.play("success");
    setShowConfirmDialog(false);
    setPendingResult(null);
  };

  // 确认将识别结果标记为推荐
  const handleConfirmAsRecommend = () => {
    if (!pendingResult) return;
    setMultipleHeroRatings(
      pendingResult.heroes.map((h) => ({
        heroId: h.id,
        rating: HeroRating.GOOD,
      }))
    );
    soundManager.play("success");
    setShowConfirmDialog(false);
    setPendingResult(null);
  };

  // 取消确认
  const handleCancelConfirm = () => {
    setShowConfirmDialog(false);
    setPendingResult(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* 识别结果确认弹窗 */}
      {showConfirmDialog && pendingResult && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              识别到 {pendingResult.heroes.length} 个英雄
            </h3>

            {/* 英雄列表预览 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {pendingResult.heroes.slice(0, 5).map((hero) => (
                <div
                  key={hero.id}
                  className="flex items-center gap-2 px-2 py-1 bg-slate-700 rounded"
                >
                  <img
                    src={hero.avatar || "/placeholder.png"}
                    alt={hero.name}
                    className="w-6 h-6 rounded"
                  />
                  <span className="text-sm text-white">{hero.name}</span>
                </div>
              ))}
              {pendingResult.heroes.length > 5 && (
                <span className="text-sm text-gray-400 self-center">
                  +{pendingResult.heroes.length - 5} 更多
                </span>
              )}
            </div>

            <p className="text-sm text-gray-400 mb-4">
              请选择如何处理这些英雄：
            </p>

            <div className="space-y-2">
              <button
                onClick={handleConfirmAsEnemy}
                className="w-full px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">🔴</span>
                填入敌方阵容
                <span className="text-xs text-red-200">（触发动态推荐）</span>
              </button>

              <button
                onClick={handleConfirmAsRecommend}
                className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-lg">⭐</span>
                标记为推荐英雄
              </button>

              <button
                onClick={handleCancelConfirm}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg font-medium transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 导入方式选择 */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* 图片上传 */}
        <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              图片识别
            </h3>
            {pasteHint && (
              <span className="text-sm text-green-400 animate-pulse flex items-center gap-1">
                <Clipboard className="w-4 h-4" />
                已粘贴图片！
              </span>
            )}
          </div>

          {/* 阶段1：识别摘要与界面类型（信息展示/手动兜底） */}
          <div className="mt-4 border border-slate-700 rounded-lg p-3 bg-slate-900/40">
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="text-slate-300">界面类型</span>
              <select
                value={manualScreenType}
                onChange={(e) => setManualScreenType(e.target.value as any)}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs"
              >
                <option value="auto">自动（{screenType}）</option>
                <option value="select">select（选人）</option>
                <option value="ban">ban（禁用）</option>
                <option value="vs">vs（对阵）</option>
                <option value="lobby">lobby（大厅）</option>
                <option value="unknown">unknown</option>
              </select>
              <span className="text-xs text-slate-500">
                判别仅作提示，导入逻辑保持不变
              </span>
            </div>
            {lastOcrText && (
              <div className="text-xs text-slate-400 whitespace-pre-wrap break-words max-h-24 overflow-auto">
                {lastOcrText.slice(0, 300)}
                {lastOcrText.length > 300 ? "…" : ""}
              </div>
            )}
          </div>

          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragActive
                ? "border-blue-500 bg-blue-500/10"
                : "border-slate-600",
              isProcessing && "opacity-50 pointer-events-none"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
            <p className="text-slate-300 mb-2">
              拖拽图片到这里或
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-400 hover:text-blue-300 mx-1"
              >
                点击上传
              </button>
            </p>
            <p className="text-sm text-slate-500 mb-1">
              支持包含英雄头像的截图
            </p>
            <p className="text-xs text-orange-400 flex items-center justify-center gap-1">
              <Clipboard className="w-3 h-3" />
              快捷方式：Ctrl+V 粘贴剪贴板图片
            </p>

            {isProcessing && (
              <p className="mt-4 text-blue-400">正在识别中...</p>
            )}
          </div>

          {/* 本地截图助手（方案C） */}
          <div className="mt-4 border border-slate-700 rounded-lg p-3 bg-slate-900/40">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <PlugZap className="w-4 h-4" />
                本地截图助手（SSE）
              </div>
              <div className="flex items-center gap-2">
                {!watcherConnected ? (
                  <button
                    onClick={connectWatcher}
                    className="px-3 py-1.5 text-xs rounded bg-green-600 hover:bg-green-500 text-white"
                  >
                    连接
                  </button>
                ) : (
                  <button
                    onClick={disconnectWatcher}
                    className="px-3 py-1.5 text-xs rounded bg-slate-600 hover:bg-slate-500 text-white flex items-center gap-1"
                  >
                    <Unplug className="w-3.5 h-3.5" />
                    断开
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 whitespace-nowrap">
                  SSE地址
                </label>
                <input
                  value={watcherUrl}
                  onChange={(e) => setWatcherUrl(e.target.value)}
                  placeholder="http://localhost:8766/stream"
                  className="flex-1 px-2 py-1 text-xs bg-slate-900 border border-slate-700 rounded text-slate-200"
                />
              </div>
              {watcherDir && (
                <div className="text-xs text-slate-400">
                  监听目录：<span className="text-slate-300">{watcherDir}</span>
                </div>
              )}
              <div className="text-xs">
                <span
                  className={
                    watcherConnected ? "text-green-400" : "text-slate-400"
                  }
                >
                  状态：
                  {watcherConnected ? "已连接，新增截图将自动识别" : "未连接"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 文本输入 */}
        <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Type className="w-5 h-5" />
            文本识别
          </h3>

          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="输入包含英雄名称的文本，例如：源氏、半藏、天使、D.Va..."
            className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={handleTextRecognition}
            disabled={!textInput.trim()}
            className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-medium transition-colors"
          >
            识别英雄
          </button>
        </div>
      </div>

      {/* 已导入的英雄列表 */}
      {importedHeroes.length > 0 && (
        <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              已导入的英雄 ({importedHeroes.length})
            </h3>
            <button
              onClick={clearImportedHeroes}
              className="text-sm text-red-400 hover:text-red-300"
            >
              清空全部
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {importedHeroes.map((hero: Hero) => (
              <div
                key={hero.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 rounded-lg"
              >
                <span className="text-sm">{hero.name}</span>
                <button
                  onClick={() => removeHero(hero.id)}
                  className="text-slate-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
