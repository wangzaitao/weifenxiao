import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import TravelNav from './../../components/travel/TravelNav.jsx';
import CustomLink from '../base/CustomLink.jsx';
import * as ContentAPI from '../../api/content';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: {}
		};
	}

	componentWillMount() {
		ContentAPI.getUserInfo(1,"","").then((res) => {
			this.setState({
				userInfo : res
			});
		});
	}

	componentDidMount() {
		$("#content-container").addClass("bgc-white");
		$("#content-container").css("height", "100%");
		$("#content-container").find(".right-icon").html("保存").css({"color": "#fff", "font-size": "1.143em"});
	}

	render() {
		var userInfo = this.state.userInfo;
		return (
			<div className="my-address my-address-add">
				<div className="tlp">
					<TravelNav name="个人信息"/>
					<div className="row">
						{userInfo.wxnickname}
					</div>

				</div>

			</div>
		);
	}
}

export default Profile;
