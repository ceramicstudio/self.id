const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')
const withSvgr = require('next-plugin-svgr')

module.exports = withPlugins([[withSvgr({ includeFileLoader: true })], [withBundleAnalyzer({})]])
