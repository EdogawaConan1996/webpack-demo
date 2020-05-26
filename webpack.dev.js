const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',    // 指定dev运行的路径
    open: true,    // 自动打开浏览器
    port: 8080,   // 设置访问端口，默认为8080
    hot: true,
    hotOnly: true
  },
  optimization: {
    usedExports: true
  }
};

module.exports = merge(commonConfig,devConfig);
