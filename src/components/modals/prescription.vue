<template>
  <el-dialog v-if="prescriptionView !== null" :visible="isPrescriptionShow" width="70%" @close="closePrescriptionShow()" center>
    <template slot="title">Chi tiết đơn thuốc</template>
    <div>
      <div>
        <p>
          Bệnh nhân:
          <strong>{{prescriptionView.patientFullName}}</strong>
        </p>
        <p>
          Chuẩn đoán:
          <strong>{{prescriptionView.diagnose}}</strong>
        </p>
        <p>
          Ngày bắt đầu:
          <strong>{{prescriptionView.prescriptionRespone.dateStarted.split('T')[0].split('-').reverse().join('/')}}</strong>
        </p>
        <p>
          Ngày kết thúc:
          <strong>{{prescriptionView.prescriptionRespone.dateFinished.split('T')[0].split('-').reverse().join('/')}}</strong>
        </p>
        <p>
          Trạng thái:
          <strong>{{prescriptionView.status}}</strong>
        </p>
      </div>
      <el-table :data="prescriptionView.prescriptionRespone.medicationSchedules">
        <el-table-column label="Tên thuốc" prop="medicationName" width="120"></el-table-column>
        <el-table-column label="Hàm lượng" prop="content" width="120"></el-table-column>
        <el-table-column label="Đơn vị" prop="unit" width="120"></el-table-column>
        <el-table-column label="Sáng" prop="morning" width="120"></el-table-column>
        <el-table-column label="Trưa" prop="afterNoon" width="120"></el-table-column>
        <el-table-column label="Chiều" prop="noon" width="120"></el-table-column>
        <el-table-column label="Tối" prop="night" width="120"></el-table-column>
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
    ...mapState('modals', ['isPrescriptionShow'])
  },
  methods: {
    ...mapActions('modals', ['closePrescriptionShow'])
  },
  mounted () {
    console.log('prescriptionView', this.prescriptionView)
  }
}
</script>

<style>
</style>
