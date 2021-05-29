import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import router from '../../router'
import { Message, Notification } from 'element-ui'
import { groupBy } from '../../utils/common'

const patientRepository = RepositoryFactory.get('patientRepository')
const medicalInstructionRepository = RepositoryFactory.get('medicalInstructionRepository')

const state = () => ({
  approvedPatients: [], // Danh sách bệnh nhân đang theo dõi
  patientHealth: {}, // Sức khoẻ cá nhân của từng bệnh nhân. Show ở trang chủ
  patientStatus: {
    'Bình thường': 3,
    'Bất thường': 2,
    'Nguy hiểm': 1
  },
  patientOverview: {},
  medicalInstructionsOfHR: {
    share: [],
    healthRecord: []
  },
  requestMedicalInstructions: [],
  medicalInstructionsByType: [],
  contractStatus: null
})
const getters = {
  getPatientApproveByContract: (state) => (contractId) => {
    return state.approvedPatients.find(patient => patient.contractId === contractId)
  }
}
const actions = {
  goToPatientHealth ({ commit, dispatch }, data) {
    console.log('goToPatientHealth', data)
    dispatch('medicalInstruction/selectPatient', data, { root: true }).then(() => {
      router.push('/home/patient-detail')
      dispatch('vitalSign/getVitalSignValueByHRId', null, { root: true })
    })
  },
  // Lấy trạng thái vital sign của bệnh nhân
  async getOverviews ({ commit, rootState, state }) {
    await patientRepository.getOverviewPatient(rootState.medicalInstruction.patientSelected.healthRecordId).then(response => {
      if (response.status === 200) {
        rootState.medicalInstruction.patientSelected.accountPatientId = response.data.accountPatientId
        patientRepository.getHealthRecordDetailById(rootState.medicalInstruction.patientSelected.healthRecordId).then(contractStatus => {
          state.contractStatus = null
          console.log('contractStatus', contractStatus.data)
          state.contractStatus = contractStatus.data.contractStatus
        }).catch(err => {
          console.error(err)
        })
        commit('setOverviews', response.data)
      }
    }).catch(err => {
      console.error(err)
    })
  },
  // Lấy danh sách bệnh nhân đang được theo dõi
  async getPatientApproved ({ commit, rootState, rootGetters }) {
    var doctorId = rootState.users.user.userId
    await patientRepository.getPatientApproved(doctorId).then(response => {
      var data = response.data
      commit('setPatientApproved', { data, rootGetters })
    }).catch((err) => {
      if (err.message) {
        commit('setPatientApprovedFailure', [])
      }
    })
  },
  // Đi tới trang patient-detail
  async goToPatientDetail ({ dispatch, rootState }) {
    rootState.tabs.tabStatus = {
      overview: true,
      timeline: false,
      vitalSign: false,
      healthRecord: false,
      activity: false
    }
    await dispatch('getOverviews')
    router.push({ path: '/patient-detail-page' })
  },
  goToFinishPatientDetail ({ state, dispatch }, finishPatient) {
    const patient = {
      patientId: finishPatient.patientId,
      contractId: finishPatient.contractId,
      healthRecordId: -1,
      accountPatientId: -1,
      from: 'FINISHED'
    }
    patientRepository.getHealthRecordByPatientId(patient.patientId).then(response => {
      const healthRecords = response.data
      healthRecords.forEach(healthRecord => {
        if (patient.contractId === healthRecord.contractId) {
          patient.healthRecordId = healthRecord.healthRecordId
          dispatch('medicalInstruction/selectPatient', patient, { root: true }).then(() => {
            dispatch('goToPatientDetail')
            patientRepository.getHealthRecordDetailById(patient.healthRecordId).then(response => {
              state.contractStatus = null
              console.log('contractStatus - database', response.data)
              state.contractStatus = response.data.contractStatus
            }).catch(err => {
              console.error(err)
            })
          }).catch(err => {
            console.error(err)
          })
        }
      })
    })
  },
  // Lấy thông tin tổng quan của bệnh nhân từ database
  getOverviewPatient ({ commit, state }) {
    patientRepository.getOverviewPatient(state.healthRecordUsing.healthRecordId).then(response => {
      if (response.status === 200) {
        commit('setOverviewPatient', response.data)
      }
    })
  },
  sendRequestMedicalInstruction ({ rootState, dispatch }, medicalInstructionType) {
    const params = {
      doctorAccountId: rootState.users.user.accountId,
      patientAccountId: rootState.medicalInstruction.patientSelected.accountPatientId,
      medicalInstructionTypeId: medicalInstructionType.medicalInstructionTypeId,
      note: medicalInstructionType.note,
      contractId: rootState.medicalInstruction.patientSelected.contractId
    }
    console.log('param action', params)
    medicalInstructionRepository.requestMedicalInstruction(params).then(response => {
      Notification.success({ title: 'Thông báo', message: 'Gửi yêu cầu cung cấp y lệnh thành công!', duration: 7000 })
      dispatch('modals/closeRequestMedicalInstruction', null, { root: true })
    }).catch(err => {
      console.log(err)
      Notification.error({ title: 'Thông báo', message: 'Gửi yêu cầu cung cấp y lệnh thất bại!', duration: 7000 })
    })
  },
  getRequestMedicalInstructions ({ commit, rootState, state }) {
    if (rootState.medicalInstruction.patientSelected !== null) {
      medicalInstructionRepository.getMedicalInstructionsByHRId(rootState.medicalInstruction.patientSelected.healthRecordId).then(response => {
        commit('setRequestMedicalInstructions', response.data)
      }).catch((err) => {
        state.requestMedicalInstructions = []
        console.log(err)
      })
    }
  },
  getMedicalInstructionsByType ({ commit, rootState }) {
    medicalInstructionRepository.getMedicalInstructionsByHRId(rootState.medicalInstruction.patientSelected.healthRecordId).then(response => {
      commit('setMedicalInstructionsByType', response.data)
    }).catch((err) => {
      console.log(err)
    })
  },
  // Lấy medical instruction theo healthRecordId
  getMedicalInstructionsByHRId ({ commit, rootState }) {
    medicalInstructionRepository.getMedicalInstructionsByHRId(rootState.medicalInstruction.patientSelected.healthRecordId).then(response => {
      if (response.status === 200) {
        commit('setMedicalInstructionsByHRId', response.data)
      }
    }).catch((error) => {
      console.log(error)
      Message.error({ showClose: true, message: 'Vui lòng kiểm tra kết nối mạng.', duration: 4000 })
    })
  },
  sendNoteWhenDanger ({ dispatch, rootState }, note) {
    patientRepository.sendNoteWhenDanger({ doctorAccountId: rootState.users.user.accountId, patientAccountId: rootState.medicalInstruction.patientSelected.accountPatientId, bodyCustom: note }).then(response => {
      Notification.success({ title: 'Thông báo', message: 'Gửi nhắc nhở thành công', duration: 7000 })
      dispatch('modals/closeSelectMedicalInstructionModalSub', null, { root: true })
    }).catch(err => {
      console.log(err)
      Notification.error({ title: 'Thông báo', message: 'Gửi nhắc nhở thành công', duration: 7000 })
    })
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  setOverviews (state, data) {
    try {
      const medicalInstructions = data.medicalInstructions === null ? null : data.medicalInstructions.map(mi => {
        return {
          diagnose: mi.diagnose,
          images: mi.images === null ? null : mi.images.map(i => {
            return {
              isChoose: false,
              url: `http://45.76.186.233:8000/api/v1/Images?pathImage=${i}`
            }
          }),
          medicalInstructionId: mi.medicalInstructionId,
          medicalInstructionType: mi.medicalInstructionType,
          prescriptionId: mi.prescriptionId,
          vitalSignScheduleId: mi.vitalSignScheduleId
        }
      })
      state.patientOverview = {
        address: data.addressPatient,
        appointmentNext: data.appointmentNext === null ? null : {
          appointmentId: data.appointmentNext.appointmentId,
          dateExamination: data.appointmentNext.dateExamination,
          description: data.appointmentNext.description,
          medicalInstructionId: data.appointmentNext.medicalInstructionId,
          note: data.appointmentNext.note,
          status: data.appointmentNext.status
        },
        career: data.career,
        contractDetail: {
          contractId: data.contractDetail.contractId,
          dateFinished: data.contractDetail.dateFinished,
          dateStarted: data.contractDetail.dateStarted
        },
        diseases: data.diseases.map(disease => {
          return {
            diseaseId: disease.diseaseId,
            diseaseName: disease.diseaseName
          }
        }),
        dateOfBirth: data.dobPatient,
        familyMedicalHistory: data.familyMedicalHistory,
        fullName: data.fullNamePatient,
        gender: data.gender === 'Male' ? 'Nam' : '' || data.gender === 'Female' ? 'Nữ' : '',
        height: data.height,
        medicalInstructions: medicalInstructions === null ? null : groupBy(medicalInstructions, 'medicalInstructionType', 'medicalInstructionTypeName', 'medicalInstructions'),
        personalMedicalHistory: data.personalMedicalHistory,
        phoneNumber: data.phoneNumberPatient,
        smartWatchConnected: data.smartWatchConnected,
        weight: data.weight
      }
    } catch (error) {
      console.log('error at patients - mutations - setOverview', error)
      state.patientOverview = null
    }
    console.log('patientOverview>>>', state.patientOverview)
  },
  setPatientApprovedFailure (state, empty) {
    state.approvedPatients = empty
  },
  setPatientApproved (state, { data, rootGetters }) {
    // var patientVitalSign = {}
    try {
      state.approvedPatients = data.map(patient => {
        // patientVitalSign = rootGetters['vitalSign/findStatusOfPatient'](patient.patientId)
        const status = patient.personalStatus
        var patientStatus = 'Chưa xác định'
        switch (status) {
          case 'NORMAL':
            patientStatus = 'Bình thường'
            break
          case 'DANGER':
            patientStatus = 'Nguy hiểm'
            break
          case null:
            patientStatus = 'Chưa xác định'
            break
          default:
            patientStatus = 'Chưa xác định'
            break
        }
        return {
          accountPatientId: patient.accountPatientId,
          contractId: patient.contractId,
          diseaseContract: patient.diseaseContract,
          healthRecordId: patient.healthRecordId,
          patientId: patient.patientId,
          patientName: patient.patientName,
          contractStatus: patient.contractStatus,
          isScheduleVitalSign: patient.contractStatus,
          isSchedulePrescription: patient.prescriptionFirst,
          isScheduleAppointment: patient.appointmentFirst,
          appointmentLast: patient.appointmentLast,
          dateAppointment: patient.appointmentLast === null ? null : patient.appointmentLast.split('T')[0].split('-').reverse().join('/'),
          hourAppointment: patient.appointmentLast === null ? null : patient.appointmentLast.split('T')[1].split(':')[0],
          minuteAppointment: patient.appointmentLast === null ? null : patient.appointmentLast.split('T')[1].split(':')[1],
          // status: patientVitalSign.status,
          status: patientStatus,
          dateUpdateStatus: patient.dateUpdateStatus === null ? null : patient.dateUpdateStatus.split('T')[0],
          isDeviceConnected: true
        }
      }).sort((a, b) => state.patientStatus[a.status] - state.patientStatus[b.status])
      console.log('patients - state - approvedPatients:::', state.approvedPatients)
    } catch (error) {
      console.error(error)
    }
  },
  setPatientUsing (state, patientUsing) {
    state.patientDetailUsing.patientId = patientUsing.patientId
    state.patientDetailUsing.contractId = patientUsing.contractId
    state.patientDetailUsing.accountPatientId = patientUsing.accountPatientId
  },
  setHealthRecordUsing (state, healthRecordId) {
    state.healthRecordUsing.healthRecordId = healthRecordId
  },
  setMedicalInstructionsByHRId (state, medicalInstructions) {
    state.medicalInstructionsOfHR = {
      share: [],
      healthRecord: []
    }
    medicalInstructions.forEach(element => {
      if (element.status === 'PATIENT' || element.status === 'CONTRACT') {
        state.medicalInstructionsOfHR.share.push(element)
      } else {
        state.medicalInstructionsOfHR.healthRecord.push(element)
      }
    })
    state.medicalInstructionsOfHR.share = state.medicalInstructionsOfHR.share.reduce((medicalInstructionsOfHR, currentMedicalInstruction) => {
      // rest param
      var fieldMedicalInstructionTypeName = currentMedicalInstruction.medicalInstructionTypeName
      medicalInstructionsOfHR[fieldMedicalInstructionTypeName] = [...medicalInstructionsOfHR[fieldMedicalInstructionTypeName] || [], currentMedicalInstruction]
      return medicalInstructionsOfHR
    }, {})
    state.medicalInstructionsOfHR.healthRecord = state.medicalInstructionsOfHR.healthRecord.reduce((medicalInstructionsOfHR, currentMedicalInstruction) => {
      // rest param
      var fieldMedicalInstructionTypeName = currentMedicalInstruction.medicalInstructionTypeName
      medicalInstructionsOfHR[fieldMedicalInstructionTypeName] = [...medicalInstructionsOfHR[fieldMedicalInstructionTypeName] || [], currentMedicalInstruction]
      return medicalInstructionsOfHR
    }, {})
    console.log('medicalInstructions', state.medicalInstructionsOfHR)
    var shareKeys = Object.keys(state.medicalInstructionsOfHR.share)
    var healthRecordKeys = Object.keys(state.medicalInstructionsOfHR.healthRecord)

    var shareValues = Object.values(state.medicalInstructionsOfHR.share)
    var healthRecordValues = Object.values(state.medicalInstructionsOfHR.healthRecord)

    var tmpShare = []
    var tpmHealthRecord = []

    for (let index = 0; index < shareKeys.length; index++) {
      var tmpShareObj = {
        medicalInstructionTypeName: shareKeys[index],
        medicalInstructions: shareValues[index]
      }
      tmpShare.push(tmpShareObj)
    }

    for (let index = 0; index < healthRecordKeys.length; index++) {
      var tmpHealthRecordObj = {
        medicalInstructionTypeName: healthRecordKeys[index],
        medicalInstructions: healthRecordValues[index]
      }
      tpmHealthRecord.push(tmpHealthRecordObj)
    }

    state.medicalInstructionsOfHR.share = tmpShare
    state.medicalInstructionsOfHR.healthRecord = tpmHealthRecord

    state.medicalInstructionsOfHR = {
      share: state.medicalInstructionsOfHR.share.map(medicalInstruction => {
        return {
          medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName,
          medicalInstructions: medicalInstruction.medicalInstructions.map(m => {
            return {
              dateCreated: m.dateCreate,
              description: m.description,
              diagnose: m.diagnose,
              image: m.images === null ? null : `http://45.76.186.233:8000/api/v1/Images?pathImage=${m.images}`,
              medicalInstructionId: m.medicalInstructionId,
              patientFullName: m.patientFullName,
              placeHealthRecord: m.placeHealthRecord,
              prescriptionRespone: m.prescriptionRespone,
              status: m.status
            }
          })
        }
      }),
      healthRecord: state.medicalInstructionsOfHR.healthRecord.map(medicalInstruction => {
        return {
          medicalInstructionTypeName: medicalInstruction.medicalInstructionTypeName,
          medicalInstructions: medicalInstruction.medicalInstructions.map(m => {
            return {
              dateCreated: m.dateCreate,
              description: m.description,
              diagnose: m.diagnose,
              image: m.images === null ? null : `http://45.76.186.233:8000/api/v1/Images?pathImage=${m.images}`,
              medicalInstructionId: m.medicalInstructionId,
              patientFullName: m.patientFullName,
              placeHealthRecord: m.placeHealthRecord,
              prescriptionRespone: m.prescriptionRespone,
              status: m.status
            }
          })
        }
      })
    }

    console.log('medicalInstructionsOfHR final>>>', state.medicalInstructionsOfHR)
  },
  setMedicalInstructionsByType (state, medicalInstructions) {
    medicalInstructions = medicalInstructions.filter(mi => {
      return mi.status !== 'PENDING'
    })
    try {
      const tmpMI = medicalInstructions.map(mi => {
        return {
          medicalInstructionId: mi.medicalInstructionId,
          medicalInstructionTypeId: mi.medicalInstructionTypeId,
          medicalInstructionTypeName: mi.medicalInstructionTypeName,
          diseases: mi.diseases === null ? null : mi.diseases,
          dateCreate: mi.dateCreate,
          images: mi.images === null ? null : `http://45.76.186.233:8000/api/v1/Images?pathImage=${mi.images}`
        }
      })
      state.medicalInstructionsByType = groupBy(tmpMI, 'medicalInstructionTypeName', 'medicalInstructionTypeName', 'medicalInstructions')
      console.log(state.medicalInstructionsByType)
    } catch (error) {
      console.log('setMedicalInstructionsByType', error)
    }
  },
  setRequestMedicalInstructions (state, medicalInstructions) {
    state.requestMedicalInstructions = []
    medicalInstructions.forEach(mi => {
      if (mi.status === 'PENDING') {
        state.requestMedicalInstructions.push(mi)
        if (mi.images !== null) {
          mi.images = mi.images.map(i => {
            return `http://45.76.186.233:8000/api/v1/Images?pathImage=${i}`
          })
        }
      }
    })
    console.log('state.requestMedicalInstructions', state.requestMedicalInstructions)
  },
  clearState (state) {
    state = () => ({})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
