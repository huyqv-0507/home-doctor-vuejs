import request from '../utils/request.js'

export default {
  async getContractRequests () {
    return await request({
      url: '/contracts',
      method: 'get'
    })
  },
  async getRequestDetail (patientId) {
    return await request({
      url: '/request-details',
      method: 'get'
    })
  },
  async createContract (contract) {
    console.log(contract)
    return await request({
      url: '/contracts',
      method: 'post',
      data: contract
    })
  }
}
