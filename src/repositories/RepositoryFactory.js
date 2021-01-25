import UserRepository from '../repositories/UserRepository'
import ContractRepository from '../repositories/ContractRepository'

const repositories = {
  userRepository: UserRepository,
  contractRepository: ContractRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
