import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';
import Dialog from '../base/Dialog.jsx';
import CustomLink from '../base/CustomLink.jsx';

require('./discovery.css');

const MAP = {
  400: '红包已过期！',
  403: '红包已被抢光！',
  401: '已经抢过一次了！'
};

export default class RechargeCoupon extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentAmount: 0,
      levelList: [
        {level: 1, price: 20, count: 1, size: 1, status: -1},
        {level: 2, price: 50, count: 2, size: 1, status: -1},
        {level: 3, price: 100, count: 5, size: 1, status: -1},
        {level: 4, price: 200, count: 1, size: 2, status: -1},
        {level: 5, price: 400, count: 2, size: 2, status: -1},
        {level: 6, price: 800, count: 5, size: 2, status: -1},
        {level: 7, price: 1600, count: 1, size: 3, status: -1},
        {level: 8, price: 3200, count: 2, size: 3, status: -1},
        {level: 9, price: 6000, count: 5, size: 3, status: -1}
      ],
      isShowCouponList: false,
      couponList: [],
      showDialog: false,
      dialogContent: '红包领取失败！'
    };
  }

  componentWillMount(){
    this._getCampaign();
  }

  render(){
    let couponDom = [], couponDataItem, couponDomItem, openCouponDom,
      couponListWrapDom, couponListDom = [], couponListDataItem, couponListItem;

    for(let i=0,l=this.state.levelList.length; i<l; i++) {
      couponDataItem = this.state.levelList[i];
      if(couponDataItem.status === 1) {
        openCouponDom = <span className="opened-coupon-label">已领取</span>;
      } else if(couponDataItem.status === -1) {
        openCouponDom = <span className="open-coupon-btn">立即领取</span>;
      } else {
        openCouponDom = (
          <span className="open-coupon-btn" data-level={couponDataItem.level} onTouchTap={this._openCoupon.bind(this)}>立即领取</span>
        );
      }

      couponDomItem = (
        <div className="r-coupon-item-wrapper" key={i}>
          <div className="r-coupon-item">
            <div className="coupon-number">
              <span className={"coupon-type-" + couponDataItem.size}/>
              <span className="coupon-multip-icon">x</span>
              <span className="coupon-count">{couponDataItem.count}</span>
            </div>
            {openCouponDom}
            <div className="coupon-open-rules">
              充值<span className="rules-price">满{couponDataItem.price}元</span>即可领取
            </div>
            {couponDataItem.status === -1 && <div className="coupon-item-mask"></div>}
          </div>
        </div>
      );
      couponDom.push(couponDomItem);
    }

    if(this.state.isShowCouponList) {
      for(let i=0,l=this.state.couponList.length; i<l; i++) {
        couponListDataItem = this.state.couponList[i];
        couponListItem = (
          <div className="c-l-item" key={i}>
            <span className="i-price">{couponListDataItem.price}</span>
            <span className="i-amount">元</span>
            <span className="i-desc">{couponListDataItem.desc.split('元')[1]}</span>
            <span className="i-amount i-connect">x</span>
            <span className="i-price">1</span>
          </div>
        );
        couponListDom.push(couponListItem);
      }

      couponListWrapDom = (
        <div className="coupon-list">
          <div className="coupon-list-content">
            <div className="c-l-head"></div>
            <div className="c-l-body">{couponListDom}</div>
            <div className="c-l-ok-btn" onTouchTap={this._closeCoupon.bind(this)}>确定</div>
          </div>
        </div>
      );
    }

    return (
      <div className="recharge-coupon-wrapper">
        <img className="top-banner" src={require('../../img/discovery/chargecoupon/top_banner.jpg')} />
        <div className="r-duration">
          <span className="r-duration-icon fl"/>
          <span className="r-duration-icon fr"/>
          <div className="r-duration-text">2016-2-2 至 2016-2-22</div>
        </div>
        <div className="r-desc">
          活动期间，累计充值达到一定额度可以获取红包，拆开红包有超值大奖等你来拿。
        </div>
        <div className="r-current-charge-wrapper">
          <div className="r-current-charge">
            当前累计充值(
            <span className="r-current-amount">{this.state.currentAmount}</span>/6000)
          </div>
          <div className="r-current-charge-big">
            <span className="charge-big-text">{this.state.currentAmount}</span>
          </div>
        </div>
        <div className="r-recharge-btn" onTouchTap={this._goRecharge}>前往充值</div>
        <div className="r-coupon-display-wrapper">
          <div className="coupon-display-head">
            <span className="coupon-display-title">红包奖励</span>
          </div>
          <div className="coupon-display-body">
            {couponDom}
          </div>
        </div>
        <div className="r-instruction">
          <span className="r-instruction-title">规则说明</span>
          <p className="r-instruction-para">
            <span className="r-instruction-index">1.</span>
            活动期间累计充值达到<span className="r-instruction-mark">指定额度</span>即可开启红包奖励;
          </p>
          <p className="r-instruction-para">
            <span className="r-instruction-index">2.</span>
            开出的红包奖励可以在个人信息的<span className="r-instruction-mark">“我的红包”</span>界面查看;
          </p>
          <p className="r-instruction-para">
            <span className="r-instruction-index">3.</span>
            开出的红包有<span className="r-instruction-mark">使用有效期</span>，请及时使用;
          </p>
          <p className="r-instruction-para">
            <span className="r-instruction-index">4.</span>
            请在活动期间领取可以拆开的红包，活动结束后无法领取;
          </p>
          <p className="r-instruction-para">
            <span className="r-instruction-index">5.</span>
            本次活动最终解释权归一元购团队所有。
          </p>
        </div>
        {couponListWrapDom}
        <Dialog confirm="确认" content={this.state.dialogContent} show={this.state.showDialog}
                onConfirm={this._onDialogDone.bind(this)} onCloseClick={this._onDialogDone.bind(this)} />
      </div>
    );
  }

  _getCampaign(){
    ContentAPI.getCampaign(10011)
      .then(function(data){
        this.setState({
          currentAmount: data.current_amount || 0,
          levelList: data.level_list || this.state.levelList
        });
      }.bind(this));
  }

  _openCoupon(e){
    let level = parseInt(e.target.getAttribute('data-level'), 10);
    ContentAPI.activateCampaign(10011, level)
      .then(function(data){
        this.setState({
          isShowCouponList: true,
          couponList: data.coupon_list || []
        });
      }.bind(this))
      .catch(function(error){
        var status = error.message;
        this.setState({
          showDialog: true,
          dialogContent: MAP[status]
        });
      }.bind(this));
  }

  _closeCoupon(){
    this.setState({
      isShowCouponList: false,
      couponList: []
    });
    this._getCampaign();
  }

  _goRecharge(){
    if(window.yyg && window.yyg.goRecharge) {
      window.yyg.goRecharge();
    } else {
      window.location.href = '/user/charge';
    }
  }

  _onDialogDone(){
    this.setState({
      showDialog: false
    });
  }
}
