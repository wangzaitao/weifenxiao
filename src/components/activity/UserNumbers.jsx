import React, { Component, PropTypes } from 'react';
import CustomLink from '../base/CustomLink.jsx';

class UserNumbers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNumbers: this.props.count > 8 ? this.props.numbers.slice(0, 7) : this.props.numbers
    };
  }
  render () {
    var numberList;
    if (!this.props.isLogin) {
      numberList = <span><CustomLink to={"/login"} query={{from: window.location.pathname}} className="login red underline" isOuterURL={true}>登录</CustomLink> 以查看我的夺宝号</span>
    } else {
      var numberSpans = [];
      if (this.props.count) {
        for (var i in this.state.showNumbers) {
            numberSpans.push(<li className="user-numbers-item" key={i}>{this.state.showNumbers[i]}</li>);
        }
        if (this.props.count > this.state.showNumbers.length) {
          numberSpans.push(<li className="user-numbers-item" key="all"><CustomLink to={'/numbers/' + this.props.id} className="red view-all-numbers">查看全部</CustomLink></li>);
        }
        numberList = (
          <div style={{textAlign: 'left', margin: '-0.3125em 0'}}>
            <span>您参与了： <span className="red">{this.props.count}</span>次</span>
            <br/>
            <span style={{display: 'table-cell', verticalAlign: 'top', whiteSpace: 'nowrap'}}>夺宝号码：</span>
            <ul className="user-numbers-list">{numberSpans}</ul>
          </div>
        )
      } else {
        numberList = <span>您还没有参与此次夺宝哦！</span>
      }
    }

    return (
      <div className="user-numbers">
        {numberList}
      </div>
    )
  }
}

export default UserNumbers;

UserNumbers.propTypes = {
  id: PropTypes.string,
  isLogin: PropTypes.bool,
  count: PropTypes.number,
  numbers: PropTypes.array
};
