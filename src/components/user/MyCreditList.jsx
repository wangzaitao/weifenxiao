import React, { Component, PropTypes } from 'react';

import SwipeViews from '../base/SwipeViews.jsx';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';

class CreditItem extends Component {
  render () {
    return (
      <li className="credit-item">
        <div className="inline-block">
          <p>{this.props.title}</p>
          <p className="gray">{this.props.time}</p>
        </div>
        <div className="fr red mt10">{(this.props.type === 1 ? '+' : '') + this.props.amount}</div>
      </li>
    )
  }
}

CreditItem.propTypes = {
  type: PropTypes.number,
  title: PropTypes.string,
  time: PropTypes.string,
  amount: PropTypes.number
};

class CreditList extends Component {
  static loading = !1;
  constructor(props) {
    super(props);
    this.state = {
      noData: this.props.data.length === 0,
      page: 1,
      credits: this.props.data,
      hasMoreData: this.props.total > this.props.data.length
    };
  }

  handleCreditListScroll () {
    if (window.location.pathname != '/user/credit_details' || !$('li.tab-' + this.props.tag + '-list').hasClass('active')) {
      return false;
    }

    if(!CreditList.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      CreditList.loading = !0;
      var loadingEle = $('div.loading-' + this.props.tag).show();
      ContentAPI.getCreditRecords({page: this.state.page + 1, type: this.props.type, size: 20}, function (data, total) {
        loadingEle.hide();
        var newCredits = this.state.credits.concat(data);
        this.setState({
          page: this.state.page + 1,
          credits: newCredits,
          hasMoreData: total > newCredits.length
        });
        CreditList.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-' + this.props.tag).show();
    }
  }
  componentWillMount () {
    this.handleCreditListScroll = this.handleCreditListScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleCreditListScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleCreditListScroll);
  }

  render () {
    if(this.state.noData) {
      var tip = this.props.type === 1 ? '暂时还没有积分来源哦！' : '暂时还没有积分兑换记录哦！';
      return <NoAPIDataTip icon="my_credit_empty" tip={tip} />;
    }

    var creditItems = this.state.credits.map(function (item, index) {
      item['type'] = this.props.type;
      return <CreditItem {...item} key={index} />
    }.bind(this));
    return (
      <div className="credit-list-container bgc-white">
        <ul>{creditItems}</ul>
        <div className={"gray loading-text loading-" + this.props.tag}>{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
      </div>
    )
  }
}

CreditList.propTypes = {
  type: PropTypes.number,
  tag: PropTypes.string,
  data: PropTypes.array,
  total: PropTypes.number
};

class MyCreditList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: null,
      sourceCount: 0,
      usages: null,
      useCount: 0
    };
  }
  componentWillMount () {
    ContentAPI.getCreditRecords({page: 1, type: 1, size: 20}, function (data, total) {
      this.setState({sources: data, sourceCount: total})
    }.bind(this));
    ContentAPI.getCreditRecords({page: 1, type: 2, size: 20}, function (data, total) {
      this.setState({usages: data, useCount: total})
    }.bind(this));
  }

  render() {
    if (this.state.sources === null || this.state.usages === null) {
      return null;
    }

    return (
      <SwipeViews>
        <div title="积分来源" className="tab-source-list">
          <CreditList type={1} tag="source" data={this.state.sources} total={this.state.sourceCount} />
        </div>
        <div title="积分兑换" className="tab-usage-list">
          <CreditList type={2} tag="usage" data={this.state.usages} total={this.state.useCount} />
        </div>
      </SwipeViews>
    );
  }
}

export default MyCreditList;
