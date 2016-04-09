
let LocalStorage = {
  isSupportLocalStorage: function(){
    return !!window.localStorage;
  },

  getItem: function(key){
    let storage = window.localStorage;
    if(storage.getItem(key)){
      return storage.getItem(key);
    }else{
      return null;
    }
  },

  setItem: function(key, value){
    let storage = window.localStorage;
    storage.removeItem(key);
    try{
      storage.setItem(key, value);
      return '';
    }catch(e){
      return 'error';
    }
  },

  removeItem: function(key){
    let storage = window.localStorage;
    storage.removeItem(key);
  }
};

export default LocalStorage;