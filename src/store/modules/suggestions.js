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
    /* medicalInstructionRepository.getDiagnoses().then(response => {
      if (response.status === 200) {
        commit('setDiagnoses', response.data)
      }
    }) */
    const diagnoses = medicalInstructionRepository.getDiagnoses()
    commit('setDiagnoses', diagnoses)
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
    state.diagnoses = diagnoses.map(diagnose => {
      // var startCode = parseInt(diagnose.diseaseId.split('-')[0].substring(1))
      // var endCode = parseInt(diagnose.diseaseId.split('-')[1].substring(1))
      // var firstChar = diagnose.diseaseId.split('-')[0].charAt(0)
      // var arrString = ''
      /* for (let index = startCode; index < endCode; index++) {
        if (index < 10) {
          index = '0' + index
        }
        arrString = arrString + firstChar + index
      } */

      return {
        code: diagnose.code, // diagnose.diseaseId,
        description: diagnose.description, // diagnose.nameDisease,
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
