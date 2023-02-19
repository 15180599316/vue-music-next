import { createRouter, createWebHashHistory } from 'vue-router'
import recommend from '@/views/recommend.vue'

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
    name: 'singer',
    component: () => import(/* webpackChunkName: "singer" */ '../views/singer.vue')
  }, {
    path: '/top-list',
    name: 'topList',
    component: () => import(/* webpackChunkName: "topList" */ '../views/topList.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
