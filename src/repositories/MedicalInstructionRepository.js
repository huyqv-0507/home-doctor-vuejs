import diagnose from '../assets/data/diagnoses.json'
import medicines from '../assets/data/medicines.json'
import request from '../utils/request'
export default {
  getDiagnoses () {
    return diagnose
  },
  getMedicines () {
    return medicines
  },
  async getMedicalScheduleHistory (patientId) {
    return await request({
      url: `/MedicalInstructions/GetPrescriptionByPatientId?patientId=${patientId}`,
      method: 'get'
    })
  },
  async createMedicalSchedule (medicalSchedule) {
    console.log('medicalSchedule', medicalSchedule)
    return await request({
      url: 'MedicalInstructions/CreateMedicationSchedule',
      method: 'post',
      data: medicalSchedule
    })
  }
}
