module.exports = function () {
  return {
    name: '@self.id/docusaurus-plugin',
    configureWebpack(config, isServer) {
      if (isServer) {
        const site = config.plugins.find(
          (p) => p.constructor.name === 'StaticSiteGeneratorWebpackPlugin'
        )
        if (site != null) {
          site.globals.TextDecoder = TextDecoder
          site.globals.TextEncoder = TextEncoder
        }
        return {}
      } else {
        return {
          resolve: {
            fallback: {
              crypto: false,
              http: false,
              https: false,
              os: false,
              stream: require.resolve('stream-browserify'),
            },
          },
        }
      }
    },
  }
}
