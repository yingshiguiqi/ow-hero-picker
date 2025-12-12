/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isElectron = process.env.ELECTRON === "true";
const repoName = "ow-hero-picker";

// Electron 和本地开发不需要 basePath
const basePath = isGithubActions ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_IS_ELECTRON: isElectron ? "true" : "false",
  },
  // Electron 需要 trailingSlash 来正确加载静态文件
  trailingSlash: true,
};

module.exports = nextConfig;
