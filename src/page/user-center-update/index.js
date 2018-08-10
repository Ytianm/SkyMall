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
    this.bindEvent();
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
  bindEvent() {
    var _this = this;
    $(document).on('click', '.btn-save', function () {
      //修改后的用户信息
      var userInfo = {
        phone: $.trim($('#phone').val()),
        email: $.trim($('#email').val()),
        question: $.trim($('#question').val()),
        answer: $.trim($('#answer').val()),
      };
      //验证修改内容
      var validateResult = _this.formValidate(userInfo);
      
      if (validateResult.status) {    //验证通过
        _user.updateUserInfo(userInfo, function (res,msg) {
          _sky.successTips(msg);
          window.location.href = './user-center.html';
        }, function (errMsg) {
          _sky.errorTips(errMsg);
        })
      } else {    //验证不通过
        _sky.errorTips(validateResult.msg);
      }
    })
  },
  //表单验证
  formValidate(userInfo) {
    var result = {
      status: false,
      msg: ''
    }
    //手机号验证
    if (!_sky.validate(userInfo.phone, 'phone')) {
      result.msg = '手机号码格式不正确';
      return result;
    }
    //邮箱验证
    if (!_sky.validate(userInfo.email, 'email')) {
      result.msg = '邮箱格式不正确';
      return result;
    }
    //密码提示问题验证
    if (!_sky.validate(userInfo.question, 'required')) {
      result.msg = '密码提示问题不能为空';
      return result;
    }
    //密码提示问题答案验证
    if (!_sky.validate(userInfo.answer, 'required')) {
      result.msg = '密码提示问题答案不能为空';
      return result;
    }

    //通过验证
    result.status = true;
    result.msg = '验证通过';
    return result;
  },

  //加载用户信息
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