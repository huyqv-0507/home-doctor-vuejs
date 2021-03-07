/* eslint-disable no-tabs */
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import router from '../../router/index.js'
import Vue from 'vue'
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
    daysOfTracking: '', // Số ngày theo dõi
    diseases: [], // Bệnh lý của bệnh nhân
    doctorId: '', // Id của bác sĩ
    patientId: '', // Id của bệnh nhân
    licenseId: '', // Id của gói bệnh nhân chọn
    medicalInstructionShared: [] // Các medicalInstruction (đơn thuốc, phiếu khám chữa bệnh...) bệnh nhân đã chia sẻ cho bác sĩ lúc ký hợp đồng
  },
  rejectDialogVisible: false,
  contractCode: '',
  cancelContractVisible: false,
  // Hợp đồng để thêm vào database
  contract: {
    contractId: '', // Id của hợp đồng
    status: 'Finished', // Trạng thái của hợp đồng (Để update xuống database)
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
  contractForm: {
    intro: {
      socialLegal: 'Căn cứ Bộ luật Dân sự ngày 14 tháng 6 năm 2005;', // Bộ luật dân sự
      medicalExaminationAndTreatmentLaw: 'Căn cứ Luật khám bệnh, chữa bệnh ngày 23 tháng 11 năm 2009;', // Luật khám chữa bệnh
      decree: 'Căn cứ Nghị định số 87/2011/NĐ-CP ngày 27 tháng 9 năm 2011 của Chính phủ quy định chi tiết và hướng dẫn thi hành một số điều của Luật khám bệnh, chữa bệnh;', // Nghị định
      circular: 'Căn cứ Thông tư số 41/2015/TT-BYT ngày 16 tháng 11 năm 2015 của Bộ trưởng Bộ Y tế Hướng dẫn cấp chứng chỉ hành nghề đối với người hành nghề và cấp giấy phép hoạt động đối với cơ sở khám bệnh, chữa bệnh;' // Thông tư
    },
    today: function () {
      const now = new Date()
      const day = now.getDate() // day [1-31]
      const month = now.getMonth() + 1 // month [0-11]
      const year = now.getFullYear() // year
      return `Hôm nay, ngày ${day} tháng ${month} năm ${year}`
    },
    timeAndMission: {
      title: 'Thời hạn và nhiệm vụ hợp đồng',
      description: 'Bên A khám và chữa bệnh cho bên B'
    },
    workingMode: {
      title: 'Chế độ làm việc',
      description: 'Sử dụng HDr System để hỗ trợ khám và chữa bệnh cho bên A'
    },
    dutyAndInterest: [
      {
        name: 'Sử dụng dịch vụ khám chữa bệnh',
        duty: [
          'Hoàn thành những nhiệm vụ đã cam kết trong hợp đồng thực hành',
          'Chấp hành nội quy, quy chế của đơn vị, kỷ luật làm việc và các quy định của cơ sở khám bệnh, chữa bệnh',
          'Chấp hành việc xử lý kỷ luật và bồi thường thiệt hại theo quy định của pháp luật',
          'Trả phí thực hành theo thỏa thuận'
        ],
        interest: [
          'Được khám bệnh, chữa bệnh, chăm sóc người bệnh dưới sự giám sát của người hướng dẫn thực hành',
          'Có quyền đề xuất, khiếu nại, thay đổi, đề nghị chấm dứt hợp đồng theo quy định của pháp luật.'
        ]
      },
      {
        name: 'Cung cấp dịch vụ khám chữa bệnh',
        duty: [
          'Xác nhận quá trình thực hành theo quy định của Luật khám bệnh, chữa bệnh ngày 23 tháng 11 năm 2009; Nghị định số 87/2011/NĐ-CP ngày 27 tháng 9 năm 2011 của Chính phủ quy định chi tiết và hướng dẫn thi hành một số điều của Luật khám bệnh, chữa bệnh và Thông tư số41/2011/TT-BYT ngày 14 tháng 11 năm 2011 của Bộ trưởng Bộ Y tế Hướng dẫn cấp chứng chỉ hành nghề đối với người hành nghề và cấp giấy phép hoạt động đối với cơ sở khám bệnh, chữa bệnh',
          'Bản đảm việc làm và thực hiện đầy đủ những điều đã cam kết trong hợp đồng làm việc',
          'Thanh toán đầy đủ, đúng thời hạn các chế độ và quyền lợi của người tham gia thực hành đã cam kết trong hợp đồng làm việc'
        ],
        interest: [
          'Điều hành người tham gia thực hành hoàn thành công việc theo hợp đồng (Bố trí, điều động, tạm đình chỉ công việc …)',
          'Chấm dứt Hợp đồng làm việc, kỷ luật người tham gia thực hành theo quy định của Pháp luật'
        ]
      }
    ],
    termEnforcement: {
      title: 'Điều khoản thi hành',
      description: [
        'Hai bên cam kết thực hiện đúng những điều khoản trong hợp đồng, những vấn đề phát sinh khác ngoài hợp đồng, kể cả việc kéo dài hoặc chấm dứt hợp đồng trước thời hạn sẽ được hai bên cùng thảo luận giải quyết (thể hiện bằng các phụ lục kèm theo hợp đồng)',
        'Hai bên cam kết thực hiện đúng các quy định về pháp luật và những điều khoản có trong hợp đồng',
        'Trong trường hợp thay đổi hoặc chấm dứt hợp đồng trước thời hạn, hai bên phải thông báo cho nhau trước một tháng để đảm bảo quyền lợi cho hai bên',
        'Hai bên thống nhất phối hợp và sử dụng ứng dụng HDr cho việc theo dõi bệnh.'
      ]
    }
  }
})
const getters = {
}
const actions = {
  // Get all contract requests
  getContractRequestPending ({ commit }, payloadUser) {
    console.log('Action - getContractRequestPending() - payloadUser:', payloadUser)
    contractRepository.getContractRequestPending(payloadUser[0]).then(response => {
      console.log(response.data)
      if (response.status === 200) {
        commit('success', response.data)
      } else {
        commit('failure')
      }
    }).catch(error => {
      console.log(error)
      commit('failure')
    })
  },

  // Get request detail by patientId when doctor click [0] is patientId, [1] is contractCode
  getRequestDetail ({ commit, dispatch, rootState }, payloadContractId) {
    console.log(`Action - getRequestDetail() - payloadPatientId: ${payloadContractId}`)
    // Gọi repository để lấy thông tin yêu cầu
    rootState.contracts.contractImgs = []
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
    contractRepository.getMedicalInstructionShared(payloadContractId).then(response => {
      console.log('action - getRequestDetail() - getMedicalInstructionShared -', response.data)
      if (response.status === 200) {
        commit('setMedicalInstructionShared', response.data)
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
        Vue.notify({
          type: 'success',
          title: 'Thông báo',
          text: 'Huỷ hợp đồng thành công!',
          duration: 5000
        })
      }
    }).catch(error => {
      console.log(error)
      Vue.notify({
        type: 'error',
        title: 'Thông báo',
        text: 'Huỷ hợp đồng không thành công!',
        duration: 5000
      })
    })
    commit('confirmRejectContract')
  },

  // Next to create Contract
  nextCreateContract ({ commit, state, rootState }, payload) {
    console.log(`nextCreateContract: ${payload}`)
    commit('nextCreateContract', payload)
    state.contract.doctorId = rootState.users.user.userId
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
        Vue.notify({
          type: 'success',
          title: 'Thông báo',
          text: 'Tạo hợp đồng thành công!',
          duration: 5000
        })
        dispatch('contracts/getActiveContracts', null, { root: true })
        router.go(-3)
      } else if (response.status === 405) {
        Vue.notify({
          type: 'error',
          title: 'Thông báo',
          text: 'Xin lỗi, hiện tại bạn đã đủ 5 hợp đồng.',
          duration: 5000
        })
      }
    }).catch(error => {
      console.log(error)
      Vue.notify({
        type: 'error',
        title: 'Thông báo',
        text: 'Tạo hợp đồng không thành công!',
        duration: 5000
      })
    })
  },
  getActiveContracts ({ commit, rootState }) {
    contractRepository.getActiveContracts(rootState.users.user.userId).then(response => {
      console.log('activeContracts: ', response.data)
      if (response.status === 200) {
        commit('getActiveContracts', response.data)
      }
    })
  },
  getFinishContracts ({ commit, rootState }) {
    contractRepository.getFinishContracts(rootState.users.user.userId).then(response => {
      console.log('finishContracts: ', response.data)
      if (response.status === 200) {
        commit('getFinishContracts', response.data)
      }
    })
  },
  getRejectContracts ({ commit, rootState }) {
    contractRepository.getRejectContracts(rootState.users.user.userId).then(response => {
      console.log('rejectContracts: ', response.data)
      if (response.status === 200) {
        commit('getRejectContracts', response.data)
      }
    })
  },
  getPendingContracts ({ commit, rootState }) {
    contractRepository.getPendingContracts(rootState.users.user.userId).then(response => {
      console.log('pendingContracts: ', response.data)
      if (response.status === 200) {
        commit('getPendingContracts', response.data)
      }
    })
  }
}
const mutations = {
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
        dateCreated: contract.dateCreated.split('T')[0].split('-').reverse().join('-'),
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
        dateCreated: contract.dateCreated.split('T')[0].split('-').reverse().join('-'),
        dateFinished: contract.dateFinished.split('T')[0].split('-').reverse().join('-'),
        dateStarted: contract.dateStarted.split('T')[0].split('-').reverse().join('-'),
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
  },
  getFinishContracts (state, contractResponse) {
    state.finishContracts = contractResponse.map(contract => {
      return {
        contractCode: contract.contractCode,
        contractId: contract.contractId,
        dateCreated: contract.dateCreated.split('T')[0].split('-').reverse().join('-'),
        dateFinished: contract.dateFinished.split('T')[0].split('-').reverse().join('-'),
        dateStarted: contract.dateStarted.split('T')[0].split('-').reverse().join('-'),
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
  },
  getPendingContracts (state, contractResponse) {
    state.pendingContracts = contractResponse.map(contract => {
      return {
        contractCode: contract.contractCode,
        contractId: contract.contractId,
        dateCreated: contract.dateCreated.split('T')[0].split('-').reverse().join('-'),
        dateFinished: contract.dateFinished.split('T')[0].split('-').reverse().join('-'),
        dateStarted: contract.dateStarted.split('T')[0].split('-').reverse().join('-'),
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
  },
  getRejectContracts (state, contractResponse) {
    state.rejectContracts = contractResponse.map(contract => {
      return {
        contractCode: contract.contractCode,
        contractId: contract.contractId,
        dateCreated: contract.dateCreated.split('T')[0].split('-').reverse().join('-'),
        dateFinished: contract.dateFinished.split('T')[0].split('-').reverse().join('-'),
        dateStarted: contract.dateStarted.split('T')[0].split('-').reverse().join('-'),
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
  },
  getRequestDetailSuccess (state, payloadRequestDetail) {
    state.requestDetail.contractId = payloadRequestDetail.contractId
    state.requestDetail.fullNameDoctor = payloadRequestDetail.fullNameDoctor
    state.requestDetail.phoneNumberDoctor = payloadRequestDetail.phoneNumberDoctor
    state.requestDetail.workLocationDoctor = payloadRequestDetail.workLocationDoctor
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
    state.requestDetail.licenseId = payloadRequestDetail.licenseId
    state.requestDetail.doctorId = payloadRequestDetail.doctorId
    state.requestDetail.patientId = payloadRequestDetail.patientId
    console.log('Finally - requestDetail', state.requestDetail)
  },
  setMedicalInstructionShared (state, medicalInstructionShared) {
    console.log('medicalInstructionShared,', medicalInstructionShared)
    state.requestDetail.medicalInstructionShared = medicalInstructionShared.map(mis => {
      return {
        medicalInstructionType: mis.medicalInstructionType,
        images: mis.medicalInstructions.map(i => {
          return {
            image: `http://45.76.186.233:8000/api/v1/Images?pathImage=${i.image}`,
            description: i.description,
            diagnose: i.diagnose
          }
        })
      }
    })

    /* state.requestDetail.medicalInstructionShared = [
							  {
								medicalInstructionType: 'Đơn thuốc',
								images: [
								  {
									image: 'https://firebasestorage.googleapis.com/v0/b/homedoctor-b1f7e.appspot.com/o/benhannoikhoa1.jpg?alt=media&token=5277e9a2-b8a6-42da-9f2b-ee0aeb969c55',
									description: 'homedoctor1'
								  },
								  {
									image: 'https://firebasestorage.googleapis.com/v0/b/homedoctor-b1f7e.appspot.com/o/benhannoikhoa1.jpg?alt=media&token=5277e9a2-b8a6-42da-9f2b-ee0aeb969c55',
									description: 'homedoctor2'
								  }
								],
								index: ''
							  },
							  {
								medicalInstructionType: 'Phiếu xét nghiệm',
								images: [
								  {
									image: 'https://firebasestorage.googleapis.com/v0/b/homedoctor-b1f7e.appspot.com/o/benhannoikhoa1.jpg?alt=media&token=5277e9a2-b8a6-42da-9f2b-ee0aeb969c55',
									description: 'homedoctor3'
								  },
								  {
									image: 'https://firebasestorage.googleapis.com/v0/b/homedoctor-b1f7e.appspot.com/o/benhannoikhoa1.jpg?alt=media&token=5277e9a2-b8a6-42da-9f2b-ee0aeb969c55',
									description: 'homedoctor4'
								  }
								],
								index: null
							  }
							// eslint-disable-next-line no-tabs
							] */
    // state.requestDetail.medicalInstructionShared.forEach(mi => {
    //  state.contractImgs = state.contractImgs.concat(mi.images)
    // })
    console.log('shared: ', state.requestDetail.medicalInstructionShared)
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
    console.log('nextCreateContract', payload)
    state.contract.contractId = payload.contractId
    state.contract.status = 'active'
    state.contract.patientId = payload.patientId
    state.contract.dateStarted = payload.dateStarted
    state.contract.daysOfTracking = payload.daysOfTracking
    console.log('contract: ', state.contract)
  },
  setPatientInfo (state, payloadPatientInfo) {
    console.log('setPatientInfo')
    console.log(payloadPatientInfo)
    state.patientDetail.patientId = payloadPatientInfo.patientId
    state.patientDetail.gender = payloadPatientInfo.gender
    state.patientDetail.email = payloadPatientInfo.email
    state.patientDetail.career = payloadPatientInfo.career
    state.patientDetail.relatives = payloadPatientInfo.relatives
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
