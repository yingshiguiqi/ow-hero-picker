# 英雄头像集成说明

## 概述

本项目已成功集成所有41个守望先锋英雄的官方头像，头像图片托管在守望先锋官方CDN上。

## 技术实现

### 1. 数据结构

在 `data/heroes.ts` 中，每个英雄对象包含 `avatar` 字段：

```typescript
export interface Hero {
  id: string;
  name: string;
  nameEn: string;
  role: HeroRole;
  aliases?: string[];
  avatar?: string; // 头像URL
}
```

### 2. 图片来源

所有头像均来自守望先锋官方CDN：
- CDN域名：`d15f34w2p8l1cc.cloudfront.net`
- 格式：PNG
- 尺寸：高分辨率，适合各种显示场景

### 3. Next.js 配置

在 `next.config.js` 中配置了允许的图片域名：

```javascript
const nextConfig = {
  images: {
    domains: ['localhost', 'd15f34w2p8l1cc.cloudfront.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}
```

### 4. 组件实现

`HeroCard` 组件支持：
- 显示英雄头像
- 头像加载失败时降级显示首字母
- 圆形裁剪和边框样式
- 响应式设计

```tsx
{hero.avatar ? (
  <img 
    src={hero.avatar} 
    alt={hero.name}
    className="w-full h-full object-cover"
    onError={(e) => {
      // 降级处理
      e.currentTarget.style.display = 'none';
      e.currentTarget.parentElement!.innerHTML = 
        `<span class="text-2xl font-bold">${hero.name[0]}</span>`;
    }}
  />
) : (
  <span className="text-2xl font-bold">{hero.name[0]}</span>
)}
```

## 英雄列表

### 坦克 (12个)
- D.Va
- 奥丽莎
- 末日铁拳
- 毛加
- 拉玛刹
- 莱因哈特
- 路霸
- 西格玛
- 温斯顿
- 破坏球
- 查莉娅
- 渣客女王

### 输出 (18个)
- 艾什
- 堡垒
- 卡西迪
- 回声
- 源氏
- 半藏
- 狂鼠
- 美
- 法老之鹰
- 死神
- 士兵：76
- 黑影
- 秩序之光
- 托比昂
- 猎空
- 探奇
- 黑百合
- 索杰恩

### 支援 (11个)
- 安娜
- 巴蒂斯特
- 布里吉塔
- 朱诺
- 雾子
- 生命之梭
- 卢西奥
- 天使
- 莫伊拉
- 禅雅塔
- 伊拉锐

## 脚本工具

项目包含以下脚本工具（位于 `scripts/` 目录）：

### scrapeHeroImages.js
用于下载英雄头像到本地的Node.js脚本。

**使用方法：**
```bash
node scripts/scrapeHeroImages.js
```

**功能：**
- 从官方CDN下载所有英雄头像
- 保存到 `public/heroes/` 目录
- 自动重试和错误处理
- 显示下载进度

### updateHeroesWithAvatars.js
包含英雄ID到头像URL的映射关系。

## 性能优化建议

1. **使用Next.js Image组件** (可选)
   ```tsx
   import Image from 'next/image'
   
   <Image 
     src={hero.avatar} 
     alt={hero.name}
     width={64}
     height={64}
     className="rounded-full"
   />
   ```

2. **本地缓存** (未来计划)
   - 下载头像到 `public/heroes/` 目录
   - 使用本地路径而不是CDN链接
   - 减少外部依赖

3. **懒加载**
   - 当前浏览器默认支持图片懒加载
   - 可添加 `loading="lazy"` 属性进一步优化

## 故障排查

### 头像无法显示
1. 检查网络连接
2. 确认CDN域名可访问
3. 查看浏览器控制台错误信息
4. 验证 `next.config.js` 配置

### CORS错误
- 守望先锋CDN已配置CORS，通常不会出现此问题
- 如遇到问题，可考虑使用本地下载方案

## 未来计划

- [ ] 支持本地头像存储
- [ ] 添加头像预加载
- [ ] 支持不同尺寸的头像
- [ ] 添加头像更新检测机制
- [ ] 支持自定义头像上传

## 更新记录

**v1.1.0 (2024-12-09)**
- 初始集成所有41个英雄头像
- 实现降级显示机制
- 配置Next.js图片优化
