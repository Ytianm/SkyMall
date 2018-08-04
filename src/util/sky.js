// 'use strict'
var Hogan = require('hogan');

var conf = {
  serverHost: ''
}
var _sky = {
  //网络请求
  request(param) {
    var _this = this;
    $.ajax({
      type: param.method || 'GET',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success(res) {
        //请求成功
        // console.log(res)
        if (res.status === 0) {
          typeof param.success === 'function' && param.success(res.data, res.msg);
        }
        //没有登录数据
        else if (res.status === 10) {
          _this.doLogin()
        }
        //请求数据错误
        else if (res.status === 1) {
          console.log('请求数据错误');
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error(res) {
        console.log('请求失败');
        typeof param.error === 'function' && param.error(res.statusText);
      }
    })
  },

  //获取服务器地址
  getServerUrl(path) {
    return conf.serverHost + path;
  },

  //获取url参数
  getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //匹配key=value&key=value
    var result = window.location.search.substr(1).match(reg); //去掉参数前面的？，再匹配正则
    return result ? decodeURIComponent(result[2]) : null;
  },

  //渲染HTML模板
  renderHtml(htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate);
    var result = template.render(data);
    return result;
  },

  //成功提示
  successTips(msg) {
    alert(msg || '操作成功');
  },

  //失败提示
  errorTips(msg) {
    alert(msg || '哪里出问题了~.~');
  },

  //字段验证
  validate(value, type) {
    var value = $.trim(value);    //转换成字符串，去掉value首尾的空格
    //非空
    if (type === 'required') {
      return !!value; //强制转换成布尔值true
    }
    //手机号码
    if (type === 'phone') {
      return /^1\d{10}$/.test(value);
    }
    //邮箱
    if (type === 'email') {
      return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
    }
  },

  //登录
  doLogin() {
    //跳转到登录页
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
  },

  //回到首页
  goHome(){
    window.location.href = './index.html';
  }
}

module.exports = _sky;