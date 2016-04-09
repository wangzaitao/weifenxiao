import React, { Component, PropTypes } from 'react';
import CustomLink from './CustomLink.jsx';

class Header extends Component {
  render() {
    if (!this.props.isShow) return null;

    var leftElement, rightElement;
    if (this.props.leftIconClass && this.props.leftIconUrl) {
      if (this.props.leftIconUrl === 'go_back') {
        leftElement = (
          <a href='javascript:window.history.go(-1);' className="left-icon fl">
            <i className={'ico ico-' + this.props.leftIconClass}/>
          </a>
        )
      } else {
        var leftIsOuterURL = (this.props.leftIsOuterURL === undefined ? false : this.props.leftIsOuterURL);
        leftElement = (
          <CustomLink to={this.props.leftIconUrl} className="left-icon fl" isOuterURL={leftIsOuterURL}>
            <i className={'ico ico-' + this.props.leftIconClass}/>
          </CustomLink>
        );
      }
    }
    if (this.props.rightIconClass && this.props.rightIconUrl) {
      var rightIsOuterURL = (this.props.rightIsOuterURL === undefined ? false : this.props.rightIsOuterURL);
      rightElement = (
        <CustomLink to={this.props.rightIconUrl} className="right-icon fr" isOuterURL={rightIsOuterURL}>
          <i className={'ico ico-' + this.props.rightIconClass}/>
        </CustomLink>
      );
    }

    return (
      <div className="m-header" style={this.props.headerStyle}>
        {leftElement}
        <h1>{this.props.title}</h1>
        {rightElement}
      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.string,
  leftIconClass: PropTypes.string,
  rightIconClass: PropTypes.string,
  leftIconUrl: PropTypes.string,
  rightIconUrl: PropTypes.string,
  leftIsOuterURL: PropTypes.bool,
  rightIsOuterURL: PropTypes.bool,
  headerStyle: PropTypes.object
};
