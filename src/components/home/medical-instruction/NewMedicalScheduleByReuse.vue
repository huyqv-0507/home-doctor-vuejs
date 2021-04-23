<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
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
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="6">
        <span class="font-size14">
          Chuẩn đoán
          <span class="red">*</span>:
        </span>
      </el-col>
      <el-col :span="10" class="form__item_suggestion">
        <el-autocomplete
          size="mini"
          style="width: 100%;"
          v-model="diagnoseNewPrescription"
          :fetch-suggestions="searchDiagnose"
          placeholder="Nhập chuẩn đoán..."
          @select="handleSelectDiagnose"
          :trigger-on-focus="false"
        >
          <template slot-scope="{ item }">
            <div>{{ item.description }}</div>
          </template>
        </el-autocomplete>
      </el-col>
      <el-col :span="10" style="font-size: 11px; color: gray; padding-left: .8em;">
        <i>
          Hiện tại ứng dụng chỉ hỗ trợ gợi ý chuẩn đoán về bệnh tim (tuần hoàn). Bác sĩ muốn xem những bệnh khác vui lòng tra cứu danh mục
          <el-link
            style="color: blue;"
            href="http://123.31.27.68/ICD/ICD10.htm"
            target="_blank"
          >ICD10</el-link>.
        </i>
      </el-col>
    </el-row>
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="6" class="font-size14">
        Ngày bắt đầu
        <span class="red">*</span>:
      </el-col>
      <el-col :span="10">
        <el-date-picker style="width: 100%;"
          v-model="dateStarted"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          size="mini"
          @change="handleChangeDateStarted"
        ></el-date-picker>
      </el-col>
      <el-col :span="10" class="font-size14">
        <div
          v-show="isWarningDateStarted"
          style="color: #E6A23C"
        >Đã có đơn thuốc đang được sử dụng trong thời gian này.</div>
      </el-col>
    </el-row>
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="6" class="font-size14">
        Ngày kết thúc
        <span class="red">*</span>:
      </el-col>
      <el-col :span="10">
        <el-date-picker style="width: 100%;"
          v-model="dateFinished"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          size="mini"
          @change="handleChangeDateFinished"
        ></el-date-picker>
      </el-col>
      <el-col :span="10" class="font-size14">
        <div
          v-show="isErrorDateFinished"
          style="color: #F56C6C"
        ><p>Ngày kết thúc nhỏ hơn ngày bắt đầu.</p><p>Vui lòng chọn lại.</p></div>
      </el-col>
    </el-row><el-row class="margin-bottom verticalCenter">
      <el-col :span="6">
        <span class="font-size14">
          Mô tả:
        </span>
      </el-col>
      <el-col :span="10" class="form__item_suggestion">
        <el-input style="width: 100%;"
          v-model="descriptionNewPrescription"
          placeholder="Nhập mô tả..." size="mini"
        >
        </el-input>
      </el-col>
      <el-col :span="10"></el-col>
    </el-row>
    <el-button type="primary" @click="openAddMedicine()" size="mini">Thêm thuốc</el-button>
    <el-table class="medical-treatment__medical-list text" :data="prescriptionDetails">
      <el-table-column class="text" label="STT" width="50" type="index"></el-table-column>
      <el-table-column class="text" label="Tên thuốc" prop="medicineName"></el-table-column>
      <el-table-column class="text" label="Hàm lượng" prop="content" width="110"></el-table-column>
      <el-table-column class="text" label="Cách dùng" prop="usage" width="200"></el-table-column>
      <el-table-column class="text" label="Đơn vị" prop="unit" width="70"></el-table-column>
      <el-table-column class="text" label="Số lượng" prop="totalNumber" width="90"></el-table-column>
      <el-table-column label="Chức năng">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Sửa</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Xoá</el-button>
        </template>
      </el-table-column><template slot="empty">...</template>
    </el-table>
    <el-button @click="backToMedicalSchedule()" size="mini">Trở về</el-button>
    <el-button
      v-if="isValid === false"
      type="primary" disabled
    >Lưu</el-button>
    <el-button
      v-else
      type="primary"
      @click="savePrescription({diagnose: diagnoseNewPrescription, dateStarted: dateStarted, dateFinished: dateFinished, desscription: descriptionNewPrescription})"
    >Lưu</el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      isWarningDateStarted: false,
      isErrorDateFinished: false,
      isValid: false,
      diagnoses: [],
      descriptionNewPrescription: this.$store.state.medicalInstruction.prescriptionExisted.description,
      diagnoseNewPrescription: this.$store.state.medicalInstruction.prescriptionExisted.diagnose,
      dateStarted: this.$store.state.medicalInstruction.prescriptionExisted.dateStarted.split('/').reverse().join('-'),
      dateFinished: this.$store.state.medicalInstruction.prescriptionExisted.dateFinished.split('/').reverse().join('-')
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
    ...mapState('suggestions', ['visibleDiagnose', 'diagnoseSuggestion'])
  },
  mounted () {
    this.getDiagnoses()
    this.diagnoses = this.$store.state.suggestions.diagnoses.map(diagnose => {
      return {
        description: `(${diagnose.code}) ${diagnose.description}`,
        desSearch: `(${diagnose.code}) ${diagnose.description} ${diagnose.arrCode}`
      }
    })
    this.getMedicines()
    this.isValid = false
  },
  methods: {
    ...mapActions('medicalInstruction', [
      'changeRadio',
      'savePrescription',
      'backToMedicalSchedule'
    ]),
    ...mapActions('modals', [
      'openAddMedicine', // mở modal thêm thuốc
      'closeEditMedicine' // Đóng modal sửa thuốc
    ]),
    ...mapActions('suggestions', ['getMedicines', 'getDiagnoses']),
    searchDiagnose (queryString, cb) {
      var diagnoses = this.diagnoses
      var results = queryString
        ? diagnoses.filter(this.filterDiagnose(queryString))
        : diagnoses
      // call callback function to return suggestion objects
      cb(results)
    },
    filterDiagnose (queryString) {
      return diagnose => {
        return (
          diagnose.desSearch
            .toString()
            .toLowerCase()
            .indexOf(queryString.toString().toLowerCase()) > -1
        )
      }
    },
    handleSelectDiagnose (diagnose) {
      this.diagnoseNewPrescription = diagnose.description
    },
    handleEdit (index, row) {
      this.$store.dispatch(
        'medicalInstruction/editMedicine',
        { index: index, medicineEdit: row },
        { root: true }
      )
      this.$store.dispatch('modals/openEditMedicine', null, { root: true })
    },
    // Xoá thuốc khỏi danh sách đơn thuốc
    handleDelete (index, row) {
      this.$store.state.medicalInstruction.prescriptionDetails.splice(index, 1)
    },
    handleChangeDateStarted (date) {
      if (new Date(date) < this.maxDatePrescription.dateFinished) {
        this.isWarningDateStarted = true
      } else {
        this.isWarningDateStarted = false
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
