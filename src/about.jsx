import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import Home from './components/home/Home.jsx';
import NoFound from './components/base/NotFound.jsx';
import Settings from './components/about/Settings.jsx';
import UserGuide from './components/about/UserGuide.jsx';
import AboutUs from './components/about/AboutUs.jsx';
import UserProtocol from './components/about/UserProtocol.jsx';
import CommonQuestions from './components/about/CommonQuestions.jsx';
import CouponQA from './components/about/CouponQA.jsx';
import CreditQA from './components/about/CreditQA.jsx';
import RebateQA from './components/about/RebateQA.jsx';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="settings" component={Settings}/>
      <Route path="guide" component={UserGuide}/>
      <Route path="about" component={AboutUs}/>
      <Route path="protocol" component={UserProtocol}/>
      <Route path="questions" component={CommonQuestions}/>
      <Route path="coupon_qa" component={CouponQA}/>
      <Route path="credit_qa" component={CreditQA}/>
      <Route path="rebate_qa" component={RebateQA} />
      <Route path="*" component={NoFound}/>
    </Route>
  </Router>,
  document.getElementById("body-wrapper")
);
