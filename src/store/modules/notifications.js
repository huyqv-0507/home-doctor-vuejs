import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Message } from 'element-ui'
import { toDateTitle, toTimeAgo } from '../../utils/common'
const notificationRepository = RepositoryFactory.get('notificationRepository')
/*
  notificationTypeId:
    1:
  historyType:
    1:
*/
const state = () => ({
  numBadge: 0, // Số lượng thông báo
  isShowNotify: false, // Quản lý khung thông báo show/hide
  notifications: [] // Danh sách thông báo
})
const getters = {}
const actions = {
  // Cập nhật lại trạng thái khi thông báo từ firebase tới
  newMessage ({ commit, dispatch }, notificationData) {
    commit('newMessage')
    dispatch('notifications/getNotifications', null, { root: true })
    var notificationTypeId = notificationData.notificationType
    switch (notificationTypeId) {
      case 1:

        break
      case 2:

        break
      case 3:

        break
      case 4:

        break
      case 5:

        break
      case 6:

        break
      case 7:

        break
      case 8:

        break
      case 9:
        dispatch('patients/getPatientApproved', null, { root: true }) // Cập nhật danh sách bệnh nhân đang theo dõi
        break

      default:
        break
    }
  },
  // Lấy tất cả notification bằng accountId
  getNotifications ({ commit, rootState }) {
    notificationRepository.getNotifications(rootState.users.user.accountId).then(response => {
      if (response.status === 200) {
        commit('setNotifications', response.data)
      }
    })
  },
  showNotify ({ commit }) {
    commit('showNotify')
  },
  handleShowNotification ({ commit }) {
    commit('showNotify')
  },
  // Câp nhât trạng thái notification
  seeNotify ({ commit, dispatch }, notification) {
    notificationRepository.seenNotification(notification.notificationId).then(response => {
      if (response.status === 204) {
      }
    })
    commit('seeNotify', notification)
  },
  sendRequireBand ({ commit, rootState }) {
    var info = {
      deviceType: 1,
      notificationType: 11,
      senderAccountId: parseInt(rootState.users.user.accountId),
      recipientAccountId: rootState.patients.patientDetailUsing.accountPatientId
    }
    console.log(info)
    notificationRepository.sendRequireBand(
      info.deviceType,
      info.notificationType,
      info.senderAccountId,
      info.recipientAccountId).then(response => {
      if (response.status === 200) {
        Message.success({ message: 'Bạn đã đề nghị bệnh nhân kích hoạt thiết bị. Vui lòng chờ.', showClose: true })
      }
    }).catch((error) => { console.log(error) })
  },
  // Quản lý chuyển link khi click vào xem notification
  // notificationData { dateIndex, notification(notificationId, title, body, status, notificationType, contractId, medicalInstructionId, timeAgo) }
  handleNotificationLink ({ commit, dispatch }, notificationData) {
    dispatch('seeNotify', notificationData) // Cập nhật trạng thái đã xem cho notification
    var notificationTypeId = notificationData.notificationTypeId
    switch (notificationTypeId) {
      case 1:

        break

      default:
        break
    }
  }
}
const mutations = {
  // cập nhật trạng thái khi thông báo firebase tới
  newMessage (state) {
    state.numBadge = state.numBadge + 1
  },
  seeNotify (state, notification) {
    if (state.numBadge === 0) {
      state.numBadge = 0
    } else {
      state.numBadge = state.numBadge - 1
    }
    var notificationIndex = state.notifications[notification.dateIndex].notifications.findIndex(n => n.notificationId === notification.notificationId)

    console.log('sdfd:', state.notifications[notification.dateIndex].notifications[notificationIndex].status)
    state.notifications[notification.dateIndex].notifications[notificationIndex].status = true
  },
  setNotifications (state, notifications) {
    var tmpBadge = 0
    state.notifications = notifications.map(n => {
      return {
        dateCreated: toDateTitle(n.dateCreate),
        notifications: n.notifications.map(notification => {
          if (notification.status === false) {
            tmpBadge = tmpBadge + 1
          }
          return {
            notificationId: notification.notificationId,
            title: notification.title,
            description: notification.body,
            contractId: notification.contractId,
            notificationType: notification.notificationType,
            status: notification.status,
            medicalInstructionId: notification.medicalInstructionId,
            timeAgo: toTimeAgo(notification.timeAgo)
          }
        })
      }
    })
    state.numBadge = tmpBadge
    console.log('Notifications:::', state.notifications)
  },
  showNotify (state) {
    state.isShowNotify = !state.isShowNotify
    console.log('isShowNotify', state.isShowNotify)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
