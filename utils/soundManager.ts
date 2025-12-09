// 音效管理器
class SoundManager {
  private enabled: boolean = true;
  private sounds: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    // 检查localStorage中的音效设置
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ow-sound-enabled');
      this.enabled = saved !== 'false';
    }
  }

  // 创建音频URL（使用Web Audio API生成简单音效）
  private createBeep(frequency: number, duration: number, type: OscillatorType = 'sine'): string {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    return ''; // 占位，实际使用createOscillator直接播放
  }

  // 播放音效
  play(soundType: 'click' | 'success' | 'error' | 'whoosh' | 'pop') {
    if (!this.enabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (soundType) {
        case 'click':
          // 轻点击音 - 短促高频
          oscillator.frequency.value = 800;
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.05);
          break;

        case 'success':
          // 成功音 - 上升音调
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.1);
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.15);
          break;

        case 'error':
          // 错误音 - 下降低沉
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.linearRampToValueAtTime(150, audioContext.currentTime + 0.15);
          oscillator.type = 'sawtooth';
          gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
          break;

        case 'whoosh':
          // 滑动音 - 扫频
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
          oscillator.type = 'sawtooth';
          gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.12);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.12);
          break;

        case 'pop':
          // 弹出音 - 短促低频
          oscillator.frequency.value = 200;
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.08);
          break;
      }
    } catch (error) {
      console.error('音效播放失败:', error);
    }
  }

  // 切换音效开关
  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ow-sound-enabled', String(this.enabled));
    }
    return this.enabled;
  }

  // 获取当前状态
  isEnabled() {
    return this.enabled;
  }

  // 设置音效状态
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ow-sound-enabled', String(enabled));
    }
  }
}

// 导出单例
export const soundManager = new SoundManager();
