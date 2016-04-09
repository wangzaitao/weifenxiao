import * as ContentAPI from '../../api/content';
import LS from '../../utils/localStorage';
import BC from '../../utils/broadcast';

const CART_KEY = '1yuan-cart';

export function saveCartFromLocal(){
  let localCartList, processedList;
  localCartList = LS.getItem(CART_KEY);
  if(localCartList){
    try{
      localCartList = JSON.parse(localCartList);
      processedList = prepareCartList(localCartList);
      ContentAPI
        .editCart(processedList)
        .then(res => {
          LS.removeItem(CART_KEY);
          BC.notify('cart:updateNum');
        });
    }catch(e){
      console.log('save cart failed!');
    }
  }

}

export function prepareCartList(cartList){
  var item,
    processedList = [];
  for(var i=0,l=cartList.length; i<l; i++){
    item = cartList[i];
    processedList.push({
      activity_id: item.lite.id,
      quantity: item.quantity
    });
  }
  return processedList;
}