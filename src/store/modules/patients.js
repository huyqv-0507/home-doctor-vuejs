import { RepositoryFactory } from '../../repositories/RepositoryFactory'

const patientRepository = RepositoryFactory.get('patientRepository')

const state = () => ({
  approvedPatients: [],
  patientHealth: {},
  patientTracking: [],
  patientStatus: {
    'Bình thường': 3,
    'Bất thường': 2,
    'Nguy hiểm': 1
  }
})
const getters = {}
const actions = {
  getPatientApproved ({ commit, rootState }) {
    var doctorId = rootState.users.user.userId
    console.log('root: ', rootState.users.user.userId)
    patientRepository.getPatientApproved(doctorId).then(response => {
      commit('setPatientApproved', response.data)
    }).catch(error => { console.log(error) })
  },
  getPatientHealth ({ commit }) {
    const patientHealth = patientRepository.getPatientHealth()
    commit('getPatientHealth', patientHealth)
  },
  getPatientTracking ({ commit }) {
    const patientTracking = patientRepository.getPatientTracking()
    commit('getPatientTracking', patientTracking)
  }
}
const mutations = {
  setPatientApproved (state, approvedPatients) {
    state.approvedPatients = approvedPatients
  },
  getPatientHealth (state, patientHealth) {
    state.patientHealth = patientHealth
  },
  getPatientTracking (state, patientTracking) {
    state.patientTracking = patientTracking.sort((a, b) => state.patientStatus[a.status] - state.patientStatus[b.status])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
