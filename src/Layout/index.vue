<template>
    <el-container>
        <el-header>
            <el-row class="header-box">
                <el-col :span="12" class="menu-col">
                    <el-menu :default-active="activeIndex" class="tab-menu" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">首页</el-menu-item>
                        <el-menu-item index="2">招聘信息</el-menu-item>
                        <el-menu-item index="3">简历库</el-menu-item>
                        <el-menu-item index="3">挂靠价格</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="12" class="tag-col">
                    <el-row class="row-bg">
                        <el-col :span="3"><div class="tag-item">上传简历</div></el-col>
                        <el-col :span="3"><div class="tag-item">我要找工作</div></el-col>
                        <el-col :span="3"><div class="tag-item">我要招聘</div></el-col>
                        <el-col :span="3"><div class="tag-item">注册</div></el-col>
                        <el-col :span="3"><div class="tag-item">登录</div></el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                activeIndex: '1'
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log('aa', key, keyPath);
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-header {
        height: 63px !important;
        background: #202329;
    }
    .el-menu.el-menu--horizontal {
        border: none;
    }
    .el-menu {
        background: #202329;
        color: #fff;
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
    }
    .el-menu--horizontal>.el-menu-item.is-active {
        border: none;
        color: #1E87F0;
    }
    .header-box {
        height: 100%;

        .el-col {
            height: 100%;

            .row-bg {
                width: 100%;
                height: 100%;

                .tag-item {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    font-size: 15px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #FFFFFF;
                }
            }
        }
    }
    .menu-col {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
