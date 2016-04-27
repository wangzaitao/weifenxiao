import React, {Component, PropTypes} from 'react';
import CustomLink from './CustomLink.jsx';

class Banner extends Component {
	render() {
		return (
			<div className="banner clearfix">
				<a>
					<img src={require("./../../img/ad1.jpeg")} />
				</a>
			</div>
		);
	}
}

export default Banner;