const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const commonConfig = {
  entry: {
    'app': './src/index.js'
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:10].js',
    chunkFilename: '[name].[hash:10].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {}
          },
          {
            loader: 'imports-loader?this=>window'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(eot|json|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts'
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'}),
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, './dist')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',       // 如果某个模块用了$, 就自动引入jquery
      _: 'lodash'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }

    },
    usedExports: true
  }
};

module.exports = (env) => {
  return env && env.production ? merge(commonConfig, prodConfig) : merge(commonConfig, devConfig)
}
