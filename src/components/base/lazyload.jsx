import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class LazyLoad extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let self = this,
      props = this.props,
      container = ReactDOM.findDOMNode(this),
      scrollFunc = this._handleScroll.bind(this);
    $(window)
      .on('scroll', scrollFunc)
      .on('resize', scrollFunc);

    $(container).on("appear", "."+props.lazyClsName, function(e){
      let target = e.target;
      if (target.loaded !== true) {
        props.preload(target);
        target.loaded = true;
      }
    });

    setTimeout(scrollFunc, 0);
  }

  componentWillUnmount(){
    let scrollFunc = this._handleScroll.bind(this);
    $(window)
      .off('scroll', scrollFunc)
      .off('resize', scrollFunc);
  }

  render(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }

  _handleScroll(){
    let self = this,
      elements = this._getLazyloadElements(),
      threshold = this.props.threshold,
      lazyClsName = this.props.lazyClsName;
    elements.each(function(ele){
      if (self._abovethetop(this, threshold) || self._leftofbegin(this, threshold)) {
        /* Nothing. */
      } else if (!self._belowthefold(this, threshold) && !self._rightoffold(this, threshold)) {
        $(this).trigger("appear");
      }
    });

    /* Remove image from array so it is not looped next time. */
    for (let i = 0, length = elements.length; i < length; i++) {
      if (elements[i].loaded === true) {
        $(elements[i]).removeClass(lazyClsName);
      }
    }
  }

  _getLazyloadElements(){
    let container = ReactDOM.findDOMNode(this);
    return $('.'+this.props.lazyClsName, container);
  }

  _belowthefold(element, threshold) {
    let fold = window.innerHeight + window.scrollY;
    return fold <= $(element).offset().top - threshold;
  }

  _rightoffold(element, threshold) {
    let fold = window.innerWidth + window.scrollX;
    return fold <= $(element).offset().left - threshold;
  }

  _abovethetop(element, threshold) {
    let fold = window.scrollY;
    return fold >= $(element).offset().top + $(element).height() + threshold;
  }

  _leftofbegin(element, threshold) {
    let fold = window.scrollX;
    return fold >= $(element).offset().left + $(element).width() + threshold;
  }
}

LazyLoad.propTypes = {
  lazyClsName: PropTypes.string,
  threshold: PropTypes.number,
  preload: PropTypes.func
};

LazyLoad.defaultProps = {
  lazyClsName: 'lazyload',
  threshold: 1,
  preload: function(ele){
    let img = document.createElement('img'),
      src = $(ele).attr('data-original');

    $(img)
      .bind('load', function(){
        $(ele).attr('src', src);
      })
      .bind('error', function(){
        $(ele).remove();
      })
      .attr('src', src);
  }
};