const webpack = require('webpack');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
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
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',    // 指定dev运行的路径
    open: true,    // 自动打开浏览器
    port: 8080,   // 设置访问端口，默认为8080
    hot: true,
    hotOnly: true
  }
};

module.exports = devConfig;
