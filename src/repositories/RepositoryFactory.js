import UserRepository from '../repositories/UserRepository'
import ContractRepository from '../repositories/ContractRepository'
import PatientRepository from '../repositories/PatientRepository'
import MedicalInstructionRepository from '../repositories/MedicalInstructionRepository'
import ScheduleRepository from '../repositories/ScheduleRepository'
import NotificationRepository from '../repositories/NotificationRepository'
import VitalSignRepository from '../repositories/VitalSignRepository'

const repositories = {
  userRepository: UserRepository,
  contractRepository: ContractRepository,
  patientRepository: PatientRepository,
  medicalInstructionRepository: MedicalInstructionRepository,
  scheduleRepository: ScheduleRepository,
  notificationRepository: NotificationRepository,
  vitalSignRepository: VitalSignRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
