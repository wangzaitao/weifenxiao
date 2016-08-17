import React, {Component, PropTypes} from 'react';
import TravelNav from './../../components/travel/TravelNav.jsx';
import LocalStorage from '../../utils/localStorage';

class Erweima extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      erweima: LocalStorage.setItem("erweima") || ""
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="my-address my-address-add">
        <div className="tlp">
          <TravelNav name="我的二维码"/>
          <div>
            <img src={this.state.erweima} />
          </div>
        </div>
      </div>
    );
  }
}

export default Erweima;
