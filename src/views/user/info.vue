<template>
    <div class="info-container">
        <div class="material-box">
            <div class="material-box-head">编辑个人信息</div>
            <div class="material-box-main">
                <div class="main-item">
                    <div class="main-item-tit">姓名</div>
                    <el-input class="main-item-input" placeholder="请填写姓名"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">微信</div>
                    <el-input class="main-item-input" placeholder="请填写微信号"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">性别</div>
                    <div class="sex-radio">
                        <div class="sex-radio-item" @click="changeSex(1)" :class="{'active': sex === 1}">男</div>
                        <div class="sex-radio-item" @click="changeSex(2)" :class="{'active': sex === 2}">女</div>
                    </div>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">联系电话</div>
                    <el-input class="main-item-input" placeholder="请填写手机号"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">用途</div>
                    <el-select v-model="value" placeholder="请选择" class="main-item-input">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">邮箱（选填）</div>
                    <el-input class="main-item-input" placeholder="请填写邮箱"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">情况</div>
                    <el-select v-model="value" placeholder="请选择" class="main-item-input">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="advantage-box">
            <div class="advantage-box-head">个人优势</div>
            <div class="advantage-box-input-container">
                <el-input type="textarea" placeholder="请输入内容" class="advantage-box-input"
                          v-model="textarea"
                          maxlength="200"
                          show-word-limit
                />
            </div>
        </div>
        <div class="qualif-box">
            <div class="qualif-box-head">资质</div>
            <div class="qualif-box-main">
                <div class="main-item">
                    <div class="main-item-tit">工作城市</div>
                    <el-select v-model="value" placeholder="请选择工作城市" class="main-item-input">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">期望职位</div>
                    <el-select v-model="value" placeholder="请选择期望职位" class="main-item-input">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="main-item nbt">
                    <div class="main-item-tit">期望薪资</div>
                    <div class="main-item-input-group">
                        <el-input class="group-input" placeholder="请填写薪资金额"></el-input>
                        <div class="tit">至</div>
                        <el-input class="group-input" placeholder="请填写薪资金额"></el-input>
                    </div>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">期望行业</div>
                    <el-select v-model="value" placeholder="请选择期望行业" class="main-item-input">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="footer-btn">
            <el-button>保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                sex: 1,
                textarea: ''
            }
        },
        methods: {
            changeSex(val) {
                this.sex = val
            }
        }
    }
</script>

<style scoped lang="scss">
    .info-container {
        .material-box {
            width: 100%;
            background: #ffffff;
            box-sizing: border-box;
            padding: 30px 30px 0 10px;

            .material-box-head {
                box-sizing: border-box;
                padding: 0 0 24px 24px;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
                border-bottom: 1px solid #F4F4F4;
            }
            .material-box-main {
                padding: 24px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;

                .main-item {
                    width: 45%;
                    margin-bottom: 22px;

                    .main-item-input {
                        background: #F8F9FB;
                        border: 1px solid #F4F4F4;
                        margin-top: 10px;
                        width: 100%;

                    }
                    /deep/ .el-input__inner {
                        border: none;
                        background: #F8F9FB;
                    }
                    .sex-radio {
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        width: 100%;

                        .sex-radio-item {
                            width: 40%;
                            height: 38px;
                            background: #F8F9FB;
                            border: 1px solid #F4F4F4;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 15px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #A8A8A8;
                            cursor: pointer;
                        }
                        .sex-radio-item.active {
                            border: 1px solid #1E87F0;
                            color: #1E87F0;
                        }
                    }
                }
                .main-item:last-of-type {
                    margin-bottom: 0;
                }
            }
        }
        .advantage-box {
            box-sizing: border-box;
            padding: 28px 30px 28px 10px;
            background: #ffffff;
            margin-top: 20px;

            .advantage-box-head {
                box-sizing: border-box;
                padding: 0 0 24px 24px;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
                border-bottom: 1px solid #F4F4F4;
            }
            .advantage-box-input-container {
                box-sizing: border-box;
                padding: 24px 30px;

                .advantage-box-input {
                    height: 128px;
                    border: 1px solid #F4F4F4;
                }
                /deep/ .el-textarea__inner {
                    height: 100%;
                    border: none;
                    background: #F8F9FB;
                }
            }
        }
        .qualif-box {
            box-sizing: border-box;
            padding: 28px 30px 28px 10px;
            background: #ffffff;
            margin-top: 20px;

            .qualif-box-head {
                box-sizing: border-box;
                padding: 0 0 24px 24px;
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
                border-bottom: 1px solid #F4F4F4;
            }
            .qualif-box-main {
                padding: 30px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;

                .main-item {
                    width: 45%;
                    margin-bottom: 22px;

                    .main-item-input-group {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        margin-top: 10px;

                        .group-input {
                            width: 40%;
                            border: 1px solid #F4F4F4;
                        }
                        .tit {
                            font-size: 15px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #A8A8A8;
                        }
                    }
                    .main-item-input {
                        background: #F8F9FB;
                        border: 1px solid #F4F4F4;
                        margin-top: 10px;
                        width: 100%;

                    }
                    /deep/ .el-input__inner {
                        border: none;
                        background: #F8F9FB;
                    }
                    .sex-radio {
                        margin-top: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        width: 100%;

                        .sex-radio-item {
                            width: 40%;
                            height: 38px;
                            background: #F8F9FB;
                            border: 1px solid #F4F4F4;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 15px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #A8A8A8;
                            cursor: pointer;
                        }
                        .sex-radio-item.active {
                            border: 1px solid #1E87F0;
                            color: #1E87F0;
                        }
                    }
                }
                .main-item:last-of-type, .main-item.nbt {
                    margin-bottom: 0;
                }
            }
        }
        .footer-btn {
            box-sizing: border-box;
            padding: 50px 0;
            display: flex;
            justify-content: center;

            .el-button {
                width: 472px;
                height: 61px;
                background: #1E87F0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #FFFFFF;
                border: none;
            }
        }
    }
</style>
