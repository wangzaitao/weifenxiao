import React, { Component, PropTypes } from 'react';

import * as ContentAPI from '../../api/content';
import NotificationItem from './NotificationItem.jsx';
import NoAPIDataTip from '../base/NoAPIDataTip.jsx';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      noData: false
    };
  }
  getInitData () {
    ContentAPI.getUserNotifications(function (data) {
      var userNotifications = data.map(function (item) {
        return {
          id: item.id,
          status: item.status,
          time: item.created_at,
          notifyType: item.notify_type,
          showType: item.show_type,
          title: item.content.title,
          contents: item.content.content.split('\n')
        }
      });
      this.setState({
        notifications: userNotifications,
        noData: userNotifications.length <= 0
      })
    }.bind(this));
  }
  componentWillMount () {
    this.getInitData();
    this.getInitData = this.getInitData.bind(this);
  }

  render() {
    if(this.state.noData) {
      return <NoAPIDataTip icon="no_message" tip="暂时还没有通知哦！" reload={this.getInitData} />;
    }

    var notificationItems = this.state.notifications.map(function(item, index) {
      return (<NotificationItem {...item} key={index} /> );
    });
    return (
      <div className="m-body">
        <ul>{notificationItems}</ul>
      </div>
    );
  }
}

export default Notification;
