<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-if="routeFrom === 'HOME'">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item v-if="routeFrom === 'PATIENT-DETAIL'">Bệnh nhân</el-breadcrumb-item>
      <el-breadcrumb-item>Y lệnh</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch uống thuốc</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-theme" style="font-size: 13px;">
    <el-row class="verticalCenter">
      <el-col :span="18">
        <h1 class="margin-default">Lịch dùng thuốc</h1>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-row style="margin-top: 1em; margin-left: 2em;">
      <el-col>
        <span style="color: gray;">
          Hệ thống sẽ gửi thông báo nhắc nhở đến bệnh nhân
          <strong
            style="color: black;"
          v-if="patientSelected !== null">{{patientSelected.patientName}}</strong> như lịch bác sĩ đã sắp xếp.
        </span>
      </el-col>
    </el-row>
    <div class="medical-treatment">
      <div class="medical-treatment__duration-date">
        <div class="medical-treatment__duration-date_label"></div>
        <div class="medical-treatment__duration-date_content"></div>
      </div>
      <div>
        <el-button size="mini" type="primary" @click="openAddNewMedicine()">Tạo mới</el-button>
      </div>
    </div>
    <h1 class="margin-default">Đơn thuốc đã sử dụng</h1>
    <div class="filter">
      <el-select v-model="value" placeholder="Tất cả" size="mini" @change="handleStatusSelected">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-timeline class="timeline">
      <el-timeline-item
        v-show="medicalInstructionHistory !== []"
        v-for="(prescription, index) in medicalInstructionHistory"
        :key="index"
        :timestamp="`${prescription.dateStarted} - ${prescription.dateFinished}`"
        placement="top"
      >
        <el-card shadow="never" v-bind:class="{ bgCancel: prescription.isCanceled }">
          <p class="margin-vertical1em">
            Chuẩn đoán:
            <strong v-for="(disease, index) in prescription.diseases" :key="`${index}`">{{disease.diseaseId}} - {{disease.diseaseName}}; </strong>
          </p>
          <p class="margin-vertical1em">
            Trạng thái:
            <strong
              v-if="prescription.status === 'ACTIVE'"
              style="color: green;"
            >Đang sử dụng</strong>
            <strong v-if="prescription.status === 'CANCEL'" style="color: red;">Đã dừng sử dụng</strong>
            <strong v-if="prescription.status === 'FINISH'" style="color: gray;">Đã hoàn thành</strong>
          </p>
          <p class="margin-vertical1em">
            Mô tả:
            <strong>{{prescription.description}}</strong>
          </p>
          <p v-show="prescription.dateCanceled !== null" class="margin-vertical1em">
            Ngày huỷ:
            <strong>{{prescription.dateCanceled}}</strong>
          </p>
          <p v-show="prescription.reasonCancel !== null" class="margin-vertical1em">
            Lý do huỷ:
            <strong>{{prescription.reasonCancel}}</strong>
          </p>
          <el-table
            class="medical-treatment__medical-list text"
            :data="prescription.medicationSchedules"
          >
            <el-table-column class="text" label="STT" width="50" type="index"></el-table-column>
            <el-table-column class="text" label="Tên thuốc" prop="medicationName" width="150"></el-table-column>
            <el-table-column class="text" label="Hàm lượng" prop="content" width="110"></el-table-column>
            <el-table-column class="text" label="Cách dùng" prop="usage" width="250"></el-table-column>
            <el-table-column class="text" label="Đơn vị" prop="unit" width="70"></el-table-column>
            <el-table-column class="text" label="Số lượng" prop="totalNumber" width="90"></el-table-column>
          </el-table>
          <el-row class="right">
            <span style="color: gray; margin-right: .4em; font-size: 10px">
              <i>Sử dụng đơn thuốc này cho đơn thuốc tiếp theo</i>
            </span>
            <el-button
              type="primary"
              class="copy"
              @click="reusePrescription(prescription)"
              size="mini"
            >Dùng</el-button>
            <el-button
              v-if="prescription.status === 'ACTIVE'"
              type="danger"
              size="mini"
              @click="handleCancelPrescription(prescription.medicalInstructionId)"
            >Dừng đơn thuốc</el-button>
          </el-row>
        </el-card>
      </el-timeline-item>
    </el-timeline></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('medicalInstruction', [
      'patientSelected',
      'prescriptionDetails',
      'medicalInstructionHistory',
      'medicalInstructionHistories'
    ]),
    ...mapState('appointments', ['appointmentIdToCreatePrescription']),
    ...mapState('systemHandler', ['routeFrom'])
  },
  mounted () {
    this.getMedicalScheduleHistory()
  },
  data () {
    return {
      options: [
        {
          value: 'all',
          label: 'Tất cả'
        },
        {
          value: 'finish',
          label: 'Đã hoàn thành'
        },
        {
          value: 'active',
          label: 'Đang sử dụng'
        },
        {
          value: 'cancel',
          label: 'Đã dừng sử dụng'
        }
      ],
      value: ''
    }
  },
  methods: {
    ...mapActions('patients', ['getPatientApproved']),
    ...mapActions('medicalInstruction', [
      'createMedicalSchedule',
      'usePrescription',
      'openAddNewMedicine',
      'reusePrescription',
      'setMedicalInstructionHistory', 'cancelPrescription', 'getMedicalScheduleHistory'
    ]),
    handleTest () {
      console.log('abc')
    },
    handleStatusSelected (value) {
      var medicalInstructions = []
      var medicalInstructionHistories = this.medicalInstructionHistories
      if (value === 'finish') {
        medicalInstructionHistories.forEach(mih => {
          if (mih.isFinish === true) {
            medicalInstructions.push(mih)
          }
        })
        this.setMedicalInstructionHistory(medicalInstructions)
      } else if (value === 'active') {
        medicalInstructionHistories.forEach(mih => {
          if (mih.isActive === true) {
            medicalInstructions.push(mih)
          }
        })
        this.setMedicalInstructionHistory(medicalInstructions)
      } else if (value === 'cancel') {
        medicalInstructionHistories.forEach(mih => {
          if (mih.isCanceled === true) {
            medicalInstructions.push(mih)
          }
        })
        this.setMedicalInstructionHistory(medicalInstructions)
      } else {
        this.setMedicalInstructionHistory(medicalInstructionHistories)
      }
    },
    handleCancelPrescription (medicalInstructionId) {
      console.log('Huỷ đơn thuốc>>>', medicalInstructionId)
      this.$confirm(
        'Dừng sử dụng đơn thuốc này. Tiếp tục?',
        'Cảnh báo',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(() => {
          this.handleConfirmCancel(medicalInstructionId)
        })
        .catch(() => {
        })
    },
    handleConfirmCancel (medicalInstructionId) {
      this.$prompt('Nhập lý do', 'Lý do', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      })
        .then(({ value }) => {
          this.cancelPrescription({ medicalInstructionId: medicalInstructionId, reasonCancel: value })
        })
        .catch(() => {
        })
    }
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
.margin-vertical1em {
  margin: 1em 0;
}
.bgCancel {
  background-color: #f8f8fa;
}
.filter {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.margin-default {
  margin: 0.7em 0;
}
</style>
