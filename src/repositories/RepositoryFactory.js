import UserRepository from '../repositories/UserRepository'
import ContractRepository from '../repositories/ContractRepository'
import PatientRepository from '../repositories/PatientRepository'
import MedicalInstructionRepository from '../repositories/MedicalInstructionRepository'
import ScheduleRepository from '../repositories/ScheduleRepository'

const repositories = {
  userRepository: UserRepository,
  contractRepository: ContractRepository,
  patientRepository: PatientRepository,
  medicalInstructionRepository: MedicalInstructionRepository,
  scheduleRepository: ScheduleRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
