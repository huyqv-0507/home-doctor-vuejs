const state = () => ({
  visibleAllImages: false,
  imageInfo: {
    diseases: [],
    medicalInstructionTypeName: '',
    diagnose: '',
    description: '',
    imgUrl: ''
  },
  isShowImg: false,
  imageShow: {
    diseases: [],
    medicalInstructionTypeName: '',
    diagnose: '',
    description: '',
    imgUrl: ''
  },
  allMedicalInstructionShared: [],
  medicalInstructionChoose: []
})
const getters = {
  getImage: state => (imgUrl) => {
    return state.allMedicalInstructionShared.findIndex(i => i.imgUrl === imgUrl)
  }
}
const actions = {
  setImageInfo ({ commit, state, rootState }, index) {
    commit('setImageInfo', state.allMedicalInstructionShared[index])
    rootState.contracts.requestDetail.medicalInstructionTypes.forEach(
      element => {
        element.medicalInstructions.forEach(m => {
          if (m.image === state.imageInfo.imgUrl) {
            m.isChoose = true
            return
          }
          m.isChoose = false
        })
      }
    )
  },
  showAllImages ({ commit, dispatch, rootState }) {
    console.log(rootState.contracts.requestDetail.medicalInstructionTypes)
    commit('setAllMedicalInstructionShared', {
      medicalInstructionTypes: rootState.contracts.requestDetail.medicalInstructionTypes,
      diseases: rootState.contracts.requestDetail.diseases
    })
    rootState.contracts.requestDetail.medicalInstructionTypes[0].medicalInstructions[0].isChoose = true
    dispatch('slideshows/setImageInfo', 0, { root: true })
    commit('showAllImages')
  },
  closeAllImages ({ commit, dispatch }, checkedImgs) {
    dispatch('medicalInstruction/saveMedicalInstruction', checkedImgs, { root: true })
    commit('closeAllImages')
  },
  // Bác sĩ chọn ảnh để xem
  selectImg ({ commit }, image) {
    console.log('selectImg: ', image)
    commit('setImageShow', image)
  },
  closeImgShow ({ commit }) {
    commit('closeImgShow')
  },
  closeZoom ({ commit, state }) {
    state.medicalInstructionShared = state.medicalInstructionShared.map(mi => {
      return {
        medicalInstructionType: mi.medicalInstructionTypeName,
        images: mi.images,
        index: null
      }
    })
    // commit('closeZoom')
  }
}
const mutations = {
  setAllMedicalInstructionShared (state, medicalInstructionShared) {
    var tmp = []
    console.log('medicalInstructionShared', medicalInstructionShared)
    medicalInstructionShared.medicalInstructionTypes.forEach(medicalInstructionType => {
      medicalInstructionType.medicalInstructions.forEach(medicalInstruction => {
        var obj = {
          medicalInstructionTypeName: medicalInstructionType.medicalInstructionTypeName,
          imgUrl: medicalInstruction.image,
          diseases: medicalInstructionShared.diseases,
          diagnose: medicalInstruction.diagnose,
          description: medicalInstruction.description
        }
        tmp.push(obj)
      })
    })
    state.allMedicalInstructionShared = tmp
    console.log('allMedicalInstructionShared', state.allMedicalInstructionShared)
  },
  closeImgShow (state) {
    state.imageShow = ''
    state.isShowImg = false
  },
  setImageShow (state, image) {
    console.log('setImageShow', image)
    state.imageShow = {}
    state.imageShow.diseases = image.diseases
    state.imageShow.medicalInstructionTypeName = image.medicalInstructionTypeName
    state.imageShow.diagnose = image.diagnose
    state.imageShow.imgUrl = image.imgUrl
    state.imageShow.description = image.description
    state.isShowImg = true
  },
  setImageInfo (state, imageInfo) {
    state.imageInfo = {}
    state.imageInfo.diseases = imageInfo.diseases
    state.imageInfo.medicalInstructionTypeName = imageInfo.medicalInstructionTypeName
    state.imageInfo.diagnose = imageInfo.diagnose
    state.imageInfo.imgUrl = imageInfo.imgUrl
    state.imageInfo.description = imageInfo.description
    console.log('imgInfo: ', state.imageInfo)
  },
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
