import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const appointmentRepository = RepositoryFactory.get('appointmentRepository')
const state = () => ({
  isFirstAppointmentFinished: false,
  isAppointmentActive: false
})
const getters = {}
const actions = {
  checkFirstAppointmentFinished ({ commit, rootState }) {
    appointmentRepository.checkFirstAppointment(rootState.medicalInstruction.patientSelected.healthRecordId).then(response => {
      commit('setIsFirstAppointmentFinished', true)
    }).catch(err => {
      console.log(err)
      commit('setIsFirstAppointmentFinished', false)
    })
  },
  checkAppointmentActive ({ commit, rootState }) {
    appointmentRepository.checkAppointmentActive(rootState.medicalInstruction.patientSelected.healthRecordId).then(response => {
      commit('setIsAppointmentActive', true)
    }).catch(err => {
      console.log(err)
      commit('setIsAppointmentActive', false)
    })
  }
}
const mutations = {
  setIsFirstAppointmentFinished (state, validate) {
    state.isFirstAppointmentFinished = validate
  },
  setIsAppointmentActive (state, validate) {
    state.isAppointmentActive = validate
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
