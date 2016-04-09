import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';

import * as ContentAPI from '../../api/content';
import * as GlobalConfig from '../../constants/Config';
import {parseCommand} from '../../utils/common';

require('../../css/slick.css');

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: []
    };
  }
  componentWillMount () {
    ContentAPI.getBanners(function (data) {
      var banners = data.map(function (item) {
        return {src: item.image, link: parseCommand(item.cmd)}
      });
      this.setState({banners: banners.length ? banners : GlobalConfig.DEFAULT_BANNERS})
    }.bind(this));
  }
  _addImgParams (imgUrl) {
    if (imgUrl.indexOf('imageView2') == -1) {
      imgUrl = imgUrl + (imgUrl.indexOf('?') === -1 ? '?' : '|') + 'imageView2/0/w/720/h/270'
    }
    return imgUrl;
  }

  render () {
    if (!this.state.banners.length) return null;
    var slides = [];
    for (var i=0; i < this.state.banners.length; i++) {
      var banner = this.state.banners[i];
      slides.push(<a href={banner.link} data-index={i} key={i}><img src={this._addImgParams(banner.src)} /></a>);
    }
    return (
      <Slider dots={true} autoplay={(slides.length > 1)} autoplaySpeed={5000} infinite={slides.length > 1} className="banner">{slides}</Slider>
    )
  }
}

export default Banner;
