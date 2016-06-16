import React from 'react';
import TravelNav from './TravelNav';

require('./travel.scss');

class TravelContentList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contentList: []
		}
	}
	componentWillMount() {
		var props = this.props;
		this.setState({
			contentList:props.location.state.ContentList
		});
	}
	render() {
		var contentListDom;
		contentListDom = this.state.contentList.map((item, index) => {
			return (
				<div className="more-des-m">
					<p>{item.title}</p>
					<div className="m_more_des">
						<div dangerouslySetInnerHTML={{__html: item.jieshao}} />
					</div>
				</div>
			);
		});
		
		return (
			<div className="tlp">
				<TravelNav name="旅游行程"/>
				{contentListDom}
			</div>
		);
	}
}

export default TravelContentList;



