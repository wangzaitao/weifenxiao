import * as I18N from '../utils/i18n';

export const API = {
	DEFAULT_TIMEOUT: 8000,
	HOST: process.env.NODE_ENV == 'production' ? 'http://139.196.39.83:8848/' : 'http://139.196.39.83:8848/',
	Product_Type_LIST: 'api/ptype/getall',
	Product_Category_LIST: 'api/pcategory/getall',
	Product_Category_ByTypeID: 'api/pcategory/getbytypeid',
	Product_Basic_Save: 'api/pproduct/edit',
	PProduct_GET: 'api/pproduct/getbyid?id={%pid%}',
	PProductInfo_GET: 'api/ppdtinfo/getbypdtid?pdtID={%pid%}',
	Product_Price_Save: 'api/pprice/edit',
	Product_Price_Get: 'api/pprice/getbypdtid'
};

export const JOINTYPE = [
	{key: 1, value: "跟团游"},
	{key: 2, value: "自驾游"},
	{key: 3, value: "自助游"}
];

export const ERROR_CODES = {
	1: '网络异常，请稍后再试',
	2: '参数错误',
	3: '未使用https',
	4: '加载数据出错，请重试',
	5: '加载数据出错，请重试',
	101: '用户不存在',
	102: '密码错误',
	103: '验证码错误',
	104: '用户已注册',
	105: '登录信息已过期，请重新登录',
	120: '存在有信账号，需要注册设置登录密码'
};

export const PT_ALIPAY_WAP = 8;
export const PT_WEPAY_WAP = 9;
export const PT_UXIN_WAP = 10;
export const PT_IPAY_WAP = 11;
export const PT_IPAYNOW_WAP = 12;
export const PAY_TYPES = {
	8: {
		name: '支付宝',
		comment: '',
		iconClass: 'pay_ali_icon'
	},
	9: {
		name: '微派支付',
		comment: '',
		iconClass: 'pay_wiipay_icon'
	},
	10: {
		name: '支付宝',
		comment: '',
		iconClass: 'pay_ali_icon'
	},
	11: {
		name: '爱贝支付',
		comment: '支付宝，微信，银联',
		iconClass: 'pay_iapppay_icon'
	},
	12: {
		name: '现在支付',
		comment: '微信，银联。单笔限额500',
		iconClass: 'pay_now_icon'
	}
};
export const IPAY_REDIRECT_URL = 'https://web.iapppay.com/h5/exbegpay?transdata={%trans_data%}&sign={%sign_string%}&signtype={%sign_type%}';

export const MY_NUMBERS_DEFAULT_PAGE_SIZE = 1000;

export const CHANNELS = {
	YOUXIN: 'youxin'
};

export const HEADERS = {
	'^home$': {
		title: I18N.t('title'),
		leftIconClass: 'icon_notice_default',
		leftIconUrl: '/user/notification',
		leftIsOuterURL: true,
		rightIconClass: 'tab_user_default',
		rightIconUrl: '/user',
		rightIsOuterURL: true,
		headerStyle: {position: 'relative'}
	},
	'^activity\/(\\S+)/?$': {
		title: '商品详情',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/',
		leftIsOuterURL: false,
		headerStyle: {zIndex: 15}
	},
	'^activity_latest\/(\\d+)/?$': {
		title: '商品详情',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/',
		leftIsOuterURL: false,
		headerStyle: {zIndex: 15}
	},
	'^activity_gallery\/(\\S+)/?$': {
		title: '图文详情',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^records\/(\\d+)$/?': {
		title: '往期揭晓',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^numbers\/(\\S+)$/?': {
		title: '我的夺宝号码',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^calculate\/(\\S+)$/?': {
		title: '计算结果',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user/notification/?$': {
		title: '通知',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user/receiver\/(\\S+)/?$': {
		title: '收货人信息',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^activity_show\/(\\d+)/?$': {
		title: '晒单分享',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^show\/(\\d+)/?$': {
		title: '晒单详情',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^cart/?$': {
		title: '清单',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^uc\/(\\d+)/?$': {
		title: '个人中心',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^unumbers\/(\\S+)\/(\\d+)/?$': {
		title: 'Ta的夺宝号码',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user/?$': {
		title: '我的',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/',
		leftIsOuterURL: true,
		rightIconClass: 'icon_settings_default',
		rightIconUrl: '/settings',
		rightIsOuterURL: true
	},
	'^login/?$': {
		title: '用户登录',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back',
		headerStyle: {position: 'relative'}
	},
	'^register/?$': {
		title: '快速注册',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back',
		headerStyle: {position: 'relative'}
	},
	'^forget_password/?$': {
		title: '忘记密码',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back',
		headerStyle: {position: 'relative'}
	},
	'^new_password/?$': {
		title: '忘记密码',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back',
		headerStyle: {position: 'relative'}
	},
	'^user\/profile/?$': {
		title: '个人资料',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user\/charge/?$': {
		title: '充值',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user\/charge_result\/(\\S+)/?$': {
		title: '充值结果'
	},
	'^user\/pay(\/(\\S+)\/(\\d+))?\/?$': {
		title: '支付订单',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user\/pay_result\/((\\S+)\/)?(balance|pay)\/(\\d+)/?$': {
		title: '支付结果',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user\/my_activity_record/?$': {
		title: '夺宝记录',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/user'
	},
	'^user\/my_winner_record/?$': {
		title: '中奖记录',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/user'
	},
	'^user\/my_charge_record/?$': {
		title: '充值记录',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/user'
	},
	'^user\/my_show_record/?$': {
		title: '我的晒单',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/user'
	},
	'^user\/my_coupon/?$': {
		title: '我的红包',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/user',
		rightIconClass: 'icon_prompt_default',
		rightIconUrl: '/coupon_qa',
		rightIsOuterURL: true
	},
	'^user\/my_credit/?$': {
		title: '我的积分',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/user',
		rightIconClass: 'icon_prompt_default',
		rightIconUrl: '/credit_qa',
		rightIsOuterURL: true
	},
	'^user\/credit_details/?$': {
		title: '积分详情',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user\/my_rebate/?$': {
		title: '好友充值返利',
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/user',
		rightIconClass: 'icon_prompt_default',
		rightIconUrl: '/rebate_qa',
		rightIsOuterURL: true
	},
	'^user\/my_rebate_all/?$': {
		title: I18N.t('my_rebate_page_title'),
		leftIconClass: 'icon_back_default',
		leftIconUrl: '/user',
		rightIconClass: 'icon_prompt_default',
		rightIconUrl: '/rebate_qa',
		rightIsOuterURL: true
	},
	'^user\/rebate_details/?$': {
		title: '好友充值返利明细',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user\/more_invites/?$': {
		title: '更多邀请方法',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user\/fill_invited_code/?$': {
		title: I18N.t('fill_invite_code_page_title'),
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user\/my_code/?$': {
		title: '我的返利二维码',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^user\/newbie_task/?$': {
		title: I18N.t('newbie_task_page_title'),
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^settings/?$': {
		title: '帮助',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^guide/?$': {
		title: '新手引导',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^about/?$': {
		title: '关于',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^questions/?$': {
		title: '常见问题',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^protocol/?$': {
		title: '服务协议',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^show/?$': {
		title: '晒单分享',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^discovery\/new_year_coupon/?$': {
		title: '春日红包送不停',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^discovery\/new_year_share_coupon/?$': {
		title: '好友分享抢红包',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back',
		headerStyle: {position: 'relative'}
	},
	'^discovery\/charge_fifty/?$': {
		title: I18N.t('charge_fifty_page_title'),
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^discovery\/wealthy_god/?$': {
		title: '财神指路',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^coupon_qa/?$': {
		title: '红包说明',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^temporary\/charge/?$': {
		title: '充值',
		headerStyle: {position: 'relative'}
	},
	'^temporary\/pay(\/(\\S+)\/(\\d+))?\/?$': {
		title: '支付订单',
		headerStyle: {position: 'relative'}
	},
	'^credit_qa/?$': {
		title: '积分说明',
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	},
	'^rebate_qa/?$': {
		title: I18N.t('rebate_qa_page_title'),
		leftIconClass: 'icon_back_default',
		leftIconUrl: 'go_back'
	}
};

export const DEFAULT_BANNERS = [
	{src: 'http://7xov77.com2.z0.glb.qiniucdn.com/banner_mac.png', link: '/activity_latest/123'},
	{src: 'http://7xov77.com2.z0.glb.qiniucdn.com/banner_guide.png', link: '/about'},
	{src: 'http://7xov77.com2.z0.glb.qiniucdn.com/banner_iphone6s.png', link: '/activity_latest/120'}
];

export const APK = {
	ICON_URL: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuango.png',
	STORE_URL: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.as.treasure.snatch.shop',
	CHANNELS: {
		ofw: 'http://7xox6l.dl1.z0.glb.clouddn.com/1yuan-gou.apk',
		jiangy02: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-jiangy02.apk',
		mm01: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-mm01.apk',
		mm02: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-mm02.apk',
		mm03: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-mm03.apk',
		mm04: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-mm04.apk',
		mm05: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-mm05.apk',
		sinafuyi: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-sinafuyi.apk',
		sinafuyi1: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-sinafuyi1.apk',
		sinafuyi2: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-sinafuyi2.apk',
		sinafuyi3: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-sinafuyi3.apk',
		sinafuyi4: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-sinafuyi4.apk',
		sinafuyi5: 'http://7xox6l.dl1.z0.glb.clouddn.com/yiyuangou-release-sinafuyi5.apk'
	}
};

export const TIMER = {
	second: 1000,
	minute: 1000 * 60,
	hour: 1000 * 60 * 60,
	day: 1000 * 60 * 60 * 24
};
