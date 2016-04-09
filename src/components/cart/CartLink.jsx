import React from 'react';

import * as ContentAPI from '../../api/content';
import BC from '../../utils/broadcast';
import Auth from '../../api/auth';
import {saveCartFromLocal} from './cartUtils';

require('./cart-link.css');

export default class CartLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speciesNum: 0
    }
  }

  componentWillMount(){
    saveCartFromLocal();
  }

  componentDidMount(){
    this._updateCartTypeNum();
    BC.attach('cart:updateNum', this._updateCartTypeNum.bind(this));
  }

  componentWillUnmount(){
    BC.detach('cart:updateNum');
  }

  render(){
    let speciesNum = this.state.speciesNum,
      speciesNumDom = null,
      cls = 'go-cart-btn';
    if(speciesNum > 0){
      speciesNumDom = <div className="species-num">{speciesNum}</div>;
    }
    if(this.props.showAppDownload){
      cls += ' show-app-download';
    }
    return (
      <a className={cls} onTouchTap={this._isNeedRedirect}>
        <i className="ico ico-shopping_cart" />
        {speciesNumDom}
      </a>
    );
  }

  _isNeedRedirect(){
    if(!Auth.isLoggedIn()){
      window.location.href = '/login?from=/cart';
    }else{
      window.location.href = '/cart';
    }
  }

  _updateCartTypeNum(){
    ContentAPI.getCartList()
      .then(res => {
        let list = res.list,
          speciesNum = list.length || 0;
        this.setState({
          speciesNum: speciesNum
        });
      });
  }
}