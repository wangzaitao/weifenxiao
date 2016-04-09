import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';

class NumberItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNumbers: this.props.showNumbers || false,
      numbers: this.props.numbers || []
    }
    ;
  }
  componentWillMount () {
    if (this.props.numCount > this.state.numbers.length) {
      ContentAPI.getAllRecordNumbers(this.props.activityId, this.props.orderId, function (data) {
        if (data.length) {
          this.setState({numbers: data.slice(0, 200)})
        }
      }.bind(this))
    }
  }
  toggleNumberList () {
    this.setState({showNumbers: !this.state.showNumbers})
  }
  render () {
    var allNumbers = [];
    for (var i=0; i < this.state.numbers.length; i++) {
      allNumbers.push(<li style={{display: 'inline-block', width: '20%'}} key={i}><span>{this.state.numbers[i]}</span></li>);
    }
    return (
      <li className="mb8">
        <div className="bb1-gray" style={{padding: '0.5em 0.875em', borderTop: '1px solid #e5e5e5'}} onTouchTap={this.toggleNumberList.bind(this)}>
          <span className="time">{this.props.time}</span>
          <i className={"fr mt10 ico ico-" + (this.state.showNumbers ? 'icon_arrow_up_default' : 'icon_arrow_down_default')} />
          <span className="amount fr pr10"><span className="red">{this.props.numCount}</span>人次</span>
        </div>
        <ul className="all-numbers" style={{padding: '0.5em 0.875em', display: this.state.showNumbers ? 'block' : 'none'}}>
          {allNumbers}
        </ul>
      </li>
    );
  }
}

export default NumberItem;

NumberItem.propTypes = {
  time: PropTypes.string,
  numCount: PropTypes.number,
  showNumbers: PropTypes.bool,
  numbers: PropTypes.array,
  activityId: PropTypes.string,
  orderId: PropTypes.string
};
