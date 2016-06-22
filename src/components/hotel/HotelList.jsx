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
			debugger;
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
				<a className="hotel_item" style={{display:"block",position:"relative"}}>
					<section className="hotel-info clearfix">
						<div className="img">
							<img src={"http://www.668lyzx.com"+item.litpic} />
						</div>
						<div className="info">
							<div className="price">
								<span className="unit">¥</span>
								<span className="digit">289</span>
								<span className="text">起</span>
							</div>
							<div className="name">武汉军悦假日酒店</div>
							<div className="score-service-price overflow-hidden">
								<div className="score">
									<span className="digit">5</span>
									<span className="unit">分</span>
								</div>
								<div className="hotel-type">&nbsp; 四星级</div>
								<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
								<div className="service">
									<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
										<i className="icon-park"></i>
									</div>
								</div>
							</div>
							<div className="type-benifit overflow-hidden">
								<div className="gift">叫醒服务 | 免费停车</div>
							</div>
							<div className="addr-howfar overflow-hidden">
								<div className="addr">
									湖北省武汉市武昌区八一路415号
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
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="hotel-info clearfix">
							<div className="img">
								<img src="http://m.tuniucdn.com/filebroker/cdn/res/71/f9/71f9d6cbed25970daa5f5c1d5c913eb3_w200_h200_c1_t0.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">武汉军悦假日酒店</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 四星级</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">叫醒服务 | 免费停车</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
										湖北省武汉市武昌区八一路415号
									</div>
								</div>
							</div>
						</section>
					</a>
				</div>

			</div>
		);
	}
}

export default HotelList;



