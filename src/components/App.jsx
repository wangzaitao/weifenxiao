import React from 'react';
import LocalStorage from '../utils/localStorage';
import * as ContentAPI from './../api/content';
import Header from './common/Header.jsx';
import Footer from './common/Footer.jsx';

require('./common/common.scss');

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		debugger;
		var code = this.props.location.query.code;
		LocalStorage.setItem("code",code);
		alert(code);
		ContentAPI.getTokenAndOpenid(code).then((res) => {
			alert(JSON.stringify(res));
		});
	}

	render() {
		return (
			<div id="content-container">
				<Header />
				<div>
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;

