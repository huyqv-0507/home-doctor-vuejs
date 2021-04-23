const state = () => ({})
const getters = {}
const actions = {
  // Di chuyển route trong Nhật ký hoạt động
  handleRouteHistory ({ commit, dispatch }, history) {
    var historyTypeId = history.historyType
    switch (historyTypeId) {
      case 4:
        console.log('BÁC SĨ ĐÃ CHẤP THUẬN HỢP ĐỒNG YÊU CẦU', history)
        dispatch(
          'contracts/getContractDetail',
          { contractId: history.contractId, where: 'HISTORY' },
          { root: true }
        )
        break
      case 6:
        console.log('TẠO ĐƠN THUỐC MỚI', history)
        dispatch(
          'medicalInstruction/getPrescriptionDetailHistory',
          history.medicalInstructionId,
          { root: true }
        )
        break
      case 8:
        console.log('BÁC SĨ ĐÃ TẠO MỘT CUỘC HẸN', history)
        break
      case 11:
        console.log('YÊU CẦU BỆNH NHÂN KẾT NỐI THIẾT BỊ', history)
        break

      default:
        break
    }
  }, // Quản lí route của Nhật ký hoạt động
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
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
