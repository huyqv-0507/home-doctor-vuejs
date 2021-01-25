<template>
  <div>
    <h1>Thông tin</h1>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-row>Họ và tên: <el-input v-model="requestDetail.fullName"></el-input></el-row>
        <el-row>Giới tính: <el-input v-model="requestDetail.gender"></el-input></el-row>
        <el-row>Ngày sinh: <el-input v-model="requestDetail.dateOfBirth"></el-input></el-row>
        <el-row>Địa chỉ: <el-input v-model="requestDetail.address"></el-input></el-row>
        <el-row>Tên người nhà: <el-input v-model="requestDetail.relativeName"></el-input></el-row>
      </el-col>
      <el-col :span="10">
        <el-row>Tuổi: <el-input v-model="requestDetail.dateOfBirth"></el-input></el-row>
        <el-row>Nghề nghiệp: <el-input v-model="requestDetail.job"></el-input></el-row>
        <el-row>Số điện thoại: <el-input v-model="requestDetail.phoneNumber"></el-input></el-row>
        <el-row>Số điện thoại người nhà: <el-input v-model="requestDetail.relativePhoneNumber"></el-input></el-row>
      </el-col>
    </el-row>
    <h1>Thời gian</h1>
      <el-row>Ngày bắt đầu theo dõi: <el-date-picker v-model="requestDetail.dateStarted" type="datetime"></el-date-picker></el-row>
      <el-row>Ngày kết thúc theo dõi: <el-date-picker v-model="requestDetail.dateFinished" type="datetime"></el-date-picker></el-row>
    <el-row>
      <el-col :span="6"/>
      <el-col :span="6">
        <el-button type="info" @click="rejectContract()">Từ chối</el-button>
      </el-col>
      <el-col :span="6">
        <el-button type="info" @click="nextCreateContract([requestDetail, user])">Tiếp tục</el-button>
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
    }
  },
  computed: {
    ...mapState('contracts', ['requestDetail', 'rejectDialogVisible', 'contract']),
    ...mapState('users', ['user'])
  },
  mounted () {
    this.getRequestDetail([this.$route.params.patientId, this.$route.params.contractCode])
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
