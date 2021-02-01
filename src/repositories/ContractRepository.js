import request from '../utils/request.js'

export default {
  // Lấy tất cả các yêu cầu hợp đồng đang chờ xét duyệt
  async getContractRequestPending (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}`,
      method: 'get'
    })
  },
  // Lấy thông tin hợp đồng bằng ID của Contract
  async getRequestDetail (contractId) {
    return await request({
      url: `/Contracts/${contractId}`, // Lấy thông tin bệnh nhân đã gửi request bằng id hợp đồng.
      method: 'get'
    })
  },
  // Cập nhật lại (Xác nhận) hợp đồng bệnh nhân đã yêu cầu
  async createContract (contract) {
    return await request({
      url: `/Contracts?contractId=${contract.contractId}&status=active&dateStart=${contract.dateStarted}&daysOfTracking=${contract.daysOfTracking}`,
      method: 'put'
    })
  }
}
