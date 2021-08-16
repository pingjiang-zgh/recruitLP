function add0(m) {
	return m < 10 ? '0' + m : m
}

function format(shijianchuo=Date.parse(new Date())) {
	//shijianchuo是整数，否则要parseInt转换
	var time = new Date(shijianchuo);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

function getUserInfo(){
	if(localStorage.getItem('userInfo')){
		let userInfo = localStorage.getItem('userInfo')
		userInfo = JSON.parse(userInfo)
		return userInfo
	}
}


export default {
	format,
	getUserInfo,
	sendUserMobile: 'send/sendUserMobile', // 获取短信
	userRegister: 'User/userRegister', // 注册
	userLogin: 'User/userLogin', // 登录
	userPassReset: 'user/userPassReset', // 修改密码
	userQuit: 'user/userQuit', // 退出登录
	getConfig: 'config/getConfig',
	userInfoEdit: 'user/userInfoEdit', // 修改用户信息
	raiseResume: 'user/raiseResume', // 发布简历
	getUserResume: 'user/getUserResume', // 获取邮箱
	userResumeDel:'user/userResumeDel', // 删除简历
	EnpLogin:'Enterprise/login', // 企业登录
	uploadImage:'Upload/uploadImage', // 图片上传
	enterpriseEdit:'Enterprise/enterpriseEdit', // 保存公司信息
	issueInformation: 'Enterprise/issueInformation', // 发布招聘信息
	getInformationList:'Enterprise/getInformationList', // 获取招聘信息列表 
	getInformationDetails:'Enterprise/getInformationDetails', // 获取详情
	informationDel:'Enterprise/informationDel',// 删除招聘信息
	topInformation: 'Enterprise/topInformation', // 置顶
	refreshInformation:'Enterprise/refreshInformation', // 刷新
	index: 'index/index', // 首页推荐
	enpQuit:'Enterprise/Quit', // 企业退出登录
	hotStation:'index/get_hot_class_station' , //获取推荐列表
	searchPosition:'index/seach_station', // 搜索
	stationDetails:'index/stationDetails', // 招聘职位详情
	getStationListById:'index/getStationListById', // 获取公司详情
	setCollection: 'user/userSetCollection', // 收藏
	getCollList:'user/getUserCollectionList', // 获取收藏列表
	cancelColl:'user/userCancelCollection',// 取消收藏
	getUserResumeList:'Enterprise/getUserResumeList', // 获取列表库列表
	getSomeOneResumDetails:'Enterprise/getUserResumeeById',// 获取简历详情
	payOrder:'Enterprise/payOrder', // 开通会员
	getRecordList:'Enterprise/getEnterpriseOrder', // 消费记录
	userInfo:'user/getUserInfo', // 判断用户是否登录
	EnpUserInfo:'Enterprise/getUserInfo', // 判断企业信息
	getPushUserResumee:'Enterprise/getPushUserResumee', // 获取优质人才列表 
	raiseResumeGetById:'user/raiseResumeGetById', // 获取简历详情    
	
}
