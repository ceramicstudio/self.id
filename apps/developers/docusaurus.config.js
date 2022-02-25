const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Self.ID SDK',
  tagline: 'User-centric decentralized apps made easy',
  url: 'https://developers.self.id',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ceramicstudio', // Usually your GitHub org/user name.
  projectName: 'self.id', // Usually your repo name.
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'SDK',
      logo: {
        alt: 'Self.ID Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        // {
        //   type: 'doc',
        //   docId: 'api/index',
        //   position: 'left',
        //   label: 'API',
        // },
        {
          href: 'https://github.com/ceramicstudio/self.id',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            // {
            //   label: 'API',
            //   to: '/docs/api/index',
            // },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/TPmE2rdNWK',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/mySelfID',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ceramicstudio/self.id',
            },
          ],
        },
        {
          title: 'Ceramic',
          items: [
            {
              label: 'Documentation',
              href: 'https://developers.ceramic.network',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Self.ID`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/ceramicstudio/self.id/edit/main/apps/developers/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    // [
    //   'docusaurus-plugin-typedoc',
    //   {
    //     tsconfig: '../../tsconfig.docs.json',
    //     name: 'Self.ID API',
    //     out: 'api',
    //     readme: 'none',
    //     sort: ['static-first', 'source-order'],
    //   },
    // ],
    '@self.id/docusaurus-plugin',
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
}
