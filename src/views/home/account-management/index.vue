<template>
<div>
  <h1>Account Management</h1>
  <qrcode-vue :value="user" :size="300" level="H" />
  <el-row>Mã : {{user.id}}</el-row>
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
  }
}
</script>

<style>

</style>
