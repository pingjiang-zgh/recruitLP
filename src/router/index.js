import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../Layout'
import User from '../views/user/Index.vue'
import Company from '../views/company/Index.vue'

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
    path: '/company',
    component: Layout,
    children: [
      {
        path: '/company',
        name: 'Company',
        component: Company,
        redirect: '/company/home',
        children: [
          {
            path: '/company/home',
            name: 'CompanyHome',
            meta: { title: '企业个人主页' },
            component: () => import('../views/company/home')
          },
          {
            path: '/company/info',
            name: 'CompanyInfo',
            meta: { title: '企业信息编辑' },
            component: () => import('../views/company/info')
          },
          {
            path: '/company/jobEdit',
            name: 'CompanyJobEdit',
            meta: { title: '发布职位信息' },
            component: () => import('../views/company/jobEdit')
          },
          {
            path: '/company/job',
            name: 'CompanyJob',
            meta: { title: '职位管理' },
            component: () => import('../views/company/job')
          },
          {
            path: '/company/member',
            name: 'CompanyMember',
            meta: { title: '会员管理' },
            component: () => import('../views/company/member')
          }
        ]
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
            meta: { title: '用户个人主页' },
            component: () => import('../views/user/home')
          },
          {
            path: '/user/record',
            name: 'UserRecord',
            meta: { title: '用户沟通记录' },
            component: () => import('../views/user/record')
          },
          {
            path: '/user/info',
            name: 'UserInfo',
            meta: { title: '用户信息' },
            component: () => import('../views/user/info')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
