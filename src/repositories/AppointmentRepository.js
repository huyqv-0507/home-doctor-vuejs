import request from '../utils/request'

export default {
  async getNextSchedule (accountId) {
    return await request({
      method: 'get',
      url: `/Appointments/GetAppointmentForMonth?accountId=${accountId}?status=ACTIVE`
    })
  },
  async requestAppointment (patientAppointment) {
    const date = new Date(patientAppointment.dateExamination)
    const appointmentData = {
      healthRecordId: patientAppointment.healthRecordId,
      note: patientAppointment.note,
      dateExamination: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}T${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`,
      accountDoctorId: patientAppointment.accountDoctorId,
      accountPatientId: patientAppointment.accountPatientId
    }
    console.log('appointmentDatabase', appointmentData)
    return await request({
      method: 'post',
      url: '/Appointments',
      data: appointmentData
    })
  },
  // month format yyyy/MM
  async getAppointmentsByCurrentDate (accountId, year, month) {
    return await request({
      method: 'get',
      url: `/Appointments/GetAppointmentForMonth?accountId=${accountId}&month=${year}/${month}`
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
  },
  async getAppointmentById (appointmentId) {
    return await request({
      method: 'get',
      url: `/Appointments/GetAppointmentById?appointmentId=${appointmentId}`
    })
  },
  async updateAppointment (appointmentUpdate) {
    const date = new Date(appointmentUpdate.dateExamination)
    const params = {
      appointmentId: appointmentUpdate.appointmentId,
      dateExamination: `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}T${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`,
      contractId: appointmentUpdate.contractId
    }
    console.log(params)
    return await request({
      method: 'put',
      url: `/Appointments/UpdateAppointment?appointmentId=${params.appointmentId}&dateExamination=${params.dateExamination}&status=ACTIVE&contractId=${params.contractId}`
    })
  },
  async finishAppointment (appointmentUpdate) {
    const params = {
      appointmentId: appointmentUpdate.appointmentId,
      diagnose: appointmentUpdate.diagnose,
      contractId: appointmentUpdate.contractId
    }
    return await request({
      method: 'put',
      url: `/Appointments/UpdateAppointment?appointmentId=${params.appointmentId}&status=FINISHED&diagnose=${params.diagnose}&contractId=${params.contractId}`
    })
  },
  async getAppointmentsByHRId (healthRecordId) {
    return await request({
      method: 'get',
      url: `/Appointments/GetAppointments?healthRecordId=${healthRecordId}`
    })
  }
}
