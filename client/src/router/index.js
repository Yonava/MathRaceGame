import Vue from 'vue'
import VueRouter from 'vue-router'  
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('../views/Play.vue')
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/go/:roomid',
    name: 'InviteRoute',
    component: () => import('../views/InviteRoute.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
