<template>
  <div class="wrapper">
    <el-breadcrumb separator="/" style="font-size: 10px">
       <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
       <el-breadcrumb-item>Danh sách yêu cầu</el-breadcrumb-item>
       <el-breadcrumb-item>Thông tin bệnh nhân</el-breadcrumb-item>
    </el-breadcrumb><br/><br/>
    <h2>Thông tin cơ bản</h2>
    <el-row :gutter="20" class="wrapper_patient">
      <el-col :span="14">
        <el-row class="wrapper_patient-item">Họ và tên: <strong>{{requestDetail.fullNamePatient}}</strong></el-row>
        <el-row class="wrapper_patient-item">Ngày sinh: <strong>{{requestDetail.dobPatient}}</strong></el-row>
        <el-row class="wrapper_patient-item">Địa chỉ: <strong>{{requestDetail.addressPatient}}</strong></el-row>
      </el-col>
      <el-col :span="10">
        <el-row class="wrapper_patient-item">Nghề nghiệp: <strong>{{patientDetail.career}}</strong></el-row>
        <el-row class="wrapper_patient-item">Số điện thoại: <strong>{{requestDetail.phoneNumberPatient}}</strong></el-row>
      </el-col>
    </el-row>
    <h2>Lý do</h2>
    <el-row class="wrapper_patient">{{requestDetail.note}}</el-row>
    <h2>Thời gian</h2>
      <div class="wrapper_patient">
        <el-row class="wrapper_patient-item"><el-checkbox v-model="dateChk">Chỉnh sửa thời gian theo dõi</el-checkbox></el-row>
        <div v-if="dateChk === true">
          <el-row class="wrapper_patient-item">Ngày bắt đầu theo dõi: <el-date-picker v-model="requestDetail.dateStarted" type="date"></el-date-picker></el-row>
          <el-row class="wrapper_patient-item">Số ngày theo dõi:
            <el-select v-model="value" placeholder="Chọn gói">
              <el-option
                v-for="item in optionMonths"
                :key="item.name"
                :label="item.value"
                :value="item.name"  class="wrapper_patient-item">
              </el-option>
            </el-select>
          </el-row></div>
        <div v-else-if="dateChk === false">
          <el-row class="wrapper_patient-item">Ngày bắt đầu theo dõi: <el-date-picker v-model="requestDetail.dateStarted" type="date" disabled></el-date-picker></el-row>
          <el-row class="wrapper_patient-item">Số ngày theo dõi:
            <el-select v-model="value" placeholder="Chọn gói" disabled>
              <el-option
                v-for="item in optionMonths"
                :key="item.name"
                :label="item.value"
                :value="item.name"  class="wrapper_patient-item">
              </el-option>
            </el-select>
          </el-row></div></div>
    <el-row class="wrapper_action">
        <el-button type="info" @click="rejectContract()" class="wrapper_action-item">Từ chối</el-button>
        <el-button type="info" @click="nextCreateContract([requestDetail, value])" class="wrapper_action-item">Tiếp tục</el-button>
        <el-dialog title="Thông báo" :visible.sync="rejectDialogVisible" width="30%">
          <span>Bạn có muốn từ chối yêu cầu không?</span><br/>
          <el-button @click="continueAssignContract()">Không</el-button>
          <el-button type="primary" @click="confirmRejectContract()">Đồng ý</el-button>
        </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      dateChk: false,
      optionMonths: [
        {
          name: '30',
          value: '30 ngày'
        },
        {
          name: '60',
          value: '60 ngày'
        },
        {
          name: '90',
          value: '90 ngày'
        }
      ],
      value: '30'
    }
  },
  computed: {
    ...mapState('contracts', ['requestDetail', 'rejectDialogVisible', 'contract', 'patientDetail']),
    ...mapState('users', ['user'])
  },
  mounted () {
    console.log(`params : contractId: ${this.$route.contractId}`)
    this.getRequestDetail(`${this.$route.params.contractId}`)
  },
  methods: {
    ...mapActions('contracts', [
      'getRequestDetail',
      'rejectContract',
      'continueAssignContract',
      'confirmRejectContract',
      'nextCreateContract'
    ])
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  font-size: .8em;
  h2 {
   margin: .5em 0;
  }
  .wrapper_patient {
    .wrapper_patient-item {
      margin: .5em 0;
    }
  }
  .wrapper_action {
    display: flex;
      justify-content: center;
    .wrapper_action-item {
      margin: 2em 3em 0 3em;
    }
  }
}
</style>
