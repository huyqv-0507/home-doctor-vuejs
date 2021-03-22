<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Danh sách yêu cầu</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bg-theme">
      <h1>Danh sách yêu cầu</h1>
      <p style="color: gray; margin: 1em; font-size: 13px;">
        <i>Danh sách bệnh nhân đang chờ kết nối...</i>
      </p>
      <el-table
        :data="contractRequests"
        :default-sort="{prop: 'dateCreated', order: 'descending'}"
        @row-click="goToRequestDetail"
      >
        <el-table-column prop="contractCode" label="Mã hợp đồng" width="130"></el-table-column>
        <el-table-column prop="fullNamePatient" label="Họ tên" width="250"></el-table-column>
        <el-table-column prop="note" label="Mô tả" width="250"></el-table-column>
        <el-table-column prop="dateCreated" label="Ngày tạo" sortable width="130" :formatter="formatDate"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import router from '../../../router/index.js'
export default {
  computed: {
    ...mapState('contracts', ['contractRequests']),
    ...mapState('users', ['user'])
  },
  mounted () {
    this.getContractRequestPending(`${this.user.userId}`)
  },
  methods: {
    ...mapActions('contracts', ['getContractRequestPending']),
    // Đi đến trang chi tiết yêu cầu của bệnh nhân mà bác sĩ đã chọn
    goToRequestDetail (row, column, event) {
      this.$store.state.contracts.requestDetail.diseases = row.diseases // Các loại bênh trong hợp đồng
      router.push({
        name: 'request-detail',
        params: { contractId: row.contractId }
      })
    },
    formatDate (row, column) {
      return row.dateCreated.split('-').reverse().join('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
.title {
  font-weight: bold;
}
.row-card {
  margin-top: 5px;
  margin-bottom: 5px;
}
.request-content-center {
  text-align: center;
}
</style>
