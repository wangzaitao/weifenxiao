var cache = {};

/**
 * 根据url缓存其对应的result
 * @param {[type]} url    [description]
 * @param {[type]} result [description]
 */
function set(url, result){
  if(arguments.length < 2){
    throw new Error('Set function expect two parameters at least');
  }
  cache[url] = result;
}

function get(url){
  return cache[url] || null;
}

export default {
  set: set,
  get: get
}