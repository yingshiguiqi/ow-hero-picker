'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '@/utils/soundManager';

export default function SoundToggle() {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    setIsEnabled(soundManager.isEnabled());
  }, []);

  const handleToggle = () => {
    const newState = soundManager.toggle();
    setIsEnabled(newState);
    
    // 播放测试音效
    if (newState) {
      soundManager.play('success');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-20 right-6 p-3 bg-slate-800/90 hover:bg-orange-500/20 border-2 border-slate-600 hover:border-orange-500/50 rounded-lg shadow-2xl transition-all duration-300 hover:scale-110 z-30 group"
      title={isEnabled ? '关闭音效' : '开启音效'}
    >
      {isEnabled ? (
        <Volume2 className="w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors" />
      ) : (
        <VolumeX className="w-5 h-5 text-slate-500 group-hover:text-slate-400 transition-colors" />
      )}
    </button>
  );
}
