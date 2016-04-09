import React, { Component, PropTypes } from 'react';

import Dialog from '../base/Dialog.jsx';
import TextInput from '../base/TextInput.jsx';
import * as ContentAPI from '../../api/content';
import {isPhoneNumber} from '../../utils/common';

require('./receiver.css');

class SubmitUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      phoneNumber: '',
      address: '',
      dialogContent: '',
      showDialog: false
    };
  }

  _onUsernameInputChange = (e) => {
    this.setState({username: e.target.value})
  };
  _onPhoneNumberInputChange = (e) => {
    this.setState({phoneNumber: e.target.value})
  };
  _onAddressInputChange = (e) => {
    this.setState({address: e.target.value})
  };
  _onDialogCancel = () => {
    this.setState({showDialog: false});
  };
  _onDialogDone = () => {
    this.setState({
      showDialog: false
    });
    ContentAPI.submitUserInfo(this.props.id, JSON.stringify({
      name: this.state.username,
      phone: this.state.phoneNumber,
      address: this.state.address
    }), function (success, msg) {
      if (success) {
        this.props.callback({name: this.state.username, phone: this.state.phoneNumber, address: this.state.address});
      } else {
        this.setState({
          dialogContent: msg,
          showDialog: true
        })
      }
    }.bind(this))
  };
  _onSubmitButtonPressed = () => {
    this.setState({
      dialogContent: '收货信息提交后无法修改，确认提交吗？',
      showDialog: true
    })
  };
  render () {
    var btnDisabled = (!this.state.username || !isPhoneNumber(this.state.phoneNumber) || !this.state.address);
    return (
      <div className="submit-user-info">
        <div className="item bb1-gray">
          为了保证商品能够顺利到达，请提供有效的联系电话、收件人名称、收件地址。
        </div>
        <div className="item bb1-gray">
          <span>收货人</span>
          <TextInput type="text" placeholder="请填写收货人姓名" onChange={this._onUsernameInputChange} />
        </div>
        <div className="item bb1-gray">
          <span>手机号</span>
          <TextInput type="text" placeholder="请填写收货人手机号" onChange={this._onPhoneNumberInputChange} />
        </div>
        <div className="item bb1-gray">
          <span>地&nbsp;&nbsp;&nbsp;址</span>
          <TextInput type="text" placeholder="请填写具体有效的收货地址" onChange={this._onAddressInputChange} />
        </div>
        <button className={"submit-btn " + (btnDisabled ? 'disabled' : '')} disabled={btnDisabled}
                onTouchTap={this._onSubmitButtonPressed}>确认提交</button>
        <div className="support-email">
          <p>如有疑问，请联系客服邮箱</p>
          <p className="red">yyg-kefu@qq.com</p>
        </div>
        <Dialog cancel="取消" confirm="确认" content={this.state.dialogContent} show={this.state.showDialog}
                onCloseClick={this._onDialogCancel} onConfirm={this._onDialogDone} />
      </div>
    )
  }
}

export default SubmitUserInfo;
