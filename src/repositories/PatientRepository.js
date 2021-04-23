import request from '../utils/request'
import patientHealth from '../assets/data/patient-health.json'
import patientTracking from '../assets/data/patient-tracking.json'

export default {
  // Lấy tất cả các bệnh nhân mà các bác sĩ đang theo dõi
  async getPatientApproved (doctorId) {
    return await request({
      method: 'get',
      url: `Patients/getPatientTrackingByDoctor?doctorId=${doctorId}`
    })
  },
  // Tạo lịch uống thuốc cho người bệnh
  async createMedicalSchedule (prescription, patientId) {
    return await request({
      method: 'post'
    })
  },
  getPatientHealth () {
    return patientHealth
  },
  getPatientTracking () {
    return patientTracking
  },
  // Lấy thông tin tổng quan của bệnh nhân theo HealthRecordId
  async getOverviewPatient (healthRecordId) {
    return await request({
      method: 'get',
      url: `/HealthRecords/GetOverviewHealthRecordByHRId?healthRecordId=${healthRecordId}`
    })
  },
  // Lấy thông tin điều kiện trong trang tổng quam của bệnh nhân
  async getHealingConditions (healthRecordId, contractId) {
    return await request({
      method: 'get',
      url: `/HealthRecords/GetHealingConditions?healthRecordId=${healthRecordId}&contractId=${contractId}`
    })
  },
  // Lấy thông tin timeline (accountPatientId, accountDoctorId, dateTime)
  async getStories (data) {
    const params = {
      accountPatientId: data.accountPatientId,
      accountDoctorId: data.accountDoctorId,
      dateCreated: data.dateCreated
    }
    return await request({
      method: 'get',
      url: `/Notifications/GetTimeLinePatient?accountPatientId=${params.accountPatientId}&accountDoctorID=${params.accountDoctorId}&dateTime=${params.dateCreated}`
    })
  },
  // Lấy thông tin ngày có hoạt động
  async getDateStories (data) {
    const params = {
      accountPatientId: data.accountPatientId,
      accountDoctorId: data.accountDoctorId
    }
    console.log('Nhung ngay co hoat dong:', params)
    return await request({
      method: 'get',
      url: `/Notifications/GetDateTimeHaveNotification?accountPatientId=${params.accountPatientId}&accountDoctorID=${params.accountDoctorId}`
    })
  },
  async getHealthRecordByPatientId (patientId) {
    return await request({
      method: 'get',
      url: `/HealthRecords/GetHealthRecordByPatientId?patientId=${patientId}&onSystem=true`
    })
  },
  async sendNoteWhenDanger (data) {
    const params = {
      deviceType: 1, // 1 Mobile 2 Web,
      notificationType: 27, // Yêu cầu khẩn cấp bác sĩ
      senderAccountId: data.doctorAccountId,
      recipientAccountId: data.patientAccountId,
      bodyCustom: 'yêu cầu bạn ' + data.bodyCustom
    }
    return await request({
      method: 'post',
      url: `/Notifications?deviceType=${params.deviceType}&notificationType=${params.notificationType}&senderAccountId=${params.senderAccountId}&recipientAccountId=${params.recipientAccountId}&bodyCustom=${params.bodyCustom}`
    })
  },
  async getHealthRecordDetailById (healthRecordId) {
    return await request({
      method: 'get',
      url: `/HealthRecords?healthRecordId=${healthRecordId}`
    })
  }
}
