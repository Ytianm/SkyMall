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

var passRest = {
  data: {
    username: '',
    question: '',
    answer: '',
    token: ''
  },
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    //初始化后显示第一步
    this.loadUsername();
  },
  bindEvent() {
    var _this = this;
    //输入用户名下一步
    $('#submit-username').click(function () {
      var username = $.trim($('.username').val());
      if (username) {
        _user.getQuestion(username, function (res) {
          _this.data.username = username;
          _this.data.question = res;
          //加载第二步
          _this.loadPasswordQuestion();
        }, function (errMsg) {
          formError.show(errMsg);
        })
      } else {
        formError.show('请输入要找回密码的用户名');
      }
    })

    //输入密码提示问题答案下一步
    $('#submit-password-answer').click(function () {
      var answer = $.trim($('.password-answer').val());
      if (answer) {
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        }, function (res) {
          _this.data.answer = answer;
          _this.data.token = res;
          //加载第三步
          _this.loadNewPassword();
        }, function (errMsg) {
          formError.show(errMsg);
        })
      } else {
        formError.show('请输入要找回密码的用户名');
      }
    })

    //完成密码重置
    $('#submit-new-password').click(function () {
      var password = $.trim($('.new-password').val());
      if (password && password.length>=6) {
        _user.resetPassword({
          username: _this.data.username,
          passwordNew: password,
          forgetToken: _this.data.token
        }, function (res) {
          //设置新买成功后跳转
          window.location.href = './result.html?type=pass-reset';
        }, function (errMsg) {
          formError.show(errMsg);
        })
      } else {
        formError.show('请输入不少于6位的新密码');
      }
    })

  },
  //第一步：输入用户名
  loadUsername() {
    $('.step-username').show();
  },
  //第二步：输入密保答案
  loadPasswordQuestion() {
    var _this = this;
    //清除上一步的错误信息
    formError.hide();
    //隐藏上一步，显示下一步
    $('.step-username').hide().siblings('.step-password-question').show().find('.question-con').text(_this.data.question);
  },
  //第三步：设置新密码
  loadNewPassword() {
    //清除上一步的错误信息
    formError.hide();
    $('.step-password-question').hide().siblings('.step-new-password').show();
  }
}

$(function () {
  passRest.init();
})