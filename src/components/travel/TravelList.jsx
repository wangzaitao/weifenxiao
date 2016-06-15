import React from 'react';
import TravelNav from './TravelNav';
import * as ContentAPI from './../../api/content';

require('./travel.scss');

class TravelList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			routeList:[]
		};
	}

	componentWillMount() {
		ContentAPI.getAllRoute().then((res) => {
			this.setState({
				routeList: res
			});
		});
	}

	render() {
		let props = this.props;

		var routeListDom;
		routeListDom = this.state.routeList.map((item, index) => {
			return (
				<li>
					<a href="#">
						<div className="contentPic">
							<img src={"http://www.668lyzx.com"+item.litpic} />
						</div>
						<div className="contentText">
							<p>{item.title}</p>
							<div className="contZl">
								<em>跟团游</em> <em>本地游</em>
							</div>
							<span className="contZl">{item.lineday}天{item.linenight}晚</span>
							<span className="contZl" style={{paddingLeft:"1em",paddingRight:"1em"}}> | </span>
							<span className="contZl">往返：{item.transport}</span>
							<div className="contentPrice"> ￥<font>{item.storeprice}</font>起</div>
						</div>
					</a>
				</li>
			);
		});

		return (
			<div className="tlp">
				<TravelNav name="武汉周边游" />

				<div className="price">
					<ul>
						<li><a>价格从低到高</a></li>
						<li><a>价格从高到低</a></li>
					</ul>
				</div>

				<ul className="contentList clearfix">
					{routeListDom}
				</ul>

			</div>
		);
	}
}

export default TravelList;



