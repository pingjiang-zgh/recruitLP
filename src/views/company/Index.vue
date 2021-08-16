<template>
	<div class="user-container">
		<el-container>
			<el-aside width="298px">
				<div class="user-box">
					<div class="user-head">
						<img v-if="enpInfo.avatar!=''" :src="enpInfo.avatar" width="64px" height="64px">
						<img v-else src="../../assets/image/user-default-head.png" width="64px" height="64px">
						<div  @click="goEnpInfo" class="edit-btn">编辑</div>
					</div>
					<div class="user-name">{{enpInfo.name}}</div>
					<div class="user-info-box">
						<div class="user-info">
							<div class="user-info-item">{{enpInfo.city==""?'城市待完善':enpInfo.city}}</div>
							<div class="user-info-item">{{enpInfo.peoples==""?'范围待完善':enpInfo.peoples}}人</div>
							<div class="user-info-item">{{enpInfo.industry==""?'行业待完善':enpInfo.industry}}</div>
						</div>
					</div>
				</div>
				<div class="user-menu">
					<div @click="goEnpInfo" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/company/menu-icon1.png" class="icon-img">
							<div class="item-tit">公司信息</div>
						</div>
						<div class="right">
							<img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
						</div>
					</div>
					<div @click="goResume" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/company/menu-icon3.png" class="icon-img">
							<div class="item-tit">简历管理</div>
						</div>
						<div class="right">
							<img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
						</div>
					</div>
					<div @click="goRecord" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/company/menu-icon3.png" class="icon-img">
							<div class="item-tit">消费记录</div>
						</div>
						<div class="right">
							<img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
						</div>
					</div>
					<div @click="goJob" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/company/menu-icon4.png" class="icon-img">
							<div class="item-tit">招聘管理</div>
						</div>
						<div class="right">
							<img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
						</div>
					</div>
					<!-- <div @click="goVip" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/company/menu-icon4.png" class="icon-img">
							<div class="item-tit">增值服务</div>
						</div>
						<div class="right">
							<img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
						</div>
					</div> -->
					
					<div @click="goInvest" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/company/menu-icon4.png" class="icon-img">
							<div class="item-tit">金币充值</div>
						</div>
						<div class="right">
							<img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
						</div>
					</div>
					<div @click="loginOut" class="user-menu-item">
						<div class="left">
							<img src="../../assets/image/company/menu-icon4.png" class="icon-img">
							<div class="item-tit">退出登录</div>
						</div>
						<div class="right">
							<img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
						</div>
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
	import api from '../../api/api.js'
	import Footer from "../../Footer/index.vue"
	export default {
		components:{
			Footer
		},
		name: "Company",
		inject:['reload'],
		data() {
			return {
				enpInfo: {avatar:''},
			}
		},
		created() {
			this.getEnpInfo()
		},

		methods: {
			getEnpInfo() {
				let enpInfo = api.getUserInfo()
				console.log(enpInfo)
				this.enpInfo = enpInfo
			},
			goEnpInfo() {
				this.$router.push({
					path: "/company/info"
				}).catch(err => err)
			},
			goJob() {
				// /company/job
				this.$router.push({
					path: "/company/job"
				}).catch(err => err)
			},
			loginOut() {
				console.log(1)

				this.$confirm('此操作将退出登录, 是否继续?', '退出', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$api.postForm(api.enpQuit,{mobile:api.getUserInfo().mobile}).then(res=>{
						if(res.code==1){
							this.$message({
								type: 'success',
								message: '退出成功!'
							});
							localStorage.removeItem('userInfo')
							localStorage.removeItem('userType')
							this.$router.push({path:'/'}).then(res=>{
								this.reload()
							})
						}else{
							this.$message.warning(res.msg)
						}
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消退出'
					});
				});

			},
			// 跳转会员页面
			goVip(){
				this.$router.push({path:'/company/member'}).catch(err=>err)
			},
			
			goResume(){
				this.$router.push({path:'/company/home'}).catch(err=>err)
			},
			
			goRecord(){
				this.$router.push({path:'/company/record'}).catch(err=>err)
			},
			
			goInvest(){
				this.$router.push({path:'/company/investMoney'}).catch(err=>err)
			}
		},

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
					height: 180px;
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
				}

				.user-menu {
					width: 100%;
					min-height: 242px;
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
				width: 900px;
				min-height: 600px;
				padding: 0 0 0 20px;
				box-sizing: border-box;
				position: relative;
				left: 298px;
			}
		}
	}
	
	.info-container{
		width: 1102px;
	}
</style>
