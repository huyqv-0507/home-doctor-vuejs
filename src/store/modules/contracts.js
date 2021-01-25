import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import router from '../../router/index.js'

const contractRepository = RepositoryFactory.get('contractRepository')
const state = () => ({
  contractRequests: [],
  requestDetail: {},
  rejectDialogVisible: false,
  contractCode: '',
  cancelContractVisible: false,
  contract: {
    contractCode: '',
    doctorId: '',
    doctorFullName: '',
    workLocation: '',
    dobDoctor: null,
    experienceYear: 0,
    addressOfDoctor: '',
    patientId: '',
    patientName: '',
    genderOfPatient: '',
    addressOfPatient: '',
    career: '',
    dobPatient: null,
    dateOfExamination: null,
    dateStarted: null,
    dateFinished: null,
    relativeName: '',
    relativePhoneNumber: '',
    diseaseType: '',
    note: ''
  }
})
const getters = {
}
const actions = {
  // Get all contract requests
  getContractRequests ({ commit }) {
    contractRepository.getContractRequests().then(response => {
      if (response.status === 200) {
        commit('success', response.data)
      } else {
        commit('failure')
      }
    })
  },

  // Get request detail by patientId when doctor click [0] is patientId, [1] is contractCode
  getRequestDetail ({ commit }, payload) {
    contractRepository.getRequestDetail(payload[0]).then(response => {
      if (response.status === 200) {
        commit('getRequestDetailSuccess', [response.data, payload[1]])
      } else {
        commit('failure')
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
  confirmContract ({ commit, state }, payloadContract) {
    state.contract.diseaseType = payloadContract[1]
    state.contract.note = payloadContract[2]
    contractRepository.createContract(state.contract)
  }
}
const mutations = {
  // Get all request contract success
  success (state, contractRequests) {
    state.contractRequests = contractRequests
  },
  getRequestDetailSuccess (state, payload) {
    state.requestDetail = payload[0][0]
    state.contractCode = payload[1]
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
    console.log(payload[0])
    console.log(payload[1])
    state.contract.contractCode = state.contractCode
    state.contract.doctorId = payload[1].id
    state.contract.doctorFullName = payload[1].fullName
    state.contract.workLocation = payload[1].workLocation
    state.contract.dobDoctor = payload[1].dateOfBirth
    state.contract.experienceYear = payload[1].experienceYear
    state.contract.addressOfDoctor = payload[1].address
    state.contract.patientId = payload[0].patientId
    state.contract.patientName = payload[0].fullName
    state.contract.genderOfPatient = payload[0].gender
    state.contract.addressOfPatient = payload[0].address
    state.contract.career = payload[0].career
    state.contract.dobPatient = payload[0].dateOfBirth
    state.contract.dateOfExamination = payload[0].dateOfExamination
    state.contract.dateStarted = payload[0].dateStarted
    state.contract.dateFinished = payload[0].dateFinished
    state.contract.relativeName = payload[0].relativeName
    state.contract.relativePhoneNumber = payload[0].relativePhoneNumber
    console.log(state.contract)
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
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
