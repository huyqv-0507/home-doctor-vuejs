<template>
  <div>
    <el-dialog
      :visible="visibleMedicalInstruction"
      width="30%"
      height="100px"
      @close="closeMedicalInstruction()"
    >
      <span slot="title" class="verticalCenter">
        <i>
          <img src="../../../assets/icons/ic-medical-instruction.png" class="iconDialog" />
        </i>
        <h3>Y lệnh</h3>
      </span>
      <span v-show="medicalInstructionStatus === false" class="wrapper_shortcut-items">
        <h4>Danh sách bệnh nhân</h4>
        <div
          v-on:click="handleSelectPatient(patient)"
          v-for="patient in approvedPatients"
          :key="`approved-patient-${patient.patientId}`"
          class="patient-card pointer"
        >
          <el-row class="fullwidth verticalCenter">
            <el-col :span="5">
              <img src="../../../assets/icons/avatar-default.jpg" class="avatar" />
            </el-col>
            <el-col :span="19">
              <h5>
                <strong class="patient-title">{{patient.patientName}}</strong>
              </h5>
              <p>
                <span class="patient-disease">
                  <strong>Bệnh lý:</strong>
                  <span v-if="patient.diseaseContract.length === 0">Chưa cập nhật</span>
                  <span
                    v-else
                    v-for="(disease, index) in patient.diseaseContract"
                    :key="`disease-${index}`"
                  >
                    <p>- ({{disease.diseaseId}}) {{disease.diseaseName}}</p>
                  </span>
                </span>
              </p>
            </el-col>
          </el-row>
        </div>
      </span>
      <span v-show="medicalInstructionStatus === true" class="wrapper_shortcut-items">
        <h4>Danh sách y lệnh</h4>
        <div v-on:click="setMedicalSchedule('HOME')" class="pointer">
          <el-row
            :gutter="20"
            class="wrapper_shortcut-items_item"
            style="margin-left: 0; margin-right: 0;"
          >
            <el-col :span="4">
              <img src="../../../assets/icons/ic-medicine.png" class="imgbtn" />
            </el-col>
            <el-col :span="20">
              <el-row class="title">
                <span class="wrapper_shortcut-items_item-title">Lịch uống thuốc</span>
              </el-row>
              <el-row>
                <span
                  class="wrapper_shortcut-items_item-description"
                >Bác sĩ ra y lệnh sử dụng thuốc cho bệnh nhân</span>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div v-on:click="setVitalSign('HOME')" class="pointer">
          <el-row
            :gutter="20"
            class="wrapper_shortcut-items_item"
            style="margin-left: 0; margin-right: 0;"
          >
            <el-col :span="4">
              <img src="../../../assets/icons/ic-blood-pressure.png" class="imgbtn" />
            </el-col>
            <el-col :span="20">
              <el-row class="title">
                <span class="wrapper_shortcut-items_item-title">Lịch đo sinh hiệu</span>
              </el-row>
              <el-row>
                <span
                  class="wrapper_shortcut-items_item-description"
                >Bác sĩ ra y lệnh đo sinh hiệu cho bệnh nhân</span>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="pagination">
          <el-button type="info" style="margin-top: 2em;" @click="backToSelectPatient()">Trở lại</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('modals', [
      'visibleMedicalInstruction' // Quản lý trạng thái hiển thị hoặc đóng của modal Y lệnh])
    ]),
    ...mapState('medicalInstruction', [
      'medicalInstructionStatus' // Trạng thái của modal Y lệnh. Xác định trang được hiển thị (Chọn bệnh nhân/ Chọn chức năng cho y lệnh)
    ]),
    ...mapState('patients', [
      'approvedPatients' // Danh sách bệnh nhân đang theo dõi của bác sĩ (Max = 5)
    ])
  },
  methods: {
    ...mapActions('medicalInstruction', [
      'backToSelectPatient', // Trở lại modal chọn bệnh nhân
      'selectPatient', // Chọn bệnh nhân
      'setMedicalSchedule', // Sang trang tạo lịch uống thuốc cho bệnh nhân
      'setVitalSign', // Sang trang tạo lịch đo sinh hiệu cho bệnh nhân
      'setAppointment'
    ]),
    ...mapActions('modals', [
      'closeMedicalInstruction' // Đóng modal Y lệnh
    ]),
    handleSelectPatient (patient) {
      if (patient.contractStatus !== 'ACTIVE') {
        this.$alert(
          'Hợp đồng giữa bác và bệnh nhân đã bị khoá vì bác sĩ đã không ra y lệnh cho bệnh nhân sau 4 ngày hợp đồng có hiệu lực',
          'Cảnh báo',
          {
            confirmButtonText: 'Đồng ý'
          }
        )
      } else {
        this.selectPatient(patient)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.wrapper_shortcut-items {
  overflow: scroll;
  .wrapper_shortcut-items_item {
    background-image: linear-gradient(45deg, #f8f8fa, #eeeff3);
    border-radius: 4px;
    height: 4.6875em;
    margin: 0.8em 0;
    @include center() img {
      width: 2em;
    }
    .title {
      margin-bottom: 0.5em;
      .wrapper_shortcut-items_item-title {
        font-size: 1em;
      }
    }
    .wrapper_shortcut-items_item-description {
      font-size: 0.7em;
      color: $color-button-sub-bg;
    }
  }
}
.patient-card {
  margin: 1em 0;
  background: #ececec;
  padding: 0.5em;
  height: 75px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  .fullwidth {
    width: 100%;
  }
  .avatar {
    border-radius: 30px;
  }
  .patient-title {
    font-size: 18px;
    margin-bottom: 0.5em;
  }
  .patient-disease {
    font-size: 12px;
  }
  .patient-diagnose {
    font-size: 12px;
  }
}
</style>
