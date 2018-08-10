var _sky = require('util/sky.js');

var _product = {
  //获取商品列表
  getProductList(listParam, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/product/list.do'),
      data: listParam,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //获取商品详情
  getProductDetail(productId, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/product/detail.do'),
      data: {
        productId: productId
      },
      method: 'post',
      success: resolve,
      error: reject
    })
  }
}

module.exports = _product;