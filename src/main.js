import Vue from 'vue'

// 引入element-ui
import { Container, Button, Row } from 'element-ui'
Vue.use(Container)
Vue.use(Button)
Vue.use(Row)

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
