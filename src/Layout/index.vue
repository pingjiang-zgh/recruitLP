<template>
    <el-container>
        <el-header height="63px">
            <el-row class="header-box">
                <el-col :span="12" class="menu-col">
                    <el-menu :default-active="activeIndex" class="tab-menu" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">首页</el-menu-item>
                        <el-menu-item index="2">招聘信息</el-menu-item>
                        <el-menu-item index="3">简历库</el-menu-item>
                        <el-menu-item index="4">挂靠价格</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="12">
                  <div class="tag-col">
                    <div class="tag-item">上传简历</div>
                    <div class="tag-item">我要找工作</div>
                    <div class="tag-item">我要招聘</div>
                    <div class="tag-item">注册</div>
                    <div class="tag-item">登录</div>
                  </div>
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
        background: #202329;
        position: fixed;
        width: 100%;
        z-index: 1024;
        padding: 0;
    }
    .el-main {
        position: absolute;
        width: 100%;
        top: 63px;
        padding: 0;
    }
    .el-menu {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #202329;
    }
    .el-menu.el-menu--horizontal {
      border: none;
    }
    .el-menu--horizontal>.el-menu-item {
      border: none;
      font-size: 15px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
    }
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover,
    .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
      background: unset;
      color: #1E87F0;
    }
    .el-menu--horizontal>.el-menu-item.is-active {
        color: #1E87F0;
    }
    .header-box {
        height: 100%;

        .el-col {
            height: 100%;

            .tag-col {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;

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
