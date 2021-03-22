<template>
  <div class="mainContent">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
      <el-breadcrumb-item>Y lệnh</el-breadcrumb-item>
      <el-breadcrumb-item>Lịch đo sinh hiệu</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content bg-theme">
      <h1>Lịch đo sinh hiệu</h1>
      <div class="content__vital-sign_support">
        <h3 class="content__vital-sign_support-title">Thiết bị người dùng hỗ trợ</h3>
        <div
          class="content__vital-sign_support-subtitle"
        >Những sinh hiệu có sẵn trong thiết bị đeo tay sẽ đưa ra kết quả chủ động hơn, tần xuất đo được nhiều hơn</div>
        <div class="content__vital-sign_support-body">
          <el-row
            :gutter="20"
            v-for="(service, index) in deviceConnecting.services"
            :key="`service-${index}`"
          >
            <el-col :span="12" :offset="0">
              <div v-if="service.serviceName == 'Nhịp tim'">
                <img src="../../../assets/icons/ic-heart-rate.png"/>
              <p>{{service.serviceName}}</p>
              </div>
            </el-col>
            <el-col :span="12" :offset="0"></el-col>
          </el-row>
        </div>
      </div>
      <div class="content__vital-sign_other">
        <h3>Sinh hiệu khác</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('vitalSign', ['deviceConnecting'])
  },
  methods: {
    ...mapActions('vitalSign', ['getDeviceSupportServices'])
  },
  mounted () {
    this.getDeviceSupportServices()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../style/index.scss";
</style>
