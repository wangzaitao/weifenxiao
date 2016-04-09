import React, { Component, PropTypes } from 'react';

import NumberItem from './NumberItem.jsx';
import * as ContentAPI from '../../api/content';

class MyNumbers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.activityId,
      userId: this.props.params.uid || '',
      title: '',
      term: '',
      amount: '',
      numberList: []
    };
  }
  componentWillMount () {
    ContentAPI.getActivityDetail(this.state.id, function (activity) {
      if (Object.keys(activity).length) {
        this.setState({
          title: activity.goods.name,
          term: activity.term
        });
        if (this.state.userId) {
          ContentAPI.getUserBuyRecords(this.state.id, this.state.userId, function (data) {
            var count = 0, myNumbers = data.map(function (item) {
              count += item.num_count;
              return {
                numbers: item.numbers,
                numCount: item.num_count,
                time: item.time,
                orderId: item.order_id_str
              }
            });
            this.setState({numberList: myNumbers, amount: count})
          }.bind(this));
        } else {
          ContentAPI.getMyBuyRecords(this.state.id, function (data) {
            var myNumbers = data.map(function (item) {
              return {
                numbers: item.numbers,
                numCount: item.num_count,
                time: item.time,
                orderId: item.order_id_str
              }
            });
            this.setState({numberList: myNumbers, amount: activity.my ? activity.my.num_count : 0})
          }.bind(this));
        }
      }
    }.bind(this));
  }

  render () {
    if (!this.state.numberList.length) {
      return <div className="m-body">
        <div className="loading-text gray">努力加载中...</div>
      </div>
    }

    var numberItems = this.state.numberList.map(function(item, index) {
      item['showNumbers'] = !index;
      item['activityId'] = this.state.id;
      return <NumberItem {...item} key={index} />;
    }.bind(this));

    return (
      <div className="m-body">
        <div style={{padding: '0.9375em 0.875em', fontSize: '0.9375em'}}>
          <p className="fs16">{this.state.title}</p>
          <p className="term gray">{'期号：' + this.state.term}</p>
          <p className="amount gray">本期参与：<span className="red">{this.state.amount}</span> 人次</p>
          <p className="gray">以下是您的所有夺宝号码：</p>
        </div>
        <ul className="fs15">
          {numberItems}
        </ul>
      </div>
    );
  }
}

export default MyNumbers;
