import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Notification } from 'element-ui'
const patientRepository = RepositoryFactory.get('patientRepository')

const state = () => ({
  isSelectPatient: false, // Trạng thái chọn bệnh nhân khi tạo cuộc hẹn
  patientInfoForAppointment: {
    contractId: 0,
    accountPatientId: 0,
    accountDoctorId: 0,
    note: '',
    dateExamination: ''
  }, // Thông tin bệnh nhân để tạo cuộc hẹn
  appointmentsOfMonth: [], // Danh sách cuộc hẹn trong 1 tháng
  appointments: [] // Tất cả các cuộc hẹn của bác sĩ
})
const getters = {}
const actions = {
  // Chọn bệnh nhân để tạo cuộc hẹn trong modal chọn bệnh nhân
  selectPatientAppointment ({ commit }, patientData) {
    commit('selectPatientAppointment', patientData)
  },
  // Trở về bươc chọn bệnh nhân
  backToSelectPatientAppointment ({ commit }) {
    commit('backToSelectPatientAppointment')
  },
  // Xác nhận tạo cuộc hẹn
  confirmAppointment ({ commit, state, rootState, dispatch }, appointmentData) {
    state.patientInfoForAppointment.accountDoctorId = parseInt(rootState.users.user.accountId)
    state.patientInfoForAppointment.dateExamination = new Date(appointmentData.dateExamination)
    state.patientInfoForAppointment.note = appointmentData.note
    rootState.modals.isVisibleAppointmentPatients = false // Đóng modal lịch tái khám
    patientRepository.requestAppointment(state.patientInfoForAppointment).then(response => {
      if (response.status === 200) {
        Notification.success({ title: 'Thông báo', message: 'Bạn đã yêu cầu lịch tái khám thành công. Vui lòng đợi bệnh nhân xác nhận', duration: 6000 })
      }
    }).catch((error) => {
      Notification.error({ title: 'Thông báo', message: 'Bạn đã yêu cầu lịch tái khám thất bại. Vui lòng liên hệ Duy Phú.', duration: 6000 })
      console.log(error)
    })
    commit('confirmAppointment')
    dispatch('getAppointments')
  },
  // Lấy tất cả các cuộc hẹn trong 1 tháng của cá nhân bác sĩ
  getAppointmentsByMonth ({ commit, rootState }) {
    var accountId = rootState.users.user.accountId
    const now = new Date()
    var currentMonth = `${now.getFullYear()}/${now.getMonth() + 1}`
    patientRepository.getAppointmentsByMonth(accountId, currentMonth).then(response => {
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
    patientRepository.getAppointments(accountId).then(response => {
      if (response.status === 200) {
        commit('setAppointments', response.data)
      }
    }).catch((error) => {
      console.log('getAppointments error' + error)
    })
  }
}
const mutations = {
  selectPatientAppointment (state, patient) {
    state.isSelectPatient = true
    state.patientInfoForAppointment.contractId = patient.contractId
    state.patientInfoForAppointment.accountPatientId = patient.accountPatientId
  }, // qua modal tạo cuộc hẹn
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
    state.appointments = appointments.map(appointmentMonth => {
      return {
        dateExamination: appointmentMonth.dateExamination, // 20/03/2021
        appointments: appointmentMonth.appointments.map(appointment => {
          return {
            appointmentId: appointment.appointmentId,
            status: appointment.status, // PENDING, ACTIVE, CANCEL
            note: appointment.note,
            dateExamination: appointment.dateExamination, // 2021-03-20T16:33:47.927
            reasonCanceled: appointments.reasonCanceled, // 2021-03-20T16:33:47.927
            dateCanceled: appointments.dateCanceled // 2021-03-20T16:33:47.927
          }
        })
      }
    })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
