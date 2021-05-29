<template>
  <el-dialog
    v-if="vitalSignView !== null"
    :visible="isVitalSignShow"
    width="65%"
    center
    @close="closeVitalSignShow()"
  >
    <template slot="title">Chi tiết lịch đo</template>
    <div>
      <div>
        <p>
          Bệnh nhân:
          <strong>{{vitalSignView.patientFullName}}</strong>
        </p>
        <p v-show="vitalSignView.diseases !== [] && vitalSignView.disease !== null" class="margin-line">
          Chuẩn đoán:
          <strong v-for="(disease, index) in vitalSignView.diseases" :key="`disease-${index}`">{{disease.diseaseId}} - {{disease.diseaseName}}; </strong>
        </p>
        <p v-show="vitalSignView.conclusion !== null" class="margin-line">
          Kết luận:
          <strong>{{vitalSignView.conclusion}}</strong>
        </p>
        <p>
          Ngày tạo:
          <strong>{{vitalSignView.dateCreate.split('T')[0].split('-').reverse().join('/')}}</strong>
        </p>
        <p>
          Nơi khám:
          <strong>{{vitalSignView.placeHealthRecord}}</strong>
        </p>
      </div>
      <el-row v-show="isAddMedicalInstruction" class="margin-line">
        <p>
          <strong><i>Bác sĩ có muốn thêm y lệnh vào hồ sơ?</i></strong>
        </p>
        <el-button class="margin-line" type="primary" size="mini" @click="handleAddToHR(prescriptionView.medicalInstructionId)">Thêm</el-button>
        <el-button class="margin-line" type="info" size="mini" @click="handleRejectAddToHR(prescriptionView.medicalInstructionId)">Bỏ qua</el-button>
      </el-row>
      <el-table :data="vitalSignView.vitalSignScheduleRespone.vitalSigns">
        <el-table-column label="Loại sinh hiệu" prop="vitalSignType" width="200"></el-table-column>
        <el-table-column label="Mức an toàn lớn nhất" prop="numberMax" width="120"></el-table-column>
        <el-table-column label="Mức an toàn nhỏ nhất" prop="numberMin" width="120"></el-table-column>
        <el-table-column label="Số phút gây ra nguy hiểm" prop="minuteDangerInterval" width="120"></el-table-column>
        <el-table-column label="Thời gian bắt đầu đo" prop="timeStart" width="120" :formatter="formatDate"></el-table-column>
        <el-table-column label="Số phút gây nguy hiểm" prop="minuteAgain" width="120"></el-table-column>
        <el-table-column label="Biểu đồ" width="90">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleView(scope.$index, scope.row)">Xem</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('medicalInstruction', ['vitalSignView']),
    ...mapState('modals', ['isVitalSignShow']),
    ...mapState('contracts', ['requestDetail']),
    ...mapState('image', ['isAddMedicalInstruction'])
  },
  methods: {
    formatDate (row, column, cellValue, index) {
      return row.timeStart
        .split('T')[0]
        .split('-')
        .reverse()
        .join('/')
    },
    ...mapActions('modals', ['closeVitalSignShow']),
    handleView (index, row) {
      this.$store.dispatch('vitalSign/getVitalSignValueByMiId', {
        medicalInstructionId: this.vitalSignView.medicalInstructionId,
        patientId: this.requestDetail.patientId
      })
      this.$store.dispatch('modals/openChartView', null, { root: true })
    },
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
</style>
