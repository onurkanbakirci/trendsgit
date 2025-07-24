/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '**'
      }
    ]
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true
  },
  target: 'serverless'
};

module.exports = nextConfig;