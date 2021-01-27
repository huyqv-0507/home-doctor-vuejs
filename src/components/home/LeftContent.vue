<template>
  <div>
    <h1>Danh mục</h1>
    <el-button type="info">Bệnh nhân theo dõi</el-button>
    <br/><br/>
    <el-button type="info">Lịch</el-button>
    <h1>Lối tắt</h1>
    <el-button type="info" @click="goToContractRequest()">Danh sách yêu cầu</el-button>
  </div>
</template>

<script>
export default {
  name: 'LeftContent',
  methods: {
    goToContractRequest () {
      return this.$router.push('/contract-request')
    }
  }
}
</script>

<style>

</style>
