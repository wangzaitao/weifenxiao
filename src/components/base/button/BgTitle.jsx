import React, { Component, PropTypes } from 'react';

require('./bg-title.css');

export default class BgTitle extends Component{
  render(){
    let props = this.props, cls = 'bg-title-wrap';
    if(props.customClass) {
      cls += ' ' + props.customClass;
    }

    return (
      <div className={cls}>
        <div className="inline-block bg-title-left">{props.title}</div>
        <div className="inline-block bg-title-right"></div>
      </div>
    );
  }
}
BgTitle.propTypes = {
  customClass: PropTypes.string,
  title: PropTypes.string.isRequired
};