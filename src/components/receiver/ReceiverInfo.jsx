import React, { Component, PropTypes } from 'react';

import SubmitUserInfo from './SubmitUserInfo.jsx';
import ToBeReceived from './ToBeReceived.jsx';
import HasReceived from './HasReceived.jsx';
import * as ContentAPI from '../../api/content';

require('./receiver.css');

class ReceiverInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.orderId,
      status: -1,
      receiptInfos: {}
    };
  }
  componentWillMount () {
    ContentAPI.getOrderDetail(this.state.id, function (data) {
      this.setState({
        status: data.status,
        receiptInfos: data.receipt_info ? JSON.parse(data.receipt_info) : {}
      });
    }.bind(this));
    this._submitCallback = this._submitCallback.bind(this);
  }
  _submitCallback (data) {
    this.setState({status: 5, receiptInfos: data})
  }

  render () {
    if (!this.state.status || this.state.status === -1) {
      return <div className="m-body"></div>
    }

    var content;
    if (this.state.status == 4) {
      content = <SubmitUserInfo id={this.state.id} callback={this._submitCallback} />
    } else if (this.state.status == 5 || this.state.status == 6) {
      content = <ToBeReceived {...this.state.receiptInfos} />
    } else if (this.state.status == 7 || this.state.status == 8) {
      content = <HasReceived {...this.state.receiptInfos} />
    }
    return (
      <div className="m-body">
        {content}
      </div>
    );
  }
}

export default ReceiverInfo;
