import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import TravelNav from './../../components/travel/TravelNav.jsx';
import CustomLink from '../base/CustomLink.jsx';
import * as ContentAPI from '../../api/content';

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReceiptDialog: false
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    $("#content-container").addClass("bgc-white");
    $("#content-container").css("height", "100%");
    $("#content-container").find(".right-icon").html("保存").css({"color": "#fff", "font-size": "1.143em"});
  }

  render() {
    return (
      <div className="my-address my-address-add">
        <div className="tlp">
          <TravelNav name="添加收货地址"/>
          <div className="text">请提供有效的联系电话、姓名、收件地址（<span className="address-red">最好精确到街道，</span>以便实物奖品能顺利到达）</div>
          <div className="row">
            <span className="black" style={{width:"60px",display:"inline-block"}}>收货人</span>
            <input type="text" placeholder="请填写收货人名字" style={{ border:"0",marginLeft:"18px"}}/>
          </div>
          <div className="row">
            <span className="black" style={{width:"60px",display:"inline-block"}}>手机号</span>
            <input type="text" placeholder="请填写收货人手机号" style={{ border:"0",marginLeft:"18px"}}/>
          </div>
          <div className="row">
            <span className="black" style={{width:"60px",display:"inline-block"}}>地区</span>
            <span style={{marginLeft:"18px"}}>请选择地区</span>
            <a className="fr"><i className="img-arrow"></i></a>
          </div>
          <div className="row">
            <span className="black" style={{width:"60px",display:"inline-block"}}>街道</span>
            <span style={{marginLeft:"18px"}}>请选择街道</span>
            <a className="fr"><i className="img-arrow"></i></a>
          </div>
          <div className="row">
            <span className="black" style={{width:"60px",display:"inline-block"}}>详细地址</span>
            <input type="text" placeholder="请填写具体有效的地址" style={{ border:"0",marginLeft:"18px"}}/>
          </div>
          <div className="row">
            <span className="black">设为默认地址</span>
            <a className="fr"><i className="img-uncheck-addr"></i></a>
          </div>
          <div className="row" style={{textAlign:"center"}}>
            <a className="btn">保存</a>
          </div>

          <div className="dialog-wrapper receipt-dialog"
               style={{display: (this.state.showReceiptDialog ? '-webkit-box' : 'none')}}>
            <div className="dialog-content">
              <div className="head">
                <span className="head-title">完成</span>
                <span className="close-btn"/>
              </div>
              <div className="dialog-body">
                <select>
                  <option>湖北</option>
                </select>
                <select>
                  <option>武汉</option>
                </select>
                <select>
                  <option>洪山区</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default AddAddress;
