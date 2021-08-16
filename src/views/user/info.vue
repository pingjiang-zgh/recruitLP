<template>
	<div class="info-container">
		<div class="material-box">
			<div class="material-box-head">编辑个人信息</div>
			<div class="material-box-main">
				<div class="img-item">
					<div class="img-item-tit">个人头像</div>
					<el-upload class="avatar-uploader" action="" :show-file-list="false"
						:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>

				<div class="main-item">
					<div class="main-item-tit">姓名</div>
					<el-input disabled v-model="resume.name" class="main-item-input" placeholder="请填写姓名"></el-input>
				</div>
				<div class="main-item">
					<div class="main-item-tit">微信</div>
					<el-input v-model="resume.WeChat" class="main-item-input" placeholder="请填写微信号"></el-input>
				</div>
				<div class="main-item">
					<div class="main-item-tit">性别</div>
					<div class="sex-radio">
						<div class="sex-radio-item" @click="changeSex(1)" :class="{'active': resume.sex === 1}">男</div>
						<div class="sex-radio-item" @click="changeSex(2)" :class="{'active': resume.sex === 2}">女</div>
					</div>
				</div>
				<div class="main-item">
					<div class="main-item-tit">联系电话</div>
					<el-input disabled v-model="resume.mobile" class="main-item-input" placeholder="请填写手机号"></el-input>
				</div>
				<!-- <div class="main-item">
					<div class="main-item-tit">用途</div>
					<el-select v-model="resume.purpose" placeholder="请选择" class="main-item-input">
						<el-option v-for="item in purposeList" :key="item.value" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</div> -->
				<div class="main-item">
					<div class="main-item-tit">邮箱（选填）</div>
					<el-input v-model="resume.mailbox" class="main-item-input" placeholder="请填写邮箱"></el-input>
				</div>
				<div class="main-item">
					<div class="main-item-tit">出生日期</div>
					<!-- <el-input v-model="resume.birth" class="main-item-input" placeholder="请填写邮箱"></el-input> -->
					<el-date-picker value-format="yyyy-MM-dd" class="main-item-input timers" v-model="resume.birth" align="right" type="date" placeholder="选择日期"
						:picker-options="pickerOptions">
					</el-date-picker>
				</div>
				
				<div class="main-item">
					<div class="main-item-tit">参加工作时间</div>
					<!-- <el-input v-model="resume.birth" class="main-item-input" placeholder="请填写邮箱"></el-input> -->
					<el-date-picker value-format="yyyy-MM-dd" class="main-item-input timers" v-model="resume.workDate" align="right" type="date" placeholder="选择日期"
						:picker-options="pickerOptions">
					</el-date-picker>
				</div>
				<div class="main-item">
					<div class="main-item-tit">
						工作状态
					</div>
					<el-select v-model="resume.state" placeholder="请选择" class="main-item-input">
						<el-option v-for="item in workStateOptions" :key="item.value" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</div>
				
				<div class="main-item">
					<div class="main-item-tit">最高学历</div>
					<el-input v-model="resume.education" class="main-item-input" placeholder="请填写最高学历"></el-input>
				</div>
			</div>
		</div>
		<!-- <div class="advantage-box">
			<div class="advantage-box-head">简历标题</div>
			<div class="advantage-box-input-container">
				<div class="main-item">
					//////////////<div class="main-item-tit">邮箱（选填）</div>
					<el-input v-model="resume.title" class="main-item-input" placeholder="请填写标题"></el-input>
				</div>
			</div>
			<div class="advantage-box-head">个人优势</div>
			<div class="advantage-box-input-container">
				<el-input type="textarea" placeholder="请输入内容" class="advantage-box-input" v-model="resume.textarea"
					maxlength="200" show-word-limit />
			</div>
		</div> -->
		<!-- <div class="qualif-box">
			<div class="qualif-box-head">资质</div>
			<div class="qualif-box-main">
				<div class="main-item">
					<div class="main-item-tit">工作城市</div>
					<div class="showModle">
						<el-select filterable @change="changeCity" v-model="resume.province" placeholder="请选择省份" class="main-item-input">
							<el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-select filterable v-show="choiseCity" v-model="resume.city" placeholder="请选择工作城市" class="main-item-input">
							<el-option v-for="item in showCitys" :key="item.value" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="main-item">
					<div class="main-item-tit">期望行业</div>
					<el-select @change="choiseIndustry" v-model="resume.industry" placeholder="请选择期望行业" class="main-item-input">
						<el-option v-for="item in industryList" :key="item.id" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</div>
				<div class="main-item nbt">
					<div class="main-item-tit">期望薪资</div>
					<div class="main-item-input-group">
						<el-select   v-model="resume.minSalary" placeholder="请选择薪资" class="money main-item-input">
							<el-option v-for="item in moneyListNum" :key="item.value" :label="item.label" :value="item.label">
							</el-option>
						</el-select>
						<div class="tit">至</div>
						<el-select   v-model="resume.maxSalary" placeholder="请选择薪资" class="money main-item-input">
							<el-option v-for="item in moneyListNum" :key="item.value" :label="item.label" :value="item.label">
							</el-option>
						</el-select>
						
						<el-select v-model="money" placeholder="请选择单位" class="money main-item-input">
							<el-option v-for="item in moneyList" :key="item.value" :label="item.label" :value="item.label">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="main-item">
					<div class="main-item-tit">期望职位</div>
					<el-select :disabled="positionDisabled" v-model="resume.position" placeholder="请选择期望职位" class="main-item-input">
						<el-option v-for="item in showPositionList" :key="item.id" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</div>
			</div>
		</div> -->
		<div class="footer-btn">
			<el-button @click='setInformation'>保存信息</el-button>

			<!-- <el-button @click='preservation'>发简历</el-button> -->
		</div>
	</div>
</template>

<script>
	import api from "../../api/api.js"
	export default {
		inject: ['reload'],
		data() {
			return {

				imageUrl: '',
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				
				workStateOptions: [{ //0在职，1离职随时，2离职1周到岗，3离职月内到岗
					value: '0',
					label: '在职'
				}, {
					value: '1',
					label: '离职随时'
				}, {
					value: '2',
					label: '离职1周到岗'
				}, {
					value: '3',
					label: '离职月内到岗'
				}],
				

				// 用途选项
				purposeList: [{
						value: '选项1',
						label: '挂资质'
					},
					{
						value: '选项2',
						label: '挂项目'
					},
					{
						value: '选项3',
						label: '均可'
					},
				],

				//薪水范围
				moneyListNum: [],

				// 薪水单位
				money: '',
				moneyList: [{
						value: '选项1',
						label: '月'
					},
					{
						value: '选项2',
						label: '季'
					},
					{
						value: '选项3',
						label: '年'
					},
				],

				// 期望行业
				industryList: [],
				positionDisabled: true,

				// 情况选项
				situationList: [{
						value: '选项1',
						label: '初始或中级'
					},
					{
						value: '选项2',
						label: '转注或高级'
					},
					{
						value: '选项3',
						label: '不限'
					},
				],

				resume: {
					name: '', // 姓名
					sex: 1, //性别
					WeChat: '', // 微信
					mobile: '', // 手机
					purpose: '', // 用途
					mailbox: '', // 邮箱
					situation: '', // 情况
					textarea: '', // 个人优势
					minSalary: '', // 期望薪资
					maxSalary: '',
					province: '', // 省份
					city: '', // 城市
					position: '', // 职位
					industry: '', // 行业
					title: '',
					birth: '', // 出生日期
					workDate:'',// 工作时间
					state:'',
					education:'', // 学历 education
				},

				choiseCity: false, // 展示城市

				// 城市
				citys: [],
				showCitys: [],
				province: [],

				// 职位行情
				// 期望行业
				industryList: [],
				positionDisabled: true,
				allpositionList: [],
				showPositionList: [],

				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
			}
		},
		created() {
			this.getUserInfo()
			this.getConfig()
		},
		methods: {

			handleAvatarSuccess(res, file) {
				// 图片上传成功后的处理
				this.imageUrl = URL.createObjectURL(file.raw);
			},

			beforeAvatarUpload(file) {
				// 图片上传前的处理
				console.log(file)
				this.beforeUpload(file)
				// const isJPG = file.type === 'image/jpeg';
				// const isLt2M = file.size / 1024 / 1024 < 2;

				// if (!isJPG) {
				//     this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				// if (!isLt2M) {
				//     this.$message.error('上传头像图片大小不能超过 2MB!');
				// }
				// return isJPG && isLt2M;
			},

			getBase64(file) {
				return new Promise(function(resolve, reject) {
					let reader = new FileReader();
					let imgResult = "";
					reader.readAsDataURL(file);
					reader.onload = function() {
						imgResult = reader.result;
					};
					reader.onerror = function(error) {
						reject(error);
					};
					reader.onloadend = function() {
						resolve(imgResult);
					};
				});
			},
			beforeUpload(file) {
				this.getBase64(file).then(res => {
					res = res.slice(22)
					console.log(res);
					let postData = {
						img: res
					}
					this.$api.postForm(api.uploadImage, postData).then(data => {
						console.log(data)
						if (data.code == 1) {
							this.imageUrl = data.data
						}
					})
				})
			},

			// 保存用户信息
			setInformation() {
				if (this.getUserVerification()) {
					let resume = this.resume
					let avatar =  this.imageUrl == ""?api.getUserInfo().avatar:this.imageUrl
					let postData = {
						mobile: resume.mobile,
						platform: 1,
						wxaccount: resume.WeChat,
						sex: resume.sex,
						email: resume.mailbox,
						name: resume.name,
						avatar,
						join_date:resume.workDate,
						birth:resume.birth,
						state:resume.state,
						education:resume.education,
					}
					console.log(postData)
					this.$api.postForm(api.userInfoEdit, postData).then(res => {
						if (res.code == 1) {
							this.$message({
								message: '修改成功！',
								type: 'success'
							})
							let obj = JSON.stringify(res.data)
							localStorage.setItem('userInfo', obj)
							this.getUserInfo()
							this.reload()
						}
					})
				}
			},

			getUserVerification() {
				let resume = this.resume
				if (resume.WeChat == "") {
					this.$message({
						message: '请填写微信号！',
						type: 'warning'
					})
					return false
					
				}
				if(resume.workDate==""){
					this.$message({
						message: '选择加入工作时间！',
						type: 'warning'
					})
					return false
				}
				if(resume.birth==""){
					this.$message({
						message: '选择生日！',
						type: 'warning'
					})
					return false
				}
				if(resume.birth==""){
					this.$message({
						message: '请选择工作状态！',
						type: 'warning'
					})
					return false
				}
				return true
			},

			// 获取 用户信息
			getUserInfo() {
				let userInfo = JSON.parse(localStorage.getItem('userInfo'))
				this.resume.name = userInfo.name
				this.resume.mobile = userInfo.mobile
				this.resume.mailbox = userInfo.email
				this.resume.WeChat = userInfo.wxaccount
				this.resume.sex = userInfo.sex
				this.resume.birth = userInfo.birth
				this.resume.workDate = userInfo.join_date
				this.resume.education = userInfo.education
				this.workStateOptions.forEach(item=>{
					if(item.value==userInfo.state){
						this.resume.state = item.label
					}
				})
				
			},
			getConfig() {
				this.$api.get(api.getConfig, null, res => {
					console.log(res)
					let province = res.data.province
					let citys = res.data.city
					this.citys = citys
					this.province = province
					this.industryList = res.data.industry
					this.allpositionList = res.data.position
					console.log(this.industryList)
				})

				let moneyListNum = []
				for (let i = 1; i <= 50; i++) {
					let obj = {
						value: '选项' + i,
						label: i + 'K'
					}
					moneyListNum.push(obj)
				}
				this.moneyListNum = moneyListNum
			},
			// 城市选择
			changeCity(e) {
				let id = null
				let province = this.province
				province.forEach(item => {
					if (item.name == e) {
						id = item.id
					}
				})
				let citys = this.citys
				let arr = []
				citys.forEach(item => {
					if (item.parent_id == id) {
						arr.push(item)
					}
				})

				this.showCitys = arr
				this.resume.city = arr[0].name
				this.choiseCity = true
			},

			// 行业选择
			choiseIndustry(e) {
				let id = null
				this.positionDisabled = false
				let industryList = this.industryList
				industryList.forEach(item => {
					if (item.name == e) {
						id = item.id
					}
				})
				let allpositionList = this.allpositionList
				let arr = []
				allpositionList.forEach(item => {
					if (item.iid == id) {
						arr.push(item)
					}
				})
				// console.log(arr)
				this.resume.position = arr[0].name
				this.showPositionList = arr

			},


			changeSex(val) {
				this.resume.sex = val
			},

			// 发简历
			preservation() {
				if (this.formVerification()) {
					// console.log(1)
					let resume = this.resume

					let postData = {
						mobile: resume.mobile,
						platform: 1,
						title: resume.title,
						goodness: resume.textarea,
						purpose: resume.purpose,
						state: resume.situation,
						wish_city: resume.province + resume.city,
						wish_join: resume.position,
						class_ids: resume.industry,
						wish_money: resume.minSalary + '-' + resume.maxSalary + '-' + this.money,
					}
					// console.log(postData)
					this.$api.postForm(api.raiseResume, postData).then(res => {
						if (res.code == 1) {
							this.$message({
								message: '发布成功！',
								type: 'success'
							})
							this.reload()
						} else {
							this.$message({
								message: res.msg,
								type: 'warning'
							})
						}
					})
				}
			},

			// 表单验证
			formVerification() {
				let resume = this.resume
				for (let key in resume) {
					if (key != 'mailbox' && key != 'sex' && key != 'WeChat') {
						if ((resume[key] + '').trim() == "") {
							this.$message({
								message: '请填写所有简历信息',
								type: 'warning'
							})
							return false
						}
					}
				}
				return true
			}
		}
	}
</script>

<style scoped lang="scss">
	.info-container {
		width: 880px;

		.material-box {
			width: 100%;
			background: #ffffff;
			box-sizing: border-box;
			padding: 30px 30px 0 10px;

			.material-box-head {
				box-sizing: border-box;
				padding: 0 0 24px 24px;
				font-size: 18px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #000000;
				border-bottom: 1px solid #F4F4F4;
			}

			.material-box-main {
				padding: 24px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;

				.main-item {
					width: 45%;
					margin-bottom: 22px;

					.main-item-input {
						background: #F8F9FB;
						border: 1px solid #F4F4F4;
						margin-top: 10px;
						width: 100%;

					}

					/deep/ .el-input__inner {
						border: none;
						background: #F8F9FB;
					}

					.sex-radio {
						margin-top: 10px;
						display: flex;
						align-items: center;
						justify-content: space-around;
						width: 100%;

						.sex-radio-item {
							width: 40%;
							height: 38px;
							background: #F8F9FB;
							border: 1px solid #F4F4F4;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 15px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #A8A8A8;
							cursor: pointer;
						}

						.sex-radio-item.active {
							border: 1px solid #1E87F0;
							color: #1E87F0;
						}
					}
				}

				.main-item:last-of-type {
					// margin-bottom: 0;
				}
			}
		}

		.advantage-box {
			box-sizing: border-box;
			padding: 28px 30px 28px 10px;
			background: #ffffff;
			margin-top: 20px;

			.advantage-box-head {
				box-sizing: border-box;
				padding: 0 0 24px 24px;
				font-size: 18px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #000000;
				border-bottom: 1px solid #F4F4F4;
			}

			.advantage-box-input-container {
				box-sizing: border-box;
				padding: 24px 30px;

				.advantage-box-input {
					height: 128px;
					border: 1px solid #F4F4F4;
				}

				/deep/ .el-textarea__inner {
					height: 100%;
					border: none;
					background: #F8F9FB;
				}
			}
		}

		.qualif-box {
			box-sizing: border-box;
			padding: 28px 30px 28px 10px;
			background: #ffffff;
			margin-top: 20px;

			.qualif-box-head {
				box-sizing: border-box;
				padding: 0 0 24px 24px;
				font-size: 18px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #000000;
				border-bottom: 1px solid #F4F4F4;
			}

			.qualif-box-main {
				padding: 30px;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;

				.main-item {
					width: 45%;
					margin-bottom: 22px;

					.main-item-input-group {
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: 100%;
						margin-top: 10px;

						.group-input {
							width: 40%;
							border: 1px solid #F4F4F4;
						}

						.tit {
							font-size: 15px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #A8A8A8;
						}
					}

					.main-item-input {
						background: #F8F9FB;
						border: 1px solid #F4F4F4;
						margin-top: 10px;
						width: 100%;

					}

					/deep/ .el-input__inner {
						border: none;
						background: #F8F9FB;
					}

					.sex-radio {
						margin-top: 10px;
						display: flex;
						align-items: center;
						justify-content: space-around;
						width: 100%;

						.sex-radio-item {
							width: 40%;
							height: 38px;
							background: #F8F9FB;
							border: 1px solid #F4F4F4;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 15px;
							font-family: Microsoft YaHei;
							font-weight: 400;
							color: #A8A8A8;
							cursor: pointer;
						}

						.sex-radio-item.active {
							border: 1px solid #1E87F0;
							color: #1E87F0;
						}
					}
				}

				.main-item:last-of-type,
				.main-item.nbt {
					margin-bottom: 0;
				}
			}
		}

		.footer-btn {
			box-sizing: border-box;
			padding: 50px 0;
			display: flex;
			justify-content: center;

			.el-button {
				width: 472px;
				height: 61px;
				background: #1E87F0;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 22px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
				border: none;
			}
		}
	}

	.showModle {
		display: flex;
	}

	.money {
		width: 30% !important;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 148px;
		height: 148px;
		line-height: 148px;
		text-align: center;
	}

	.avatar {
		width: 148px;
		height: 148px;
		display: block;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 148px;
		height: 148px;
		line-height: 148px;
		text-align: center;
	}
	.timers{
		cursor: pointer;
	}
</style>
