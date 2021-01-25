<template>
  <div id="body">
    <h1>HOMEDOCTOR</h1>
    <el-form v:model="loginForm" ref="loginForm">
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
      status: state => state.status,
      user: state => status.user
    })
  },
  data: function () {
    return {
      loginForm: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('users', ['login'])
  }
}
</script>
<style lang="scss">
</style>
