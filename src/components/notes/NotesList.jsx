import React from 'react';
import TravelNav from './../travel/TravelNav';
import * as ContentAPI from './../../api/content';
import CustomLink from './../common/CustomLink.jsx';

require('./notes.scss');

class NotesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}

	componentWillMount() {
		var data = {
			isDesc: true
		};
		ContentAPI.getAllNotesTj(data).then((res) => {
			this.setState({
				list: res
			});
		});
	}

	render() {
		let props = this.props;

		var listDom;
		listDom = this.state.list.map((item, index) => {
			return (
				<CustomLink to={"/notes/show/"+item.id} className="hotel_item" style={{display:"block",position:"relative",marginLeft:"1em",lineHeight:"3em"}}>
					{index+1}. {item.title}
				</CustomLink>
			);
		});

		return (
			<div className="tlp">
				<TravelNav name="游记"/>

				<div className="more-des-m m_4th">
					<p>热门游记</p>
				</div>
				<div className="hotel-list">
					{listDom}
				</div>

			</div>
		);
	}
}

export default NotesList;



