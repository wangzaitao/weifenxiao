import React from 'react';

import BC from '../../utils/broadcast';
import Auth from '../../api/auth';

class FloatFooter extends React.Component {
  _onBuyNow (e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.props.isLogin) {
      document.getElementsByClassName('buy-confirm-container')[0].style.display = 'block';
      document.body && (document.body.scrollTop=0);
      document.documentElement && (document.documentElement.scrollTop=0);
      document.body.style.overflowY = 'hidden';
      document.body.style.position = 'fixed';
    } else {
      window.location.href = "/login?from=" + window.location.pathname;
    }
  }
  render () {
    var props = this.props, 
      footerContent;
    if (this.props.status === 1) {  // ongoing status: 1
      var myCount = props.my ? props.my.num_count: 0;
      if (props.isLogin && props.buy_limit && props.buy_limit <= myCount) {
        footerContent = <span className="has-buy">已参与</span>
      } else {
        footerContent = (
          <div>
            <a href="javascript:;" className="red-default-btn buy-now" onClick={this._onBuyNow.bind(this)}>{props.price === 0 ? '立即参与' : '立即购买'}</a>
            <a className="red-border-btn" onTouchTap={this._editCart}>加入清单</a>
          </div>
        );
      }
    } else {  // revealing status: 2，revealed status: 4
      if (props.latest_term != props.term) {  // new activity term has begun
        footerContent = (
          <div>
            <span>{'第' + props.latest_term + '期正在火热进行中...'}</span>
            <a href={'/activity/' + props.latest_id} className="go-latest">立即前往</a>
          </div>
        )
      } else {
        if (props.price === 0) {
          footerContent = <span>此期活动已结束，敬请期待下期0元购...</span>
        } else {
          footerContent = <span>商品太抢手，请等待我们补货后开始下一期！</span>
        }
      }
    }

    return (
      <div className="detail-float-footer">
        {footerContent}
      </div>
    )
  }

  _editCart(e){
    e.stopPropagation();
    e.preventDefault();
    if(!Auth.isLoggedIn()){
      window.location.href = "/login?from=" + window.location.pathname;
      return;
    }
    BC.notify('activity:showCart');
  }
}

export default FloatFooter;
