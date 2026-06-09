import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    optimizeCss: false,
  },
  async redirects() {
    return [
      // Branch repositioned: Kulim, Kedah → Penang (Simpang Ampat)
      {
        source: '/:locale/locations/kulim',
        destination: '/:locale/locations/penang',
        permanent: true,
      },
      {
        source: '/locations/kulim',
        destination: '/en/locations/penang',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
