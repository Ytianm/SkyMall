require('./index.css');
var _sky = require('util/sky.js');
var templatePagination = require('./index.string');

var Pagination = function () {
  var _this = this;
  this.defaultOption = {
    container: null,
    pageNum: 1,
    pageRange: 3,
    onSelectPage:null
  }
  //页码点击事件,这里要用事件代理，不能用事件绑定
  $(document).on('click','.pg-item',function(){
    var $this = $(this);
    //对active和disabled的按钮不做处理
    if($this.hasClass('active') || $this.hasClass('disabled')){
      return;
    }
    //
    typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
  })
};
//渲染分页组件
Pagination.prototype.render = function (pageInfo) {
  //合并选项  
  this.option = $.extend({}, this.defaultOption, pageInfo);//前面{}->合并选项不影响原来数据
  //判断容器是否是合法的jQuery对象
  if (!(this.option.container instanceof jQuery)) {
    return;
  }
  //判断是否只有一页
  if (this.option.pages <= 1) {
    return;
  }
  //渲染分页数据
  this.option.container.html(this.getPaginationHtml());
};
//获取分页HTML
Pagination.prototype.getPaginationHtml = function () {
  var htmlPagination = '';
  var pageArray = [];
  var option = this.option;
  //第一个页码
  var start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1;
  //最后一个页码
  var end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
  //上一页
  pageArray.push({
    name: '上一页',
    value: option.prePage,
    disabled: !option.hasPreviousPage
  });
  //页码数字
  for (var pageNum = start; pageNum <= end; pageNum++) {
    pageArray.push({
      name: pageNum,
      value: pageNum, //页码，用于点击时获取
      active: (pageNum === option.pageNum) //页码选中
    });
  }
  //下一页
  pageArray.push({
    name: '下一页',
    value: option.nextPage,
    disabled: !option.hasNextPage
  });

  //渲染
  htmlPagination = _sky.renderHtml(templatePagination, {
    pageArray: pageArray,
    pageNum: option.pageNum,
    pages: option.pages
  });
  return htmlPagination;
  
}

module.exports = Pagination;
