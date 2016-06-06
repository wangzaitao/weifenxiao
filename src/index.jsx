import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import Home from './components/common/Home.jsx';
import TravelList from './components/travel/TravelList.jsx';
import Travel from './components/travel/Travel.jsx';
import Target from './components/travel/Target.jsx';

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
	</Router>,
	document.getElementById("body-wrapper")
);