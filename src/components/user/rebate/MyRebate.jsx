import React, { Component, PropTypes } from 'react';
import {browserHistory} from 'react-router';

import * as ContentAPI from '../../../api/content';
import {APK} from '../../../constants/Config';
import {FillContent} from '../../base/FillContent';
import Dialog from '../../base/Dialog.jsx';
import CustomLink from '../../base/CustomLink.jsx';

const SHARE_TITLE = '一元，给自己一个惊喜';
const SHARE_DESC = '工作拼到老，不如一元购到宝！全场正品，1元就购！史上最强的众筹App！';

class MyRebate extends Component{
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
          <span>累计返利：</span>
          <span className="total-rebate-num">{this.state.totalRebate}</span>
          <a className="go-rebate-list-btn" href="javascript:;" onTouchTap={this._viewDetails.bind(this)}>
            <span className="go-rebate-list-text">查看详情</span>
            <i className="ico ico-icon_arrow_right_default" />
          </a>
        </div>
        <div className="r-level-wrap">
          <div className='r-l-title'>
            <span>好友级别</span>
            <span>充值返利</span>
            <span>好友人数</span>
            <span>返利积分</span>
          </div>
          <div className='r-l-body'>
            <span>一级好友</span>
            <span>30积分/元</span>
            <span>{firstLevel.member_count || 0}</span>
            <span className="red">{firstLevel.credit_amount || 0}</span>
          </div>
          <div className='r-l-body'>
            <span>二级好友</span>
            <span>20积分/元</span>
            <span>{secondLevel.member_count || 0}</span>
            <span className="red">{secondLevel.credit_amount || 0}</span>
          </div>
          <div className='r-l-body'>
            <span>三级好友</span>
            <span>10积分/元</span>
            <span>{thirdLevel.member_count || 0}</span>
            <span className="red">{thirdLevel.credit_amount || 0}</span>
          </div>
        </div>
        <div className="r-invite-text">邀请方法</div>
        <div className="r-invite-body">
          <div className="r-i-b-title"><span className="share-border"/>分享自己的专属邀请链接给Ta</div>
          <div className="r-invite-btn red-default-btn" onTouchTap={this._invite.bind(this)}>立即邀请好友，坐等积分上门！</div>
          <div className="r-i-instruction">
            注：亲在应用里执行的所有分享操作（分享应用/商品详情/晒单/中奖记录)也都为亲的专属分享链接，好友通过此类链接注册并充值后，也会算入积分哦！
          </div>
        </div>
        <a className="go-more-invites-btn" href="javascript:;" onTouchTap={this._viewMoreMethod.bind(this)}>
          <span className="more-invite-btn-text">查看更多方法</span>
          <i className="ico ico-icon_arrow_right_default more-invite-arrow-right" />
        </a>
        <Dialog clz="dialog-center" confirm="确认" cancel="取消" content="分享功能只能在客户端使用，是否下载一元购？" show={this.state.showDialog}
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

  _viewMoreMethod () {
    if (window.yyg && window.yyg.executeCommand) {
      var url = (process.env.NODE_ENV == 'production' ? 'http://www.1yuan-gou.com' : 'http://121.41.6.238:9898') + '/user/more_invites';
      window.yyg.executeCommand('11#' + url, '更多邀请方法')
    } else {
      browserHistory.push('/user/more_invites')
    }
  }

  _invite() {
    _hmt.push(['_trackEvent', '好友充值返利', '点击邀请好友按钮']);
    if(window.yyg && window.yyg.goShare) {
      var url = (process.env.NODE_ENV == 'production' ? 'http://www.1yuan-gou.com' : 'http://121.41.6.238:9898') + '/share_app';
      window.yyg.goShare(url, SHARE_TITLE, SHARE_DESC, APK.ICON_URL);
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

export default FillContent(MyRebate);
