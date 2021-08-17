<template>
	<div class="content">
		<div class="header">
			<div class="foramt-mrgin header-info">
				<div class="header-info-txt">
					<div class="info-icons">
						<img v-if="UserInfo.avatar!=''" :src="UserInfo.avatar" >
						<img v-else src="../../assets/image/user-default-head.png" >
					</div>
					<div class="info-txt">
						<div class="info-name">
							{{UserInfo.name}}
						</div>
						<div class="info-user">
							<span>{{UserInfo.sex==1?'男':'女'}}</span> <span class="line"></span>
							<span>{{UserInfo.birth}}岁</span>
							<!-- <span class="line"></span>
							<span>本科</span>
							<span>年</span> -->
						</div>
						<div class="info-year">
							<span>{{UserInfo.join_date}}年工作经验</span> <span>{{UserInfo.address}}</span>
						</div>
					</div>
				</div>
				
				<div @click="openContact " class="callUs">
					查看联系方式
				</div>
			</div>
		</div>
		
		<div class="message foramt-mrgin">
			<div class="mesLeft">
				<div class="title">求职信息</div>
				<div class="li_txt">
					<span>情况：</span> {{ResumInfo.state}}
				</div>
				<div class="li_txt">
					<span>用途：</span> {{ResumInfo.purpose==1?'挂资质':ResumInfo.purpose==2?'挂项目':'均可'}}
				</div>
				<div class="li_txt">
					<span>证书状态：</span> {{ResumInfo.certificate_status}}
				</div>
				<div class="li_txt">
					<span>注册状态：</span> {{ResumInfo.register_status}}
				</div>
				<div class="li_txt">
					<span>期望城市：</span> {{ResumInfo.wish_city}}
				</div>
				<div class="li_txt">
					<span>期望职位：</span> {{ResumInfo.wish_join}}
				</div>
				<div class="li_txt">
					<span>期望薪资：</span> {{ResumInfo.wish_money}}
				</div>
				
				<div class="li_txt">
					<span>其他说明：</span> {{ResumInfo.goodness}}
				</div>
				
				<div class="lines"></div>
			</div>
			<div class="mesRight">
				<div class="titles_renc">
					<div class="rencai">优质人才</div>
					<!-- <div class="more">更多>></div> -->
				</div>
				
				
				<div class="rencai-box">
					<div @click="goRecruitDetails(item.id)" class="rencai-item" v-for="(item,i) in RecommendResumList" :key='item.id'>
						<div class="rencai-icon">
							<img v-if="item.avatar!=''" :src="item.avatar" >
							<img v-else src="../../assets/image/user-default-head.png" />
						</div>
						<div class="rencai-info">
							<div>{{item.name}}</div>
							<div class="rencai-address">
								{{item.wish_city}}
							</div>
							<div>{{item.wish_join}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="查看联系方式" :visible.sync="dialogVisible" width="30%">
			
			<div class="contcart"><div>手机：</div><div>{{UserInfo.mobile}}</div></div>
			<div class="contcart"><div>微信：</div><div>{{UserInfo.wxaccount}}</div></div>
			<div class="contcart"><div>邮箱：</div><div>{{UserInfo.email}}</div></div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="choiseColl">确 定</el-button>
			</span>
		</el-dialog>
		
		
	</div>
</template>

<script>
	import api from "../../api/api.js"
	export default {
		inject:['reload'],
		data(){
			return{
				
				// 查看联系方式
				dialogVisible: false,
				id:'',
				ResumInfo:{}, // 简历信息
				UserInfo:{}, // 求职者信息
				RecommendResumList:[], // 推荐列表
			}
		},
		created() {
			if(this.$route.query.id){
				this.id = this.$route.query.id
				this.getResumDetails()
				this.getRecommendResumList()
			}
		},		
		methods:{
			getResumDetails(){
				// let mobile = localStorage.getItem('userInfo')
				// mobile = JSON.parse(mobile).mobile
				
				let postData = {
					id:this.id,
				}
				
				if(api.getUserInfo()){
					let mobile = api.getUserInfo().mobile
					postData.mobile =mobile
				}
				this.$api.postForm(api.getSomeOneResumDetails,postData).then(res=>{
					if(res.code==1){
						this.ResumInfo = res.data
						this.UserInfo = res.data.userinfo
						console.log(this.UserInfo)
						this.UserInfo.birth = this.getUserBirthday(this.UserInfo.birth)
						this.UserInfo.join_date = this.getUserBirthday(this.UserInfo.join_date)
					}
				})
			},
			
			// 获取人才列表
			getRecommendResumList(){
				let postData = {
					city:localStorage.getItem('city')
				}
				this.$api.postForm(api.getPushUserResumee,postData).then(res=>{
					if(res.code==1){
						this.RecommendResumList = res.data
						console.log(this.RecommendResumList)
					}else{
						this.$message.warning(res.msg)
					}
				})
			},	
			
			openContact(){
				if(api.getUserInfo()){
					if(localStorage.getItem('userType')==1){ // 是企业
						this.getEntUserInfo()
					}else{ // 用户
						this.getUserUserInfo()
					}
				}else{
					
					this.removeLogin()
				}
			},
			
			
			choiseColl(){
				this.dialogVisible = false
			},
			
			// 获取年龄
			getUserBirthday(str){
				 let birth = str.split('-')
				 birth = birth[0]
				let year = new Date()
				year = year.getFullYear()
				
				return (year-0) -( birth-0)
			},
			
			goRecruitDetails(id) {
				this.$router.push({
					path: '/jl/resumedetails',
					query: {
						id
					}
				}).then(res=>{
					this.reload()
				})
			},
			
			
			
			
			// 判断企业是否登录
			getEntUserInfo() {
			
				let postData = {
					mobile: api.getUserInfo().mobile,
				}
				this.$api.postForm(api.EnpUserInfo, postData).then(res => {
					if (res.code == 1) {
						if(res.data){
							this.dialogVisible = true
							
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
				this.$message.warning('您还未登录')
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
							this.dialogVisible = true
						}else{
							this.removeLogin()
						}
					} else {
						this.removeLogin()
					}
				})
			},
		},
		
		
	}
</script>

<style scoped lang="scss">
	*{
		font-family: Microsoft YaHei;
	}
	.header{
		width: 100%;
		background: #fff;
	}
	.foramt-mrgin {
		width: 1200px;
		margin: 0 auto;
	}
	.header-info{
		padding: 30px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.header-info-txt{
		display: flex;
		align-items: center;
	}
	.info-icons{
		width: 106px;
		height: 106px;
		border-radius: 53px;
		overflow: hidden;
		margin-right: 20px;
	}
	.info-name{
		font-size: 26px;
		font-weight: 400;
		color: #000000;
	}
	.info-user{
		font-size: 23px;
		font-weight: 400;
		color: #DD661D;
		display: flex;
		align-items: center;
		margin: 10px 0 8px;
	}
	.line{
		width: 1px;
		height: 16px;
		background: #DD661D;
		margin: 0 10px;
	}
	
	.info-year{
		font-size: 18px;
		font-weight: 400;
		color: #666666;
		span{
			margin-right: 20px;
		}
	}
	
	.callUs{
		width: 169px;
		height: 45px;
		background: #1E87F0;
		color: #fff;
		border-radius: 5px;
		font-size: 18px;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 45px;
		text-align: center;
		cursor: pointer;
	}
	.message{
		overflow: hidden;
		justify-content: space-between;
		margin-top: 10px;
	}
	
	.mesLeft{
		background: #fff;
		width: 764px;
		padding: 30px;
		box-sizing: border-box;
		float: left;
	}
	.mesRight{
		float: right;
		width: 426px;
		padding: 30px;
			background: #fff;
			box-sizing: border-box;
		.titles_renc{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.rencai{
				font-size: 20px;
				color: #333;
			}
			.more{
				font-size: 16px;
				color: #999;
			}
		}
	}
	.title{
		font-size: 20px;
		font-weight: 400;
		color: #000000;
		margin-bottom: 20px;
	}
	.li_txt{
		margin: 30px 0;
		font-size: 15px;
		font-weight: 400;
		color: #333;
		span{
			color: #999;
		}
	}
	.lines{
		width: 100%;
		height: 1px;
		background: #eee;
		margin-bottom: 10px;
	}
	.rencai-box{
		width: 100%;
		margin-top: 50px;
	}
	.rencai-item{
		display: flex;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 1px solid #eee;
		margin-bottom: 20px;
	}
	.rencai-icon{
		width: 60px;
		height: 60px;
		border-radius: 30px;
		overflow: hidden;
		margin-right: 10px;
	}
	.rencai-info{
		font-size: 14px;
		color: #333;
	}
	.rencai-address{
		margin: 20px 0;
		padding-left: 10px;
		border-left: 1px solid #eee;
	}
	img{
		  width: 100%;
		  height: 100%;
	}
	
	.contcart{
		width: 100%;
		padding: 10px 30px;
		display: flex;
		box-sizing: border-box;
	}
</style>
