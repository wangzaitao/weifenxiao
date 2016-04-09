import React from 'react';

import {b64encode} from '../../utils/cryption';
import * as ContentAPI from '../../api/content';
import CustomLink from '../base/CustomLink.jsx';

require('./calculate.css');

class NumAItem extends React.Component {
  render () {
    var uParams = {nickname: this.props.name, avatar: ''};
    return (
      <tr className="result-a-row">
          <td className="time">
            <span>{this.props.time}</span>
            <i className="ico ico-arrow_red_right" />
            <span className="red" style={{fontWeight: 'bold'}}>{this.props.code}</span>
          </td>
          <td className="username">
            <CustomLink to={"/uc/" + this.props.uid} query={{p: encodeURIComponent(b64encode(JSON.stringify(uParams)))}} state={uParams}>
              <div className="gray">{this.props.name}</div>
            </CustomLink>
          </td>
      </tr>
    )
  }
}

class CalculateResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.activityId,
      isRevealed: false,
      numA: '',
      numB: '',
      luckyNumber: '',
      numAList: [],
      showAList: false
    };
  }
  componentWillMount () {
    ContentAPI.getActivityDetail(this.state.id, function (data) {
      this.setState({
        numB: data.target_amount
      })
    }.bind(this));
    ContentAPI.getCalculateResult(this.state.id, function (data) {
      if (data.lucky_number) {
        this.setState({
          isRevealed: true,
          numA: data.calc.result_a,
          luckyNumber: data.lucky_number,
          numAList: data.calc.a_list
        })
      }
    }.bind(this));
    this.toggleNumAList = this.toggleNumAList.bind(this);
  }
  toggleNumAList () {
    this.setState({showAList: !this.state.showAList})
  }

  render () {
    var numAHeader = <thead><tr><th className="time" style={{width: '78%'}}>夺宝时间</th><th className="user">用户帐号</th></tr></thead>;
    var numAList = this.state.numAList.map(function (item, index) {
      return <NumAItem {...item} key={index} />
    });

    return (
      <div className="m-body calc-results">
        <div className="rules bb1-gray">
          <div>
            <p className="white fs15">计算公式</p>
            <p className="white fs15">(数值A/数值B)取余数 + 10000001</p>
          </div>
        </div>
        <div className="result-a bb1-gray">
          <p className="fs15 pl15 pr15">数值A</p>
          <p className="gray pl15 pr15">= 截止该商品最后一个号码分配完毕时间点前本站全部商品的最后100个参与时间所代表数值之和</p>
          <p className="result-a-number gray pl15 pr15">= <span className="yellow">{this.state.isRevealed ? this.state.numA: '正在计算中...'}</span></p>
          <div className="fr pl15 pr15" onTouchTap={this.toggleNumAList}>
            <span className="red mr5">{this.state.showAList ? '收起' : '展开'}</span>
            <i className={"ico ico-" + (this.state.showAList ? 'arrow_red_up' : 'arrow_red_down')}/>
          </div>
          {this.state.isRevealed ? <table className="result-a-table gray" style={{display: this.state.showAList ? 'table': 'none'}}>{numAHeader}<tbody>{numAList}</tbody></table> : null }
        </div>
        <div className="result-b bb1-gray">
          <p className="fs15">数值B</p>
          <p className="gray">= 奖品所需人次</p>
          <p>= <span className="red">{this.state.numB}</span></p>
        </div>
        <div className="lucky-number bb1-gray">
          <p className="fs15">计算结果</p>
          <p><span className="gray">幸运号码：</span><span className="yellow">{this.state.luckyNumber || '等待揭晓...'}</span></p>
        </div>
      </div>
    );
  }
}

export default CalculateResult;
