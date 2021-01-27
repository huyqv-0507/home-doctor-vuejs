<template>
  <div>
    <h1>Thông tin bệnh nhân</h1>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-row>Họ và tên: <strong>{{requestDetail.fullNamePatient}}</strong></el-row>
        <el-row>Ngày sinh: <strong>{{requestDetail.dobPatient}}</strong></el-row>
        <el-row>Địa chỉ: <strong>{{requestDetail.addressOfPatient}}</strong></el-row>
      </el-col>
      <el-col :span="10">
        <el-row>Nghề nghiệp: <strong>{{requestDetail.career}}</strong></el-row>
        <el-row>Số điện thoại: <strong>{{requestDetail.phoneNumberPatient}}</strong></el-row>
      </el-col>
    </el-row>
    <h3>Lý do</h3>
    <el-row><strong>{{requestDetail.reason}}</strong></el-row>
    <h1>Thời gian</h1>
      <el-row>Ngày bắt đầu theo dõi: <el-date-picker v-model="requestDetail.dateStarted" type="date"></el-date-picker></el-row>
      <el-row>Ngày kết thúc theo dõi:
        <el-select v-model="value" placeholder="Chọn gói">
        <el-option
          v-for="item in optionMonths"
          :key="item.name"
          :label="item.value"
          :value="item.name">
        </el-option>
      </el-select></el-row>
    <el-row>
      <el-col :span="6"/>
      <el-col :span="6">
        <el-button type="info" @click="rejectContract()">Từ chối</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="info" @click="nextCreateContract([requestDetail, value])">Tiếp tục</el-button>
        <el-dialog title="Thông báo" :visible.sync="rejectDialogVisible" width="30%">
          <span>Bạn có muốn từ chối yêu cầu không?</span><br/>
          <el-button @click="continueAssignContract()">Không</el-button>
          <el-button type="primary" @click="confirmRejectContract()">Đồng ý</el-button>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
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
    ...mapState('contracts', ['requestDetail', 'rejectDialogVisible', 'contract']),
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

<style>

</style>
