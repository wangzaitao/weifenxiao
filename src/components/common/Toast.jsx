import React, {Component} from 'react';
import ReactDOM from 'react-dom';

require('./toast.scss');

export default class Toast extends Component{
  render() {
    return (
      <div id="toast-wrap" className={"toast fadein " + this.props.type} >
        {this.props.msg}
      </div>
    );
  }
  componentDidMount() {
    this._setTimeout();
  }
  componentDidUpdate() {
    this._setTimeout();
  }

  _setTimeout() {
    if (this._timeoutId) clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout(function(){
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
    }.bind(this), this.props.timeout);
  }
};

Toast.propTypes = {
  msg: React.PropTypes.string,
  timeout: React.PropTypes.number,
  type: React.PropTypes.string   // 'info', 'success', 'warning', 'error'
};

Toast.defaultProps = {
  msg: '',
  timeout: 3000,
  type: 'info'
};
