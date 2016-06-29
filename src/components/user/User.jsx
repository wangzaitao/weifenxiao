import React from 'react';
import CustomLink from '../base/CustomLink.jsx';
import TravelNav from './../../components/travel/TravelNav.jsx';
import Auth from '../../api/auth';
import * as ContentAPI from '../../api/content';
import {UserAvatar} from '../base/FallbackImage.jsx';

require("./user.scss")
require("./../../scss/icons.scss")

class UserLinkItem extends React.Component {
  render() {
    var comment, tips, newTipDom;

    if (this.props.tips && this.props.tips > 0) {
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
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      avatar: "",
      nickname: "18672766095"
    };
  }

  render() {
    var avatarStyles = {width: '3.75em', borderRadius: '50%', display: 'inline-block', float: 'left'},
      links = [
        {url: 'empty_driver'},
        {url: '/user/fenxiao', icon: 'recharge_record', title: '我的分销'},
        {url: '/user/address', icon: 'buy_history', title: '地址管理'},
        {url: '/user/address', icon: 'buy_history', title: '个人信息'},
        {url: 'empty_driver'}
      ];
    var linkItems = links.map(function (item, index) {
      return <UserLinkItem {...item} key={index}/>
    });
    return (
      <div className="bgc-white">
        <div className="tlp">
          <TravelNav name="会员中心"/>
          <CustomLink to="/user/profile">
            <div className="user-infos">
              <UserAvatar src={this.state.avatar || require("../../img/default_avatar.png")} styles={avatarStyles}/>
              <div className="inline-block ml16" style={{maxWidth: '68%'}}>
                <p className="txt-one-line" style={{fontSize: '1.2em'}}>{this.state.nickname}</p>
                <p>{'ID：' + this.state.userId}</p>
              </div>
              <div className="fr inline-block mt16" style={{position: 'absolute', right: '0.8em'}}>
                <i className="ico ico-user_qrcode" style={{marginRight:"1em"}}></i>
                <i className="ico ico-icon_arrow_white_right"/>
              </div>
            </div>
          </CustomLink>
          <div className="user-amount">
            <p className="inline-block">余额： <span style={{color: '#fbd41f'}}>{ this.state.balance || 0 }</span> 元</p>
            <CustomLink to="/user/charge" className="fr charge-btn">
              <div>充值(暂不开放)</div>
            </CustomLink>
          </div>
          <ul>{linkItems}</ul>
        </div>
      </div>
    );
  }
}

export default User;
