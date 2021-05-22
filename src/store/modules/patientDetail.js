import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const patientRepository = RepositoryFactory.get('patientRepository')
const state = () => ({
  storiesOfDay: {
    dateCreate: '',
    stories: []
  }, // Hoạt động của bác sĩ và bệnh nhân
  dateStories: []
})
const getters = {}
const actions = {
  getStories ({ commit, rootState }, dateData) {
    // Truyền ngày xuống
    const date = new Date(dateData)
    const data = {
      accountPatientId: parseInt(rootState.medicalInstruction.patientSelected.accountPatientId),
      accountDoctorId: parseInt(rootState.users.user.accountId),
      dateCreated: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
    patientRepository.getStories(data).then(response => {
      if (response.status === 200) {
        commit('setStories', response.data)
      }
    }).catch((error) => {
      commit('setEmptyStories')
      throw error
    })
  },
  getDateStories ({ commit, rootState }) {
    const data = {
      accountPatientId: parseInt(rootState.medicalInstruction.patientSelected.accountPatientId),
      accountDoctorId: parseInt(rootState.users.user.accountId)
    }
    patientRepository.getDateStories(data).then(response => {
      if (response.status === 200) {
        commit('setDateStories', response.data)
      }
    }).catch((error) => {
      commit('setEmptyDateStories')
      throw error
    })
  },
  handleChooseDate ({ dispatch }, date) {
    dispatch('getStories', date)
  },
  navigateStory (state, storyData) {
    // const story = storyData
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  setStories (state, stories) {
    console.log('stories', stories.dateCreate)
    state.storiesOfDay = {
      dateCreated: stories.dateCreate,
      stories: stories.notifications.map(story => {
        let person = ''
        let description = ''
        switch (story.notificationType) {
          case 1:
            person = 'patient'
            description = 'Gửi yêu cầu hợp đồng'
            break
          case 2:
            person = 'patient'
            description = 'Có trạng thái nguy hiểm'
            break
          case 3:
            person = 'patient'
            description = 'Chia sẻ y lệnh'
            break
          case 4:
            person = 'doctor'
            description = 'Chấp thuận hợp đồng'
            break
          case 5:
            person = 'doctor'
            description = 'Từ chối hợp đồng hợp đồng'
            break
          case 6:
            person = 'doctor'
            description = 'Tạo một đơn thuốc mới'
            break
          case 7:
            person = 'doctor'
            description = 'Tạo một lịch đo sinh hiệu mới'
            break
          case 8:
            person = 'doctor'
            description = 'Tạo một cuộc hẹn thăm khám'
            break
          case 9:
            person = 'patient'
            description = 'Ký xác nhận hợp đồng'
            break
          case 10:
            person = 'doctor'
            description = 'Gửi yêu cầu kết nối thiết bị đo'
            break
          case 11:
            person = 'patient'
            description = 'Gửi yêu cầu hợp đồng'
            break
          case 12:
            person = 'patient'
            description = 'Nhận y lệnh từ bác sĩ'
            break
          case 13:
            person = 'doctor'
            description = 'Thay đổi ngày thăm khám'
            break
          case 14:
            person = 'patient'
            description = 'Thay đổi ngày thăm khám'
            break
          case 15:
            break
          case 16:

            break
          case 17:
            person = ''
            description = ''
            break
          case 18:
            person = ''
            description = ''
            break
          case 19:
            person = ''
            description = ''
            break
          case 20:
            person = ''
            description = ''
            break

          default:
            break
        }
        return {
          storyId: story.notificationId,
          title: story.title,
          body: story.body,
          notificationType: story.notificationType,
          medicalInstructionId: story.medicalInstructionId,
          contractId: story.medicalInstructionId,
          appointmentId: story.appointmentId,
          time: story.dateCreated,
          person: person,
          description: description
        }
      })
    }
    console.log('timeline>>>', state.storiesOfDay)
  },
  setEmptyStories (state) {
    state.storiesOfDay = null
  },
  setDateStories (state, dateStories) {
    state.dateStories = []
    dateStories.forEach(dateStory => {
      dateStory.days.forEach(day => {
        const tmpDay = `${dateStory.month.split('/')[1]}-${dateStory.month.split('/')[0]}-${day}`
        state.dateStories.push(tmpDay)
      })
    })
    console.log('state.dateStories', state.dateStories)
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
