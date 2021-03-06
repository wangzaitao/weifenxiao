import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import Home from './components/common/Home.jsx';
import TravelList from './components/travel/TravelList.jsx';
import Travel from './components/travel/Travel.jsx';
import Target from './components/travel/Target.jsx';
import TravelContentList from './components/travel/TravelContentList.jsx';
import HotelList from './components/hotel/HotelList.jsx';
import Hotel from './components/hotel/Hotel.jsx';
import SightList from './components/sight/SightList.jsx';
import Sight from './components/sight/Sight.jsx';
import ArticleList from './components/article/ArticleList.jsx';
import Article from './components/article/Article.jsx';
import NotesList from './components/notes/NotesList.jsx';
import Notes from './components/notes/Notes.jsx';

import User from './components/user/User.jsx';
import Address from './components/user/Address.jsx';
import AddAddress from './components/user/AddAddress.jsx';
import Fenxiao from './components/user/Fenxiao.jsx';
import Profile from './components/user/Profile.jsx';
import Erweima from './components/user/Erweima.jsx';

injectTapEventPlugin();

ReactDOM.render(
	<Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
		</Route>

		<Route path="travel">
			<Route path="list" component={TravelList}/>
			<Route path="show/:id" component={Travel}/>
			<Route path="show/:id/content_list" component={TravelContentList}/>
			<Route path="target" component={Target}/>
		</Route>

		<Route path="hotel">
			<Route path="list" component={HotelList}/>
			<Route path="show/:id" component={Hotel}/>
		</Route>

		<Route path="sight">
			<Route path="list" component={SightList}/>
			<Route path="show/:id" component={Sight}/>
		</Route>

		<Route path="article">
			<Route path="list" component={ArticleList}/>
			<Route path="show/:id" component={Article}/>
		</Route>

		<Route path="notes">
			<Route path="list" component={NotesList}/>
			<Route path="show/:id" component={Notes}/>
		</Route>

		<Route path="user">
			<IndexRoute component={User}/>
			<Route path="address" component={Address}/>
			<Route path="add_address" component={AddAddress} />
			<Route path="fenxiao" component={Fenxiao} />
			<Route path="profile" component={Profile} />
			<Route path="erweima" component={Erweima} />
		</Route>
	</Router>,
	document.getElementById("body-wrapper")
);
