import React, { Component, PropTypes } from 'react';
import CustomLink from './CustomLink.jsx';

require('./carousel.css');

class CarouselItem extends Component {
  render() {
    let props = this.props, _progress;
    _progress = Math.floor(props.current_amount * 100.0 / props.target_amount);

    return (
      <CustomLink to={"/activity/" + props.id} isOuterURL={props.isOuterURL === undefined ? false : props.isOuterURL}>
        <div className="carousel-item">
          <img className="c-i-img" src={props.goods.cover} />
          <div className="c-i-name">{props.goods.name}</div>
          <div className="c-i-wrap">
            <span className="c-i-process-bar"><i className="c-i-color" style={{width: _progress + '%'}} /></span>
          </div>
        </div>
      </CustomLink>
    );
  }
}

class Carousel extends Component{
  render() {
    let props = this.props, itemsDom;
    itemsDom = props.items.map(function(item) {
      return (<CarouselItem {...item} key={item.id} isOuterURL={props.isOuterURL === undefined ? false : props.isOuterURL} />);
    });
    return (
      <div className="carousel-wrap">{itemsDom}</div>
    );
  }
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired
};

export default Carousel;