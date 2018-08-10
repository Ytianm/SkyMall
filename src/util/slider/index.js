require('./index.css');
require('./bjqs-1.3.min.js');
var _sky = require('util/sky.js');
var templateBanner = require('page/index/index.string');

//basicsilder-插件
jQuery(document).ready(function ($) {
  //渲染轮播图
  var bannerHtml = _sky.renderHtml(templateBanner);
  $('.banner-con').html(bannerHtml);
  $('#banner-slide').bjqs({
    animtype: 'slide',
    height: 357,
    width: 888,
    responsive: true,
    nexttext: '>',
    prevtext: '<',
  });
});