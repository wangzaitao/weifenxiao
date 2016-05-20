import React from 'react';
import ReactDOM from 'react-dom';

import Toast from '../components/base/Toast';

export function toast(msg, type, timeout, callback) {
	let data = {msg: msg, type: type};
	if (timeout) {
		if ($.isNumeric(timeout) && Math.floor(timeout) == timeout) {
			data['timeout'] = timeout;
		} else if ($.isFunction(timeout)) {
			data['callback'] = timeout;
		}
	}
	if (callback && $.isFunction(callback)) data['callback'] = callback;
	ReactDOM.render(<Toast {...data} />, document.getElementById('toast-wrapper'));
} 

