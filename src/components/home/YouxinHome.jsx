import React from 'react';

import Slider from 'react-slick';

import * as ContentAPI from '../../api/content';
import * as GlobalConfig from '../../constants/Config';
import {APK} from '../../constants/Config';
import CustomLink from '../base/CustomLink.jsx';
import Auth from '../../api/auth';
import {addCookie, getCookie} from '../../utils/common';

const HOT_ACTIVITIES = [
  {
    id: '95dc1fac-ab3b-3971-808b-321981ca502f',
    gid: 123,
    name: 'MacBook Air 13.3英寸笔记本电脑 128G 银色',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1aao3mpc51lf518q7c4hat317r69.jpg'
  },
  {
    id: 'a6622963-d568-3a0e-9e37-d8855683d44e',
    gid: 206,
    name: 'Apple iPhone 6s 128G 玫瑰金色 移动联通电信4G手机',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1aao2uvia10ic1s7h19hoocggj89.jpg'
  },
  {
    id: '82135dec-4ea2-328d-b349-ef570e43d589',
    gid: 221,
    name: 'Apple iPad mini 4 7.9英寸平板电脑 64G WLAN版 颜色随机',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1aao2tbst1uh815o4o4aad512bp9.jpg'
  },
  {
    id: '08ff4be2-300f-34c0-89d6-1e54b720ae98',
    gid: 127,
    name: '中国黄金 万足金Au9999薄片投资金条20g',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1aao5cvuemil1oe91vpselj1k919.jpg'
  },
  {
    id: '7c386a67-4a5a-3709-b533-11196c9112fa',
    gid: 132,
    name: '三星 Galaxy S6 32G 移动联通电信4G手机 双卡双待 颜色随机',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1aao4qmvr11p13tr8p391g6c19.jpg'
  },
  {
    id: '8634bc4b-1eb6-3225-8b6e-fb9ec04aadfc',
    gid: 143,
    name: '戴尔（DELL）Ins15M- 7528S 灵越15.6英寸质感笔记本电脑',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1aao42gbsum0l34vvj1cms1l7m9.jpg'
  },
  {
    id: 'fdba97eb-85b6-31ad-98a5-364e7ec5ee77',
    gid: 185,
    name: 'Apple Watch Sport 智能手表(42毫米 金属表壳搭配运动型表带 颜色随机）',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1aao30hmlhb2flk199r1il2mic9.jpg'
  },
  {
    id: '646ed286-c5db-325c-9c52-0f9ef560ab48',
    gid: 204,
    name: '美国艾罗伯特（iRobot）智能扫地机器人 Roomba飓风 吸尘器',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1aao4mlp9bge3n610s41gg7csul.jpg'
  },
  {
    id: '00be60a8-441c-308e-9679-87f313346ca6',
    gid: 280,
    name: 'CK卡文克莱（Calvin Klein）瑞士石英手表CITY系列情侣对表',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1adaego9e1s871m7d2assg38p9.jpg'
  },
  {
    id: 'b8c4a377-5821-39b9-90ad-02511afc5587',
    gid: 205,
    name: '索尼（SONY）【PS4国行主机】PlayStation 4 星际战甲套装 新型号CUH-1209A',
    cover: 'http://7xov77.com2.z0.glb.qiniucdn.com/o_1aao50k4eeub1eecl4810ci1ij69.jpg'
  }
];

class YouxinHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
      scrollingList: []
    };
    // channel logic.
    var chn = this.props.location.query.chn || '', versionCode = this.props.location.query.version_code;
    if (chn && chn !== G.chn) {
      G.chn = chn;
      addCookie('chn', chn, 30);
    }
    if (versionCode && versionCode !== G.versionCode) {
      G.versionCode = versionCode;
      addCookie('vc', versionCode, 30);
    }

    if (chn === GlobalConfig.CHANNELS.YOUXIN && !G.token) {
      // auto login or redirect register for uxin channel.
      var ts = this.props.location.query.ts,
          uid = this.props.location.query.uid,
          pnum = this.props.location.query.pnum;
      if (pnum) {
        Auth.uxinLogin(pnum, ts, uid, function (success, data) {
          if (success) {
            if (data.first_login){
              this.setState({showRewardTip: true});
              document.body.style.overflowY = 'hidden';
              document.body.style.position = 'fixed';
              document.body.style.perspective = '1000px';
            }
          } else if (data == 401) {  // old user, redirect login
            window.location.href = '/login';
          } else {
            console.log('UXIN Login failed，msg: ' + data)
          }
        }.bind(this));
      } else {  // has no phone, redirect register
        window.location.href = '/register';
      }
    }
  }

  componentWillMount(){
    this._loadTotalCount();
    this._loadScrolling();
  }

  render(){
    var hotDom, winnerDom;

    hotDom = HOT_ACTIVITIES.map(function(item) {
      return (
        <div key={item.id} className="y-h-hot-item-wrap">
          <CustomLink className="y-h-hot-item" to={'/activity_latest/' + item.gid} >
            <img src={item.cover} />
            <div className="y-h-hot-item-name">{item.name}</div>
          </CustomLink>
        </div>
      );
    });

    winnerDom = this.state.scrollingList.map((item, index) =>{
      return (
        <div key={index} className="scroll-item txt-one-line">
          <span className="scroll-item-text" dangerouslySetInnerHTML={{__html: item.text}}/>
        </div>
      );
    });

    return (
      <div className="m-body youxin-home" style={{backgroundColor: '#6d13a0'}}>
        <img className="y-h-img" src={require('../../img/youxin_home/yx_banner.jpg')} />
        <div className="y-h-main">
          <div className="go-home-wrap">
            <span className="go-home-btn-from-yx-home" onTouchTap={this._goHome}/>
          </div>
          <div className="y-h-winner-tip">
            已有<span className="y-h-winner-count">{this.state.totalCount}</span>人幸运中奖
          </div>
          <div className="y-h-winner-info">
            <i className="ico y-h-carousel-icon" />
            <Slider className="y-h-winner-carousel" infinite={true} autoplay={true} autoplaySpeed={5000} >
              {winnerDom}
            </Slider>
          </div>
          <div className="y-h-hot-wrap">
            <img className="y-h-hot-img" src={require('../../img/youxin_home/yx_hot_title.png')} />
            <div className="y-h-hot-main">{hotDom}</div>
          </div>
        </div>
        <div className="y-h-footer">
          <div>版权所有：武汉卓翰网络科技有限公司</div>
          <div>
            <span className="y-h-f-item left">ICP证鄂B2-20160027</span>
            <span className="y-h-f-item">网络文化经营许可证：鄂网文[2016]0719-006号</span>
          </div>
        </div>
      </div>
    );
  }

  _loadTotalCount() {
    ContentAPI.getAnnouncedList({page: 1}, function (data, total){
      this.setState({
        totalCount: total
      });
    }.bind(this));
  }

  _loadScrolling() {
    ContentAPI.getScrolling()
      .then((res) => {
        this.setState({
          scrollingList: res
        });
      });
  }

  _goHome(e) {
    var link = $('<a>').attr('href', APK.CHANNELS['ofw']).attr('target', '_blank');
    link.appendTo('body').click();
  }
}

export default YouxinHome;
