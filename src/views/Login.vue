<template>
    <div class="login-container">
        <img src="../assets/image/login-bg.png" class="bg">
        <div class="login-main">
            <div class="login-main-tit">登录</div>
            <div class="login-main-type">
                <div class="login-main-type-item" :class="{'active': typeIndex === 0}" @click="typeIndex = 0">手机号登录</div>
                <div class="login-main-type-item" :class="{'active': typeIndex === 1}" @click="typeIndex = 1">密码登录</div>
            </div>
            <div class="login-main-pwd-box" v-if="typeIndex === 0">
                <div class="pwd-box-item">
                    <img src="../assets/image/phone-icon.png" width="20px" height="26px" class="pwd-box-item-icon">
                    <el-input type="text" v-model="form.phone" placeholder="请填写手机号"></el-input>
                </div>
                <div class="pwd-box-item">
                    <img src="../assets/image/code-icon.png" width="23px" height="27px" class="pwd-box-item-icon">
                    <el-input type="text" v-model="form.code" placeholder="请填写验证码"></el-input>
                    <div class="sen-code">获取验证码</div>
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
                    <div class="reset-pwd">忘记密码？</div>
                </div>
            </div>
            <el-button>立即登录</el-button>
            <div class="login-main-info">
                <el-checkbox v-model="checked">同意九挂靠</el-checkbox>
                <div>《用户协议》</div>
                <div>《个人隐私保护》</div>
            </div>
            <div class="login-main-footer">
                <div class="desc">没有账号</div>
                <div>立即注册</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                typeIndex: 1,
                form: {
                    phone: '',
                    password: '',
                    code: ''
                },
                checked: false
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
</style>
