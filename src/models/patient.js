export class Patient {
  constructor (accountId, contractId, dateAppointment, dateUpdateStatus, diseases, healthRecordId, isDeviceConnected, patientId, patientName, status) {
    this.accountId = accountId
    this.contractId = contractId
    this.dateAppointment = dateAppointment
    this.dateUpdateStatus = dateUpdateStatus
    this.diseases = diseases
    this.healthRecordId = healthRecordId
    this.isDeviceConnected = isDeviceConnected
    this.patientId = patientId
    this.patientName = patientName
    this.status = status
  }
}
