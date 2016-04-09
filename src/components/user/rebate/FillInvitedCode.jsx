import React, { Component, PropTypes } from 'react';
import {browserHistory} from 'react-router';

import * as I18N from '../../../utils/i18n';
import {toast} from '../../../utils/toast';
import {isIntNumber} from '../../../utils/common';
import * as ContentAPI from '../../../api/content';
import Auth from '../../../api/auth';

export default class FillInvitedCode extends Component{
  constructor(props) {
    super(props);
    this.state = {
      inviterID: ''
    };
  }

  render() {
    return (
      <div className="fill-invited-code-wrap">
        <img className="extended-img" src={require('../../../img/rebate/invite_code_banner-' + I18N.LOCALE.code + '.png')} />
        <div className="f-i-c-tip">{I18N.t('fill_invite_code_tip')}</div>
        <div className="f-form-wrap">
          <input type="text" className="invite-code-input" placeholder={I18N.t('fill_invite_code_placeholder')} onChange={this._onInviterIDChange} />
          <div className="invite-code-submit-btn" onTouchTap={this._addInviter.bind(this)}>{I18N.t('submit')}</div>
        </div>
        <div className="invite-instru-wrap">
          <div className="instru-title red">{I18N.t('fill_invite_code_instru_title')}</div>
          <div className="double-red-line"></div>
          <div className="invite-instru-body">
            <div className="instru-sub-title first-title">{I18N.t('fill_invite_code_instru_first')}</div>
            <div className="instru-desc">
              <p dangerouslySetInnerHTML={{__html: I18N.t('fill_invite_code_level_one')}}/>
              <p dangerouslySetInnerHTML={{__html: I18N.t('fill_invite_code_level_two')}}/>
              <p dangerouslySetInnerHTML={{__html: I18N.t('fill_invite_code_level_three')}}/>
            </div>
            <div className="instru-sub-title">{I18N.t('fill_invite_code_instru_second')}</div>
            <div className="instru-sub-title">{I18N.t('fill_invite_code_instru_third')}</div>
          </div>
        </div>
        <img className="extended-img fill-footer-img" src={require('../../../img/rebate/invite_code_footer.png')} />
      </div>
    );
  }

  _onInviterIDChange = (e) => {
    var inviterID = e.target.value;
    if (!isIntNumber(inviterID) && inviterID !== '') {
      e.target.value = inviterID.slice(0, this.state.inviterID.length);
    } else {
      this.state.inviterID = inviterID;
    }
  };

  _addInviter () {
    if(!this.state.inviterID) return;
    ContentAPI.addInviter(this.state.inviterID)
      .then(() => {
        _hmt.push(['_trackEvent', '填写邀请码', '提交成功']);
        Auth.updateUserInfo(function () {
          browserHistory.push('/user/profile');
        });
      })
      .catch((err) => {
        // toast不同的错误信息
        _hmt.push(['_trackEvent', '填写邀请码', '提交失败']);
        var msg = err.message;
        if (msg == 'inviter id invalid') {
          toast(I18N.t('fill_invite_code_error_3'), 'error');
        } else if (msg == 'duplicate set') {
          toast(I18N.t('fill_invite_code_error_1'), 'error');
        } else if (msg == 'invalid inviter' && this.state.inviterID == G.userID) {
          toast(I18N.t('fill_invite_code_error_2'), 'error');
        } else if (msg == 'invalid inviter' && this.state.inviterID != G.userID) {
          toast(I18N.t('fill_invite_code_error_3'), 'error');
        } else if (msg == 'circle invite') {
          toast(I18N.t('fill_invite_code_error_4'), 'error');
        }
      })
  }
}
