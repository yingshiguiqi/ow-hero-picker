# 🚀 部署指南 - 免费云托管

## 🌟 方案一：Vercel（推荐）

### 优势
- ✅ **零成本**：个人项目完全免费
- ✅ **零配置**：自动识别Next.js
- ✅ **零运维**：自动构建+部署
- ✅ **全球加速**：CDN遍布全球
- ✅ **自动HTTPS**：免费SSL证书
- ✅ **预览环境**：每个PR都有独立预览

### 快速开始

#### 1. 推送代码到GitHub

```bash
# 初始化Git（如果还没有）
git init
git add .
git commit -m "v3.0.0 - 完整版守望先锋英雄推荐系统"

# 创建GitHub仓库后关联
git remote add origin https://github.com/你的用户名/ow-hero-picker.git
git branch -M main
git push -u origin main
```

#### 2. 连接Vercel

1. 访问 https://vercel.com
2. 点击 **Sign Up** → **Continue with GitHub**
3. 点击 **New Project**
4. 选择你的 `ow-hero-picker` 仓库
5. 点击 **Deploy**（无需修改任何配置）

#### 3. 等待部署（约2分钟）

```
Building...  ████████████ 100%
✓ Build completed
✓ Deployment ready
🎉 https://ow-hero-picker.vercel.app
```

#### 4. 自动更新

以后每次推送代码：
```bash
git add .
git commit -m "更新功能"
git push
```
Vercel会自动重新部署！

---

## 🌐 方案二：Netlify

### 优势
- ✅ 100GB流量/月（免费）
- ✅ 支持表单和Serverless函数
- ✅ 持续集成

### 部署步骤

#### 方式A：通过Web界面

1. 访问 https://netlify.com
2. 点击 **New site from Git**
3. 连接GitHub仓库
4. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`
5. 点击 **Deploy site**

#### 方式B：通过CLI

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化
netlify init

# 部署
netlify deploy --prod
```

---

## ☁️ 方案三：Cloudflare Pages

### 优势
- ✅ **无限流量**（完全免费）
- ✅ 全球CDN（速度极快）
- ✅ DDoS防护

### 部署步骤

1. 访问 https://pages.cloudflare.com
2. 点击 **Create a project**
3. 连接GitHub仓库
4. 构建配置：
   ```
   Build command: npm run build
   Build output directory: .next
   Root directory: /
   ```
5. 点击 **Save and Deploy**

---

## 📦 方案四：Railway

### 优势
- ✅ $5免费额度/月
- ✅ 支持数据库
- ✅ 简单易用

### 部署步骤

1. 访问 https://railway.app
2. 点击 **New Project** → **Deploy from GitHub repo**
3. 选择仓库
4. 自动部署

---

## 🎯 域名配置（可选）

### 免费域名
- Vercel: `你的项目.vercel.app`
- Netlify: `你的项目.netlify.app`
- Cloudflare: `你的项目.pages.dev`

### 自定义域名
如果你有自己的域名：

#### Vercel
1. 项目设置 → **Domains**
2. 输入你的域名（如：`ow.yourdomain.com`）
3. 添加DNS记录：
   ```
   Type: CNAME
   Name: ow
   Value: cname.vercel-dns.com
   ```

#### Netlify
1. 项目设置 → **Domain management**
2. 添加自定义域名
3. 配置DNS：
   ```
   Type: CNAME
   Name: ow
   Value: 你的项目.netlify.app
   ```

---

## 🔧 环境变量（如果需要）

### Vercel
1. 项目设置 → **Environment Variables**
2. 添加变量：
   ```
   NEXT_PUBLIC_APP_NAME=守望先锋英雄推荐系统
   NEXT_PUBLIC_VERSION=3.0.0
   ```

### Netlify
```bash
# 通过CLI设置
netlify env:set NEXT_PUBLIC_APP_NAME "守望先锋英雄推荐系统"
```

---

## 📊 性能优化建议

### 1. 启用缓存
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['yourdomain.com'],
  },
  // 启用SWC压缩
  swcMinify: true,
}
```

### 2. 图片优化
所有英雄头像已经本地化，无需额外配置！

### 3. 启用Gzip
Vercel/Netlify默认启用，无需配置！

---

## 🐛 常见问题

### Q: 部署失败怎么办？
A: 检查构建日志：
1. Vercel: 项目 → Deployments → 点击失败的部署
2. 查看 Build Logs
3. 根据错误信息修复

### Q: 本地正常，线上白屏？
A: 可能原因：
1. 检查 `package.json` 的 `dependencies`（不要用`devDependencies`）
2. 检查环境变量
3. 查看浏览器控制台错误

### Q: 如何回滚版本？
A: Vercel/Netlify都支持：
1. Deployments页面
2. 找到之前的成功部署
3. 点击 **Promote to Production**

---

## 🎉 部署后的URL示例

- **Vercel**: https://ow-hero-picker.vercel.app
- **Netlify**: https://ow-hero-picker.netlify.app
- **Cloudflare**: https://ow-hero-picker.pages.dev

---

## 📈 免费额度对比

| 平台 | 流量 | 构建时间 | 带宽 | 域名 |
|------|------|----------|------|------|
| **Vercel** | 100GB/月 | 6000分钟/月 | 快 | ✅ |
| **Netlify** | 100GB/月 | 300分钟/月 | 快 | ✅ |
| **Cloudflare** | **无限** | 500次/月 | 极快 | ✅ |
| **Railway** | $5额度/月 | - | 中 | ✅ |

---

## 🏆 最终推荐

**个人项目 → Vercel**（零配置，体验最佳）  
**需要大流量 → Cloudflare Pages**（无限流量）  
**需要Serverless → Netlify**（支持函数）

**现在就开始部署吧！只需5分钟！** 🚀
