import request from '../utils/request.js'

export default {
  // Lấy tất cả các yêu cầu hợp đồng đang chờ xét duyệt
  async getContractRequestPending (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}&status=pending`,
      method: 'get'
    })
  },
  async getActiveContracts (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}&status=active`,
      method: 'get'
    })
  },
  async getFinishContracts (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}&status=finished`,
      method: 'get'
    })
  },
  async getRejectContracts (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}&status=cancel`,
      method: 'get'
    })
  },
  async getPendingContracts (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}&status=pending`,
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
      url: `/Contracts/${contract.contractId}?doctorId=${contract.doctorId}&patientId=${contract.patientId}&status=ACTIVE&dateStart=${contract.dateStarted}&daysOfTracking=${contract.daysOfTracking}`,
      method: 'put'
    })
  },
  // Cập nhật lại (Huỷ) hợp đồng bệnh nhân đã yêu cầu
  async cancelContract (contractId) {
    console.log('contractId (Reject contract):', contractId)
    return await request({
      url: `/Contracts?contractId=${contractId}&status=CANCEL`,
      method: 'put'
    })
  },
  // Lấy các medicalInstruction (Đơn thuốc, phiếu xét nghiệm) được bệnh nhân share trong khi tạo Contract
  async getMedicalInstructionShared (contractId) {
    console.log('ContractRepository - getContractImages - contractId:', contractId)
    return await request({
      url: `/MedicalInstructionShares?contractId=${contractId}`,
      // url: `http://45.76.186.233:8000/api/MedicalInstructionShares?contractId=${contractId}`,
      method: 'GET'
    })
  }
}
