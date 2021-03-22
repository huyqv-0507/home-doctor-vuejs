import request from '../utils/request.js'

export default {
  async getNotifications (accountId) {
    return await request({
      method: 'get',
      url: `/Notifications?accountId=${accountId}`
    })
  },
  async seenNotification (notificationId) {
    console.log('notificationID:::', typeof notificationId)
    return await request({
      method: 'put',
      url: `/Notifications?notiId=${notificationId}`
    })
  },
  async sendRequireBand (deviceType, notificationType, senderAccountId, recipientAccountId) {
    console.log('Gửi yêu cầu kết nối thiết bị', { request: { deviceType: deviceType, notificationType: notificationType, senderAccountId: senderAccountId, recipientAccountId: recipientAccountId } })
    return await request({
      method: 'post',
      url: `/Notifications?deviceType=${deviceType}&notificationType=${notificationType}&senderAccountId=${senderAccountId}&recipientAccountId=${recipientAccountId}`
    })
  }
}
