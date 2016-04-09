import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';
import {isPhoneNumber, isIntNumber} from '../../utils/common';
import {FillContent} from '../base/FillContent';
import Dialog from '../base/Dialog.jsx';
import CustomLink from '../base/CustomLink.jsx';

class GroupCoupon extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShowRules: false,
      isShowCoupon: false,
      showDialog: false,
      groupCouponId: this.props.params.group_coupon_id,
      couponResult: null,
      phoneNumber: null
    };
  }

  render(){
    let classes = 'group-coupon-wrapper',
      bodyDom, rulesDom, 
      failStr, failImg, encodePhoneNumber,
      couponResult = this.state.couponResult;

    if(this.state.isShowRules){
      rulesDom = (
        <div className="rules-wrapper">
          <div className="rules-content">
            <div className="r-head">
              <span className="r-head-title">活动说明</span>
              <span className="r-close-btn" onTouchTap={this._hideRules.bind(this)}/>
            </div>
            <div className="r-body">
              <p className="r-para">
                1. 已领取的红包将发放至您填写的手机号对应的一元购app账号中，请确保填写的手机号正确;
              </p>
              <p className="r-para">
                2. 红包的有效期为7天，请及时使用，逾期作废;
              </p>
              <div className="r-para">
                3. 红包可在一元购app中进行消费，可在用户的“我的红包”下查看和使用
              </div>
              <p className="r-para">
                4. 本次活动最终解释权归一元购团队所有。
              </p>
            </div>
          </div>
        </div>
      );
      classes += ' show-rules';
    }

    if(this.state.isShowCoupon) {
      if(couponResult.status != undefined){
        if(couponResult.status == 400){
          failStr = '红包过期啦';
          failImg = 'coupon_expired.png'
        } else if (couponResult.status == 401) {
          failStr = '您今天已经领过3次啦';
          failImg = 'three_times.png'
        } else {  // 403 or other status
          failStr = '红包已被抢光啦';
          failImg = 'coupon_empty.png'
        }
        bodyDom = (
          <div className="g-c-expire-body">
            <img className="expire-icon" src={require('../../img/discovery/sharecoupon/' + failImg)} />
            <div className="expire-title">{failStr}</div>
            <div className="expire-desc">加入一元购，一起来分享节日的喜悦吧！</div>
            <div className="go-home-btn red-btn" onTouchTap={this._goHome.bind(this)}>立即夺宝</div>
            <div className="rules-show expire" onTouchTap={this._showRules.bind(this)}>活动说明</div>
          </div>
        );
      } else if(couponResult) {
        encodePhoneNumber = this._encodePhoneNumber();
        bodyDom = (
          <div className="g-c-success-body">
            <div className="success-top">
              <div className="success-top-title">
                <span className="success-top-title-big">{couponResult.price}</span>元
              </div>
              <div className="success-top-desc">
                {couponResult.desc}
              </div>
              <div className="success-top-desc"></div>
            </div>
            <div className="success-middle">
              <div className="success-middle-title">
                恭喜您，获得{couponResult.price}元红包
              </div>
              <div className="success-middle-desc">
                已放入手机号{encodePhoneNumber}的账户中！
              </div>
              <div className="go-home-btn" onTouchTap={this._goHome.bind(this)}>参与一元购</div>
            </div>
            <div className="rules-show expire" onTouchTap={this._showRules.bind(this)}>活动说明</div>
          </div>
        );
      }

    }else{
      bodyDom = (
        <div className="g-c-body">
          <div className="g-c-packet-body">
            <input ref="phoneNumber" type="text" className="phone-number-input" placeholder="请输入手机号"
              onKeyDown={this._validateInput} onChange={this._validatePhoneNum}/>
            <div 
              className="snatch-coupon-btn"
              onTouchTap={this._snatchCoupon.bind(this)}>领取红包</div>
            <div className="rules-show" onTouchTap={this._showRules.bind(this)}>活动说明</div>
          </div>
        </div>
      );
    }

    return (
      <div className={classes}>
        <img className="top-banner" src={require('../../img/discovery/sharecoupon/group_banner.png')} />
        <div className="g-c-body-wrap">
          {bodyDom}
          {rulesDom}
        </div>
        <Dialog confirm="确认" content="您输入的手机号有误，请重新输入" show={this.state.showDialog}
          onCloseClick={this._onDialogDone.bind(this)} onConfirm={this._onDialogDone.bind(this)} />
      </div>
    );
  }

  _snatchCoupon(e){
    e.stopPropagation();
    e.preventDefault();
    var value = this.refs.phoneNumber.value;
    if(isPhoneNumber(value)){
      ContentAPI.snatchGroupCoupon(this.state.groupCouponId, value)
        .then(function(data){
          this.setState({
            isShowCoupon: true,
            couponResult: data,
            phoneNumber: value
          });
        }.bind(this))
        .catch(function(error) {
          this.setState({
            isShowCoupon: true,
            couponResult: {status: error.message},
            phoneNumber: value
          });
        }.bind(this));
    }else{
      this.setState({
        showDialog: true
      });
    }
  }

  _showRules(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      isShowRules: true
    });
  }

  _hideRules(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      isShowRules: false
    });
  }

  _goHome(e){
    e.stopPropagation();
    e.preventDefault();
    if(window.yyg && window.yyg.goHome){
      window.yyg.goHome();
    }else{
      window.location.href = '/';
    }
  }

  _encodePhoneNumber(){
    var number = this.state.phoneNumber,
      left, right;
    left = number.substr(0,3);
    right = number.substr(number.length-3, number.length);
    return left+'***'+right;
  }

  _onDialogDone(){
    this.setState({
      showDialog: false
    });
  }

  _validateInput(e){
    var keyCode, number;
    e = e || window.event;
    keyCode = e.keyCode || e.which;
    number = parseInt(String.fromCharCode(keyCode), 10);
    if(isNaN(number) && keyCode != 8){
      e.preventDefault();
      return false;
    }
  }

  _validatePhoneNum(e){
    var phoneNumber = e.target.value;
    if (!isIntNumber(phoneNumber)) {
      e.target.value = phoneNumber.replace(/[^0-9]/g, '');
    }
  }
}

export default FillContent(GroupCoupon);