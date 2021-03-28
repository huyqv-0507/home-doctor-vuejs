import request from '../utils/request.js'
import contractSample from '../assets/data/contract-sample.json'

export default {
  async getContracts (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}`,
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
  async getApproveContracts (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}&status=approved`,
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
  async createContract (contractData) {
    return await request({
      url: `/Contracts/${contractData.contract.contractId}?doctorId=${contractData.contract.doctorId}&patientId=${contractData.contract.patientId}&status=APPROVED&dateStart=${contractData.contract.dateStarted}&daysOfTracking=${contractData.contract.daysOfTracking}`,
      method: 'put',
      data: contractData.medicalInstructionOfNewHealthRecord
    })
  },
  // Cập nhật lại (Huỷ) hợp đồng bệnh nhân đã yêu cầu
  async cancelContract (contract) {
    return await request({
      url: `/Contracts/${contract.contractId}?doctorId=${contract.doctorId}&patientId=${contract.patientId}&status=CANCELD`,
      method: 'put'
    })
  },
  // Lấy các medicalInstruction (Đơn thuốc, phiếu xét nghiệm) được bệnh nhân share trong khi tạo Contract
  async getMedicalInstructionShared (contractId, diseaseId) {
    console.log('ContractRepository - getMedicalInstructionShared - contractId:', contractId)
    console.log('ContractRepository - getMedicalInstructionShared - diseaseId:', diseaseId)
    return await request({
      url: `/MedicalInstructionShares?contractId=${contractId}&diseaseId=${diseaseId}`,
      // url: `http://45.76.186.233:8000/api/MedicalInstructionShares?contractId=${contractId}`,
      method: 'GET'
    })
  },
  getContractSample () {
    return contractSample
  },
  async getPriceOfContract (days) {
    console.log('days', typeof days)
    return await request({
      url: `/Licenses/GetLicenseByDays?days=${days}`,
      method: 'get'
    })
  }
}
