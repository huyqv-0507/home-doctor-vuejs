import request from '../utils/request.js'
import contractSample from '../assets/data/contract-sample.json'
import contractCondition from '../assets/data/condition-create-contract.json'

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
      url: `/Contracts?doctorId=${userId}&status=canceld`,
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
  async getSignContracts (userId) {
    return await request({
      url: `/Contracts?doctorId=${userId}&status=signed`,
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
    const dateStarted = new Date(contractData.contract.dateStarted)
    const contract = {
      doctorId: contractData.contract.doctorId,
      patientId: contractData.contract.patientId,
      status: 'APPROVED',
      dateStart: `${dateStarted.getFullYear()}-${(dateStarted.getMonth() + 1) < 10 ? '0' + (dateStarted.getMonth() + 1) : (dateStarted.getMonth() + 1)}-${dateStarted.getDate() < 10 ? '0' + dateStarted.getDate() : dateStarted.getDate()}`,
      daysOfTracking: contractData.contract.daysOfTracking,
      medicalInstructionChooses: contractData.medicalInstructionOfNewHealthRecord
    }
    console.log(' repo contract>>>', contract)
    return await request({
      url: `/Contracts/${parseInt(contractData.contract.contractId)}`,
      method: 'put',
      data: contract
    })
  },
  // Cập nhật lại (Huỷ) hợp đồng bệnh nhân đã yêu cầu
  async cancelContract (contract) {
    const contractData = {
      doctorId: parseInt(contract.doctorId),
      patientId: parseInt(contract.patientId),
      status: 'CANCELD'
    }
    return await request({
      url: `/Contracts/${contract.contractId}`,
      method: 'put',
      data: contractData
    })
  },
  // Lấy các medicalInstruction (Đơn thuốc, phiếu xét nghiệm) được bệnh nhân share trong khi tạo Contract
  async getMedicalInstructionShared (contractId, diseaseId) {
    console.log('ContractRepository - getMedicalInstructionShared - contractId:', contractId, diseaseId)
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
    return await request({
      url: `/Licenses/GetLicenseByDays?days=${days}`,
      method: 'get'
    })
  },
  getContractCondition () {
    return contractCondition
  },
  async updateMedicalInstructionToContract (data) {
    return await request({
      method: 'post',
      url: `/MedicalInstructions/AddMedicalInstructionFromContract?contractId=${data.contractId}`,
      data: data.medicalInstructions
    })
  }
}
