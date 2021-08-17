<template>
	<div class="info-container">
		<div class="info-header">
			<div class="header-main">
				<div class="header-main-search">
					<div @click="selectType" class="search-select">{{choiseTxt}}</div>
					<input @keydown.enter="search" v-model="search_content" type="text" class="search-input"
						placeholder="搜索职位、公司">
					<div @click="search" class="search-btn">搜索</div>
				</div>
				<div class="header-main-list">
					<div class="tag-list">
						<div class="tag-list-box">
							<div class="tag_type">分类：</div>
							<div class="tag_type_right">
								<div @click="choiseIndexAll(0)"
									:class="{'tag_items':true, 'tag_items_active':choiseIndex.industryIndex==-1}">不限
								</div>
								<div @click="choiseIndustryIndex(item.id,index,item.name)"
									v-for="(item,index) in industry" :key='item.id'
									:class="{'tag_items':true, 'tag_items_active':choiseIndex.industryIndex==index}">
									{{item.name}}
								</div>
							</div>
						</div>
						<div class="tag-list-box">
							<div class="tag_type">专业：</div>
							<div class="tag_type_right">
								<div @click="choiseIndexAll(1)"
									:class="{'tag_items':true, 'tag_items_active':choiseIndex.positionIndex==-1}">不限
								</div>
								<div @click="choisePositionIndex(item.id,index,item.name)"
									v-for="(item,index) in showPosition" :key='item.id'
									:class="{'tag_items':true, 'tag_items_active':choiseIndex.positionIndex==index}">
									{{item.name}}
								</div>
							</div>
						</div>
						<div class="tag-list-box">
							<div class="tag_type">城市：</div>
							<div class="tag_type_right">
								<div @click="choiseIndexAll(2)"
									:class="{'tag_items':true, 'tag_items_active':choiseIndex.provinceIndex==-1}">不限
								</div>
								<div @click="choiseProvinceIndex(item.id,index,item.name)"
									v-for="(item,index) in province" :key='item.id'
									:class="{'tag_items':true, 'tag_items_active':choiseIndex.provinceIndex==index}"
									class="tag_items">{{item.name}}</div>
							</div>
						</div>
					</div>
					<!-- <div class="list-item" v-for="(item,index) of industry" :key="item.id">
						<div @click="selectPosition(index,-1,item.name,'')" :class="{'list-item-tit':true,'list-item-tag-child-active':activeIndex==-1&&industryIndex==index}">{{item.name}}：</div>
						<div class="list-item-tag">
							<div @click="selectPosition(index,positionIndex,item.name,positionItem.name)"
								:class="{'list-item-tag-child':true,'list-item-tag-child-active':activeIndex==positionIndex&&industryIndex==index}"
								v-for="(positionItem,positionIndex) of position" v-if="item.id==positionItem.iid"
								:key="positionItem.id">{{positionItem.name}}</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>
		<div class="info-main">
			<el-container>
				<el-main>
					<div v-show="showStation" class="list">
						<div @click="goRecruitDetails(item.id)" class="list-item" v-for="(item,index) of list"
							:key="index">
							<div class="item-tit">
								<div class="item-tit-title">
									<div>{{item.c1name+'-'+ item.c2name}}</div>
									<div v-if="item.position_pc&&item.position_pc_exp_time*1000>dateTime"
										style="margin-left: 5px; display: flex;align-items: center;">
										<img src="../../assets/image/top-icon.png" width="53" height="24">
									</div>
								</div>
								<div class="item-footer">
									<div class="item-tag">
										<div class="item-tag-price">{{item.money}}</div>
										<div class="item-tag-list">
											<div class="item-tag-list-item">
												{{item.class==1?'挂资质':item.class==2?'挂项目':'均可'}}
											</div>
											<div class="item-tag-list-item">{{item.desc}}</div>
											<div class="item-tag-list-item">{{item.address}}</div>
										</div>

									</div>


								</div>

								<div class="item-footer-info">
									<div class="item-footer-company">{{item.gsname}}</div>
									<!-- <img src="../../assets/image/resume/message-icon1.png" width="22" height="19">
									<div class="info-user">
										<div class="info-user-name">{{item.username}}</div>
										<div class="info-user-phone">{{item.mobile}}</div>
									</div> -->
								</div>
							</div>
						</div>
					</div>
					<el-pagination style="text-align: center" background layout="prev, pager, next" :total="total"
						:page-size='40' @current-change='currentPage'>
					</el-pagination>
				</el-main>
				<!-- <el-aside v-if='showLogin' width="260px">
					<div class="form-box">
						<div class="form-box-tit">各大行业职位任你选</div>
						<div class="form-input-item">
							<img src="../../assets/image/resume/phone-icon.png" width="13" height="21">
							<input v-model="loginOptions.mobile" type="text" placeholder="请填写手机号" class="input-box">
						</div>
						<div class="form-input-item">
							<img src="../../assets/image/resume/message-icon.png" width="18" height="14">
							<div class="code-box">
								<input v-model="loginOptions.code" class="codeSe code-input" type="text"
									placeholder="请填写验证码">
								<div class="code-box-btn">获取验证码</div>
								<div v-show="show" @click="getVerification" slot="suffix" class="code-box-btn">获取验证码</div>
								<div v-show="!show" slot="suffix" class="code-box-btn">{{count+'S'}}</div>
							</div>
						</div>
						<div @click="homeGetLogin" class="form-btn">登录/注册</div>
						<div class="form-desc">同意《用户协议》《个人隐私保护》</div>
					</div>
				</el-aside> -->
			</el-container>
		</div>

	</div>
</template>

<script>
	import api from "../../api/api.js"
	export default {
		inject: ['reload'],
		data() {
			return {
				list: [],
				search_content: '', // 搜索内容
				showStation: true,
				showType: false,
				industry: [], // 行业
				position: [], // 职位
				province: [], // 省份
				industryIndex: -1,
				activeIndex: -1,
				choiseTxt: '职位类型',
				station1: '',
				station2: '',
				city: '',
				dateTime: '', // 现在的时间戳
				// 登录
				show: true,
				count: '',

				loginOptions: {
					code: '',
					mobile: '',
				},

				showLogin: true,

				showPosition: [], // 展示的职位专业
				choiseIndex: {
					industryIndex: -1,
					positionIndex: -1,
					provinceIndex: -1,
				},

				total: 0,
				page: 0,
			}
		},
		created() {
			if (api.getUserInfo()) {
				this.showLogin = false
			}
			this.getConfig()
			this.navSearch()


		},
		methods: {

			choiseIndexAll(type) {
				if (type == 0) {
					this.choiseIndex.industryIndex = -1
				} else if (type == 1) {
					this.choiseIndex.positionIndex = -1
				} else {
					this.choiseIndex.provinceIndex = -1
				}
				this.search()
			},

			goRecruitDetails(id) {
				this.$router.push({
					path: '/fenlei/station',
					query: {
						id
					}
				})
			},
			//
			navSearch() {
				let {
					station1,
					station2,
					search_content
				} = this.$route.query
				if (station1 || station2 || search_content) {
					if (station1) {
						this.station1 = station1
						this.choiseTxt = station1
						this.getIndustryIndex(0)
					}
					if (station2) {
						this.station2 = station2
						this.choiseTxt = station2
						this.getPositionIndex()
					}
					if (search_content) {
						this.search_content = search_content
					}
					this.Navsearch()
				} else {
					// this.getHotStatusList()
					this.Navsearch()
				}
			},

			// 获取参数的下标
			getIndustryIndex(id) {
				setTimeout(() => {
					this.industry.forEach((item, index) => {
						if (id != 0) {
							if (id == item.id) {
								this.choiseIndex.industryIndex = index
							}
						} else {
							if (this.station1 == item.name) {
								this.choiseIndex.industryIndex = index
							}
						}
					})
				}, 200)

			},

			// 获取职位的下标
			getPositionIndex() {
				let obj = {}
				let objIndex = null
				setTimeout(() => {

					this.position.forEach((item, index) => {
						if (item.name == this.station2) {
							let iid = item.iid
							this.industry.forEach((InItem, Inindex) => {
								if (iid == InItem.id) {
									obj = InItem
									objIndex = Inindex
									return
								}
							})

						}
					})
					let arr = []
					this.position.forEach((item, index) => {
						if (item.iid == obj.id) {
							console.log(item.id)
							arr.push(item)
						}
					})

					this.showPosition = arr
					this.showPosition.forEach((item, index) => {
						if (item.name == this.station2) {
							this.choiseIndex.positionIndex = index
							return
						}
					})
				}, 200)
			},


			getConfig() {
				this.$api.get(api.getConfig, null, res => {
					console.log(res)
					this.industry = res.data.industry
					this.position = res.data.position
					let arr = []
					this.position.forEach((item, index) => {
						if (index < 10) {
							arr.push(item)
						}
					})
					this.showPosition = arr

					this.province = res.data.province
					
					let str = '';
					res.data.industry.forEach(item=>{
						str += item.name+','
					})
					
					res.data.position.forEach(item=>{
						str += item.name+','
					})
					
					
					console.log(str)
					let head = document.getElementsByTagName('head')
					let meta = document.createElement('meta')
					meta.name = 'keywords'
					meta.content = str
					head[0].appendChild(meta)
					
				})
			},
			// 获取推荐列表
			getHotStatusList() {
				let city = localStorage.getItem('city')
				let postData = {
					city,
					// position: 1,
				}
				this.$api.postForm(api.hotStation, postData).then(res => {
					if (res.code == 1) {
						this.list = res.data.list
					}
				})
			},
			selectType() {
				this.showType = !this.showType;
				if (this.showType == false) {
					this.industryIndex = -1
					this.activeIndex = -1
					this.station1 = ''
					this.station2 = ''
					this.choiseTxt = '职位类型'
				}
			},
			// 职位选择
			selectPosition(industryIndex, activeIndex, industryName, positionName) {
				this.industryIndex = industryIndex
				this.activeIndex = activeIndex
				this.station1 = industryName
				this.station2 = positionName
				this.choiseTxt = positionName
				if (activeIndex == -1) {
					this.choiseTxt = industryName
				}
			},
			search() {
				if (this.searchVerification()) {
					const loading = this.$loading({
						lock: true,
						text: '搜索中',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					let city = localStorage.getItem('city')
					city = this.city
					let {
						station1,
						station2,
						search_content
					} = this.$data

					let postData = {
						// city,
						// station1,
						// station2,
						// gsname: search_content,
						page: this.page,
					}

					if (this.choiseIndex.industryIndex == -1) {
						station1 = ''
					}
					if (this.choiseIndex.positionIndex == -1) {
						station2 = ''
					}
					if (this.choiseIndex.provinceIndex == -1) {
						city = ''
					}

					let str = ''
					
					if(station1!=''){
						postData.station1 = station1
						document.title =station1
						str += station1 + '-'
					}
					if(station2!=''){
						postData.station2 = station2
						str+= station2
						document.title = str
						
					}
					if(city!=''){
						postData.city = city
						
					}
					if(this.search_content!=''){
						postData.gsname= this.search_content
					}
					// let pushStr = '?'
					// let arr = Object.keys(postData)
					// console.log(arr)
					// arr.forEach((item,index)=>{
					// 	if(index==0){
					// 		pushStr+=item+'='+postData[item]
					// 	}else{
					// 		pushStr+='&'+item+'='+postData[item]
					// 	}
					// })
					
					// console.log(pushStr)
					
					// this.$router.push({path:'/zhaopin/fenlei',query:postData})
					// this.reload
					this.$api.postForm(api.searchPosition, postData).then(res => {
						if (res.code == 1) {
							console.log(res.data)
							let top = res.data.toplist.list
							let list = res.data.list.list
							this.list = []
							this.list = [...top, ...list]
							this.total = res.data.list.count + res.data.toplist.count
							this.dateTime = (Date.parse(new Date()));
							loading.close()
							// console.log(1)
						} else {
							this.$message.warning(res.msg)
							loading.close()
							// console.log(1)
						}
					})

				}
			},
			// 搜索验证
			searchVerification() {
				// if ((this.station1 == '' ) && this.search_content.trim() == "") {
				// 	this.$message.warning('请先选择职位类型或输入搜素内容！')
				// 	return false
				// }
				// if(this.search_content.trim()==""){
				// 	this.$message.warning('请填写您需要搜索的内容!')
				// 	return false
				// }
				return true
			},


			// 选择行业
			choiseIndustryIndex(id, index, name) {
				this.choiseIndex.industryIndex = index
				let arr = []
				this.position.forEach((item, index) => {
					if (item.iid == id) {
						arr.push(item)
					}
				})
				this.showPosition = arr
				if (this.choiseIndex.positionIndex == -1) {
					this.choiseTxt = name
					this.station2 = ''
				} else {
					if (this.choiseIndex.positionIndex > this.showPosition.length - 1 && this.choiseIndex.positionIndex !=
						-1) {
						this.choiseIndex.positionIndex = 0
					}
					this.choiseTxt = this.showPosition[this.choiseIndex.positionIndex].name
					this.station2 = this.choiseTxt
				}
				this.station1 = name
				// console.log(this.station1,this.station2)
				this.search()
			},


			// 选择职位
			choisePositionIndex(id, index, name) {
				this.choiseIndex.positionIndex = index
				this.choiseTxt = name
				this.station2 = name
				console.log(this.station1, this.station2)
				this.search()
			},

			// 选择城市
			choiseProvinceIndex(id, index, city) {
				this.choiseIndex.provinceIndex = index
				this.city = city
				this.search()
			},

			// 变换
			currentPage(e) {
				console.log(e)
				this.page = e
				this.search()
			},

			Navsearch() {
				let {
					station1,
					station2,
					search_content
				} = this.$data
				let postData = {
					// station1,
					// station2,
					city: localStorage.getItem('city'),
					page: this.page,
				}
				
				if(station1!=''){
					postData.station1 = station1
					document.title = station1
				}
				if(station2!=''){
					postData.station2 = station2
					document.title = station2
				}
				
				this.$api.postForm(api.searchPosition, postData).then(res => {
					if (res.code == 1) {
						let top = res.data.toplist.list
						let list = res.data.list.list
						this.list = []
						this.list = [...top, ...list]
						this.total = res.data.list.count + res.data.toplist.count
						this.dateTime = (Date.parse(new Date()));

					} else {
						this.$message.warning(res.msg)
					}
				})

			}
		}
	}
	

/* // 请求登录
			getLogin() {
				let postData = this.loginOptions
				postData.platform = 1
				// this.$api.postForm(api.)
				this.$api.post(api.userLogin, postData, res => {
					if (res.code == 1) {
						this.$message({
							message: '登录成功！',
							type: 'success'
						})
						localStorage.setItem('userInfo', JSON.stringify(res.data))
						localStorage.setItem('userType', '0')
						this.reload()
					}
				}, err => {
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
	 */
	
</script>

<style scoped lang="scss">
	.info-container {
		.info-main {
			.el-container {
				.el-main {
					.list {
						.list-item {
							.item-footer {
								.item-footer-company {
									font-size: 14px;
									font-family: Microsoft YaHei;
									font-weight: 400;
									color: #999;
								}

								.info-user {
									.info-user-name {
										border-right: 1px solid #666666;
										padding-right: 16px;
										margin-right: 16px;
									}

									display: flex;
									align-items: center;
									margin-left: 11px;
									font-size: 14px;
									font-family: Microsoft YaHei;
									font-weight: 400;
									color: #666666;
								}

								.item-footer-info {
									display: flex;
									align-items: center;
									justify-content: center;
									height: 31px;
									border: 1px solid #EDEDEE;
									border-radius: 16px;
									padding: 0 11px;
								}

								display: flex;
								align-items: center;
								justify-content: space-between;
								margin-top: 10px;
							}

							.item-tag {
								.item-tag-list {
									.item-tag-list-item {
										font-size: 16px;
										font-family: Microsoft YaHei;
										font-weight: 400;
										color: #666666;
										margin-right: 12px;
										border: 1px solid #EDEDEE;
										padding: 7px;
									}

									display: flex;
									align-items: center;
								}

								.item-tag-price {
									font-size: 18px;
									font-family: Microsoft YaHei;
									font-weight: 400;
									color: #DD661D;
									margin-right: 9px;
								}

								margin-top: 8px;
								margin-bottom: 8px;
								display: flex;
								align-items: center;
							}

							.item-tit {
								// display: flex;
								// align-items: center;
								font-size: 19px;
								font-family: Microsoft YaHei;
								// flex-wrap: wrap;
								font-weight: 400;
								color: #333333;

								.item-footer-company {
									font-size: 16px;
									color: #999;
								}

								>div {
									margin-right: 18px;
								}
							}

							width: 49.5%;
							box-sizing: border-box;
							background: #ffffff;
							padding: 24px 29px;
							margin-bottom: 17px;
							cursor: pointer;
						}

						width: 100%;
						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;
					}

					width: 1200px;
					padding: 0 20px 0 0;
					box-sizing: border-box;
				}

				.el-aside {
					.form-box {
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
							font-size: 14px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #1E87F0;
							height: 43px;
							background: #FFFFFF;
							margin-top: 30px;
							cursor: pointer;
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
									text-align: center;
									cursor: pointer;
								}

								flex: 1;
								display: flex;
								align-items: center;
								height: 100%;
								width: 90%;
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
				}

				width: 100%;
				position: relative;
				display: flex;
				justify-content: space-between;
			}

			width: 1200px;
			margin: 16px auto 0;
			box-sizing: border-box;
		}

		.info-header {
			.header-main {
				.header-main-list {
					.list-item {
						.list-item-tag {
							.list-item-tag-child {
								font-size: 13px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #666666;
								margin-right: 24px;
								white-space: nowrap;
							}

							.list-item-tag-child:hover {
								color: #1E87F0;
								cursor: pointer;
							}

							.list-item-tag-child-active {
								color: #1E87F0;
							}

							flex: 1;
							display: flex;
							align-items: center;
						}

						.list-item-tit {
							font-size: 13px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #000000;
						}

						display: flex;
						align-items: center;
						flex-wrap: wrap;
						border-bottom: 1px solid #EAEBED;
						height: 45px;
					}

					margin-top: 17px;
				}

				.header-main-search {
					.search-input {
						box-sizing: border-box;
						flex: 1;
						padding: 0 0 0 19px;
						height: 100%;
						border: none;
					}

					.search-select {
						font-size: 16px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #333333;
						width: 150px;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.search-btn {
						width: 150px;
						height: 54px;
						background: #1E87F0;
						font-size: 24px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
						display: flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;
					}

					width: 100%;
					display: flex;
					align-items: center;
					height: 54px;
					border: 1px solid #1E87F0;
					border-radius: 3px;
				}

				width: 1200px;
				margin: 0 auto;
				padding: 26px 0;
			}

			width: 100%;
			background: #ffffff;
		}
	}

	.codeSe {
		width: 50%;
	}

	.tag-list-box {
		width: 100%;
		display: flex;
		// flex-wrap: wrap;
	}

	.tag_type_right {
		display: flex;
		flex-wrap: wrap;
	}

	.tag_type {
		font-size: 15px;
		color: #333;
		white-space: nowrap;
		line-height: 40px;
		cursor: pointer;
	}

	// .tag_type:hover{
	// 	// color:#288aed;
	// }

	.tag_items {
		font-size: 14px;
		color: #999;
		margin: 10px 5px;
		cursor: pointer;
		padding: 0 10px;
	}

	.tag_items_active {
		background: #288aed;
		color: #fff;
	}

	.tag_items:hover {
		color: #DD661D;
	}

	.item-tit-title {
		display: flex;
		align-items: center;
	}
</style>
