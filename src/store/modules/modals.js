const state = () => ({
  visibleMedicalInstruction: false, // Modal khi bác sĩ bấm Y lệnh trong lối tắt
  visibleAddMedicineForm: false, // Modal khi bác sĩ thêm một thuốc mới vào đơn thuốc cho bệnh nhân
  visibleEditMedicineForm: false, // Modal khi bác sĩ sửa thuốc
  isVisibleAppointmentPatients: false, // Modal danh sách bệnh nhân khi xét lịch tái khám
  isVisibleSelectMedicalInstruction: false, // Modal chọn bệnh nhân để xét lich tái khám
  isVisibleSelectMedicalInstructionSub: false, // Modal chọn bệnh nhân để xét lich tái khám
  isVisibleAddAppointmentForm: false, // Modal xét lịch tái khám khi đã chọn bệnh nhân ở trang chủ
  isVisibleAddAppointmentFormPatientDetail: false, // Modal xét lịch tái khám khi đã chọn bệnh nhân ở patient-detail
  isAutoVitalSign: true,
  isVisibleAddVitalSign: false,
  isPrescriptionShow: false,
  isUpdateAppointmentShow: false,
  isChartView: false,
  isRequestMedicalInstruction: false,
  isRequestMedicalInstructionList: false,
  isFinishAppointmentShow: false,
  isViewImage: false,
  isAddMedicalInstructionForm: false,
  isShowImage: false,
  isShowAddMoreDiagnoseToPrescription: false,
  isOpenChoosingVitalSignType: false,
  isViewHeartRateShare: false
})
const getters = {}
const actions = {
  openViewHeartRateShare ({ commit }) {
    commit('setViewHeartRateShare', true)
  },
  closeViewHeartRateShare ({ commit }) {
    commit('setViewHeartRateShare', false)
  },
  openChoosingVitalSignType ({ commit }) {
    commit('setOpenChoosingVitalSignType', true)
  },
  closeChoosingVitalSignType ({ commit }) {
    commit('setOpenChoosingVitalSignType', false)
  },
  openShowAddMoreDiagnoseToPrescription ({ commit, rootState }) {
    rootState.prescription.defaultDiagnose = ''
    console.log('rootState.prescription', rootState.prescription)
    commit('openShowAddMoreDiagnoseToPrescription')
  },
  closeShowAddMoreDiagnoseToPrescription ({ commit }) {
    commit('closeShowAddMoreDiagnoseToPrescription')
  },
  openShowImage ({ commit }, medicalInstructionId) {
    console.log(medicalInstructionId)
    commit('openShowImage')
  },
  closeShowImage ({ commit }) {
    commit('closeShowImage')
  },
  openAddMedicalInstructionForm ({ commit }) {
    commit('openAddMedicalInstructionForm')
  },
  closeAddMedicalInstructionForm ({ commit }) {
    commit('closeAddMedicalInstructionForm')
  },
  openViewImage ({ commit }) {
    commit('openViewImage')
  },
  closeViewImage ({ commit }) {
    commit('closeViewImage')
  },
  openFinishAppointmentShow ({ commit }) {
    commit('openFinishAppointmentShow')
  },
  closeFinishAppointmentShow ({ commit }) {
    commit('closeFinishAppointmentShow')
  },
  openRequestMedicalInstructionList ({ commit, rootState }) {
    rootState.image.isAddMedicalInstruction = true
    commit('openRequestMedicalInstructionList')
  },
  closeRequestMedicalInstructionList ({ commit, rootState }) {
    rootState.image.isAddMedicalInstruction = false
    commit('closeRequestMedicalInstructionList')
  },
  openRequestMedicalInstruction ({ commit }) {
    commit('openRequestMedicalInstruction')
  },
  closeRequestMedicalInstruction ({ commit }) {
    commit('closeRequestMedicalInstruction')
  },
  openChartView ({ commit }) {
    commit('openChartView')
  },
  closeChartView ({ commit }) {
    commit('closeChartView')
  },
  openUpdateAppointmentShow ({ commit }) {
    commit('openUpdateAppointmentShow')
  },
  closeUpdateAppointmentShow ({ commit }) {
    commit('closeUpdateAppointmentShow')
  },
  openPrescriptionShow ({ commit }) {
    commit('openPrescriptionShow')
  },
  closePrescriptionShow ({ commit }) {
    commit('closePrescriptionShow')
  },
  openVitalSignShow ({ commit }) {
    commit('openVitalSignShow')
  },
  closeVitalSignShow ({ commit }) {
    commit('closeVitalSignShow')
  },
  async openMedicalInstruction ({ commit, dispatch }) {
    commit('openMedicalInstruction')
    await dispatch('patients/getPatientApproved', null, { root: true })
    await dispatch('medicalInstruction/backToSelectPatient', null, { root: true })
  },
  closeMedicalInstruction ({ commit, rootState }) {
    rootState.medicalInstruction.medicalInstructionStatus = false
    commit('closeMedicalInstruction')
  },
  openAddMedicine ({ commit, rootState }) {
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
  openAddAppointmentFormPatientDetail ({ commit, rootState }) {
    rootState.appointments.patientInfoForAppointment = {}
    commit('openAddAppointmentFormPatientDetail')
  },
  closeAddAppointmentForm ({ commit }) {
    commit('closeAddAppointmentForm')
  },
  closeAddAppointmentFormPatientDetail ({ commit }) {
    commit('closeAddAppointmentFormPatientDetail')
  },
  openSelectMedicalInstructionModal ({ commit }) {
    commit('openSelectMedicalInstructionModal')
  },
  closeSelectMedicalInstructionModal ({ commit }) {
    commit('closeSelectMedicalInstructionModal')
  },
  openSelectMedicalInstructionModalSub ({ commit }) {
    commit('openSelectMedicalInstructionModalSub')
  },
  closeSelectMedicalInstructionModalSub ({ commit }) {
    commit('closeSelectMedicalInstructionModalSub')
  },
  openAddNewVitalSign ({ commit }) {
    commit('openAddNewVitalSign')
  },
  closeAddNewVitalSign ({ commit }) {
    commit('closeAddNewVitalSign')
  },
  autoVitalSign ({ commit }) {
    commit('setAutoVitalSign')
  },
  unAutoVitalSign ({ commit }) {
    commit('setUnAutoVitalSign')
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  setOpenChoosingVitalSignType (state, isOpen) {
    state.isOpenChoosingVitalSignType = isOpen
  },
  openShowAddMoreDiagnoseToPrescription (state) {
    state.isShowAddMoreDiagnoseToPrescription = true
  }, // mở modal thêm 1 chuẩn đoán khác vào đơn thuốc
  closeShowAddMoreDiagnoseToPrescription (state) {
    state.isShowAddMoreDiagnoseToPrescription = false
  }, // mở modal thêm 1 chuẩn đoán khác vào đơn thuốc
  openShowImage (state) {
    state.isShowImage = true
  },
  closeShowImage (state) {
    state.isShowImage = false
  },
  openAddMedicalInstructionForm (state) {
    state.isAddMedicalInstructionForm = true
  },
  closeAddMedicalInstructionForm (state) {
    state.isAddMedicalInstructionForm = false
  },
  openViewImage (state) {
    state.isViewImage = true
  },
  closeViewImage (state) {
    state.isViewImage = false
  },
  openFinishAppointmentShow (state) {
    state.isFinishAppointmentShow = true
  },
  closeFinishAppointmentShow (state) {
    state.isFinishAppointmentShow = false
  },
  openRequestMedicalInstructionList (state) {
    state.isRequestMedicalInstructionList = true
  },
  closeRequestMedicalInstructionList (state) {
    state.isRequestMedicalInstructionList = false
  },
  openRequestMedicalInstruction (state) {
    state.isRequestMedicalInstruction = true
  },
  closeRequestMedicalInstruction (state) {
    state.isRequestMedicalInstruction = false
  },
  openChartView (state) {
    state.isChartView = true
  },
  closeChartView (state) {
    state.isChartView = false
  },
  openUpdateAppointmentShow (state) {
    state.isUpdateAppointmentShow = true
  },
  closeUpdateAppointmentShow (state) {
    state.isUpdateAppointmentShow = false
  },
  openPrescriptionShow (state) {
    state.isPrescriptionShow = true
  },
  closePrescriptionShow (state) {
    state.isPrescriptionShow = false
  },
  openVitalSignShow (state) {
    state.isVitalSignShow = true
  },
  closeVitalSignShow (state) {
    state.isVitalSignShow = false
  },
  openMedicalInstruction (state) {
    state.visibleMedicalInstruction = true
  },
  closeMedicalInstruction (state) {
    state.visibleMedicalInstruction = false
  },
  openAddMedicine (state) {
    console.log('openAddMedicine')
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
  },
  openAddAppointmentFormPatientDetail (state) {
    state.isVisibleAddAppointmentFormPatientDetail = true
  },
  closeAddAppointmentForm (state) {
    state.isVisibleAddAppointmentForm = false
  },
  closeAddAppointmentFormPatientDetail (state) {
    state.isVisibleAddAppointmentFormPatientDetail = false
  },
  openSelectMedicalInstructionModal (state) {
    state.isVisibleSelectMedicalInstruction = true
  },
  closeSelectMedicalInstructionModal (state) {
    state.isVisibleSelectMedicalInstruction = false
  },
  openSelectMedicalInstructionModalSub (state) {
    state.isVisibleSelectMedicalInstructionSub = true
  },
  closeSelectMedicalInstructionModalSub (state) {
    state.isVisibleSelectMedicalInstructionSub = false
  },
  openAddNewVitalSign (state) {
    state.isVisibleAddVitalSign = true
    state.isAutoVitalSign = true
  },
  closeAddNewVitalSign (state) {
    state.isVisibleAddVitalSign = false
  },
  setAutoVitalSign (state) {
    state.isAutoVitalSign = true
  },
  setUnAutoVitalSign (state) {
    state.isAutoVitalSign = false
  },
  clearState (state) {
    state = () => ({})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
