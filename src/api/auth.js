import * as ContentAPI from '../api/content';
import {addCookie, deleteCookie} from '../utils/common';

function _updateLocalData (data) {
  addCookie('P_INFO', [data.token, data.id, data.phone, data.avatar_id || '',
    data.balance.toString(), data.country, data.email, data.nick_name, data.inviter_id || ''].join('|'), 30);
  if (window.G) {
    G.token = data.token;
    G.userID = data.id;
    G.phone = data.phone;
    G.avatar = data.avatar_id || '';
    G.balance = parseInt(data.balance);
    G.country = data.country;
    G.email = data.email;
    G.nickname = data.nick_name;
    G.inviterID = data.inviter_id || '';
  }
}

export default {
  login(email, pass, cb) {
    if (G.token) {
      if (cb) cb(true);
      return;
    }
    ContentAPI.login(email, pass, function (authenticated, data) {
      if (authenticated) _updateLocalData(data);
      if (cb) cb(authenticated, data);
    })
  },
  uxinLogin(pnum, timestamp, uid, cb) {
    var data = {pnum: pnum, ts: timestamp, uid: uid};
    ContentAPI.uxinLogin(data, function (authenticated, data) {
      if (authenticated) _updateLocalData(data);
      if (cb) cb(authenticated, data);
    })
  },
  updateUserInfo (cb) {
    ContentAPI.getUserInfos(function (success, data) {
      if (success) _updateLocalData(data);
      if (cb) cb(success)
    })
  },

  getToken () {
    return G.token || '';
  },
  getUserID () {
    return G.userID || '';
  },
  logout(cb) {
    ContentAPI.logout(function (success, data) {
      window.G = {};
      deleteCookie('P_INFO');
      if (cb) cb(success, data);
    });
  },
  isLoggedIn () {
    return !!G.token;
  },
  alreadyLogin (nextState, replace) {
    if (G.token)
      replace({pathname: '/user', state: {nextPathname: nextState.location.pathname}})
  },
  requireAuth (nextState, replace) {
    if (window.yyg && window.yyg.getUserInfo) {
      var userInfo = window.yyg.getUserInfo();
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        G.token = userInfo.token;
        G.userID = userInfo.userID;
        G.avatar = userInfo.avatar || '';
        G.nickname = userInfo.nickname;
      } else {
        window.yyg.executeCommand('6#', '')
      }
    }
    if (!G.token)
      replace({pathname: '/login', state: {nextPathname: nextState.location.pathname}})
  }
};
