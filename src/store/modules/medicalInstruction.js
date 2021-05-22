import router from '../../router/index'
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Notification, MessageBox } from 'element-ui'
import { groupBy } from '../../utils/common'
import { getField, updateField } from 'vuex-map-fields'

const medicalInstructionRepository = RepositoryFactory.get('medicalInstructionRepository')
const appointmentRepository = RepositoryFactory.get('appointmentRepository')

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
  prescriptionCreated: {
    status: null,
    prescription: null
  },
  medicineCreated: {
    status: null,
    medicine: {
      medicineDescription: '',
      unitType: '',
      content: '',
      medicineName: '',
      unitMorning: '', // Số thuốc sử dụng cho sáng
      unitNoon: '', // Số thuốc sử dụng cho trưa
      unitAfternoon: '', // Số thuốc sử dụng cho chiều
      unitNight: '', // Số thuốc sử dụng cho tối
      morningCheck: false,
      noonCheck: false,
      afternoonCheck: false,
      nightCheck: false,
      useTimeOpt: '', // Thời gian sử dụng thuốc vào buổi sáng
      useTimeOptions: [
        {
          useTimeOpt: 'Trước bữa ăn',
          label: 'Trước bữa ăn'
        },
        {
          useTimeOpt: 'Sau bữa ăn',
          label: 'Sau bữa ăn'
        }
      ],
      noteMore: '' // Ghi chú thêm
    },
    index: null
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
const getters = {
  getMedicalInstructionTypeId: state => (medicalInstructionTypeName) => {
    return state.medicalInstructionTypes.find(mit => mit.medicalInstructionTypeName === medicalInstructionTypeName)
  },
  getField
}
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
    switch (from) {
      case 'HOME':
        dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
        dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
        dispatch('modals/closeSelectMedicalInstructionModalSub', null, { root: true }) // Gọi module 'modals' để đóng dialog
        dispatch('appointments/setAppointmentIdToCreatePrescription', null, { root: true }).then(() => {
          router.push('/home/medical-schedule').catch(error => {
            if (error.name !== 'NavigationDuplicated') {
              throw error
            }
          })
        })
        break

      case 'PATIENT-DETAIL':
        dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
        dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
        dispatch('appointments/setAppointmentIdToCreatePrescription', null, { root: true }).then(() => {
          router.push('/patient-detail-page/medical-schedule').catch(error => {
            if (error.name !== 'NavigationDuplicated') {
              throw error
            }
          })
        })
        break
      case 'APPOINTMENT':
        dispatch('modals/closeMedicalInstruction', null, { root: true }) // Gọi module 'modals' để đóng dialog
        dispatch('modals/closeSelectMedicalInstructionModal', null, { root: true }) // Gọi module 'modals' để đóng dialog
        dispatch('patients/getOverviews', null, { root: true }).then(() => {
          dispatch('appointments/setAppointmentIdToCreatePrescription', rootState.patients.patientOverview.appointmentNext.appointmentId, { root: true }).then(() => {
            dispatch('modals/closeFinishAppointmentShow', null, { root: true })
            router.push('/patient-detail-page/medical-schedule').catch(error => {
              if (error.name !== 'NavigationDuplicated') {
                throw error
              }
            })
          })
        })
        break

      default:
        break
    }
    rootState.systemHandler.routeFrom = from
    dispatch('medicalInstruction/getMedicalScheduleHistory', null, { root: true })
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
          router.push('/patient-detail-page/vital-sign-patient').catch(error => {
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
          router.push('/patient-detail-page/vital-sign-patient').catch(error => {
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
        dispatch('appointments/setAppointmentIdToCreateVitalSign', rootState.patients.patientOverview.appointmentNext.appointmentId, { root: true })
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
    dispatch('businessValidator/checkFirstAppointmentFinished', null, { root: true })
    dispatch('businessValidator/checkAppointmentActive', null, { root: true })
    dispatch('nextMedicalInstruction')
  },
  // Thêm thuốc vào đơn thuốc
  addMedicineToPrescription ({ commit }, useTimeOpt) {
    commit('addMedicineToPrescription', useTimeOpt)
  },
  // Thêm đơn thuốc vào database
  createMedicalSchedule () {

  },
  removeMedicineInPrescription ({ state }, index) {
    state.prescriptionDetails.splice(index, 1)
  },
  // Insert đơn thuốc xuống db
  savePrescription ({ dispatch, state, rootState, commit }, data) {
    var medicalInstructionSchedule = {
      healthRecordId: state.patientSelected.healthRecordId,
      doctorAccountId: parseInt(rootState.users.user.accountId),
      conclusion: data.conclusion,
      diseaseIds: rootState.prescription.prescriptionDiagnoses.map(p => {
        return p.diagnose.split(')')[0].replace('(', '')
      }), // Danh sách bệnh kèm theo được phát hiện trong quá trình khám chữa bệnh
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
    medicalInstructionRepository.createMedicalSchedule(medicalInstructionSchedule).then(response => {
      if (rootState.appointments.appointmentIdToCreatePrescription !== null) {
        appointmentRepository.finishAppointment({
          appointmentId: rootState.appointments.appointmentIdToCreatePrescription,
          diagnose: '',
          contractId: state.patientSelected.contractId
        }).then(response => {
          dispatch('businessValidator/setIsFirstAppointmentFinished', true, { root: true })
          dispatch('businessValidator/setIsAppointmentActive', false, { root: true })
        }).catch(err => { console.log(err) })
      }
      Notification.success({ title: 'Thông báo', message: 'Bác sĩ đã tạo đơn thuốc thành công', duration: 7000 })
      dispatch('getMedicalInstructionHistory')
      router.go(-1)
    }).catch(err => {
      console.log(err)
      Notification.error({ title: 'Thông báo', message: 'Bác sĩ đã tạo đơn thuốc khoong thành công', duration: 7000 })
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
  openAddNewMedicine ({ commit, state }) {
    state.prescriptionCreated.status = 'NEW'
    state.prescriptionCreated.prescription = {}
    commit('setPrescriptionExistedNew')
    router.push('new-medical-schedule')
  },
  backToMedicalSchedule () {
    router.go(-1)
  },
  // Dùng lại đơn thuốc cũ
  reusePrescription ({ commit, state }, prescription) {
    console.log('prescription', prescription)
    state.prescriptionCreated.status = 'REUSE'
    state.prescriptionCreated.prescription = prescription
    commit('setPrescriptionExistedReuse', prescription)
    router.push('new-medical-schedule')
  },
  // Sửa medicine
  addNewMedicine ({ dispatch, state }, data) {
    console.log('addNewMedicine', data)
    state.medicineCreated.status = data.status
    state.medicineCreated.medicine = {
      medicineDescription: data.medicine.medicineName,
      unitType: data.medicine.unit,
      content: data.medicine.content,
      medicineName: data.medicine.medicineName,
      unitMorning: parseInt(data.medicine.morning) === 0 ? '' : parseInt(data.medicine.morning), // Số thuốc sử dụng cho sáng
      unitNoon: parseInt(data.medicine.noon) === 0 ? '' : parseInt(data.medicine.noon), // Số thuốc sử dụng cho trưa
      unitAfternoon: parseInt(data.medicine.afternoon) === 0 ? '' : parseInt(data.medicine.afternoon), // Số thuốc sử dụng cho chiều
      unitNight: parseInt(data.medicine.night) === 0 ? '' : parseInt(data.medicine.night), // Số thuốc sử dụng cho tối
      morningCheck: data.medicine.morning !== 0,
      noonCheck: data.medicine.noon !== 0,
      afternoonCheck: data.medicine.afternoon !== 0,
      nightCheck: data.medicine.night !== 0,
      useTimeOpt: data.medicine.useTime !== '' ? data.medicine.useTime.split(';')[0].trim() : null, // Thời gian sử dụng thuốc vào buổi sáng
      useTimeOptions: [
        {
          useTimeOpt: 'Trước bữa ăn',
          label: 'Trước bữa ăn'
        },
        {
          useTimeOpt: 'Sau bữa ăn',
          label: 'Sau bữa ăn'
        }
      ],
      noteMore: data.medicine.useTime !== '' ? data.medicine.useTime.split(';')[1].trim() : '' // Ghi chú thêm
    }
    state.medicineCreated.index = data.index
    console.log('medicineCreated', state.medicineCreated)
    dispatch('modals/openAddMedicine', null, { root: true })
  },
  updateMedicineToPrescription ({ commit }, useTimeOpt) {
    commit('updateMedicineToPrescription', useTimeOpt)
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
        Notification.success({ title: 'Thông báo', message: 'Bác sĩ đã dừng lịch uống thuốc thành công', duration: 7000 })
        dispatch('getMedicalInstructionHistory')
      }
    }).catch(err => {
      console.log(err)
      Notification.error({ title: 'Thông báo', message: 'Bác sĩ không thể dừng lịch uống thuốc', duration: 7000 })
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
  insertMedicalInstructionImage ({ dispatch }, medicalInstruction) {
    console.log('medicalInstruction', medicalInstruction)
    medicalInstructionRepository.insertMedicalInstructionImage(medicalInstruction).then(response => {
      Notification.success({ title: 'Thông báo', message: 'Bác sĩ đã thêm y lệnh thành công', duration: 7000 })
      dispatch('modals/closeAddMedicalInstructionForm', null, { root: true })
      dispatch('patients/getMedicalInstructionsByType', null, { root: true })
    }).catch(err => {
      console.log('insertMedicalInstructionImage', err)
      Notification.error({ title: 'Lỗi', message: 'Vui lòng kiểm tra kết nối mạng', duration: 7000 })
    })
  },
  insertDiseases ({ commit }, diseases) {
    medicalInstructionRepository.insertDiseases(diseases).then(response => {
      console.log('insertDiseases ok')
    }).catch(err => {
      console.log(err)
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
        appointmentLast: payloadPatient.appointmentLast === null ? null : payloadPatient.appointmentLast,
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
  addMedicineToPrescription (state, useTimeOpt) {
    var medicineName = state.medicineCreated.medicine.medicineName
    var content = state.medicineCreated.medicine.content
    var morning = state.medicineCreated.medicine.unitMorning.length === 0 ? 0 : parseInt(state.medicineCreated.medicine.unitMorning)
    var noon = state.medicineCreated.medicine.unitNoon.length === 0 ? 0 : parseInt(state.medicineCreated.medicine.unitNoon)
    var afternoon = state.medicineCreated.medicine.unitAfternoon.length === 0 ? 0 : parseInt(state.medicineCreated.medicine.unitAfternoon)
    var night = state.medicineCreated.medicine.unitNight.length === 0 ? 0 : parseInt(state.medicineCreated.medicine.unitNight)
    var useTime = state.medicineCreated.medicine.useTime
    if (useTimeOpt === null || useTimeOpt.length === 0 || useTimeOpt === '') {
      useTime = `Trước bữa ăn; ${state.medicineCreated.medicine.noteMore}`
    } else {
      useTime = `${state.medicineCreated.medicine.useTimeOpt}; ${state.medicineCreated.medicine.noteMore}`
    }
    var unit = state.medicineCreated.medicine.unitType
    var usage = `Sử dụng: sáng ${parseInt(morning)} ${unit}, trưa ${parseInt(noon)} ${unit}, chiều ${parseInt(afternoon)} ${unit}, tối ${parseInt(night)} ${unit}; ${useTime}`
    var totalNumber = parseInt(morning) + parseInt(noon) + parseInt(afternoon) + parseInt(night)
    var medicineUsage = {
      medicineName: medicineName,
      content: content,
      morning: morning,
      noon: noon,
      afternoon: afternoon,
      night: night,
      useTime: useTime,
      usage: usage,
      totalNumber: totalNumber,
      unit: unit
    }
    console.log('medicineUsage', medicineUsage)
    state.prescriptionDetails.push(medicineUsage)
  },
  getMedicalScheduleHistoryFailure (state) {
    state.medicalInstructionHistory = []
  },
  setMedicalScheduleHistory (state, medicalInstructionHistory) {
    try {
      var tmpMedicalInstructionHistory = medicalInstructionHistory.map(mih => {
        return {
          medicalInstructionId: mih.medicalInstructionId,
          conclusion: mih.conclusion,
          description: mih.description,
          diseases: mih.diseases === null ? null : mih.diseases.map(d => {
            return {
              diseaseId: d.split('-')[0],
              diseaseName: d.split('-')[1]
            }
          }),
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
            let usage = ''
            if (ms.morning !== 0 || ms.morning !== null) {
              usage += `Sáng: ${ms.morning} ;`
            }
            if (ms.noon !== 0 || ms.noon !== null) {
              usage += `Trưa: ${ms.noon} ;`
            }
            if (ms.afterNoon !== 0 || ms.afterNoon !== null) {
              usage += `Chiều: ${ms.afterNoon} ;`
            }
            if (ms.night !== 0 || ms.night !== null) {
              usage += `Tối: ${ms.night} ;`
            }
            return {
              medicationName: ms.medicationName,
              content: ms.content,
              useTime: ms.useTime,
              unit: ms.unit,
              morning: ms.morning,
              noon: ms.noon,
              afternoon: ms.afterNoon,
              night: ms.night,
              usage: usage + ms.useTime,
              totalNumber: parseInt(ms.morning) + parseInt(ms.noon) + parseInt(ms.afterNoon) + parseInt(ms.night)
            }
          })
        }
      })
      state.medicalInstructionHistory = tmpMedicalInstructionHistory
      state.medicalInstructionHistories = tmpMedicalInstructionHistory
      console.log('medicalInstructionHistory: ', state.medicalInstructionHistory)
    } catch (er) { console.log(er) }
  },
  setMedicalInstructionsFilter (state, medicalInstructions) {
    state.medicalInstructionHistory = medicalInstructions
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
    console.log('prescriptionDetailHistory', prescriptionDetailHistory)
    state.prescriptionDetailHistory.medicalInstructionId = prescriptionDetailHistory.medicalInstructionId
    state.prescriptionDetailHistory.medicalInstructionType = prescriptionDetailHistory.medicalInstructionType
    state.prescriptionDetailHistory.description = prescriptionDetailHistory.description
    state.prescriptionDetailHistory.diseases = prescriptionDetailHistory.diseases === null ? null : prescriptionDetailHistory.diseases.map(d => {
      return {
        diseaseId: d.split('-')[0],
        diseaseName: d.split('-')[1]
      }
    })
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
        conclusion: prescription.conclusion,
        diseases: prescription.diseases === null ? null : prescription.diseases.map(d => {
          return {
            diseaseId: d.split('-')[0],
            diseaseName: d.split('-')[1]
          }
        }),
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
        conclusion: vitalSign.conclusion,
        diseases: vitalSign.diseases === null ? null : vitalSign.diseases.map(d => {
          return {
            diseaseId: d.split('-')[0],
            diseaseName: d.split('-')[1]
          }
        }),
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
  updateField,
  updateMedicineToPrescription (state, useTimeOpt) {
    var medicineName = state.medicineCreated.medicine.medicineName
    var content = state.medicineCreated.medicine.content
    var morning = state.medicineCreated.medicine.unitMorning.length === 0 ? 0 : parseInt(state.medicineCreated.medicine.unitMorning)
    var noon = state.medicineCreated.medicine.unitNoon.length === 0 ? 0 : parseInt(state.medicineCreated.medicine.unitNoon)
    var afternoon = state.medicineCreated.medicine.unitAfternoon.length === 0 ? 0 : parseInt(state.medicineCreated.medicine.unitAfternoon)
    var night = state.medicineCreated.medicine.unitNight.length === 0 ? 0 : parseInt(state.medicineCreated.medicine.unitNight)
    var useTime = state.medicineCreated.medicine.useTime
    if (useTimeOpt === null || useTimeOpt.length === 0 || useTimeOpt === '') {
      useTime = `Trước bữa ăn; ${state.medicineCreated.medicine.noteMore}`
    } else {
      useTime = `${state.medicineCreated.medicine.useTimeOpt}; ${state.medicineCreated.medicine.noteMore}`
    }
    var unit = state.medicineCreated.medicine.unitType
    var usage = `Sử dụng: sáng ${parseInt(morning)} ${unit}, trưa ${parseInt(noon)} ${unit}, chiều ${parseInt(afternoon)} ${unit}, tối ${parseInt(night)} ${unit}; ${useTime}`
    var totalNumber = parseInt(morning) + parseInt(noon) + parseInt(afternoon) + parseInt(night)
    state.prescriptionDetails[state.medicineCreated.index].medicineName = medicineName
    state.prescriptionDetails[state.medicineCreated.index].content = content
    state.prescriptionDetails[state.medicineCreated.index].morning = morning
    state.prescriptionDetails[state.medicineCreated.index].noon = noon
    state.prescriptionDetails[state.medicineCreated.index].afternoon = afternoon
    state.prescriptionDetails[state.medicineCreated.index].night = night
    state.prescriptionDetails[state.medicineCreated.index].useTime = useTime
    state.prescriptionDetails[state.medicineCreated.index].usage = usage
    state.prescriptionDetails[state.medicineCreated.index].totalNumber = totalNumber
    state.prescriptionDetails[state.medicineCreated.index].unit = unit
    console.log('state.prescriptionDetails[state.medicineCreated.index]', state.prescriptionDetails)
    // Object.assign(state.prescriptionDetails[state.medicineCreated.index], { medicineName: medicineName, content: content, morning: morning, noon: noon, afternoon: afternoon, night: night, useTime: useTime, usage: usage, totalNumber: totalNumber, unit: unit })
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
