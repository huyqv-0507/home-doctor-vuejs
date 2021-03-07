<template>
  <div>
    <el-table :data="pendingContracts"
              :default-sort = "{prop: 'dateCreated', order: 'descending'}"
              @row-click="goToRequestDetail">
      <el-table-column
          prop="contractCode"
          label="Mã hợp đồng"
          width="120">
      </el-table-column>
      <el-table-column
          prop="fullNamePatient"
          label="Họ tên"
          width="200">
      </el-table-column>
      <el-table-column
          prop="note"
          label="Mô tả"
          width="200">
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
    </el-table></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('contracts', ['pendingContracts'])
  },
  mounted () {
    this.getPendingContracts()
  },
  methods: {
    ...mapActions('contracts', ['getPendingContracts']),
    // Đi đến trang chi tiết yêu cầu của bệnh nhân mà bác sĩ đã chọn
    goToRequestDetail (row, column, event) {
      this.$store.state.contracts.requestDetail.diseases = row.diseases
      this.$router.push({ name: 'request-detail', params: { contractId: row.contractId } })
    }
  }
}
</script>

<style>

</style>
