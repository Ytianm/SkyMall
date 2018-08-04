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
  addToCart(productInfo,resolve,reject){
    _sky.request({
      url: _sky.getServerUrl('/cart/add.do'),
      data:productInfo,
      method:'POST',
      success: resolve,
      error: reject
    })
  }
}

module.exports = _cart;