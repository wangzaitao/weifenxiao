import React from 'react';

import * as I18N from '../../utils/i18n';
import BgTitle from '../base/button/BgTitle.jsx';

export default class RebateQA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBtn: this.props.location.query && this.props.location.query.show == '1'
    };
  }
  _goToMyRebate () {
    if (window.yyg) {
      var userInfo = window.yyg.getUserInfo();
      if (userInfo) {
        var url = (process.env.NODE_ENV == 'production' ? 'http://www.1yuan-gou.com' : 'http://121.41.6.238:9898') + '/user/my_rebate' + (I18N.LOCALE.code == 'cn' ? '' : '_all');
        window.yyg.executeCommand('11#' + url, I18N.t('my_rebate_page_title'))
      } else {
        window.yyg.executeCommand('6#', '')
      }
    } else {
      window.location.href = '/user/my_rebate'  + (I18N.LOCALE.code == 'cn' ? '' : '_all');
    }
  }

  render() {
    return (
      <div style={{backgroundColor: '#fef4e1'}}>
        <img className="extended-img" src={require('../../img/rebate/rebate_banner_instructions-' + I18N.LOCALE.code + '.jpg')} />
        <div style={{padding: this.state.showBtn ? '1.6em 1em 5em 1em' : '1.6em 1em'}}>
          <BgTitle title={I18N.t('rebate_qa_title_1')} customClass="mt16 mb15"/>
          <div>{I18N.t('rebate_qa_instruction')}</div>
          <BgTitle title={I18N.t('rebate_qa_title_2')} customClass="mt16 mb15"/>
          <div dangerouslySetInnerHTML={{__html: I18N.t('rebate_qa_rules_1')}}></div>
          <div dangerouslySetInnerHTML={{__html: I18N.t('rebate_qa_rules_2')}}></div>
          <div style={{margin: '1.2em 0'}}>
            <img style={{width: '100%', margin: '0 auto'}} src={require('../../img/rebate/rebate_banner_between-' + I18N.LOCALE.code + '.png')} />
          </div>

          <div>
            <img style={{width: '100%'}} src={require('../../img/rebate/invite_title-' + I18N.LOCALE.code + '.png')} />
          </div>
          <div className="red" style={{marginTop: '1.4em'}}>{I18N.t('rebate_qa_method_1_title')}</div>
          <div>{I18N.t('rebate_qa_method_1_content')}</div>
          <div className="red" style={{marginTop: '1.4em'}}>{I18N.t('rebate_qa_method_2_title')}</div>
          <div>{I18N.t('rebate_qa_method_2_content')}</div>
          {
              I18N.LOCALE.code == 'vn' ? undefined : <div className="red" style={{marginTop: '1.4em'}}>{I18N.t('rebate_qa_method_3_title')}</div>
          }
          {
              I18N.LOCALE.code == 'vn' ? undefined : <div>{I18N.t('rebate_qa_method_3_content')}</div>
          }
        </div>
        {this.state.showBtn ?
            <div style={{position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', background: 'rgba(0,0,0,0.6)'}}>
              <img src={require('../../img/rebate/instructions_button-' + I18N.LOCALE.code + '.png')} onTouchTap={this._goToMyRebate.bind(this)} style={{width: '75%', padding: '0.5em 0', margin: 'auto'}}/>
            </div> : undefined}
      </div>
    );
  }
}