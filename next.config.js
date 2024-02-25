/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '178.154.222.147',
        port: '8000',
        pathname: '/api/v1/photos/static/*',
      }
    ],
  },
}

module.exports = nextConfig
