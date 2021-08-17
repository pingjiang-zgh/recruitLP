<template>
	<div class="user-container">
		<el-container>
			<el-aside width="298px">
				<div class="user-box">
					<div class="user-head">
						<img :src="userInfo.avatar" width="64" height="64px">
						<div @click="setUserInfo" class="edit-btn">编辑</div>
					</div>
					<div class="user-name">{{userInfo.name}}</div>
					<div class="user-info-box">
						<div class="user-info">
							<div class="user-info-item">{{userInfo.birth}}岁</div>
							<div class="user-info-item">{{userInfo.join_date}}年</div>
							<div class="user-info-item">
								{{userInfo.state==0?'在职':userInfo.state ==1?'随时离职':userInfo.state==2?'离职周到岗':'离职月到岗'}}
							</div>
						</div>
					</div>
					<div class="user-tag">
						<div @click="goResume" class="user-tag-item">
							<div class="num">{{resumenLength}}</div>
							<div class="tit">我的简历</div>
						</div>
						<div @click="goCollList" class="user-tag-item">
							<div class="num">{{collLength}}</div>
							<div class="tit">我的收藏</div>
						</div>
						<!-- <div class="user-tag-item">
                            <div class="num">895</div>
                            <div class="tit">沟通过</div>
                        </div> -->
					</div>
				</div>
				<div class="user-menu">
					<div @click="goInfo" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/user/menu-icon1.png" class="icon-img">
							<div class="item-tit">个人中心</div>
						</div>
						<div class="right">></div>
					</div>
					<div @click="goReleaseResume" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/user/menu-icon2.png" class="icon-img">
							<div class="item-tit">发布简历</div>
						</div>
						<div class="right">></div>
					</div>
					<div @click="goResume" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/user/menu-icon2.png" class="icon-img">
							<div class="item-tit">简历管理</div>
						</div>
						<div class="right">></div>
					</div>
					<div @click="loginOut" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/user/menu-icon1.png" class="icon-img">
							<div class="item-tit">退出登录</div>
						</div>
						<div class="right">></div>
					</div>
				</div>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import api from "../../api/api.js"
	export default {
		name: "User",
		inject: ['reload'],
		data() {
			return {
				userInfo: {},
				resumenLength: 0,
				collLength: 0,
			}
		},
		
		created() {
			this.getUserInfo()
			this.getResumeList()
			this.getCollList()
		},
		methods: {
			getUserInfo() {
				let userInfo = api.getUserInfo()
				this.userInfo = userInfo
				userInfo.birth = this.getUserBirthday(userInfo.birth)
				userInfo.join_date = this.getUserBirthday(userInfo.join_date)
			},


			setUserInfo() {
				// console.log(this.$router)
				this.$router.push({
					path: "/rencai/info"
				}).catch(err => err)
			},
			
			getLoginOut(){
				if (!api.getUserInfo()) {
					this.$router.push({
						path: '/'
					})
					return
				}
				let userinfo = JSON.parse(localStorage.getItem('userInfo'))
				
				let platform = 1
				let mobile = userinfo.mobile
				
				this.$api.postForm(api.userQuit, {
					platform,
					mobile
				}).then(res => {
					if (res.code == 1) {
						this.$message({
							message: '退出成功',
							type: 'success'
						})
						localStorage.removeItem('userInfo')
						localStorage.removeItem('userType')
						// this.islogin = true
						this.$router.push({
							path: '/'
						}).then(res => {
							this.reload()
						})
				
					}else{
						localStorage.removeItem('userInfo')
						localStorage.removeItem('userType')
						// this.islogin = true
						this.$router.push({
							path: '/'
						}).then(res => {
							this.reload()
						})
					}
				})
				
			},
			
			// 退出登录
			loginOut() {
				this.$confirm('此操作将退出登录, 是否继续?', '退出', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getLoginOut()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});

				
			},
			goInfo() {
				this.$router.push({
					path: "/rencai/info"
				}).catch(err => err)
			},

			goResume() {
				this.$router.push({
					path: "/rencai/resume"
				}).catch(err => err)
			},


			// 获取简历
			getResumeList() {
				let postData = {
					mobile: api.getUserInfo().mobile,
					platform: 1,
					status: 1,
					page: 0,
				}
				this.$api.postForm(api.getUserResume, postData).then(res => {
					if (res.code == 1) {
						this.resumenLength = res.data.count
					}
				})
			},

			// 获取收藏
			getCollList() {
				let postData = {
					mobile: api.getUserInfo().mobile,
					platform: 1,
					page: 1,
				}
				this.$api.postForm(api.getCollList, postData).then(res => {
					if (res.code == 1) {
						this.collLength = res.data.count
					}
				})
			},
			// 去收藏页面
			goCollList() {
				this.$router.push({
					path: '/rencai/record'
				}).catch(err => err)
			},

			// 获取年龄
			getUserBirthday(str){
				 let birth = str.split('-')
				 birth = birth[0]
				let year = new Date()
				year = year.getFullYear()
				
				return (year-0) -( birth-0)
			},
			
			
			goReleaseResume(){
				this.$router.push({
					path: '/rencai/releaseResume'
				}).catch(err => err)
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-container {
		width: 1200px;
		margin: 0 auto;
		padding-top: 32px;
		box-sizing: border-box;

		.el-container {
			width: 100%;
			position: relative;

			.el-aside {
				position: absolute;
				z-index: 999;

				.user-box {
					width: 100%;
					height: 230px;
					background: #FFFFFF;

					.user-head {
						padding-top: 20px;
						display: flex;
						justify-content: center;
						position: relative;
						box-sizing: border-box;

						.edit-btn {
							font-size: 15px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #1E87F0;
							position: absolute;
							right: 14px;
							top: 12px;
							cursor: pointer;
						}
					}

					.user-name {
						margin-top: 15px;
						display: flex;
						justify-content: center;
						font-size: 15px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #666666;
					}

					.user-info-box {
						display: flex;
						justify-content: center;
						margin-top: 12px;

						.user-info {
							display: flex;
							align-items: center;
							justify-content: space-around;

							.user-info-item {
								padding: 0 20px;
								font-size: 13px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #666666;
								border-right: 1px solid #DBDDE3;
							}

							.user-info-item:last-of-type {
								border-right: none;
							}
						}
					}

					.user-tag {
						margin-top: 20px;
						display: flex;
						align-items: center;
						justify-content: space-around;

						.user-tag-item {
							display: flex;
							flex-direction: column;
							align-items: center;
							font-size: 15px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #333333;
							cursor: pointer;

							.tit {
								margin-top: 10px;
								font-size: 13px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #666666;
							}
						}
					}
				}

				.user-menu {
					width: 100%;
					height: 242px;
					margin-top: 18px;
					background: #FFFFFF;
					box-sizing: border-box;
					padding: 30px 15px 30px 23px;

					.user-menu-item {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 25px;
						cursor: pointer;

						.left {
							display: flex;
							align-items: center;

							.icon-img {
								width: 24px;
								height: 24px;
								margin-right: 15px;
							}

							.item-tit {
								font-size: 15px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #333333;
							}
						}

						.right {
							color: #666666;
						}
					}
				}
			}

			.el-main {
				width: 1142px;
				padding: 0 0 0 20px;
				box-sizing: border-box;
				position: relative;
				left: 298px;
			}
		}
	}
</style>
