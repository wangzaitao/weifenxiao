import React from 'react';
import BgTitle from '../base/button/BgTitle.jsx';
import * as ContentAPI from '../../api/content';

class AboutUs extends React.Component {
  componentWillMount () {
    ContentAPI.checkNewbieStepOne(10010)
  }

  render () {
    var styles = {
      text: {padding: '0.125em 0', lineHeight: '1.5625em'},
      textBold: {padding: '0.125em 0', lineHeight: '1.5625em', fontWeight: 'bold'},
      textBorder: {padding: '0.125em 0', lineHeight: '1.5625em', borderBottom: '1px solid #e5e5e5'},
      index: {backgroundColor: '#e74c3c', padding: '0.125em 0.44em', borderRadius: '50%', marginRight: '0.3125em', color: '#fff'}
    };
    return (
      <div className="m-body" style={{padding: '1em 0.9375em 0 0.9375em'}}>
        <div>
          <BgTitle title="关于一元购" customClass="fs16 mb15 right-bg-white"/>
          <p style={styles.text}>一元购指只需1元就有机会买到想要的商品。</p>
          <p style={styles.text}>即每件商品被平分成若干“等份”出售，每份1元。</p>
          <p style={styles.text}>每购买1等份，购买者将随机获得1个夺宝号，当商品所有“等份”售出后，根据开奖规则产生1个幸运号码，拥有该幸运号码的用户即可获得此商品。</p>
        </div>
        <div>
          <BgTitle title="幸运号码计算规则" customClass="fs16 mt20 mb15 right-bg-white"/>
          <p className="red" style={styles.textBold}>公平、公正、公开</p>
          <div style={{backgroundColor: '#fb951f', textAlign: 'center', padding: '0.3125em 0', borderRadius: '0.1875em'}}>
            <span className="white">(数值A/数值B)取余数 + 10000001</span>
          </div>
          <p style={styles.text}><span className="little-yellow">数值A：</span>截止该商品最后一个号码分配完毕时间点前本站全部商品的最后100个参与时间所代表数值之和</p>
          <p style={styles.textBorder}><span className="little-yellow">数值B：</span>商品所需人次</p>
          <p style={styles.text}><span style={styles.index}>1</span>商品的最后一个号码分配完毕后，将公示该分配时间点前本站全部商品的最后100个参与时间</p>
          <p style={styles.text}><span style={styles.index}>2</span>将这100个时间的数值进行求和，得出数值A（每个时间按时、分、秒、毫秒的顺序组合，如20:15:25.362则为201525362）</p>
          <p style={styles.text}><span style={styles.index}>3</span>数值A/该商品总需人次即数值B后得到的余数 + 原始数 10000001，得到最终幸运号码，拥有该幸运号码者，直接获得该商品。</p>
        </div>
      </div>
    );
  }
}

export default AboutUs;
