import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const vitalSignRepository = RepositoryFactory.get('vitalSignRepository')
const state = () => ({
  deviceConnecting: {}
})
const getters = {}
const actions = {
  getDeviceSupportServices ({ commit }) {
    var device = vitalSignRepository.getDeviceSupportServices()
    commit('setDeviceConnecting', device)
  }
}
const mutations = {
  setDeviceConnecting (state, device) {
    state.deviceConnecting = {
      deviceId: device.deviceId, // id thiết bị
      deviceName: device.deviceName, // tên thiết bị
      services: device.services.map(service => {
        return {
          serviceId: service.serviceId, // id service
          serviceName: service.serviceName, // tên service
          uuid: service.uuid // uuid
        }
      })
    }
    console.log('deviceConnecting:::', state.deviceConnecting)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
