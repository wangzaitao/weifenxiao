export const SUPPORT_LANG = ['zh-cn', 'vi-vn'];

var lang = window.navigator.language.toLowerCase();
lang = SUPPORT_LANG.indexOf(lang) == -1 ? 'zh-cn' : lang;

export const LOCALE = {
  lang: lang,
  code: lang.split('-')[1]
};
const TRANS_DATA = require('../constants/locales/' + lang + '.json');

export function t (key) {
  if (typeof key != 'string') {
    throw new Error('[utils/i18n] Type Error: i18n.t function need passed in a string! ' + key);
  }

  if (Object.keys(TRANS_DATA).length == 0) {
    return key;
  } else {
    return TRANS_DATA[key] != null ? TRANS_DATA[key] : key;
  }
}

var pluraliseRules = function (n) {
  return (n === 0 || n === 1) ? n : 2;
};
export function p(q, n) {
  var idx = pluraliseRules(n);
  if (TRANS_DATA && TRANS_DATA[q] && TRANS_DATA[q][idx]) {
    return TRANS_DATA[q][idx].replace('%n', n);
  } else {
    return '';
  }
}

export function ts (keys) {
  if (!keys || !Array.isArray(keys) || keys.length == 0) {
    throw new Error('[utils/i18n] Type Error: i18n.ts function need passed in a array of keys! ' + keys);
  }
  return keys.reduce(function (m, key) {
    m[key] = t(key);
    return m;
  }, {});
}
