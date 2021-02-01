import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import router from '../../router/index.js'

const contractRepository = RepositoryFactory.get('contractRepository')
const userRepository = RepositoryFactory.get('userRepository')

const state = () => ({
  contractRequests: [],
  requestDetail: {
    contractId: '', // Id hợp đồng
    fullNameDoctor: '', // Họ tên của bác sĩ
    phoneNumberDoctor: '', // Số điện thoại của bác sĩ
    workLocationDoctor: '', // Nơi làm việc của bác sĩ
    dobDoctor: '', // Ngày sinh của bác sĩ
    fullNamePatient: '', // Họ tên của bệnh nhân
    phoneNumberPatient: '', // Số điện thoại của bệnh nhân
    addressPatient: '', // Địa chỉ bệnh nhân
    dobPatient: '', // Ngày sinh của bệnh nhân
    contractCode: '', // Mã hợp đồng
    note: '', // Lý do muốn kí hợp đồng
    status: '', // Trạng thái của hợp đồng ACTIVE:  Đã kết nối, FINISHED: Bị huỷ bởi hệ thống, PENDING: Đang chờ bác sĩ xét duyệt, REJECTED: Bị bác sĩ từ chối
    dateCreated: '', // Ngày tạo ra hợp đồng
    dateStarted: '', // Ngày bắt đầu theo dõi
    dateFinished: '', // Ngày kết thúc theo dõi
    nameLicense: '', // Tên của gói
    daysOfTracking: '', // Số ngày theo dõi
    diseases: '', // Bệnh lý của bệnh nhân
    doctorId: '', // Id của bác sĩ
    patientId: '', // Id của bệnh nhân
    licenseId: '' // Id của gói bệnh nhân chọn
  },
  rejectDialogVisible: false,
  contractCode: '',
  cancelContractVisible: false,
  contract: {
    contractId: '',
    status: 'Finished',
    dateStarted: '',
    daysOfTracking: 0
  },
  patientDetail: {
    patientId: '',
    gender: '',
    email: '',
    career: ''
  }
})
const getters = {
}
const actions = {
  // Get all contract requests
  getContractRequestPending ({ commit }, payloadUser) {
    console.log(`payloadUser: ${payloadUser}`)
    contractRepository.getContractRequestPending(payloadUser[0]).then(response => {
      console.log(response.data)
      if (response.status === 200) {
        commit('success', response.data)
      } else {
        commit('failure')
      }
    })
  },

  // Get request detail by patientId when doctor click [0] is patientId, [1] is contractCode
  getRequestDetail ({ commit, dispatch }, payloadContractId) {
    console.log(`payloadPatientId: ${payloadContractId}`)
    contractRepository.getRequestDetail(payloadContractId).then(response => {
      console.log(response.data)
      if (response.status === 200) {
        commit('getRequestDetailSuccess', response.data)
        dispatch('getPatientDetail', response.data)
      } else {
        commit('failure')
      }
    })
  },
  // Get patient information
  getPatientDetail ({ commit }, payloadRequestDetail) {
    console.log('payloadRequestDetail')
    console.log(payloadRequestDetail)
    userRepository.getPatientProfileByPatientId(payloadRequestDetail.patientId).then(response => {
      console.log('getPatientDetail')
      if (response.status === 200) {
        console.log(response.data)
        commit('setPatientInfo', response.data)
      }
    })
  },
  // Reject contract manage
  rejectContract ({ commit }) {
    commit('rejectContract')
  },
  continueAssignContract ({ commit }) {
    commit('continueAssignContract')
  },
  confirmRejectContract ({ commit }) {
  // set state pending to rejected (database)
    commit('confirmRejectContract')
  },

  // Next to create Contract
  nextCreateContract ({ commit }, payload) {
    console.log(`nextCreateContract: ${payload}`)
    commit('nextCreateContract', payload)
    router.push('/confirm-contract')
  },

  // Cancel contract manage
  cancelContract ({ commit }) {
    commit('cancelContract')
  },
  rejectCancelContract ({ commit }) {
    commit('rejectCancelContract')
  },
  confirmCancelContract ({ commit }) {
    commit('confirmCancelContract')
  },
  // Confirm contract and insert db [0] is contract, [1] is value of disease type, [2] is value of note
  confirmContract ({ state }, payload) {
    console.log(payload)
    console.log(`state contract: ${state.contract}`)
    contractRepository.createContract(payload[0]).then(response => {
      console.log(response.data)
    })
  },
  // Go to request detail page when doctor click table row select
  goToRequestDetail (context, payload) {
    console.log(payload)
    router.push({ name: 'request-detail', params: { contractId: payload } })
  }
}
const mutations = {
  // Get all request contract success
  success (state, contractRequests) {
    console.log(contractRequests)
    state.contractRequests = contractRequests.map((contract) => {
      return {
        contractId: contract.contractId,
        contractCode: contract.contractCode,
        fullNamePatient: contract.fullNamePatient,
        note: contract.note,
        status: contract.status,
        daysOfTracking: contract.daysOfTracking,
        dateCreated: contract.dateCreated.split('T')[0].split('-').reverse().join('-')
      }
    })
  },
  getRequestDetailSuccess (state, payloadRequestDetail) {
    state.requestDetail.contractId = payloadRequestDetail.contractId
    state.requestDetail.fullNameDoctor = payloadRequestDetail.fullNameDoctor
    state.requestDetail.phoneNumberDoctor = payloadRequestDetail.phoneNumberDoctor
    state.requestDetail.workLocationDoctor = payloadRequestDetail.workLocationDoctor
    state.requestDetail.dobDoctor = payloadRequestDetail.dobDoctor.split('T')[0]
    state.requestDetail.fullNamePatient = payloadRequestDetail.fullNamePatient
    state.requestDetail.phoneNumberPatient = payloadRequestDetail.phoneNumberPatient
    state.requestDetail.addressPatient = payloadRequestDetail.addressPatient
    state.requestDetail.dobPatient = payloadRequestDetail.dobPatient.split('T')[0].split('-').reverse().join('-')
    state.requestDetail.contractCode = payloadRequestDetail.contractCode
    state.requestDetail.note = payloadRequestDetail.note
    state.requestDetail.status = payloadRequestDetail.status
    state.requestDetail.daysOfTracking = payloadRequestDetail.daysOfTracking
    state.requestDetail.dateCreated = payloadRequestDetail.dateCreated
    state.requestDetail.dateStarted = payloadRequestDetail.dateStarted
    state.requestDetail.dateFinished = payloadRequestDetail.dateFinished
    state.requestDetail.nameLicense = payloadRequestDetail.nameLicense
    state.requestDetail.diseases = payloadRequestDetail.diseases
    state.requestDetail.licenseId = payloadRequestDetail.licenseId
    state.requestDetail.doctorId = payloadRequestDetail.doctorId
    state.requestDetail.patientId = payloadRequestDetail.patientId
  },
  // Manage rejectContract
  rejectContract (state) {
    state.rejectDialogVisible = true
  },
  continueAssignContract (state) {
    state.rejectDialogVisible = false
  },
  confirmRejectContract (state) {
    state.rejectDialogVisible = false
    // Set status pending to rejected here
  },
  // Transfer data of request detail from request-detail to confirm-contract
  nextCreateContract (state, payload) {
    console.log(payload[0].contractId)
    console.log(payload[0].dateStarted)
    console.log(payload[0].contractId)
    console.log(payload[1])
    state.contract.contractId = payload[0].contractId
    state.contract.status = 'active'
    state.contract.dateStarted = payload[0].dateStarted.split('T')[0]
    state.contract.daysOfTracking = payload[1]
  },
  // Manage cancelContract
  cancelContract (state) {
    state.cancelContractVisible = true
  },
  rejectCancelContract (state) {
    state.cancelContractVisible = false
  },
  confirmCancelContract (state) {
    state.cancelContractVisible = false
  // Return list contract request here
  },
  setPatientInfo (state, payloadPatientInfo) {
    console.log('setPatientInfo')
    console.log(payloadPatientInfo)
    state.patientDetail.patientId = payloadPatientInfo.patientId
    state.patientDetail.gender = payloadPatientInfo.gender
    state.patientDetail.email = payloadPatientInfo.email
    state.patientDetail.career = payloadPatientInfo.career
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
