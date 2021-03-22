import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import router from '../../router'

const patientRepository = RepositoryFactory.get('patientRepository')

const state = () => ({
  approvedPatients: [],
  patientHealth: {},
  patientTracking: [],
  patientStatus: {
    'Bình thường': 3,
    'Bất thường': 2,
    'Nguy hiểm': 1
  },
  patientDetailUsing: {
    patientId: '',
    contractId: '',
    accountPatientId: 0,
    conditionHealing: {
      isConnectedBand: '', // Trạng thái kết nối của thiết bị
      medicalInstructionTypes: [] // Danh sách y lệnh được chia sẻ
    }
  },
  healthRecordUsing: {
    healthRecordId: ''
  },
  healthRecordOverview: {
    fullName: '',
    phoneNumber: '',
    address: '',
    career: '',
    dateOfBirth: '',
    gender: '',
    height: 0,
    weight: 0,
    personalMedicalHistory: '',
    familyMedicalHistory: ''
  }
})
const getters = {}
const actions = {
  getPatientApproved ({ commit, rootState }) {
    var doctorId = rootState.users.user.userId
    patientRepository.getPatientApproved(doctorId).then(response => {
      commit('setPatientApproved', response.data)
    }).catch(error => {
      console.log(error)
      commit('setPatientApprovedFailure')
    })
  },
  getPatientHealth ({ commit }) {
    const patientHealth = patientRepository.getPatientHealth()
    commit('getPatientHealth', patientHealth)
  },
  getPatientTracking ({ commit }) {
    const patientTracking = patientRepository.getPatientTracking()
    commit('getPatientTracking', patientTracking)
  },
  // Đi tới trang patient-detail
  goToPatientDetail ({ commit }, patientUsing) {
    router.push({ path: '/patient-detail-page' })
    commit('setHealthRecordUsing', patientUsing.healthRecordId)
    patientRepository.getHealingConditions(patientUsing.healthRecordId, patientUsing.contractId).then(response => {
      if (response.status === 200) {
        commit('setHealingCondition', response.data)
      }
    })
    commit('setPatientUsing', patientUsing)
  },
  // Lấy thông tin tổng quan của bệnh nhân từ database
  getOverviewPatient ({ commit, state }) {
    patientRepository.getOverviewPatient(state.healthRecordUsing.healthRecordId).then(response => {
      if (response.status === 200) {
        commit('setOverviewPatient', response.data)
      }
    })
  }
}
const mutations = {
  setPatientApprovedFailure (state) {
    state.approvedPatients = []
  },
  setPatientApproved (state, approvedPatients) {
    state.approvedPatients = approvedPatients
    console.log('patients - state - approvedPatients:::', state.approvedPatients)
  },
  getPatientHealth (state, patientHealth) {
    state.patientHealth = patientHealth
  },
  getPatientTracking (state, patientTracking) {
    state.patientTracking = patientTracking.sort((a, b) => state.patientStatus[a.status] - state.patientStatus[b.status])
  },
  setPatientUsing (state, patientUsing) {
    state.patientDetailUsing.patientId = patientUsing.patientId
    state.patientDetailUsing.contractId = patientUsing.contractId
    state.patientDetailUsing.accountPatientId = patientUsing.accountPatientId
  },
  setHealthRecordUsing (state, healthRecordId) {
    state.healthRecordUsing.healthRecordId = healthRecordId
  },
  setOverviewPatient (state, patientOverview) {
    state.healthRecordOverview.fullName = patientOverview.fullNamePatient
    state.healthRecordOverview.phoneNumber = patientOverview.phoneNumberPatient
    state.healthRecordOverview.address = patientOverview.addressPatient
    state.healthRecordOverview.career = patientOverview.career
    state.healthRecordOverview.dateOfBirth = patientOverview.dobPatient
    state.healthRecordOverview.gender = patientOverview.gender
    state.healthRecordOverview.height = patientOverview.height
    state.healthRecordOverview.weight = patientOverview.weight
    state.healthRecordOverview.personalMedicalHistory = patientOverview.personalMedicalHistory
    state.healthRecordOverview.familyMedicalHistory = patientOverview.familyMedicalHistory
  },
  setHealingCondition (state, condition) {
    state.patientDetailUsing.conditionHealing.isConnectedBand = condition.smartWatchConnected
    state.patientDetailUsing.conditionHealing.medicalInstructionTypes = condition.medicalInstructionTypes.map(mit => {
      return {
        medicalInstructionTypeName: mit.miType,
        medicalInstructions: mit.medicalInstructions.map(mi => {
          return {
            medicalInstructionId: mi.medicalInstructionId,
            image: `http://45.76.186.233:8000/api/v1/Images?pathImage=${mi.image}`
          }
        })
      }
    })
    console.log('patientDetailUsing:::', state.patientDetailUsing)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
