require('./index.css');
require('page/common/nav-simple/index.js');
var sky = require('util/sky.js');

$(function () {
  var type = sky.getUrlParam('type') || 'default';
  var $el = $('.' + type + '-success');
  //显示对应操作结果页面
  $el.show();
})