<template>
  <div class="wrapper">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item>Nhật ký hoạt động</el-breadcrumb-item>
        <el-breadcrumb-item>Đơn thuốc</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bg-theme">
      <div>
        <h1 class="margin-vertical">{{prescriptionDetailHistory.medicalInstructionType}}</h1>
        <p class="margin-vertical">Bệnh nhân: <strong>{{prescriptionDetailHistory.patientName}}</strong></p>
        <p class="margin-vertical">Chuẩn đoán: <strong>{{prescriptionDetailHistory.diagnose}}</strong></p>
        <p class="margin-vertical">Mô tả: <strong>{{prescriptionDetailHistory.description}}</strong></p>
        <p class="margin-vertical">Ngày bắt đầu: <strong>{{prescriptionDetailHistory.dateStarted.split('T')[0].split('-').reverse().join('/')}}</strong></p>
        <p class="margin-vertical">Ngày kết thúc: <strong>{{prescriptionDetailHistory.dateFinished.split('T')[0].split('-').reverse().join('/')}}</strong></p>
        <p class="margin-vertical">Danh sách thuốc</p>
        <el-table class="medical-treatment__medical-list text" :data="prescriptionDetailHistory.medicationSchedules">
            <el-table-column class="text" label="STT" width="50" type="index"></el-table-column>
            <el-table-column class="text" label="Tên thuốc" prop="medicationName" width="150"></el-table-column>
            <el-table-column class="text" label="Hàm lượng" prop="content" width="110"></el-table-column>
            <el-table-column class="text" label="Cách dùng" prop="useTime" width="250"></el-table-column>
            <el-table-column class="text" label="Đơn vị" prop="unit" width="70"></el-table-column>
            <el-table-column class="text" label="Số lượng" prop="totalNumber" width="90"></el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('medicalInstruction', ['prescriptionDetailHistory'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/index.scss';
.wrapper {
  top: 3.125em;
  position: absolute;
  left: 18.75em;
  overflow: auto;
  padding: 1em 1em 0 1em;
}
.margin-vertical {
  margin: 1em 0;
}
</style>
