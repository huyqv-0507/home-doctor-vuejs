import router from '../../router'

const state = () => ({
  tabStatus: {
    overview: false,
    timeline: false,
    vitalSign: false,
    healthRecord: false,
    activity: false
  }
})
const getters = {}
const actions = {
  setDefaultTab ({ commit }) {
    const currentRoute = router.currentRoute
    commit('setCurrentTabActive', currentRoute)
  },
  setTabActive ({ commit }, tab) {
    commit('setActiveTab', tab.name)
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  setCurrentTabActive (state, currentRoute) {
    switch (currentRoute) {
      case '/patient-detail-page':
        state.tabStatus = {
          overview: true,
          timeline: false,
          vitalSign: false,
          healthRecord: false,
          activity: false
        }
        break
      case '/patient-detail-page/overview':
        state.tabStatus = {
          overview: true,
          timeline: false,
          vitalSign: false,
          healthRecord: false,
          activity: false
        }
        break
      case '/patient-detail-page/timeline':
        state.tabStatus = {
          overview: false,
          timeline: true,
          vitalSign: false,
          healthRecord: false,
          activity: false
        }
        break
      case '/patient-detail-page/vital-sign-detail':
        state.tabStatus = {
          overview: false,
          timeline: false,
          vitalSign: true,
          healthRecord: false,
          activity: false
        }
        break
      case '/patient-detail-page/health-record':
        state.tabStatus = {
          overview: false,
          timeline: false,
          vitalSign: false,
          healthRecord: true,
          activity: false
        }
        break
      case '/patient-detail-page/activity':
        state.tabStatus = {
          overview: false,
          timeline: false,
          vitalSign: false,
          healthRecord: false,
          activity: true
        }
        break

      default:
        break
    }
  },
  setActiveTab (state, tabName) {
    switch (tabName) {
      case 'overview':
        state.tabStatus = {
          overview: true,
          timeline: false,
          vitalSign: false,
          healthRecord: false,
          activity: false
        }
        router.push('/patient-detail-page/overview')
        break
      case 'timeline':
        state.tabStatus = {
          overview: false,
          timeline: true,
          vitalSign: false,
          healthRecord: false,
          activity: false
        }
        router.push('/patient-detail-page/timeline')
        break
      case 'vital-sign':
        state.tabStatus = {
          overview: false,
          timeline: false,
          vitalSign: true,
          healthRecord: false,
          activity: false
        }
        router.push('/patient-detail-page/vital-sign-detail')
        break
      case 'health-record':
        state.tabStatus = {
          overview: false,
          timeline: false,
          vitalSign: false,
          healthRecord: true,
          activity: false
        }
        router.push('/patient-detail-page/health-record')
        break
      case 'activity':
        state.tabStatus = {
          overview: false,
          timeline: false,
          vitalSign: false,
          healthRecord: false,
          activity: true
        }
        router.push('/patient-detail-page/activity')
        break

      default:
        break
    }
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
