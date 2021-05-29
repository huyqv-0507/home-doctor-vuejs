import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const medicalInstructionRepository = RepositoryFactory.get('medicalInstructionRepository')

const state = () => ({
  imgShow: false,
  medicalInstruction: null,
  isAddMedicalInstruction: false,
  diagnosesAddingMi: []
})
const getters = {}
const actions = {
  // Mở y lệnh hình ảnh
  async showMedicalInstructionImageDetail ({ commit }, medicalInstructionId) {
    console.log(medicalInstructionId)
    await medicalInstructionRepository.getMedicalInstructionById(medicalInstructionId).then(response => {
      commit('setMedicalInstruction', response.data)
    }).catch((err) => {
      console.log(err)
      if (err.message.includes('404')) {
        commit('setEmptyMedicalInstruction')
      }
    })
    commit('showMedicalInstructionImageDetail')
  },
  hideMedicalInstructionImageDetail ({ commit, state }) {
    commit('hideMedicalInstructionImageDetail')
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  addDiagnosesToAddingMi (state, diagnose) {
    state.diagnosesAddingMi.push(diagnose.description.replace('(', '').replace(')', ' -'))
  },
  removeDiagnosesToAddingMi (state, index) {
    state.diagnosesAddingMi.splice(index, 1)
  },
  removeAllDiagnosesToAddingMi (state) {
    state.diagnosesAddingMi = []
  },
  turnOnAddMedicalInstruction (state) {
    state.isAddMedicalInstruction = true
  },
  turnOffAddMedicalInstruction (state) {
    state.isAddMedicalInstruction = false
  },
  showMedicalInstructionImageDetail (state) {
    state.imgShow = true
  },
  hideMedicalInstructionImageDetail (state) {
    state.imgShow = false
  },
  setMedicalInstruction (state, data) {
    state.medicalInstruction = {
      medicalInstructionId: data.medicalInstructionId,
      medicalInstructionTypeId: data.medicalInstructionTypeId,
      medicalInstructionTypeName: data.medicalInstructionTypeName,
      conclusion: data.conclusion,
      status: data.status,
      diseases: data.diseases === null ? null : data.diseases.map(d => {
        return {
          diseaseId: d.split('-')[0],
          diseaseName: d.split('-')[1]
        }
      }),
      dateCreate: data.dateCreate,
      patientFullName: data.patientFullName,
      images: data.images === null ? null : data.images.map(i => {
        return {
          imageUrl: `http://45.76.186.233:8000/api/v1/Images?pathImage=${i}`
        }
      }),
      description: data.description,
      diagnose: data.diagnose,
      placeHealthRecord: data.placeHealthRecord
    }
    console.log('medical instruction image:', state.medicalInstruction)
  },
  setEmptyMedicalInstruction (state) {
    state.medicalInstruction = null
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
