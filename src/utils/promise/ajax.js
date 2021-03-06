var Promise = require('promise');

export default function(options){
  if(!options.url){
    return Promise.reject(new Error("[Parameter Error] url is none"));
  }
  var settings = {
    type: 'GET',
    data: null,
	  async: true
  };
  $.extend(settings, options);
  return new Promise((resolve, reject) => {
    $.ajax({
      type: settings.type,
      url: settings.url,
      data: settings.data,
	    contentType:settings.contentType,
	    async: settings.async,
      headers: settings.headers,
      success: function(responseText){
        resolve(responseText);
      },
      error: function(xhr, type){
        reject({
          xhr: xhr,
          type: type
        });
      }
    })
  });
}