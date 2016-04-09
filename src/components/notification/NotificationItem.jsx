import React, { Component, PropTypes } from 'react';
import * as ContentAPI from '../../api/content';

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: false,
      hasRead: this.props.status != 0
    };
  }
  toggleAnswers () {
    // mark notification as read.
    if (!this.state.hasRead) {
      ContentAPI.markNotificationRead(this.props.id);
    }
    this.setState({
      hasRead: true,
      showContent: !this.state.showContent
    })
  }
  render() {
    var contents = this.props.contents.map(function (item, index) {
      return <p className="gray" key={index}>{item}</p>
    });
    var liStyles = this.state.showContent ? {paddingTop: '0.625em'} : {padding: '0.625em 0'};
    return (
      <li className="bb1-gray" style={liStyles} onTouchTap={this.toggleAnswers.bind(this)}>
        <div style={{position: 'relative', padding: '0 1em'}}>
          <p className={"inline-block mr16" + (this.state.hasRead ? ' gray' : '')}>{this.props.title}</p>
          <p className="gray">{this.props.time}</p>
          <i className={"ico-right ico ico-" + (this.state.showContent ? 'icon_arrow_up_default' : 'icon_arrow_down_default')} />
        </div>
        <div style={{display: this.state.showContent ? 'block' : 'none', backgroundColor: '#f8f8f8', borderTop: '1px solid #e5e5e5', marginTop: '0.625em', padding: '0.625em 1em'}}>
          {contents}
        </div>
      </li>
    );
  }
}

export default NotificationItem;

NotificationItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  contents: PropTypes.array,
  time: PropTypes.string,
  status: PropTypes.number,
  notifyType: PropTypes.number,
  showType: PropTypes.number
};
