import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Message } from 'element-ui'
import { toDateTitle, toTimeAgo } from '../../utils/common'
const notificationRepository = RepositoryFactory.get('notificationRepository')

const state = () => ({
  numBadge: 0,
  isShowNotify: false,
  notifications: []
})
const getters = {}
const actions = {
  newMessage ({ commit, dispatch }) {
    commit('newMessage')
    dispatch('notifications/getNotifications', null, { root: true })
  },
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
  }
}
const mutations = {
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
