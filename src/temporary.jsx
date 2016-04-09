import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import NoFound from './components/base/NotFound.jsx';
import Home from './components/home/Home.jsx';
import TempCharge from './components/temporary/TempCharge.jsx';
import TempPay from './components/temporary/TempPay.jsx';
import TempChargeResult from './components/temporary/TempChargeResult.jsx';
import TempPayResult from './components/temporary/TempPayResult.jsx';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="temporary/charge" component={TempCharge}/>
      <Route path="temporary/pay(/:activityId/:amount)" component={TempPay}/>
      <Route path="temporary/charge_result/:payId" component={TempChargeResult}/>
      <Route path="temporary/pay_result(/:activityId)/pay/:payId"component={TempPayResult}/>
      <Route path="temporary/pay_result(/:activityId)/balance/:amount" component={TempPayResult}/>
      <Route path="*" component={NoFound}/>
    </Route>
  </Router>,
  document.getElementById("body-wrapper")
);
