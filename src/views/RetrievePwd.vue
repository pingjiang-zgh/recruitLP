<template>
    <div class="register-container">
        <img src="../assets/image/login-bg.png" class="bg">
        <div class="register-main">
            <div class="register-main-tit">找回密码</div>
            <div class="register-main-box">
                <div class="main-box-item">
                    <img src="../assets/image/phone-icon.png" width="20px" height="26px" class="main-box-item-icon">
                    <el-input v-model="editInfo.mobile" placeholder="请填写手机号"></el-input>
                </div>
                <div class="main-box-item">
                    <img src="../assets/image/code-icon.png" width="23px" height="27px" class="main-box-item-icon">
                    <el-input v-model="editInfo.code" placeholder="请填写验证码"></el-input>
                   <div v-show="show" @click="getVerification" class="sen-code">获取验证码</div>
                   <div v-show="!show" class="sen-code">{{count+'S'}}</div>
                </div>
                <div class="main-box-item">
                    <img src="../assets/image/password-icon.png" width="23px" height="29px" class="main-box-item-icon">
                    <el-input v-model="editInfo.pass" type="password" placeholder="请填写登录密码"></el-input>
                </div>
                <div class="main-box-item">
                    <img src="../assets/image/password-icon.png" width="23px" height="29px" class="main-box-item-icon">
                    <el-input v-model="editInfo.passs" type="password" placeholder="确认密码"></el-input>
                </div>
            </div>
            <el-button @click="editPwd">立即修改</el-button>
            <div class="login-main-info">
                <el-checkbox @change="checkedAgree" :checked="checked">同意九挂靠</el-checkbox>
                <div>《用户协议》</div>
                <div>《个人隐私保护》</div>
            </div>
            <div class="login-main-footer">
                <div class="desc">已有账号</div>
                <div @click="login">直接登录</div>
            </div>
        </div>
    </div>
</template>

<script>
	import api from "../api/api.js"
    export default {
        data() {
            return {
                typeIndex: 0,
				editInfo:{
					mobile:'',
					code:'',
					pass:'',
					passs:'',
				},
				show:true,
				count:'',
				checked:true,
            }
        },
		methods:{
			
			// 立即修改
			editPwd(){
				if(this.formVerification()){
					console.log('已填写所有信息')
					let {mobile,
						code,
						pass,
						passs,} = this.editInfo
					// 修改密码
					let postData = {
						mobile,
						code,
						pass,
						passs,
						platform:1,
					}
					console.log(postData)
					this.$api.postForm(api.userPassReset,postData).then(res=>{
						console.log(res)
						if(res.code == 1){
							this.$message({
								message: '修改成功',
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
					
					
				}
			},
			
			// 表单验证
			formVerification(){
				let flag = true
				if(this.editInfo.mobile.trim() == ""||this.editInfo.code.trim() == ""||this.editInfo.pass.trim() == ""||this.editInfo.passs.trim() == ""){
					this.$message({
						message: '请填写所有信息！',
						type: 'warning'
					});
					return false
				}
				if (this.editInfo.mobile.length != 11) {
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
				if(this.editInfo.pass!==this.editInfo.passs){
					this.$message({
						message: '密码不一致！',
						type: 'warning'
					});
					return false
				}
				
				return flag
			},
			
			// 登录
			login(){
				this.$router.push({path:'/login'})
			},
			// 同意协议
			checkedAgree() {
				this.checked = !this.checked
				console.log(this.checked)
			},
			
			// 获取验证码
			getVerification() {
				let phone = this.editInfo.mobile
				let _this = this
				if (phone.length == 0 || phone.length != 11) {
					this.$message({
						message: '请填写正确的手机号！',
						type: 'warning'
					});
				} else {
					console.log(1111)
					this.$api.post(api.sendUserMobile,{mobile:this.editInfo.mobile},res=>{
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
</style>
