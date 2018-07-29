var _sky = require('util/sky.js');

var _cart = {
  getCartCount(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/cart/get_cart_product_count.do'),
      success: resolve,
      error: reject
    })
  }
}

module.exports = _cart;