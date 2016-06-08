import React from 'react';
import TravelNav from './../travel/TravelNav';

require('./../travel/travel.scss');
require('./sight.scss');

class Hotel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;

    return (
      <div className="tlp">
        <TravelNav name="景点详情"/>
        <div className="lineTopImg">
          <a>
            <img src="http://c.cncnimg.cn/042/342/8339_m.jpg"/>
          </a>
          <p>海洋水族馆</p>
        </div>

        <div className="lineTopTxt bBor">
          <money className="corRed">￥<span>176</span><em className="cor666">起</em></money>
          <not className="ml15">￥200</not>
          <span className="btn_a1">起价说明</span>
          <p className="cor666">
            <i className="iconGPS"></i>
            上海市浦东新区陆家嘴环路1388号
						<span className="fr cor999 mr10">
							产品编号：836916
						</span>
          </p>
        </div>
        <div className="lunboTxt cor999 f12"> *温馨提示：
          <div className="lunbo j_lunbo">
            <div className="not" style={{marginTop: "-33px"}}></div>
            <div style={{marginTop: "0px"}}></div>
          </div>
        </div>
        <ul className="borBotList max btBor">
          <li>
            <i className="iconPoints"></i>
            开放时间
            <span className="fr cor999 mr10">9:00-17:30（黄金周和夏季延长至20:30）</span>
          </li>
        </ul>

        <div className="titGreen btBor mt10">
          <i className="ml"></i>
          门票信息
        </div>
        <div className="topIconTxt bBor">
          <div className="con" style={{maxHeight: "88px"}}>
            成人票 160元 身高1.4米以上有独立参观能力的成年人
            儿童票(身高1.0-1.4米) 110元 儿童不得单独入馆参观，需由成人陪同
            老人票(70岁以上) 90元 购票和入馆时需出示相关证件
            现役军人、离休干部 70元 购票和入馆时需出示相关证件
            残疾人 70元 购票和入馆时需出示相关证件
          </div>
          <div className="showMore j_showMore"><span>查看更多</span> <i className="iconDown"></i></div>
        </div>

        <div className="titGreen btBor mt10">
          <i className="ml"></i>
          景点资料
        </div>
        <div className="topIconTxt bBor">
          <div className="con" style={{maxHeight: "88px"}}>
            位于繁华的上海浦东陆家嘴金融区，紧邻东方明珠 塔。是上海最大、最具吸引力、以展示水世界生物、生态为主题的 旅游景点。也是世界最大的人造海水水族馆之一。 上海海洋水族馆的股东包括新加坡星雅集团和中
            国保利集团。投资总额5000万美元。2002年2月上海海洋水族馆对公众开放后，每年平均接待来自世界各地的游客超过100万人次。被授予国家及上海市“科普教育基地”称号。2003年，上海海洋水族馆击败国际上其它对手，为中国第一次夺得2008年“第七？墓？际水族馆大会”主办权。
            上海海洋水族馆拥有独特的外观，主辅楼两幢建筑呈大小金字塔型。建筑面积20500平方米，其中，展示区12，000平方米，特色礼品店500平方米，另设有可容纳300人的水族餐厅。
            上海海洋水族馆是目前世界上唯一一个设有中国展区，并对长江流域水生物、生态进行主题展示的水族馆。从“长江”出发，经过亚马逊丛林，来到南美洲区“电鳗”池畔，与澳洲“锯鳐、射水鱼”隔水相望，在缤纷的东南亚区流连，与南极洲的企鹅一起领略寒冬，尽情欣赏镇馆之宝---叶海龙的风姿，惊叹“水母”的曼妙身影，穿越呈现包括惊险的“鲨鱼海湾”在内4种不同海洋风情、长155米、也是目前世界上最长的海底隧道……在新奇独特、风光各异、美轮美奂、自然欢快的海底世界，在300多种，超过10000条鱼儿的簇拥下，上海海洋水族馆引领每一位游客穿越五大洲四大洋，经历一次终生难忘的“海洋之旅”。
          </div>
          <div className="showMore j_showMore"><span>查看更多</span> <i className="iconDown"></i></div>
        </div>
      </div>
    );
  }
}

export default Hotel;



