require('./index.css');
var _sky = require('util/sky.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
  init() {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
    return this;  //这个模块初始化后返回该对象本身
  },
  bindEvent() {
    //点击注册
    $('.js-register').click(function () {
      window.location.href = './register.html';
    })
    //点击登录
    $('.js-login').click(function () {
      _sky.doLogin();
    })
    //点击退出
    $('.js-logout').click(function(){
      _user.logout(function(){
        window.location.reload();
      },function(errMsg){
        _sky.errorTips(errMsg);
      })
    })
  },
  // 加载用户信息
  loadUserInfo() {
    _user.checkLogin(function (res) {
      $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
    }, function (errMsg) {
      // console.log(errMsg)
    })
  },
  //加载购物车信息
  loadCartCount() {
    _cart.getCartCount(function (res) {
      $('.cart-count').text(res || 0)
    }, function () {
      $('.cart-count').text(0)
    })
  }
}

module.exports = nav.init();