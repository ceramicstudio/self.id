const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    fallback: {
      assert: require.resolve('assert/'),
      crypto: false,
      http: false,
      https: false,
      os: false,
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg)/,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        loader: 'swc-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
}
