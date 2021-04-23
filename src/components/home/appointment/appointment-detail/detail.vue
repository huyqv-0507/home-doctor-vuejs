<template>
  <div class="mainContent">
    <div class="bg-theme">
      <h2>Chi tiết cuộc hẹn</h2>
      <el-button
        v-on:click.native="setMedicalSchedule('APPOINTMENT')"
        type="primary"
        size="mini"
      >Thêm đơn thuốc</el-button>
      <el-button
        v-on:click.native="setVitalSign('APPOINTMENT')"
        type="primary" size="mini">Thêm lịch đo sinh hiệu</el-button>
      <div>
        <p>
          Họ tên:
          <strong>{{appointmentDetail.fullNamePatient}}</strong>
        </p>
        <p>
          Trạng thái:
          <strong>{{appointmentDetail.status}}</strong>
        </p>
        <p>
          Ghi chú:
          <strong>{{appointmentDetail.note}}</strong>
        </p>
        <p v-show="appointmentDetail.diagnose !== null">
          Chuẩn đoán:
          <strong>{{appointmentDetail.diagnose}}</strong>
        </p>
        <p v-show="appointmentDetail.dateExamination !== undefined">
          Giờ hẹn:
          <strong>{{appointmentDetail.dateExamination.split('T')[1].split(':')[0]}}:{{appointmentDetail.dateExamination.split('T')[1].split(':')[1]}}</strong> giờ.
        </p>
        <p v-show="appointmentDetail.reasonCanceled !== null">
          Lý do huỷ:
          <strong>{{appointmentDetail.reasonCanceled}}</strong>
        </p>
        <p v-show="appointmentDetail.dateCanceled !== null">
          Ngày huỷ:
          <strong>{{appointmentDetail.dateCanceled}}</strong>
        </p>
      </div>

      <h2>Y lệnh trong ngày</h2>
      <div>
        <div
          v-for="(medicalInstruction, index) in appointmentDetail.medicalInstructions"
          :key="`medicalInstruction-${index}`"
        >
          <div>
            <p>{{medicalInstruction.medicalInstructionTypeName}}</p>
            <div v-for="(mi, index) in medicalInstruction.medicalInstructions" :key="`mi-${index}`">
              <el-link style="margin-left: 1em;" type="primary" v-on:click="handleView(mi)">
                - {{mi.dateCreated}}
                <i class="el-icon-view el-icon--right"></i>
              </el-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('appointments', ['appointmentDetail'])
  },
  methods: {
    ...mapActions('medicalInstruction', ['setMedicalSchedule', 'setVitalSign']),
    handleView (mi) {
      const medicalInstruction = {
        medicalInstructionId: mi.medicalInstructionId,
        medicalInstructionTypeName:
          mi.medicalInstructionType
      }
      this.$store.dispatch('appointments/viewMedicalInstruction', medicalInstruction, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../style/index.scss";
</style>
