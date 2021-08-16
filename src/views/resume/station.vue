<template>
	<div class="station-container">
		<div class="station-head">
			<div class="header-box">
				<div class="header-status">招聘中</div>
				<div class="header-tit-box">
					<div class="header-tit">{{stationsInfo.title}}</div>
					<div class="header-price">{{stationsInfo.money}}</div>
				</div>
				<div class="header-tag">
					<div class="header-tag-item">初始</div>
					<div class="header-tag-item">{{stationsInfo.class==1?'挂资质':stationsInfo.class==2?'挂项目':'均可'}}</div>
					<div class="header-tag-item">{{stationsInfo.address}}</div>
				</div>
				<div class="header-btns">
					<div @click="Collection" class="btn">
						<img src="../../assets/image/resume/btn-icon1.png" width="16" height="13">
						<div>感兴趣</div>
					</div>
					<div @click="showPhone" class="btn confirm">立即沟通</div>
				</div>
			</div>
		</div>
		<div class="station-main">
			<div class="station-main-box">
				<div class="box-head">
					<div class="box-head-img">
						<img @click="goCompanyDetails(stationsInfo.enterprise.id)" class="box-head-img" v-if="stationsInfo.enterprise.avatar"
							:src="stationsInfo.enterprise.avatar">
					</div>
					<div class="box-head-user">
						<div class="user-name">{{stationsInfo.username}}</div>
						<div>HRBP 刚刚在线</div>
					</div>
					<div class="induce">
						<div class="title-conpye">
							职位描述
						</div>
						<div v-html="stationsInfo.describe" class="txt_li">
							
						</div>
						<div class="title-conpye">
							公司介绍
						</div>
						<div class="txt_li">{{stationsInfo.enterprise.introduce}}</div>

						<div class="title-conpye">
							工商信息
						</div>
						<div @click="goCompanyDetails(stationsInfo.enterprise.id)" class="txt_li company-name-goDetails">{{stationsInfo.enterprise.name}}</div>
						<div class="txt_li">
							<span class="li_marRightOne">法定代表人： {{stationsInfo.enterprise.representative}}</span>
							<span>注册资金： {{stationsInfo.enterprise.capital}}</span>
						</div>
						<div class="txt_li">
							<span class="li_marRighttwo">企业类型： {{stationsInfo.enterprise.type}}</span> <span>经营状态：
								{{stationsInfo.enterprise.status}}</span>
						</div>
						<div class="txt_li">
							<span class="li_marRightOne">成立日期： {{stationsInfo.enterprise.create_date}}</span>

						</div>
						<div class="txt_li">
							<span class="li_marRightOne">工作地址： {{stationsInfo.enterprise.address}}</span>
						</div>
						<!-- <div class="title-conpye">
							工作地址
						</div> -->
						<!-- <div class="txt_map">
							<div class="txt_map_title">
								{{stationsInfo.enterprise.address}}
							</div>
							<el-amap vid="amap" :zooms='[10,18]' :center='center' :plugin="plugin">
								<el-amap-marker :position='position' :events="events"></el-amap-marker>
							</el-amap>
						</div> -->
					</div>
				</div>
			</div>
			<div  class="station-main-slider">
				<!-- <div v-if='showLogin' class="form-box">
					<div class="form-box-tit">各大行业职位任你选</div>
					<div class="form-input-item">
						<img src="../../assets/image/resume/phone-icon.png" width="13" height="21">
						<input v-model="loginOptions.mobile"  type="text" placeholder="请填写手机号" class="input-box">
					</div>
					<div class="form-input-item">
						<img   src="../../assets/image/resume/message-icon.png" width="18" height="14">
						<div class="code-box">
							<input style="width: 40%;" v-model="loginOptions.code" type="text" placeholder="请填写验证码" class="code-input">
							<div v-show="show" @click="getVerification" slot="suffix" class="code-box-btn">获取验证码</div>
							<div v-show="!show" slot="suffix" class="code-box-btn">{{count+'S'}}</div>
						</div>
					</div>
					<div @click="homeGetLogin" class="form-btn">登录/注册</div>
					<div class="form-desc">同意《用户协议》《个人隐私保护》</div>
				</div> -->
				<div class="resume-list">
					<div class="resume-list-tit">在招职位</div>
					<div @click="goSelf(item.id)" class="resume-list-item" v-for="(item,index) of stationList" :key="item.id">
						<div class="item-tit">{{item.title}}</div>
						<div class="item-tag">
							<div class="item-tag-item">{{item.address}}</div>
							<div class="item-tag-item">{{item.desc}}</div>
							<div class="item-tag-item">{{item.class==1?'挂资质':item.class==2?"挂项目":'均可'}}</div>
						</div>
						<div class="item-price">{{item.money}}</div>
					</div>
				</div>
			</div>
		</div>


		<el-dialog title="简历选择" :visible.sync="dialogVisible" width="30%">
			<el-select  v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id">
				</el-option>
			</el-select>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="choiseColl">确 定</el-button>
			</span>
		</el-dialog>
		
		
		
		<el-dialog title="查看联系方式" :visible.sync="phonedialogVisible" width="30%">
			
			<div class="contcart"><div>联系人手机：</div><div>{{stationsInfo.enterprise.umobile}}</div></div>
			<div class="contcart"><div>公司电话：</div><div>{{stationsInfo.enterprise.mobile}}</div></div>
			<div class="contcart"><div>公司微信：</div><div>{{stationsInfo.wxnum}}</div></div>
			<div class="contcart"><div>公司QQ：</div><div>{{stationsInfo.qqnum}}</div></div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="phonedialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="PhonechoiseColl">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import api from '../../api/api.js'
	export default {
		inject:['reload'],
		data() {
			return {
				stationsInfo: {},
				stationList:[],
				// 弹框选择简历
				dialogVisible: false,
				// 简历选择
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				


				conpyInfo: {},
				plugin: [], // 经纬度
				center: [112.97156, 28.15023],
				position: [112.97156, 28.15023],

				events: {
					complete: () => {
						//地图首次加载完成 并完成覆盖物加载 没有参数 只有map有这个事件
					},
					init: e => {
						//初始化事件里 e 代表该组件实例 可以使用api方法
					},
					click: e => {
						//事件 e.target是组件实例 可以使用api方法
						console.log(e)

					},
					//其他类似click
				},
				
				
				// 登录
				show: true,
				count: '',
				
				loginOptions: {
					code: '',
					mobile: '',
				},
				
				showLogin:true,
				phonedialogVisible:false,
			}
		},
		
		watch:{
			$route() {
			      //监听相同路由下参数变化的时候，从而实现异步刷新
			      // this.loading = true;
			      //重新获取数据
				this.getDetails()
			},
		},
		
		created() {
			if(api.getUserInfo()){
				this.showLogin = false
			}
			this.getDetails()
		},
		methods: {
			// 通过验证 收藏
			choiseColl() {
				console.log(111)
				if(this.value==""){
					this.$message.warning('请先选择简历')
					
				}else{
					let postData = {
						mobile:api.getUserInfo().mobile,
						id:this.stationsInfo.id,
						platform:1,
						rid:this.value,
					}
					console.log(postData)
					this.$api.postForm(api.setCollection,postData).then(res=>{
						if(res.code==1){
							this.dialogVisible= false
							this.$message.success('收藏成功！')
						}else{
							this.$message.warning(res.msg)
						}
					})
					
					// this.dialogVisible = false
				}
				
			},

			getDetails() {
				let id = this.$route.query.id
				this.$api.postForm(api.stationDetails, {
					id
				}).then(res => {
					if (res.code == 1) {
						console.log(res)
						this.stationsInfo = res.data
						this.getStationListById(res.data.enterprise.id)
						
						
					} else {
						this.$message.warning(res.msg)
					}
				})
			},
			
			// 获取当前企业的其他在招职位
			getStationListById(id){
				this.$api.postForm(api.getStationListById,{id}).then(res=>{
					if(res.code==1){
						let stationList = res.data.list.list
						let arr = []
						let detailsId = this.$route.query.id
						stationList.forEach((item,index)=>{
							if(item.id!=detailsId){
								arr.push(item)
							}
						})
						this.stationList = arr
					}else {
						this.$message.warning(res.msg)
					}
				})
			},
			
			// // 地图显示
			// getLocation() {
			// 	let _that = this
			// 	let geolocation = location.initMap('map-container') // 定位
			// 	AMap.event.addListener(geolocation, 'complete', result => {
			// 		console.log(result)
			// 		let arr = []
			// 		arr.push(result.position.lng)
			// 		arr.push(result.position.lat)
			// 		console.log(arr)
			// 		_that.plugin = arr
			// 		_that.center = arr
			// 	})
			// },
			// 收藏
			Collection() {
				if (!api.getUserInfo()) {
					this.$router.push({
						path: '/login'
					})
					return
				}
				if (localStorage.getItem('userType') == 0) {
					this.getResumeList() // 是否获取到了用户简历
				} else {
					this.$message.warning('企业无法收藏职位！！')
				}
			},

			getResumeList() {
				this.time = api.format()
				let postData = {
					mobile: api.getUserInfo().mobile,
					platform: 1,
					status: 1,
					page: 0,
				}
				this.$api.postForm(api.getUserResume, postData).then(res => {
					if (res.code == 1) {
						let list = res.data.list
						this.options = list
						if (list.length > 0) {
							this.dialogVisible = true
						} else {
							this.$message.warning('您还没有发布任何简历，请先发布简历')
							setTimeout(() => {
								this.$router.push({
									path: '/user/info'
								})
							}, 1000)
						}
					} else {
						this.$message.warning(res.msg)

					}
				})
			},
			
			
			
			// 请求登录
			getLogin() {
				let postData = this.loginOptions
				postData.platform = 1
				// this.$api.postForm(api.)
				this.$api.post(api.userLogin,postData,res=>{
					if(res.code == 1){
						this.$message({
							message: '登录成功！',
							type: 'success'
						})
						localStorage.setItem('userInfo',JSON.stringify(res.data))
						this.reload()
						localStorage.setItem('userType','0')
					}
				},err=>{
					this.$message({
						message: err.msg,
						type: 'warning'
					})
					
				})
			},
			
			// 点击登录
			homeGetLogin() {
				if (this.formVerification()) {
					// 登录
					this.getLogin()
				}
			},
			// 表单验证
			formVerification() {
				let {
					mobile,
					code
				} = this.loginOptions
				if (mobile.length == 0 || code.length == 0) {
					this.$message({
						message: '请填写手机号和验证码！',
						type: 'warning'
					});
					return false
				}
				return true
			},
			
			
			// 获取验证码
			getVerification() {
				let phone = this.loginOptions.mobile
				let _this = this
				if (phone.length == 0 || phone.length != 11) {
					this.$message({
						message: '请填写正确的手机号！',
						type: 'warning'
					});
				} else {
					// console.log(1111)
					this.$api.post(api.sendUserMobile, {
						mobile: this.loginOptions.mobile
					}, res => {
						console.log(111, res)
						if (res.code == 1) {
							_this.getTimers()
							_this.$message({
								message: '短信发送成功！',
								type: 'success'
							});
			
						}
					})
			
				}
			},
			
			// 倒计时60秒
			getTimers() {
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			
			// 展示联系方式
			showPhone(){
				if(api.getUserInfo()){
					this.phonedialogVisible = true
				}else{
					this.$router.push({path:"/login"}).catch(err=>err)
				}
			},
			
			PhonechoiseColl(){
				this.phonedialogVisible = false
			},
			
			
			goCompanyDetails(id){
				this.$router.push({path:'/resume/companydetails',query:{id}})
			},
			
			goSelf(id){
				this.$router.push({path:'/resume/station',query:{id}}).catch(err=>err)
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.contcart{
		width: 100%;
		padding: 10px 30px;
		display: flex;
		box-sizing: border-box;
	}
	.induce {
		width: 100%;
		padding-right: 50px;
		box-sizing: border-box;
		margin-top: 30px;
	}

	.title-conpye {
		font-size: 18px;
		padding-bottom: 16px;
		position: relative;
	}

	.title-conpye::before {
		content: '';
		position: absolute;
		height: 2px;
		width: 20px;
		background: #5BD4C7;
		left: 0;
		bottom: 0;
		font-weight: 400;
	}

	.txt_li {
		font-size: 14px;
		color: #999;
		margin: 20px 0;
	}

	.li_marRightOne {
		margin-right: 80px;
	}

	.li_marRighttwo {
		margin-right: 20px;
	}

	.txt_map {
		width: 100%;
		position: relative;
		height: 300px;
		box-shadow: 3px 3px 8px #eee, -3px -3px 8px #eee;
		margin-top: 20px;
		background: #f6f6f6;
	}

	.txt_map_title {
		height: 60px;
		line-height: 60px;
		padding-left: 30px;
		font-size: 18px;
		color: #999;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		box-sizing: border-box;
		background: #fff;
	}

	.station-container {
		.station-main {
			.station-main-box {
				.box-head {
					.box-head-user {
						.user-name {
							font-size: 19px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #000000;
							margin-bottom: 10px;
						}

						font-size: 15px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #999999;
					}

					.box-head-img {
						width: 63px;
						height: 63px;
						border-radius: 50%;
						// background: #b1d3f3;
						margin-right: 22px;
						cursor: pointer;
						overflow: hidden;
					}

					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}

				width: calc(100% - 316px);
				border-right: 1px solid #EAEBED;
			}

			.station-main-slider {
				.resume-list {
					.resume-list-item {
						.item-price {
							font-size: 18px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #DD661D;
							margin-top: 16px;
						}

						.item-tag {
							.item-tag-item {
								font-size: 15px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #666666;
								margin-right: 20px;
								white-space: nowrap;
							}

							display: flex;
							margin-top: 18px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}

						.item-tit {
							font-size: 20px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #000000;
						}

						width: 100%;
						background: #FFFFFF;
						box-shadow: 0px 5px 16px 0px rgba(240, 239, 239, 0.75);
						box-sizing: border-box;
						padding: 22px;
						margin-top: 23px;
						overflow: hidden;
					}

					.resume-list-tit {
						font-size: 20px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #333333;
					}

					width: 100%;
					margin-top: 31px;
				}

				.form-box {
					width: 100%;

					.form-desc {
						font-size: 12px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
						margin-top: 26px;
					}

					.form-btn {
						width: 100%;	
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 15px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #1E87F0;
						height: 43px;
						background: #FFFFFF;
						margin-top: 30px;
					}

					.form-input-item {
						.code-box {
							.code-input {
								margin-left: 17px;
								flex: 1;
								height: 100%;
								border: none;
								padding: 0;
							}

							.code-box-btn {
								height: 14px;
								font-size: 13px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #1E87F0;
								padding-left: 9px;
								border-left: 1px solid #DBDDE3;
								white-space: nowrap;
							}

							flex: 1;
							display: flex;
							align-items: center;
							height: 100%;
						}

						.input-box {
							margin-left: 17px;
							flex: 1;
							height: 100%;
							border: none;
							padding: 0;
						}

						display: flex;
						align-items: center;
						width: 100%;
						height: 43px;
						background: #FFFFFF;
						margin-top: 26px;
						padding-left: 12px;
						box-sizing: border-box;
					}

					.form-box-tit {
						font-size: 19px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
						text-align: center;
					}

					width: 100%;
					background: #1E87F0;
					box-sizing: border-box;
					padding: 30px;
				}

				width: 296px;
			}

			width: 1200px;
			margin: 35px auto;
			display: flex;
			justify-content: space-between;
		}

		.station-head {
			.header-box {
				.header-btns {
					.btn {
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 17px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						border: 1px solid #1E87F0;
						padding: 15px 35px;
						color: #1E87F0;
						cursor: pointer;
						>div {
							margin-left: 8px;
						}
					}

					.confirm {
						color: #FFFFFF;
						background: #1E87F0;
						margin-left: 17px;
					}

					display: flex;
					align-items: center;
					margin-top: 27px;
				}

				.header-tag {
					.header-tag-item {
						font-size: 14px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
						margin-right: 30px;
					}

					display: flex;
					align-items: center;
					margin-top: 20px;
				}

				.header-tit-box {
					.header-price {
						font-size: 32px;
						font-family: Microsoft YaHei;
						font-weight: bold;
						color: #EA6A41;
						margin-left: 16px;
					}

					.header-tit {
						font-size: 32px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
					}

					margin-top: 20px;
					display: flex;
					align-items: center;
				}

				.header-status {
					font-size: 14px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #FFFFFF;
				}

				width: 1200px;
				margin: 0 auto;
			}

			width: 100%;
			background: #434b60;
			box-sizing: border-box;
			padding: 30px 0;
		}
	}
	
	
	.company-name-goDetails{
		cursor: pointer;
	}
	.company-name-goDetails:hover{
		color:  #288aed;
	}
</style>
