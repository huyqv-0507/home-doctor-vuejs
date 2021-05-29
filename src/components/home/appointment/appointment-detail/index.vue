<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item>Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch hẹn</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-theme">
      <h2 style="margin-bottom: 1em;">Lịch hẹn ngày {{appointmentDateChoose.dateExamination}}</h2>
      <el-card
        v-for="(appointment, index) in appointmentDateChoose.appointments"
        :key="index"
        shadow="never"
      >
        <el-row style="display: flex; align-items: center;">
          <el-col :span="6">
            <div style="display: flex; align-items: center;">
              <p class="margin-default titleColor" style="font-size: 30px;">
                <strong>{{appointment.dateExamination.split('T')[1].split('.')[0].split(':')[0]}}h{{appointment.dateExamination.split('T')[1].split('.')[0].split(':')[1]}}</strong>
              </p>
              <div style=" margin-left: 20%; width: .2em; height: 50px; background-color: grey;"></div>
            </div>
          </el-col>
          <el-col :span="18">
            <div>
              <p class="margin-default">
                Họ tên:
                <strong>{{appointment.patientName}}</strong>
              </p>
              <p class="margin-default">
                Ghi chú:
                <strong>{{appointment.note}}</strong>
              </p>
              <el-link
                v-if="!isAppointmentCurrent"
                style="margin-top: 1em; font-size: 10px;"
                type="primary"
                v-on:click="openUpdateAppointmentShow()"
              >
                Thay đổi
                <i class="el-icon-edit-outline el-icon--right"></i>
              </el-link>
              <el-link
                v-else-if="isAppointmentCurrent"
                style="margin-top: 1em; font-size: 10px;"
                type="primary"
                v-on:click="openFinishAppointmentShow()"
              >
                Hoàn tất
                <i class="el-icon-edit-outline el-icon--right"></i>
              </el-link>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      isAppointmentCurrent:
        this.$store.state.patients.patientOverview.appointmentNext === null
          ? null
          : new Date(
            this.$store.state.patients.patientOverview.appointmentNext.dateExamination.split(
              'T'
            )[0]
          ) <= new Date(this.$store.state.time.timeNow.split('T')[0])
    }
  },
  computed: {
    ...mapState('appointments', ['appointmentDateChoose'])
  },
  mounted () {},
  methods: {
    ...mapActions('appointments', ['changeDate']),
    toAppointmentDetail (appointmentId) {
      this.$store.dispatch('appointments/getAppointmentById', appointmentId, {
        root: true
      })
    },
    ...mapActions('modals', [
      'openUpdateAppointmentShow',
      'openFinishAppointmentShow'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../style/index.scss";
.margin-default {
  margin: 0.5em 0;
}
</style>
