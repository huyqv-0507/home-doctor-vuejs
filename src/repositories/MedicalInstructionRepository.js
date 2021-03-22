import medicines from '../assets/data/medicines.json'
import diagnoses from '../assets/data/diagnoses.json'
import request from '../utils/request'
export default {
  getDiagnoses () {
    /* return await request({
      method: 'get',
      url: '/Diseases/GetDiseases'
    }) */
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
    console.log('medicalSchedule', medicalSchedule)
    return await request({
      url: '/Prescription',
      method: 'post',
      data: medicalSchedule
    })
  },
  async getMedicalInstructionHistory (medicalInstructionId) {
    return await request({
      url: `/MedicalInstructions/${medicalInstructionId}`,
      method: 'get'
    })
  },
  async getPrescriptionDetailHistory (medicalInstructionId) {
    return await request({
      url: `/MedicalInstructions/${medicalInstructionId}`,
      method: 'get'
    })
  },
  async cancelPrescription (medicalInstructionId, reasonCancel) {
    return await request({
      method: 'put',
      url: `/Prescription?medicalInstructionId=${medicalInstructionId}&status=CANCEL&reasonCancel=${reasonCancel}`,
      data: []
    })
  }
}
