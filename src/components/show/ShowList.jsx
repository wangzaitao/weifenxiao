import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';
import {startWith} from '../../utils/common';
import Auth from '../../api/auth';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import ShowItem from './ShowItem.jsx';

require('./show.css');

class ShowList extends Component {
  static loading = !1;
  constructor(props) {
    super(props);
    this.state = {
      gid: this.props.params ? (this.props.params.gid || '') : '',
      showList: [],
      noData: false,
      maxTS: -1,
      hasMoreData: true
    };
  }
  handleShowListScroll () {
    if (!startWith(window.location.pathname, '/show') && !startWith(window.location.pathname, '/activity_show')) {
      return false;
    }
    if(!ShowList.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData && this.state.maxTS !== -1) {
      ShowList.loading = !0;
      var loadingEle = $('div.loading-show').show();
      ContentAPI.getShowList({gid: this.state.gid, max_ts: this.state.maxTS}, function (data) {
        loadingEle.hide();
        var newShowList = this.state.showList.concat(data);
        this.setState({
          showList: newShowList,
          hasMoreData: data.length >= 10,
          maxTS: data.length ? data[data.length - 1].verifiedTime : -1
        });
        ShowList.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-show').show();
    }
  }
  getInitData () {
    ShowList.loading = !0;
    ContentAPI.getShowList({gid: this.state.gid}, function (data) {
      this.setState({
        showList: data,
        noData: data.length === 0,
        hasMoreData: data.length >= 10,  // api return's count is 10 by default
        maxTS: data.length ? data[data.length - 1].verifiedTime : -1
      });
      ShowList.loading = !1;
    }.bind(this));
  }
  componentWillMount () {
    this.getInitData();
    this.getInitData = this.getInitData.bind(this);
    this.handleShowListScroll = this.handleShowListScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleShowListScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleShowListScroll);
  }

  render () {
    if(this.state.noData){
      return <NoAPIDataTip icon="show_empty_icon" tip="暂时还没有晒单记录哦！" reload={this.getInitData} />;
    }

    var showItems = this.state.showList.map(function(item, index){
      return (<ShowItem {...item} key={index} /> );
    });
    return (
      <div className="bgc-white">
        <ul style={{padding: '1em'}}>
          {showItems}
        </ul>
        <div className="loading-show gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已经没有更多' }</div>
      </div>
    );
  }
}

export default ShowList;
