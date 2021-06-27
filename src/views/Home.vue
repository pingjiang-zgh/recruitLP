<template>
  <div class="home">
    <div class="header">
      <div class="header-main">
        <div class="header-tit">来这里，遇见更好的机会</div>
        <div class="header-content">
          <div class="header-content-tit">快速注册 让好工作找到你！</div>
          <div class="header-content-form">
            <el-input placeholder="请填写手机号码" class="header-form-phone"></el-input>
            <el-input placeholder="验证码" class="header-form-code">
              <div slot="suffix" class="cursor" @click="sendCode">获取</div>
            </el-input>
            <div class="header-form-btn">登录/注册</div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="main-search">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="搜索职位、公司"></el-input>
        <el-button>搜索</el-button>
      </div>

      <div class="main-history">
        <div class="main-history-tit">热门职位:</div>
        <div class="main-history-list">
          <div class="main-history-list-item" v-for="val of 8" :key="val">监理工程师</div>
        </div>
      </div>

      <div class="main-top">
        <div class="main-top-menu">
          <div class="top-menu-main">
            <div class="menu-main-item" v-for="item in 7" :key="item">
              <div class="menu-main-item-tit">技术</div>
              <div class="menu-main-item-tag" v-for="val in 4" :key="val">一级建造师</div>
            </div>
          </div>
          <div class="top-menu-footer">查看全部职位</div>
        </div>
        <div class="main-top-banner">
          <el-carousel trigger="click" height="150px" :autoplay="false">
            <el-carousel-item v-for="item in 4" :key="item">
              <img src="../assets/image/banner1.png" class="top-banner-img" width="100%" height="100%">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="main-tit">
        <div class="main-tit-line"></div>
        <div class="main-tit-text">热招职位</div>
        <div class="main-tit-line"></div>
      </div>

      <div class="main-list">
        <div class="main-list-item" v-for="val in 15" :key="val">
          <div class="main-list-item-box">
            <div class="left">
              <div class="left-tit">
                监理工程师
                <img src="../assets/image/top-icon.png" class="left-icon">
              </div>
              <div class="left-tag">
                <div class="left-tag-item">初始</div>
                <div class="left-tag-item">挂资质</div>
                <div class="left-tag-item">河南郑州市</div>
              </div>
            </div>
            <div class="price">12-15万</div>
          </div>
          <div class="main-list-item-footer">
            <img src="../assets/image/user-default-head.png" width="42px" height="42px">
            <div>长沙生道信息科技有限公司</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
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
      }]
    }
  },
  methods: {
    sendCode() {

    }
  }
}
</script>

<style scoped lang="scss">
  .home {
    .header {
      width: 100%;
      height: 128px;
      background: #288aed;

      .header-main {
        width: 1440px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-tit {
          font-size: 28px;
          font-family: FZZhanBiHei-M22S;
          font-weight: 400;
          color: #FFFFFF;
        }
        .header-content {
          .header-content-tit {
            font-size: 26px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
          }
          .header-content-form {
            display: flex;
            align-items: center;
            margin-top: 10px;

            .header-form-phone {
              width: 180px;
              background: #ffffff;
              height: 38px;
            }
            .header-form-code {
              width: 180px;
              background: #ffffff;
              height: 38px;
              margin-left: 10px;

              .cursor {
                height: 38px;
                font-size: 13px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #1E87F0;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
            .header-form-btn {
              height: 36px;
              background: #ffffff;
              font-size: 13px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #1E87F0;
              margin-left: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 15px;
            }
            /deep/ .el-input__inner {
              border: none;
              border-radius: 0;
              height: 38px;
            }
          }
        }
      }
    }
    .main {
      width: 1440px;
      margin: 0 auto;

      .main-search {
        width: 982px;
        height: 54px;
        margin: 18px auto 0;
        background: #FFFFFF;
        box-shadow: 0px 5px 13px 0px rgba(242, 242, 242, 0.75);
        border-radius: 3px 3px 3px 3px;
        display: flex;
        align-items: center;

        /deep/ .el-select {
          height: 100%;
          width: 200px;

          .el-input {
            width: 100%;
            height: 100%;

            .el-input__inner {
              height: 100%;
              border: none;
            }
          }
        }
        /deep/ .el-input {
          height: 100%;

          .el-input__inner {
            height: 100%;
            border: none;
          }
        }
        /deep/ .el-button {
          width: 150px;
          height: 100%;
          color: #ffffff;
          background: #1E87F0;
          border: none;
          border-radius: 0;
        }
      }
      .main-history {
        width: 982px;
        margin: 14px auto 0;
        display: flex;
        align-items: center;

        .main-history-tit {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          margin-right: 22px;
        }
        .main-history-list {
          display: flex;
          align-items: center;

          .main-history-list-item {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #1E87F0;
            margin-right: 36px;
            cursor: pointer;
          }
        }

      }
      .main-top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 32px;

        .main-top-menu {
          width: 408px;
          height: 358px;
          background: #ffffff;

          .top-menu-main {
            padding: 20px 24px;
            box-sizing: border-box;

            .menu-main-item {
              display: flex;
              align-items: center;
              margin-bottom: 20px;

              .menu-main-item-tit {
                font-size: 15px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                margin-right: 10px;
              }
              .menu-main-item-tag {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #666666;
                margin-right: 12px;
              }
              .menu-main-item-tag:last-of-type {
                margin-right: 0;
              }
            }
            .menu-main-item:last-of-type {
              margin-bottom: 0;
            }
          }
          .top-menu-footer {
            width: 100%;
            height: 48px;
            border-top: 1px dashed #E9E9E9;
            padding: 0 22px;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #1E87F0;
            box-sizing: border-box;
          }
        }
        .main-top-banner {
          width: 1000px;
          height: 358px;

          /deep/ .el-carousel {
            height: 100%;

            .el-carousel__container {
              height: 100% !important;

              .el-carousel__item {
                height: 100%;
              }
            }
          }
        }
      }
      .main-tit {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40px;

        .main-tit-line {
          width: 57px;
          height: 1px;
          background: #DBDDE3;
        }
        .main-tit-text {
          margin: 0 12px;
          font-size: 25px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }
      }
      .main-list {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        .main-list-item {
          width: 32%;
          box-sizing: border-box;
          padding: 20px 20px 0;
          background: #ffffff;
          margin-bottom: 15px;

          .main-list-item-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 18px;

            .left {
              .left-tit {
                display: flex;
                align-items: center;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #1E87F0;

                .left-icon {
                  width: 34px;
                  height: 15px;
                  margin-left: 10px;
                }
              }
              .left-tag {
                margin-top: 12px;
                display: flex;
                align-items: center;
                font-size: 13px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #666666;

                .left-tag-item {
                  min-width: 50px;
                  border-right: 1px solid #DBDDE3;
                  box-sizing: border-box;
                  padding: 0 10px;
                  display: flex;
                  align-items: center;
                }
                .left-tag-item:first-of-type {
                  padding-left: 0;
                }
                .left-tag-item:last-of-type {
                  border: none;
                }
              }
            }
            .price {
              font-size: 19px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #DD661D;
            }
          }
          .main-list-item-footer {
            border-top: 1px solid #EAEBED;
            height: 60px;
            display: flex;
            align-items: center;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666666;

            > div {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
</style>
