import React from 'react';

require('./travel.scss');
class TravelNav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let props = this.props;
		return (
			<div className="m-header clearfix">
				<div className="child flex1">
					<a href="javascript:window.history.go(-1);" className="city"></a>
				</div>
				<div className="child title">
					{props.name}
				</div>
				<div className="child m-user">
					<a href="#" className="tool">
						<i></i>
						<i></i>
						<i></i>
					</a>
				</div>
			</div>
		);
	}
}

export default TravelNav;



