/** @type {import('next').NextConfig} */
const nextConfig = {
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
  }
};

module.exports = nextConfig;
