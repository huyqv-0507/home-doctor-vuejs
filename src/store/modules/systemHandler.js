import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { toTimeAgo, toDateTitle } from '../../utils/common'
import { MessageBox } from 'element-ui'
const notificationRepository = RepositoryFactory.get('notificationRepository')

const state = () => ({
  isShowSystemNotification: false, // Quản lý popup của system notification
  systemNotifications: [], // Danh sách thông báo của hệ thống
  numBadgeSystem: 0, // Số thông báo chưa đọc của hệ thống,
  routeFrom: 'HOME'
})
const getters = {}
const actions = {
  async initState ({ dispatch, rootState }) {
    await dispatch('patients/getPatientApproved', null, { root: true })
    await dispatch('notifications/getNotifications', null, { root: true })
    await dispatch('systemHandler/getSystemNotifications', null, { root: true })
    await dispatch('appointments/getAppointmentsByCurrentDate', null, { root: true })
  },
  // Lấy tất cả notification của hệ thống bằng accountId
  getSystemNotifications ({ commit, rootState }) {
    notificationRepository.getSystemNotifications(rootState.users.user.accountId).then(response => {
      if (response.status === 200) {
        commit('setSystemNotifications', response.data)
      }
    }).catch((error) => {
      if (error.message.includes('404')) {
        commit('setSystemNotificationsEmpty')
      }
    })
  },
  handleShowSystemNotification ({ commit, rootState }) {
    rootState.notifications.isShowNotify = false // Tắt popup notification bình thường của user
    commit('setStateShowSystemNotification')
  },
  // Chuyển link khi click vào item trong system notification
  handleSystemNotificationLink ({ commit, dispatch, rootGetters }, systemNotificationData) {
    console.log('systemNotificationData', systemNotificationData)
    var notificationTypeId = systemNotificationData.notification.notificationType
    var contract = ''
    switch (notificationTypeId) {
      case 2: // Chuyển đến trang thông tin bất thường của bệnh nhân
        console.log('Chuyển đến trang thông tin bất thường của bênh nhân')
        break
      case 15: // Cập nhật patient được chọn, sau đó mở form tạo cuộc hẹn cho bệnh nhân đó
        // var patientApproved = rootGetters['patients/getPatientApproveByContract'](8047)
        var patientApproved = rootGetters['patients/getPatientApproveByContract'](parseInt(systemNotificationData.notification.contractId))
        console.log('patientApprovedId>>>>', patientApproved)
        commit('medicalInstruction/setPatientSelected', patientApproved, { root: true })
        dispatch('modals/openSelectMedicalInstructionModal', null, { root: true })
        break
      case 17: // Chuyển đến trang bệnh nhân bình thường

        break
      case 16: //  Tài khoản bị lock
        contract = rootGetters['contracts/getContractStatusById'](parseInt(systemNotificationData.notification.contractId))
        switch (contract.status) {
          case 'LOCKED': {
            MessageBox.alert('Hợp đồng giữa bác và bệnh nhân đã bị khoá vì bác sĩ đã không ra y lệnh cho bệnh nhân sau 4 ngày hợp đồng có hiệu lực', 'Cảnh báo', { confirmButtonText: 'Đồng ý' })
            break
          }
          default:
            break
        }
        break

      default:
        break
    }
    commit('setStateShowSystemNotification')
    dispatch('systemHandler/seeSystemNotification', {
      dateIndex: systemNotificationData.dateIndex,
      notificationId: systemNotificationData.notification.notificationId
    }, { root: true }) // Câp nhật trạng thái đã xem cho thông báo
  },
  // Cập nhât các trạng thái khi thông báo của hệ thống tới
  newMessageSystemNotification ({ commit, rootState, dispatch }, systemNotificationData) {
    commit('newMessageSystemNotification')
    var notificationType = parseInt(systemNotificationData.data.notiTypeId)
    switch (notificationType) {
      case 2: // Thông báo trạng thái bất thường của bệnh nhân
        dispatch('patients/getPatientApproved', null, { root: true })
        commit('newMessageSystemNotification')
        dispatch('systemHandler/getSystemNotifications', null, { root: true })
        break
      case 15: // Thông báo nhắc nhở hoạt động đầu tiên sau khi kí hợp đồng
        commit('newMessageSystemNotification')
        dispatch('systemHandler/getSystemNotifications', null, { root: true })
        dispatch('patients/getPatientApproved', null, { root: true })
        break
      case 16: // Thông báo bệnh nhân trở về trạng thái bình thường
        commit('newMessageSystemNotification')
        dispatch('systemHandler/getSystemNotifications', null, { root: true })
        dispatch('patients/getPatientApproved', null, { root: true })
        break
      case 17: // Thông báo bệnh nhân trở về trạng thái bình thường
        commit('newMessageSystemNotification')
        dispatch('systemHandler/getSystemNotifications', null, { root: true })
        dispatch('patients/getPatientApproved', null, { root: true })
        break

      default:
        break
    }
  },
  // Gồm notificationId và dateIndex
  seeSystemNotification ({ commit }, notificationData) {
    notificationRepository.seenNotification(notificationData.notificationId).then(response => {
      if (response.status === 204) {
        commit('seeSystemNotify', notificationData)
      }
    })
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  newMessageSystemNotification (state) {
    state.numBadgeSystem = state.numBadgeSystem + 1
  },
  // Set trạng thái popup system notification (đóng/mở)
  setStateShowSystemNotification (state) {
    state.isShowSystemNotification = !state.isShowSystemNotification
  },
  // Set trạng thái của system notification
  setSystemNotifications (state, systemNotifications) {
    let tmpBadge = 0
    state.systemNotifications = systemNotifications.map(systemNotification => {
      return {
        dateCreated: toDateTitle(systemNotification.dateCreate),
        notifications: systemNotification.notifications.map(notification => {
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
    state.numBadgeSystem = tmpBadge
    console.log('Notifications system:::', state.systemNotifications)
  },
  setSystemNotificationsEmpty (state) {
    state.numBadgeSystem = 0
    state.systemNotifications = null
  },
  setNumBadgeSystem (state) {
    state.numBadgeSystem = state.numBadgeSystem - 1
  }, // Giảm số thông báo chưa xem xuống -1
  seeSystemNotify (state, notificationData) {
    if (state.numBadgeSystem === 0) {
      state.numBadgeSystem = 0
    } else {
      state.numBadgeSystem = state.numBadgeSystem - 1
    }
    var notificationIndex = state.systemNotifications[notificationData.dateIndex].notifications.findIndex(n => n.notificationId === notificationData.notificationId)
    state.systemNotifications[notificationData.dateIndex].notifications[notificationIndex].status = true
  },
  clearState (state) {
    state = () => ({})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
