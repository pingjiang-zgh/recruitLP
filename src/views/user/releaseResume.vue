<template>
	<div class="info-container">
		<div class="material-box">
			<div class="material-box-head">{{isDetails?'发布简历':'修改简历'}}</div>
			<div class="material-box-main">
				<div class="main-item">
					<div class="main-item-tit">用途</div>
					<el-select v-model="resume.purpose" placeholder="请选择" class="main-item-input">
						<el-option v-for="item in purposeList" :key="item.value" :label="item.label"
							:value="item.label">
						</el-option>
					</el-select>
				</div>

				<div class="main-item">
					<div class="main-item-tit">情况</div>
					<el-select v-model="resume.situation" placeholder="请选择" class="main-item-input">
						<el-option v-for="item in situationList" :key="item.value" :label="item.label"
							:value="item.label">
						</el-option>
					</el-select>
				</div>
				<div class="main-item">
					<div class="main-item-tit">毕业证专业</div>
					<el-input v-model="resume.Diploma_major" class="main-item-input" placeholder="请填写毕业证专业"></el-input>
				</div>
			</div>
		</div>
		<div class="qualif-box">
			<div class="qualif-box-head">资质</div>
			<div class="qualif-box-main">
				<div class="main-item">
					<div class="main-item-tit">工作城市</div>
					<div class="showModle">
						<el-select filterable @change="changeCity" v-model="resume.province" placeholder="请选择省份"
							class="main-item-input">
							<el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-select filterable v-show="choiseCity" v-model="resume.city" placeholder="请选择工作城市"
							class="main-item-input">
							<el-option v-for="item in showCitys" :key="item.value" :label="item.name"
								:value="item.name">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="main-item">
					<div class="main-item-tit">期望行业（证书分类）</div>
					<el-select @change="choiseIndustry" v-model="resume.industry" placeholder="请选择期望行业"
						class="main-item-input">
						<el-option v-for="item in industryList" :key="item.id" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</div>
				<div class="main-item nbt">
					<div class="main-item-tit">期望薪资</div>
					<div class="main-item-input-group">
						<el-select v-model="resume.minSalary" placeholder="请选择薪资" class="money main-item-input">
							<el-option v-for="item in moneyListNum" :key="item.value" :label="item.label"
								:value="item.label">
							</el-option>
						</el-select>
						<div class="tit">至</div>
						<el-select v-model="resume.maxSalary" placeholder="请选择薪资" class="money main-item-input">
							<el-option v-for="item in moneyListNum" :key="item.value" :label="item.label"
								:value="item.label">
							</el-option>
						</el-select>

						<el-select v-model="money" placeholder="请选择单位" class="money main-item-input">
							<el-option v-for="item in moneyList" :key="item.value" :label="item.label"
								:value="item.label">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="main-item">
					<div class="main-item-tit">期望职位（证书分类）</div>
					<el-select :disabled="positionDisabled" v-model="resume.position" placeholder="请选择期望职位"
						class="main-item-input">
						<el-option v-for="item in showPositionList" :key="item.id" :label="item.name"
							:value="item.name">
						</el-option>
					</el-select>
				</div>

				<div class="main-item">
					<div class="main-item-tit">证书状态</div>
					<el-select v-model="resume.Certificate_status" placeholder="请选择" class="main-item-input">
						<el-option v-for="item in Certificate_statusList" :key="item.value" :label="item.label"
							:value="item.label">
						</el-option>
					</el-select>
				</div>
				<div class="main-item">
					<div class="main-item-tit">注册状态</div>
					<el-select v-model="resume.Registration_status" placeholder="请选择" class="main-item-input">
						<el-option v-for="item in Registration_statusList" :key="item.value" :label="item.label"
							:value="item.label">
						</el-option>
					</el-select>
				</div>

			</div>
		</div>
		<div class="advantage-box">

			<div class="advantage-box-head">个人优势</div>
			<div class="advantage-box-input-container">
				<el-input type="textarea" placeholder="请输入内容" class="advantage-box-input" v-model="resume.textarea"
					maxlength="200" show-word-limit />
			</div>
		</div>

		<div class="footer-btn">
			<el-button @click='preservation'>{{isDetails?'发简历':'修改简历'}}</el-button>
		</div>
	</div>
</template>

<script>
	import api from "../../api/api.js"
	export default {
		inject: ['reload'],
		data() {
			return {
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

				// 证书状态
				Certificate_statusList: [{
						value: '选项1',
						label: '闲置中'
					},
					{
						value: '选项2',
						label: '已考过，未拿证'
					},
					{
						value: '选项3',
						label: '合同快到期'
					},
				],

				// 注册额状态
				Registration_statusList: [{
						value: '选项1',
						label: '初始注册'
					},
					{
						value: '选项2',
						label: '转注册'
					},
				],

				resume: {
					purpose: '', // 用途
					situation: '', // 情况
					textarea: '', // 个人优势
					minSalary: '', // 期望薪资
					maxSalary: '',
					province: '', // 省份
					city: '', // 城市
					position: '', // 职位
					industry: '', // 行业
					Diploma_major: '', // 毕业证专业
					Registration_status: '', // 注册状态
					Certificate_status: '', // 证书状态
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
				
				// 是否是修改
				isDetails:true,
				id:null,
			}
		},
		created() {
			let qury = this.$route.query
			if(qury.id){
				this.getResumeDetailsById(qury.id)
				this.isDetails = false
				this.choiseCity = true
				this.id = qury.id
			}
			this.getConfig()
		},
		methods: {
			// 存在id时
			getResumeDetailsById(id){
				let postData = {
					id,
					mobile:api.getUserInfo().mobile,
					platform:1,
				}
				this.$api.postForm(api.raiseResumeGetById,postData).then(res=>{
					if(res.code==1){
						console.log(res)
						let data = res.data
						let money = res.data.wish_money
						let [minSalary,maxSalary,danwei] = money.split('-')
						let [ province,city] = data.wish_city.split('-')
						
						this.money = danwei
						let resume = {
							purpose:data.purpose,
							situation:data.state,
							textarea:data.goodness,
							minSalary,
							maxSalary,
							province,
							city,
							position:data.wish_join,
							industry:data.class_ids,
							Diploma_major:data.major,
							Registration_status:data.register_status,
							Certificate_status:data.certificate_status,
						}
						this.resume = resume
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
						mobile: api.getUserInfo().mobile,
						platform: 1,
						// title: resume.title,
						goodness: resume.textarea,
						purpose: resume.purpose,
						state: resume.situation,
						wish_city: resume.province +'-'+ resume.city,
						wish_join: resume.position,
						class_ids: resume.industry,
						wish_money: resume.minSalary + '-' + resume.maxSalary + '-' + this.money,
						major: resume.Diploma_major,
						register_status: resume.Registration_status, // 注册状态
						certificate_status: resume.Certificate_status, // 证书状态
					}
					
					if(!this.isDetails){
						postData.id = this.id
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
					if ((resume[key] + '').trim() == "") {
						this.$message({
							message: '请填写所有简历信息',
							type: 'warning'
						})
						return false
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
					// margin-bottom: 0;
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
</style>
