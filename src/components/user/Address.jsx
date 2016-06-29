import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import TravelNav from './../../components/travel/TravelNav.jsx';
import CustomLink from '../base/CustomLink.jsx';
import * as ContentAPI from '../../api/content';

require("./address.scss")

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      showTapIndex: "0",
      receiptList: [],
      telephoneList: [],
      qqList: []
    };
  }

  componentWillMount() {
    this._getReceipts(1);
  }

  _getReceipts(mid) {
    ContentAPI.getReceipts({mid: mid}).then((res) => {
      this.setState({receiptList: res});
    });
  }

  componentDidMount() {
    $("#content-container").addClass("bgc-white");
    $("#content-container").find(".user-info-container").removeClass("bgc-white");
    $("#content-container").css("height", "100%");
  }

  render() {
    let receiptsDom = null;
    var receipts = this.state.receiptList;
    if (receipts.length > 0) {
      receiptsDom = receipts.map((item, index) => {
        return (
          <div className="item">
            <div className="addr">
              <div>
                <span>{item.name}</span>
                <span className="fr">{item.phone}</span>
              </div>
              <div style={{marginTop:"4px"}}><span
                style={{color:"#ff302d"}}>{item.default == 1 ? "[默认]" : ""}</span>{item.address}
              </div>
            </div>
            <div style={{ padding: "13px 13px" }}>
              <a className={item.default==1?"address-red":""}>
                <i className={item.default==1?"img-default-addr":"img-uncheck-addr"}></i>
                <span>{item.default == 1 ? "默认地址" : "设为默认"}</span>
              </a>
              <a className="fr"><i className="img-delete"></i><span>删除</span></a>
              <a className="fr mr16"><i className="img-edit"></i><span>编辑</span></a>
            </div>
            <div style={{position: "fixed", bottom: "0px", width: "100%"}}>
              <a className="btn" style={{ width:"100%"}}>添加新地址</a>
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
