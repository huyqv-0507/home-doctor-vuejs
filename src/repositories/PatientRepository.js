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
  }
}
