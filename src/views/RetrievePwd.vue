<template>
    <div class="register-container">
        <img src="../assets/image/login-bg.png" class="bg">
        <div class="register-main">
            <div class="register-main-tit">找回密码</div>
            <div class="register-main-box">
                <div class="main-box-item">
                    <img src="../assets/image/phone-icon.png" width="20px" height="26px" class="main-box-item-icon">
                    <el-input placeholder="请填写手机号"></el-input>
                </div>
                <div class="main-box-item">
                    <img src="../assets/image/code-icon.png" width="23px" height="27px" class="main-box-item-icon">
                    <el-input placeholder="请填写验证码"></el-input>
                    <div class="sen-code">获取验证码</div>
                </div>
                <div class="main-box-item">
                    <img src="../assets/image/password-icon.png" width="23px" height="29px" class="main-box-item-icon">
                    <el-input type="password" placeholder="请填写登录密码"></el-input>
                </div>
                <div class="main-box-item">
                    <img src="../assets/image/password-icon.png" width="23px" height="29px" class="main-box-item-icon">
                    <el-input type="password" placeholder="确认密码"></el-input>
                </div>
            </div>
            <el-button>立即注册</el-button>
            <div class="login-main-info">
                <el-checkbox v-model="checked">同意九挂靠</el-checkbox>
                <div>《用户协议》</div>
                <div>《个人隐私保护》</div>
            </div>
            <div class="login-main-footer">
                <div class="desc">已有账号</div>
                <div>直接登录</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                typeIndex: 0
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
