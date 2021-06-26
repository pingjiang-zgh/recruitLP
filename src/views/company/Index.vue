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
              <div class="user-info-item">长沙</div>
              <div class="user-info-item">50人</div>
              <div class="user-info-item">互联网</div>
            </div>
          </div>
        </div>
        <div class="user-menu">
          <div class="user-menu-item">
            <div class="left">
              <img src="../../assets/image/company/menu-icon1.png" class="icon-img">
              <div class="item-tit">公司信息</div>
            </div>
            <div class="right">
              <img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
            </div>
          </div>
          <div class="user-menu-item">
            <div class="left">
              <img src="../../assets/image/company/menu-icon3.png" class="icon-img">
              <div class="item-tit">简历管理</div>
            </div>
            <div class="right">
              <img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
            </div>
          </div>
          <div class="user-menu-item">
            <div class="left">
              <img src="../../assets/image/company/menu-icon4.png" class="icon-img">
              <div class="item-tit">招聘管理</div>
            </div>
            <div class="right">
              <img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
            </div>
          </div>
          <div class="user-menu-item">
            <div class="left">
              <img src="../../assets/image/company/menu-icon4.png" class="icon-img">
              <div class="item-tit">增值服务</div>
            </div>
            <div class="right">
              <img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
            </div>
          </div>
          <div class="user-menu-item">
            <div class="left">
              <img src="../../assets/image/company/menu-icon4.png" class="icon-img">
              <div class="item-tit">退出登录</div>
            </div>
            <div class="right">
              <img src="../../assets/image/arrow-icon.png" class="icon-img" width="7" height="13">
            </div>
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
  name: "Company"
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
        height: 180px;
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
      }
      .user-menu {
        width: 100%;
        min-height: 242px;
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
