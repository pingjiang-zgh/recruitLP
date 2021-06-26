<template>
  <div class="home-container">
    <div class="header">
      <div class="tit">简历推荐</div>
      <div class="more">更多简历>></div>
    </div>
    <div class="list">
      <div class="list-item top">
        <div class="list-item-box">姓名</div>
        <div class="list-item-box">专业</div>
        <div class="list-item-box">注册情况</div>
        <div class="list-item-box">价格</div>
        <div class="list-item-box">用途</div>
        <div class="list-item-box">日期</div>
      </div>
      <div class="list-item" v-for="(item, i) in list" :key="i">
        <div class="list-item-box">张先生</div>
        <div class="list-item-box">一级建造师-市政公用</div>
        <div class="list-item-box">{{i}} 初始</div>
        <div class="list-item-box price">￥258589</div>
        <div class="list-item-box">挂项目</div>
        <div class="list-item-box">2020-02-22</div>
      </div>
    </div>
    <el-pagination
        style="text-align: center"
        background
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.list = new Array(10).fill(1)
    }
  }
}
</script>

<style scoped lang="scss">
  .home-container {
    .header {
      width: 100%;
      height: 55px;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;

      .tit {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }
      .more {
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #DD661D;
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      margin-top: 26px;

      .list-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 75px;
        box-sizing: border-box;
        background: #ffffff;
        margin-bottom: 10px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;

        .list-item-box {
          width: 20%;
          text-align: center;
        }
        .list-item-box.price {
          color: #DD661D;
        }
      }
      .list-item.top {
        font-weight: bold;
      }
    }
  }
</style>
