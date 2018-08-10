var _sky = require('util/sky.js');

var _address = {
  //获取地址列表
  getAddressList(resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/shipping/list.do'),
      data: {
        pageSize: 50
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  //新建地址
  save(addressInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/shipping/add.do'),
      data: addressInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  //修改地址
  update(addressInfo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/shipping/update.do'),
      data: addressInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  //删除地址
  deleteAddress(shippingId, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/shipping/del.do'),
      data: {
        shippingId:shippingId
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },

  //获取一条地址信息
  getAddress(shippingId, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/shipping/select.do'),
      data: {
        shippingId: shippingId
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  }
}

module.exports = _address;