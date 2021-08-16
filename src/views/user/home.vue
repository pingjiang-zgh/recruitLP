<template>
    <div class="home-container">
        <div class="header">
            <div class="tit">职位推荐</div>
            <div class="more">查看更多职位>></div>
        </div>
        <div class="list">
            <div @click="goPositonDetails(item.id)" class="list-item" v-for="(item, i) in RecommendedList" :key="item.id">
                <div class="item-head">
                    <div class="item-head-name">
                        <div class="tit">{{item.title}}</div>
                        <div class="price">{{item.money}}</div>
                    </div>
                    <div class="item-head-tag">
                        <div class="tag-item">{{item.desc}}</div>
                        <div class="tag-item">{{item.class==1?'挂资质':item.class==2?'挂项目':'均可'}}</div>
                        <div class="tag-item">{{item.address}}</div>
                    </div>
                </div>
                <div class="item-footer">
                    <img :src="item.avatar" class="item-footer-img">
                    <div class="item-footer-tit">{{item.gsname}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import api from '../../api/api.js'
    export default {
        data() {
            return {
                RecommendedList: []
            }
        },
        created() {
            this.init()
			this.getRecommendedList()
        },
        methods: {
            init() {
                this.list = new Array(10).fill(1)
            },
			getRecommendedList(){
				this.$api.postForm(api.index, {
					city: localStorage.getItem('city')
				}).then(res => {
					if (res.code == 1) {
						console.log(res.data)
						this.RecommendedList = res.data.hot_station.list
						// this.hotEnterpriseList = res.data.hot_enterprise.list
					} else {
						this.$message.warning(res.msg)
					}
				})
			},
			goPositonDetails(id){
				this.$router.push({path:'/resume/station',query:{id}})
			}
        }
    }
</script>

<style scoped lang="scss">
    .home-container {
		width: 1122px;
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
