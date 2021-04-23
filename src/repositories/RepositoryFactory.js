import UserRepository from '../repositories/UserRepository'
import ContractRepository from '../repositories/ContractRepository'
import PatientRepository from '../repositories/PatientRepository'
import MedicalInstructionRepository from '../repositories/MedicalInstructionRepository'
import AppointmentRepository from './AppointmentRepository'
import NotificationRepository from '../repositories/NotificationRepository'
import VitalSignRepository from '../repositories/VitalSignRepository'
import TimeRepository from '../repositories/TimeRepository'

const repositories = {
  userRepository: UserRepository,
  contractRepository: ContractRepository,
  patientRepository: PatientRepository,
  medicalInstructionRepository: MedicalInstructionRepository,
  appointmentRepository: AppointmentRepository,
  notificationRepository: NotificationRepository,
  vitalSignRepository: VitalSignRepository,
  timeRepository: TimeRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
