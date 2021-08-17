<template>
	<div class="station-container">
		<div class="station-head">
			<div class="header-box">
				<div class="head-margin">
					<div class="conpye-info">
						<div class="conpy-icon">
							<img class="conpy-icon" v-if="conpyInfo.avatar" :src="conpyInfo.avatar" >
						</div>
						<div class="conpy-info-txt">
							<div class="info-txt-title">
								{{conpyInfo.name}}
							</div>
							<div class="info_txt_details">
								<span class="address">地址：{{conpyInfo.address}}</span>
								<span>在招职位：{{conpyInfo.list.count}}</span>
							</div>
						</div>
					</div>

					<div class="resume-preson">
						<div class="preson-num">{{conpyInfo.list.count}}</div>
						<div>在招职位</div>
					</div>
				</div>
			</div>
		</div>
		<div class="station-main">
			<div class="foramt-mrgin">
				<div class="item_title">
					在招职位
				</div>

				<div class="positions">
					<div @click="goStation(item.id)" class="positions-item" v-for="(item,index) of conpyInfo.list.list">
						<div class="item-top">
							<div class="top-left">{{item.title}}</div>
							<div class="top-right">{{item.money}}</div>
						</div>
						<div class="bottom-txt">
							<span>{{item.address}}</span>
							<span class="dian"></span>
							<span>{{item.desc}}</span>
							<span class="dian"></span>
							<span>{{item.class==1?'挂资质':item.class==2?'挂项目':'均可'}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="foramt-mrgin introduce">
			<div class="shop-left">
				<div class="title-conpye">
					公司介绍
				</div>
				<div class="txt_li">
					{{conpyInfo.introduce}}
				</div>
				<div class="title-conpye">
					工商信息
				</div>
				<div class="txt_li">{{conpyInfo.name}}</div>
				<div class="txt_li">
					<span class="li_marRightOne">法定代表人：{{conpyInfo.representative}}</span> <span>注册资金：{{conpyInfo.capital}}</span>
				</div>
				<div class="txt_li">
					<span class="li_marRighttwo">企业类型： {{conpyInfo.type}}</span> <span>经营状态：{{conpyInfo.status}}</span>
				</div>
				<div class="txt_li">
					<span class="li_marRighttwo">成立日期： {{conpyInfo.ins_date}}</span> 
				</div>
				<div class="title-conpye">
					工作地址
				</div>
				<div class="txt_li">
					{{conpyInfo.address}}
				</div>
				<!-- <div class="txt_map">
					<div class="txt_map_title">
						{{conpyInfo.address}}
					</div>
					
					<el-amap vid="amap"  :zooms='[10,18]' :center='center' :plugin="plugin">
						<el-amap-marker :position='position' :events="events"></el-amap-marker>
					</el-amap>
				</div> -->
			</div>
			<!-- <div  v-if="showLogin" class="form-box">
				<div class="form-box-tit">各大行业职位任你选</div>
				<div class="form-input-item">
					<img src="../../assets/image/resume/phone-icon.png" width="13" height="21">
					<input v-model="loginOptions.mobile" type="text" placeholder="请填写手机号" class="input-box">
				</div>
				<div class="form-input-item">
					<img src="../../assets/image/resume/message-icon.png" width="18" height="14">
					<div class="code-box">
						<input v-model="loginOptions.code" type="text" placeholder="请填写手机号" class="code-input">
						<div v-show="show" @click="getVerification"  slot="suffix" class="code-box-btn">获取验证码</div>
						<div v-show="!show"  slot="suffix" class="code-box-btn">{{count+'S'}}</div>
					</div>
				</div>
				<div @click="homeGetLogin" class="form-btn">登录/注册</div>
				<div class="form-desc">同意《用户协议》《个人隐私保护》</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import api from "../../api/api.js"
	import location from "../../api/positionLocation.js"
	export default{
		inject:['reload'],
		data(){
			return{
				conpyInfo:{},
				plugin:[],// 经纬度
				center:[112.97156, 28.15023],
				position:[112.97156, 28.15023],
				// 在招职位
				count:0,
				events: {
					complete: () => {
				            //地图首次加载完成 并完成覆盖物加载 没有参数 只有map有这个事件
				     },
					init: e =>{
						//初始化事件里 e 代表该组件实例 可以使用api方法
					},
					click: e => {
						//事件 e.target是组件实例 可以使用api方法
						console.log(e)
						
					},
					//其他类似click
				},
				
				show: true,
				count:'',
				
				loginOptions:{
					code:'',
					mobile:'',
				},
				
				showLogin:true,
			}
		},
		created() {
			this.conpyeDetauls()
			// this.getLocation()
		},
		methods:{
			conpyeDetauls(){
				let id = this.$route.query.id
				console.log(id)
				if(id){
					this.$api.postForm(api.getStationListById,{id}).then(res=>{
						if(res.code==1){
							console.log(res)
							this.conpyInfo = res.data
						}else{
							this.$message.warning(res.msg)
						}
					})
				}
			},
			goStation(id){
				this.$router.push({path:'/fenlei/station',query:{id}})
			},
			
			// 地图显示
			// getLocation(){
			// 	let _that = this
			// 	let geolocation = location.initMap('map-container') // 定位
			// 	AMap.event.addListener(geolocation, 'complete', result => {
			// 		console.log(result)
			// 		let arr = []
			// 		arr.push(result.position.lng)
			// 		arr.push(result.position.lat)
			// 		console.log(arr)
			// 		_that.plugin = arr
			// 		_that.center = arr
			// 	})
			// },
			
			getLogin(){
				let postData = this.loginOptions
				postData.platform = 1
				this.$api.post(api.userLogin,postData,res=>{
					if(res.code == 1){
						this.$message({
							message: '登录成功！',
							type: 'success'
						})
						localStorage.setItem('userInfo',JSON.stringify(res.data))
						this.reload()
						localStorage.setItem('userType','0')
						// this.$router.push({path:'/company'})
					}
				},err=>{
					this.$message({
						message: err.msg,
						type: 'warning'
					})
				})
			},
			
			// 点击登录
			homeGetLogin(){
				if(this.formVerification()){
					// 登录
					this.getLogin()
				}
			},
			// 表单验证
			formVerification(){
				let {mobile,code} = this.loginOptions
				if(mobile.length==0||code.length==0){
					this.$message({
						message: '请填写手机号和验证码！',
						type: 'warning'
					});
					return false
				}
				return true
			},
			// 获取验证码
			getVerification() {
				let phone = this.loginOptions.mobile
				let _this = this
				if (phone.length == 0 || phone.length != 11) {
					this.$message({
						message: '请填写正确的手机号！',
						type: 'warning'
					});
				} else {
					// console.log(1111)
					this.$api.post(api.sendUserMobile,{mobile:this.loginOptions.mobile},res=>{
						console.log(111,res)
						if(res.code == 1){
							_this.getTimers()
							_this.$message({
								message: '短信发送成功！',
								type: 'success'
							});
							
						}
					})
					
				}
			},
			
			// 倒计时60秒
			getTimers(){
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	* {
		font-family: 'MicrosoftYaHei';
	}

	.station-container {
		.station-main {
			.station-main-box {
				.box-head {
					.box-head-user {
						.user-name {
							font-size: 19px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #000000;
							margin-bottom: 10px;
						}

						font-size: 15px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #999999;
					}

					.box-head-img {
						width: 63px;
						height: 63px;
						border-radius: 50%;
						background: #b1d3f3;
						margin-right: 22px;
					}

					display: flex;
					align-items: center;
				}

				width: calc(100% - 316px);
				border-right: 1px solid #EAEBED;
			}

			.station-main-slider {
				.resume-list {
					.resume-list-item {
						.item-price {
							font-size: 18px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #DD661D;
							margin-top: 16px;
						}

						.item-tag {
							.item-tag-item {
								font-size: 15px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: #666666;
								margin-right: 20px;
							}

							display: flex;
							margin-top: 18px;
						}

						.item-tit {
							font-size: 20px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #000000;
						}

						width: 100%;
						background: #FFFFFF;
						box-shadow: 0px 5px 16px 0px rgba(240, 239, 239, 0.75);
						box-sizing: border-box;
						padding: 22px;
						margin-top: 23px;
					}

					.resume-list-tit {
						font-size: 20px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #333333;
					}

					width: 100%;
					margin-top: 31px;
				}

				width: 296px;
			}

			width: 1200px;
			margin: 35px auto;
			display: flex;
			justify-content: space-between;
		}

		.station-head {
			.header-box {
				.header-btns {
					.btn {
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 17px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						border: 1px solid #1E87F0;
						padding: 15px 35px;
						color: #1E87F0;

						>div {
							margin-left: 8px;
						}
					}

					.confirm {
						color: #FFFFFF;
						background: #1E87F0;
						margin-left: 17px;
					}

					display: flex;
					align-items: center;
					margin-top: 27px;
				}

				.header-tag {
					.header-tag-item {
						font-size: 14px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
						margin-right: 30px;
					}

					display: flex;
					align-items: center;
					margin-top: 20px;
				}

				.header-tit-box {
					.header-price {
						font-size: 32px;
						font-family: Microsoft YaHei;
						font-weight: bold;
						color: #EA6A41;
						margin-left: 16px;
					}

					.header-tit {
						font-size: 32px;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
					}

					margin-top: 20px;
					display: flex;
					align-items: center;
				}

				.header-status {
					font-size: 14px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #FFFFFF;
				}

				width: 1200px;
				margin: 0 auto;
			}

			width: 100%;
			background: #434b60;
			box-sizing: border-box;
			padding: 30px 0;
		}
	}

	.head-margin {
		width: 1200rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30px 0;
		color: #fff;
		font-size: 16px;

		.conpye-info {
			height: 106px;
			display: flex;
		}

	}

	.conpy-icon {
		width: 106px;
		height: 106px;
		border-radius: 6px;
		box-sizing: border-box;
	}

	.conpy-info-txt {
		height: 100%;
		margin-left: 24px;
	}

	.info-txt-title {
		font-size: 32px;
		margin: 15px 0;
	}

	.address {
		margin-right: 80px;
	}

	.resume-preson {
		font-size: 20px;
		text-align: center;
	}

	.preson-num {
		font-size: 40px;
		margin-bottom: 10px;
	}

	.foramt-mrgin {
		width: 1200px;
		margin: 0 auto;
	}

	.item_title {
		font-size: 20px;
		margin: 20px;
	}

	.station-main {
		margin: 0 auto !important;
	}

	.positions {
		display: flex;
		justify-content: space-between;
	}

	.positions-item {
		background: #fff;
		height: 102px;
		width: 374px;
		padding: 20px;
		box-sizing: border-box;
		// margin-right: 20px;
	}
	
	.positions-item:nth-last-child{
		margin-right: 0px;
	}
	
	.item-top {
		display: flex;
		justify-content: space-between;
	}

	.top-left {
		font-size: 20px;
		font-weight: 400;
		color: #000000;
	}

	.top-right {
		font-size: 18px;
		font-weight: 400;
		color: #DD661D;
	}

	.bottom-txt {
		font-size: 15px;
		font-weight: 400;
		color: #666666;
		display: flex;
		align-items: center;
		margin-top: 20px;
		white-space: nowrap;

		.dian {
			width: 2px;
			height: 2px;
			border-radius: 1px;
			background: #666;
			margin: 0 10px;
		}
	}

	.introduce {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;

	}

	.shop-left {
		width: 1200px;
		box-sizing: border-box;
		padding: 30px 60px;
		background: #fff;
		
	}

	.form-box {
		width: 300px;

		.form-desc {
			font-size: 12px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 26px;
		}

		.form-btn {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 15px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #1E87F0;
			height: 43px;
			background: #FFFFFF;
			margin-top: 30px;
			cursor: pointer;
		}

		.form-input-item {
			.code-box {
				.code-input {
					margin-left: 17px;
					// flex: 1;
					width: 50%;
					height: 100%;
					border: none;
					padding: 0;
				}

				.code-box-btn {
					height: 14px;
					font-size: 13px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #1E87F0;
					padding-left: 9px;
					border-left: 1px solid #DBDDE3;
					white-space: nowrap;
					cursor: pointer;
				}

				flex: 1;
				display: flex;
				align-items: center;
				height: 100%;
			}

			.input-box {
				margin-left: 17px;
				flex: 1;
				height: 100%;
				border: none;
				padding: 0;
			}

			display: flex;
			align-items: center;
			width: 100%;
			height: 43px;
			background: #FFFFFF;
			margin-top: 26px;
			padding-left: 12px;
			box-sizing: border-box;
		}

		.form-box-tit {
			font-size: 19px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
		}

		background: #1E87F0;
		box-sizing: border-box;
		padding: 30px;
		max-height: 390px;
	}
	
	.title-conpye{
		font-size: 18px;
		padding-bottom: 16px;
		position: relative;
	}
	.title-conpye::before{
		content: '';
		position: absolute;
		height: 2px;
		width: 20px;
		background: #5BD4C7;
		left: 0;
		bottom: 0;
		font-weight: 400;
	}
	.txt_li{
		font-size: 14px;
		color: #999;
		margin: 20px 0;
	}
	.li_marRightOne{
		margin-right: 80px;
	}
	.li_marRighttwo{
		margin-right: 20px;
	}
	
	.txt_map{
		width: 100%;
		position: relative;
		height: 300px;
		box-shadow: 3px 3px 8px #eee,-3px -3px 8px #eee;
		margin-top: 20px;
		background: #f6f6f6;
	}
	.txt_map_title{
		height: 60px;
		line-height: 60px;
		padding-left: 30px;
		font-size: 18px;
		color: #999;
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		box-sizing: border-box;
		background: #fff;
	}
</style>
