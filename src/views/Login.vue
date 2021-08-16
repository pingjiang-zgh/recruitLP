<template>
    <div class="login-container">
        <img src="../assets/image/login-bg.png" class="bg">
        <div class="login-main">
            <div class="login-main-tit">登录</div>
			<div class="login-main-type">
			    <div class="login-main-type-item" :class="{'active': UserEnptype === 0}" @click="UserLoginType(0)">个人</div>
			    <div class="login-main-type-item" :class="{'active': UserEnptype === 1}" @click="UserLoginType(1)">企业</div>
			</div>
            <div class="login-main-type">
                <div class="login-main-type-item" :class="{'active': typeIndex === 0}" @click="LoginType(0)">验证码登录</div>
                <div class="login-main-type-item" :class="{'active': typeIndex === 1}" @click="LoginType(1)">密码登录</div>
            </div>
            <div class="login-main-pwd-box" v-if="typeIndex === 0">
                <div class="pwd-box-item">
                    <img src="../assets/image/phone-icon.png" width="20px" height="26px" class="pwd-box-item-icon">
                    <el-input type="text" v-model="form.phone" placeholder="请填写手机号"></el-input>
                </div>
                <div class="pwd-box-item">
                    <img src="../assets/image/code-icon.png" width="23px" height="27px" class="pwd-box-item-icon">
                    <el-input type="text" v-model="form.code" placeholder="请填写验证码"></el-input>
                    <div v-show="show" @click="getVerification" class="sen-code">获取验证码</div>
                    <div v-show="!show" class="sen-code">{{count+'S'}}</div>
                </div>
            </div>
            <div class="login-main-pwd-box" v-if="typeIndex === 1">
                <div class="pwd-box-item">
                    <img src="../assets/image/phone-icon.png" width="20px" height="26px" class="pwd-box-item-icon">
                    <el-input type="text" v-model="form.phone" placeholder="请填写手机号"></el-input>
                </div>
                <div class="pwd-box-item">
                    <img src="../assets/image/code-icon.png" width="23px" height="27px" class="pwd-box-item-icon">
                    <el-input type="password" v-model="form.password" placeholder="请填写登录密码"></el-input>
                    <div @click="retrievePwd" class="reset-pwd">忘记密码？</div>
                </div>
            </div>
            <el-button @click="login">立即登录</el-button>
            <div class="login-main-info">
                <el-checkbox @change="checkedAgree" :checked="checked">同意九挂靠</el-checkbox>
                <div class="login">《用户协议》</div>
                <div class="login">《个人隐私保护》</div>
            </div>
            <div class="login-main-footer">
                <div class="desc">没有账号</div>
                <div class="login" @click="goRegister">立即注册</div>
            </div>
        </div>
    </div>
</template>

<script>
	import api from '../api/api.js'
    export default {
        data() {
            return {
				UserEnptype: 1,
                typeIndex: 1,
                form: {
                    phone: '',
                    password: '',
                    code: ''
                },
                checked: false,
				show: true,
				count:'',
            }
        },
		methods:{
			// 登录
			login(){
				let classOne = this.typeIndex == 0? 1 : 2
				if(this.formVerification(classOne)){
					// 验证通过 登录
					let postData = {
						mobile:this.form.phone,
						platform:1
					}
					if(classOne==1){
						// 验证码登录
						postData.code = this.form.code 
					}else{
						// 密码登录
						postData.pwd = this.form.password 
					}
					if(this.UserEnptype==0){
						this.$api.post(api.userLogin,postData,res=>{
							if(res.code == 1){
								this.$message({
									message: '登录成功！',
									type: 'success'
								})
								localStorage.setItem('userInfo',JSON.stringify(res.data))
								this.$router.push({path:'/'}).catch()
								localStorage.setItem('userType','0')
								// this.$router.push({path:'/company'})
							}
						},err=>{
							this.$message({
								message: err.msg,
								type: 'warning'
							})
						})
					}else{
						if(classOne==1){
							postData = {
								mobile:this.form.phone,
								code:this.form.code,
							}
						}else{
							postData = {
								mobile:this.form.phone,
								pwd:this.form.password,
							}
						}
						// api/En4terprise/login  企业登良
						this.$api.postForm(api.EnpLogin,postData).then(res=>{
							if(res.code == 1){
								this.$message({
									message: '登录成功！',
									type: 'success'
								})
								localStorage.setItem('userInfo',JSON.stringify(res.data))
								localStorage.setItem('userType','1')
								// this.$router.push({path:'/user/home'})
								this.$router.push({path:'/'}).catch(err=>err)
							}else{
								this.$message({
									message: res.msg,
									type: 'warning'
								})
							}
						}
							
						)
					}
					
					
				}
			},
			
			formVerification(type){
				let flag = true
				if(this.form.phone.trim()==""){
					this.$message({
						message: '请填写手机号码！',
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
				if(type == 1){ //验证码登录
					if(this.form.code.trim()==""){
						this.$message({
							message: '请填写验证码！',
							type: 'warning'
						});
					}
				}else{ // 密码登录
					if(this.form.password.trim()==""){
						this.$message({
							message: '请填写密码！',
							type: 'warning'
						});
					}
				}
				return flag
			},
			
			
			// 同意协议
			checkedAgree() {
				this.checked = !this.checked
				console.log(this.checked)
			},
			
			// 验证码登录还是密码登录
			LoginType(type){
				this.typeIndex = type
				this.form = {
					phone: '',
					password: '',
					code: ''
				}
			},
			
			// 个人登录还是用户登录
			UserLoginType(type){
				this.UserEnptype = type
				this.form = {
					phone: '',
					password: '',
					code: ''
				}
			},
			
			// 获取验证码
			getVerification() {
				let phone = this.form.phone
				let _this = this
				if (phone.length == 0 || phone.length != 11) {
					this.$message({
						message: '请填写正确的手机号！',
						type: 'warning'
					});
				} else {
					console.log(1111)
					this.$api.post(api.sendUserMobile,{mobile:this.form.phone},res=>{
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
			},
			
			
			retrievePwd(){
				this.$router.push({path:'/retrieve-pwd'})
			},
			
			goRegister(){
				this.$router.push({path:'/register'})
			}
			
		}
    }
</script>

<style scoped lang="scss">
    .login-container {
        width: 100%;
        height: 100%;
        position: relative;

        .bg {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 1;
        }
        .login-main {
            width: 480px;
            position: relative;
            z-index: 9;
            left: 14.3%;
            top: 19.5%;

            .login-main-tit {
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 36px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
            }
            .login-main-type {
                margin-top: 6%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .login-main-type-item {
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
                .login-main-type-item.active {
                    border: 1px solid #1E87F0;
                    color: #1E87F0;
                }
            }
            .login-main-pwd-box {
                margin-top: 5%;

                .pwd-box-item {
                    width: 100%;
                    height: 60px;
                    box-sizing: border-box;
                    border: 1px solid #E8E8E8;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 16px 0 25px;
                    margin-bottom: 4%;

                    .pwd-box-item-icon {
                        margin-right: 24px;
                    }
                    .reset-pwd {
                        min-width: 70px;
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #1E87F0;
                        cursor: pointer;
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
                .pwd-box-item:last-of-type {
                    margin-bottom: 0;
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
                > div {
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
