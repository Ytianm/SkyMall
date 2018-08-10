require('./index.css');
var sky = require('util/sky.js');
var navTemplate = require('./index.string');

var navSide = {
  option: {
    name: '',
    navList: [
      { name: 'user-center', desc: '个人中心', href: './user-center.html' },
      { name: 'pass-update', desc: '修改密码', href: './pass-update.html' },
      { name: 'order-list', desc: '我的订单', href: './order-list.html' },
      { name: 'about', desc: '关于SkyMall', href: './about.html' },
    ]
  },
  init(option) {
    //合并选项，用传入的name替换this.option.name
    $.extend(this.option, option)
    this.renderNav();
  },
  //渲染侧边导航
  renderNav() {
    //计算isActive
    for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
      if (this.option.navList[i].name === this.option.name) {
        this.option.navList[i].isActive = true;
      }
    }
    //渲染list数据
    var navHtml = sky.renderHtml(navTemplate, {
      navList: this.option.navList //这里的数据传到模板文件里进行渲染（index.string）
    })
    //把html放入容器
    $('.nav-side').html(navHtml);
  }
}

module.exports = navSide;