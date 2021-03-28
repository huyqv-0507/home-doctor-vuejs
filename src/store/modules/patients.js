import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import router from '../../router'

const patientRepository = RepositoryFactory.get('patientRepository')

const state = () => ({
  approvedPatients: [], // Danh sách bệnh nhân đang theo dõi
  patientHealth: {}, // Sức khoẻ cá nhân của từng bệnh nhân. Show ở trang chủ
  patientStatus: {
    'Bình thường': 3,
    'Bất thường': 2,
    'Nguy hiểm': 1
  }, // mức độ nguy hiểm của bệnh nhân
  patientDetailUsing: {
    patientId: '',
    contractId: '',
    accountPatientId: 0,
    conditionHealing: {
      isConnectedBand: '', // Trạng thái kết nối của thiết bị
      medicalInstructionTypes: [] // Danh sách y lệnh được chia sẻ
    }
  }, // THông tin bệnh nhân khi chọn ở trang chủ
  healthRecordUsing: {
    healthRecordId: ''
  }, // Thông tin health record của bệnh nhân được chon ở trang chủ
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
  } // Thông tin cá nhân bệnh nhân ở trang tổng quan
})
const getters = {
  getPatientApproveByContract: (state) => (contractId) => {
    return state.approvedPatients.find(patient => patient.contractId === contractId)
  }
}
const actions = {
  // Lấy trạng thái vital sign của bệnh nhân
  getVitalSignOverviews ({ commit, rootState }) {},
  // Lấy danh sách bệnh nhân đang được theo dõi
  getPatientApproved ({ commit, rootState, rootGetters }) {
    var doctorId = rootState.users.user.userId
    patientRepository.getPatientApproved(doctorId).then(response => {
      var data = response.data
      commit('setPatientApproved', { data, rootGetters })
    }).catch(error => {
      console.log(error)
      commit('setPatientApprovedFailure')
    })
  },
  getPatientHealth ({ commit }) {
    const patientHealth = patientRepository.getPatientHealth()
    commit('getPatientHealth', patientHealth)
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
  setPatientApproved (state, { data, rootGetters }) {
    // var patientVitalSign = {}
    state.approvedPatients = data.map(patient => {
      // patientVitalSign = rootGetters['vitalSign/findStatusOfPatient'](patient.patientId)
      return {
        accountPatientId: patient.accountPatientId,
        contractId: patient.contractId,
        diseaseContract: patient.diseaseContract,
        healthRecordId: patient.healthRecordId,
        patientId: patient.patientId,
        patientName: patient.patientName,
        isSchedulePrescription: patient.prescriptionFirst,
        isScheduleAppointment: patient.appointmentFirst,
        dateAppointment: patient.appointmentLast === null ? null : patient.appointmentLast.split('T')[0].split('-').reverse().join('/'),
        hourAppointment: patient.appointmentLast === null ? null : patient.appointmentLast.split('T')[1].split(':')[0],
        minuteAppointment: patient.appointmentLast === null ? null : patient.appointmentLast.split('T')[1].split(':')[1],
        // status: patientVitalSign.status,
        status: patient.personalStatus === 'NORMAL' ? 'Bình thường' : 'Nguy hiểm'
      }
    }).sort((a, b) => state.patientStatus[a.status] - state.patientStatus[b.status])
    console.log('patients - state - approvedPatients:::', state.approvedPatients)
  },
  getPatientHealth (state, patientHealth) {
    state.patientHealth = patientHealth
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
