import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import ContractRequest from '../views/home/contract-request'
import RequestDetail from '../views/home/request-detail'
import ConfirmContract from '../views/home/confirm-contract'
import AccountManagement from '../views/home/account-management'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/contract-request',
    name: 'ContractRequest',
    component: ContractRequest
  },
  {
    path: '/request-detail/:contractId',
    name: 'request-detail',
    component: RequestDetail
  },
  {
    path: '/confirm-contract',
    name: 'confirm-contract',
    component: ConfirmContract
  },
  {
    path: '/account-manage',
    name: 'account-manage',
    component: AccountManagement
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
