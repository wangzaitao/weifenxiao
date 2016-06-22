import React from 'react';
import TravelNav from './../travel/TravelNav';
import * as ContentAPI from './../../api/content';
import CustomLink from './../common/CustomLink.jsx';

require('./../travel/travel.scss');
require('./sight.scss');

class Hotel extends React.Component {
  constructor(props) {
    super(props);
	  this.state = {
		  id : this.props.params.id,
		  obj: {}
	  };
  }

	componentWillMount() {
		var id = this.props.params.id;
		ContentAPI.getSightById(id).then((res) => {
			this.setState({
				obj: res
			});
		});
	}

  render() {
    let props = this.props;
		let item = this.state.obj;

    return (
      <div className="tlp">
        <TravelNav name="景点详情"/>
        <div className="lineTopImg">
          <a>
            <img src={"http://www.668lyzx.com"+item.litpic} style={{height:"250px"}}/>
          </a>
          <p>{item.title || ""}</p>
        </div>

        <div className="lineTopTxt bBor">
          <money className="corRed">￥<span>{item.price}</span><em className="cor666">起</em></money>
          <not className="ml15">￥{item.sellprice}</not>
          <span className="btn_a1">起价说明</span>
          <p className="cor666">
            <i className="iconGPS"></i>
	          {item.address}
						<span className="fr cor999 mr10">
							产品编号：xxxx
						</span>
          </p>
        </div>
        <div className="lunboTxt cor999 f12"> *温馨提示：
          <div className="lunbo j_lunbo">
            <div className="not" style={{marginTop: "-33px"}}></div>
            <div style={{marginTop: "0px"}}></div>
          </div>
        </div>
        <ul className="borBotList max btBor">
          <li>
            xxxx
          </li>
        </ul>

        <div className="titGreen btBor mt10">
          <i className="ml"></i>
          门票信息
        </div>
        <div className="topIconTxt bBor">
          <div className="con" style={{maxHeight: "88px"}}>
	          <div dangerouslySetInnerHTML={{__html: item.booknotice}}></div>
          </div>
          <div className="showMore j_showMore"><span>查看更多</span> <i className="iconDown"></i></div>
        </div>

        <div className="titGreen btBor mt10">
          <i className="ml"></i>
          景点资料
        </div>
        <div className="topIconTxt bBor">
          <div className="con" style={{maxHeight: "88px"}}>
	          <div dangerouslySetInnerHTML={{__html: item.content}}></div>
          </div>
          <div className="showMore j_showMore"><span>查看更多</span> <i className="iconDown"></i></div>
        </div>
      </div>
    );
  }
}

export default Hotel;



