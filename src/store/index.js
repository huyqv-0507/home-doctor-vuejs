import Vue from 'vue'
import Vuex from 'vuex'
import contracts from './modules/contracts'
import users from './modules/users'
import patients from './modules/patients'
import modals from './modules/modals'
import medicalInstruction from './modules/medicalInstruction'
import slideshows from './modules/slideshows'
import suggestions from './modules/suggestions'
import schedules from './modules/schedules'
import appointments from './modules/appointments'
import vitalSign from './modules/vitalSign'
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
    schedules,
    notifications,
    appointments,
    vitalSign
  },
  plugins: [createPersistedState()]
})
