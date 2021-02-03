import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import ContractRequest from '../components/home/contracts-request'
import RequestDetail from '../components/home/request-detail'
import ConfirmContract from '../components/home/confirm-contract'
import AccountManagement from '../views/account-management'
import MedicalInstruction from '../components/home/medical-instruction'
import HomePage from '../components/home'

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
    component: Home,
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: 'contract-request',
        component: ContractRequest
      },
      {
        path: 'medical-instruction',
        component: MedicalInstruction
      },
      {
        path: 'request-detail/:contractId',
        name: 'request-detail',
        component: RequestDetail
      },
      {
        path: 'confirm-contract',
        name: 'confirm-contract',
        component: ConfirmContract
      }
    ]
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
