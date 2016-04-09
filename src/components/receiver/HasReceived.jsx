import React from 'react';

class HasReceived extends React.Component {
  render () {
    return (
      <div className="has-received">
        <div className="status bb1-gray">
          <i className="ico ico-info_confirm_finish"/>
          <p className="pt15 fs15">您的宝贝已签收！</p>
          <p className="fs15">谢谢支持，告知基友们，一起夺宝吧！</p>
          <p className="gray fs14">如有疑问，请联系客服邮箱：</p>
          <p className="red fs14">yyg-kefu@qq.com</p>
        </div>
        <div className="receiver-info bb1-gray">
          <p className="header bb1-gray">收货人信息</p>
          <p className="gray">收货人：{this.props.name}</p>
          <p className="gray">手机号：{this.props.phone}</p>
          <p className="gray">地&nbsp;&nbsp;&nbsp;址：{this.props.address}</p>
        </div>
      </div>
    )
  }
}

export default HasReceived;
