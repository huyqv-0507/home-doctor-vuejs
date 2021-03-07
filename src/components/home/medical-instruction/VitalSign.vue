<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
       <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
       <el-breadcrumb-item>Y lệnh</el-breadcrumb-item>
       <el-breadcrumb-item>Lịch đo sinh hiệu</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('patients', ['getPatientApproved'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/index.scss';
</style>
