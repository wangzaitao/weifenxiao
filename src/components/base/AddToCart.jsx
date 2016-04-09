import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

import * as ContentAPI from '../../api/content';
import Auth from '../../api/auth';
import {toast} from '../../utils/toast';
import BC from '../../utils/broadcast';

const CART_LIMIT = 10;

export var AddToCart = ComposedComponent => class extends Component {
  render() {
    return <ComposedComponent {...this.props} editCart={this._editCart.bind(this)} />;
  }

  _editCart(e) {
    e.preventDefault();
    var self = this, props = this.props, id = props.id;
    if(!Auth.isLoggedIn()) {
      window.location.href = '/login?from=' + window.location.pathname;
    }
    ContentAPI.getCartList()
      .then(res => {
        let list = res.list,
          item, index,
          processedList = [], targetId, targetQuantity,
          amount = self._genInitAmount();

        for(let i=0,l=list.length; i<l; i++){
          item = list[i];
          targetId = item.lite.id;
          targetQuantity = item.quantity || 0;
          if(targetId == id){
            targetQuantity += amount;  //1*unit
            index = i;
          }
          processedList.push({
            activity_id: targetId,
            quantity: targetQuantity
          });
        }
        if(index === undefined) {
          // 如果购物车中没有当前所要加的商品，则直接push
          if(processedList.length >= CART_LIMIT) {
            toast('清单已满', 'error');
            return null;
          } else {
            processedList.unshift({
              activity_id: id,
              quantity: amount   // 1*unit
            });
          }
        }
        return processedList;
      })
      .then(list => {
        if(list){
          ContentAPI.editCart(list)
            .then(res => {
              BC.notify('cart:updateNum');
              toast('成功加入清单', 'success');
            });
        }
      });
  }

  _genInitAmount() {
    //let props = this.props, amount = props.unit,
    //  leftAmount = props.target_amount - props.current_amount;
    //if(props.unit === 1 && props.price > 0){
    //  if (props.target_amount < 2000) {
    //    amount = Math.min(1, leftAmount)
    //  } else if (props.target_amount >= 4000) {
    //    amount = Math.min(10, leftAmount)
    //  } else {
    //    amount = Math.min(5, leftAmount)
    //  }
    //}
    return this.props.unit;
  }
};
