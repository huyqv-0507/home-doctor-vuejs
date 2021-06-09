<template>
  <el-dialog :visible="isFinishAppointmentShow" @close="closeFinishAppointmentShow" width="40%" center>
    <template slot="title">Xác nhận cuộc hẹn</template>
    <div>
      <div>
        <p class="margin-default">Bác sĩ thêm ghi chú để xác nhận hoàn thành cuộc hẹn</p>
        <el-input class="margin-default" placeholder="Nhập..." size="mini" v-model="diagnose"></el-input>
        <p class="margin-default">hoặc</p>
        <el-button type="danger" size="mini" class="margin-default" @click="setMedicalSchedule('APPOINTMENT')">Thêm đơn thuốc</el-button>
        <el-button type="danger" size="mini" class="margin-default" @click="setVitalSign('APPOINTMENT')">Thêm lịch đo sinh hiệu</el-button>
      </div>
    </div>
    <div slot="footer">
      <el-button type="info" size="mini" @click="closeFinishAppointmentShow">Huỷ</el-button>
      <el-button type="primary" size="mini" @click="finishAppointment({ diagnose: diagnose, appointmentId: appointmentId })">Xác nhận</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      diagnose: '',
      appointmentId: this.$store.state.patients.patientOverview.appointmentNext === null ? null : this.$store.state.patients.patientOverview.appointmentNext.appointmentId
    }
  },
  computed: {
    ...mapState('modals', ['isFinishAppointmentShow'])
  },
  methods: {
    ...mapActions('modals', ['closeFinishAppointmentShow']),
    ...mapActions('medicalInstruction', ['setMedicalSchedule', 'setVitalSign']),
    ...mapActions('appointments', ['finishAppointment'])
  }
}
</script>

<style lang="scss" scoped>
.margin-default {
  margin: .3em 0;
}
</style>
