<template>
    <div class="info-container">
        <div class="material-box">
            <div class="material-box-head">基本信息</div>
            <div class="material-box-main">
                <div class="img-item">
                    <div class="img-item-tit">公司头像</div>
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">联系人</div>
                    <el-input class="main-item-input" placeholder="请填写联系人"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">联系电话</div>
                    <el-input class="main-item-input" placeholder="请填写联系电话"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">公司名称</div>
                    <el-input class="main-item-input" placeholder="请填写公司名称"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">公司地址</div>
                    <el-input class="main-item-input" placeholder="请填写公司地址"></el-input>
                </div>
            </div>
        </div>

        <div class="advantage-box">
            <div class="advantage-box-head">公司描述</div>
            <div class="advantage-box-input-container">
                <el-input type="textarea" placeholder="请输入内容" class="advantage-box-input"
                          v-model="textarea"
                          maxlength="200"
                          show-word-limit
                />
            </div>
        </div>

        <div class="material-box mt20">
            <div class="material-box-head">资质</div>
            <div class="material-box-main">
                <div class="main-item">
                    <div class="main-item-tit">公司人数范围</div>
                    <el-select v-model="value" placeholder="请选择人数" class="main-item-input">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">所属行业</div>
                    <el-select v-model="value" placeholder="请选择所属行业" class="main-item-input">
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
            <el-button>提交</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imageUrl: '',
                textarea: '',
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
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                // 图片上传成功后的处理
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                // 图片上传前的处理
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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

                .img-item {
                    width: 100%;
                    margin-bottom: 30px;

                    .avatar-uploader {
                        margin-top: 10px;
                        /deep/ .el-upload {
                            border: 1px dashed #d9d9d9;
                            border-radius: 6px;
                            cursor: pointer;
                            position: relative;
                            overflow: hidden;
                        }
                        /deep/ .el-upload:hover {
                            border-color: #409EFF;
                        }
                    }
                    .avatar-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        width: 148px;
                        height: 148px;
                        line-height: 148px;
                        text-align: center;
                    }
                    .avatar {
                        width: 148px;
                        height: 148px;
                        display: block;
                    }
                }
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
                }
                .main-item:last-of-type {
                    margin-bottom: 0;
                }
            }
        }
        .mt20 {
            margin-top: 20px;
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
