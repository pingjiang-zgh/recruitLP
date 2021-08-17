<template>
	<div class="home">
		<div class="header">
			<div class="header-main">
				<div class="header-tit">来这里，遇见更好的机会</div>
				<div v-if="showLogin" class="header-content">
					<div class="header-content-tit">快速注册 让好工作找到你！</div>
					<div class="header-content-form">
						<el-input v-model="loginOptions.mobile" placeholder="请填写手机号码" class="header-form-phone"></el-input>
						<el-input v-model="loginOptions.code" placeholder="验证码" class="header-form-code">
							<!-- <div slot="suffix" class="cursor" @click="getVerification">获取</div> -->
							<div v-show="show" @click="getVerification"  slot="suffix" class="cursor">获取验证码</div>
							<div v-show="!show"  slot="suffix" class="cursor">{{count+'S'}}</div>
						</el-input>
						<div @click="homeGetLogin" class="header-form-btn">登录/注册</div>
					</div>
				</div>
			</div>
		</div>	
		<div class="main">
			<div class="main-search">
				<el-select @change="changeValue" v-model="value" placeholder="请选择">
					<el-option v-for="item in position" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				<el-input   @keydown.enter='goBtnSearch' v-model="search_content" placeholder="搜索职位、公司"></el-input>
				<el-button @click='goBtnSearch'>搜索</el-button>
			</div>

			<div class="main-history">
				<div class="main-history-tit">热门职位:</div>
				<div class="main-history-list">
					<div @click="goMoreSearch(val.name,val.iid)" class="main-history-list-item"
						v-for="(val,index) of position" v-if="index<6" :key="val.id">{{val.name}}</div>
				</div>
			</div>

			<div class="main-top">
				<div class="main-top-menu">
					<div class="top-menu-main">
						<div  class="menu-main-item" v-for="(item,index) in industry" :key="item.id">
							<div @click="gosearch(item.name,'')" class="menu-main-item-tit">{{item.name}}</div>
							<div @click="gosearch(item.name,positionItem.name)" class="menu-main-item-tag"
								 v-for="(positionItem,positionIndex) in position"  v-show="item.id==positionItem.iid"
								:key="positionItem.id">{{positionItem.name}}</div>
						</div>
					</div>
					<div @click='getSearchMore' class="top-menu-footer">查看全部职位</div>
				</div>
				<div class="main-top-banner">
					<el-carousel trigger="click" height="150px" :autoplay="false">
						<el-carousel-item v-for="item in banner" :key="item">
							<img :src="item" class="top-banner-img" width="100%" height="100%">
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>

			<div class="main-tit">
				<div class="main-tit-line"></div>
				<div class="main-tit-text">热招职位</div>
				<div class="main-tit-line"></div>
			</div>

			<div class="main-list">
				<div @click="goHotPositions(item.id)" class="main-list-item" v-for="(item,index) in hotPositionsList" :key="item.id">
					<div class="main-list-item-box">
						<div class="left">
							<div class="left-tit">
								{{item.title}}
								<img v-if="item.position_pc&&item.position_pc_exp_time*1000>dateTime" src="../assets/image/top-icon.png" class="left-icon">
							</div>
							<div class="left-tag">
								<div class="left-tag-item">{{item.desc}}</div>
								<div class="left-tag-item">{{item.class==1?'求职':'挂职'}}</div>
								<div class="left-tag-item itemAddress">{{item.address}}</div>
							</div>
						</div>
						<div class="price">{{item.money}}</div>
					</div>
					<div class="main-list-item-footer">
						<img :src="item.avatar" width="42px" height="42px">
						<div>{{item.gsname}}</div>
					</div>
				</div>
				<!-- {{dateTime}} -->

			</div>

			<div class="main-tit">
				<div class="main-tit-line"></div>
				<div class="main-tit-text">热门企业</div>
				<div class="main-tit-line"></div>
			</div>

			<div class="main-company-list">
				<div v-show='index<hotEnpLength*12' @click="goConpyDetails(item.id)" class="company-list-item" v-for="(item,index) in hotEnterpriseList" :key="item.id">
					<img v-if="item.avatar!=''" :src="item.avatar" width="66px" height="64px" class="company-img">
					<img v-else src="../assets/image/user-default-head.png" width="66px" height="64px" class="company-img">
					<div class="company-name">{{item.name}}</div>
					<div class="company-tag">
						<div class="company-tag-item">{{item.status}}</div>
						<div class="company-tag-item">{{item.name}}</div>
					</div>
					<div class="company-btn">
						<span>{{item.count}}</span>个热招职位
					</div>
				</div>
			</div>

			<el-button v-if="hotEnpLength*12<hotEnterpriseList.length"  @click='getMore' class="company-more">查看更多</el-button>

		</div>
		<!-- <Footer></Footer> -->
	</div>
</template>

<script>
	
	import api from "../api/api.js"
	import AMap from 'AMap'
	import location from '../api/positionLocation.js'
	import Footer from '../Footer/index.vue'
	export default {
		inject: ['reload'],
		components:{
			Footer
		},
		data() {
			return {
				value: '职位类型',
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

				banner: [],
				// 定位获取的省份
				province: '',

				hotPositionsList: [], // 热门职位
				hotEnterpriseList: [], // 热门公司

				industry: [], // 行业
				position: [], // 职位

				station1: '',
				station2: '',
				search_content: '',
				
				
				show: true,
				count:'',
				
				loginOptions:{
					code:'',
					mobile:'',
				},
				
				showLogin:true,
				hotEnpLength:1,
				dateTime:null,
			}
		},
		created() {
			this.dateTime = Date.parse(new Date())
			// 判断登录状态
			this.getLoginState()
			
			
			
			document.title = '首页'
			if (this.$route.query.id) {
				// this.$router.go(0)
				window.reload()
			}
			if(api.getUserInfo()){
				this.showLogin = false
			}
			this.getConfig()
			this.getLocation()
		},
		methods: {
			getLogin(){
				let postData = this.loginOptions
				postData.platform = 1
				this.$api.post(api.userLogin,postData,res=>{
					if(res.code == 1){
						this.$message({
							message: '登录成功！',
							type: 'success'
						})
						localStorage.setItem('userInfo',JSON.stringify(res.data))
						this.reload()
						localStorage.setItem('userType','0')
						// this.$router.push({path:'/company'})
					}
				},err=>{
					this.$message({
						message: err.msg,
						type: 'warning'
					})
				})
			},
			
			// 点击登录
			homeGetLogin(){
				if(this.formVerification()){
					// 登录
					this.getLogin()
				}
			},
			// 表单验证
			formVerification(){
				let {mobile,code} = this.loginOptions
				if(mobile.length==0||code.length==0){
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
					this.$api.post(api.sendUserMobile,{mobile:this.loginOptions.mobile},res=>{
						console.log(111,res)
						if(res.code == 1){
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
			getTimers(){
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
			
			
			// 获取网站配置
			getConfig() {
				this.$api.get(api.getConfig, null, res => {
					console.log(res)
					this.banner = JSON.parse(res.data.applogo.imgs)
					this.industry = res.data.industry
					this.position = res.data.position
					this.station1 = this.position[0].iid
					this.station2 = this.position[0].id

				})
			},

			/** 获取高德地图定位 */
			getLocation() {
				// console.log(1)
				let _that = this
				let geolocation = location.initMap('map-container') // 定位
				AMap.event.addListener(geolocation, 'complete', result => {
					// console.log(2)
					console.log(result)
					_that.province = result.addressComponent.province
					localStorage.setItem('city', _that.province)
					_that.getIndex()
				})
			},
			
			// 获取页面数据
			getIndex() {
				this.$api.postForm(api.index, {
					city: this.province
				}).then(res => {
					if (res.code == 1) {
						console.log(res.data)
						this.hotPositionsList = res.data.hot_station.list
						this.hotEnterpriseList = res.data.hot_enterprise.list
					} else {
						this.$message.warning(res.msg)
					}
				})
			},
			
			// 热门 职位 跳转搜索
			gosearch(industryName, positionName) {
				this.$router.push({
					path: '/zhaopin/fenlei',
					query: {
						station1: industryName,
						station2: positionName
					}
				})
			},
			
			// 分类 职位 跳转搜索
			goMoreSearch(positionName, id) {
				let station1 = this.getStation1(id)
				this.$router.push({
					path: '/zhaopin/fenlei',
					query: {
						station1,
						station2: positionName
					}
				})
			},

			// 获取行业文本
			getStation1(id) {
				let industryName = ''
				this.industry.forEach(item => {
					if (item.id == id) {
						industryName = item.name
					}
				})
				return industryName
			},
			
			// 选择职业类型
			changeValue(e) {
				console.log(e)
				let station1 = ''
				let station2 = ''
				let id = null;
				this.position.forEach(item => {
					if (item.id == e) {
						id = item.iid
						station2 = item.name
					}
				})
				station1 = this.getStation1(id)
				this.station1 = station1
				this.station2 = station2
				console.log(station1, station2)
				// this.$router.push({path:'/resume/recruit',query:{station1,station2}})
			},

			// 点击搜索跳转
			goBtnSearch() {
				if ((this.station1 == "" || this.station2 == "") && this.search_content == "") {
					this.$message.warning('请选择而职位类型或者填写您要搜索的内容！')
				} else {
					let {search_content,station1,station2} = this.$data
					this.$router.push({path:'/zhaopin/fenlei',query:{station1,station2,search_content}})
				}
			},
			
			// 跳转招聘职位详情
			goHotPositions(id){
				this.$router.push({path:'/fenlei/station',query:{id}})
			},
			
			// 查看更多职位
			getMore(){
				console.log(111)
				if(this.hotEnpLength*12<hotEnterpriseList.length){
					this.hotEnpLength++;
				}
				// this.$router.push({path:'/resume/recruit'})
			},
			
			// 查看更多搜索分类
			getSearchMore(){
				this.$router.push({path:'/zhaopin/fenlei'}).catch(err=>err)
			},
			
			// 跳转详情
			goConpyDetails(id){
				this.$router.push({path:'/resume/companydetails',query:{id}})
			},
			
			
			
			// 判断登录状态
			getLoginState(){
				if(api.getUserInfo()){
					if(localStorage.getItem('userType')==1){
						// 企业
						this.requestState(api.EnpUserInfo,1)
					}else{
						this.requestState(api.userInfo,0)
					}
				}
				
			},
			
			requestState(url,type){
				console.log(url)
				let postData = {
					mobile: api.getUserInfo().mobile,
				}
				if(type!=1){
					postData.platform = 1
				}
				this.$api.postForm(url, postData).then(res => {
					console.log(res)
					if (res.code == 1) {
						if(res.data){
							localStorage.setItem('userInfo',JSON.stringify(res.data))
							localStorage.setItem('userType',type)
							return
						}else{
							this.removeLogin()
						}
					} else {
						this.removeLogin()
					}
				})
			},
			
			removeLogin(){
				localStorage.removeItem('userInfo');
				localStorage.removeItem('userType');
				this.reload()
			}

		}
	}
</script>

<style scoped lang="scss">
	.home {
		.header {
			width: 100%;
			height: 128px;
			background: #288aed;

			.header-main {
				width: 1200px;
				height: 100%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.header-tit {
					font-size: 28px;
					font-family: FZZhanBiHei-M22S;
					font-weight: 400;
					color: #FFFFFF;
				}

				.header-content {
					.header-content-tit {
						font-size: 26px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
					}

					.header-content-form {
						display: flex;
						align-items: center;
						margin-top: 10px;

						.header-form-phone {
							width: 180px;
							background: #ffffff;
							height: 38px;
						}

						.header-form-code {
							width: 180px;
							background: #ffffff;
							height: 38px;
							margin-left: 10px;

							.cursor {
								height: 38px;
								font-size: 13px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #1E87F0;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}

						.header-form-btn {
							height: 36px;
							background: #ffffff;
							font-size: 13px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #1E87F0;
							margin-left: 10px;
							display: flex;
							align-items: center;
							justify-content: center;
							padding: 0 15px;
							cursor: pointer;
						}

						/deep/ .el-input__inner {
							border: none;
							border-radius: 0;
							height: 38px;
						}
					}
				}
			}
		}

		.main {
			width: 1200px;
			margin: 0 auto;

			.main-search {
				width: 982px;
				height: 54px;
				margin: 18px auto 0;
				background: #FFFFFF;
				box-shadow: 0px 5px 13px 0px rgba(242, 242, 242, 0.75);
				border-radius: 3px 3px 3px 3px;
				display: flex;
				align-items: center;

				/deep/ .el-select {
					height: 100%;
					width: 200px;

					.el-input {
						width: 100%;
						height: 100%;

						.el-input__inner {
							height: 100%;
							border: none;
						}
					}
				}

				/deep/ .el-input {
					height: 100%;

					.el-input__inner {
						height: 100%;
						border: none;
					}
				}

				/deep/ .el-button {
					width: 150px;
					height: 100%;
					color: #ffffff;
					background: #1E87F0;
					border: none;
					border-radius: 0;
				}
			}

			.main-history {
				width: 982px;
				margin: 14px auto 0;
				display: flex;
				align-items: center;

				.main-history-tit {
					font-size: 14px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
					margin-right: 22px;
				}

				.main-history-list {
					display: flex;
					align-items: center;

					.main-history-list-item {
						font-size: 14px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #1E87F0;
						margin-right: 36px;
						cursor: pointer;
					}
				}

			}

			.main-top {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 32px;

				.main-top-menu {
					width: 408px;
					height: 358px;
					background: #ffffff;
					overflow: hidden;
					position: relative;
					.top-menu-main {
						padding: 20px 24px;
						box-sizing: border-box;

						.menu-main-item {
							display: flex;
							// align-items: center;
							// margin-bottom: 20px;
							flex-wrap: wrap;
							// align-content: center;
							height: 30px;
							overflow: hidden;
							margin-bottom: 20px;
							.menu-main-item-tit {
								font-size: 15px;
								font-family: Microsoft YaHei;
								font-weight: 600;
								color: #333333;
								margin-right: 10px;
								white-space: nowrap;
								height: 100%;
								margin-bottom: 12px;
								cursor: pointer;
							}

							.menu-main-item-tag {
								white-space: nowrap;
								font-size: 14px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #666666;
								margin-right: 12px;
								cursor: pointer;
								margin-bottom: 12px;
							}

							.menu-main-item-tag:last-of-type {
								margin-right: 0;
							}
							
							.menu-main-item-tag:hover {
								color: #1E87F0;
							}
						}

						.menu-main-item:last-of-type {
							margin-bottom: 0;
						}
					}

					.top-menu-footer {
						background: #fff;
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 48px;
						border-top: 1px dashed #E9E9E9;
						padding: 0 22px;
						display: flex;
						align-items: center;
						font-size: 14px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #1E87F0;
						box-sizing: border-box;
						cursor: pointer;
					}
				}

				.main-top-banner {
					width: 770px;
					height: 358px;

					/deep/ .el-carousel {
						height: 100%;

						.el-carousel__container {
							height: 100% !important;

							.el-carousel__item {
								height: 100%;
							}
						}
					}
				}
			}

			.main-tit {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 40px;

				.main-tit-line {
					width: 57px;
					height: 1px;
					background: #DBDDE3;
				}

				.main-tit-text {
					margin: 0 12px;
					font-size: 25px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
				}
			}

			.main-list {
				margin-top: 30px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;

				.main-list-item {
					width: 32%;
					box-sizing: border-box;
					padding: 20px 20px 0;
					background: #ffffff;
					margin-bottom: 15px;
					cursor: pointer;
					transition: all .5s;
					.main-list-item-box {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-bottom: 18px;

						.left {
							.left-tit {
								display: flex;
								align-items: center;
								font-size: 18px;
								font-family: Microsoft YaHei;
								font-weight: 600;
								color: #1E87F0;

								.left-icon {
									width: 34px;
									height: 15px;
									margin-left: 10px;
								}
							}

							.left-tag {
								margin-top: 12px;
								display: flex;
								align-items: center;
								font-size: 13px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #666666;

								.left-tag-item {
									min-width: 50px;
									border-right: 1px solid #DBDDE3;
									box-sizing: border-box;
									padding: 0 10px;
									display: flex;
									align-items: center;
									// white-space: nowrap;
								}

								.left-tag-item:first-of-type {
									padding-left: 0;
								}

								.left-tag-item:last-of-type {
									border: none;
								}
							}
						}

						.price {
							font-size: 19px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #DD661D;
						}
					}

					.main-list-item-footer {
						border-top: 1px solid #EAEBED;
						height: 60px;
						display: flex;
						align-items: center;
						font-size: 12px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #666666;

						>div {
							margin-left: 10px;
						}
					}
				}
			
				.main-list-item:hover {
					box-shadow: 3px 3px 8px #ddd,-3px -3px 8px #ddd;
				}
			}

			.main-company-list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-top: 40px;

				.company-list-item {
					width: 24%;
					box-sizing: border-box;
					background: #ffffff;
					margin-bottom: 16px;
					padding: 35px 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					cursor: pointer;

					.company-name {
						margin-top: 18px;
						font-size: 18px;
						font-family: Microsoft YaHei;
						font-weight: 600;
						color: #333333;
					}

					.company-tag {
						display: flex;
						align-items: center;
						font-size: 13px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #999999;
						margin-top: 22px;

						.company-tag-item {
							padding: 0 15px;
						}

						.company-tag-item:first-of-type {
							border-right: 1px solid #DBDDE3;
						}
					}

					.company-btn {
						font-size: 13px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #999999;
						margin-top: 17px;
						border: 2px solid #EAEBED;
						height: 38px;
						display: flex;
						align-items: center;
						justify-content: center;
						min-width: 195px;

						>span {
							color: #5DD5C8;
						}
					}
				}
			}

			.company-more {
				width: 232px;
				height: 37px;
				background: #1E87F0;
				font-size: 20px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 48px auto 0;
				border: none;
				border-radius: 0;
			}

		}

		
	}
	
	.itemAddress{
		width: 100px;
		overflow: hidden;
		
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
