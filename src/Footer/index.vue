<template>
	<div class="footer">
		<div class="footer-top">
			<img src="../assets/image/footer-top-bg.png" class="footer-top-bg">
			<div class="footer-top-main">
				<div class="footer-top-main-item">
					<img src="../assets/image/vipindex.png" width="63px" height="63px">
					<div class="item-tit">品牌实力</div>
					<div class="item-desc">100万+建筑人才首选</div>
				</div>
				<div class="footer-top-main-item">
					<img src="../assets/image/footer-icon2.png" width="63px" height="63px">
					<div class="item-tit">免费服务</div>
					<div class="item-desc">价格咨询、推荐单位</div>
				</div>
				<div class="footer-top-main-item">
					<img src="../assets/image/footer-icon3.png" width="63px" height="63px">
					<div class="item-tit">海量职位</div>
					<div class="item-desc">海量高新职位任你选</div>
				</div>
				<div class="footer-top-main-item">
					<img src="../assets/image/footer-icon1.png" width="63px" height="63px">
					<div class="item-tit">海量职位</div>
					<div class="item-desc">海量高新职位任你选</div>
				</div>
			</div>
		</div>
		<div class="footer-box">
			<div class="footer-box-main">
				<div class="footer-box-main-top">
					<div class="main-top-info">
						<div class="left">
							<div class="left-tit">
								<div>联系我们</div>
								<div class="desc">Contact us</div>
							</div>
							<div class="left-item">服务热线：{{website.mobile}}</div>
							<div class="left-item">咨询QQ：{{website.qq}}</div>
							<div class="left-item">服务邮箱：{{website.email}}</div>
						</div>
						<!-- <div class="right">
							<div class="right-tit">
								<div>扫一扫</div>
								<div class="desc">Sweep code</div>
							</div>
							<div class="right-code">二维码</div>
							<div class="right-code">二维码</div>
						</div> -->
					</div>
					<div class="main-top-company">
						<div class="main-top-company-name">{{website.icp}}</div>
						<div class="main-top-company-tag">关于我们</div>
						<div @click="dialogVisible=true" class="main-top-company-tag">用户协议</div>
					</div>
				</div>
				<div class="footer-box-main-bottom">
					<div class="footer-box-main-bottom-tit">友情链接：</div>
					<div class="footer-box-main-bottom-tit" @click="goOtherUrl(val.url)" v-for="val of links"
						:key="val.id"> {{val.name}} </div>
				</div>
			</div>
		</div>

		<el-dialog title="《用户协议》" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
			<div v-html="useragreement">
				<!-- {{useragreement}} -->
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>


	</div>
</template>

<script>
	import api from "../api/api.js"
	import useragreement from '../text/User_agreement.js'
	
	export default {
		data() {
			return {
				links: [],
				customer: {}, // 联系我们
				website: {}, // 网站配置
				useragreement:useragreement.str, // 文本
				dialogVisible: false
			}
		},
		created() {
			this.getConfig()
		},
		methods: {
			// 获取网站配置
			getConfig() {
				this.$api.get(api.getConfig, null, res => {
					if (res.code == 1) {
						this.links = res.data.links
						// this.
						this.customer = res.data.customer[0]
						this.website = res.data.website
					}
				})
			},
			
			// 打开弹框
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},

			// 跳转其他链接
			goOtherUrl(url) {
				window.location.href = url
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.footer {
		width: 100%;
		margin-top: 104px;

		.footer-top {
			width: 100%;
			height: 250px;
			position: relative;

			.footer-top-bg {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
			}

			.footer-top-main {
				width: 1200px;
				height: 100%;
				margin: 0 auto;
				position: relative;
				z-index: 9;
				display: flex;
				align-items: center;
				justify-content: center;

				.footer-top-main-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 111px;

					.item-tit {
						font-size: 16px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
						margin-top: 17px;
					}

					.item-desc {
						font-size: 16px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #949494;
						margin-top: 11px;
					}
				}

				.footer-top-main-item:last-of-type {
					margin-right: 0;
				}
			}
		}

		.footer-box {
			width: 100%;
			box-sizing: border-box;
			padding: 20px 0;
			background: #ffffff;

			.footer-box-main {
				width: 1200px;
				margin: 0 auto;

				.footer-box-main-top {
					padding-bottom: 20px;
					border-bottom: 1px solid #EAEBED;

					.main-top-info {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;

						.left {
							display: flex;
							align-items: center;
							margin-bottom: 20px;

							.left-tit {
								font-size: 18px;
								font-family: Microsoft YaHei;
								font-weight: bold;
								color: #333333;
								display: flex;
								flex-direction: column;
								align-items: center;

								.desc {
									font-size: 14px;
									font-weight: 400;
									color: #999999;
								}
							}

							.left-item {
								color: #666666;
								margin-left: 30px;
							}
						}

						.right {
							display: flex;
							align-items: center;

							.right-tit {
								font-size: 18px;
								font-family: Microsoft YaHei;
								font-weight: bold;
								color: #333333;
								display: flex;
								flex-direction: column;
								align-items: center;

								.desc {
									font-size: 14px;
									font-weight: 400;
									color: #999999;
								}
							}

							.right-code {
								width: 120px;
								height: 120px;
								border: 1px solid #EAEBED;
								border-radius: 5px;
								margin-left: 30px;
								display: flex;
								align-items: center;
								justify-content: center;
							}
						}
					}

					.main-top-company {
						display: flex;
						align-items: center;
						justify-content: center;
						margin-top: 20px;
						color: #999999;
						font-size: 12px;

						.main-top-company-tag {
							margin-left: 30px;
							cursor: pointer;
						}
						
						.main-top-company-tag:hover{
							color: #1E87F0;
						}
						
						.main-top-company-tag:last-of-type {
							border-left: 1px solid #ddd;
							padding-left: 20px;
							margin-left: 20px;
						}
					}
				}

				.footer-box-main-bottom {
					display: flex;
					align-items: center;
					margin-top: 10px;
					font-size: 13px;
					color: #666666;
					font-weight: 400;

					.footer-box-main-bottom-tit {
						margin-right: 15px;
						cursor: pointer;
					}

					.footer-box-main-bottom-tit:hover {
						color: #1E87F0;
					}
				}
			}
		}
	}
</style>
