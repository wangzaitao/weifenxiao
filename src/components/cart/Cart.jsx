import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';
import Auth from '../../api/auth';
import BC from '../../utils/broadcast';
import {isIntNumber} from '../../utils/common';
import Dialog from '../base/Dialog.jsx';
import Carousel from '../base/Carousel.jsx';
import CustomLink from '../base/CustomLink.jsx';
import LS from '../../utils/localStorage';

require('./cart.css');

const CART_KEY = '1yuan-cart';

class CartItem extends Component{
  constructor(props) {
    super(props);
    var leftAmount = this.props.target_amount - this.props.current_amount;
    this.state = {
      left: leftAmount,
      amount: props.quantity || 0
    };
  }

  render(){
    let props = this.props, amountDom, diffAmount,
        amount = props.quantity || 0;
    diffAmount = props.target_amount - props.current_amount;
    amountDom = (
      <div className="cart-i-amount">
        总需{props.target_amount}人次，剩余<span className="cart-i-diff-amount">{diffAmount}</span>人次
      </div>
    );
    return (
      <li className="cart-item">
        <img className="cart-i-cover" src={props.cover} />
        <i className="ico ico-cart_delete fr delete-cart-btn" onTouchTap={this._deleteCart.bind(this, props.id)}/>
        <div className="cart-i-main">
          <div className="cart-i-title txt-one-line">{props.name}</div>
          {amountDom}
          <div className="cart-i-amount-select">
            <i className={"minus-amount ico ico-" + (amount <= props.unit ? 'cart_equrl_disable' : 'cart_equrl_normal')} onTouchTap={this._onMinusAmount.bind(this)}/>
            <input 
              className="amount-text" 
              value={this.state.amount.toString()} 
              onChange={this._onAmountInputChange.bind(this)}
              onKeyDown={this._onKeyDown}
              onBlur={this._onBlur.bind(this)} />
            <i className={"plus-amount ico ico-" + (amount >= this.state.left ? 'cart_plus_disable' : 'cart_plus_normal')} onTouchTap={this._onPlusAmount.bind(this)} />
          </div>
        </div>
      </li>
    );
  }

  _onPlusAmount (e) {
    e.stopPropagation();
    e.preventDefault();
    var amount = parseInt(this.state.amount) || 0;
    if (this.state.left > amount) {
      this.setState({amount: (amount + this.props.unit).toString()});
      this.props.updateCart(this.props.id, amount + this.props.unit);
    }
  }

  _onMinusAmount (e) {
    e.stopPropagation();
    e.preventDefault();
    var amount = parseInt(this.state.amount) || 0;
    if (amount > this.props.unit) {
      this.setState({amount: (amount - this.props.unit).toString()});
      this.props.updateCart(this.props.id, amount - this.props.unit);
    }
  }

  _onAmountInputChange (e) {
    var inputValue = e.target.value;
    if (!isIntNumber(inputValue) && inputValue !== '') {
      e.target.value = inputValue.slice(0, this.state.amount.length);
    } else {
      this.setState({amount: inputValue});
    }
  }

  _onBlur(e){
    var props = this.props, inputValue = e.target.value, intInputValue,
        left = props.target_amount - props.current_amount;

    intInputValue = parseInt(inputValue) || 0;
    intInputValue = Math.max(props.unit, Math.min(Math.ceil(intInputValue / props.unit) * props.unit, left));
    this.setState({amount: intInputValue.toString()});
    this.props.updateCart(this.props.id, intInputValue);
  }

  _onKeyDown(e){
    var code = e.keyCode || e.which;
    if(code == 13){
      e.target.blur();
    }
  }

  _deleteCart(id, e){
    e.stopPropagation();
    e.preventDefault();
    this.props.deleteCart(id);
  }
}

CartItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  cover: PropTypes.string,
  quantity: PropTypes.number,
  unit: PropTypes.number,
  price: PropTypes.number,
  current_amount: PropTypes.number,
  target_amount: PropTypes.number
};


class CartList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      isLoaded: false,
      showDialog: false,
      deleteId: null,
      recommendList: []
    };
  }

  componentDidMount(){
    this._loadInitData();
    this._loadRecommendList();
  }

  render(){
    var cartList = this.state.cartList,
      cartItemsDom = [], item, itemLite, totalPrice = 0;
    if(!this.state.isLoaded) {
      return null;
    } else if (cartList.length === 0) {
      return (
        <div>
          <NoAPIDataTip icon="empty_cart" tip="您的清单空空如也" btnText="立即夺宝" reloadUrl='/' />
          <div className="recommend-list-wrap">
            <div className="c-r-title">浏览记录</div>
            <Carousel items={this.state.recommendList} />
          </div>
        </div>
      )
    }

    for(var i=0,l=cartList.length; i<l; i++) {
      item = cartList[i];
      itemLite = item.lite;
      cartItemsDom.push(
        <CartItem key={itemLite.id} id={itemLite.id} name={itemLite.goods.name}
                  cover={itemLite.goods.cover} quantity={item.quantity} unit={itemLite.unit}
                  price={itemLite.price} current_amount={itemLite.current_amount}
                  target_amount={itemLite.target_amount} updateCart={this._updateCart.bind(this)}
                  deleteCart={this._confirmDeleteFromCart.bind(this)} />);
      totalPrice += item.quantity * itemLite.price;
    }

    return (
      <div className="cart-list-wrap">
        <div className="cart-list-wrap">
          <div className="cart-list-title">清单最多容纳10个宝贝哦！</div>
          <ul className="cart-list-main">{cartItemsDom}</ul>
          <div className="cart-list-foot">
            共{cartList.length}件商品，总计: <span className="total-price">{totalPrice}</span>夺宝币
            <div className="cart-account-btn-wrap" onTouchTap={this._goAccount.bind(this)}>
              <span className="cart-account-btn red-default-btn">结算</span>
            </div>
          </div>
        </div>

        <Dialog clz="delete-cart-confirm" confirm="痛心删除" cancel="保留宝贝"
          content="亲，您确定要删除千挑万选的宝贝吗？" show={this.state.showDialog}
          onCloseClick={this._onDialogDone.bind(this)} onConfirm={this._deleteFromCart.bind(this)}>
        </Dialog>
      </div>
    );
  }

  _loadInitData(){
    this._isRedirectLogin();
    let localCartList, processedList;
    localCartList = LS.getItem(CART_KEY);
    if(localCartList){
      try{
        localCartList = JSON.parse(localCartList);
        this.setState({
          isLoaded: true,
          cartList: localCartList
        });
        // 刷新将原有数据保存
        processedList = this._prepareCartList(localCartList);
        ContentAPI.editCart(processedList)
          .then(res => {
            LS.removeItem(CART_KEY);
          });
      } catch(e) {
        localCartList = null;
      }
    }

    if(!localCartList){
      this._loadDataFromRemote();
    }
  }

  _loadDataFromRemote(){
    let self = this;
    ContentAPI
      .getCartList()
      .then(res => {
        if(res.list){
          self.setState({
            isLoaded: true,
            cartList: res.list
          });
        }
      });
  }

  _loadRecommendList(){
    let self = this,
      sceneId = 2;
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

  _goAccount(){
    var isLogin = Auth.isLoggedIn(),
      processedList = [];
    if(isLogin){
      processedList = this._prepareCartList();
      ContentAPI
        .editCart(processedList)
        .then(res => {
          window.location.href = '/user/pay/';
        });
    }else{
      this._isRedirectLogin();
    }
  }

  _prepareCartList(cartList){
    var item,
      processedList = [];
    cartList = cartList || this.state.cartList;
    for(var i=0,l=cartList.length; i<l; i++){
      item = cartList[i];
      processedList.push({
        activity_id: item.lite.id,
        quantity: item.quantity
      });
    }
    return processedList;
  }

  _updateCart(id, amount){
    this._isRedirectLogin();
    var cartList = this.state.cartList,
      item, itemLite;
    for(var i=0,l=cartList.length; i<l; i++){
      item = cartList[i];
      itemLite = item.lite;
      if(itemLite.id == id){
        cartList[i].quantity = amount;
        this.setState({
          cartList: cartList
        });
        break;
      }
    }
    this._saveCart();
  }

  //避免频繁发请求保存清单，暂时存储在localStorage
  _saveCart(){
    var processedList;
    if(LS.isSupportLocalStorage()){
      this._saveCartToLocal();
    }else{
      processedList = this._prepareCartList();
      ContentAPI.editCart(processedList);
    }
  }

  _saveCartToLocal(){
    LS.setItem(CART_KEY, JSON.stringify(this.state.cartList));
  }

  _confirmDeleteFromCart(id){
    this.setState({
      showDialog: true,
      deleteId: id
    });
  }

  _deleteFromCart(){
    this._isRedirectLogin();
    var cartList = this.state.cartList,
      id = this.state.deleteId,
      item, itemLite;
    for(var i=0,l=cartList.length; i<l; i++){
      item = cartList[i];
      itemLite = item.lite;
      if(itemLite.id == id){
        cartList.splice(i, 1);
        this.setState({
          cartList: cartList
        });
        this._onDialogDone();
        break;
      }
    }
    this._saveCart();
  }

  _onDialogDone(){
    this.setState({
      showDialog: false,
      deleteId: null
    });
  }

  _isRedirectLogin(){
    if(!Auth.isLoggedIn()){
      window.location.href = '/login?from=' + window.location.pathname;
    }
  }
}

export default CartList;
