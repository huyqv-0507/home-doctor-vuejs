import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const medicalInstructionRepository = RepositoryFactory.get('medicalInstructionRepository')
const filterMedicines = function (medicines, medicineName) {
  return medicines.filter((medicine) => {
    return medicine.medicineDetail.toString().toLowerCase().indexOf(medicineName.toString().toLowerCase()) > -1
  })
}
const filterDiagnose = function (diagnoses, diagnoseDescription) {
  return diagnoses.filter((diagnose) => {
    return diagnose.description.toString().toLowerCase().indexOf(diagnoseDescription.toString().toLowerCase()) > -1
  })
}
const getMedicineByMedicineId = function (medicines, medicineId) {
  return medicines.find((medicine) => {
    return medicine.medicineId.toString().toLowerCase() === medicineId.toString().toLowerCase()
  })
}

const state = () => ({
  medicines: [], // Danh sách thuốc
  visibleTypeCreatePrescription: false, // Biến trạng thái của tạo đơn thuốc
  medicineSuggestion: [], // Danh sách thuốc gợi ý
  medicineName: '',
  medicine: {},
  unitTypes: [], // Danh sách đơn vị,
  visibleTypeSearchContent: false,
  contentSuggestion: [],
  diagnoses: [],
  diagnoseSuggestion: [],
  visibleDiagnose: false
})
const getters = {

}
const actions = {
  getMedicines ({ commit }) {
    const medicines = medicalInstructionRepository.getMedicines()
    console.log('getMedicines:', medicines)
    commit('getMedicines', medicines)
  },
  searchMedicineName ({ commit, state }, medicineName) {
    var medicineSearch = state.medicines.map(m => {
      return {
        medicineId: m.medicineId,
        medicineDetail: m.medicineName + ' - ' + m.content + ' (' + m.unitType + ')'
      }
    })
    console.log('medicineSearch', medicineSearch)
    var medicineSuggestion = filterMedicines(medicineSearch, medicineName)
    if (medicineSuggestion.length === 0) {
      commit('searchMedicineNameEmpty')
    } else {
      commit('searchMedicineName', medicineSuggestion)
    }
  },
  leaveSearchMedicineName ({ commit }, event) {
    commit('leaveSearchMedicineName')
  },
  getMedicineByMedicineId ({ commit, state, rootState }, medicineId) {
    var medicine = getMedicineByMedicineId(state.medicines, medicineId)
    commit('getMedicineByMedicineId', medicine)
    rootState.medicalInstruction.visibleSelectMedicine = true
  },
  searchContent ({ commit }) {
    commit('searchContent')
  },
  focusSearchContent ({ commit }) {
    commit('searchContent')
  },
  leaveSearchContent ({ commit }) {
    commit('leaveSearchContent')
  },
  getDiagnoses ({ commit }) {
    const diagnoses = medicalInstructionRepository.getDiagnoses()
    console.log('getDiagnoses', diagnoses)
    commit('getDiagnoses', diagnoses)
  },
  searchDiagnose ({ commit, state }, diagnose) {
    var diagnoseSearch = state.diagnoses.map(d => {
      return {
        diagnoseId: d.diagnoseId,
        description: `(${d.code}) ${d.description}`
      }
    })
    var diagnoseSuggestion = filterDiagnose(diagnoseSearch, diagnose)
    if (diagnoseSuggestion.length === 0) {
      commit('searchDiagnoseEmpty')
    } else {
      commit('searchDiagnose', diagnoseSuggestion)
    }
  },
  leaveSearchDiagnose ({ commit }) {
    commit('leaveSearchDiagnose')
  },
  blurDiagnose ({ commit }) {

  }
}
const mutations = {
  getMedicines (state, medicines) {
    state.medicines = medicines // Lấy danh sách thuốc
  },
  searchMedicineName (state, medicineSuggestion) {
    state.medicineSuggestion = medicineSuggestion
    state.visibleTypeCreatePrescription = true
  },
  searchMedicineNameEmpty (state) {
    state.medicineSuggestion = []
    state.visibleTypeCreatePrescription = false
  },
  searchDiagnose (state, diagnoseSuggestion) {
    state.diagnoseSuggestion = diagnoseSuggestion
    state.visibleDiagnose = true
  },
  searchDiagnoseEmpty (state) {
    state.diagnoseSuggestion = []
    state.visibleDiagnose = false
  },
  leaveSearchMedicineName (state) {
    state.visibleTypeCreatePrescription = false
  },
  getMedicineByMedicineId (state, medicine) {
    state.medicine = medicine
  },
  searchContent (state) {
    state.visibleTypeSearchContent = true
    state.contentSuggestion = ['5mg', '10mg']
    console.log(state.contentSuggestion)
  },
  leaveSearchContent (state) {
    state.visibleTypeSearchContent = false
  },
  // Lấy danh sách chuẩn đoán
  getDiagnoses (state, diagnoses) {
    state.diagnoses = diagnoses
  },
  leaveSearchDiagnose (state) {
    console.log('leaveSearchDiagnose')
    state.visibleDiagnose = false
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
