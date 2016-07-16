import React from 'react';
import ReactDOM from 'react-dom';

import Toast from '../components/common/Toast';

export function toast(msg, type){
	ReactDOM.render(<Toast msg={msg} type={type} />, document.getElementById('toast-wrap'));
}

