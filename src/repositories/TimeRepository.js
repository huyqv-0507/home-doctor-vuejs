import request from '../utils/request'

export default {
  async getTimeSystem () {
    return await request({
      method: 'get',
      url: '/Times'
    })
  }
}
