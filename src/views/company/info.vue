<template>
    <div class="info-container">
        <div class="material-box">
            <div class="material-box-head">基本信息</div>
            <div class="material-box-main">
                <div class="img-item">
                    <div class="img-item-tit">公司头像</div>
                    <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">联系人</div>
                    <el-input  v-model="enpInfo.username" class="main-item-input" placeholder="请填写联系人"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">联系电话</div>
                    <el-input onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
maxlength="11" v-model="enpInfo.umobile" class="main-item-input" placeholder="请填写联系电话"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">公司名称</div>
                    <el-input disabled v-model="enpInfo.name" class="main-item-input" placeholder="请填写公司名称"></el-input>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">公司地址</div>
					<div class="showModle">
						<el-select filterable @change="changeCity" v-model="enpInfo.province" placeholder="请选择省份" class="main-item-input">
							<el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-select filterable v-show="choiseCity" v-model="enpInfo.city" placeholder="请选择工作城市" class="main-item-input">
							<el-option v-for="item in showCitys" :key="item.value" :label="item.name" :value="item.name">
							</el-option>
						</el-select>
						<el-input v-model="enpInfo.address" class="main-item-input" placeholder="请填写公司地址"></el-input>
					</div>
                </div>
				
				<div class="main-item">
				    <div class="main-item-tit">公司成立时间</div>
				    <el-input type="text" v-model="enpInfo.ins_date" class="main-item-input" placeholder="请填写公司成立时间"></el-input>
				</div>
				<div class="main-item">
				    <div class="main-item-tit">公司法人</div>
				    <el-input  v-model="enpInfo.representative" class="main-item-input" placeholder="请填写公司法人"></el-input>
				</div>
				<div class="main-item">
				    <div class="main-item-tit">注册资金</div>
				    <el-input onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"  type="number" v-model="enpInfo.capital" class="main-item-input" placeholder="请填写注册资金"></el-input>
				</div>
            </div>
        </div>

        <div class="advantage-box">
            <div class="advantage-box-head">公司描述</div>
            <div class="advantage-box-input-container">
                <el-input type="textarea" placeholder="请输入内容" class="advantage-box-input"
                          v-model="enpInfo.introduce"
                          maxlength="200"
                          show-word-limit
                />
            </div>
        </div>

		<!-- <div class="advantage-box">
		    <div class="advantage-box-head">公司介绍</div>
		    <div class="advantage-box-input-container">
		        <el-input type="textarea" placeholder="请输入内容" class="advantage-box-input"
		                  v-model="introduce"
		                  maxlength="200"
		                  show-word-limit
		        />
		    </div>
		</div> -->

        <div class="material-box mt20">
            <div class="material-box-head">资质</div>
            <div class="material-box-main">
                <div class="main-item">
                    <div class="main-item-tit">公司人数范围</div>
                    <el-select v-model="enpInfo.peoples" placeholder="请选择人数" class="main-item-input">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                        </el-option>
                    </el-select>
                </div>
                <div class="main-item">
                    <div class="main-item-tit">所属行业</div>
                    <el-select v-model="enpInfo.industry" placeholder="请选择所属行业" class="main-item-input">
                        <el-option
                                v-for="item in industry"
                                :key="item.value"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </div>
				<div class="main-item">
				    <div class="main-item-tit">经营状态</div>
				    <el-select v-model="enpInfo.status" placeholder="请选择经营状态" class="main-item-input">
				        <el-option
				                v-for="item in statusOptions"
				                :key="item.value"
				                :label="item.label"
				                :value="item.label">
				        </el-option>
				    </el-select>
				</div>
				<div class="main-item">
				    <div class="main-item-tit">企业类型</div>
				    <el-select v-model="enpInfo.type" placeholder="请选择企业类型" class="main-item-input">
				        <el-option
				                v-for="item in typeOptions"
				                :key="item.value"
				                :label="item.label"
				                :value="item.label">
				        </el-option>
				    </el-select>
				</div>
            </div>
        </div>
        <div class="footer-btn">
            <el-button @click="setEnpInfoo">提交</el-button>
        </div>
    </div>
</template>

<script>
	import api from '../../api/api.js'
    export default {
		inject:['reload'],
        data() {
            return {
                imageUrl: '',
                textarea: '',
                options: [{
                    value: '选项1',
                    label: '10'
                }, {
                    value: '选项2',
                    label: '100'
                }, {
                    value: '选项3',
                    label: '500'
                }, {
                    value: '选项4',
                    label: '1000'
                }, {
                    value: '选项5',
                    label: '1000以上'
                }],
                value: '',
				// 存续、在业、吊销、注销、迁入、迁出、停业、清算
				statusOptions: [{
				    value: '选项1',
				    label: '存续'
				}, {
				    value: '选项2',
				    label: '在业'
				}, {
				    value: '选项3',
				    label: '吊销'
				}, {
				    value: '选项4',
				    label: '注销'
				}, {
				    value: '选项5',
				    label: '迁入'
				}, {
				    value: '选项6',
				    label: '迁出'
				}, {
				    value: '选项7',
				    label: '停业'
				}, {
				    value: '选项8',
				    label: '清算'
				}],
				
				
				// 公司类型
				typeOptions: [{
				    value: '选项1',
				    label: '责任制'
				}, {
				    value: '选项2',
				    label: '非责任制'
				}],
				
				enpInfo:{},
				industry:[],
				
				// 城市
				citys:[],
				showCitys:[],
				province:[],
				choiseCity:true,
				
				
				// introduce:'', // 公司介绍
            }
        },
		created() {
			this.getEnpInfo()
			this.getConfig()
		},
		
        methods: {
			// 保存信息
			setEnpInfoo(){
				if(this.formVerification()){
					let postData = this.getPostData()
					this.$api.postForm(api.enterpriseEdit,postData).then(res=>{	
						if(res.code ==1 ){
							this.$message.success('保存成功')
							localStorage.setItem('userInfo',JSON.stringify(res.data))
							this.getConfig()
							// this.getUserInfo
							this.reload()
						}else{
							this.$message.warning(res.msg)
						}
					})
				}
			},
			
			// 保存验证
			formVerification(){
				let postData = this.getPostData()
				
				if(postData.avatar==""){
					this.$message.warning('请提交公司头像')
					return  false
				}
				if(postData.umobile.trim().length<11){
					this.$message.warning('请填写正确的手机号')
					return  false
				}
				for(let k in postData){
					if((postData[k]+"").trim() == ""){
						this.$message.warning('请填写所有信息')
						return  false
					}
				}
				
				return true
			},
			
			// 获取需要提交的参数
			getPostData(){
				let enpInfo = this.enpInfo
				let {introduce,ins_date,representative,capital,username,umobile,province,city,address,desc,peoples,industry,type,status,id,mobile,name} = enpInfo
				
				let postData = {
					mobile,
					id,
					representative,
					capital,
					status,
					avatar:this.imageUrl,
					umobile,
					username,
					province,
					city,
					// county:'',
					// area:'',
					address:province+'-'+city+'-'+address,
					introduce,
					type,
					peoples,
					industry,
					ins_date,
					name,
				}
				
				console.log(postData)
				return postData
			},
			
				
			// 获取基本信息
			getEnpInfo(){
				let EnpInfo = api.getUserInfo()
				this.enpInfo = EnpInfo
				
				let address = this.enpInfo.address
				this.enpInfo.address = address.split('-')[2]
				this.imageUrl = EnpInfo.avatar
			},
			// 获取配置信息
			getConfig(){
				this.$api.get(api.getConfig,null,res=>{
					console.log(res)
					this.industry = res.data.industry
					let province = res.data.province
					let citys = res.data.city
					this.citys = citys
					this.province = province
					this.allpositionList = res.data.position
					
				})
			},
			
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
				this.enpInfo.city = arr[0].name
				this.choiseCity = true
			},
			
			
			getBase64(file) {
			      return new Promise(function (resolve, reject) {
			        let reader = new FileReader();
			        let imgResult = "";
			        reader.readAsDataURL(file);
			        reader.onload = function () {
			          imgResult = reader.result;
			        };
			        reader.onerror = function (error) {
			          reject(error);
			        };
			        reader.onloadend = function () {
			          resolve(imgResult);
			        };
			      });
			},
			beforeUpload(file) {
			    this.getBase64(file).then(res => {
					res = res.slice(22)
					console.log(res);
					let postData = {
						img:res
					}
					this.$api.postForm(api.uploadImage,postData).then(data=>{
						console.log(data)
						if(data.code==1){
							this.imageUrl = data.data
						}
					})
			   })
			}
        }
    }
</script>

<style scoped lang="scss">
	.showModle{
		display: flex;
	}
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

                .img-item {
                    width: 100%;
                    margin-bottom: 30px;

                    .avatar-uploader {
                        margin-top: 10px;
                        /deep/ .el-upload {
                            border: 1px dashed #d9d9d9;
                            border-radius: 6px;
                            cursor: pointer;
                            position: relative;
                            overflow: hidden;
                        }
                        /deep/ .el-upload:hover {
                            border-color: #409EFF;
                        }
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
                }
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
                    margin-bottom: 0;
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
</style>
