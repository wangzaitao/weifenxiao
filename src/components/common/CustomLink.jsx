import React from 'react';
import {Link} from 'react-router';

class CustomLink extends React.Component {
  render () {
    var isOuterURL = (this.props.isOuterURL === undefined ? false : this.props.isOuterURL);
    if (isOuterURL) {
      return <a href={this.props.to} className={this.props.className} style={this.props.style}>{this.props.children}</a>
    } else {
      var params = {};
      for (var k in this.props) {
        if (['to', 'state', 'query'].indexOf(k) == -1) {
          params[k] = this.props[k];
        }
      }
      params['to'] = {pathname: this.props.to, query: this.props.query || {}, state: this.props.state || {}};
      return <Link {...params}/>
    }
  }
}

export default CustomLink;
