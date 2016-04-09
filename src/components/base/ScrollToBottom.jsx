import React, { Component, PropTypes } from 'react';

import BC from '../../utils/broadcast';

export var ScrollToBottom = ComposedComponent => class extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    $(window).on('scroll', this._handleScroll);
  }

  componentWillUnmount(){
    $(window).off('scroll', this._handleScroll);
  }

  render(){
    return <ComposedComponent {...this.props} {...this.state} />;
  }

  _handleScroll(e){
    if(($(window).scrollTop() + $(window).height()) - $(document).height() >= 0){
      BC.notify('scrolltobottom');
    }
  }
}