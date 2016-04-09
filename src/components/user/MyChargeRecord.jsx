import React, { Component, PropTypes } from 'react';

import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';

class ChargeRecordItem extends Component {
  render () {
    return (
      <li className="charge-record-item bb1-gray" key={this.props.time}>
        <div className="source-time">
          <p className="source">{this.props.title}</p>
          <p className="time gray fs14">{this.props.time}</p>
        </div>
        <div className="amount fr red mt8">
          <span>￥{(this.props.price).toFixed(1)}</span>
        </div>
      </li>
    )
  }
}

class MyChargeRecord extends Component {
  static loading = !1;

  constructor(props) {
    super(props);
    this.state = {
      noData: false,
      page: 1,
      hasMoreData: true,
      chargeRecords: []
    };
  }
  handleChargeRecordScroll () {
    if (window.location.pathname != '/user/my_charge_record') {
      return false;
    }

    if(!MyChargeRecord.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      MyChargeRecord.loading = !0;
      var loadingEle = $('div.loading-charge-record').show();
      ContentAPI.getMyChargeRecords({page: this.state.page + 1}, function (data, total) {
        loadingEle.hide();
        var newChargeRecords = this.state.chargeRecords.concat(data);
        this.setState({
          page: this.state.page + 1,
          chargeRecords: newChargeRecords,
          hasMoreData: total > newChargeRecords.length
        });
        MyChargeRecord.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-charge-record').show();
    }
  }
  componentWillMount() {
    MyChargeRecord.loading = !0;
    ContentAPI.getMyChargeRecords({page: this.state.page}, function (data, total) {
      this.setState({
        chargeRecords: data,
        noData: data.length === 0,
        hasMoreData: total > data.length
      });
      MyChargeRecord.loading = !1;
    }.bind(this));
    this.handleChargeRecordScroll = this.handleChargeRecordScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleChargeRecordScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleChargeRecordScroll);
  }

  render() {
    if(this.state.noData) {
      return <NoAPIDataTip icon="transaction_empty_icon" tip="您还没有充值记录哦！" btnText="立即充值" reloadUrl='/user/charge' />;
    }

    var chargeRecordItems = this.state.chargeRecords.map(function(item, index) {
      return (<ChargeRecordItem {...item} key={index} /> );
    });
    return (
      <div className="m-chargeRecord-container">
        <div className="introduction bb1-gray">
          <p>充值记录为您参与“一元购”所用的花费来源。</p>
          <p>充值金额用于购买夺宝币，1元 = 1夺宝币</p>
        </div>
        <ul className="bgc-white mt5">
          {chargeRecordItems}
        </ul>
        <div className="loading-charge-record gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
      </div>
    );
  }
}

export default MyChargeRecord;
