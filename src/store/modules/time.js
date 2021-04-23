import { RepositoryFactory } from '../../repositories/RepositoryFactory'

const timeRepository = RepositoryFactory.get('timeRepository')
const state = () => ({
  timeNow: ''
})
const getters = {
}
const actions = {
  async getTimeSystem ({ commit }) {
    await timeRepository.getTimeSystem().then(response => {
      commit('setTimeNow', response.data)
    }).catch(err => { console.log(err) })
  }
}
const mutations = {
  setTimeNow (state, time) {
    state.timeNow = time
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
