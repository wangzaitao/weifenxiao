import React from 'react';
import {browserHistory} from 'react-router';

import Dialog from '../base/Dialog.jsx';
import TextInput from '../base/TextInput.jsx';
import * as ContentAPI from '../../api/content';
import {isIntNumber, isPhoneNumber} from '../../utils/common';

class ForgetPassword extends React.Component {
  counter;
  state = {
    phoneNumber: '',
    SMSCode: '',
    isGetSMSDisabled: true,
    isNextDisabled: true,
    getSMSButtonTitle: '获取验证码',
    isSMSCoolDown: false,
    dialogContent: '',
    showDialog: false
  };

  render() {
    return (
      <div className="forget-password-container">
        <div className="phone input-item">
          <span>手机号</span>
          <TextInput type="text" placeholder="+86" onChange={this._onPhoneTextFieldChange} />
        </div>
        <div className="sms-code input-item">
          <span>验证码</span>
          <TextInput type="text" styles={{width: '40%'}} onChange={this._onSMSCodeTextFieldChange} />
          <button className={"get-sms-code " + (this.state.isGetSMSDisabled ? 'btn-disabled' : '')} disabled={this.state.isGetSMSDisabled} onTouchTap={this._onGetSMSButtonPressed}>
            {this.state.getSMSButtonTitle}
          </button>
        </div>
        <button className={"next-step-btn " + (this.state.isNextDisabled ? 'btn-disabled' : '')} disabled={this.state.isNextDisabled} onTouchTap={this._onNextButtonPressed}>下一步</button>

        <Dialog confirm="确认" content={this.state.dialogContent} show={this.state.showDialog}
                onCloseClick={this._onDialogDone} onConfirm={this._onDialogDone} />
      </div>
    );
  }

  componentWillUnmount () {
    clearInterval(this.counter);
  }
  _onDialogDone = () => {
    this.setState({showDialog: false});
  };
  _onPhoneTextFieldChange = (e) => {
    var phoneNumber = e.target.value;
    if (!isIntNumber(phoneNumber) && phoneNumber !== '') {
      e.target.value = phoneNumber.slice(0, this.state.phoneNumber.length);
    } else {
      if (isPhoneNumber(phoneNumber) && !this.state.isSMSCoolDown) {
        this.setState({
          phoneNumber: phoneNumber,
          isGetSMSDisabled: false
        })
      } else {
        this.setState({
          phoneNumber: phoneNumber,
          isGetSMSDisabled: true
        })
      }
    }
  };
  _onSMSCodeTextFieldChange = (e) => {
    var SMSCode = e.target.value;
    if (SMSCode.length === 6) {
      this.setState({
        SMSCode: SMSCode,
        isNextDisabled: false
      })
    } else {
      this.setState({
        isNextDisabled: true
      })
    }
  };
  _onGetSMSButtonPressed = () => {
    if (!isPhoneNumber(this.state.phoneNumber)) {
      this.setState({
        showDialog: true,
        dialogContent: '请输入有效的手机号'
      });
      return;
    }
    ContentAPI.getSMSCode({'phone': this.state.phoneNumber, use: 'changepwd'}, function (success, msg) {
      if (success) {
        this.setState({
          isSMSCoolDown: true,
          isGetSMSDisabled: true,
          getSMSButtonTitle: '60 秒后重新获取'
        });
        var total = 60;
        this.counter = setInterval(function () {
          total -= 1;
          this.setState({
            getSMSButtonTitle: total + ' 秒后重新获取'
          });
          if (total === 0) {
            clearInterval(this.counter);
            this.setState({
              isSMSCoolDown: false,
              isGetSMSDisabled: false,
              getSMSButtonTitle: '获取验证码'
            });
          }
        }.bind(this), 1000);
      }
      this.setState({
        showDialog: true,
        dialogContent: msg
      })
    }.bind(this));
  };
  _onNextButtonPressed = () => {
    var data = JSON.stringify({phone: this.state.phoneNumber, auth_code: this.state.SMSCode});
    ContentAPI.verifySMSCode(data, function (isAuthorized) {
      if (isAuthorized) {
        browserHistory.push({pathname: '/new_password', state: {phone: this.state.phoneNumber, smsCode: this.state.SMSCode}});
      } else {
        this.setState({
          showDialog: true,
          dialogContent: "验证码错误"
        });
      }
    }.bind(this));
  };
}

export default ForgetPassword;
