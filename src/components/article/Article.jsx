import React from 'react';
import TravelNav from './../travel/TravelNav';
import * as ContentAPI from './../../api/content';
import LocalStorage from '../../utils/localStorage';
import {KINDLISTNAME} from '../../constants/Config';

require('./../travel/travel.scss');
require('./article.scss');

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      obj: {},
      erweima: LocalStorage.getItem("erweima") || ""
    };
  }

  componentWillMount() {
    var id = this.props.params.id;
    ContentAPI.getArticleById(id).then((res) => {
      this.setState({
        obj: res
      });
    });
  }

  _formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return "2016" + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
  }


  render() {
    let props = this.props;
    let item = this.state.obj;

    return (
      <div className="tlp">
        <TravelNav name="文章详情"/>
        <div style={{padding:"1em"}}>
          <div className="txt_center">
            {item.title}
          </div>
          <div className="fr">
            {this._formatDate(new Date(item.modtime))}
          </div>
          <div>类别：{KINDLISTNAME[item.kindlist]}</div>
          <div>
            <img src={this.state.erweima} style={{width:"50%"}}/>
          </div>
          <div dangerouslySetInnerHTML={{__html: item.content}}></div>
        </div>
      </div>
    );
  }
}

export default Article;



