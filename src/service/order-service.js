var _sky = require('util/sky.js');

var _order = {
  //获取购物车数量
  getCartCount(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/get_cart_product_count.do'),
      success: resolve,
      error: reject
    })
  },
  //获取订单商品列表
  getProductList(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/order/get_order_cart_product.do'),
      success: resolve,
      error: reject
    })
  },
  //创建订单（提交订单）
  createOrder(orderInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/order/create.do'),
      data: orderInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //获取订单列表
  getOrderList(orderInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/order/list.do'),
      data: orderInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //获取订单详情
  getOrderDetail(orderNumber, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/order/detail.do'),
      data: {
        orderNo:orderNumber
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
    //取消订单
    cancelOrder(orderNumber, resolve, reject) {
      _sky.request({
        url: _sky.getServerUrl('/order/cancel.do'),
        data: {
          orderNo:orderNumber
        },
        method: 'POST',
        success: resolve,
        error: reject
      })
    }

}

module.exports = _order;