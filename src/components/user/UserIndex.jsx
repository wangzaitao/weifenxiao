import React from 'react';

require('./user.css');

class UserIndex extends React.Component {
  render() {
    return (
      <div className="user-info-container bgc-white">
        {this.props.children}
      </div>
    );
  }
}

export default UserIndex;
