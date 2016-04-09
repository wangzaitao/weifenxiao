import React, { Component, PropTypes } from 'react';

import * as GlobalConfig from '../../constants/Config';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remain: this.props.remain - 10 || 0
    };
  }
  tick () {
    if (this.state.remain <= 0) {
      clearInterval(this.interval);
      if (this.props.onTimerGone) {
        this.props.onTimerGone();
      }
      return;
    }
    this.setState({remain: this.state.remain - 10});
  }
  componentDidMount () {
    this.interval = setInterval(this.tick.bind(this), 10);
  }
  componentWillUnmount () {
    clearInterval(this.interval);
  }

  render () {
    const props = this.props;
    var milliseconds = (this.state.remain % GlobalConfig.TIMER.second) / 10;
    var seconds = Math.floor((this.state.remain % GlobalConfig.TIMER.minute) / GlobalConfig.TIMER.second);
    var minutes = Math.floor((this.state.remain % GlobalConfig.TIMER.hour) / GlobalConfig.TIMER.minute);
    var hours = Math.floor((this.state.remain % GlobalConfig.TIMER.day ) / GlobalConfig.TIMER.hour);

    var timerTxt = '';
    if (hours > 0) {
      hours = hours < 10 ? '0' + hours : hours;
      timerTxt += hours + ':';
    }

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    timerTxt += minutes + ':' + seconds;
    if(!props.isDisableMilliseconds){
      milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
      timerTxt += ':' + milliseconds;
    }

    return <span className="countdown red" style={this.props.textStyle} data-remain={this.props.remain}>{timerTxt}</span>;
  }
}

export default CountdownTimer;

CountdownTimer.propTypes = {
  remain: PropTypes.number,
  textStyle: PropTypes.object,
  onTimerGone: PropTypes.func,
  isDisableMilliseconds: PropTypes.bool
};
