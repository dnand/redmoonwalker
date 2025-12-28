/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Set basePath for GitHub Pages - change 'redmoonwalker' to your repo name
  basePath: process.env.NODE_ENV === 'production' ? '/redmoonwalker' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/redmoonwalker/' : '',
}

module.exports = nextConfig
