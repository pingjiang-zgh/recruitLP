<template>
	<div class="register-container">
		<img src="../assets/image/login-bg.png" class="bg">
		<div class="register-main">
			<div class="register-main-tit">注册</div>
			<div class="register-main-type">
				<div class="register-main-type-item" :class="{'active': typeIndex === 0}" @click=" changeWay(0)">我要找工作
				</div>
				<div class="register-main-type-item" :class="{'active': typeIndex === 1}" @click="changeWay(1)">我要招聘
				</div>
			</div>
			<div class="register-main-box">
				<div class="main-box-item">
					<img src="../assets/image/phone-icon.png" width="20px" height="26px" class="main-box-item-icon">
					<el-input v-model="registerInfo.mobile" placeholder="请填写手机号" maxlength='11'></el-input>
				</div>
				<div class="main-box-item">
					<img src="../assets/image/code-icon.png" width="23px" height="27px" class="main-box-item-icon">
					<el-input v-model="registerInfo.code" placeholder="请填写验证码"></el-input>
					<div v-show="show" @click="getVerification" class="sen-code">获取验证码</div>
					<div v-show="!show" class="sen-code">{{count+'S'}}</div>
				</div>
				<div class="main-box-item">
					<img src="../assets/image/password-icon.png" width="23px" height="29px" class="main-box-item-icon">
					<el-input v-model="registerInfo.pwd" type="password" placeholder="请填写登录密码"></el-input>
				</div>
				<div class="main-box-item">
					<img src="../assets/image/user-icon.png" width="25px" height="29px" class="main-box-item-icon">
					<el-input v-model="registerInfo.UserName" type="text" placeholder="请填写用户名称(真实姓名或公司名称)"></el-input>
				</div>
			</div>
			<el-button @click="registers">立即注册</el-button>
			<div class="login-main-info">
				<el-checkbox @change="checkedAgree" :checked="checked">同意九挂靠</el-checkbox>
				<div class="login">《用户协议》</div>
				<div class="login">《个人隐私保护》</div>
			</div>
			<div class="login-main-footer">
				<div class="desc">已有账号</div>
				<div class="login" @click="login">直接登录</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	import api from "../api/api.js"
	export default {
		data() {
			return {
				typeIndex: 0,
				registerInfo: {
					mobile: '',
					pwd: '',
					code: '',
					platform: '',
					UserName: '',
					class: 1,
				},
				checked: false,
				timer: null, // 倒计时
				show: true,
				count: '',
				isSubmit:true,
			}
		},
		created() {
			
		},
		methods: {
			// 登录
			login(){
				this.$router.push({path:'/login'})
			},
			
			// 同意协议
			checkedAgree() {
				this.checked = !this.checked
				console.log(this.checked)
			},
			
			
			// 立即注册
			registers() {
				console.log(this.isSubmit)
				if (this.formVerification()) {
					// if(this.isSubmit){
						this.isSubmit = false
						let {pwd,code,UserName,mobile,platform} = this.registerInfo
						let Oneclass = this.registerInfo.class
						let postData = {
							code,
							pwd,
							name:UserName,
							mobile:mobile,
							platform:1,
							class:Oneclass
					
						}
						// axios.post({
						// 	url:'http://192.168.1.109/index.php/api/User/userRegister',
						// 	data:postData,
						// 	methods:'post',
						// 	headers: {
						// 	    'Content-Type': 'application/x-www-form-urlencoded'
						// 	}
						// }).then(res=>{
						// 	console.log(res)
						// })
						this.$api.postForm(api.userRegister,postData).then(res=>{
							// console.log(res)
							if(res.code == 1){
								this.$message({
									message: '注册成功',
									type: 'success'
								})
								this.$router.push({path:'/login'})
							}else{
								this.$message({
									message: res.msg,
									type: 'warning'
								})
							}
						})
						
						// this.$api.post(api.userRegister,postData,res=>{
						// 	if(res.code == 1){
						// 		console.log(res)
						// 		this.isSubmit = true
								
						// 	}else{
						// 		this.isSubmit = true
						// 		console.log(this.isSubmit)
						// 	}
						// })
					
				}


				// console.log(this.registerInfo)
			},
			// 表单验证
			formVerification() {
				let flag = true
				if (this.registerInfo.UserName.length == 0 || this.registerInfo.mobile.length == 0 || this.registerInfo.pwd
					.length == 0 || this.registerInfo.code.length == 0) {
					console.log(1)
					this.$message({
						message: '请填写所有信息！',
						type: 'warning'
					});asd
					return false
				}
				if (this.registerInfo.mobile.length != 11) {
					this.$message({
						message: '请填写正确的手机号！',
						type: 'warning'
					});
					return false
				}
				if(this.checked==false){
					this.$message({
						message: '请勾选同意用户协议！',
						type: 'warning'
					});
					return false
				}
				return flag
			},

			// 用户 企业切换
			changeWay(typeIndex) {
				this.typeIndex = typeIndex
				this.registerInfo = {
					mobile: '',
					pwd: '',
					code: '',
					platform: '',
					UserName: '',
					class:  typeIndex + 1,
				}
				// this.registerInfo.class = typeIndex + 1
			},

			// 获取验证码
			getVerification() {
				let phone = this.registerInfo.mobile
				let _this = this
				if (phone.length == 0 || phone.length != 11) {
					this.$message({
						message: '请填写正确的手机号！',
						type: 'warning'
					});
				} else {
					console.log(1111)
					this.$api.post(api.sendUserMobile,{mobile:this.registerInfo.mobile},res=>{
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.register-container {
		width: 100%;
		height: 100%;
		position: relative;

		.bg {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 1;
		}

		.register-main {
			width: 480px;
			position: relative;
			z-index: 9;
			left: 14.3%;
			top: 19.5%;

			.register-main-tit {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 36px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #000000;
			}

			.register-main-type {
				margin-top: 6%;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.register-main-type-item {
					width: 226px;
					height: 57px;
					border: 1px solid #E8E8E8;
					font-size: 17px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #A8A8A8;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
				}

				.register-main-type-item.active {
					border: 1px solid #1E87F0;
					color: #1E87F0;
				}
			}

			.register-main-box {
				margin-top: 5%;

				.main-box-item {
					width: 100%;
					height: 60px;
					box-sizing: border-box;
					border: 1px solid #E8E8E8;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 16px 0 25px;
					margin-bottom: 4%;

					.main-box-item-icon {
						margin-right: 24px;
					}

					.sen-code {
						font-size: 17px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #1E87F0;
						min-width: 110px;
						box-sizing: border-box;
						padding-left: 20px;
						border-left: 1px solid #E8E8E8;
						cursor: pointer;
						text-align: center;
					}

					/deep/ .el-input {
						height: 100%;

						.el-input__inner {
							height: 100%;
							border: none;
							border-radius: 0;
							background: unset;
						}
					}
				}
			}

			/deep/ .el-button {
				width: 100%;
				height: 60px;
				background: #1E87F0;
				font-size: 17px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 0;
				border: none;
				margin-top: 5%;
			}

			.login-main-info {
				margin-top: 3%;
				display: flex;
				align-items: center;
				justify-content: center;

				/deep/ .el-checkbox {
					font-size: 14px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
				}

				>div {
					font-size: 14px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #1E87F0;
				}
			}

			.login-main-footer {
				margin-top: 2%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #1E87F0;

				.desc {
					margin-right: 10px;
					color: #999999;
				}
			}
		}
	}

	.login{
		cursor: pointer;
	}
</style>
