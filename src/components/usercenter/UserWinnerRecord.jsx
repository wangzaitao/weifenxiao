import React from 'react';
import CustomLink from '../base/CustomLink.jsx';

import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';
import {GoodsCover} from '../base/FallbackImage.jsx';

class WinnerRecordItem extends React.Component {
  render () {
    return (
      <li className="activity-record-item bb1-gray">
        <div className="cover">
          <GoodsCover src={this.props.goods.cover} styles={{width: '6em'}} />
        </div>
        <div className="infos">
          <div className="title">
            <CustomLink to={'/activity/' + this.props.id}>{'第' + this.props.term + '期：' + this.props.goods.name}</CustomLink>
          </div>
          <div className="m-activity-progress mt5">
            <span className="gray">总需{this.props.target_amount}次</span>
          </div>
          <div className="revealed">
            <p>获奖号码：<span className="red">{this.props.lucky_number}</span></p>
            <p>本期参与：<span className="red">{this.props.winner.num_count}</span>人次</p>
            <p>揭晓时间：{this.props.winner.time}</p>
          </div>
        </div>
      </li>
    )
  }
}

class UserWinnerRecord extends React.Component {
  static loading = !1;

  constructor(props) {
    super(props);
    this.state = {
      noData: false,
      page: 1,
      hasMoreData: true,
      winnerRecords: []
    };
  }

  handleWinnerRecordScroll () {
    if (window.location.pathname.indexOf('/uc') != 0 || !$('li.tab-user-wr-list').hasClass('active')) {
      return false;
    }

    if(!UserWinnerRecord.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      UserWinnerRecord.loading = !0;
      var loadingEle = $('div.loading-winner-record').show();
      ContentAPI.getUserActivityRecords(this.props.uid, {page: this.state.page + 1}, function (data, total) {
        loadingEle.hide();
        var newWinnerRecords = this.state.winnerRecords.concat(data);
        this.setState({
          page: this.state.page + 1,
          winnerRecords: newWinnerRecords,
          hasMoreData: total > newWinnerRecords.length
        });
        UserWinnerRecord.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-winner-record').show();
    }
  }
  componentWillMount() {
    UserWinnerRecord.loading = !0;
    ContentAPI.getUserActivityRecords(this.props.uid, {page: this.state.page, win: 1}, function (data, total) {
      this.setState({
        winnerRecords: data,
        noData: data.length === 0,
        hasMoreData: total > data.length
      });
      UserWinnerRecord.loading = !1;
    }.bind(this));
    this.handleWinnerRecordScroll = this.handleWinnerRecordScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleWinnerRecordScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleWinnerRecordScroll);
  }

  render() {
    if(this.state.noData) {
      return <NoAPIDataTip icon="my_win_history_empty_icon" tip="Ta还没有中奖记录哦！" btnText="立即夺宝" reloadUrl='/' isOuterURL={true} />;
    }

    var winnerRecordItems = this.state.winnerRecords.map(function(item, index) {
      return (<WinnerRecordItem {...item} uid={this.props.uid} key={index} /> );
    }.bind(this));
    return (
      <div className="m-winnerRecord-container">
        <ul>{winnerRecordItems}</ul>
        <div className="loading-winner-record gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
      </div>
    );
  }
}

export default UserWinnerRecord;
