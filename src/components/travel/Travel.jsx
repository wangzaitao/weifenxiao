import React from 'react';
import TravelNav from './TravelNav';

require('./travel.scss');

class Travel extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let props = this.props;
		
		return (
			<div className="tlp">
				<TravelNav name="线路详情"/>
				<div className="lineTopImg">
					<a>
						<img src="http://c.cncnimg.cn/039/602/adda_m.jpg"/>
					</a>
					<p>武汉市内精华一日游</p>
				</div>
				
				<div className="lineTopTxt bBor">
					<money className="corRed">￥<span>176</span><em className="cor666">起</em></money>
					<not className="ml15">￥200</not>
					<span className="btn_a1">起价说明</span>
					<p className="cor666">
						<i className="iconGPS"></i>
						武汉出发 | 跟团游
						<span className="fr cor999 mr10">
							产品编号：836916
						</span>
					</p>
				</div>
				<div className="lunboTxt cor999 f12"> *温馨提示：
					<div className="lunbo j_lunbo">
						<div className="not" style={{marginTop: "-33px"}}> 天天发团 请至少提前2天报名</div>
						<div style={{marginTop: "0px"}}> 无购物有自费</div>
					</div>
				</div>
				<ul className="borBotList max btBor">
					<li>
						<a href="javascript:" className="j_herf_ajax">
							<i className="iconHua"></i> 预订类型
							<span className="fr">
								<span
									id="type_text">跟团游</span>
								<i className="iconRight2"></i> 
							</span>
						</a>
					</li>
					<li>
						<a>
							<i
								className="iconCalendar"></i>
							游玩日期
							<span className="fr"> 
								<span id="dayText">2016-06-02  周四</span> 
								<i
									className="iconRight2"></i>
							</span>
						</a>
					</li>
					<li>
						<i className="iconPoints"></i>
						积分兑换
						<span className="fr cor999 mr10">本条线路支持积分兑换</span>
					</li>
				</ul>

				<div className="titGreen btBor mt10">
					<i className="ml"></i>
					行程安排
				</div>
				<ul className="twoCorList min bBor">
					<li><label>行程天数:</label>
						<div className="r">1天</div>
					</li>
				</ul>
				<a className="moreRight bBor j_conlist_an pl17">
					查看行程详情
					<i className="iconRight2 fr mr10"></i>
				</a>
				<div className="titGreen btBor mt10">
					<i className="ml"></i>
					预订须知
				</div>

				<div className="topIconTxt bBor">
					<div className="con" style={{maxHeight: "88px"}}></div>
					<div className="showMore j_showMore"><span>查看更多</span> <i className="iconDown"></i></div>
				</div>

				<div className="titGreen btBor mt10">
					<i className="ml"></i>
					温馨提示
				</div>
				<div className="topIconTxt bBor">
					<div className="con" style={{maxHeight: "88px"}}></div>
					<div className="showMore j_showMore"><span>查看更多</span> <i className="iconDown"></i></div>
				</div>
			</div>
	);
	}
	}

	export default Travel;



