var path = require('path');
var webpack = require('webpack');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');  //分离.css
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//动态生成html
function getHtmlPlugin(name, title) {
  return {
    template: './src/view/' + name + '.html', //入口模板
    filename: 'view/' + name + '.html',       //目标位置
    inject: true,  //是否把模板html引入的js也一起引入
    hash: true,
    title: title,
    chunks: ['common', name],  //需要引入的.js文件
    favicon: './favicon.ico'
  }
}

//webpack配置
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],  //处理通用逻辑的模块
    'index': ['./src/page/index/index.js'],
    'list': ['./src/page/list/index.js'],
    'detail': ['./src/page/detail/index.js'],
    'cart': ['./src/page/cart/index.js'],
    'order-confirm': ['./src/page/order-confirm/index.js'],
    'order-list': ['./src/page/order-list/index.js'],
    'order-detail': ['./src/page/order-detail/index.js'],
    'payment': ['./src/page/payment/index.js'],
    'login': ['./src/page/login/index.js'],
    'register': ['./src/page/register/index.js'],
    'pass-reset': ['./src/page/pass-reset/index.js'],
    'user-center': ['./src/page/user-center/index.js'],
    'user-center-update': ['./src/page/user-center-update/index.js'],
    'pass-update': ['./src/page/pass-update/index.js'],
    'result': ['./src/page/result/index.js'],
    'about': ['./src/page/about/index.js']
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    //http查找目录  确保publicPath总是以斜杠(/)开头和结尾。
    // publicPath: '//s.yetianmao.tech/SkyMall/dist/'
    publicPath:'/dist/' 
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
        test: /\.string$/,
        loader: 'html-loader',
        query: {
          minimize: true,
          removeAttributeQuotes: false  //不删除html属性的双引号
        }
      }
    ]
  },

  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      service: __dirname + '/src/service',
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
    new HtmlWebpackPlugin(getHtmlPlugin('index', '首页')),
    new HtmlWebpackPlugin(getHtmlPlugin('list', '商品列表')),
    new HtmlWebpackPlugin(getHtmlPlugin('detail', '商品详情')),
    new HtmlWebpackPlugin(getHtmlPlugin('cart', '购物车')),
    new HtmlWebpackPlugin(getHtmlPlugin('order-confirm', '订单确认')),
    new HtmlWebpackPlugin(getHtmlPlugin('order-list', '订单列表')),
    new HtmlWebpackPlugin(getHtmlPlugin('order-detail', '订单详情')),
    new HtmlWebpackPlugin(getHtmlPlugin('payment', '订单支付')),
    new HtmlWebpackPlugin(getHtmlPlugin('login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlPlugin('register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlPlugin('pass-reset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlPlugin('result', '操作结果')),
    new HtmlWebpackPlugin(getHtmlPlugin('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlPlugin('user-center-update', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlPlugin('pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlPlugin('about', '关于SkyMall'))

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