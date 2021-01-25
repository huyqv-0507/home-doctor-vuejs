import request from '../utils/request.js'

export default {
  async loginApp () {
    return await request({
      method: 'GET',
      url: '/users'
    })
  },
  async getDoctorProfile () {
    return await request({
      method: 'get',
      url: '/users'
    })
  }
}
