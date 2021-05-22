<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-if="routeFrom === 'HOME'">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item v-if="routeFrom === 'PATIENT-DETAIL'">Bệnh nhân</el-breadcrumb-item>
      <el-breadcrumb-item>Y lệnh</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch đo sinh hiệu</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch mới</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-row>
        <el-col :span="1" class="margin-bottom">
          <i>
            <img src="../../../assets/icons/ic-heart-rate.png" class="iconDialog" />
          </i>
        </el-col>
        <el-col :span="23" class="margin-bottom">
          <h2>Sinh hiệu {{vitalSignSchedule.dateStarted}}</h2>
        </el-col>
      </el-row>
      <p class="font-size14 margin-bottom">
        Tên bệnh nhân:
        <strong>{{patientSelected.patientName}}</strong>
      </p>
      <div style="display: flex;">
        <div style="margin-right: 1em;">Chọn sinh hiệu:</div>
        <div v-if="choosingTypes.length > 0" style="display: flex;">
          <p>
            <strong style="margin-left: .3em;"
              v-for="(choosingType, index) in choosingTypes"
              :key="`choosingTypes-${index}`"
            >{{choosingType.vitalSignName}};</strong>
           </p>
          <el-link
            style="margin-left: 1em;"
            type="primary"
            size="mini"
            @click="openChoosingVitalSignType()"
          >Thay đổi</el-link>
        </div>
        <el-link v-else type="primary" size="mini" @click="openChoosingVitalSignType()">Chọn</el-link>
      </div>
      <el-form :model="vitalSignSchedule" ref="vitalSignSchedule" label-width="120px">
        <el-form-item label="Ngày đo">
          <el-date-picker type="date" v-model="vitalSignSchedule.dateStarted" format="dd/MM/yyyy"></el-date-picker>
        </el-form-item>
        <el-form-item label="Mô tả">
          <el-input type="text" size="mini"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <el-form ref="vitalSign" label-width="120px"></el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('systemHandler', ['routeFrom']),
    ...mapState('medicalInstruction', ['patientSelected']),
    ...mapState('vitalSign', ['choosingTypes']),
    ...mapState('time', ['timeNow'])
  },
  data () {
    return {
      vitalSignSchedule: {
        dateStarted: new Date(this.$store.state.time.timeNow),
        description: '',
        heartRate: {
          minHeartRate: 0,
          maxHeartRate: 0,
          rangeDangerTimeHeartRate: 0,
          rangeNormalTimeHeartRate: 0,
          timeStart: ''
        },
        bloodPressure: {
          minBloodPressure: 0,
          maxBloodPressure: 0,
          rangeDangerTimeBloodPressure: 0,
          rangeNormalTimeBloodPressure: 0,
          timeBloodPressure: 0,
          timeStart: ''
        },
        acidUric: {
          minAcidUric: 0,
          maxAcidUric: 0,
          rangeDangerTimeAcidUric: 0,
          timeAcidUric: 0,
          timeStart: ''
        },
        temperature: {
          minTemp: 0,
          maxTemp: 0,
          rangeDangerTimeTemp: 0,
          timeTemp: 0,
          timeStart: ''
        }
      },
      isBloodPressureSelected: false,
      isAcidUricSelected: false,
      isTemperatureSelected: false,
      datePickerOptions: {
        disabledDate: this.handleDisabledDate
      }
    }
  },
  methods: {
    ...mapActions('modals', ['openChoosingVitalSignType']),
    ...mapActions('time', ['getTimeSystem'])
  },
  mounted () {
    this.$store.commit('vitalSign/setChoosingType', [], { root: true })
    this.getTimeSystem()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
</style>
