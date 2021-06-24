<template>
    <div class="home-container">
        <div class="header">
            <div class="tit">职位推荐</div>
            <div class="more">查看更多职位>></div>
        </div>
        <div class="list">
            <div class="list-item" v-for="(item, i) in list" :key="i">
                <div class="item-head">
                    <div class="item-head-name">
                        <div class="tit">{{i}} 注册建筑师 - 二级建筑师</div>
                        <div class="price">12-15万</div>
                    </div>
                    <div class="item-head-tag">
                        <div class="tag-item">初始</div>
                        <div class="tag-item">挂资质</div>
                        <div class="tag-item">河南郑州市</div>
                    </div>
                </div>
                <div class="item-footer">
                    <img src="../../assets/image/user/img1.png" class="item-footer-img">
                    <div class="item-footer-tit">长沙生道信息科技有限公司     </div>
                </div>
            </div>
        </div>
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
                color: #666666;
            }
        }
        .list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            margin-top: 26px;

            .list-item {
                width: 49%;
                box-sizing: border-box;
                padding: 20px 16px 12px 20px;
                background: #ffffff;
                margin-bottom: 16px;

                .item-head {
                    box-sizing: border-box;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #EAEBED;

                    .item-head-name {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .tit {
                            font-size: 18px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #1E87F0;
                        }
                        .price {
                            font-size: 22px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #DD661D;
                        }
                    }
                    .item-head-tag {
                        display: flex;
                        align-items: center;
                        margin-top: 15px;

                        .tag-item {
                            font-size: 15px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #666666;
                            margin-left: 20px;
                        }
                        .tag-item:first-of-type {
                            margin-left: 0;
                        }
                    }
                }
                .item-footer {
                    display: flex;
                    align-items: center;
                    margin-top: 12px;

                    .item-footer-img {
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                    .item-footer-tit {
                        font-size: 14px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #666666;
                    }
                }
            }
        }
    }
</style>
