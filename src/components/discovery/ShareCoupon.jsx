import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';
import {APK} from '../../constants/Config';
import {FillContent} from '../base/FillContent';
import Dialog from '../base/Dialog.jsx';
import CustomLink from '../base/CustomLink.jsx';

const CAMPAIGN_ID = 20011;
const SHARE_TITLE = '一元购';
const SHARE_DESC = '一元购狂送红包啦，免费抢iPhone，惊喜多多，赶紧来抢吧，晚了可就没了哦～';
const SHARE_IMG_URL = 'http://7xov77.com2.z0.glb.qiniucdn.com/discovery05.png';

class ShareCoupon extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      isShowRules: false,
      showDialog: false,
      currentAmount: 0,
      levelList: null
    };
  }

  componentWillMount(){
    ContentAPI.getCampaign(CAMPAIGN_ID)
      .then(function(data) {
        this.setState({
          currentAmount: data.current_amount || 0,
          levelList: data.level_list || []
        });
      }.bind(this));
  }

  render() {
    let btnDom, rulesDom, classes = 'share-coupon-wrapper';

    if(this.state.currentAmount >= 10) {
      btnDom = <div className="share-coupon-btn" onTouchTap={this._shareCoupon.bind(this)}>分享抢红包</div>;
    } else if(this.state.levelList !== null){
      btnDom = <div className="go-home-btn" onTouchTap={this._goHome.bind(this)}>立即夺宝</div>;
    }

    if(this.state.isShowRules) {
      rulesDom = (
        <div className="rules-wrapper">
          <div className="rules-content">
            <div className="r-head">
              <span className="r-head-title">群红包规则</span>
              <span className="r-close-btn" onTouchTap={this._hideRules.bind(this)}/>
            </div>
            <div className="r-body">
              <div className="r-para-title">
                1.分享有效期:
              </div>
              <p className="r-para">
                分享有效期为7天，即从红包分享之日起的7天内，该红包可以被领取，超过7天作废;
              </p>
              <div className="r-para-title">
                2.分享及领取:
              </div>
              <p className="r-para">
                群红包每天只能分享1次，每天最多可以领取3个群红包;
              </p>
              <div className="r-para-title">
                3.使用有效期:
              </div>
              <p className="r-para">
                自领取后，红包使用的有效期为7天，过期作废;
              </p>
              <div className="r-para-title">
                4.查看及使用:
              </div>
              <p className="r-para">
                成功领取的群红包就成为可使用的普通红包，在用户的“我的红包”下可查看和使用。
              </p>

              <div className="r-para-title r-secret">
                告诉你个小秘密:
              </div>
              <p className="r-para">
                分享红包后，第一个领取的人，能获得一个Big红包，分享之后赶紧先领一个吧～
              </p>

              <div className="r-para-title r-secret">
                注意:
              </div>
              <p className="r-para">
                1.用户领取的红包将充值到用户填写的手机号码对应的账号，请确保手机号码填写正确;
              </p>
              <p className="r-para">
                2.活动期间每天只能分享一次群红包;
              </p>
              <p className="r-para">
                3.本活动最终解释权归一元购团队所有。
              </p>
            </div>
          </div>
        </div>
      );
      classes += ' show-rules';
    }

    return (
      <div className={classes}>
        <img className="top-banner share-top-banner" src={require('../../img/discovery/sharecoupon/share_coupon_bg.jpg')} />
        <div className="s-record">
          <span className="s-record-text">
            {"今日已参与人次（" + Math.min(this.state.currentAmount, 10) + "/10）"}
          </span>
          <div className="s-record-process-bar">
            <div className="s-record-process" style={{width: Math.min(this.state.currentAmount, 10) * 10 + '%'}}>
            </div>
          </div>
          {btnDom}
          <div className="s-desc">
            <span className="s-desc-label">活动内容:</span>
            <span className="s-desc-content">每日参加10人次夺宝即可分享群红包，分享成功即可与基友一起抢夺海量红包!</span>
          </div>
          <div className="s-rules" onTouchTap={this._showRules.bind(this)}>
            <span className="s-rules-text">群红包规则</span>
            <span className="s-rules-icon"/>
            {rulesDom}
          </div>
        </div>
        <Dialog confirm="确认" cancel="取消" content="分享功能只能在客户端使用，是否下载一元购？" show={this.state.showDialog}
          onCloseClick={this._onDialogDone.bind(this)} onConfirm={this._downloadApk.bind(this)} />
      </div>
    );
  }

  _showRules(e){
    e.stopPropagation();
    e.preventDefault();
    document.body.style.overflowY = 'hidden';
    document.body.style.position = 'fixed';
    this.setState({isShowRules: true});
  }

  _hideRules(e){
    e.stopPropagation();
    e.preventDefault();
    document.body.style.overflowY = 'auto';
    document.body.style.position = 'relative';
    this.setState({isShowRules: false});
  }

  _shareCoupon(e){
    e.stopPropagation();
    e.preventDefault();
    let latestLevel = this.state.levelList[this.state.levelList.length - 1];
    if(!latestLevel) {
      return;
    }
    if(window.yyg && window.yyg.goShare){
      ContentAPI.activateCampaign(CAMPAIGN_ID, latestLevel.level)
        .then(function(data) {
          if (data.coupon_id) {
            let url = (process.env.NODE_ENV == 'production' ? 'http://www.1yuan-gou.com' : 'http://121.41.6.238:9898') + '/discovery/group_coupon/' + data.coupon_id;
            window.yyg.goShare(url, SHARE_TITLE, SHARE_DESC, SHARE_IMG_URL);
          }
        })
        .catch(function(){});
    } else {
      this.setState({showDialog: true});
    }
  }

  _goHome(e){
    e.stopPropagation();
    e.preventDefault();
    if(window.yyg && window.yyg.goHome) {
      window.yyg.goHome();
    } else {
      window.location.href = '/';
    }
  }

  _onDialogDone(){
    this.setState({showDialog: false});
  }

  _downloadApk(){
    window.open(APK.CHANNELS['ofw'], '_blank');
  }
}

ShareCoupon.contextTypes = {
  history: PropTypes.object.isRequired
};

export default FillContent(ShareCoupon);
