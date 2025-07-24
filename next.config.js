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
  target: 'serverless'
};

module.exports = nextConfig;