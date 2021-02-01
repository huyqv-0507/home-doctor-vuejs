<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      layout: 'div'
    }
  }
}
</script>
<style lang="scss">
  @import '../src/style/index.scss'
</style>
