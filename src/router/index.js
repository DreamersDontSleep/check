import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'Home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: '', permissions: [] }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/entryList',
    component: Layout,
    meta: { title: '报告申请管理', icon: '', permissions: [296, 297, 298, 299, 300] },
    children: [
      {
        path: 'index',
        name: 'Data',
        component: () => import('@/views/entryList/index'),
        meta: { title: '报告申请管理', icon: '', permissions: [296, 297, 298, 299, 300] }
      },
      {
        path: 'landValuationReport',
        name: 'LandValuationReport',
        hidden: true,
        component: () => import('@/views/entryList/landValuationReport'),
        meta: { title: '土地估价报告', icon: '', permissions: [296, 297, 298, 299, 300] }
      },
      {
        path: 'realEstateReport',
        name: 'RealEstateReport',
        hidden: true,
        component: () => import('@/views/entryList/realEstateReport'),
        meta: { title: '房地产估价报告', icon: '', permissions: [296, 297, 298, 299, 300] }
      },
      {
        path: 'assetsReport',
        name: 'AssetsReport',
        hidden: true,
        component: () => import('@/views/entryList/assetsReport'),
        meta: { title: '资产评估报告', icon: '', permissions: [296, 297, 298, 299, 300] }
      },
      {
        path: 'preliminaryAssessment',
        name: 'PreliminaryAssessment',
        hidden: true,
        component: () => import('@/views/entryList/preliminaryAssessment'),
        meta: { title: '预评估', icon: '', permissions: [296, 297, 298, 299, 300] }
      },
			{
			  path: 'print',
			  name: 'Print',
			  hidden: true,
			  component: () => import('@/views/entryList/print'),
			  meta: { title: '打印', icon: '', permissions: [296, 297, 298, 299, 300] }
			},
			{
			  path: 'landPrint',
			  name: 'LandPrint',
			  hidden: true,
			  component: () => import('@/views/entryList/landPrint'),
			  meta: { title: '打印', icon: '', permissions: [296, 297, 298, 299, 300] }
			},
			{
			  path: 'modifyRealEstateReport',
			  name: 'ModifyRealEstateReport',
			  hidden: true,
			  component: () => import('@/views/entryList/modifyRealEstateReport'),
			  meta: { title: '房地产报告', icon: '', permissions: [296, 297, 298, 299, 300] }
			},
			{
			  path: 'modifyLandValuationReport',
			  name: 'ModifyLandValuationReport',
			  hidden: true,
			  component: () => import('@/views/entryList/modifyLandValuationReport'),
			  meta: { title: '土地报告', icon: '', permissions: [296, 297, 298, 299, 300] }
			},
			{
			  path: 'modifyAssetsReport',
			  name: 'ModifyAssetsReport',
			  hidden: true,
			  component: () => import('@/views/entryList/modifyAssetsReport'),
			  meta: { title: '资产评估报告', icon: '', permissions: [296, 297, 298, 299, 300] }
			},
			{
			  path: 'modifyPreliminaryAssessment',
			  name: 'ModifyPreliminaryAssessment',
			  hidden: true,
			  component: () => import('@/views/entryList/modifyPreliminaryAssessment'),
			  meta: { title: '预评估报告', icon: '', permissions: [296, 297, 298, 299, 300] }
			},
      {
        path: 'checkIndex',
        name: 'CheckIndex',
        hidden: true,
        component: () => import('@/views/entryList/checkIndex'),
        meta: { title: '审核', icon: '', permissions: [296, 297, 298, 299, 300] }
      }
    ]
  },
  {
    path: '/checkList',
    component: Layout,
    meta: { title: '报告审批管理', icon: '', permissions: [302, 303] },
    children: [
      {
        path: 'index',
        name: 'Data',
        component: () => import('@/views/checkList/index'),
        meta: { title: '报告审批', icon: '', permissions: [302, 303] }
      },
			{
			  path: 'sealList',
			  name: 'SealList',
			  component: () => import('@/views/checkList/sealList'),
			  meta: { title: '报告盖章', icon: '', permissions: [303] }
			},
      {
        path: 'landValuationReport',
        name: 'LandValuationReport',
        hidden: true,
        component: () => import('@/views/checkList/landValuationReport'),
        meta: { title: '土地估价报告', icon: '', permissions: [302, 303] }
      },
      {
        path: 'realEstateReport',
        name: 'RealEstateReport',
        hidden: true,
        component: () => import('@/views/checkList/realEstateReport'),
        meta: { title: '房地产估价报告', icon: '', permissions: [302, 303] }
      },
      {
        path: 'assetsReport',
        name: 'AssetsReport',
        hidden: true,
        component: () => import('@/views/checkList/assetsReport'),
        meta: { title: '资产评估报告', icon: '', permissions: [302, 303] }
      },
      {
        path: 'preliminaryAssessment',
        name: 'PreliminaryAssessment',
        hidden: true,
        component: () => import('@/views/checkList/preliminaryAssessment'),
        meta: { title: '预评估', icon: '', permissions: [302, 303] }
      },
      {
        path: 'checkSeal',
        name: 'CheckSeal',
        hidden: true,
        component: () => import('@/views/checkList/checkSeal'),
        meta: { title: '盖章', icon: '', permissions: [302, 303] }
      }
    ]
  },
	{
	  path: '/statistical',
	  component: Layout,
	  meta: { title: '报告统计', permissions: [305] },
	  children: [
	    {
	      path: 'statistical/index',
	      name: 'Statistical',
	      component: () => import('@/views/statistical/index'),
	      meta: { title: '报告统计', permissions: [305] }
	    }
	  ]
	},
	{
		path: '/dataImport',
		component: Layout,
		meta: { title: '数据导入', permissions: [305] },
		children: [
		  {
		    path: 'dataImport/index',
		    name: 'DataImport',
		    component: () => import('@/views/dataImport/index'),
		    meta: { title: '数据导入', permissions: [305] }
		  }
		]
	},
  { path: '*', redirect: '/404', hidden: true }
]
