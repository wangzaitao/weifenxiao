import React, { Component, PropTypes } from 'react';
import {browserHistory} from 'react-router';

import * as I18N from '../../../utils/i18n';
import * as ContentAPI from '../../../api/content';
import {APK} from '../../../constants/Config';
import {FillContent} from '../../base/FillContent';
import Dialog from '../../base/Dialog.jsx';
import CustomLink from '../../base/CustomLink.jsx';

class MyRebateALL extends Component{
  constructor(props){
    super(props);
    this.state = {
      showDialog: false,
      totalRebate: 0,
      rebates: []
    };
  }

  componentWillMount(){
    ContentAPI.getMyRebate()
      .then((res)=>{
        this.setState({
          totalRebate: res.total || 0,
          rebates: res.level_list || []
        })
      });
  }

  render(){
    let firstLevel = this.state.rebates[0] || {},
      secondLevel = this.state.rebates[1] || {},
      thirdLevel = this.state.rebates[2] || {};

    return (
      <div className="rebate-guide-wrap">
        <div className="r-total-wrap">
          <span>{I18N.t('my_rebate_totals')}</span>
          <span className="total-rebate-num">{this.state.totalRebate}</span>
          <a className="go-rebate-list-btn" href="javascript:;" onTouchTap={this._viewDetails.bind(this)}>
            <span className="go-rebate-list-text">{I18N.t('my_rebate_view_details')}</span>
            <i className="ico ico-icon_arrow_right_default" />
          </a>
        </div>
        <div className={"r-level-wrap " + I18N.LOCALE.code}>
          <div className='r-l-title'>
            <span className="first">{I18N.t('my_rebate_head_friend_level')}</span>
            <span className="second">{I18N.t('my_rebate_head_rebate_amount')}</span>
            <span className="third">{I18N.t('my_rebate_head_friend_count')}</span>
            <span>{I18N.t('my_rebate_head_credit_count')}</span>
          </div>
          <div className='r-l-body'>
            <span className="first">{I18N.t('my_rebate_friend_level_one')}</span>
            <span className="second">{I18N.t('my_rebate_rebate_level_one')}</span>
            <span className="third">{firstLevel.member_count || 0}</span>
            <span className="red">{firstLevel.credit_amount || 0}</span>
          </div>
          <div className='r-l-body'>
            <span className="first">{I18N.t('my_rebate_friend_level_two')}</span>
            <span className="second">{I18N.t('my_rebate_rebate_level_two')}</span>
            <span className="third">{secondLevel.member_count || 0}</span>
            <span className="red">{secondLevel.credit_amount || 0}</span>
          </div>
          <div className='r-l-body'>
            <span className="first">{I18N.t('my_rebate_friend_level_three')}</span>
            <span className="second">{I18N.t('my_rebate_rebate_level_three')}</span>
            <span className="third">{thirdLevel.member_count || 0}</span>
            <span className="red">{thirdLevel.credit_amount || 0}</span>
          </div>
        </div>
        <div className="r-invite-text">{I18N.t('my_rebate_methods')}</div>
        <div className="r-invite-body">
          <div className="r-i-b-title"><span className="share-border"/>{I18N.t('my_rebate_share_title')}</div>
          <div className="r-invite-btn red-default-btn" onTouchTap={this._invite.bind(this)}>{I18N.t('my_rebate_share_button')}</div>
          <div className="r-i-instruction">{I18N.t('my_rebate_share_instruction')}</div>
        </div>
        <div className="r-invite-body">
          <div className="r-i-b-title"><span className="share-border"/>{I18N.t('my_rebate_id_title')}</div>
          <div className="my-invite-id">
            <span>{I18N.t('my_rebate_my_invite_id')}{G.userID}</span>{window.yyg ? <div className="my-invite-id-copy" style={{margin: '0 1em'}}>{I18N.t('my_rebate_copy')}</div> : undefined}
          </div>
        </div>
        <Dialog clz="dialog-center" confirm={I18N.t('dialog_confirm')} cancel={I18N.t('dialog_cancel')}
                content={I18N.t('download_app_dialog_content')} show={this.state.showDialog}
                onCloseClick={this._onDialogDone.bind(this)} onConfirm={this._downloadApk.bind(this)} />
      </div>
    );
  }

  _viewDetails () {
    if (window.yyg && window.yyg.executeCommand) {
      window.yyg.executeCommand('19#', '')
    } else {
      browserHistory.push('/user/rebate_details')
    }
  }

  _invite() {
    _hmt.push(['_trackEvent', '好友充值返利', '点击邀请好友按钮']);
    if(window.yyg && window.yyg.goShare) {
      var url = (process.env.NODE_ENV == 'production' ? 'http://www.1yuan-gou.com' : 'http://121.41.6.238:9898') + '/share_app';
      window.yyg.goShare(url, I18N.t('share_title'), I18N.t('share_content'), APK.ICON_URL);
    } else {
      _hmt.push(['_trackEvent', '好友充值返利', '展示下载弹窗']);
      this.setState({showDialog: true});
    }
  }

  _onDialogDone() {
    _hmt.push(['_trackEvent', '好友充值返利', '下载弹窗（取消）']);
    this.setState({showDialog: false});
  }

  _downloadApk() {
    _hmt.push(['_trackEvent', '好友充值返利', '下载弹窗（下载）']);
    var link = $('<a>').attr('href', APK.CHANNELS['ofw']).attr('target', '_blank');
    link.appendTo('body').click();
    this.setState({showDialog: false});
  }
}

export default FillContent(MyRebateALL);
