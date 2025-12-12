export type NormalizedRect = { x: number; y: number; w: number; h: number };

export const screenRois = {
  // 1920x1080, UI缩放100%，按比例（0~1）定义
  select: {
    // 我方5个槽位（中部横排），覆盖头像+名字区域，适度更高一点
    teamSlots: Array.from({ length: 5 }).map((_, i) => {
      const startX = 0.2; // 左起
      const endX = 0.8; // 右止
      const bandW = endX - startX;
      const slotW = bandW / 5;
      const x = startX + i * slotW + slotW * 0.08; // 两侧留白
      const w = slotW * 0.84;
      const y = 0.36; // 中部
      const h = 0.22; // 覆盖头像与下方文字
      return { x, y, w, h } as NormalizedRect;
    }),
  },
  vs: {
    // 左右各5个条目
    left: Array.from({ length: 5 }).map((_, i) => {
      const x = 0.06;
      const w = 0.36;
      const y = 0.18 + i * 0.14;
      const h = 0.12;
      return { x, y, w, h } as NormalizedRect;
    }),
    right: Array.from({ length: 5 }).map((_, i) => {
      const x = 0.58;
      const w = 0.36;
      const y = 0.18 + i * 0.14;
      const h = 0.12;
      return { x, y, w, h } as NormalizedRect;
    }),
  },
  ban: {
    grid: { x: 0.13, y: 0.24, w: 0.74, h: 0.58 } as NormalizedRect,
  },
} as const;

export type ScreenRoiConfig = typeof screenRois;
