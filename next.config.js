/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: '**'
      }
    ]
  },
};

module.exports = nextConfig;