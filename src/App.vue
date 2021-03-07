<template>
  <div id="app">
      <router-view/>
      <notifications position="bottom right"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      layout: 'div'
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
  @import '../src/style/index.scss';
</style>
