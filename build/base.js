var path = require('path');
var webpack = require('webpack');
var htmlPlugin = require('html-webpack-plugin');
var pathInfo = require('./path-info');
var venderModules = require('./vender-modules');

module.exports = {
  // 入口文件，及其将所有第三方包打包在一起
  entry: {
    app: [ path.join(pathInfo.__SRC__, 'main.js') ],
    vender: venderModules
  },

  // 输出信息
  output: {},

  resolve: {
    // 编译的模块的缺省后缀名
    extensions: [ '.js', '.jsx', '.json' ],
    // 模块路径别名
    alias: {
      views: path.join(pathInfo.__SRC__, 'views'),
      models: path.join(pathInfo.__SRC__, 'models'),
      api: path.join(pathInfo.__SRC__, 'api'),
      assists: path.join(pathInfo.__SRC__, 'assists')
    }
  },

  // 模块解析处理
  module: {
    rules: [
      // 编译es6
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ 'es2015' ],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      },
      {
        test: /\.json$/i,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: 'imgs/[name].[ext]'
          }
        }
      }
    ]
  },

  // 插件
  plugins: [
    new htmlPlugin({
      title: '基于Backbone的后台管理系统',
      template: path.join(pathInfo.__ROOT__, 'index.html'),
      inject: true
    })
  ]
};
