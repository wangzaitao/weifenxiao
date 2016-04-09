import React from 'react';

import {APK} from '../../constants/Config';
import {UserAvatar, GoodsCover} from '../base/FallbackImage.jsx';

require('./luckyturntable.css');

const WINNERS = [
  {nickname: 'lovexinxin', goods: '一元买相机 EOS单反套机'},
  {nickname: 'mokamoka', goods: '一元买电脑 Macbook Air'},
  {nickname: '求求卡西欧', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '让我一个人静静', goods: '一元买相机 EOS单反套机'},
  {nickname: '一元购来一个', goods: '一元买电脑 Macbook Air'},
  {nickname: '身边全是中奖的', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '什么样的名字能中苹果', goods: '一元买相机 EOS单反套机'},
  {nickname: '苹果专卖', goods: '一元买电脑 Macbook Air'},
  {nickname: '吾梦夺宝', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '最后一把求中', goods: '一元买相机 EOS单反套机'},
  {nickname: '丁春秋', goods: '一元买电脑 Macbook Air'},
  {nickname: '139****2375', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '都是运气惹的祸', goods: '一元买相机 EOS单反套机'},
  {nickname: '老公我爱你', goods: '一元买电脑 Macbook Air'},
  {nickname: 'leoy', goods: '一元买相机 EOS单反套机'},
  {nickname: 'wangtie', goods: '一元买电脑 Macbook Air'},
  {nickname: '让我中一次吧', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '不中就卸啊啊啊啊', goods: '一元买相机 EOS单反套机'},
  {nickname: '186****0535', goods: '一元买电脑 Macbook Air'},
  {nickname: '983675122qqcom', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '木易', goods: '一元买相机 EOS单反套机'},
  {nickname: '152****5210', goods: '一元买电脑 Macbook Air'},
  {nickname: '水照影', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '继续中中中', goods: '一元买相机 EOS单反套机'},
  {nickname: '南风过境', goods: '一元买电脑 Macbook Air'},
  {nickname: '鸿发机械', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '招财金蟾助我中奖', goods: '一元买相机 EOS单反套机'},
  {nickname: '大奖飞奔而来', goods: '一元买电脑 Macbook Air'},
  {nickname: '唯有长江水无语东流', goods: '一元买相机 EOS单反套机'},
  {nickname: '183****0646', goods: '一元买电脑 Macbook Air'},
  {nickname: '保佑我中大奖', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '高勒策划', goods: '一元买相机 EOS单反套机'},
  {nickname: 'fzlan45291', goods: '一元买电脑 Macbook Air'},
  {nickname: 'ling1950', goods: '一元买手机 苹果Iphone6S'},
  {nickname: 'ywf6312', goods: '一元买相机 EOS单反套机'},
  {nickname: '189****9363', goods: '一元买电脑 Macbook Air'},
  {nickname: 'Angelia、', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '神啊给点惊喜吧', goods: '一元买相机 EOS单反套机'},
  {nickname: '默mo无语', goods: '一元买电脑 Macbook Air'},
  {nickname: '白沟雨辰哥', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '倚天剑一出所向无敌', goods: '一元买相机 EOS单反套机'},
  {nickname: '唫普嗵', goods: '一元买电脑 Macbook Air'},
  {nickname: '名字N个请中一次', goods: '一元买相机 EOS单反套机'},
  {nickname: 'SunJane', goods: '一元买电脑 Macbook Air'},
  {nickname: '春发边', goods: '一元买手机 苹果Iphone6S'},
  {nickname: '灰阳阳', goods: '一元买相机 EOS单反套机'},
  {nickname: '家有儿女', goods: '一元买电脑 Macbook Air'},
  {nickname: '焦喜桥', goods: '一元买手机 苹果Iphone6S'},
  {nickname: 'a314795***', goods: '一元买相机 EOS单反套机'},
  {nickname: '宝贝给我运气', goods: '一元买电脑 Macbook Air'}
];

class LuckyTurntable extends React.Component {
  static isRotate = !1;
  constructor(props) {
    super(props);
    this.state = {
      showRuleDialog: false,
      showWinDialog: false,
      winDialogText: '',
      rotateDeg: 0,
      shows: [1, 2, 3]
    };
  }
  _trackDownload () {
    var link = $('<a>').attr('href', APK.CHANNELS[this.props.location.query.source || 'ofw'] || APK.CHANNELS['ofw']).attr('target', '_blank');
    link.appendTo('body').click();
    this.setState({showWinDialog: false});
    _hmt.push(['_trackEvent', 'LuckyTurntablePage', 'LuckyTurntableDownload']);
  }
  _rotateWheel (angle, awards) {
    LuckyTurntable.isRotate = !0;
    angle += (this.state.rotateDeg + 4 * 360 - this.state.rotateDeg % 360);
    $('.lt-wrapper .goods img').animate({
      rotate: angle + 'deg'
    }, 2000, 'ease-in-out', function () {
      LuckyTurntable.isRotate = !1;
      this.setState({showWinDialog: true, winDialogText: awards, rotateDeg: angle})
    }.bind(this));
  }
  _clickLuckyTurntable () {
    if (LuckyTurntable.isRotate) return;

    _hmt.push(['_trackEvent', 'LuckyTurntablePage', 'LuckyTurntableClicked']);
    var idx = Math.floor(Math.random() * 3) + 1;
    switch (idx) {
      case 0:
        this._rotateWheel([60, 180, 300][Math.floor(Math.random() * 3)], '谢谢参与');
        break;
      case 1:
        this._rotateWheel(0, '一元买手机 苹果Iphone6S');
        break;
      case 2:
        this._rotateWheel(120, '一元买相机 EOS单反套机');
        break;
      case 3:
        this._rotateWheel(240, '一元买电脑 Macbook Air');
        break;
    }
  }
  _showRuleDialog () {
    this.setState({showRuleDialog: true})
  }
  _hideRuleDialog () {
    this.setState({showRuleDialog: false})
  }
  _hideWinDialog () {
    this.setState({showWinDialog: false})
  }
  componentDidMount () {
    $('.lt-wrapper .goods img').css('margin-top', '-' + Math.ceil($(document).width() * 0.78 / 2) +  'px');
    this.winnerInterval = setInterval(this._scrollWinners.bind(this), 80);
    this.showInterval = setInterval(this._scrollUserShows.bind(this), 5000);
  }
  componentWillUnmount () {
    clearInterval(this.showInterval);
    clearInterval(this.winnerInterval);
  }
  _scrollWinners () {
    var winnerList = $('.winners-list'), first = $('.winners-list .first'),
        second = $('.winners-list .second');
    if(second.offset().height - winnerList.scrollTop() <= 0) {
      winnerList.scrollTop(winnerList.scrollTop() - first.offset().height)
    } else {
      winnerList.scrollTop(winnerList.scrollTop() + 1)
    }
  }
  _scrollUserShows () {
    if (this.state.shows[0] == 1) {
      this.setState({shows: [2, 3, 4]})
    } else if (this.state.shows[0] == 2) {
      this.setState({shows: [3, 4, 1]})
    } else if (this.state.shows[0] == 3) {
      this.setState({shows: [4, 1, 2]})
    } else if (this.state.shows[0] == 4) {
      this.setState({shows: [1, 2, 3]})
    }
  }

  render() {
    var winners, shows;
    winners = WINNERS.map(function(item, index) {
      return (
        <li key={index}>
          <p>恭喜 <span className="nickname">{item.nickname}</span> 获得 {item.goods}</p>
        </li>
      )
    });
    shows = this.state.shows.map(function (item) {
      return (
        <li key={item}>
          <div><img src={require('../../img/share/luckyturntable/show_' + item + '.png')}/></div>
        </li>
      )
    });

    return (
      <div className="lucky-turntable">
        <div className="lt-wrapper">
          <div className="banner"><img src={require('../../img/share/luckyturntable/banner.png')}/></div>
          <div className="goods"><img src={require('../../img/share/luckyturntable/turntable_goods.png')}/></div>
          <div className="start" onTouchTap={this._clickLuckyTurntable.bind(this)}><img src={require('../../img/share/luckyturntable/btn_click.png')}/></div>
          <a className="rules-link" href="javascript:;" onTouchTap={this._showRuleDialog.bind(this)}>查看活动规则</a>
        </div>
        <div className="winners-wrapper">
          <div className="winners-list">
            <ul className="first">{winners}</ul>
            <ul className="second">{winners}</ul>
          </div>
        </div>
        <div className="shows-wrapper">
          <div className="shows-title"><img src={require('../../img/share/luckyturntable/show_title.png')}/></div>
          <ul className="shows-list">{shows}</ul>
        </div>

        <div className="dialog-wrapper rules-dialog" style={{display: (this.state.showRuleDialog ? '-webkit-box' : 'none')}}>
          <div className="dialog-content">
            <div className="head">
              <span className="head-title">活动说明</span>
              <span className="close-btn" onTouchTap={this._hideRuleDialog.bind(this)}/>
            </div>
            <div className="dialog-body">
              <p>活动时间：</p>
              <p>即日起生效，具体结束时间待官方公布。</p>
              <p className="mt16">活动细则：</p>
              <p>1. 必须安装“一元购”才能使用。</p>
              <p>2. 必须注册“一元购”才能领取一元。</p>
              <p>3. 转盘抽到的奖品是购买机会，并非100%获得。</p>
              <p className="mt16">声明：本活动最终解释权归一元购项目所有。</p>
            </div>
          </div>
        </div>
        <div className="dialog-wrapper win-dialog" style={{display: (this.state.showWinDialog ? '-webkit-box' : 'none')}}>
          <div className="dialog-content">
            <div className="head">
              <span className="head-title">中奖提示</span>
              <span className="close-btn" onTouchTap={this._hideWinDialog.bind(this)}/>
            </div>
            <div className="dialog-body">
              <p>恭喜您获得“<span className="nickname">{this.state.winDialogText}</span>”的机会，请登录一元购APP查看详情。</p>
              <a href="javascript:;" target="_blank" className="download-btn" onTouchTap={this._trackDownload.bind(this)}>
                <div>立即下载一元购</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LuckyTurntable;
