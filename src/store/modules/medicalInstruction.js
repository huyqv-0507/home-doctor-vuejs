import router from '../../router/index'
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Notification } from 'element-ui'

const medicalInstructionRepository = RepositoryFactory.get('medicalInstructionRepository')

const state = () => ({
  medicalInstructionStatus: false, // Trạng thái của modal Y lệnh. Xác định trang được hiển thị (Chọn bệnh nhân/ Chọn chức năng cho y lệnh)
  medicalInstructionHistory: [],
  patientSelected: {}, // Bệnh nhân được chọn để cho Y lệnh
  prescriptionDetails: null,
  prescriptionDetail: {},
  visibleSelectMedicine: false,
  medicineEdit: {},
  medicalInstructionDetail: {
    medicalInstructionType: '',
    image: '',
    description: '',
    diagnose: '',
    placeHealthRecord: '',
    dateStarted: '',
    dateFinished: ''
  },
  prescriptionDetailHistory: { // Lịch sử 1 đơn thuốc
    medicalInstructionId: '',
    medicalInstructionType: '',
    description: '',
    diagnose: '',
    placeHealthRecord: '',
    dateStarted: '',
    dateFinished: '',
    patientName: '',
    medicationSchedules: []
  },
  prescriptionExistedStatus: false,
  prescriptionExisted: {},
  maxDatePrescription: {
    dateStarted: '',
    dateFinished: '',
    dateCanceled: ''
  },
  medicalInstructionHistories: [], // Danh sách lịch sử đơn thuốc
  medicalInstructionOfNewHealthRecord: []
})
const getters = {}
const actions = {
  // Đi đến trang xét lịch uống thuốc cho bệnh nhân
  setMedicalSchedule ({ dispatch }) {
    dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
    dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
    router.push('medical-schedule').catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        throw error
      }
    })
  },
  // Đi đến trang đo sinh hiệu cho bệnh nhân
  setVitalSign ({ dispatch }) {
    dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
    dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
    router.push('vital-sign').catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        throw error
      }
    })
  },
  // Sang trang chọn chức năng cho Y lệnh
  nextMedicalInstruction ({ commit }) {
    commit('nextMedicalInstruction')
  },
  // Trở về trang chọn bệnh nhân
  backToSelectPatient ({ commit }) {
    commit('backToSelectPatient')
  },
  // Chọn bệnh nhân
  selectPatient ({ commit, dispatch }, payloadPatient) {
    commit('setPatientSelected', payloadPatient)
    dispatch('nextMedicalInstruction')
  },
  // Thêm thuốc vào đơn thuốc
  addMedicineToPrescription ({ commit, dispatch }, prescription) {
    console.log('Form add new prescription: ', prescription)
    commit('addMedicineToPrescription', prescription)
    dispatch('modals/closeAddMedicine', null, { root: true })
  },
  // Thêm đơn thuốc vào database
  createMedicalSchedule () {

  },
  // Insert đơn thuốc xuống db
  savePrescription ({ dispatch, state, rootState, commit }, data) {
    var medicalInstructionSchedule = {
      healthRecordId: state.patientSelected.healthRecordId,
      doctorAccountId: parseInt(rootState.users.user.accountId),
      diagnose: data.diagnose,
      dateStart: data.dateStarted,
      dateFinish: data.dateFinished,
      description: data.description,
      contractId: data.contractId,
      medicationScheduleCreates: state.prescriptionDetails.map(p => {
        return {
          medicationName: p.medicineName,
          content: p.content,
          unit: p.unit,
          useTime: p.useTime,
          morning: parseInt(p.morning),
          noon: parseInt(p.noon),
          afterNoon: parseInt(p.afternoon),
          night: parseInt(p.night)
        }
      })
    }
    console.log('medicalInstructionSchedule', medicalInstructionSchedule)
    medicalInstructionRepository.createMedicalSchedule(medicalInstructionSchedule).then(response => {
      if (response.status === 201) {
        Notification.success({ title: 'Thông báo', message: 'Tạo đơn thuốc thành công!', duration: 6000 })
        commit('setPrescriptionExistedNew')
        dispatch('medicalInstruction/getMedicalScheduleHistory', null, { root: true })
        router.go(-1)
      }
    }).catch(error => {
      console.log(error)
      Notification.error({ title: 'Thông báo', message: 'Tạo đơn thuốc không thành công!', duration: 6000 })
    })
    // commit('savePrescription', medicalInstructionSchedule)
  },
  // Sử dụng đơn thuốc cũ
  usePrescription ({ commit }, prescriptionId) {

  },
  // Lịch sử thuốc đã dùng
  getMedicalScheduleHistory ({ commit, rootState, state, dispatch }) {
    medicalInstructionRepository.getMedicalScheduleHistory({ patientId: rootState.medicalInstruction.patientSelected.patientId, healthRecordId: state.patientSelected.healthRecordId }).then(response => {
      if (response.status === 200) {
        commit('setMedicalScheduleHistory', response.data)
        dispatch('setMaxDatePrescription')
      }
    }).catch((error) => {
      console.log(error)
      commit('getMedicalScheduleHistoryFailure')
    })
  },
  // Thêm mới thuốc
  openAddNewMedicine ({ commit }) {
    commit('setPrescriptionExistedNew')
    router.push('new-medical-schedule')
  },
  backToMedicalSchedule () {
    router.go(-1)
  },
  // Dùng lại đơn thuốc cũ
  reusePrescription ({ commit }, prescription) {
    console.log('Sử dụng lại đơn thuốc:::', prescription)
    commit('setPrescriptionExistedReuse', prescription)
    router.push('reuse-medical-schedule')
  },
  // Sửa medicine
  editMedicine ({ commit }, medicine) {
    commit('editMedicine', medicine)
  },
  // Lấy thông tin đơn thuốc được chọn
  getPrescriptionDetailHistory ({ commit }, medicalInstructionId) {
    medicalInstructionRepository.getPrescriptionDetailHistory(medicalInstructionId).then(response => {
      if (response.status === 200) {
        commit('setPrescriptionDetailHistory', response.data)
      }
    })
    router.push('/history/prescription-history').catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        throw error
      }
    })
  },
  setMaxDatePrescription ({ commit }) {
    commit('setMaxDatePrescription')
  },
  // Lấy thông tin y lệnh
  getMedicalInstructionHistory ({ commit }, medicalInstructionId) {
    medicalInstructionRepository.getMedicalInstructionHistory(medicalInstructionId).then(response => {
      if (response.status === 200) {
        commit('setMedicalScheduleHistory', response.data)
      }
    })
    router.push('/history/medical-instruction-history').catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        throw error
      }
    })
  },
  addMedicineEditToPrescription ({ commit, dispatch }, prescription) {
    console.log('add medicine')
    commit('addMedicineEditToPrescription', prescription)
    dispatch('modals/closeEditMedicine', null, { root: true })
  },
  // Filter medicalInstructionSchedule
  setMedicalInstructionHistory ({ commit }, medicalInstructions) {
    commit('setMedicalInstructionsFilter', medicalInstructions)
  },
  // Huỷ đơn thuốc
  cancelPrescription ({ commit, dispatch }, payloadCancel) {
    medicalInstructionRepository.cancelPrescription(payloadCancel.medicalInstructionId, payloadCancel.reasonCancel).then(response => {
      console.log(response.body)
      if (response.status === 200) {
        commit('setCancelPrescription', payloadCancel.medicalInstructionId)
        dispatch('getMedicalInstructionHistory')
      }
    })
  },
  // Chọn nhữn phiếu Y lệnh cần lưu
  saveMedicalInstruction ({ commit, rootState }, medicalInstructions) {
    var medicalInstructionForSave = []
    if (medicalInstructions.length === 0) {
      rootState.contracts.requestDetail.medicalInstructionTypes.forEach(
        element => {
          element.medicalInstructions.forEach(m => {
            medicalInstructionForSave.push(m.medicalInstructionId)
          })
        }
      )
    } else {
      medicalInstructionForSave = medicalInstructions
    }
    commit('setMedicalInstructionOfNewHealthRecord', medicalInstructionForSave)
  }
}
const mutations = {
  setPrescriptionExistedNew (state) {
    state.prescriptionExisted = {}
    state.prescriptionDetails = []
    state.prescriptionExistedStatus = false
  },
  setPrescriptionExistedReuse (state, prescription) {
    state.prescriptionExisted = prescription
    state.prescriptionDetails = prescription.medicationSchedules.map(ms => {
      return {
        medicineName: ms.medicationName,
        content: ms.content,
        morning: ms.morning,
        noon: ms.noon,
        afternoon: ms.afternoon,
        night: ms.night,
        useTime: ms.useTime,
        usage: `Sử dụng: sáng ${parseInt(ms.morning)} ${ms.unit}, trưa ${parseInt(ms.noon)} ${ms.unit}, chiều ${parseInt(ms.afternoon)} ${ms.unit}, tối ${parseInt(ms.night)} ${ms.unit}; ${ms.useTime}`,
        totalNumber: ms.totalNumber,
        unit: ms.unit
      }
    })
    state.prescriptionExistedStatus = true
    console.log(state.prescriptionExisted)
    console.log('prescriptionDetails', state.prescriptionDetails)
  },
  nextMedicalInstruction (state) {
    state.medicalInstructionStatus = true // Kích hoạt trạng thái của modal chọn chức năng y lệnh
  },
  backToSelectPatient (state) {
    state.medicalInstructionStatus = false // Tắt trạng thái modal chức năng chọn y lệnh. Chuyển qua modal xem danh sách bệnh nhân đang theo dõi
    state.patientSelected = null // Xoá bệnh nhân đã đc chọn
  },
  setPatientSelected (state, payloadPatient) {
    console.log('setPatientSelected>>>', payloadPatient)
    state.patientSelected = {
      accountPatientId: payloadPatient.accountPatientId,
      contractId: payloadPatient.contractId,
      dateAppointment: payloadPatient.dateAppointment,
      diseaseContract: payloadPatient.diseaseContract.map(disease => {
        return {
          diseaseId: disease.diseaseId,
          diseaseName: disease.diseaseName
        }
      }),
      healthRecordId: payloadPatient.healthRecordId,
      patientId: payloadPatient.patientId,
      patientName: payloadPatient.patientName,
      status: payloadPatient.status
    }
    console.log('patientSelected: ', state.patientSelected)
  },
  // Thêm 1 thuốc vào danh sách thuốc
  addMedicineToPrescription (state, prescription) {
    console.log('prescription', prescription)
    var medicineName = prescription.medicineName
    var content = prescription.content
    var morning = 0
    var noon = 0
    var afternoon = 0
    var night = 0
    if (prescription.newMedicineForm.unitMorning === '') {
      morning = 0
    } else {
      morning = prescription.newMedicineForm.unitMorning
    }
    if (prescription.newMedicineForm.unitNoon === '') {
      noon = 0
    } else {
      noon = prescription.newMedicineForm.unitNoon
    }
    if (prescription.newMedicineForm.unitAfternoon === '') {
      afternoon = 0
    } else {
      afternoon = prescription.newMedicineForm.unitAfternoon
    }
    if (prescription.newMedicineForm.unitNight === '') {
      night = 0
    } else {
      night = prescription.newMedicineForm.unitNight
    }
    var useTime = ''
    if (prescription.newMedicineForm.useTimeOpt === '') {
      useTime = `Trước bữa ăn; ${prescription.newMedicineForm.noteMore}`
    } else {
      useTime = `${prescription.newMedicineForm.useTimeOpt}; ${prescription.newMedicineForm.noteMore}`
    }
    var unit = prescription.unit
    var usage = `Sử dụng: sáng ${parseInt(morning)} ${unit}, trưa ${parseInt(noon)} ${unit}, chiều ${parseInt(afternoon)} ${unit}, tối ${parseInt(night)} ${unit}; ${useTime}`
    var totalNumber = parseInt(morning) + parseInt(noon) + parseInt(afternoon) + parseInt(night)
    var medicineUsage = { medicineName: medicineName, content: content, morning: morning, noon: noon, afternoon: afternoon, night: night, useTime: useTime, usage: usage, totalNumber: totalNumber, unit: unit }
    state.prescriptionDetails.push(medicineUsage)
  },
  getMedicalScheduleHistoryFailure (state) {
    state.medicalInstructionHistory = []
  },
  setMedicalScheduleHistory (state, medicalInstructionHistory) {
    var tmpMedicalInstructionHistory = medicalInstructionHistory.map(mih => {
      return {
        medicalInstructionId: mih.medicalInstructionId,
        diagnose: mih.diagnose,
        description: mih.description,
        dateStarted: mih.prescriptionRespone.dateStarted.split('T')[0].split('-').reverse().join('/'),
        dateFinished: mih.prescriptionRespone.dateFinished.split('T')[0].split('-').reverse().join('/'),
        dateCanceled: mih.prescriptionRespone.dateCanceled !== null ? mih.prescriptionRespone.dateCanceled.split('T')[0].split('-').reverse().join('/') : null, // mih.medicationsRespone.dateCanceled.split('T')[0].split('-').reverse().join('/'),
        placeHealthRecord: mih.placeHealthRecord,
        status: mih.prescriptionRespone.status,
        isCanceled: mih.prescriptionRespone.status === 'CANCEL',
        isActive: mih.prescriptionRespone.status === 'ACTIVE',
        isFinish: mih.prescriptionRespone.status === 'FINISH',
        reasonCancel: mih.prescriptionRespone.reasonCancel,
        medicationSchedules: mih.prescriptionRespone.medicationSchedules.map(ms => {
          return {
            medicationName: ms.medicationName,
            content: ms.content,
            useTime: ms.useTime,
            unit: ms.unit,
            morning: ms.morning,
            noon: ms.noon,
            afternoon: ms.afterNoon,
            night: ms.night,
            totalNumber: parseInt(ms.morning) + parseInt(ms.noon) + parseInt(ms.afterNoon) + parseInt(ms.night)
          }
        })
      }
    })
    state.medicalInstructionHistory = tmpMedicalInstructionHistory
    state.medicalInstructionHistories = tmpMedicalInstructionHistory
    console.log('medicalInstructionHistory: ', state.medicalInstructionHistory)
  },
  setMedicalInstructionsFilter (state, medicalInstructions) {
    state.medicalInstructionHistory = medicalInstructions
  },
  addMedicineEditToPrescription (state, prescription) {
    console.log(state.prescriptionDetails[state.medicineEdit.index])
    console.log(state.prescriptionDetails)
    var medicineName = prescription.medicineName
    var content = prescription.content
    var morning = 0
    var noon = 0
    var afternoon = 0
    var night = 0
    if (prescription.newMedicineForm.unitMorning === '') {
      morning = 0
    } else {
      morning = prescription.newMedicineForm.unitMorning
    }
    if (prescription.newMedicineForm.unitNoon === '') {
      noon = 0
    } else {
      noon = prescription.newMedicineForm.unitNoon
    }
    if (prescription.newMedicineForm.unitAfternoon === '') {
      afternoon = 0
    } else {
      afternoon = prescription.newMedicineForm.unitAfternoon
    }
    if (prescription.newMedicineForm.unitNight === '') {
      night = 0
    } else {
      night = prescription.newMedicineForm.unitNight
    }
    var useTime = ''
    if (prescription.newMedicineForm.useTimeOpt === '') {
      useTime = `Trước bữa ăn; ${prescription.newMedicineForm.noteMore}`
    } else {
      useTime = `${prescription.newMedicineForm.useTimeOpt}; ${prescription.newMedicineForm.noteMore}`
    }
    var unit = prescription.unit
    var usage = `Sử dụng: sáng ${parseInt(morning)} ${unit}, trưa ${parseInt(noon)} ${unit}, chiều ${parseInt(afternoon)} ${unit}, tối ${parseInt(night)} ${unit}; ${useTime}`
    var totalNumber = parseInt(morning) + parseInt(noon) + parseInt(afternoon) + parseInt(night)
    state.prescriptionDetails[state.medicineEdit.index].medicineName = medicineName
    state.prescriptionDetails[state.medicineEdit.index].content = content
    state.prescriptionDetails[state.medicineEdit.index].morning = morning
    state.prescriptionDetails[state.medicineEdit.index].noon = noon
    state.prescriptionDetails[state.medicineEdit.index].afternoon = afternoon
    state.prescriptionDetails[state.medicineEdit.index].night = night
    state.prescriptionDetails[state.medicineEdit.index].useTime = useTime
    state.prescriptionDetails[state.medicineEdit.index].usage = usage
    state.prescriptionDetails[state.medicineEdit.index].totalNumber = totalNumber
    state.prescriptionDetails[state.medicineEdit.index].unit = unit
    console.log(state.prescriptionDetails)
  },
  editMedicine (state, medicine) {
    state.medicineEdit.index = medicine.index
    state.medicineEdit.medicine = medicine.medicineEdit
  },
  // Cập nhât trạng thái đơn thuốc trong lịch sử
  setPrescriptionHistory (state, prescription) {
    console.log('Đơn thuốc:::', prescription)
  },
  // Cập nhật các phiếu Y lệnh trong lịch sử
  setMedicalInstructionHistory (state, medicalInstruction) {
    console.log('Lịch sử phiếu y lệnh:::', medicalInstruction)
    state.medicalInstructionDetail.medicalInstructionType = medicalInstruction.medicalInstructionType
    state.medicalInstructionDetail.image = medicalInstruction.image
    state.medicalInstructionDetail.description = medicalInstruction.description
    state.medicalInstructionDetail.diagnose = medicalInstruction.diagnose
    state.medicalInstructionDetail.placeHealthRecord = medicalInstruction.placeHealthRecord
    state.medicalInstructionDetail.dateStarted = medicalInstruction.dateStarted
    state.medicalInstructionDetail.dateFinished = medicalInstruction.dateFinished
  },
  setPrescriptionDetailHistory (state, prescriptionDetailHistory) {
    state.prescriptionDetailHistory.medicalInstructionId = prescriptionDetailHistory.medicalInstructionId
    state.prescriptionDetailHistory.medicalInstructionType = prescriptionDetailHistory.medicalInstructionType
    state.prescriptionDetailHistory.description = prescriptionDetailHistory.description
    state.prescriptionDetailHistory.diagnose = prescriptionDetailHistory.diagnose
    state.prescriptionDetailHistory.placeHealthRecord = prescriptionDetailHistory.placeHealthRecord
    state.prescriptionDetailHistory.dateStarted = prescriptionDetailHistory.prescriptionRespone.dateStarted
    state.prescriptionDetailHistory.dateFinished = prescriptionDetailHistory.prescriptionRespone.dateFinished
    state.prescriptionDetailHistory.patientName = prescriptionDetailHistory.patientFullName
    state.prescriptionDetailHistory.medicationSchedules = prescriptionDetailHistory.prescriptionRespone.medicationSchedules.map(ms => {
      return {
        medicationName: ms.medicationName,
        content: ms.content,
        useTime: ms.useTime,
        unit: ms.unit,
        morning: ms.morning,
        noon: ms.noon,
        afternoon: ms.afterNoon,
        night: ms.night,
        totalNumber: parseInt(ms.morning) + parseInt(ms.noon) + parseInt(ms.afterNoon) + parseInt(ms.night)
      }
    })
    console.log('medicalInstructionHistory: ', state.prescriptionDetailHistory)
  },
  setMaxDatePrescription (state) {
    var dateStartedDefault = new Date('0001-01-01')
    var dateFinishedDefault = new Date('0001-01-01')
    var dateCanceledDefault = new Date('0001-01-01')
    state.medicalInstructionHistory.forEach(e => {
      if (e.dateStarted !== null) {
        if (new Date(e.dateStarted.split('/').reverse().join('-')) > dateStartedDefault) {
          dateStartedDefault = new Date(e.dateStarted.split('/').reverse().join('-'))
        }
      }
      if (e.dateFinished !== null) {
        if (new Date(e.dateFinished.split('/').reverse().join('-')) > dateFinishedDefault) {
          dateFinishedDefault = new Date(e.dateFinished.split('/').reverse().join('-'))
        }
      }
      if (e.dateCanceled !== null) {
        if (new Date(e.dateCanceled.split('/').reverse().join('-')) > dateCanceledDefault) {
          dateCanceledDefault = new Date(e.dateCanceled.split('/').reverse().join('-'))
        }
      }
    })
    state.maxDatePrescription = {
      dateStarted: dateStartedDefault,
      dateFinished: dateFinishedDefault,
      dateCanceled: dateCanceledDefault
    }
    console.log('max date:::', state.maxDatePrescription)
  },
  setCancelPrescription (state, medicalInstructionId) {
    var cancelMedicalInstruction = state.medicalInstructionHistory.find(medicalInstruction => medicalInstruction.medicalInstructionId === medicalInstructionId) // Tìm medicalInstruction để huỷ
    var index = state.medicalInstructionHistory.indexOf(cancelMedicalInstruction) // vị trí của medicalInstruction
    state.medicalInstructionHistory.splice(index, 1) // Xoá 1 phần tử ở vị trí index
  },
  setMedicalInstructionOfNewHealthRecord (state, medicalInstructions) {
    state.medicalInstructionOfNewHealthRecord = medicalInstructions
    console.log('state.medicalInstructionOfNewHealthRecord', state.medicalInstructionOfNewHealthRecord)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
