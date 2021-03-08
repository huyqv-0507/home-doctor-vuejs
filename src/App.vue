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
  },
  methods: {
    ...mapActions('notifications', ['getNotifications'])
  }
}
</script>
<style lang="scss">
  @import '../src/style/index.scss';
</style>
