require('./index.css');
var sky = require('util/sky.js');

var header = {
  init() {
    this.onload();
    this.bindEvent();
  },
  onload() {
    var keyword = sky.getUrlParam('keyword');
    //初始化输入框
    if (keyword) {
      $('.search-input').val(keyword);
    }
  },
  bindEvent() {
    var _this = this;
    //点击搜索
    $('#search-btn').click(function () {
      _this.searchSubmit();
    })
    //回车搜索
    $('#search-input').keyup(function(e){
      if(e.keyCode === 13){
        _this.searchSubmit();
      }
    })
  },
  //提交搜索
  searchSubmit() {
    var keyword = $.trim($('#search-input').val());
    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    }else{
      sky.goHome();
    }
  }
}

header.init();