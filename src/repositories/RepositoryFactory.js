import UserRepository from '../repositories/UserRepository'
import ContractRepository from '../repositories/ContractRepository'
import PatientRepository from '../repositories/PatientRepository'
import MedicalInstructionRepository from '../repositories/MedicalInstructionRepository'
import ScheduleRepository from '../repositories/ScheduleRepository'
import NotificationRepository from '../repositories/NotificationRepository'

const repositories = {
  userRepository: UserRepository,
  contractRepository: ContractRepository,
  patientRepository: PatientRepository,
  medicalInstructionRepository: MedicalInstructionRepository,
  scheduleRepository: ScheduleRepository,
  notificationRepository: NotificationRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
