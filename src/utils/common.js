export function endWith (thisStr, str){
  if(str === null || str === "" || thisStr.length === 0 || str.length > thisStr.length) return false;
  return thisStr.substr(thisStr.length - str.length) === str;
}

export function startWith (thisStr, str) {
  if(str === null || str === "" || thisStr.length === 0 || str.length > thisStr.length) return false;
  return thisStr.substr(0, str.length) === str;
}

export function isIntNumber (str) {
  return !(str === null || str === "" || isNaN(str) || endWith(str, ' ') || endWith(str, '.'));
}

export function isPhoneNumber (str) {
  return !(str === null || str === "" || str.length != 11 || !startWith(str, '1'));
}

export function addCookie (name, value, expires) {
  var d = new Date(), domain = window.location.hostname.replace('www.', '');
  d.setTime(d.getTime() + (expires * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + encodeURIComponent(value) + ";Path=/;domain=" + domain + ";expires=" + d.toGMTString();
}
export function getCookie (name) {
  var parts = ("; " + document.cookie).split("; " + name + "=");
  return parts.length >= 2 ? parts.pop().split(";").shift() : '';
}
export function deleteCookie (name) {
  var domain = window.location.hostname.replace('www.', '');
  document.cookie = name + "=;domain=" + domain + ";Path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0";
}

export function parseCommand (command) {
  if (!command || command.indexOf('#') === -1) return null;
  var infos = command.split('#'), cmd = infos.shift(), param = infos.join('#');
  return {
    0: '/',  // show index page
    1: '/user/notification',  // show notification page
    2: '/activity/' + param,  // show detail page
    3: '/user/my_winner_record',  // show user win records page
    4: '/user',  // show user profile page
    5: '/register',  // show register page
    6: '/login',  // show login page
    7: '/activity_latest/' + param,  // show latest term detail page
    10: '/user/my_show_record',  // user show page
    11: param,  // open url
    12: '/about',  // open about/FAQ page
    13: '/show',  // open show list page
    15: '/guide',  // open user guide page
    18: '/credit_qa?show=1',  // open credit qa page
    19: '/user/rebate_details'  // open rebate detail page
  }[cmd];
}
