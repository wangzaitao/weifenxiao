import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

import {UserAvatar, GoodsCover} from '../base/FallbackImage.jsx';

class ShowItem extends Component {
  render () {
    var images = this.props.images.slice(0, 3).map(function (item, index) {
      return (<GoodsCover src={item} cut={true} key={index}/>);
    });

    return (
      <li className="show-item">
        <UserAvatar className="fl" src={this.props.winner && this.props.winner.avatar || require("../../img/default_avatar.png")} />
        <div className="show-infos">
          <div className="header">
            <span className="blue txt-one-line inline-block" style={{width: '45%'}}>{this.props.winner && this.props.winner.nick_name}</span>
            <span className="gray fr pr10">{this.props.showTime}</span>
          </div>
          <CustomLink to={"/show/" + this.props.id}>
            <div className="content">
              <span className="show-desc">{this.props.content}</span>
              <div className="img-list mt5">{images}</div>
            </div>
          </CustomLink>
        </div>
      </li>
    );
  }
}

ShowItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  showTime: PropTypes.string,
  content: PropTypes.string,
  images: PropTypes.array,
  winner: PropTypes.object
};

export default ShowItem;
