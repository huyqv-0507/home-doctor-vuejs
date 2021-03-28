const state = () => ({
  visibleMedicalInstruction: false, // Modal khi bác sĩ bấm Y lệnh trong lối tắt
  visibleAddMedicineForm: false, // Modal khi bác sĩ thêm một thuốc mới vào đơn thuốc cho bệnh nhân
  visibleEditMedicineForm: false, // Modal khi bác sĩ sửa thuốc
  isVisibleAppointmentPatients: false, // Modal danh sách bệnh nhân khi xét lịch tái khám
  isVisibleSelectMedicalInstruction: false, // Modal chọn bệnh nhân để xét lich tái khám
  isVisibleAddAppointmentForm: false // Modal xét lịch tái khám khi đã chọn bệnh nhân ở trang chủ
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
    commit('openEditMedicine')
  },
  closeEditMedicine ({ commit }) {
    commit('closeEditMedicine')
  },
  // Mở modal tạo cuộc hẹn cho bênh nhân
  openAppointmentPatientsModal ({ commit, rootState }) {
    rootState.appointments.isSelectPatient = false
    rootState.appointments.patientInfoForAppointment = {}
    commit('setOpenAppointmentPatientsModal')
  },
  closeAppointmentPatientsModal ({ commit }) {
    commit('setCloseAppointmentPatientsModal')
  },
  // Mở modal tạo cuộc hẹn cho bênh nhân
  openAddAppointmentForm ({ commit, rootState }) {
    rootState.appointments.isSelectPatient = false
    rootState.appointments.patientInfoForAppointment = {}
    commit('openAddAppointmentForm')
  },
  closeAddAppointmentForm ({ commit }) {
    commit('closeAddAppointmentForm')
  },
  openSelectMedicalInstructionModal ({ commit }) {
    commit('openSelectMedicalInstructionModal')
  },
  closeSelectMedicalInstructionModal ({ commit }) {
    commit('closeSelectMedicalInstructionModal')
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
    state.visibleEditMedicineForm = true
  },
  closeEditMedicine (state) {
    state.visibleEditMedicineForm = false
  },
  setOpenAppointmentPatientsModal (state) {
    state.isVisibleAppointmentPatients = true
  },
  setCloseAppointmentPatientsModal (state) {
    state.isVisibleAppointmentPatients = false
  },
  openAddAppointmentForm (state) {
    state.isVisibleAddAppointmentForm = true
    console.log('state.isVisibleAddAppointmentForm', state.isVisibleAddAppointmentForm)
  },
  closeAddAppointmentForm (state) {
    state.isVisibleAddAppointmentForm = false
  },
  openSelectMedicalInstructionModal (state) {
    state.isVisibleSelectMedicalInstruction = true
  },
  closeSelectMedicalInstructionModal (state) {
    state.isVisibleSelectMedicalInstruction = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
