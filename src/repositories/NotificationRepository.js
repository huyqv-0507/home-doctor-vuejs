import request from '../utils/request.js'

export default {
  async getNotifications (accountId) {
    return await request({
      method: 'get',
      url: `/Notifications?accountId=${accountId}`
    })
  }
}
