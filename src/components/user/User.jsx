import React from 'react';
import CustomLink from '../base/CustomLink.jsx';

import Auth from '../../api/auth';
import * as ContentAPI from '../../api/content';
import {UserAvatar} from '../base/FallbackImage.jsx';

class UserLinkItem extends React.Component {
  render () {
    var comment, tips, newTipDom;
    if (this.props.couponCount !== undefined) {
      tips = <span className="gray fr mr16">
        {this.props.couponCount ? <span className="red">{this.props.couponCount + '个可用红包'}</span> : <span>无可用红包</span>}
      </span>
    }
    if (this.props.creditCount !== undefined) {
      comment = <span className="red">{'(' + this.props.creditCount + ')'}</span>;
      if (this.props.checked) {
        tips = <span className="gray fr mr16">已签到</span>
      } else {
        tips = <span className="red fr mr16">未签到</span>
      }
    }

    if(this.props.tips && this.props.tips > 0){
      newTipDom = <span className="fr mr16 new-tip"/>;
    }

    if (this.props.url === 'empty_driver') {
      return <div className="empty-driver"></div>;
    } else {
      return (
        <li className="user-history-item bb1-gray">
          <CustomLink to={this.props.url}>
            <div style={{position: 'relative'}}>
              <i className={"mr10 ico ico-" + this.props.icon}/>
              <span>{this.props.title} {comment}</span>
              {tips}
              {newTipDom}
              <i className="ico-right ico ico-icon_arrow_right_default"/>
            </div>
          </CustomLink>
        </li>
      )
    }
  }
}

class User extends React.Component {
  state = {
    userId: G.userID,
    avatar: G.avatar,
    nickname: G.nickname,
    balance: G.balance,
    phone: G.phone,
    couponCount: 0,
    creditCount: 0,
    creditChecked: false,
    award: 0,
    availableShow: 0,
    partnerReward: 0
  };
  componentWillMount () {
    Auth.updateUserInfo(function () {
      this.setState({
        userId: G.userID,
        avatar: G.avatar,
        nickname: G.nickname,
        balance: G.balance,
        phone: G.phone
      })
    }.bind(this));

    ContentAPI.getMyCoupons({status: 1}, function (data, total) {
      this.setState({couponCount: total})
    }.bind(this));

    ContentAPI.getMyCredit(function (data) {
      var activities = data.category[0].credit_activity || [], checked = false;
      for (var i in activities) {
        if (activities[i].command.indexOf('16#') !== -1) {
          checked = activities[i].enable === 0;
        }
      }
      this.setState({creditCount: data.total || 0, creditChecked: checked})
    }.bind(this));

    ContentAPI.getTips()
      .then((res) => {
        this.setState({
          award: res.award || 0,
          availableShow: res.available_show || 0,
          partnerReward: res.partner_reward || 0
        });
      })
  }

  render() {
    var avatarStyles = {width: '3.75em', borderRadius: '50%', display: 'inline-block', float: 'left'},
        links = [
          {url: '/user/my_credit', icon: 'credit_history', title: '我的积分', creditCount: this.state.creditCount, checked: this.state.creditChecked},
          {url: '/user/my_rebate', icon: 'friend_back', title: '好友充值返利', tips: this.state.partnerReward},
          {url: 'empty_driver'},
          {url: '/user/my_activity_record', icon: 'buy_history', title: '夺宝记录'},
          {url: '/user/my_winner_record', icon: 'win_history', title: '中奖记录', tips: this.state.award},
          {url: '/user/my_charge_record', icon: 'recharge_record', title: '充值记录'},
          {url: 'empty_driver'},
          {url: '/user/my_coupon', icon: 'my_redpackets', title: '我的红包', couponCount: this.state.couponCount},
          {url: '/user/my_show_record', icon: 'show_history', title: '我的晒单', tips: this.state.availableShow}
        ];
    var linkItems = links.map(function (item, index) {
      return <UserLinkItem {...item} key={index}/>
    });
    return (
      <div className="bgc-white">
        <CustomLink to="/user/profile">
          <div className="user-infos">
            <UserAvatar src={this.state.avatar || require("../../img/default_avatar.png")} styles={avatarStyles} />
            <div className="inline-block ml16" style={{maxWidth: '68%'}}>
              <p className="txt-one-line" style={{fontSize: '1.2em'}}>{this.state.nickname}</p>
              <p>{'ID：' + this.state.userId}</p>
            </div>
            <div className="fr inline-block mt16" style={{position: 'absolute', right: '0.8em'}}>
              <i className="ico ico-user_qrcode mr5"/>
              <i className="ico ico-icon_arrow_white_right"/>
            </div>
          </div>
        </CustomLink>
        <div className="user-amount">
          <p className="inline-block">余额： <span style={{color: '#fbd41f'}}>{ this.state.balance || 0 }</span> 夺宝币</p>
          <CustomLink to="/user/charge" className="fr charge-btn"><div>充值</div></CustomLink>
        </div>
        <ul>{linkItems}</ul>
      </div>
    );
  }
}

export default User;
