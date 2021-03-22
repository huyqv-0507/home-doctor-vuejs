<template>
  <div class="mainContent">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item>Nhật ký hoạt động</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-history">
      <img src="../../assets/icons/ic_paper.png" />
      <h1>Chọn mục để mở.</h1>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../style/index.scss';
.main-history {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
</style>
