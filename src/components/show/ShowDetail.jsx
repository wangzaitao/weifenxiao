import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

import {b64encode} from '../../utils/cryption';
import * as ContentAPI from '../../api/content';
import {UserAvatar, GoodsCover} from '../base/FallbackImage.jsx';

require('./show.css');

class ShowDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      showDetail: {}
    };
  }
  componentWillMount () {
    ContentAPI.getShowDetail(this.state.id, function (data) {
      this.setState({showDetail: data});
    }.bind(this))
  }

  render () {
    if (!Object.keys(this.state.showDetail).length) {
      return <div className="m-body"></div>
    }

    var winner = this.state.showDetail.revealed.winner,
        uParams = {nickname: winner.nick_name, avatar: winner.avatar};
    var imageElements = this.state.showDetail.images.split(',').map(function (item, index) {
      return <GoodsCover src={item} key={index} />
    });

    return (
      <div className="m-body show-detail">
        <div className="header">
          <UserAvatar className="mr10 inline-block" src={winner.avatar || require("../../img/default_avatar.png")} />
          <CustomLink to={"/uc/" + winner.uid} query={{p: encodeURIComponent(b64encode(JSON.stringify(uParams)))}} state={uParams}>
            <span className="blue txt-one-line inline-block" style={{maxWidth: '35%', position: 'absolute', top: '1em'}}>{winner.nick_name}</span>
          </CustomLink>
          <span className="time gray fr mr10 mt5 inline-block">{this.state.showDetail.show_time}</span>
        </div>
        <CustomLink to={'/activity/' + this.state.showDetail.revealed.activity_id}>
          <div className="winner gray">
            <p className="txt-one-line">{'获奖商品：' + this.state.showDetail.goods.name}</p>
            <p>期号：{this.state.showDetail.term}</p>
            <p>本期参与：<span className="red">{winner.num_count}</span> 人次</p>
            <p>幸运号码：<span className="red">{this.state.showDetail.revealed.lucky_number}</span></p>
            <p>揭晓时间：{winner.time}</p>
          </div>
        </CustomLink>
        <p className="content">{this.state.showDetail.content}</p>
        <div className="images">{imageElements}</div>
      </div>
    );
  }
}

export default ShowDetail;
