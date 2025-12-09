/** @type {import('next').NextConfig} */
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

module.exports = nextConfig
