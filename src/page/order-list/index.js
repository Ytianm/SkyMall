require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _sky = require('util/sky.js');
var _order = require('service/order-service.js');
var templateOrder = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
  data: {
    listParam: {
      pageNum: 1,
      pageSize: 1
    }
  },
  init() {
    this.onload();
  },
  onload() {
    //初始化左侧菜单
    navSide.init({
      name: 'order-list'
    })
    //加载订单信息
    this.loadOrderList();
  },

  //加载订单列表
  loadOrderList() {
    var _this = this;
    var $orderListCon = $('.order-list-con');
    var orderHtml = '';
    _order.getOrderList(this.data.listParam, function (res) {
      _this.dataFilter(res);
      //渲染html
      orderHtml = _sky.renderHtml(templateOrder, res);
      $orderListCon.html(orderHtml);
      //加载分页
      _this.loadPagination({
        pageNum: res.pageNum,
        pages: res.pages,
        prePage: res.prePage,
        nextPage: res.nextPage,
        lastPage: res.lastPage,
        firstPage: res.firstPage,
        isFirstPage: res.isFirstPage,
        isLastPage: res.isLastPage,
        hasPreviousPage: res.hasPreviousPage,
        hasNextPage: res.hasNextPage
      })
    }, function (errMsg) {
      $orderListCon.html('<p class="err-tips">加载订单失败，请刷新重试</p>');
    })
  },

  //加载分页信息
  loadPagination(pageInfo) {
    var _this = this;
    this.pagination = new Pagination(pageInfo);
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination'),
      onSelectPage: function (newPageNum) {  //页码点击回调函数
        _this.data.listParam.pageNum = newPageNum;
        _this.loadOrderList();
      }
    }));
  },

  //数据处理
  dataFilter(data) {
    data.isEmpty = !data.list.length;
  }
}

module.exports = page.init();