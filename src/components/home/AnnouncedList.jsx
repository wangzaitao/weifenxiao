import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import CustomLink from '../base/CustomLink.jsx';

import * as ContentAPI from '../../api/content';
import {GoodsCover} from '../base/FallbackImage.jsx';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import CountdownTimer from '../base/CountdownTimer.jsx';

class AnnouncedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      amount: this.props.amount,
      userId: this.props.userId || '',
      userName: this.props.userName || '',
      luckyNumber: this.props.luckyNumber || ''
    };
  }
  countdownFinished () {
    var ele = $(ReactDOM.findDOMNode(this));
    ele.find('span.countdown').text('计算中...');
    setTimeout(function () {
      ContentAPI.getRevealedInfo(this.props.id, function (result) {
        if (Object.keys(result).length) {
          this.setState({
            status: 4,
            amount: result.winner.num_count,
            userId: result.winner.uid,
            userName: result.winner.nick_name,
            luckyNumber: result.lucky_number
          });
        }
      }.bind(this));
    }.bind(this), 3000);
  }
  render () {
    var bottomDiv;
    if (this.state.status === 4) {
      bottomDiv = (
        <div className="m-activity-announced-info gray">
          <p className="username">获奖者: <span className="blue">{this.state.userName}</span></p>
          <p className="user-id">用户ID: {this.state.userId}</p>
          <p className="lucky-number">幸运号码: <span className="red">{this.state.luckyNumber}</span></p>
          <p className="amount">本期参与: <span className="red">{this.state.amount}</span>人次</p>
        </div>
      );
    } else {
      bottomDiv = (
        <div className="m-activity-countdown">
          <p className="txt red">开奖倒计时</p>
          <CountdownTimer remain={this.props.remain} id={this.props.id} onTimerGone={this.countdownFinished.bind(this)} />
        </div>
      );
    }
    return (
      <li className="m-activityList-item" style={{minHeight: '15em'}}>
        {this.props.unit === 10 ? <i className="ico ico-icon_unit_10_label m-list-label" /> :
          (this.props.price === 0 ? <i className="ico ico-icon_unit_0_label m-list-label" /> : undefined)
        }
        <div className="m-activity">
          <div className="m-activity-cover">
            <CustomLink to={"/activity/" + this.props.id} query={{back_url: '/?index=1'}}>
              <GoodsCover src={this.props.cover} cut={true}/>
            </CustomLink>
          </div>
          <div className="m-activity-info">
            <CustomLink to={"/activity/" + this.props.id} query={{back_url: '/?index=1'}}>
              <div className="m-activity-title one-line">{this.props.title}</div>
            </CustomLink>
            {bottomDiv}
          </div>
        </div>
      </li>
    );
  }
}

AnnouncedItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
  unit: PropTypes.number,
  price: PropTypes.number,
  amount: PropTypes.number,
  remain: PropTypes.number,
  status: PropTypes.number,
  userId: PropTypes.string,
  userName: PropTypes.string,
  luckyNumber: PropTypes.string
};

class AnnouncedList extends Component {
  static loading = !1;

  constructor(props) {
    super(props);
    this.state = {
      noData: false,
      page: 1,
      announcedActivity: [],
      hasMoreData: true
    };
  }
  handleAnnouncedScroll () {
    if (window.location.pathname != '/' || !$('li.tab-announced-list').hasClass('active')) {
      return false;
    }
    if(!AnnouncedList.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      AnnouncedList.loading = !0;
      var loadingEle = $('div.loading-announced').show();
      ContentAPI.getAnnouncedList({page: this.state.page + 1}, function (data, total) {
        loadingEle.hide();
        var newAnnouncedActivity = this.state.announcedActivity.concat(data);
        this.setState({
          page: this.state.page + 1,
          announcedActivity: newAnnouncedActivity,
          hasMoreData: total > newAnnouncedActivity.length
        });
        AnnouncedList.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-announced').show();
    }
  }
  getInitData () {
    AnnouncedList.loading = !0;
    ContentAPI.getAnnouncedList({page: this.state.page}, function (data, total) {
      this.setState({
        announcedActivity: data,
        noData: data.length === 0,
        hasMoreData: total > data.length
      });
      AnnouncedList.loading = !1;
    }.bind(this));
  }
  componentWillMount () {
    this.getInitData();
    this.getInitData = this.getInitData.bind(this);
    this.handleAnnouncedScroll = this.handleAnnouncedScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleAnnouncedScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleAnnouncedScroll);
  }

  render () {
    if(this.state.noData) {
      return <NoAPIDataTip icon="network_error_icon" tip="没有网络, 请检查网络设置" reload={this.getInitData} />;
    }

    var announcedItems = this.state.announcedActivity.map(function(item, index){
      return (<AnnouncedItem {...item} key={index} /> );
    });
    return (
      <div className="m-activityList-container">
        <ul className="m-activityList">
          {announcedItems}
        </ul>
        <div className="loading-announced gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已经没有更多' }</div>
      </div>
    );
  }
}

export default AnnouncedList;
