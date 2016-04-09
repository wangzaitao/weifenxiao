import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

import Auth from '../../api/auth';
import * as ContentAPI from '../../api/content';

class PayItem extends React.Component {
  render() {
    let props = this.props, viewNumberLink, orderNumbers = props.orderNumbers, orderNumbersDom;

    if(orderNumbers.length > 7) {
      orderNumbers = orderNumbers.slice(0, 7);
      if(props.payStatus === 2) {
        viewNumberLink = <CustomLink key={7} to={'/numbers/' + props.id} className="red num-count-item fr txt-one-line" isOuterURL={true}>查看全部</CustomLink>;
      }
    }

    orderNumbersDom = orderNumbers.map(function(item, index){
      return <span className="num-count-item txt-one-line" key={index}>{item}</span>;
    });
    orderNumbersDom.push(viewNumberLink);

    return (
      <div className="mt20">
        <span className="red fl">{'（第' + props.term + '期） '}</span>
        <span className="yellow fr">{props.numCount}人次</span>
        <div className="txt-one-line">{props.title}</div>
        <span className="num-count-title">夺宝号码: </span>
        <div className="num-count-wrap">
          {orderNumbersDom}
        </div>
      </div>
    );
  }
}

PayItem.propTypes = {
  id: PropTypes.string,
  term: PropTypes.number,
  title: PropTypes.string,
  numCount: PropTypes.number,
  payStatus: PropTypes.number,
  orderNumbers: PropTypes.array
};

class PayResult extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activityId: this.props.params.activityId,
      payId: this.props.params.payId,
      payAmount: this.props.params.amount,
      payStatus: this.props.params.amount ? 2 : 0,
      count: this.props.location.query.count === undefined ? this.props.params.amount : this.props.location.query.count,
      activityList: []
    };
  }
  componentWillMount () {
    let targetActivityList = this.props.location.state ? this.props.location.state.activityList : [];
    Auth.updateUserInfo();
    if (this.state.payId) {  // pay with alipay etc.
      targetActivityList = [];
      ContentAPI.getPayStatus(this.state.payId, function (data) {
        if (Object.keys(data).length) {
          var count = 0, orderList = [];
          if (data.extend.refer_order_numbers) {
            orderList.push({
              activity_id: data.extend.activity_id,
              refer_order_numbers: data.extend.refer_order_numbers
            });
          } else {
            orderList = data.extend.refer_order_list;
          }
          orderList.map(function (item) {
            count += item.refer_order_numbers.length;
            ContentAPI.getActivityDetailLite(item.activity_id, function (data) {
              targetActivityList.push({
                id: item.activity_id,
                term: data.term || '',
                title: data.name || '',
                orderNumbers: item.refer_order_numbers,
                numCount: item.refer_order_numbers.length
              })
            });
          });
          this.setState({
            payStatus: data.status,
            payAmount: data.extend.quantity,
            count: count
          });
        }
      }.bind(this));
    }

    targetActivityList = targetActivityList.map(function(item) {
      item.payStatus = this.state.payStatus;
      return item;
    }.bind(this));

    this.setState({
      activityList: targetActivityList
    });
  }

  render() {
    var statusContent, payItems;
    if (this.state.payStatus === 0 || this.state.payStatus === 1) {
      statusContent = (
        <div className="status">
          <i className="ico ico-participate_fail" />
          <p className="pt15 fs15">未支付成功，请重新支付！</p>
          <p className="red">如果您已完成支付，可能因网络故障未及时到帐，</p>
          <p className="red">请稍候进入夺宝记录查看您的购买结果。</p>
          <p className="gray">如有疑问，请联系客服邮箱：<span className="red">yyg-kefu@qq.com</span></p>
        </div>
      );
    } else if (this.state.payStatus === 2) {
      statusContent = (
        <div className="status">
          <i className="ico ico-participate_success"/>
          <p className="pt15">恭喜，此次参与<span className="red">{this.state.payAmount}</span>人次成功！</p>
          <p>请等待系统为您揭晓！</p>
          {this.state.payAmount > this.state.count ? <p className="red fs15 mt5">此期商品刚才只剩余{this.state.count}人次，</p> : null}
          {this.state.payAmount > this.state.count ? <p className="red fs15">多支付的金额已存入您的账户余额。</p> : null}
        </div>
      );
    } else {
      statusContent = (
        <div className="status">
          <i className="ico ico-participate_fail" />
          <p className="pt15 fs15">参与失败！</p>
          <p className="red">多支付的金额已以夺宝币的形式充值到您的账户中，</p>
          <p className="red">下次参与可直接抵扣</p>
          <p className="gray">如有疑问，请联系客服邮箱：<span className="red">yyg-kefu@qq.com</span></p>
        </div>
      );
    }

    payItems = this.state.activityList.map(function(item, index){
      return (<PayItem {...item} key={index} /> );
    });

    return (
      <div className="bgc-white user-pay-result">
        {statusContent}
        <div className="next-actions">
          <CustomLink to="/" className="continue" isOuterURL={true}><div>继续夺宝</div></CustomLink>
          {
            this.state.payStatus !== 4 ? <CustomLink to="/user/my_activity_record" className="record my-activity-record"><div>查看夺宝记录</div></CustomLink> :
            <CustomLink to="/user/my_charge_record" className="record my-charge-record"><div>查看充值记录</div></CustomLink>
          }
        </div>
        <div className="activity-infos mt20">
          {this.state.payStatus === 4 ? <p>您未能成功参与此次夺宝！</p> :
                (this.state.payStatus === 2 ? <p>您成功参与了{this.state.activityList.length}件宝贝，共<span className="yellow">{this.state.payAmount}</span>次夺宝，信息如下</p> : undefined)
          }
          {payItems}
        </div>
      </div>
    );
  }
}

PayResult.contextTypes = {
  history: PropTypes.object.isRequired,
  location: React.PropTypes.object
};

export default PayResult;
