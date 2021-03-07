import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const scheduleRepository = RepositoryFactory.get('scheduleRepository')
const state = () => ({
  nextSchedule: {}
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
    state.nextSchedule = nextSchedule
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
