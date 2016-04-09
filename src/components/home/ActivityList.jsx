import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

import * as ContentAPI from '../../api/content';
import Auth from '../../api/auth';
import {toast} from '../../utils/toast';
import {AddToCart} from '../base/AddToCart.jsx';
import {GoodsCover} from '../base/FallbackImage.jsx';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import BC from '../../utils/broadcast';

const CART_LIMIT = 10;

class ActivityItem extends Component {
  render () {
    let props = this.props, btnDom;
    if(props.price === 0){
      btnDom = (
        <CustomLink to={Auth.isLoggedIn() ? "/activity/" + props.id : '/login'} query={Auth.isLoggedIn() ? {show_buy: 1} : {from: '/'}} isOuterURL={!Auth.isLoggedIn()}>
          0元购
        </CustomLink>
      );
    }else{
      btnDom = (
        <a className="red-border-btn" onTouchTap={this._editCart.bind(this)}>加入清单</a>
      );
    }

    return (
      <li className="m-activityList-item">
        {props.unit === 10 ? <i className="ico ico-icon_unit_10_label m-list-label" /> :
          (props.price === 0 ? <i className="ico ico-icon_unit_0_label m-list-label" /> : undefined)
        }
        <div className="m-activity">
          <div className="m-activity-cover">
            <CustomLink to={"/activity/" + props.id}>
              <GoodsCover src={props.cover} cut={true}/>
            </CustomLink>
          </div>
          <div className="m-activity-info">
            <CustomLink to={"/activity/" + props.id}><div className="m-activity-title">{this.props.title}</div></CustomLink>
            <div className="m-activity-progress">
              <p className="txt">夺宝进度: <strong className="yellow">{props.progress}%</strong></p>
              <p className="wrap">
                <span className="process-bar"><i className="color" style={{width: props.progress + '%'}} /></span>
              </p>
            </div>
          </div>
          <div className="m-activity-shortcut">
            {btnDom}
          </div>
        </div>
      </li>
    );
  }

  _editCart(e){
    e.preventDefault;
    this.props.editCart.bind(this)(e);
  }
}

ActivityItem.propTypes = {
  unit: PropTypes.number,
  price: PropTypes.number,
  id: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
  target_amount: PropTypes.number,
  current_amount: PropTypes.number,
  progress: PropTypes.number
};

var WrapedActivityItem = AddToCart(ActivityItem);

class ActivityList extends Component {
  static loading = !1;

  constructor(props) {
    super(props);
    this.state = {
      sortId: this.props.initialSortId || 1,
      activityList: [],
      noData: false,
      page: 1,
      hasMoreData: true
    };
  }
  handleActivityScroll () {
    if (window.location.pathname != '/' || !$('li.tab-activity-list').hasClass('active')) {
      return false;
    }
    if(!ActivityList.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      ActivityList.loading = !0;
      var loadingEle = $('div.loading-activity').show(),
          apiData = {'sort_id': this.state.sortId, page: this.state.page + 1};
      ContentAPI.getActivityList(apiData, function (data, total) {
        loadingEle.hide();
        var newActivityList = this.state.activityList.concat(data);
        this.setState({
          page: this.state.page + 1,
          activityList: newActivityList,
          hasMoreData: total > newActivityList.length
        });
        ActivityList.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-activity').show();
    }
  }
  getInitData () {
    ActivityList.loading = !0;
    ContentAPI.getActivityList({'sort_id': this.state.sortId, page: this.state.page}, function (data, total) {
      this.setState({
        activityList: data,
        noData: data.length === 0,
        hasMoreData: total > data.length
      });
      ActivityList.loading = !1;
    }.bind(this));
  }
  componentWillMount () {
    this.getInitData();
    this.getInitData = this.getInitData.bind(this);
    this.handleActivityScroll = this.handleActivityScroll.bind(this);
    this.changeSortType = this.changeSortType.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleActivityScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleActivityScroll);
  }
  changeSortType (e) {
    var ele = $(e.currentTarget);
    if (ele.hasClass('active')) {
      return false;
    } else {
      var sortId = parseInt(ele.attr('data-sort-id')), apiData = {'sort_id': sortId, page: 1};
      ContentAPI.getActivityList(apiData, function (data) {
        this.setState({
          sortId: sortId,
          page: 1,
          hasMoreData: true,
          activityList: data,
          noData: data.length === 0
        })
      }.bind(this))
    }
  }

  render () {
    if(this.state.noData){
      return <NoAPIDataTip icon="network_error_icon" tip="没有网络, 请检查网络设置" reload={this.getInitData} />;
    }

    var activityItems = this.state.activityList.map(function(item, index){
      return (<WrapedActivityItem {...item} key={index} /> );
    });
    return (
      <div className="m-activityList-container">
        <div className="sort-types">
          <span>商品排序</span>
          <a href="javascript:;" data-sort-id={1} className={this.state.sortId == 1 ? 'active' : ''} onTouchTap={this.changeSortType}>最热</a>
          <a href="javascript:;" data-sort-id={2} className={this.state.sortId == 2 ? 'active' : ''} onTouchTap={this.changeSortType}>最新</a>
          <a href="javascript:;" data-sort-id={3} className={this.state.sortId == 3 ? 'active' : ''} onTouchTap={this.changeSortType}>最快</a>
          <a href="javascript:;" data-sort-id={4} className={this.state.sortId == 4 ? 'active' : ''} onTouchTap={this.changeSortType}>最贵</a>
          <a href="javascript:;" data-sort-id={5} className={this.state.sortId == 5 ? 'active' : ''} onTouchTap={this.changeSortType}>最易中</a>
        </div>
        <ul className="m-activityList">
          {activityItems}
        </ul>
        <div className="loading-activity gray loading-text">{ this.state.hasMoreData ? '努力加载中...' : '已经没有更多' }</div>
      </div>
    );
  }
}

export default ActivityList;
