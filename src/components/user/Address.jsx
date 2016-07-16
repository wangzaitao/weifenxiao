import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import TravelNav from './../../components/travel/TravelNav.jsx';
import CustomLink from '../common/CustomLink.jsx';
import DefaultDialog from '../common/DefaultDialog';
import * as ContentAPI from '../../api/content';
import LocalStorage from '../../utils/localStorage';

require("./address.scss")

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mid: LocalStorage.getItem("mid") || 1,
      showDialog: false,
      showTapIndex: "0",
      receiptList: []
    };
  }

  componentWillMount() {
    this._getReceipts(this.state.mid);
  }

  _getReceipts(mid) {
    ContentAPI.getReceipts({mid: mid}).then((res) => {
      this.setState({receiptList: res});
    });
  }

  componentDidMount() {
  }


  _confirmDelete(e) {
    this.state.selectID = $(e.target).closest(".item").find("input[name='receipts_id']").val();
    this.refs.delete.show();
  }

  _deleteReceipt(e) {
    var id = this.state.selectID;
    ContentAPI
      .deleteReceipts(id)
      .then(() => {
        this._getReceipts(this.state.mid);
      });
  }

  _setDefault(e) {
    var item = $(e.target).closest(".item");
    var _default = item.find("input[name='receipts_default']").val();
    if (_default != "1") {
      var _id = item.find("input[name='receipts_id']").val();
      var _name = item.find("span[name='receipts_name']").text();
      var _phone = item.find("span[name='receipts_phone']").text();
      var _address = item.find("input[name='receipts_address']").val();
      var _addrCode = item.find("input[name='receipts_addrCode']").val();
      ContentAPI.postReceipts(JSON.stringify({
          id: _id,
          default: 1
        }))
        .then((res) => {
          this._getReceipts(this.state.mid);
        });
    }
  }

  render() {
    let receiptsDom = null;
    var receipts = this.state.receiptList;
    if (receipts.length > 0) {
      receiptsDom = receipts.map((item, index) => {
        return (
          <div className="item">
            <input name="receipts_id" type="hidden" value={item.id}/>
            <input name="receipts_address" type="hidden" value={item.addresshome}/>
            <input name="receipts_addrCode" type="hidden" value={item.flag}/>
            <input name="receipts_default" type="hidden" value={item.default}/>
            <div className="addr">
              <div>
                <span name="receipts_name">{item.name}</span>
                <span name="receipts_phone" className="fr">{item.mobile}</span>
              </div>
              <div style={{marginTop:"4px"}}><span
                style={{color:"#ff302d"}}>{item.default == 1 ? "[默认]" : ""}</span>{ssqz}{item.addresshome}
              </div>
            </div>
            <div style={{ padding: "13px 13px" }}>
              <a className={item.default==1?"address-red":""} onTouchTap={this._setDefault.bind(this)}>
                <i className={item.default==1?"img-default-addr":"img-uncheck-addr"}></i>
                <span>{item.default == 1 ? "默认地址" : "设为默认"}</span>
              </a>
              <a className="fr" onClick={this._confirmDelete.bind(this)}><i
                className="img-delete"></i><span>删除</span></a>
              <CustomLink to="/user/add_address" state={item} className="fr mr16"><i
                className="img-edit"></i><span>编辑</span></CustomLink>
            </div>
            <div style={{position: "fixed", bottom: "0px", width: "100%"}}>
              <CustomLink to="/user/add_address" className="btn" style={{ width:"100%"}}>添加新地址</CustomLink>
            </div>
          </div>
        );
      });
    }
    else {
      receiptsDom = (
        <div className="empty">
          <p>
            <img src={require('../../img/users/shipping_address_icon.png')}/>
          </p>
          <p className="info">您还未添加过收货地址，请点击“添加”</p>
          <p>
            <CustomLink to="/user/add_address" className="award">添加新地址</CustomLink>
          </p>
        </div>
      )
    }

    return (
      <div className="my-address">
        <DefaultDialog ref="delete" body="您确认要删除吗？" onOk={this._deleteReceipt.bind(this)}/>
        <div className="tlp">
          <TravelNav name="收货地址管理"/>
          <div className="content">
            <div className={this.state.showTapIndex=="0"?"body":"body hide"} id="receipt">
              {receiptsDom}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Address;
