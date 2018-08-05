var _sky = require('util/sky.js');

var _cart = {
  //获取购物车数量
  getCartCount(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/get_cart_product_count.do'),
      success: resolve,
      error: reject
    })
  },
  //加入购物车
  addToCart(productInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/add.do'),
      data: productInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //加载购物车信息
  getCartList(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/list.do'),
      success: resolve,
      error: reject
    })
  },
  //选中
  selectProduct(productId, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/select.do'),
      data: {
        productId: productId
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //取消选中
  unselectProduct(productId, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/un_select.do'),
      data: {
        productId: productId
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //全选
  selectAllProduct(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/select_all.do'),
      success: resolve,
      error: reject
    })
  },
  //取消全选
  unselectAllProduct(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/un_select_all.do'),
      success: resolve,
      error: reject
    })
  },
  //更新购物车数量
  updateCart(productInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/update.do'),
      data: productInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //删除购物车商品
  deleteCartProduct(productIds, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/delete_product.do'),
      data: {
        productIds:productIds
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  }
}

module.exports = _cart;