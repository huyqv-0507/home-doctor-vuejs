import request from '../utils/request'

export default {
  async getNextSchedule (accountId) {
    return await request({
      method: 'get',
      url: `/Appointments/GetAppointmentForMonth?accountId=${accountId}?status=ACTIVE`
    })
  },
  async requestAppointment (patientAppointment) {
    return await request({
      method: 'post',
      url: '/Appointments',
      data: {
        contractId: patientAppointment.contractId,
        note: patientAppointment.note,
        dateExamination: patientAppointment.dateExamination,
        accountDoctorId: patientAppointment.accountDoctorId,
        accountPatientId: patientAppointment.accountPatientId
      }
    })
  },
  // month format yyyy/MM
  async getAppointmentsByMonth (accountId, month) {
    return await request({
      method: 'get',
      url: `/Appointments/GetAppointmentForMonth?accountId=${accountId}&month=${month}`
    })
  },
  //
  async getAppointments (accountId) {
    return await request({
      method: 'get',
      url: `/Appointments/GetAppointmentForMonth?accountId=${accountId}`
    })
  }
}
