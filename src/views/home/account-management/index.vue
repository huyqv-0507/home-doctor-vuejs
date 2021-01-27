<template>
<div>
  <h1>Account Management</h1>
  <qrcode-vue :value="doctorInfo" :size="300" level="H" />
  <el-row>Mã : {{user.userId}}</el-row>
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
      doctorInfo: `${this.$store.state.users.user.userId}`
    }
  }
}
</script>

<style>

</style>
