import React, { Component, PropTypes } from 'react';

import * as I18N from '../../utils/i18n';
import * as ContentAPI from '../../api/content';
import Dialog from '../base/Dialog.jsx';

export default class NewbieTask extends Component {
  state = {
    progress: {},
    finished: false,
    activated: false,
    showDialog: false,
    dialogContent: ''
  };

  componentWillMount () {
    ContentAPI.getMissionStatus(10010)
      .then(res => {
        this.setState({
          progress: res,
          finished: res.step_a && res.step_b && res.step_c && res.step_d,
          activated: res.activated
        });
      });
    this._closeDialog = this._closeDialog.bind(this);
    this._activateNewbieTask = this._activateNewbieTask.bind(this);
    this._goAboutPage = this._goAboutPage.bind(this);
    this._goChargePage = this._goChargePage.bind(this);
    this._goHomePage = this._goHomePage.bind(this);
    this._goMyBatePage = this._goMyBatePage.bind(this);
  }
  _activateNewbieTask () {
    if (this.state.activated) return;
    if (!this.state.finished) {
      this.setState({
        showDialog: true,
        dialogContent: I18N.t('newbie_task_dialog_not_finished')
      });
      return;
    }
    ContentAPI.activateMission(10010)
      .then(res => {
        if (res) {
          _hmt.push(['_trackEvent', '新手任务', '成功领取奖励']);
          this.setState({
            activated: true,
            showDialog: true,
            dialogContent: I18N.t('newbie_task_dialog_activate_success')
          })
        } else {
          this.setState({
            showDialog: true,
            dialogContent: I18N.t('newbie_task_dialog_activate_failed')
          })
        }
      });
  }
  _goAboutPage (e) {
    e.stopPropagation();
    e.preventDefault();
    if(window.yyg && window.yyg.executeCommand) {
      window.yyg.executeCommand('12#', '');
    } else {
      window.location.href = '/about';
    }
  }
  _goChargePage (e) {
    e.stopPropagation();
    e.preventDefault();
    if(window.yyg && window.yyg.goRecharge) {
      window.yyg.goRecharge();
    } else {
      window.location.href = '/user/charge';
    }
  }
  _goHomePage (e) {
    e.stopPropagation();
    e.preventDefault();
    if(window.yyg && window.yyg.goHome) {
      window.yyg.goHome();
    } else {
      window.location.href = '/';
    }
  }
  _goMyBatePage (e) {
    e.stopPropagation();
    e.preventDefault();
    _hmt.push(['_trackEvent', '新手任务', '去邀请好友']);
    if(window.yyg && window.yyg.executeCommand) {
      var url = (process.env.NODE_ENV == 'production' ? 'http://www.1yuan-gou.com' : 'http://121.41.6.238:9898') + '/user/my_rebate' + (I18N.LOCALE.code == 'cn' ? '' : '_all');
      window.yyg.executeCommand('11#' + url, I18N.t('my_rebate_page_title'));
    } else {
      window.location.href = '/user/my_rebate';
    }
  }
  _closeDialog () {
    this.setState({showDialog: false, dialogContent: ''})
  }

  render () {
    return (
      <div className="newbie-wrap">
        <img src={require('../../img/newbie/newbie_banner-' + I18N.LOCALE.code + '.png')} style={{width: '100%'}} />
        <div className={"newbie-content-wrap " + I18N.LOCALE.code}>
          <ul className="task-list">
            <li className="task-item">
              <span>{I18N.t('newbie_task_one')}</span>
              {this.state.progress.step_a ? <div className="fr finished">{I18N.t('newbie_task_finished')}</div> :
                <div className="fr" onTouchTap={this._goAboutPage}>{I18N.t('newbie_task_one_button')}</div>}
            </li>
            <li className="task-item">
              <span>{I18N.t('newbie_task_two')}</span>
              {this.state.progress.step_b ? <div className="fr finished">{I18N.t('newbie_task_finished')}</div> :
                <div className="fr" onTouchTap={this._goHomePage}>{I18N.t('newbie_task_two_button')}</div>}
            </li>
            <li className="task-item">
              <span>{I18N.t('newbie_task_three')}</span>
              {this.state.progress.step_c ? <div className="fr finished">{I18N.t('newbie_task_finished')}</div> :
                <div className="fr" onTouchTap={this._goChargePage}>{I18N.t('newbie_task_three_button')}</div>}
            </li>
            <li className="task-item">
              <span>{I18N.t('newbie_task_four')}</span>
              {this.state.progress.step_d ? <div className="fr finished">{I18N.t('newbie_task_finished')}</div> :
                <div className="fr" onTouchTap={this._goMyBatePage}>{I18N.t('newbie_task_four_button')}</div>}
            </li>
          </ul>
          <div className={"activate-btn " + I18N.LOCALE.code + (this.state.activated ? '' : ' enable')} onTouchTap={this._activateNewbieTask}></div>
        </div>
        <img src={require('../../img/newbie/newbie_footer.png')} style={{width: '100%'}} />
        <Dialog clz="dialog-center" confirm={I18N.t('dialog_confirm')} show={this.state.showDialog}
                content={this.state.dialogContent} onCloseClick={this._closeDialog} onConfirm={this._closeDialog}/>
      </div>
    );
  }
}