/* eslint-disable quotes */
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
import { Notification, Message } from 'element-ui'
import { formatDateToInsertDb } from '../../utils/common'
import { HeartRateLineChart } from '../../models/chart'
export function VitalSign (vitalSignId, numberMax, numberMin, minuteDangerInterval, minuteNormalInterval, timeStart, minuteAgain) {
  return {
    vitalSignTypeId: vitalSignId,
    numberMax: numberMax,
    numberMin: numberMin,
    minuteDangerInterval: minuteDangerInterval,
    minuteNormalInterval: minuteNormalInterval,
    timeStart: timeStart,
    minuteAgain: minuteAgain
  }
}
const vitalSignRepository = RepositoryFactory.get('vitalSignRepository')
const state = () => ({
  deviceConnecting: {},
  vitalSignOverviews: [], // Danh sách vital sign của bệnh nhân đang được theo dõi
  vitalSignValue: {},
  patientOptions: {},
  vitalSignSchedule: [],
  appointmentIdForVitalSign: -1,
  heartRateValues: [],
  heartRateSchedule: {}
})
const getters = {
  findStatusOfPatient: state => (patientId) => {
    return state.vitalSignOverviews.find(patientVitalSign => patientVitalSign.patientId === parseInt(patientId))
  }
}
const actions = {
  getVitalSignValueByMiId ({ commit, state, dispatch }, data) {
    console.log('getVitalSignValueByMiId', data)
    vitalSignRepository.getVitalSignValueByMiId(data.medicalInstructionId, data.patientId).then(response => {
      commit('setVitalSignValue', response.data)
      dispatch('vitalSign/setHeartRateChart', state.heartRateValues[0].dateCreated, { root: true })
    }).catch((error) => {
      if (error.message.includes('404')) {
        console.log(error)
        state.vitalSignValue = {}
        state.vitalSignValue = {}
        state.heartRateValues = []
        state.heartRateSchedule = []
      }
    })
  },
  getVitalSignValueByHRId ({ rootState, state, dispatch }) {
    vitalSignRepository.getVitalSignValueByHRId(rootState.medicalInstruction.patientSelected.healthRecordId).then(response => {
      let medicalInstructionId = 0
      console.log('vitalSignRepository.getVitalSignValueByHRId', response.data)
      response.data.forEach(vs => {
        if (vs.status === 'ACTIVE') {
          medicalInstructionId = vs.medicalInstructionId
        }
      })
      dispatch('vitalSign/getVitalSignValueByMiId', { medicalInstructionId: medicalInstructionId, patientId: rootState.medicalInstruction.patientSelected.patientId }, { root: true })
    }).catch((error) => {
      if (error.message.includes('404')) {
        state.vitalSignValue = {}
        state.heartRateValues = []
        state.heartRateSchedule = []
      }
    })
  },
  setHeartRateChart ({ commit }, date) {
    commit('setHeartRateChart', date)
  },
  async getVitalSigns ({ commit, rootState, state }) {
    state.vitalSignSchedule = []
    const healthRecordId = rootState.medicalInstruction.patientSelected.healthRecordId
    await vitalSignRepository.getVitalSigns(healthRecordId).then(response => {
      if (response.status === 200) {
        console.log('database.vitalSignSchedule', response.data)
        commit('setVitalSignSchedule', response.data)
      }
    }).catch(() => {
      commit('setVitalSignScheduleEmpty')
    })
  },
  getVitalSignHealthPatient ({ commit, rootState }) {
    const now = new Date()
    const data = {
      patientId: rootState.medicalInstruction.patientSelected.patientId,
      healthRecordId: rootState.medicalInstruction.patientSelected.healthRecordId,
      dateTime: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    }
    vitalSignRepository.getVitalSignHealthPatient(data).then(response => {
      console.log(response.data)
      commit('setVitalSignValue', response.data)
      commit('setHeartRateChart', response.data)
    }).catch((error) => {
      console.log(error)
      Message.error('Vui lòng kiểm tra kết nối mạng!')
    })
  },
  getDeviceSupportServices ({ commit }) {
    var device = vitalSignRepository.getDeviceSupportServices()
    commit('setDeviceConnecting', device)
  },
  getVitalSignOverviews ({ commit }) {
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
  confirmVitalSign ({ state, rootState, dispatch }, vitalSignData) {
    console.log('vitalSignPayload', vitalSignData)
    const date = formatDateToInsertDb(vitalSignData.vitalSignForm.dateStart)
    const timeHeartRate = date + 'T' + vitalSignData.vitalSignForm.heartRate.timeStart + ':' + '00'
    const vitalSigns = []
    const heartRate = new VitalSign(
      1,
      vitalSignData.vitalSignForm.heartRate.maxHeartRate,
      vitalSignData.vitalSignForm.heartRate.minHeartRate,
      vitalSignData.vitalSignForm.heartRate.rangeDangerTimeHeartRate,
      vitalSignData.vitalSignForm.heartRate.rangeNormalTimeHeartRate,
      timeHeartRate,
      0
    )
    vitalSigns.push(heartRate)
    if (vitalSignData.isBloodPressureSelected) {
      const bloodPressure = new VitalSign(
        2,
        vitalSignData.vitalSignForm.bloodPressure.maxBloodPressure,
        vitalSignData.vitalSignForm.bloodPressure.minBloodPressure,
        vitalSignData.vitalSignForm.bloodPressure.rangeDangerTimeBloodPressure,
        vitalSignData.vitalSignForm.bloodPressure.rangeNormalTimeBloodPressure,
        date + 'T' + vitalSignData.vitalSignForm.bloodPressure.timeStart + ':' + '00',
        0
      )
      vitalSigns.push(bloodPressure)
    }
    if (vitalSignData.isAcidUricSelected) {
      const acidUric = new VitalSign(
        3,
        vitalSignData.vitalSignForm.acidUric.minAcidUric,
        vitalSignData.vitalSignForm.acidUric.maxAcidUric,
        vitalSignData.vitalSignForm.acidUric.rangeDangerTimeAcidUric,
        vitalSignData.vitalSignForm.acidUric.rangeNormalTimeAcidUric,
        date + 'T' + vitalSignData.vitalSignForm.acidUric.timeStart + ':' + '00',
        0
      )
      vitalSigns.push(acidUric)
    }
    if (vitalSignData.isTemperatureSelected) {
      const temperature = new VitalSign(
        4,
        vitalSignData.vitalSignForm.temperature.minTemp,
        vitalSignData.vitalSignForm.temperature.maxTemp,
        vitalSignData.vitalSignForm.temperature.rangeDangerTimeTemp,
        vitalSignData.vitalSignForm.temperature.rangeNormalTimeTemp,
        date + 'T' + vitalSignData.vitalSignForm.temperature.timeStart + ':' + '00',
        0
      )
      vitalSigns.push(temperature)
    }

    const vts = {
      healthRecordId: rootState.medicalInstruction.patientSelected.healthRecordId,
      doctorAccountId: parseInt(rootState.users.user.accountId),
      contractId: rootState.medicalInstruction.patientSelected.contractId,
      diagnose: vitalSignData.vitalSignForm.diagnose,
      dateStart: formatDateToInsertDb(vitalSignData.vitalSignForm.dateStart),
      description: vitalSignData.vitalSignForm.description,
      appointmentId: rootState.appointments.appointmentIdToCreateVitalSign,
      vitalSigns: vitalSigns
    }
    vitalSignRepository.insertVitalSign(vts).then(response => {
      if (response.status === 201) {
        Notification.success({ tittle: 'Thông báo', message: 'Bác sĩ đã thêm chỉ số đo sinh hiệu thành công. Kết quả sẽ được cập nhật cuối ngày cho bác sĩ', duration: 10000 })
        dispatch('modals/closeAddNewVitalSign', null, { root: true })
        dispatch('getVitalSigns')
        if (rootState.appointments.appointmentIdToCreateVitalSign !== null) {
          dispatch('appointment/finishAppointment', vts.diagnose, { root: true })
        }
      }
    }).catch((error) => {
      console.log('error at confirmVitalSign', error)
      Notification.error({ tittle: 'Thông báo', message: 'Bác sĩ đã thêm chỉ số đo sinh hiệu thất bại. Vui lòng kiểm tra lại', duration: 10000 })
    })
    console.log('vitalSigns:::', vts)
  },
  clearState ({ commit }) {
    commit('clearState')
  }
}
const mutations = {
  setVitalSignSchedule (state, data) {
    state.vitalSignSchedule = data.map(vitalSign => {
      return {
        dateStarted: vitalSign.dateStarted.split('T')[0].split('-').reverse().join('/'),
        medicalInstructionId: vitalSign.medicalInstructionId,
        status: vitalSign.status === 'ACTIVE' ? 'Đang hiện hành' : 'Đã huỷ',
        vitalSignScheduleId: vitalSign.vitalSignScheduleId,
        vitalSigns: vitalSign.vitalSigns.map(vs => {
          return {
            vitalSignType: vs.vitalSignType,
            minuteAgain: vs.minuteAgain,
            minuteDangerInterval: vs.minuteDangerInterval,
            minuteNormalInterval: vs.minuteNormalInterval,
            numberMax: vs.numberMax,
            numberMin: vs.numberMin
          }
        })
      }
    })
    console.log('state.vitalSignSchedule', state.vitalSignSchedule)
  },
  setVitalSignScheduleEmpty (state) {
    state.vitalSignSchedule = {}
  },
  setHeartRateChart (state, date) {
    try {
      const tmpDate = new Date(date)
      const tmpDatee = `${tmpDate.getFullYear()}-${tmpDate.getMonth() + 1}-${tmpDate.getDate()}`
      state.heartRateValues.forEach(vs => {
        const d = new Date(vs.dateCreated.split('T'))
        const td = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
        if (td === tmpDatee) {
          state.patientOptions = new HeartRateLineChart(
            'Biểu đồ nhịp tim',
            'giờ',
            'bpm',
            vs.timeValue.substring(0, vs.timeValue.length - 1).split(','),
            vs.numberValue.substring(0, vs.numberValue.length - 1).split(','),
            state.heartRateSchedule.numberMin,
            state.heartRateSchedule.numberMax)
          console.log(state.patientOptions)
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
  setVitalSignValue (state, data) {
    state.heartRateValues = []
    state.vitalSignValue = {
      timeStarted: data.timeStarted,
      timeCanceled: data.timeCanceled,
      status: data.status,
      vitalSigns: data.vitalSigns === null ? null : data.vitalSigns.map(vsv => {
        if (vsv.vitalSignTypeId === 1) {
          state.heartRateSchedule = vsv
        }
        return {
          vitalSignTypeId: vsv.vitalSignTypeId,
          vitalSignType: vsv.vitalSignType,
          numberMax: vsv.numberMax,
          numberMin: vsv.numberMin,
          timeStart: vsv.timeStart,
          minuteNormalInterval: vsv.minuteNormalInterval,
          minuteDangerInterval: vsv.minuteDangerInterval,
          minuteAgain: vsv.minuteAgain
        }
      }),
      vitalSignValues: data.vitalSignValues === null ? null : data.vitalSignValues.map(vs => {
        if (vs.vitalSignTypeId === 1) {
          state.heartRateValues.push(vs)
        }
        return {
          dateCreated: vs.dateCreated,
          numberValue: vs.numberValue === null ? null : vs.numberValue,
          timeValue: vs.timeValue === null ? null : vs.timeValue,
          vitalSignTypeId: vs.vitalSignTypeId
        }
      })
    }
    console.log('state.heartRateValues', state.heartRateValues)
    console.log('VitalSignValue', state.vitalSignValue)
  },
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
