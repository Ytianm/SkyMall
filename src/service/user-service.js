var _sky = require('util/sky.js');

var _user = {
  //用户登录
  login(userInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/login.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //退出登录
  logout(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //检查用户名
  checkUsername(username, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/check_valid.do'),
      data: {
        type: 'username',
        str: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //用户注册
  register(userInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/register.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //检查用户登录状态
  checkLogin(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/get_user_info.do'),
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //获取密码提示问题
  getQuestion(username, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/forget_get_question.do'),
      data: {
        username: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //获取密码提示问题答案及token
  checkAnswer(userInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/forget_check_answer.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //重置密码
  resetPassword(userInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/forget_reset_password.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //修改密码
  updatePassword(userInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/reset_password.do'),
      data: userInfo,
      method:'POST',
      success: resolve,
      error: reject
    })
  },
  //获取用户信息
  getUserInfo(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/get_information.do'),
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //更新用户信息
  updateUserInfo(userInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/user/update_information.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  }
}

module.exports = _user;