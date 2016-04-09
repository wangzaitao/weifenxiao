import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';
import {UserAvatar, GoodsCover} from '../base/FallbackImage.jsx';

class ShowRecordItem extends Component {
  render () {
    var images = this.props.images.slice(0, 3).map(function (item, index) {
      return (<GoodsCover src={item} cut={true} key={index}/>);
    });

    return (
      <li className="show-item">
        <UserAvatar className="fl" src={this.props.winner.avatar || require("../../img/default_avatar.png")} />
        <div className="show-infos">
          <div className="header">
            <span className="blue txt-one-line inline-block" style={{width: '45%'}}>{this.props.winner.nick_name}</span>
            <span className="gray fr pr10">{this.props.showTime}</span>
          </div>
          <CustomLink to={"/show/" + this.props.id}>
            <div className="content">
              <span className="show-desc">{this.props.content}</span>
              <div className="img-list mt5">{images}</div>
            </div>
          </CustomLink>
        </div>
      </li>
    );
  }
}

ShowRecordItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  showTime: PropTypes.string,
  content: PropTypes.string,
  images: PropTypes.array,
  winner: PropTypes.object
};

class UserShowRecord extends Component {
  static loading = !1;
  constructor(props) {
    super(props);
    this.state = {
      noData: false,
      page: 1,
      hasMoreData: true,
      showRecords: []
    };
  }

  handleShowRecordScroll () {
    if (window.location.pathname.indexOf('/uc') != 0 || !$('li.tab-user-sr-list').hasClass('active')) {
      return false;
    }

    if(!UserShowRecord.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      UserShowRecord.loading = !0;
      var loadingEle = $('div.loading-show-record').show();
      ContentAPI.getUserShowRecords(this.props.uid, {page: this.state.page + 1, size: 20}, function (data) {
        loadingEle.hide();
        var newShowRecords = this.state.showRecords.concat(data);
        this.setState({
          page: this.state.page + 1,
          showRecords: newShowRecords,
          hasMoreData: data.length >= 20
        });
        UserShowRecord.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-show-record').show();
    }
  }
  componentWillMount () {
    UserShowRecord.loading = !0;
    ContentAPI.getUserShowRecords(this.props.uid, {page: this.state.page, size: 20}, function (data) {
      this.setState({
        showRecords: data,
        noData: data.length === 0,
        hasMoreData: data.length >= 20
      });
      UserShowRecord.loading = !1;
    }.bind(this));
    this.handleShowRecordScroll = this.handleShowRecordScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleShowRecordScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleShowRecordScroll);
  }

  render() {
    if(this.state.noData) {
      return <NoAPIDataTip icon="show_empty_icon" tip="Ta还没有晒单记录哦！" btnText="立即夺宝" reloadUrl='/' isOuterURL={true} />;
    }

    var showRecordItems = this.state.showRecords.map(function(item, index) {
      return <ShowRecordItem {...item} key={index} />;
    }.bind(this));
    
    return (
      <div className="m-showRecord-container">
        <ul style={{padding: '1em'}}>{showRecordItems}</ul>
        <div className="loading-show-record gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
      </div>
    );
  }
}

export default UserShowRecord;
