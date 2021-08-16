<template>
	<div class="info-container">
		<div class="material-box">
			<div class="material-box-head">编辑职位信息</div>
			<div class="material-box-main">
				<div class="main-item">
					<div class="main-item-tit">标题</div>
					<el-input v-model="position.title" class="main-item-input" placeholder="请填写标题"></el-input>
				</div>
				<div class="main-item">
					<div class="main-item-tit">行业类型</div>
					<el-select @change="choiseIndustry" v-model="position.industry" placeholder="请选择期望行业" class="main-item-input">
						<el-option v-for="item in industryList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="main-item">
					<div class="main-item-tit">地区</div>
					<div class="showModle">
						<el-select filterable @change="changeCity" v-model="position.province" placeholder="请选择省份" class="main-item-input">
							<el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-select filterable v-show="choiseCity" v-model="position.city" placeholder="请选择工作城市" class="main-item-input">
							<el-option v-for="item in showCitys" :key="item.value" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-input v-model="position.address" class="main-item-input" placeholder="请填写详细地址"></el-input>
					</div>
				</div>
				<div class="main-item">
					<div class="main-item-tit">职位分类</div>
					<el-select :disabled="positionDisabled" v-model="position.position" placeholder="请选择期望职位" class="main-item-input">
						<el-option v-for="item in showPositionList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="main-item">
					<div class="main-item-tit">用途</div>
					<el-select v-model="position.purpose" placeholder="请选择" class="main-item-input">
						<el-option v-for="item in purposeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="main-item">
					<div class="main-item-tit">价格</div>
					<div class="main-item-input-group">
						<el-select v-model="position.minSalary" placeholder="请选择薪资" class="money main-item-input">
							<el-option v-for="item in moneyListNum" :key="item.value" :label="item.label"
								:value="item.label">
							</el-option>
						</el-select>
						<div class="tit">至</div>
						<el-select v-model="position.maxSalary" placeholder="请选择薪资" class="money main-item-input">
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
					<div class="main-item-tit">情况</div>
					<el-select v-model="position.situation" placeholder="请选择" class="main-item-input">
						<el-option v-for="item in situationList" :key="item.value" :label="item.label" :value="item.label">
						</el-option>
					</el-select>
				</div>
				<div class="main-item">
					<div class="main-item-tit">是否显示</div>
					<el-select v-model="position.display" placeholder="请选择" class="main-item-input">
						<el-option v-for="item in displayList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
		</div>

		<div class="advantage-box">
			<div class="advantage-box-head">职位描述</div>
			<div class="advantage-box-input-container">
				<el-input type="textarea" placeholder="请输入内容" class="advantage-box-input" v-model="textarea"
					maxlength="200" show-word-limit />
			</div>
		</div>

		<div class="material-box mt20">
			<div class="material-box-head">资质</div>
			<div class="material-box-main">
				<div class="main-item">
					<div class="main-item-tit">联系人</div>
					<el-input v-model="position.username" class="main-item-input" placeholder="请填写联系人"></el-input>
				</div>
				<div class="main-item">
					<div class="main-item-tit">手机号</div>
					<el-input v-model="position.mobile" class="main-item-input" placeholder="请填写手机号"></el-input>
				</div>
				<div class="main-item">
					<div class="main-item-tit">微信</div>
					<el-input v-model="position.wxnum" class="main-item-input" placeholder="请填写微信"></el-input>
				</div>
				<div class="main-item">
					<div  class="main-item-tit">QQ</div>
					<el-input v-model="position.qqnum"  class="main-item-input" placeholder="请填写QQ号"></el-input>
				</div>
			</div>
		</div>
		<div class="footer-btn">
			<el-button @click="setResum">提交</el-button>
		</div>
	</div>
</template>

<script>
	import api from "../../api/api.js"
	export default {
		data() {
			return {
				// 用途选项
				purposeList:[
					{
						value: '1',
						label: '求职'
					},
					{
						value: '2',
						label: '挂职'
					},
					// {
					// 	value: '选项3',
					// 	label: '均可'
					// },
				],
				
				
				imageUrl: '',
				textarea: '',
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
				value: '',
				
				
				// 薪水单位
				money:'',
				moneyList:[
					{
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
				
				// 情况选项
				situationList:[
					{
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
				
				// 情况选项
				displayList:[
					{
						value: '1',
						label: '显示'
					},
					{
						value: '2',
						label: '隐藏'
					}
				],
				
				choiseCity:false, // 展示城市
				
				// 城市
				citys:[],
				showCitys:[],
				province:[],
				
				position: {
					minSalary:'',
					maxSalary:'',
					purpose:'',// 用途
					city:'',
					province:'',
					address:'',
					situation: '', // 情况
					industry:'', // 行业
					position:'', // 职位
					title:'', // 标题
					username:'',// 联系人
					wxnum:'', // 微信
					qqnum:'', // qq 
					display:'', // 显示隐藏
					mobile:'',
				},
				
				
				// 职位行情
				// 期望行业
				industryList:[],
				positionDisabled:true,
				allpositionList:[],
				showPositionList:[],
				enpInfo:{},
				
				iiid:'',
			}
		},
		
		created() {
			this.getConfig()
			this.getUserInfo()
			if(this.$route.query.id){
				this.getInformationDetails(this.$route.query.id)
			}
		},
		
		methods: {
			getInformationDetails(id){
				let postData = {
					id,
					mobile:api.getUserInfo().mobile,
				}
				this.$api.postForm(api.getInformationDetails,postData).then(res=>{
					if(res.code ==1){
						console.log(res)
						let position = res.data
						let address = position.address
						let arr = address.split('-')
						this.position.province = arr[0]
						this.choiseCity = true
						this.position.city = arr[1]
						this.position.address = arr[2]
						this.position.title = position.title
						this.positionDisabled =false
						this.position.industry = position.iid
						this.position.position = position.iiname
						this.iiid = position.iiid
						this.position.purpose = position.class == 1?'求职':'挂职'
						let money = position.money
						money = money.split('-')
						this.position.minSalary = money[0]
						this.position.maxSalary = money[1]
						this.money = money[2]
						
						this.position.situation = position.desc
						this.position.display = position.display==0?'隐藏':'显示'
						this.textarea = position.describe
						this.position.username = position.username
						this.position.mobile =  position.mobile
						this.position.wxnum = position.wxnum
						this.position.qqnum = position.qqnum
					}
				})
			},
			
			
			// 发布招聘信息
			
			
			setResum(){
				if(this.formVerification()){
					let postData = this.getPositions()
					this.$api.postForm(api.issueInformation,postData).then(res=>{
						if(res.code == 1){
							this.$message.success('发布成功！')
							this.$router.push({path:'/company/job'})
						}else{
							this.$message.warning(res.msg)
						}
					})
				}
			},
			formVerification(){
				let postData = this.getPositions()
				for(let i in postData){
					if(postData[i]==""){
						this.$message.warning('请填写所有信息')
						return false
					}
				}
				
				return true
			},
			
			getPositions(){
				let {
					minSalary,
					maxSalary,
					purpose,// 用途
					city,
					province,
					address,
					situation, // 情况
					industry, // 行业
					position, // 职位
					title, // 标题
					username,// 联系人
					wxnum, // 微信
					qqnum, // qq 
					display, // 显示隐藏
					mobile,} = this.position
				let postData = {
					mobile,
					// id:this.enpInfo.id,
					title,
					iid:industry, // 行业
					iiid:this.iiid==""? position:this.iiid, // 职位
					address:province+'-'+city+'-'+address,
					class:purpose==1||purpose=="求职"?1:2, // 用途
					money:minSalary+'-'+maxSalary+'-'+this.money,
					desc:situation,
					describe:this.textarea,
					username,
					wxnum,
					qqnum,
					display,
				}
				
				if(this.$route.query.id){
					postData.id = this.$route.query.id
				}
				return postData
			}
			,
			
			getUserInfo(){
				let enpInfo = api.getUserInfo()
				this.enpInfo = enpInfo
				this.position.mobile = enpInfo.mobile
			},
			getConfig(){
				this.$api.get(api.getConfig,null,res=>{
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
				for(let i = 1;i<=50;i++){
					let obj = {
						value: '选项'+i,
						label: i+ 'K'
					}
					moneyListNum.push(obj)
				}
				this.moneyListNum = moneyListNum
			},
			// 城市选择
			changeCity(e){
				let id = null
				let province = this.province
				province.forEach(item=>{
					if(item.name==e){
						id = item.id
					}
				})
				let citys = this.citys
				let arr = []
				citys.forEach(item=>{
					if(item.parent_id == id){
						arr.push(item)
					}
				})
				
				this.showCitys = arr
				this.position.city = arr[0].name
				this.choiseCity = true
			},
			
			// 行业选择
			choiseIndustry(e){
				let id = null
				this.positionDisabled = false
				let industryList = this.industryList
				industryList.forEach(item=>{
					if(item.id ==e){
						id = item.id
					}
				})
				let allpositionList = this.allpositionList
				let arr =[]
				allpositionList.forEach(item=>{
					if(item.iid == id){
						arr.push(item)
						
					}
				})
				// console.log(arr)
				this.position.position = arr[0].id
				this.showPositionList =arr
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.info-container {
		width: 100%;
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
				}

				.main-item:last-of-type {
					// margin-bottom: 0;
				}
			}
		}

		.mt20 {
			margin-top: 20px;
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

	.main-item-input-group {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin-top: 10px;
	}
	
	.money{
		width: 30% !important;
	}
	.showModle{
		display: flex;
	}
</style>
