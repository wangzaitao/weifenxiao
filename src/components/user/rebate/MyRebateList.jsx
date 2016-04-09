import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import * as ContentAPI from '../../../api/content';
import CustomLink from '../../base/CustomLink.jsx';
import { ScrollToBottom } from '../../base/ScrollToBottom.jsx';
import BC from '../../../utils/broadcast';
import NoAPIDataTip from '../../base/NoAPIDataTip.jsx';

const PER_PAGE = 20;

class MyRebateItem extends Component{
  render(){
    let props = this.props,
      clsMap = {
        1: 'ico-friend_level1_bg',
        2: 'ico-friend_level2_bg',
        3: 'ico-friend_level3_bg'
      };

    return (
      <div className="rebate-item-wrap">
        <span className="one-third">{props.time.slice(5, 16).replace('-', '/')}</span>
        <div className="one-third rebate-item-user-wrap">
          <span>{props.parterId}</span>
          <i className={"rebate-level ico "+clsMap[props.level]} />
        </div>
        <span className="one-third red rebate-item-credit">{props.credit}</span>
      </div>
    );
  }
}
MyRebateItem.propTypes = {
  time: PropTypes.string,
  parterId: PropTypes.number,
  level: PropTypes.number,
  credit: PropTypes.number
};


class MyRebateList extends Component{
  isLoading = false;
  constructor(props){
    super(props);
    this.state = {
      rebateList: null,
      page: 1,
      hasMoreData: true
    };
  }

  componentWillMount(){
    this._loadRebateDetail();
  }

  componentDidMount(){
    BC.attach('scrolltobottom', this._scrollToBottom.bind(this));
  }

  render(){
    let rebateList = this.state.rebateList,
      rebateListDom;
    if(!rebateList) {
      return null;
    } else if (rebateList.length === 0) {
      return <NoAPIDataTip icon="no_friend_back" tip="暂时还木有好友充值返利哦！" btnText="邀请好友" reloadUrl='/user/my_rebate' />;
    }

    rebateListDom = rebateList.map((item, index) => {
      return <MyRebateItem key={index} time={item.reward_time} parterId={item.partner_id} level={item.relation_level} credit={item.amount} />
    });

    return (
      <div className="rebate-list-wrap">
        <div className="rebate-list-header-wrap">
          <span className="r-l-h-item">时间</span>
          <span className="r-l-h-item">用户ID</span>
          <span className="r-l-h-item">积分</span>
        </div>
        {rebateListDom}
        <div ref="loadWrap" className="gray loading-text hide">{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
      </div>
    );
  }

  _loadRebateDetail() {
    this.isLoading = true;
    ContentAPI.getMyRebateDetail({page: this.state.page})
      .then((res)=>{
        this.isLoading = false;
        var rebateList = this.state.rebateList || [],
          hasMoreData = res.length == PER_PAGE,
          curList = rebateList.concat(res);
        this.setState({
          rebateList: curList,
          hasMoreData: hasMoreData,
          page: this.state.page + 1
        });
        this._hideLoading();
      });
  }

  _scrollToBottom(){
    if(this.isLoading){  //正在加载中
      return;
    }else if(!this.state.hasMoreData){  //没有更多数据了
      this._showLoading();
      return;
    }
    this._showLoading();
    this._loadRebateDetail();
  }

  _showLoading(){
    var target = ReactDOM.findDOMNode(this.refs.loadWrap);
    $(target).removeClass('hide');
  }

  _hideLoading(){
    var target = ReactDOM.findDOMNode(this.refs.loadWrap);
    $(target).addClass('hide');
  }

}

export default ScrollToBottom(MyRebateList);
