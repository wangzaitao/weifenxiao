import React from 'react';
import TravelNav from './../travel/TravelNav';
import * as ContentAPI from './../../api/content';
import CustomLink from './../common/CustomLink.jsx';

require('./article.scss');

class ArticleList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}

	componentWillMount() {
		var data = {
			isDesc: true
		};
		ContentAPI.getAllArticleTj(data).then((res) => {
			this.setState({
				list: res
			});
		});
	}

	render() {
		let props = this.props;

		var listDom;
		listDom = this.state.list.map((item, index) => {
			return (
				<CustomLink to={"/article/show/"+item.id} className="hotel_item" style={{display:"block",position:"relative",marginLeft:"1em",lineHeight:"3em"}}>
					{index+1}. {item.title}
				</CustomLink>
			);
		});

		return (
			<div className="tlp">
				<TravelNav name="文章"/>

				<div className="more-des-m m_4th">
					<p>热门文章</p>
				</div>
				<div className="hotel-list">
					{listDom}
				</div>

			</div>
		);
	}
}

export default ArticleList;



