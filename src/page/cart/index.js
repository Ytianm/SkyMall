require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _sky = require('util/sky.js');
var _cart = require('service/cart-service.js');
var templateCart = require('./index.string');

var page = {
  data: {

  },
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    //加载购物车信息
    this.loadCart();
  },
  bindEvent() {
    var _this = this;
    //选中 / 取消选中
    $(document).on('click', '.cart-select', function () {
      var $this = $(this);
      //当前商品id
      var productId = $this.parents('.cart-table').data('product-id');
      //选中
      if ($this.is(':checked')) { //如果有checked返回true
        //请求接口
        _cart.selectProduct(productId, function (res) {
          //重新渲染购物车
          _this.renderCart(res);
        }, function () {
          _this.showCartErrTips();
        })
      }
      //取消选中
      else {
        //请求接口
        _cart.unselectProduct(productId, function (res) {
          //重新渲染购物车
          _this.renderCart(res);
        }, function () {
          _this.showCartErrTips();
        })
      }
    });

    //全选 / 取消全选
    $(document).on('click', '.cart-select-all', function () {
      var $this = $(this);
      //全选
      if ($this.is(':checked')) {
        //请求接口
        _cart.selectAllProduct(function (res) {
          //重新渲染购物车
          _this.renderCart(res);
        }, function () {
          _this.showCartErrTips();
        })
      }
      //取消全选
      else {
        //请求接口
        _cart.unselectAllProduct(function (res) {
          //重新渲染购物车
          _this.renderCart(res);
        }, function () {
          _this.showCartErrTips();
        })
      }
    });

    //商品数量改变
    $(document).on('click', '.count-btn', function () {
      var $this = $(this);
      //当前商品id
      var productId = $this.parents('.cart-table').data('product-id');
      var $pCount = $this.siblings('.count-input');//注意是当前btn对应商品的input框
      var type = $this.hasClass('minus') ? 'minus' : 'plus';
      var currCount = parseInt($pCount.val());
      var maxCount = $this.parents('.cart-table').data('product-stock') || 1;  //当前商品库存
      var minCount = 1;
      var newCount = 0;
      //商品+1
      if (type === 'plus') {
        if (currCount >= maxCount) {
          _sky.errorTips('库存不够啦');
          newCount = maxCount;
        }
        newCount = currCount + 1;
      }
      //商品-1
      else {
        if (currCount <= minCount) {
          return;
        }
        newCount = currCount - 1;
      }
      //请求接口，更新数量
      _cart.updateCart({
        productId: productId,
        count: newCount
      }, function (res) {
        _this.renderCart(res);
      }, function (errMsg) {
        _this.showCartErrTips();
      })
    });

    //删除购物车指定商品
    $(document).on('click', '.cart-delete', function () {
      var $this = $(this);
      if (window.confirm('确定要删除该商品吗？')) {
        var productId = $this.parents('.cart-table').data('product-id');
        _this.deleteProduct(productId);
      }
    });

    //删除购物车选中的商品
    $(document).on('click', '.delete-selected', function () {
      var $this = $(this);
      var arrProductIds = [];
      var $selectItem = $('.cart-select:checked'); //选中的商品
      //循环选中的商品，提取其productIds
      for (var i = 0, iLength = $selectItem.length; i < iLength; i++) {
        var productId = $($selectItem[i]).parents('.cart-table').data('product-id');
        arrProductIds.push(productId);
      }
      if (arrProductIds.length) {
        if (window.confirm('确定要删除选中的商品吗？')) {
          _this.deleteProduct(arrProductIds.join(','));
        } else {
          return;
        }
      } else {
        _sky.errorTips('请选择需要删除的商品');
      }
    });

    //删除购物车选中的商品
    $(document).on('click', '.submit-btn', function () {
      //购车总价>0时才跳转
      if(_this.data.cartInfo.cartTotalPrice > 0){
        window.location.href = './confirm.html';
      }else{
        _sky.errorTips('您还没选择任何商品哦');
      }
    })
  },


  //加载购物车信息
  loadCart() {
    var _this = this;
    var $pageWrap = $('.page-wrap');
    //loading
    $pageWrap.html('<div class="loading"></div>');
    //请求购物车接口
    _cart.getCartList(function (res) {
      _this.renderCart(res);
    }, function (errMsg) {
      _this.showCartErrTips();
    })
  },

  //渲染购物车信息
  renderCart(cartData) {
    this.filter(cartData);
    //缓存购物车信息
    this.data.cartInfo = cartData;
    //渲染html
    var cartHtml = _sky.renderHtml(templateCart, cartData);
    $('.page-wrap').html(cartHtml);
    //每次渲染后通知导航栏的购物车更新数量
    nav.loadCartCount();
  },

  //删除购物车商品,逗号分隔->支持批量删除
  deleteProduct(productIds) {
    var _this = this;
    _cart.deleteCartProduct(productIds, function (res) {
      _this.renderCart(res);
    }, function (errMs) {
      _this.showCartErrTips()
    })
  },

  //字符串->数组
  filter(data) {
    //购物车是否为空
    data.notEmpty = !!data.cartProductVoList.length;
  },

  //显示错误信息
  showCartErrTips() {
    $pageWrap.html('<p class="errTips">出问题啦，刷新试试~.~</p>');
  }
}

$(function () {
  page.init();
})