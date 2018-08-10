require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sky = require('util/sky.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
var templateDetail = require('./index.string');

var page = {
  data: {
    productId: _sky.getUrlParam('productId'),
  },
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    if (!this.data.productId) {
      _sky.goHome();
    }
    //加载商品详情
    this.loadDetail();
  },
  bindEvent() {
    var _this = this;
    //缩略图预览
    $(document).on('mouseenter', '.p-img-item', function () {
      var imgUrl = $(this).attr('src');
      $('.main-img').attr('src', imgUrl);
    })
    //购买数量+-
    $(document).on('click', '.p-count-btn', function () {
      var type = $(this).hasClass('plus') ? 'plus' : 'minus';
      var $count = $('.count');
      var currCount = parseInt($count.val());
      var minCount = 1;
      var maxCount = _this.data.detailInfo.stock || 1; //不能直接去$('.stock')的值，因为数据是变动的
      if (type === 'plus') {
        $count.val(currCount < maxCount ? currCount + 1 : maxCount);
      } else {
        $count.val(currCount > minCount ? currCount - 1 : minCount);
      }
    })
    //加入购物车
    $(document).on('click', '.cart-add', function () {
      //请求接口
      _cart.addToCart({
        productId: _this.data.productId,
        count: $('.count').val()
      }, function (res) {
        //成功跳转
        window.location.href = './result.html?type=cart-add';
      }, function (errMsg) {
        _sky.errorTips(errMsg);
      })
    })

  },
  //加载商品详情
  loadDetail() {
    var _this = this;
    var htmlDetail = '';
    var $pageWrap = $('.page-wrap');
    //loading
    $pageWrap.html('<div class="loading"></div>');
    //请求详情接口
    _product.getProductDetail(this.data.productId, function (res) {
      //缓存detail数据
      _this.data.detailInfo = res;
      _this.filter(res);
      //渲染详情数据
      htmlDetail = _sky.renderHtml(templateDetail, res);
      $pageWrap.html(htmlDetail);
    }, function (errMsg) {
      $pageWrap.html('<p class="err-tips">~_~没有找到此商品的详情信息~_~</p>');
    })
  },
  //字符串->数组
  filter(data) {
    data.subImages = data.subImages.split(',');
  }
}

$(function () {
  page.init();
})