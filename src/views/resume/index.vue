<template>
    <div class="resume-container">
        <el-container>
            <el-main>
                <div class="tag-list">
					<div class="tag-list-box">
						<div class="tag_type">分类：</div>
						<div class="tag_type_right">
							<div @click="choiseIndexAll(0)" :class="{'tag_items':true, 'tag_items_active':choiseIndex.industryIndex==-1}">不限</div>
							<div @click="choiseIndustryIndex(item.id,index,item.name)" v-for="(item,index) in industry"  :key='item.id':class="{'tag_items':true, 'tag_items_active':choiseIndex.industryIndex==index}">{{item.name}}</div>
						</div>
					</div>
					<div class="tag-list-box">
						<div class="tag_type">专业：</div>
						<div class="tag_type_right">
							<div @click="choiseIndexAll(1)" :class="{'tag_items':true, 'tag_items_active':choiseIndex.positionIndex==-1}">不限</div>
							<div @click="choisePositionIndex(item.id,index,item.name)" v-for="(item,index) in showPosition"  :key='item.id':class="{'tag_items':true, 'tag_items_active':choiseIndex.positionIndex==index}">{{item.name}}</div>
						</div>
					</div>
					<div class="tag-list-box">
						<div class="tag_type">城市：</div>
						<div class="tag_type_right">
							<div @click="choiseIndexAll(2)" :class="{'tag_items':true, 'tag_items_active':choiseIndex.provinceIndex==-1}">不限</div>
							<div @click="choiseProvinceIndex(item.id,index,item.name)" v-for="(item,index) in province" :key='item.id' :class="{'tag_items':true, 'tag_items_active':choiseIndex.provinceIndex==index}" class="tag_items">{{item.name}}</div>
						</div>
					</div>
                   <!-- <div class="tag-list-item" v-for="(item,index) in industry" :key="item.id">
                        <div class="item-tit">{{item.name}}：</div>
                        <div class="item-list">
                            <div @click="searchResums(item.id,positionItem.id)"  :class="{'item-list-child':true,'item-list-child-active':item.id==station1&&positionItem.id==station2}" v-for="(positionItem,positionIndex) in position" v-show="item.id==positionItem.iid"
								:key="positionItem.id">{{positionItem.name}}</div>
                        </div>
                    </div> -->
                </div>
                <div class="list">
                    <div class="list-item top">
                        <div class="list-item-box">姓名</div>
                        <div class="list-item-box">专业</div>
                        <div class="list-item-box">注册情况</div>
                        <div class="list-item-box">价格</div>
                        <div class="list-item-box">用途</div>
                        <div class="list-item-box">发布日期</div>
                    </div>
                    <div @click="getResumeDetails(item.id)" class="list-item cursor" v-for="(item, index) in ResumeList" :key="item.id">
                        <div class="list-item-box">{{item.name}}</div>
                        <div class="list-item-box">{{item.wish_join}}</div>
                        <div class="list-item-box">{{item.register_status}} </div>
                        <div class="list-item-box price">{{item.wish_money}}</div>
                        <div class="list-item-box">{{item.purpose}}</div><!-- e==1?'挂资质':item.purpose==2?'挂项目':'均可' -->
                        <div class="list-item-box">{{item.create_time}}</div>
                    </div>
                </div>
                <el-pagination
                        style="text-align: center"
                        background
                        layout="prev, pager, next"
                        :total="total"
						:page-size='20'
						@current-change='currentPage'>
                </el-pagination>
            </el-main>
            <!-- <el-aside v-if='showLogin' width="298px">
                <div class="form-box">
                    <div class="form-box-tit">各大行业职位任你选</div>
                    <div class="form-input-item">
                        <img src="../../assets/image/resume/phone-icon.png" width="13" height="21">
                        <input v-model="loginOptions.mobile" type="text" placeholder="请填写手机号" class="input-box">
                    </div>
                    <div class="form-input-item">
                        <img src="../../assets/image/resume/message-icon.png" width="18" height="14">
                        <div class="code-box">
                            <input v-model="loginOptions.code" type="text" placeholder="请填写验证码" class="code-input">
							<div v-show="show" @click="getVerification" slot="suffix" class="code-box-btn">获取验证码</div>
							<div v-show="!show" slot="suffix" class="code-box-btn">{{count+'S'}}</div>
                        </div>
                    </div>
                    <div  @click="homeGetLogin" class="form-btn">登录/注册</div>
                    <div class="form-desc">同意《用户协议》《个人隐私保护》</div>
                </div>
            </el-aside> -->
        </el-container>
    </div>
</template>

<script>
	import api from '../../api/api.js'
    export default {
		inject:['reload'],
        data() {
            return {
				total:0,
				
				
                list: [],
				industry:[], // 行业
				position:[], // 职位
				showPosition:[],// 展示的职位专业
				province:[], // 城市
				station1:'',
				station2:'',
				city:'',  
				ResumeList:[],
				page:1,
				mobile:'', //企业手机号
				
				
				choiseIndex:{
					industryIndex:-1,
					positionIndex:-1,
					provinceIndex:-1,
				},
				
				// 登录
				show: true,
				count: '',
				loginOptions: {
					code: '',
					mobile: '',
				},
				
				showLogin:true,
            }
        },
        created() {
			// this.getHotStatusList()
			if(api.getUserInfo()){
				this.showLogin = false
			}
			this.getConfig()
			// this.mobile = api.getUserInfo().mobile
			this.getResumeList()
			

        },
        methods: {
			choiseIndexAll(type){
				if(type==0){
					this.choiseIndex.industryIndex=-1
				}else if(type==1){
					this.choiseIndex.positionIndex=-1
					console.log(1111111111111111111)
				}else{
					this.choiseIndex.provinceIndex=-1
				}
				this.getResumeList()
			},
			
			
			// 请求登录
			getLogin() {
				let postData = this.loginOptions
				postData.platform = 1
				// this.$api.postForm(api.)
				this.$api.post(api.userLogin,postData,res=>{
					if(res.code == 1){
						this.$message({
							message: '登录成功！',
							type: 'success'
						})
						localStorage.setItem('userInfo',JSON.stringify(res.data))
						localStorage.setItem('userType','0')
						this.reload()
					}
				},err=>{
					this.$message({
						message: err.msg,
						type: 'warning'
					})
					
				})
			},
			
			// 点击登录
			homeGetLogin() {
				if (this.formVerification()) {
					// 登录
					this.getLogin()
				}
			},
			// 表单验证
			formVerification() {
				let {
					mobile,
					code
				} = this.loginOptions
				if (mobile.length == 0 || code.length == 0) {
					this.$message({
						message: '请填写手机号和验证码！',
						type: 'warning'
					});
					return false
				}
				return true
			},
			currentPage(e){
				console.log(e)
				this.page = e
				this.getResumeList()
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
					this.$api.post(api.sendUserMobile, {
						mobile: this.loginOptions.mobile
					}, res => {
						console.log(111, res)
						if (res.code == 1) {
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
			getTimers() {
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
			
			
			// 获取简历列表
			getResumeList(){
				let station1 = this.station1
				let station2 = this.station2
				let city = this.city
				if(this.choiseIndex.industryIndex==-1){
					station1 = ''
				}
				if(this.choiseIndex.positionIndex == -1){
					station2 = ''
					console.log(111)
				}
				if(this.choiseIndex.provinceIndex==-1){
					city = ''
				}
				
				let postData = {
					// mobile:this.mobile,
					city,
					station1,
					station2,
					page:this.page
				}
				console.log(postData)
				
				this.$api.postForm(api.getUserResumeList,postData).then(res=>{
					if(res.code==1){
						this.ResumeList =res.data.list
						this.total = res.data.count
					}
				})
			},
			
			// 获取网站配置
			getConfig() {
				this.$api.get(api.getConfig, null, res => {
					this.industry = res.data.industry
					this.position = res.data.position
					let arr =[]
					this.position.forEach((item,index)=>{
						if(index<10){
							arr.push(item)
						}
					})
					this.showPosition = arr
					
					this.province = res.data.province
				})
			},
			
			// 跳转简历详情
			getResumeDetails(id){
				this.$router.push({path:'/jl/resumedetails',query:{id}})
			},
			
			
			searchResums(station1,station2){
				this.station1 = station1;
				this.station2 = station2;
				this.getResumeList(station1,station2)
			},
			
			// 选择行业
			choiseIndustryIndex(id,index,name){
				this.choiseIndex.industryIndex = index
				let arr = []
				this.position.forEach((item,index)=>{
					if(item.iid == id){
						arr.push(item)
					}
				})
				this.showPosition = arr
				if(this.choiseIndex.positionIndex==-1){
					// this.choiseTxt = name
					this.station2 = ''
				}else{
					if(this.choiseIndex.positionIndex>this.showPosition.length-1&&this.choiseIndex.positionIndex!=-1){
						this.choiseIndex.positionIndex = 0
					}
					this.station2 = this.showPosition[this.choiseIndex.positionIndex].name
					// this.station2 = this.choiseTxt
				}
				this.station1 = name
				console.log(this.station1,this.station2)
				this.getResumeList()
			},
			
			
			// 选择职位
			choisePositionIndex(id,index,name){
				this.choiseIndex.positionIndex = index
				// this.choiseTxt = name
				this.station2 = name
				console.log(this.station1,this.station2)
				this.getResumeList()
			},
			
			// 选择城市
			choiseProvinceIndex(id,index,city){
				this.choiseIndex.provinceIndex = index
				this.city = city
				this.getResumeList()
			}
			
        }
    }
</script>

<style scoped lang="scss">
    .resume-container {
        width: 1200px;
        margin: 0 auto;
        padding-top: 32px;
        box-sizing: border-box;

        .el-container {
            width: 100%;
            position: relative;

            .el-aside {
                .form-box {
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
                                // height: 14px;
                                font-size: 13px;
                                font-family: Microsoft YaHei;
                                font-weight: 400;
                                color: #1E87F0;
                                padding-left: 9px;
                                border-left: 1px solid #DBDDE3;
								white-space: nowrap;
								cursor: pointer;
								// flex: 1;
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
                    width: 100%;
                    background: #1E87F0;
                    box-sizing: border-box;
                    padding: 30px;
                }
                position: fixed;
                right: 0;
                z-index: 999;
            }
            .el-main {
                width: 1160px;
                // padding: 0 20px 0 0;
                box-sizing: border-box;
                // position: re;
                right: 298px;
				margin: 0 auto;
                .tag-list {
                    .tag-list-item {
                        .item-list {
                            .item-list-child {
                                margin-left: 40px;
                                margin-bottom: 20px;
								cursor: pointer;
                            }
							.item-list-child:hover{
								color: #288aed;
							}
							.item-list-child-active{
								color: #288aed;
							}
                            flex: 1;
                            display: flex;
                            flex-wrap: wrap;
                        }
                        .item-tit {

                        }
                        display: flex;
                        margin-bottom: 20px;
                    }
                    .tag-list-item:last-of-type {
                        margin-bottom: 0;
                    }

                    box-sizing: border-box;
                    background: #ffffff;
                    padding: 15px;
					
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
        }
    }
	.tag-list-box{
		width: 100%;
		display: flex;
		// flex-wrap: wrap;
	}
	.tag_type_right{
		display: flex;
		flex-wrap: wrap;
	}
	.tag_type{
		font-size: 15px;
		color: #333;
		white-space: nowrap;
		line-height: 40px;
		cursor: pointer;
	}
	
	// .tag_type:hover{
	// 	// color:#288aed;
	// }
	
	.tag_items{
		font-size: 14px;
		color: #999;
		margin: 10px 5px;
		cursor: pointer;
		padding: 0 10px;
	}
	
	.tag_items_active{
		background: #288aed;
		color:#fff;
	}
	
	.tag_items:hover{
		color:#DD661D;
	}
</style>
