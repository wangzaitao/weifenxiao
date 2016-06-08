import React from 'react';
import TravelNav from './../travel/TravelNav';

require('./../travel/travel.scss');
require('./hotel.scss');

class Hotel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let props = this.props;

    return (
      <div className="tlp">
        <TravelNav name="酒店详情"/>
        <div className="lineTopImg">
          <a>
            <img src="http://jiudian.cncn.com/photo/15/14939_m.jpg"/>
          </a>
          <p>上海万和亚隆国际酒店</p>
        </div>

        <div className="lineTopTxt bBor">
          <money className="corRed">￥<span>176</span><em className="cor666">起</em></money>
          <not className="ml15">￥200</not>
          <span className="btn_a1">起价说明</span>
          <p className="cor666">
            <i className="iconGPS"></i>
            浦东新区崮山路688号(近羽山路)
						<span className="fr cor999 mr10">
							产品编号：836916
						</span>
          </p>
          <ul className="hotel_icon clearfix">
            <li><i></i>免费wifi</li>
            <li><i></i>健身房</li>
            <li><i></i>商务中心</li>
            <li><i></i>会议室</li>
          </ul>
        </div>
        <div className="lunboTxt cor999 f12"> *温馨提示：
          <div className="lunbo j_lunbo">
            <div className="not" style={{marginTop: "-33px"}}></div>
            <div style={{marginTop: "0px"}}> 请提前预约</div>
          </div>
        </div>
        <ul className="borBotList max btBor">
          <li>
            <i className="iconPoints"></i>
            联系电话
            <span className="fr cor999 mr10">027-61601111</span>
          </li>
        </ul>

        <div className="titGreen btBor mt10">
          <i className="ml"></i>
          酒店详情
        </div>
        <div className="topIconTxt bBor">
          <div className="con" style={{maxHeight: "88px"}}>
            上海万和亚隆国际酒店系万和控股集团旗下经营管理的一家高星级酒店，位于陆家嘴金融贸易区板块内，至亚洲最大的上海新国际博览中心仅需5分钟，上海世博园区10分钟、外滩20分钟。南京路步行街25分钟，酒店拥有408间精心布置的客房，会议中心设有11间30-190平米的会议室可满足不同层次客户的需求。酒店经营项目包括：万和轩中餐（由港厨主理以粤菜为主、湘、川、沪菜为辅）日式昆布锅及台湾炫铁板烧，健身、棋牌室等娱乐设施。
          </div>
          <div className="showMore j_showMore"><span>查看更多</span> <i className="iconDown"></i></div>
        </div>
      </div>
    );
  }
}

export default Hotel;



