import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from './store'

Vue.use(VueRouter)

const PUBLIC_ROUTES = ['Home', '404']

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/inventory/:category?',
    name: 'Inventory',
    component: () => import(/* webpackChunkName: "inventory" */ '@/views/Inventory.vue'),
    props: true
  },
  {
    path: '/inventory-item',
    name: 'InventoryItem',
    component: () => import(/* webpackChunkName: "inventory-item" */ '@/views/InventoryItem.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '@/views/Orders.vue')
  },
  {
    path: '/builds',
    name: 'Builds',
    component: () => import(/* webpackChunkName: "builds" */ '@/views/Builds.vue')
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import(/* webpackChunkName: "lists" */ '@/views/Lists.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (PUBLIC_ROUTES.includes(to.name) || store.getters['auth/loggedIn']) {
    next()
  } else {
    next({ name: 'Home' })
  }
})

export default router
