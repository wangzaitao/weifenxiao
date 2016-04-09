import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';

import Auth from '../../api/auth';
import Dialog from '../base/Dialog.jsx';
import * as ContentAPI from '../../api/content';
import * as GlobalConfig from '../../constants/Config';

class SelectCouponItem extends React.Component {
  render () {
    var rightIcon = null;
    if (this.props.avail) {
      if (this.props.selected) {
        rightIcon = <i className="mr16 ico-right ico ico-checkbox"/>
      } else {
        rightIcon = <i className="mr16 ico-right ico ico-uncheck" data-id={this.props.id} onTouchTap={this.props.onSelected}/>
      }
    }
    return (
      <li className="coupon-item">
        <div className={"price fl mr16" + (this.props.avail ? '' : ' used')}>
          <span style={{color: (this.props.avail ? '#fff328' : '#bfbfbf')}}>{this.props.price}</span>
        </div>
        <div className="content inline-block">
          <p className={this.props.avail ? '' : 'gray'}>{this.props.title}</p>
          <p className="gray">{this.props.desc}</p>
          <p className="gray">
            <i className="ico ico-time mr5"/>
            <span>{this.props.start_date + ' 至 ' + this.props.end_date}</span>
          </p>
        </div>
        {rightIcon}
      </li>
    )
  }
}

class Pay extends React.Component {
  totalActivityList = [];
  activityIdList = [];
  constructor(props, context) {
    super(props, context);
    var orderAmount = parseInt(this.props.params.amount);
    this.state = {
      activityId: this.props.params.activityId,
      price: null,
      amount: orderAmount,
      totalPrice: null,
      balanceUpdated: false,
      balance: G.balance,
      useBalance: (G.balance > 0),
      isPaying: false,
      allowPayTypes: [],
      useOtherPay: (G.balance < orderAmount),
      otherPayType: G.chn === GlobalConfig.CHANNELS.YOUXIN ? GlobalConfig.PT_UXIN_WAP : GlobalConfig.PT_IPAY_WAP,
      otherPayAmount: Math.max(0, orderAmount - G.balance),
      availableCoupons: [],
      availableCouponCount: 0,
      pendingCoupons: [],
      coupons: {},
      selectedCoupon: {},
      showDialog: false,
      returnUrl: '',
      isExpandPayment: false  // 是否展开具体购买商品信息
    };
  }
  componentWillMount () {
    if(this.state.activityId) {
      this.getUserBalance();
      ContentAPI.getActivityDetail(this.state.activityId, function (data) {
        var price = (data.price === null ? 1 : data.price);
        this.state.price = price;
        this.setState({
          totalPrice: price * this.state.amount,
          useBalance: (G.balance > 0 || price === 0),
          useOtherPay: (G.balance < this.state.amount && price > 0)
        });
        data.quantity = this.state.amount;
        this.totalActivityList = [data];

        setTimeout(function(){
          this.processAvailableCoupons();
        }.bind(this), 0);

      }.bind(this));
    }else{
      //从清单列表页面点击支付
      ContentAPI
        .getCartList()
        .then(res => {
          let list = res.list || [],
            item,
            totalAmount = 0,
            totalPrice = 0,
            activityIdList = [];
          for(let i=0,l=list.length; i<l; i++){
            item = list[i];
            totalAmount += item.quantity;
            totalPrice += item.quantity * item.lite.price;
            activityIdList.push(item.lite.id);
          }
          this.totalActivityList = list;
          this.activityIdList = activityIdList;
          this.setState({
            amount: totalAmount,
            totalPrice: totalPrice
          });
        })
        .then(function() {
          this.getUserBalance();
        }.bind(this))
        .then(function(){
          this.processAvailableCoupons();
        }.bind(this));
    }
    
    this.onBalanceSelectClick = this.onBalanceSelectClick.bind(this);
    this.onPayTypeSelectClick = this.onPayTypeSelectClick.bind(this);
    this.onConfirmPayClick = this.onConfirmPayClick.bind(this);
    this.onClickCoupons = this.onClickCoupons.bind(this);
    this.onSelectCoupon = this.onSelectCoupon.bind(this);
    this.onRemoveCoupon = this.onRemoveCoupon.bind(this);
    this.onCloseCouponList = this.onCloseCouponList.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onConfirmDialog = this.onConfirmDialog.bind(this);
  }
  getUserBalance(){
    Auth.updateUserInfo(function () {
      var newUserBalance = G.balance;
      if (newUserBalance === this.state.balance) {
        this.setState({balanceUpdated: true})
      } else {
        this.setState({
          balanceUpdated: true,
          balance: newUserBalance,
          useBalance: (newUserBalance > 0),
          useOtherPay: (newUserBalance < this.state.amount),
          otherPayAmount: newUserBalance >= this.state.amount ? 0 : this.state.amount - newUserBalance
        })
      }
    }.bind(this));
  }
  processAvailableCoupons(){
    if (this.state.totalPrice > 0) {
      ContentAPI.getPayTypes({platform: 'web', version_code: (G.versionCode || '1'), locale: 'cn', chn: (G.chn || '')}, function (types) {
        var payTypes = types.map(function (item) {return item.pay_type});
        this.setState({allowPayTypes: payTypes})
      }.bind(this));
      ContentAPI.getAvailableCoupons({price: this.state.totalPrice, page: 1, size: 500}, function (data, pendingList, total) {
        var coupons = {}, selectedCoupon = data.length ? data[0] : {}, couponPrice = selectedCoupon.price || 0;
        data.map(function (item) {coupons[item.id] = item});
        this.setState({
          availableCoupons: data,
          availableCouponCount: total,
          pendingCoupons: pendingList,
          coupons: coupons,
          selectedCoupon: selectedCoupon,
          useBalance: (this.state.balance > 0 || couponPrice >= this.state.amount),
          useOtherPay: (this.state.balance + couponPrice < this.state.amount),
          otherPayAmount: Math.max(0, this.state.amount - this.state.balance - couponPrice)
        })
      }.bind(this));
    }
  }
  onBalanceSelectClick () {
    if (this.state.useBalance && !this.state.otherPayAmount || !this.state.balance) {
      return false;
    }
    var couponPrice = this.state.selectedCoupon.price || 0;
    this.setState({
      useBalance: !this.state.useBalance,
      useOtherPay: this.state.useBalance ? true : (this.state.balance + couponPrice < this.state.amount),
      otherPayAmount: this.state.useBalance ? (this.state.amount - couponPrice) :
          Math.max(0, this.state.amount - this.state.balance - couponPrice)
    })
  }
  onPayTypeSelectClick (e) {
    var currentEle = $(e.currentTarget);
    if (currentEle.hasClass('ico-checkbox')) {
      return false;
    } else {
      if ($('.pay-type-select.ico-checkbox').length) {
        this.setState({otherPayType: parseInt(currentEle.attr('value'))})
      } else {
        this.setState({
          useBalance: false,
          otherPayType: parseInt(currentEle.attr('value')),
          useOtherPay: true,
          otherPayAmount: (this.state.amount - (this.state.selectedCoupon.price || 0))
        })
      }
    }
  }
  onClickCoupons () {
    if (this.state.availableCoupons.length || this.state.pendingCoupons.length) {
      document.getElementById('select-coupon-container').style.display = 'block';
    }
  }
  onSelectCoupon (e) {
    var selectedCoupon = this.state.coupons[$(e.target).attr('data-id')], couponPrice = selectedCoupon.price || 0;
    this.setState({
      selectedCoupon: selectedCoupon,
      otherPayAmount: Math.max(0, this.state.amount - couponPrice - (this.state.useBalance ? this.state.balance : 0))
    });
    document.getElementById('select-coupon-container').style.display = 'none';
  }
  onRemoveCoupon (e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      selectedCoupon: {},
      otherPayAmount: Math.max(0, this.state.amount - (this.state.useBalance ? this.state.balance : 0))
    });
    document.getElementById('select-coupon-container').style.display = 'none';
  }
  onCloseCouponList () {
    document.getElementById('select-coupon-container').style.display = 'none';
  }
  onConfirmPayClick () {
    if ((this.state.totalPrice === 0 && this.state.price !== 0) || (!this.state.useBalance && !this.state.useOtherPay)) {
      return false;
    } else {
      this.setState({isPaying: true});
      if (!this.state.useOtherPay || !this.state.otherPayAmount) {
        let apiData = {};
        if (this.state.selectedCoupon.id) apiData['coupon'] = this.state.selectedCoupon.id;
        if(this.state.activityId) {  // 单商品支付
          apiData['buy_quantity'] = this.state.amount;
          ContentAPI.payByBalance(this.state.activityId, apiData, function (data) {
            if (Object.keys(data).length) {
              let activityItem = this.totalActivityList[0];
              browserHistory.push({
                pathname: '/user/pay_result/' + this.state.activityId + '/balance/' + this.state.amount,
                query: {
                  count: data.order_numbers.length,
                  back_url: '/activity/' + this.state.activityId
                },
                state: {
                  activityList: [{
                    id: this.state.activityId,
                    term: activityItem.term,
                    title: activityItem.goods.name,
                    orderNumbers: data.order_numbers,
                    numCount: data.order_numbers.length
                  }]
                }
              });
            } else {
              this.setState({isPaying: false});
            }
          }.bind(this));
        } else {  // 批量支付
          apiData['buy_list'] = JSON.stringify(this.activityIdList);
          ContentAPI.payBatchByBalance(apiData, function (data) {
            let successList = data.success_list, successItem,
              failList = data.fail_list, originActItem, targetActItem,
              targetActivityList = [], _totalAmount = 0;
            if(successList.length === 0) {
              this.setState({isPaying: false});
            } else {
              for(let i=0,l=successList.length; i<l; i++){
                successItem = successList[i];
                originActItem = this.getActivityById(successItem.activity_id);
                targetActItem = {
                  id: originActItem.lite.id,
                  term: originActItem.lite.term,
                  title: originActItem.lite.goods.name,
                  orderNumbers: successItem.order_numbers,
                  numCount: successItem.order_num_count
                };
                _totalAmount += successItem.order_numbers.length;
                targetActivityList.push(targetActItem);
              }
              this.setState({
                amount: _totalAmount
              });

              browserHistory.push({
                pathname: '/user/pay_result/balance/' + _totalAmount,
                query: {back_url: '/'},
                state: {activityList: targetActivityList}
              });
            }
          }.bind(this));
        }
      } else {
        ContentAPI.getPayID({type: this.state.otherPayType}, function (payId) {
          if (payId) {
            var returnUrl,
              apiData = {
                pay_id: payId,
                pay_amount: this.state.otherPayAmount,
                quantity: this.state.amount,
                cancel_url: window.location.href
              };
            if (this.state.activityId) {
              returnUrl = window.location.origin + '/user/pay_result/' + this.state.activityId + '/pay/' + payId + '?back_url=/activity/' + this.state.activityId;
              apiData.activity_id = this.state.activityId;
            } else {
              returnUrl = window.location.origin + '/user/pay_result/pay/' + payId + '?back_url=/';
              apiData.buy_list = JSON.stringify(this.activityIdList);
            }
            apiData.return_url = returnUrl;

            if (this.state.selectedCoupon.id) apiData['coupon'] = this.state.selectedCoupon.id;
            ContentAPI.submitPay(apiData, function (data) {
              if (data.charge) {
                if (this.state.otherPayType === GlobalConfig.PT_ALIPAY_WAP) {  // alipay web
                } else if (this.state.otherPayType === GlobalConfig.PT_WEPAY_WAP) {  // wepay web
                } else if (this.state.otherPayType === GlobalConfig.PT_IPAY_WAP) {  // ipay web
                  var url = GlobalConfig.IPAY_REDIRECT_URL.replace('{%sign_string%}', encodeURIComponent(data.charge.sign))
                    .replace('{%trans_data%}', encodeURIComponent(data.charge.transdata)).replace('{%sign_type%}', data.charge.signtype);
                  window.location.href = url;
                } else if (this.state.otherPayType === GlobalConfig.PT_UXIN_WAP) {  // uxin native
                  this.setState({showDialog: true, returnUrl: returnUrl});
                  if (window.JsInterface) {
                    window.JsInterface.callNativePay(JSON.stringify(data.charge.credential.alipay));
                  }
                } else if (this.state.otherPayType === GlobalConfig.PT_IPAYNOW_WAP) {
                  window.location.href = data.charge.url;
                }
                this.setState({isPaying: false});
              } else {
                console.log("Submit pay failed!");
                this.setState({isPaying: false});
              }
            }.bind(this))
          } else {
            console.log("Get pay ID failed!");
            this.setState({isPaying: false});
          }
        }.bind(this));
      }
    }
  }
  getActivityById (id){
    let item;
    for(let i=0,l=this.totalActivityList.length; i<l; i++){
      item = this.totalActivityList[i];
      if(item.lite.id == id){
        return item;
      }
    }
  }
  onCloseDialog () {
    this.setState({showDialog: false})
  }
  onConfirmDialog () {
    window.location.href = this.state.returnUrl;
  }

  render() {
    if (!this.state.balanceUpdated) {
      return (<div className="bgc-white user-pay"></div>)
    }

    var payTypeItems = this.state.allowPayTypes.map(function (item, index) {
      var payTypeInfos = GlobalConfig.PAY_TYPES[item];
      return (
        <div className="pay-type-item" key={index}>
          <i className={"ico ico-" + payTypeInfos.iconClass} />
          <span className="ml16">{payTypeInfos.name}</span>
          {payTypeInfos.comment ? <span className="gray fs14">{' (' + payTypeInfos.comment + ')'}</span> : undefined}
          <i className={"pay-type-select fr ico ico-" + (this.state.useOtherPay && (this.state.otherPayType == item) ? 'checkbox' : 'uncheck')} value={item} onTouchTap={this.onPayTypeSelectClick} />
        </div>
      );
    }.bind(this));

    var couponTitle, couponItems = [], 
      expandSrcData, expandPaymentDom, expandIconCls = 'ico';
    if (!this.state.availableCouponCount) {
      couponTitle = <span>当前无可用</span>
    } else if (!Object.keys(this.state.selectedCoupon).length) {
      couponTitle = <span className="red">{this.state.availableCouponCount}个红包可使用</span>
    } else {
      couponTitle = (
        <span>
          <i className="mr5 ico ico-ic_redpackets"/>
          <span style={{backgroundColor: '#e74c3c', color: '#fff', padding: '0.1em 0.5em'}}>{this.state.selectedCoupon.desc}</span>
        </span>
      )
    }
    for (var i in this.state.availableCoupons) {
      var coupon = this.state.availableCoupons[i];
      coupon['avail'] = true;
      coupon['selected'] = this.state.selectedCoupon.id == coupon.id;
      coupon['onSelected'] = this.onSelectCoupon;
      couponItems.push(<SelectCouponItem {...coupon} key={coupon.id}/>)
    }
    for (var i in this.state.pendingCoupons) {
      var coupon = this.state.pendingCoupons[i];
      coupon['avail'] = false;
      coupon['selected'] = false;
      couponItems.push(<SelectCouponItem {...coupon} key={coupon.id}/>)
    }

    if(this.state.isExpandPayment){
      expandIconCls += ' ico-icon_arrow_up_default';
      expandSrcData = this.preparePaymentList();
      expandSrcData = expandSrcData.map(function(item, index){
        return (
          <div key={index}>
            <div className="fr">
              <span className="yellow">{item.quantity}</span>人次
            </div>
            <div className="txt-one-line">{item.name}</div>
          </div>
        );
      });
      expandPaymentDom = (
        <div className="payment-wrap gray">
          {expandSrcData}
        </div>
      );
    }else{
      expandIconCls += ' ico-icon_arrow_down_default';
    }

    return (
      <div className="bgc-white user-pay">
        <div className="item">
          <span>支付金额</span>
          <span className="gray fr" onTouchTap={this.togglePayment.bind(this)}>
            <span className="red pr5">{this.state.totalPrice}</span>
            <span className="pay-text">夺宝币</span>
            <i className={expandIconCls}/>
          </span>
        </div>
        {expandPaymentDom}
        <div className="empty-driver"></div>
        {this.state.totalPrice > 0 ?
          <div className="item">
            <span>红包</span>
            <span className="gray fr" onTouchTap={this.onClickCoupons}>
              {couponTitle}<i className="ml5 ico ico-icon_arrow_right_default"/>
            </span>
            <div className="fs14 gray" style={{display: (Object.keys(this.state.selectedCoupon).length ? 'block' : 'none')}}>
              <span>红包抵扣</span>
              <span className="red fr mr16">-{this.state.selectedCoupon.price}</span>
            </div>
          </div> : undefined
        }
        {this.state.totalPrice > 0 ? <div className="empty-driver"></div> : undefined}
        <div className="item">
          <span>余额支付</span>
          <span className="gray fs14">（账户余额：<span className="red">{this.state.balance}</span>夺宝币）</span>
          <i className={"fr ico ico-" + (this.state.useBalance ? 'checkbox' : 'uncheck')} value="alipay" onTouchTap={this.onBalanceSelectClick} />
        </div>
        {this.state.totalPrice > 0 ?
          <div className="item">
            <p>
              <span>其他方式支付</span>
              <span className="gray fs14">（1元 = 1夺宝币）</span>
              <span className="red fr" style={{display: (this.state.useOtherPay && this.state.otherPayAmount ? 'block' : 'none')}}>
                {this.state.otherPayAmount}￥
                <i className="ml5 ico ico-icon_arrow_down_default"/>
              </span>
            </p>
            <div className="mb8">{payTypeItems}</div>
          </div> : undefined
        }
        <button className={"confirm-pay " + (this.state.isPaying ? 'btn-disabled' : '')} disabled={this.state.isPaying} onTouchTap={this.onConfirmPayClick}>
          {this.state.isPaying ? '正在支付...' : '确认支付'}
        </button>

        {this.state.totalPrice > 0 ?
          <div id="select-coupon-container" style={{display: 'none'}}>
            <div className="select-coupon">
              <div style={{textAlign: 'center'}}>
                <span className="ml16">我的红包</span>
                <i className="fr mr16 ico ico-icon_close_default" onTouchTap={this.onCloseCouponList}/>
              </div>
              <div><ul className="bb1-gray">{couponItems}</ul></div>
              <div className="red unselected" onTouchTap={this.onRemoveCoupon}>不使用红包</div>
            </div>
          </div> : undefined
        }
        <Dialog clz="dialog-center" confirm="已支付并查看" cancel="更换支付方式" content="请根据您的支付情况，选择下面的按钮" show={this.state.showDialog}
                onCloseClick={this.onCloseDialog} onConfirm={this.onConfirmDialog} />
      </div>
    );
  }

  togglePayment(){
    this.setState({
      isExpandPayment: !this.state.isExpandPayment
    });
  }

  preparePaymentList(){
    let processedList = [],
      srcList = this.totalActivityList || [],
      item, quantity, name;
    for(let i=0,l=srcList.length; i<l; i++){
      item = srcList[i];
      if(item.lite){
        name = item.lite.goods.name;
      }else{
        name = item.goods.name;
      }
      quantity = item.quantity;
      processedList.push({
        name: name,
        quantity: quantity
      })
    }
    return processedList;
  }
}

Pay.contextTypes = {
  history: PropTypes.object.isRequired
};

export default Pay;
