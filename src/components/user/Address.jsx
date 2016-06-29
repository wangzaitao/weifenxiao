import React, {Component, PropTypes} from 'react';
import { PROVINCE } from '../../constants/Config';
import * as ContentAPI from '../../api/content';
import {isPhoneNumber, isZipCode, getSortFun} from '../../utils/common';
import DefaultDialog from '../common/DefaultDialog';

require('./address.scss');

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
			var provinceCode = addrCodeObj.province.code;
			var cityCode = addrCodeObj.city.code;
			var areaCode = addrCodeObj.area.code;

			this.state.provinceCode = provinceCode;
			this._getCity(provinceCode, cityCode);
			this._getArea(cityCode, areaCode);
		}
	}

	_provinceValueChanged() {
		let provinceID = $("#province").val();
		this._getCity(provinceID);
		$("#city").val("-1");
		this.state.area = [];
	}

	_cityValueChanged() {
		let cityID = $("#city").val();
		this._getArea(cityID);
	}

	_getProvince() {
		this.setState({
			province: PROVINCE
		});
	}

	_getCity(provinceID, selectedCityCode) {
		ContentAPI
			.getRegions({area_id: provinceID})
			.then((res) => {
				this.setState({
					city: res.data,
					cityCode: selectedCityCode || ""
				});
			});
	}

	_getArea(cityID, selectedAreaCode) {
		ContentAPI.getRegions({area_id: cityID}).then((res) => {
			this.setState({
				area: res.data,
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
					<option value="-1">---请选择---</option>
					{provinceOptionsDom}
				</select>
				<select id="city" name="city" onChange={this._cityValueChanged.bind(this)}>
					<option value="-1">---请选择---</option>
					{cityOptionsDom}
				</select>
				<select id="area" name="area">
					<option value="-1">---请选择---</option>
					{areaOptionsDom}
				</select>
				<span className="required">*</span>
			</div>
		)
	};
}

class ReceiptItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectID: null,
		};
	}

	_confirmDelete(e) {
		this.state.selectID =  $(e.target).closest("li").find("input[name='receiptID']").val();
		this.refs.delete.show();
	}

	_deleteReceipt(e) {
		var id = this.state.selectID;
		ContentAPI
			.deleteReceipts(id)
			.then(() => {
				this.props.initReceipt();
			});
	}

	_modifyReceipt() {
		this.props.showReceiptContent(this.props.receiptData);
	}

	_showSetNormal(e) {
		if ($(e.target).closest("li").find("b.set-normal").length >= 1) {
			$(e.target).closest("li").find(".set-normal").show();
		}
		e.stopPropagation();
	}

	_hideSetNormal(e) {
		if ($(e.target).closest("li").find("b.set-normal").length >= 1) {
			$(e.target).closest("li").find(".set-normal").hide();
		}
		e.stopPropagation();
	}

	_setNormal(e) {
		var liobj = $(e.target).closest("li");
		var _id = liobj.find("input[name='receiptID']").val();
		var _name = liobj.find("span[name='receiptName']").text();
		var _phone = liobj.find("input[name='receiptPhone']").val();
		var _telephone = liobj.find("span[name='receiptTelephone']").text();
		var _address = liobj.find("input[name='receiptAddress']").val();
		var _addrCode = liobj.find("input[name='receiptAddrCode']").val();
		var _code = liobj.find("span[name='receiptCode']").text();

		ContentAPI.modifyReceipts(_id, JSON.stringify({
				name: _name,
				phone: _phone,
				telephone: _telephone,
				address: _address,
				addr_code: _addrCode,
				zip_code: _code,
				default: 1
			}))
			.then(() => {
				//('保存成功', 'success');
				this.props.initReceipt();
				$(".is-normal").show();
			});
	}

	render() {
		const props = this.props;
		let optionDom = null;
		if (props.receiptData.default != 1) {
			optionDom =
				<div>
          <span className="u-option">
             <a href="javascript:;" name="update" className="op-tail" onClick={this._modifyReceipt.bind(this)}>修改</a>
             <a href="javascript:;" name="delete" className="op-tail" onClick={this._confirmDelete.bind(this)}>删除</a>
             <DefaultDialog ref="delete" body="您确认要删除吗？" onOk={this._deleteReceipt.bind(this)}/>
          </span>
          <span className="u-set">
            <b className="set-normal hide" onClick={this._setNormal.bind(this)}>设为默认地址</b>
          </span>
				</div>;
		}
		else {
			optionDom =
				<div>
          <span className="u-option">
            <a href="javascript:;" name="update" className="op-tail" onClick={this._modifyReceipt.bind(this)}>修改</a>
          </span>
          <span className="u-set">
            <b className="is-normal" style={{display:"block"}}>默认地址</b>
          </span>
				</div>;
		}
		return (
			<li onMouseOver={this._showSetNormal.bind(this)} onMouseLeave={this._hideSetNormal.bind(this)}>
				<input type="hidden" name="receiptID" value={props.receiptData.id}/>
				<input type="hidden" name="receiptPhone" value={props.receiptData.phone}/>
				<input type="hidden" name="receiptAddrCode" value={props.receiptData.addr_code}/>
				<input type="hidden" name="receiptAddress" value={props.receiptData.address}/>
				<span className="u-name" name="receiptName">{props.receiptData.name}</span>
				<span className="u-tel" name="receiptTelephone">{props.receiptData.telephone}</span>
        <span className="u-address">
          { JSON.parse(props.receiptData.addr_code).province.name + JSON.parse(props.receiptData.addr_code).city.name + JSON.parse(props.receiptData.addr_code).area.name + props.receiptData.address}
        </span>
				<span className="u-code" name="receiptCode">{props.receiptData.zip_code}</span>
				{optionDom}
			</li>
		)
	}
}

class Address extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			receipts: [],
			addrCode: ""
		};
	}

	componentWillMount() {
		this._getReceipts();
	}

	_getReceipts() {
		ContentAPI.getReceipts().then((res) => {
			this.setState({receipts: res.data.sort(getSortFun('desc', 'default'))});
		});
	}

	_showReceiptContent(receiptData) {
		$("#receiptContent").show();
		$("#add_address").hide();
		if (receiptData.id) {
			$(".error").remove();
			this.setState({addrCode: receiptData.addr_code});
			$("input[name='receipts_id']").val(receiptData.id);
			$("input[name='receipts_address']").val(receiptData.address);
			$("input[name='receipts_code']").val(receiptData.zip_code);
			$("input[name='receipts_name']").val(receiptData.name);
			$("input[name='receipts_phone']").val(receiptData.phone);
			$("input[name='receipts_telephone']").val(receiptData.telephone);
			$("input[name='receipts_default']").prop("checked", receiptData.default == 1);
		}
		else {
			this._resetDialog();
		}
	}

	_hideReceiptContent() {
		$("#receiptContent").hide();
		$("#add_address").show();
	}

	_resetDialog() {
		$("input[type='text']").val("");
		$("input[type='hidden']").val("");
		$("select").val("-1");
		$("input[type='checkbox']").prop("checked", false);
		$(".error").remove();
	}

	_checkPhone(str) {
		var re = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
		return re.test(str);
	}

	_showError(domName, info) {
		$(".error").remove();
		$("[name='" + domName + "']").closest(".form-text").append("<div class='error'><i class='ico ico-error_prompt'></i>" + info + "</div>");
	}

	_validReceipts(provinceCode, cityCode, areaCode, name, phone, telephone, address, addrCode, code) {
		// 所在地区
		if (provinceCode == "-1" || cityCode == "-1" || areaCode == "-1") {
			this._showError("province", "所在地区不能为空");
			return false;
		}
		// 详细地址
		if (address == "") {
			this._showError("receipts_address", "详细地址不能为空");
			return false;
		}
		// 邮政编码
		if (code && !isZipCode(code)) {
			this._showError("receipts_code", "邮政编码格式不正确");
			return false;
		}
		// 收货人
		if (name == "") {
			this._showError("receipts_name", "收货人不能为空");
			return false;
		}
		// 固定电话
		if (phone && !this._checkPhone(phone)) {
			this._showError("receipts_phone", "固定电话格式不正确");
			return false;
		}
		// 手机号码
		if (telephone == "") {
			this._showError("receipts_telephone", "手机号码不能为空");
			return false;
		}
		if (!isPhoneNumber(telephone)) {
			this._showError("receipts_telephone", "手机号码格式不正确");
			return false;
		}

		return true;
	}

	_addReceipts() {
		let $content = $("#receiptContent"), provinceEle = $("#province"),
			cityEle = $("#city"), areaEle = $("#area");
		var _id = $content.find("input[name='receipts_id']").val();
		var _name = $content.find("input[name='receipts_name']").val();
		var _phone = $content.find("input[name='receipts_phone']").val();
		var _telephone = $content.find("input[name='receipts_telephone']").val();
		var _address = $content.find("input[name='receipts_address']").val();
		var _addrCode = JSON.stringify({
			province: {
				code: provinceEle.val(),
				name: provinceEle.find("option:selected").text()
			},
			city: {
				code: cityEle.val(),
				name: cityEle.find("option:selected").text()
			},
			area: {
				code: areaEle.val(),
				name: areaEle.find("option:selected").text()
			}
		});
		var _code = $content.find("input[name='receipts_code']").val();
		var _default = $content.find("input[type='checkbox']").prop("checked") ? 1 : 0;

		var _provinceCode = provinceEle.val();
		var _cityCode = cityEle.val();
		var _areaCode = areaEle.val();

		var result = this._validReceipts(_provinceCode, _cityCode, _areaCode, _name, _phone,
			_telephone, $content.find("input[name='receipts_address']").val(), _addrCode, _code);

		if (result) {
			if (_id && _id != "") {
				ContentAPI.modifyReceipts(_id, JSON.stringify({
						name: _name,
						phone: _phone,
						telephone: _telephone,
						address: _address,
						addr_code: _addrCode,
						zip_code: _code,
						default: _default
					}))
					.then((res) => {
						this.setState({
							data: res
						});
						this._getReceipts();
						$("#receiptContent").hide();
						$("#add_address").show();
					});
			}
			else {
				ContentAPI
					.addReceipts(JSON.stringify({
						name: _name,
						phone: _phone,
						telephone: _telephone,
						address: _address,
						addr_code: _addrCode,
						zip_code: _code,
						default: _default
					}))
					.then((res) => {
						this.setState({
							id: res.id
						});
						this._getReceipts();
						$("#receiptContent").hide();
						$("#add_address").show();
					});
			}
		}
	}

	render() {
		let receiptsDom = this.state.receipts.map((item, index) => {
			return <ReceiptItem key={index} receiptData={item} initReceipt={this._getReceipts.bind(this)}
			                    showReceiptContent={this._showReceiptContent.bind(this)}/>;
		});

		return (
			<div className="user-wrapper">
				<div className="user-content win-Account-wrapper">
					<div className="g-purchase-title clear-fix">
						<h3><span>收货地址</span></h3>
					</div>

					<div className="clear-fix">
						<div className="add-wrap">
							<div className="data-menu">
								<span className="u-name">收货人</span>
								<span className="u-tel">手机/电话号码</span>
								<span className="u-address">详细地址</span>
								<span className="u-code">邮政编码</span>
								<span className="u-option">操作</span>
							</div>

							<ul className={this.state.receipts.length > 0 ? "add-list" : "add-list hide"}>
								{receiptsDom}
							</ul>

							<div className={this.state.receipts.length > 0 ? "empty hide" : "empty"}>
								<i className="ico ico-no-history"/>
								<div>您还没有收货地址哦！</div>
							</div>
							<a className="new-add-btn" id="add_address" onClick={this._showReceiptContent.bind(this)}>添加新地址</a>
						</div>

						<div className="new-add-wrap hide" id="receiptContent">
							<h3>添加收货地址</h3>
							<input name="receipts_id" type="hidden"/>
							<div className="form-row clearfix">
								<div className="form-label">
									所在地区：
								</div>
								<div className="form-text" id="province_city_area">
									<ProvinceCityArea initAddr={this.state.addrCode || ''}/>
								</div>
							</div>
							<div className="form-row clearfix">
								<div className="form-label">详细地址：</div>
								<div className="form-text">
									<input name="receipts_address" type="text" style={{ width: "392px" }} maxLength="50"/>
									<span className="required">*</span>
									<span className="info">无需重复填写所在地区</span>
								</div>
							</div>
							<div className="form-row clearfix">
								<div className="form-label">邮政编码：</div>
								<div className="form-text">
									<input name="receipts_code" type="text"/>
								</div>
							</div>
							<div className="form-row clearfix">
								<div className="form-label">
									<span>收</span><span>货</span><span>人：</span>
								</div>
								<div className="form-text">
									<input name="receipts_name" type="text" maxLength="10"/>
									<span className="required">*</span>
									<span className="info">请填写真实有效的姓名，否则将无法进行配送</span>
								</div>
							</div>
							<div className="form-row clearfix">
								<div className="form-label">固定电话：</div>
								<div className="form-text">
									<input name="receipts_phone" type="text"/>
								</div>
							</div>
							<div className="form-row clearfix">
								<div className="form-label">手机号码：</div>
								<div className="form-text">
									<input name="receipts_telephone" type="text"/>
									<span className="required">*</span>
								</div>
							</div>
							<div className="form-row clearfix" style={{height: "32px", lineHeight: "32px", marginTop: "2px" }}>
								<div className="form-label">
								</div>
								<div className="form-text">
									<input name="receipts_default" type="checkbox"/>
									<span className="normal-size">设为默认地址</span>
								</div>
							</div>
							<div className="form-row clearfix">
								<div className="form-label">
								</div>
								<div className="form-text">
									<a className="btn" onClick={this._addReceipts.bind(this)}>确定</a>
									<a className="btn_cancel" onClick={this._hideReceiptContent.bind(this)}>取消</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Address;
