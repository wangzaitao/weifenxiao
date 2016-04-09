import React from 'react';
import {browserHistory} from 'react-router';

import Dialog from '../base/Dialog.jsx';
import TextInput from '../base/TextInput.jsx';
import * as ContentAPI from '../../api/content';

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    var locationState = this.props.location.state || {};
    this.state = {
      phoneNumber: locationState.phone || '',
      SMSCode: locationState.smsCode || '',
      password: '',
      dialogContent: '',
      showDialog: false
    };
    console.log(this)
  }

  _onDialogDone = () => {
    this.setState({showDialog: false});
  };
  _onPasswordTextFieldChange = (e) => {
    this.setState({password: e.target.value})
  };
  _onConfirmButtonPressed = () => {
    if (!this.state.password || this.state.password.length < 6 || this.state.password.length > 20) {
      this.setState({
        showDialog: true,
        dialogContent: !this.state.password ? '请输入密码' : '密码长度必须6～20位'
      });
      return;
    }

    var data = JSON.stringify({
      phone: this.state.phoneNumber,
      auth_code: this.state.SMSCode,
      password: this.state.password
    });
    ContentAPI.changePassword(data, function (success, msg) {
      if (success) {
        browserHistory.push('/login');
      } else {
        this.setState({
          showDialog: true,
          dialogContent: msg
        });
      }
    }.bind(this));
  };
  componentWillMount () {
    if (!this.state.phoneNumber || !this.state.SMSCode) {
      browserHistory.push('/forget_password');
    }
  }

  render() {
    return (
      <div className="new-password-container">
        <div className="new-password input-item">
          <span>新密码</span>
          <TextInput type="password" placeholder="6~20位字母数字组合" onChange={this._onPasswordTextFieldChange} />
        </div>
        <a href="javascript:;" className="confirm-btn" onTouchTap={this._onConfirmButtonPressed}>
          <div>确&nbsp;定</div>
        </a>
        <Dialog confirm="确认" content={this.state.dialogContent} show={this.state.showDialog}
              onCloseClick={this._onDialogDone} onConfirm={this._onDialogDone} />
      </div>
    );
  }

}

export default NewPassword;
