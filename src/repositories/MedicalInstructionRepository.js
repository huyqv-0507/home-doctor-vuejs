import medicines from '../assets/data/medicines.json'
import diagnoses from '../assets/data/diagnoses.json'
import request from '../utils/request'
export default {
  getDiagnoses () {
    return diagnoses
  },
  getMedicines () {
    return medicines
  },
  async getMedicalScheduleHistory (patientInfo) {
    return await request({
      url: `/Prescription/GetPrescriptionByPatientId?patientId=${patientInfo.patientId}&healthRecordId=${patientInfo.healthRecordId}`,
      method: 'get'
    })
  },
  async createMedicalSchedule (medicalSchedule) {
    const params = {
      healthRecordId: medicalSchedule.healthRecordId,
      doctorAccountId: medicalSchedule.doctorAccountId,
      diagnose: medicalSchedule.diagnose,
      dateStart: medicalSchedule.dateStarted,
      dateFinish: medicalSchedule.dateFinished,
      description: medicalSchedule.description,
      appointmentId: medicalSchedule.appointmentId,
      medicationScheduleCreates: medicalSchedule.medicationScheduleCreates.map(detail => {
        return {
          medicationName: detail.medicationName,
          content: detail.content,
          unit: detail.unit,
          useTime: detail.useTime,
          morning: detail.morning,
          noon: detail.noon,
          afternoon: detail.afternoon,
          night: detail.night
        }
      })
    }
    console.log('createMedicalSchedule param:', params)
    return await request({
      url: '/Prescription',
      method: 'post',
      data: params
    })
  },
  async getMedicalInstructionHistory (medicalInstructionId) {
    return await request({
      url: `/MedicalInstructions/${medicalInstructionId}`,
      method: 'get'
    })
  },
  async getPrescriptionDetailHistory (data) {
    const tmpData = {
      patientId: data.patientId,
      healthRecordId: data.healthRecordId
    }
    return await request({
      url: `/Prescription/GetPrescriptionByPatientId?patientId=${tmpData.patientId}&healthRecordId=${tmpData.healthRecordId}`,
      method: 'get'
    })
  },
  async cancelPrescription (medicalInstructionId, reasonCancel) {
    console.log('Cancel prescription:', medicalInstructionId, reasonCancel)
    return await request({
      method: 'put',
      url: `/Prescription?medicalInstructionId=${medicalInstructionId}&status=CANCEL&reasonCancel=${reasonCancel}`,
      data: []
    })
  },
  async getMedicalInstructionsByHRId (healthRecordId) {
    return await request({
      url: `MedicalInstructions/GetMedicalInstructionsByHRId?healthRecordId=${healthRecordId}`,
      method: 'get'
    })
  },
  async getMedicalInstructionDetail (medicalInstructionId) {
    return await request({
      method: 'get',
      url: `/MedicalInstructions/${medicalInstructionId}`
    })
  },
  async getMedicalInstructionTypes () {
    return await request({
      method: 'get',
      url: '/MedicalInstructrionTypes'
    })
  },
  async requestMedicalInstruction (requestData) {
    const params = {
      doctorAccountId: requestData.doctorAccountId,
      patientAccountId: requestData.patientAccountId,
      medicalInstructionTypeId: requestData.medicalInstructionTypeId
    }
    console.log('param repo', params)
    return await request({
      method: 'post',
      url: `/Notifications/SendNotiRequireMedicalInstruction?doctorAccountId=${params.doctorAccountId}&patientAccountId=${params.patientAccountId}&medicalInstructionTypeId=${params.medicalInstructionTypeId}`
    })
  },
  async getMedicalInstructionById (medicalInstructionId) {
    return await request({
      method: 'get',
      url: `/MedicalInstructions/${medicalInstructionId}`
    })
  },
  async confirmAddMIToHR (medicalInstructionId) {
    return await request({
      method: 'put',
      url: `/MedicalInstructions/UpdateStatusMedicalInstruction?medicalInstructionId=${medicalInstructionId}&status=DOCTOR`
    })
  },
  async rejectAddMIToHR (medicalInstructionId) {
    return await request({
      method: 'put',
      url: `/MedicalInstructions/UpdateStatusMedicalInstruction?medicalInstructionId=${medicalInstructionId}&status=DELETE`
    })
  }
}
