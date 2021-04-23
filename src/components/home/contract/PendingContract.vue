<template>
  <div>
    <el-table :data="pendingContracts" :default-sort="{prop: 'dateCreated', order: 'descending'}">
      <template slot="empty">Không có dữ liệu</template>
      <el-table-column prop="contractCode" label="Mã hợp đồng" width="130"></el-table-column>
      <el-table-column prop="fullNamePatient" label="Họ tên" width="200"></el-table-column>
      <el-table-column prop="phoneNumberPatient" label="Số điện thoại" width="150"></el-table-column>
      <el-table-column
        prop="dateCreated"
        label="Ngày tạo"
        sortable
        width="125"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="Chức năng">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleView(scope.$index, scope.row)">Xem</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleReject(scope.$index, scope.row)"
          >Từ chối</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
    ...mapActions('contracts', [
      'getPendingContracts',
      'confirmRejectContract'
    ]),
    // Đi đến trang chi tiết yêu cầu của bệnh nhân mà bác sĩ đã chọn
    handleView (index, row) {
      this.$store.dispatch('contracts/getRequestDetail', row.contractId, { root: true })
    },
    handleReject (index, row) {
      this.confirmRejectContract(row.contractId)
    },
    formatDate (row, column) {
      return row.dateCreated
        .split('-')
        .reverse()
        .join('/')
    }
  }
}
</script>

<style>
</style>
