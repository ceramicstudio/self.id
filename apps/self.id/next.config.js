const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  compiler: {
    styledComponents: true,
  },
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
})
