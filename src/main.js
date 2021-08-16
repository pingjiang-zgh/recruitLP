import Vue from 'vue'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '49ab57e8d314f18d40b35e591d35f2e2',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


// 引入element-ui
import {
  Container, Header, Main, Aside, Menu, MenuItem, Row, Col, Input, Button,
  Select, Option, Pagination, Upload, Dialog, Checkbox, Carousel, CarouselItem,MessageBox,
  Message,Loading,DatePicker,
} from 'element-ui'
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(DatePicker)
Vue.use(Checkbox)
Vue.use(Carousel)
Vue.use(CarouselItem)


Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading.service;
// 配置axios
// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
