import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const medicalInstructionRepository = RepositoryFactory.get('medicalInstructionRepository')
const getMedicineByMedicineId = function (medicines, medicineId) {
  return medicines.find((medicine) => {
    return medicine.medicineId.toString().toLowerCase() === medicineId.toString().toLowerCase()
  })
}

const state = () => ({
  medicines: [], // Danh sách thuốc
  visibleTypeCreatePrescription: false, // Biến trạng thái của tạo đơn thuốc
  medicineName: '',
  medicine: {},
  unitTypes: [], // Danh sách đơn vị,
  contentSuggestion: [],
  diagnoses: []
})
const getters = {

}
const actions = {
  getMedicines ({ commit }) {
    const medicines = medicalInstructionRepository.getMedicines()
    commit('getMedicines', medicines)
  },
  getMedicineByMedicineId ({ commit, state, rootState }, medicineId) {
    var medicine = getMedicineByMedicineId(state.medicines, medicineId)
    commit('getMedicineByMedicineId', medicine)
  },
  getDiagnoses ({ commit }) {
    medicalInstructionRepository.getDiagnoses().then(response => {
      commit('setDiagnoses', response.data)
    }).catch(err => {
      console.log(err)
    })
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  getMedicines (state, medicines) {
    state.medicines = medicines.map(medicine => {
      return {
        medicineName: medicine.medicineName,
        content: medicine.content,
        unitType: medicine.unitType
      }
    })
  },
  // Lấy danh sách chuẩn đoán
  setDiagnoses (state, diagnoses) {
    var tmp = []
    diagnoses.forEach(diagnose => {
      diagnose.diseaseLevelThrees.forEach(t => {
        tmp.push(t)
      })
    })
    state.diagnoses = tmp.map(diagnose => {
      return {
        code: diagnose.diseaseLevelThreeId, // diagnose.diseaseId,
        description: diagnose.diseaseLevelThreeName, // diagnose.nameDisease,
        arrCode: '' // arrString
      }
    })
    console.log('Diagnoses:::', state.diagnoses)
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
