import React from 'react';

class ToBeReceived extends React.Component {
  render () {
    return (
      <div className="to-be-received">
        <div className="status bb1-gray">
          <i className="ico ico-info_confirm_finish"/>
          <p>信息已提交，请耐心等待宝贝儿上门吧！</p>
        </div>
        <div className="tips bb1-gray">
          <p className="header bb1-gray">温馨提示</p>
          <p className="gray">1）客服会在7个工作日内安排发货。发货通知将以短信形式发送到收货人手机号上，请注意查收。</p>
          <p className="gray">2）收货注意事项：</p>
          <p className="gray">----勿让他人代收</p>
          <p className="gray">----家电类务必通电验收、否则不予退换</p>
          <p className="gray">----发现问题请当场拒收</p>
          <p className="gray">----验收时拍照，以免不必要的纠纷</p>
          <p className="gray">客服邮箱：<span className="red">yyg-kefu@qq.com</span></p>
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

export default ToBeReceived;
