import React from 'react';
import LocalStorage from '../utils/localStorage';
import * as ContentAPI from './../api/content';
import Header from './common/Header.jsx';
import Footer from './common/Footer.jsx';

require('./common/common.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var code = this.props.location.query.code;
    LocalStorage.setItem("code", code);
    ContentAPI.getAuthUser(code).then((res) => {
      var obj = eval("(" + res + ")");
      LocalStorage.setItem("openid", obj.openid);
	    document.getElementById("test").value = obj.openid;
      LocalStorage.setItem("nickname", obj.nickname);
      LocalStorage.setItem("sex", obj.sex);
      LocalStorage.setItem("language", obj.language);
      LocalStorage.setItem("city", obj.city);
      LocalStorage.setItem("province", obj.province);
      LocalStorage.setItem("country", obj.country);
      LocalStorage.setItem("headimgurl", obj.headimgurl);
      LocalStorage.setItem("privilege", obj.privilege);
	    var openid = obj.openid;
      if (obj.openid) {
        ContentAPI.getUserInfo(0, "wx", openid).then((res) => {
          LocalStorage.setItem("mid", res.mid);
        });

        ContentAPI.getErWeiMa(openid).then((res) => {
          LocalStorage.setItem("erweima", res.Result);
        });
      }
    });

  }

  render() {
    return (
      <div id="content-container">
        <Header />
        <div>
          {this.props.children}
        </div>
	      <input type="text" id="test"/>
        <Footer />
      </div>
    );
  }
}

export default App;

