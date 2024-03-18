/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_SERVER_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_SERVER_HOSTNAME,
        port: process.env.NEXT_PUBLIC_SERVER_PORT,
        pathname: '/api/v1/photos/static/*',
      }
    ],
  },
}

module.exports = nextConfig
