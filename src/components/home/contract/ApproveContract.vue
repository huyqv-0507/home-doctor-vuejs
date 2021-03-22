<template>
  <div>
    <el-table :data="approveContracts"
              :default-sort = "{prop: 'dateCreated', order: 'descending'}">
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
          width="125" :formatter="formatDate">
      </el-table-column>
    </el-table></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('contracts', ['approveContracts'])
  },
  mounted () {
    this.getApproveContracts()
  },
  methods: {
    ...mapActions('contracts', ['getApproveContracts']),
    formatDate (row, column) {
      return row.dateCreated.split('-').join('/')
    }
  }
}
</script>

<style>

</style>
