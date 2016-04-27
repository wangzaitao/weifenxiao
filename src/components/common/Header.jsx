import React, {Component, PropTypes} from 'react';
import CustomLink from './CustomLink.jsx';

class Header extends Component {
	render() {
		return (
			<header className="m-header clearfix">
				<div className="child flex1">
					<a className="city">武汉</a>
				</div>
				<div className="child search">
					<span>目的地/景点门票/酒店</span>
				</div>
				<div className="child m-user">
					<a><img src={require("./../../img/litterPerson.png")} style={{ width:"20px",height:"20px"}}/></a>
				</div>
			</header>
		);
	}
}

export default Header;