const state = () => ({
  prescriptionDiagnoses: [],
  defaultDiagnose: ''
})
const getters = {}
const actions = {
  addNewDiagnoseToPrescription ({ commit }, diagnose) {
    commit('addNewDiagnoseToPrescription', diagnose)
  },
  removeDiagnoseFromPrescription ({ commit }, index) {
    commit('removeDiagnoseFromPrescription', index)
  },
  setDiagnosePrescriptionEmpty ({ commit }) {
    commit('setDiagnosePrescriptionEmpty')
  }
}
const mutations = {
  addNewDiagnoseToPrescription (state, diagnose) {
    state.prescriptionDiagnoses.push({ diagnose: diagnose.description })
  },
  removeDiagnoseFromPrescription (state, index) {
    state.prescriptionDiagnoses.splice(index, 1)
  },
  setDiagnosePrescriptionEmpty (state) {
    state.prescriptionDiagnoses = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
