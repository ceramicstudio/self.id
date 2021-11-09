const { ESBuildMinifyPlugin } = require('esbuild-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const target = 'es2020'

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    fallback: {
      crypto: false,
      stream: require.resolve('stream-browserify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
  optimization: {
    minimizer: [new ESBuildMinifyPlugin({ target })],
  },
}
