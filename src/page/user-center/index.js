require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sky = require('util/sky.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
  init() {
    this.onload();
  },
  onload() {
    //初始化左侧菜单
    navSide.init({
      name: 'user-center'
    })
    //加载个人信息
    this.loadUserInfo();
  },
  //
  loadUserInfo() {
    var userHtml = '';
    _user.getUserInfo(function (res) {  //从服务器读取用户信息
      userHtml = _sky.renderHtml(templateIndex, res);  //
      $('.panel-body').html(userHtml);
    }, function (errMsg) {
      _sky.errorTips(errMsg);
    })
  }
}

module.exports = page.init();