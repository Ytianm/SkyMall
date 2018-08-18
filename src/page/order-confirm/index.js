require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sky = require('util/sky.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal = require('./address-modal.js');

var page = {
  data: {
    selectAddressId: null
  },
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    this.loadAddressList();
    this.loadProductList();
  },
  bindEvent() {
    var _this = this;
    //地址选择
    $(document).on('click', '.address-item', function () {
      $(this).addClass('active').siblings('.address-item').removeClass('active');
      _this.data.selectAddressId = $(this).data('id');
    });

    //订单提交
    $(document).on('click', '.order-submit', function () {
      var shippingId = _this.data.selectAddressId;
      if (shippingId) {
        _order.createOrder({
          shippingId: shippingId
        }, function (res) {
          window.location.href = './payment.html?orderNo=' + res.orderNo;
        }, function (errMsg) {
          _sky.errorTips(errMsg);
        })
      } else {
        _sky.errorTips('请选择收货地址后再提交');
      }
    })

    //新建收货地址
    $(document).on('click', '.address-add', function () {
      addressModal.show({
        isUpdate: false,
        onSuccess: function () {
          _this.loadAddressList();
        }
      })
    });

    //编辑地址
    $(document).on('click', '.address-update', function (e) {
      e.stopPropagation();  //防止点击编辑时触发选中
      var shippingId = $(this).parents('.address-item').data('id');
      _address.getAddress(shippingId, function (res) {
        addressModal.show({
          data: res,
          isUpdate: true,
          onSuccess: function () {
            _this.loadAddressList();
          }
        })
      }, function (errMsg) {
        _sky.errorTips(errMsg);
      })
    });

    //删除地址
    $(document).on('click', '.address-delete', function (e) {
      e.stopPropagation();  //防止点击删除时触发触发选中
      var shippingId = $(this).parents('.address-item').data('id');
      if (window.confirm('确定要删除该地址？')) {
        _address.deleteAddress(shippingId, function (res) {
          _this.loadAddressList();
        }, function (errMsg) {
          _sky.errorTips(errMsg);
        })
      }
    });
  },

  //加载地址列表
  loadAddressList() {
    var _this = this;
    $('.address-con').html('<div class="loading"></div>');
    _address.getAddressList(function (res) {
      _this.addressFilter(res); //初始化地址选中状态
      var addressHtml = _sky.renderHtml(templateAddress, res);
      $('.address-con').html(addressHtml);
    }, function (errMsg) {
      $('.address-con').html('<p class="err-tips">地址加载失败，请刷新重试</p>');
    })
  },

  //地址选中状态
  addressFilter(data) {
    if (this.data.selectAddressId) {
      var selectAddressIdFlag = false;  //选中标记
      for (var i = 0, length = data.list.length; i < length; i++) {
        if (data.list[i].id === this.data.selectAddressId) {
          data.list[i].isActive = true;
          selectAddressIdFlag = true;
        }
      };
      //循环一遍都没有发现标记，说明没有地址被选中或者选中的地址被删除了，则将选中id清除
      if (!selectAddressIdFlag) {
        this.data.selectAddressId = null;
      }
    }
  },

  //加载订单列表
  loadProductList() {
    $('.product-con').html('<div class="loading"></div>');
    _order.getProductList(function (res) {
      var productHtml = _sky.renderHtml(templateProduct, res);
      $('.product-con').html(productHtml);
    }, function (errMsg) {
      $('.product-con').html('<p class="err-tips">订单列表加载失败，请刷新重试</p>');
    })
  },

}

$(function () {
  page.init();
});