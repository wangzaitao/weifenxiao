import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import TravelNav from './../../components/travel/TravelNav.jsx';
import {toast} from '../../utils/toast';
import * as ContentAPI from '../../api/content';
import LocalStorage from '../../utils/localStorage';
import {isPhoneNumber} from '../../utils/common';

class ProvinceCityArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: [],
      city: [],
      area: [],
      provinceCode: "",
      cityCode: "",
      areaCode: ""
    };
  }

  componentWillMount() {
    this._getProvince();
  }

  componentWillReceiveProps(nextProps) {
    var addrCode = nextProps.initAddr;
    if (addrCode && addrCode != "") {
      var addrCodeObj = JSON.parse(addrCode);
      var provinceCode = addrCodeObj[0].id;
      var cityCode = addrCodeObj[1].id;
      var areaCode = addrCodeObj[2].id;

      this.state.provinceCode = provinceCode;
      this._getCity(provinceCode, cityCode);
      this._getArea(cityCode, areaCode);
    }
  }

  _provinceValueChanged(e) {
    let provinceID = $("#province").val();
    this._getCity(provinceID);
    $("#city").val("-1");
    this.state.area = [];
  }

  _cityValueChanged(e) {
    this.setState({
      cityCode: e.target.value
    });
    let cityID = e.target.value;
    this._getArea(cityID);
  }

  _getProvince() {
    ContentAPI
      .getProvince().then((res) => {
      this.setState({
        province: res
      });
    });
  }

  _getCity(provinceID, selectedCityCode) {
    ContentAPI
      .getCity(provinceID)
      .then((res) => {
        this.setState({
          city: res,
          cityCode: selectedCityCode || ""
        });
      });
  }

  _getArea(cityID, selectedAreaCode) {
    ContentAPI.getCounty(cityID).then((res) => {
      this.setState({
        area: res,
        areaCode: selectedAreaCode
      });
    });
  }

  render() {
    let provinceOptionsDom = this.state.province.map((item, index) => {
      return <option value={item.id} key={index} selected={this.state.provinceCode == item.id}>{item.name}</option>;
    });
    let cityOptionsDom = this.state.city.map((item, index) => {
      return <option value={item.id} key={index} selected={this.state.cityCode == item.id}>{item.name}</option>;
    });
    let areaOptionsDom = this.state.area.map((item, index) => {
      return <option value={item.id} key={index} selected={this.state.areaCode == item.id}>{item.name}</option>;
    });

    return (
      <div>
        <select id="province" name="province" onChange={this._provinceValueChanged.bind(this)}>
          <option value="-1">选择省</option>
          {provinceOptionsDom}
        </select>
        <select id="city" name="city" onChange={this._cityValueChanged.bind(this)} value={this.state.cityCode}>
          <option value="-1">选择市</option>
          {cityOptionsDom}
        </select>
        <select id="area" name="area">
          <option value="-1">选择区</option>
          {areaOptionsDom}
        </select>
      </div>
    )
  };
}

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mid: LocalStorage.getItem("mid") || 1,
      showReceiptDialog: false,
      addrCode: "",
      provinceCode: "",
      provinceName: "",
      cityCode: "",
      cityName: "",
      areaCode: "",
      areaName: ""
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    let props = this.props;
    var receiptData = props.location.state;

    if (receiptData.id) {
      $("input[name='receipts_id']").val(receiptData.id);
      $("input[name='receipts_address']").val(receiptData.addresshome);
      $("input[name='receipts_name']").val(receiptData.name);
      $("input[name='receipts_telephone']").val(receiptData.mobile);
      if (receiptData.default == 1) {
        $("#img_default").removeClass("img-uncheck-addr").addClass("img-default-addr");
      }
      else {
        $("#img_default").removeClass("img-default-addr").addClass("img-uncheck-addr");
      }
      var provinceCode = receiptData.provid;
      var cityCode = receiptData.cityid;
      var areaCode = receiptData.countyid;
      var provincName = receiptData.province;
      var cityName = receiptData.city;
      var areaName =receiptData.county;
      var _addrCode = JSON.stringify([
        {
          id: provinceCode,
          name: provincName
        },
        {
          id: cityCode,
          name: cityName
        },
        {
          id: areaCode,
          name: areaName
        }]);

      $("#ssq").text(provincName + cityName + areaName);
      this.setState({
        provinceCode: provinceCode,
        provinceName: provincName,
        cityCode: cityCode,
        cityName: cityName,
        areaCode: areaCode,
        areaName: areaName,
        addrCode: _addrCode
      });
    }
  }

  _openRegion() {
    this.setState({
      showReceiptDialog: true
    });
  }

  _closeRegion() {
    this.setState({
      showReceiptDialog: false
    });
  }

  _finishRegion() {
    var provinceEle = $("#province"),
      cityEle = $("#city"), areaEle = $("#area");
    if (provinceEle.val() == "-1" || cityEle.val() == "-1" || areaEle.val() == "-1") {
      $("#required").show();
      return false;
    }
    else {
      $("#required").hide();
      this.setState({
        provinceCode: provinceEle.val(),
        provinceName: $("#province option").eq($("#province").attr("selectedIndex")).text(),
        cityCode: cityEle.val(),
        cityName: $("#city option").eq($("#city").attr("selectedIndex")).text(),
        areaCode: areaEle.val(),
        areaName: $("#area option").eq($("#area").attr("selectedIndex")).text()
      });
      $("#ssq").text($("#province option").eq($("#province").attr("selectedIndex")).text() + $("#city option").eq($("#city").attr("selectedIndex")).text() + $("#area option").eq($("#area").attr("selectedIndex")).text());
      var _addrCode = JSON.stringify([
        {
          id: provinceEle.val(),
          name: $("#province option").eq($("#province").attr("selectedIndex")).text()
        },
        {
          id: cityEle.val(),
          name: $("#city option").eq($("#city").attr("selectedIndex")).text()
        },
        {
          id: areaEle.val(),
          name: $("#area option").eq($("#area").attr("selectedIndex")).text()
        }
      ]);

      this.setState({
        showReceiptDialog: false,
        addrCode: _addrCode
      });
    }
  }

  _validReceipts(provinceCode, cityCode, areaCode, name, phone, telephone, address, addrCode, code) {  // 收货人
    if (name == "") {
      toast('收货人不能为空', 'error');
      return false;
    }
    // 手机号码
    if (phone == "") {
      toast('手机号码不能为空', 'error');
      return false;
    }
    if (!isPhoneNumber(phone)) {
      toast('手机号码格式不正确', 'error');
      return false;
    }
    // 所在地区
    if (provinceCode == "-1" || cityCode == "-1" || areaCode == "-1") {
      toast('所在地区不能为空', 'error');
      return false;
    }
    // 详细地址
    if (address == "") {
      toast('详细地址不能为空', 'error');
      return false;
    }
    return true;
  }

  _addReceipts() {
    let $content = $("#receiptContent"), provinceEle = $("#province"),
      cityEle = $("#city"), areaEle = $("#area");
    var _id = $content.find("input[name='receipts_id']").val();
    var _name = $content.find("input[name='receipts_name']").val();
    //var _phone = $content.find("input[name='receipts_phone']").val();
    var _phone = $content.find("input[name='receipts_telephone']").val();
    var _telephone = $content.find("input[name='receipts_telephone']").val();
    var _address = $content.find("input[name='receipts_address']").val();
    var _addrCode;
    _addrCode = JSON.stringify([
      {
        id: this.state.provinceCode,
        name: $("#province option").eq($("#province").attr("selectedIndex")).text()
      },
      {
        id: this.state.cityCode,
        name: $("#city option").eq($("#city").attr("selectedIndex")).text()
      },
      {
        id: this.state.areaCode,
        name: $("#area option").eq($("#area").attr("selectedIndex")).text()
      }
    ]);
    //var _code = $content.find("input[name='receipts_code']").val();
    var _code = "";
    //var _default = $content.find("input[type='checkbox']").prop("checked") ? 1 : 0;
    var _default = $("#img_default").hasClass("img-default-addr") ? 1 : 0;

    var _provinceCode = this.state.provinceCode;
    var _cityCode = this.state.cityCode;
    var _areaCode = this.state.areaCode;

    var result = this._validReceipts(_provinceCode, _cityCode, _areaCode, _name, _phone,
      _telephone, $content.find("input[name='receipts_address']").val(), _addrCode, _code);

    if (result) {
      var postData = {
        mid: this.state.mid ,
        name: _name,
        mobile: _phone,
        provid: this.state.provinceCode,
        province: $("#province option").eq($("#province").attr("selectedIndex")).text(),
        cityid: this.state.cityCode,
        city: $("#city option").eq($("#city").attr("selectedIndex")).text(),
        countyid: this.state.areaCode,
        county: $("#area option").eq($("#area").attr("selectedIndex")).text(),
        addresshome: _address,
        zip_code: "",
        default: _default,
        flag: _addrCode
      };
      if (_id && _id != "") {
        postData.id = _id;
      }
      ContentAPI.postReceipts(JSON.stringify(postData))
        .then((res) => {
          browserHistory.push({pathname: '/user/address/'});
        });
    }
  }

  _setDefault(e) {
    if ($("#img_default").hasClass("img-uncheck-addr")) {
      $("#img_default").removeClass("img-uncheck-addr").addClass("img-default-addr");
    }
    else {
      $("#img_default").removeClass("img-default-addr").addClass("img-uncheck-addr");
    }
  }

  render() {
    return (
      <div className="my-address my-address-add" id="receiptContent">
        <div className="tlp">
          <TravelNav name="增加收货地址"/>
          <input name="receipts_id" type="hidden"/>
          <div className="text bgc-white">请提供有效的联系电话、姓名、收件地址（<span className="address-red">最好精确到街道，</span>以便能顺利到达）</div>
          <div className="row">
            <span className="black" style={{width:"60px",display:"inline-block"}}>收货人</span>
            <input type="text" placeholder="请填写收货人名字" style={{ border:"0",marginLeft:"18px"}} name="receipts_name"/>
          </div>
          <div className="row">
            <span className="black" style={{width:"60px",display:"inline-block"}}>手机号</span>
            <input type="text" placeholder="请填写收货人手机号" style={{ border:"0",marginLeft:"18px"}}
                   name="receipts_telephone"/>
          </div>
          <div className="row" onTouchTap={this._openRegion.bind(this)}>
            <span className="black" style={{width:"60px",display:"inline-block"}}>地区</span>
            <span style={{marginLeft:"18px"}} id="ssq">请选择地区</span>
            <a className="fr"><i className="img-arrow"></i></a>
          </div>
          <div className="row">
            <span className="black" style={{width:"60px",display:"inline-block"}}>详细地址</span>
            <input type="text" placeholder="请填写具体有效的地址" style={{ border:"0",marginLeft:"18px"}}
                   name="receipts_address"/>
          </div>
          <div className="row" onTouchTap={this._setDefault.bind(this)}>
            <span className="black">设为默认地址</span>
            <a className="fr"><i id="img_default" className="img-uncheck-addr"></i></a>
          </div>
          <div className="row" style={{textAlign:"center"}}>
            <a className="btn" onClick={this._addReceipts.bind(this)}>保存</a>
          </div>
          <div className="bgc-white" style={{textAlign:"center"}}>
            <p>如有疑问，请联系客服</p>
            <p>客服QQ：<span className="address-red" style={{textDecoration: "underline"}}>306146945</span></p>
          </div>

          <div className="dialog-wrapper receipt-dialog"
               style={{display: (this.state.showReceiptDialog ? '-webkit-box' : 'none')}}>
            <div className="dialog-content">
              <div className="head">
                <span className="head-title" onTouchTap={this._finishRegion.bind(this)}>完成</span>
                <span className="close-btn" onTouchTap={this._closeRegion.bind(this)}/>
              </div>
              <div className="dialog-body">
                <ProvinceCityArea initAddr={this.state.addrCode || ''}/>
                <div id="required" style={{color:"#ff302d",display:"none"}}>* 请选择完整的省市区</div>
              </div>
            </div>
          </div>
        </div>
        <div id="toast-wrap"></div>
      </div>
    );
  }
}

export default AddAddress;
