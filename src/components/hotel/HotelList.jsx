import React from 'react';
import TravelNav from './../travel/TravelNav';
import * as ContentAPI from './../../api/content';
import CustomLink from './../common/CustomLink.jsx';

require('./hotel.scss');

class HotelList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hotelList: []
		};
	}

	componentWillMount() {
		var data = {
			isDesc: true
		};
		ContentAPI.getAllHotelTj(data).then((res) => {
			this.setState({
				hotelList: res
			});
		});
	}

	render() {
		let props = this.props;

		var listDom;
		listDom = this.state.hotelList.map((item, index) => {
			return (
				<a href={"/hotel/show/"+item.id} className="hotel_item" style={{display:"block",position:"relative"}}>
					<section className="hotel-info clearfix">
						<div className="img">
							<img src={"http://www.668lyzx.com"+item.litpic} />
						</div>
						<div className="info">
							<div className="price">
								<span className="unit">¥</span>
								<span className="digit">{item.price}</span>
								<span className="text">起</span>
							</div>
							<div className="name">{item.title}</div>
							<div className="score-service-price overflow-hidden">
								<div className="score">
									<span className="digit">{item.satisfyscore}</span>
									<span className="unit">分</span>
								</div>
								<div className="hotel-type">&nbsp; 四星级</div>
								<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：{item.recommendnum}</div>
								<div className="service">
									<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
										<i className="icon-park"></i>
									</div>
								</div>
							</div>
							<div className="type-benifit overflow-hidden">
								<div className="gift">卖点：{item.sellpoint}</div>
							</div>
							<div className="addr-howfar overflow-hidden">
								<div className="addr">
									{item.address}
								</div>
							</div>
						</div>
					</section>
				</a>
			);
		});

		return (
			<div className="tlp">
				<TravelNav name="酒店" />

				<div className="price">
					<ul>
						<li><a>价格从低到高</a></li>
						<li><a>价格从高到低</a></li>
					</ul>
				</div>

				<div className="hotel-list">
					{listDom}
				</div>

			</div>
		);
	}
}

export default HotelList;



