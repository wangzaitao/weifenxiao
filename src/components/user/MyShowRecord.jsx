import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';
import {GoodsCover} from '../base/FallbackImage.jsx';

class ShowRecordItem extends Component {
  render () {
    var statusContent, showInfos;
    if (this.props.status == 1) {
      statusContent = <span className="yellow fr">待晒单</span>
    } else if (this.props.status == 2) {
      statusContent = <span className="red fr">等待审核</span>
    } else if (this.props.status == 4) {
      statusContent = <span className="gray fr">已发布</span>
    } else if (this.props.status == 8) {
      statusContent = <span className="red fr">审核未通过</span>
    }
    showInfos = (
      <div className="bb1-gray show-infos">
        <div className="cover">
          <GoodsCover src={this.props.images.length ? this.props.images[0] : this.props.cover} cut={true} styles={{width: '6em', height: '6em'}}/>
        </div>
        <div className="content"><span>{this.props.status === 1 ? this.props.name : this.props.content}</span></div>
      </div>
    );

    return (
      <li className="show-record-item">
        {this.props.status === 1 ? showInfos : <CustomLink to={"/show/" + this.props.id} isOuterURL={true}>{showInfos}</CustomLink>}
        <div className="status">
          {this.props.status !== 1 ? <span className="gray fl">{this.props.showTime}</span> : undefined}
          {statusContent}
        </div>
      </li>
    )
  }
}

ShowRecordItem.propTypes = {
  id: PropTypes.number,
  status: PropTypes.number,
  showTime: PropTypes.string,
  name: PropTypes.string,
  cover: PropTypes.string,
  content: PropTypes.string,
  images: PropTypes.array
};

class MyShowRecord extends Component {
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
    if (window.location.pathname != '/user/my_show_record') {
      return false;
    }

    if(!MyShowRecord.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      MyShowRecord.loading = !0;
      var loadingEle = $('div.loading-show-record').show();
      ContentAPI.getMyShowRecords({page: this.state.page + 1, size: 20}, function (data) {
        loadingEle.hide();
        var newShowRecords = this.state.showRecords.concat(data);
        this.setState({
          page: this.state.page + 1,
          showRecords: newShowRecords,
          hasMoreData: data.length >= 20
        });
        MyShowRecord.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-show-record').show();
    }
  }
  componentWillMount () {
    MyShowRecord.loading = !0;
    ContentAPI.getMyShowRecords({page: this.state.page, size: 20}, function (data) {
      this.setState({
        showRecords: data,
        noData: data.length === 0,
        hasMoreData: data.length >= 20
      });
      MyShowRecord.loading = !1;
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
      return <NoAPIDataTip icon="show_empty_icon" tip="暂时还没有晒单记录哦！" btnText="立即夺宝" reloadUrl='/' isOuterURL={true} />;
    }

    var showRecordItems = this.state.showRecords.map(function(item, index) {
      var results = [<ShowRecordItem {...item} key={index} />];
      if (index !== this.state.showRecords.length - 1) results.push(<div style={{height: '1em', backgroundColor: '#ececec'}}></div>);
      return results;
    }.bind(this));
    
    return (
      <div className="m-showRecord-container">
        <ul className="bgc-white">
          {showRecordItems}
        </ul>
        <div className="loading-show-record gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
      </div>
    );
  }
}

export default MyShowRecord;
