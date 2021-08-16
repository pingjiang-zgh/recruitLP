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
          },
          {
            path: '/company/investMoney',
            name: 'CompanyInvestMoney',
            meta: { title: '金币充值' },
            component: () => import('../views/company/investMoney')
          },
		  {
		    path: '/company/record',
		    name: 'CompanyRecord',
		    meta: { title: '消费记录' },
		    component: () => import('../views/company/record')
		  }
        ]
      }
    ]
  },
  {
      path: '/resume',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'Resume',
          meta: { title: '简历库' },
          component: () => import('../views/resume/index')
        },
        {
          path: '/resume/recruit',
          name: 'ResumeRecruit',
          meta: { title: '招聘信息' },
          component: () => import('../views/resume/recruit')
        },
        {
          path: '/resume/station',
          name: 'ResumeStation',
          meta: { title: '职位详情' },
          component: () => import('../views/resume/station')
        },
		{
		  path: '/resume/companydetails',
		  name: 'ResumeCompanyDetails',
		  meta: { title: '公司详情' },
		  component: () => import('../views/resume/companyDetails')
		},
		{
		  path: '/resume/resumedetails',
		  name: 'ResumeResumeDetails',
		  meta: { title: '简历详情' },
		  component: () => import('../views/resume/resumedetails')
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
        component: User,  // 职位推荐
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
          },
		  {
		    path: '/user/resume',
		    name: 'UserResumeList',
		    meta: { title: '简历管理' }, 
		    component: () => import('../views/user/ResumeList')
		  },
		  {
		    path: '/user/releaseResume',
		    name: 'UserReleaseResume',
		    meta: { title: '发布简历' }, 
		    component: () => import('../views/user/releaseResume')
		  }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login'),
	meta: { title: '登录' },
  },
  {
    path: '/register',
    component: () => import('../views/Register'),
	meta: { title: '注册' }
	
  },
  {
    path: '/retrieve-pwd',
    component: () => import('../views/RetrievePwd'),
	meta: { title: '修改密码' }
  }
]



const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

//2.使用router.beforeEach对路由进行遍历，设置title
router.beforeEach((to, from, next) => {
 //beforeEach是router的钩子函数，在进入路由前执行
 if (to.meta.title) {
  //判断是否有标题
  console.log(to.meta.title)
  document.title = to.meta.title
 } else {
  document.title = '默认title'
 }
 next()
})


export default router
