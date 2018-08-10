require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _sky = require('util/sky.js');
var _product = require('service/product-service.js');
var templateList = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
  data: {
    listParam: {
      keyword: _sky.getUrlParam('keyword') || '',
      categoryId: _sky.getUrlParam('categoryId') || '',
      orderBy: _sky.getUrlParam('orderBy') || 'default',
      pageNum: _sky.getUrlParam('pageNum') || 1,
      pageSize: _sky.getUrlParam('pageSize') || 5
    }
  },
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    this.loadList();
  },
  bindEvent() {
    var _this = this;
    $('.sort-item').click(function(){
      var $this = $(this);
      _this.data.listParam.pageNum = 1;
      //默认排序
      if($this.data('type')==='default'){
        //选中状态
        if($this.hasClass('active')){
          return;
        }
        //不是选中状态
        else{
          $this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
          _this.data.listParam.orderBy = 'default';
        }
      }
      //价格排序
      else if($this.data('type')==='price'){
        //active
        $this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
        //排序
        if(!$this.hasClass('asc')){ //当前不是升序->升序
          $this.addClass('asc').removeClass('desc');
          _this.data.listParam.orderBy = 'price_asc';
        }else{                      //当前不是降序->降序
          $this.addClass('desc').removeClass('asc');
          _this.data.listParam.orderBy = 'price_desc';
        }
      }
      //重新加载数据
      _this.loadList();
    })
  },
  //加载商品列表
  loadList() {
    var _this = this;
    var htmlList = '';
    var listParam = this.data.listParam;
    var $pListCon = $('.p-list-con');
    //加载前显示loading...
    // $pListCon.html('<div class="loading"></div>');
    // 删除参数中不必要的字段
    listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
    //请求接口，加载数据
    _product.getProductList(listParam, function (res) {
      htmlList = _sky.renderHtml(templateList, {
        list: res.list,
        keyword: _this.data.listParam.keyword
      })
      $('.p-list-con').html(htmlList);
      //加载分页
      _this.loadPagination({
        pageNum:res.pageNum,
        pages:res.pages,
        prePage: res.prePage,
        nextPage: res.nextPage,
        lastPage: res.lastPage,
        firstPage:res.firstPage,
        isFirstPage: res.isFirstPage,
        isLastPage: res.isLastPage,
        hasPreviousPage: res.hasPreviousPage,
        hasNextPage: res.hasNextPage
      });
    }, function (errMsg) {
      _sky.errorTips(errMsg);
    })
  },
  //加载分页信息
  loadPagination(pageInfo) {
    var _this = this;
    this.pagination = new Pagination(pageInfo);
    this.pagination.render($.extend({},pageInfo,{
      container:$('.pagination'),
      onSelectPage:function(newPageNum){  //页码点击回调函数
        _this.data.listParam.pageNum = newPageNum;
        _this.loadList();
      }
    }));
  }
}

$(function(){
  page.init();
})
