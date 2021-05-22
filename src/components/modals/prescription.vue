<template>
  <el-dialog v-if="prescriptionView !== null" :visible="isPrescriptionShow" width="62%" @close="closePrescriptionShow()" center>
    <template slot="title">Chi tiết đơn thuốc</template>
    <div>
      <div>
        <p class="margin-line">
          Bệnh nhân:
          <strong>{{prescriptionView.patientFullName}}</strong>
        </p>
        <p class="margin-line">
          Chuẩn đoán:
          <strong v-for="(disease, index) in prescriptionView.diseases" :key="`disease-${index}`">{{disease.diseaseId}} - {{disease.diseaseName}}; </strong>
        </p>
        <p class="margin-line">
          Kết luận:
          <strong>{{prescriptionView.conclusion}}</strong>
        </p>
        <p class="margin-line">
          Ngày bắt đầu:
          <strong>{{prescriptionView.prescriptionRespone.dateStarted.split('T')[0].split('-').reverse().join('/')}}</strong>
        </p>
        <p class="margin-line">
          Ngày kết thúc:
          <strong>{{prescriptionView.prescriptionRespone.dateFinished.split('T')[0].split('-').reverse().join('/')}}</strong>
        </p>
      </div>
      <el-row v-show="isAddMedicalInstruction" class="margin-line">
        <p>
          <strong><i>Bác sĩ có muốn thêm y lệnh vào hồ sơ?</i></strong>
        </p>
        <el-button class="margin-line" type="primary" size="mini" @click="handleAddToHR(prescriptionView.medicalInstructionId)">Thêm</el-button>
        <el-button class="margin-line" type="info" size="mini" @click="handleRejectAddToHR(prescriptionView.medicalInstructionId)">Bỏ qua</el-button>
      </el-row>
      <el-table :data="prescriptionView.prescriptionRespone.medicationSchedules">
        <el-table-column label="Tên thuốc" prop="medicationName" width="120"></el-table-column>
        <el-table-column label="Hàm lượng" prop="content" width="120"></el-table-column>
        <el-table-column label="Đơn vị" prop="unit" width="120"></el-table-column>
        <el-table-column label="Sáng" prop="morning" width="90"></el-table-column>
        <el-table-column label="Trưa" prop="afterNoon" width="90"></el-table-column>
        <el-table-column label="Chiều" prop="noon" width="90"></el-table-column>
        <el-table-column label="Tối" prop="night" width="90"></el-table-column>
        <el-table-column label="Ghi chú" prop="useTime" width="120"></el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('medicalInstruction', ['prescriptionView']),
    ...mapState('modals', ['isPrescriptionShow']),
    ...mapState('image', ['isAddMedicalInstruction'])
  },
  methods: {
    ...mapActions('modals', ['closePrescriptionShow']),
    ...mapActions('image', ['hideMedicalInstructionImageDetail']),
    handleAddToHR (medicalInstructionId) {
      this.$store.dispatch('medicalInstruction/confirmAddMIToHR', medicalInstructionId, { root: true })
    },
    handleRejectAddToHR (medicalInstructionId) {
      this.$store.dispatch('medicalInstruction/rejectAddMIToHR', medicalInstructionId, { root: true })
    }
  }
}
</script>

<style>
.margin-line {
  margin: .7em 0;
  ;
}
</style>
