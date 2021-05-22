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
import ApproveContract from '../components/home/contract/ApproveContract.vue'
import PatientDetailView from '../views/patient-detail'
import OverviewPatient from '../components/patient-detail/overview'
import TimelinePatient from '../components/patient-detail/timeline'
import VitalSignPatient from '../components/patient-detail/vital-sign'
import HealthRecordPatient from '../components/patient-detail/health-record'
import History from '../views/history'
import HistoryPage from '../components/history'
import ContractHistory from '../components/history/contract-history'
import MedicalInstructionHistory from '../components/history/medical-instruction-history'
import PrescriptionHistory from '../components/history/prescription-history'
import ActivityPatient from '../components/patient-detail/activity'
import Appointment from '../components/home/appointment'
import AppointmentHistory from '../components/history/appointment-history'
import AppointmentSet from '../components/home/appointment/appointment-set/index.vue'
import AppointmentDetail from '../components/home/appointment/appointment-detail/index.vue'
import SignContract from '../components/home/contract/SignContract.vue'
import Charts from '../components/modals/chart.vue'

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
          },
          {
            path: 'approve-contract',
            component: ApproveContract
          },
          {
            path: 'sign-contract',
            component: SignContract
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
      },
      {
        path: 'appointment',
        component: Appointment
      },
      {
        path: 'appointment-set',
        component: AppointmentSet
      },
      {
        path: 'appointment-detail',
        component: AppointmentDetail
      },

      {
        path: 'detail',
        component: () => import('../components/home/appointment/appointment-detail/detail.vue')
      },
      {
        path: 'account-manage',
        name: 'account-manage',
        component: AccountManagement
      },
      {
        path: 'contract-history',
        component: () => import('../components/home/contract/detail')
      },
      {
        path: 'charts',
        component: Charts
      },
      {
        path: 'vital-sign-schedule',
        component: () => import('../components/home/medical-instruction/VitalSignSchedule.vue')
      }
    ]
  },
  {
    path: '/history',
    component: History,
    children: [
      {
        path: '',
        component: HistoryPage
      },
      {
        path: 'contract-history',
        component: ContractHistory
      },
      {
        path: 'medical-instruction-history',
        component: MedicalInstructionHistory
      },
      {
        path: 'prescription-history',
        component: PrescriptionHistory
      },
      {
        path: 'appointment-history',
        component: AppointmentHistory
      }
    ]
  },
  {
    path: '/patient-detail-page',
    component: PatientDetailView,
    children: [
      {
        path: '',
        component: OverviewPatient
      },
      {
        path: 'overview',
        component: OverviewPatient
      },
      {
        path: 'timeline',
        component: TimelinePatient
      },
      {
        path: 'vital-sign-detail',
        component: VitalSignPatient
      },
      {
        path: 'health-record',
        component: HealthRecordPatient
      },
      {
        path: 'activity',
        component: ActivityPatient
      },
      {
        path: 'medical-schedule',
        component: MedicalSchedule
      },
      {
        path: 'new-medical-schedule',
        component: NewMedicalSchedule
      },
      {
        path: 'contract-history',
        component: () => import('../components/home/contract/detail')
      },
      {
        path: 'vital-sign-patient',
        component: VitalSign
      },
      {
        path: 'vital-sign-schedule',
        component: () => import('../components/home/medical-instruction/VitalSignSchedule.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
