var path = require('path');
var webpack = require('webpack');
var pathInfo = require('./path-info');
var baseConfig = require('./base');

// webpack为浏览器注入实时连接devserver服务的js文件
//baseConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:7878', 'webpack/hot/dev-server');

// 输出chunk(独立文件)目录
baseConfig.output.path = pathInfo.__DIST__;

// 输出的静态资源(非chunk)地址
baseConfig.output.publicPath = '/';

// 输出的chunk的最终文件名
baseConfig.output.filename = '[name].js';

// 热点调试
baseConfig.devtool = 'eval-source-map';

// 代理
baseConfig.devServer = {
  // 开启热替换模式
  hot: true,
  inline: true,
  historyApiFallback: true,
  contentBase: pathInfo.__DIST__,
  port: 7777,
  open: true,
  stats: { colors: true },
  proxy: {
    "/api/*": {
      "target": "http://192.168.3.116:8899",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With, Cookie",
      "Access-Control-Allow-Credentials": "true"
    }
  }
};

// CSS
// 对第三方ui库的css和全局css只进行普通的引用，否则触发不了class
baseConfig.module.rules.push({
  test: /\.css$/i,
  include: [ path.join(pathInfo.__ROOT__, 'statics'), path.join(pathInfo.__ROOT__, 'node_modules') ],
  use: [
    {
      loader: 'style-loader'
    }, {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    }
  ]
});

// 对第三方ui库的css和全局css进行CSS Modules
baseConfig.module.rules.push({
  test: /\.css$/i,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: true,
        localIdentName: '[name]__[local]-[hash:base64:6]'
      }
    }
  ]
});

// 定义开发环境变量
baseConfig.plugins.push(
  // 通过插件实现热替换
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('dev')
  })
);

module.exports = baseConfig;
