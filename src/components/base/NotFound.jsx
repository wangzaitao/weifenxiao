import React from 'react';
import CustomLink from './CustomLink.jsx';

require('./not-found.css');

class NotFound extends React.Component {
  render () {
    return (
      <div className="not-found">
        <img src={require('../../img/404.png')} />
        <CustomLink to="/" query={this.props.location.query} isOuterURL={true}>
          <div className="btn"></div>
        </CustomLink>
      </div>
    );
  }
}

export default NotFound;
