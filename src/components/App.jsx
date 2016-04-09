import React from 'react';

import * as I18N from '../utils/i18n';
import Header from './base/Header.jsx';
import Back2Top from './base/Back2Top.jsx';
import * as GlobalConfig from '../constants/Config';

require('../css/style.css');
require('../css/icons.css');

class App extends React.Component {
  constructor(props){
    super(props);
    if (window.yyg && window.yyg.getUserInfo) {
      let userInfo = window.yyg.getUserInfo();
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        G.token = userInfo.token;
        G.userID = userInfo.userID;
        G.avatar = userInfo.avatar || '';
        G.nickname = userInfo.nickname;
      }
    }
  }

  render() {
    var props = this.props,
        hash = props.location.pathname.substr(1) || 'home',
        isClient = window.yyg != undefined,
        chn = props.location.query.chn || '',
        isFromYouxin = chn === GlobalConfig.CHANNELS.YOUXIN,
        backUrl = props.location.query.back_url || '', headerSettings;

    for (var key in GlobalConfig.HEADERS) {
      if ((new RegExp(key, "i")).test(hash)) {
        headerSettings = GlobalConfig.HEADERS[key];
        headerSettings['isShow'] = true;
        window.document.title = hash == 'home' ? headerSettings['title'] : headerSettings['title'] + ' - ' + I18N.t('title');
      }
    }
    if (!headerSettings) headerSettings = {'isShow': false};
    if (isClient || isFromYouxin) headerSettings['isShow'] = false;
    if (backUrl) {
      headerSettings['leftIsOuterURL'] = true;
      headerSettings['leftIconUrl'] = backUrl;
    }
    var headerPosition = headerSettings.headerStyle ? headerSettings.headerStyle.position || 'fixed' : 'fixed',
        needPadding = (!isClient) && headerSettings.isShow != false && ['fixed', 'absolute'].indexOf(headerPosition) != -1;

    return (
      <div id="content-container" style={{paddingTop: needPadding ? '4em' : '0'}}>
        <Header {...headerSettings}/>
        {props.children}
        <Back2Top />
        <div id="toast-wrap"></div>
      </div>
    );
  }
}

export default App;
