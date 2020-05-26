const path = require('path');
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
        test: /\.js$/,
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
            limit: 8192
          }
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
    })
  ],
  optimization: {
    // 如果splitChunks设置为空对象，则默认内容如下
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     vendors: false,
    //     default: false
    //   }
    // }
    splitChunks: {
      chunks: "all",    // 代码分割方式，async只对异步加载方式的代码生效,initial只对同步加载方式的代码生效,all对所有的都生效
      minSize: 30000,   // 引入的包、模块、库大小 大于30000字节的话就做代码分割，否则不做代码分割
      // maxSize: 50000,   //  假设lodash库大小为1mb， 如果配置maxSize，将会在代码分割的基础上再次进行代码分割
      minChunks: 1,     // 当引入的模块使用次数大于等于1时，进行代码分割
      maxAsyncRequests: 5,   // 同时加载的模块大于5个的话不做代码分割
      maxInitialRequests: 3,   // 整个入口文件加载的模块数大于3个的话不做代码分割
      automaticNameDelimiter: '~',   // 文件连接符
      name: true,
      cacheGroups: {   // 缓存组
        vendors: {   // 如果对同步加载的代码进行分割，需要配置vendor
          test: /[\\/]node_modules[\\/]/,   // 如果引入的库来自node_modules, 则分割到vendor组里
          priority: -10,   // 优先级越高，打包位置的优先级就越高
          filename: "vendors.js"   // 对vendors组进行重命名
        },
        default: {
          priority: -20,
          reuseExistingChunk: true,   // 如果之前打包过的模块，那么之后不会进行打包，直接复用之前打包的内容
          filename: 'common.js'
        }
      }
    }
  }
};
