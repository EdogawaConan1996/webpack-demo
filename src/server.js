const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.dev');
const compiler = webpack(webpackConfig);

const app = express();    // 配置服务器

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: true
}));    // 配置中间件webpackDevMiddleware

app.listen(3000, () => {
  console.log('server is running in http://localhost:3000')
});    // 启动服务器
