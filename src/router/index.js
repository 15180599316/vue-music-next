import { createRouter, createWebHashHistory } from 'vue-router'
import recommend from '@/views/recommend.vue'
const Singer = () => import('@/views/singer.vue' /* webpackChunkName: "singer" */)
const SingerDetail = () => import('@/views/singer-detail'/* webpackChunkName: "singer-detail" */)
const UserCenter = () => import('@/views/user-center'/* webpackChunkName: "user-center" */)

const routes = [
  {
    path: '/',
    redirect: 'recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: recommend
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  }, {
    path: '/top-list',
    name: 'topList',
    component: () => import(/* webpackChunkName: "topList" */ '../views/topList.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search.vue')
  },
  {
    path: '/user',
    components: {
      user: UserCenter
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
