import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

import CountdownTimer from '../base/CountdownTimer.jsx';

class Countdown extends Component {
  render () {
    return (
      <div className="m-detail-countdown mt8">
        <span className="pr10">揭晓倒计时</span>
        <CountdownTimer remain={this.props.revealing.remain_ms} onTimerGone={this.props.onCountdownFinished}
                        textStyle={{color: '#fff !important', fontSize: '1.375em', verticalAlign: 'middle'}} />
        <CustomLink className="calc-detail-link" to={'/calculate/' + this.props.id}>计算详情</CustomLink>
      </div>
    )
  }
}

export default Countdown;

Countdown.propTypes = {
  revealing: PropTypes.object,
  onCountdownFinished: PropTypes.func
};
