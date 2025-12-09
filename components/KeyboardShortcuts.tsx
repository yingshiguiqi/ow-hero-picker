'use client';

import { useState } from 'react';
import { Keyboard, X } from 'lucide-react';

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ['Ctrl', 'Z'], action: '撤销上一步操作' },
    { keys: ['Ctrl', 'Y'], action: '重做' },
    { keys: ['Ctrl', 'Shift', 'Z'], action: '重做（备选）' },
    { keys: ['Esc'], action: '关闭侧边栏（移动端）' },
    { keys: ['Enter'], action: '保存重命名' },
  ];

  return (
    <>
      {/* 快捷键按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 bg-slate-800/90 hover:bg-orange-500/20 border-2 border-slate-600 hover:border-orange-500/50 rounded-lg shadow-2xl transition-all duration-300 hover:scale-110 z-30 group"
        title="快捷键"
      >
        <Keyboard className="w-5 h-5 text-slate-300 group-hover:text-orange-400 transition-colors" />
      </button>

      {/* 快捷键面板 */}
      {isOpen && (
        <>
          {/* 遮罩 */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 面板 */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800/95 backdrop-blur-xl border-2 border-orange-500/30 rounded-xl shadow-2xl z-50 animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Keyboard className="w-6 h-6 text-orange-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wide">快捷键</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50"
                  >
                    <div className="flex gap-2">
                      {shortcut.keys.map((key, i) => (
                        <span key={i}>
                          <kbd className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded text-sm font-mono text-white shadow-md">
                            {key}
                          </kbd>
                          {i < shortcut.keys.length - 1 && (
                            <span className="mx-1 text-slate-500">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-slate-300">{shortcut.action}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-400 text-center">
                  Mac用户：Ctrl → Cmd
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
