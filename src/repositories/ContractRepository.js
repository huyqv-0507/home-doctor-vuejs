import request from '../utils/request.js'

export default {
  // Lấy tất cả các yêu cầu hợp đồng đang chờ xét duyệt
  async getContractRequestPending (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}&status=pending`,
      method: 'get'
    })
  },
  async getRequestDetail (contractId) {
    return await request({
      url: `/Contracts/${contractId}`, // Lấy thông tin bệnh nhân đã gửi request bằng id hợp đồng.
      method: 'get'
    })
  },
  async createContract (contract) {
    console.log(contract)
    console.log(`/Contracts?contractId=${contract.contractId}&status=active&dateStart=${contract.dateStarted}&daysOfTracking=${contract.daysOfTracking}`)
    return await request({
      url: `/Contracts?contractId=${contract.contractId}&status=active&dateStart=${contract.dateStarted}&daysOfTracking=${contract.daysOfTracking}`,
      method: 'put'
    })
  }
}
