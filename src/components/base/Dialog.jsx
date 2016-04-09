import React, {Component, PropTypes} from 'react';

require('./dialog.css');

class Dialog extends Component {
  componentWillMount () {
    this.onBackdropClick = this.onBackdropClick.bind(this);
    this.onWindowKeyDown = this.onWindowKeyDown.bind(this);
    this.onConfirmClick = this.onConfirmClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    window.addEventListener('keydown', this.onWindowKeyDown);
  }
  componentWillUnmount () {
    window.removeEventListener('keydown', this.onWindowKeyDown);
  }
  onCloseClick (e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onCloseClick();
  }
  onBackdropClick (e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.target === e.currentTarget) {
      this.onCloseClick();
    }
  }
  onWindowKeyDown (event) {
    if (event.keyCode === 27) {
      this.onCloseClick();
    }
  }
  onConfirmClick (e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onConfirm();
  }

  render () {
    return (
      <div className={"lite-dialog " + (this.props.clz || '')} onTouchTap={this.onBackdropClick} style={{display: (this.props.show ? 'block' : 'none')}}>
        <div className="wrapper" onTouchTap={this.onBackdropClick}>
          <div className="box">
            <div className="content">
              <div className="inner">{this.props.content}</div>
              <div className="actions">
                {this.props.cancel ? <button className="dialog-button link" onTouchTap={this.onCloseClick}>{this.props.cancel}</button> : undefined}
                {this.props.confirm ? <button className="dialog-button danger" onTouchTap={this.onConfirmClick}>{this.props.confirm}</button> : undefined}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;

Dialog.propTypes = {
  clz: PropTypes.string,
  cancel: PropTypes.string,
  confirm: PropTypes.string,
  content: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};
