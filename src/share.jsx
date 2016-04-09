import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import Home from './components/home/Home.jsx';
import NoFound from './components/base/NotFound.jsx';
import ShareApp from './components/share/ShareApp.jsx';
import DownloadApp from './components/share/DownloadApp.jsx';
import ShareDetail from './components/share/ShareDetail.jsx';
import ShareWinnerRecord from './components/share/ShareWinnerRecord.jsx';
import LuckyTurntable from './components/share/LuckyTurntable.jsx';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="download" component={DownloadApp}/>
      <Route path="lucky_turntable" component={LuckyTurntable}/>
      <Route path="share_app" component={ShareApp}/>
      <Route path="share_detail/:activityId" component={ShareDetail}/>
      <Route path="share_record/:activityId" component={ShareWinnerRecord}/>
      <Route path="*" component={NoFound}/>
    </Route>
  </Router>,
  document.getElementById("body-wrapper")
);
