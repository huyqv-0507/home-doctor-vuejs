import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { setToken } from '../../helpers/CookieHelper'
import router from '../../router/index.js'

const userRepository = RepositoryFactory.get('userRepository')

const state = () => ({
  status: '',
  user: null
})
const getters = {
}
const actions = {
  login ({ commit }, loginData) {
    userRepository.loginApp().then((response) => {
      if (response.status === 200) {
        commit('loginSuccess', response.data)
        router.push('/home')
      } else {
        commit('loginFailed')
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}
const mutations = {
  loginSuccess (state, user) {
    state.status = 'logged'
    state.user = user[0]
    setToken('123456')
  },
  loginFailed (state) {
    state.status = 'unLogged'
    state.user = null
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
