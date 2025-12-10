/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 启用静态导出
  basePath: '/ow-hero-picker',  // GitHub Pages子路径
  assetPrefix: '/ow-hero-picker/',  // 静态资源前缀
  images: {
    domains: ['localhost', 'd15f34w2p8l1cc.cloudfront.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true  // 禁用图片优化（GitHub Pages不支持）
  },
}

module.exports = nextConfig
