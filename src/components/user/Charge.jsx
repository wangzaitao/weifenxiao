import React from 'react';

import Dialog from '../base/Dialog.jsx';
import {isIntNumber} from '../../utils/common';
import * as ContentAPI from '../../api/content';
import * as GlobalConfig from '../../constants/Config';

class Charge extends React.Component {
  constructor(props) {
    super(props);
    var defaultPayType = (G.chn === GlobalConfig.CHANNELS.YOUXIN ? GlobalConfig.PT_UXIN_WAP : GlobalConfig.PT_IPAY_WAP);
    this.state = {
      amount: '20',
      payType: defaultPayType,
      isPaying: false,
      isInputDisabled: (defaultPayType === GlobalConfig.PT_WEPAY_WAP),
      allowPayTypes: [],
      showDialog: false,
      returnUrl: ''
    };
  }
  componentWillMount () {
    ContentAPI.getPayTypes({platform: 'web', version_code: (G.versionCode || '1'), locale: 'cn', chn: (G.chn || '')}, function (types) {
      var payTypes = types.map(function (item) {
        return item.pay_type;
      });
      this.setState({allowPayTypes: payTypes})
    }.bind(this));
    this.onAmountItemClick = this.onAmountItemClick.bind(this);
    this.onAmountInputChange = this.onAmountInputChange.bind(this);
    this.onPayTypeSelectClick = this.onPayTypeSelectClick.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onConfirmDialog = this.onConfirmDialog.bind(this);
  }
  onAmountItemClick (e) {
    var currentEle = $(e.currentTarget);
    if (currentEle.hasClass('selected') || currentEle.attr('disabled')) {
      return false;
    } else {
      $('.amount-item.selected').removeClass('selected').val("");
      currentEle.addClass('selected');
      currentEle.val("");
      if (currentEle.text()) {
        this.setState({amount: currentEle.text()})
      } else {
        this.setState({amount: ''})
      }
    }
  }
  onAmountInputChange (e) {
    var inputValue = e.target.value;
    if (!isIntNumber(inputValue) && inputValue !== '') {
      e.target.value = inputValue.slice(0, this.state.amount.length);
    } else {
      this.setState({amount: inputValue})
    }
  }
  onPayTypeSelectClick (e) {
    var currentEle = $(e.currentTarget);
    if (currentEle.hasClass('ico-checkbox')) {
      return false;
    } else {
      var newPayType = parseInt(currentEle.attr('value'));
      this.setState({
        payType: newPayType,
        isInputDisabled: (newPayType === GlobalConfig.PT_WEPAY_WAP)
      });
      if (newPayType === GlobalConfig.PT_WEPAY_WAP) {
        $('.amount-item.first').click();
      }
    }
  }
  onConfirmClick () {
    var amount = parseInt(this.state.amount) || 0;
    if (!amount) {
      return false;
    } else {
      this.setState({isPaying: true});
      ContentAPI.getPayID({type: this.state.payType}, function (payId) {
        if (payId) {
          var returnUrl = window.location.origin + '/user/charge_result/' + payId;
          ContentAPI.submitPay({
            pay_id: payId,
            pay_amount: amount,
            return_url: returnUrl,
            cancel_url: window.location.href
          }, function (data) {
            if (Object.keys(data).length) {
              if (this.state.payType === GlobalConfig.PT_ALIPAY_WAP) {  // alipay web
              } else if (this.state.payType === GlobalConfig.PT_WEPAY_WAP) {  // wepay web
              } else if (this.state.payType === GlobalConfig.PT_IPAY_WAP) {  // ipay web
                var url = GlobalConfig.IPAY_REDIRECT_URL.replace('{%sign_string%}', encodeURIComponent(data.charge.sign))
                    .replace('{%trans_data%}', encodeURIComponent(data.charge.transdata)).replace('{%sign_type%}', data.charge.signtype);
                window.location.href = url;
              } else if (this.state.payType === GlobalConfig.PT_UXIN_WAP) {  // uxin native
                this.setState({showDialog: true, returnUrl: returnUrl});
                if (window.JsInterface) {
                  window.JsInterface.callNativePay(JSON.stringify(data.charge.credential.alipay));
                }
              } else if (this.state.payType === GlobalConfig.PT_IPAYNOW_WAP) {
                window.location.href = data.charge.url;
              }
              this.setState({isPaying: false});
            } else {
              console.log("Submit pay failed!");
              this.setState({isPaying: false});
            }
          }.bind(this))
        } else {
          console.log("Get pay ID failed!");
          this.setState({isPaying: false});
        }
      }.bind(this));
    }
  }
  onCloseDialog () {
    this.setState({showDialog: false})
  }
  onConfirmDialog () {
    window.location.href = this.state.returnUrl;
  }

  render() {
    var payTypeItems = this.state.allowPayTypes.map(function (item, index) {
      var payTypeInfos = GlobalConfig.PAY_TYPES[item];
      return (
        <div className="pay-type-item" key={index}>
          <i className={"ico ico-" + payTypeInfos.iconClass} />
          <span className="ml16">{payTypeInfos.name}</span>
          {payTypeInfos.comment ? <span className="gray fs14">{' (' + payTypeInfos.comment + ')'}</span> : undefined}
          <i className={"pay-type-select fr ico ico-" + (this.state.payType == item ? 'checkbox' : 'uncheck')} value={item} onTouchTap={this.onPayTypeSelectClick} />
        </div>
      );
    }.bind(this));

    return (
      <div className="bgc-white user-charge">
        <p className="item"><span className="red">说明：</span> 充值金额用于购买夺宝币， 1元 = 1夺宝币， 充值款项无法退回。</p>
        <div className="item">
          <p>选择充值金额(元)</p>
          <div className="amount-list">
            <span className="amount-item mr selected first" onTouchTap={this.onAmountItemClick}>20</span>
            <span className="amount-item mr" onTouchTap={this.onAmountItemClick}>50</span>
            <span className="amount-item" onTouchTap={this.onAmountItemClick}>100</span>
            <span className="amount-item mr" onTouchTap={this.onAmountItemClick}>200</span>
            <span className="amount-item mr" onTouchTap={this.onAmountItemClick}>500</span>
            <input type="text" className="amount-item" placeholder="其他金额" disabled={this.state.isInputDisabled} onTouchTap={this.onAmountItemClick} onChange={this.onAmountInputChange} />
          </div>
        </div>
        <div className="item">
          <p>支付方式选择</p>
          <div className="mb8">{payTypeItems}</div>
        </div>
        <button className={"confirm-charge " + (this.state.isPaying ? 'btn-disabled' : '')} disabled={this.state.isPaying} onTouchTap={this.onConfirmClick}>
          {this.state.isPaying ? '正在充值...' : '立即充值'}
        </button>
        <Dialog clz="dialog-center" confirm="已支付并查看" cancel="更换支付方式" content="请根据您的支付情况，选择下面的按钮" show={this.state.showDialog}
                onCloseClick={this.onCloseDialog} onConfirm={this.onConfirmDialog} />
      </div>
    );
  }
}

export default Charge;
