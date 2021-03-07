<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Y lệnh</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch uống thuốc</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="verticalCenter">
      <el-col :span="18">
        <h1>Lịch dùng thuốc</h1>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-row style="margin-top: 1em; margin-left: 2em;">
      <el-col>
        <span style="color: gray;">
          Hệ thống sẽ gửi thông báo nhắc nhở đến bệnh nhân
          <strong style="color: black;">{{patientSelected.patientName}}</strong> như lịch bác sĩ đã sắp xếp.
        </span>
      </el-col>
    </el-row>
    <div class="medical-treatment">
      <div class="medical-treatment__duration-date">
        <div class="medical-treatment__duration-date_label"></div>
        <div class="medical-treatment__duration-date_content"></div>
      </div>
      <div>
        <el-button type="primary" @click="openAddNewMedicine()">Tạo mới</el-button>
      </div>
    </div>
    <h1 style="margin-top: 1em;">Lịch sử dùng thuốc</h1>
    <el-timeline class="timeline">
      <el-timeline-item v-show="medicalInstructionHistory !== []" v-for="(prescription, index) in medicalInstructionHistory" :key="index" :timestamp="`${prescription.dateStarted} - ${prescription.dateFinished}`" placement="top">
        <el-card shadow="never">
          <span>
            Chuẩn đoán:
            <strong>{{prescription.diagnose}}</strong>
          </span>
          <el-table class="medical-treatment__medical-list text" :data="prescription.medicationSchedules">
            <el-table-column class="text" label="STT" width="50" type="index"></el-table-column>
            <el-table-column class="text" label="Tên thuốc" prop="medicationName" width="150"></el-table-column>
            <el-table-column class="text" label="Hàm lượng" prop="content" width="110"></el-table-column>
            <el-table-column class="text" label="Cách dùng" prop="useTime" width="250"></el-table-column>
            <el-table-column class="text" label="Đơn vị" prop="unit" width="70"></el-table-column>
            <el-table-column class="text" label="Số lượng" prop="totalNumber" width="90"></el-table-column>
          </el-table>
          <el-row class="right">
            <span style="color: gray; margin-right: .4em; font-size: 10px"><i>Sử dụng đơn thuốc này cho đơn thuốc tiếp theo</i></span>
            <router-link :to="'medical-schedule'" class="router-items">
              <el-button type="primary" class="copy" @click="openAddNewMedicine()">Dùng</el-button>
            </router-link>
          </el-row>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('medicalInstruction', [
      'patientSelected',
      'prescriptionDetails', 'medicalInstructionHistory'
    ])
  },
  mounted () {
    this.getMedicalScheduleHistory()
  },
  methods: {
    ...mapActions('patients', ['getPatientApproved']),
    ...mapActions('medicalInstruction', [
      'createMedicalSchedule',
      'usePrescription', 'getMedicalScheduleHistory', 'openAddNewMedicine'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.medical-schedule-old {
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  @include borderRadius(2px);
}
.diagnose {
  margin-top: 2em;
  .diagnose__label {
    margin-bottom: 0.5em;
  }
  .diagnose__content {
  }
}
.medical-treatment {
  margin-top: 2em;
  .medical-treatment__title {
  }
}
.timeline {
  margin-top: 1em;
}
.copy {
  margin: 1em 0;
}
.right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
