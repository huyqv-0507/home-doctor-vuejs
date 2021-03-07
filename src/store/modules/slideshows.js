const state = () => ({
  medicalInstructionSharedIndex: null, // Vị trí hình ảnh bác sĩ muốn xem,
  medicalInstructionShareds: [],
  visibleAllImages: false
})
const getters = {}
const actions = {
  showAllImages ({ commit }) {
    console.log('showAllImagesshowAllImagesshowAllImages')
    commit('showAllImages')
  },
  closeAllImages ({ commit }) {
    commit('closeAllImages')
  },
  // Bác sĩ chọn ảnh để xem
  selectImg ({ commit, rootState, state }, imgIndex) {
    console.log('selectImg: ', imgIndex)
    // rootState.contracts.requestDetail.medicalInstructionShared.index = imgIndex
    // console.log('root index:', rootState.contracts.requestDetail.medicalInstructionShared.index)
    state.medicalInstructionShareds = rootState.contracts.requestDetail.medicalInstructionShared.map(mis => {
      return {
        medicalInstructionType: mis.medicalInstructionType,
        images: mis.images.map(i => {
          return i.image
        }),
        index: null
      }
    })
    state.medicalInstructionShareds[imgIndex.index].index = parseInt(imgIndex.indexImg)
    // commit('selectImg', imgIndex)
    console.log('medicalInstructionShareds', state.medicalInstructionShareds)
  },
  closeZoom ({ commit, state }) {
    state.medicalInstructionShareds = state.medicalInstructionShareds.map(mi => {
      return {
        medicalInstructionType: mi.medicalInstructionType,
        images: mi.images,
        index: null
      }
    })
    // commit('closeZoom')
  }
}
const mutations = {
  selectImg (state, imgIndex) {
    state.medicalInstructionSharedIndex = imgIndex
  },
  closeZoom (state) {
    state.medicalInstructionSharedIndex = null
  },
  showAllImages (state) {
    state.visibleAllImages = true
  },
  closeAllImages (state) {
    state.visibleAllImages = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
