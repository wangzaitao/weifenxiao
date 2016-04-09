import React, { Component, PropTypes } from 'react';

import PastRecordItem from './PastRecordItem.jsx';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';
import {startWith} from '../../utils/common';

require('./records.css');

class PastWinnerRecords extends Component {
  static loading = !1;
  constructor(props) {
    super(props);
    this.state = {
      gid: this.props.params.gid,
      price: parseInt(this.props.location.query.price),
      page: 1,
      pastRecords: [],
      hasMoreData: true,
      noData: false
    };
  }
  handlePastRecordsScroll () {
    if (!startWith(window.location.pathname, '/records')) {
      return false;
    }
    if(!PastWinnerRecords.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      PastWinnerRecords.loading = !0;
      var loadingEle = $('div.loading-past-records').show();
      ContentAPI.getPastRecords({gid: this.state.gid, page: this.state.page + 1}, function (data, total) {
        loadingEle.hide();
        var newPastRecords = this.state.pastRecords.concat(data);
        this.setState({
          page: this.state.page + 1,
          pastRecords: newPastRecords,
          hasMoreData: total > newPastRecords.length
        });
        PastWinnerRecords.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-past-records').show();
    }
  }
  componentWillMount () {
    PastWinnerRecords.loading = !0;
    ContentAPI.getPastRecords({gid: this.state.gid, page: this.state.page}, function (data, total) {
      this.setState({
        pastRecords: data,
        hasMoreData: total > data.length,
        noData: data.length === 0
      });
      PastWinnerRecords.loading = !1;
    }.bind(this));
    this.handlePastRecordsScroll = this.handlePastRecordsScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handlePastRecordsScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handlePastRecordsScroll);
  }

  render () {
    if(this.state.noData) {
      return <NoAPIDataTip icon="my_activitys_empty_icon" tip="暂无往期揭晓商品！" btnText="立即夺宝" reloadUrl='/' />;
    }

    var pastRecordItems = this.state.pastRecords.map(function(item, index) {
      return (<PastRecordItem {...item} price={this.state.price} key={index} last={this.state.pastRecords.length - 1 == index} /> );
    }.bind(this));

    return (
      <div className="m-body" style={{backgroundColor: '#f8f8f8'}}>
        <ul className="past-record-list">
          {pastRecordItems}
        </ul>
        <div className="loading-past-records gray loading-text">{ this.state.hasMoreData ? '正在加载更多数据' : '已经没有更多' }</div>
      </div>
    );
  }
}

export default PastWinnerRecords;
