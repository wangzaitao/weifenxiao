import React from 'react';
import {browserHistory} from 'react-router';
import CustomLink from '../base/CustomLink.jsx';

import Dialog from '../base/Dialog.jsx';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';
import {GoodsCover} from '../base/FallbackImage.jsx';
import Carousel from '../base/Carousel.jsx';

class WinnerRecordItem extends React.Component {
  onReceivedClick () {
    this.props.openDialog('确认收货吗？', function () {
      ContentAPI.dealReceived(this.props.my.order_id_str, function (success, msg) {
        if (success) {
          this.props.callback(this.props.my.order_id_str);
        } else {
          this.props.openDialog(msg, function () {});
        }
      }.bind(this));
    }.bind(this));
  }
  render () {
    // 4：已中奖，待领奖 5：已领奖，待发货 6：已发货，待收货 7：成交
    var statusContent;
    if (this.props.my.order_status == 4) {
      statusContent = (
        <CustomLink to={"/user/receiver/" + this.props.my.order_id_str} className="submit-info">
          <div>我要领奖</div>
        </CustomLink>
      )
    } else if (this.props.my.order_status == 5) {
      statusContent = (
        <div className="waiting">等待发货</div>
      )
    } else if (this.props.my.order_status == 6) {
      statusContent = (
        <a href="javascript:;" className="received" onTouchTap={this.onReceivedClick.bind(this)}>
          <div>确认收货</div>
        </a>
      )
    } else if (this.props.my.order_status == 7) {
      statusContent = (
        <div className="deal-received">已收货</div>
      )
    } else if (this.props.my.order_status == 8) {
      statusContent = (
        <div className="showed" style={{color: '#919191'}}>已晒单</div>
      )
    }

    return (
      <li className="winner-record-item">
        <CustomLink to={"/user/receiver/" + this.props.my.order_id_str}>
          <div className="bb1-gray" style={{padding: '1em 0.8em'}}>
            <div className="cover">
              <GoodsCover src={this.props.goods.cover} styles={{width: '6em'}} />
            </div>
            <div className="infos">
              <p className="title">{'第' + this.props.term + '期：' + this.props.goods.name}</p>
              <p className="gray">总需{this.props.target_amount}次</p>
              <p>获奖号码：<span className="red">{this.props.lucky_number}</span></p>
              <p>本期参与：<span className="red">{this.props.winner.num_count}</span>人次</p>
              <p>揭晓时间：{this.props.winner.time}</p>
            </div>
          </div>
        </CustomLink>
        <div className="status">{statusContent}</div>
      </li>
    )
  }
}

class MyWinnerRecord extends React.Component {
  static loading = !1;

  constructor(props) {
    super(props);
    this.state = {
      noData: false,
      page: 1,
      hasMoreData: true,
      winnerRecords: [],
      recommendList: [],
      dialogContent: '',
      showDialog: false,
      confirmCallback: function () {}
    };
  }

  handleWinnerRecordScroll () {
    if (window.location.pathname != '/user/my_winner_record') {
      return false;
    }

    if(!MyWinnerRecord.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      MyWinnerRecord.loading = !0;
      var loadingEle = $('div.loading-winner-record').show();
      ContentAPI.getMyActivityRecords({page: this.state.page + 1, win: 1}, function (data, total) {
        loadingEle.hide();
        var newWinnerRecords = this.state.winnerRecords.concat(data);
        this.setState({
          page: this.state.page + 1,
          winnerRecords: newWinnerRecords,
          hasMoreData: total > newWinnerRecords.length
        });
        MyWinnerRecord.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-winner-record').show();
    }
  }
  componentWillMount () {
    MyWinnerRecord.loading = !0;
    ContentAPI.getMyActivityRecords({page: this.state.page, win: 1}, function (data, total) {
      this.setState({
        winnerRecords: data,
        noData: data.length === 0,
        hasMoreData: total > data.length
      });
      MyWinnerRecord.loading = !1;
    }.bind(this));
    this._loadRecommendList();
    this.handleWinnerRecordScroll = this.handleWinnerRecordScroll.bind(this);
    this._onReceivedCallback = this._onReceivedCallback.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleWinnerRecordScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleWinnerRecordScroll);
  }

  _loadRecommendList(){
    let self = this,
      sceneId = 1;
    ContentAPI
      .getRecommendActivitys(sceneId)
      .then(res => {
        if(res){
          self.setState({
            recommendList: res
          });
        }
      });
  }

  _onReceivedCallback (orderId) {
    browserHistory.push("/user/receiver/" + orderId);
  }
  _onDialogOpen = (msg, callback) => {
    this.setState({
      showDialog: true,
      dialogContent: msg,
      confirmCallback: callback
    });
  };
  _onDialogDone = () => {
    this.setState({showDialog: false});
  };

  render() {
    if(this.state.noData) {
      return (
        <div className="win-record-empty-wrap">
          <NoAPIDataTip icon="my_win_history_empty_icon" tip="您还没有中奖记录哦！" btnText="立即夺宝" reloadUrl='/' isOuterURL={true} />
          <div className="recommend-list-wrap">
            <div className="c-r-title">最易中宝贝</div>
            <Carousel items={this.state.recommendList} isOuterURL={true} />
          </div>
        </div>
      );
    }

    var winnerRecordItems = this.state.winnerRecords.map(function(item, index) {
      item['openDialog'] = this._onDialogOpen;
      var results = [<WinnerRecordItem {...item} callback={this._onReceivedCallback} key={index} />];
      if (index !== this.state.winnerRecords.length - 1) results.push(<div style={{height: '1em', backgroundColor: '#ececec'}}></div>);
      return results;
    }.bind(this));
    return (
      <div className="m-winnerRecord-container">
        <ul className="bgc-white">
          {winnerRecordItems}
        </ul>
        <div className="loading-winner-record gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
        <Dialog confirm="确认" cancel="取消" content={this.state.dialogContent} show={this.state.showDialog}
                onCloseClick={this._onDialogDone} onConfirm={this.state.confirmCallback} />
      </div>
    );
  }
}

export default MyWinnerRecord;
