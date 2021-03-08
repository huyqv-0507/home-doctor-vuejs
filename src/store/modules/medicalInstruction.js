import router from '../../router/index'
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Notification } from 'element-ui'

const medicalInstructionRepository = RepositoryFactory.get('medicalInstructionRepository')

const state = () => ({
  medicalInstructionStatus: false, // Trạng thái của modal Y lệnh. Xác định trang được hiển thị (Chọn bệnh nhân/ Chọn chức năng cho y lệnh)
  medicalInstructionHistory: [],
  patientSelected: {}, // Bệnh nhân được chọn
  prescriptionDetails: null,
  prescriptionDetail: {},
  visibleSelectMedicine: false,
  medicineEdit: {},
  mEdit: {}
})
const getters = {}
const actions = {
  // Đi đến trang xét lịch uống thuốc cho bệnh nhân
  setMedicalSchedule ({ dispatch }) {
    dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
    router.push('medical-schedule').catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        throw error
      }
    })
  },
  setVitalSign ({ dispatch }) {
    dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
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
  savePrescription ({ dispatch, state }, data) {
    var medicalInstructionSchedule = {
      healthRecordId: state.patientSelected.healthRecordId,
      diagnose: data.diagnose,
      dateStart: data.dateStarted,
      dateFinish: data.dateFinished,
      description: '',
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
  getMedicalScheduleHistory ({ commit, rootState }) {
    medicalInstructionRepository.getMedicalScheduleHistory(rootState.medicalInstruction.patientSelected.patientId).then(response => {
      if (response.status === 200) {
        commit('getMedicalScheduleHistory', response.data)
      }
    })
  },
  // Thêm mới thuốc
  openAddNewMedicine ({ state }) {
    state.prescriptionDetails = []
    router.push('new-medical-schedule')
  },
  backToMedicalSchedule () {
    router.go(-1)
  },
  // Dùng lại đơn thuốc cũ
  reusePrescription ({ commit }, prescription) {

  },
  // Sửa medicine
  editMedicine ({ commit }, medicine) {
    commit('editMedicine', medicine)
  }
}
const mutations = {
  nextMedicalInstruction (state) {
    state.medicalInstructionStatus = true // Kích hoạt trạng thái của modal chọn chức năng y lệnh
  },
  backToSelectPatient (state) {
    state.medicalInstructionStatus = false // Tắt trạng thái modal chức năng chọn y lệnh. Chuyển qua modal xem danh sách bệnh nhân đang theo dõi
    state.patientSelected = null // Xoá bệnh nhân đã đc chọn
  },
  setPatientSelected (state, payloadPatient) {
    state.patientSelected = payloadPatient
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
  getMedicalScheduleHistory (state, medicalInstructionHistory) {
    var tmpMedicalInstructionHistory = medicalInstructionHistory.map(mih => {
      return {
        medicalInstructionId: mih.medicalInstructionId,
        diagnose: mih.diagnose,
        description: mih.description,
        dateStarted: mih.dateStarted.split('T')[0].split('-').reverse().join('/'),
        dateFinished: mih.dateFinished.split('T')[0].split('-').reverse().join('/'),
        medicationSchedules: mih.medicationSchedules.map(ms => {
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
    }).sort((a, b) => { return new Date(b.dateFinished.split('/').reverse().join('-')) - new Date(a.dateFinished.split('/').reverse().join('-')) })
    state.medicalInstructionHistory = tmpMedicalInstructionHistory
    console.log('medicalInstructionHistory: ', state.medicalInstructionHistory)
  },
  editMedicine (state, medicine) {
    state.medicineEdit.index = medicine.index
    state.medicineEdit.medicineEdit = medicine.medicineEdit
    state.mEdit.medicineName = medicine.medicineEdit.medicineName
    state.mEdit.unitType = medicine.medicineEdit.unit
    state.mEdit.content = medicine.medicineEdit.content
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
