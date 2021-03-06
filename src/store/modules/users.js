import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { setToken, getTokenFirebase } from '../../utils/cookie'
import router from '../../router/index.js'
import { parseJwt, toTimeAgo, toDateTitle } from '../../utils/common'

const userRepository = RepositoryFactory.get('userRepository')

const state = () => ({
  status: '', // Trạng thai login
  user: {
    accountId: '',
    userId: '', // Id của bác sĩ
    userName: '', // Tên đăng nhập vào hệ thống của bác sĩ
    fullName: '', // Họ tên của bác sĩ
    workLocation: '', // Nơi làm việc của bác sĩ
    phone: '', // Số điện thoại của bác sĩ
    email: '', // Email của bác sĩ
    dateOfBirth: '', // Ngày sinh của bác sĩ
    details: '', // Note của bác sĩ
    specialization: '', // Chuyên khoa của bác sĩ
    experience: '', // Số năm kinh nghiệm
    address: ''
  }, // Thông tin bác sĩ
  activities: [] // Nhật ký hoạt động của bác sĩ
})
const getters = {
}
const actions = {
  // Nhận thông tin account (username, password) từ màn hình để đăng nhập
  async login ({ commit }, account) {
    await userRepository.loginApp(account).then((response) => { // Truy cập repository
      if (response.status === 200) { // Thành công
        setToken(`${response.data.token}`) // Lưu lại token để sử dụng những chức năng khác
        var tokenInfo = parseJwt(response.data.token)
        userRepository.getDoctorProfileByDoctorId(tokenInfo.doctorId).then((response) => {
          if (response.status === 200) {
            commit('loginSuccess', {
              doctorProfile: response.data,
              accountId: tokenInfo.accountId,
              doctorId: tokenInfo.doctorId
            }) // Báo cho mutation thành công để render view
            userRepository.createTokenFirebase(tokenInfo.accountId, getTokenFirebase()).then(response => {
              if (response.status === 201) {
                //  router.push('/home') // Chuyển qua trang home
              }
            }).catch()
            router.push('/home')
          }
        })
      } else if (response.status === 400) {
        console.log('failed')
        commit('loginFailed') // Báo cho mutation thất bại để render view
      }
    }).catch((error) => {
      console.log('err at user - login', error)
      commit('loginFailed')
    })
  },
  // Lấy tất cả nhật ký hoạt động
  getActivities ({ commit, rootState }) {
    userRepository.getActivities(rootState.users.user.accountId).then(response => {
      if (response.status === 200) {
        commit('setActivities', response.data)
      }
    })
  },
  async handleLogout ({ rootState, dispatch }) {
    rootState.notifications.notifications = []
    rootState.notifications.numBadge = 0
    rootState.medicalInstruction.prescriptionView = null
    rootState.medicalInstruction.vitalSignView = null
    rootState.vitalSign.patientOptions = null
    router.push('/')
    await userRepository.removeTokenFirebase(parseInt(rootState.users.user.accountId)).then(response => {
      console.log('logout success', response.data)
    }).catch((error) => {
      console.log('logout failed', error)
    })
    await dispatch('appointments/clearState', null, { root: true })
    await dispatch('contracts/clearState', null, { root: true })
    await dispatch('historyActivities/clearState', null, { root: true })
    await dispatch('medicalInstruction/clearState', null, { root: true })
    await dispatch('modals/clearState', null, { root: true })
    await dispatch('notifications/clearState', null, { root: true })
    await dispatch('patientDetail/clearState', null, { root: true })
    await dispatch('patients/clearState', null, { root: true })
    await dispatch('slideshows/clearState', null, { root: true })
    await dispatch('suggestions/clearState', null, { root: true })
    await dispatch('systemHandler/clearState', null, { root: true })
    await dispatch('tabs/clearState', null, { root: true })
    await dispatch('vitalSign/clearState', null, { root: true })
    await dispatch('users/clearState', null, { root: true })
    await dispatch('image/clearState', null, { root: true })
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  // Nhận thông tin người dùng từ database và cập nhật vào store vuex
  loginSuccess (state, user) {
    state.status = 'logged'
    state.user.accountId = user.accountId
    state.user.userId = user.doctorId
    state.user.userName = user.doctorProfile.username
    state.user.fullName = user.doctorProfile.fullName
    state.user.workLocation = user.doctorProfile.workLocation
    state.user.phone = user.doctorProfile.phone
    state.user.email = user.doctorProfile.email
    state.user.dateOfBirth = user.doctorProfile.dateOfBirth.split('T')[0].split('-').reverse().join('-')
    state.user.details = user.doctorProfile.details
    state.user.specialization = user.doctorProfile.specialization
    state.user.experience = user.doctorProfile.experience
    console.log('Module users; State: user::: ', state.user)
  },
  loginFailed (state) {
    state.user = {}
    state.status = 'unLogged'
  },
  setActivities (state, activities) {
    state.activities = activities.map(activity => {
      return {
        dateCreated: toDateTitle(activity.dateCreate),
        activities: activity.histories.map(a => {
          return {
            title: a.title.trim(),
            body: a.body,
            contractId: a.contractId,
            historyType: a.historyType,
            medicalInstructionId: a.medicalInstructionId,
            timeAgo: toTimeAgo(a.timeAgo)
          }
        })
      }
    })
    console.log('Activities history:::', state.activities)
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
