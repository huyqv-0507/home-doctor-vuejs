import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import ContractRequest from '../components/home/contracts-request'
import RequestDetail from '../components/home/request-detail'
import ConfirmContract from '../components/home/confirm-contract'
import AccountManagement from '../views/account-management'
import MedicalSchedule from '../components/home/medical-instruction/MedicalSchedule.vue'
import VitalSign from '../components/home/medical-instruction/VitalSign.vue'
import HomePage from '../components/home'
import Contract from '../components/home/contract'
import PatientDetail from '../components/home/patient-detail'
import NewMedicalSchedule from '../components/home/medical-instruction/NewMedicalSchedule.vue'
import ActiveContract from '../components/home/contract/ActiveContract.vue'
import FinishContract from '../components/home/contract/FinishContract.vue'
import RejectContract from '../components/home/contract/RejectContract.vue'
import PendingContract from '../components/home/contract/PendingContract.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
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
        path: 'contracts',
        component: Contract,
        children: [
          {
            path: '',
            component: ActiveContract
          },
          {
            path: 'active-contract',
            component: ActiveContract
          },
          {
            path: 'finish-contract',
            component: FinishContract
          },
          {
            path: 'reject-contract',
            component: RejectContract
          },
          {
            path: 'pending-contract',
            component: PendingContract
          }
        ]
      },
      {
        path: 'medical-schedule',
        component: MedicalSchedule
      },
      {
        path: 'vital-sign',
        component: VitalSign
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
      },
      {
        path: 'patient-detail',
        name: 'patient-detail',
        component: PatientDetail
      },
      {
        path: 'new-medical-schedule',
        name: 'new-medical-schedule',
        component: NewMedicalSchedule
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
