require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sky = require('util/sky.js');
var _order = require('service/order-service.js');
var templateOrderDetail = require('./index.string');

var page = {
  data: {
    orderNumber: _sky.getUrlParam('orderNo')
  },
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    //初始化左侧菜单
    navSide.init({
      name: 'order-list'
    })
    //加载订单详情
    this.loadOrderDetail();
  },

  bindEvent(){
    var _this = this;
    $(document).on('click','.btn-cancel',function(){
      if(window.confirm('确定取消该订单？')){
        _order.cancelOrder(_this.data.orderNumber,function(res){
          _sky.successTips('取消订单成功');
          _this.loadOrderDetail(res);
        },function(errMsg){
          _sky.errorTips(errMsg);
        })
      }
    })
  },

  //加载订单详情
  loadOrderDetail() {
    var _this = this;
    var $orderDetailCon = $('.content');
    var orderDetailHtml = '';
    _order.getOrderDetail(this.data.orderNumber, function (res) {
      _this.dataFilter(res);
      //渲染html
      orderDetailHtml = _sky.renderHtml(templateOrderDetail, res);
      $orderDetailCon.html(orderDetailHtml);
    }, function (errMsg) {
      $orderDetailCon.html('<p class="err-tips">' + errMsg + '</p>');
    })
  },

  //数据处理
  dataFilter(data) {
    data.needPay = data.status === 10;
    data.isCancel = data.status === 10;
  }
}

module.exports = page.init();