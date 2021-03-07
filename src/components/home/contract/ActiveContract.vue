<template>
  <div>
    <el-table :data="activeContracts"
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
          width="125">
      </el-table-column>
    </el-table></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('contracts', ['activeContracts'])
  },
  mounted () {
    this.getActiveContracts()
  },
  methods: {
    ...mapActions('contracts', ['getActiveContracts'])
  }
}
</script>

<style>

</style>
