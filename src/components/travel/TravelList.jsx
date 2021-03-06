import React from 'react';
import TravelNav from './TravelNav';
import * as ContentAPI from './../../api/content';
import CustomLink from './../common/CustomLink.jsx';
import {KINDLISTNAME,ATTRIDNAME} from '../../constants/Config';

require('./travel.scss');

class TravelList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			routeList: [],
			kindlist: this.props.location.query.kindlist || "",
			attrid: this.props.location.query.attrid || ""
		};
	}

	componentWillMount() {
		var data = {
			isDesc: true
		};
		if (this.state.kindlist != "") {
			data.kindlist = this.state.kindlist
		}
		if (this.state.attrid != "") {
			data.attrid = this.state.attrid
		}
		ContentAPI.getAllRouteTj(data).then((res) => {
			this.setState({
				routeList: res
			});
		});
	}

	_lowToHigh() {
		var data = {
			orderprice: "desc"
		};
		ContentAPI.getAllRouteTj(data).then((res) => {
			this.setState({
				routeList: res
			});
		});
	}

	_highToLow() {
		var data = {
			orderprice: ""
		};
		ContentAPI.getAllRouteTj(data).then((res) => {
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
					<CustomLink to={"/travel/show/"+item.id}>
						<div className="contentPic">
							<img src={"http://www.668hw.com:8088"+item.litpic}/>
						</div>
						<div className="contentText">
							<p>{item.title}</p>
							<span className="contZl">{item.lineday}日游</span>
							<span className="contZl" style={{paddingLeft:"1em",paddingRight:"1em"}}></span>
							<div className="contentPrice"> ￥<font>{item.storeprice}</font>起</div>
						</div>
					</CustomLink>
				</li>
			);
		});

		return (
			<div className="tlp">
				{
					this.state.kindlist
						?
						<TravelNav name={"武汉"+KINDLISTNAME[this.state.kindlist]}/>
						:
						<TravelNav name={"武汉"+ATTRIDNAME[this.state.attrid]}/>
				}


				<div className="price">
					<ul>
						<li><a onClick={this._lowToHigh.bind(this)}>价格从低到高</a></li>
						<li><a onClick={this._highToLow.bind(this)}>价格从高到低</a></li>
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



