require('./index.css');
require('page/common/nav-simple/index.js');
var _sky = require('util/sky.js');

$(function () {
  var type = _sky.getUrlParam('type') || 'default';
  var $el = $('.' + type + '-success');
  if (type === 'payment') {
    var $orderDetail = $el.find('.order-detail');
    var orderNo = _sky.getUrlParam('orderNo');
    $resultCon.attr('href', $orderDetail.attr('href') + orderNo);
  }
  //显示对应操作结果页面
  $el.show();
})