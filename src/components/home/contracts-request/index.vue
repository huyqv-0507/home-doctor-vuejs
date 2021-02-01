<template>
  <div>
    <h1>Danh sách yêu cầu</h1>
    <br/>
    <el-input placeholder="Nhập tên bệnh nhân" style="margin-bottom: 1em;"></el-input>
    <el-table :data="contractRequests"
              :default-sort = "{prop: 'dateCreated', order: 'descending'}"
              @row-click="goToRequestDetail">
      <el-table-column
          prop="contractCode"
          label="Code"
          width="120">
      </el-table-column>
      <el-table-column
          prop="fullNamePatient"
          label="Name"
          width="200">
      </el-table-column>
      <el-table-column
          prop="note"
          label="Reason"
          width="170">
      </el-table-column>
      <el-table-column
          prop="status"
          label="Trạng thái"
          width="100">
      </el-table-column>
      <el-table-column
          prop="daysOfTracking"
          label="Ngày theo dõi"
          width="125">
      </el-table-column>
      <el-table-column
          prop="dateCreated"
          label="Ngày tạo"
          sortable
          width="125">
      </el-table-column>
    </el-table>
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
      router.push({ name: 'request-detail', params: { contractId: row.contractId } })
    }
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
.request-content-center {
  text-align: center;
}
</style>
