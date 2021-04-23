<template>
  <el-dialog
    :visible="isUpdateAppointmentShow"
    width="35%"
    @close="closeUpdateAppointmentShow()"
    center
    v-if="patientOverview.appointmentNext !== null"
  >
    <template slot="title">Thay đổi ngày hẹn</template>
    <el-row>
      <el-col :span="12">
        <el-row class="margin-bottom">
          <strong>Ngày cũ</strong>
        </el-row>
        <el-row>
          <p>{{patientOverview.appointmentNext.dateExamination.split('T')[1].split(':')[0]}}h{{patientOverview.appointmentNext.dateExamination.split('T')[1].split(':')[1]}} ngày {{patientOverview.appointmentNext.dateExamination.split('T')[0].split('-').reverse().join('/')}}</p>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="margin-bottom">
          <strong>Ngày mới</strong>
        </el-row>
        <el-row>
          <el-date-picker
            size="mini"
            v-model="newDate"
            type="datetime"
            :picker-options="datePickerOptions"
            format="dd/MM/yyyy HH:mm"
            width="30"
          ></el-date-picker>
        </el-row>
      </el-col>
    </el-row>
    <template slot="footer">
      <el-button
        type="primary"
        size="mini"
        @click="confirmUpdate({appointmentId: patientOverview.appointmentNext.appointmentId, dateExamination: newDate,contractId: patientSelected.contractId})"
      >Xác nhận</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      datePickerOptions: {
        disabledDate: this.handleDisabledDate
      },
      newDate: new Date(this.$store.state.time.timeNow.split('.')[0])
    }
  },
  computed: {
    ...mapState('modals', ['isUpdateAppointmentShow']),
    ...mapState('medicalInstruction', ['patientSelected']),
    ...mapState('patients', ['patientOverview']),
    ...mapState('time', ['timeNow'])
  },
  mounted () {
    this.getTimeSystem()
  },
  methods: {
    ...mapActions('modals', ['closeUpdateAppointmentShow']),
    ...mapActions('appointments', ['updateAppointment']),
    ...mapActions('time', ['getTimeSystem']),
    handleDisabledDate (time) {
      return time < new Date(this.timeNow)
    },
    confirmUpdate (info) {
      this.$confirm(
        'Ngày hẹn sẽ được thay đổi khi bác sĩ xác nhận. Xác nhận?',
        'Thông báo',
        {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Huỷ',
          type: 'warning'
        }
      )
        .then(() => {
          const appointmentUpdate = {
            appointmentId: info.appointmentId,
            dateExamination: info.dateExamination,
            contractId: info.contractId
          }
          console.log('appointmentUpdate', appointmentUpdate)
          this.updateAppointment(appointmentUpdate)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Fail'
          })
        })
    }
  }
}
</script>

<style>
.margin-bottom {
  margin-bottom: 1em;
}
</style>
