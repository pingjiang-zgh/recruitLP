<template>
  <div class="home-container">
    <div class="header">
      <div class="tit">简历推荐</div>
      <div class="more">更多简历>></div>
    </div>
    <div class="list">
      <div class="list-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
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

      }
    }
  }
</style>