<template>
	<div class="home-container">
		<div class="header">
			<div class="tit">简历管理</div>
			<!-- <div class="more">查看更多职位>></div> -->
		</div>
		<div class="list">
			<div class="list-item" v-for="(item, i) in list" :key="i">
				<div @click="goResumeDetails(item.id)" class="item-head cursor">
					<div class="item-head-name">
						<div class="tit">专业：{{item.major}}</div>
					</div>
					<div class="item-head-tag">
						<div class="tag-item">创建时间: {{item.create_time}}</div>
					</div>
					<div class="item-head-tag">
						<div class="tag-item">工作城市: {{item.wish_city}}</div>
					</div>
					<div class="item-head-tag">
						<div class="tag-item">希望职业: {{item.wish_join}}</div>
					</div>
				</div>
				<div @click="deleteResume(item.id)" class="btn_delete cursor">
					<span>删除</span>
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
				list: [1],
				time: '',
			}
		},
		created() {
			this.getResumeList()
		},
		methods: {
			getResumeList() {
				this.time = api.format()

				let postData = {
					mobile: api.getUserInfo().mobile,
					platform: 1,
					status: 1,
					page: 0,
				}
				this.$api.postForm(api.getUserResume, postData).then(res => {
					if (res.code == 1) {
						this.list = res.data.list
					}
				})
			},
			deleteResume(id) {
				console.log(id)
				let postData = {
					id,
					mobile: api.getUserInfo().mobile,
					platform: 1,
				}

				this.$api.postForm(api.userResumeDel, postData).then(res => {
					// console.log(res)?
					if (res.code == 1) {
						this.$message({
							message: '删除成功！',
							type: 'success'
						})
					} else {
						this.$message({
							message: res.msg,
							type: 'warning'
						})
					}
					this.getResumeList()
				})
			},
			
			goResumeDetails(id){
				this.$router.push({path:'/user/releaseResume',query:{id}}).catch(err=>err)
			}
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
				position: relative;

				.item-head {
					box-sizing: border-box;
					padding-bottom: 20px;
					// border-bottom: 1px solid #EAEBED;

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

	.btn_delete {
		position: absolute;
		right: 50px;
		top: 80%;
		transform: translateY(-50%);
		width: 20%;
		height: 36px;
		background: #1E87F0;
		color: #fff;
		border-radius: 4px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
