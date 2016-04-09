import React from 'react';
import CustomLink from '../base/CustomLink.jsx';

import * as ContentAPI from '../../api/content';
import BC from '../../utils/broadcast';
import {toast} from '../../utils/toast';
import {isIntNumber} from '../../utils/common';

const CART_LIMIT = 10;

class AddCartConfirm extends React.Component {
  constructor(props) {
    super(props);
    var leftAmount = this.props.target_amount - this.props.current_amount,
        myCount = (this.props.my ? this.props.my.num_count : 0), amount = this.props.unit;
    //if (this.props.unit === 1 && this.props.price > 0) {
    //  if (this.props.target_amount < 2000) {
    //    amount = Math.min(1, leftAmount)
    //  } else if (this.props.target_amount >= 4000) {
    //    amount = Math.min(10, leftAmount)
    //  } else {
    //    amount = Math.min(5, leftAmount)
    //  }
    //}
    this.state = {
      isShow: this.props.isShow,
      amount: amount.toString(),
      left: (this.props.buy_limit ? Math.min(leftAmount, (this.props.buy_limit - myCount)) : leftAmount)
    };
  }
  componentDidMount () {
    if (this.state.isShow && this.props.status === 1 && this.state.left) {
      document.body.style.overflowY = 'hidden';
      document.body.style.position = 'fixed';
    }
  }
  _onCloseConfirm (e) {
    e.stopPropagation();
    e.preventDefault();
    document.getElementsByClassName('add-cart-confirm-container')[0].style.display = 'none';
    document.body.style.overflowY = 'auto';
    document.body.style.position = 'relative';
    this.props.closeDialog && this.props.closeDialog();
  }
  _onPlusAmount (e) {
    e.stopPropagation();
    e.preventDefault();
    var amount = parseInt(this.state.amount) || 0;
    if (this.state.left > amount) {
      this.setState({amount: (amount + this.props.unit).toString()})
    }
  }
  _onMinusAmount (e) {
    e.stopPropagation();
    e.preventDefault();
    var amount = parseInt(this.state.amount) || 0;
    if (amount > this.props.unit) {
      this.setState({amount: (amount - this.props.unit).toString()})
    }
  }
  _onAmountInputChange (e) {
    var inputValue = e.target.value;
    if (!isIntNumber(inputValue) && inputValue !== '') {
      e.target.value = inputValue.slice(0, this.state.amount.length);
    } else {
      this.setState({amount: inputValue})
    }
  }
  componentWillMount () {
    this._onCloseConfirm = this._onCloseConfirm.bind(this);
    this._onMinusAmount = this._onMinusAmount.bind(this);
    this._onPlusAmount = this._onPlusAmount.bind(this);
    this._onAmountInputChange = this._onAmountInputChange.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.isShow != undefined){
      this.setState({
        isShow: nextProps.isShow
      });
    }
  }
  render () {
    var props = this.props,
      amount = parseInt(this.state.amount) || 0,
      buyAmount = Math.max(this.props.unit, Math.min(Math.ceil(amount / this.props.unit) * this.props.unit, this.state.left));
    return (
      <div className="add-cart-confirm-container" style={{display: (this.state.isShow && this.props.status === 1 && this.state.left ? 'block' : 'none')}}>
        <div className="buy-confirm">
          <div className="header">
            <span>购买人次</span>
            <i className="ico ico-icon_close_default fr mt5" onTouchTap={this._onCloseConfirm} />
          </div>
          <div className="amount-selector">
            <i className={"minus-amount ico ico-" + (amount <= this.props.unit ? 'buy_equrl_disable' : 'buy_equrl_normal')} onTouchTap={this._onMinusAmount}/>
            <input className="amount-text" value={this.state.amount} onChange={this._onAmountInputChange} />
            <i className={"plus-amount ico ico-" + (amount >= this.state.left ? 'buy_plus_disable' : 'buy_plus_normal')} onTouchTap={this._onPlusAmount} />
          </div>
          <a className="confirm-btn" onTouchTap={this._editCart.bind(this, props.id, buyAmount)}>
            <div>加入清单</div>
          </a>
        </div>
      </div>
    )
  }

  _editCart(id, amount, e){
    var self = this;
    ContentAPI
      .getCartList()
      .then(res => {
        let list = res.list,
          item, index,
          processedList = [], targetId, itemAmount;
        for(let i=0,l=list.length; i<l; i++){
          item = list[i];
          targetId = item.lite.id;
          if(targetId == id){
            index = i;
            itemAmount = (item.quantity || 0) + amount;
          }else{
            itemAmount = item.quantity;
          }
          processedList.push({
            activity_id: targetId,
            quantity: itemAmount
          });
        }
        if(index === undefined){
          //如果购物车中没有当前所要加的商品，则直接push
          if(processedList.length >= CART_LIMIT){
            toast('清单已满', 'error');
            return null;
          }else{
            processedList.unshift({
              activity_id: id,
              quantity: amount
            });
          }
        }
        return processedList;
      })
      .then(list => {
        if(list){
          ContentAPI
            .editCart(list)
            .then(res => {
              self.setState({
                isShow: false
              });
              BC.notify('cart:updateNum');
              toast('成功加入清单', 'success');
            });
        }
      });

    e.preventDefault();
  }
}

export default AddCartConfirm;
