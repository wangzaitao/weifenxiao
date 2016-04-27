import React, {Component, PropTypes} from 'react';
import CustomLink from './CustomLink.jsx';

class Footer extends Component {
	render() {
		return (
			<footer className="m-footer clearfix">
				<ul className="clearfix">
					<li><a href="#" title="会员商城">会员商城</a></li>
					<li><a href="#" title="我要开店">我要开店</a></li>
					<li><a href="#" title="关于乐翻天">关于乐翻天</a></li>
					<li><a href="#" title="回到首页">回到首页</a></li>
					<li><a href="#" title="登录">登录</a></li>
					<li><a href="#" title="注册">注册</a></li>
					<li><a href="#" title="订单查询">订单查询</a></li>
					<li><a href="#" title="帮助中心">帮助中心</a></li>
				</ul>
				<p>乐翻天户外-最智慧的分销商城</p>
			</footer>
		);
	}
}

export default Footer;