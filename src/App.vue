<template>
  <div id="app">
    <router-view v-if="isRoterReload"/>
  </div>
</template>
<script type="text/javascript">
	export default {
		provide(){
			return{
				reload:this.reload,
			}
		},
		data(){
			return {
				isRoterReload:true,
			}
		},
		methods:{
			reload(){
				this.isRoterReload = false,
				this.$nextTick(function(){
					this.isRoterReload = true
				})
			}
		}
	}
</script>
<style lang="scss">
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: #f6f6f6;
  }
  #app {
    width: 100%;
    height: 100%;
    min-width: 1024px;
  }
  input {
    outline: none;
  }
  .cursor {
    cursor: pointer;
  }
  .el-main{
	  flex: none;
  }
  
</style>
