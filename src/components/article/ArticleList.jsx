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
		ContentAPI.getAllSightTj(data).then((res) => {
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
				<CustomLink to={"/sight/show/"+item.id} className="hotel_item" style={{display:"block",position:"relative"}}>
					<section className="sight-info clearfix">
						<div className="img">
							<img src={"http://www.668lyzx.com"+item.litpic} style={{height:"100%"}} />
						</div>
						<div className="info">
							<div className="price">
								<span className="unit">¥</span>
								<span className="digit">{item.sellprice}</span>
								<span className="text">起</span>
							</div>
							<div className="name">{item.title}</div>
							<div className="score-service-price overflow-hidden">
								<div className="score">
									<span className="digit">{item.satisfyscore}</span>
									<span className="unit">分</span>
								</div>
								<div className="hotel-type">&nbsp; 5A景区</div>
								<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：{item.recommendnum}</div>
								<div className="service">
									<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
										<i className="icon-park"></i>
									</div>
								</div>
							</div>
							<div className="type-benifit overflow-hidden">
								<div className="gift">{item.sellpoint}</div>
							</div>
							<div className="addr-howfar overflow-hidden">
								<div className="addr">
									{item.address}
								</div>
							</div>
						</div>
					</section>
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



