import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';
import {parseCommand} from '../../utils/common';
import {GoodsCover} from '../base/FallbackImage.jsx';
import CustomLink from '../base/CustomLink.jsx';

class DiscoveryItem extends Component {
  render () {
    let props = this.props,
      url = (parseCommand(props.cmd) || '/'),
      notifyDom;
    url += (url.indexOf('?') === -1 ? '?back_url=/?index=2' : '&back_url=/?index=2');
    if(props.notify && props.notify > 0){
      notifyDom = (<span className="banner-notify"></span>);
    }
    return (
      <li className="banner-item">
        <CustomLink to={url} isOuterURL={url !== '/show'}>
          <GoodsCover className="banner-i-icon" src={props.icon}/>
          <div className="banner-i-right fr">
            {notifyDom}
            <i className="ico ico-icon_arrow_right_default mt20"/>
          </div>
          <div className="banner-i-main">
            <div className="banner-i-title">
              <span className="banner-i-title-text txt-one-line">{props.title}</span>
              {props.tag && 
                <span className="banner-i-tag-wrap">
                  <span className="banner-i-tag">{props.tag.toUpperCase()}</span>
                </span>
              }
            </div>
            <div className="banner-i-desc txt-one-line">
              {props.desc}
            </div>
          </div>
        </CustomLink>
      </li>
    );
  }
}

DiscoveryItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  cmd: PropTypes.string,
  notify: PropTypes.number,
  tag: PropTypes.string
};

const defaultList = [
  {
    title: '晒单分享',
    desc: '是时候展示一波运气了！',
    icon: 'http://7xov77.com2.z0.glb.qiniucdn.com/discovery01.png',
    cmd: '11#/show'
  },
  {
    title: '玩转一元购, 轻松中大奖！',
    desc: '一元购最强攻略, 一看就会玩！',
    icon: 'http://7xov77.com2.z0.glb.qiniucdn.com/discovery03.png',
    cmd: '11#/guide'
  }
];


class DiscoveryList extends Component {
  constructor(props){
    super(props);
    this.state = {
      discoveryList: defaultList
    };
  }

  componentWillMount(){
    this._loadInitData();
  }

  render(){
    var discoveryItems = this.state.discoveryList.map((item, index) => {
      return <DiscoveryItem key={index} {...item} />;
    });

    return (
      <div className="discovery-container">
        <ul className="discovery-list">
          {discoveryItems}
        </ul>
      </div>
    );
  }

  _loadInitData(){
    var self = this;
    ContentAPI.getDiscovery()
      .then(res => {
        self.setState({
          discoveryList: defaultList.concat(res)
        });
      });
  }
}

export default DiscoveryList;
