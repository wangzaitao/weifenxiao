var attach, attachFunctionList, detach, notify, processFunction;
attachFunctionList = {};
attach = function(notifyName, callback, options) {
  var _temp, opt;
  opt = options || {};
  if (typeof notifyName === 'string' && typeof callback === 'function') {
    _temp = processFunction(notifyName);
    if (!_temp) {
      attachFunctionList[notifyName] = [];
    }
    return processFunction(notifyName).push({
      fun: callback,
      scope: opt.scope,
      isAsync: opt.isAsync
    });
  }
};
detach = function(notifyName, callback) {
  if (typeof notifyName !== 'string') {
    return;
  }
  if (typeof callback === 'function') {
    return processFunction(notifyName, callback, true);
  } else {
    return processFunction(notifyName, true);
  }
};
notify = function(notifyName) {
  var args, funs, i, len, len1, results, temp;
  funs = processFunction(notifyName) || [];
  len = funs.length;
  if (len === 0) {
    return;
  }
  args = Array.prototype.slice.call(arguments, 1);
  results = [];
  for (i = 0, len1 = funs.length; i < len1; i++) {
    temp = funs[i];
    if (temp.isAsync) {
      results.push((function(t) {
        return setTimeout(function() {
          return t.fun.apply(t.scope, args);
        }, 0);
      })(temp));
    } else {
      results.push(temp.fun.apply(temp.scope, args));
    }
  }
  return results;
};
processFunction = function(notifyName, callback, isDel) {
  var len;
  if (typeof notifyName === 'string') {
    if (typeof callback === 'function') {
      len = (attachFunctionList[notifyName] || []).length;
      while (len--) {
        if (attachFunctionList[notifyName][len].fun === callback) {
          if (isDel === true) {
            attachFunctionList[notifyName].splice(len, 1);
          } else {
            return attachFunctionList[notifyName][len];
          }
        }
      }
    } else {
      isDel = !!callback;
      if (isDel === true) {
        delete attachFunctionList[notifyName];
      } else {
        return attachFunctionList[notifyName];
      }
    }
  }
  return null;
};
export default {
  on: attach,
  off: detach,
  attach: attach,
  detach: detach,
  notify: notify
};