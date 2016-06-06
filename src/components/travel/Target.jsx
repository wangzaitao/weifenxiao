import React from 'react';
import TravelNav from './TravelNav';

require('./travel.scss');

class Target extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let props = this.props;
		
		return (
			<div className="tlp">
				<TravelNav name="目的地"/>
				<div className="more-des-m m_4th">
					<p><a href="#">湖北</a>周边城市</p>
					<div className="m_more_des">
						<span className="on">
							<a href="#">武汉</a>
						</span>
						<span><a href="#">黄石</a></span>
						<span><a href="#">十堰</a></span>
						<span><a href="#">宜昌</a></span>
						<span><a href="#">襄阳</a></span>
						<span><a href="#">鄂州</a></span>
						<span><a href="#">荆门</a></span>
						<span><a href="#">孝感</a></span>
						<span><a href="#">荆州</a></span>
						<span><a href="#">黄冈</a></span>
						<span><a href="#">咸宁</a></span>
						<span><a href="#">随州</a></span>
						<span><a href="#">恩施</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>A</p>
					<div className="m_more_des">
						<span><a href="#">阿拉善</a></span>
						<span><a href="#">鞍山</a></span>
						<span><a href="#">安阳</a></span>
						<span><a href="#">阿坝</a></span>
						<span><a href="#">安康</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>B</p>
					<div className="m_more_des">
						<span><a href="#">北京</a></span>
						<span><a href="#">保定</a></span>
						<span><a href="#">包头</a></span>
						<span><a href="#">本溪</a></span>
						<span><a href="#">白山</a></span>
						<span><a href="#">蚌埠</a></span>
						<span><a href="#">毫州</a></span>
						<span><a href="#">滨州</a></span>
						<span><a href="#">北海</a></span>
						<span><a href="#">百色</a></span>
						<span><a href="#">巴中</a></span>
						<span><a href="#">保山</a></span>
						<span><a href="#">宝鸡</a></span>
						<span><a href="#">库尔勒</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>C</p>
					<div className="m_more_des">
						<span><a href="#">承德</a></span>
						<span><a href="#">沧州</a></span>
						<span><a href="#">长治</a></span>
						<span><a href="#">赤峰</a></span>
						<span><a href="#">朝阳</a></span>
						<span><a href="#">长春</a></span>
						<span><a href="#">常州</a></span>
						<span><a href="#">巢湖</a></span>
						<span><a href="#">池州</a></span>
						<span><a href="#">长沙</a></span>
						<span><a href="#">常德</a></span>
						<span><a href="#">郴州</a></span>
						<span><a href="#">重庆</a></span>
						<span><a href="#">成都</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>D</p>
					<div className="m_more_des">
						<span><a href="#">大同</a></span>
						<span><a href="#">大连</a></span>
						<span><a href="#">丹东</a></span>
						<span><a href="#">大庆</a></span>
						<span><a href="#">东营</a></span>
						<span><a href="#">德州</a></span>
						<span><a href="#">东莞</a></span>
						<span><a href="#">德阳</a></span>
						<span><a href="#">达州</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>E</p>
					<div className="m_more_des">
						<span><a href="#">恩施</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>F</p>
					<div className="m_more_des">
						<span><a href="#">抚顺</a></span>
						<span><a href="#">阜阳</a></span>
						<span><a href="#">福州</a></span>
						<span><a href="#">佛山</a></span>
						<span><a href="#">防城港</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>G</p>
					<div className="m_more_des">
						<span><a href="#">赣州</a></span>
						<span><a href="#">广州</a></span>
						<span><a href="#">桂林</a></span>
						<span><a href="#">广元</a></span>
						<span><a href="#">广安</a></span>
						<span><a href="#">贵阳</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>H</p>
					<div className="m_more_des">
						<span><a href="#">邯郸</a></span>
						<span><a href="#">衡水</a></span>
						<span><a href="#">呼和浩特</a></span>
						<span><a href="#">呼伦贝尔</a></span>
						<span><a href="#">兴安</a></span>
						<span><a href="#">葫芦岛</a></span>
						<span><a href="#">哈尔滨</a></span>
						<span><a href="#">黑河</a></span>
						<span><a href="#">淮安</a></span>
						<span><a href="#">杭州</a></span>
						<span><a href="#">湖州</a></span>
						<span><a href="#">合肥</a></span>
						<span><a href="#">淮南</a></span>
						<span><a href="#">淮北</a></span>
						<span><a href="#">黄山</a></span>
						<span><a href="#">菏泽</a></span>
						<span><a href="#">黄石</a></span>
						<span><a href="#">黄冈</a></span>
						<span><a href="#">衡阳</a></span>
						<span><a href="#">怀化</a></span>
						<span><a href="#">惠州</a></span>
						<span><a href="#">河源</a></span>
						<span><a href="#">贺州</a></span>
						<span><a href="#">海口</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>J</p>
					<div className="m_more_des">
						<span><a href="#">晋城</a></span>
						<span><a href="#">晋中</a></span>
						<span><a href="#">锦州</a></span>
						<span><a href="#">吉林</a></span>
						<span><a href="#">鸡西</a></span>
						<span><a href="#">佳木斯</a></span>
						<span><a href="#">泰州</a></span>
						<span><a href="#">嘉兴</a></span>
						<span><a href="#">金华</a></span>
						<span><a href="#">景德镇</a></span>
						<span><a href="#">九江</a></span>
						<span><a href="#">吉安</a></span>
						<span><a href="#">宜春</a></span>
						<span><a href="#">抚州</a></span>
						<span><a href="#">济南</a></span>
						<span><a href="#">济宁</a></span>
						<span><a href="#">焦作</a></span>
						<span><a href="#">荆门</a></span>
						<span><a href="#">嘉峪关</a></span>
						<span><a href="#">酒泉</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>K</p>
					<div className="m_more_des">
						<span><a href="#">开封</a></span>
						<span><a href="#">昆明</a></span>
						<span><a href="#">喀什</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>L</p>
					<div className="m_more_des">
						<span><a href="#">廊坊</a></span>
						<span><a href="#">临汾</a></span>
						<span><a href="#">吕梁</a></span>
						<span><a href="#">辽源</a></span>
						<span><a href="#">连云港</a></span>
						<span><a href="#">丽水</a></span>
						<span><a href="#">六安</a></span>
						<span><a href="#">龙岩</a></span>
						<span><a href="#">莱芜</a></span>
						<span><a href="#">临沂</a></span>
						<span><a href="#">聊城</a></span>
						<span><a href="#">洛阳</a></span>
						<span><a href="#">漯河</a></span>
						<span><a href="#">娄底</a></span>
						<span><a href="#">柳州</a></span>
						<span><a href="#">泸州</a></span>
						<span><a href="#">乐山</a></span>
						<span><a href="#">凉州</a></span>
						<span><a href="#">丽江</a></span>
						<span><a href="#">拉萨</a></span>
						<span><a href="#">兰州</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>M</p>
					<div className="m_more_des">
						<span><a href="#">牡丹江</a></span>
						<span><a href="#">绵阳</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>N</p>
					<div className="m_more_des">
						<span><a href="#">南京</a></span>
						<span><a href="#">南通</a></span>
						<span><a href="#">宁波</a></span>
						<span><a href="#">南平</a></span>
						<span><a href="#">宁德</a></span>
						<span><a href="#">南昌</a></span>
						<span><a href="#">南阳</a></span>
						<span><a href="#">南宁</a></span>
						<span><a href="#">南充</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>O</p>
					<div className="m_more_des">
						<span><a href="#">鄂尔多斯</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>P</p>
					<div className="m_more_des">
						<span><a href="#">莆田</a></span>
						<span><a href="#">萍乡</a></span>
						<span><a href="#">平顶山</a></span>
						<span><a href="#">濮阳</a></span>
						<span><a href="#">平凉</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>Q</p>
					<div className="m_more_des">
						<span><a href="#">秦皇岛</a></span>
						<span><a href="#">齐齐哈尔</a></span>
						<span><a href="#">泉州</a></span>
						<span><a href="#">青岛</a></span>
						<span><a href="#">清远</a></span>
						<span><a href="#">钦州</a></span>
						<span><a href="#">黔西南</a></span>
						<span><a href="#">黔东南</a></span>
						<span><a href="#">曲靖</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>R</p>
					<div className="m_more_des">
						<span><a href="#">日照</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>S</p>
					<div className="m_more_des">
						<span><a href="#">石家庄</a></span>
						<span><a href="#">沈阳</a></span>
						<span><a href="#">四平</a></span>
						<span><a href="#">上海</a></span>
						<span><a href="#">苏州</a></span>
						<span><a href="#">宿迁</a></span>
						<span><a href="#">绍兴</a></span>
						<span><a href="#">三明</a></span>
						<span><a href="#">上饶</a></span>
						<span><a href="#">三门峡</a></span>
						<span><a href="#">十堰</a></span>
						<span><a href="#">随州</a></span>
						<span><a href="#">神农架</a></span>
						<span><a href="#">邵阳</a></span>
						<span><a href="#">韶关</a></span>
						<span><a href="#">深圳</a></span>
						<span><a href="#">汕头</a></span>
						<span><a href="#">汕尾</a></span>
						<span><a href="#">三亚</a></span>
						<span><a href="#">遂宁</a></span>
						<span><a href="#">榆林</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>T</p>
					<div className="m_more_des">
						<span><a href="#">天津</a></span>
						<span><a href="#">唐山</a></span>
						<span><a href="#">太原</a></span>
						<span><a href="#">通辽</a></span>
						<span><a href="#">台州</a></span>
						<span><a href="#">泰安</a></span>
						<span><a href="#">铜仁</a></span>
						<span><a href="#">天水</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>U</p>
					<div className="m_more_des">
						<span><a href="#">乌兰察布</a></span>
						<span><a href="#">乌鲁木齐</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>W</p>
					<div className="m_more_des">
						<span><a href="#">乌海</a></span>
						<span><a href="#">无锡</a></span>
						<span><a href="#">温州</a></span>
						<span><a href="#">羌湖</a></span>
						<span><a href="#">潍坊</a></span>
						<span><a href="#">威海</a></span>
						<span><a href="#">武汉</a></span>
						<span><a href="#">梧州</a></span>
						<span><a href="#">渭南</a></span>
						<span><a href="#">武威</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>X</p>
					<div className="m_more_des">
						<span><a href="#">邢台</a></span>
						<span><a href="#">忻州</a></span>
						<span><a href="#">锡林郭勒</a></span>
						<span><a href="#">徐州</a></span>
						<span><a href="#">宣城</a></span>
						<span><a href="#">厦门</a></span>
						<span><a href="#">新乡</a></span>
						<span><a href="#">信阳</a></span>
						<span><a href="#">襄阳</a></span>
						<span><a href="#">孝感</a></span>
						<span><a href="#">咸宁</a></span>
						<span><a href="#">湘潭</a></span>
						<span><a href="#">西双版纳</a></span>
						<span><a href="#">西安</a></span>
						<span><a href="#">咸阳</a></span>
						<span><a href="#">西宁</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>Y</p>
					<div className="m_more_des">
						<span><a href="#">阳泉</a></span>
						<span><a href="#">运程</a></span>
						<span><a href="#">营口</a></span>
						<span><a href="#">延边</a></span>
						<span><a href="#">伊春</a></span>
						<span><a href="#">盐城</a></span>
						<span><a href="#">扬州</a></span>
						<span><a href="#">烟台</a></span>
						<span><a href="#">异常</a></span>
						<span><a href="#">岳阳</a></span>
						<span><a href="#">永州</a></span>
						<span><a href="#">阳江</a></span>
						<span><a href="#">宜宾</a></span>
						<span><a href="#">延安</a></span>
						<span><a href="#">银川</a></span>
					</div>
				</div>

				<div className="more-des-m m_4th">
					<p>Z</p>
					<div className="m_more_des">
						<span><a href="#">张家口</a></span>
						<span><a href="#">镇江</a></span>
						<span><a href="#">舟山</a></span>
						<span><a href="#">漳州</a></span>
						<span><a href="#">淄博</a></span>
						<span><a href="#">枣庄</a></span>
						<span><a href="#">郑州</a></span>
						<span><a href="#">驻马店</a></span>
						<span><a href="#">株洲</a></span>
						<span><a href="#">张家界</a></span>
						<span><a href="#">珠海</a></span>
						<span><a href="#">湛江</a></span>
						<span><a href="#">肇庆</a></span>
						<span><a href="#">中山</a></span>
						<span><a href="#">自贡</a></span>
						<span><a href="#">遵义</a></span>
						<span><a href="#">张掖</a></span>
						<span><a href="#">中卫</a></span>
					</div>
				</div>
			</div>
		);
	}
}

export default Target;



