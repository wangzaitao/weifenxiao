import React from 'react';
import CustomLink from '../base/CustomLink.jsx';

class Settings extends React.Component {
  render () {
    var styles = {
      item: {borderBottom: '1px solid #e5e5e5'},
      link: {padding: '0.875em 1.125em', position: 'relative'},
      email: {padding: '0.875em 1.125em', borderBottom: '1px solid #e5e5e5'}
    };

    return (
      <div className="m-body">
        <ul className="settings-list">
          <li style={styles.item}>
            <CustomLink to="/about">
              <div style={styles.link}>
                <span>一元购</span>
                <i className="ico-right ico ico-icon_arrow_right_default mt5" />
              </div>
            </CustomLink>
          </li>
          <li style={styles.item}>
            <CustomLink to="/guide">
              <div style={styles.link}>
                <span>新手引导</span>
                <i className="ico-right ico ico-icon_arrow_right_default mt5" />
              </div>
            </CustomLink>
          </li>
          <li style={styles.item}>
            <CustomLink to="/questions">
              <div style={styles.link}>
                <span>常见问题</span>
                <i className="ico-right ico ico-icon_arrow_right_default mt5" />
              </div>
            </CustomLink>
          </li>
          <li style={styles.item}>
            <CustomLink to="/protocol">
              <div style={styles.link}>
                <span>服务协议</span>
                <i className="ico-right ico ico-icon_arrow_right_default mt5" />
              </div>
            </CustomLink>
          </li>
          <li style={styles.email}>
            <span>客服QQ</span>
            <span className="gray fr">3021019182</span>
          </li>
          <li style={styles.email}>
            <span>联系我们</span>
            <span className="red fr">yyg-kefu@qq.com</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default Settings;
