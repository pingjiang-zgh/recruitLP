import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../Layout'
import User from '../views/user/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: '/user',
        name: 'User',
        component: User,
        redirect: '/user/home',
        children: [
          {
            path: '/user/home',
            name: 'UserHome',
            component: () => import('../views/user/home')
          },
          {
            path: '/user/record',
            name: 'UserRecord',
            component: () => import('../views/user/record')
          },
          {
            path: '/user/info',
            name: 'UserInfo',
            component: () => import('../views/user/info')
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
