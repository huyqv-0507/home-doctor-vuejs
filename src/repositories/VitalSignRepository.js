import deviceSupportServices from '../assets/data/device-support-services.json'
import request from '../utils/request'

export default {
  getDeviceSupportServices () {
    return deviceSupportServices
  },
  async getVitalSignOverviews () {
    return await request({
      method: 'get',
      url: '/VitalSign'
    })
  }, // Lấy danh sách thông tin vital sign gồm status của bệnh nhân
  async insertVitalSign (vitalSign) {
    return await request({
      method: 'post',
      url: '/VitalSigns',
      data: vitalSign
    })
  },
  async getVitalSignHealthPatient (data) {
    console.log('data', data)
    const params = {
      patientId: data.patientId,
      healthRecordId: data.healthRecordId,
      dateTime: data.dateTime
    }
    return await request({
      method: 'get',
      url: `/VitalSigns/GetVitalSignValueByPatientId?patientId=${params.patientId}&healthRecordId=${params.healthRecordId}&dateTime=${params.dateTime}`
    })
  },
  async getVitalSigns (healthRecordId) {
    return await request({
      method: 'get',
      url: `/VitalSigns/GetVitalSignScheduleByHRId?healthRecordId=${healthRecordId}`
    })
  },
  async getVitalSignValueByMiId (medicalInstructionId, patientId) {
    console.log('getVitalSignValueByMiId', medicalInstructionId, patientId)
    return await request({
      method: 'get',
      url: `/VitalSigns/GetVitalSignValueByMIId?medicalInstructionId=${medicalInstructionId}&patientId=${patientId}`
    })
  },
  async getVitalSignSchedulePatient (patientId) {
    return await request({
      method: 'get',
      url: `/VitalSigns?patientId=${patientId}&status=active`
    })
  },
  async getVitalSignValueByHRId (healthRecordId) {
    return await request({
      method: 'get',
      url: `/VitalSigns/GetVitalSignScheduleByHRId?healthRecordId=${healthRecordId}`
    })
  },
  async getVitalSignTypes () {
    return await request({
      method: 'get',
      url: '/VitalSigns/GetVitalSignsType'
    })
  },
  async getAllVitalSignShare () {
    return await request({
      method: 'get',
      url: '/VitalSigns/GeVitalSignShareByDate'
    })
  }
}
