<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-if="routeFrom === 'HOME'">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item v-if="routeFrom === 'PATIENT-DETAIL'">Bệnh nhân</el-breadcrumb-item>
      <el-breadcrumb-item>Y lệnh</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch uống thuốc</el-breadcrumb-item>
      <el-breadcrumb-item>Đơn thuốc mới</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="1" class="margin-bottom">
        <i>
          <img src="../../../assets/icons/ic-medicine.png" class="iconDialog" />
        </i>
      </el-col>
      <el-col :span="23" class="margin-bottom">
        <h2>Đơn thuốc</h2>
      </el-col>
    </el-row>
    <p class="font-size14 margin-bottom">
      Tên bệnh nhân:
      <strong>{{patientSelected.patientName}}</strong>
    </p>
    <el-row class="margin-bottom" align="top">
      <el-col :span="4">
        <span class="font-size14">
          Chuẩn đoán
          <span class="red">*</span>:
        </span>
      </el-col>
      <el-col :span="18" class="form__item_suggestion">
        <el-row>
          <el-col :span="18">
            <el-row
              style="display: flex; align-items: center; font-size: 13px;"
              v-for="(prescriptionDiagnose, index) in prescriptionDiagnoses"
              :key="`prescriptionDiagnose-${index}`"
            >
              <p style="margin-bottom: .5em;">- {{prescriptionDiagnose.diagnose}}</p>
              <el-link
                style="margin-left: 1em;"
                @click="removeDiagnoseFromPrescription(index)"
                type="danger"
                size="mini"
              >
                <i class="el-icon-remove-outline"></i>
              </el-link>
            </el-row>

            <el-link
              style="font-size: 13px;"
              @click="openShowAddMoreDiagnoseToPrescription"
              type="primary"
              size="mini"
            >
              <i class="el-icon-circle-plus-outline"></i>Thêm
            </el-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="4" class="font-size14">
        Ngày bắt đầu
        <span class="red">*</span>:
      </el-col>
      <el-col :span="10">
        <el-date-picker
          style="width: 100%;"
          v-model="dateStarted"
          type="date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          size="mini"
          :picker-options="dateStartedPickerOptions"
          @change="handleChangeDateStarted"
        ></el-date-picker>
      </el-col>
      <el-col :span="10" class="font-size14">
        <div
          v-show="isWarningDateStarted"
          style="color: #E6A23C"
        >Đã có đơn thuốc đang được sử dụng trong thời gian này.</div>
        <div
          v-show="isErrorDateStarted"
          style="color: #F56C6C"
        >Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại.</div>
      </el-col>
    </el-row>
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="4" class="font-size14">
        Ngày kết thúc
        <span class="red">*</span>:
      </el-col>
      <el-col :span="10">
        <el-date-picker
          style="width: 100%;"
          v-model="dateFinished"
          type="date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          size="mini"
          @change="handleChangeDateFinished"
          :picker-options="dateFinishedPickerOptions"
        ></el-date-picker>
      </el-col>
      <el-col :span="10" class="font-size14">
        <div v-show="isErrorDateFinished" style="color: #F56C6C">
          <p>Ngày kết thúc nhỏ hơn ngày bắt đầu.</p>
          <p>Vui lòng chọn lại.</p>
        </div>
      </el-col>
    </el-row>
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="4">
        <span class="font-size14">Mô tả:</span>
      </el-col>
      <el-col :span="10" class="form__item_suggestion">
        <el-input
          type="textarea"
          autosize
          style="width: 100%;"
          v-model="descriptionNewPrescription"
          placeholder="Nhập mô tả..."
          size="mini"
        ></el-input>
      </el-col>
      <el-col :span="10"></el-col>
    </el-row>
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="4">
        <span class="font-size14">Kết luận:</span>
      </el-col>
      <el-col :span="10" class="form__item_suggestion">
        <el-input
          type="textarea"
          autosize
          style="width: 100%;"
          v-model="conclusion"
          placeholder="Nhập kết luận..."
          size="mini"
        ></el-input>
      </el-col>
      <el-col :span="10"></el-col>
    </el-row>
    <el-button type="primary" @click="handleAddNewMedicine()" size="mini">Thêm thuốc</el-button>
    <el-table class="medical-treatment__medical-list text" :data="prescriptionDetails">
      <el-table-column class="text" label="STT" width="50" type="index"></el-table-column>
      <el-table-column class="text" label="Tên thuốc" prop="medicineName" width="200"></el-table-column>
      <el-table-column class="text" label="Hàm lượng" prop="content" width="110"></el-table-column>
      <el-table-column class="text" label="Cách dùng" prop="usage" width="300"></el-table-column>
      <el-table-column class="text" label="Đơn vị" prop="unit" width="70"></el-table-column>
      <el-table-column class="text" label="Số lượng" prop="totalNumber" width="90"></el-table-column>
      <el-table-column fixed="right" label="Chức năng" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Sửa</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Xoá</el-button>
        </template>
      </el-table-column>
      <template slot="empty">...</template>
    </el-table>
    <el-button style="margin-top: 1em;" size="mini" @click="backToMedicalSchedule()">Trở về</el-button>
    <el-button size="mini" v-if="isValid === false" type="primary" disabled>Lưu</el-button>
    <el-button
      v-else
      size="mini"
      type="primary"
      @click="savePrescription({dateStarted: dateStarted, dateFinished: dateFinished, description: descriptionNewPrescription, contractId: patientSelected.contractId, conclusion:  conclusion})"
    >Lưu</el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    if (
      this.$store.state.medicalInstruction.prescriptionCreated.status === 'NEW'
    ) {
      return {
        diagnosesNewPrescription: [],
        conclusion: '',
        isShowInputDiagnose: false,
        dateStarted: '',
        isWarningDateStarted: false,
        dateFinished: '',
        isErrorDateFinished: false,
        isValid: false,
        descriptionNewPrescription: '',
        isErrorDateStarted: false,
        dateStartedPickerOptions: {
          disabledDate: this.handleDisabledDateStarted
        },
        dateFinishedPickerOptions: {
          disabledDate: this.handleDisabledDateFinished
        }
      }
    } else if (
      this.$store.state.medicalInstruction.prescriptionCreated.status ===
      'REUSE'
    ) {
      return {
        diagnosesNewPrescription: [],
        descriptionNewPrescription: this.$store.state.medicalInstruction
          .prescriptionExisted.description,
        conclusion: this.$store.state.medicalInstruction
          .prescriptionExisted.conclusion,
        dateStarted: this.$store.state.medicalInstruction.prescriptionExisted.dateStarted
          .split('/')
          .reverse()
          .join('-'),
        dateFinished: this.$store.state.medicalInstruction.prescriptionExisted.dateFinished
          .split('/')
          .reverse()
          .join('-'),
        isShowInputDiagnose: false,
        isWarningDateStarted: false,
        isErrorDateFinished: false,
        isValid: false,
        isErrorDateStarted: false,
        dateStartedPickerOptions: {
          disabledDate: this.handleDisabledDateStarted
        },
        dateFinishedPickerOptions: {
          disabledDate: this.handleDisabledDateFinished
        }
      }
    }
  },
  computed: {
    ...mapState('medicalInstruction', [
      'prescriptionDetails',
      'patientSelected',
      'prescriptionExisted',
      'prescriptionExistedStatus',
      'maxDatePrescription'
    ]),
    ...mapState('suggestions', ['visibleDiagnose', 'diagnoseSuggestion']),
    ...mapState('systemHandler', ['routeFrom']),
    ...mapState('time', ['timeNow']),
    ...mapState('prescription', ['prescriptionDiagnoses'])
  },
  mounted () {
    this.getTimeSystem()
    this.getMedicines()
    this.isValid = false
    this.setDiagnosePrescriptionEmpty()
  },
  methods: {
    ...mapActions('prescription', [
      'removeDiagnoseFromPrescription',
      'setDiagnosePrescriptionEmpty'
    ]),
    handleDisabledDateStarted (time) {
      return time < new Date(this.timeNow)
    },
    handleDisabledDateFinished (time) {
      return time < new Date(this.dateStarted)
    },
    ...mapActions('time', ['getTimeSystem']),
    ...mapActions('medicalInstruction', [
      'changeRadio',
      'savePrescription',
      'backToMedicalSchedule'
    ]),
    ...mapActions('modals', [
      'closeEditMedicine',
      'openShowAddMoreDiagnoseToPrescription' // Đóng modal sửa thuốc
    ]),
    ...mapActions('suggestions', ['getMedicines']),
    handleAddNewMedicine () {
      this.$store.dispatch(
        'medicalInstruction/addNewMedicine',
        {
          status: 'NEW-MEDICINE',
          medicine: {
            unit: '',
            content: '',
            medicineName: '',
            morning: 0,
            noon: 0,
            night: 0,
            afternoon: 0,
            useTime: ''
          },
          index: null
        },
        { root: true }
      )
    },
    handleEdit (index, row) {
      console.log(row)
      this.$store.dispatch(
        'medicalInstruction/addNewMedicine',
        { status: 'EDIT-MEDICINE', medicine: row, index: index },
        { root: true }
      )
    },
    // Xoá thuốc khỏi danh sách đơn thuốc
    handleDelete (index, row) {
      this.$store.dispatch(
        'medicalInstruction/removeMedicineInPrescription',
        index,
        { root: true }
      )
    },
    handleChangeDateStarted (date) {
      if (new Date(date) < new Date()) {
        this.isErrorDateStarted = true
        this.isWarningDateStarted = false
      } else if (
        new Date(date) < this.maxDatePrescription.dateFinished &&
        new Date(date) > new Date()
      ) {
        this.isWarningDateStarted = true
        this.isErrorDateStarted = false
      } else {
        this.isWarningDateStarted = false
        this.isErrorDateStarted = false
      }
    },
    handleChangeDateFinished (date) {
      if (new Date(date) < new Date(this.dateStarted)) {
        this.isErrorDateFinished = true
        this.isValid = false
      } else {
        this.isErrorDateFinished = false
        this.isValid = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.margin-bottom {
  margin-bottom: 0.5em;
}
.red {
  color: black;
}
</style>
