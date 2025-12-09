'use client';

import React, { useState, useEffect } from 'react';
import { Save, FolderOpen, Trash2, Download, Upload, Image, Edit2, Copy, Check, Share2, Code } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { downloadFile } from '@/utils/heroRecognition';
import { exportToImage } from '@/utils/exportToImage';
import { heroes } from '@/data/heroes';
import { HeroRating } from '@/data/heroes';
import { cn } from '@/lib/utils';
import { soundManager } from '@/utils/soundManager';

export default function PresetManager() {
  const { 
    presets, 
    currentPreset, 
    savePreset, 
    loadPreset, 
    renamePreset,
    deletePreset, 
    exportPreset,
    importPreset,
    exportAsText,
    generateShareCode,
    loadFromShareCode,
    selectedMap,
    selectedSubMap,
    currentRatings
  } = useStore();
  
  const [presetName, setPresetName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [copied, setCopied] = useState(false);
  const [shareCode, setShareCode] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [loadCode, setLoadCode] = useState('');

  // 从localStorage加载预设
  useEffect(() => {
    const savedPresets = localStorage.getItem('ow-presets');
    if (savedPresets) {
      try {
        const parsedPresets = JSON.parse(savedPresets);
        useStore.setState({ presets: parsedPresets });
      } catch (error) {
        console.error('加载预设失败:', error);
      }
    }
  }, []);

  const handleSave = () => {
    if (presetName.trim()) {
      savePreset(presetName);
      setPresetName('');
      setShowSaveDialog(false);
      soundManager.play('success');
    }
  };

  const handleExport = (presetId: string) => {
    const data = exportPreset(presetId);
    const preset = presets.find(p => p.id === presetId);
    if (data && preset) {
      downloadFile(data, `${preset.name}-preset.json`);
    }
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        importPreset(content);
      }
    };
    reader.readAsText(file);
  };

  const handleExportImage = () => {
    exportToImage('hero-grid-export', `overwatch-heroes-${Date.now()}.png`);
  };

  const handleCopyText = async () => {
    const result = exportAsText();
    if (result) {
      const text = await result;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      soundManager.play('success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRename = (presetId: string, currentName: string) => {
    setEditingId(presetId);
    setEditingName(currentName);
  };

  const handleSaveRename = (presetId: string) => {
    if (editingName.trim()) {
      renamePreset(presetId, editingName.trim());
    }
    setEditingId(null);
    setEditingName('');
  };

  const handleCancelRename = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleGenerateShareCode = () => {
    const code = generateShareCode();
    setShareCode(code);
    setShowShareDialog(true);
    soundManager.play('pop');
  };

  const handleCopyShareCode = async () => {
    await navigator.clipboard.writeText(shareCode);
    setCopied(true);
    soundManager.play('success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadShareCode = () => {
    if (loadCode.trim()) {
      const success = loadFromShareCode(loadCode.trim());
      if (success) {
        setShowLoadDialog(false);
        setLoadCode('');
        soundManager.play('success');
      } else {
        soundManager.play('error');
      }
    }
  };

  const isConfigEmpty = currentRatings.size === 0;

  return (
    <div className="bg-slate-800/50 rounded-xl p-5 backdrop-blur-sm">
      <h2 className="text-base font-bold mb-3 text-slate-300 uppercase tracking-wide">预设管理</h2>
      
      {/* 操作按钮 - 增强幽灵按钮 */}
      <div className="flex flex-col gap-2 mb-4">
        <button
          onClick={() => setShowSaveDialog(true)}
          disabled={!selectedMap || isConfigEmpty}
          className={cn(
            "px-3 py-2.5 rounded border transition-all flex items-center gap-2 text-sm font-medium",
            !selectedMap || isConfigEmpty
              ? "border-slate-700 bg-slate-800/30 text-slate-600 cursor-not-allowed"
              : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-orange-500/70 hover:text-orange-400 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/5"
          )}
        >
          <Save className="w-4 h-4" />
          保存
        </button>
        
        <label className={cn(
          "px-3 py-2.5 rounded border transition-all flex items-center gap-2 text-sm font-medium cursor-pointer",
          "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-orange-500/70 hover:text-orange-400 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/5"
        )}>
          <Upload className="w-4 h-4" />
          导入
          <input
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImportFile}
          />
        </label>
        
        <button
          onClick={handleExportImage}
          disabled={!selectedMap || isConfigEmpty}
          className={cn(
            "px-3 py-2.5 rounded border transition-all flex items-center gap-2 text-sm font-medium",
            !selectedMap || isConfigEmpty
              ? "border-slate-700 bg-slate-800/30 text-slate-600 cursor-not-allowed"
              : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-orange-500/70 hover:text-orange-400 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/5"
          )}
        >
          <Image className="w-4 h-4" />
          导出图片
        </button>
        
        <button
          onClick={handleCopyText}
          disabled={!selectedMap || isConfigEmpty}
          className={cn(
            "px-3 py-2.5 rounded border transition-all flex items-center gap-2 text-sm font-medium relative overflow-hidden",
            !selectedMap || isConfigEmpty
              ? "border-slate-700 bg-slate-800/30 text-slate-600 cursor-not-allowed"
              : copied
              ? "border-green-500/50 bg-green-500/10 text-green-400"
              : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-orange-500/70 hover:text-orange-400 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/5"
          )}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? '已复制' : '复制文本'}
        </button>
        
        <button
          onClick={handleGenerateShareCode}
          disabled={!selectedMap || isConfigEmpty}
          className={cn(
            "px-3 py-2.5 rounded border transition-all flex items-center gap-2 text-sm font-medium",
            !selectedMap || isConfigEmpty
              ? "border-slate-700 bg-slate-800/30 text-slate-600 cursor-not-allowed"
              : "border-slate-600 bg-slate-800/50 text-slate-300 hover:border-orange-500/70 hover:text-orange-400 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/5"
          )}
        >
          <Share2 className="w-4 h-4" />
          生成分享码
        </button>
        
        <button
          onClick={() => setShowLoadDialog(true)}
          className="px-3 py-2.5 rounded border transition-all flex items-center gap-2 text-sm font-medium border-slate-600 bg-slate-800/50 text-slate-300 hover:border-orange-500/70 hover:text-orange-400 hover:bg-orange-500/10 hover:shadow-lg hover:shadow-orange-500/5"
        >
          <Code className="w-4 h-4" />
          加载分享码
        </button>
      </div>

      {/* 保存对话框 */}
      {showSaveDialog && (
        <div className="mb-4 p-4 bg-slate-900/50 rounded-lg">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="输入预设名称"
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSave}
              disabled={!presetName.trim()}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-700 text-white rounded font-medium transition-colors"
            >
              确认保存
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setPresetName('');
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 分享码对话框 */}
      {showShareDialog && (
        <div className="mb-4 p-4 bg-slate-900/50 rounded-lg border border-orange-500/30 animate-scale-in">
          <h3 className="text-sm font-bold text-orange-400 mb-2">分享码</h3>
          <p className="text-xs text-slate-400 mb-3">复制此代码分享给队友</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareCode}
              readOnly
              className="flex-1 px-3 py-2 bg-slate-800/70 border border-slate-600 rounded text-sm text-white font-mono"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              onClick={handleCopyShareCode}
              className={cn(
                "px-4 py-2 rounded font-medium transition-all flex items-center gap-2 text-sm",
                copied
                  ? "bg-green-500/10 border border-green-500/50 text-green-400"
                  : "bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/50 text-orange-400"
              )}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '已复制' : '复制'}
            </button>
          </div>
          <button
            onClick={() => setShowShareDialog(false)}
            className="mt-3 w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition-colors text-sm"
          >
            关闭
          </button>
        </div>
      )}

      {/* 加载分享码对话框 */}
      {showLoadDialog && (
        <div className="mb-4 p-4 bg-slate-900/50 rounded-lg border border-blue-500/30 animate-scale-in">
          <h3 className="text-sm font-bold text-blue-400 mb-2">加载分享码</h3>
          <p className="text-xs text-slate-400 mb-3">粘贴队友分享的代码</p>
          <input
            type="text"
            value={loadCode}
            onChange={(e) => setLoadCode(e.target.value)}
            placeholder="粘贴分享码"
            className="w-full px-3 py-2 mb-3 bg-slate-800/70 border border-slate-600 rounded text-sm text-white font-mono"
          />
          <div className="flex gap-2">
            <button
              onClick={handleLoadShareCode}
              disabled={!loadCode.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded font-medium transition-colors text-sm"
            >
              加载
            </button>
            <button
              onClick={() => {
                setShowLoadDialog(false);
                setLoadCode('');
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition-colors text-sm"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {/* 预设列表 */}
      <div className="space-y-3 mt-6">
        {presets.length === 0 ? (
          <p className="text-slate-500 text-center py-8 text-sm">暂无保存的预设</p>
        ) : (
          presets.map(preset => (
            <div
              key={preset.id}
              className={cn(
                "group flex items-center justify-between p-3.5 rounded-lg transition-all border",
                currentPreset?.id === preset.id
                  ? "bg-orange-500/10 border-orange-500/40 shadow-lg shadow-orange-500/5"
                  : "bg-slate-700/30 border-slate-600/40 hover:bg-slate-700/50 hover:border-slate-500/50"
              )}
            >
              <div className="flex-1 min-w-0 pr-3">
                {editingId === preset.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveRename(preset.id);
                      if (e.key === 'Escape') handleCancelRename();
                    }}
                    onBlur={() => handleSaveRename(preset.id)}
                    autoFocus
                    className="w-full px-2 py-1 bg-slate-900/70 border border-orange-500/50 rounded text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                ) : (
                  <h3 
                    className="font-medium text-sm truncate cursor-text hover:text-orange-400 transition-colors"
                    onDoubleClick={() => handleRename(preset.id, preset.name)}
                  >
                    {preset.name}
                  </h3>
                )}
                <p className="text-xs text-slate-400 mt-0.5">
                  {new Date(preset.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              {/* 操作图标 - hover显示 */}
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => loadPreset(preset.id)}
                  className="p-1.5 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 rounded transition-all"
                  title="加载"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRename(preset.id, preset.name)}
                  className="p-1.5 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 rounded transition-all"
                  title="重命名"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleExport(preset.id)}
                  className="p-1.5 hover:bg-orange-500/20 text-slate-400 hover:text-orange-400 rounded transition-all"
                  title="导出"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deletePreset(preset.id)}
                  className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded transition-all"
                  title="删除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
