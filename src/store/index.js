import Vue from 'vue'
import Vuex from 'vuex'
import contracts from './modules/contracts'
import users from './modules/users'
import patients from './modules/patients'
import modals from './modules/modals'
import medicalInstruction from './modules/medicalInstruction'
import slideshows from './modules/slideshows'
import suggestions from './modules/suggestions'
import appointments from './modules/appointments'
import vitalSign from './modules/vitalSign'
import systemHandler from './modules/systemHandler'
import historyActivities from './modules/historyActivities'
// eslint-disable-next-line quotes
import createPersistedState from 'vuex-persistedstate'
import notifications from './modules/notifications'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    contracts,
    users,
    patients,
    modals,
    medicalInstruction,
    slideshows,
    suggestions,
    notifications,
    appointments,
    vitalSign,
    systemHandler,
    historyActivities
  },
  plugins: [createPersistedState()]
})
