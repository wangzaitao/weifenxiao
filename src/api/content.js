/**
 * server api functions.
 *
 * Created by xianglong on 12/10/15.
 */
import * as GlobalConfig from '../constants/Config';
import Auth from './auth';
import promiseAjax from '../utils/promise/ajax';

// set ajax default timeout
$.ajaxSettings = $.extend($.ajaxSettings, {
	timeout: GlobalConfig.API.DEFAULT_TIMEOUT
});

export function getProductList() {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_List_GET;
	return promiseAjax({
		url: url
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return [];
		});
}

export function getProductType() {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Type_LIST;
	return promiseAjax({
		url: url
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return [];
		});
}

export function getProductCategory() {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Category_LIST;
	return promiseAjax({
		url: url
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return [];
		});
}

export function getCategoryByTypeID(data) {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Category_ByTypeID;
	return promiseAjax({
		url: url,
		data: data,
		async:false
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return [];
		});
}

export function getProduct(pid) {
	var url= (GlobalConfig.API.HOST + GlobalConfig.API.PProduct_GET).replace('{%pid%}', pid);
	return promiseAjax({
		url: url
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return [];
		});
}

export function getProductInfo(pid) {
	var url= (GlobalConfig.API.HOST + GlobalConfig.API.PProductInfo_GET).replace('{%pid%}', pid);
	return promiseAjax({
		url: url
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return [];
		});
}

export function saveProductBasic(data) {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Basic_Save;
	return promiseAjax({
		url: url,
		type: 'POST',
		data: data
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return "";
		});
}

export function saveProductPrice(data) {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Price_Save;
	return promiseAjax({
		url: url,
		type: 'POST',
		contentType:"application/json",
		data: data
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return "";
		});
}

export function saveProductTrip(data) {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Trip_Save;
	return promiseAjax({
		url: url,
		type: 'POST',
		data: data
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return "";
		});
}

export function saveProductHotel(data) {
  var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Hotel_Save;
  return promiseAjax({
    url: url,
    type: 'POST',
    data: data
  })
    .then((res) => {
      return res;
    })
    .catch(() => {
      return "";
    });
}

export function saveProductSight(data) {
  var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Sight_Save;
  return promiseAjax({
    url: url,
    type: 'POST',
    data: data
  })
    .then((res) => {
      return res;
    })
    .catch(() => {
      return "";
    });
}

export function saveProductCar(data) {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Car_Save;
	return promiseAjax({
		url: url,
		type: 'POST',
		data: data
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return "";
		});
}

export function getPriceByProductID(data) {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.Product_Price_GET;
	return promiseAjax({
		url: url,
		data: data,
		async:false
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return [];
		});
}

export function getPdtInfo(pid) {
	var url= (GlobalConfig.API.HOST + GlobalConfig.API.Product_PPDTINFO_GET).replace('{%pid%}', pid);
	return promiseAjax({
		url: url
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return [];
		});
}

export function getRoute(pid) {
	var url= (GlobalConfig.API.HOST + GlobalConfig.API.Product_PROUTE_GET).replace('{%pid%}', pid);
	return promiseAjax({
		url: url
	})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return [];
		});
}

export function submitUserInfo(orderId, userData, callback) {
	var submitUserInfoURL = (GlobalConfig.API.HOST + GlobalConfig.API.SUBMIT_USER_INFO).replace('{%order_id%}', orderId);
	$.ajax({
		url: submitUserInfoURL,
		type: 'POST',
		data: userData,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(true, "提交收货信息成功!")
			} else {
				callback(false, GlobalConfig.ERROR_CODES[result.status] || "网络异常, 请稍后再试")
			}
		},
		error: function (result) {
			var jsonResult = JSON.parse(result.responseText);
			callback(false, GlobalConfig.ERROR_CODES[jsonResult.status] || "网络异常, 请稍后再试")
		}
	});
}

export function dealReceived(orderId, callback) {
	var dealReceivedURL = (GlobalConfig.API.HOST + GlobalConfig.API.DEAL_RECEIVED).replace('{%order_id%}', orderId);
	$.ajax({
		url: dealReceivedURL,
		type: 'POST',
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(true, "确认收货成功!")
			} else {
				callback(false, GlobalConfig.ERROR_CODES[result.status] || "网络异常, 请稍后再试")
			}
		},
		error: function (result) {
			var jsonResult = JSON.parse(result.responseText);
			callback(false, GlobalConfig.ERROR_CODES[jsonResult.status] || "网络异常, 请稍后再试")
		}
	});
}

export function getMyChargeRecords(data, callback) {
	data['type'] = 3;
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.MY_CHARGE_RECORDS,
		type: 'GET',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status === 0) {
				callback(result.data.list, result.data.total_count)
			} else {
				callback([], 0)
			}
		},
		error: function () {
			callback([], 0)
		}
	});
}

export function getMyActivityRecords(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.MY_ACTIVITY_RECORDS,
		type: 'GET',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status === 0) {
				callback(result.data.list, result.data.total_count)
			} else {
				callback([], 0)
			}
		},
		error: function () {
			callback([], 0)
		}
	});
}

export function getUserActivityRecords(userId, data, callback) {
	var userActivityRecordUrl = (GlobalConfig.API.HOST + GlobalConfig.API.USER_ACTIVITY_RECORDS).replace('{%user_id%}', userId);
	$.ajax({
		url: userActivityRecordUrl,
		type: 'GET',
		data: data,
		success: function (result) {
			if (result.status === 0) {
				callback(result.data.list, result.data.total_count)
			} else {
				callback([], 0)
			}
		},
		error: function () {
			callback([], 0)
		}
	});
}

export function getMyShowRecords(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.MY_SHOW_RECORDS,
		type: 'GET',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status === 0) {
				var showList = result.data.list.map(function (item) {
					return {
						id: item.id,
						status: item.status,
						showTime: item.show_time,
						name: item.goods.name,
						cover: item.goods.cover,
						content: item.content,
						images: item.images ? item.images.split(',') : []
					}
				});
				callback(showList)
			} else {
				callback([])
			}
		},
		error: function () {
			callback([])
		}
	});
}

export function getUserShowRecords(userId, data, callback) {
	var userShowRecordUrl = (GlobalConfig.API.HOST + GlobalConfig.API.USER_SHOW_RECORDS).replace('{%user_id%}', userId);
	$.ajax({
		url: userShowRecordUrl,
		type: 'GET',
		data: data,
		success: function (result) {
			if (result.status === 0) {
				var showList = result.data.list.map(function (item) {
					return {
						id: item.id,
						showTime: item.show_time,
						title: item.title,
						content: item.content,
						images: item.images.split(','),
						winner: item.winner,
						verifiedTime: item.verified_at
					}
				});
				callback(showList)
			} else {
				callback([])
			}
		},
		error: function () {
			callback([])
		}
	});
}

export function getMyCredit(callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.MY_CREDIT,
		type: 'GET',
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(result.data)
			} else {
				callback({})
			}
		},
		error: function () {
			callback({})
		}
	});
}

export function getCreditRecords(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.CREDIT_RECORDS,
		type: 'GET',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(result.data.list, result.data.total_count)
			} else {
				callback([], 0)
			}
		},
		error: function () {
			callback([], 0)
		}
	});
}

export function exchangeMyCredit(callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.EXCHANGE_CREDIT,
		type: 'POST',
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(result.data)
			} else {
				callback({})
			}
		},
		error: function () {
			callback({})
		}
	});
}

export function checkCreditSign(callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.CHECK_SIGN,
		type: 'POST',
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(result.data)
			} else {
				callback({})
			}
		},
		error: function () {
			callback({})
		}
	});
}

export function checkCreditShare(callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.CHECK_SHARE,
		type: 'POST',
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(result.data)
			} else {
				callback({})
			}
		},
		error: function () {
			callback({})
		}
	});
}

export function getSMSCode(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.GET_SMS_CODE,
		type: 'GET',
		data: data,
		success: function (result) {
			if (result.status === 0) {
				callback(true, "短信已发送, 请查收", result.data && result.data.image)
			} else {
				callback(false, GlobalConfig.ERROR_CODES[result.status] || "网络异常, 请稍后再试", false)
			}
		},
		error: function (result) {
			var jsonResult = JSON.parse(result.responseText);
			callback(false, GlobalConfig.ERROR_CODES[jsonResult.status] || "网络异常, 请稍后再试", false)
		}
	});
}

export function verifySMSCode(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.VERIFY_SMS_CODE,
		type: 'POST',
		data: data,
		success: function (result) {
			if (result.status === 0) {
				callback(true)
			} else {
				callback(false)
			}
		},
		error: function () {
			callback(false)
		}
	});
}

export function verifyImgCode(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.VERIFY_IMG_CODE,
		type: 'POST',
		data: data,
		success: function (result) {
			if (result.status === 0) {
				callback(true)
			} else {
				callback(false)
			}
		},
		error: function () {
			callback(false)
		}
	});
}

export function register(data, callback) {
	var lang = window.navigator.language.split('-'),
		params = '[aid:],[code:' + lang[1] + '],[lan:' + lang[0] + '],[svc:0],[svn:],[cvn:],[cvc:0],[chn:' + G.chn + ']';
	$.ajax({
		url: (GlobalConfig.API.HOST + GlobalConfig.API.REGISTER) + "?p=" + encodeURIComponent(params),
		type: 'POST',
		data: data,
		success: function (result) {
			if (result.status === 0) {
				callback(true, '')
			} else {
				callback(false, GlobalConfig.ERROR_CODES[result.status] || "网络异常, 请稍后再试")
			}
		},
		error: function (result) {
			var jsonResult = JSON.parse(result.responseText);
			callback(false, GlobalConfig.ERROR_CODES[jsonResult.status] || "网络异常, 请稍后再试")
		}
	});
}

export function login(email, pass, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.LOGIN,
		type: 'POST',
		data: JSON.stringify({'phone': email, 'password': pass}),
		success: function (result) {
			if (result.status === 0) {
				callback(true, result.data)
			} else {
				callback(false, GlobalConfig.ERROR_CODES[result.status] || result.msg)
			}
		},
		error: function (result) {
			var jsonResult = JSON.parse(result.responseText);
			callback(false, GlobalConfig.ERROR_CODES[jsonResult.status] || "网络异常, 请稍后再试")
		}
	});
}

export function logout(callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.LOGOUT,
		type: 'POST',
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status === 0) {
				callback(true, result.data)
			} else {
				callback(false, GlobalConfig.ERROR_CODES[result.status] || result.msg)
			}
		},
		error: function (result) {
			var jsonResult = JSON.parse(result.responseText);
			callback(false, GlobalConfig.ERROR_CODES[jsonResult.status] || "网络异常, 请稍后再试")
		}
	});
}

export function uxinLogin(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.UXIN_LOGIN,
		type: 'POST',
		data: data,
		success: function (result) {
			if (result.status === 0) {
				callback(true, result.data)
			} else {
				callback(false, GlobalConfig.ERROR_CODES[result.status] || result.msg)
			}
		},
		error: function (result) {
			if (result.status == 400 || result.status == 401) {
				callback(false, result.status);
			} else {
				var jsonResult = JSON.parse(result.responseText);
				callback(false, GlobalConfig.ERROR_CODES[jsonResult.status] || "网络异常, 请稍后再试")
			}
		}
	});
}

export function getUserInfos(callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.REGISTER,
		type: 'GET',
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status === 0) {
				callback(true, result.data)
			} else {
				callback(false, result.msg)
			}
		},
		error: function (result) {
			callback(false, result.statusText)
		}
	});
}

export function changePassword(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.REGISTER,
		type: 'PUT',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status === 0) {
				callback(true, "修改密码成功")
			} else {
				callback(false, GlobalConfig.ERROR_CODES[result.status] || "网络异常, 请稍后再试")
			}
		},
		error: function (result) {
			var jsonResult = JSON.parse(result.responseText);
			callback(false, GlobalConfig.ERROR_CODES[jsonResult.status] || "网络异常, 请稍后再试")
		}
	});
}

export function getPayTypes(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.GET_PAY_TYPES,
		type: 'GET',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status === 0) {
				callback(result.data.list)
			} else {
				callback([])
			}
		},
		error: function () {
			callback([])
		}
	});
}

export function getPayID(data, callback) {
	$.ajax({
		url: GlobalConfig.API.HOST + GlobalConfig.API.GET_PAY_ID,
		type: 'POST',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status === 0) {
				callback(result.data.pay_id)
			} else {
				callback('')
			}
		},
		error: function () {
			callback('')
		}
	});
}

export function submitPay(data, callback) {
	var submitPayURL = (GlobalConfig.API.HOST + GlobalConfig.API.SUBMIT_PAY).replace('{%pay_id%}', data['pay_id']);
	$.ajax({
		url: submitPayURL,
		type: 'POST',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status === 0) {
				callback(result.data)
			} else {
				callback({})
			}
		},
		error: function () {
			callback({})
		}
	});
}

export function getPayStatus(payId, callback) {
	var payStatusURL = (GlobalConfig.API.HOST + GlobalConfig.API.PAY_STATUS).replace('{%pay_id%}', payId);
	$.ajax({
		url: payStatusURL,
		type: 'GET',
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(result.data)
			} else {
				callback({})
			}
		},
		error: function () {
			callback({})
		}
	});
}

export function payByBalance(activityId, data, callback) {
	var payByBalanceURL = (GlobalConfig.API.HOST + GlobalConfig.API.PAY_BY_BALANCE).replace('{%activity_id%}', activityId);
	$.ajax({
		url: payByBalanceURL,
		type: 'POST',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(result.data)
			} else {
				callback({})
			}
		},
		error: function () {
			callback({})
		}
	});
}

export function payBatchByBalance(data, callback) {
	var payByBalanceURL = GlobalConfig.API.HOST + GlobalConfig.API.PAY_BATCH_BY_BALANCE;
	$.ajax({
		url: payByBalanceURL,
		type: 'POST',
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		success: function (result) {
			if (result.status == 0) {
				callback(result.data)
			} else {
				callback({})
			}
		},
		error: function () {
			callback({})
		}
	});
}

export function getDiscovery() {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.GET_DISCOVERY;
	return promiseAjax({
		url: url
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data.list;
			} else {
				return [];
			}
		})
		.catch(() => {
			return [];
		});
}

export function getCampaign(campaignId) {
	var url = (GlobalConfig.API.HOST + GlobalConfig.API.CAMPAIGN).replace('{%campaign_id%}', campaignId);
	return promiseAjax({
		url: url,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data;
			} else {
				return {};
			}
		})
		.catch(() => {
			return {};
		});
}

export function refreshWealthyCampaign() {
	const url = GlobalConfig.API.HOST + GlobalConfig.API.REFRESH_WEALTHY_CAMPAIGN;
	return promiseAjax({
		url: url,
		type: 'POST',
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data;
			} else {
				return {};
			}
		})
		.catch(() => {
			return {};
		});
}

export function activateCampaign(campaignId, levelId) {
	var url = (GlobalConfig.API.HOST + GlobalConfig.API.ACTIVATE_CAMPAIGN)
		.replace('{%campaign_id%}', campaignId)
		.replace('{%level_id%}', levelId);
	return promiseAjax({
		type: 'POST',
		url: url,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data;
			} else {
				return {};
			}
		})
		.catch((error) => {
			throw new Error(error.xhr.status);
		});
}

export function snatchGroupCoupon(groupCouponId, phoneNumber) {
	var url = (GlobalConfig.API.HOST + GlobalConfig.API.SNATCH_GROUP_COUPON).replace('{%group_coupon_id%}', groupCouponId);
	return promiseAjax({
		type: 'POST',
		url: url,
		data: {
			'phone': phoneNumber
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data;
			} else {
				return {};
			}
		})
		.catch((error) => {
			throw new Error(error.xhr.status);
		});
}

export function editCart(list) {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.EDIT_CART;
	return promiseAjax({
		type: 'POST',
		url: url,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		data: {
			list: JSON.stringify(list)
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data;
			} else {
				return {};
			}
		})
		.catch((error) => {
			throw new Error(error.xhr.status);
		});
}

export function getCartList() {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.GET_CART_LIST;
	return promiseAjax({
		url: url,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data;
			} else {
				return {};
			}
		})
		.catch((error) => {
			throw new Error(error.xhr.status);
		});
}

export function getTips() {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.TIPS;
	return promiseAjax({
		url: url,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data;
			} else {
				return {};
			}
		})
		.catch((error) => {
			return {};
		});
}

export function getMyRebate() {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.GET_MY_REBATE;
	return promiseAjax({
		url: url,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data;
			} else {
				return {};
			}
		})
		.catch((error) => {
			return {};
		});
}

export function getMyRebateDetail(data) {
	var url = GlobalConfig.API.HOST + GlobalConfig.API.GET_MY_REBATE_DETAIL;
	return promiseAjax({
		url: url,
		data: data,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data.list || []
			} else {
				return [];
			}
		})
		.catch((error) => {
			return [];
		});
}

export function addInviter(inviterId) {
	return promiseAjax({
		type: 'POST',
		url: GlobalConfig.API.HOST + GlobalConfig.API.ADD_INVITER,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		data: {
			uid: inviterId
		}
	})
		.then((res) => {
			return res
		})
		.catch((error) => {
			var jsonResult = JSON.parse(error.xhr.responseText);
			throw new Error(jsonResult.msg, jsonResult.status);
		});
}

export function trackInviter(uid) {
	return promiseAjax({
		type: 'GET',
		url: (GlobalConfig.API.HOST + GlobalConfig.API.TRACK_INVITER),
		data: {uid: uid}
	})
		.then((res) => {
			return res
		})
		.catch((error) => {
			throw new Error(error.xhr.status);
		});
}

export function getMissionStatus(mid) {
	return promiseAjax({
		type: 'GET',
		url: (GlobalConfig.API.HOST + GlobalConfig.API.MISSION_STATUS).replace('{%mission_id%}', mid),
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			return (res.status == 0 ? res.data : {});
		})
		.catch(() => {
			return {};
		});
}

export function activateMission(mid) {
	return promiseAjax({
		type: 'POST',
		url: (GlobalConfig.API.HOST + GlobalConfig.API.ACTIVATE_MISSION).replace('{%mission_id%}', mid),
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			return (res.status == 0);
		})
		.catch(() => {
			return false;
		});
}

export function checkNewbieStepOne(mid) {
	return promiseAjax({
		type: 'GET',
		url: (GlobalConfig.API.HOST + GlobalConfig.API.MISSION_CHECKSTEP).replace('{%mission_id%}', mid),
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			return (res.status == 0);
		})
		.catch(() => {
			return false;
		});
}

export function getRecommendActivitys(scene_id) {
	return promiseAjax({
		type: 'GET',
		url: GlobalConfig.API.HOST + GlobalConfig.API.RECOMMEND_ACTIVITYS,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		},
		data: {scene_id: scene_id}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data.list || [];
			} else {
				return [];
			}
		})
		.catch((error) => {
			return [];
		});
}


export function getScrolling(scene_id) {
	return promiseAjax({
		type: 'GET',
		url: GlobalConfig.API.HOST + GlobalConfig.API.SCROLLING,
		headers: {
			'X-AUTH-USER': Auth.getUserID(),
			'X-AUTH-TOKEN': Auth.getToken()
		}
	})
		.then((res) => {
			if (res.status == 0) {
				return res.data.list || [];
			} else {
				return [];
			}
		})
		.catch((error) => {
			return [];
		});
}




