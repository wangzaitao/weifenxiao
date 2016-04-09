import React, { Component, PropTypes } from 'react';

class Progress extends Component {
  render () {
    var progress = Math.floor(this.props.current_amount * 100.0 / this.props.target_amount);
    return (
      <div className="m-activity-progress mt8 progress">
        <p className="wrap">
          <span className="process-bar"><i className="color" style={{width: progress + '%'}} /></span>
        </p>
        <ul className="txt">
            <li className="gray"><p>总需<span className="red">{this.props.target_amount}</span> 次</p></li>
            <li className="gray fr"><p>剩余<span className="red">{this.props.target_amount - this.props.current_amount}</span>次</p></li>
        </ul>
      </div>
    )
  }
}

export default Progress;

Progress.propTypes = {
  current_amount: PropTypes.number,
  target_amount: PropTypes.number
};
