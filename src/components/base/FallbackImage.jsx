import React, {Component, PropTypes} from 'react';

export class FallbackImage extends Component {
  constructor(props) {
    super(props);
    this.displayImage = new Image();
    this.state = {
      src: props.src,
      imageSource: props.initImage
    };
    this.setDisplayImage = this.setDisplayImage.bind(this);
  }

  componentDidMount() {
    this.setDisplayImage(this.state.src, this.props.fallback);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.state.src){
      this.setDisplayImage(nextProps.src, nextProps.fallback);
    }
  }
  componentWillUnmount() {
    this.displayImage.onerror = null;
    this.displayImage.onload = null;
  }

  setDisplayImage(image, fallback) {
    this.displayImage.onerror = () => {
      this.setState({
        imageSource: fallback
      });
    };
    this.displayImage.onload = () => {
      this.setState({
        imageSource: image
      });
    };
    this.displayImage.src = image;
  }

  render() {
    return this.state.imageSource ? <img {...this.props} src={this.state.imageSource} style={this.props.styles} /> : null;
  }
}

FallbackImage.propTypes = {
  src: PropTypes.string.isRequired,
  fallback: PropTypes.string,
  initImage: PropTypes.string,
  styles: PropTypes.object
};
FallbackImage.defaultProps = {
  initImage: null,
  styles: {}
};

export class GoodsCover extends FallbackImage {
  constructor(props) {
    super(props);
    if (props.cut) {
      this.state.src = this.state.src + (this.state.src.indexOf('?') === -1 ? '?' : '|') + 'imageView2/2/w/200/h/200'
    }
  }
}
GoodsCover.propTypes = {
  cut: PropTypes.bool
};
GoodsCover.defaultProps = {
  initImage: require('../../img/goods_default.png'),
  fallback: require('../../img/goods_default.png'),
  cut: false
};

export class UserAvatar extends FallbackImage {}
UserAvatar.defaultProps = {
  initImage: require('../../img/default_avatar_gray.png'),
  fallback: require('../../img/default_avatar_gray.png'),
  styles: {width: '2.5em', borderRadius: '50%'}
};
