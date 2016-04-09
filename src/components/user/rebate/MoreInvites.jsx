import React from 'react';
import * as GlobalConfig from '../../../constants/Config';

export default class MoreInvites extends React.Component {
  _copyInviterID () {
    _hmt.push(['_trackEvent', '更多邀请方法', '复制返利ID']);
    if (window.yyg && window.yyg.saveToClipBoard) {
      window.yyg.saveToClipBoard(G.userID);
    }
  }

  render() {
    var titleStyle = {padding: '1em 0.8em'};
    return (
      <div>
        <div style={titleStyle}><span className="share-border"/>请Ta在注册时或注册后的“个人资料”中将亲的ID填入“邀请码”</div>
        <div className="my-invite-id">
          <span>我的返利ID：{G.userID}</span>
          {window.yyg ? <div className="my-invite-id-copy" onTouchTap={this._copyInviterID.bind(this)}>复制</div> : undefined}
        </div>
        <div className="empty-driver mt16"></div>
        <div style={titleStyle}><span className="share-border"/>面对面快速邀请</div>
        <div style={{textAlign: 'center'}}>
          <img src={(GlobalConfig.API.HOST + GlobalConfig.API.QRCODE).replace('{%uid%}', G.userID).replace('{%source%}', 'QR_MoreInvite')} style={{width: '50%', margin: 'auto', padding: '0 0 1em 0'}} />
          <span className="gray fs15">通过微信或者QQ扫码，即可下载注册</span>
        </div>
      </div>
    );
  }
}
