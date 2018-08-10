var _sky = require('util/sky.js');
var _address = require('service/address-service.js');
var templateAddressModal = require('./address-modal.string');
var _city = require('util/city/index.js');

var addressModal = {
  //显示地址modal
  show(option) {
    this.$modalWrap = $('.modal-wrap');
    this.option = option;
    this.option.data = option.data || {};
    //渲染地址窗口
    this.loadAddressModal();
    //加载省份
    this.loadProvince();
    //绑定事件
    this.bindEvent();
  },

  //事件
  bindEvent() {
    var _this = this;
    //省份城市二级联动
    this.$modalWrap.find('#receiver-province').change(function () {    //监听省份选择框的变化
      //获取选择到的省份
      var selectProvince = $(this).val();
      _this.loadCity(selectProvince);
    });

    //保存地址
    this.$modalWrap.find('.address-btn').click(function () {
      var receiverInfo = _this.getReceiverInfo();
      var isUpdate = _this.option.isUpdate;
      //新建地址
      if (!isUpdate && receiverInfo.status) {
        _address.save(receiverInfo.data, function (res) {
          _sky.successTips('新建地址成功');
          //隐藏弹窗
          _this.hide();
          //执行回调
          typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
        }, function (res) {
          _sky.errorTips(res.msg);
        })
      }
      //修改地址
      else if (isUpdate && receiverInfo.status) {
        _address.update(receiverInfo.data, function (res) {
          _sky.successTips('修改地址成功');
          //隐藏弹窗
          _this.hide();
          //执行回调
          typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
        }, function (errMsg) {
          _sky.errorTips(errMsg);
        })
      } else {
        _sky.errorTips(receiverInfo.errMsg || '哪里出错了~');
      }
    });

    //关闭地址弹窗
    this.$modalWrap.find('.close').click(function () {
      _this.hide();
    });

    //阻止点击地址内容区域是触发hide()--阻止冒泡
    this.$modalWrap.find('.modal-container').click(function (e) {
      e.stopPropagation();
    });

  },

  //渲染地址窗口
  loadAddressModal() {
    var addressModalHtml = _sky.renderHtml(templateAddressModal, {
      isUpdate: this.option.isUpdate,
      data: this.option.data
    });
    this.$modalWrap.html(addressModalHtml);
  },

  //加载省份信息
  loadProvince() {
    var provinces = _city.getProvinces() || [];
    var $receiverProvince = this.$modalWrap.find('#receiver-province');
    $receiverProvince.html(this.getSelectOption(provinces));
    //编辑地址时回填省份
    if (this.option.isUpdate && this.option.data.receiverProvince) {
      $receiverProvince.val(this.option.data.receiverProvince);
      this.loadCity(this.option.data.receiverProvince);
    }
  },

  //加载城市信息
  loadCity(provinceName) {
    var cities = _city.getCities(provinceName) || [];
    var $receiverCity = this.$modalWrap.find('#receiver-city');
    $receiverCity.html(this.getSelectOption(cities));
    //编辑地址时回填城市
    if (this.option.isUpdate && this.option.data.receiverCity) {
      $receiverCity.val(this.option.data.receiverCity);
    }
  },

  //省份/城市信息->html
  getSelectOption(optionArr) {
    var optionHtml = '<option value="">请选择</option>';
    for (var i = 0, length = optionArr.length; i < length; i++) {
      optionHtml += '<option value="' + optionArr[i] + '">' + optionArr[i] + '</option>';
    }
    return optionHtml;
  },

  //获取收件人信息,并验证
  getReceiverInfo() {
    var receiverInfo = {
      receiverName: $.trim(this.$modalWrap.find('#receiver-name').val()),
      receiverProvince: this.$modalWrap.find('#receiver-province').val(),
      receiverCity: this.$modalWrap.find('#receiver-city').val(),
      receiverAddress: $.trim(this.$modalWrap.find('#receiver-address').val()),
      receiverPhone: $.trim(this.$modalWrap.find('#receiver-phone').val()),
      receiverZip: $.trim(this.$modalWrap.find('#receiver-zip').val()),
    };
    //修改地址需要传入对应的id
    if(this.option.isUpdate){
      receiverInfo.id = this.option.data.id;
    }
    //验证结果
    var result = {
      status: false
    };
    //验证
    if (!receiverInfo.receiverName) {
      result.errMsg = '请输入收件人姓名';
    } else if (!receiverInfo.receiverProvince) {
      result.errMsg = '请选择收件人所在省份';
    } else if (!receiverInfo.receiverCity) {
      result.errMsg = '请选择收件人所在城市';
    } else if (!receiverInfo.receiverAddress) {
      result.errMsg = '请输入收件人的详细地址';
    } else if (!receiverInfo.receiverPhone) {
      result.errMsg = '请输入收件人的手机号码';
    } else if (!receiverInfo.receiverZip) {
      result.errMsg = '请输入收件人所在地的邮政编码';
    }
    //验证通过
    else {
      result.status = true;
      result.data = receiverInfo
    }
    return result;
  },

  //隐藏弹窗
  hide() {
    this.$modalWrap.html('');
  }
}

module.exports = addressModal;