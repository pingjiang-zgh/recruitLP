<template>
    <div class="job-container">
        <div class="job-tit-box">
            <div class="job-tit">招聘管理</div>
            <div class="job-btn">点击发布</div>
        </div>
        <div class="list">
            <div class="list-item top">
                <div class="list-item-box">
                    <div class="list-item-tit">标题</div>
                    <div class="list-item-status">状态</div>
                </div>
                <div class="list-item-box">
                    <div class="list-item-status">价格</div>
                    <div class="list-item-tit">操作</div>
                </div>
            </div>
            <div class="list-item" v-for="(item, i) in list" :key="i">
                <div class="list-item-box">
                    <div class="list-item-tit">{{i}} 二级建造师 - 机电工程</div>
                    <div class="list-item-status status-name">成功发布</div>
                </div>
                <div class="list-item-box">
                    <div class="list-item-status price">￥258589</div>
                    <div class="list-item-tit action">
                        <el-button class="istop" @click="setTop(item)">我要置顶</el-button>
                        <div>刷新</div>
                        <el-button class="isedit">编辑</el-button>
                        <el-button class="recycle">回收站</el-button>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog :visible.sync="visible" width="740px" custom-class="top-modal">
            <div class="top-main">
                <div class="tit">选择置顶时长</div>
                <div class="top-list">
                    <div class="top-list-item">置顶3天</div>
                    <div class="top-list-item">置顶5天</div>
                    <div class="top-list-item">置顶7天</div>
                </div>
                <div class="tit mt20">选择置顶位置</div>
                <div class="top-list">
                    <div class="top-list-item">PC首页置顶</div>
                    <div class="top-list-item">手机端首页</div>
                    <div class="top-list-item">分类置顶</div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                visible: false
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.list = new Array(10).fill(1)
            },
            setTop(id) {
                this.visible = true
            }
        }
    }
</script>

<style scoped lang="scss">
    .job-container {
        .job-tit-box {
            display: flex;
            align-items: center;

            .job-tit {
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                margin-right: 20px;
            }
            .job-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 20px;
                background: #288aed;
                color: #ffffff;
            }
        }
        .list {
            margin-top: 18px;

            .list-item {
                width: 100%;
                height: 80px;
                box-sizing: border-box;
                background: #ffffff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
                margin-bottom: 10px;

                .list-item-box {
                    width: 48%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .list-item-tit {
                        width: 70%;
                        text-align: center;
                    }
                    .list-item-tit.action {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        /deep/ .el-button {
                            border: none;
                            padding: 10px;
                        }
                        .istop {
                            background: #F44336;
                            color: #ffffff;
                            margin-right: 10px;
                        }
                        .isedit {
                            background: #1E87F0;
                            color: #ffffff;
                            margin-left: 10px;
                        }
                        .recycle {
                            color: #ffffff;
                            margin-left: 10px;
                            background: #0CB46A;
                        }
                    }
                    .list-item-status {
                        width: 28%;
                        text-align: center;
                    }
                    .list-item-status.status-name {
                        color: #24B274;
                    }
                    .list-item-status.price {
                        color: #DD661D;
                    }
                }
            }
            .list-item.top {
                font-weight: bold;
            }
        }
        .top-modal {
            .el-dialog__body {
                .top-main {
                    .tit {
                        font-size: 19px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #333333;
                    }
                    .top-list {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 20px;

                        .top-list-item {
                            width: 30%;
                            height: 60px;
                            border: 2px solid #ddd;
                            font-size: 15px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #EA5454;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            cursor: pointer;
                        }
                    }
                    .mt20 {
                        margin-top: 20px;
                    }
                }
            }
            .dialog-footer {
                display: flex;
                justify-content: center;

                /deep/ .el-button {
                    width: 424px;
                    height: 53px;
                    background: #1E87F0;
                    border: none;
                    border-radius: 0;
                    color: #fff;
                }
            }
        }
    }
</style>
