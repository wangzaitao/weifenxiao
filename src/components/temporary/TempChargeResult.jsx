import React from 'react';
import CustomLink from '../base/CustomLink.jsx';

import Auth from '../../api/auth';
import * as ContentAPI from '../../api/content';

class TempChargeResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payId: this.props.params.payId,
      payStatus: {}
    };
  }
  componentWillMount () {
    ContentAPI.getPayStatus(this.state.payId, function (data) {
      if (data.status === 2) Auth.updateUserInfo();
      this.setState({payStatus: data});
    }.bind(this));
  }

  render() {
    var statusContent;
    if (!this.state.payStatus.status || this.state.payStatus.status === 0 || this.state.payStatus.status === 1) {
      statusContent = (
        <div className="status">
          <i className="ico ico-participate_fail" />
          <p className="pt15 fs15">未支付成功，请重新支付！</p>
          <p className="red">如果您已完成支付，可能因网络故障未及时到帐，</p>
          <p className="red">请稍候进入充值记录查看您的购买结果。</p>
          <p className="gray">如有疑问，请联系客服邮箱：<span className="red">yyg-kefu@qq.com</span></p>
        </div>
      );
    } else if (this.state.payStatus.status === 2) {
      statusContent = (
          <div className="status">
            <i className="ico ico-participate_success"/>
            <p className="pt15 fs15">恭喜您，获得<span className="red">{this.state.payStatus.extend.price}</span>个夺宝币！</p>
          </div>
      );
    } else {
      statusContent = (
        <div className="status">
          <i className="ico ico-participate_fail" />
          <p className="pt15 fs15">充值失败！</p>
          <p className="gray">如有疑问，请联系客服邮箱：<span className="red">yyg-kefu@qq.com</span></p>
        </div>
      );
    }

    return (
      <div className="bgc-white user-charge-result">
        {statusContent}
      </div>
    );
  }
}

export default TempChargeResult;
