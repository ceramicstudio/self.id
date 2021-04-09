const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.node = {
      fs: 'empty',
    }
    return config
  },
}

module.exports = withPlugins([[withBundleAnalyzer({})], nextConfig, withImages])
