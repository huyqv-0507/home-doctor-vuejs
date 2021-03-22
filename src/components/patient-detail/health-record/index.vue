<template>
  <div class="mainContent">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Bệnh nhân</el-breadcrumb-item>
        <el-breadcrumb-item>Hồ sơ bệnh án</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bg-theme">
        <h1>Đã chia sẻ</h1>
      </div>
      <div class="bg-theme">
        <h1>Cá nhân</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../../style/index.scss';
</style>
