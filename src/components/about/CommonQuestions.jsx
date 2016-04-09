import React, { Component, PropTypes } from 'react';

var ALL_QUESTIONS = [
  {
    'index': 1,
    'title': '怎样参加一元购？',
    'answers': [
      '登录（或注册后），就可以参加一元购了。', '1）挑选喜欢的商品，选择希望参与的人次并付款',
      '2）每人次需要花费1元，获得1个夺宝号码', '等待该商品凑齐人数后，等待系统揭晓幸运号码'
    ]
  },
  {
    'index': 2,
    'title': '一元购是怎么计算幸运号码的？',
    'answers': [
      '计算公式：', '(数值A/数值B)取余数+10000001',
      '数值A: 截止该商品开奖时间点前本站全部商品的最后100个参与时间所代表数值之和',
      '数值B: 商品所需人次',
      '1) 商品的最后一个号码分配完毕后，将公示该分配时间点前本站全部商品的最后100个参与时间',
      '2) 将这100个时间的数值进行求和，得出数值A（每个时间按时、分、秒、毫秒的顺序组合，如20:15:25.362则为201525362）',
      '3) 数值A/数值B（该商品总需人次）后得到的余数 + 原始数 10000001，得到最终幸运号码，拥有该幸运号码者，直接获得该商品。'
    ]
  },
  {
    'index': 3,
    'title': '幸运号码的计算结果可信么？',
    'answers': [
      '一元购的夺宝过程是完全透明的，您可以随时查看每个商品的参与人数、参与次数、参与名单及中奖信息等记录。',
      '幸运号码的计算规则中',
      '1）数值A: 商品的最后一个号码分配完毕后，将该分配时间点前本站全部商品的最后100个参与时间进行求和。',
      '2）数值B: 商品总需人次。',
      '由于每期商品分配完毕的时间点完全是公开并且未知的，因此A的值完全公正；数值B为公开的数值，保证了幸运号码计算结果公正性与可信性。'
    ]
  },
  {
    'index': 4,
    'title': '怎样查看是否中奖？如何领奖？',
    'answers': [
      '“我的”中有您的夺宝纪录，点击夺宝纪录，即可知道该期夺宝的获奖者；',
      '如果您获奖，会收到系统通知，而且会在”中奖纪录“中查看到纪录；',
      '收到获奖通知后，请认真填写收货人信息，以便我们为您派发获得的宝贝。',
      '商品发货后，我们会以短信通知您物流信息，方便您跟踪商品送达状态。'
    ]
  },
  {
    'index': 5,
    'title': '什么时候发货？',
    'answers': [
      '虚拟商品，如话费会在3个工作日内充值，个别用户充值后没有短信，建议拨打相关咨询电话如10086、10000，需要快递托运的商品会在7个工作日内发货。（工作日指除周末、法定节假日的工作时间，如果遇到长假，会在放假后第一时间发货）'
    ]
  },
  {
    'index': 6,
    'title': '为什么商品的价格比市面上要高？',
    'answers': [
      '商品在销售过程中需要支付三方手续费，用户消费各种活动费，服务费，此外还有运费等，还请您原谅。'
    ]
  },
  {
    'index': 7,
    'title': '商品是正品么？如何保证?',
    'answers': [
      '一元购所有商品均从正规渠道采购，100%正品，可享受厂家提供的全国联保服务。'
    ]
  },
  {
    'index': 8,
    'title': '收到的商品可以退换货么？',
    'answers': [
      '非质量问题，不在三包范围内，不给于退换货；',
      '请尽量亲自签收并当面拆箱验货，如果发现运输途中造成了商品的损坏，请不要签收，可以拒签退回。'
    ]
  }
];

class QuestionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false
    };
  }
  toggleAnswers () {
    this.setState({showAnswer: !this.state.showAnswer})
  }
  render () {
    var allAnswers = [];
    for (var i=0; i < this.props.answers.length; i++) {
      allAnswers.push(<p className="gray" key={i}>{this.props.answers[i]}</p>);
    }
    var liStyles = {borderBottom: '1px solid #e5e5e5'};
    if (this.state.showAnswer) {
      liStyles['paddingTop'] = '1em'
    } else {
      liStyles['padding'] = '1em 0'
    }
    return (
      <li style={liStyles} onTouchTap={this.toggleAnswers.bind(this)}>
        <div className="fs16" style={{position: 'relative', padding: '0 1em'}}>
          <span className="inline-block mr16">{this.props.index + '. ' + this.props.title}</span>
          <i className={"ico-right ico ico-" + (this.state.showAnswer ? 'icon_arrow_up_default' : 'icon_arrow_down_default')} />
        </div>
        <div style={{display: this.state.showAnswer ? 'block' : 'none', backgroundColor:'#f8f8f8', marginTop: '0.625em', borderTop: '1px solid #e5e5e5', padding: '0.625em 1.25em 1em 1.3125em'}}>
          {allAnswers}
        </div>
      </li>
    )
  }
}

QuestionItem.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string,
  answers: PropTypes.array
};

class CommonQuestions extends Component {
  render () {
    var questionItems = ALL_QUESTIONS.map(function(item, index) {
      return (<QuestionItem {...item} key={index} />);
    });

    return (
      <div className="m-body">
        <ul style={{height: '100%', backgroundColor: '#fff'}}>
          {questionItems}
        </ul>
      </div>
    );
  }
}

export default CommonQuestions;
