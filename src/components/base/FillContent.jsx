import React, { Component, PropTypes } from 'react';

const FILL_CLASSNAME = 'fill-content';

export var FillContent = ComposedComponent => class extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    $('#content-container').addClass(FILL_CLASSNAME);
  }

  componentWillUnmount(){
    $('#content-container').removeClass(FILL_CLASSNAME);
  }

  render(){
    return <ComposedComponent {...this.props} {...this.state} />;
  }
};
