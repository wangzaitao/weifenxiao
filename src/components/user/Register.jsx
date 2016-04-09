import React from 'react';

import CustomLink from '../base/CustomLink.jsx';
import Dialog from '../base/Dialog.jsx';
import TextInput from '../base/TextInput.jsx';
import * as ContentAPI from '../../api/content';
import * as GlobalConfig from '../../constants/Config';
import Auth from '../../api/auth';
import {isIntNumber, isPhoneNumber} from '../../utils/common';

class Register extends React.Component {
  counter;
  baseImageCodeSrc = GlobalConfig.API.HOST + GlobalConfig.API.GET_IMG_CODE;
  state = {
    phoneNumber: '',
    SMSCode: '',
    password: '',
    inviterID: '',
    isGetSMSDisabled: true,
    dialogContent: '',
    showDialog: false,
    getSMSButtonTitle: '获取验证码',
    isSMSCoolDown: false,
    isAgreeChecked: true,
    showImgCode: false,
    showImgCodeError: false,
    imgCode: '',
    imgCodeSrc: ''
  };

  componentWillUnmount () {
    clearInterval(this.counter);
  }
  _onPhoneTextFieldChange = (e) => {
    var phoneNumber = e.target.value;
    if (!isIntNumber(phoneNumber) && phoneNumber !== '') {
      e.target.value = phoneNumber.slice(0, this.state.phoneNumber.length);
    } else {
      this.setState({
        phoneNumber: phoneNumber,
        imgCodeSrc: this.baseImageCodeSrc + '?phone=' + phoneNumber + '&ts=' + Math.round(new Date().getTime()/1000),
        isGetSMSDisabled: (!isPhoneNumber(phoneNumber) || this.state.isSMSCoolDown)
      })
    }
  };
  _onSMSCodeTextFieldChange = (e) => {
    this.setState({SMSCode: e.target.value})
  };
  _onPasswordTextFieldChange = (e) => {
    this.setState({password: e.target.value})
  };
  _onInviterIDTextFieldChange = (e) => {
    var inviterID = e.target.value;
    if (!isIntNumber(inviterID) && inviterID !== '') {
      e.target.value = inviterID.slice(0, this.state.inviterID.length);
    } else {
      this.setState({inviterID: inviterID})
    }
  };
  _onImgCodeFieldChange = (e) => {
    this.setState({imgCode: e.target.value, showImgCodeError: false})
  };
  _onChangeImageCode = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      imgCodeSrc: this.baseImageCodeSrc + '?phone=' + this.state.phoneNumber + '&ts=' + Math.round(new Date().getTime()/1000)
    })
  };
  _onCloseImageCode = (e) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState({showImgCode: false})
  };
  _onConfirmImageCode = (e) => {
    e.stopPropagation();
    e.preventDefault();
    ContentAPI.verifyImgCode({phone: this.state.phoneNumber, code: this.state.imgCode}, function (success) {
      if (success) {
        this.setState({
          isSMSCoolDown: true,
          isGetSMSDisabled: true,
          getSMSButtonTitle: '60 秒后重新获取',
          showImgCode: false,
          showDialog: true,
          dialogContent: '短信已发送, 请查收'
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
      } else {
        this.setState({
          imgCode: '',
          showImgCodeError: true,
          imgCodeSrc: this.baseImageCodeSrc + '?phone=' + this.state.phoneNumber + '&ts=' + Math.round(new Date().getTime()/1000)
        })
      }
    }.bind(this))
  };
  _onAgreeCheckboxChange = () => {
    this.setState({isAgreeChecked: !this.state.isAgreeChecked})
  };
  _onGetSMSButtonPressed = () => {
    if (!isPhoneNumber(this.state.phoneNumber)) {
      this.setState({showDialog: true, dialogContent: '无效的手机号'});
      return;
    }

    ContentAPI.getSMSCode({'phone': this.state.phoneNumber, use: 'register'}, function (success, msg, showImgCode) {
      if (success && showImgCode) {
        this.setState({
          showImgCode: true,
          imgCodeSrc: this.baseImageCodeSrc + '?phone=' + this.state.phoneNumber + '&ts=' + Math.round(new Date().getTime()/1000)
        });
        return
      } else if (success) {
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
  _onDialogDone = () => {
    this.setState({showDialog: false});
  };
  _onRegisterButtonPressed = () => {
    if (!this.state.isAgreeChecked) {
      this.setState({
        showDialog: true,
        dialogContent: '必须同意服务协议'
      });
      return;
    } else if (!isPhoneNumber(this.state.phoneNumber)) {
      this.setState({
        showDialog: true,
        dialogContent: '请输入有效的手机号'
      });
      return;
    } else if (!this.state.password || this.state.password.length < 6 || this.state.password.length > 20) {
      this.setState({
        showDialog: true,
        dialogContent: !this.state.password ? '请输入密码' : '密码长度必须6～20位'
      });
      return;
    } else if (!this.state.SMSCode) {
      this.setState({
        showDialog: true,
        dialogContent: '请输入验证码'
      });
      return;
    }

    var data = JSON.stringify({
      phone: this.state.phoneNumber,
      password: this.state.password,
      auth_code: this.state.SMSCode,
      inviter_id: this.state.inviterID
    });
    ContentAPI.register(data, function (success, msg) {
      if (success) {
        // auto login
        Auth.login(this.state.phoneNumber, this.state.password, function () {
          window.location.href = '/?show_tips=1'
        }.bind(this));
      } else {
        this.setState({
          showDialog: true,
          dialogContent: msg
        })
      }
    }.bind(this));
  };

  render() {
    return (
      <div className="register-container">
        <div className="register-banner">
          <img src={require('../../img/register-banner.png')} style={{width: '100%'}} />
        </div>
        <div className="phone input-item">
          <span>手机号</span>
          <TextInput type="text" placeholder="+86" onChange={this._onPhoneTextFieldChange} />
        </div>
        <div className="sms-code input-item">
          <span>验证码</span>
          <TextInput type="text" styles={{width: '40%'}} onChange={this._onSMSCodeTextFieldChange} />
          <button className={"get-sms-code " + (this.state.isGetSMSDisabled ? 'btn-disabled' : '')} disabled={this.state.isGetSMSDisabled} onTouchTap={this._onGetSMSButtonPressed}>{this.state.getSMSButtonTitle}</button>
        </div>
        <div className="password input-item">
          <span>密&nbsp;&nbsp;&nbsp;码</span>
          <TextInput type="password" placeholder="6~20位字母数字组合" onChange={this._onPasswordTextFieldChange} />
        </div>
        <div className="inviter-id input-item">
          <span>邀请码</span>
          <TextInput type="text" placeholder="邀请人ID（选填）" onChange={this._onInviterIDTextFieldChange} />
        </div>
        <div className="agree-protocol gray mt10 ml10">
          <input type="checkbox" checked={this.state.isAgreeChecked} className={"agree-cb ico ico-" + (this.state.isAgreeChecked ? 'checkbox' : 'uncheck')} onChange={this._onAgreeCheckboxChange}/>
          <label>我已阅读并同意</label>
          <CustomLink to="/protocol" className="red ml10" isOuterURL={true}>服务协议</CustomLink>
        </div>
        <a href="javascript:;" className="register-btn" onTouchTap={this._onRegisterButtonPressed}>
          <div>注&nbsp;册</div>
        </a>
        <p className="gray statement">郑重承诺：我们将对您的个人信息<span className="red">严格保密</span>，绝不向第三方透露，绝不会造成骚扰电话或垃圾短信，敬请监督！</p>
        {this.state.showImgCode ?
          <div className="img-code-container">
            <div className="img-code">
              <p>为了保障您的账号安全，请您先输入下方的图形验证码，不区分大小写。</p>
              <div style={{marginTop: '0.8em'}}>
                <span style={{display: 'table-cell', width: '20%'}}>验证码：</span>
                <div style={{display: 'table-cell', paddingLeft: '0.5em'}}>
                  <input type="text" placeholder="请输入验证码" onChange={this._onImgCodeFieldChange} />
                  <p className="red error" style={{display: (this.state.showImgCodeError ? 'block' : 'none')}}>验证错误，请重试</p>
                  <div style={{margin: '0.8em 0'}}>
                    <img className="inline-block" src={this.state.imgCodeSrc}/>
                    <button className="change-img-code" onTouchTap={this._onChangeImageCode}>换一张</button>
                  </div>
                </div>
              </div>
              <div style={{textAlign: 'center'}}>
                <button className="dialog-button action link" onTouchTap={this._onCloseImageCode}>取消</button>
                <button className="dialog-button action danger" onTouchTap={this._onConfirmImageCode}>确认</button>
              </div>
            </div>
          </div> : undefined
        }
        <Dialog confirm="确认" content={this.state.dialogContent} show={this.state.showDialog}
                onCloseClick={this._onDialogDone} onConfirm={this._onDialogDone} />
      </div>
    );
  }
}

export default Register;
