import React, { Component, PropTypes } from 'react';
import LazyLoad from '../base/lazyload';

import * as ContentAPI from '../../api/content';

require('./detailGallery.css');

export default class DetailGallery extends Component{
  constructor(props){
    super(props);
    var locationState = this.props.location.state;
    this.state = {
      id: this.props.params.id,
      graphics: locationState ? (locationState.graphics || '') : ''
    };
  }

  componentWillMount() {
    if (!this.state.graphics) {
      ContentAPI.getActivityDetail(this.state.id, function (data) {
        this.setState({graphics: data.goods ? data.goods.graphics : ''});
      }.bind(this))
    }
  }

  render(){
    if (!this.state.graphics) {
      return <div className="m-body"></div>
    }
    let graphicsAry = this.state.graphics.split(','),
      _children = [], item, initImage = require('../../img/default_banner.png');
    for(let i=0; i< graphicsAry.length; i++){
      item = (
        <img key={i} className="detail-gallery-item lazyload" src={initImage} data-original={graphicsAry[i]} />
      );
      _children.push(item);
    }
    return (
      <div className="m-body a-images-detail">
        <LazyLoad>
          {_children}
        </LazyLoad>
      </div>
    );
  }

  _preload(element){
    let img, $this, src;
    $this = $(element);
    src = $this.data('original');
    if(!src){
      element.loaded = true;
      return;
    }
    img = document.createElement('img');
    $(img)
      .bind('load', function(){
        $this.parent().css('backgroundImage','url('+src+')  !important');
        $this.css('visibility','hidden');
        element.loaded = true;
      })
      .bind('error', function(){
        $this.css('visibility','visible');
      })
      .attr('src', src);
  }
}