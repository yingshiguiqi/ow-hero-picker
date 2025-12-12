import { z } from 'zod';
import { HeroRating } from '@/data/heroes';
import { maps } from '@/data/maps';
import { heroes } from '@/data/heroes';

// 预设Schema
export const PresetSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '预设名称不能为空'),
  mapId: z.string(),
  subMapId: z.string().nullable(),
  ratings: z.array(z.tuple([z.string(), z.nativeEnum(HeroRating)])),
  createdAt: z.number()
});

export type ValidatedPreset = z.infer<typeof PresetSchema>;

// 分享码Schema
export const ShareCodeSchema = z.object({
  m: z.string(), // mapId
  s: z.string().nullable().optional(), // subMapId
  r: z.array(z.tuple([z.string(), z.nativeEnum(HeroRating)])) // ratings
});

export type ValidatedShareCode = z.infer<typeof ShareCodeSchema>;

// 验证并清洗预设数据
export function validatePreset(data: any): ValidatedPreset | null {
  try {
    const parsed = PresetSchema.parse(data);
    
    // 额外验证：确保地图ID存在
    const mapExists = maps.some(m => m.id === parsed.mapId);
    if (!mapExists) {
      console.warn(`预设中的地图ID "${parsed.mapId}" 不存在，跳过该预设`);
      return null;
    }
    
    // 清洗评级：移除不存在的英雄
    const validHeroIds = new Set(heroes.map(h => h.id));
    const cleanedRatings = parsed.ratings.filter(([heroId]) => {
      const valid = validHeroIds.has(heroId);
      if (!valid) {
        console.warn(`预设中的英雄ID "${heroId}" 不存在，已自动移除`);
      }
      return valid;
    });
    
    return {
      ...parsed,
      ratings: cleanedRatings
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('预设数据验证失败:', error.issues);
    }
    return null;
  }
}

// 验证并清洗分享码数据
export function validateShareCode(data: any): ValidatedShareCode | null {
  try {
    const parsed = ShareCodeSchema.parse(data);
    
    // 额外验证：确保地图ID存在
    const mapExists = maps.some(m => m.id === parsed.m);
    if (!mapExists) {
      console.error(`分享码中的地图ID "${parsed.m}" 不存在`);
      return null;
    }
    
    // 清洗评级：移除不存在的英雄
    const validHeroIds = new Set(heroes.map(h => h.id));
    const cleanedRatings = parsed.r.filter(([heroId]) => {
      const valid = validHeroIds.has(heroId);
      if (!valid) {
        console.warn(`分享码中的英雄ID "${heroId}" 不存在，已自动移除`);
      }
      return valid;
    });
    
    return {
      ...parsed,
      r: cleanedRatings
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('分享码数据验证失败:', error.issues);
    }
    return null;
  }
}

// 批量验证预设列表
export function validatePresets(presets: any[]): ValidatedPreset[] {
  if (!Array.isArray(presets)) {
    console.error('预设数据格式错误：不是数组');
    return [];
  }
  
  return presets
    .map(validatePreset)
    .filter((p): p is ValidatedPreset => p !== null);
}
