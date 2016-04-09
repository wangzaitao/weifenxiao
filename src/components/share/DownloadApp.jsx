import React from 'react';

import {APK} from '../../constants/Config';

require('./share.css');

class DownloadApp extends React.Component {
  _trackDownload () {
    _hmt.push(['_trackEvent', 'DownloadPage', 'DownloadPageDownload'])
  }

  render() {
    var downloadUrl = APK.CHANNELS[this.props.location.query.source || 'ofw'] || APK.CHANNELS['ofw'];
    return (
      <div className="share-app">
        <span className="share-ico share-ico-logo-cn logo"/>
        <div className="banner">
          <img src={require("../../img/share/banner-cn.png")} />
        </div>
        <div className="download-top">
          <a href={downloadUrl} target="_blank" onTouchTap={this._trackDownload.bind(this)} className="share-ico share-ico-download_btn_default">下载一元购</a>
        </div>
        <div className="user-share">
          <div className="share-ico share-ico-title_bg-cn">
            <span className="share-title">一元的惊喜</span>
          </div>
          <ul className="share-list">
            <li className="share-item">
              <span className="username red">@听说名字很重要</span>
              <p className="comment">同事介绍才开始玩的,没想到第一天就中了。可能新人运气好吧！手机已收到，感谢1元购，感谢兄弟姐妹们支持。还希望能接着中！</p>
              <div className="images">
                <img className="left" src={require("../../img/share/images/iphone01.jpg")} />
                <img src={require("../../img/share/images/iphone02.jpg")} />
              </div>
            </li>
            <li className="share-item">
              <span className="username red">@一元的老兵</span>
              <p className="comment">加入1元购大军已一个月，各种宝贝都试过。Ipad这种高价东东投了几次，终究到手。总结经验：一点点运气+坚持+技巧，得靠自己领悟。</p>
              <div className="images">
                <img className="left" src={require("../../img/share/images/ipad01.jpg")} />
                <img src={require("../../img/share/images/ipad02.jpg")} />
              </div>
            </li>
          </ul>
        </div>
        <div className="download-bottom">
          <a href={downloadUrl} onTouchTap={this._trackDownload.bind(this)} target="_blank">下载一元购</a>
        </div>
        <div className="gray" style={{textAlign: 'center', paddingBottom: '1em'}}>武汉卓翰网络科技有限公司 © 2016</div>
      </div>
    );
  }
}

export default DownloadApp;
