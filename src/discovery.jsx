import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import Home from './components/home/Home.jsx';
import NoFound from './components/base/NotFound.jsx';
import RechargeCoupon from './components/discovery/RechargeCoupon';
import ShareCoupon from './components/discovery/ShareCoupon';
import GroupCoupon from './components/discovery/GroupCoupon';
import ChargeFifty from './components/discovery/ChargeFifty.jsx';
import WealthyGod from './components/discovery/WealthyGod.jsx';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="discovery/new_year_coupon" component={RechargeCoupon}/>
      <Route path="discovery/new_year_share_coupon" component={ShareCoupon}/>
      <Route path="discovery/group_coupon/:group_coupon_id" component={GroupCoupon}/>
      <Route path="discovery/charge_fifty" component={ChargeFifty}/>
      <Route path="discovery/wealthy_god" component={WealthyGod} />
      <Route path="*" component={NoFound}/>
    </Route>
  </Router>,
  document.getElementById("body-wrapper")
);