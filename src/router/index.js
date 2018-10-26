import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import HomePage from '@/components/HomePage'
import ManagePage from '@/components/ManagePage'
import AddCardPage from '@/components/AddCardPage'
import EditCardPage from '@/components/EditCardPage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/home',
      name: 'ManagePage',
      component: ManagePage
    },
    {
      path: '/add',
      name: 'AddCardPage',
      component: AddCardPage
    },
    {
      path: '/edit/:id',
      name: 'EditCardPage',
      component: EditCardPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.state.currentUserState.token || to.path === '/') {
    next()
  } else {
    next('/')
  }
})

export default router
