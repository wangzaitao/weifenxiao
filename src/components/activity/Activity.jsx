import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';

import BC from '../../utils/broadcast';
import Progress from './Progress.jsx';
import Countdown from './Countdown.jsx';
import WinnerInfo from './WinnerInfo.jsx';
import UserNumbers from './UserNumbers.jsx';
import DetailLinks from './DetailLinks.jsx';
import FloatFooter from './FloatFooter.jsx';
import BuyRecordList from './BuyRecordList.jsx';
import BuyConfirm from './BuyConfirm.jsx';
import AddCartConfirm from './AddCartConfirm';
import CartLink from '../cart/CartLink';
import * as ContentAPI from '../../api/content';
import Auth from '../../api/auth';
import {GoodsCover} from '../base/FallbackImage.jsx';

require('./activity.css');
require('../../css/slick.css');

class DetailInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: this.props
    };
  }
  countdownFinished () {
    var ele = $(ReactDOM.findDOMNode(this));
    ele.find('span.countdown').text('计算中...');
    setTimeout(function () {
      ContentAPI.getActivityDetail(this.props.id, function (result) {
        if (Object.keys(result).length) {
          this.setState({detail: result});
        }
      }.bind(this));
    }.bind(this), 3000);
  }
  render () {
    var statusLabel, activityResult;
    if (this.state.detail.status === 1) {  // ongoing status: 1
      statusLabel = <span className="m-detail-status ongoing">进行中</span>;
      activityResult = <Progress {...this.state.detail} />;
    } else if (this.state.detail.status === 2) {  // revealing status: 2
      statusLabel = <span className="m-detail-status revealing">倒计时</span>;
      activityResult = <Countdown {...this.state.detail} onCountdownFinished={this.countdownFinished.bind(this)} />;
    } else {  // revealed status: 4
      statusLabel = <span className="m-detail-status revealed">已揭晓</span>;
      activityResult = <WinnerInfo {...this.state.detail} />;
    }

    return (
      <div className="m-detail-infos bb1-gray">
        <p>
          {statusLabel}
          <span className="pl6">{'第' + this.state.detail.term + '期: ' + this.state.detail.goods.name}</span>
        </p>
        {activityResult}
        <UserNumbers isLogin={Auth.isLoggedIn()} id={this.state.detail.id} count={this.state.detail.my ? this.state.detail.my.num_count || 0 : 0}
                     numbers={this.state.detail.my ? this.state.detail.my.numbers || [] : []} />
      </div>
    )
  }
}

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      gid: this.props.params.gid,
      showBuyConfirm: this.props.location.query.show_buy && this.props.location.query.show_buy === '1',
      detail: {},
      isShowCart: false
    };
  }
  componentWillMount () {
    if (this.state.id) {
      ContentAPI.getActivityDetail(this.state.id, function (data) {
        this.setState({detail: data});
      }.bind(this))
    } else {
      ContentAPI.getLatestTermDetail(this.state.gid, function (data) {
        this.setState({
          detail: data
        });
      }.bind(this))
    }
  }

  componentDidMount (){
    BC.attach('activity:showCart', this._showCart.bind(this));
  }

  componentWillUnmount(){
    BC.detach('activity:showCart')
  }

  render () {
    if (!Object.keys(this.state.detail).length) {
      return <div className="m-body"></div>
    }

    var slickImages = this.state.detail.goods.images.split(','), slides = [];
    for (var i=0; i < slickImages.length; i++) {
      slides.push(<div data-index={i} key={i}><GoodsCover src={slickImages[i]} cut={true} /></div>);
    }
    return (
      <div className="m-body">
        {this.state.detail.unit === 10 ? <i className="ico ico-icon_unit_10_label m-detail-label" /> :
          (this.state.detail.price === 0 ? <i className="ico ico-icon_unit_0_label m-detail-label" /> : undefined)
        }
        <Slider dots={true} lazyLoad={true} infinite={false} className="detail">{slides}</Slider>
        <DetailInfos {...this.state.detail} />
        <div className="empty-driver"></div>
        <DetailLinks id={this.state.detail.id} gid={this.state.detail.gid} price={this.state.detail.price}
                     graphics={this.state.detail.goods.graphics}/>
        <div className="empty-driver bb1-gray"></div>
        <BuyRecordList id={this.state.detail.id} startTime={this.state.detail.start_time || this.state.detail.created_at} />
        <FloatFooter {...this.state.detail} isLogin={Auth.isLoggedIn()} />
        <BuyConfirm {...this.state.detail} isShow={this.state.showBuyConfirm} />
        <AddCartConfirm {...this.state.detail} isShow={this.state.isShowCart} closeDialog={this._closeCartConfirm.bind(this)} />
        <CartLink />
      </div>
    );
  }

  _showCart(){
    this.setState({
      isShowCart: true
    });
  }

  _closeCartConfirm(){
    this.setState({
      isShowCart: false
    });
  }
}

export default Activity;
