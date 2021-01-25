<template>
  <div>
    <h1>Danh sách yêu cầu</h1>
    <br/>
    <el-input placeholder="Người yêu cầu"></el-input>
    <br/><br/>
    <el-row>
      <el-col :span="7" class="title">Người yêu cầu</el-col>
      <el-col :span="4" class="title">Mã hợp đồng</el-col>
      <el-col :span="8" class="title">Lý do</el-col>
      <el-col :span="2" class="title">Trạng thái</el-col>
      <el-col :span="3" class="title">Ngày tạo</el-col>
    </el-row>
      <el-row v-for="contractRequest in contractRequests" :key="contractRequest.patientId">
        <router-link :to="{name: 'request-detail', params: {patientId: contractRequest.patientId, contractCode: contractRequest.contractCode}}">
          <el-card class="row-card">
          <el-col :span="7" class="request-content">
            <el-row>{{contractRequest.fullName}}</el-row>
            <el-row>{{contractRequest.phoneNumber}}</el-row>
          </el-col>
          <el-col :span="4" class="request-content">{{contractRequest.contractCode}}</el-col>
          <el-col :span="8" class="request-content">{{contractRequest.reason}}</el-col>
          <el-col :span="2" class="request-content">{{contractRequest.status}}</el-col>
          <el-col :span="3" class="request-content">{{contractRequest.dateCreated}}</el-col>
       </el-card>
        </router-link>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('contracts', ['contractRequests'])
  },
  mounted () {
    this.getContractRequests()
  },
  methods: {
    ...mapActions('contracts', ['getContractRequests'])
  }

}
</script>

<style>
.title {
   font-weight: bold;
}
.row-card {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
