<template>
	<div class="home-container">
		<div class="header">
			<div class="tit">收藏</div>
			<div @click="goResumeAll" class="more">更多简历>></div>
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
			<div  @click="getResumeDetails(item.id)" class="list-item cursord" v-for="(item, i) in list" :key="i">
				<div class="list-item-box">{{item.name}}</div>
				<div class="list-item-box">{{item.wish_join}}</div>
				<div class="list-item-box">{{'初始'}} </div>
				<div class="list-item-box price">{{item.wish_money}}</div>
				<div class="list-item-box">{{item.purpose==1?'挂资质':item.purpose==2?'挂项目':'均可'}}</div>
				<div class="list-item-box">{{item.create_time}}</div>
			</div>
		</div>
		<el-pagination style="text-align: center" background layout="prev, pager, next" :total="total">
		</el-pagination>
	</div>
</template>

<script>
	import api from "../../api/api.js"
	export default {
		data() {
			return {
				list: [],
				total:0,
			}
		},
		created() {
			 this.mobile = api.getUserInfo().mobile
			this.getResumeList()
		},
		methods: {
			// 获取简历列表
			getResumeList() {
				let postData = {
					mobile: this.mobile,
					city: localStorage.getItem('city'),
					page: 1,
				}
				this.$api.postForm(api.getUserResumeList, postData).then(res => {
					if (res.code == 1) {
						this.list = res.data.list
						this.total = res.data.count
					}
				})
			},

			goResumeAll() {
				this.$router.push({
					path: '/resume'
				}).catch(err => err)
			},
			
			// 跳转简历详情
			getResumeDetails(id){
				this.$router.push({path:'/resume/resumedetails',query:{id}})
			},
		}
	}
</script>

<style scoped lang="scss">
	.home-container {
		width: 880px;
		min-height: 490px;
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
				cursor: pointer;
			}
			.more:hover{
				color: #1E87F0;;
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
					white-space: nowrap;
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
	.cursord{
		cursor: pointer;
	}
</style>
