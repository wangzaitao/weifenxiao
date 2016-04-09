import React, { Component, PropTypes } from 'react';

import SwipeViews from '../base/SwipeViews.jsx';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import * as ContentAPI from '../../api/content';

class CouponItem extends Component {
  render () {
    var isAvail = this.props.status === 1;
    return (
      <li className="coupon-item">
        <div className={"price fl mr16" + (isAvail ? '' : ' used')}>
          <span style={{color: (isAvail ? '#fff328' : '#bfbfbf')}}>{this.props.price}</span>
        </div>
        <div className="content inline-block">
          <p className={isAvail ? '' : 'gray'}>{this.props.title}</p>
          <p className="gray">{this.props.desc}</p>
          <p className="gray">
            <i className="ico ico-time mr5"/>
            <span>{this.props.start_date + ' 至 ' + this.props.end_date}</span>
          </p>
        </div>
        {!isAvail ? (<i className={"used-or-runout fr mr16 ico ico-" + (this.props.status === 2 ? 'used' : 'runout')}/>) : null}
      </li>
    )
  }
}

CouponItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.number,
  status: PropTypes.number,
  start_date: PropTypes.string,
  end_date: PropTypes.string
};

class CouponList extends Component {
  static loading = !1;
  constructor(props) {
    super(props);
    this.state = {
      noData: this.props.data.length === 0,
      page: 1,
      coupons: this.props.data,
      hasMoreData: this.props.total > this.props.data.length
    };
  }

  handleCouponListScroll () {
    if (window.location.pathname != '/user/my_coupon' || !$('li.tab-' + this.props.tag + '-list').hasClass('active')) {
      return false;
    }

    if(!CouponList.loading && document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0 && this.state.hasMoreData) {
      CouponList.loading = !0;
      var loadingEle = $('div.loading-' + this.props.tag).show();
      ContentAPI.getMyCoupons({page: this.state.page + 1, status: this.props.status, size: 20}, function (data, total) {
        loadingEle.hide();
        var newCoupons = this.state.coupons.concat(data);
        this.setState({
          page: this.state.page + 1,
          coupons: newCoupons,
          hasMoreData: total > newCoupons.length
        });
        CouponList.loading = !1;
      }.bind(this))
    } else if (!this.state.hasMoreData) {
      $('div.loading-' + this.props.tag).show();
    }
  }
  componentWillMount () {
    this.handleCouponListScroll = this.handleCouponListScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handleCouponListScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handleCouponListScroll);
  }

  render () {
    if(this.state.noData) {
      return <NoAPIDataTip icon="icon_no_redpackets" tip="您还没有红包，不如去逛逛吧！" btnText="前往夺宝" reloadUrl='/' isOuterURL={true} />;
    }

    var couponItems = this.state.coupons.map(function (item, index) {
      return <CouponItem {...item} key={index} />
    });
    return (
      <div className="coupon-list-container bgc-white">
        <ul style={{paddingTop: '0.8em'}}>{couponItems}</ul>
        <div className={"gray loading-text loading-" + this.props.tag}>{ this.state.hasMoreData ? '努力加载中...' : '已到达列表底部' }</div>
      </div>
    )
  }
}

CouponList.propTypes = {
  status: PropTypes.number,
  tag: PropTypes.string,
  data: PropTypes.array,
  total: PropTypes.number
};

class MyCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCoupons: null,
      availableCount: 0,
      usedCoupons: null,
      usedCount: 0
    };
  }
  componentWillMount () {
    ContentAPI.getMyCoupons({page: 1, status: 1, size: 20}, function (data, total) {
      this.setState({availableCoupons: data, availableCount: total})
    }.bind(this));
    ContentAPI.getMyCoupons({page: 1, status: 6, size: 20}, function (data, total) {
      this.setState({usedCoupons: data, usedCount: total})
    }.bind(this));
  }

  render() {
    if (this.state.availableCoupons === null || this.state.usedCoupons === null) {
      return null;
    }
    if (this.state.availableCount === 0 && this.state.usedCount === 0) {
      return <NoAPIDataTip icon="icon_no_redpackets" tip="当前无可用红包" />;
    }

    return (
      <SwipeViews>
        <div title={"可使用" + (this.state.availableCount === 0 ? '': ('(' + this.state.availableCount + ')'))} className="tab-available-list">
          <CouponList status={1} tag="available" data={this.state.availableCoupons} total={this.state.availableCount} />
        </div>
        <div title={"已使用/过期" + (this.state.usedCount === 0 ? '': ('(' + this.state.usedCount + ')'))} className="tab-used-list">
          <CouponList status={6} tag="used" data={this.state.usedCoupons} total={this.state.usedCount} />
        </div>
      </SwipeViews>
    );
  }
}

export default MyCoupon;
