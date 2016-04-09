import React from 'react';
import {browserHistory} from 'react-router';

import Auth from '../../api/auth';
import CustomLink from '../base/CustomLink.jsx';
import {UserAvatar} from '../base/FallbackImage.jsx';

class Profile extends React.Component {
  state = {
    avatar: G.avatar,
    userID: G.userID,
    nickname: G.nickname,
    phone: G.phone,
    inviterID: G.inviterID
  };

  render() {
    var avatarStyles = {width: '2.5em', borderRadius: '50%', marginTop: '-0.5em'};
    return (
      <div className="bgc-white">
        <ul className="profile-list">
          <li className="profile-item bb1-gray">
            <span>头像</span>
            <UserAvatar src={this.state.avatar || require("../../img/default_avatar.png")} className="fr" styles={avatarStyles} />
          </li>
          <li className="profile-item bb1-gray">
            <span>昵称</span>
            <span className="gray fr txt-one-line" style={{maxWidth: '80%'}}>{this.state.nickname}</span>
          </li>
          <li className="profile-item">
            <span>手机号</span>
            <span className="gray fr">{this.state.phone}</span>
          </li>
          <div className="empty-driver"></div>
          <li className="profile-item bb1-gray">
            <span>返利ID</span>
            <span className="gray fr">{this.state.userID}</span>
          </li>
          <li className="profile-item bb1-gray">
            <CustomLink to="/user/my_code">
              <span>返利二维码<span className="red">（邀请好友，赚无限积分）</span></span>
              <i className="ico ico-profile_qrcode fr mr16" style={{marginTop: '0.2em'}}/>
              <i className="ico-right ico ico-icon_arrow_right_default"/>
            </CustomLink>
          </li>
          <li className="profile-item bb1-gray" onTouchTap={this._onInviterIDPressed}>
            <span>邀请码</span>
            <span className={"gray fr" + (this.state.inviterID ? '' : ' mr16')}>{this.state.inviterID || '邀请人ID'}</span>
            {this.state.inviterID ? undefined : <i className="ico-right ico ico-icon_arrow_right_default"/>}
          </li>
        </ul>

        <a href="javascript:;" className="profile-logout" onTouchTap={this._onLogoutPressed}><div>退出账号</div></a>
      </div>
    );
  }

  _onInviterIDPressed = () => {
    if (!this.state.inviterID) {
      browserHistory.push('/user/fill_invited_code');
    }
  };
  _onLogoutPressed = () => {
    Auth.logout(function () {
      window.location.href = '/'
    }.bind(this));
  }
}

export default Profile;
