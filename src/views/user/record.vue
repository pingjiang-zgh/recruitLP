<template>
	<div class="home-container">
		<div class="header">
			<div class="item" :class="{'is-active': tabIndex === 0}" @click="changeTab(0)">我的收藏</div>
			<!-- <div class="item" :class="{'is-active': tabIndex === 1}" @click="changeTab(1)">我的收藏</div> -->
		</div>
		<div v-show="collList.length>0" class="list">
			<div class="list-item" v-for="(item, i) in collList" :key="item.id">
				<div @click.stop="goPositionDetails(item.id)" class="item-head">
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
				<div @click.stop="goPositionDetails(item.id)" class="item-footer">
					<img :src="''" class="item-footer-img">
					<div class="item-footer-tit">{{item.gsname}}</div>
				</div>
				<div @click="cancelColl(item.id)" class="btn_cancel"><span>取消收藏</span></div>
			</div>
		</div>
		<div v-show="!collList.length>0" class="list">
			暂无收藏
		</div>
	</div>
</template>

<script>
	import api from "../../api/api.js"
	export default {
		data() {
			return {
				tabIndex: 0,
				collList: [],
			}
		},
		created() {
			this.getCollList()
		},
		methods: {
			// 获取收藏
			getCollList() {
				let postData = {
					mobile: api.getUserInfo().mobile,
					platform: 1,
					// page: 1,
				}
				this.$api.postForm(api.getCollList, postData).then(res => {
					if (res.code == 1) {
						this.collList = res.data.list
					}
				})
			},

			// 查看详情
			goPositionDetails(id) {
				this.$router.push({
					path: '/resume/station',
					query: {
						id
					}
				})
			},

			//cancelColl 取消收藏
			cancelColl(id) {
				this.$confirm('此操作将取消收藏, 是否继续?', '取消收藏', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.postCancelColl(id)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},

			postCancelColl(id) {
				let postData = {
					mobile: api.getUserInfo().mobile,
					platform: 1,
					id,
				}
				this.$api.postForm(api.cancelColl, postData).then(res => {
					if (res.code == 1) {
						this.$message.success('取消成功！')
						this.getCollList()
					} else {
						this.$message.warning(res.msg)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn_cancel {
		position: absolute;
		width: 30%;
		height: 25%;
		background: #1E87F0;
		color: #fff;
		border-radius: 4px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 12px;
		bottom: 12px;
	}

	.home-container {
		width: 880px;
		min-height: 490px;

		.header {
			width: 100%;
			height: 55px;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			padding: 0 44px;
			box-sizing: border-box;

			.item {
				font-size: 20px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #999999;
				margin-right: 30px;
				cursor: pointer;
			}

			.is-active {
				color: #000000;
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
				cursor: pointer;
				.item-head {
					box-sizing: border-box;
					padding-bottom: 20px;
					border-bottom: 1px solid #EAEBED;
					cursor: pointer;
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
