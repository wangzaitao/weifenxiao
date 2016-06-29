import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import TravelNav from './../../components/travel/TravelNav.jsx';
import CustomLink from '../base/CustomLink.jsx';
import * as ContentAPI from '../../api/content';

class Fenxiao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JuniorUsers:[],
      SuperiorUsers:[]
    };
  }

  componentWillMount() {
    ContentAPI.getFenxiao({mid: 1, thirdfrom:""}).then((res) => {
      this.setState({
        JuniorUsers: res.JuniorUsers,
        SuperiorUsers: res.SuperiorUsers
      });
    });
  }

  componentDidMount() {
    $("#content-container").addClass("bgc-white");
    $("#content-container").css("height", "100%");
    $("#content-container").find(".right-icon").html("保存").css({"color": "#fff", "font-size": "1.143em"});
  }

  render() {
    var juniorUsersDom = null;
    var JuniorUsers = this.state.JuniorUsers;
    if (JuniorUsers.length > 0) {
      juniorUsersDom = JuniorUsers.map((item, index) => {
        return (
          <tr>
            <td>{item.wxnickname}</td>
            <td>{item.sex}</td>
            <td>{item.mobile}</td>
          </tr>
        );
      });
    }
    else {
      juniorUsersDom = (
        <tr>
          <td colSpan="7">您还没有上级分销</td>
        </tr>
      )
    }

    var superiorUsersDom = null;
    var SuperiorUsers = this.state.SuperiorUsers;
    if (SuperiorUsers.length > 0) {
      superiorUsersDom = SuperiorUsers.map((item, index) => {
        return (
          <tr>
            <td>{item.wxnickname}</td>
            <td>{item.sex}</td>
            <td>{item.mobile}</td>
          </tr>
        );
      });
    }
    else {
      superiorUsersDom = (
        <tr>
          <td colSpan="7">您还没有下级分销</td>
        </tr>
      )
    }

    return (
      <div className="my-address my-address-add">
        <div className="tlp">
          <TravelNav name="我的分销"/>
          <div style={{backgroundColor:"#fff",padding:"1em",borderBottom: "1px solid #e5e5e5",borderTop: "1px solid #e5e5e5"}}>
            <span style={{color:"#333"}}>我的上级</span>
          </div>
          <div>
            <table className="tbl_addr">
              <tr>
                <th>昵称</th>
                <th>性别</th>
                <th>手机号码</th>
              </tr>
              {juniorUsersDom}
            </table>
          </div>
          <div style={{backgroundColor:"#fff",padding:"1em",borderBottom: "1px solid #e5e5e5",borderTop: "1px solid #e5e5e5",marginTop:"20px"}}>
            <span style={{color:"#333"}}>我的下级</span>
          </div>
          <div>
            <table className="tbl_addr">
              <tr>
                <th>昵称</th>
                <th>性别</th>
                <th>手机号码</th>
              </tr>
              {superiorUsersDom}
            </table>
          </div>
        </div>

      </div>
    );
  }
}

export default Fenxiao;
