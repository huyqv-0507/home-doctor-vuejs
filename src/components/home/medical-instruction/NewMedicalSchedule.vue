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
    <p class="font-size14 margin-bottom">Tên bệnh nhân: <strong>{{patientSelected.patientName}}</strong></p>
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="6">
        <span class="font-size14">
          Chuẩn đoán
          <span class="red">*</span>:
        </span>
      </el-col>
      <el-col :span="18" class="form__item_suggestion">
        <el-input
          v-model="diagnoseNewPrescription"
          placeholder="Nhập chuẩn đoán..."
          @input="searchDiagnose($event)"
          @change="leaveSearchDiagnose($event)" size="mini" @blur="blurDiagnose($event)"
        ></el-input>
        <div v-show="visibleDiagnose" class="form__item_input-suggestion">
          <ul>
            <li
              class="pointer"
              v-for="item in diagnoseSuggestion"
              :key="item.diagnoseId"
              v-on:click="handleSelectDiagnose(item)"
            >{{item.description}}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="6" class="font-size14">
        Ngày bắt đầu
        <span class="red">*</span>:
      </el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="dateStarted"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" size="mini"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="margin-bottom verticalCenter">
      <el-col :span="6" class="font-size14">
        Ngày kết thúc
        <span class="red">*</span>:
      </el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="dateFinished"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd" size="mini"
        ></el-date-picker>
      </el-col>
    </el-row>
      <el-button
        type="primary"
        @click="openAddMedicine()"
      >Thêm thuốc</el-button>
    <el-table v-if="prescriptionDetails !== null" class="medical-treatment__medical-list text" :data="prescriptionDetails">
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
      </el-table-column>
    </el-table>
      <el-button @click="backToMedicalSchedule()">Trở về</el-button>
      <el-button
        type="primary"
        @click="savePrescription({diagnose: diagnoseNewPrescription, dateStarted: dateStarted, dateFinished: dateFinished})"
      >Lưu</el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      diagnoseNewPrescription: '',
      dateStarted: '',
      dateFinished: ''
    }
  },
  computed: {
    ...mapState('medicalInstruction', [
      'prescriptionDetails',
      'patientSelected'
    ]),
    ...mapState('suggestions', [
      'visibleDiagnose',
      'diagnoseSuggestion',
      'diagnoses'
    ])
  },
  mounted () {
    this.getDiagnoses()
    this.getMedicines()
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
    ...mapActions('suggestions', [
      'getMedicines',
      'searchDiagnose',
      'leaveSearchDiagnose',
      'getDiagnoses'
    ]),
    handleSelectDiagnose (diagnose) {
      this.diagnoseNewPrescription = diagnose.description
      this.$store.dispatch('suggestions/leaveSearchDiagnose', null, {
        root: true
      })
    },
    handleEdit (index, row) {
      console.log('row edit', row)
      this.$store.dispatch('medicalInstruction/editMedicine', { index: index, medicineEdit: row }, { root: true })
      this.$store.dispatch('modals/openEditMedicine', null, { root: true })
    },
    // Xoá thuốc khỏi danh sách đơn thuốc
    handleDelete (index, row) {
      console.log('Delete index:', index)
      console.log('Delete index:', row)
      this.$store.state.medicalInstruction.prescriptionDetails.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.margin-bottom {
  margin-bottom: .3em;
}
.red {
  color: black;
}
</style>
