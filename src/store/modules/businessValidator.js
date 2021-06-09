import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const appointmentRepository = RepositoryFactory.get('appointmentRepository')
const state = () => ({
  isFirstAppointmentFinished: false,
  isAppointmentActive: false,
  isAppointmentCurrent: false
})
const getters = {}
const actions = {
  checkAppointmentCurrent ({ commit, rootState, dispatch }) {
    dispatch('time/getTimeSystem', null, { root: true }).then(() => {
      if (rootState.patients.patientOverview.appointmentNext === null) {
        commit('setAppointmentCurrent', null)
      } else {
        const now = new Date(rootState.time.timeNow.split('T')[0])
        const appointment = new Date(rootState.patients.patientOverview.appointmentNext.dateExamination.split('T')[0])
        console.log('now', now)
        console.log('appointment', appointment)
        commit('setAppointmentCurrent', appointment <= now)
      }
    })
  },
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
  setAppointmentCurrent (state, validate) {
    state.isAppointmentCurrent = validate
  },
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
