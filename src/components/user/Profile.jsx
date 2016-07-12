import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import TravelNav from './../../components/travel/TravelNav.jsx';
import CustomLink from '../base/CustomLink.jsx';
import * as ContentAPI from '../../api/content';
import LocalStorage from '../../utils/localStorage';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: {}
		};
	}

	componentWillMount() {
		var openid = LocalStorage.getItem("openid");
		ContentAPI.getUserInfo("","",openid).then((res) => {
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
					<div className="row" style={{padding:"0.857em"}}>
						<span className="black">微信头像</span>
						<img src="http://7xod1l.com1.z0.glb.clouddn.com/avatars/77f45674-e5f1-4dba-9d9c-0d727c1d7629" className="fr"  style={{width:"35px",height:"35px"}}/>
					</div>
					<div className="row" style={{padding:"0.857em"}}>
						<span className="black">微信昵称</span>
						<span className="fr">dfdf</span>
					</div>
					<div className="row" style={{padding:"0.857em"}}>
						<span className="black">姓名</span>
						<span className="fr">dfdf</span>
					</div>
					<div className="row" style={{padding:"0.857em"}}>
						<span className="black">性别</span>
						<span className="fr">dfdf</span>
					</div>
					<div className="row" style={{padding:"0.857em"}}>
						<span className="black">手机</span>
						<span className="fr">dfdf</span>
					</div>
					<div className="row" style={{padding:"0.857em"}}>
						<span className="black">邮箱</span>
						<span className="fr">dfdf</span>
					</div>
					<div className="row" style={{padding:"0.857em"}}>
						<span className="black">所在地</span>
						<span className="fr">dfdf</span>
					</div>
				</div>

			</div>
		);
	}
}

export default Profile;
