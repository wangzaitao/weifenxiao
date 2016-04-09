import React, { Component, PropTypes } from 'react';
import {browserHistory} from 'react-router';

import {b64encode} from '../../utils/cryption';
import CustomLink from '../base/CustomLink.jsx';
import {UserAvatar} from '../base/FallbackImage.jsx';

class PastRecordItem extends Component {
  _onUsernameClick (e) {
    e.stopPropagation();
    e.preventDefault();
    var uParams = {nickname: this.props.username, avatar: this.props.avatar};
    browserHistory.push({pathname: '/uc/' + this.props.uid, query: {p: encodeURIComponent(b64encode(JSON.stringify(uParams)))}, state: uParams});
  }
  render () {
    return (
      <li className="past-record-item">
        <CustomLink to={"/activity/" + this.props.id}>
          <div className="header bb1-gray">
            <span className="gray fs14">{'(第' + this.props.term + '期)' + ' 揭晓时间： ' + this.props.revealedTime}</span>
            <i className="ico ico-icon_arrow_right_default fr mt5" />
          </div>
          <div className="user-info bb1-gray">
            <div className="avatar pr10">
              <UserAvatar src={this.props.avatar || require("../../img/default_avatar.png")}/>
            </div>
            <div>
              {this.props.price === 0 ? <p className="txt-one-line">{this.props.title}</p> : undefined}
              <p className="username">
                <span>获奖者： <span className="blue" onTouchTap={this._onUsernameClick.bind(this)}>{this.props.username}</span></span>
                <span className="addr gray fs14">{' (' + (this.props.addr || '未知') + ')'}</span>
              </p>
              <p className="userid">{'用户ID： ' + this.props.uid}<span className="gray fs14"> (唯一不变标记)</span></p>
            </div>
          </div>
          <div className="bottom">
            <span className="lucky-number">幸运号码： <span className="red">{this.props.luckyNumber}</span></span>
            <span className="amount">本期参与： <span className="red">{this.props.amount}</span>人次</span>
          </div>
        </CustomLink>
        {this.props.last ? undefined : <div className="empty-driver"></div>}
      </li>
    );
  }
}

export default PastRecordItem;

PastRecordItem.propTypes = {
  id: PropTypes.string,
  term: PropTypes.number,
  title: PropTypes.string,
  username: PropTypes.string,
  uid: PropTypes.number,
  avatar: PropTypes.string,
  addr: PropTypes.string,
  revealedTime: PropTypes.string,
  luckyNumber: PropTypes.string,
  amount: PropTypes.number,
  price: PropTypes.number,
  last: PropTypes.bool
};
