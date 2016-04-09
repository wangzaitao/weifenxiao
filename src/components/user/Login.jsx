import React from 'react';
import CustomLink from '../base/CustomLink.jsx';
import {browserHistory} from 'react-router';

import Dialog from '../base/Dialog.jsx';
import TextInput from '../base/TextInput.jsx';
import Auth from '../../api/auth';
import {isIntNumber, isPhoneNumber} from '../../utils/common';
import * as GlobalConfig from '../../constants/Config';

class Login extends React.Component {
  state = {
    phoneNumber: '',
    password: '',
    dialogContent: '',
    showDialog: false,
    fromURL: this.props.location.query.from
  };

  render() {
    return (
      <div className="login-container">
        <div className="phone input-item">
          <span>手机号</span>
          <TextInput type="text" placeholder="+86" onChange={this._onPhoneTextFieldChange} />
        </div>
        <div className="password input-item">
          <span>密&nbsp;&nbsp;&nbsp;码</span>
          <TextInput type="password" placeholder="6~20位字母数字组合" onChange={this._onPasswordTextFieldChange} />
        </div>
        <div className="forget-password mt20">
          <CustomLink to="/forget_password" className="gray underline" style={{marginLeft: '77%'}}>忘记密码?</CustomLink>
        </div>
        <a href="javascript:;" className="login-btn" onTouchTap={this._onLoginButtonPressed}>
          <div>登&nbsp;录</div>
        </a>
        <CustomLink to="/register" className="register-btn">
          <div>注&nbsp;册</div>
        </CustomLink>
        <Dialog confirm="确认" content={this.state.dialogContent} show={this.state.showDialog}
                onCloseClick={this._onDialogDone} onConfirm={this._onDialogDone} />
      </div>
    );
  }

  _onPhoneTextFieldChange = (e) => {
    var phoneNumber = e.target.value;
    if (!isIntNumber(phoneNumber) && phoneNumber !== '') {
      e.target.value = phoneNumber.slice(0, this.state.phoneNumber.length);
    } else {
      this.state.phoneNumber = phoneNumber;
    }
  };
  _onPasswordTextFieldChange = (e) => {
    this.state.password = e.target.value;
  };
  _onLoginButtonPressed = () => {
    if (!isPhoneNumber(this.state.phoneNumber)) {
      this.setState({
        showDialog: true,
        dialogContent: '无效的手机号'
      });
      return;
    } else if (!this.state.password || this.state.password.length < 6 || this.state.password.length > 20) {
      this.setState({
        showDialog: true,
        dialogContent: !this.state.password ? '请输入密码' : '密码长度必须6～20位'
      });
      return;
    }

    Auth.login(this.state.phoneNumber, this.state.password, function (success, msg) {
      if (success) {
        if (!this.state.fromURL) {
          browserHistory.push('/user')
        } else {
          window.location.href = this.state.fromURL
        }
      } else {
        this.setState({
          showDialog: true,
          dialogContent: msg
        });
      }
    }.bind(this));
  };
  _onDialogDone = () => {
    this.setState({
      showDialog: false
    });
    if (this.state.dialogContent === GlobalConfig.ERROR_CODES[120]) {
      browserHistory.push('/register');
    }
  };
}

export default Login;
