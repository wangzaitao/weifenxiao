import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import Home from './components/common/Home.jsx';
import TravelList from './components/travel/TravelList.jsx';
import Travel from './components/travel/Travel.jsx';
import Target from './components/travel/Target.jsx';
import HotelList from './components/hotel/HotelList.jsx';
import Hotel from './components/hotel/Hotel.jsx';
import SightList from './components/sight/SightList.jsx';
import Sight from './components/sight/Sight.jsx';

injectTapEventPlugin();

ReactDOM.render(
	<Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
		</Route>

		<Route path="travel">
			<Route path="list" component={TravelList}/>
			<Route path="show/:id" component={Travel}/>
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
	</Router>,
	document.getElementById("body-wrapper")
);