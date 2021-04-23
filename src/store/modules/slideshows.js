import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const medicalInstructionRepository = RepositoryFactory.get('medicalInstructionRepository')
const state = () => ({
  visibleAllImages: false,
  imageInfo: null,
  isShowImg: false,
  imageShow: {
    diseases: [],
    medicalInstructionTypeName: '',
    diagnose: '',
    description: '',
    imgUrl: ''
  },
  allMedicalInstructionShared: [],
  medicalInstructionChoose: [],
  isShowChkChoose: false,
  images: [],
  isImageShow: false,
  isImageRequestShow: false

})
const getters = {
  getImage: state => (imgUrl) => {
    return state.images.findIndex(i => i.imgObj.url === imgUrl)
  }
}
const actions = {
  getMedicalInstructionImageInfo ({ commit, state }, medicalInstructionId) {
    medicalInstructionRepository.getMedicalInstructionById(medicalInstructionId).then(response => {
      console.log(response.data)
      commit('setImageInfo', response.data)
    }).catch(err => {
      if (err.message.includes('404')) {
        state.imageInfo = null
      }
      console.error(err)
    })
  },
  openImageRequestShow ({ commit }) {
    commit('openImageRequestShow')
  },
  closeImageRequestShow ({ commit }) {
    commit('closeImageRequestShow')
  },
  openImageShow ({ commit }) {
    commit('openImageShow')
  },
  closeImageShow ({ commit }) {
    commit('closeImageShow')
  },
  showImages ({ commit }, images) {
    commit('setImages', images)
  },
  closeImages ({ commit }) {
    commit('closeImages')
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
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  openImageRequestShow (state) {
    state.isImageRequestShow = true
  },
  closeImageRequestShow (state) {
    state.isImageRequestShow = false
  },
  openImageShow (state) {
    state.isImageShow = true
  },
  closeImageShow (state) {
    state.isImageShow = false
  },
  setImages (state, images) {
    state.images = images
    state.visibleAllImages = true
    console.log('images to show:', images)
  },
  setAllMedicalInstructionShared (state, medicalInstructionShared) {
    var tmp = []
    console.log('medicalInstructionShared', medicalInstructionShared)
    medicalInstructionShared.medicalInstructionDiseases.forEach(medicalInstructionType => {
      medicalInstructionType.medicalInstructions.forEach(medicalInstruction => {
        medicalInstruction.medicalInstruction.forEach(img => {
          img.images.forEach(i => {
            var obj = {
              medicalInstructionTypeName: img.medicalInstructionTypeName,
              imgObj: i,
              diseases: medicalInstructionType.diseaseId + '-' + medicalInstructionType.diseaseName,
              diagnose: img.diagnose,
              description: img.description
            }
            tmp.push(obj)
          })
        })
      })
    })
    state.allMedicalInstructionShared = tmp
    console.log('allMedicalInstructionShared', state.allMedicalInstructionShared)
  },
  closeImages (state) {
    state.visibleAllImages = false
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
    state.imageShow.imgUrl = image.imgObj.url
    state.imageShow.description = image.description
    state.isShowImg = true
  },
  setImageInfo (state, imageInfo) {
    console.log('imageInfo', imageInfo)
    state.imageInfo = {}
    state.imageInfo = {
      medicalInstructionId: imageInfo.medicalInstructionId,
      medicalInstructionTypeId: imageInfo.medicalInstructionTypeId,
      medicalInstructionTypeName: imageInfo.medicalInstructionTypeName,
      dateCreate: imageInfo.dateCreate,
      patientFullName: imageInfo.patientFullName,
      images: imageInfo.images.map(i => {
        return {
          isChoose: false,
          url: `http://45.76.186.233:8000/api/v1/Images?pathImage=${i}`
        }
      }),
      description: imageInfo.description,
      diagnose: imageInfo.diagnose,
      placeHealthRecord: imageInfo.placeHealthRecord,
      status: imageInfo.status
    }
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
    state.isShowChkChoose = true
  },
  closeAllImages (state) {
    state.visibleAllImages = false
    state.isShowChkChoose = false
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
