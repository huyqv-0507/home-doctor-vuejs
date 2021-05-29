import medicines from '../assets/data/medicines.json'
import request from '../utils/request'
export default {
  getDiagnoses () {
    return request({
      method: 'get',
      url: '/Diseases/GetDiseases'
    })
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
      conclusion: medicalSchedule.conclusion,
      dateStart: medicalSchedule.dateStarted,
      dateFinish: medicalSchedule.dateFinished,
      description: medicalSchedule.description,
      appointmentId: medicalSchedule.appointmentId,
      diseaseIds: medicalSchedule.diseaseIds,
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
      medicalInstructionTypeId: requestData.medicalInstructionTypeId,
      note: requestData.note,
      contractId: requestData.contractId
    }
    console.log('param repo', params)
    return await request({
      method: 'post',
      url: `/Notifications/SendNotiRequireMedicalInstruction?doctorAccountId=${params.doctorAccountId}&patientAccountId=${params.patientAccountId}&medicalInstructionTypeId=${params.medicalInstructionTypeId}&contractId=${params.contractId}&note=${params.note}`
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
      url: `/MedicalInstructions/UpdateStatusMedicalInstruction?medicalInstructionId=${medicalInstructionId}&status=SHARE`
    })
  },
  async rejectAddMIToHR (medicalInstructionId) {
    return await request({
      method: 'put',
      url: `/MedicalInstructions/UpdateStatusMedicalInstruction?medicalInstructionId=${medicalInstructionId}&status=DELETE`
    })
  },
  async insertMedicalInstructionImage (data) {
    console.log('data', data)
    const formData = new FormData()
    formData.append('MedicalInstructionTypeId', data.medicalInstructionTypeId)
    formData.append('HealthRecordId', data.healthRecordId)
    formData.append('PatientId', data.patientId)
    formData.append('Description', data.description)
    formData.append('Conclusion', data.Conclusion)
    data.diseaseIds.forEach(id => {
      formData.append('DiseaseIds', id)
    })
    formData.append('images', data.images)
    console.log('insertMedicalInstructionImage', formData)
    return await request({
      method: 'post',
      url: '/MedicalInstructions/InsertMedicalInstructionOld?fromBy=DOCTOR',
      data: formData
    })
  },
  async insertDiseases (diagnoses) {
    console.log(diagnoses)
    const diagnosesFormat = diagnoses.map(d => {
      return {
        diseaseId: d.diagnoseId,
        code: d.diagnoseId[0],
        number: d.diagnoseId.includes('-') === true ? null : parseInt(d.diagnoseId.replace(d.diagnoseId[0], '')),
        start: d.diagnoseId.includes('-') === true ? parseInt(d.diagnoseId.split('-')[0].replace(d.diagnoseId[0], '')) : null,
        end: d.diagnoseId.includes('-') === true ? parseInt(d.diagnoseId.split('-')[1].replace(d.diagnoseId[0], '')) : null,
        name: d.diagnoseName
      }
    })
    console.log('diseasesFormat', diagnosesFormat)
    return await request({
      method: 'post',
      url: '/Diseases/InsertDiseases',
      data: diagnosesFormat
    })
  }
}
