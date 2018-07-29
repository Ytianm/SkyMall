require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sky = require('util/sky.js');
var _user = require('service/user-service.js');

var page = {
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    //初始化左侧菜单
    navSide.init({
      name: 'pass-update'
    })
  },
  //
  bindEvent() {
    var _this = this;
    $(document).on('click', '.btn-save', function () {
      //修改后的用户信息
      var userInfo = {
        password: $.trim($('#password').val()),
        passwordNew: $.trim($('#password-new').val()),
        passwordConfirm: $.trim($('#password-confirm').val()),
      };
      //验证修改内容
      var validateResult = _this.formValidate(userInfo);

      if (validateResult.status) {    //验证通过
        _user.updatePassword({
          passwordOld: userInfo.password,
          passwordNew: userInfo.passwordNew
        }, function (res, msg) {
          _sky.successTips(msg);
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

    //原密码非空验证
    if (!_sky.validate(userInfo.password, 'required')) {
      result.msg = '密码不能为空';
      return result;
    }
    //新密码长度验证
    if (!userInfo.passwordNew || userInfo.passwordNew.length < 6) {
      result.msg = '密码长度不能少于6位';
      return result;
    }
    //确认密码验证
    if (userInfo.passwordConfirm !== userInfo.passwordNew) {
      result.msg = '两次输入的密码不一致';
      return result;
    }

    //通过验证
    result.status = true;
    result.msg = '验证通过';
    return result;
  },

  //加载用户信息
  loadUserInfo() {
  }
}

module.exports = page.init();