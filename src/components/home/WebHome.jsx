import React from 'react';

import Banner from './Banner.jsx';
import ActivityList from './ActivityList.jsx';
import AnnouncedList from './AnnouncedList.jsx';
import DiscoveryList from './DiscoveryList';
import SwipeViews from '../base/SwipeViews.jsx';
import CartLink from '../cart/CartLink';
import CustomLink from '../base/CustomLink.jsx';
import * as GlobalConfig from '../../constants/Config';
import Auth from '../../api/auth';
import {addCookie, getCookie} from '../../utils/common';

class WebHome extends React.Component {
  constructor(props) {
    super(props);
    var index = this.props.location.query.index;
    this.state = {
      selectedIndex: (index && ['0', '1', '2'].indexOf(index) !== -1) ? parseInt(index) : 0,
      showRewardTip: this.props.location.query.show_tips && this.props.location.query.show_tips === '1',
      showAppDownload: true
    };
    // channel logic.
    var chn = this.props.location.query.chn || '', versionCode = this.props.location.query.version_code;
    if (chn && chn !== G.chn) {
      G.chn = chn;
      addCookie('chn', chn, 30);
    }
    if (versionCode && versionCode !== G.versionCode) {
      G.versionCode = versionCode;
      addCookie('vc', versionCode, 30);
    }

    if (chn === GlobalConfig.CHANNELS.YOUXIN && !G.token) {
      // auto login or redirect register for uxin channel.
      var ts = this.props.location.query.ts,
          uid = this.props.location.query.uid,
          pnum = this.props.location.query.pnum;
      if (pnum) {
        Auth.uxinLogin(pnum, ts, uid, function (success, data) {
          if (success) {
            if (data.first_login){
              this.setState({showRewardTip: true});
              document.body.style.overflowY = 'hidden';
              document.body.style.position = 'fixed';
              document.body.style.perspective = '1000px';
            }
          } else if (data == 401) {  // old user, redirect login
            window.location.href = '/login';
          } else {
            console.log('UXIN Login failed，msg: ' + data)
          }
        }.bind(this));
      } else {  // has no phone, redirect register
        window.location.href = '/register';
      }
    }
    if (getCookie('app_download') === '1' || !window.navigator.userAgent.match(/Android/i)) {
      this.state.showAppDownload = false;
    }

    if (this.state.showRewardTip) {
      document.body.style.overflowY = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.perspective = '1000px';
    }
  }
  componentDidMount () {
    if (this.state.showAppDownload) {
      document.getElementById('back2Top').style.bottom = '80px'
    }
  }
  _onCloseRewardTip (e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({showRewardTip: false});
    document.body.style.overflowY = 'auto';
    document.body.style.position = 'relative';
    document.body.style.perspective = 'none';
  }
  _onCloseAppDownload (e) {
    e.stopPropagation();
    addCookie('app_download', 1);
    this.setState({showAppDownload: false});
    document.getElementById('back2Top').style.bottom = '56px';
  }
  _onDownloadApp (e) {
    e.stopPropagation();
    this.setState({showAppDownload: false});
    document.getElementById('back2Top').style.bottom = '56px';
    addCookie('app_download', 1, 30);
    _hmt.push(['_trackEvent', 'HomeAppDownload', G.chn === GlobalConfig.CHANNELS.YOUXIN ? 'UXINAppDownload' : 'OFWAppDownload']);
  }

  render () {
    return (
      <div className="m-body" style={{backgroundColor: '#f8f8f8'}}>
        <Banner/>
        <SwipeViews selectedIndex={this.state.selectedIndex}>
          <div title="夺宝" className="tab-activity-list">
            <ActivityList />
          </div>
          <div title="开奖" className="tab-announced-list">
            <AnnouncedList />
          </div>
          <div title="发现" className="tab-found-list">
            <DiscoveryList />
          </div>
        </SwipeViews>
        <div className="tips-container" style={{display: (this.state.showRewardTip ? '-webkit-box' : 'none')}}>
          <div className="reg-reward-tip">
            <div className="close-btn" onTouchTap={this._onCloseRewardTip.bind(this)}></div>
            <CustomLink to="/user/newbie_task" isOuterURL={true}>
              <div className="newbie-task"></div>
            </CustomLink>
          </div>
        </div>
        <CartLink showAppDownload={this.state.showAppDownload}/>
        <div className="m-footer">
          <p className="copyright gray">京ICP备13029378号-2 海钰博创 © 2016</p>
        </div>
        {this.state.showAppDownload ?
          <div className="app-download">
            <button className="close" onTouchTap={this._onCloseAppDownload.bind(this)}/>
            <a href={GlobalConfig.APK.CHANNELS['ofw']} onClick={this._onDownloadApp.bind(this)}>
              <div className="wrapper">
                <div className="logo">
                  <img src={require('../../img/logo.png')}/>
                </div>
                <div className="inline-block ml10">
                  <p style={{fontSize: '1.2em'}}>随时随地一元购</p>
                  <p>支持安卓系统</p>
                </div>
                <span className="download">立即下载</span>
              </div>
            </a>
          </div> : undefined
        }
      </div>
    );
  }
}

export default WebHome;
