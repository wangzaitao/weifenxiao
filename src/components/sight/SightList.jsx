import React from 'react';
import TravelNav from './../travel/TravelNav';

require('./sight.scss');

class SightList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let props = this.props;

		return (
			<div className="tlp">
				<TravelNav name="景点门票"/>

				<div className="more-des-m m_4th">
					<p>特色主题</p>
					<div className="m_more_des">
						<span><a href="#">登山探险</a></span>
						<span><a href="#">温泉</a></span>
						<span><a href="#">名胜古迹</a></span>
						<span><a href="#">主题乐园</a></span>
						<span><a href="#">漂流避暑</a></span>
						<span><a href="#">山水园林</a></span>
						<span><a href="#">游船</a></span>
						<span><a href="#">动植物园</a></span>
					</div>
				</div>
				<div className="more-des-m m_4th">
					<p>人气景点</p>
				</div>
				<div className="hotel-list">
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="sight-info clearfix">
							<div className="img">
								<img src="http://c.cncnimg.cn/037/257/fa55_m.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">黄鹤楼</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 5A景区</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">亭台楼阁 | 山脉</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="sight-info clearfix">
							<div className="img">
								<img src="http://c.cncnimg.cn/037/257/fa55_m.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">黄鹤楼</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 5A景区</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">亭台楼阁 | 山脉</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="sight-info clearfix">
							<div className="img">
								<img src="http://c.cncnimg.cn/037/257/fa55_m.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">黄鹤楼</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 5A景区</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">亭台楼阁 | 山脉</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="sight-info clearfix">
							<div className="img">
								<img src="http://c.cncnimg.cn/037/257/fa55_m.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">黄鹤楼</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 5A景区</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">亭台楼阁 | 山脉</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="sight-info clearfix">
							<div className="img">
								<img src="http://c.cncnimg.cn/037/257/fa55_m.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">黄鹤楼</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 5A景区</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">亭台楼阁 | 山脉</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="sight-info clearfix">
							<div className="img">
								<img src="http://c.cncnimg.cn/037/257/fa55_m.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">黄鹤楼</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 5A景区</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">亭台楼阁 | 山脉</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
									</div>
								</div>
							</div>
						</section>
					</a>
					<a className="hotel_item" style={{display:"block",position:"relative"}}>
						<section className="sight-info clearfix">
							<div className="img">
								<img src="http://c.cncnimg.cn/037/257/fa55_m.jpg" />
							</div>
							<div className="info">
								<div className="price">
									<span className="unit">¥</span>
									<span className="digit">289</span>
									<span className="text">起</span>
								</div>
								<div className="name">黄鹤楼</div>
								<div className="score-service-price overflow-hidden">
									<div className="score">
										<span className="digit">5</span>
										<span className="unit">分</span>
									</div>
									<div className="hotel-type">&nbsp; 5A景区</div>
									<div style={{float:"left",lineHeight:"30px",marginLeft:"4px"}}>推荐：50</div>
									<div className="service">
										<div className="parent-icon" style={{marginRight: "5px",fontSize: "1.6rem",float: "left",marginLeft: "2px"}}>
											<i className="icon-park"></i>
										</div>
									</div>
								</div>
								<div className="type-benifit overflow-hidden">
									<div className="gift">亭台楼阁 | 山脉</div>
								</div>
								<div className="addr-howfar overflow-hidden">
									<div className="addr">
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

export default SightList;



