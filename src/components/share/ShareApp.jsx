import React from 'react';

import * as I18N from '../../utils/i18n';
import * as ContentAPI from '../../api/content';
import {APK} from '../../constants/Config';

require('./share.css');

class ShareApp extends React.Component {
  constructor(props) {
    super(props);
    var source = this.props.location.query.source;
    if (source) {
      _hmt.push(['_trackEvent', 'ShareAPP', 'ShareAPPViewed', 'SOURCE: ' + source])
    }
  }
  _trackDownload () {
    if (this.props.location.query.uid) {
      ContentAPI.trackInviter(this.props.location.query.uid)
    }
    _hmt.push(['_trackEvent', 'ShareAPP', 'ShareAPPDownload'])
  }

  render() {
    return (
      <div className="share-app">
        <span className={"logo share-ico share-ico-logo-" + I18N.LOCALE.code}/>
        <div className="banner">
          <img src={require("../../img/share/banner-" + I18N.LOCALE.code + '.png')} />
        </div>
        <div className="download-top">
          <a href={APK.STORE_URL} target="_blank" onTouchTap={this._trackDownload.bind(this)} className="share-ico share-ico-download_btn_default">{I18N.t('share_app_download_app')}</a>
        </div>
        <div className="user-share">
          <div className={"share-ico share-ico-title_bg-" + I18N.LOCALE.code}>
            <span className="share-title">{I18N.t('share_app_title')}</span>
          </div>
          <ul className="share-list">
            <li className="share-item">
              <span className="username red">@{I18N.t('share_app_username_1')}</span>
              <p className="comment">{I18N.t('share_app_show_1')}</p>
              <div className="images">
                <img className="left" src={require("../../img/share/images/iphone01.jpg")} />
                <img src={require("../../img/share/images/iphone02.jpg")} />
              </div>
            </li>
            <li className="share-item">
              <span className="username red">@{I18N.t('share_app_username_1')}</span>
              <p className="comment">{I18N.t('share_app_show_2')}</p>
              <div className="images">
                <img className="left" src={require("../../img/share/images/ipad01.jpg")} />
                <img src={require("../../img/share/images/ipad02.jpg")} />
              </div>
            </li>
          </ul>
        </div>
        <div className="download-bottom">
          <a href={APK.STORE_URL} onTouchTap={this._trackDownload.bind(this)} target="_blank">{I18N.t('share_app_download_app')}</a>
        </div>
      </div>
    );
  }
}

export default ShareApp;
