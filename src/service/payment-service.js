var _sky = require('util/sky.js');

var _payment = {
  //获取支付信息
  getPaymentInfo(orderNo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/order/pay.do'),
      data: {
        orderNo: orderNo
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  //获取订单状态
  getPaymentStatus(orderNo, resolve, reject) {
    _sky.request({
      url: _sky.getServerUrl('/order/query_order_pay_status.do'),
      data: {
        orderNo: orderNo
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  }
}

module.exports = _payment;