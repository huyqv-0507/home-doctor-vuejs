<template>
  <div class="mainContent">
    <div>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Bệnh nhân</el-breadcrumb-item>
        <el-breadcrumb-item>Hoạt động</el-breadcrumb-item>
      </el-breadcrumb>
    <el-collapse>
      <el-collapse-item title="Hoạt động" name="2">
        <el-collapse style="margin: 1em;">
          <el-collapse-item title="Hoạt động hằng ngày">
            <div>
              Kiểm tra sức khoẻ của bệnh nhân
              <span style="color: green;">(3/3)</span>
            </div>
            <div>
              Kiểm tra chỉ số sinh hiệu của bệnh nhân
              <span style="color: red">(0/3)</span>
            </div>
            <div>
              Kiểm tra lịch sử uống thuốc của bệnh nhân
              <span style="color: red">(0/3)</span>
            </div>
          </el-collapse-item>

          <el-collapse-item title="Hoạt động hằng tuần">
            <div>
              Lên lịch tái khám cho bệnh nhân
              <span style="color: red">(0/1)</span>
            </div>
            <div>
              Tạo đơn thuốc cho bệnh nhân
              <span style="color: red">(0/1)</span>
            </div>
            <div>
              Lên lịch đo sinh hiệu cho bệnh nhân
              <span style="color: green;">(1/1)</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>
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
