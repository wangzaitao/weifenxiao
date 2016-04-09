import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import NoFound from './components/base/NotFound.jsx';
import Home from './components/home/Home.jsx';
import Activity from './components/activity/Activity.jsx';
import PastWinnerRecords from './components/records/PastWinnerRecords.jsx';
import MyNumbers from './components/mynumbers/MyNumbers.jsx';
import CalculateResult from './components/calculate/CalculateResult.jsx';
import ShowList from './components/show/ShowList.jsx';
import ShowDetail from './components/show/ShowDetail.jsx';
import DetailGallery from './components/activity/DetailGallery';
import Cart from './components/cart/Cart';
import UserCenter from './components/usercenter/UserCenter.jsx';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="activity/:id" component={Activity}/>
      <Route path="activity_latest/:gid" component={Activity}/>
      <Route path="records/:gid" component={PastWinnerRecords}/>
      <Route path="numbers/:activityId" component={MyNumbers}/>
      <Route path="calculate/:activityId" component={CalculateResult}/>
      <Route path="activity_show/:gid" component={ShowList}/>
      <Route path="activity_gallery/:id" component={DetailGallery}/>
      <Route path="show" component={ShowList}/>
      <Route path="show/:id" component={ShowDetail}/>
      <Route path="cart" component={Cart} />
      <Route path="uc/:uid" component={UserCenter}/>
      <Route path="unumbers/:activityId/:uid" component={MyNumbers}/>
      <Route path="*" component={NoFound}/>
    </Route>
  </Router>,
  document.getElementById("body-wrapper")
);
