<template>
	<el-container>
		<el-header height="63px">
			<el-row class="header-box">
				<el-col :span="12" class="menu-col">
					<img src="../assets/image/login-icon.png" class="login-icon cursor">
					<el-menu :default-active="activeIndex" class="tab-menu" mode="horizontal" @select="handleSelect">
						<el-menu-item @click="goHome" index="1">首页</el-menu-item>
						<el-menu-item @click='goRecruit' index="2">招聘信息</el-menu-item>
						<el-menu-item @click='goResumeDB' index="3">简历库</el-menu-item>
						<!-- <el-menu-item index="4">挂靠价格</el-menu-item> -->
					</el-menu>
				</el-col>
				<el-col :span="12">
					<div class="tag-col">
						<div v-show="showBtn[0]" @click="goResume" class="tag-item">上传简历</div>
						<div v-show="showBtn[1]" @click="goSearch" class="tag-item">我要找工作</div>
						<div v-show="showBtn[2]" @click="goJob" class="tag-item">我要招聘</div>
						<div v-show="islogin" @click="register" class="tag-item btn">注册</div>
						<div @click="login" v-show="islogin" class="tag-item btn">登录</div>
						<div @click="goself" v-show="!islogin" class="tag-item aract">
							<img class="avatar_img" v-if="aract!=''" :src="aract" alt="">
							<img class="avatar_img" v-else src="../assets/image/user-default-head.png">
						</div>
					</div>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<router-view></router-view>
			<Footer></Footer>
		</el-main>


	</el-container>

</template>

<script>
	import api from "../api/api.js"
	import Footer from "../Footer/index.vue"
	export default {
		components: {
			Footer
		},
		name: "index",
		data() {
			return {
				activeIndex: '1',
				islogin: true,
				showBtn: [true, true, true, true],
				aract: '', // 头像
				// ShowCu: false,
				UserIsLogin: true,
			}
		},
		created() {
			this.getActiveIndex()
			this.arelogin()

		},
		watch: {

		},
		methods: {
			getActiveIndex() {
				if (this.$route.fullPath == "/resume/recruit") {
					this.activeIndex = '2'
				} else if (this.$route.fullPath == "/resume") {
					this.activeIndex = '3'
				}
			},
			arelogin() {
				if (localStorage.getItem('userInfo')) {
					this.islogin = false
					let userinfo = api.getUserInfo()
					this.aract = userinfo.avatar
					// 判断是用户还是企业
					let userType = localStorage.getItem('userType')
					console.log(userType)
					if (userType == 1) { //是企业
						this.showBtn = [false, false, true]
						// this.ShowCu = true
					} else {
						this.showBtn = [true, true, false]
					}
				} else {
					this.showBtn = [false, false, false]
				}
			},
			handleSelect(key, keyPath) {
				// console.log('aa', key, keyPath);
			},
			loginOut() {
				let userinfo = JSON.parse(localStorage.getItem('userInfo'))
				let platform = 1
				let mobile = userinfo.mobile
				console.log(111)


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
						this.islogin = true
						this.$router.push({
							path: '/'
						})
					} else {
						console.log(res)
					}
				})

			},

			login() {
				this.$router.push({
					path: '/login'
				}).catch(err => err)
			},

			register() {
				this.$router.push({
					path: '/register'
				}).catch(err => err)
			},


			goHome() {
				this.$router.push({
					path: '/'
				}).catch(err => err)
			},

			goResume() {
				this.$router.push({
					path: '/rencai/releaseResume'
				}).catch(err => err)
			},
			goJob() {

				this.$router.push({
					path: '/qiye/jobEdit'
				}).catch(err => err)
			},

			goself() {
				let userType = localStorage.getItem('userType')
				if (userType == 1) {
					this.getEntUserInfo()
				} else {
					this.getUserUserInfo()
				}
				if (!this.UserIsLogin) {
					return
				}


				if (userType == 1) {
					this.$router.push({
						path: '/qiye/info'
					}).catch(err => err)
				} else {
					this.$router.push({
						path: '/rencai/info'
					}).catch(err => err)
				}
			},

			// 判断企业是否登录
			getEntUserInfo() {

				let postData = {
					mobile: api.getUserInfo().mobile,
				}
				this.$api.postForm(api.EnpUserInfo, postData).then(res => {
					if (res.code == 1) {
						if(res.data){
							this.UserIsLogin = true
						}else{
							this.removeLogin()
						}
					} else {
						this.removeLogin()

					}
				})
			},
			
			// 删除登录状态
			removeLogin(){
				localStorage.removeItem('userInfo');
				localStorage.removeItem('userType');
				this.UserIsLogin = false
				setTimeout(() => {
					this.$router.push({
						path: '/login'
					})
				}, 1500)
			},

			// 判断用户是否登录
			getUserUserInfo() {
				let postData = {
					mobile: api.getUserInfo().mobile,
					platform: 1
				}
				this.$api.postForm(api.userInfo, postData).then(res => {
					console.log(res)
					if (res.code == 1) {
						if(res.data){
							this.UserIsLogin = true
						}else{
							this.removeLogin()
						}
					} else {
						this.removeLogin()
					}
				})
			},

			goRecruit() {
				this.$router.push({
					path: '/zhaopin/fenlei'
				}).catch(err => err)
			},

			goResumeDB() {
				this.$router.push({
					path: '/jl'
				}).catch(err => err)
			},

			goSearch() {
				this.$router.push({
					path: '/zhaopin/fenlei'
				}).catch(err => err)
			}




		}
	}
</script>

<style scoped lang="scss">
	.el-container {
		width: 100%;
		height: 100%;
	}

	.el-header {
		background: #202329;
		position: fixed;
		width: 100%;
		z-index: 1024;
		padding: 0;
	}

	.el-main {
		position: absolute;
		width: 100%;
		top: 63px;
		padding: 0;
		overflow: unset;
	}

	.el-menu.el-menu--horizontal {
		border: none;
	}

	.el-menu--horizontal>.el-menu-item {
		border: none;
		font-size: 15px;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
	}

	.el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
	.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
	.el-menu--horizontal>.el-submenu .el-submenu__title:hover {
		background: unset;
		color: #1E87F0;
	}

	.el-menu--horizontal>.el-menu-item.is-active {
		color: #1E87F0;
	}

	.header-box {
		width: 1200px;
		height: 100%;
		margin: 0 auto;

		.el-col {
			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.tag-col {
				height: 100%;
				display: flex;
				align-items: center;

				.tag-item {
					height: 100%;
					display: flex;
					align-items: center;
					font-size: 15px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #FFFFFF;
					margin-right: 20px;
					cursor: pointer;
				}

				.tag-item:last-of-type {
					margin-right: 0;
				}

				.tag-item.btn {
					width: 52px;
					height: 26px;
					border: 1px solid #1E87F0;
					font-size: 15px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #1E87F0;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 13px;
				}
			}
		}

		.menu-col {
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.login-icon {
				width: 48px;
				height: 48px;
			}

			.tab-menu {
				height: 100%;
				background: #202329;
				margin-left: 88px;

				.el-menu-item {
					padding: 0;
					margin-right: 28px;
				}

				.el-menu-item:last-of-type {
					margin-right: 0;
				}
			}
		}
	}

	.aract {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar_img {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		box-sizing: border-box;
		border: 2px solid #fff;
		display: block;
		overflow: hidden;
		background: #000;
	}
</style>
