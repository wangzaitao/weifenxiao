import React from 'react';

import Header from './common/Header.jsx';
import Footer from './common/Footer.jsx';

require('./common/common.scss');

class App extends React.Component {
	constructor(props) {
		super(props);
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

