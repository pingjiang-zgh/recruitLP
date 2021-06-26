import Vue from 'vue'

// 引入element-ui
import {
  Container, Header, Main, Aside, Menu, MenuItem, Row, Col, Input, Button,
  Select, Option, Pagination, Upload, Dialog
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

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
