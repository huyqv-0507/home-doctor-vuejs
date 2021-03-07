import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { setToken, getTokenFirebase } from '../../utils/cookie'
import router from '../../router/index.js'
import { parseJwt } from '../../utils/common'

const userRepository = RepositoryFactory.get('userRepository')

const state = () => ({
  status: '',
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
    experience: '' // Số năm kinh nghiệm
  }
})
const getters = {
}
const actions = {
  // Nhận thông tin account (username, password) từ màn hình để đăng nhập
  login ({ commit }, account) {
    userRepository.loginApp(account).then((response) => { // Truy cập repository
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
                router.push('/home') // Chuyển qua trang home
              }
            })
            router.push('/home') // Chuyển qua trang home
          }
        })
      } else if (response.status === 400) {
        console.log('failed')
        commit('loginFailed') // Báo cho mutation thất bại để render view
      }
    }).catch((error) => {
      console.log(error)
      commit('loginFailed')
    })
  }
}
const mutations = {
  // Nhận thông tin người dùng từ database và cập nhật vào store vuex
  loginSuccess (state, user) {
    state.status = 'logged'
    state.user.accountId = user.accountId
    state.user.userId = user.doctorId
    state.user.userName = user.doctorProfile.userName
    state.user.fullName = user.doctorProfile.fullName
    state.user.workLocation = user.doctorProfile.workLocation
    state.user.phone = user.doctorProfile.phone
    state.user.email = user.doctorProfile.email
    state.user.dateOfBirth = user.doctorProfile.dateOfBirth
    state.user.details = user.doctorProfile.details
    state.user.specialization = user.doctorProfile.specialization
    state.user.experience = user.doctorProfile.experience
    console.log('Module users; State: user::: ', state.user)
  },
  loginFailed (state) {
    state.status = 'unLogged'
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
