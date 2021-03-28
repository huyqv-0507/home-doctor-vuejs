<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      layout: 'div'
    }
  },
  mounted () {
    this.getNotifications()
    this.getSystemNotifications()
  },
  methods: {
    ...mapActions('notifications', ['getNotifications']),
    ...mapActions('systemHandler', ['getSystemNotifications'])
  }
}
</script>
<style lang="scss">
  @import '../src/style/index.scss';
</style>
