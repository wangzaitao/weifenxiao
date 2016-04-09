import React, { Component, PropTypes } from 'react';
import {browserHistory} from 'react-router';

import CustomLink from '../base/CustomLink.jsx';
import Dialog from '../base/Dialog.jsx';
import * as ContentAPI from '../../api/content';
import {APK} from '../../constants/Config';
import {parseCommand, isIntNumber} from '../../utils/common';

class CreditActivity extends Component {
  render () {
    var link, tips = isIntNumber(this.props.tips.toString()) ? '+' + this.props.tips : this.props.tips;
    if (this.props.command =='16#' || this.props.command =='17#') {
      var clickFunc = this.props.command == '16#' ? this.props.onCheckDailySign : this.props.onCheckShare;
      link = (
        <div data-enable={this.props.enable} className={"ac-link-item" + (this.props.enable ? ' enable' : ' disabled')} onTouchTap={clickFunc}>
          {tips}
        </div>
      )
    } else {
      if (this.props.enable) {
        link = (
          <CustomLink to={parseCommand(this.props.command) || '/'} isOuterURL={true}>
            <div className="ac-link-item enable">{tips}</div>
          </CustomLink>
        )
      } else {
        link = <div className="ac-link-item disabled">{tips}</div>;
      }
    }
    return (
      <li className="activity-item">
        <img src={this.props.icon} style={{width: '3em', height: '3em'}}/>
        <div className="ml10" style={{width: '66%'}}>
          <p style={{fontSize: '1.2em', color: '#333333'}}>{this.props.title}</p>
          <p style={{fontSize: '0.85em', color: '#999999'}}>{this.props.content}</p>
        </div>
        {link}
      </li>
    )
  }
}

class MyCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      activities: [],
      waiting: false,
      showDialog: false,
      dialogContent: '',
      dialogConfirm: '确认',
      dialogCancel: '',
      onDialogCloseFuc: () => {},
      onDialogConfirmFuc: () => {}
    };
  }
  componentWillMount () {
    ContentAPI.getMyCredit(function (data) {
      this.setState({total: data.total || 0, activities: data.category})
    }.bind(this));
    this._goToChargeRecord = this._goToChargeRecord.bind(this);
    this._closeDialog = this._closeDialog.bind(this);
    this._onExchangeCredit = this._onExchangeCredit.bind(this);
    this._onCheckDailySign = this._onCheckDailySign.bind(this);
    this._onCheckShare = this._onCheckShare.bind(this);
    this._downloadApk = this._downloadApk.bind(this);
  }
  _goToChargeRecord () {
    this.setState({showDialog: false, dialogContent: ''});
    browserHistory.push('/user/my_charge_record');
  }
  _closeDialog () {
    this.setState({showDialog: false, dialogContent: ''})
  }
  _onExchangeCredit () {
    if (this.state.waiting) return;
    this.state.waiting = true;
    if (this.state.total < 1000) {
      this.setState({
        showDialog: true,
        dialogContent: '积分不足，无法兑换。亲再多赚点吧～～',
        dialogConfirm: '确认',
        dialogCancel: '',
        onDialogConfirmFuc: this._closeDialog,
        waiting: false
      });
      return;
    }
    ContentAPI.exchangeMyCredit(function (data) {
      if (data.exchanged_credit) {
        this.setState({
          total: this.state.total - data.exchanged_credit,
          showDialog: true,
          dialogContent: '恭喜您成功用' + data.exchanged_credit + '积分兑换了' + data.added_price + '枚夺宝币，赶紧去夺宝吧！',
          dialogConfirm: '我知道啦',
          dialogCancel: '查看充值记录',
          onDialogCloseFuc: this._goToChargeRecord,
          onDialogConfirmFuc: this._closeDialog,
          waiting: false
        })
      } else {
        this.setState({
          showDialog: true,
          dialogContent: '积分兑换失败，请稍后重试～～',
          dialogCancel: '',
          dialogConfirm: '确认',
          onDialogConfirmFuc: this._closeDialog,
          waiting: false
        })
      }
    }.bind(this))
  }
  _onCheckDailySign (e) {
    var ele = $(e.target);
    if (ele.hasClass('disabled')) return;
    ContentAPI.checkCreditSign(function (data) {
      if (data.added_credit) {
        this.setState({
          total: this.state.total + data.added_credit,
          showDialog: true,
          dialogContent: '连续签到第' + data.continuous_times + '天，奖励' + data.added_credit + '积分',
          dialogConfirm: '确认',
          dialogCancel: '',
          onDialogConfirmFuc: this._closeDialog
        })
      } else {
        this.setState({
          showDialog: true,
          dialogContent: '每日签到失败，请稍后重试～～',
          dialogConfirm: '确认',
          dialogCancel: '',
          onDialogConfirmFuc: this._closeDialog
        })
      }
      ele.removeClass('enable').addClass('disabled');
    }.bind(this))
  }
  _downloadApk () {
    var link = $('<a>').attr('href', APK.CHANNELS['ofw']).attr('target', '_blank');
    link.appendTo('body').click();
    this.setState({showDialog: false, dialogContent: ''});
  }
  _onCheckShare (e) {
    if ($(e.target).attr('data-enable') === '0') return;
    this.setState({
      showDialog: true,
      dialogContent: '分享功能只能在客户端使用，是否下载一元购？',
      dialogConfirm: '确认',
      dialogCancel: '取消',
      onDialogCloseFuc: this._closeDialog,
      onDialogConfirmFuc: this._downloadApk
    })
  }

  render() {
    var activityEles = this.state.activities.map(function(item, index) {
      var eleList = [<div className="driver-header" key={index}>{item.title}</div>],
          acItems = item.credit_activity.map(function (ac, idx) {
            return <CreditActivity {...ac} key={index * 10 + idx} onCheckDailySign={this._onCheckDailySign} onCheckShare={this._onCheckShare}/>
          }.bind(this));
      eleList.push(<ul className={"activity-list" + (index + 1 == this.state.activities.length ? ' mb15' : '')}>{acItems}</ul>);
      return eleList;
    }.bind(this));

    var dialogProps = {
      clz: "dialog-center",
      confirm: this.state.dialogConfirm,
      content: this.state.dialogContent,
      show: this.state.showDialog,
      onCloseClick: this.state.onDialogCloseFuc,
      onConfirm: this.state.onDialogConfirmFuc
    };
    if (this.state.dialogCancel) dialogProps['cancel'] = this.state.dialogCancel;

    return (
      <div className="my-credit">
        <div className="total-count">
          <p className="total">{this.state.total}</p>
          <p className="desc">1000积分=1夺宝币</p>
        </div>
        <div className="links bb1-gray">
          <CustomLink to="/user/credit_details" className="link-item">
            <div>
              <i className="ico ico-ic_credit_detail"/>
              <p>积分详情</p>
            </div>
          </CustomLink>
          <a href="javascript:;" className="link-item" onTouchTap={this._onExchangeCredit}>
            <div>
              <i className="ico ico-ic_credit_exchange"/>
              <p>兑换夺宝币</p>
            </div>
          </a>
        </div>
        {activityEles}
        <Dialog {...dialogProps} />
      </div>
    );
  }
}

export default MyCredit;
