'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Upload, Image as ImageIcon, Clipboard, Type, X, CheckCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { recognizeHeroesFromText, recognizeHeroesFromImage } from '@/utils/heroRecognition';
import { soundManager } from '@/utils/soundManager';
import { Hero } from '@/data/heroes';
import { cn } from '@/lib/utils';

export default function ImportMode() {
  const { importHeroes, clearImportedHeroes, importedHeroes } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [pasteHint, setPasteHint] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 全局Ctrl+V粘贴图片监听
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          const blob = items[i].getAsFile();
          if (blob) {
            setPasteHint(true);
            soundManager.play('pop');
            await handleFileUpload(blob);
            setTimeout(() => setPasteHint(false), 2000);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleTextRecognition = () => {
    if (!textInput.trim()) return;
    
    const recognizedHeroes = recognizeHeroesFromText(textInput);
    importHeroes(recognizedHeroes);
    setTextInput('');
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    setIsProcessing(true);
    try {
      const recognizedHeroes = await recognizeHeroesFromImage(file);
      importHeroes(recognizedHeroes);
    } catch (error) {
      console.error('图片识别失败:', error);
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

  const removeHero = (heroId: string) => {
    const newHeroes = importedHeroes.filter(h => h.id !== heroId);
    importHeroes(newHeroes);
  };

  return (
    <div className="w-full space-y-6">
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
          
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
              dragActive ? "border-blue-500 bg-blue-500/10" : "border-slate-600",
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
