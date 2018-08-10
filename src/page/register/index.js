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
    //检测用户名是否已存在
    $('#username').blur(function () {
      var username = $.trim($(this).val());
      if (!username) {
        return;
      }
      _user.checkUsername(username, function (res) {
        formError.hide();
      }, function (errMsg) {
        formError.show(errMsg);
      });
    })
    //检测密码长度
    $('#password').blur(function () {
      var passwordLegth = $.trim($(this).val()).length;
      if (!passwordLegth) {
        return;
      }
      if (passwordLegth < 6) {
        formError.show('密码长度不能少于6位');
      } else {
        formError.hide();
      }
    })
    //点击注册
    $('#submit').click(function () {
      _this.submit();
    })
    //回车注册
    $('.login-con').keyup(function (e) {
      if (e.keyCode === 13) {
        _this.submit();
      }
    })
  },
  submit() {
    // 获取输入表单信息
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#pass-question').val()),
      answer: $.trim($('#pass-answer').val())
    }
    //获取表单验证结果
    var validateResult = this.formValidate(formData);

    //验证成功
    if (validateResult.status) {
      //提交注册
      _user.register(formData, function (res) {
        //注册成功
        window.location.href = './result.html?type=register';
      }, function (errMsg) {
        //注册失败
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
    console.log(formData)
    //用户名非空验证
    if (!_sky.validate(formData.username, 'required')) {
      result.msg = '用户名不能为空';
      return result;
    }
    //密码非空验证
    if (!_sky.validate(formData.password, 'required')) {
      result.msg = '密码不能为空';
      return result;
    }
    //密码长度验证
    if (formData.password.length < 6) {
      result.msg = '密码长度不能少于6位';
      return result;
    }
    //确认密码验证
    if (formData.passwordConfirm !== formData.password) {
      result.msg = '两次输入的密码不一致';
      return result;
    }
    //手机号验证
    if (!_sky.validate(formData.phone, 'phone')) {
      result.msg = '手机号码格式不正确';
      return result;
    }
    //邮箱验证
    if (!_sky.validate(formData.email, 'email')) {
      result.msg = '邮箱格式不正确';
      return result;
    }
    //密码提示问题验证
    if (!_sky.validate(formData.question, 'required')) {
      result.msg = '密码提示问题不能为空';
      return result;
    }
    //密码提示问题答案验证
    if (!_sky.validate(formData.answer, 'required')) {
      result.msg = '密码提示问题答案不能为空';
      return result;
    }

    //通过验证
    result.status = true;
    result.msg = '验证通过';
    return result;
  }
}

$(function () {
  login.init();
})