<template>
  <div class="mainContent">
    <div class="bg-theme">
      <h1 class="margin-vertical">Thông tin cá nhân</h1>
      <el-row class="margin">
        <el-col :span="6">
          <p>Tên đăng nhập:</p>
        </el-col>
        <el-col :span="18">
          <p>
            <strong>{{user.userName}}</strong>
          .</p>
        </el-col>
      </el-row>
      <el-row class="margin">
        <el-col :span="6">
          <p>Họ tên:</p>
        </el-col>
        <el-col :span="18">
          <p>
            <strong>{{user.fullName}}</strong>
          .</p>
        </el-col>
      </el-row>
      <el-row class="margin">
        <el-col :span="6">
          <p>Nơi làm việc:</p>
        </el-col>
        <el-col :span="18">
          <p>
            <strong>{{user.workLocation}}</strong>
          .</p>
        </el-col>
      </el-row>
      <el-row class="margin">
        <el-col :span="6">
          <p>Số điện thoại:</p>
        </el-col>
        <el-col :span="18">
          <p>
            <strong>{{user.phone}}</strong>
          .</p>
        </el-col>
      </el-row>
      <el-row class="margin">
        <el-col :span="6">
          <p>Email:</p>
        </el-col>
        <el-col :span="18">
          <p>
            <strong>{{user.email}}</strong>
          .</p>
        </el-col>
      </el-row>
      <el-row class="margin">
        <el-col :span="6">
          <p>Ngày sinh:</p>
        </el-col>
        <el-col :span="18">
          <p>
            <strong>{{user.dateOfBirth}}</strong>
          .</p>
        </el-col>
      </el-row>
      <el-row class="margin">
        <el-col :span="6">
          <p>Chuyên khoa:</p>
        </el-col>
        <el-col :span="18">
          <p>
            <strong>{{user.specialization}}</strong>
          .</p>
        </el-col>
      </el-row>
      <el-row class="margin">
        <el-col :span="6">
          <p>Số năm kinh nghiệm:</p>
        </el-col>
        <el-col :span="18">
          <p>
            <strong>{{user.experience}}</strong>
          năm.</p>
        </el-col>
      </el-row>
      <el-row class="margin">
        <el-col :span="6">
          <p>Thông tin thêm:</p>
        </el-col>
        <el-col :span="18">
          <p>
            <strong>{{user.details}}</strong>
          .</p>
        </el-col>
      </el-row>
      <h3 class="margin-vertical">Mã QR Code</h3>
      <el-row class="horizontalCenter">
        <qrcode-vue :value="doctorInfo" :size="300" level="H" />
      </el-row>
    </div>
  </div>
</template>

<script>
import QrCodeVue from 'qrcode.vue'
import { mapState } from 'vuex'
export default {
  components: {
    'qrcode-vue': QrCodeVue
  },
  computed: {
    ...mapState('users', ['user'])
  },
  data () {
    return {
      doctorInfo: `HDR${this.$store.state.users.user.userId}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/index.scss";
.margin {
  margin: 0.5em;
}
.margin-vertical {
  margin: .5em 0;
}
</style>
