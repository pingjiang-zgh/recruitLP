<template>
    <div class="user-container">
        <el-container>
            <el-aside width="298px">
                <div class="user-box">
                    <div class="user-head">
                        <img src="../../assets/image/user-default-head.png" width="64" height="64px">
                        <div class="edit-btn">编辑</div>
                    </div>
                    <div class="user-name">张先生</div>
                    <div class="user-info-box">
                        <div class="user-info">
                            <div class="user-info-item">21</div>
                            <div class="user-info-item">5年</div>
                            <div class="user-info-item">本科</div>
                        </div>
                    </div>
                    <div class="user-tag">
                        <div class="user-tag-item">
                            <div class="num">356</div>
                            <div class="tit">我的简历</div>
                        </div>
                        <div class="user-tag-item">
                            <div class="num">258</div>
                            <div class="tit">我的收藏</div>
                        </div>
                        <div class="user-tag-item">
                            <div class="num">895</div>
                            <div class="tit">沟通过</div>
                        </div>
                    </div>
                </div>
                <div class="user-menu">
                    <div class="user-menu-item">
                        <div class="left">
                            <img src="../../assets/image/user/menu-icon1.png" class="icon-img">
                            <div class="item-tit">个人中心</div>
                        </div>
                        <div class="right">></div>
                    </div>
                    <div class="user-menu-item">
                        <div class="left">
                            <img src="../../assets/image/user/menu-icon2.png" class="icon-img">
                            <div class="item-tit">简历管理</div>
                        </div>
                        <div class="right">></div>
                    </div>
                    <div class="user-menu-item">
                        <div class="left">
                            <img src="../../assets/image/user/menu-icon1.png" class="icon-img">
                            <div class="item-tit">退出登录</div>
                        </div>
                        <div class="right">></div>
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
    export default {
        name: "User"
    }
</script>

<style scoped lang="scss">
    .user-container {
        width: 1440px;
        margin: 0 auto;
        padding-top: 32px;
        box-sizing: border-box;

        .el-container {
            width: 100%;
            position: relative;

            .el-aside {
                position: fixed;
                z-index: 999;
                .user-box {
                    width: 100%;
                    height: 230px;
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
                    .user-tag {
                        margin-top: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;

                        .user-tag-item {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            font-size: 15px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #333333;

                            .tit {
                                margin-top: 10px;
                                font-size: 13px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: #666666;
                            }
                        }
                    }
                }
                .user-menu {
                    width: 100%;
                    height: 242px;
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
                width: calc(100% - 298px);
                padding: 0 0 0 20px;
                box-sizing: border-box;
                position: absolute;
                left: 298px;
            }
        }
    }
</style>
