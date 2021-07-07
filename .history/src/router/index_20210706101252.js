import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: '/about',
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: About,
  },
  {
    path: '/new',
    name: '/new',
    component: () => import('../components/New.vue')
  },
]
const router = createRouter({
  history: createWebHistory('./'),
  routes,
})

export default router