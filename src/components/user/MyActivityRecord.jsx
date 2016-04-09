import React from 'react';
import CustomLink from '../base/CustomLink.jsx';

import {AddToCart} from '../base/AddToCart.jsx';
import {b64encode} from '../../utils/cryption';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';
import {GoodsCover} from '../base/FallbackImage.jsx';
import Carousel from '../base/Carousel.jsx';

class ActivityRecordItem extends React.Component {
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
      var uParams = {nickname: this.props.winner.nick_name, avatar: this.props.winner.avatar};
      progressContent = <span className="gray">总需{this.props.target_amount}次</span>;
      bottomContent = (
        <div className="revealed">
          <p>获奖者：
            <CustomLink to={"/uc/" + this.props.winner.uid + '?p=' + encodeURIComponent(b64encode(JSON.stringify(uParams)))} isOuterURL={true}>
              <span className="blue">{this.props.winner.nick_name}</span>
            </CustomLink>
            <span className="gray">{'  (' + (this.props.winner.addr || '未知') + ')'}</span>
          </p>
          <p>本期参与：<span className="red">{this.props.winner.num_count}</span>人次</p>
          <p>获奖号码：<span className="red">{this.props.lucky_number}</span></p>
          <p>揭晓时间：{this.props.winner.time}</p>
        </div>
      )
    }

    return (
      <li className="activity-record-item bb1-gray">
        <div className="cover">
          <GoodsCover src={this.props.goods.cover} styles={{width: '6em'}} />
        </div>
        <div className="infos">
          <div className="title">
            <CustomLink to={'/activity/' + this.props.id} isOuterURL={true}>{'第' + this.props.term + '期：' + this.props.goods.name}</CustomLink>
            {this.props.status == 1 && this.props.price !== 0 ? <div className="append" onTouchTap={this._editCart.bind(this)}><div>追加</div></div> : undefined}
          </div>
          <div className="m-activity-progress mt5">
            {progressContent}
            <p className="wrap" style={this.props.status == 4 ? {display: 'none'} : {}}>
              <span className="process-bar"><i className="color" style={{width: progress + '%'}} /></span>
            </p>
          </div>
          <div className="amount-number mt8">
            <span>参与人次：<span className="red">{this.props.my.num_count}</span>人次</span>
            <CustomLink to={'/numbers/' + this.props.id} className="blue fr" isOuterURL={true}>查看我的号码</CustomLink>
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

var WrapedActivityRecordItem = AddToCart(ActivityRecordItem);

class MyActivityRecord extends React.Component {
  static loading = !1;

  constructor(props) {
    super(props);
    this.state = {
      noData: false,
      page: 1,
      hasMoreData: true,
      activityRecords: [],
      recommendList: []
    };
  }

  handleActivityRecordScroll () {
    if (window.location.pathname != '/user/my_activity_record') {
      return false;
    }

    if(!MyActivityRecord.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      MyActivityRecord.loading = !0;
      var loadingEle = $('.loading-activity-record').show();
      ContentAPI.getMyActivityRecords({page: this.state.page + 1}, function (data, total) {
        loadingEle.hide();
        var newActivityRecords = this.state.activityRecords.concat(data);
        this.setState({
          page: this.state.page + 1,
          activityRecords: newActivityRecords,
          hasMoreData: total > newActivityRecords.length
        });
        MyActivityRecord.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('.loading-activity-record').show();
    }
  }
  componentWillMount() {
    MyActivityRecord.loading = !0;
    ContentAPI.getMyActivityRecords({page: this.state.page}, function (data, total) {
      this.setState({
        activityRecords: data,
        noData: data.length === 0,
        hasMoreData: total > data.length
      });
      MyActivityRecord.loading = !1;
    }.bind(this));
    this._loadRecommendList();

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
      return (
        <div className="win-record-empty-wrap">
          <NoAPIDataTip icon="my_activitys_empty_icon" tip="暂时还没有夺宝记录哦！" btnText="立即夺宝" reloadUrl='/' isOuterURL={true} />
          <div className="recommend-list-wrap">
            <div className="c-r-title">热门宝贝</div>
            <Carousel items={this.state.recommendList} isOuterURL={true} />
          </div>
        </div>
      );
    }

    var activityRecordItems = this.state.activityRecords.map(function(item, index) {
      return (<WrapedActivityRecordItem {...item} key={index} /> );
    });
    return (
      <div className="m-activityRecord-container">
        <ul className="bgc-white">
          {activityRecordItems}
        </ul>
        <div className="loading-activity-record gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
      </div>
    );
  }

  _loadRecommendList(){
    let self = this, sceneId = 1;
    ContentAPI.getRecommendActivitys(sceneId)
      .then(res => {
        if(res){
          self.setState({
            recommendList: res
          });
        }
      });
  }
}

export default MyActivityRecord;
