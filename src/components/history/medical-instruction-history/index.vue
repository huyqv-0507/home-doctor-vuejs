<template>
  <div class="wrapper">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item>Nhật ký hoạt động</el-breadcrumb-item>
        <el-breadcrumb-item>Phiếu y lệnh</el-breadcrumb-item>
      </el-breadcrumb>
    </div></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('contracts', ['contractDetail'])
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/index.scss';
.wrapper {
  top: 3.125em;
  position: absolute;
  left: 18.75em;
  overflow: auto;
  padding: 1em 1em 0 1em;
}
</style>
