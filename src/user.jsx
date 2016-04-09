import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App.jsx';
import Home from './components/home/Home.jsx';
import NoFound from './components/base/NotFound.jsx';
import UserIndex from './components/user/UserIndex.jsx';
import User from './components/user/User.jsx';
import Pay from './components/user/Pay.jsx';
import PayResult from './components/user/PayResult.jsx';
import Charge from './components/user/Charge.jsx';
import ChargeResult from './components/user/ChargeResult.jsx';
import Login from './components/user/Login.jsx';
import Register from './components/user/Register.jsx';
import ForgetPassword from './components/user/ForgetPassword.jsx';
import NewPassword from './components/user/NewPassword.jsx';
import Profile from './components/user/Profile.jsx';
import MyActivityRecord from './components/user/MyActivityRecord.jsx';
import MyWinnerRecord from './components/user/MyWinnerRecord.jsx';
import MyChargeRecord from './components/user/MyChargeRecord.jsx';
import MyShowRecord from './components/user/MyShowRecord.jsx';
import Notification from './components/notification/Notification.jsx';
import ReceiverInfo from './components/receiver/ReceiverInfo.jsx';
import MyCoupon from './components/user/MyCoupon.jsx';
import MyCredit from './components/user/MyCredit.jsx';
import MyCreditList from './components/user/MyCreditList.jsx';
import MyRebate from './components/user/rebate/MyRebate.jsx';
import MyRebateALL from './components/user/rebate/MyRebateALL.jsx';
import MoreInvites from './components/user/rebate/MoreInvites.jsx';
import MyRebateList from './components/user/rebate/MyRebateList.jsx';
import FillInvitedCode from './components/user/rebate/FillInvitedCode.jsx';
import MyCode from './components/user/rebate/MyCode.jsx';
import NewbieTask from './components/user/NewbieTask.jsx';
import Auth from './api/auth';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="login" component={Login} onEnter={Auth.alreadyLogin}/>
      <Route path="register" component={Register}/>
      <Route path="forget_password" component={ForgetPassword}/>
      <Route path="new_password" component={NewPassword}/>
      <Route path="user" component={UserIndex} onEnter={Auth.requireAuth}>
        <IndexRoute component={User}/>
        <Route path="profile" component={Profile}/>
        <Route path="charge" component={Charge}/>
        <Route path="charge_result/:payId" component={ChargeResult}/>
        <Route path="pay(/:activityId/:amount)" component={Pay}/>
        <Route path="pay_result(/:activityId)/pay/:payId" component={PayResult}/>
        <Route path="pay_result(/:activityId)/balance/:amount" component={PayResult}/>
        <Route path="my_activity_record" component={MyActivityRecord}/>
        <Route path="my_winner_record" component={MyWinnerRecord}/>
        <Route path="my_charge_record" component={MyChargeRecord}/>
        <Route path="my_show_record" component={MyShowRecord}/>
        <Route path="notification" component={Notification}/>
        <Route path="receiver/:orderId" component={ReceiverInfo}/>
        <Route path="my_coupon" component={MyCoupon}/>
        <Route path="my_credit" component={MyCredit}/>
        <Route path="credit_details" component={MyCreditList}/>
        <Route path="my_rebate" component={MyRebate} />
        <Route path="my_rebate_all" component={MyRebateALL} />
        <Route path="more_invites" component={MoreInvites} />
        <Route path="rebate_details" component={MyRebateList}/>
        <Route path="fill_invited_code" component={FillInvitedCode} />
        <Route path="my_code" component={MyCode} />
        <Route path="newbie_task" component={NewbieTask} />
      </Route>
      <Route path="*" component={NoFound}/>
    </Route>
  </Router>,
  document.getElementById("body-wrapper")
);
