import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

import {b64encode} from '../../utils/cryption';
import {UserAvatar} from '../base/FallbackImage.jsx';

class WinnerInfo extends Component {
  render () {
    var revealed = this.props.revealed,
        uParams = {nickname: revealed.winner.nick_name, avatar: revealed.winner.avatar};
    return (
      <div className="m-detail-winner mt8">
        <i className="ico ico-winner_corner_icon" />
        <div className="winner-info">
          <div className="avatar">
            <UserAvatar src={revealed.winner.avatar || require("../../img/default_avatar.png")}/>
          </div>
          <ul>
            <li>
              <p className="txt-one-line" style={{width: '20em'}}>
                <span>获奖者：
                  <CustomLink to={"/uc/" + revealed.winner.uid} query={{p: encodeURIComponent(b64encode(JSON.stringify(uParams)))}} state={uParams}>
                    <span className="blue">{revealed.winner.nick_name}</span>
                  </CustomLink>
                </span>
                <span className="gray">{'(' + (revealed.winner.addr || '未知') + ')'}</span>
              </p>
            </li>
            <li><p>{'用户ID：' + revealed.winner.uid}<span className="gray">(唯一不变标记)</span></p></li>
            <li><p>本期参与：<span className="red">{revealed.winner.num_count}</span>人次</p></li>
            <li><p>{'揭晓时间：' + revealed.reveal_time}</p></li>
          </ul>
        </div>
        <div className="lucky-number">
          <CustomLink className="calc-detail-link" to={'/calculate/' + this.props.id}>计算详情</CustomLink>
          <span>幸运号码：</span>
          <span style={{fontSize: '1.375em'}}>{revealed.lucky_number}</span>
        </div>
      </div>
    )
  }
}

export default WinnerInfo;

WinnerInfo.propTypes = {
  revealed: PropTypes.object,
  target_amount: PropTypes.number
};
