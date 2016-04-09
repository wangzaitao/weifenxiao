import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

class DetailLinks extends Component {
  render() {
    return (
      <div className="m-detail-links">
        <CustomLink to={'/activity_gallery/' + this.props.id} state={{graphics: this.props.graphics}}>
          <div className="link-item">
            <span>图文详情</span>
            <i className="ico ico-icon_arrow_right_default ico-right"/>
            <span className="activity-images-text">建议在wifi下查看</span>
          </div>
        </CustomLink>
        <CustomLink to={'/records/' + this.props.gid} query={{price: this.props.price}}>
          <div className="link-item">
            <span>往期揭晓</span>
            <i className="ico ico-icon_arrow_right_default ico-right"/>
          </div>
        </CustomLink>
        <CustomLink to={'/activity_show/' + this.props.gid}>
          <div className="link-item bb1-gray">
            <span>晒单分享</span>
            <i className="ico ico-icon_arrow_right_default ico-right"/>
          </div>
        </CustomLink>
      </div>
    );
  }
}

export default DetailLinks;

DetailLinks.propTypes = {
  id: PropTypes.string,
  gid: PropTypes.number,
  price: PropTypes.number,
  graphics: PropTypes.string
};
