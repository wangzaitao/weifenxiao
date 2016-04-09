import React from 'react';

import * as GlobalConfig from '../../../constants/Config';

class MyCode extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center', paddingTop: '4em'}}>
        <span style={{fontSize: '1.1em'}}>邀请好友玩一元购，免费赚积分</span>
        <img src={(GlobalConfig.API.HOST + GlobalConfig.API.QRCODE).replace('{%uid%}', G.userID).replace('{%source%}', 'QR_MyCode_Web')} style={{width: '90%', margin: 'auto', padding: '1em 0'}} />
        <span className="gray">扫一扫上面的二维码图案，即可下载</span>
      </div>
    );
  }
}

export default MyCode
