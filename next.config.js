const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  future: { webpack5: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()',
          },
        ],
      },
    ]
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/me/social-accounts/add-github',
        destination: '/me/social-accounts',
      },
      {
        source: '/me/social-accounts/add-twitter',
        destination: '/me/social-accounts',
      },
    ]
  },
}

module.exports = withPlugins([[withBundleAnalyzer({})], nextConfig, withImages])
