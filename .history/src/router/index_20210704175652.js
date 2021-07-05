import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/new',
    name: 'new',
    component:  () => import('../components/New.vue')
  },
]
const router = createRouter({
  history: createWebHistory('./'),
  // history: createWebHashHistory('./'),
  routes,
})

export default router
