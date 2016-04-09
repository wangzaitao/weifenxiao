import React, { Component, PropTypes } from 'react';

import * as I18N from '../../utils/i18n';
import {APK} from '../../constants/Config';
import * as ContentAPI from '../../api/content';
import {UserAvatar, GoodsCover} from '../base/FallbackImage.jsx';
import {b64decode} from '../../utils/cryption';

require('./share.css');

class ShareDetail extends Component {
  constructor(props) {
    super(props);
    var paramStr = decodeURI(this.props.location.query.p || ''),
        params = paramStr ? JSON.parse(b64decode(paramStr)) : {};
    this.state = {
      id: this.props.params.activityId,
      params: params,
      gid: '',
      title: '',
      cover: ''
    };
  }
  componentWillMount () {
    ContentAPI.getActivityDetail(this.state.id, function (data) {
      if (Object.keys(data).length) {
        this.setState({
          gid: data.gid,
          title: data.goods.name,
          cover: data.goods.cover
        });
      }
    }.bind(this));
  }
  _trackViewDetail () {
    _hmt.push(['_trackEvent', 'ShareDetail', 'ShareDetailView', 'ID', this.state.id])
  }
  _trackDownload () {
    if (this.props.location.query.uid) {
      ContentAPI.trackInviter(this.props.location.query.uid)
    }
    _hmt.push(['_trackEvent', 'ShareDetail', 'ShareDetailDownload', 'ID', this.state.id])
  }

  render() {
    var markClass;
    if (this.state.params.iswinner === 1 && this.state.params.status === 4) {
      markClass = 'share-winner-record-mark '
    } else if (this.state.params.price === 1) {
      markClass = 'share-detail-mark '
    } else {
      markClass = 'share-detail-zero-mark '
    }
    return (
      <div className={"share-winner-record " + I18N.LOCALE.code}>
        <div className="content">
          <i className={"share-mark " + markClass + I18N.LOCALE.code} />
          <div className="header bb1-gray">
            <UserAvatar className="inline-block" src={this.state.params.avatar || require("../../img/default_avatar.png")}/>
            <div className="user-info">
              <span className="inline-block txt-one-line" style={{width: '77%'}}>{this.state.params.nickname || I18N.t('anonymous')}</span>
              <span className="user-desc txt-one-line">{I18N.t('share_detail_app_desc')}</span>
            </div>
          </div>
          <a href={"/activity_latest/" + this.state.gid} onTouchTap={this._trackViewDetail.bind(this)}>
            <div className="cover">
              <GoodsCover src={this.state.cover} />
            </div>
          </a>
          <p className="title">{this.state.title}</p>
          <p className="term">{I18N.t('share_detail_term') + this.state.params.term}</p>
        </div>
        <div className="footer">
          <span className={"share-ico share-ico-winner_record_logo-" + I18N.LOCALE.code} />
          <a href={APK.STORE_URL} target="_blank" className="download-now" onTouchTap={this._trackDownload.bind(this)}>{I18N.t('share_detail_download_now')}</a>
        </div>
      </div>
    );
  }
}

export default ShareDetail;
