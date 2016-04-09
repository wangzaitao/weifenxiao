import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
  render() {
    var defaultStyles = {
      marginLeft: '0.625em',
      border: 'none',
      width: '80%',
      height: '2.375em',
      padding: '0 0.3125em',
      backgroundColor: '#fff',
      fontSize: '0.9375em'
    };
    if (this.props.styles && Object.keys(this.props.styles).length) {
      for (var key in this.props.styles) {
        defaultStyles[key] = this.props.styles[key];
      }
    }
    return (
      <input type={this.props.type} placeholder={this.props.placeholder} style={defaultStyles} onChange={this.props.onChange} />
    );
  }
}

export default TextInput;

TextInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  styles: PropTypes.object,
  onChange: PropTypes.func
};
