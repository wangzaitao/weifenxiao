import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Mask } from 'react-ui-components';

require('./toast.scss');

export default class Toast extends Component {
	render() {
		return (
			<div className="toast-wrap">
				<Mask/>
				<div  className="toast fadein ">
					<i className={"ico ico-popup_" + (this.props.type == 'error' ? 'no' : 'yes')}/>
					{this.props.msg}
				</div>
			</div>
		);
	}
	componentDidMount() {
		this._setTimeout();
	}
	componentDidUpdate() {
		this._setTimeout();
	}

	_timeoutId = null;
	_setTimeout() {
		if (this._timeoutId) clearTimeout(this._timeoutId);

		this._timeoutId = setTimeout(function(){
			ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
			this.props.callback && this.props.callback();
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
