import React from 'react';
import TravelNav from './../travel/TravelNav';
import * as ContentAPI from './../../api/content';
import CustomLink from './../common/CustomLink.jsx';

require('./../travel/travel.scss');
require('./article.scss');

class Article extends React.Component {
  constructor(props) {
    super(props);
	  this.state = {
		  id : this.props.params.id,
		  obj: {}
	  };
  }

	componentWillMount() {
		var id = this.props.params.id;
		ContentAPI.getArticleById(id).then((res) => {
      debugger;
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
        <TravelNav name="文章详情"/>
        <div style={{padding:"1em"}}>
          <div className="txt_center">
            {item.title}
          </div>
          <div className="fr">
            {item.modtime}
          </div>
          <div>kindlist：{item.kindlist}</div>
          <div dangerouslySetInnerHTML={{__html: item.content}}></div>
        </div>
      </div>
    );
  }
}

export default Article;



