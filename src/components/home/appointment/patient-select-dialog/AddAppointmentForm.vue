<template>
  <el-dialog :visible="isVisibleAddAppointmentForm" @close="closeAddAppointmentForm()" width="30%">
    <template slot="title">
      <strong>Lịch hẹn</strong>
    </template>
    <el-row class="verticalCenter" style="margin-bottom: .5em;">
      <el-col :span="6">Ngày hẹn*:</el-col>
      <el-col :span="18">
        <el-date-picker
          type="datetime"
          v-model="dateExamination"
          size="mini"
          :picker-options="datePickerOptions"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="verticalCenter">
      <el-col :span="6">Ghi chú:</el-col>
      <el-col :span="18">
        <el-input v-model="note" size="mini"></el-input>
      </el-col>
    </el-row>
    <div class="dialog-footer">
      <el-button
        type="primary"
        @click="confirmAppointment({ dateExamination: dateExamination, note: note })"
      >Xác nhận</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      dateExamination: '',
      note: '',
      datePickerOptions: {
        disabledDate: this.handleDisabledDate
      }
    }
  },
  mounted () {
    this.getTimeSystem()
  },
  computed: {
    ...mapState('modals', ['isVisibleAddAppointmentForm']),
    ...mapState('time', ['timeNow'])
  },
  methods: {
    handleDisabledDate (time) {
      return time < new Date(this.timeNow)
    },
    ...mapActions('modals', ['closeAddAppointmentForm']),
    ...mapActions('time', ['getTimeSystem']),
    confirmAppointment () {
      this.$confirm(
        'Bác sĩ sẽ đồng ý lịch hẹn tái khám cho bệnh nhân. Xác nhận?',
        'Xác nhận',
        {
          confirmButtonText: 'Đồng ý',
          cancelButtonText: 'Thoát',
          type: 'warning'
        }
      )
        .then(() => {
          this.$store.dispatch(
            'appointments/confirmAppointment',
            {
              dateExamination: this.dateExamination,
              note: this.note
            },
            { root: true }
          )
          // location.reload()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../style/index.scss";
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
}
.marginbottom {
  margin-bottom: 0.3em;
}
</style>
