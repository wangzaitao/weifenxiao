import React from 'react';
import Banner from './Banner.jsx';

require('./home.scss');

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let props = this.props;

		return (
			<div className="home">
				<Banner />
				<section className="travel_type">
					<ul className="clearfix">
						<li>
							<a href="#" name="出境游">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/1A/07/Cii9EFbaR4SIRJh3AAAeDXASbNsAACfSAOvR94AAB4l91_w350_h0_c0_t0.jpeg"/>
							</a>
						</li>
						<li>
							<a href="#" name="国内游"> <img
								src="http://m.tuniucdn.com/fb2/t1/G1/M00/1A/07/Cii9EFbaR4iIKbptAAAgHchF8X0AACfSAO8qaMAACA160_w350_h0_c0_t0.jpeg"/>
							</a>
						</li>
						<li>
							<a href="#" name="周边游"> <img
								src="http://m.tuniucdn.com/fb2/t1/G1/M00/1A/07/Cii9EVbaR4yIfwunAAAe7eNZOWgAACfSAO8ydgAAB8F50_w350_h0_c0_t0.jpeg"/>
							</a>
						</li>
					</ul>
				</section>
				<section className="product_type clearfix">
					<ul className="clearfix">
						<li>
							<a href="#" name="跟团游">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/48/5D/Cii9EVb4i4OIc4ReAAATHBnf8NgAACzTwP_6xcAABM0977_w120_h120_c1_t0.png"/></span>
								<span className="word">跟团游</span>
							</a>
						</li>
						<li>
							<a href="#" name="自助游">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/3E/AA/Cii9EVb4i6-ISeVPAAAQYfJZ3UIAACv0gP_74AAABCA655_w120_h120_c1_t0.png"/></span>
								<span className="word">自助游</span>
							</a>
						</li>
						<li>
							<a href="#" name="自驾游">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/47/D8/Cii9EVb4i8qIEZzGAAAR6CBHCXEAACzIgP_7U8AABKx362_w120_h120_c1_t0.png"/></span>
								<span className="word">自驾游</span>
							</a>
						</li>
						<li>
							<a href="#" name="自由行">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/48/6F/Cii9EFb4i7uIfDE6AAAUTqIQr0oAACzVQP_3HsAABRm404_w120_h120_c1_t0.png"/></span>
								<span className="word">自由行</span>
							</a>
						</li>
						<li>
							<a href="#" name="目的地">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/48/75/Cii9EFb4jOKIAMDsAAARy0GDPtYAACzWAP_7TkAABLH009_w120_h120_c1_t0.png"/></span>
								<span className="word">目的地</span>
							</a>
						</li>
						<li>
							<a href="#" name="农博会">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/48/7B/Cii9EFb4jb6IcMqOAAATr4ca2MwAACzWgBQsKIAABPH611_w120_h120_c1_t0.png"/></span>
								<span className="word">农博会</span>
							</a>
						</li>
						<li>
							<a href="#" name="全球购">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/48/73/Cii9EVb4i9-IBq1DAAAWxQ3NML0AACzVwP_lAYAABbd572_w120_h120_c1_t0.png"/></span>
								<span className="word">全球购</span>
							</a>
						</li>
						<li>
							<a href="#" name="女人帮">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/48/79/Cii9EVb4jXKIdChyAAAR7gLVExwAACzWQNlJs0AABIG172_w120_h120_c1_t0.png"/></span>
								<span className="word">女人帮</span>
							</a>
						</li>
						<li>
							<a href="#" name="养生苑">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/68/2F/Cii9EFcLBy2ID6WtAAAaDbJZBSsAADFTwCJVdMAABol383_w120_h120_c1_t0.png"/></span>
								<span className="word">养生苑</span>
							</a>
						</li>
						<li>
							<a href="#" name="微户外">
							<span className="btn_icon">
								<img
									src="http://m.tuniucdn.com/fb2/t1/G1/M00/48/79/Cii9EVb4jMqILL1MAAAVhNiEmF0AACzWQB4vGIAABWc662_w120_h120_c1_t0.png"/></span>
								<span className="word">微户外</span>
							</a>
						</li>
					</ul>
				</section>

				<section className="content">
					<ul className="contentType">
						<li className="on">本期热推</li>
						<li>特价促销</li>
						<li>一元云购</li>
						<li>微微社区</li>
					</ul>
					<ul className="contentList clearfix">
						<li>
							<a href="#">
								<div className="contentPic">
									<img src="http://c.cncnimg.cn/039/602/adda_m.jpg" />
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
									<img src="http://c.cncnimg.cn/037/137/f3aa_m.jpg" />
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
									<img src="http://c.cncnimg.cn/038/178/ddc2_m.jpg" />
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
									<img src="http://c.cncnimg.cn/039/734/174a_m.jpg" />
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
									<img src="http://c.cncnimg.cn/037/137/f3aa_m.jpg" />
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
				</section>
			</div>
		);
	}
}

export default Home;



