import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';
import Auth from '../../api/auth';
import {AddToCart} from '../base/AddToCart.jsx';
import Dialog from '../base/Dialog.jsx';
import CountdownTimer from '../base/CountdownTimer.jsx';
import {toast} from '../../utils/toast';

require('./discovery.css');

const WEALTHY_GOD_CAMPAIGN_ID = 40010;
const MAP = {
  400: '红包已过期！',
  403: '红包已被抢光！',
  401: '已经抢过一次了！'
};
const COUPON_MAP = {
  1: '价值1～8元红包',
  2: '价值10～18元红包',
  3: '价值100～188元红包'
};
const BTN_MAP = {
  1: '本次免费',
  2: '消耗1夺宝币',
  3: '消耗10夺宝币'
};
const DEFAULT_LEVEL_LIST = [
  {
    "status": 0,
    "level": 1
  },
  {
    "status": 0,
    "level": 2
  },
  {
    "status": 0,
    "level": 3
  }
];
const ROTATE_CLASS = 'rotate-y';

class GodRecommendItem extends Component {
  render(){
    const props = this.props;

    return (
      <div className="w-g-list-item">
        <div className="w-g-list-item-body">
          <div className="w-g-placeholder hide"></div>
          <div className="w-g-placeholder-sibling">
            <img className="g-r-i-img" src={props.goods.cover} />
            <div className="txt-one-line g-r-i-name">{props.goods.name}</div>
            <div className="g-r-add-cart-btn" onTouchTap={this._editCart.bind(this)}>加入清单</div>
            { props.has_winned &&
              <div className="g-r-has-winned"></div>
            }
          </div>
        </div>
      </div>
    );
  }

  _editCart(e){
    e.preventDefault;
    this.props.editCart.bind(this)(e);
  }
}

const WrapedGodRecommendItem = AddToCart(GodRecommendItem);

class WealthyGod extends Component {
  constructor(props){
    super(props);
    this.state = {
      freshTimes: 0,
      levelList: DEFAULT_LEVEL_LIST,
      activityList: null,
      isShowRules: false,
      isShowCouponList: false,
      couponList: [],
      showDialog: false,
      dialogContent: '红包领取失败！',
      isAnimate: false
    };
  }

  componentWillMount(){
    this._getCampaign();
  }

  shouldComponentUpdate(nextProps, nextState){
    return !nextState.isAnimate;
  }

  render(){
    let activityListDom, btnDom, couponDom, rulesDom, topTitleDom,
      couponListWrapDom, couponListDom = [], couponListDataItem, couponListItem;
    const activityList = this.state.activityList,
      levelList = this.state.levelList,
      freshTimes = this.state.freshTimes,
      countdownRemain = this._getCountdownRemain();

    if(!activityList){
      return null;
    }

    if(activityList.length === 0){
      activityListDom = (
        <div className="w-g-list-first">
          <div className="w-g-list-item">
            <div className="w-g-list-item-body">
              <div className="w-g-placeholder hide"></div>
              <img className="w-g-list-item-img" src={require('../../img/discovery/wealthy_god/img_meet_god_wealth.png')} />
            </div>
          </div>
          <div className="w-g-list-item">
            <div className="w-g-list-item-body">
              <div className="w-g-placeholder hide"></div>
              <img className="w-g-list-item-img" src={require('../../img/discovery/wealthy_god/img_winning.png')} />
            </div>
          </div>
          <div className="w-g-list-item">
            <div className="w-g-list-item-body">
              <div className="w-g-placeholder hide"></div>
              <img className="w-g-list-item-img" src={require('../../img/discovery/wealthy_god/img_get_red_packet.png')} />
            </div>
          </div>
        </div>
      );
    }else{
      activityListDom = activityList.map((item, index) =>{
        return (<WrapedGodRecommendItem {...item} key={index} isAnimate={this.state.isAnimate} /> );
      });
    }

    topTitleDom = (
      <div className="countdown-wrap">
        <span className="countdown-text">祈福结束倒计时：</span>
        <CountdownTimer remain={countdownRemain} isDisableMilliseconds={true}/>
      </div>
    );

    if(freshTimes === 0){
      btnDom = <div className="w-g-refresh-btn" onTouchTap={this._refreshCampaign.bind(this)}>祈福</div>;
      topTitleDom = <span>－举头三尺有神明 中奖还有红包领－</span>
    }else if(freshTimes >= 1 && freshTimes <= 3){
      //祈福后
      btnDom = (
        <div>
          <div className="w-g-refresh-btn" onTouchTap={this._refreshCampaign.bind(this)}>换一批</div>
          <span className="w-g-refresh-text">{BTN_MAP[freshTimes]}</span>
        </div>
      );
    }else{
      btnDom = <div className="w-g-no-refresh-btn">刷新次数已用完</div>;
    }

    couponDom = levelList.map((item, index) =>{
      let couponBtn, 
        couponCountStr = '中'+item.level+'个';
      if(item.status === 2){ //0:未达成, 1:已达成，未领取, 2:已领取
        couponBtn = <div className="opened-coupon-btn"></div>;
      }else{
        couponBtn = <div className="w-g-open-coupon-btn" onTouchTap={this._openCoupon.bind(this, item)}></div>;
      }
      return (
        <div key={index} className="w-g-coupon-item">
          <div className="w-g-c-i-banner">
            <span className="w-g-c-i-count">{couponCountStr}</span>
          </div>
          <div className="w-g-c-i-desc">{COUPON_MAP[item.level]}</div>
          {couponBtn}
        </div>
      );
    });

    if(this.state.isShowRules){
      rulesDom = (
        <div className="w-g-rules rules-wrapper">
          <div className="rules-content">
            <div className="r-head">
              <span className="r-head-title">活动说明</span>
              <span className="r-close-btn" onTouchTap={this._hideRules.bind(this)}/>
            </div>
            <div className="r-body">
              <p className="r-para">
                1. 每个用户每天只能祈福1次;
              </p>
              <p className="r-para">
                2. 祈福后会获得3个商品的指引，可以刷新商品进行更换，已中奖的商品无法刷新;
              </p>
              <p className="r-para">
                3. 每天最多可以刷新3次，第一次免费，第二次消耗1夺宝币，第三次消耗10夺宝币;
              </p>
              <p className="r-para">
                4. 财神当前制定的商品中奖后即可领取红包奖励，中奖商品越多，可领取的红包奖励越大;
              </p>
              <p className="r-para">
                5. 每日祈福会在第二天8:00结束，活动结束后商品和奖励都会清空，请注意及时领取活动奖励。
              </p>
            </div>
          </div>
        </div>
      );
    }

    if(this.state.isShowCouponList) {
      for(let i=0,l=this.state.couponList.length; i<l; i++) {
        couponListDataItem = this.state.couponList[i];
        couponListItem = (
          <div className="w-c-l-item" key={i}>
            <span className="w-i-price">{couponListDataItem.price}元</span>
            <span className="w-i-desc">{couponListDataItem.desc}</span>
            <span className="w-i-price">x1</span>
          </div>
        );
        couponListDom.push(couponListItem);
      }

      couponListWrapDom = (
        <div className="coupon-list">
          <div className="w-coupon-list-content">
            <img className="w-popup-banner" src={require('../../img/discovery/wealthy_god/popup_banner.png')} />
            <div className="w-coupon-list-body">
              <div className="w-c-l-head">恭喜获得</div>
              <div className="w-c-l-body">{couponListDom}</div>
              <div className="w-c-l-ok-btn" onTouchTap={this._closeCoupon.bind(this)}>确定</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="wealthy-god-wrapper">
        <div className="w-g-rule-btn" onTouchTap={this._showRules.bind(this)}>活动说明</div>
        <img className="top-banner" src={require('../../img/discovery/wealthy_god/top_banner.png')} />
        <div className="w-g-top-wrap">
          <div className="w-g-top-title">
            {topTitleDom}
          </div>
          <div className="red-rect"></div>
          <div className="w-g-list-wrapper">
            <div className="w-g-border-img"></div>
            <div className="w-g-list-body">
              {activityListDom}
            </div>
            <div className="w-g-border-img"></div>
          </div>
          {btnDom}
        </div>
        <div className="w-g-coupon-wrapper">
          <img className="extended-img w-g-coupon-banner" src={require('../../img/discovery/wealthy_god/img_reward.png')} />
          <div className="w-g-coupon">
            {couponDom}
          </div>
        </div>
        <div className="w-g-footer">
          财神提示：单个商品参与人次越多，中奖概率越大～
        </div>
        {rulesDom}
        {couponListWrapDom}
        <Dialog confirm="确认" content={this.state.dialogContent}
          show={this.state.showDialog} onConfirm={this._onDialogDone.bind(this)}
          onCloseClick={this._onDialogDone.bind(this)} />
      </div>
    );
  }

  _getCountdownRemain(){
    const now = new Date(),
      year = now.getFullYear(),
      mouth = now.getMonth(),
      day = now.getDate(),
      hours = now.getHours();
    let tommorrow;
    if(hours >= 8){
      tommorrow = new Date(year, mouth, day+1, 8);
    }else{
      tommorrow = new Date(year, mouth, day, 8);
    }
    return tommorrow - new Date();
  }

  _getCampaign(){
    ContentAPI
      .getCampaign(WEALTHY_GOD_CAMPAIGN_ID)
      .then(function(res) {
        if(res.fresh_times === undefined){
          res = {
            fresh_times: 0,
            activity_list: []
          };
        }
        this._setCampaignState(res);
      }.bind(this));
  }

  _refreshCampaign(){
    this._isRedirectLogin();
    this.setState({
      isAnimate: true
    });
    this._animate();
    ContentAPI
      .refreshWealthyCampaign()
      .then(function(res) {
        this._setCampaignState(res);
      }.bind(this));
  }

  _setCampaignState(res){
    let newState = {},
      levelList = res.level_list;
    if(res.fresh_times !== undefined){
      newState.freshTimes = res.fresh_times;
      newState.activityList = res.activity_list;
    }
    if(levelList && levelList.length > 0){
      newState.levelList= levelList;
    }
    this.setState(newState);
  }

  _isRedirectLogin(){
    if(!Auth.isLoggedIn()){
      if(window.yyg && window.yyg.executeCommand){
        window.yyg.executeCommand('6#', '')
      }else{
        window.location.href = '/login?from=' + window.location.pathname;
      }
    }
  }

  _animate(){
    const self = this;
    $('.w-g-placeholder').each(function(index){
      var item = $(this);
      setTimeout(function(){
        item.removeClass('hide');
        item.siblings().addClass('hide');
        item.animate({
          'background-position-y': '-1800px'
        }, {
          duration: (index+1)*2000,
          easing: 'ease-in',
          complete: function(){
            item.addClass('hide');
            item.siblings().removeClass('hide');
            item.css('background-position-y', 0);
            if(index === 2){
              self.setState({
                isAnimate: false
              });
            }
          }
        });
      }, index * 300);
    })
  }

  _openCoupon(item){
    const level = item.level,
      status = item.status;
    if(status != 1){ //1: 已达成，未领取
      toast('未达到领取奖励条件', 'error');
      return;
    }

    ContentAPI.activateCampaign(WEALTHY_GOD_CAMPAIGN_ID, level)
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

  _closeCoupon(){
    this.setState({
      isShowCouponList: false,
      couponList: []
    });
    this._getCampaign();
  }

  _onDialogDone(){
    this.setState({
      showDialog: false
    });
  }
}

export default WealthyGod;
