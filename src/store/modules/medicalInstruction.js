import router from '../../router/index'
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Notification, MessageBox } from 'element-ui'
import { groupBy } from '../../utils/common'

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
  medicalInstructionOfNewHealthRecord: [],
  medicalInstructionOfNewHealthRecordShow: [],
  prescriptionView: {},
  vitalSignView: {},
  medicalInstructionTypes: []
})
const getters = {}
const actions = {
  setPrescriptionView ({ commit }, prescription) {
    commit('setPrescriptionView', prescription)
  },
  setVitalSignView ({ commit }, vitalSign) {
    commit('setVitalSignView', vitalSign)
  },
  setMedicalInstructionEmpty ({ commit }) {
    commit('setMedicalInstructionEmpty')
  },
  // Đi đến trang xét lịch uống thuốc cho bệnh nhân
  setMedicalSchedule ({ dispatch, rootState, state }, from) {
    if (!state.patientSelected.isScheduleAppointment) {
      MessageBox.alert('Bác sĩ cần gặp bệnh nhân lần đầu để kiểm tra trước khi cho đơn thuốc.', 'Cảnh báo')
    } else {
      switch (from) {
        case 'HOME':
          dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeSelectMedicalInstructionModalSub', null, { root: true }) // Gọi module 'modals' để đóng dialog
          router.push('/home/medical-schedule').catch(error => {
            if (error.name !== 'NavigationDuplicated') {
              throw error
            }
          })
          dispatch('appointments/setAppointmentIdToCreatePrescription', null, { root: true })
          break

        case 'PATIENT-DETAIL':
          dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
          router.push('/patient-detail-page/medical-schedule').catch(error => {
            if (error.name !== 'NavigationDuplicated') {
              throw error
            }
          })
          dispatch('appointments/setAppointmentIdToCreatePrescription', null, { root: true })
          break
        case 'APPOINTMENT':
          dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeFinishAppointmentShow', null, { root: true })
          router.push('/patient-detail-page/medical-schedule').catch(error => {
            if (error.name !== 'NavigationDuplicated') {
              throw error
            }
          })
          dispatch('appointments/setAppointmentIdToCreatePrescription', rootState.appointments.appointmentIdToCreatePrescription, { root: true })
          break

        default:
          break
      }
      rootState.systemHandler.routeFrom = from
      dispatch('medicalInstruction/getMedicalScheduleHistory', null, { root: true })
    }
  },
  // Đi đến trang đo sinh hiệu cho bệnh nhân
  setVitalSign ({ dispatch, rootState, state }, from) {
    var isDeviceConnected = state.patientSelected.isDeviceConnected
    switch (from) {
      case 'HOME':
        console.log(isDeviceConnected)
        if (isDeviceConnected) {
          dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeSelectMedicalInstructionModalSub', null, { root: true }) // Gọi module 'modals' để đóng dialog
          router.push('/home/vital-sign').catch(error => {
            if (error.name !== 'NavigationDuplicated') {
              throw error
            }
          })
        } else {
          MessageBox.confirm('Bệnh nhân chưa kết nối thiết bị đo sinh hiệu. Bác sĩ có muốn yêu cầu bệnh nhân kết nối thiết bị?',
            {
              confirmButtonText: 'Gửi',
              cancelButtonText: 'Huỷ'
            })
            .then(() => {
              console.log('GỬI')
            })
            .catch(() => {
              console.log('HUỶ')
            })
        }
        dispatch('appointments/setAppointmentIdToCreateVitalSign', null, { root: true })
        break
      case 'PATIENT-DETAIL':
        console.log(' a', isDeviceConnected)
        if (isDeviceConnected) {
          dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
          router.push('/patient-detail-page/vital-sign').catch(error => {
            if (error.name !== 'NavigationDuplicated') {
              throw error
            }
          })
          dispatch('appointments/setAppointmentIdToCreateVitalSign', null, { root: true })
        } else {
          MessageBox.confirm('Bệnh nhân chưa kết nối thiết bị đo sinh hiệu. Bác sĩ có muốn yêu cầu bệnh nhân kết nối thiết bị?',
            {
              confirmButtonText: 'Gửi',
              cancelButtonText: 'Huỷ'
            })
            .then(() => {
              console.log('GỬI')
            })
            .catch(() => {
              console.log('HUỶ')
            })
        }
        break
      case 'APPOINTMENT':
        console.log(isDeviceConnected)
        if (isDeviceConnected) {
          dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
          dispatch('modals/closeFinishAppointmentShow', null, { root: true })
          router.push('/patient-detail-page/vital-sign').catch(error => {
            if (error.name !== 'NavigationDuplicated') {
              throw error
            }
          })
        } else {
          MessageBox.confirm('Bệnh nhân chưa kết nối thiết bị đo sinh hiệu. Bác sĩ có muốn yêu cầu bệnh nhân kết nối thiết bị?',
            {
              confirmButtonText: 'Gửi',
              cancelButtonText: 'Huỷ'
            })
            .then(() => {
              console.log('GỬI')
            })
            .catch(() => {
              console.log('HUỶ')
            })
        }
        dispatch('appointments/setAppointmentIdToCreateVitalSign', rootState.appointments.appointmentIdToCreateVitalSign, { root: true })
        break
      default:
        break
    }
    rootState.systemHandler.routeFrom = from
    dispatch('vitalSign/getVitalSigns', null, { root: true })
  },
  setAppointment ({ dispatch }) {
    dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
    dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
    dispatch('modals/closeSelectMedicalInstructionModalSub', null, { root: true }) // Gọi module 'modals' để đóng dialog
    router.push('/home/appointment-set').catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        throw error
      }
    })
    dispatch('appointments/getPatientAppointments', null, { root: true })
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
      dateStarted: data.dateStarted,
      dateFinished: data.dateFinished,
      description: data.description,
      contractId: data.contractId,
      appointmentId: rootState.appointments.appointmentIdToCreatePrescription,
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
        if (rootState.appointments.appointmentIdToCreatePrescription !== null) {
          dispatch('appointments/finishAppointment', medicalInstructionSchedule.diagnose, { root: true })
        }
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
      if (error.message.includes('404')) {
        commit('getMedicalScheduleHistoryFailure')
      }
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
  setEditMedicine ({ commit }, medicine) {
    commit('setEditMedicine', medicine)
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
  // Lấy thông tin tất cả đơn thuốc
  getMedicalInstructionHistory ({ commit, state }) {
    const params = {
      patientId: state.patientSelected.patientId,
      healthRecordId: state.patientSelected.healthRecordId
    }
    medicalInstructionRepository.getPrescriptionDetailHistory(params).then(response => {
      if (response.status === 200) {
        commit('setMedicalScheduleHistory', response.data)
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
      if (response.status === 200) {
        // console.log('payloadCancel', payloadCancel)
        // commit('setCancelPrescription', payloadCancel.medicalInstructionId)
        dispatch('getMedicalInstructionHistory')
      }
    })
  },
  // Chọn những phiếu Y lệnh cần lưu
  saveMedicalInstruction ({ commit, rootState }, medicalInstructions) {
    var medicalInstructionForSave = []
    if (medicalInstructions.length === 0) {
      rootState.contracts.requestDetail.medicalInstructionDiseases.forEach(
        medicalInstructionDisease => {
          medicalInstructionDisease.medicalInstructions.forEach(medicalInstruction => {
            medicalInstruction.medicalInstruction.forEach(mi => {
              medicalInstructionForSave.push({
                diseaseId: medicalInstructionDisease.diseaseId,
                diseaseName: medicalInstructionDisease.diseaseName,
                medicalInstructionId: mi.medicalInstructionId,
                medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName
              })
            })
          })
        }
      )
    } else {
      medicalInstructionForSave = medicalInstructions
    }
    commit('setMedicalInstructionOfNewHealthRecord', medicalInstructionForSave)
  },
  getMedicalInstructionTypes ({ commit, state }) {
    medicalInstructionRepository.getMedicalInstructionTypes().then(response => {
      commit('setMedicalInstructionTypes', response.data)
    }).catch((error) => {
      if (error.message.includes('404')) {
        state.medicalInstructionTypes = null
      }
    })
  },
  confirmAddMIToHR ({ dispatch }, medicalInstructionId) {
    medicalInstructionRepository.confirmAddMIToHR(medicalInstructionId).then(response => {
      Notification.success({ title: 'Thông báo', message: 'Bác sĩ đã thêm y lệnh vào hồ sơ bệnh án thành công', duration: 7000 })
      dispatch('patients/getRequestMedicalInstructions', null, { root: true })
      dispatch('patients/getMedicalInstructionsByType', null, { root: true })
    }).catch((err) => {
      console.log(err)
      Notification.error({ title: 'Thông báo', message: 'Bác sĩ đã thêm y lệnh vào hồ sơ bệnh án không thành công', duration: 7000 })
    })
  },
  rejectAddMIToHR ({ dispatch }, medicalInstructionId) {
    medicalInstructionRepository.rejectAddMIToHR(medicalInstructionId).then(response => {
      Notification.info({ title: 'Thông báo', message: 'Bác sĩ đã từ chối thêm y lệnh vào hồ sơ bệnh án.', duration: 7000 })
      dispatch('patients/getRequestMedicalInstructions', null, { root: true })
      dispatch('patients/getMedicalInstructionsByType', null, { root: true })
    }).catch((err) => {
      console.log(err)
      Notification.error({ title: 'Thông báo', message: 'Từ chối thêm y lệnh vào hồ sơ bệnh án không thành công', duration: 7000 })
    })
  },
  clearState ({ commit }) {
    commit('clearState')
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
    console.log('payloadPatient', payloadPatient)
    if (payloadPatient.patientName !== undefined) {
      state.patientSelected = {
        accountPatientId: payloadPatient.accountPatientId,
        contractId: payloadPatient.contractId,
        appointmentLast: payloadPatient.appointmentLast,
        dateAppointment: payloadPatient.dateAppointment === null ? null : payloadPatient.dateAppointment,
        diseaseContract: payloadPatient.diseaseContract.map(disease => {
          return {
            diseaseId: disease.diseaseId,
            diseaseName: disease.diseaseName
          }
        }),
        healthRecordId: payloadPatient.healthRecordId,
        patientId: payloadPatient.patientId,
        patientName: payloadPatient.patientName,
        status: payloadPatient.status,
        dateUpdateStatus: payloadPatient.dateUpdateStatus,
        isScheduleAppointment: payloadPatient.isScheduleAppointment,
        isSchedulePrescription: payloadPatient.isSchedulePrescription,
        isScheduleVitalSign: payloadPatient.isScheduleVitalSign,
        isDeviceConnected: payloadPatient.isDeviceConnected
      }
    } else {
      state.patientSelected = {
        contractId: payloadPatient.contractId,
        healthRecordId: payloadPatient.healthRecordId,
        patientId: payloadPatient.patientId,
        accountPatientId: payloadPatient.accountPatientId,
        from: payloadPatient.from
      }
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
  setEditMedicine (state, medicine) {
    state.medicineEdit = {}
    state.medicineEdit = {
      index: medicine.index,
      medicine: medicine.medicineEdit
    }
    console.log('medicine edit>>>', state.medicineEdit)
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
  },
  setCancelPrescription (state, medicalInstructionId) {
    var cancelMedicalInstruction = state.medicalInstructionHistory.find(medicalInstruction => medicalInstruction.medicalInstructionId === medicalInstructionId) // Tìm medicalInstruction để huỷ
    var index = state.medicalInstructionHistory.indexOf(cancelMedicalInstruction) // vị trí của medicalInstruction
    state.medicalInstructionHistory.splice(index, 1) // Xoá 1 phần tử ở vị trí index
  },
  setMedicalInstructionOfNewHealthRecord (state, medicalInstructions) {
    state.medicalInstructionOfNewHealthRecord = groupBy(medicalInstructions, 'diseaseId', 'diseaseId', 'medicalInstructions')
    let tmp = medicalInstructions.map(mi => {
      return {
        disease: `(${mi.diseaseId}) ${mi.diseaseName}`,
        medicalInstructionId: mi.medicalInstructionId,
        medicalInstructionTypeName: mi.medicalInstructionTypeName
      }
    })
    tmp = groupBy(tmp, 'disease', 'disease', 'medicalInstructions')
    tmp = tmp.map(t => {
      return {
        disease: t.disease,
        medicalInstructionDisease: groupBy(t.medicalInstructions, 'medicalInstructionTypeName', 'medicalInstructionTypeName', 'medicalInstructions')
      }
    })
    state.medicalInstructionOfNewHealthRecordShow = tmp
    console.log('state.medicalInstructionOfNewHealthRecord', state.medicalInstructionOfNewHealthRecord)
    console.log('state.medicalInstructionOfNewHealthRecordShow', state.medicalInstructionOfNewHealthRecordShow)
  },
  setPrescriptionView (state, prescription) {
    try {
      state.prescriptionView = {
        medicalInstructionId: prescription.medicalInstructionId,
        medicalInstructionTypeId: prescription.medicalInstructionTypeId,
        medicalInstructionTypeName: prescription.medicalInstructionTypeName,
        dateCreated: prescription.dateCreate,
        patientFullName: prescription.patientFullName,
        images: prescription.images === null ? null : prescription.images.map(i => {
          return {
            isChoose: false,
            url: `http://45.76.186.233:8000/api/v1/Images?pathImage=${i}`
          }
        }),
        description: prescription.description,
        diagnose: prescription.diagnose,
        placeHealthRecord: prescription.placeHealthRecord,
        status: prescription.status,
        appointmentId: prescription.appointmentId,
        prescriptionRespone: {
          dateStarted: prescription.prescriptionRespone.dateStarted,
          dateFinished: prescription.prescriptionRespone.dateFinished,
          dateCanceled: prescription.prescriptionRespone.dateCanceled === null ? null : prescription.prescriptionRespone.dateCanceled,
          status: prescription.prescriptionRespone.status,
          reasonCancel: prescription.prescriptionRespone.reasonCancel === null ? null : prescription.prescriptionRespone.reasonCancel,
          medicationSchedules: prescription.prescriptionRespone.medicationSchedules === null ? null : prescription.prescriptionRespone.medicationSchedules.map(pms => {
            return {
              medicationName: pms.medicationName,
              content: pms.content,
              useTime: pms.useTime,
              unit: pms.unit,
              morning: pms.morning,
              noon: pms.noon,
              afterNoon: pms.afterNoon,
              night: pms.night
            }
          })
        }
      }
      console.log(prescription)
    } catch (error) {
      console.error(error)
    }
  },
  setVitalSignView (state, vitalSign) {
    try {
      state.vitalSignView = {
        medicalInstructionId: vitalSign.medicalInstructionId,
        medicalInstructionTypeId: vitalSign.medicalInstructionTypeId,
        medicalInstructionTypeName: vitalSign.medicalInstructionTypeName,
        dateCreate: vitalSign.dateCreate,
        patientFullName: vitalSign.patientFullName,
        images: vitalSign.images === null ? null : vitalSign.images.map(i => {
          return {
            isChoose: false,
            url: `http://45.76.186.233:8000/api/v1/Images?pathImage=${i}`
          }
        }),
        description: vitalSign.description,
        diagnose: vitalSign.diagnose,
        placeHealthRecord: vitalSign.placeHealthRecord,
        status: vitalSign.status,
        appointmentId: vitalSign.appointmentId,
        vitalSignScheduleRespone: vitalSign.vitalSignScheduleRespone === null ? null : {
          timeStared: vitalSign.vitalSignScheduleRespone.timeStared,
          timeCanceled: vitalSign.vitalSignScheduleRespone.timeCanceled,
          vitalSigns: vitalSign.vitalSignScheduleRespone.vitalSigns === null ? null : vitalSign.vitalSignScheduleRespone.vitalSigns.map(vts => {
            return {
              vitalSignTypeId: vts.vitalSignTypeId,
              vitalSignType: vts.vitalSignType,
              numberMax: vts.numberMax,
              numberMin: vts.numberMin,
              minuteDangerInterval: vts.minuteDangerInterval,
              timeStart: vts.timeStart,
              minuteAgain: vts.minuteAgain
            }
          })
        }
      }
      console.log('vitalSignView: ', state.medicalInstructionView)
    } catch (error) {
      console.log(error)
    }
  },
  setMedicalInstructionEmpty (state) {
    state.medicalInstructionView = {}
  },
  setMedicalInstructionTypes (state, medicalInstructionTypes) {
    state.medicalInstructionTypes = medicalInstructionTypes.map(mit => {
      return {
        medicalInstructionTypeId: mit.medicalInstructionTypeId,
        medicalInstructionTypeName: mit.name,
        status: mit.status
      }
    })
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
