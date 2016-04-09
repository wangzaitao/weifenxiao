import React, { Component, PropTypes } from 'react';

import * as I18N from '../../utils/i18n';
import {APK} from '../../constants/Config';
import * as ContentAPI from '../../api/content';
import {UserAvatar, GoodsCover} from '../base/FallbackImage.jsx';

require('./share.css');

class ShareWinnerRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.activityId,
      detail: {}
    };
  }
  componentWillMount () {
    ContentAPI.getActivityDetail(this.state.id, function (data) {
      if (Object.keys(data).length) {
        this.setState({detail: {
          username: data.revealed ? data.revealed.winner.nick_name : I18N.t('anonymous'),
          avatar: data.revealed ? data.revealed.winner.avatar : '',
          term: data.term,
          title: data.goods.name,
          cover: data.goods.cover
        }});
      }
    }.bind(this));
  }
  _trackDownload () {
    if (this.props.location.query.uid) {
      ContentAPI.trackInviter(this.props.location.query.uid)
    }
    _hmt.push(['_trackEvent', 'ShareRecord', 'ShareRecordDownload', 'ID', this.state.id])
  }

  render() {
    return (
      <div className={"share-winner-record " + I18N.LOCALE.code}>
        <div className="content">
          <i className={"share-mark share-winner-record-mark " + I18N.LOCALE.code} />
          <div className="header bb1-gray">
            <UserAvatar className="inline-block" src={this.state.detail.avatar || require("../../img/default_avatar.png")}/>
            <div className="user-info">
              <span className="inline-block txt-one-line" style={{width: '77%'}}>{this.state.detail.username}</span>
              <span className="user-desc txt-one-line">{I18N.t('share_detail_app_desc')}</span>
            </div>
          </div>
          <div className="cover">
            <GoodsCover src={this.state.detail.cover} />
          </div>
          <p className="title">{this.state.detail.title}</p>
          <p className="term">{I18N.t('share_detail_term') + this.state.detail.term}</p>
        </div>
        <div className="footer">
          <span className={"share-ico share-ico-winner_record_logo-" + I18N.LOCALE.code} />
          <a href={APK.STORE_URL} target="_blank" className="download-now" onTouchTap={this._trackDownload.bind(this)}>{I18N.t('share_detail_download_now')}</a>
        </div>
      </div>
    );
  }
}

export default ShareWinnerRecord;
