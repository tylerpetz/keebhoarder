import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lists',
    name: 'Lists',
    component: () => import(/* webpackChunkName: "lists" */ '@/views/Lists.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lists/:id',
    name: 'SingleList',
    component: () => import(/* webpackChunkName: "lists" */ '@/views/SingleList.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '@/views/Orders.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders/:id',
    name: 'SingleOrder',
    component: () => import(/* webpackChunkName: "orders" */ '@/views/SingleOrder.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import(/* webpackChunkName: "items" */ '@/views/Items.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/items/:id',
    name: 'SingleItem',
    component: () => import(/* webpackChunkName: "items" */ '@/views/SingleItem.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
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
  if (to.name === 'Home') {
    next()
  } else if (to.matched.some((record) => record.meta.requiresAuth) && store.getters['auth/loggedIn']) {
    next()
  } else {
    next({ name: 'Home' })
  }
})

export default router
