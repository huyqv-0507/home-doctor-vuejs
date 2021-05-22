import request from '../utils/request.js'

export default {
  async getNotifications (accountId) {
    return await request({
      method: 'get',
      url: `/Notifications?accountId=${accountId}`
    })
  },
  async seenNotification (notificationId) {
    return await request({
      method: 'put',
      url: `/Notifications?notiId=${notificationId}`
    })
  },
  async sendRequireBand (senderAccountId, recipientAccountId) {
    console.log(`/Notifications?deviceType=2&notificationType=11&senderAccountId=${senderAccountId}&recipientAccountId=${recipientAccountId}`)
    return await request({
      method: 'post',
      url: `/Notifications?deviceType=2&notificationType=11&senderAccountId=${senderAccountId}&recipientAccountId=${recipientAccountId}`
    })
  },
  async getSystemNotifications (accountId) {
    return await request({
      method: 'get',
      url: `/Notifications/GetSystemNotification?accountId=${accountId}`
    })
  }
}
