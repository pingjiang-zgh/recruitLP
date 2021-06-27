<template>
    <div class="member-container">
        <div class="tit">会员管理</div>
        <div class="member-main">
            <div class="main-tit">
                当前会员状态：<span>非会员</span>
            </div>
            <div class="main-box">
                <div class="main-type">
                    <div class="main-type-item" :class="{'is-active': memberIndex === i}" @click="changeMember(i)" v-for="(item, i) in memberList" :key="i">
                        <div class="type-item-head">{{item.name}}</div>
                        <div class="type-item-main">
                            <div class="price">￥ <span>{{item.price}}</span></div>
                            <div class="desc">{{item.desc}}</div>
                        </div>
                    </div>
                </div>
                <div class="main-container">
                    <div class="main-container-head">
                        <div class="head-name">权益</div>
                        <div class="head-main">
                            <div class="head-main-item name-box">套餐</div>
                            <div class="head-main-item">普通会员</div>
                            <div class="head-main-item">月会员</div>
                            <div class="head-main-item">季度会员</div>
                            <div class="head-main-item">年会员</div>
                        </div>
                    </div>
                    <div class="main-container-service">
                        <div class="service-name">基础服务</div>
                        <div class="service-main">
                            <div class="service-main-item name-box">
                                <div class="service-main-item-tit price-box">价格</div>
                                <div class="service-main-item-tit">发送简历数</div>
                                <div class="service-main-item-tit">发帖数量</div>
                                <div class="service-main-item-tit">金币（置顶、下载简历）</div>
                                <div class="service-main-item-tit">有效期</div>
                            </div>
                            <div class="service-main-item" v-for="(item, i) in serviceList" :key="i">
                                <div class="service-main-item-tit price-box">{{item.price}}</div>
                                <div class="service-main-item-tit">{{item.num}}</div>
                                <div class="service-main-item-tit">{{item.post_num}}</div>
                                <div class="service-main-item-tit">{{item.top_num}}</div>
                                <div class="service-main-item-tit">{{item.time}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="container-power">
                        <div class="power-name">会员权限</div>
                        <div class="power-main">
                            <div class="power-main-item name-box">
                                <div class="power-main-item-tit">刷新置顶</div>
                                <div class="power-main-item-tit">vip标记</div>
                                <div class="power-main-item-tit">名企推荐</div>
                                <div class="power-main-item-tit">文字特效</div>
                            </div>
                            <div class="power-main-item" v-for="val of 4" :key="val">
                                <div class="power-main-item-tit"><el-checkbox checked disabled></el-checkbox></div>
                                <div class="power-main-item-tit"><el-checkbox checked disabled></el-checkbox></div>
                                <div class="power-main-item-tit"><el-checkbox checked disabled></el-checkbox></div>
                                <div class="power-main-item-tit"><el-checkbox checked disabled></el-checkbox></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="member-footer">
            <el-button>立即开通</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                memberList: [],
                serviceList: [],
                memberIndex: 0
            }
        },
        created() {
            this.getMember()
            this.getService()
        },
        methods: {
            getService() {
                this.serviceList = [
                    {
                        id: 0,
                        price: '免费',
                        num: '无',
                        post_num: '6条/小时，20条/天',
                        top_num: '无',
                        time: ''
                    },
                    {
                        id: 1,
                        price: '300元',
                        num: '150份',
                        post_num: '不限速，50条/天',
                        top_num: '300',
                        time: '1个月'
                    },
                    {
                        id: 2,
                        price: '800元',
                        num: '400份',
                        post_num: '不限速，100条/天',
                        top_num: '800',
                        time: '3个月'
                    },
                    {
                        id: 3,
                        price: '3000元',
                        num: '1500份',
                        post_num: '不限速，500条/天',
                        top_num: '3000',
                        time: '1年'
                    }
                ]
            },
            getMember() {
                this.memberList = [
                    {
                        id: 1,
                        name: '会员包月',
                        price: '300',
                        desc: ''
                    },
                    {
                        id: 2,
                        name: '会员包季',
                        price: 800,
                        desc: '每月仅419'
                    },
                    {
                        id: 3,
                        name: '会员包年',
                        price: 3000,
                        desc: '每月仅419'
                    }
                ]
            },
            changeMember(i) {
                this.memberIndex = i
            }
        }
    }
</script>

<style scoped lang="scss">
    .member-container {
        .tit {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
        }
        .member-main {
            width: 980px;
            margin-top: 35px;
            background: #ffffff;
            box-sizing: border-box;
            padding: 32px 0;

            .main-tit {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #000000;
                padding: 0 32px;
                box-sizing: border-box;

                > span {
                    color: #FF0000;
                }
            }
            .main-box {
                width: 100%;
                box-sizing: border-box;
                padding: 0 50px;

                .main-type {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 35px;

                    .main-type-item {
                        width: 212px;
                        height: 190px;
                        border: 2px solid #E4E4E4;
                        border-radius: 5px;

                        .type-item-head {
                            width: 100%;
                            height: 56px;
                            border-bottom: 1px solid #E4E4E4;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 23px;
                            font-family: Microsoft YaHei;
                            font-weight: bold;
                            color: #24231A;
                        }
                        .type-item-main {
                            width: 100%;
                            height: 134px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            position: relative;

                            .price {
                                font-size: 24px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: #F8720A;

                                > span {
                                    font-size: 38px;
                                }
                            }
                            .desc {
                                font-size: 18px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: #CEBDAD;
                                position: absolute;
                                bottom: 10px;
                            }
                        }
                    }
                    .main-type-item.is-active {
                        background: linear-gradient(0deg, #1E87F0, #ADD3FA);
                        box-shadow: 0px 0px 10px 0px rgba(126, 182, 238, 0.75);
                        padding: 2px 4px 3px 4px;

                        .type-item-head {
                            border-bottom: 0;
                        }
                        .type-item-main {
                            background: #fff;
                        }
                    }
                }
                .main-container {
                    width: 100%;
                    border: 1px solid #E4E4E4;
                    margin-top: 45px;

                    .main-container-head {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 36px;
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                        color: #24231A;
                        border-bottom: 1px solid #E4E4E4;

                        .head-name {
                            width: 100px;
                            height: 100%;
                            border-right: 1px solid #E4E4E4;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .head-main {
                            width: 780px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            .head-main-item {
                                width: 19%;
                                height: 100%;
                                border-right: 1px solid #E4E4E4;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            .head-main-item.name-box {
                                width: 24%;
                            }
                            .head-main-item:last-of-type {
                                border-right: 0;
                            }
                        }
                    }
                    .main-container-service {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        color: #24231A;
                        border-bottom: 1px solid #E4E4E4;

                        .service-name {
                            width: 100px;
                            height: 188px;
                            font-weight: bold;
                            border-right: 1px solid #E4E4E4;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .service-main {
                            width: 780px;
                            display: flex;
                            align-items: center;

                            .service-main-item {
                                width: 19%;
                                border-right: 1px solid #E4E4E4;

                                .service-main-item-tit {
                                    width: 100%;
                                    height: 36px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border-top: 1px solid #E4E4E4;
                                    font-size: 14px;
                                }
                                .service-main-item-tit.price-box {
                                    height: 40px;
                                    border-top: 0;
                                }
                            }
                            .service-main-item.name-box {
                                width: 24%;
                            }
                            .service-main-item:last-of-type {
                                border-right: 0;
                            }
                        }
                    }
                    .container-power {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        color: #24231A;

                        .power-name {
                            width: 100px;
                            height: 147px;
                            font-weight: bold;
                            border-right: 1px solid #E4E4E4;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .power-main {
                            width: 780px;
                            display: flex;
                            align-items: center;
                            .power-main-item {
                                width: 19%;
                                border-right: 1px solid #E4E4E4;

                                .power-main-item-tit {
                                    width: 100%;
                                    height: 36px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border-top: 1px solid #E4E4E4;
                                    font-size: 14px;
                                }
                                .power-main-item-tit:first-of-type {
                                    border-top: 0;
                                }
                            }
                            .power-main-item.name-box {
                                width: 24%;
                            }
                            .power-main-item:last-of-type {
                                border-right: 0;
                            }
                        }
                    }
                }
            }
        }
        .member-footer {
            width: 980px;
            padding: 35px ;
            display: flex;
            justify-content: center;

            /deep/ .el-button {
                width: 472px;
                height: 61px;
                background: #1E87F0;
                color: #ffffff;
                border: none;
                border-radius: 0;
            }
        }
    }
</style>
