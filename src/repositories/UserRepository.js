/* eslint-disable key-spacing */
/* eslint-disable quotes */
/* eslint-disable quote-props */
import request from '../utils/request.js'
// Tương tác với database
export default {
  // Đăng nhập vào hệ thống.
  async loginApp (account) {
    return await request({
      method: 'POST',
      url: '/Accounts/Login/',
      data: {
        // eslint-disable-next-line quote-props
        // eslint-disable-next-line quotes
        "username": `${account.userName}`,
        // eslint-disable-next-line quote-props
        "password": `${account.password}`
      }
    })
  },
  // Lấy thông tin của bác sĩ
  async getDoctorProfileByDoctorId (doctorId) {
    return await request({
      method: 'get',
      url: `/Doctors/${doctorId}`
    })
  },
  // Lấy thông tin của bác sĩ
  async getPatientProfileByPatientId (patientId) {
    return await request({
      method: 'get',
      url: `/Patients/${patientId}`
    })
  },
  async createTokenFirebase (accountId, token) {
    console.log('createTokenFirebase:', { accountId: parseInt(accountId), token: token })
    var formData = new FormData()
    formData.append('accountId', accountId)
    formData.append('token', token)
    return await request({
      method: 'post',
      url: `/FireBases`,
      data: formData
    })
  }
}
