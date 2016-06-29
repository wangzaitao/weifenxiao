import React, { Component, PropTypes } from 'react';

import { Dialog } from 'react-ui-components';

require('../../scss/components/dialog.scss');
require('./default-dialog.scss');

export default class DefaultDialog extends Dialog {
  componentWillMount() {
    const self = this;
    this.onOkBtn = () => {
      self.close();
      this.state.open && self.props.onOk && self.props.onOk();
    };
    this.onClose = () => {
      self.close();
    };
    BC.attach('dialog:btnOK', this.onOkBtn);
    BC.attach('dialog:btnClose', this.onClose);
  }
  componentWillUnmount(){
    BC.detach('dialog:btnOK', this.onOkBtn);
    BC.detach('dialog:btnClose', this.onClose);
  }
}

DefaultDialog.defaultProps = {
  hasMask: true,
  hasActions: true,
  customClass: '',
  headTpl: _headTpl,
  actions: [
    {
      customClass: 'default-dialog-cancel',
      label: "取消"
    },
    {
      customClass: 'default-dialog-ok',
      onTap: _ok.bind(this),
      label: "确定"
    }
  ]
};

function _headTpl(){
  return <i className="ico ico-close_default fr" onClick={_onClose} />;
}

function _onClose(){
  BC.notify('dialog:btnClose')
}

function _ok(){
  BC.notify('dialog:btnOK')
}
