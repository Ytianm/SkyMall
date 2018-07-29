require('./index.css');
require('page/common/nav-simple/index.js')
var _sky = require('util/sky.js');
var _user = require('service/user-service.js');

//错误信息
var formError = {
  //显示
  show(errMsg) {
    $('.error-item').show().find('.err-msg').text(errMsg);
  },
  //隐藏
  hide() {
    $('.error-item').hide().find('.err-msg').text('');
  }
}

var login = {
  init() {
    this.bindEvent();
  },
  bindEvent() {
    var _this = this;
    //点击登录
    $('#submit').click(function () {
      _this.submit();
    })
    //回车登录
    $('.login-con').keyup(function (e) {
      if (e.keyCode === 13) {
        _this.submit();
      }
    })
  },
  submit() {
    // 表单信息
    var formData = {
      username : $.trim($('#username').val()),
      password : $.trim($('#password').val())
    }
    //表单验证结果
    var validateResult = this.formValidate(formData);
    //验证成功
    if (validateResult.status) {
      //提交登录
      _user.login(formData, function (res) {
        //提交登录成功，不一定登录成功
        console.log('提交成功')
        window.location.href = _sky.getUrlParam('redirect') || './index.html';
      }, function (errMsg) {
        //登录失败
        console.log('提交失败'+errMsg)
        formError.show(errMsg); //这里的错误信息errMsg是服务器返回的
      })
    }
    //验证失败
    else {
      //错误提示
      formError.show(validateResult.msg); //这里的错误信息msg是formValidate返回的
    }
  },
  //表单验证
  formValidate(formData) {
    var result = {
      status: false,
      msg: ''
    }
    //非空验证
    if (!_sky.validate(formData.username, 'required')) {
      result.msg = '用户名不能为空';
      return result;
    }
    if (!_sky.validate(formData.password, 'required')) {
      result.msg = '密码不能为空';
      return result;
    }
    //通过非空验证
    result.status = true;
    result.msg = '验证通过';
    return result;
  }
}

$(function () {
  login.init();
})