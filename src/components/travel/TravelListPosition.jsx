import React from 'react';

require('./travelListPosition.scss');
class TavelNav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="m-header clearfix">
				<div className="child flex1">
					<a className="city"></a>
				</div>
				<div className="child title">
					武汉周边游
				</div>
				<div className="child m-user">
					<a href="#" className="tool">
						<i></i>
						<i></i>
						<i></i>
					</a>
				</div>
			</div>
		);
	}
}


class TravelListPosition extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let props = this.props;

		return (
			<div className="tlp">
				<TavelNav />

				<div className="price">
					<ul>
						<li><a>价格从低到高</a></li>
						<li><a>价格从高到低</a></li>
					</ul>
				</div>

				<ul className="contentList clearfix">
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/039/602/adda_m.jpg"/>
							</div>
							<div className="contentText">
								<p>武汉市内精华一日游</p>
								<div className="contZl">
									<em>跟团游</em> <em>本地游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>186</font>起</div>
							</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/037/137/f3aa_m.jpg"/>
							</div>
							<div className="contentText">
								<p>樱花团 纯玩武汉市内精品一日游（黄鹤楼红楼东湖 免费接）</p>
								<div className="contZl">
									<em>跟团游</em> <em>本地游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>150</font>起</div>
							</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/038/178/ddc2_m.jpg"/>
							</div>
							<div className="contentText">
								<p>【销量第一】武汉市内一日游-二环免费上门接</p>
								<div className="contZl">
									<em>跟团游</em> <em>本地游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>60</font>起</div>
							</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/039/734/174a_m.jpg"/>
							</div>
							<div className="contentText">
								<p>一日游推荐：木兰天池/草原/清凉寨/胜天农庄/大余湾一日游</p>
								<div className="contZl">
									<em>跟团游</em> <em>周边游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>60</font>起</div>
							</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/037/137/f3aa_m.jpg"/>
							</div>
							<div className="contentText">
								<p>武汉导游服务 武汉导游武汉市内一日游景点讲解 含黄鹤楼讲解</p>
								<div className="contZl">
									<em>跟团游</em> <em>本地游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>300</font>起</div>
							</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/039/602/adda_m.jpg"/>
							</div>
							<div className="contentText">
								<p>武汉市内精华一日游</p>
								<div className="contZl">
									<em>跟团游</em> <em>本地游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>186</font>起</div>
							</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/037/137/f3aa_m.jpg"/>
							</div>
							<div className="contentText">
								<p>樱花团 纯玩武汉市内精品一日游（黄鹤楼红楼东湖 免费接）</p>
								<div className="contZl">
									<em>跟团游</em> <em>本地游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>150</font>起</div>
							</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/038/178/ddc2_m.jpg"/>
							</div>
							<div className="contentText">
								<p>【销量第一】武汉市内一日游-二环免费上门接</p>
								<div className="contZl">
									<em>跟团游</em> <em>本地游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>60</font>起</div>
							</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/039/734/174a_m.jpg"/>
							</div>
							<div className="contentText">
								<p>一日游推荐：木兰天池/草原/清凉寨/胜天农庄/大余湾一日游</p>
								<div className="contZl">
									<em>跟团游</em> <em>周边游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>60</font>起</div>
							</div>
						</a>
					</li>
					<li>
						<a href="#">
							<div className="contentPic">
								<img src="http://c.cncnimg.cn/037/137/f3aa_m.jpg"/>
							</div>
							<div className="contentText">
								<p>武汉导游服务 武汉导游武汉市内一日游景点讲解 含黄鹤楼讲解</p>
								<div className="contZl">
									<em>跟团游</em> <em>本地游</em></div>
								<span>1日游</span>
								<div className="contentPrice"> ￥<font>300</font>起</div>
							</div>
						</a>
					</li>
				</ul>

			</div>
		);
	}
}

export default TravelListPosition;



