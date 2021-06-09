import { RepositoryFactory } from '../../repositories/RepositoryFactory'

const timeRepository = RepositoryFactory.get('timeRepository')
const state = () => ({
  timeNow: '',
  timeObj: {
    weekDay: '',
    date: ''
  }
})
const getters = {
}
const actions = {
  async getTimeSystem ({ commit }) {
    await timeRepository.getTimeSystem().then(response => {
      commit('setTimeNow', response.data)
      commit('setTimeObj', response.data)
    }).catch(err => { console.log(err) })
  }
}
const mutations = {
  setTimeNow (state, time) {
    state.timeNow = time
    console.log('Time system', state.timeNow)
  },
  setTimeObj (state, time) {
    const now = new Date(time)
    var weekDay = ''
    if (now.getDay() === 0) {
      // weekDay [0-6]
      weekDay = 'Chủ nhật'
    } else if (now.getDay() === 1) {
      weekDay = 'Thứ hai'
    } else if (now.getDay() === 2) {
      weekDay = 'Thứ ba'
    } else if (now.getDay() === 3) {
      weekDay = 'Thứ tư'
    } else if (now.getDay() === 4) {
      weekDay = 'Thứ năm'
    } else if (now.getDay() === 5) {
      weekDay = 'Thứ sáu'
    } else if (now.getDay() === 6) {
      weekDay = 'Thứ bảy'
    }
    const day = now.getDate() // day [1-31]
    const month = now.getMonth() + 1 // month [0-11]
    const year = now.getFullYear() // year

    const date = `ngày ${day} tháng ${month} năm ${year}`
    state.timeObj = {
      weekDay: weekDay,
      date: date
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
