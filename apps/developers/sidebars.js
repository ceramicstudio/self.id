module.exports = {
  main: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['learn/dice-stack'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/public-data', 'guides/authentication'],
    },
  ],
  // API: require('./typedoc-sidebar.js'),
}
