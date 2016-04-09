import React from 'react';
import {browserHistory} from 'react-router';
import CustomLink from '../base/CustomLink.jsx';

import {AddToCart} from '../base/AddToCart.jsx';
import {b64encode} from '../../utils/cryption';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';
import {GoodsCover} from '../base/FallbackImage.jsx';

class ActivityRecordItem extends React.Component {
  _onUsernameClick (e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onUsernameClick({
      userId: this.props.winner.uid,
      nickname: this.props.winner.nick_name,
      avatar: this.props.winner.avatar
    });
    var uParams = {nickname: this.props.winner.nick_name, avatar: this.props.winner.avatar};
    browserHistory.push({pathname: '/uc/' + this.props.winner.uid, query: {p: encodeURIComponent(b64encode(JSON.stringify(uParams)))}, state: uParams});
    window.location.reload()
  }
  render () {
    var progress = Math.floor(this.props.current_amount * 100.0 / this.props.target_amount),
        progressContent, bottomContent;
    if (this.props.status == 1) {
      progressContent = (
        <span className="gray" style={{whiteSpace: 'nowrap'}}>总需{this.props.target_amount}次， 剩余
          <span className="red">{this.props.target_amount - this.props.current_amount}</span>次
        </span>
      );
      bottomContent = undefined;
    } else if (this.props.status == 2) {
      progressContent = (
        <span className="gray">总需{this.props.target_amount}次</span>
      );
      bottomContent = (
        <div className="revealing">
          <span>揭晓中：<span className="red">正在开奖，倒计时...</span></span>
        </div>
      )
    } else {
      progressContent = <span className="gray">总需{this.props.target_amount}次</span>;
      bottomContent = (
        <div className="revealed">
          <p>获奖者：
            <span className="blue" onTouchTap={this._onUsernameClick.bind(this)}>{this.props.winner.nick_name}</span>
            <span className="gray">{' (' + (this.props.winner.addr || '未知') + ')'}</span>
          </p>
          <p>本期参与：<span className="red">{this.props.winner.num_count}</span>人次</p>
          <p>获奖号码：<span className="red">{this.props.lucky_number}</span></p>
          <p>揭晓时间：{this.props.winner.time}</p>
        </div>
      )
    }

    var isOwn = G.userID && G.userID == this.props.uid, appendText = isOwn ? '追加' : '跟买', appendEle,
        numberLink = isOwn ? '/numbers/' + this.props.id : '/unumbers/' + this.props.id + '/' + this.props.uid,
        numberText = isOwn ? '查看我的号码' : '查看Ta的号码';
    if (this.props.status == 1 && this.props.price !== 0) {
      appendEle = <div className="append" onTouchTap={this._editCart.bind(this)}><div>{appendText}</div></div>
    } else if (this.props.status == 1 && this.props.price == 0) {
      appendEle = <CustomLink to={"/activity/" + this.props.id} className="append"><div>{appendText}</div></CustomLink>
    }
    return (
      <li className="activity-record-item bb1-gray">
        <div className="cover">
          <GoodsCover src={this.props.goods.cover} styles={{width: '6em'}} />
        </div>
        <div className="infos">
          <div className="title">
            <CustomLink to={'/activity/' + this.props.id}>{'第' + this.props.term + '期：' + this.props.goods.name}</CustomLink>
            {appendEle}
          </div>
          <div className="m-activity-progress mt5">
            {progressContent}
            <p className="wrap" style={this.props.status == 4 ? {display: 'none'} : {}}>
              <span className="process-bar"><i className="color" style={{width: progress + '%'}} /></span>
            </p>
          </div>
          <div className="amount-number mt8">
            <span>参与人次：<span className="red">{this.props.my.num_count}</span>人次</span>
            <CustomLink to={numberLink} className="blue fr">{numberText}</CustomLink>
          </div>
          {bottomContent}
        </div>
      </li>
    )
  }

  _editCart(e){
    e.preventDefault;
    this.props.editCart.bind(this)(e);
  }
}

var WrappedActivityRecordItem = AddToCart(ActivityRecordItem);

class UserActivityRecord extends React.Component {
  static loading = !1;

  constructor(props) {
    super(props);
    this.state = {
      noData: false,
      page: 1,
      hasMoreData: true,
      activityRecords: []
    };
  }

  handleActivityRecordScroll () {
    if (window.location.pathname.indexOf('/uc') != 0 || !$('li.tab-user-ar-list').hasClass('active')) {
      return false;
    }

    if(!UserActivityRecord.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      UserActivityRecord.loading = !0;
      var loadingEle = $('div.loading-activity-record').show();
      ContentAPI.getUserActivityRecords(this.props.uid, {page: this.state.page + 1}, function (data, total) {
        loadingEle.hide();
        var newActivityRecords = this.state.activityRecords.concat(data);
        this.setState({
          page: this.state.page + 1,
          activityRecords: newActivityRecords,
          hasMoreData: total > newActivityRecords.length
        });
        UserActivityRecord.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-activity-record').show();
    }
  }
  componentWillMount() {
    UserActivityRecord.loading = !0;
    ContentAPI.getUserActivityRecords(this.props.uid, {page: this.state.page}, function (data, total) {
      this.setState({
        activityRecords: data,
        noData: data.length === 0,
        hasMoreData: total > data.length
      });
      UserActivityRecord.loading = !1;
    }.bind(this));
    this.handleActivityRecordScroll = this.handleActivityRecordScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleActivityRecordScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleActivityRecordScroll);
  }

  render() {
    if(this.state.noData) {
      return <NoAPIDataTip icon="my_activitys_empty_icon" tip="Ta还没有夺宝记录哦！" btnText="立即夺宝" reloadUrl='/' isOuterURL={true} />;
    }

    var activityRecordItems = this.state.activityRecords.map(function(item, index) {
      return (<WrappedActivityRecordItem {...item} uid={this.props.uid} onUsernameClick={this.props.onUsernameClick} key={index} /> );
    }.bind(this));
    return (
      <div className="m-activityRecord-container">
        <ul>{activityRecordItems}</ul>
        <div className="loading-activity-record gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
      </div>
    );
  }
}

export default UserActivityRecord;
