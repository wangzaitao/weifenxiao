import React, { Component, PropTypes } from 'react';

var COUPON_QAS = [
  {
    'index': 1,
    'title': '怎么获得红包？',
    'answers': ['通过好友邀请获得', '通过朋友圈分享获得']
  },
  {
    'index': 2,
    'title': '红包可以做什么？',
    'answers': ['可以抵扣在线支付时的实际支付金额']
  },
  {
    'index': 3,
    'title': '红包可以多个一起使用吗？',
    'answers': ['不能，单次支付时只能使用一次。']
  },
  {
    'index': 4,
    'title': '一个红包可以拆开使用吗？',
    'answers': ['不能，一个红包只能一次性使用，不能分开使用。']
  },
  {
    'index': 5,
    'title': '过期的红包还能用吗？',
    'answers': ['不能，过期的红包就不能使用了，所以请一定要注意每个红包的有效期，并及时使用哦！']
  },
  {
    'index': 6,
    'title': '支付成功后万一购买的商品没有了，红包会退回来吗？',
    'answers': ['需要根据实际情况来判断，如果购买成功的商品价值超过了红包的价值，红包就会成功使用；如果购买成功的商品价值小于红包的价值，红包会自动返还到您的账户里。']
  }
];

class CouponQAItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false
    };
  }
  toggleAnswers () {
    this.setState({showAnswer: !this.state.showAnswer})
  }
  render () {
    var allAnswers = [];
    for (var i=0; i < this.props.answers.length; i++) {
      allAnswers.push(<p className="gray" key={i}>{this.props.answers[i]}</p>);
    }
    var liStyles = {borderBottom: '1px solid #e5e5e5'};
    if (this.state.showAnswer) {
      liStyles['paddingTop'] = '1em'
    } else {
      liStyles['padding'] = '1em 0'
    }
    return (
      <li style={liStyles} onTouchTap={this.toggleAnswers.bind(this)}>
        <div className="fs16" style={{position: 'relative', padding: '0 1em'}}>
          <span className="inline-block mr16">{this.props.index + '. ' + this.props.title}</span>
          <i className={"ico-right ico ico-" + (this.state.showAnswer ? 'icon_arrow_up_default' : 'icon_arrow_down_default')} />
        </div>
        <div style={{display: this.state.showAnswer ? 'block' : 'none', backgroundColor:'#f8f8f8', marginTop: '0.625em', borderTop: '1px solid #e5e5e5', padding: '0.625em 1.25em 1em 1.3125em'}}>
          {allAnswers}
        </div>
      </li>
    )
  }
}

CouponQAItem.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  answers: PropTypes.array
};

class CouponQA extends Component {
  render () {
    var qaItems = COUPON_QAS.map(function(item, index) {
      return (<CouponQAItem {...item} key={index} />);
    });

    return (
      <div className="m-body">
        <ul style={{height: '100%', backgroundColor: '#fff'}}>
          {qaItems}
        </ul>
      </div>
    );
  }
}

export default CouponQA;
