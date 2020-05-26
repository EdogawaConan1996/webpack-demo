const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'app': './src/index.js'
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {}
        },
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192    // 小于limit指定的大小，图片按照base64格式解析，大于则正常按照文件进行请求
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {loader: 'less-loader'},
          {loader: 'postcss-loader'}
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
    new CleanWebpackPlugin( {
      root: path.resolve(__dirname, './dist')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
