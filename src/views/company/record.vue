<template>
	<div class="home-container">
		<div class="header">
			<div class="tit">消费记录</div>
			<!-- <div @click="goResumeAll" class="more">更多简历>></div> -->
		</div>
		<div class="list">
			<div class="list-item top">
				<div class="list-item-box">充值类型</div>
				<div class="list-item-box">金额</div>
				<div class="list-item-box">充值时间</div>
			</div>
			<div  v-for="(item,index) in recordList" :key='item.id' class="list-item" >
				<div class="list-item-box">{{item.tepname}}</div>
				<div class="list-item-box">{{item.money}}</div>
				<div class="list-item-box">{{item.create_date}} </div>
			</div>
		</div>
		<el-pagination @current-change='currentPage' :page-size="15" style="text-align: center" background layout="prev, pager, next" :total="total">
		</el-pagination>
	</div>
</template>

<script>
	import api from "../../api/api.js"
	export default {
		data(){
			return{
				recordList:[],
				total:0,
				page:1,
			}
		},
		created() {
			this.getRecord()
		},
		methods:{
			
			getRecord(){
				let postData = {
					mobile:api.getUserInfo().mobile,
					page:this.page
				}
				this.$api.postForm(api.getRecordList,postData).then(res=>{
					if(res.code==1){
						console.log(res.data.orderlist)
						this.recordList = res.data.orderlist.list
						this.total = res.data.orderlist.count
					}
				})
			},
			
			currentPage(e){
				this.page = e
				this.getRecord()
			}
		},
		
		
		
	}
	
</script>

<style lang="scss" scoped>
	
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
