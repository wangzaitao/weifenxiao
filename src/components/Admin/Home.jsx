import React from 'react';

require('./home.scss');

class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let props = this.props;
		
		return (
			<div className="row">
				<div className="col-md-2">
					left
				</div>
				<div className="col-md-10">
					<div className="m-15">
						fdsfdsfd
					</div>
				</div>
			</div>
		);
	}
}

export default Home;



