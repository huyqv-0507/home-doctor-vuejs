import { RepositoryFactory } from '../../repositories/RepositoryFactory'
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
        console.log('notifications:::', response.data)
        commit('getNotifications', response.data)
      }
    })
  },
  showNotify ({ commit }) {
    commit('showNotify')
  },
  handleShowNotification ({ commit }) {
    commit('showNotify')
  },
  seeNotify ({ commit }) {
    commit('seeNotify')
  }
}
const mutations = {
  newMessage (state) {
    state.numBadge = state.numBadge + 1
  },
  seeNotify (state) {
    state.numBadge = state.numBadge - 1
  },
  getNotifications (state, notifications) {
    var tmpBadge = 0
    notifications.forEach(e => {
      if (e.status === false) {
        tmpBadge = tmpBadge + 1
      }
    })
    state.numBadge = tmpBadge
    state.notifications = notifications.map(n => {
      return {
        title: n.title,
        description: n.body,
        contractId: n.contractId
      }
    })
    console.log('state noti:::', notifications)
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
