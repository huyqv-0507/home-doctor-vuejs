<template>
<div class="login-page">
    <h1>Home Doctor</h1>
    <el-form v:model="loginForm" ref="loginForm" class="login-form">
      <el-form-item label="Username" style="width: 500px">
        <el-input v-model="loginForm.userName" type="text"></el-input>
      </el-form-item>
      <el-form-item label="Password" style="width: 500px">
        <el-input v-model="loginForm.password" type="text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login(loginForm)">Đăng nhập</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Login',
  computed: {
    ...mapState({
      status: state => state.status, // Trạng thái đăng nhập
      user: state => status.user // Thông tin người dùng
    })
  },
  data: function () {
    return {
      // Form dùng để đăng nhập
      loginForm: {
        userName: '', // Tên tài khoản dùng để đăng nhập
        password: '' // Mật khẩu dùng để đăng nhập
      }
    }
  },
  methods: {
    ...mapActions('users', ['login'])
  }
}
</script>
<style lang="scss">
.login-page {
  width: 100%; height: 1000px;
  background-image: linear-gradient(225deg, #64E8DE 0%, #8A64E8 100%);
  position: absolute;
  .login-form {
    width: 600px;
    background-color: white;
    text-align: center;
  }
}
</style>
