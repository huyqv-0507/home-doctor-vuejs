import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Message } from 'element-ui'
import { toDateTitle, toTimeAgo } from '../../utils/common'
import router from '../../router'
const notificationRepository = RepositoryFactory.get('notificationRepository')
/*
  notificationTypeId:
    1: Bác sĩ có 1 hợp đồng theo dõi mới từ bệnh nhân
    2: Trong danh sách theo dõi có trạng thái bất thường
    3: Trong danh sách theo dõi đã chia sẻ y lệnh của họ ...
    4: Hợp đồng yêu cầu theo dõi của bạn được chấp thuận
    5: Hợp đồng yêu cầu theo dõi bị từ chối từ...
    6: Bạn có 1 lịch uống thuốc mới từ bác sĩ
    7: Bạn có 1 lịch đo sinh hiệu mới từ bác sĩ
    8: Bạn có 1 cuộc hẹn thăm khám với bác sĩ
    9: Hợp đồng theo dõi giữa bác sĩ và bệnh nhân đã được chấp thuận
    10: Đã không chấm thuận hợp đồng với bác sĩ
    11: Bạn có yêu cầu kết nối thiết bị đồng hồ thông minh
    12: Bạn có yêu cầu chia sẻ thêm phiếu y lệnh
    13: Đã xác nhận về cuộc hẹn với bác sĩ
    14: Đã huỷ cuộc hẹn với bác sĩ
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
    var notificationTypeId = parseInt(notificationData.data.notiTypeId)
    switch (notificationTypeId) {
      case 1:
        commit('newMessageNotification')
        dispatch('notifications/getNotifications', null, { root: true }) // Cập nhật danh sách bệnh nhân đang theo dõi
        break
      case 2:
        dispatch('systemHandler/newMessageSystemNotification', notificationData, { root: true })
        break
      case 3:

        break
      case 4:
        commit('newMessageNotification')
        dispatch('notifications/getNotifications', null, { root: true }) // Cập nhật danh sách bệnh nhân đang theo dõi
        break
      case 5:
        commit('newMessageNotification')
        dispatch('notifications/getNotifications', null, { root: true }) // Cập nhật danh sách bệnh nhân đang theo dõi

        break
      case 6:

        break
      case 7:

        break
      case 8:

        break
      case 9:
        commit('newMessageNotification')
        dispatch('patients/getPatientApproved', null, { root: true }) // Cập nhật danh sách bệnh nhân đang theo dõi
        dispatch('notifications/getNotifications', null, { root: true }) // Cập nhật danh sách bệnh nhân đang theo dõi
        break
      case 10:

        break
      case 11:

        break
      case 12:

        break
      case 13:

        break
      case 14:
        commit('newMessageNotification')
        break
      case 15:
        dispatch('systemHandler/newMessageSystemNotification', notificationData, { root: true })
        break
      case 16:

        break
      case 17:
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
  showNotify ({ commit, state, dispatch }) {
    commit('showNotify')
  },
  handleShowNotification ({ commit, rootState }) {
    rootState.systemHandler.isShowSystemNotification = false // Tắt notification của hệ thống
    commit('showNotify')
  },
  // Câp nhât trạng thái notification
  seeNotify ({ commit, dispatch }, notificationData) {
    console.log('seeNotify', notificationData)
    notificationRepository.seenNotification(notificationData.notificationId).then(response => {
      if (response.status === 204) {
        commit('seeNotify', notificationData)
      }
    })
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
  handleNotificationLink ({ commit, dispatch, rootState, rootGetters }, notificationData) {
    console.log('handleNotificationLink - notificationData', notificationData)
    var notificationTypeId = notificationData.notification.notificationType
    var contract = null
    switch (notificationTypeId) {
      case 1: // Check trạng thái để chuyển trang
        contract = rootGetters['contracts/getContractStatusById'](parseInt(notificationData.notification.contractId))
        console.log(contract)
        switch (contract.status) {
          case 'PENDING':
            router.push({
              name: 'request-detail',
              params: { contractId: notificationData.notification.contractId }
            })
            break
          case 'ACTIVE':
            router.push('/home/actived-contract').catch(error => {
              if (error.name !== 'NavigationDuplicated') {
                throw error
              }
            })
            break
          case 'APPROVED':
            router.push('/home/approved-contract').catch(error => {
              if (error.name !== 'NavigationDuplicated') {
                throw error
              }
            })
            break

          default:
            break
        }
        break
      case 9:
        contract = rootGetters['contracts/getContractStatusById'](parseInt(notificationData.notification.contractId))
        switch (contract.status) {
          case 'FINISHED': {
            console.log('Contract is finished')
            break
          }
          case 'ACTIVE': {
            var patientApproved = rootGetters['patients/getPatientApproveByContract'](parseInt(notificationData.notification.contractId))
            commit('medicalInstruction/setPatientSelected', patientApproved, { root: true })
            dispatch('patients/goToPatientDetail', patientApproved, { root: true })
            break
          }
        }
    }
    dispatch(
      'notifications/seeNotify',
      {
        dateIndex: notificationData.dateIndex,
        notificationId: notificationData.notification.notificationId
      },
      { root: true }
    )
  }
}
const mutations = {
  // cập nhật trạng thái notification khi thông báo firebase tới
  newMessageNotification (state) {
    state.numBadge = state.numBadge + 1
  },
  seeNotify (state, notificationData) {
    if (state.numBadge === 0) {
      state.numBadge = 0
    } else {
      state.numBadge = state.numBadge - 1
    }
    var notificationIndex = state.notifications[notificationData.dateIndex].notifications.findIndex(n => n.notificationId === notificationData.notificationId)

    state.notifications[notificationData.dateIndex].notifications[notificationIndex].status = true
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
            timeAgo: toTimeAgo(notification.timeAgo),
            appointmentId: notification.appointmentId
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
