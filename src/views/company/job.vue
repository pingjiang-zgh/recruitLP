<template>
    <div class="job-container">
        <div class="job-tit-box">
            <div class="job-tit">招聘管理</div>
            <div @click="goSetResum"  class="job-btn">点击发布</div>
        </div>
        <div  class="list">
            <div class="list-item top">
                <div class="list-item-box">
                    <div class="list-item-tit">标题</div>
                    <div class="list-item-status">状态</div>
                </div>
                <div class="list-item-box">
                    <div class="list-item-status">价格</div>
                    <div class="list-item-tit">操作</div>
                </div>
            </div>
            <div class="list-item" v-for="(item,index) in recruitList" :key="item.id">
                <div class="list-item-box">
                    <div class="list-item-tit">{{item.title}}</div>
                    <div class="list-item-status status-name">成功发布</div>
                </div>
                <div class="list-item-box">
                    <div class="list-item-status price">￥{{item.money}}</div>
                    <div class="list-item-tit action">
                        <el-button class="istop" @click="setTop(item.id)">我要置顶</el-button>
                        <div class="cursord" @click="refresh(item.id)">刷新</div>
                        <el-button @click='goRecruitDetails(item.id)' class="isedit">编辑</el-button>
                        <el-button @click='delRecruitItem(item.id)' class="recycle">回收站</el-button>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog :visible.sync="visible" width="740px" custom-class="top-modal">
            <div class="top-main">
                <div class="tit">选择置顶时长</div>
                <div class="top-list">
                    <div @click="changeTimeIndex(index,item.id)" v-for="(item,index) in btnsTime" :key='item.id' :class="{'top-list-item':true,'btsActive':btnsTimeIndex==index}">置顶{{item.day}}天</div>
                </div>
                <div class="tit mt20">选择置顶位置</div>
                <div class="top-list">
                   <div @click="changeTimeIndex(index)" v-for="(item,index) in btnsPosition" :key='item.id' :class="{'top-list-item':true,'btsActive':btnsPositionIndex==index}">{{item.value}}</div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="payClass">确 定</el-button>
            </div>
        </el-dialog>
		
		
		
    </div>
</template>

<script>
	import api from "../../api/api.js"
    export default {
        data() {
            return {
				mobile:api.getUserInfo().mobile,
                list: [],
                visible: false,
				recruitList:[],
				
				btnsTime:[
					{id:1,value:'置顶3天'},
					{id:2,value:'置顶7天'},
					{id:3,value:'置顶9天'},
				],
				btnsTimeIndex:0,
				payClassId:null,
				
				btnsPositionIndex:0,
				btnsPosition:[
					{id:1,value:'PC首页置顶'},
					{id:2,value:'手机端首页'},
					{id:3,value:'分类置顶'},
				],
				
				setTopId:0,
				
            }
        },
        created() {
            this.init()
			this.getRecruitList() // 获取招聘列表
			this.getConfig()
        },
        methods: {
			getRecruitList(){
				let postData = {
					mobile:api.getUserInfo().mobile,
					page:1,
				}
				this.$api.post(api.getInformationList,postData,res=>{
					console.log(res)
					this.recruitList = res.data.list
				})
			},
			
			getConfig() {
				this.$api.get(api.getConfig, null, res => {
					console.log(res)
					let payclass = res.data.payclass
					let arr = []
					payclass.forEach(item=>{
						if(item.class==0) arr.push(item)
						
					})
					
					this.btnsTime = arr
					this.payClassId = arr[0].id
				})
			},
			// 删除招聘信息
			delRecruitItem(id){
				let postData = {
					id,
					mobile:this.mobile,
				}
				this.$api.postForm(api.informationDel,postData).then(res=>{
					if(res.code==1){
						this.$message.success('删除成功!')
						this.getRecruitList()
					}else{
						this.$message.warning(res.msg)
					}
				})
			},
			
			
            init() {
                this.list = new Array(10).fill(1)
            },
            setTop(id) {
				this.setTopId = id
                this.visible = true
            },
			
			goSetResum(){
				this.$router.push({path:"/qiye/jobEdit"}).catch(err=>err)
			},
			
			goRecruitDetails(id){
				this.$router.push({path:"/qiye/jobEdit",query:{id:id}}).catch(err=>err)
			},
			
			
			changeTimeIndex(index,id){
				if(id){
					console.log(id)
					this.btnsTimeIndex = index
					this.payClassId = id
				}else{
					console.log(id)
					this.btnsPositionIndex = index
				}
			},
			
			payClass(){
				
				this.$confirm('此操作将花费你'+this.btnsTime[this.btnsTimeIndex].coin+'个金币, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
							let postData = {
								mobile:api.getUserInfo().mobile,
								id:this.payClassId,
								sid:this.setTopId,
								position:this.btnsPositionIndex +1
							}
							console.log(postData)
							this.$api.postForm(api.topInformation,postData).then(res=>{
								if(res.code ==1){
									localStorage.setItem('userInfo',JSON.stringify(res.data))
									this.$message.success('置顶成功')
								}else{
									this.$message.warning(res.msg)
								}
								this.visible = false
							})
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消'
				          });          
				        });
				// console.log() // 花费的金币
				
				
			},
			
			refresh(id){
				let postData ={
					mobile:this.mobile,
					id,
				}
				this.$api.postForm(api.refreshInformation,postData).then(res=>{
					if(res.code==1){
						this.$message.success('已刷新！')
					}else{
						this.$message.warning(res.msg)
					}
				})
			}
			
        }
    }
</script>

<style scoped lang="scss">
    .job-container {
		width: 880px;
		min-height: 552px;
        .job-tit-box {
            display: flex;
            align-items: center;
			
            .job-tit {
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #333333;
                margin-right: 20px;
            }
            .job-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 20px;
                background: #288aed;
                color: #ffffff;
				cursor: pointer;
            }
        }
        .list {
            margin-top: 18px;

            .list-item {
                width: 100%;
                height: 80px;
                box-sizing: border-box;
                background: #ffffff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
                margin-bottom: 10px;

                .list-item-box {
                    width: 48%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .list-item-tit {
                        width: 70%;
                        text-align: center;
                    }
                    .list-item-tit.action {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        /deep/ .el-button {
                            border: none;
                            padding: 10px;
                        }
                        .istop {
                            background: #F44336;
                            color: #ffffff;
                            margin-right: 10px;
                        }
                        .isedit {
                            background: #1E87F0;
                            color: #ffffff;
                            margin-left: 10px;
                        }
                        .recycle {
                            color: #ffffff;
                            margin-left: 10px;
                            background: #0CB46A;
                        }
                    }
                    .list-item-status {
                        width: 28%;
                        text-align: center;
                    }
                    .list-item-status.status-name {
                        color: #24B274;
                    }
                    .list-item-status.price {
                        color: #DD661D;
                    }
                }
            }
            .list-item.top {
                font-weight: bold;
            }
        }
        .top-modal {
            .el-dialog__body {
                .top-main {
                    .tit {
                        font-size: 19px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #333333;
                    }
                    .top-list {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 20px;

                        .top-list-item {
							border-radius: 5px;
                            width: 30%;
                            height: 60px;
                            border: 2px solid #ddd;
                            font-size: 15px;
                            font-family: Microsoft YaHei;
                            font-weight: 400;
                            color: #CCC;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            cursor: pointer;
                        }
						.btsActive{
							color: #1E87F0;
							border: 2px solid #1E87F0;
						}
                    }
                    .mt20 {
                        margin-top: 20px;
                    }
                }
            }
            .dialog-footer {
                display: flex;
                justify-content: center;

                /deep/ .el-button {
                    width: 424px;
                    height: 53px;
                    background: #1E87F0;
                    border: none;
                    border-radius: 0;
                    color: #fff;
                }
            }
			
        }
    }
	.cursord{
		cursor: pointer;
	}
</style>
