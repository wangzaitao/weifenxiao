import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import Home from './components/common/Home.jsx';
import TravelListPosition from './components/travel/TravelListPosition.jsx';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
    </Route>

	  <Route path="list">
		  <Route path="travel_list_position" component={TravelListPosition}/>
	  </Route>
  </Router>,
  document.getElementById("body-wrapper")
);
