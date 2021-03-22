/* eslint-disable no-tabs */
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import router from '../../router/index.js'
import { Notification } from 'element-ui'
import { formatPrice } from '../../utils/common'
const contractRepository = RepositoryFactory.get('contractRepository')
const userRepository = RepositoryFactory.get('userRepository')

const state = () => ({
  contractImgs: [], // HÌnh ảnh hồ sơ bệnh án của hợp đồng
  contractRequests: [],
  requestDetail: {
    contractId: '', // Id hợp đồng
    fullNameDoctor: '', // Họ tên của bác sĩ
    phoneNumberDoctor: '', // Số điện thoại của bác sĩ
    workLocationDoctor: '', // Nơi làm việc của bác sĩ
    addressDoctor: '',
    dobDoctor: '', // Ngày sinh của bác sĩ
    fullNamePatient: '', // Họ tên của bệnh nhân
    phoneNumberPatient: '', // Số điện thoại của bệnh nhân
    addressPatient: '', // Địa chỉ bệnh nhân
    dobPatient: '', // Ngày sinh của bệnh nhân
    contractCode: '', // Mã hợp đồng
    note: '', // Lý do muốn kí hợp đồng
    status: '', // Trạng thái của hợp đồng ACTIVE:  Đã kết nối, FINISHED: Bị huỷ bởi hệ thống, PENDING: Đang chờ bác sĩ xét duyệt, REJECTED: Bị bác sĩ từ chối
    dateCreated: '', // Ngày tạo ra hợp đồng
    dateStarted: '', // Ngày bắt đầu theo dõi
    dateFinished: '', // Ngày kết thúc theo dõi
    nameLicense: '', // Tên của gói
    priceLicense: '',
    daysOfTracking: 0, // Số ngày theo dõi
    diseases: [], // Bệnh lý của bệnh nhân
    doctorId: '', // Id của bác sĩ
    patientId: '', // Id của bệnh nhân
    medicalInstructionTypes: []
  },
  rejectDialogVisible: false,
  contractCode: '',
  cancelContractVisible: false,
  // Hợp đồng để thêm vào database
  contract: {
    contractId: '', // Id của hợp đồng
    status: '', // Trạng thái của hợp đồng (Để update xuống database)
    dateStarted: '',
    daysOfTracking: 0
  },
  // Thông tin của bệnh nhân (render view)
  patientDetail: {
    patientId: '',
    gender: '',
    email: '',
    career: '',
    relatives: []
  },
  activeContracts: [],
  finishContracts: [],
  rejectContracts: [],
  pendingContracts: [],
  approveContracts: [],
  contractSample: {
    baseLaw: [],
    dateContractFinished: {
      day: 0,
      month: 0,
      year: 0
    },
    today: {
      weekDay: '',
      day: 0,
      month: 0,
      year: 0
    },
    descriptionSum: '',
    partyA: {
      name: '',
      fullName: '',
      address: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: ''
    },
    partyB: {
      name: '',
      fullName: '',
      address: '',
      phoneNumber: '',
      workLocation: '',
      specialization: '',
      dateOfBirth: ''
    },
    timeAndMission: {
      title: '',
      description: []
    },
    workingMode: {
      title: '',
      description: []
    },
    dutyAndInterest: [
      {
        name: '',
        duty: [],
        interest: []
      },
      {
        name: '',
        duty: [],
        interest: []
      }
    ],
    disputeResolution: {},
    collectiveCommitment: {},
    price: 0,
    priceWord: ''
  },
  allMedicalInstructionShared: [],
  // Thông tin gói dịch vụ
  license: {
    licenseId: 0,
    name: '',
    days: 0,
    price: 0,
    description: ''
  },
  contractDetail: {
    contractId: '', // Id hợp đồng
    fullNameDoctor: '', // Họ tên của bác sĩ
    phoneNumberDoctor: '', // Số điện thoại của bác sĩ
    workLocationDoctor: '', // Nơi làm việc của bác sĩ
    addressDoctor: '',
    dobDoctor: '', // Ngày sinh của bác sĩ
    fullNamePatient: '', // Họ tên của bệnh nhân
    phoneNumberPatient: '', // Số điện thoại của bệnh nhân
    addressPatient: '', // Địa chỉ bệnh nhân
    dobPatient: '', // Ngày sinh của bệnh nhân
    contractCode: '', // Mã hợp đồng
    note: '', // Lý do muốn kí hợp đồng
    status: '', // Trạng thái của hợp đồng ACTIVE:  Đã kết nối, FINISHED: Bị huỷ bởi hệ thống, PENDING: Đang chờ bác sĩ xét duyệt, REJECTED: Bị bác sĩ từ chối
    dateCreated: '', // Ngày tạo ra hợp đồng
    dateStarted: '', // Ngày bắt đầu theo dõi
    dateFinished: '', // Ngày kết thúc theo dõi
    nameLicense: '', // Tên của gói
    priceLicense: '',
    daysOfTracking: '', // Số ngày theo dõi
    diseases: [], // Bệnh lý của bệnh nhân
    doctorId: '', // Id của bác sĩ
    patientId: '' // Id của bệnh nhân
  },
  // Thông tin hợp đồng dùng để hiển thị trong trang nhật ký (history)
  contractDetailHistory: {
    baseLaw: [],
    today: {
      weekDay: '',
      day: 0,
      month: 0,
      year: 0
    },
    descriptionSum: '',
    partyA: {
      name: '',
      fullName: '',
      address: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: ''
    },
    partyB: {
      name: '',
      fullName: '',
      address: '',
      phoneNumber: '',
      workLocation: '',
      specialization: '',
      dateOfBirth: ''
    },
    timeAndMission: {
      title: '',
      description: []
    },
    workingMode: {
      title: '',
      description: []
    },
    dutyAndInterest: [
      {
        name: '',
        duty: [],
        interest: []
      },
      {
        name: '',
        duty: [],
        interest: []
      }
    ],
    disputeResolution: {},
    collectiveCommitment: {},
    priceLicense: 0
  },
  navigateContract: {
    statusContract: '',
    patientId: ''
  } // Kiểm tra status của contract để chuyển trang
})
const getters = {
}
const actions = {
  setDateStartedContract ({ commit }, dateStarted) {
    commit('setDateStartedContract', dateStarted)
  },
  checkNavigateContract ({ commit }, contractId) {
    contractRepository.getRequestDetail(contractId).then(response => {
      if (response.status === 200) {
        commit('setNavigateContract', {
          patientId: response.data.patientId,
          statusContract: response.data.status
        })
      }
    }).catch((error) => {
      console.log('error at contracts - CheckStatusContract', error)
    })
  },
  // Lấy hơp đồng mẫu
  getContractSample ({ commit, rootState, state }) {
    var contract = contractRepository.getContractSample()
    commit('setContractSample', {
      doctorInfo: rootState.users.user,
      patientInfo: state.patientDetail,
      contractRequestInfo: state.requestDetail,
      contractSample: contract
    })
  },
  // Get all contract requests
  getContractRequestPending ({ commit }, payloadUser) {
    console.log('Action - getContractRequestPending() - payloadUser:', payloadUser)
    contractRepository.getPendingContracts(payloadUser[0]).then(response => {
      console.log(response.data)
      if (response.status === 200) {
        commit('success', response.data)
      } else {
        commit('failure')
      }
    }).catch(error => {
      commit('failure')
      throw error
    })
  },

  // Get request detail by patientId when doctor click [0] is patientId, [1] is contractCode
  getRequestDetail ({ commit, dispatch, rootState, state }, payloadContractId) {
    console.log(`Action - getRequestDetail() - payloadPatientId: ${payloadContractId}`)
    rootState.contracts.contract.contractId = payloadContractId
    // Gọi repository để lấy thông tin yêu cầu
    contractRepository.getRequestDetail(payloadContractId).then(response => {
      console.log('Action - getRequestDetail() - Request detail:', response.data)
      if (response.status === 200) {
        commit('getRequestDetailSuccess', response.data)
        dispatch('getPatientDetail', response.data)
        return response.data
      } else {
        commit('failure')
      }
    })
  },
  // Get patient information
  getPatientDetail ({ commit }, payloadRequestDetail) {
    console.log('payloadRequestDetail')
    console.log(payloadRequestDetail)
    userRepository.getPatientProfileByPatientId(payloadRequestDetail.patientId).then(response => {
      if (response.status === 200) {
        console.log('Module: contracts, Action: getPatientDetail', response.data)
        commit('setPatientInfo', response.data)
      }
    })
  },
  // Reject contract manage
  rejectContract ({ commit }) {
    commit('rejectContract')
  },
  continueAssignContract ({ commit }) {
    commit('continueAssignContract')
  },
  confirmRejectContract ({ commit }, contractId) {
    // set state pending to rejected (database)
    contractRepository.cancelContract(contractId).then(response => {
      if (response.status === 200) {
        Notification.success({ title: 'Thông báo', message: 'Huỷ hợp đồng thành công!', duration: 6000, position: 'bottom-right' })
      }
    }).catch(error => {
      console.log(error)
      Notification.error({ title: 'Thông báo', message: 'Huỷ hợp đồng thất bại!', duration: 6000, position: 'bottom-right' })
    })
    commit('confirmRejectContract')
  },

  // Next to create Contract
  nextCreateContract ({ commit, state, rootState }, payload) {
    console.log('nextCreateContract', payload)
    state.contract.doctorId = parseInt(rootState.users.user.userId)
    contractRepository.getPriceOfContract(payload.daysOfTracking).then(response => {
      if (response.status === 200) {
        commit('setPriceOfContract', response.data)
        commit('nextCreateContract', payload)
      }
    })
    router.push({ name: 'confirm-contract' })
  },

  backToRequestDetailContract () {
    router.go(-1) // Trở về trang trưóc
  },
  // Confirm contract and insert db [0] is contract, [1] is value of disease type, [2] is value of note
  confirmContract ({ commit, dispatch }, payload) {
    contractRepository.createContract(payload[0]).then(response => {
      console.log('status code:', response.status)
      if (response.status === 204) {
        Notification.success({ title: 'Thông báo', message: 'Tạo hợp đồng thành công. Vui lòng chờ bệnh nhân xác nhận lại hợp đồng!', duration: 6000, position: 'bottom-right' })
        dispatch('contracts/getActiveContracts', null, { root: true })
        router.push('/home')
      } else if (response.status === 405) {
        Notification.error({ title: 'Thông báo', message: 'Xin lỗi, hiện tại bạn đã đủ 5 hợp đồng!', duration: 6000, position: 'bottom-right' })
      }
    }).catch(error => {
      console.log(error)
      Notification.error({ title: 'Thông báo', message: 'Tạo hợp đồng thất bại!', duration: 6000, position: 'bottom-right' })
    })
  },
  // Lấy tất cả các hợp đồng đang theo dõi
  getActiveContracts ({ commit, rootState }) {
    contractRepository.getActiveContracts(rootState.users.user.userId).then(response => {
      if (response.status === 200) {
        console.log('acc::::', response.data)
        commit('getActiveContracts', response.data)
      }
    }).catch((error) => {
      console.log(error)
      commit('setActiveContractsFailure')
    })
  },
  // Lấy tất cả các hợp đồng đã hết hạn
  getFinishContracts ({ commit, rootState }) {
    contractRepository.getFinishContracts(rootState.users.user.userId).then(response => {
      if (response.status === 200) {
        commit('getFinishContracts', response.data)
      }
    })
  },
  // Lấy tất cả các hợp động bị từ chối
  getRejectContracts ({ commit, rootState }) {
    contractRepository.getRejectContracts(rootState.users.user.userId).then(response => {
      if (response.status === 200) {
        commit('getRejectContracts', response.data)
      }
    })
  },
  // Lấy tất cả các hợp đồng đang chờ xét duyệt
  getPendingContracts ({ commit, rootState }) {
    contractRepository.getPendingContracts(rootState.users.user.userId).then(response => {
      if (response.status === 200) {
        commit('getPendingContracts', response.data)
      }
    })
  },
  // Lấy tất cả các hợp đồng đang chờ xét duyệt
  getApproveContracts ({ commit, rootState }) {
    contractRepository.getApproveContracts(rootState.users.user.userId).then(response => {
      if (response.status === 200) {
        commit('getPendingContracts', response.data)
      }
    })
  },
  getContractDetail ({ commit, state }, contractId) {
    contractRepository.getRequestDetail(contractId).then(response => {
      if (response.status === 200) {
        commit('setContractDetail', { contractId: contractId, contract: response.data })
      }
    }).catch(error => {
      console.log('error getContractDetail:::', error)
    })
    var contract = contractRepository.getContractSample()
    commit('setContractDetailHistory', {
      contractDetailInfo: state.contractDetail,
      contractSample: contract
    })
    router.push('/history/contract-history').catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        throw error
      }
    })
  }
}
const mutations = {
  setDateStartedContract (state, dateStarted) {
    var date = new Date(dateStarted)
    state.contract.dateStarted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    state.requestDetail.dateStarted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  },
  setNavigateContract (state, data) {
    state.navigateContract = {
      patientId: data.patientId,
      statusContract: data.statusContract
    }
  },
  setActiveContractsFailure (state) {
    state.activeContracts = []
  },
  setPriceOfContract (state, license) {
    state.license.licenseId = license.licenseId
    state.license.name = license.name
    state.license.days = parseInt(license.days)
    state.license.price = parseInt(license.price)
    state.license.description = license.description
    console.log('license:::', state.requestDetail.license)
  },
  // Cập nhật hợp đồng
  setContractSample (state, contractObject) {
    const now = new Date()
    var weekDay = ''
    if (now.getDay() === 0) { // weekDay [0-6]
      weekDay = 'Chủ nhật'
    } else if (now.getDay() === 1) {
      weekDay = 'Thứ hai'
    } else if (now.getDay() === 2) {
      weekDay = 'Thứ ba'
    } else if (now.getDay() === 3) {
      weekDay = 'Thứ tư'
    } else if (now.getDay() === 4) {
      weekDay = 'Thứ năm'
    } else if (now.getDay() === 5) {
      weekDay = 'Thứ sáu'
    } else if (now.getDay() === 6) {
      weekDay = 'Thứ bảy'
    }
    const day = now.getDate() // day [1-31]
    const month = now.getMonth() + 1 // month [0-11]
    const year = now.getFullYear() // year

    state.contractSample.baseLaw = contractObject.contractSample.baseLaw
    state.contractSample.today.weekDay = weekDay
    state.contractSample.today.day = day
    state.contractSample.today.month = month
    state.contractSample.today.year = year
    state.contractSample.dateStarted = contractObject.contractRequestInfo.dateStarted
    state.contractSample.descriptionSum = contractObject.contractSample.descriptionSum
    state.contractSample.partyA.name = 'Bệnh nhân'
    state.contractSample.partyA.fullName = contractObject.contractRequestInfo.fullNamePatient
    state.contractSample.partyA.address = contractObject.contractRequestInfo.addressPatient
    state.contractSample.partyA.phoneNumber = contractObject.contractRequestInfo.phoneNumberPatient
    state.contractSample.partyA.dateOfBirth = contractObject.contractRequestInfo.dobPatient
    state.contractSample.partyA.gender = contractObject.patientInfo.gender
    state.contractSample.partyB.name = 'Bác sĩ'
    state.contractSample.partyB.fullName = contractObject.contractRequestInfo.fullNameDoctor
    state.contractSample.partyB.address = contractObject.contractRequestInfo.addressDoctor
    state.contractSample.partyB.phoneNumber = contractObject.contractRequestInfo.phoneNumberDoctor
    state.contractSample.partyB.dateOfBirth = contractObject.contractRequestInfo.dobDoctor
    state.contractSample.partyB.workLocation = contractObject.contractRequestInfo.workLocationDoctor
    state.contractSample.partyB.specialization = contractObject.contractRequestInfo.specialization
    state.contractSample.timeAndMission.title = contractObject.contractSample.timeAndMission.title
    state.contractSample.timeAndMission.description = contractObject.contractSample.timeAndMission.description
    state.contractSample.workingMode.title = contractObject.contractSample.workingMode.title
    state.contractSample.workingMode.description = contractObject.contractSample.workingMode.description
    state.contractSample.dutyAndInterest[0].name = contractObject.contractSample.dutyAndInterest[0].name
    state.contractSample.dutyAndInterest[0].duty = contractObject.contractSample.dutyAndInterest[0].duty
    state.contractSample.dutyAndInterest[0].interest = contractObject.contractSample.dutyAndInterest[0].interest
    state.contractSample.dutyAndInterest[1].name = contractObject.contractSample.dutyAndInterest[1].name
    state.contractSample.dutyAndInterest[1].duty = contractObject.contractSample.dutyAndInterest[1].duty
    state.contractSample.dutyAndInterest[1].interest = contractObject.contractSample.dutyAndInterest[1].interest
    state.contractSample.disputeResolution.title = contractObject.contractSample.disputeResolution.title
    state.contractSample.disputeResolution.description = contractObject.contractSample.disputeResolution.description
    state.contractSample.collectiveCommitment.title = contractObject.contractSample.collectiveCommitment.title
    state.contractSample.collectiveCommitment.description = contractObject.contractSample.collectiveCommitment.description
    console.log('Thông tin hợp đồng mẫu (contract-sample):::', state.contractSample)
  },
  // Get all request contract success
  success (state, contractRequests) {
    console.log('mutation - success - contractRequest:', contractRequests)
    state.contractRequests = contractRequests.map((contract) => {
      return {
        contractId: contract.contractId,
        contractCode: contract.contractCode,
        fullNamePatient: contract.fullNamePatient,
        note: contract.note,
        daysOfTracking: contract.daysOfTracking,
        dateCreated: contract.dateCreated.split('T')[0],
        diseases: contract.diseases
      }
    })
  },
  failure (state) {
    state.contractRequests = []
  },
  getActiveContracts (state, contractResponse) {
    state.activeContracts = contractResponse.map(contract => {
      return {
        contractCode: contract.contractCode,
        contractId: contract.contractId,
        dateCreated: contract.dateCreated.split('T')[0],
        dateFinished: contract.dateFinished.split('T')[0],
        dateStarted: contract.dateStarted.split('T')[0],
        daysOfTracking: contract.daysOfTracking,
        diseases: contract.diseases.map(disease => {
          return {
            diseaseId: disease.diseaseId,
            diseaseName: disease.name
          }
        }),
        fullNameDoctor: contract.fullNameDoctor,
        fullNamePatient: contract.fullNamePatient,
        nameLicense: contract.nameLicense,
        note: contract.note,
        phoneNumberDoctor: contract.phoneNumberDoctor,
        phoneNumberPatient: contract.phoneNumberPatient,
        priceLicense: contract.priceLicense
      }
    })
    console.log('activeContracts:::', state.activeContracts)
  },
  getFinishContracts (state, contractResponse) {
    state.finishContracts = contractResponse.map(contract => {
      return {
        contractCode: contract.contractCode,
        contractId: contract.contractId,
        dateCreated: contract.dateCreated.split('T')[0],
        dateFinished: contract.dateFinished.split('T')[0],
        dateStarted: contract.dateStarted.split('T')[0],
        daysOfTracking: contract.daysOfTracking,
        diseases: contract.diseases.map(disease => {
          return {
            diseaseId: disease.diseaseId,
            diseaseName: disease.name
          }
        }),
        fullNameDoctor: contract.fullNameDoctor,
        fullNamePatient: contract.fullNamePatient,
        nameLicense: contract.nameLicense,
        note: contract.note,
        phoneNumberDoctor: contract.phoneNumberDoctor,
        phoneNumberPatient: contract.phoneNumberPatient,
        priceLicense: contract.priceLicense
      }
    })
    console.log('finishContracts:::', state.finishContracts)
  },
  getPendingContracts (state, contractResponse) {
    state.pendingContracts = contractResponse.map(contract => {
      return {
        contractCode: contract.contractCode,
        contractId: contract.contractId,
        dateCreated: contract.dateCreated.split('T')[0],
        dateFinished: contract.dateFinished.split('T')[0],
        dateStarted: contract.dateStarted.split('T')[0],
        daysOfTracking: contract.daysOfTracking,
        diseases: contract.diseases.map(disease => {
          return {
            diseaseId: disease.diseaseId,
            diseaseName: disease.name
          }
        }),
        fullNameDoctor: contract.fullNameDoctor,
        fullNamePatient: contract.fullNamePatient,
        nameLicense: contract.nameLicense,
        note: contract.note,
        phoneNumberDoctor: contract.phoneNumberDoctor,
        phoneNumberPatient: contract.phoneNumberPatient,
        priceLicense: contract.priceLicense
      }
    })
    console.log('pendingContracts:::', state.pendingContracts)
  },
  getRejectContracts (state, contractResponse) {
    state.rejectContracts = contractResponse.map(contract => {
      return {
        contractCode: contract.contractCode,
        contractId: contract.contractId,
        dateCreated: contract.dateCreated.split('T')[0],
        dateFinished: contract.dateFinished.split('T')[0],
        dateStarted: contract.dateStarted.split('T')[0],
        daysOfTracking: contract.dateOfTracking,
        diseases: contract.diseases.map(disease => {
          return {
            diseaseId: disease.diseaseId,
            diseaseName: disease.name
          }
        }),
        fullNameDoctor: contract.fullNameDoctor,
        fullNamePatient: contract.fullNamePatient,
        nameLicense: contract.nameLicense,
        note: contract.note,
        phoneNumberDoctor: contract.phoneNumberDoctor,
        phoneNumberPatient: contract.phoneNumberPatient,
        priceLicense: contract.priceLicense
      }
    })
    console.log('rejectContracts:::', state.rejectContracts)
  },
  // Lấy hợp đồng mà bệnh nhân đã request
  getRequestDetailSuccess (state, payloadRequestDetail) {
    state.requestDetail = {}
    // state.requestDetail.contactId = payloadRequestDetail.contractId
    state.requestDetail.fullNameDoctor = payloadRequestDetail.fullNameDoctor
    state.requestDetail.phoneNumberDoctor = payloadRequestDetail.phoneNumberDoctor
    state.requestDetail.workLocationDoctor = payloadRequestDetail.workLocationDoctor
    state.requestDetail.addressDoctor = payloadRequestDetail.addressDoctor
    state.requestDetail.dobDoctor = payloadRequestDetail.dobDoctor.split('T')[0]
    state.requestDetail.fullNamePatient = payloadRequestDetail.fullNamePatient
    state.requestDetail.phoneNumberPatient = payloadRequestDetail.phoneNumberPatient
    state.requestDetail.addressPatient = payloadRequestDetail.addressPatient
    state.requestDetail.dobPatient = payloadRequestDetail.dobPatient.split('T')[0].split('-').reverse().join('-')
    state.requestDetail.contractCode = payloadRequestDetail.contractCode
    state.requestDetail.note = payloadRequestDetail.note
    state.requestDetail.status = payloadRequestDetail.status
    state.requestDetail.dateCreated = payloadRequestDetail.dateCreated
    state.requestDetail.dateStarted = payloadRequestDetail.dateStarted
    state.requestDetail.nameLicense = payloadRequestDetail.nameLicense
    state.requestDetail.priceLicense = payloadRequestDetail.priceLicense
    state.requestDetail.licenseId = payloadRequestDetail.licenseId
    state.requestDetail.doctorId = payloadRequestDetail.doctorId
    state.requestDetail.patientId = payloadRequestDetail.patientId
    state.requestDetail.diseases = payloadRequestDetail.diseases.map(disease => {
      return {
        diseaseId: disease.diseaseId,
        nameDisease: disease.nameDisease
      }
    })
    state.requestDetail.medicalInstructionTypes = payloadRequestDetail.medicalInstructionTypes.map(mit => {
      return {
        medicalInstructionTypeName: mit.medicalInstructionTypeName,
        medicalInstructions: mit.medicalInstructions.map(mi => {
          return {
            image: `http://45.76.186.233:8000/api/v1/Images?pathImage=${mi.image}`,
            description: mi.description,
            diagnose: mi.diagnose
          }
        })
      }
    })
    console.log('Thông tin hợp đồng của người đã yêu cầu (requestDetail)', state.requestDetail)
  },
  // Manage rejectContract
  rejectContract (state) {
    state.rejectDialogVisible = true
  },
  continueAssignContract (state) {
    state.rejectDialogVisible = false
  },
  confirmRejectContract (state) {
    state.rejectDialogVisible = false
    // Set status pending to rejected here
  },
  // Transfer data of request detail from request-detail to confirm-contract
  nextCreateContract (state, payload) {
    // state.contract.contractId = payload.contractId
    state.contract.status = 'active'
    state.contract.patientId = payload.patientId
    state.contract.daysOfTracking = payload.daysOfTracking
    state.contract.dateStarted = payload.dateStarted
    console.log('date started:::', state.contract.dateStarted)
    var dateFinished = new Date(state.contract.dateStarted)
    dateFinished = dateFinished.setDate(dateFinished.getDate() + state.contract.daysOfTracking)
    state.contractSample.dateContractFinished = {
      day: new Date(dateFinished).getDate(),
      month: new Date(dateFinished).getMonth() + 1,
      year: new Date(dateFinished).getFullYear()
    } // Cập nhật ngày kết thúc của hợp đồng
    var price = parseInt(state.contract.daysOfTracking) * state.license.price
    state.contractSample.price = formatPrice(`${price}`, '.') // format giá tiền để hiển thị trong hợp đồng
    console.log('date finish', state.contractSample.price)
    console.log('date finish', state.contractSample.dateContractFinished)
    console.log('contract:::: ', state.contract)
  },
  // set thông tin bệnh nhân để show trong hợp đồng khi ký
  setPatientInfo (state, payloadPatientInfo) {
    state.patientDetail.patientId = payloadPatientInfo.patientId
    state.patientDetail.gender = payloadPatientInfo.gender
    state.patientDetail.email = payloadPatientInfo.email
    state.patientDetail.career = payloadPatientInfo.career
    state.patientDetail.relatives = payloadPatientInfo.relatives
    console.log('patientDetail:::', state.patientDetail)
  },
  // set thông tin hợp đồng khi xem trong nhật ký hoạt động
  setContractDetail (state, payloadContractDetail) {
    state.contractDetail = {}
    state.contractDetail.contractId = payloadContractDetail.contractId
    state.contractDetail.fullNameDoctor = payloadContractDetail.contract.fullNameDoctor
    state.contractDetail.phoneNumberDoctor = payloadContractDetail.contract.phoneNumberDoctor
    state.contractDetail.workLocationDoctor = payloadContractDetail.contract.workLocationDoctor
    state.contractDetail.addressDoctor = payloadContractDetail.contract.addressDoctor
    state.contractDetail.specialization = payloadContractDetail.contract.specialization
    state.contractDetail.dobDoctor = payloadContractDetail.contract.dobDoctor.split('T')[0].split('-').reverse().join('/')
    state.contractDetail.fullNamePatient = payloadContractDetail.contract.fullNamePatient
    state.contractDetail.phoneNumberPatient = payloadContractDetail.contract.phoneNumberPatient
    state.contractDetail.addressPatient = payloadContractDetail.contract.addressPatient
    state.contractDetail.dobPatient = payloadContractDetail.contract.dobPatient.split('T')[0].split('-').reverse().join('/')
    state.contractDetail.genderPatient = payloadContractDetail.contract.genderPatient
    state.contractDetail.contractCode = payloadContractDetail.contract.contractCode
    state.contractDetail.note = payloadContractDetail.contract.note
    state.contractDetail.status = payloadContractDetail.contract.status
    state.contractDetail.dateCreated = payloadContractDetail.contract.dateCreated
    state.contractDetail.dateStarted = payloadContractDetail.contract.dateStarted
    state.contractDetail.dateFinished = payloadContractDetail.contract.dateFinished
    state.contractDetail.nameLicense = payloadContractDetail.contract.nameLicense
    state.contractDetail.priceLicense = formatPrice(payloadContractDetail.contract.priceLicense * payloadContractDetail.contract.daysOfTracking, '.')
    state.contractDetail.licenseId = payloadContractDetail.contract.licenseId
    state.contractDetail.doctorId = payloadContractDetail.contract.doctorId
    state.contractDetail.patientId = payloadContractDetail.contract.patientId
    state.contractDetail.diseases = payloadContractDetail.contract.diseases.map(disease => {
      return {
        diseaseId: disease.diseaseId,
        nameDisease: disease.nameDisease
      }
    })
    state.contractDetail.medicalInstructionTypes = payloadContractDetail.contract.medicalInstructionTypes.map(medicalInstructionType => {
      return {
        medicalInstructionTypeName: medicalInstructionType.medicalInstructionTypeName,
        medicalInstructions: medicalInstructionType.medicalInstructions.map(mi => {
          return {
            image: `http://45.76.186.233:8000/api/v1/Images?pathImage=${mi.image}`,
            description: mi.description,
            diagnose: mi.diagnose
          }
        })
      }
    })
    console.log('Thông tin hợp đồng của người đã yêu cầu (contractDetail)', state.contractDetail)
  },
  // Cập nhật hợp đồng khi xem trong nhật ký hoạt động
  setContractDetailHistory (state, contractObject) {
    state.contractDetailHistory.baseLaw = contractObject.contractSample.baseLaw
    state.contractDetailHistory.today.weekDay = 'Thứ 7'
    state.contractDetailHistory.today.day = 13
    state.contractDetailHistory.today.month = 3
    state.contractDetailHistory.today.year = 2021
    state.contractDetailHistory.descriptionSum = contractObject.contractSample.descriptionSum
    state.contractDetailHistory.dateStarted = contractObject.contractDetailInfo.dateStarted.split('T')[0].split('-').reverse().join('/')
    state.contractDetailHistory.dateFinished = contractObject.contractDetailInfo.dateFinished.split('T')[0].split('-').reverse().join('/')
    state.contractDetailHistory.partyA.name = 'Bênh nhân'
    state.contractDetailHistory.priceLicense = contractObject.contractDetailInfo.priceLicense
    state.contractDetailHistory.partyA.fullName = contractObject.contractDetailInfo.fullNamePatient
    state.contractDetailHistory.partyA.address = contractObject.contractDetailInfo.addressPatient
    state.contractDetailHistory.partyA.phoneNumber = contractObject.contractDetailInfo.phoneNumberPatient
    state.contractDetailHistory.partyA.dateOfBirth = contractObject.contractDetailInfo.dobPatient
    state.contractDetailHistory.partyA.gender = contractObject.contractDetailInfo.genderPatient
    state.contractDetailHistory.partyB.name = 'Bác sĩ'
    state.contractDetailHistory.partyB.fullName = contractObject.contractDetailInfo.fullNameDoctor
    state.contractDetailHistory.partyB.address = contractObject.contractDetailInfo.addressDoctor
    state.contractDetailHistory.partyB.phoneNumber = contractObject.contractDetailInfo.phoneNumberPatient
    state.contractDetailHistory.partyB.dateOfBirth = contractObject.contractDetailInfo.dobDoctor
    state.contractDetailHistory.partyB.workLocation = contractObject.contractDetailInfo.workLocationDoctor
    state.contractDetailHistory.partyB.specialization = contractObject.contractDetailInfo.specialization
    state.contractDetailHistory.timeAndMission.title = contractObject.contractSample.timeAndMission.title
    state.contractDetailHistory.timeAndMission.description = contractObject.contractSample.timeAndMission.description
    state.contractDetailHistory.workingMode.title = contractObject.contractSample.workingMode.title
    state.contractDetailHistory.workingMode.description = contractObject.contractSample.workingMode.description
    state.contractDetailHistory.dutyAndInterest[0].name = contractObject.contractSample.dutyAndInterest[0].name
    state.contractDetailHistory.dutyAndInterest[0].duty = contractObject.contractSample.dutyAndInterest[0].duty
    state.contractDetailHistory.dutyAndInterest[0].interest = contractObject.contractSample.dutyAndInterest[0].interest
    state.contractDetailHistory.dutyAndInterest[1].name = contractObject.contractSample.dutyAndInterest[1].name
    state.contractDetailHistory.dutyAndInterest[1].duty = contractObject.contractSample.dutyAndInterest[1].duty
    state.contractDetailHistory.dutyAndInterest[1].interest = contractObject.contractSample.dutyAndInterest[1].interest
    state.contractDetailHistory.disputeResolution.title = contractObject.contractSample.disputeResolution.title
    state.contractDetailHistory.disputeResolution.description = contractObject.contractSample.disputeResolution.description
    state.contractDetailHistory.collectiveCommitment.title = contractObject.contractSample.collectiveCommitment.description
    state.contractDetailHistory.collectiveCommitment.description = contractObject.contractSample.collectiveCommitment.description

    console.log('Thông tin hợp đồng (contractDetailHistory):::', state.contractDetailHistory)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
