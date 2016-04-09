import React, { Component, PropTypes } from 'react';
import CustomLink from './CustomLink.jsx';

class NoAPIDataTip extends Component {
  render () {
    var reloadLink;
    if (this.props.reloadUrl && !this.props.reload) {
      reloadLink = (
        <CustomLink to={this.props.reloadUrl} className="m-reload-btn" isOuterURL={this.props.isOuterURL === undefined ? false : this.props.isOuterURL}>
          {this.props.btnText || '重新加载'}
        </CustomLink>
      );
    } else if (this.props.reload) {
      reloadLink = <a href="javascript:;" className="m-reload-btn" onTouchTap={this.props.reload}>{this.props.btnText || '重新加载'}</a>;
    }
    return (
      <div id="m-no-api-container">
        <i className={"ico ico-" + this.props.icon} />
        <span className="no-api-tip">{this.props.tip}</span>
        {reloadLink}
      </div>
    )
  }
}

export default NoAPIDataTip;

NoAPIDataTip.propTypes = {
  icon: PropTypes.string,
  tip: PropTypes.string,
  btnText: PropTypes.string,
  reloadUrl: PropTypes.string,
  reload: PropTypes.func
};
