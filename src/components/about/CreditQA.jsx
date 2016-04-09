import React from 'react';
import BgTitle from '../base/button/BgTitle.jsx';

class CreditQA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBtn: this.props.location.query && this.props.location.query.show == '1'
    };
  }
  render () {
    var styles = {
      text: {padding: '0.125em 0', lineHeight: '1.5625em', marginBottom: '0.5em'},
      index: {backgroundColor: '#e74c3c', padding: '0.125em 0.44em', borderRadius: '50%', marginRight: '0.3125em', color: '#fff'}
    };
    return (
      <div className="m-body">
        <img src={require('../../img/credit_banner.png')} style={{width: '100%'}}/>
        <div style={{padding: '1em 0.9375em 0 0.9375em'}}>
          <BgTitle title="积分有什么用？" customClass="fs16 mb15 right-bg-white"/>
          <p style={styles.text}><span className="yellow">1000积分=1夺宝币</span>，亲每天都可以赚免费积分哦～当达到1000积分时，就可以兑换1枚夺宝币啦～</p>
        </div>
        <div style={{padding: '0 0.9375em'}}>
          <BgTitle title="如何免费赚积分？" customClass="fs16 mt20 mb15 right-bg-white"/>
          <p style={styles.text}>
            <span style={styles.index}>1</span>
            <span className="yellow">每日签到</span>&nbsp;&nbsp;&nbsp;&nbsp;
            首次签到可获得40积分，连续签到每天增加30积分，100封顶。例如若亲连续签到，积分会是40、70、100、100、100....若亲哪天忘记了，只能再从40开始咯～～～
          </p>
          <p style={styles.text}>
            <span style={styles.index}>2</span>
            <span className="yellow">每日分享</span>&nbsp;&nbsp;&nbsp;&nbsp;
            每天的第一次分享，可以获得100积分。分享应用/商品详情/晒单内容/中奖记录都可以滴。O(n_n)O
          </p>
          <p style={styles.text}>
            <span style={styles.index}>3</span>
            <span className="yellow">参与夺宝</span>&nbsp;&nbsp;&nbsp;&nbsp;
            每次成功消费1元，即可自动获得10积分。每天无上限！！注意：不包括系统奖励的夺宝币和红包的消费哦～～
          </p>
        </div>
        <p className="gray" style={{textAlign: 'center', marginTop: '2em'}}>若亲还有其他疑问，可以联系客服MM哦</p>
        <p className="red" style={{textAlign: 'center', marginBottom: this.state.showBtn ? '4em' : '1em'}}>QQ：3021019182</p>
        {this.state.showBtn ?
            <div style={{position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', backgroundColor: '#fff', borderTop: '1px solid #e5e5e5'}}>
              <a href="/user/my_credit">
                <div style={{margin: '0.5em 1em', padding: '0.5em', backgroundColor: '#e74c3c', color: '#fff', borderRadius: '0.2em'}}>立即赚积分</div>
              </a>
            </div> : undefined}
      </div>
    );
  }
}

export default CreditQA;
