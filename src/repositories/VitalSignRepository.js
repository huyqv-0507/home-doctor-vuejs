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
  }
}
