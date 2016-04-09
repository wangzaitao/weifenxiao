import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';
import CustomLink from '../base/CustomLink.jsx';
import {startWith} from '../../utils/common';
import {b64encode} from '../../utils/cryption';
import {UserAvatar} from '../base/FallbackImage.jsx';

class BuyRecordItem extends Component {
  render () {
    var uParams = {nickname: this.props.nick_name, avatar: this.props.avatar};
    return (
      <li className="buy-records-item">
        <div className="avatar pr10">
          <UserAvatar src={this.props.avatar || require("../../img/default_avatar.png")}/>
        </div>
        <div className="text">
          <p className="user-info">
            <CustomLink to={"/uc/" + this.props.uid} query={{p: encodeURIComponent(b64encode(JSON.stringify(uParams)))}} state={uParams}>
              <span className="username pr5 blue">{this.props.nick_name}</span>
            </CustomLink>
            <span className="address gray">{'(' + (this.props.addr || '未知') + ' IP：' + (this.props.ip || '未知') + ')'}</span>
          </p>
          <p>
            <span className="num pr5">参与了<span className="red">{this.props.num_count}</span>人次</span>
            <span className="time gray">{this.props.time}</span>
          </p>
        </div>
      </li>
    )
  }
}

BuyRecordItem.propTypes = {
  addr: PropTypes.string,
  nick_name: PropTypes.string,
  ip: PropTypes.string,
  avatar: PropTypes.string,
  num_count: PropTypes.number,
  numbers: PropTypes.array,
  time: PropTypes.string,
  uid: PropTypes.number
};

class BuyRecordList extends Component {
  static loading = !1;

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      recordList: [],
      hasMoreData: true
    };
  }
  handleRecordListScroll () {
    if (!startWith(window.location.pathname, '/activity/') && !startWith(window.location.pathname, '/activity_latest/')) {
      return false;
    }
    if(!BuyRecordList.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      BuyRecordList.loading = !0;
      var loadingEle = $('div.loading-buy-records').show();
      ContentAPI.getAllBuyRecords(this.props.id, {page: this.state.page + 1}, function (data, total) {
        loadingEle.hide();
        var newRecordList = this.state.recordList.concat(data);
        this.setState({
          page: this.state.page + 1,
          recordList: newRecordList,
          hasMoreData: total > newRecordList.length
        });
        BuyRecordList.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-buy-records').show();
    }
  }
  componentWillMount () {
    BuyRecordList.loading = !0;
    ContentAPI.getAllBuyRecords(this.props.id, {page: this.state.page}, function (data, total) {
      this.setState({
        recordList: data,
        hasMoreData: total > data.length
      });
      BuyRecordList.loading = !1;
    }.bind(this));
    this.handleRecordListScroll = this.handleRecordListScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleRecordListScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleRecordListScroll);
  }

  render () {
    var buyRecordsItems = this.state.recordList.map(function(item, index) {
      return (<BuyRecordItem {...item} key={index} /> );
    });

    return (
      <div className="m-detail-all-buy-records">
        <div className="buy-records-header">
          <span>所有购买记录</span>
          <span className="start-time gray ml10" style={{fontSize: '0.875em'}}>{'自' + this.props.startTime.split('.')[0] + '开始'}</span>
        </div>
        <ul className="buy-records-list">
          {buyRecordsItems}
        </ul>
        <div className="loading-buy-records loading-text gray" style={{paddingBottom: '3.75em', backgroundColor: '#f8f8f8'}}>{ this.state.hasMoreData ? '正在加载更多数据' : '已经没有更多' }</div>
      </div>
    )
  }
}

export default BuyRecordList;

BuyRecordList.propTypes = {
  id: PropTypes.string,
  startTime: PropTypes.string
};
