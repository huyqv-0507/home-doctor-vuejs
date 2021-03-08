import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const scheduleRepository = RepositoryFactory.get('scheduleRepository')
const state = () => ({
  nextSchedule: {
    scheduleId: 0,
    title: '',
    description: '',
    dateStarted: '',
    dateEnded: '',
    hourStarted: '',
    hourEnded: ''
  }
})
const getters = {}
const actions = {
  getNextSchedule ({ commit }) {
    const nextSchedule = scheduleRepository.getNextSchedule()
    commit('getNextSchedule', nextSchedule)
  }
}
const mutations = {
  getNextSchedule (state, nextSchedule) {
    state.nextSchedule.scheduleId = nextSchedule.scheduleId
    state.nextSchedule.title = nextSchedule.title
    state.nextSchedule.description = nextSchedule.description
    state.nextSchedule.dateStarted = nextSchedule.timeStarted.split('T')[0].split('-').reverse().join('-')
    state.nextSchedule.dateEnded = nextSchedule.timeEnded.split('T')[0].split('-').reverse().join('-')
    state.nextSchedule.hourStarted = nextSchedule.timeStarted.split('T')[1]
    state.nextSchedule.hourEnded = nextSchedule.timeEnded.split('T')[1]
    console.log('nextSchedule:::', state.nextSchedule)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
