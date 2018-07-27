var path = require('path');
var webpack = require('webpack');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');  //分离.css
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//动态生成html
function getHtmlPlugin(name,title) {
  return {
    template: './src/view/' + name + '.html', //原始位置
    filename: 'view/' + name + '.html',       //目标位置
    inject: true,  //是否把模板中的的html引入的js也一起带进去
    hash: true,
    title:title,
    chunks: ['common', name]  //需要引入的.js文件
  }
}

//webpack配置
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],  //处理通用逻辑的模块
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
    'result':['./src/page/result/index.js']
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'  //http查找目录  确保publicPath总是以斜杠(/)开头和结尾。
  },

  externals: {
    'jquery': 'window.jQuery'
  },

  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg|woff|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader',  //注意：需要同时安装url-loader和file-loader
            options: {
              limit: 100,
              name: 'resource/[name].[ext]'  //如果图片大于100k，则以原文件格式保存到resource里，否则转化为base64
            }
          }
        ]
      },
      {
        test:/\.string$/,
        use:'html-loader'
      }
    ]
  },

  resolve: {
    alias: {
      node_modules:__dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + 'src/image'
    }
  },

  plugins: [
    //单独提取.css文件
    new ExtractTextWebpackPlugin('css/[name].css'),

    //提取公共代码，保存到js目录下
    new webpack.optimize.CommonsChunkPlugin({
      //提取到公共代码块的名字，与entry里的common名字相同，表示把通用代码（entry里的common）和公共代码（这里提取的）打包到一起，生成一个common.js
      name: 'common',
      //对哪些入口的文件进行提取
      chunks: ['index', 'login']
    }),

    // 生成动态html
    new HtmlWebpackPlugin(getHtmlPlugin('index','首页')),
    new HtmlWebpackPlugin(getHtmlPlugin('login','登录')),
    new HtmlWebpackPlugin(getHtmlPlugin('result','操作结果'))

    //热更新
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),

    //编译前清空dit目录
    // new CleanWebpackPlugin(['dist'])
  ]
};

//只有开发环境才追加(暂不知道有何用)
if ('dev' === WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}

module.exports = config;