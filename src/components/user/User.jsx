import React from 'react';
import CustomLink from '../base/CustomLink.jsx';

import Auth from '../../api/auth';
import * as ContentAPI from '../../api/content';
import {UserAvatar} from '../base/FallbackImage.jsx';

require("./user.scss")
require("./../../scss/icons.scss")

class UserLinkItem extends React.Component {
  render () {
    var comment, tips, newTipDom;

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
	constructor(props) {
		super(props);
		this.state = {
			userId: 0,
			avatar: "",
			nickname:"18672766095"
		};
	}

  render() {
    var avatarStyles = {width: '3.75em', borderRadius: '50%', display: 'inline-block', float: 'left'},
        links = [
          {url: 'empty_driver'},
          {url: '/user/my_activity_record', icon: 'buy_history', title: '夺宝记录'},
          {url: '/user/my_charge_record', icon: 'recharge_record', title: '充值记录'},
          {url: 'empty_driver'}
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
