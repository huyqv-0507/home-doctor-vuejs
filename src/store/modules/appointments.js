import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Notification } from 'element-ui'
import { groupBy } from '../../utils/common'
import router from '../../router'
const appointmentRepository = RepositoryFactory.get('appointmentRepository')
const medicalInstructionRepository = RepositoryFactory.get('medicalInstructionRepository')
const state = () => ({
  isSelectPatient: false, // Trạng thái chọn bệnh nhân khi tạo cuộc hẹn,
  isChoosePatient: false,
  patientInfoForAppointment: {
    contractId: 0,
    accountPatientId: 0,
    accountDoctorId: 0,
    note: '',
    dateExamination: '',
    healthRecordId: '',
    patientId: ''
  }, // Thông tin bệnh nhân để tạo cuộc hẹn
  appointmentsOfMonth: [], // Danh sách cuộc hẹn trong 1 tháng
  appointments: [], // Tất cả các cuộc hẹn của bác sĩ
  activeAppointments: [], // Danh sách cuộc hiẹn tiếp theo,
  patientAppointments: [],
  appointmentsToday: [],
  appointmentDateChoose: {},
  appointmentDetail: {},
  appointmentIdToCreatePrescription: null,
  appointmentIdToCreateVitalSign: null,
  appointmentsOfPatient: [],
  isMeetFirst: false
})
const getters = {
}
const actions = {
  async viewMedicalInstruction ({ dispatch }, medicalInstruction) {
    const medicalInstructionTypeName = medicalInstruction.medicalInstructionTypeName
    const medicalInstructionId = medicalInstruction.medicalInstructionId
    console.log('viewMedicalInstruction', medicalInstruction)
    switch (medicalInstructionTypeName) {
      case 'Đơn thuốc':
        await medicalInstructionRepository.getMedicalInstructionDetail(medicalInstructionId).then(response => {
          dispatch('medicalInstruction/setPrescriptionView', response.data, { root: true })
          dispatch('modals/openPrescriptionShow', null, { root: true })
        }).catch((err) => {
          if (err.message.includes('404')) {
            dispatch('medicalInstruction/setMedicalInstructionViewEmpty', null, { root: true })
          }
        })
        break
      case 'Sinh hiệu':
        await medicalInstructionRepository.getMedicalInstructionDetail(medicalInstructionId).then(response => {
          console.log(response.data)
          dispatch('medicalInstruction/setVitalSignView', response.data, { root: true })
          dispatch('modals/openVitalSignShow', null, { root: true })
        }).catch((err) => {
          if (err.message.includes('404')) {
            dispatch('medicalInstruction/setMedicalInstructionViewEmpty', null, { root: true })
          }
        })
        break

      default:
        break
    }
  },
  async getAppointmentById ({ commit, state }, appointmentId) {
    console.log('getAppointmentById - appointmentId', appointmentId)
    await appointmentRepository.getAppointmentById(appointmentId).then(response => {
      state.appointmentIdToCreatePrescription = appointmentId
      state.appointmentIdToCreateVitalSign = appointmentId
      console.log('appointmentIdToCreateVitalSign', state.appointmentIdToCreateVitalSign)
      commit('setAppointmentDetail', response.data)
      router.push('/home/detail')
    }).catch(err => { console.log(err) })
  },
  appointmentDateChoose ({ commit }, appointmentDateChoose) {
    commit('setAppointmentDateChoose', appointmentDateChoose)
    router.push('/home/appointment-detail')
  },
  handleChooseDate ({ commit }, appointment) {
    console.log(appointment)
  },
  // Trở về bươc chọn bệnh nhân
  backToSelectPatientAppointment ({ commit }) {
    commit('backToSelectPatientAppointment')
  },
  // Xác nhận tạo cuộc hẹn
  confirmAppointment ({ commit, state, rootState, dispatch }, appointmentData) {
    console.log('appointmentData', appointmentData)
    const params = {
      healthRecordId: rootState.medicalInstruction.patientSelected.healthRecordId,
      note: appointmentData.note,
      dateExamination: appointmentData.dateExamination,
      accountDoctorId: parseInt(rootState.users.user.accountId),
      accountPatientId: rootState.medicalInstruction.patientSelected.accountPatientId
    }
    rootState.modals.isVisibleAppointmentPatients = false // Đóng modal lịch tái khám
    rootState.modals.isVisibleAddAppointmentForm = false // Đóng modal lịch tái khám
    appointmentRepository.requestAppointment(params).then(response => {
      if (response.status === 200) {
        Notification.success({ title: 'Thông báo', message: 'Bạn đã yêu cầu lịch tái khám thành công. Vui lòng đợi bệnh nhân xác nhận', duration: 6000 })
        dispatch('patients/getPatientApproved', null, { root: true })
        dispatch('businessValidator/checkAppointmentCurrent', null, { root: true })
        dispatch('appointments/getPatientAppointments', null, { root: true })
        dispatch('appointments/getAppointmentsByCurrentDate', null, { root: true })
        dispatch('patients/getOverviews', null, { root: true })
      }
    }).catch((error) => {
      Notification.error({ title: 'Thông báo', message: `Bạn đã có cuộc hẹn vào ngày ${error.response.data}. Vui lòng hoàn thành cuộc hẹn trước khi tạo cuộc hẹn mới`, duration: 6000 })
      console.log(error.response.data)
    })
    commit('confirmAppointment')
  },
  getAppointmentsByCurrentDate ({ commit, rootState, dispatch }) {
    var accountId = rootState.users.user.accountId
    dispatch('time/getTimeSystem', null, { root: true }).then(() => {
      const now = rootState.time.timeNow.split('T')
      appointmentRepository.getAppointmentsByCurrentDate(accountId, now[0].split('-')[0], now[0].split('-')[1]).then(response => {
        if (response.status === 200) {
          commit('setAppointmentsCurrentDate', { appointments: response.data, now: now })
        }
      }).catch((error) => {
        if (error.message.includes('404')) {
          commit('setAppointmentsCurrentDateEmpty')
        }
      })
    })
  },
  // Lấy tất cả các cuộc hẹn trong 1 tháng của cá nhân bác sĩ
  getAppointmentsByMonth ({ commit, rootState }) {
    var accountId = rootState.users.user.accountId
    const now = new Date()
    var currentMonth = `${now.getFullYear()}/${now.getMonth() + 1}`
    appointmentRepository.getAppointmentsByMonth(accountId, currentMonth).then(response => {
      if (response.status === 200) {
        commit('setAppointmentMonth', response.data)
      }
    }).catch((error) => {
      console.log('getAppointmentsByMonth error' + error)
    })
  },
  // Lấy tất cả các cuộc hẹn của cá nhận bác sĩ
  getAppointments ({ commit, rootState }) {
    var accountId = rootState.users.user.accountId // account id của bác sĩ
    appointmentRepository.getAppointments(accountId).then(response => {
      if (response.status === 200) {
        commit('setAppointments', response.data)
      }
    }).catch((error) => {
      console.log('getAppointments error' + error)
    })
  },
  // Lấy tất cả các cuộc hẹn của cá nhận bác sĩ đang hiện hành
  getActiveAppointments ({ commit, rootState }) {
    var accountId = rootState.users.user.accountId // account id của bác sĩ
    appointmentRepository.getNextSchedule(accountId).then(response => {
      if (response.status === 200) {
        commit('setActiveAppointments', response.data)
      }
    }).catch((error) => {
      console.log('getActiveAppointments error' + error)
    })
  },
  addAppointment ({ commit, dispatch }, patient) {
    dispatch('modals/openAddAppointmentForm', null, { root: true })
  }, // Thêm cuộc hẹn từ màn home khi bệnh nhân chưa có ngày tái khám
  getPatientAppointments ({ commit, getters, rootState, state }) {
    state.patientAppointments = []
    var accountId = rootState.users.user.accountId // account id của bác sĩ
    appointmentRepository.getAppointments(accountId).then(response => {
      if (response.status === 200) {
        const appointments = response.data
        let patientAppointments = []
        patientAppointments = appointments.map(apt => {
          return {
            dateExamination: apt.dateExamination,
            appointments: apt.appointments.filter(a => a.fullNamePatient === rootState.medicalInstruction.patientSelected.patientName).map(appointment => {
              return {
                appointmentId: appointment.appointmentId,
                status: appointment.status === 'ACTIVE' ? 'Đang hiện hành' : '' || appointment.status === 'CANCEL' ? 'Đã huỷ' : '' || appointment.status === 'FINISHED' ? 'Đã sử dụng' : '', // PENDING, ACTIVE, CANCEL
                patientName: appointment.fullNamePatient,
                doctorName: appointment.fullNameDoctor,
                note: appointment.note,
                dateExamination: appointment.dateExamination, // 2021-03-20T16:33:47.927
                reasonCanceled: appointments.reasonCanceled, // 2021-03-20T16:33:47.927
                dateCanceled: appointments.dateCanceled // 2021-03-20T16:33:47.927
              }
            })
          }
        })
        commit('setPatientAppointments', patientAppointments)
      }
    }).catch((error) => {
      console.log('getAppointments error' + error)
    })
  },
  setAppointmentIdToCreatePrescription ({ commit }, appointmentId) {
    commit('setAppointmentIdToCreatePrescription', appointmentId)
  },
  setAppointmentIdToCreateVitalSign ({ commit }, appointmentId) {
    commit('setAppointmentIdToCreateVitalSign', appointmentId)
  },
  updateAppointment ({ dispatch, rootState }, appointmentData) {
    const params = {
      appointmentId: appointmentData.appointmentId,
      dateExamination: appointmentData.dateExamination,
      contractId: appointmentData.contractId
    }
    appointmentRepository.updateAppointment(params).then(response => {
      console.log('updateAppointment', response.status)
      Notification.success({ title: 'Thông báo', message: 'Bác sĩ đã thay đổi ngày hẹn thành công', duration: 7000 })
      dispatch('modals/closeUpdateAppointmentShow', null, { root: true })
      const date = new Date(params.dateExamination)
      rootState.patients.patientOverview.appointmentNext.dateExamination = `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}T${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
    }).catch((err) => {
      if (err.message.includes('400')) {
        Notification.error({ title: 'Thông báo', message: 'Vui lòng kiểm tra lại dữ liệu đã nhập', duration: 7000 })
      } else if (err.message.includes('500')) {
        Notification.error({ title: 'Thông báo', message: 'Vui lòng kiểm tra kết nối mạng', duration: 7000 })
      }
    })
  },
  finishAppointment ({ rootState, dispatch, commit }, data) {
    const params = {
      appointmentId: data.appointmentId,
      diagnose: data.diagnose,
      contractId: rootState.medicalInstruction.patientSelected.contractId
    }
    console.log(params)
    appointmentRepository.finishAppointment(params).then(response => {
      Notification.success({ title: 'Thông báo', message: 'Bác sĩ đã hoàn tất cuộc hẹn thăm khám', duration: 7000 })
      dispatch('modals/closeFinishAppointmentShow', null, { root: true })
      commit('businessValidator/setIsFirstAppointmentFinished', true, { root: true })
      dispatch('patients/getOverviews', null, { root: true })
    }).catch(err => {
      Notification.error({ title: 'Lỗi', message: 'Vui lòng kiểm tra kết nối mạng', duration: 7000 })
      console.log(err)
    })
  },
  getAppointmentsByHRId ({ commit, state, rootState }) {
    appointmentRepository.getAppointmentsByHRId(rootState.medicalInstruction.patientSelected.healthRecordId).then(response => {
      commit('setAppointmentOfPatient', response.data)
    }).catch(err => {
      if (err.message.includes('404')) {
        state.appointmentsOfPatient = null
      }
    })
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  setIsMeetFirst (state, isMeetFirst) {
    state.isMeetFirst = isMeetFirst
  },
  setAppointmentDetail (state, appointmentDetail) {
    state.appointmentDetail = {
      patientId: appointmentDetail.patientId,
      fullNamePatient: appointmentDetail.fullNamePatient,
      status: appointmentDetail.status === 'ACTIVE' ? 'Đang hiện hành' : '' || appointmentDetail.status === 'CANCEL' ? 'Đã huỷ' : '' || appointmentDetail.status === 'FINISH' ? 'Đã sử dụng' : '',
      note: appointmentDetail.note,
      diagnose: appointmentDetail.diagnose,
      dateExamination: appointmentDetail.dateExamination,
      reasonCanceled: appointmentDetail.reasonCanceled,
      dateCanceled: appointmentDetail.dateCanceled,
      medicalInstructions: appointmentDetail.medicalInstructions === null ? null : groupBy(appointmentDetail.medicalInstructions, 'medicalInstructionType', 'medicalInstructionTypeName', 'medicalInstructions')
    }
    console.log('state.appointmentDetail', state.appointmentDetail)
  },
  setAppointmentDateChoose (state, apt) {
    console.log('appointmentDateChoose', apt)
    state.appointmentDateChoose = apt
  },
  setSelectPatient (state, isSelected) {
    state.isSelectPatient = isSelected
  },
  setChoosePatient (state, isChoose) {
    state.isChoosePatient = isChoose
  },
  backToSelectPatientAppointment (state) {
    state.isSelectPatient = false
    state.patientInfoForAppointment = {}
  }, // trở về modal chọn bệnh nhân
  confirmAppointment (state) {
    state.isSelectPatient = false
    state.patientInfoForAppointment = {}
  }, // refresh trạng thái modal chọn bệnh nhân
  setAppointmentMonth (state, appointments) {
    state.appointmentsOfMonth = appointments.map(appointmentMonth => {
      return {
        dateExamination: appointmentMonth.dateExamination, // 20/03/2021
        appointments: appointmentMonth.appointments.map(appointment => {
          return {
            appointmentId: appointment.appointmentId,
            status: appointment.status, // PENDING, ACTIVE, CANCEL
            patientName: appointment.fullNamePatient,
            doctorName: appointment.fullNameDoctor,
            note: appointment.note,
            dateExamination: appointment.dateExamination, // 2021-03-20T16:33:47.927
            reasonCanceled: appointments.reasonCanceled, // 2021-03-20T16:33:47.927
            dateCanceled: appointments.dateCanceled // 2021-03-20T16:33:47.927
          }
        })
      }
    })
  },
  setAppointments (state, appointments) {
    state.appointments = appointments.map(appointmentDate => {
      return {
        dateExamination: appointmentDate.dateExamination, // 20/03/2021
        contractId: appointmentDate.contractId,
        appointments: appointmentDate.appointments.map(appointment => {
          return {
            appointmentId: appointment.appointmentId,
            patientId: appointment.patientId,
            status: appointment.status === 'PENDING' ? 'Chờ xét duyệt' : '' || appointment.status === 'ACTIVE' ? 'Đang hiện hành' : '' || appointment.status === 'CANCEL' ? 'Đã huỷ' : '', // PENDING, ACTIVE, CANCEL
            patientName: appointment.fullNamePatient,
            doctorName: appointment.fullNameDoctor,
            note: appointment.note,
            dateExamination: appointment.dateExamination, // 2021-03-20T16:33:47.927
            reasonCanceled: appointments.reasonCanceled, // 2021-03-20T16:33:47.927
            dateCanceled: appointments.dateCanceled // 2021-03-20T16:33:47.927
          }
        }),
        appointmentGroupBy: groupBy(appointmentDate.appointments, 'fullNamePatient', 'patientName', 'aptCollections')
      }
    })
    console.log('Print all appointment', state.appointments)
  },
  setActiveAppointments (state, activeAppointment) {
    state.activeAppointments = activeAppointment.map(appointmentDate => {
      return {
        dateExamination: appointmentDate.dateExamination, // 20/03/2021
        appointments: appointmentDate.appointments.map(appointment => {
          return {
            appointmentId: appointment.appointmentId,
            status: appointment.status, // PENDING, ACTIVE, CANCEL
            patientName: appointment.fullNamePatient,
            doctorName: appointment.fullNameDoctor,
            note: appointment.note,
            dateExamination: appointment.dateExamination, // 2021-03-20T16:33:47.927
            reasonCanceled: activeAppointment.reasonCanceled, // 2021-03-20T16:33:47.927
            dateCanceled: activeAppointment.dateCanceled // 2021-03-20T16:33:47.927
          }
        })
      }
    })
  },
  setPatientAppointments (state, patientAppointments) {
    state.patientAppointments = patientAppointments.reverse()
    console.log('state.patientAppointments>>>', state.patientAppointments)
  },
  setAppointmentsCurrentDate (state, data) {
    state.appointmentsToday = null
    data.appointments.forEach(appointment => {
      const now = data.now[0].split('-').reverse().join('/')
      if (appointment.dateExamination === now) {
        state.appointmentsToday = appointment
      }
    })
  },
  setAppointmentsCurrentDateEmpty (state) {
    state.appointmentsToday = null
  },
  setAppointmentIdToCreatePrescription (state, appointmentId) {
    state.appointmentIdToCreatePrescription = appointmentId
  },
  setAppointmentIdToCreateVitalSign (state, appointmentId) {
    state.appointmentIdToCreateVitalSign = appointmentId
  },
  setAppointmentOfPatient (state, appointments) {
    state.appointmentsOfPatient = appointments.map(apt => {
      return {
        patientId: apt.patientId,
        fullNamePatient: apt.fullNamePatient,
        fullNameDoctor: apt.fullNameDoctor,
        status: apt.status,
        note: apt.note,
        diagnose: apt.diagnose,
        dateExamination: apt.dateExamination,
        reasonCanceled: apt.reasonCanceled,
        dateCanceled: apt.dateCanceled,
        medicalInstructions: apt.medicalInstructions
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
