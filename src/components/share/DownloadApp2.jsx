import React from 'react';

import {APK} from '../../constants/Config';
import {UserAvatar, GoodsCover} from '../base/FallbackImage.jsx';

require('./share.css');

class DownloadApp extends React.Component {
  SHOWS = [
    {
      name: '快破产了',
      avatar: 'http://7xov75.com2.z0.glb.qiniucdn.com/avatars/7295fe22-6d00-4f50-8abc-0412e1cbd0a9',
      content: '终于拿得一个手机，感谢一元购，以前有几个平台总是造假，希望保持真实透明公正的原则。',
      images: [
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15089487_-1376512807_1455962876680?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.14840183/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15089487_-1376512785_1455962877264?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.14840183/dissolve/50/gravity/Center|imageView2/2/w/200/h/200'
      ]
    },
    {
      name: '131****9010',
      avatar: 'http://7xov75.com2.z0.glb.qiniucdn.com/avatars/b4e85661becfcf52ad24da4a5e3f4535',
      content: '抽了好多次手机，终于中了一次。大过年的，太感动了。',
      images: [
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15016023_-977104273_1455509743531?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.11111111/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15016023_1550589764_1455509743952?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.11111111/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15016023_-61139087_1455509744341?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.11111111/dissolve/50/gravity/Center|imageView2/2/w/200/h/200'
      ]
    },
    {
      name: 'moon',
      avatar: 'http://7xov75.com2.z0.glb.qiniucdn.com/avatars/bcbc954e-51cd-4b59-87e1-9cc12ac6fc13',
      content: '谢谢一元购让我中了个三星，给我家老爷子了，老爷子还挺高兴的呢。希望这个活动继续下去祝一元购越来越好。',
      images: [
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15052395_786849538_1454639770509?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.11111111/dissolve/50/gravity/Center|imageView2/2/w/200/h/200'
      ]
    },
    {
      name: '古老机烧滴锅南',
      avatar: '',
      content: '虽然目前为止中不了苹果手机和电脑，中个电子书还是蛮让我感到安慰的。',
      images: [
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15053623_786849508_1454466044245?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.111034006/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15053623_786849507_1454466044679?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.2/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15053623_786849509_1454466044977?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.111034006/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15053623_786849510_1454466045358?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.2/dissolve/50/gravity/Center|imageView2/2/w/200/h/200'
      ]
    },
    {
      name: '最后50了，大哥！',
      avatar: 'http://7xov75.com2.z0.glb.qiniucdn.com/avatars/940cdad3-1ea0-4508-bdf7-a0bd48a90d3e',
      content: '没有中奖的兄弟们不要太羡慕我，看这块苹果表戴在个手上如何？嘿嘿嘿！',
      images: [
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15036270_786734312_1453195137146?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.2/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15036270_786734314_1453195137283?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.2/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15036270_786734313_1453195137409?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.2/dissolve/50/gravity/Center|imageView2/2/w/200/h/200'
      ]
    },
    {
      name: '最后一次输光走人',
      avatar: 'http://7xov75.com2.z0.glb.qiniucdn.com/avatars/8e01b606-23e4-456a-9e9d-de96a5c7f418',
      content: '太高兴了，6S刚到手没多久还热乎着呢！想要中苹果的东西真是不太容易啊。希望好运常来。',
      images: [
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15033804_786734284_1453096493139?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.11111111/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15033804_786734283_1453096493254?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.11111111/dissolve/50/gravity/Center|imageView2/2/w/200/h/200'
      ]
    },
    {
      name: '最后一元奉献了',
      avatar: '',
      content: '中了个MacBook，宝宝比我还高兴的样子，动不动就抱着它，非常感谢。',
      images: [
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15036605_786734310_1453176917420?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.11111111/dissolve/50/gravity/Center|imageView2/2/w/200/h/200'
      ]
    },
    {
      name: '新年好运气',
      avatar: '',
      content: '真的太感谢一元购让我中了一台笔记本电脑，我继续支持一元购，下次让我中个苹果6S',
      images: [
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15039927_-1377470930_1452181177051?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.2/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15039927_-1377470932_1452181177274?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.11111111/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
      ]
    },
    {
      name: '187****1191',
      avatar: '',
      content: '19块钱就抢到了一根金条，运气不错啊，哈哈哈哈哈，这金条赢的我神清气爽啊。感谢一元购，感谢送我金条的坑友们。',
      images: [
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15012299_1892929544_1451388478913?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.11241496/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15012299_1864300393_1451388478941?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.112474434/dissolve/50/gravity/Center|imageView2/2/w/200/h/200',
        'http://7xov75.com2.z0.glb.qiniucdn.com/show_15012299_1835671242_1451388478966?watermark/1/image/aHR0cDovLzd4b3Y3Ny5jb20yLnowLmdsYi5xaW5pdWNkbi5jb20vd2F0ZXJtYXJrLnBuZw==/ws/0.2/dissolve/50/gravity/Center|imageView2/2/w/200/h/200'
      ]
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      source: this.props.location.query.source || 'ofw',
      shows: this.SHOWS.slice(0, 3)
    };
  }
  handlePageScroll () {
    if (window.location.pathname != '/download') {
      return false;
    }
    if(document.body.scrollHeight - document.body.scrollTop - window.innerHeight <= 0) {
      this.setState({shows: this.SHOWS});
    }
  }
  componentWillMount () {
    this.handlePageScroll = this.handlePageScroll.bind(this);
  }
  componentDidMount () {
    document.addEventListener('scroll', this.handlePageScroll);
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.handlePageScroll);
  }
  _downloadApp () {
    var link = $('<a>').attr('href', APK.CHANNELS[this.state.source] || APK.CHANNELS['ofw']).attr('target', '_blank');
    link.appendTo('body').click();
    _hmt.push(['_trackEvent', 'DownloadPage', 'DownloadPageDownload'])
  }

  render() {
    var showItems = this.state.shows.map(function(item, index) {
      var images = item.images.map(function (url, i) {
        return (<GoodsCover src={url} cut={true} key={index * 10 + i}/>);
      });
      return (
        <li className="show-item" style={{padding: '0 1em'}} key={index}>
          <UserAvatar className="fl" src={item.avatar || require("../../img/default_avatar.png")} />
          <div className="infos">
            <span className="nickname">{item.name}</span>
            <p className="content">{item.content}</p>
            <div className="images mt5">{images}</div>
          </div>
        </li>
      )
    });

    return (
      <div className="download-app">
        <div className="header">
          <div className="inline-block">
            <img style={{width: '10em'}} src={require("../../img/share/download_logo.png")} />
          </div>
          <div className="inline-block fr mt5">
            <img style={{width: '7em'}}
                 src={require("../../img/share/download_red_btn.png")} onTouchTap={this._downloadApp.bind(this)} />
          </div>
        </div>
        <div style={{position: 'relative'}}>
          <img style={{width: '100%'}} src={require("../../img/share/download_banner.png")} />
          <div className="download-btn" onTouchTap={this._downloadApp.bind(this)}></div>
        </div>
        <div className="title">产品简介</div>
        <div className="product-desc">
          <p><span className="bold">一元购</span>指只需<span className="bold">1元</span>就有机会买到想要的商品。</p>
          <p>即每件商品被平分为<span className="bold">若干“等份”</span>出售，每份<span className="bold">1元</span>，每一等份随机对应一个号码，当所有等份售完时，根据开奖规则产生一个号码，拥有此号码的用户，即可获得该商品。</p>
        </div>

        <div className="title">用户晒单</div>
        <ul className="show-list">{showItems}</ul>
        <div className="gray" style={{textAlign: 'center', paddingBottom: '1em'}}>武汉卓翰网络科技有限公司 © 2016</div>
      </div>
    );
  }
}

export default DownloadApp;
