const state = () => ({
  visibleMedicalInstruction: false, // Modal khi bác sĩ bấm Y lệnh trong lối tắt
  visibleAddMedicineForm: false, // Modal khi bác sĩ thêm một thuốc mới vào đơn thuốc cho bệnh nhân
  visibleEditMedicine: false
})
const getters = {}
const actions = {
  openMedicalInstruction ({ commit, dispatch }) {
    commit('openMedicalInstruction')
    dispatch('patients/getPatientApproved', null, { root: true })
  },
  closeMedicalInstruction ({ commit, rootState }) {
    rootState.medicalInstruction.medicalInstructionStatus = false
    commit('closeMedicalInstruction')
  },
  openAddMedicine ({ commit }) {
    commit('openAddMedicine')
  },
  // Đóng modal thêm lịch uống thuốc của bệnh nhân
  closeAddMedicine ({ commit, rootState }) {
    commit('closeAddMedicine')
    rootState.suggestions.medicine = {}
  },
  openEditMedicine ({ commit }) {
    commit('openAddNewMedicine')
  },
  closeEditMedicine ({ commit }) {
    commit('closeAddNewMedicine')
  }
}
const mutations = {
  openMedicalInstruction (state) {
    state.visibleMedicalInstruction = true
  },
  closeMedicalInstruction (state) {
    state.visibleMedicalInstruction = false
  },
  openAddMedicine (state) {
    state.visibleAddMedicineForm = true
  },
  closeAddMedicine (state) {
    state.visibleAddMedicineForm = false
  },
  openEditMedicine (state) {
    state.visibleEditMedicine = true
  },
  closeEditMedicine (state) {
    state.visibleEditMedicine = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
