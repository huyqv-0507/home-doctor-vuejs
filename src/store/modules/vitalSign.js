/* eslint-disable quotes */
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Notification } from 'element-ui'
import { formatDateToInsertDb } from '../../utils/common'
export function VitalSign (vitalSignId, numberMax, numberMin, minuteDangerInterval, timeStart, minuteAgain) {
  return {
    vitalSignTypeId: vitalSignId,
    numberMax: numberMax,
    numberMin: numberMin,
    minuteDangerInterval: minuteDangerInterval,
    timeStart: timeStart,
    minuteAgain: minuteAgain
  }
}
const vitalSignRepository = RepositoryFactory.get('vitalSignRepository')
const state = () => ({
  deviceConnecting: {},
  vitalSignOverviews: [] // Danh sách vital sign của bệnh nhân đang được theo dõi
})
const getters = {
  findStatusOfPatient: state => (patientId) => {
    return state.vitalSignOverviews.find(patientVitalSign => patientVitalSign.patientId === parseInt(patientId))
  }
}
const actions = {
  getDeviceSupportServices ({ commit }) {
    var device = vitalSignRepository.getDeviceSupportServices()
    commit('setDeviceConnecting', device)
  },
  getVitalSignOverviews ({ commit }) {
    /* vitalSignRepository.getVitalSignOverviews().then(response => {
      if (response.status === 200) {
        commit('setVitalSignOverviews', response.data)
      }
      }).catch((error) => {
        console.log('error at vitalSign - getVitalSignOverviews', error)
      }) */
    commit('setVitalSignOverviews', [
      {
        patientId: 2,
        status: 'Bình thường'
      },
      {
        patientId: 1004,
        status: 'Nguy hiểm'
      }
    ])
  },
  confirmVitalSign ({ commit, rootState }, vitalSign) {
    var heartRate = new VitalSign(1, vitalSign.minHeartRate, vitalSign.maxHeartRate, vitalSign.rangeDangerTimeHeartRate, '', 0)
    var bloodPressure = new VitalSign(2, vitalSign.minBloodPressure, vitalSign.maxBloodPressure, vitalSign.rangeDangerTimeBloodPressure, '', 0)
    // var acidUric = new VitalSign(3, vitalSign.minAcidUric, vitalSign.maxAcidUric, vitalSign.rangeDangerTimeAcidUric, null)
    // var temp = new VitalSign(4, vitalSign.minTemp, vitalSign.maxTemp, vitalSign.rangeDangerTimeTemp, null)
    var vitalSigns = []
    vitalSigns.push(heartRate)
    vitalSigns.push(bloodPressure)
    // vitalSigns.push(acidUric)
    // vitalSigns.push(temp)
    var vts = {
      healthRecordId: rootState.medicalInstruction.patientSelected.healthRecordId,
      doctorAccountId: parseInt(rootState.users.user.accountId),
      contractId: rootState.medicalInstruction.patientSelected.contractId,
      diagnose: vitalSign.diagnose,
      dateStart: formatDateToInsertDb(vitalSign.dateStart),
      dateFinish: formatDateToInsertDb(vitalSign.dateEnd),
      description: vitalSign.description,
      vitalSigns: vitalSigns
    }
    vitalSignRepository.insertVitalSign(vts).then(response => {
      if (response.status === 200) {
        Notification.success({ tittle: 'Thông báo', message: 'Bác sĩ đã thêm chỉ số đo sinh hiệu thành công. Kết quả sẽ được cập nhật cuối ngày cho bác sĩ', duration: 10000 })
      }
    }).catch((error) => {
      console.log('error at confirmVitalSign', error)
      Notification.error({ tittle: 'Thông báo', message: 'Bác sĩ đã thêm chỉ số đo sinh hiệu thất bại. Vui lòng kiểm tra lại', duration: 10000 })
    })
    console.log('vitalSIgns:::', vts)
  }
}
const mutations = {
  setDeviceConnecting (state, device) {
    state.deviceConnecting = {
      deviceId: device.deviceId, // id thiết bị
      deviceName: device.deviceName, // tên thiết bị
      services: device.services.map(service => {
        return {
          serviceId: service.serviceId, // id service
          serviceName: service.serviceName, // tên service
          uuid: service.uuid // uuid
        }
      })
    }
    console.log('deviceConnecting:::', state.deviceConnecting)
  },
  setVitalSignOverviews (state, vitalSignOverviews) {
    state.vitalSignOverviews = vitalSignOverviews.map(vitalSign => {
      return {
        patientId: vitalSign.patientId,
        status: vitalSign.status
      }
    })
    console.log('vitalSignOverviews:::', state.vitalSignOverviews)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
