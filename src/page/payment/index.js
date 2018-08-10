require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sky = require('util/sky.js');
var _payment = require('service/payment-service.js');
var templatePayment = require('./index.string');

var page = {
  data: {
    orderNumber: _sky.getUrlParam('orderNo')
  },
  init() {
    this.onload();
  },
  onload() {
    //加载支付页面
    this.loadPayment();
  },

  //加载支付页面
  loadPayment() {
    var _this = this;
    var $pageWrap = $('.page-wrap');
    var paymentHtml = '';
    _payment.getPaymentInfo(this.data.orderNumber, function (res) {
      //渲染html
      paymentHtml = _sky.renderHtml(templatePayment, res);
      $pageWrap.html(paymentHtml);
      //轮询订单支付状态
      _this.getPaymentStatus();
    }, function (errMsg) {
      $pageWrap.html('<p class="err-tips">' + errMsg + '</p>');
    })
  },

  //轮询订单支付状态
  getPaymentStatus() {
    var _this = this;
    this.payTimer = window.setInterval(function () {
      _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
        if (res === true) {
          //订单支付后跳转
          window.location.href = './result.html?type=payment&orderNo=' + _this.data.orderNumber;
        }
      })
    }, 5e3)
  }
}

module.exports = page.init();