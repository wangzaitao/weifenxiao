import React from 'react';
import CustomLink from '../base/CustomLink.jsx';

import Auth from '../../api/auth';
import {b64decode} from '../../utils/cryption';
import * as ContentAPI from '../../api/content';
import SwipeViews from '../base/SwipeViews.jsx';
import {UserAvatar} from '../base/FallbackImage.jsx';
import UserActivityRecord from './UserActivityRecord.jsx';
import UserWinnerRecord from './UserWinnerRecord.jsx';
import UserShowRecord from './UserShowRecord.jsx';

require('./usercenter.css');

class UserCenter extends React.Component {
  constructor(props) {
    super(props);
    var avatar = this.props.location.state ? this.props.location.state.avatar || '' : '',
        nickname = this.props.location.state ? this.props.location.state.nickname || '' : '',
        paramStr = decodeURIComponent(this.props.location.query.p || ''), params = paramStr ? JSON.parse(b64decode(paramStr)) : {};
    if (!avatar) avatar = params.avatar || '';
    if (!nickname) nickname = params.nickname || '匿名用户';
    this.state = {
      userId: this.props.params.uid,
      avatar: avatar,
      nickname: nickname
    };
  }
  componentWillMount () {
    this._updateUserInfos = this._updateUserInfos.bind(this)
  }
  _updateUserInfos (data) {
    this.setState(data)
  }

  render() {
    return (
      <div className="bgc-white">
        <div className="user-infos">
          <UserAvatar src={this.state.avatar || require("../../img/default_avatar.png")} styles={{width: '3.75em', borderRadius: '50%', display: 'inline', verticalAlign: 'bottom'}} />
          <div className="inline-block ml16" style={{width: '75%'}}>
            <p className="txt-one-line" style={{fontSize: '1.2em'}}>{this.state.nickname}</p>
            <p>ID：<span style={{color:"#fbd41f"}}>{this.state.userId}</span></p>
          </div>
        </div>
        <SwipeViews>
          <div title="夺宝记录" className="tab-user-ar-list">
            <UserActivityRecord uid={this.state.userId} onUsernameClick={this._updateUserInfos} />
          </div>
          <div title="中奖记录" className="tab-user-wr-list">
            <UserWinnerRecord uid={this.state.userId} />
          </div>
          <div title="晒单记录" className="tab-user-sr-list">
            <UserShowRecord uid={this.state.userId} />
          </div>
        </SwipeViews>
      </div>
    );
  }
}

export default UserCenter;
